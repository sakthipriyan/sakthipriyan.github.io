package main

import (
	"archive/zip"
	"bytes"
	"encoding/csv"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"math"
	"net/http"
	"net/http/cookiejar"
	"net/url"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"time"

	"github.com/alecthomas/kong"
)

type CLI struct {
    NSE     NSECmd  `cmd:"" help:"Fetch NSE historical data and write monthly start-of-month close CSV."`
    NSEYear NSEYearCmd `cmd:"" help:"Fetch NSE data for a full calendar year and write monthly start-of-month close CSV."`
    ScaleYears ScaleYearsCmd `cmd:"" help:"Scale values in processed year CSVs by dividing with a factor across a year range."`
    LSEYear LSEYearCmd `cmd:"" help:"Fetch LSE (Refinitiv) timeseries for a calendar year and write monthly first-trading-day close CSV."`
    LSERange LSERangeCmd `cmd:"" help:"Fetch LSE (Refinitiv) timeseries for a date range with specified samples (D/M) and write CSV."`
    LSEProcessFile LSEProcessFileCmd `cmd:"" help:"Process a saved LSE raw JSON file into first-trading-day monthly CSV (uses _DATE_END and CLOSE_PRC)."`
    RBIUSDINRProcess RBIUSDINRProcessCmd `cmd:"" help:"Process RBI USD/INR reference rate CSV/TSV into daily and monthly-first CSVs."`
    RBIUSDINRSplitYears RBIUSDINRSplitYearsCmd `cmd:"" help:"Split RBI USD/INR monthly-first data by year into per-year CSVs."`
    FXApply FXApplyCmd `cmd:"" help:"Apply FX series to an asset series: join on or before date and multiply values (e.g., USD→INR)."`
    BuildMultiAsset BuildMultiAssetJSONCmd `cmd:"" help:"Build consolidated multi-asset monthly JSON for allocator."`
    StooqFXYear StooqFXYearCmd `cmd:"" help:"Fetch Stooq FX daily CSV (e.g., USDINR) and write monthly-first per year CSV."`
    InflationSplitYears InflationSplitYearsCmd `cmd:"" help:"Process CPI inflation CSV/TSV and write monthly-first per-year CSVs."`
    IndiaInflationFetch IndiaInflationFetchCmd `cmd:"" help:"Fetch CPI monthly JSON from IndiaInflation.com API and write monthly-first per-year CSVs."`
    InflationBackfillWB InflationBackfillWBCmd `cmd:"" help:"Merge MOSPI CPI and backfill earlier months using World Bank annual inflation rates (evenly across months)."`
    BuildBacktestBundle BuildBacktestBundleCmd `cmd:"" help:"Build compact backtest bundle with 8-series monthly data and splits metadata."`
}

type NSECmd struct {
    Symbol string `required:"" help:"NSE symbol (e.g., GOLDBEES)."`
    Series string `default:"EQ" help:"Series type (e.g., EQ)."`
    From   string `required:"" help:"Start date (YYYY-MM-DD)."`
    To     string `required:"" help:"End date (YYYY-MM-DD)."`
    Dest   string `required:"" help:"Destination CSV path to write (e.g., data/multi-asset-allocator/gold/monthly_start.csv)."`
    Cookie string `help:"Optional Cookie header value to include (copy from browser)."`
}

func (c *NSECmd) Run() error {
    from, err := time.Parse("2006-01-02", c.From)
    if err != nil {
        return fmt.Errorf("invalid --from: %w", err)
    }
    to, err := time.Parse("2006-01-02", c.To)
    if err != nil {
        return fmt.Errorf("invalid --to: %w", err)
    }
    if !to.After(from) {
        return fmt.Errorf("--to must be after --from")
    }

    client, err := newNSEClient(true)
    if err != nil {
        return err
    }

    // Single attempt using NextApi CSV endpoint.
    days, err := fetchHistoricalCSVNextApi(client, c.Symbol, c.Series, from, to, c.Cookie)
    if err != nil {
        return fmt.Errorf("fetch failed: %w", err)
    }

    if len(days) == 0 {
        return errors.New("no data returned")
    }

    // Sort ascending by date.
    sort.Slice(days, func(i, j int) bool { return days[i].Date.Before(days[j].Date) })

    // Compute start-of-month close: value is close of earliest trading day in that month; date written is first calendar day of month.
    monthly := sampleMonthlyStartClose(days)

    if err := writeCSV(c.Dest, monthly); err != nil {
        return err
    }
    fmt.Printf("Wrote %d monthly rows to %s\n", len(monthly), c.Dest)
    return nil
}

type NSEYearCmd struct {
    Symbol string `required:"" help:"NSE symbol (e.g., GOLDBEES)."`
    Series string `default:"EQ" help:"Series type (e.g., EQ)."`
    Year   int    `required:"" help:"Calendar year, e.g., 2007."`
    Dest   string `required:"" help:"Destination processed CSV path for the year (e.g., ../../data/processed/nse/<symbol>/<year>.csv)."`
    Cookie string `help:"Optional Cookie header value to include (copy from browser)."`
    NoCache bool   `help:"Ignore existing raw cache and refetch (preferred for fixing date semantics)."`
    OnlyCache bool `help:"Use only existing raw cache; do not fetch. Error if cache missing."`
}

func (c *NSEYearCmd) Run() error {
    start := time.Date(c.Year, time.January, 1, 0, 0, 0, 0, time.UTC)
    end := time.Date(c.Year, time.December, 31, 0, 0, 0, 0, time.UTC)
    // If current year, cap to today.
    today := time.Now().UTC()
    if end.After(today) { end = today }

    client, err := newNSEClient(true)
    if err != nil { return err }

    // Determine cache path for raw JSON daily data.
    cachePath := deriveCachePathFromDest(c.Dest, c.Symbol, c.Year)
    var days []DayBar
    // Try to load cached daily data if available.
    if !c.NoCache {
        if cached, err := readCacheDays(cachePath); err == nil && len(cached) > 0 {
            days = cached
        }
    }
    if len(days) == 0 {
        if c.OnlyCache {
            return fmt.Errorf("cache missing at %s and --only-cache set", cachePath)
        }
        // Attempt daily fetch first.
        if fetched, err := fetchHistoricalDailyEquity(client, c.Symbol, c.Series, start, end, c.Cookie); err == nil && len(fetched) > 0 {
            days = fetched
            _ = writeCacheDays(cachePath, days)
        } else {
            // Fallback: use NextApi historical endpoint (no Bhavcopy).
            if fetched2, err2 := fetchHistoricalCSVNextApi(client, c.Symbol, c.Series, start, end, c.Cookie); err2 == nil && len(fetched2) > 0 {
                // Ensure chronological order before sampling.
                sort.Slice(fetched2, func(i, j int) bool { return fetched2[i].Date.Before(fetched2[j].Date) })
                days = fetched2
                _ = writeCacheDays(cachePath, days)
            } else {
                return fmt.Errorf("fetch via NextApi failed: %w", err2)
            }
        }
    }
    monthly := sampleMonthlyStartClose(days)
    if len(monthly) == 0 { return errors.New("no monthly data produced") }
    if err := writeCSV(c.Dest, monthly); err != nil { return err }
    fmt.Printf("Wrote %d monthly rows for %d to %s\n", len(monthly), c.Year, c.Dest)
    return nil
}

type DayBar struct {
    Date  time.Time
    Close float64
}

func sampleMonthlyStartClose(days []DayBar) []DayBar {
    byMonth := make(map[string]DayBar)
    for _, d := range days {
        key := d.Date.Format("2006-01")
        if _, ok := byMonth[key]; !ok {
            // First trading day seen for this month → write actual trading date and close.
            byMonth[key] = DayBar{Date: d.Date, Close: d.Close}
        }
    }
    // Convert to sorted slice.
    keys := make([]string, 0, len(byMonth))
    for k := range byMonth { keys = append(keys, k) }
    sort.Strings(keys)
    out := make([]DayBar, 0, len(keys))
    for _, k := range keys { out = append(out, byMonth[k]) }
    return out
}

func writeCSV(dest string, rows []DayBar) error {
    if err := os.MkdirAll(filepath.Dir(dest), 0o755); err != nil { return err }
    f, err := os.Create(dest)
    if err != nil { return err }
    defer f.Close()
    w := csv.NewWriter(f)
    defer w.Flush()
    if err := w.Write([]string{"date", "value"}); err != nil { return err }
    for _, r := range rows {
        line := []string{ r.Date.Format("2006-01-02"), fmt.Sprintf("%.2f", r.Close) }
        if err := w.Write(line); err != nil { return err }
    }
    return w.Error()
}

// ---------------- RBI USD/INR processing ----------------

type RBIUSDINRProcessCmd struct {
    In         string `required:"" help:"Path to raw CSV/TSV exported from RBI Reference Rate Archive (must contain Date and USD columns)."`
    OutDaily   string `required:"" help:"Destination daily CSV path (date,value)."`
    OutMonthly string `required:"" help:"Destination monthly-first CSV path (date,value)."`
}

func (c *RBIUSDINRProcessCmd) Run() error {
    f, err := os.Open(c.In)
    if err != nil { return err }
    defer f.Close()
    // Peek first line to detect delimiter.
    var buf bytes.Buffer
    tee := io.TeeReader(f, &buf)
    firstBytes := make([]byte, 4096)
    n, _ := tee.Read(firstBytes)
    sample := string(firstBytes[:n])
    // Determine delimiter: prefer tab if present, else comma.
    delim := ','
    if strings.Count(sample, "\t") > strings.Count(sample, ",") {
        delim = '\t'
    }
    // Reconstruct reader: first the buffered sample, then rest of file.
    r := csv.NewReader(io.MultiReader(&buf, f))
    r.Comma = delim
    r.FieldsPerRecord = -1
    header, err := r.Read()
    if err != nil { return fmt.Errorf("read header: %w", err) }
    // Find date and value columns.
    dateIdx, valIdx := -1, -1
    for i, h := range header {
        key := normalizeHeader(h)
        if dateIdx == -1 && (strings.Contains(key, "date") || key == "dt") {
            dateIdx = i
        }
        if valIdx == -1 && (strings.Contains(key, "usd") || strings.Contains(key, "us_dollar") || strings.Contains(key, "us-dollar") || strings.Contains(key, "usdollar") || strings.Contains(key, "reference_rate") || strings.Contains(key, "ref_rate")) {
            valIdx = i
        }
    }
    // If value column not found, try second column conventionally.
    if valIdx == -1 && len(header) >= 2 { valIdx = 1 }
    if dateIdx == -1 || valIdx == -1 { return fmt.Errorf("could not detect date/value columns in %s", c.In) }
    var rows []DayBar
    for {
        rec, err := r.Read()
        if err == io.EOF { break }
        if err != nil { return fmt.Errorf("read row: %w", err) }
        if dateIdx >= len(rec) || valIdx >= len(rec) { continue }
        ds := strings.TrimSpace(rec[dateIdx])
        vs := strings.TrimSpace(rec[valIdx])
        if ds == "" || vs == "" { continue }
        dt, ok := parseNSEDate(ds)
        if !ok { continue }
        // Clean value: drop commas and non-numeric trailing text.
        vs = strings.ReplaceAll(vs, ",", "")
        // Some copies may include ":" or additional text; trim at first space.
        if i := strings.IndexFunc(vs, func(r rune) bool { return !(r == '.' || r == '-' || (r >= '0' && r <= '9')) }); i >= 0 {
            vs = vs[:i]
        }
        var v float64
        if _, err := fmt.Sscanf(vs, "%f", &v); err != nil { continue }
        rows = append(rows, DayBar{Date: dt, Close: v})
    }
    if len(rows) == 0 { return errors.New("no valid rows parsed from input") }
    sort.Slice(rows, func(i, j int) bool { return rows[i].Date.Before(rows[j].Date) })
    if err := writeCSV(c.OutDaily, rows); err != nil { return err }
    monthly := sampleMonthlyStartClose(rows)
    if len(monthly) == 0 { return errors.New("no monthly data produced") }
    if err := writeCSV(c.OutMonthly, monthly); err != nil { return err }
    fmt.Printf("Wrote %d daily rows to %s and %d monthly rows to %s\n", len(rows), c.OutDaily, len(monthly), c.OutMonthly)
    return nil
}

func normalizeHeader(s string) string {
    s = strings.TrimSpace(strings.ToLower(s))
    s = strings.ReplaceAll(s, " ", "_")
    s = strings.ReplaceAll(s, "/", "_")
    s = strings.ReplaceAll(s, "-", "_")
    s = strings.ReplaceAll(s, ".", "")
    return s
}

// ---------------- FX Apply (USD→INR etc.) ----------------

type FXApplyCmd struct {
    Asset string `required:"" help:"Path to asset CSV (date,value) in source currency."`
    FX    string `required:"" help:"Path to FX CSV (date,value), e.g., USDINR reference rates."`
    Out   string `required:"" help:"Destination CSV path for converted series."`
}

func (c *FXApplyCmd) Run() error {
    asset, err := readDateValueCSV(c.Asset)
    if err != nil { return fmt.Errorf("read asset: %w", err) }
    fx, err := readDateValueCSV(c.FX)
    if err != nil { return fmt.Errorf("read fx: %w", err) }
    if len(asset) == 0 || len(fx) == 0 { return errors.New("empty asset or fx series") }
    sort.Slice(asset, func(i, j int) bool { return asset[i].Date.Before(asset[j].Date) })
    sort.Slice(fx, func(i, j int) bool { return fx[i].Date.Before(fx[j].Date) })
    // For each asset date, find fx on or before that date.
    out := make([]DayBar, 0, len(asset))
    j := 0
    for _, a := range asset {
        // advance fx index to last fx date <= a.Date
        for j+1 < len(fx) && !fx[j+1].Date.After(a.Date) { j++ }
        if fx[j].Date.After(a.Date) {
            // no FX available on or before this date; skip
            continue
        }
        out = append(out, DayBar{ Date: a.Date, Close: a.Close * fx[j].Close })
    }
    if len(out) == 0 { return errors.New("no overlapping dates after FX join") }
    if err := writeCSV(c.Out, out); err != nil { return err }
    fmt.Printf("Wrote %d converted rows to %s\n", len(out), c.Out)
    return nil
}

func readDateValueCSV(path string) ([]DayBar, error) {
    f, err := os.Open(path)
    if err != nil { return nil, err }
    defer f.Close()
    r := csv.NewReader(f)
    r.FieldsPerRecord = -1
    // header
    if _, err := r.Read(); err != nil { return nil, err }
    var out []DayBar
    for {
        rec, err := r.Read()
        if err == io.EOF { break }
        if err != nil { return nil, err }
        if len(rec) < 2 { continue }
        ds := strings.TrimSpace(rec[0])
        vs := strings.TrimSpace(rec[1])
        if ds == "" || vs == "" { continue }
        dt, ok := parseNSEDate(ds)
        if !ok { continue }
        var v float64
        if _, err := fmt.Sscanf(vs, "%f", &v); err != nil { continue }
        out = append(out, DayBar{ Date: dt, Close: v })
    }
    return out, nil
}

// ---------------- Build Multi-Asset JSON ----------------

type BuildMultiAssetJSONCmd struct {
    Out string `required:"" help:"Destination JSON path (e.g., ../../static/data/multi-asset-allocation.json)."`
}

func (c *BuildMultiAssetJSONCmd) Run() error {
    // Define assets: display key and directory pattern to read per-year CSVs
    type assetDef struct { key, base string }
    assets := []assetDef{
        {key: "cndx.l", base: "../../data/processed/lse/cndx.l/inr"},
        {key: "niftybees", base: "../../data/processed/nse/niftybees"},
        {key: "juniorbees", base: "../../data/processed/nse/juniorbees"},
        {key: "mid150bees", base: "../../data/processed/nse/mid150bees"},
        {key: "hdfcsml250", base: "../../data/processed/nse/hdfcsml250"},
        {key: "goldbees", base: "../../data/processed/nse/goldbees"},
        {key: "ltgiltbees", base: "../../data/processed/nse/ltgiltbees"},
        {key: "cpi", base: "../../data/processed/inflation/in-cpi"},
    }
    // Load month->value map per asset
    type assetSeries struct {
        def    assetDef
        data   map[string]*float64
        first  string // earliest YYYY-MM seen
    }
    list := make([]assetSeries, 0, len(assets))
    monthsSet := map[string]struct{}{}
    for _, a := range assets {
        m, err := readMonthlyDir(a.base)
        if err != nil { m = map[string]*float64{} }
        first := ""
        // find earliest key
        if len(m) > 0 {
            ks := make([]string, 0, len(m))
            for k := range m { ks = append(ks, k) }
            sort.Strings(ks)
            first = ks[0]
            for k := range m { monthsSet[k] = struct{}{} }
        }
        list = append(list, assetSeries{ def: a, data: m, first: first })
    }
    if len(monthsSet) == 0 { return errors.New("no data found for any asset") }
    // Sort assets by their first available month (earlier first). Missing data go last.
    sort.Slice(list, func(i, j int) bool {
        if list[i].first == "" && list[j].first == "" { return i < j }
        if list[i].first == "" { return false }
        if list[j].first == "" { return true }
        return list[i].first < list[j].first
    })
    // Sort months ascending
    months := make([]string, 0, len(monthsSet))
    for k := range monthsSet { months = append(months, k) }
    sort.Strings(months)
    // Shift CPI by one month forward (previous month's CPI applies to current)
    for i := range list {
        if list[i].def.key == "cpi" && len(list[i].data) > 0 {
            shifted := make(map[string]*float64, len(list[i].data))
            for idx, m := range months {
                if idx == 0 { shifted[m] = nil; continue }
                if v, ok := list[i].data[months[idx-1]]; ok {
                    shifted[m] = v
                } else {
                    shifted[m] = nil
                }
            }
            list[i].data = shifted
            // recompute first for proper ordering after shift
            first := ""
            for _, m := range months {
                if list[i].data[m] != nil {
                    first = m
                    break
                }
            }
            list[i].first = first
        }
    }
    // Determine earliest month among non-CPI assets to keep timeline aligned
    startIdx := 0
    if len(months) > 0 {
        earliestNonCPI := ""
        for _, as := range list {
            if as.def.key == "cpi" { continue }
            // find earliest month with data for this asset
            for _, m := range months {
                if v, ok := as.data[m]; ok && v != nil {
                    if earliestNonCPI == "" || m < earliestNonCPI { earliestNonCPI = m }
                    break
                }
            }
        }
        if earliestNonCPI != "" {
            for i, m := range months { if m >= earliestNonCPI { startIdx = i; break } }
        }
    }
    months = months[startIdx:]
    // Build output structure
    type outStruct struct {
        Symbols []string       `json:"symbols"`
        Start   string         `json:"start"`
        Data    [][]any        `json:"data"`
        Splits  any            `json:"splits"`
    }
    symbols := make([]string, 0, len(list))
    for _, as := range list { symbols = append(symbols, as.def.key) }
    data := make([][]any, 0, len(months))
    for _, month := range months {
        row := make([]any, 0, len(list))
        for _, as := range list {
            if v, ok := as.data[month]; ok && v != nil {
                f := math.Round(*v*100) / 100
                row = append(row, f)
            } else {
                row = append(row, nil)
            }
        }
        // Trim trailing nulls to compact row
        for len(row) > 0 {
            if row[len(row)-1] != nil { break }
            row = row[:len(row)-1]
        }
        data = append(data, row)
    }
    // Load splits metadata if available and embed
    var splits any = []any{}
    if b, err := os.ReadFile("../../static/data/splits-metadata.json"); err == nil {
        var v any
        if json.Unmarshal(b, &v) == nil {
            splits = v
        }
    }
    start := ""
    if len(months) > 0 { start = months[0] }
    out := outStruct{ Symbols: symbols, Start: start, Data: data, Splits: splits }
    // Write JSON
    if err := os.MkdirAll(filepath.Dir(c.Out), 0o755); err != nil { return err }
    b, err := json.MarshalIndent(out, "", "  ")
    if err != nil { return err }
    return os.WriteFile(c.Out, b, 0o644)
}

// readMonthlyDir reads all per-year CSVs in a base directory and returns map[YYYY-MM]*value
func readMonthlyDir(base string) (map[string]*float64, error) {
    entries, err := os.ReadDir(base)
    if err != nil { return nil, err }
    out := map[string]*float64{}
    for _, e := range entries {
        if e.IsDir() { continue }
        name := e.Name()
        if !strings.HasSuffix(name, ".csv") { continue }
        p := filepath.Join(base, name)
        rows, err := readDateValueCSV(p)
        if err != nil { continue }
        for _, r := range rows {
            key := r.Date.Format("2006-01")
            v := r.Close
            out[key] = &v
        }
    }
    return out, nil
}

// ---------------- Stooq FX (USDINR) ----------------

type StooqFXYearCmd struct {
    Symbol string `default:"usdinr" help:"Stooq FX symbol (e.g., usdinr)."`
    Year   int    `required:"" help:"Calendar year to extract (e.g., 2019)."`
    Dest   string `required:"" help:"Destination per-year CSV (e.g., ../../data/processed/rbi/usdinr/2019.csv)."`
}

func (c *StooqFXYearCmd) Run() error {
    client := &http.Client{ Timeout: 30 * time.Second }
    // Stooq download CSV endpoint: https://stooq.com/q/d/l/?s=SYMBOL&i=d
    url := fmt.Sprintf("https://stooq.com/q/d/l/?s=%s&i=d", url.QueryEscape(c.Symbol))
    req, _ := http.NewRequest("GET", url, nil)
    req.Header.Set("user-agent", "Mozilla/5.0 (Macintosh) get-data/1.0")
    resp, err := client.Do(req)
    if err != nil { return err }
    defer resp.Body.Close()
    if resp.StatusCode != 200 { return fmt.Errorf("stooq fetch failed: %s", resp.Status) }
    // Parse CSV: date,open,high,low,close,volume
    r := csv.NewReader(resp.Body)
    r.FieldsPerRecord = -1
    header, err := r.Read()
    if err != nil { return fmt.Errorf("read header: %w", err) }
    di, ci := -1, -1
    for i, h := range header {
        k := strings.ToLower(strings.TrimSpace(h))
        if di == -1 && k == "date" { di = i }
        if ci == -1 && k == "close" { ci = i }
    }
    if di == -1 || ci == -1 { return fmt.Errorf("unexpected Stooq CSV header: %v", header) }
    var days []DayBar
    for {
        rec, err := r.Read()
        if err == io.EOF { break }
        if err != nil { return fmt.Errorf("read row: %w", err) }
        if di >= len(rec) || ci >= len(rec) { continue }
        ds := strings.TrimSpace(rec[di])
        vs := strings.TrimSpace(rec[ci])
        if ds == "" || vs == "" || vs == "-" { continue }
        // Stooq dates are YYYY-MM-DD
        dt, err := time.Parse("2006-01-02", ds)
        if err != nil { continue }
        if dt.Year() != c.Year { continue }
        var v float64
        if _, err := fmt.Sscanf(vs, "%f", &v); err != nil { continue }
        days = append(days, DayBar{ Date: time.Date(dt.Year(), dt.Month(), dt.Day(), 0, 0, 0, 0, time.UTC), Close: v })
    }
    if len(days) == 0 { return errors.New("no daily rows parsed for selected year") }
    sort.Slice(days, func(i, j int) bool { return days[i].Date.Before(days[j].Date) })
    monthly := sampleMonthlyStartClose(days)
    if len(monthly) == 0 { return errors.New("no monthly data produced") }
    if err := writeCSV(c.Dest, monthly); err != nil { return err }
    fmt.Printf("Wrote %d monthly rows to %s (from Stooq %s year %d)\n", len(monthly), c.Dest, c.Symbol, c.Year)
    return nil
}

// RBIUSDINRSplitYearsCmd reads the same input as RBIUSDINRProcess,
// computes monthly-first series, and writes one CSV per year to OutDir.
type RBIUSDINRSplitYearsCmd struct {
    In     string `required:"" help:"Path to raw CSV/TSV with Date and USD columns (RBI Reference Rate)."`
    OutDir string `required:"" help:"Destination directory for per-year CSVs (e.g., ../../data/processed/rbi/usdinr)."`
}

func (c *RBIUSDINRSplitYearsCmd) Run() error {
    f, err := os.Open(c.In)
    if err != nil { return err }
    defer f.Close()
    // Detect delimiter
    var buf bytes.Buffer
    tee := io.TeeReader(f, &buf)
    firstBytes := make([]byte, 4096)
    n, _ := tee.Read(firstBytes)
    sample := string(firstBytes[:n])
    delim := ','
    if strings.Count(sample, "\t") > strings.Count(sample, ",") {
        delim = '\t'
    }
    r := csv.NewReader(io.MultiReader(&buf, f))
    r.Comma = delim
    r.FieldsPerRecord = -1
    header, err := r.Read()
    if err != nil { return fmt.Errorf("read header: %w", err) }
    dateIdx, valIdx := -1, -1
    for i, h := range header {
        key := normalizeHeader(h)
        if dateIdx == -1 && (strings.Contains(key, "date") || key == "dt") {
            dateIdx = i
        }
        if valIdx == -1 && (strings.Contains(key, "usd") || strings.Contains(key, "us_dollar") || strings.Contains(key, "us-dollar") || strings.Contains(key, "usdollar") || strings.Contains(key, "reference_rate") || strings.Contains(key, "ref_rate")) {
            valIdx = i
        }
    }
    if valIdx == -1 && len(header) >= 2 { valIdx = 1 }
    if dateIdx == -1 || valIdx == -1 { return fmt.Errorf("could not detect date/value columns in %s", c.In) }
    var rows []DayBar
    for {
        rec, err := r.Read()
        if err == io.EOF { break }
        if err != nil { return fmt.Errorf("read row: %w", err) }
        if dateIdx >= len(rec) || valIdx >= len(rec) { continue }
        ds := strings.TrimSpace(rec[dateIdx])
        vs := strings.TrimSpace(rec[valIdx])
        if ds == "" || vs == "" { continue }
        dt, ok := parseNSEDate(ds)
        if !ok { continue }
        vs = strings.ReplaceAll(vs, ",", "")
        if i := strings.IndexFunc(vs, func(r rune) bool { return !(r == '.' || r == '-' || (r >= '0' && r <= '9')) }); i >= 0 {
            vs = vs[:i]
        }
        var v float64
        if _, err := fmt.Sscanf(vs, "%f", &v); err != nil { continue }
        rows = append(rows, DayBar{Date: dt, Close: v})
    }
    if len(rows) == 0 { return errors.New("no valid rows parsed from input") }
    sort.Slice(rows, func(i, j int) bool { return rows[i].Date.Before(rows[j].Date) })
    monthly := sampleMonthlyStartClose(rows)
    if len(monthly) == 0 { return errors.New("no monthly data produced") }
    // Group by year and write per-year files
    byYear := map[int][]DayBar{}
    for _, d := range monthly {
        y := d.Date.Year()
        byYear[y] = append(byYear[y], d)
    }
    if err := os.MkdirAll(c.OutDir, 0o755); err != nil { return err }
    years := make([]int, 0, len(byYear))
    for y := range byYear { years = append(years, y) }
    sort.Ints(years)
    for _, y := range years {
        dest := filepath.Join(c.OutDir, fmt.Sprintf("%d.csv", y))
        if err := writeCSV(dest, byYear[y]); err != nil { return err }
        fmt.Printf("Wrote %d rows to %s\n", len(byYear[y]), dest)
    }
    fmt.Printf("Split %d monthly rows across %d year files in %s\n", len(monthly), len(years), c.OutDir)
    return nil
}

// ---------------- Inflation (CPI) Split Years ----------------

// InflationSplitYearsCmd reads a CPI CSV/TSV (monthly or daily),
// computes monthly-first series, and writes one CSV per year to OutDir.
// It attempts to auto-detect the date and CPI/index value columns.
type InflationSplitYearsCmd struct {
    In     string `required:"" help:"Path to CPI CSV/TSV (must contain Date and CPI/Index value columns)."`
    OutDir string `required:"" help:"Destination directory for per-year CSVs (e.g., ../../data/processed/inflation/in-cpi)."`
}

func (c *InflationSplitYearsCmd) Run() error {
    f, err := os.Open(c.In)
    if err != nil { return err }
    defer f.Close()
    // Detect delimiter
    var buf bytes.Buffer
    tee := io.TeeReader(f, &buf)
    firstBytes := make([]byte, 4096)
    n, _ := tee.Read(firstBytes)
    sample := string(firstBytes[:n])
    delim := ','
    if strings.Count(sample, "\t") > strings.Count(sample, ",") {
        delim = '\t'
    }
    r := csv.NewReader(io.MultiReader(&buf, f))
    r.Comma = delim
    r.FieldsPerRecord = -1
    header, err := r.Read()
    if err != nil { return fmt.Errorf("read header: %w", err) }
    dateIdx, valIdx := -1, -1
    for i, h := range header {
        key := normalizeHeader(h)
        if dateIdx == -1 && (strings.Contains(key, "date") || key == "dt") {
            dateIdx = i
        }
        if valIdx == -1 && (
            strings.Contains(key, "cpi") ||
            strings.Contains(key, "index") ||
            strings.Contains(key, "general") ||
            strings.Contains(key, "all_items") ||
            strings.Contains(key, "combined") ||
            strings.Contains(key, "value") ||
            strings.Contains(key, "price_index") ||
            strings.Contains(key, "headline") ||
            strings.Contains(key, "inflation_index")) {
            valIdx = i
        }
    }
    if valIdx == -1 && len(header) >= 2 { valIdx = 1 }
    if dateIdx == -1 || valIdx == -1 { return fmt.Errorf("could not detect date/value columns in %s", c.In) }
    var rows []DayBar
    for {
        rec, err := r.Read()
        if err == io.EOF { break }
        if err != nil { return fmt.Errorf("read row: %w", err) }
        if dateIdx >= len(rec) || valIdx >= len(rec) { continue }
        ds := strings.TrimSpace(rec[dateIdx])
        vs := strings.TrimSpace(rec[valIdx])
        if ds == "" || vs == "" { continue }
        dt, ok := parseNSEDate(ds)
        if !ok { continue }
        vs = strings.ReplaceAll(vs, ",", "")
        // Trim any non-numeric suffixes
        if i := strings.IndexFunc(vs, func(r rune) bool { return !(r == '.' || r == '-' || (r >= '0' && r <= '9')) }); i >= 0 {
            vs = vs[:i]
        }
        var v float64
        if _, err := fmt.Sscanf(vs, "%f", &v); err != nil { continue }
        rows = append(rows, DayBar{Date: dt, Close: v})
    }
    if len(rows) == 0 { return errors.New("no valid rows parsed from input") }
    sort.Slice(rows, func(i, j int) bool { return rows[i].Date.Before(rows[j].Date) })
    monthly := sampleMonthlyStartClose(rows)
    if len(monthly) == 0 { return errors.New("no monthly data produced") }
    // Group by year and write per-year files
    byYear := map[int][]DayBar{}
    for _, d := range monthly {
        y := d.Date.Year()
        byYear[y] = append(byYear[y], d)
    }
    if err := os.MkdirAll(c.OutDir, 0o755); err != nil { return err }
    years := make([]int, 0, len(byYear))
    for y := range byYear { years = append(years, y) }
    sort.Ints(years)
    for _, y := range years {
        dest := filepath.Join(c.OutDir, fmt.Sprintf("%d.csv", y))
        if err := writeCSV(dest, byYear[y]); err != nil { return err }
        fmt.Printf("Wrote %d rows to %s\n", len(byYear[y]), dest)
    }
    fmt.Printf("Split %d monthly rows across %d year files in %s\n", len(monthly), len(years), c.OutDir)
    return nil
}

// ---------------- IndiaInflation.com CPI Fetch ----------------

// IndiaInflationFetchCmd fetches CPI trends JSON from IndiaInflation.com and
// writes monthly-first per-year CSVs.
// It queries `/api/trends?months=N` and attempts to parse date/value pairs.
type IndiaInflationFetchCmd struct {
    Months int    `default:"360" help:"Number of months of history to fetch (e.g., 360 for 30 years)."`
    OutDir string `required:"" help:"Destination directory for per-year CSVs (e.g., ../../data/processed/inflation/in-cpi)."`
}

func (c *IndiaInflationFetchCmd) Run() error {
    if c.Months <= 0 { c.Months = 360 }
    api := fmt.Sprintf("https://indiainflation.com/api/trends?months=%d", c.Months)
    client := &http.Client{ Timeout: 30 * time.Second }
    req, _ := http.NewRequest("GET", api, nil)
    req.Header.Set("User-Agent", "Mozilla/5.0 (Macintosh) get-data/1.0")
    resp, err := client.Do(req)
    if err != nil { return err }
    defer resp.Body.Close()
    if resp.StatusCode != http.StatusOK { return fmt.Errorf("fetch failed: %s", resp.Status) }
    body, err := io.ReadAll(resp.Body)
    if err != nil { return err }
    // Try parse as array of objects first.
    var arr []map[string]any
    var rows []DayBar
    if err := json.Unmarshal(body, &arr); err == nil && len(arr) > 0 {
        for _, m := range arr {
            ds := firstString(m, "date", "month", "dt")
            if ds == "" { continue }
            dt, ok := parseNSEDate(ds)
            if !ok { continue }
            // Try value fields commonly used for CPI
            cf := firstFloat(m, "cpi", "value", "index", "combined", "general", "headline")
            if cf == nil { continue }
            rows = append(rows, DayBar{ Date: dt, Close: *cf })
        }
    } else {
        // Try object with nested array under keys
        var payload map[string]any
        if err := json.Unmarshal(body, &payload); err != nil { return fmt.Errorf("unexpected JSON: %w", err) }
        // Search for an array anywhere in payload
        var found []any
        for _, v := range payload {
            if a, ok := v.([]any); ok && len(a) > 0 {
                found = a
                break
            }
        }
        if found == nil { return errors.New("no array found in API response") }
        for _, item := range found {
            m, ok := item.(map[string]any)
            if !ok { continue }
            ds := firstString(m, "date", "month", "dt")
            if ds == "" { continue }
            dt, ok := parseNSEDate(ds)
            if !ok { continue }
            cf := firstFloat(m, "cpi", "value", "index", "combined", "general", "headline")
            if cf == nil { continue }
            rows = append(rows, DayBar{ Date: dt, Close: *cf })
        }
    }
    if len(rows) == 0 { return errors.New("no CPI rows parsed from API") }
    sort.Slice(rows, func(i, j int) bool { return rows[i].Date.Before(rows[j].Date) })
    monthly := sampleMonthlyStartClose(rows)
    if len(monthly) == 0 { return errors.New("no monthly CPI produced") }
    // Group by year and write per-year files
    byYear := map[int][]DayBar{}
    for _, d := range monthly {
        y := d.Date.Year()
        byYear[y] = append(byYear[y], d)
    }
    if err := os.MkdirAll(c.OutDir, 0o755); err != nil { return err }
    years := make([]int, 0, len(byYear))
    for y := range byYear { years = append(years, y) }
    sort.Ints(years)
    for _, y := range years {
        dest := filepath.Join(c.OutDir, fmt.Sprintf("%d.csv", y))
        if err := writeCSV(dest, byYear[y]); err != nil { return err }
        fmt.Printf("Wrote %d CPI rows to %s\n", len(byYear[y]), dest)
    }
    fmt.Printf("Fetched and split %d monthly CPI rows across %d year files in %s\n", len(monthly), len(years), c.OutDir)
    return nil
}

// ---------------- Inflation Backfill using World Bank annual rates ----------------

type InflationBackfillWBCmd struct {
    Mospi string `required:"" help:"Path to MOSPI CPI CSV/TSV (must include Year, Month, Combined columns for ALL India General Index)."`
    WB    string `required:"" help:"Path to World Bank CPI (FP.CPI.TOTL.ZG) CSV file for India (annual % inflation)."`
    Start string `required:"" help:"Start month for backfill (YYYY-MM), e.g., 2002-01."`
    OutDir string `required:"" help:"Destination directory for per-year CPI CSVs (e.g., ../../data/processed/inflation/in-cpi)."`
}

func (c *InflationBackfillWBCmd) Run() error {
    // Parse MOSPI monthly Combined CPI for ALL India, General Index
    mospiRows, err := readMOSPICPI(c.Mospi)
    if err != nil { return fmt.Errorf("read MOSPI: %w", err) }
    if len(mospiRows) == 0 { return errors.New("no MOSPI CPI rows parsed") }
    // Build map of date->value and track earliest MOSPI month
    mospi := map[string]float64{}
    var firstMospi time.Time
    for _, d := range mospiRows {
        key := d.Date.Format("2006-01")
        mospi[key] = d.Close
        if firstMospi.IsZero() || d.Date.Before(firstMospi) { firstMospi = d.Date }
    }
    // Parse WB annual inflation % for India
    wbRates, err := readWBYoyInflation(c.WB)
    if err != nil { return fmt.Errorf("read WB: %w", err) }
    if len(wbRates) == 0 { return errors.New("no WB annual inflation rates parsed") }
    // Parse start month
    startDt, err := time.Parse("2006-01", c.Start)
    if err != nil { return fmt.Errorf("invalid --start: %w", err) }
    startDt = time.Date(startDt.Year(), startDt.Month(), 1, 0, 0, 0, 0, time.UTC)
    if !startDt.Before(firstMospi) { return fmt.Errorf("start %s must be before first MOSPI month %s", c.Start, firstMospi.Format("2006-01")) }
    // Build monthly series by back-propagating from firstMospi using monthly factors derived from WB annual %.
    series := map[string]float64{}
    // Seed MOSPI months (we'll keep these values as authoritative)
    for k, v := range mospi { series[k] = v }
    // Backfill months prior to firstMospi
    // Start from prev = firstMospi.AddDate(0, -1, 0) and iterate backward until startDt inclusive.
    cursor := time.Date(firstMospi.Year(), firstMospi.Month(), 1, 0, 0, 0, 0, time.UTC).AddDate(0, -1, 0)
    nextMonth := time.Date(firstMospi.Year(), firstMospi.Month(), 1, 0, 0, 0, 0, time.UTC)
    nextKey := nextMonth.Format("2006-01")
    nextVal, ok := series[nextKey]
    if !ok { return fmt.Errorf("missing MOSPI value at %s", nextKey) }
    for !cursor.Before(startDt) {
        y := cursor.Year()
        annualPct, has := wbRates[y]
        if !has {
            // fallback to previous available year or 0
            annualPct = wbRates[y+1]
        }
        // Even monthly rate from annual percentage
        mrate := math.Pow(1.0+annualPct/100.0, 1.0/12.0)
        prevVal := nextVal / mrate
        key := cursor.Format("2006-01")
        series[key] = prevVal
        // move one month back
        nextVal = prevVal
        nextMonth = cursor
        cursor = cursor.AddDate(0, -1, 0)
    }
    // Group into per-year slices and write
    if err := os.MkdirAll(c.OutDir, 0o755); err != nil { return err }
    byYear := map[int][]DayBar{}
    // Collect keys and sort
    keys := make([]string, 0, len(series))
    for k := range series { keys = append(keys, k) }
    sort.Strings(keys)
    for _, k := range keys {
        dt, _ := time.Parse("2006-01", k)
        byYear[dt.Year()] = append(byYear[dt.Year()], DayBar{ Date: dt, Close: series[k] })
    }
    years := make([]int, 0, len(byYear))
    for y := range byYear { years = append(years, y) }
    sort.Ints(years)
    for _, y := range years {
        dest := filepath.Join(c.OutDir, fmt.Sprintf("%d.csv", y))
        // Ensure months sorted
        rows := byYear[y]
        sort.Slice(rows, func(i, j int) bool { return rows[i].Date.Before(rows[j].Date) })
        if err := writeCSV(dest, rows); err != nil { return err }
        fmt.Printf("Wrote %d CPI rows to %s\n", len(rows), dest)
    }
    fmt.Printf("Backfilled CPI from %s to %s using WB annual rates and wrote per-year CSVs to %s\n", startDt.Format("2006-01"), firstMospi.Format("2006-01"), c.OutDir)
    return nil
}

// readMOSPICPI parses the provided MOSPI CSV/TSV and returns monthly Combined CPI for ALL India General Index.
func readMOSPICPI(path string) ([]DayBar, error) {
    f, err := os.Open(path)
    if err != nil { return nil, err }
    defer f.Close()
    // Detect delimiter
    var buf bytes.Buffer
    tee := io.TeeReader(f, &buf)
    firstBytes := make([]byte, 4096)
    n, _ := tee.Read(firstBytes)
    sample := string(firstBytes[:n])
    delim := ','
    if strings.Count(sample, "\t") > strings.Count(sample, ",") { delim = '\t' }
    r := csv.NewReader(io.MultiReader(&buf, f))
    r.Comma = delim
    r.FieldsPerRecord = -1
    header, err := r.Read()
    if err != nil { return nil, fmt.Errorf("read header: %w", err) }
    // Map columns
    idx := map[string]int{}
    for i, h := range header { idx[normalizeHeader(h)] = i }
    yi, mi := idx["year"], idx["month"]
    si, di, ci := idx["state"], idx["description"], idx["combined"]
    if yi < 0 || mi < 0 || si < 0 || di < 0 || ci < 0 { return nil, errors.New("missing required columns in MOSPI file") }
    var out []DayBar
    for {
        rec, err := r.Read()
        if err == io.EOF { break }
        if err != nil { return nil, fmt.Errorf("read row: %w", err) }
        if len(rec) <= ci { continue }
        state := strings.TrimSpace(rec[si])
        desc := strings.TrimSpace(rec[di])
        if !strings.EqualFold(state, "ALL India") { continue }
        if !strings.HasPrefix(strings.ToLower(desc), "general index") { continue }
        yearStr := strings.TrimSpace(rec[yi])
        monthStr := strings.TrimSpace(rec[mi])
        valStr := strings.TrimSpace(rec[ci])
        var year int
        if _, err := fmt.Sscanf(yearStr, "%d", &year); err != nil { continue }
        month := parseMonthName(monthStr)
        if month == time.Month(0) { continue }
        valStr = strings.ReplaceAll(valStr, ",", "")
        var v float64
        if _, err := fmt.Sscanf(valStr, "%f", &v); err != nil { continue }
        dt := time.Date(year, month, 1, 0, 0, 0, 0, time.UTC)
        out = append(out, DayBar{ Date: dt, Close: v })
    }
    sort.Slice(out, func(i, j int) bool { return out[i].Date.Before(out[j].Date) })
    return out, nil
}

func parseMonthName(s string) time.Month {
    s = strings.TrimSpace(strings.ToLower(s))
    months := map[string]time.Month{
        "january": time.January, "jan": time.January,
        "february": time.February, "feb": time.February,
        "march": time.March, "mar": time.March,
        "april": time.April, "apr": time.April,
        "may": time.May,
        "june": time.June, "jun": time.June,
        "july": time.July, "jul": time.July,
        "august": time.August, "aug": time.August,
        "september": time.September, "sep": time.September,
        "october": time.October, "oct": time.October,
        "november": time.November, "nov": time.November,
        "december": time.December, "dec": time.December,
    }
    if m, ok := months[s]; ok { return m }
    return time.Month(0)
}

// readWBYoyInflation parses the World Bank CSV and returns a map[year]annualPercentage for India (Country Code IND).
func readWBYoyInflation(path string) (map[int]float64, error) {
    f, err := os.Open(path)
    if err != nil { return nil, err }
    defer f.Close()
    // World Bank CSV has metadata lines; skip until we find header with Country Name,Country Code,...
    r := csv.NewReader(f)
    r.FieldsPerRecord = -1
    var header []string
    for {
        rec, err := r.Read()
        if err != nil { return nil, fmt.Errorf("read header: %w", err) }
        if len(rec) > 5 && strings.EqualFold(strings.TrimSpace(rec[0]), "Country Name") {
            header = rec
            break
        }
    }
    // Build year column indices
    yearIdx := map[int]int{}
    for i, h := range header {
        h = strings.TrimSpace(h)
        var y int
        if _, err := fmt.Sscanf(h, "%d", &y); err == nil {
            yearIdx[y] = i
        }
    }
    // Find India row
    out := map[int]float64{}
    for {
        rec, err := r.Read()
        if err == io.EOF { break }
        if err != nil { return nil, fmt.Errorf("read row: %w", err) }
        if len(rec) < 5 { continue }
        code := strings.TrimSpace(rec[1])
        if code != "IND" { continue }
        // Extract years
        for y, i := range yearIdx {
            if i >= len(rec) { continue }
            s := strings.TrimSpace(rec[i])
            if s == "" { continue }
            s = strings.ReplaceAll(s, ",", "")
            var v float64
            if _, err := fmt.Sscanf(s, "%f", &v); err == nil {
                out[y] = v
            }
        }
        break
    }
    return out, nil
}

// Derive cache JSON path from desired processed CSV destination.
// Example: ../../data/processed/nse/goldbees/2025.csv -> ../../data/raw/nse/goldbees/2025.json
func deriveCachePathFromDest(dest, symbol string, year int) string {
    d := filepath.Clean(dest)
    dir := filepath.Dir(d)
    // Replace "/processed/" with "/raw/" if present.
    dir = strings.ReplaceAll(dir, string(filepath.Separator)+"processed"+string(filepath.Separator), string(filepath.Separator)+"raw"+string(filepath.Separator))
    base := fmt.Sprintf("%d.json", year)
    // Use symbol subfolder from dest if present; else default to symbol.
    // Build final path.
    return filepath.Join(dir, base)
}

// Read cached day bars from JSON [{"date":"YYYY-MM-DD","close":123.45}, ...]
func readCacheDays(path string) ([]DayBar, error) {
    b, err := os.ReadFile(path)
    if err != nil { return nil, err }
    var arr []map[string]any
    if err := json.Unmarshal(b, &arr); err != nil { return nil, err }
    out := make([]DayBar, 0, len(arr))
    for _, m := range arr {
        ds := firstString(m, "date")
        cf := firstFloat(m, "close")
        if ds == "" || cf == nil { continue }
        dt, ok := parseNSEDate(ds)
        if !ok { continue }
        out = append(out, DayBar{Date: dt, Close: *cf})
    }
    // Sort ascending
    sort.Slice(out, func(i, j int) bool { return out[i].Date.Before(out[j].Date) })
    return out, nil
}

// Write cached day bars as JSON array of objects.
func writeCacheDays(path string, days []DayBar) error {
    if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil { return err }
    type jd struct { Date string `json:"date"`; Close float64 `json:"close"` }
    arr := make([]jd, 0, len(days))
    for _, d := range days { arr = append(arr, jd{ Date: d.Date.Format("2006-01-02"), Close: d.Close }) }
    b, err := json.MarshalIndent(arr, "", "  ")
    if err != nil { return err }
    return os.WriteFile(path, b, 0o644)
}

// Fetch daily equity historical JSON in a single request.
func fetchHistoricalDailyEquity(client *http.Client, symbol, series string, from, to time.Time, cookie string) ([]DayBar, error) {
    // Try cm/equity daily endpoint first
    buildReq := func(base string) (*http.Request, string) {
        q := url.Values{}
        q.Set("symbol", symbol)
        q.Set("series", series)
        q.Set("from", from.Format("02-01-2006"))
        q.Set("to", to.Format("02-01-2006"))
        u := base + "?" + q.Encode()
        req, _ := http.NewRequest("GET", u, nil)
        addStdHeaders(req)
        req.Header.Set("Referer", "https://www.nseindia.com/get-quotes/equity?symbol="+url.QueryEscape(symbol))
        if strings.TrimSpace(cookie) != "" { req.Header.Set("Cookie", cookie) }
        return req, u
    }
    endpoints := []string{
        "https://www.nseindia.com/api/historical/cm/equity",
        "https://www.nseindia.com/api/historical/etf",
    }
    var days []DayBar
    for _, ep := range endpoints {
        req, _ := buildReq(ep)
        resp, err := client.Do(req)
        if err != nil { continue }
        func() {
            defer resp.Body.Close()
            if resp.StatusCode != http.StatusOK { return }
            data, err := io.ReadAll(resp.Body)
            if err != nil { return }
            // Payload expected as { data: [ ...daily bars... ] }
            var payload map[string]any
            if err := json.Unmarshal(data, &payload); err != nil { return }
            d, err := parseHistoricalPayload(payload)
            if err != nil || len(d) == 0 { return }
            days = d
        }()
        if len(days) > 0 { break }
    }
    if len(days) == 0 { return nil, fmt.Errorf("status %d", http.StatusNotFound) }
    sort.Slice(days, func(i, j int) bool { return days[i].Date.Before(days[j].Date) })
    return days, nil
}

type loggingTransport struct {
    base    http.RoundTripper
    verbose bool
}

func (l loggingTransport) RoundTrip(req *http.Request) (*http.Response, error) {
    if l.verbose {
        fmt.Printf("\n>>> REQUEST %s %s\n", req.Method, req.URL.String())
        fmt.Println("Headers:")
        for k, v := range req.Header {
            fmt.Printf("  %s: %s\n", k, strings.Join(v, "; "))
        }
    }
    resp, err := l.base.RoundTrip(req)
    if err != nil {
        if l.verbose { fmt.Printf("<<< RESPONSE error: %v\n", err) }
        return nil, err
    }
    if l.verbose {
        fmt.Printf("<<< RESPONSE %s %s -> %d %s\n", req.Method, req.URL.String(), resp.StatusCode, resp.Status)
        fmt.Println("Headers:")
        for k, v := range resp.Header {
            fmt.Printf("  %s: %s\n", k, strings.Join(v, "; "))
        }
    }
    return resp, nil
}

func newNSEClient(verbose bool) (*http.Client, error) {
    jar, err := cookiejar.New(nil)
    if err != nil { return nil, err }
    client := &http.Client{ Jar: jar, Timeout: 30 * time.Second, Transport: loggingTransport{ base: http.DefaultTransport, verbose: verbose } }
    // Prime cookies by visiting home page.
    req, _ := http.NewRequest("GET", "https://www.nseindia.com", nil)
    addStdHeaders(req)
    resp, err := client.Do(req)
    if err != nil { return nil, err }
    io.Copy(io.Discard, resp.Body)
    resp.Body.Close()
    return client, nil
}

func addStdHeaders(req *http.Request) {
    req.Header.Set("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
    req.Header.Set("Accept", "text/csv, application/json, text/plain, */*")
    req.Header.Set("Accept-Language", "en-US,en;q=0.9")
    req.Header.Set("Connection", "keep-alive")
    req.Header.Set("Sec-Fetch-Site", "same-origin")
    req.Header.Set("Sec-Fetch-Mode", "navigate")
    req.Header.Set("Sec-Fetch-Dest", "empty")
    req.Header.Set("Sec-Ch-Ua", "\"Chromium\";v=120, \"Not=A?Brand\";v=99, \"Google Chrome\";v=120")
    req.Header.Set("Sec-Ch-Ua-Platform", "\"macOS\"")
    req.Header.Set("Sec-Ch-Ua-Mobile", "?0")
}

// Primary endpoint (get-equity-historical-data)
func fetchHistoricalCSVNextApi(client *http.Client, symbol, series string, from, to time.Time, cookie string) ([]DayBar, error) {
    endpoint := "https://www.nseindia.com/api/NextApi/apiClient/GetQuoteApi"
    q := url.Values{}
    q.Set("functionName", "getHistoricalTradeData")
    q.Set("symbol", symbol)
    q.Set("series", series)
    q.Set("fromDate", from.Format("02-01-2006")) // DD-MM-YYYY
    q.Set("toDate", to.Format("02-01-2006"))
    q.Set("csv", "true")
    u := endpoint + "?" + q.Encode()
    req, _ := http.NewRequest("GET", u, nil)
    addStdHeaders(req)
    req.Header.Set("Referer", "https://www.nseindia.com/get-quotes/equity?symbol="+url.QueryEscape(symbol))
    if strings.TrimSpace(cookie) != "" {
        req.Header.Set("Cookie", cookie)
    }
    resp, err := client.Do(req)
    if err != nil { return nil, err }
    defer resp.Body.Close()
    if resp.StatusCode != http.StatusOK {
        return nil, fmt.Errorf("status %d", resp.StatusCode)
    }
    ctype := strings.ToLower(resp.Header.Get("Content-Type"))
    data, err := io.ReadAll(resp.Body)
    if err != nil { return nil, err }
    // Debug preview of body to understand payload shape.
    preview := data
    if len(preview) > 600 { preview = preview[:600] }
    fmt.Printf("Body preview (%s): %s\n", ctype, string(preview))
    // If CSV is indicated, attempt CSV parsing
    if strings.Contains(ctype, "csv") || strings.HasPrefix(strings.TrimSpace(string(data)), "Date,") {
        reader := csv.NewReader(strings.NewReader(string(data)))
        reader.FieldsPerRecord = -1
        header, err := reader.Read()
        if err == nil {
            findIdx := func(candidates ...string) int {
                for i, h := range header {
                    hh := strings.ToUpper(strings.TrimSpace(h))
                    for _, c := range candidates {
                        if strings.Contains(hh, strings.ToUpper(c)) {
                            return i
                        }
                    }
                }
                return -1
            }
            di := findIdx("TIMESTAMP", "DATE")
            ci := findIdx("CLOSING", "CLOSE")
            if di >= 0 && ci >= 0 {
                out := []DayBar{}
                for {
                    rec, err := reader.Read()
                    if err == io.EOF { break }
                    if err != nil { return nil, err }
                    if len(rec) <= ci || len(rec) <= di { continue }
                    dt, ok := parseNSEDate(strings.TrimSpace(rec[di]))
                    if !ok { continue }
                    valStr := strings.ReplaceAll(strings.TrimSpace(rec[ci]), ",", "")
                    var closeVal float64
                    if _, err := fmt.Sscanf(valStr, "%f", &closeVal); err != nil { continue }
                    out = append(out, DayBar{ Date: dt, Close: closeVal })
                }
                if len(out) > 0 { return out, nil }
            }
        }
    }
    // Fallback: try JSON payload
    // First: array payload (observed from NextApi)
    var arr []any
    if err := json.Unmarshal(data, &arr); err == nil {
        if days, perr := parseHistoricalArray(arr); perr == nil && len(days) > 0 {
            return days, nil
        }
    }
    // Second: object payload with nested data
    var payload map[string]any
    if err := json.Unmarshal(data, &payload); err == nil {
        if days, perr := parseHistoricalPayload(payload); perr == nil && len(days) > 0 {
            return days, nil
        }
    }
    return nil, errors.New("unable to parse response as CSV or JSON")
}

func parseHistoricalArray(arr []any) ([]DayBar, error) {
    out := make([]DayBar, 0, len(arr))
    for _, item := range arr {
        m, ok := item.(map[string]any)
        if !ok { continue }
        ds := firstString(m, "mtimestamp", "CH_TIMESTAMP", "TIMESTAMP", "Date", "date")
        if ds == "" { continue }
        dt, ok := parseNSEDate(ds)
        if !ok { continue }
        cs := firstString(m, "chClosingPrice", "CH_CLOSING_PRICE", "CLOSE", "closePrice", "Close")
        if cs == "" {
            if cf := firstFloat(m, "chClosingPrice", "CH_CLOSING_PRICE", "CLOSE", "closePrice", "Close"); cf != nil {
                out = append(out, DayBar{Date: dt, Close: *cf})
                continue
            }
            continue
        }
        cs = strings.ReplaceAll(cs, ",", "")
        var closeVal float64
        if _, err := fmt.Sscanf(cs, "%f", &closeVal); err != nil { continue }
        out = append(out, DayBar{Date: dt, Close: closeVal})
    }
    return out, nil
}

func parseHistoricalPayload(payload map[string]any) ([]DayBar, error) {
    // Common shape: { data: [ { CH_TIMESTAMP: "01-Jan-2007", CH_CLOSING_PRICE: "123.45", ... }, ... ] }
    v, ok := payload["data"]
    if !ok { return nil, errors.New("payload missing data") }
    arr, ok := v.([]any)
    if !ok { return nil, errors.New("data not array") }
    out := make([]DayBar, 0, len(arr))
    for _, item := range arr {
        m, ok := item.(map[string]any)
        if !ok { continue }
        ds := firstString(m, "CH_TIMESTAMP", "TIMESTAMP", "timestamp", "Date", "date")
        if ds == "" { continue }
        dt, ok := parseNSEDate(ds)
        if !ok { continue }
        cs := firstString(m, "CH_CLOSING_PRICE", "CLOSE", "closePrice", "Close")
        if cs == "" {
            // Try numeric field.
            if cf := firstFloat(m, "CH_CLOSING_PRICE", "CLOSE", "closePrice", "Close"); cf != nil {
                out = append(out, DayBar{Date: dt, Close: *cf})
                continue
            }
            continue
        }
        // Normalize commas and spaces.
        cs = strings.ReplaceAll(cs, ",", "")
        var closeVal float64
        if _, err := fmt.Sscanf(cs, "%f", &closeVal); err != nil { continue }
        out = append(out, DayBar{Date: dt, Close: closeVal})
    }
    return out, nil
}

func firstString(m map[string]any, keys ...string) string {
    for _, k := range keys {
        if v, ok := m[k]; ok {
            switch t := v.(type) {
            case string:
                return t
            }
        }
    }
    return ""
}

func firstFloat(m map[string]any, keys ...string) *float64 {
    for _, k := range keys {
        if v, ok := m[k]; ok {
            switch t := v.(type) {
            case float64:
                return &t
            case json.Number:
                f, err := t.Float64()
                if err == nil { return &f }
            }
        }
    }
    return nil
}

func parseNSEDate(s string) (time.Time, bool) {
    // Try formats commonly seen: 02-Jan-2006, 2006-01-02, 02-01-2006
    fmts := []string{
        "02-Jan-2006",           // 01-Jan-2010
        time.RFC3339[:10],        // 2010-01-01
        "2006-01-02",            // 2010-01-01 (explicit)
        "02-01-2006",            // 01-01-2010 (dd-mm-yyyy)
        "02/01/2006",            // 01/01/2010 (dd/mm/yyyy)
        "2/1/2006",              // 1/1/2010 (d/m/yyyy)
        "2006-01",               // 2010-01 (month-only; assume first day)
        "Jan-2006",              // Jan-2010 (month name-year)
        "Jan 2006",              // Jan 2010 (month name year)
        "January-2006",          // January-2010
        "January 2006",          // January 2010
    }
    for _, f := range fmts {
        if dt, err := time.Parse(f, s); err == nil {
            // Use UTC for consistency.
            return time.Date(dt.Year(), dt.Month(), dt.Day(), 0, 0, 0, 0, time.UTC), true
        }
    }
    return time.Time{}, false
}

// (duplicate removed)

// Fallback using NSE Bhavcopy archives: pick first trading day of each month.
func fetchMonthlyStartViaBhavcopy(client *http.Client, symbol, series string, from, to time.Time) ([]DayBar, error) {
    // Iterate months.
    // Align from to first day of month.
    cur := time.Date(from.Year(), from.Month(), 1, 0, 0, 0, 0, time.UTC)
    end := time.Date(to.Year(), to.Month(), 1, 0, 0, 0, 0, time.UTC)
    out := []DayBar{}
    for !cur.After(end) {
        // Try all calendar days in the month to find first trading day.
        found := false
        // days in month: next month day 0
        dim := time.Date(cur.Year(), cur.Month()+1, 0, 0, 0, 0, 0, time.UTC).Day()
        for d := 1; d <= dim; d++ {
            dt := time.Date(cur.Year(), cur.Month(), d, 0, 0, 0, 0, time.UTC)
            url := bhavcopyURL(dt)
            req, _ := http.NewRequest("GET", url, nil)
            addStdHeaders(req)
            req.Header.Set("Referer", "https://www.nseindia.com/all-reports")
            resp, err := client.Do(req)
            if err != nil { continue }
            if resp.StatusCode != http.StatusOK {
                resp.Body.Close()
                continue
            }
            // Read zip
            body, err := io.ReadAll(resp.Body)
            resp.Body.Close()
            if err != nil { continue }
            zr, err := zip.NewReader(bytes.NewReader(body), int64(len(body)))
            if err != nil { continue }
            // Find CSV entry
            targetName := fmt.Sprintf("cm%02d%s%04dbhav.csv", d, strings.ToUpper(dt.Format("Jan")), dt.Year())
            for _, f := range zr.File {
                if strings.EqualFold(f.Name, targetName) {
                    rc, err := f.Open(); if err != nil { break }
                    defer rc.Close()
                    // Parse CSV
                    r := csv.NewReader(rc)
                    r.FieldsPerRecord = -1
                    // Read header
                    hdr, err := r.Read(); if err != nil { break }
                    // Map header indices
                    idx := func(name string) int { for i, h := range hdr { if strings.EqualFold(strings.TrimSpace(h), name) { return i } } ; return -1 }
                    is := idx("SYMBOL"); js := idx("SERIES"); kc := idx("CLOSE")
                    if is < 0 || js < 0 || kc < 0 { break }
                    for {
                        rec, err := r.Read()
                        if err == io.EOF { break }
                        if err != nil { break }
                        if len(rec) <= kc { continue }
                        if strings.EqualFold(strings.TrimSpace(rec[is]), symbol) && strings.EqualFold(strings.TrimSpace(rec[js]), series) {
                            // Parse close
                            valStr := strings.ReplaceAll(strings.TrimSpace(rec[kc]), ",", "")
                            var closeVal float64
                            if _, err := fmt.Sscanf(valStr, "%f", &closeVal); err != nil { break }
                            // Store actual first trading day date and close value.
                            out = append(out, DayBar{ Date: dt, Close: closeVal })
                            found = true
                            break
                        }
                    }
                    break
                }
            }
            if found { break }
        }
        cur = cur.AddDate(0, 1, 0)
    }
    return out, nil
}

func bhavcopyURL(dt time.Time) string {
    // Example: https://www.nseindia.com/content/historical/EQUITIES/2007/JAN/cm01JAN2007bhav.csv.zip
    return fmt.Sprintf("https://www.nseindia.com/content/historical/EQUITIES/%04d/%s/cm%02d%s%04dbhav.csv.zip",
        dt.Year(), strings.ToUpper(dt.Format("Jan")), dt.Day(), strings.ToUpper(dt.Format("Jan")), dt.Year())
}

type ScaleYearsCmd struct {
    Dir    string  `required:"" help:"Directory containing processed year CSVs (e.g., ../../data/processed/nse/goldbees)."`
    From   int     `required:"" help:"Start year inclusive (e.g., 2007)."`
    To     int     `required:"" help:"End year inclusive (e.g., 2019)."`
    Factor float64 `required:"" help:"Divide existing values by this factor (e.g., 100)."`
}

func (c *ScaleYearsCmd) Run() error {
    if c.To < c.From { return fmt.Errorf("--to must be >= --from") }
    if c.Factor == 0 { return fmt.Errorf("--factor must be non-zero") }
    // Iterate years and adjust CSVs in place.
    for y := c.From; y <= c.To; y++ {
        path := filepath.Join(c.Dir, fmt.Sprintf("%d.csv", y))
        if err := scaleCSVInPlace(path, c.Factor); err != nil {
            return fmt.Errorf("scaling %d failed: %w", y, err)
        }
        fmt.Printf("Scaled %d by factor %.2f at %s\n", y, c.Factor, path)
    }
    return nil
}

func scaleCSVInPlace(path string, factor float64) error {
    b, err := os.ReadFile(path)
    if err != nil { return err }
    r := csv.NewReader(bytes.NewReader(b))
    r.FieldsPerRecord = -1
    records, err := r.ReadAll()
    if err != nil { return err }
    if len(records) == 0 { return fmt.Errorf("empty csv: %s", path) }
    // Expect header [date,value]
    out := make([][]string, 0, len(records))
    out = append(out, records[0])
    for i := 1; i < len(records); i++ {
        rec := records[i]
        if len(rec) < 2 { continue }
        valStr := strings.TrimSpace(rec[1])
        var v float64
        if _, err := fmt.Sscanf(valStr, "%f", &v); err != nil { continue }
        v = v / factor
        out = append(out, []string{ strings.TrimSpace(rec[0]), fmt.Sprintf("%.2f", v) })
    }
    // Write back
    f, err := os.Create(path)
    if err != nil { return err }
    defer f.Close()
    w := csv.NewWriter(f)
    defer w.Flush()
    for _, rec := range out {
        if err := w.Write(rec); err != nil { return err }
    }
    return w.Error()
}

func main() {
    var cli CLI
    ctx := kong.Parse(&cli, kong.Name("get-data"), kong.Description("Data fetch utilities for Multi Asset Allocator."), kong.UsageOnError())
    err := ctx.Run()
    ctx.FatalIfErrorf(err)
}

// ---------------- Compact Backtest Bundle ----------------

type BuildBacktestBundleCmd struct {
    Out string `required:"" help:"Destination JSON path for compact bundle (e.g., ../../static/data/backtest-bundle.json)."`
}

func (c *BuildBacktestBundleCmd) Run() error {
    // Asset order as requested
    type assetDef struct{ key, base string }
    assets := []assetDef{
        {key: "lse:cndx.l:inr", base: "../../data/processed/lse/cndx.l/inr"},
        {key: "nse:goldbees", base: "../../data/processed/nse/goldbees"},
        {key: "nse:hdfcsml250", base: "../../data/processed/nse/hdfcsml250"},
        {key: "nse:juniorbees", base: "../../data/processed/nse/juniorbees"},
        {key: "nse:ltgiltbees", base: "../../data/processed/nse/ltgiltbees"},
        {key: "nse:mid150bees", base: "../../data/processed/nse/mid150bees"},
        {key: "nse:niftybees", base: "../../data/processed/nse/niftybees"},
        {key: "in:cpi", base: "../../data/processed/inflation/in-cpi"},
    }
    // Load month->value map for each asset
    series := make([]map[string]*float64, 0, len(assets))
    for _, a := range assets {
        m, err := readMonthlyDir(a.base)
        if err != nil { m = map[string]*float64{} }
        series = append(series, m)
    }
    // Compute intersection of months across all series
    months := intersectMonths(series)
    if len(months) == 0 {
        return errors.New("no common months across all series")
    }
    sort.Strings(months)
    start := months[0]
    // Build flat data: per-month, per-asset
    flat := make([]float64, 0, len(months)*len(assets))
    for _, ym := range months {
        for _, m := range series {
            v := m[ym]
            if v == nil { return fmt.Errorf("missing value for %s", ym) }
            // Round to 2 decimals for compactness
            vv := math.Round(*v*100) / 100
            flat = append(flat, vv)
        }
    }
    // Load splits metadata and compact it
    splits, _ := loadCompactSplits("../../static/data/splits-metadata.json")

    // Build compact JSON
    payload := map[string]any{
        "s": start,
        "o": func() []string { out := make([]string, len(assets)); for i,a := range assets { out[i] = a.key }; return out }(),
        "d": flat,
        "p": splits,
    }
    b, err := json.Marshal(payload) // minified for compactness
    if err != nil { return err }
    if err := os.MkdirAll(filepath.Dir(c.Out), 0o755); err != nil { return err }
    if err := os.WriteFile(c.Out, b, 0o644); err != nil { return err }
    fmt.Printf("Backtest bundle: %d months, %d series -> %s\n", len(months), len(assets), c.Out)
    return nil
}

func intersectMonths(series []map[string]*float64) []string {
    if len(series) == 0 { return nil }
    // Start with keys of first series
    base := map[string]struct{}{}
    for k := range series[0] { base[k] = struct{}{} }
    for i := 1; i < len(series); i++ {
        cur := map[string]struct{}{}
        for k := range series[i] { cur[k] = struct{}{} }
        for k := range base {
            if _, ok := cur[k]; !ok { delete(base, k) }
        }
    }
    out := make([]string, 0, len(base))
    for k := range base { out = append(out, k) }
    return out
}

type compactSplit struct {
    K string `json:"k"` // key (e.g., nse:niftybees)
    E string `json:"e"` // effective date (YYYY-MM or YYYY-MM-DD)
    N int    `json:"n"` // numerator
    D int    `json:"d"` // denominator
}

func loadCompactSplits(path string) ([]compactSplit, error) {
    b, err := os.ReadFile(path)
    if err != nil { return nil, err }
    var arr []map[string]any
    if err := json.Unmarshal(b, &arr); err != nil { return nil, err }
    out := []compactSplit{}
    for _, m := range arr {
        sym := strings.ToUpper(firstString(m, "symbol"))
        eff := firstString(m, "effective_date")
        // Map MOSPI symbols to our keys
        key := ""
        switch sym {
        case "NIFTYBEES": key = "nse:niftybees"
        case "GOLDBEES": key = "nse:goldbees"
        default:
            continue
        }
        n := 0; d := 0
        if nf := firstFloat(m, "ratio_numerator"); nf != nil { n = int(*nf) } else { var ni int; fmt.Sscanf(firstString(m, "ratio_numerator"), "%d", &ni); n = ni }
        if df := firstFloat(m, "ratio_denominator"); df != nil { d = int(*df) } else { var di int; fmt.Sscanf(firstString(m, "ratio_denominator"), "%d", &di); d = di }
        out = append(out, compactSplit{ K: key, E: eff, N: n, D: d })
    }
    return out, nil
}

// ------------------------------
// LSE (Refinitiv Widgets) support
// ------------------------------

type LSEYearCmd struct {
    Ric      string `required:"" help:"LSE RIC (e.g., CNDX.L)."`
    Year     int    `required:"" help:"Calendar year, e.g., 2025."`
    Dest     string `required:"" help:"Destination processed CSV path (e.g., ../../data/processed/lse/cndx.l/2025.csv)."`
    JWT      string `help:"JWT token for refinitiv-widgets.financial.com (header 'jwt'). If empty, reads FINANCIAL_COM_JWT env var."`
    NoCache  bool   `help:"Ignore existing raw cache and refetch from LSE."`
    OnlyCache bool  `help:"Use only existing raw cache; do not fetch. Error if cache missing."`
}

func (c *LSEYearCmd) Run() error {
    start := time.Date(c.Year, time.January, 1, 0, 0, 0, 0, time.UTC)
    end := time.Date(c.Year, time.December, 31, 0, 0, 0, 0, time.UTC)
    today := time.Now().UTC()
    if end.After(today) { end = today }

    jwt := strings.TrimSpace(c.JWT)
    if jwt == "" { jwt = strings.TrimSpace(os.Getenv("FINANCIAL_COM_JWT")) }
    if jwt == "" {
        return errors.New("missing JWT: set --jwt or FINANCIAL_COM_JWT env var")
    }

    client, err := newLSEClient(true)
    if err != nil { return err }

    // Cache path for raw JSON daily data.
    cachePath := deriveCachePathFromDest(c.Dest, strings.ToLower(c.Ric), c.Year)
    var days []DayBar
    if !c.NoCache {
        if cached, err := readCacheDays(cachePath); err == nil && len(cached) > 0 {
            days = cached
        }
    }
    if len(days) == 0 {
        if c.OnlyCache { return fmt.Errorf("cache missing at %s and --only-cache set", cachePath) }
        fetched, err := fetchLSETimeseries(client, c.Ric, start, end, "D", jwt)
        if err != nil { return fmt.Errorf("LSE fetch failed: %w", err) }
        if len(fetched) == 0 { return errors.New("no data returned from LSE") }
        // Ensure chronological order before sampling.
        sort.Slice(fetched, func(i, j int) bool { return fetched[i].Date.Before(fetched[j].Date) })
        days = fetched
        _ = writeCacheDays(cachePath, days)
    }
    monthly := sampleMonthlyStartClose(days)
    if len(monthly) == 0 { return errors.New("no monthly data produced") }
    if err := writeCSV(c.Dest, monthly); err != nil { return err }
    fmt.Printf("Wrote %d monthly rows for %d to %s\n", len(monthly), c.Year, c.Dest)
    return nil
}

type LSERangeCmd struct {
    Ric     string `required:"" help:"LSE RIC (e.g., CNDX.L)."`
    From    string `required:"" help:"Start date (YYYY-MM-DD)."`
    To      string `required:"" help:"End date (YYYY-MM-DD)."`
    Samples string `default:"D" help:"Sampling frequency: D (daily) or M (monthly)."`
    Resample string `help:"Optional resampling: 'monthly-start' to derive first-trading-day monthly from daily samples."`
    Dest    string `required:"" help:"Destination CSV path to write (e.g., ../../data/processed/lse/<ric>/range.csv)."`
    JWT     string `help:"JWT token for refinitiv-widgets.financial.com (header 'jwt'). If empty, reads FINANCIAL_COM_JWT env var."`
}

func (c *LSERangeCmd) Run() error {
    from, err := time.Parse("2006-01-02", c.From)
    if err != nil { return fmt.Errorf("invalid --from: %w", err) }
    to, err := time.Parse("2006-01-02", c.To)
    if err != nil { return fmt.Errorf("invalid --to: %w", err) }
    if !to.After(from) { return fmt.Errorf("--to must be after --from") }
    jwt := strings.TrimSpace(c.JWT)
    if jwt == "" { jwt = strings.TrimSpace(os.Getenv("FINANCIAL_COM_JWT")) }
    if jwt == "" { return errors.New("missing JWT: set --jwt or FINANCIAL_COM_JWT env var") }
    samples := strings.ToUpper(strings.TrimSpace(c.Samples))
    if samples != "D" && samples != "M" { return fmt.Errorf("--samples must be D or M") }

    client, err := newLSEClient(true)
    if err != nil { return err }
    days, err := fetchLSETimeseries(client, c.Ric, from, to, samples, jwt)
    if err != nil { return err }
    if len(days) == 0 { return errors.New("no data returned from LSE") }
    // Optional resampling: if daily samples and resample==monthly-start, produce first-trading-day monthly series.
    if samples == "D" && strings.EqualFold(strings.TrimSpace(c.Resample), "monthly-start") {
        sort.Slice(days, func(i, j int) bool { return days[i].Date.Before(days[j].Date) })
        monthly := sampleMonthlyStartClose(days)
        if len(monthly) == 0 { return errors.New("no monthly data produced from daily resample") }
        if err := writeCSV(c.Dest, monthly); err != nil { return err }
        fmt.Printf("Wrote %d rows (monthly-start from D) to %s\n", len(monthly), c.Dest)
        return nil
    }
    // Default: write as-is (no resampling). For M, dates are period end from _DATE_END.
    sort.Slice(days, func(i, j int) bool { return days[i].Date.Before(days[j].Date) })
    if err := writeCSV(c.Dest, days); err != nil { return err }
    fmt.Printf("Wrote %d rows (%s) to %s\n", len(days), samples, c.Dest)
    return nil
}

func newLSEClient(verbose bool) (*http.Client, error) {
    jar, err := cookiejar.New(nil)
    if err != nil { return nil, err }
    client := &http.Client{ Jar: jar, Timeout: 30 * time.Second, Transport: loggingTransport{ base: http.DefaultTransport, verbose: verbose } }
    // Prime connection with LSE origin (optional, helps set cookies if any).
    req, _ := http.NewRequest("GET", "https://www.londonstockexchange.com", nil)
    addLSEStdHeaders(req, "")
    resp, err := client.Do(req)
    if err != nil { return nil, err }
    io.Copy(io.Discard, resp.Body)
    resp.Body.Close()
    return client, nil
}

func addLSEStdHeaders(req *http.Request, jwt string) {
    // Mimic browser headers from provided curl; JWT is passed via 'jwt' header.
    req.Header.Set("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36")
    req.Header.Set("Accept", "application/json")
    req.Header.Set("Accept-Language", "en-IN,en-US;q=0.9,en-GB;q=0.8,en;q=0.7,ta;q=0.6")
    req.Header.Set("DNT", "1")
    req.Header.Set("Priority", "u=1, i")
    req.Header.Set("Origin", "https://www.londonstockexchange.com")
    req.Header.Set("Referer", "https://www.londonstockexchange.com/")
    req.Header.Set("Sec-Fetch-Dest", "empty")
    req.Header.Set("Sec-Fetch-Mode", "cors")
    req.Header.Set("Sec-Fetch-Site", "cross-site")
    req.Header.Set("Sec-Ch-Ua", "\"Not(A:Brand\";v=\"8\", \"Chromium\";v=\"144\", \"Google Chrome\";v=\"144\"")
    req.Header.Set("Sec-Ch-Ua-Platform", "\"macOS\"")
    req.Header.Set("Sec-Ch-Ua-Mobile", "?0")
    req.Header.Set("X-Component-Id", "AdvancedChart")
    if strings.TrimSpace(jwt) != "" { req.Header.Set("jwt", jwt) }
}

// Fetch LSE daily timeseries from Refinitiv Widgets API.
func fetchLSETimeseries(client *http.Client, ric string, from, to time.Time, samples, jwt string) ([]DayBar, error) {
    endpoint := "https://refinitiv-widgets.financial.com/rest/api/timeseries/historical"
    q := url.Values{}
    q.Set("ric", ric)
    q.Set("fids", "_DATE_END,CLOSE_PRC,HIGH_1,OPEN_PRC,LOW_1")
    q.Set("samples", samples)
    q.Set("appendRecentData", "all")
    // Use ISO8601 timestamps as per curl.
    // Align to full-day window: start at 00:00:00 and end at 23:59:59 (per curl examples)
    fromStart := time.Date(from.Year(), from.Month(), from.Day(), 0, 0, 0, 0, time.UTC)
    toEnd := time.Date(to.Year(), to.Month(), to.Day(), 23, 59, 59, 0, time.UTC)
    q.Set("fromDate", fromStart.Format("2006-01-02T15:04:05"))
    q.Set("toDate", toEnd.Format("2006-01-02T15:04:05"))
    u := endpoint + "?" + q.Encode()
    // Preflight without JWT to allow financial.com to set any cookies
    pre, _ := http.NewRequest("GET", u, nil)
    addLSEStdHeaders(pre, "")
    preResp, _ := client.Do(pre)
    if preResp != nil { io.Copy(io.Discard, preResp.Body); preResp.Body.Close() }
    // Main request with JWT
    req, _ := http.NewRequest("GET", u, nil)
    addLSEStdHeaders(req, jwt)
    resp, err := client.Do(req)
    if err != nil { return nil, err }
    defer resp.Body.Close()
    if resp.StatusCode == http.StatusUnauthorized {
        // One retry to allow INGRESSCOOKIE to be set by the server
        io.Copy(io.Discard, resp.Body)
        resp.Body.Close()
        req2, _ := http.NewRequest("GET", u, nil)
        addLSEStdHeaders(req2, jwt)
        resp2, err2 := client.Do(req2)
        if err2 != nil { return nil, err2 }
        resp = resp2
    }
    if resp.StatusCode != http.StatusOK { return nil, fmt.Errorf("status %d", resp.StatusCode) }
    data, err := io.ReadAll(resp.Body)
    if err != nil { return nil, err }
    // Attempt parsing as object payload containing array of rows with _DATE_END and CLOSE_PRC.
    if bars, err := parseLSEPayload(data); err == nil && len(bars) > 0 {
        sort.Slice(bars, func(i, j int) bool { return bars[i].Date.Before(bars[j].Date) })
        return bars, nil
    }
    return nil, errors.New("unable to parse LSE response")
}

func parseLSEPayload(data []byte) ([]DayBar, error) {
    // Try top-level array first.
    var arr []map[string]any
    if err := json.Unmarshal(data, &arr); err == nil {
        if out := extractLSEBarsFromArray(arr); len(out) > 0 { return out, nil }
    }
    // Try object with obvious keys.
    var obj map[string]any
    if err := json.Unmarshal(data, &obj); err == nil {
        // Common patterns: { data: [...] } or { values: [...] } or { content: { data: [...] } }
        if v, ok := obj["data"]; ok {
            if arr2, ok := v.([]any); ok {
                return extractLSEBarsFromAnyArray(arr2), nil
            }
        }
        if v, ok := obj["values"]; ok {
            if arr2, ok := v.([]any); ok { return extractLSEBarsFromAnyArray(arr2), nil }
        }
        if v, ok := obj["content"]; ok {
            if inner, ok := v.(map[string]any); ok {
                if arr2, ok := inner["data"].([]any); ok { return extractLSEBarsFromAnyArray(arr2), nil }
            }
        }
    }
    return nil, errors.New("no recognized arrays in payload")
}

func extractLSEBarsFromArray(arr []map[string]any) []DayBar {
    out := make([]DayBar, 0, len(arr))
    for _, m := range arr {
        ds := firstString(m, "_DATE_END", "DATE", "dateEnd", "date")
        cs := firstString(m, "CLOSE_PRC", "CLOSE", "closePrice")
        if ds == "" || cs == "" {
            // Try numeric close
            cf := firstFloat(m, "CLOSE_PRC", "CLOSE", "closePrice")
            if ds == "" || cf == nil { continue }
            // Trim RFC3339 to date if needed
            if i := strings.Index(ds, "T"); i >= 0 { ds = ds[:i] }
            dt, ok := parseNSEDate(ds); if !ok { continue }
            out = append(out, DayBar{ Date: dt, Close: *cf })
            continue
        }
        // Normalize
        if i := strings.Index(ds, "T"); i >= 0 { ds = ds[:i] }
        dt, ok := parseNSEDate(ds); if !ok { continue }
        valStr := strings.ReplaceAll(strings.TrimSpace(cs), ",", "")
        var closeVal float64
        if _, err := fmt.Sscanf(valStr, "%f", &closeVal); err != nil { continue }
        out = append(out, DayBar{ Date: dt, Close: closeVal })
    }
    return out
}

func extractLSEBarsFromAnyArray(arr []any) []DayBar {
    out := make([]DayBar, 0, len(arr))
    for _, it := range arr {
        m, ok := it.(map[string]any); if !ok { continue }
        ds := firstString(m, "_DATE_END", "DATE", "dateEnd", "date")
        cf := firstFloat(m, "CLOSE_PRC", "CLOSE", "closePrice")
        cs := firstString(m, "CLOSE_PRC", "CLOSE", "closePrice")
        // Prefer numeric
        var closeVal *float64
        if cf != nil { closeVal = cf } else if cs != "" {
            valStr := strings.ReplaceAll(strings.TrimSpace(cs), ",", "")
            var v float64
            if _, err := fmt.Sscanf(valStr, "%f", &v); err == nil { closeVal = &v }
        }
        if ds == "" || closeVal == nil { continue }
        if i := strings.Index(ds, "T"); i >= 0 { ds = ds[:i] }
        dt, ok := parseNSEDate(ds); if !ok { continue }
        out = append(out, DayBar{ Date: dt, Close: *closeVal })
    }
    return out
}

// LSEProcessFileCmd reads a raw LSE JSON response file and writes monthly first-trading-day CSV.
type LSEProcessFileCmd struct {
    In  string `required:"" help:"Path to raw LSE JSON file (as saved from Refinitiv Widgets)."`
    Out string `required:"" help:"Destination processed CSV path (e.g., ../../data/processed/lse/<ric>/<year>.csv)."`
}

func (c *LSEProcessFileCmd) Run() error {
    b, err := os.ReadFile(c.In)
    if err != nil { return err }
    bars, err := parseLSEPayload(b)
    if err != nil { return fmt.Errorf("parse failed: %w", err) }
    if len(bars) == 0 { return errors.New("no bars parsed from file") }
    sort.Slice(bars, func(i, j int) bool { return bars[i].Date.Before(bars[j].Date) })
    monthly := sampleMonthlyStartClose(bars)
    if len(monthly) == 0 { return errors.New("no monthly data produced") }
    if err := writeCSV(c.Out, monthly); err != nil { return err }
    fmt.Printf("Wrote %d monthly rows to %s (from %s)\n", len(monthly), c.Out, c.In)
    return nil
}

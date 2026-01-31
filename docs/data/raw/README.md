# Asset Data (Monthly)

This folder holds the raw CSV inputs for the Multi Asset Allocator. You provide monthly (or daily) index values. The build script will downsample to month-end and generate a single JSON file the tool reads.

Required series (monthly values):
- NASDAQ100_TRI_USD.csv — Nasdaq 100 Total Return Index (USD)
- USDINR.csv — USD/INR FX rate (e.g., RBI reference rate or reliable source)
- NIFTY50_TRI_INR.csv — Nifty 50 TRI (INR)
- NIFTY_NEXT50_TRI_INR.csv — Nifty Next 50 TRI (INR)
- NIFTY_MIDCAP150_TRI_INR.csv — Nifty Midcap 150 TRI (INR)
- NIFTY_SMALLCAP250_TRI_INR.csv — Nifty Smallcap 250 TRI (INR)
- GOLD_INR.csv — Gold (INR) monthly index/price proxy
- DEBT_TRI_INR.csv — Debt (INR) total return proxy (e.g., Bharat Bond TRI, liquid/short duration TRI)

CSV format (daily or monthly):
- Headers: `date,value`
- `date`: `YYYY-MM-DD` or `YYYY-MM`
- `value`: numeric index level or price

Notes:
- For daily data, the build script will pick the last available row per calendar month (month-end).
- Ensure continuous data for at least the chosen lookback period (e.g., 10+ years) for best comparisons.
- The tool invests at the start of each month and uses monthly returns computed from month-end values.

Output:
- The built JSON is written to `static/data/asset-series.json` as:
```
{
  "NIFTY50_TRI_INR": [{"date":"2020-01","value":1234.56}, ...],
  ...,
  "USDINR": [{"date":"2020-01","value":71.2}, ...]
}
```

Sourcing & copyright:
- Use official/provider datasets where licensed. Avoid redistributing proprietary data.
- This repo does not include real datasets; you must place your own files here.

# get-data

Go CLI utilities to fetch and transform market data for the Multi Asset Allocator tools.

## Install / Build

```
cd tools/get-data
go build -o get-data
```

## Usage

Fetch NSE historical data for a symbol and write monthly start-of-month close CSV.

```
./get-data nse --symbol GOLDBEES --series EQ \
  --from 2007-01-01 --to 2026-01-25 \
  --dest data/multi-asset-allocator/gold/monthly_start.csv
```

Output CSV columns: `date,value`

Notes:
- Requires internet and NSE endpoints may change. The tool attempts two known endpoints and primes cookies.
- Date in output is the calendar month start; value is the close of the earliest trading day in that month.

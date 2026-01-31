# Inflation (CPI) Raw Data

Place a monthly CPI index file here for India (e.g., MOSPI Combined CPI) or other sources.

Accepted formats:
- CSV or TSV with a header row containing a date column and a CPI/index value column.
- Date formats supported: YYYY-MM-DD, DD-MM-YYYY, DD/MM/YYYY, YYYY-MM, Jan-YYYY, Jan YYYY, January-YYYY, January YYYY.
- Value column keywords detected: CPI, Index, General, All_Items, Combined, Value, Price_Index, Headline.

Example minimal CSV:

```
Date,CPI
2019-01,140.3
2019-02,140.8
2019-03,141.2
```

Processing command (from tools/get-data):

```
go run . inflation-split-years \
  --in ../../data/raw/inflation/mospi_cpi_combined.csv \
  --out-dir ../../data/processed/inflation/in-cpi
```

Output: per-year monthly-first CPI files in `data/processed/inflation/in-cpi/`.

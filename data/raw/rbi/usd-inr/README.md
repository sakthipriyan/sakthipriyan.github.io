RBI USD/INR Reference Rate — Raw Data

This folder is for raw inputs copied or exported from the RBI Reference Rate Archive:
https://www.rbi.org.in/scripts/referenceratearchive.aspx

Due to CAPTCHA on the RBI site, automated fetching is not reliable. Use your browser to access the archive and copy/export data.

Accepted input formats for the processing tool:
- CSV with headers like: Date, US Dollar
- TSV (tab-separated) paste from the archive table
- Any delimited file where one column is a date and another is the USD/INR rate (tool auto-detects columns by header names)

Recommended workflow:
1) For a broad range (e.g., 2000–present), compile a single CSV/TSV with two columns:
   Date,US Dollar
   2000-01-03,43.55
   2000-01-04,43.61
   ...
   Use YYYY-MM-DD or DD-Mon-YYYY date formats.
2) Save the file here, e.g., `rbi-usdinr-daily-raw.csv`.
3) Run the processing command to generate daily and monthly-first CSVs (see tools/get-data usage below).

The processed outputs will live under data/processed/rbi/usd-inr/.

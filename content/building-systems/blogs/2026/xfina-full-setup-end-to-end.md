---
type: blogs
title: "Xfina: Building a Multi-Ecosystem Financial Statement Parser from Scratch"
date: "2026-08-08"
draft: true
summary: "A complete end-to-end walkthrough of building Xfina — a privacy-first, Rust-powered parser for Indian financial statements (bank accounts, credit cards, mutual funds, international brokers) — published simultaneously to Crates.io, NPM, and PyPI, with a WASM-powered web app deployed to GitHub Pages."
systems_tags:
  - rust
  - wasm
  - python
  - go
  - architecture
  - cloud
  - devops
  - design
---

## The Problem

Every time I wanted to get a consolidated view of my finances — bank statements, credit card bills, mutual fund portfolios, international brokerage activity — I had to manually open each institution's portal, download their proprietary PDF or Excel file, and then reconcile everything by hand. There was no standard, privacy-preserving tool that could parse all of them in one place without uploading sensitive data to a third-party server.

The existing options were either:
- **Account Aggregators (AA)**: Useful, but require consent frameworks and institutional agreements. Not a tool I can run locally.
- **Manual spreadsheets**: Brittle, does not scale, no validation.
- **Paid services**: Upload your statements to a third-party server — a non-starter for privacy-conscious users.

I wanted something different: **a fast, local, open-source parser** that could understand the proprietary formats used by Indian banks and brokerages, and output clean, structured JSON.

That project is [Xfina](https://github.com/sakthipriyan/xfina).

---

## What Xfina Does

Xfina is a **Rust library** (and CLI tool) that parses financial statements from Indian institutions directly from raw file bytes — PDFs, Excel sheets, CSVs — and outputs structured JSON conforming to the [ReBIT Account Aggregator (AA) schema](https://api.rebit.org.in/), with optional extensions for richer data.

As of v0.2.1, it supports:

| Category | Institution / Provider | Format | Status | Notes |
|---|---|---|---|---|
| 🏦 Bank Account | Axis Bank | XLS | ✅ | Full support |
| 🏦 Bank Account | Bank of Baroda | XLS | ✅ | Full support |
| 🏦 Bank Account | HDFC Bank | XLS | ✅ | Full support |
| 🏦 Bank Account | ICICI Bank | XLS | ✅ | Full support |
| 🏦 Bank Account | State Bank of India | PDF (password protected) | ✅ | Full support |
| 💳 Credit Card | Axis Bank | - | ⏳ | Waiting for the statement to be generated |
| 💳 Credit Card | HDFC Bank | CSV | ✅ | Full support incl. add-on cardholders, reward points |
| 💳 Credit Card | ICICI Bank | XLS | ✅ | Tested card without any add-on cards |
| 📈 Mutual Funds | CAMS | PDF (password protected) | ✅ | Combined Account Statement (CAS) |
| 📈 Mutual Funds | KFinTech | PDF (password protected) | ⏳ | Combined Account Statement (CAS) |
| 🌍 Intl Brokers | Interactive Brokers (IBKR) | CSV | ✅ | Activity statements |

*Note: Bank Account parsers have not been tested with Joint Accounts.*

Beyond parsing, Xfina also ships a **two-level validation engine** that catches parsing discrepancies, a **WASM build** for in-browser use, **Python bindings** via PyO3/Maturin, and a **Vue 3 web app** — all publishing simultaneously to Crates.io, NPM, and PyPI on every tagged release via GitHub Actions.

---

## Architecture

The project is a **Cargo workspace** with four crates:

```
xfina/
├── src/                  # Main xfina Rust crate
│   ├── models/           # Shared data models (ReBIT / AA standard)
│   ├── bank_accounts/    # Parsers: HDFC, ICICI, SBI, BoB, Axis
│   ├── credit_cards/     # Parsers: HDFC, ICICI
│   ├── mutual_funds/     # Parsers: CAMS
│   ├── intl_stocks/      # Parsers: Interactive Brokers (IBKR)
│   └── main.rs           # CLI entrypoint
├── wasm/                 # WASM bindings (wasm-bindgen)
├── python/               # Python bindings (pyo3 + maturin)
├── xtask/                # Custom build & deployment scripts
└── web/                  # Vue 3 + Vite frontend
```

The relationship between layers looks like this:

```
                   ┌──────────────────────────────────────┐
                   │         xfina (Rust crate)           │
                   │                                      │
                   │  models/  ←  bank_accounts/          │
                   │           ←  credit_cards/           │
                   │           ←  mutual_funds/           │
                   │           ←  intl_stocks/            │
                   └──────────────┬───────────────────────┘
                                  │
              ┌───────────────────┼───────────────────┐
              ▼                   ▼                   ▼
       src/main.rs           wasm/             python/
         (CLI)           (wasm-bindgen)      (pyo3 + maturin)
              │                   │
              ▼                   ▼
         Terminal            NPM package
                                  │
                                  ▼
                           web/ (Vue 3 app)
                                  │
                                  ▼
                          GitHub Pages
```

The key design principle: **one parser implementation, many delivery targets.** The Rust code is written once, and it's exposed through three different FFI boundaries — CLI, WASM (for JavaScript/browser), and Python — without duplicating any logic.

---

## The Data Models

### ReBIT / AA Standard Compliance

The output schema is built directly on the [Sahamati Account Aggregator specifications](https://sahamati.org.in/). Every financial entity has a counterpart in the ReBIT schema:

- **`DepositAccount`** — savings/current accounts (opening balance, closing balance, transaction list)
- **`CreditCardAccount`** — credit card statements (billing period, due amounts, reward points)
- **`MutualFundsAccount`** — Combined Account Statement (AMC schemes, NAV, transactions)
- **`EquityAccount`** — international broker accounts (trades, corporate actions, positions)

### The Dual Output Format

A key design decision was supporting two output flavors from the same parser:

1. **`xfina` format (default)**: Dates are serialized as Unix timestamps (integers) instead of ISO strings, and the `xfina` extension object with institution-specific metadata is included. This is optimized for programmatic consumption.

2. **`rebit` format**: Strict ReBIT AA schema compliance. The `xfina` extension object is stripped, and date-only fields are kept as `YYYY-MM-DD` strings. This is the format you'd submit to an Account Aggregator API.

The `serializer.rs` module handles the transformation post-serialization by walking the JSON tree:

```rust
// Convert all ISO dates to Unix timestamps for the xfina format
pub fn transform_to_xfina(val: &mut Value) {
    match val {
        Value::String(s) => {
            if let Ok(ndt) = NaiveDate::parse_from_str(s, "%Y-%m-%d") {
                *val = Value::Number(serde_json::Number::from(naive_date_to_epoch(ndt)));
            } else if let Ok(dt) = DateTime::parse_from_rfc3339(s) {
                *val = Value::Number(serde_json::Number::from(dt.timestamp()));
            }
        }
        // recurse into objects and arrays...
    }
}
```

### The `ParseRequest` Builder

All parsers accept a uniform `ParseRequest` struct instead of raw arguments. This makes the API consistent across all parsers and easy to extend:

```rust
pub struct ParseRequest<'a> {
    pub content: &'a [u8],       // raw file bytes
    pub password: Option<&'a str>, // for encrypted PDFs
    pub filename: Option<&'a str>, // helps parsers infer format
    pub modified_timestamp: Option<i64>, // Unix timestamp, helps date inference
}
```

The `modified_timestamp` is a subtle but important field: some bank statement PDFs don't include the statement date in a machine-readable location, so the file's last-modified timestamp is used as a fallback hint for the parser.

---

## The Parsers

### Writing a Parser

Every parser follows the same pattern:

1. **Open the raw bytes** via `calamine` (Excel), `pdf-extract` (PDF), or `csv` (CSV).
2. **Walk the file's structure** using regex and string matching to locate headers, transaction rows, and summary sections.
3. **Map extracted values into the shared model structs** (`DepositAccount`, `CreditCardAccount`, etc.).
4. **Run the validation engine** and return a `ParseResult<T>`.

Here's a simplified view of what the HDFC bank parser does:

```rust
pub fn parse_hdfc_xls(input: ParseRequest) -> Result<ParseResult<DepositAccount>, XfinaError> {
    let cursor = Cursor::new(input.content);
    let mut workbook = open_workbook_auto_from_rs(cursor)?;
    let sheet = workbook.worksheet_range(&sheet_names[0])?;

    // Walk rows, detect sections (headers, summary, transactions)
    for row in sheet.rows() {
        // Extract account number, holder name, statement dates, IFSC, etc.
        // Parse each transaction row: date, narration, amount, type, balance
    }

    // Run validation
    let row_val = check_row_balances(opening_balance, &transaction_tuples);
    let mut report = ValidationReport::default();
    report.row = row_val;
    report.summary.push(SummaryCheck::declared("total_credits", declared_credits, computed_credits, None));
    report.summary.push(SummaryCheck::declared("closing_balance", declared_closing, computed_closing, None));
    report.finalize();

    Ok(ParseResult { data: account, validation: report })
}
```

### Feature Flags

Each parser is gated behind a Cargo feature flag, so downstream users can opt into only what they need:

```toml
[features]
default = ["all"]
all = ["ba-hdfc", "ba-icici", "ba-sbi", "ba-bob", "ba-axis",
       "cc-hdfc", "cc-icici", "mf-cams", "is-ibkr"]

ba-hdfc  = ["calamine", "chrono", "regex", "rust_decimal"]
ba-sbi   = ["pdf-extract", "chrono", "regex", "rust_decimal"]
cc-hdfc  = ["chrono", "regex", "rust_decimal", "num-traits"]
is-ibkr  = ["csv", "chrono", "chrono-tz", "rust_decimal"]
```

This keeps compile times fast and the binary small when only one parser is needed.

---

## The Validation Engine

This is one of the most important parts of Xfina. Parsing financial data without verifying it is dangerous — a missed row or off-by-one in decimal handling could silently produce wrong output.

Every `ParseResult<T>` contains a `ValidationReport`:

```rust
pub struct ValidationReport {
    pub overall: ValidationStatus, // Passed | Warning | Failed
    pub row: RowValidation,        // Level 1: row-by-row balance checks
    pub summary: SummaryValidation, // Level 2: total credits/debits/closing
}
```

### Level 1: Row Validation

For bank accounts, after each transaction, the running balance must satisfy:

```
balance[n] = balance[n-1] ± amount[n]
```

The `check_row_balances` helper runs this check across all transactions:

```rust
pub fn check_row_balances(opening: Decimal, rows: &[(bool, Decimal, Decimal, String)]) -> RowValidation {
    let mut running = opening;
    for (is_credit, amount, printed, narration) in rows {
        running = if *is_credit { running + amount } else { running - amount };
        if running != *printed {
            failed_rows.push(RowCheckFailure { row_index, narration, expected: running, actual: *printed });
            running = *printed; // resync to avoid compounding errors
        }
    }
    // ...
}
```

The resync on failure is a critical detail: if row 10 fails, row 11 should be checked against what row 10 actually declared, not the compounding wrong value.

### Level 2: Summary Validation

After all rows are parsed, the parser pushes `SummaryCheck` entries comparing declared vs. computed totals:

```rust
// Check if total credits in transactions match what's printed in the summary section
report.summary.push(SummaryCheck::declared(
    "total_credits_match",
    declared_total_credits,  // extracted from the Excel summary row
    computed_total_credits,  // summed from all parsed transactions
    None,
));
```

Checks are classified by `SummarySource`:
- **`Declared`**: The institution printed this number. A failure here is a strong signal of a parsing bug.
- **`Derived`**: Inferred from arithmetic (e.g., `opening + credits - debits = closing`). A failure here might be rounding drift.

This distinction drives the overall `ValidationStatus`:
- All passed → `Passed` (green ✓)
- Only `Derived` failures → `Warning` (yellow ⚠)
- Any `Declared` failure → `Failed` (red ✗)

---

## The Error Handling System

In v0.2, we completely replaced stringly-typed errors (`Result<T, String>`) with a strongly-typed `XfinaError` enum using `thiserror`:

```rust
#[derive(Error, Debug)]
pub enum XfinaError {
    #[error("I/O Error: {0}")]
    Io(#[from] std::io::Error),
    #[error("Invalid Format: {0}")]
    InvalidFormat(String),
    #[error("Parse Error: {0}")]
    ParseError(String),
    #[error("Password required to parse this document")]
    PasswordRequired,
    #[error("Incorrect password provided")]
    IncorrectPassword,
    #[error("Feature not supported: {0}")]
    Unsupported(String),
}
```

This matters because WASM and Python bindings can now programmatically distinguish a `PasswordRequired` error from a `ParseError` and show appropriate UI feedback (e.g., a password input prompt vs. a generic error message).

---

## The CLI

Installing and running Xfina from the terminal:

```bash
cargo install xfina --features cli
```

```bash
# Parse an HDFC bank statement
xfina bank-account hdfc statement.xls

# Parse a password-protected SBI statement, output to specific path
xfina bank-account sbi sbi_passbook.pdf --password "dob1990" --output ./output/sbi.json

# Parse a CAMS mutual fund CAS in strict ReBIT format
xfina mutual-fund cams portfolio.pdf --password "PAN_DOB" --format rebit

# Parse an IBKR activity statement
xfina intl-stocks ibkr activity.csv
```

The `Dump` subcommand is a developer tool that extracts raw text from any PDF or XLS file — useful when writing a new parser:

```bash
xfina dump statement.xls
xfina dump encrypted.pdf --password "abc123"
```

---

## WASM Bindings (Browser)

The `wasm/` crate wraps every parser in a `wasm-bindgen` function using a macro:

```rust
macro_rules! create_wasm_binding {
    ($func_name:ident, $parser_func:path) => {
        #[wasm_bindgen]
        pub fn $func_name(
            bytes: &[u8],
            password: Option<String>,
            filename: Option<String>,
            modified_timestamp: Option<i64>,
            format: Option<String>,
        ) -> Result<String, JsValue> {
            let req = ParseRequest::new(bytes)
                .with_password(password.as_deref())
                .with_filename(filename.as_deref())
                .with_modified_timestamp(modified_timestamp);

            match $parser_func(req) {
                Ok(stmt) => {
                    let data_json = if format.as_deref() == Some("rebit") {
                        stmt.data.to_rebit_json()
                    } else {
                        stmt.data.to_xfina_json()
                    };
                    serialize_result(&stmt, data_json)
                }
                Err(e) => Err(JsValue::from_str(&e.to_string())),
            }
        }
    };
}

create_wasm_binding!(parse_hdfc_ba, xfina::bank_accounts::hdfc::parse_hdfc_bank_statement);
create_wasm_binding!(parse_sbi_ba,  xfina::bank_accounts::sbi::parse_sbi_bank_statement);
// ... 7 more
```

Building the WASM package:

```bash
cd wasm
wasm-pack build --target web
```

This generates `wasm/pkg/` — a ready-to-publish NPM package with the compiled `.wasm` binary, a JS wrapper, and TypeScript definitions.

---

## Python Bindings

The `python/` crate uses [PyO3](https://pyo3.rs/) and [Maturin](https://maturin.rs/) with an identical macro pattern:

```rust
macro_rules! create_py_binding {
    ($func_name:ident, $parser_func:path) => {
        #[pyfunction]
        #[pyo3(signature = (bytes, password=None, filename=None, modified_timestamp=None, format=None))]
        fn $func_name(py: Python, bytes: &[u8], ...) -> PyResult<PyObject> {
            // parse → serialize → return as Python dict via pythonize
        }
    };
}
```

Installation and usage:

```bash
pip install xfina
```

```python
import xfina

with open("hdfc_statement.xls", "rb") as f:
    result = xfina.parse_hdfc_ba(f.read())

print(result["validation"]["overall"])  # "passed"
print(result["data"]["summary"]["closingBalance"])
```

---

## The Web App

The `web/` directory is a **Vue 3 + Vite + Tailwind CSS** application that loads the WASM package and parses files entirely in the browser — no server, no upload.

Key features:
- 🔒 **100% client-side** — files never leave the browser
- ⚡ **Rust/WASM performance** — parsing in milliseconds
- 📊 **Rich UI** — statement header, account summary, transaction table, validation badges
- 🌙 **Dark mode** support
- 🔢 **Version selector** — browse all published minor releases via a `versions.json` registry

Running the web app locally:

```bash
# 1. Build the WASM package
cd wasm
wasm-pack build --target web

# 2. Start the Vue dev server
cd ../web
npm install
npm run dev
```

---

## The Deployment Pipeline

This is where things get interesting. Xfina publishes to **four targets simultaneously** on a tagged release, all via GitHub Actions.

### CI: PR Checks (`test.yml`)

Every pull request to `main` triggers:
1. `cargo test` — runs all integration tests
2. `wasm-pack build` — verifies the WASM target compiles

Integration tests use a snapshot pattern to avoid flakiness. Test data lives in a sibling `../xfina-test-data/` directory (not committed, since it contains PII). Tests are skipped in CI when `GITHUB_ACTIONS=true` is set:

```rust
let update_expected = std::env::var("UPDATE_EXPECTED").unwrap_or("0".into());
if update_expected == "1" {
    fs::write(&snapshot_path, &json_output).unwrap();
} else if std::env::var("GITHUB_ACTIONS").unwrap_or_default() != "true" {
    let expected = fs::read_to_string(&snapshot_path).unwrap();
    assert_eq!(expected, json_output);
}
```

### Unreleased Deploy (`deploy-unreleased.yml`)

Every push to `main` triggers a build of the latest unreleased WASM + Vue site and deploys it to the `unreleased/` path on GitHub Pages, so you can always preview the bleeding-edge build.

### Release Publish (`publish.yml`)

Triggered by a git tag (`v*.*.*`), this workflow runs five parallel jobs:

1. **`check_branch`** — verifies the tag is on `main` (prevents accidental releases from feature branches)
2. **`crates_io`** — `cargo publish --package xfina`
3. **`npm`** — `wasm-pack build --target web` → `npm publish --access public --provenance`
4. **`pypi`** — `maturin build --release` → `pypa/gh-action-pypi-publish`
5. **`deploy_docs_tag`** — builds the site and deploys a permanent versioned snapshot

### The `xtask` Deploy System

Website deployment is managed by `cargo xtask deploy-site`, a custom Rust build tool inside the `xtask/` crate. This is a [Cargo xtask](https://github.com/matklad/cargo-xtask) — a pattern for embedding build automation as a first-class Rust project so all tooling stays in the same language and repository.

The deploy flow:

1. Uses `git worktree` to check out the `gh-pages` branch into a temp directory alongside the main repo
2. Builds the WASM package (`wasm-pack build --target web`)
3. Builds the Vue app (`vite build`) with `VITE_APP_VERSION` and `__COMMIT_HASH__` injected as environment variables
4. Writes the built assets into the appropriate path on the `gh-pages` worktree:
   - `--unreleased` → writes to `unreleased/`
   - `--tag v0.2.1` → writes to `0.2/` and updates the root `/` symlink to this version
5. Generates/updates `versions.json` — a registry file the Vue app reads to build its version dropdown
6. Commits and force-pushes to `gh-pages`

The versioning scheme uses minor versions (`0.1`, `0.2`) as the stable URL prefix, so `https://xfina.sakthipriyan.com/0.2/` always points to the latest patch in that minor series, while `https://xfina.sakthipriyan.com/` always mirrors the overall latest.

---

## Testing Strategy

### Snapshot Tests

Since financial statement parsing is inherently about exact output format, snapshot testing is the primary strategy. Each parser has an integration test that:

1. Reads a real (anonymized) statement from `../xfina-test-data/`
2. Parses it
3. Compares the JSON output against a committed snapshot file

To update snapshots after a model change:

```bash
UPDATE_EXPECTED=1 cargo test
```

### Determinism Fixes

One subtle issue: the IBKR parser originally used `HashMap` and `HashSet` for grouping trades by ticker and currency. HashMap iteration order is non-deterministic, so snapshot tests were flaky. The fix was to replace them with `BTreeMap` and `BTreeSet`, which always iterate in sorted key order.

---

## Adding a New Parser

The `CONTRIBUTING.md` outlines the full flow, but here's the checklist:

1. **Create the parser module** in `src/bank_accounts/`, `src/credit_cards/`, etc.
2. **Return `Result<ParseResult<T>, XfinaError>`** — use `?` for propagation
3. **Add a feature flag** in `Cargo.toml` and include it in `all`
4. **Export in `src/lib.rs`**
5. **Add to CLI** in `src/main.rs` (new `Category`/`Institution` enum variant + match arm)
6. **Add WASM binding** in `wasm/src/lib.rs` (`create_wasm_binding!` macro)
7. **Add Python binding** in `python/src/lib.rs` (`create_py_binding!` macro + register in `#[pymodule]`)
8. **Add UI support** in `web/src/App.vue`
9. **Write integration tests** in `tests/` using the snapshot pattern

---

## What I Learned

**Rust's type system pays for itself on FFI boundaries.** Having `XfinaError` as a typed enum meant each binding layer (WASM, Python, CLI) could handle errors meaningfully. When errors were `String`, the bindings had no way to distinguish a password error from a format error.

**The `xtask` pattern is underrated.** Keeping deployment logic as a Rust program in the same workspace means you get type-checked, refactorable, testable build automation with no separate shell script maintenance.

**Snapshot tests are essential for parsers.** The surface area of parsing is huge — any field mapping change can silently break downstream consumers. Having a committed snapshot for each parser makes regressions instantly visible.

**The `modified_timestamp` hint is surprisingly important.** Several banks don't include a machine-readable statement date in the file itself. Using the file's modification time as a fallback heuristic significantly improved date inference accuracy, especially for SBI PDF statements.

**BTreeMap over HashMap for deterministic serialization.** Whenever a data structure is serialized to JSON as part of a test assertion, use `BTreeMap`/`BTreeSet` over `HashMap`/`HashSet`. The extra sort overhead is negligible compared to the headache of flaky snapshot tests.

---

## Links

- **GitHub**: [github.com/sakthipriyan/xfina](https://github.com/sakthipriyan/xfina)
- **Web App**: [xfina.sakthipriyan.com](https://xfina.sakthipriyan.com/)
- **Crates.io**: [crates.io/crates/xfina](https://crates.io/crates/xfina)
- **NPM**: [@sakthipriyan/xfina-wasm](https://www.npmjs.com/package/xfina-wasm)
- **PyPI**: [pypi.org/project/xfina](https://pypi.org/project/xfina/)

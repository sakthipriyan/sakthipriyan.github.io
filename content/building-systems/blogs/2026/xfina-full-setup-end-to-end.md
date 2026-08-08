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
  - architecture
  - cloud
  - devops
  - design
js_tools:
  - d2
---

## The Problem

Every time I wanted a consolidated view of my finances — bank statements, credit card bills, mutual fund portfolios, international brokerage activity — I had to manually open each institution's portal, download their proprietary PDF or Excel file, and reconcile everything by hand.

The existing options were either Account Aggregators (useful, but require consent frameworks and institutional agreements), manual spreadsheets (brittle, no validation), or paid upload-based services (a non-starter for privacy-conscious users).

I wanted something different: **a fast, local, open-source parser** that understands the proprietary formats used by Indian banks and brokerages, and outputs clean, structured JSON.

That project is [Xfina](https://github.com/sakthipriyan/xfina).

---

## What Xfina Does

Xfina parses financial statements directly from raw file bytes — PDFs, Excel sheets, CSVs — and outputs structured JSON conforming to the [ReBIT Account Aggregator (AA) schema](https://api.rebit.org.in/), with optional extensions for richer data.

As of v0.2.1:

| <span style="white-space:nowrap">Category</span> | Institution / Provider | Format | Status | Notes |
|---|---|---|---|---|
| <span style="white-space:nowrap">🏦 Bank Account</span> | Axis Bank | XLS | ✅ | Full support |
| <span style="white-space:nowrap">🏦 Bank Account</span> | Bank of Baroda | XLS | ✅ | Full support |
| <span style="white-space:nowrap">🏦 Bank Account</span> | HDFC Bank | XLS | ✅ | Full support |
| <span style="white-space:nowrap">🏦 Bank Account</span> | ICICI Bank | XLS | ✅ | Full support |
| <span style="white-space:nowrap">🏦 Bank Account</span> | State Bank of India | PDF (password protected) | ✅ | Full support |
| <span style="white-space:nowrap">💳 Credit Card</span> | Axis Bank | - | ⏳ | Waiting for the statement to be generated |
| <span style="white-space:nowrap">💳 Credit Card</span> | HDFC Bank | CSV | ✅ | Full support incl. add-on cardholders, reward points |
| <span style="white-space:nowrap">💳 Credit Card</span> | ICICI Bank | XLS | ✅ | Tested card without any add-on cards |
| <span style="white-space:nowrap">📈 Mutual Funds</span> | CAMS | PDF (password protected) | ✅ | Combined Account Statement (CAS) |
| <span style="white-space:nowrap">📈 Mutual Funds</span> | KFinTech | PDF (password protected) | ⏳ | Combined Account Statement (CAS) |
| <span style="white-space:nowrap">🌍 Intl Brokers</span> | Interactive Brokers (IBKR) | CSV | ✅ | Activity statements |

*Note: Bank Account parsers have not been tested with Joint Accounts.*

---

## Why Rust, and How It Unlocked Five Interfaces for Free

The choice of Rust was primarily about correctness and performance for parsing financial data — but it turned out to be the most important architectural decision for a completely different reason: **Rust compiles to WebAssembly**, which made it trivially easy to ship the same parsing logic to five different runtime targets without rewriting a single line of core code.

```d2
core: Xfina Core {
  style.fill: "#1e293b"
  style.font-color: white
  label: "Xfina Core (Rust)\nParsers · Models · Validation"
}

cli: CLI\n(cargo install xfina) {
  style.fill: "#0f172a"
  style.font-color: white
}

rustlib: Rust Library\n(crates.io) {
  style.fill: "#0f172a"
  style.font-color: white
}

wasm: WASM Module\n(npm) {
  style.fill: "#0f172a"
  style.font-color: white
}

pylib: Python Library\n(PyPI) {
  style.fill: "#0f172a"
  style.font-color: white
}

webapp: Web App\n(GitHub Pages) {
  style.fill: "#0f172a"
  style.font-color: white
}

core -> cli: Clap
core -> rustlib: crate API
core -> wasm: wasm-bindgen
core -> pylib: PyO3 + Maturin
wasm -> webapp: xfina-wasm npm pkg
```

Each target required only a thin binding layer — typically a macro that wires a parser function to a different calling convention:

- **Rust library** — zero overhead, just the public crate API
- **CLI** — Clap argument parsing on top, a handful of match arms
- **Python** — a `create_py_binding!` macro per parser, PyO3 handles the ABI
- **JS / NPM** — a `create_wasm_binding!` macro per parser, wasm-bindgen generates the glue
- **Web app** — Vue 3 imports the NPM package, calls the WASM functions directly in the browser

The same core logic that validates a running balance or maps an XLS row to a `DepositAccount` struct runs identically in a Rust binary, inside a Python process, and in a browser tab with no servers involved. **That's the WASM payoff.**

If this had been built in Python or Node first, adding a Rust CLI or browser support would have required a rewrite. Choosing Rust as the single source of truth made every other target a consequence of that choice, not a separate project.

---

## Architecture

The project is a **Cargo workspace** with four crates — `xfina` (the core library), `xfina-wasm`, `xfina-py`, and `xtask` (the build tool) — plus the `web/` Vue app:

```
xfina/
├── src/               # Core library: parsers, models, validation, CLI
├── wasm/              # WASM bindings (wasm-bindgen)
├── python/            # Python bindings (pyo3 + maturin)
├── xtask/             # Custom build & deployment scripts
└── web/               # Vue 3 + Vite frontend
```

The key design principle: **write the parser once, expose it everywhere.** All three binding layers share the same `ParseRequest` builder struct and the same `ParseResult<T>` return type.

---

## The Data Models

The output schema is built directly on the [Sahamati Account Aggregator specifications](https://sahamati.org.in/):

- **`DepositAccount`** — savings/current accounts (opening balance, closing balance, transaction list)
- **`CreditCardAccount`** — credit card statements (billing period, due amounts, reward points)
- **`MutualFundsAccount`** — Combined Account Statement (AMC schemes, NAV, transactions)
- **`EquityAccount`** — international broker accounts (trades, corporate actions, positions)

### Dual Output Format

Every parser supports two output flavors via a `format` parameter:

- **`xfina` (default)** — Dates as Unix timestamps, includes the `xfina` extension object with institution-specific metadata. Optimized for programmatic consumption.
- **`rebit`** — Strict ReBIT AA schema compliance. The `xfina` extension is stripped, date-only fields stay as `YYYY-MM-DD` strings. Use this for AA API submission.

The transformation is a post-serialization pass that walks the JSON tree and converts or strips fields accordingly.

### The `ParseRequest` Builder

All parsers accept a uniform `ParseRequest` struct — file bytes, an optional password, an optional filename hint, and an optional `modified_timestamp`. The last field is subtler than it looks: several bank PDFs don't include a machine-readable statement date, so the file's last-modified timestamp is used as a fallback hint to improve date inference.

---

## The Parsers

Every parser follows the same four steps:

1. **Open the raw bytes** via `calamine` (Excel), `pdf-extract` (PDF), or `csv`.
2. **Walk the file's structure** using regex and string matching to locate headers, transaction rows, and summary sections.
3. **Map extracted values** into the shared model structs.
4. **Run the validation engine** and return a `ParseResult<T>`.

Each parser is gated behind a Cargo feature flag — `ba-hdfc`, `cc-hdfc`, `mf-cams`, etc. — so downstream users compile only what they need. XLS parsers pull in `calamine`, PDF parsers pull in `pdf-extract`, and CSV parsers pull in `csv`. None of these bleed into each other.

---

## The Validation Engine

Parsing financial data without verifying it is dangerous — a missed row or decimal rounding error could silently produce wrong output. Every `ParseResult<T>` carries a `ValidationReport` with two levels of checks.

**Level 1 — Row validation:** For each consecutive transaction pair in a bank statement, the engine checks that `balance[n] = balance[n−1] ± amount[n]`. When a row fails, the engine resyncs to the printed balance before continuing — this is intentional, so a single bad row doesn't cascade into compounding failures on every subsequent row.

**Level 2 — Summary validation:** After all rows are parsed, the engine compares declared vs. computed totals (total credits, total debits, closing balance). Checks are classified by source:

- **`Declared`** — the institution printed this number. A failure is a strong signal of a parsing bug.
- **`Derived`** — inferred from arithmetic (e.g. `opening + credits − debits = closing`). A failure might be rounding drift.

This drives the overall `ValidationStatus`: all passed → green ✅, only derived failures → yellow ⚠, any declared failure → red ✗. The web app renders these as visual badges on every parsed statement.

---

## Error Handling

Early versions used stringly-typed `Result<T, String>` errors. This was replaced in v0.2 with a typed `XfinaError` enum via `thiserror` — variants include `PasswordRequired`, `IncorrectPassword`, `InvalidFormat`, and `ParseError`. The reason this matters: WASM and Python bindings can now programmatically distinguish a password prompt situation from a parse failure and show different UI feedback accordingly.

---

## The CLI

```bash
cargo install xfina --features cli

xfina bank-account hdfc statement.xls
xfina bank-account sbi passbook.pdf --password "dob1990"
xfina mutual-fund cams portfolio.pdf --password "PAN_DOB" --format rebit
xfina intl-stocks ibkr activity.csv --output ./exports/ibkr.json
```

There's also a `dump` subcommand that extracts raw text from any PDF or XLS — the primary tool for reverse-engineering a new statement format before writing a parser.

---

## The Web App

The `web/` directory is a **Vue 3 + Vite + Tailwind CSS** application. It imports the `xfina-wasm` NPM package and calls the WASM parse functions directly on file drop — files never leave the browser.

Key details:
- Statement header, account summary, and transaction table are rendered per statement type
- Validation badges (✅ / ⚠ / ✗) are shown for each parsed result
- A version selector reads `versions.json` to let users browse any published minor release at `/0.1/`, `/0.2/`, etc.
- Dark mode support via `@vueuse/core`

---

## The Deployment Pipeline

A tagged release (`v*.*.*`) triggers five parallel GitHub Actions jobs:

1. **`check_branch`** — ensures the tag is on `main`, blocking accidental releases from feature branches
2. **`crates_io`** — `cargo publish`
3. **`npm`** — `wasm-pack build --target web` → `npm publish --provenance`
4. **`pypi`** — `maturin build --release` → `pypa/gh-action-pypi-publish`
5. **`deploy_docs_tag`** — builds the versioned site and deploys to GitHub Pages

Every push to `main` also triggers a separate `deploy-unreleased.yml` workflow that deploys the latest build to `/unreleased/` so the bleeding-edge state is always previewable.

### The `xtask` Deploy System

Website deployment runs via `cargo xtask deploy-site` — a [Cargo xtask](https://github.com/matklad/cargo-xtask) that keeps all build automation as a first-class Rust program in the same workspace. It uses `git worktree` to check out `gh-pages` into a temp directory, builds the WASM and Vue bundles, writes assets to the right versioned path, updates `versions.json`, and force-pushes. The versioning scheme uses minor versions as stable URL prefixes (`/0.2/` always points to the latest patch in that series).

---

## Testing Strategy

Snapshot testing is the primary strategy. Each parser has an integration test that reads a real (anonymized) statement from a sibling `../xfina-test-data/` directory (not committed — it contains PII), parses it, and compares JSON output against a committed snapshot. Snapshots are updated locally with `UPDATE_EXPECTED=1 cargo test` and skipped in CI (where test data isn't available) via an `GITHUB_ACTIONS` env check.

One important fix: the IBKR parser originally used `HashMap`/`HashSet` for grouping trades. Hash iteration order is non-deterministic, which made snapshots flaky. Switching to `BTreeMap`/`BTreeSet` — which always iterate in sorted order — fixed it entirely.

---

## Adding a New Parser

1. Create the module in `src/bank_accounts/`, `src/credit_cards/`, etc.
2. Return `Result<ParseResult<T>, XfinaError>` — use `?` for propagation
3. Add a feature flag in `Cargo.toml` and include it in `all`
4. Export in `src/lib.rs`, add to the CLI match arms, add a `create_wasm_binding!` call, add a `create_py_binding!` call, and add UI support in `web/src/App.vue`
5. Write an integration test in `tests/` using the snapshot pattern

---

## What I Learned

**Rust for WASM unlocks a write-once, ship-everywhere model.** One codebase, five delivery targets with only thin binding layers separating them. The WASM payoff is real.

**The `xtask` pattern keeps build tooling maintainable.** All deployment logic is type-checked Rust in the same repo — no bash scripts, no drift between CI YAML and local commands.

**Snapshot tests are non-negotiable for parsers.** Any field mapping change is immediately visible as a diff. Without them, regressions are discovered by users.

**`BTreeMap` over `HashMap` whenever you serialize to JSON in tests.** Non-deterministic iteration order is a silent test flakiness source.

**`modified_timestamp` as a date inference hint.** When institutions don't embed the statement date in a machine-readable field, the file's last-modified time turns out to be a surprisingly reliable fallback.

---

## Links

- **GitHub**: [github.com/sakthipriyan/xfina](https://github.com/sakthipriyan/xfina)
- **Web App**: [xfina.sakthipriyan.com](https://xfina.sakthipriyan.com/)
- **Crates.io**: [crates.io/crates/xfina](https://crates.io/crates/xfina)
- **NPM**: [xfina-wasm](https://www.npmjs.com/package/xfina-wasm)
- **PyPI**: [pypi.org/project/xfina](https://pypi.org/project/xfina/)

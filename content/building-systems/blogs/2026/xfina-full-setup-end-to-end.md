---
type: blogs
title: "Xfina: One Rust Core, Five Interfaces — Building a Privacy-First Financial Statement Parser"
date: "2026-08-08"
draft: true
summary: "Parsing Indian financial statements locally with Rust, WebAssembly, and a single shared core across Rust, Python, JavaScript, CLI, and the web."
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

## The Introduction

Years ago, in the pre-AI era, I manually gathered all my bank statements and created a consolidated report. Through this exercise, I discovered a few financial leakages and addressed them. However, because it was all done manually, it took an enormous amount of time and effort. While I wanted to repeat the exercise, the friction was simply too high, and I eventually stopped doing it.

Currently, I manually tag my credit card entries every month and ensure the bills are paid from the corresponding bank accounts. There is a lot of manual tagging and planning involved in allocating cash flow across accounts and setting aside monthly investments. Once the monthly investment is allocated, I have various systems in place to automate the execution planning — but the upfront data extraction is a major bottleneck. I want to build a complete system where I can simply dump all my statements, define my policies, and have the system tell me exactly what to do based on those policies.

Every time I wanted this consolidated view of my finances — bank statements, credit card bills, mutual fund portfolios, international brokerage activity — I had to manually open each institution's portal, download their proprietary PDF or Excel file, and reconcile everything by hand.

The existing automated options were either Account Aggregators (useful, but require consent frameworks and institutional agreements), manual spreadsheets (brittle, no validation), or paid upload-based services (a non-starter for privacy-conscious users).

Sometime back, I made an initial attempt at solving this for my [RealValue Portfolio](https://sakthipriyan.com/building-wealth/tools/realvalue-portfolio/) project. I used `pdf.js` to build a browser-only parsing engine. While it preserved privacy, development iteration was severely limited to browser-based testing, and the parser was locked into being a web-only tool that only supported CAMS mutual funds and IBKR. The WASM upgrade is a significant leap, expanding support to a wide variety of bank accounts and credit cards.

I wanted something different and far more powerful: **a fast, local, open-source parser** that understands the proprietary formats used by Indian banks and brokerages, and outputs clean, structured JSON.

That project is [Xfina](https://github.com/sakthipriyan/xfina). Ultimately, this parser serves as the foundational data-extraction layer for that larger stealth project I am working on to completely automate my financial policy execution.

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

## Why Rust, and How It Unlocked Five Interfaces for Free

The choice of Rust was primarily about correctness and performance, but it turned out to be the most important architectural decision for a completely different reason: **Rust compiles to WebAssembly**, which made it trivially easy to ship the same parsing logic to five different runtime targets without rewriting a single line of core code.

```d2
core: Xfina Core {
  style.fill: "#2c3e50"
  style.font-color: white
  label: "Xfina Core (Rust)\nParsers · Models · Validation"
}

cli: CLI\n(cargo install xfina) {
  style.fill: "#2c3e50"
  style.font-color: white
}

rustlib: Rust Library\n(crates.io) {
  style.fill: "#2c3e50"
  style.font-color: white
}

wasm: WASM Module\n(npm) {
  style.fill: "#2c3e50"
  style.font-color: white
}

pylib: Python Library\n(PyPI) {
  style.fill: "#2c3e50"
  style.font-color: white
}

webapp: Web App\n(GitHub Pages) {
  style.fill: "#2c3e50"
  style.font-color: white
}

core -> cli: Clap
core -> rustlib: crate API
core -> wasm: wasm-bindgen
core -> pylib: PyO3 + Maturin
wasm -> webapp: xfina-wasm npm pkg
```

Each target required only a thin binding layer — typically a macro that wires a parser function to a different calling convention. The same core logic that validates a running balance or maps an XLS row to a `DepositAccount` struct runs identically in a Rust binary, inside a Python process, and in a browser tab with no servers involved. **That's the WASM payoff.**

### AI and the Learning Curve

I built Xfina using **Anti Gravity**, alternating between Gemini Pro and Claude models. In an AI code-generated world, the notoriously steep learning curve of Rust is no longer an impediment. As long as you have a tight feedback loop and strong test suites covering various use cases, you can iterate incredibly fast in a strictly typed, compiled language.

That said, compiled languages demand resources. While I could comfortably do JavaScript development on my old 2017 MacBook Pro, I had to upgrade my machine for this Rust project to maximize my limited time and maintain parallel progress across the workspace.



## Five Interfaces, One Core: The Demos

This project marked a major personal milestone: it was the first time I ever published code to public package repositories, hitting Crates.io, NPM, and PyPI all in one go. Here is how you consume the exact same parser across all five interfaces:

### 1. The Rust Library
```rust
use xfina::bank_accounts::hdfc::parse_hdfc_bank_statement;
use xfina::models::request::ParseRequest;

let req = ParseRequest::new(&file_bytes).with_filename("statement.xls");
let result = parse_hdfc_bank_statement(req).unwrap();
println!("Validation status: {:?}", result.validation.overall);
```

### 2. The CLI Tool
```bash
cargo install xfina --features cli

xfina bank-account hdfc statement.xls
xfina mutual-fund cams portfolio.pdf --password "PAN_DOB" --format rebit
```

### 3. The Python Bindings (PyPI)
```bash
pip install xfina
```
```python
import xfina
with open("hdfc_statement.xls", "rb") as f:
    result = xfina.parse_hdfc_ba(f.read())
print(result["validation"]["overall"])
```

### 4. The JS/WASM Module (NPM)
```bash
npm install xfina-wasm
```
```javascript
import init, { parse_hdfc_ba } from 'xfina-wasm';

await init(); // Initialize WASM
const bytes = new Uint8Array(await file.arrayBuffer());
const jsonString = parse_hdfc_ba(bytes, null, file.name, null, "xfina");
const result = JSON.parse(jsonString);
```

### 5. The Web App
A Vue 3 application that imports the NPM package and parses files locally on drop. Try it live at [xfina.sakthipriyan.com](https://xfina.sakthipriyan.com/).

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

## The Data Models

The output schema is built directly on the [Sahamati Account Aggregator specifications](https://sahamati.org.in/):

- **`DepositAccount`** — savings/current accounts
- **`CreditCardAccount`** — credit card statements
- **`MutualFundsAccount`** — Combined Account Statement (CAS)
- **`EquityAccount`** — international broker accounts

Every parser supports two output flavors via a `format` parameter:
- **`xfina` (default)** — Dates as Unix timestamps, includes the `xfina` extension object with institution-specific metadata. 
- **`rebit`** — Strict ReBIT AA schema compliance. The `xfina` extension is stripped, date-only fields stay as `YYYY-MM-DD` strings.

## The Parsers & Validation Engine

Parsing financial data without verifying it is dangerous — a missed row or decimal rounding error could silently produce wrong output. Every `ParseResult<T>` carries a `ValidationReport` with two levels of checks:

**Level 1 — Row validation:** For each consecutive transaction pair in a bank statement, the engine checks that `balance[n] = balance[n−1] ± amount[n]`. When a row fails, the engine resyncs to the printed balance before continuing, ensuring a single bad row doesn't cascade into compounding failures.

**Level 2 — Summary validation:** The engine compares declared vs. computed totals (total credits, total debits, closing balance). Checks are classified as either **`Declared`** (the institution printed this number) or **`Derived`** (inferred from arithmetic). 

This drives the overall `ValidationStatus`: all passed → green ✅, only derived failures → yellow ⚠, any declared failure → red ✗. 

## The Deployment Pipeline

Automation is handled by three distinct GitHub Actions workflows:

1. **`test.yml` (PR Checks)** — Runs `cargo test` and verifies the WASM target compiles on every pull request.
2. **`deploy-unreleased.yml` (Continuous Preview)** — Every push to `main` triggers a build of the latest WASM + Vue site and deploys it to the `/unreleased/` path on GitHub Pages.
3. **`publish.yml` (Release)** — Triggered by a git tag (`v*.*.*`), this orchestrates five parallel jobs to publish to Crates.io, NPM, PyPI, and deploy the versioned docs.

### Multi-Versioned Website

We maintain a multi-versioned website to ensure stability. The **Unversioned** site is continuously published from `main` HEAD. I use this to verify the WASM and UI integration in the real world *before* cutting a tag. 

Once verified, cutting a tag triggers the release workflow, which publishes the modules to the package management systems. Website deployment runs via `cargo xtask deploy-site` — a custom Rust build tool in the workspace. It builds the bundles, writes assets to a versioned path (like `/0.2/`), updates a `versions.json` registry, and force-pushes to `gh-pages`. The versioning scheme uses minor versions as stable URL prefixes, while the root URL always mirrors the overall latest release.

## Testing Strategy

Snapshot testing is the primary strategy. Each parser has an integration test that reads a real statement, parses it, and compares JSON output against a committed snapshot. 

Because financial statements contain highly sensitive PII, **testing is strictly limited to real (but private) files checked into a private sibling repository**, and tests are run locally. I plan to include these tests in the CI pipeline eventually, but I need to be extremely careful to ensure no data is ever leaked in the GitHub Actions logs.

*(One important technical fix: the IBKR parser originally used `HashMap`/`HashSet` for grouping trades. Hash iteration order is non-deterministic, which made snapshots flaky. Switching to `BTreeMap`/`BTreeSet` — which always iterate in sorted order — fixed it entirely.)*

## Performance: `casparser` vs Xfina

The efficiency of the underlying language is immediately evident when comparing the popular Python project `casparser` against the new `xfina` Python library. Because Xfina does the heavy lifting in compiled Rust and only hands the final dictionary back to Python, it is orders of magnitude faster and operates with a microscopic memory profile.

To put numbers to this, I ran a local benchmark using 13 real (but anonymized) CAMS CAS PDF statements from the `xfina-test-data` repository. Both libraries parsed the exact same 13 files:

```python
import time
import casparser
import xfina

# 1. Benchmark casparser
start = time.time()
for pdf in pdfs:
    casparser.read_cas_pdf(pdf, passwords[pdf])
cas_time = time.time() - start

# 2. Benchmark xfina
start = time.time()
for pdf in pdfs:
    with open(pdf, "rb") as f:
        pdf_bytes = f.read()
    xfina.parse_cams(pdf_bytes, password=passwords[pdf])
xfina_time = time.time() - start
```

- **`casparser`**: ~6.08 seconds
- **`xfina`**: ~0.47 seconds

**Xfina is roughly 13x faster** on the exact same workload. When you are processing hundreds of statements in a batch pipeline or a web backend, that difference is architectural.

## What I Learned

**Rust for WASM unlocks a write-once, ship-everywhere model.** One codebase, five delivery targets with only thin binding layers separating them. The WASM payoff is real.

**The `xtask` pattern keeps build tooling maintainable.** All deployment logic is type-checked Rust in the same repo — no bash scripts, no drift between CI YAML and local commands.

**Snapshot tests are non-negotiable for parsers.** Any field mapping change is immediately visible as a diff. Without them, regressions are discovered by users.

**`modified_timestamp` as a date inference hint.** When institutions don't embed the statement date in a machine-readable field, the file's last-modified time turns out to be a surprisingly reliable fallback.

## Links

- **GitHub**: [github.com/sakthipriyan/xfina](https://github.com/sakthipriyan/xfina)
- **Web App**: [xfina.sakthipriyan.com](https://xfina.sakthipriyan.com/)
- **Crates.io**: [crates.io/crates/xfina](https://crates.io/crates/xfina)
- **NPM**: [xfina-wasm](https://www.npmjs.com/package/xfina-wasm)
- **PyPI**: [pypi.org/project/xfina](https://pypi.org/project/xfina/)

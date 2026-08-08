---
type: blogs
title: "Xfina: One Rust Core, Five Interfaces — Building a Privacy-First Financial Statement Parser"
date: "2026-08-08"
draft: false
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


## Why I Built Xfina

Years ago, before AI, I manually consolidated my bank statements to understand where my money was going, identify financial leakages, and measure my savings rate. It worked, but the effort made it too painful to repeat.

The underlying problem was bigger: **financial data is fragmented across institutions and trapped in proprietary formats.** Before it can be analyzed or automated, it needs to be extracted, normalized, and validated.

I wanted a **fast, privacy-first, local, open-source parser** that could turn these statements into structured financial data. I also wanted to **build it fast**—supporting many formats without sacrificing correctness or maintainability.

My first attempt was for my [RealValue Portfolio](https://sakthipriyan.com/building-wealth/tools/realvalue-portfolio/) project, where I built a browser-only parser using `pdf.js`. It kept financial data entirely on the user's machine, but was difficult to develop and limited to CAMS mutual funds and IBKR.

That led to **[Xfina](https://github.com/sakthipriyan/xfina)**: a Rust-based parsing engine with a single core exposed through Rust, CLI, Python, JavaScript/WASM, and a browser-based web app. Rust provides the performance and strong typing; WASM lets the same core run locally in the browser; comprehensive tests keep rapid development safe.

Xfina is now the data-extraction foundation for a larger **stealth project** I’m building to automate financial workflows. The goal was simple: **fast to run, fast to build, and fast to evolve—without compromising privacy.**

## What Xfina Does

Xfina parses financial statements from raw file bytes — PDFs, Excel sheets, CSVs — and outputs structured JSON data.

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

*Note: Bank account parsers have not yet been tested with joint accounts. Add-on card support varies by credit-card parser.*

### Output Schema

One important decision was to build on top of the [Sahamati Account Aggregator (AA) and ReBIT standards](https://api.rebit.org.in/) rather than inventing another financial data model. It provided a solid, existing foundation for representing accounts and transactions, while still leaving room for Xfina-specific extensions. Where the current schema cannot express useful institution-specific or parser-derived information, Xfina adds an `xfina` extension rather than forcing those fields into an incompatible model or discarding them. (CSV export support will be added soon as part of GitHub issue [#42](https://github.com/sakthipriyan/xfina/issues/42)).

## Why Rust: One Core, Five Interfaces

Rust compiles to WebAssembly, which made it possible to reuse the same parsing logic across five runtime targets without rewriting the core.

```d2
core: Xfina Core {
  style.fill: "#764ba2"
  style.font-color: white
  label: "Xfina Core (Rust)\nParsers · Models · Validation"
}

cli: CLI\n(cargo install xfina) {
  style.fill: "#764ba2"
  style.font-color: white
}

rustlib: Rust Library\n(crates.io) {
  style.fill: "#764ba2"
  style.font-color: white
}

wasm: WASM Module\n(npm) {
  style.fill: "#764ba2"
  style.font-color: white
}

pylib: Python Library\n(PyPI) {
  style.fill: "#764ba2"
  style.font-color: white
}

webapp: Web App\n(GitHub Pages) {
  style.fill: "#764ba2"
  style.font-color: white
}

core -> cli: Clap
core -> rustlib: crate API
core -> wasm: wasm-bindgen
core -> pylib: PyO3 + Maturin
wasm -> webapp: xfina-wasm npm pkg
```
*(Note: The CLI and Rust Library are the exact same crate, compiled with different feature flags).*

Each target required only a thin binding layer — typically a macro that wires a parser function to a different calling convention. The same core logic that validates a running balance or maps an XLS row to a `DepositAccount` struct runs identically in a Rust binary, inside a Python process, and in a browser tab with no servers involved. **That's the WASM payoff.**

### AI and the Learning Curve

I built Xfina using **Antigravity**, alternating between Gemini Pro and Claude models. AI doesn't eliminate Rust's learning curve, but it dramatically shortens the feedback loop. With the compiler and a strong test suite continuously checking the generated code, I could iterate on a language I was still learning without sacrificing the safety benefits that attracted me to Rust in the first place.

Performance was therefore a two-sided requirement: **the system needed to run fast, and I needed to build it fast.** Rust addressed the first; AI-assisted development, strong typing, and aggressive testing helped address the second.

That said, compiled languages demand resources. While I could comfortably do JavaScript development on my old 2017 MacBook Pro, I had to upgrade my machine for this Rust project to maximize my limited time and maintain parallel progress across the git worktree.

## Five Interfaces, One Core: The Demos

This project marked a major personal milestone: it was the first time I ever published code to public package repositories, hitting Crates.io, NPM, and PyPI all in one go. Here is how you consume the exact same parser across all five interfaces:

### 1. The Rust Library

**Install** [![Crates.io](https://img.shields.io/crates/v/xfina.svg?color=orange)](https://crates.io/crates/xfina)
Add the dependency to your `Cargo.toml`:
```toml
[dependencies]
xfina = "0.2.1"
```

**Usage**
```rust
use xfina::bank_accounts::hdfc::parse_hdfc_bank_statement;
use xfina::models::request::ParseRequest;

let req = ParseRequest::new(&file_bytes).with_filename("statement.xls");
let result = parse_hdfc_bank_statement(req).unwrap();
println!("Validation status: {:?}", result.validation.overall);
```

### 2. The CLI Tool

**Install** [![Crates.io](https://img.shields.io/crates/v/xfina.svg?color=orange)](https://crates.io/crates/xfina)
```bash
cargo install xfina --features cli
```

**Usage**
```bash
xfina bank-account hdfc statement.xls
xfina mutual-fund cams portfolio.pdf --password "XXXXXXXXXX"
```

### 3. The Python Bindings (PyPI)

**Install** [![PyPI](https://img.shields.io/pypi/v/xfina.svg?color=blue)](https://pypi.org/project/xfina/)
```bash
pip install xfina
```

**Usage**
```python
import xfina
with open("hdfc_statement.xls", "rb") as f:
    result = xfina.parse_hdfc_ba(f.read())
print(result["validation"]["overall"])
```

### 4. The JS/WASM Module (NPM)

NPM’s automated name-similarity and anti-typosquatting protections prevented me from publishing `xfina`, with the error: **“Package name too similar to existing package find.”**

So, rather than introducing a different name, I simply reused the `xfina-wasm` package name for the WebAssembly bindings.

**Install** [![npm](https://img.shields.io/npm/v/xfina-wasm.svg?color=yellow)](https://www.npmjs.com/package/xfina-wasm)
```bash
npm install xfina-wasm
```

**Usage**
```javascript
import init, { parse_hdfc_ba } from 'xfina-wasm';

await init(); // Initialize WASM
const bytes = new Uint8Array(await file.arrayBuffer());
const jsonString = parse_hdfc_ba(bytes, null /* password */, file.name, null /* account_id */, "xfina");
const result = JSON.parse(jsonString);
```

### 5. The Web App

**Install**
You just need a browser!

**Usage**
A Vue 3 application that imports the NPM package and parses files locally on drop. Try it live at [xfina.sakthipriyan.com](https://xfina.sakthipriyan.com/).

## Architecture

The project is a **Cargo workspace** with four crates — `xfina` (the core library), `xfina-wasm`, `xfina-py`, and [`xtask`](https://github.com/sakthipriyan/xfina/tree/main/xtask) (the build tool) — plus the `web/` Vue app:

```
xfina/
├── src/               # Core library: parsers, models, validation, CLI
├── wasm/              # WASM bindings (wasm-bindgen)
├── python/            # Python bindings (pyo3 + maturin)
├── xtask/             # Custom build & deployment scripts
└── web/               # Vue 3 + Vite frontend
```

The key design principle: **write the parser once, expose it everywhere.** All three binding layers share the same `ParseRequest` builder struct and the same `ParseResult<T>` return type. By passing raw bytes to the core rather than file paths, the parsing logic remains completely side-effect-free — which is exactly why the same core functions can run inside a Rust binary, a Python process, and a browser tab without filesystem access.

## The Data Models

The output schema is built directly on the Sahamati AA and ReBIT standards:

- **`DepositAccount`** — savings/current accounts
- **`CreditCardAccount`** — credit card statements
- **`MutualFundsAccount`** — Combined Account Statement (CAS)
- **`EquityAccount`** — international broker accounts

Every parser supports two output flavors via a `format` parameter:
- **`xfina` (default)** — Dates as Unix timestamps, includes the `xfina` extension object with institution-specific metadata. 
- **`rebit`** — Strict ReBIT AA schema compliance. The `xfina` extension is stripped, date-only fields stay as `YYYY-MM-DD` strings.

## Robust Validation

Parsing financial data without verifying it is dangerous — a missed row or decimal rounding error could silently produce wrong output. Every `ParseResult<T>` carries a `ValidationReport` with two levels of checks:

**Level 1 — Row validation:** For each consecutive transaction pair in a bank statement, the engine checks that `balance[n] = balance[n−1] ± amount[n]`. When a row fails, the engine resyncs to the printed balance before continuing, ensuring a single bad row doesn't cascade into compounding failures.

**Level 2 — Summary validation:** The engine compares declared vs. computed totals (total credits, total debits, closing balance). Checks are classified as either **`Declared`** (the institution printed this number) or **`Derived`** (inferred from arithmetic). 

This drives the overall `ValidationStatus`: all passed → green ✅, only derived failures → yellow ⚠, any declared failure → red ✗. The validation engine is only as strong as the source data allows.

## The Deployment Pipeline

Automation is handled by four distinct GitHub Actions workflows (three explicit, one implicit):

| Workflow | Trigger | Action & Details |
|---|---|---|
| **`test.yml`** <br/> *(PR Checks)* | Pull request to `main` | Features a smart diff-checker to identify if core logic was modified. Runs formatting, linting (`clippy`), `cargo test` (unit and logic tests; fixture-backed snapshot tests are run locally), and verifies WASM compilation. |
| **`deploy-unreleased.yml`** <br/> *(Continuous Preview)* | Merge to `main` | Leverages concurrency groups to cancel outdated runs. Delegates the build of the WASM module and Vue site to `cargo xtask deploy-site --unreleased`, which force-pushes the assets to the `gh-pages` branch. |
| **`publish.yml`** <br/> *(Release)* | Git tag on `main` (e.g., `v0.2.1`) | Verifies the tag is on the `main` branch to prevent rogue releases. Orchestrates four parallel jobs to publish to Crates.io, NPM (with `--provenance`), PyPI (via `maturin`), and deploy the versioned frontend to `gh-pages` using `cargo xtask`. |
| **`pages-build-deployment`** <br/> *(Implicit)* | Push to `gh-pages` branch | GitHub's internal, implicit workflow that detects pushes to the `gh-pages` branch (triggered by the two workflows above) and serves those assets directly to GitHub Pages. |

### Key Principle: Passwordless Deployments (OIDC)

A core tenet of this pipeline is accessing resources without static keys wherever possible. The NPM, PyPI, and Crates.io deployments all use **OIDC (OpenID Connect)** for authentication, allowing GitHub Actions to securely publish packages without storing long-lived API tokens in repository secrets.

### Multi-Versioned Website

We maintain a multi-versioned website to ensure stability. The **Unversioned** site is continuously published from `main` HEAD. I use this to verify the WASM and UI integration in the real world *before* cutting a tag. 

Once verified, cutting a tag triggers the release workflow, which publishes the modules to the package management systems. Website deployment runs via `cargo xtask deploy-site` — a custom Rust build tool in the workspace. It builds the bundles, writes assets to a versioned path (like `/0.2/`), updates a `versions.json` registry, and force-pushes to `gh-pages`. The versioning scheme uses minor versions as stable URL prefixes, while the root URL always mirrors the overall latest release.

## Testing Strategy

Snapshot testing is the primary strategy. Each parser has an integration test that reads a real statement, parses it, and compares JSON output against a committed snapshot. 

Because financial statements contain highly sensitive PII, **testing is strictly limited to real (but private) files checked into a private sibling repository**, and tests are run locally. I plan to include these tests in the CI pipeline eventually, but I need to be extremely careful to ensure no data is ever leaked in the GitHub Actions logs.

## Beyond Parsing: The Data Quality Problem

One of the biggest challenges in building Xfina is that financial statements are not designed for machine consumption. The same institution can provide different levels of information across PDF, Excel, and CSV formats, and some reports contain little or no summary information that can be used to validate the parsed transactions.

For example, an ICICI Bank credit card statement does not include the card number anywhere in the PDF or XLS report. An Axis Bank PDF contains significantly more information than its Excel equivalent. Credit card statements generally don't provide a running balance, so validation is limited to summary-level checks. Where running balances are available, Xfina can validate every transaction sequentially.

CAMS is a particularly good example of what becomes possible when the source contains richer information. A CAS can be validated at multiple levels: individual transactions and running balances for each mutual fund, at the AMC level, and again against the overall consolidated totals.

In general, I have found the formats roughly ordered from **easiest to hardest to parse as CSV/Excel → PDF**, while the richness of the data tends to go in the opposite direction: **PDF → Excel/CSV**. PDFs often contain information that is missing from their structured counterparts, but they are also arguably the worst format for exchanging data between systems.

The bigger problem is therefore not just parsing. **Financial institutions should provide a standard machine-readable export, ideally using an established schema such as ReBIT AA, in a consistent format across banks, cards, brokers, and mutual funds.** Today, anyone managing multiple bank accounts, credit cards, mutual funds, and brokerage accounts has to deal with a fragmented collection of formats and data quality.

This matters especially for privacy-first applications. If institutions provided a standard export directly to the user, financial software could process that data locally without requiring users to upload sensitive financial information to an upstream server.

That is where Xfina fits today: **bridging the gap between the messy formats institutions provide and the structured data applications need.** Over time, I want to expand Xfina's support for richer PDF statements across institutions, allowing more precise validation of the underlying transactions and summary data.

Ultimately, the best solution isn't another parser. It is for financial institutions to make **standardized, machine-readable exports a first-class feature**. Until then, Xfina is my attempt to make that fragmented data usable, locally, reliably, and without compromising privacy.

## Performance: Rust vs Python

To demonstrate the benefit of doing the parsing in compiled Rust while exposing a Python API, I compared the popular [casparser](https://github.com/codereverser/casparser) project with Xfina's Python bindings. 

Because Xfina does the heavy lifting in compiled Rust and only hands the final dictionary back to Python, it is an order of magnitude faster and operates with a microscopic memory profile.

To put numbers to this, I ran a local benchmark using 13 real CAMS CAS PDF statements from the `xfina-test-data` repository. Both libraries parsed the exact same 13 files:

```python
import time
import casparser
import xfina

# 1. Benchmark casparser
start = time.time()
for pdf in pdfs:
    casparser.read_cas_pdf(pdf, "XXXXXXXXXX")
cas_time = time.time() - start

# 2. Benchmark xfina
start = time.time()
for pdf in pdfs:
    with open(pdf, "rb") as f:
        pdf_bytes = f.read()
    xfina.parse_cams(pdf_bytes, password="XXXXXXXXXX")
xfina_time = time.time() - start
```
*Benchmark ran on MBP 2026 (M5 Pro / 24GB)*

> **`casparser`**: 6.08 seconds \
> **`xfina`**: 0.47 seconds

On this workload, Xfina was roughly 13× faster. When you are processing hundreds of statements in a batch pipeline or a web backend, that difference is architectural. But, if this is used individually, it doesn't matter much.

## Links

- **GitHub**: [github.com/sakthipriyan/xfina](https://github.com/sakthipriyan/xfina)
- **Web App**: [xfina.sakthipriyan.com](https://xfina.sakthipriyan.com/)
- **Crates.io**: [crates.io/crates/xfina](https://crates.io/crates/xfina)
- **NPM**: [xfina-wasm](https://www.npmjs.com/package/xfina-wasm)
- **PyPI**: [pypi.org/project/xfina](https://pypi.org/project/xfina/)

---
title: "Xfina"
date: "2026-08-26"
draft: false
description: "Open-source parsers that turn Indian bank, credit card, mutual fund and IBKR statements into structured data — in your browser, without the files leaving your device."
type: "tools"
summary: "Open-source parsers that turn Indian bank, credit card, mutual fund and IBKR statements into structured data. Runs as a web app, a CLI, or a library in Rust, Python or JavaScript — and the files never leave your device."
wealth_tags:
  - Cost Optimization
  - IBKR
  - Mutual Funds
  - Open Source
  - Portfolio Management
---

## About Xfina

> **Xfina** reads the statements your bank, card issuer, fund house and broker
> already give you, and hands back structured data you can actually work with.

Every portfolio question I have ever wanted to answer started the same way:
gather the statements, and then spend an evening copying numbers out of PDFs.
Xfina is the part I stopped doing by hand.

🌐 **[xfina.dev](https://xfina.dev/)** · 💻 **[github.com/sakthipriyan/xfina](https://github.com/sakthipriyan/xfina)**

## Your files stay on your device

The parsers are written in Rust and compiled to WebAssembly, so the web app runs
them **in your browser**. Nothing is uploaded, and there is no server to trust —
which is the only arrangement I am comfortable with for a document that lists
every transaction I made last year.

That choice is also why it is Rust rather than Python. Most open-source
financial parsers need a local toolchain and a terminal before they do anything
useful. Compiling to WASM removes the setup entirely: if you can open a browser,
you can use it.

## What it reads today

| | Institution | Format |
|---|---|---|
| 🏦 Bank | Axis, Bank of Baroda, HDFC, ICICI | XLS |
| 🏦 Bank | State Bank of India | PDF, password protected |
| 💳 Credit card | HDFC | CSV, including add-on cards and reward points |
| 💳 Credit card | ICICI | XLS |
| 📈 Mutual funds | CAMS | Combined Account Statement, password protected |
| 🌍 Broker | Interactive Brokers | CSV activity statements |

KFinTech CAS and Axis credit cards are next. Bank parsers have not been tested
against joint accounts.

## One core, several ways in

The parsing lives in a single Rust crate. Everything else is a binding onto it,
so a fix reaches all of them at once:

- **Web app** — [xfina.dev](https://xfina.dev/), Vue and WASM, nothing uploaded
- **CLI** — for scripting a folder of statements
- **[Rust crate](https://crates.io/crates/xfina)**, **[PyPI](https://pypi.org/project/xfina/)**, **[npm](https://www.npmjs.com/package/xfina-wasm)** — for building on top

## It speaks the standard, not my own dialect

The data model follows the **Sahamati Account Aggregator** and **ReBIT**
specifications rather than a schema I invented, with anything Xfina-specific
kept in its own nested object. So the output drops into the wider Indian
financial ecosystem instead of being another format someone has to learn —
deposit accounts, credit cards, equity holdings and mutual fund folios all come
out shaped the way the standard describes them.

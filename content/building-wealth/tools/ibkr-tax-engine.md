---
title: "IBKR Tax Engine"
date: "2026-08-01"
draft: "false"
description: "Compute Schedule AL and Schedule FA inputs from IBKR Flex Query CSV export."
type: "tools"
tool_type: "ibkrTaxEngine"
tool_script: "js/ibkr-tax-engine.js"
summary: "Compute Schedule AL and Schedule FA inputs from IBKR Flex Query CSV export."
wealth_tags:
  - IBKR
  - Tax
---

## About IBKR Tax Engine

> **IBKR Tax Engine** helps you easily compute Schedule FA and Schedule AL metrics for your Indian Income Tax Returns from an Interactive Brokers (IBKR) Flex Query export.

Traditional tax preparation involves manually parsing hundreds of rows of IBKR transaction history to identify peak balances, closing balances, and initial values for Schedule FA (Calendar Year) and Schedule AL (Financial Year).

**IBKR Tax Engine** solves this by:
- Processing your IBKR Flex Query CSV directly in your browser.
- Automatically identifying the correct SBI TT Buying rates for USD to INR conversion.
- Computing Schedule FA outputs (Calendar Year basis) including Peak Balance and Closing Balance.
- Computing Schedule AL outputs (Financial Year basis) for "Shares & Securities".

### Built for Real Life

- 100% Private: All calculations happen locally in your browser. Your financial data is never sent to any server.
- Supports Calendar Year (Jan - Dec) for Schedule FA.
- Supports Financial Year (Apr - Mar) for Schedule AL.
- Fully transparent and easy to use.

### Frequently Asked Questions (FAQs)

### What data does the tool need?
You need an IBKR Flex Query CSV export that contains "Trades" and "Dividends". The tool reconstructs your daily balances across the selected year to identify your peak and closing balances.

### How is the exchange rate applied?
The tool automatically fetches historical SBI TT Buying rates (via an API endpoint used across our portfolio tools) for the exact dates required.

### Is my data safe?
Yes. The CSV file is parsed using JavaScript running strictly on your device. The only network requests made are to fetch historical SBI exchange rates. No personal or financial data is transmitted.

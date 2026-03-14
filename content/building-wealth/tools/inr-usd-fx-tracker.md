---
title: "INR USD FX Tracker"
date: "2026-03-14"
draft: "false"
description: "Track INR to USD conversions with accurate GST computation, effective rate analysis, and a full transaction log."
type: "tools"
tool_type: "fxTracker"
tool_script: "js/inr-usd-fx-tracker.js"
summary: "Calculate exactly how much USD you get for your INR — including forex service charges and 18% GST — and keep a searchable log of every FX transaction."
wealth_tags:
  - Forex
  - USD
  - GST
  - Currency Exchange
---

## About INR USD FX Tracker

> **INR USD FX Tracker** tells you exactly how many dollars your rupees buy — after the bank's hidden charges and GST.

Most people check the USD/INR rate on the bank's website and assume that is their cost. It is not. Every INR-USD transaction carries **four distinct costs**: the bank's FX spread over the interbank rate, an FX conversion GST computed per Rule 32(2)(b) of the CGST Rules, a flat processing fee, and 18% GST on that processing fee. The **INR USD FX Tracker** makes all four transparent in one place — and keeps a permanent log of every deal you've booked.

### Supported Operations

| Operation | What does it answer? |
|-----------|----------------------|
| **Buy USD** | "If I remit ₹1,00,000, how many dollars do I actually receive after all charges?" |
| **Sell USD** | "If I sell $1,000, how many rupees land in my account after charges?" |

### Why INR USD FX Tracker?

Traditional bank FX calculators mislead you by:
- Showing only the quoted exchange rate, ignoring service charges
- Hiding the GST amount in fine print
- Giving no way to compare the **effective rate** across transactions or banks

**INR USD FX Tracker** solves this by:
- Breaking down **all four cost components** per transaction with per-USD cost and % over interbank
- Computing the FX conversion GST using the official Rule 32(2)(b) formula automatically
- Showing your **effective rate** (actual INR cost per USD) for every deal
- Storing every transaction in your browser so you always have a reconcilable log

### How the Four Costs Are Calculated

For a $1,000 transaction (interbank rate ₹91.85, bank rate ₹93.60, processing fee ₹1,000):

| Component | Calculation | Cost | Per $1 | % vs Interbank |
|-----------|-------------|------|--------|----------------|
| Bank FX Spread | 1,000 × (₹93.60 − ₹91.85) | ₹1,750 | ₹1.75 | 1.90% |
| FX Conversion GST | 18% × (1% × ₹93,600) | ₹168 | ₹0.17 | 0.18% |
| Processing Fee | Flat | ₹1,000 | ₹1.00 | 1.09% |
| GST on Processing Fee | 18% × ₹1,000 | ₹180 | ₹0.18 | 0.20% |
| **Total Extra Cost** | | **₹3,098** | **₹3.10** | **3.37%** |

#### Rule 32(2)(b) CGST — FX Taxable Value

India's GST Act prescribes a deemed-value slab for the FX conversion service:

| Transaction Amount (Gross INR) | Rule 32(2) Taxable Value |
|-------------------------------|--------------------------|
| Up to ₹1,00,000 | 1% of amount (minimum ₹45) |
| ₹1,00,001 – ₹10,00,000 | ₹1,000 + 0.5% of amount above ₹1,00,000 |
| Above ₹10,00,000 | ₹5,500 + 0.1% of amount above ₹10,00,000 (max ₹60,000) |

**18% GST** is then levied on the taxable value above. This is separate from the flat processing fee which also attracts 18% GST.

### Built for Real Life

- Works for both **Buy USD** (LRS remittances, tuition, travel) and **Sell USD** (returning funds, freelance income)
- Accepts **interbank rate** (optional) to compute and display FX spread per component
- Records **bank name, trade deal ID, and transaction ID** so you can reconcile against your bank statement
- **Auto-saves** every transaction to your browser — no login, no cloud
- **Export to JSON** for personal records or audit trails; **Import** to restore or merge data across devices
- Net USD position summary across all Buy and Sell entries

### Key Insights

> **The effective rate is always higher than the quoted rate — the difference is your true cost.**

For a $1,000 Buy USD at bank rate ₹93.60 (interbank ₹91.85), processing fee ₹1,000:
- FX conversion GST: ₹168 (18% × 1% × ₹93,600)
- Processing fee: ₹1,000 + GST ₹180
- Bank FX spread: ₹1,750
- Total extra cost: **₹3,098** = **₹3.10 per $1** = 3.37% above interbank

That compounds significantly over large remittances — knowing the breakdown lets you compare banks and timing decisions accurately.

## Frequently Asked Questions (FAQs)

### Why is my effective rate higher than the quoted USD/INR rate?

Two reasons: the bank's quoted rate already includes their spread over the interbank rate, and on top of that the bank charges a processing fee and collects FX conversion GST per Rule 32(2). Enter the interbank rate (RBI reference rate) to see the spread component explicitly.

### What is the interbank rate and where do I find it?

The interbank (mid-market) rate is the wholesale exchange rate between banks, published by the RBI as the reference rate. You can find it on the RBI website or financial data sites. The difference between the bank's quoted rate and this rate is the bank's FX spread — your first cost component.

### What is LRS?

The Liberalised Remittance Scheme (LRS) allows resident Indians to remit up to **USD 2,50,000 per financial year** for permitted purposes (education, travel, investments, gifts, etc.) without prior RBI approval. Each USD buy transaction you log here can be tracked toward your annual LRS limit.

### Is TCS applicable on these transactions?

TCS (Tax Collected at Source) may apply on certain LRS remittances above ₹7 lakh per year. The current rate under the Income Tax Act varies by purpose. This tool tracks the forex charges and GST; TCS tracking is outside its scope and should be verified with your bank.

### My transaction data is stored where?

All data is stored exclusively in your **browser's localStorage**. Nothing is sent to any server. Use the **Export** button to download a JSON backup before clearing browser data or switching devices.

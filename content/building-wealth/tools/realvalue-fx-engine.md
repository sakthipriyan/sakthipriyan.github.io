---
title: "RealValue FX Engine"
date: "2026-03-15"
draft: "false"
description: "Calculate your true effective FX rate, compare quotes across banks, track your ₹10L LRS limit via a browser-only transaction log, and compute your TCS refund opportunity cost."
type: "tools"
tool_type: "fxTracker"
tool_script: "js/realvalue-fx-engine.js"
tool_dependencies:
  - echarts
summary: "Calculate your true effective FX rate including hidden spreads and taxes, compare quotes across banks to minimize costs, track your ₹10L LRS limit via a browser-only transaction log, and compute your TCS refund opportunity cost."
wealth_tags:
  - International Investing
  - Forex
  - USD
  - GST
  - TCS
  - Currency Exchange
---

## About RealValue FX Engine

> **RealValue FX Engine** tells you exactly how many dollars your rupees buy — after the bank's hidden charges, GST, and TCS.

The engine is built around four core capabilities:

1. **Finding Effective Rates & Cost Breakdowns**: Every INR-USD transaction carries distinct hidden costs—the bank's FX spread, Rule 32 conversion GST, and flat processing fees. The engine transparently maps out these costs to compute your true effective rate.
2. **Compare Rates**: A comprehensive side-by-side comparison matrix allowing you to evaluate multiple bank rates simultaneously, instantly identifying the lowest Transaction Cost and best Effective Rate among providers before executing a transfer.
3. **Transaction History & TCS Computation**: It maintains a local, chronological log of all your past deals. This allows the engine to automatically track your cumulative gross INR and compute the exact 20% TCS applies to future transactions once you cross the ₹10 Lakhs FY limit.
4. **Computing TCS Opportunity Cost**: TCS taxes are eventually recovered, but the delay causes a cashflow drag. The engine calculates the precise opportunity cost of your locked-in capital over time by factoring in your expected return (XIRR) and your recovery schedule (Form 12BAA or ITR Filing).

### Why RealValue FX Engine?

Traditional bank FX calculators mislead you by:
- Showing only the quoted exchange rate, ignoring service charges
- Hiding the GST amount in fine print
- Giving no way to compare the **effective rate** across transactions or banks

**RealValue FX Engine** solves this by:
- Breaking down **all four cost components** per transaction with per-USD cost and % over interbank
- Computing the FX conversion GST using the official Rule 32(2)(b) formula automatically
- Tracking **TCS** with correct financial-year accumulation (gross INR thresholds reset each April)
- Showing your **effective rate** (actual INR cost per USD) for every deal
- Storing every transaction in your browser so you always have a reconcilable log
- Visualising cost composition as a **live donut chart** with interbank vs. effective rate in the centre

### How the Four Costs Are Calculated

For a $1,000 transaction (interbank rate ₹91.85, bank rate ₹93.60, processing fee ₹1,000):

| Component | Calculation | Cost | Per $1 | % vs Interbank |
|-----------|-------------|------|--------|----------------|
| Bank FX Spread | 1,000 × (₹93.60 − ₹91.85) | ₹1,750 | ₹1.75 | 1.90% |
| FX Conversion GST | 18% × Rule-32 taxable value | ₹168 | ₹0.17 | 0.18% |
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

#### TCS — Tax Collected at Source

Under Section 206C(1G) of the Income Tax Act, banks collect TCS on LRS remittances. The threshold and rate reset every financial year (April 1 – March 31):

| Cumulative Gross INR in FY | TCS Rate |
|---------------------------|----------|
| Up to ₹10,00,000 | 0% |
| Above ₹10,00,000 | 20% on the excess |

RealValue FX Engine accumulates gross INR **in chronological date order** across all your logged Buy USD transactions for the current FY to determine the correct TCS for each deal. TCS is a refundable advance tax — it does not represent a permanent cost.

### Transaction Log & History

Every transaction you add is stored in your browser and displayed in a sortable history table with these columns:

| Column | What it shows |
|--------|--------------|
| **Date** | Trade settlement date |
| **Bank** | Bank or broker name |
| **Trans ID** | Your deal / transaction reference |
| **USD Bought** | Actual USD received for this transaction |
| **Gross INR Spent** | Total INR debited including TCS |
| **Net INR Spent** | INR spent excluding refundable TCS |
| **Charges** | FX spread + processing fee (permanent costs) |
| **GST** | Total GST (FX conversion + processing fee) |
| **TCS** | TCS collected (refundable in ITR) |

### TCS Opportunity Cost (Cashflow Drag)

Because Tax Collected at Source (TCS) is deducted immediately but only recovered later, that capital is temporarily locked away. This delay creates an **opportunity cost** (cashflow drag). RealValue FX Engine now tracks and quantifies this loss dynamically:

- **Adjustment Methods**: You can configure how you plan to recover the TCS. Choose **Form 12BAA (Monthly)** if you've submitted the TCS certificate to your employer to reduce your monthly TDS. Choose **ITR Filing** if you plan to claim it as a refund, along with your **Expected Refund By** date (e.g., Oct 31, Jan 31).
- **Your XIRR (%)**: Enter your expected annual compound growth rate. The engine applies this rate daily to the pending TCS balance to compute exactly how much money you effectively lose while waiting for the tax credit.
- **TCS Opportunity Cost Table**: A dedicated chronological schedule below the history table maps out every TCS payment and adjustment event, keeping a running tally of your pending TCS and calculating the accrued opportunity cost at every step.

### Built for Real Life

- Designed for **Buy USD** transactions (LRS remittances, tuition, travel)
- Accepts **interbank rate** (optional) to compute and display FX spread per component
- Records **bank name and transaction ID** for bank-statement reconciliation
- **Auto-saves** every transaction to your browser — no login, no cloud
- **Export to JSON** for personal records; **Import** to restore or merge data across devices
- **Share** button generates a shareable URL encoding the current calculator inputs
- Net USD position summary across all logged transactions

### Key Insights

> **The effective rate is always higher than the quoted rate — the difference is your true cost.**

For a $1,000 Buy USD at bank rate ₹93.60 (interbank ₹91.85), processing fee ₹1,000:
- FX conversion GST: ₹168 (18% × Rule-32 value)
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

The Liberalised Remittance Scheme (LRS) allows resident Indians to remit up to **USD 2,50,000 per financial year** for permitted purposes (education, travel, investments, gifts, etc.) without prior RBI approval. Each USD Buy transaction you log here can be tracked toward your annual LRS limit.

### How is TCS calculated across multiple transactions?

RealValue FX Engine sorts all your logged transactions by date in ascending order and walks the financial year cumulatively. Once the cumulative gross INR exceeds ₹10,00,000 in a FY, TCS at 20% applies on the excess for each subsequent transaction. TCS resets to zero at the start of each new financial year (April 1). This accumulated history is then fed directly into the **TCS Opportunity Cost** schedule to visualize when that capital will be recovered.

### My transaction data is stored where?

All data is stored exclusively in your **browser's localStorage**. Nothing is sent to any server. Use the **Export** button to download a JSON backup before clearing browser data or switching devices.

## Changelog

### 2026-03-21
- **Compare Rates Feature**: Added a comprehensive side-by-side comparison engine. Evaluate multiple bank rates via horizontal summary cards and an exploded granular table displaying exact components like FX Spread, GST breakdowns, and Transaction Cost percentages. Highlights the best rate based on the lowest Transaction Cost. Improved UI and neutralized financial terminology across the tool.

### 2026-03-20
- **TCS Opportunity Cost Module**: Added an interactive chronological schedule that dynamically tracks and visualizes the exact monetary opportunity cost (XIRR) of having your capital temporarily locked up by the government in TCS. The module explicitly contrasts the capital drag of the traditional **ITR Refund** timeline against using **Form 12BAA** for immediate employer salary TDS adjustment!

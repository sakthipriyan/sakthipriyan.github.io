---
title: "FX Rate Comparison"
subtitle: "Comparing FX Retail, FX Retail Bharat Connect, and Bank Rates to minimize remittance costs."
type: "books"
chapter: 5
date: 2026-04-25
author: "Sakthi Priyan H"
draft: false
---

## Why FX Rate Matters

When you remit INR to fund your IBKR account, the FX rate your bank applies determines how many USD you actually receive. A 1% worse rate on INR 10 lakh remittance costs you INR 10,000 straight away — before you've bought a single ETF.

The metric to track is:

> **FX Charge % = (Markup + Processing Fee) / FX Interbank Rate**

This normalizes the cost regardless of the amount, making comparisons clean.

## The Three Channels

### 1. Bank's Own Platform Rate (Default)

Every bank has a default rate for online LRS transfers. This is their retail markup over the mid-market interbank rate.

- **HDFC Bank**: ~1.2% default markup
- **ICICI Bank**: ~1.75% default markup

These are the rates you get if you do nothing special. ICICI's default is significantly worse.

### 2. Negotiated Rate via Bank RM

Banks can offer a negotiated rate — typically 10–50 paise per USD off the default. For Imperia customers or high-value relationships, HDFC has been known to set up a discounted rate (~50 bps lower than default).

This requires talking to an RM, not customer care. The discount is relationship and volume-dependent.

### 3. FX Retail (CCIL)

FX Retail is a platform operated by CCIL (Clearing Corporation of India Ltd) that lets retail customers access **near-interbank rates** for USD/INR transactions. The spread is a fraction of what banks charge.

When booking a deal on FX Retail, you get a Trade Number — this trade number is then quoted to your bank to execute the remittance at the FX Retail rate. Your bank's own processing fee still applies on top.

Net effective cost at FX Retail rates is typically **0.7–0.9%** for HDFC, well below either bank's default.

## Real Data: FX 2025-26

The table below shows actual FX Charge % (Markup + Processing Fee as % of interbank rate) from real LRS transactions used to fund IBKR:

| Date | Bank | FX Charges / FX Interbank |
|---|---|---|
| 2026-03-06 | HDFC Bank | 0.7936% |
| 2026-03-05 *(test run)* | HDFC Bank | 7.2061% |
| 2026-01-01 | ICICI Bank | 1.3645% |
| 2025-12-01 | ICICI Bank | 1.1434% |
| 2025-11-01 | ICICI Bank | 1.1800% |
| 2025-10-01 | ICICI Bank | 1.3941% |
| 2025-09-01 | ICICI Bank | 1.3885% |
| 2025-07-31 | ICICI Bank | 0.7431% |
| 2025-07-02 | ICICI Bank | 1.4170% |
| 2025-06-01 | ICICI Bank | 1.0790% |
| 2025-05-07 | ICICI Bank | 1.4518% |
| 2025-05-05 *(test run)* | ICICI Bank | 1.6836% |

**FY 2025-26 total weighted average: 1.32%**

Key observations:
- The test-run entries (small USD amounts) show sky-high percentages because a fixed processing fee dominates — this is expected, not representative
- HDFC at 0.79% (FX Retail) is the best rate achieved
- ICICI was mainly on the bank's own (pre-FX Retail) rate for most of FY25-26, averaging ~1.2–1.4%
- ICICI's lowest (0.74%) was likely also a negotiated/FX Retail execution

## The Journey: ICICI Direct Promo → FX Retail

The transition happened in stages:

1. **ICICI Direct Global + IBKR promo code** — Earlier, ICICI Direct had a promo that gave 40 paise/USD discount and waived the processing fee (₹1,000 + ₹180 GST). This kept FX charges competitive.

2. **Promo code removed** — When ICICI Direct removed the promo code, the effective rate worsened significantly. This triggered the move to FX Retail.

3. **Discovered via ICICI Direct itself** — Interestingly, ICICI Direct's own transaction page has a field "Have an FX-Retail Trade No.?" — which is how the FX Retail platform was first discovered. HDFC's "Send Money" pages have a similar prompt.

4. **HDFC FX Retail setup** — HDFC at an established branch (older branches with significant forex volume) processed the FX Retail setup quickly. The RM understood the request without needing multiple escalations.

5. **ICICI FX Retail setup** — Significantly harder. The journey went: customer care → Mysore Infosys branch RM → customer care again → Chennai RM → NRI teams → still ongoing. ICICI's default rate of 1.75% is worse than their own net banking rate, and FX Retail setup is not commonly understood at general Indian bank branches.

6. **Bank of Baroda** — Reached out via treasury department email, then a branch specializing in MSME forex. Positive response. Potentially better rates for larger volumes. Worth exploring.

## Setting Up FX Retail

FX Retail is not available at every bank branch. Seek out an **AD (Authorised Dealer) branch** — branches known for handling significant forex business. General branches often have no familiarity with FX Retail.

The setup is a one-time process per bank. Once done, the workflow is:
1. Log in to the CCIL FX Retail platform
2. Book a USD/INR deal at the FX Retail rate — receive a Trade Number
3. Quote the Trade Number in your bank's remittance portal
4. Bank executes at the FX Retail rate + their processing fee

## Summarized Comparison

| Channel | Typical Cost (as % of interbank) | Notes |
|---|---|---|
| ICICI Bank default | ~1.75% | Worst default rate |
| HDFC Bank default | ~1.2% | Better default than ICICI |
| ICICI Bank negotiated | ~0.7–1.0% | Relationship/volume dependent |
| HDFC Bank FX Retail | ~0.8% | Best achieved so far |
| Public banks (BoB etc.) | TBD | Potentially better at large volumes |

Use [RealValue FX Engine](https://sakthipriyan.com/building-wealth/tools/realvalue-fx-engine/) to compute and compare your own FX charges across transactions.

## TODO
- Add FX Retail Bharat Connect comparison once tested
- Add GST on FX transaction detail
- Add step-by-step FX Retail deal booking walkthrough

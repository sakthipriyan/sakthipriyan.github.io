---
title: "FX Rate Comparison"
subtitle: "Comparing FX Retail, FX Retail Bharat Connect, and Bank Rates to minimize remittance costs."
type: "books"
chapter: 5
date: 2026-04-25
author: "Sakthi Priyan H"
draft: true
---

## Why FX Rate Matters

When you remit INR to fund your IBKR account, the FX rate your bank applies determines how many USD you actually receive. The cost is significant — and invisible unless you track it.

The metric to track is:

> **FX Charge % = (Markup + Processing Fee + GST) / FX Interbank Rate**

This normalizes the cost regardless of amount, making comparisons clean. The [RealValue FX Engine](https://sakthipriyan.com/building-wealth/tools/realvalue-fx-engine/) computes this for every transaction.

## The True Cost of a Default Bank Transfer

Sending $1,000 at a typical bank default rate (interbank = ₹91.85, bank markup = ₹1.75/USD):

| Component | Calculation | Cost |
|---|---|---|
| Bank FX spread | 1000 × ₹1.75 | ₹1,750 |
| FX conversion GST (Rule 32(2)) | 18% × (1% × ₹93,600) | ₹168 |
| Processing fee | Flat | ₹1,000 |
| GST on processing fee | 18% × ₹1,000 | ₹180 |
| **Total extra cost** | | **₹3,098** |

**Effective rate: ₹94.95/USD — that's +3.38% over interbank.**

This cost profile is not unusual. Most investors never realise what they're paying.

## The Four Channels

### 1. Bank's Own Platform (Default)

Every bank has a default rate on their remittance portal. No setup needed — just use Money2World (ICICI) or RemitNow (HDFC).

- **ICICI Bank default**: ~1.75% over interbank
- **HDFC Bank default**: ~1.2% over interbank

ICICI's default is notably worse than HDFC's.

### 2. Negotiated Bank Rate

By talking to your RM or treasury desk, you can request a reduced markup. This is relationship and volume-dependent.

- HDFC: negotiated to ₹0.50/USD (from 1.2% default)
- ICICI: negotiated ₹0.90 discount on the direct banking platform in some cases
- Bank of Baroda: offered ₹0.10/USD (target level)

### 3. FX Retail (CCIL Platform)

[FX Retail](https://www.fxretail.co.in/) is a platform operated by CCIL (Clearing Corporation of India) under RBI directive (launched August 2019). It gives retail customers access to near-interbank rates by bypassing the bank's opaque default pricing.

Workflow:
1. Register at fxretail.co.in and add your banks as relationship banks
2. Request a trade limit from each bank (default limit is ₹0)
3. On remittance day: book a USD deal on FX Retail → receive a **Trade ID**
4. Go to your bank's remittance portal → enter the Trade ID → execute

The bank settles at the FX Retail locked rate, plus their processing fee.

**Trade limit setup by bank:**

| | ICICI | HDFC |
|---|---|---|
| How to request | Service request or FX Retail portal | Email HDFC treasury directly |
| Scope | Valid for a period (with expiry date) | Same-day only |
| Lien | 5% of limit amount liened | No lien |
| Portal request works | ✅ | ❌ (email only) |

**Important risk**: Once a deal is locked on FX Retail, the bank remittance *must* be completed before the settlement deadline that same day. If not completed, the deal must be reversed and any FX loss is borne by you. Only lock the rate when you are ready to execute immediately.

### 4. FX Retail via Bharat Connect (New)

FX Retail is also accessible through **Bharat Connect** (UPI-based channel), visible inside **BHIM app** and **Bank of Baroda mobile app** (Forex section).

Rates observed on Bharat Connect (8 April 2026, ~₹0.10 higher base than FX Retail Web):

| Bank | Spread | Effective Rate |
|---|---|---|
| ICICI / HDFC | +₹0.20/USD | ~₹92.85/USD |
| Bank of Baroda | +₹0.10/USD | ~₹92.75/USD |

This suggests banks are **unofficially capped around ₹0.20/USD** on Bharat Connect — with no negotiation required. Even without setting up FX Retail Web, simply using Bharat Connect may give very competitive rates.

Maximum transaction size via Bharat Connect: **₹5 lakh per transaction**.

*Note: This channel has been observed but not yet executed via Bharat Connect. Testing is planned with ICICI as a backup to BoB FX Retail Web.*

## Real Data: FX Charges FY 2025-26

All transactions used to fund IBKR, sorted by date:

| Date | Bank | FX Charges / Interbank |
|---|---|---|
| 2026-03-06 | HDFC Bank | 0.79% |
| 2026-03-05 *(test run)* | HDFC Bank | 7.21% |
| 2026-01-01 | ICICI Bank | 1.36% |
| 2025-12-01 | ICICI Bank | 1.14% |
| 2025-11-01 | ICICI Bank | 1.18% |
| 2025-10-01 | ICICI Bank | 1.39% |
| 2025-09-01 | ICICI Bank | 1.39% |
| 2025-07-31 | ICICI Bank | 0.74% |
| 2025-07-02 | ICICI Bank | 1.42% |
| 2025-06-01 | ICICI Bank | 1.08% |
| 2025-05-07 | ICICI Bank | 1.45% |
| 2025-05-05 *(test run)* | ICICI Bank | 1.68% |

**FY 2025-26 weighted average: 1.32%**

Test run entries show very high percentages because a fixed processing fee dominates over a tiny USD amount — not representative of regular transactions.

## Cost Comparison by Amount (at ₹91.85 interbank)

| Amount | Default Bank (1.75%) | FX Retail @₹0.50/USD | FX Retail @₹0.10/USD |
|---|---|---|---|
| $1,000 | ₹94.95 / +3.38% | ₹93.70 / +2.01% | ₹93.30 / +1.58% |
| $5,000 | ₹93.94 / +2.27% | ₹92.69 / +0.91% | ₹92.29 / +0.48% |
| $10,000 | ₹93.81 / +2.13% | ₹92.56 / +0.77% | ₹92.16 / +0.34% |

*Fixed fees (processing + GST) get diluted as the transfer amount increases, improving the effective rate.*

## Long-Term Compounding Impact

FX optimisation might seem like a small win per transaction. But compounded over years, it matters. Saving $10/month by moving from a 2% rate to 0.5% and investing that saving:

> At 12% CAGR over 22 years, that $10/month saving compounds to **~$24,330 (~₹22 lakhs)** in real (inflation-adjusted) value.

Small efficiencies, sustained over decades, meaningfully impact long-term wealth.

## Documentation Difference: ICICI vs HDFC (Important for Form 12BAA)

When submitting Form 12BAA to your employer, you need documentation of TCS paid. The two banks differ significantly:

| | ICICI | HDFC |
|---|---|---|
| Documentation | Clear PDF summary | No dedicated PDF |
| Bank statement entries | Single debit entry | Up to 7 entries (FX debit, commission, CGST, SGST on commission, CGST, SGST on FX conversion, TCS) |
| TCS visibility | Clear ✅ | Buried in statement ❌ |
| Form 12BAA use | PDF works directly | Must use bank statement as reference |

ICICI provides cleaner documentation for Form 12BAA purposes despite having a worse default FX rate. HDFC's FX Retail rate is better, but bank statement decoding is more work.

## Current Channel Strategy

| Bank | Direct Bank | FX Retail Web | Bharat Connect |
|---|---|---|---|
| ICICI | ✅ In use (negotiated rate) | ⚠️ Available, not preferred | 🟡 Planned as backup |
| HDFC | ✅ Used in past | ✅ Best rate achieved (0.79%) | ❌ Not planned |
| Bank of Baroda | ❌ No account yet | 🟡 Planned next (₹0.10/USD) | ❌ Not planned |

## TODO
- Add Form 15CA/15CB GST slab breakdown (Rule 32(2) full table)
- Add Bank of Baroda FX Retail execution results once tested
- Add Bharat Connect transaction result once tested

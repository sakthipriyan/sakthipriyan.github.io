---
title: "12 BAAA - TCS Opportunity Cost"
subtitle: "Understanding Form 12BAAA, TCS on LRS remittances, and the real opportunity cost of blocked capital."
type: "books"
chapter: 4
date: 2026-04-25
author: "Sakthi Priyan H"
draft: false
---

## What is TCS on LRS?

Tax Collected at Source (TCS) is collected by your bank at the time of every LRS remittance.

- For **investment purposes** (securities, overseas direct investment):
  - **0%** on the first INR 10 lakh per year
  - **20%** on amounts above INR 10 lakh per year

TCS is **not an additional tax** — it is a credit against your income tax liability for that financial year. The problem is that it locks up your capital for months before you can claim it back.

## What is Form 12BAA?

Form 12BAA lets you declare TCS already paid to your employer. When your employer sees you have already paid TCS this financial year, they reduce the TDS deducted from your salary accordingly — giving you the money back through your monthly salary rather than waiting for ITR refund.

Without Form 12BAA: TCS is paid in, say, February. You file ITR by July the following year. Refund arrives months later. That's potentially 16+ months of capital locked.

With Form 12BAA: TCS paid in February is offset against salary TDS from that same month and the next — capital returned within weeks.

**Practical note**: When this was first set up, there was some initial hesitation and delay from HR/Payroll teams since Form 12BAA is relatively new. Expect some back-and-forth the first time.

The discovery of Form 12BAA was actually a decisive factor in making the LRS route financially viable — the TCS drag without it made domestic mutual fund routes look comparatively better.

The [RealValue Family SIP Allocator](https://sakthipriyan.com/building-wealth/tools/realvalue-family-sip-allocator/) has a **TCS deduction feature** built in — it automatically adjusts the available investment amount for the month based on TCS already deducted, useful for cash-flow-based rebalancing.

## The Opportunity Cost: Case 1 vs Case 2

Assume you invest INR 1 lakh per month. By January you have remitted INR 10 lakh (crossing the TCS-free threshold). From February onwards, TCS of 20% applies.

- **February**: Remit INR 1 lakh → INR 20,000 TCS collected
- **March**: Remit INR 1 lakh → INR 20,000 TCS collected

### Case 1: Without Form 12BAA

The INR 40,000 total TCS sits locked until you file your ITR (typically around October the following year):

| Month | TCS | Available Back |
|---|---|---|
| Feb | ₹20,000 | ~Oct (8 months) |
| Mar | ₹20,000 | ~Oct (7 months) |

At 12% CAGR, modelling ₹20K/month locked for 8 and 7 months respectively:
- **Total opportunity cost: ~₹2,500** (nominal drag from locked capital)

### Case 2: With Form 12BAA

You submit Form 12BAA to your employer after each remittance. The employer adjusts TCS against your salary TDS in prorated fashion:

| Month | TCS | Adjustment | Lock Period |
|---|---|---|---|
| Feb | ₹20,000 | ₹10K in Feb salary, ₹10K in Mar salary | 1–2 months |
| Mar | ₹20,000 | Fully adjusted in Mar salary | 1 month |

Detailed opportunity cost breakdown:

| TCS Event | Amount | Lock Period | Value @12% | Opportunity Cost |
|---|---|---|---|---|
| Feb — 50% by Feb end | ₹10,000 | 1 month | ₹10,094 | ₹94 |
| Feb — 50% by Mar end | ₹10,000 | 2 months | ₹10,189 | ₹189 |
| Mar — 100% by Mar end | ₹20,000 | 1 month | ₹20,188 | ₹188 |

**Total opportunity cost with Form 12BAA: ~₹471** vs ~₹2,500 without it — an **80%+ reduction** in drag.

> This difference scales up significantly for larger remittances. If you are scaling up international investment and not using Form 12BAA, you are leaving cash on the table for no good reason.

## Minimising the TCS Drag

1. **File Form 12BAA promptly** after each remittance — this is the single most impactful action
2. **Front-load remittances early in the financial year**: TCS paid in April can be offset against salary TDS much sooner than TCS paid in March
3. **Stay within the INR 10 lakh threshold**: If your annual investment is ≤ INR 10 lakh, no TCS at all
4. **Split across financial years**: Remit near year-end for part and near year-start for the rest — both potentially at 0% TCS

## TODO
- Add Form 12BAA submission process step-by-step
- Add annualised drag comparison: 15L vs 30L vs 60L remittances
- RealValue FX Engine TCS tracking workflow

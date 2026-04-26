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
  - **0%** on the first INR 7 lakh per year
  - **20%** on amounts above INR 7 lakh per year

TCS is **not a tax you lose** — it is a credit against your income tax liability for that financial year. The problem is that it locks up your capital for months before you can claim it back.

## What is Form 12BAAA?

Form 12BAAA lets you declare TCS already paid to your employer. When your employer sees you have already paid TCS this financial year, they reduce the TDS deducted from your salary accordingly — giving you the money back through your monthly salary rather than waiting for ITR refund.

Without 12BAAA: TCS is paid in, say, July. You file ITR by July the following year. Refund arrives months later. That's potentially 18+ months of capital locked.

With 12BAAA: TCS paid in July is offset against salary TDS from the very next month. Capital is effectively returned within weeks.

The RealValue Family SIP Allocator has a **TCS deduction feature** built in, which automatically adjusts the available investment amount for the month based on TCS already deducted — useful for cash-flow-based rebalancing where the exact investable amount changes when a remittance has been made.

## The Opportunity Cost Calculation

Say you remit INR 10 lakh in April. The TCS-free threshold is INR 7 lakh, so TCS = 20% × INR 3 lakh = **INR 60,000**.

Without 12BAAA, this INR 60,000 is unavailable to invest for ~12 months.

At a 12% CAGR, INR 60,000 invested for a year would grow to ~INR 67,200. The opportunity cost is INR 7,200 on a INR 10 lakh remittance — roughly **0.72% drag** just from TCS timing.

The bigger the remittance above INR 7 lakh, the higher the absolute opportunity cost.

## Minimising the TCS Drag

1. **File 12BAAA promptly** after each remittance — this is the single most impactful action
2. **Front-load remittances early in the financial year**: TCS paid in April can be offset against salary TDS sooner than TCS paid in March
3. **Stay within INR 7 lakh per year**: If your annual investment is ≤ INR 7 lakh, no TCS at all
4. **Split across financial years**: Remit near the year end for part of the investment and near the year start for the rest — both at 0% TCS

## TODO
- Add 12BAAA submission process step-by-step
- Add worked example: annualised cost of TCS drag for INR 5L, 10L, 20L remittances
- RealValue FX Engine integration for TCS computation

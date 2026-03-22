---
title: "Funding Interactive Brokers from India Using FX Retail"
date: "2026-03-10"
draft: false
type: "blogs"
wealth_tags:
  - "Interactive Brokers"
  - "IBKR"
  - "Forex"
  - "Remittance"
  - "LRS"
  - "FX Retail"
  - "International Investing"
  - "Cost Optimization"
summary: "How Indian investors can reduce the hidden forex markup cost when funding Interactive Brokers accounts by using FX Retail instead of the bank's default remittance rate."
---

When Indian investors fund Interactive Brokers (IBKR) accounts, the biggest hidden cost is often the foreign exchange markup charged by banks. Most investors use the default outward remittance flow provided by their bank without realising how much the FX spread is costing them.

## Typical Bank Flow

Banks offer straightforward remittance portals for sending money abroad:

| Bank | Flow |
|-|-|
| ICICI Bank | Savings Account → Money2World → IBKR |
| HDFC Bank | Savings Account → RemitNow → IBKR |

This works smoothly, but the FX conversion rate often includes a significant hidden spread.

## Typical Bank FX Markup

In many cases banks charge around ₹1.75 per USD markup over the interbank rate.

For example, if you send $1000 (assuming 1 USD = ₹91.85 interbank rate, bank rate = ₹93.60):

| Component | Calculation | Cost |
|-|-|-:|
| Bank FX spread | 1000 × ₹1.75 | ₹1,750 |
| FX conversion GST | 18% × (1% × ₹93,600) | ₹168 |
| Processing fee | Flat | ₹1,000 |
| GST on processing fee | 18% × ₹1,000 | ₹180 |
| **Total extra cost** | | **₹3,098** |

The FX spread alone can cost more than the processing fee. For investors funding their global brokerage regularly, this adds up quickly.


| Rate | Value (per USD) | % Over Interbank |
|-|-:|-:|
| Market rate (interbank) | ₹91.85| — |
| Effective rate (total cost ÷ $1000) | ₹94.95 | 3.38% |


## Discovering FX Retail

To reduce this cost I started using **[FX Retail](https://www.fxretail.co.in/)**, a forex dealing platform launched in August 2019 by the [Clearing Corporation of India (CCIL)](https://www.ccilindia.com/) under a directive from the [Reserve Bank of India (RBI)](https://www.rbi.org.in/).

The platform was created specifically to give retail customers — individuals and small businesses — direct access to the interbank forex market, bypassing the opaque pricing that banks typically offer. Before FX Retail existed, retail users had no choice but to accept whatever rate the bank quoted.

Instead of accepting the bank's default FX rate, you can:

1. Lock a forex deal on FX Retail
2. Execute the remittance through the bank using that deal

This introduces transparency and negotiation into FX pricing.

## Setting Up FX Retail

### Initial Registration

I registered using ICICI Bank. After approval, the default FX markup offered was:

> **1.75% per USD** — roughly similar to the normal bank markup.

### Adding Relationship Banks

FX Retail allows multiple relationship banks. I added HDFC Bank, whose default approval was **1.2% markup** — still high, but negotiable.

## Negotiating FX Rates

The actual markup depends on:

- Relationship value with the bank
- Transaction volume
- Negotiation with the treasury desk or RM

Here is what I observed:

| Bank | Default | Negotiated |
|-|-|-|
| ICICI | 1.75% | No response yet |
| HDFC | 1.2% | ₹0.50 per USD |
| Bank of Baroda | — | ₹0.10 per USD (offered) |

HDFC responded quickly and reduced the spread to **50 paise per USD** based on various factors.

ICICI has not responded so far. (Tried reaching out via multiple channels since 3 Feb 2026)

Bank of Baroda surprisingly offered **₹0.10/USD**, but I still need to open the account and integrate it. If that works in practice, it would be extremely competitive.

## Trade Limit Requirement

Before placing FX deals, banks must approve a trade limit. The default limit is zero.

### ICICI Process

You can request a limit via:

- ICICI service request, or
- The FX Retail system itself

After approval:
- 5% of the limit amount is liened
- The limit can have an expiry date

### HDFC Process

HDFC works differently. The FX Retail system limit request does not work for HDFC. Instead you must:

1. Email a specific HDFC treasury email ID
2. Request a limit for the same day

Once approved, it becomes available immediately.

## Executing a Transaction

Once limits are available, the process is straightforward.

### Step 1: Execute FX Deal

In FX Retail:

- Buy USD by selecting one of the relationship banks
- System generates a **Trade ID**

### Step 2: Complete Bank Remittance

Login to the bank's remittance portal and enter the Trade ID:

| Bank | Portal | Action |
|-|-|-|
| HDFC | RemitNow | Enter Trade ID → Execute transfer |
| ICICI | Money2World | Enter Trade ID → Execute transfer |

The bank then settles the transaction using the FX rate locked in FX Retail.

## Documentation Differences

There is a noticeable difference in documentation quality between banks.

### ICICI Experience

ICICI provides:

- A clear PDF summary
- The exact debit amount shown upfront
- A single debit entry in the bank statement

This is helpful when submitting documentation for **Form 12BAA**.

### HDFC Experience

HDFC creates upto 7 entries in the bank statement:

- FX debit
- Commission 
- GST entries on Commission (CGST & SGST)
- Currency conversion GST entries (CSGT &SGST)
- TCS Entry

This makes bank statement too verbose and no direct PDF documentation for TCS.  
I used bank statement as reference for 12BAA form.

## Cost Comparison

For a $1000 transfer (interbank rate = ₹91.85/USD):

| Component | Direct Bank | FX Retail @ 50p | FX Retail @ 10p |
|-|-:|-:|-:|
| FX spread | ₹1,750 | ₹500 | ₹100 |
| FX rate used | ₹93.60/USD | ₹92.35/USD | ₹91.95/USD |
| FX amount (1000 × rate) | ₹93,600 | ₹92,350 | ₹91,950 |
| FX conversion GST (18% × 1% × FX amount) | ₹168 | ₹166 | ₹166 |
| Processing fee | ₹1,000 | ₹1,000 | ₹1,000 |
| GST on processing fee (18% × ₹1,000) | ₹180 | ₹180 | ₹180 |
| **Total paid** | **₹94,948** | **₹93,696** | **₹93,296** |
| **Effective rate** (total ÷ $1000) | **₹94.95/USD** | **₹93.70/USD** | **₹93.30/USD** |
| **% over interbank** | **3.38%** | **2.01%** | **1.58%** |

For investors funding regularly, the savings compound significantly over time.

The table below shows how the effective rate and markup percentage change across transfer amounts. As the amount increases, fixed fees (processing + GST) get diluted, so the effective rate improves slightly:

| Amount | Direct Bank | FX Retail @ 50p | FX Retail @ 10p |
|-:|-:|-:|-:|
| $1,000 | ₹94.95 / +3.38% | ₹93.70 / +2.01% | ₹93.30 / +1.58% |
| $5,000 | ₹93.94 / +2.27% | ₹92.69 / +0.91% | ₹92.29 / +0.48% |
| $10,000 | ₹93.81 / +2.13% | ₹92.56 / +0.77% | ₹92.16 / +0.34% |

*Each cell shows effective rate per USD and % over interbank (₹91.85). FX conversion GST = 18% on the forex service charge, computed per Rule 32(2) of CGST Rules: ≤₹1 lakh → 1% of gross INR amount (min ₹45); ₹1–10 lakh → ₹1,000 + 0.5% on amount over ₹1 lakh; >₹10 lakh → ₹5,500 + 0.1% on amount over ₹10 lakh (max ₹60,000).*

## Important Risk

Once an FX deal is executed on FX Retail, the bank remittance **must be completed before the settlement deadline**.

If the remittance is not completed:

- The deal must be reversed
- Any FX loss must be borne by the user

So it is important to only execute the deal when you are ready to complete the transfer immediately.

## Other FX Retail Use Cases

FX Retail can also be used for:

- Sending money abroad (general LRS remittance)
- Forex card loading
- Foreign currency cash purchases

In my case I have only used it for: **INR → USD → Interactive Brokers**

## What I Plan Next

The next step is to test Bank of Baroda's integration with FX Retail. If their ₹0.10/USD markup works in practice, it could become the cheapest way for Indian investors to fund IBKR accounts.

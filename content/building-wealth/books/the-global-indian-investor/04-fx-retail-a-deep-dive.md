---
author: Sakthi Priyan H
chapter: 4
date: 2026-04-25
draft: false
subtitle: Setting up FX Retail and using it for cost-efficient forex
  remittances.
title: FX Retail - A Deep Dive
type: books
---

## FX Retail

[FX Retail](https://www.clearcorp.co.in/web/clearcorp/fx-retail1) is a retail foreign exchange trading platform operated by the
Clearing Corporation of India Limited (CCIL) under RBI guidance.  
It allows individuals to access near-interbank FX rates through their
relationship bank.

Instead of relying entirely on the bank's opaque forex pricing, FX
Retail lets you lock a USD/INR rate transparently on the platform, while
the bank acts as the settlement partner for the remittance.

When configured properly, FX Retail can reduce forex costs significantly
compared to standard bank remittance rates.

## How FX Retail Works

The FX Retail ecosystem has three participants:

1.  **Customer**: the retail user booking forex
2.  **Relationship Bank**: the bank that settles the remittance
3.  **FX Retail Platform**: the marketplace providing price discovery

### Sending USD to Brokerage account
Customer → FX Retail Platform → Relationship Bank → International
Remittance → Broker Bank Account

1. You first **book the forex rate on FX Retail** via
    1. **[FX Retail Web](https://fxretail.co.in/)** (Buy or Sell USD) or 
    2. via mobile apps such as BHIM using **[Bharat Connect / Forex](https://www.bharat-connect.com/forex/)** (Buy USD only) option
2. The bank **executes the outward remittance using that locked rate** to the destination broker account

## Step 1: Register on FX Retail

1.  Visit https://fxretail.co.in
2.  Start customer registration
3.  Verify email and mobile via OTP
4.  Submit PAN and personal details
5.  Choose a relationship bank

After submission, FX Retail generates a **customer registration request
reference number**.

Example:

Customer Name: SAKTHI PRIYAN\
Request Ref No: CRR/IN/000000

Once the relationship bank approves the request, your FX Retail account
is activated and login credentials are sent.

## Step 2: Add Relationship Banks

FX Retail allows multiple banks to be linked to the same account.

Typical flow:

1.  Login to FX Retail
2.  Add relationship bank
3.  Submit bank account details
4.  Bank approves the request

Example status notification:

Add Bank Request Ref: CRR/IN/000000-0

After approval, the bank becomes available for trading.

## Step 3: Bank Markup Configuration

Every bank configures its own FX markup.

Example markup notifications:

ICICI Bank  
Markup Type: Percentage  
Markup Value: 1.75%

HDFC Bank  
Mark-up Type: Paise  
Mark-up Value: 50.00  

Markup is automatically added to the platform trade price to produce the
**final settlement rate**.

Example:

Trade Price: 91.6425\
Bank Fee: 0.50\
Final Price: 92.1425

**With FX Retail Web markup set up requires negotiation with the bank to setup appropriate  rates.** Main challenge here is the lack of knowledge in the typical branches.

For FX Retail via Bharat Connect markup is capped at 20p/USD. So Level 4 becomes easier than Level explained in the previous Chapter.

## Step 4: Trading Limits

Most banks require a **trading limit** before you can book forex via FX Retail Web.
The limit defines the maximum USD amount you can trade.

Example:

Bank: HDFC Bank\
Limit Type: Global Gross\
Limit Amount: USD 1,000

Once the bank approves the limit, FX Retail sends a confirmation
notification.

Some banks allow limits to be configured directly in the platform, while
others require email approval and others we can setup high trading limit on yearly basis as well.

### Examples:
#### ICICI Bank
- It allow limits setup via CCIL Deal Limit option in service menu
- Allows setting up limits with a due date
- 5% Amount is linened in the bank account based on the set limit

#### HDFC Bank
- Requires email approval
- Limit allowed only for 1 day

#### Bank of Baroda
- Limit setup can be done as part of the onboarding process
- I setup limit for entire year based on the projected volume

## Bank Specific Setup Experience

## HDFC Bank

Limit setup cannot be completed inside FX Retail.

Instead, the request must be sent via email to the bank's FX retail
desk.

Typical process:

1.  Add HDFC as relationship bank
2.  Send email to FX desk requesting limit setup
3.  Include:
    -   Account number
    -   USD limit amount

Once approved, the limit becomes visible in FX Retail.

------------------------------------------------------------------------

## ICICI Bank

ICICI allows limit setup through their internal banking system.

Steps:

1.  Add ICICI as relationship bank
2.  Submit limit request in FX Retail
3.  Bank approves via ICICI service workflow

Example limit:

USD 10,000 trading limit

------------------------------------------------------------------------

## Bank of Baroda

Bank of Baroda typically completes both:

-   Relationship bank activation
-   Trading limit

in a **single workflow**, making the setup simpler.

# Bharat Connect Remittances

When settlement happens via **Bharat Connect**, trading limits are
generally **not required**.

This simplifies the execution process and allows faster remittance
settlement.

------------------------------------------------------------------------

# Executing a Trade

Once limits are configured:

1.  Login to FX Retail
2.  Select relationship bank
3.  Choose instrument (usually CASH)
4.  Enter USD amount
5.  Book trade

Example trade:

Traded Amount: USD 4,400\
Trade Price: 91.6425\
Final Price: 92.1425\
Settlement Amount: ₹405,427

After the trade is booked, the bank processes the outward remittance
using the booked rate.

------------------------------------------------------------------------

# Trade Confirmation

After execution, FX Retail generates a trade confirmation.

Example:

Trade Number: 202603060000169\
Relationship Bank: HDFC Bank\
Settlement Date: 06-Mar-2026\
Instrument: CASH\
Amount: USD 4,400

The confirmation acts as proof of the booked forex rate.

------------------------------------------------------------------------

# Why FX Retail Matters

Traditional bank remittances include:

-   Hidden FX spreads
-   Processing fees
-   Opaque pricing

FX Retail provides:

-   Transparent pricing
-   Competitive spreads
-   Ability to compare banks

For frequent international investors, this can significantly reduce
long‑term forex costs.



# Setting Up Your Bank for LRS + FX Retail

The remittance itself is straightforward.

Getting competitive FX pricing is the harder part.

The setup process generally looks like this:

## 1. Choose the Right Bank

Commonly used banks include:

- HDFC Bank
- ICICI Bank
- Bank of Baroda (BoB)

Not all branches handle LRS and FX Retail efficiently.

Prefer:
- Authorised Dealer (AD) branches
- Forex-focused branches
- Branches already servicing HNI / remittance customers

Many regular branches are unfamiliar with FX Retail workflows.

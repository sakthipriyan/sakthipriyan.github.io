---
author: Sakthi Priyan H
chapter: 4
date: 2026-05-09
draft: false
subtitle: Setting up FX Retail and using it for cost-efficient forex
  remittances.
title: FX Retail - A Deep Dive
type: books
wealth_tags:
  - FX Retail
  - Forex
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
Markup Type: Paise  
Markup Value: 50.00  

Markup is automatically added to the platform trade price to produce the
**final settlement rate**.

Example:

Trade Price: 91.6425\
Bank Fee: 0.50\
Final Price: 92.1425

**With FX Retail Web markup set up requires negotiation with the bank to setup appropriate  rates.** Main challenge here is the lack of knowledge in the typical branches.

For FX Retail via Bharat Connect markup is capped at 20p/USD. So Level 4 becomes easier than Level 3 or Level 5 explained in the previous Chapter.

## Step 4: Trading Limits

FX Retail require a **trading limit** before you can book forex via FX Retail Web.
The limit defines the maximum USD amount you can trade.

Example:

Bank: HDFC Bank\
Limit Type: Global Gross\
Limit Amount: USD 1,000

Once the bank approves the limit, FX Retail sends a confirmation
notification.

Some banks allow limits to be configured directly in the platform, while
others require email approval and others we can setup high trading limit on yearly basis as well.

In case of Bharat Connect Forex options. Upto $10,000 can be sent via the apps. But using UPI this is further limited to ₹5 lakhs per transaction and ₹10 lakhs per day. It didn't require any limit setup with the bank. It just worked out of box when I was used FX Retail via BHIM + ICICI Bank.

## Step 5: Booking the deal

### Using FX Retail Web
#### Steps
1. Log into the FX Retail website
2. Choose the bank and select BUY/SELL
3. Enter the USD to be bought/sold and confirm
4. Trade deal is booked and  FX-Retail Trade No. is generated 
5. Goto bank website for remittance flow, enter the Trade No in appropriate field. (In case of offline operations, Trade deal PDF can be shared with the branch forex staff to process further)

Trade booking is available once limits are enabled via Step 4.

#### Example
Following is an example FX Retail email I received in the past.

| Field                         | Value                       |
| ----------------------------- | --------------------------- |
| FX-Retail Customer ID         | redacted                  |
| Customer Name                 | SAKTHI PRIYAN               |
| Traded Date Time              | redacted      |
| FX-Retail Trade No.           | redacted                  |
| Relationship Bank             | HDFC BANK LIMITED           |
| Account Number of Customer    | redacted                 |
| Instrument                    | CASH                        |
| Trade Type                    | Booking                     |
| Original Trade No.            |                             |
| BUY/SELL (USD)                | BUY                         |
| Traded Amount (USD)           | redacted                  |
| Trade Price (INR per USD)     | 91.6425                     |
| Final Price (INR per USD)     | 92.1425                     |
| Amount (INR)                  | redacted                  |
| Settlement Date               | redacted                 |
| Login Name                    | redacted                  |
| Source                        | Fx-Retail                   |
| Bharat Connect Transaction ID |                             |
| Delivery Mode                 |                             |
| Settlement Branch Name        |                             |
| Settlement Branch Address     |                             |

### Using FX Retail via Bharat Connect Forex
#### Steps
1. Open BHIM and navigate to Bharat Connect (Bills & recharge) and Forex under Financial.
2. Choose the bank, enter the USD and pay via UPI mandate
3. FX-Retail Trade No is generated and sent via email/sms. Also available on the FX Retail web
4. Goto bank website for remittance flow, enter the Trade No

I earlier captured this whole flow [here](/building-wealth/blogs/fx-retail-via-bharat-connect-private-bank-speed-at-public-bank-rates-a-live-transaction-walkthrough/)

#### Example
Following is an example FX Retail email I received in the past.
| Field                         | Value              |
| ----------------------------- | ------------------ |
| FX-Retail Customer ID         | redacted           |
| Customer Name                 | SAKTHI PRIYAN      |
| Traded Date Time              | redacted           |
| FX-Retail Trade No.           | redacted           |
| Relationship Bank             | ICICI Bank Limited |
| Account Number of Customer    | redacted           |
| Instrument                    | CASH               |
| Trade Type                    | Booking            |
| Original Trade No.            |                    |
| BUY/SELL (USD)                | BUY                |
| Traded Amount (USD)           | redacted           |
| Trade Price (INR per USD)     | 94.9050            |
| Final Price (INR per USD)     | 95.1050            |
| Amount (INR)                  | redacted           |
| Settlement Date               | 04-May-2026        |
| Login Name                    | redacted           |
| Source                        | Bharat Connect     |
| Bharat Connect Transaction ID | redacted           |
| Delivery Mode                 | Remittance         |
| Settlement Branch Name        | DIGITAL            |
| Settlement Branch Address     | redacted           |

> Step 1 to Step 3 are one time setup.\
> Step 4 (required for FX Retail Web for private banks but not required for FX Retail via Bharat Connect)\
> Step 5 is the actual transaction where Trade No is generated and utilized.

## Bank Specific Setup Experience
### ICICI Bank
- Step 1: I first registered with ICICI and it went smooth
- Step 2: Not Applicable (As this is the first relationship bank)
- Step 3: Zero progress, still with very high 1.75% markup and branch staff/forex department/customer care not helping to set reasonable markup here. I side stepped this by using the default 20p/USD via Bharat Connect option.
- Step 4: Limits can be set up via service menu such as CCIL Deal Limit. 5% Amount is linened in the bank account based on the set limit
- Step 5: Online end to end. Through the **FX-Retail Trade No.** option is not promptly visible in the UI, it just worked well. 

### HDFC Bank

- Step 1: Not Applicable (Already setup with ICICI)
- Step 2: Went smooth
- Step 3: Got a default rate of 1.2% and RM/Branch moved this down to 50p/USD within few days of the request
- Step 4: Need to send email here to a specific id (When you raise limit request via FX Retail web you will see this email). Limit allowed only for 1 day
- Step 5: Online end to end, **FX-Retail Trade No.** is promptly visible and it just worked here as well.

### Bank of Baroda
- Step 1: Not Applicable (Already setup with ICICI)
- Step 2: Manual process with the branch staff, it took a while to get onboarded.
- Step 3: Got a minimum rate of 10p/USD based on the projected volume
- Step 4: Limit setup can be done for larger amount for longer time period. I filled up the form to set it up for a year. Not required till I hit the limits
- Step 5: Get approval from backend team via branch forex team. Then book the deal on FX Retail web and then forward the Trade Deal PDF to the branch forex team to process the remittance.

## Importance of Choosing the Right Bank & Branch

If your bank account is not with a branch that actively handles **forex transactions**, getting the correct markup rates or onboarding to **FX Retail** can become difficult.

### Choosing the Right Bank

Based on your comfort and service preference, you can choose between **private banks** or **public sector banks**. Need to pick up a bank which is integrated with FX Retail and preferably with Bharat Connect Forex integration.

I have used following banks for remittances as seen in this chapter:
- ICICI Bank (Fully online, fastest I have seen but, I couldn't succeed setting up markup rate in FX Retail)
- HDFC Bank (Fully online, fast and good RM/branch support for setting up the markup rates)
- Bank of Baroda (Offline/Slow but very good branch staff support and markup rate setup)

### Choosing the Right Branch

Not all bank branches handle **LRS remittances** and **FX Retail onboarding** efficiently.

Prefer branches that are:

- **Authorised Dealer (AD) branches**
- **Forex-focused branches**
- Branches that already service **HNI or frequent remittance customers**

Many regular retail branches are unfamiliar with **FX Retail workflows**, which can slow down onboarding and limit your ability to negotiate better FX markup rates.

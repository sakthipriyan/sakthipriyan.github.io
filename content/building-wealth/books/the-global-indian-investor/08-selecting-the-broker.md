---
title: "Selecting the Broker"
subtitle: "Evaluating international prime brokers and domestic intermediaries for accessing Irish UCITS ETFs."
type: "books"
chapter: 8
date: 2026-08-29
author: "Sakthi Priyan H"
draft: false
wealth_tags:
  - IBKR
  - Broker
---

## Why a Broker?

To invest directly in international ETFs — specifically, the highly tax-efficient Irish UCITS ETFs listed on European exchanges like the London Stock Exchange (LSE) — you require a foreign brokerage account. This account acts as your gateway for deploying Liberalised Remittance Scheme (LRS) capital. 

Indian residents face a unique logistical hurdle here. Traditional retail banking institutions physically located in Europe (e.g., Davy Select) or popular pan-European fintech platforms (e.g., Trading 212, DEGIRO, Lightyear) generally **refuse to onboard non-European Economic Area residents**. This exclusion is driven by strict Anti-Money Laundering (AML) protocols and the PRIIPs regulation. 

Consequently, access must be routed through either heavily regulated international prime brokerages with a global footprint or domestic Indian fintech overlays acting as introducing brokers. To evaluate these options, we can categorize them into three structural levels.

## Level 0: The US-Only Trap (Indian FinTechs)

The first generation of Indian cross-border fintech platforms — such as **INDmoney, Vested, Stockal, and ET Money** — revolutionized retail access by partnering with US clearing brokers (like DriveWealth) to offer fractional trading of US shares.

**The critical limitation**: Because their backend API infrastructure is fundamentally designed around US clearinghouses, these platforms are traditionally confined entirely to offering US-listed securities. **You cannot purchase a true Irish-domiciled UCITS ETF listed on the LSE through these platforms.** 


| Indian Platform | Backend US Broker | European ETF Access (US Persons) | European ETF Access (Non-US Persons) |
| :--- | :--- | :--- | :--- |
| **INDmoney** | DriveWealth / Alpaca | ❌ No | ❌ No |
| **Vested** | DriveWealth | ❌ No | ❌ No |
| **Stockal** | DriveWealth | ❌ No | ❌ No |
| **ET Money** | DriveWealth / Alpaca | ❌ No | ❌ No |
| **HDFC Securities** | DriveWealth (via Vested) | ❌ No | ❌ No |
| **Axis Securities** | DriveWealth (via Vested) | ❌ No | ❌ No |

*(Note: A platform like INDmoney might allow the purchase of `EIRL` — the iShares MSCI Ireland ETF — but this is merely a US-listed ETF tracking Irish domestic companies. It is completely distinct from a UCITS ETF and remains subject to the punitive 30% US dividend withholding tax and 40% estate tax.)*

While top private bank brokerages — such as **HDFC Securities** and **Axis Securities** — heavily market their "global investing" platforms, they typically partner with fintechs like Vested Finance (powered by DriveWealth). Consequently, despite the massive domestic brand name, their international offering remains structurally restricted to the US-only ecosystem. For a detailed breakdown of why US-listed ETFs destroy compounding compared to Irish ETFs, review [Chapter 6: What to Buy - Irish ETFs vs US ETFs](/building-wealth/books/the-global-indian-investor/06-what-to-buy-irish-etfs/).

*(Note: Major public sector bank brokerages, such as SBI Securities or BoB Capital Markets, currently lack dedicated retail global investing tie-ups entirely, leaving investors to seek direct platforms.)*

## Level 1: Indian Establishments with IBKR Backend

A specialized subset of platforms uses Interactive Brokers (IBKR) as their underlying clearing or custodial partner. This allows them to offer access to global markets (including Ireland/Europe) while abstracting some of the complexity for the investor.


Examples of these domestic intermediaries include:

| Indian Platform | Backend US Broker | European ETF Access (US Persons)* | European ETF Access (Non-US Persons) |
| :--- | :--- | :--- | :--- |
| **Paasa** | Interactive Brokers | ✅ Yes | ✅ Yes |
| **ICICI Direct Global** | Interactive Brokers | ✅ Yes | ✅ Yes |
| **Kotak Securities (Neo)** | Interactive Brokers | ✅ Yes | ✅ Yes |
| **India INX GA** | Interactive Brokers | ✅ Yes | ✅ Yes |
| **MoneyIsle (TradeCross)**| Interactive Brokers | ✅ Yes | ✅ Yes |
| **OmniScience Capital** | Interactive Brokers | ✅ Yes | ✅ Yes |
| **SMC Global IFSC** | Interactive Brokers | ✅ Yes | ✅ Yes |

*\*Note: While IBKR's architecture allows US persons to purchase European UCITS ETFs, doing so subjects the US taxpayer to highly punitive PFIC (Passive Foreign Investment Company) taxation. For Non-US persons (Indian residents), however, it is highly tax-efficient.*

**Pros of Level 1**:
- Easy to start with a familiar Indian interface.
- Additional features like automated Indian tax reports (Schedule FA, Form 67).
- Access to bundled LRS promotions (as discussed in the *How to Send Money* chapter).

**Cons of Level 1**:
- Needless addition of complexity and an intermediary fee layer on top of IBKR's base execution costs.
- Restrictive or trimmed-down web apps compared to the full broker platform.
- **No Desktop App Access**: You are locked out of IBKR's advanced Trader Workstation (TWS).
- Dependency on the intermediary's support team to get credentials or resolve direct account issues.

## Level 2: Direct International Prime Brokers

For investors seeking the absolute lowest long-term cost and full market control, opening an account directly with an international prime broker is the ultimate destination. The setup overhead is more or less the same as Level 1, but taxation filing and LRS must be taken care of by the investor themselves.

### Interactive Brokers (IBKR Direct)
IBKR stands as the undisputed primary conduit for global capital flows originating from India. 
- **Regulation**: Indian residents typically onboard with IBKR LLC (regulated by the US SEC/FINRA), providing SIPC insurance while fully supporting LRS remittances directly from Indian banks.
- **Costs**: Highly competitive. Trades on the LSE incur a minimal commission of ~£1.70 (or 0.05%). More crucially, their FX desk applies a negligible markup (~0.002%), preserving your principal when converting USD to GBP/EUR.
- **Accessibility**: No account minimums and no inactivity fees, making it capital-efficient for both systematic monthly investments (SIPs) and lump-sum deployments.
- **Platforms**: Full access to mobile, web, and the advanced Trader Workstation (TWS) desktop platform.

**Opening an IBKR account directly** (at ibkr.com/ind) gives the full account with no intermediary layer and remains the **highly recommended** path.

### Saxo Bank
Headquartered in Copenhagen, Saxo Bank serves as a premium, banking-grade alternative to IBKR.
- **Costs**: While they have eliminated minimum deposits for their "Classic" tier, they apply a 0.25% currency conversion fee (higher than IBKR) and an annual custody fee of 0.15%.
- **Optimization**: Astute investors can waive the custody fee by opting into Saxo's securities lending program. 

### Swissquote
A fully licensed Swiss bank, offering ultimate banking-grade custody and privacy, but its pricing architecture is deliberately prohibitive for small-scale retail investors.
- **Costs**: Strict $1,000 minimum deposit, high trading fees ($25–$30+ per trade), and mandatory quarterly custody fees (CHF 20–50). Mathematically optimal only for very large, static portfolios.

### Charles Schwab
While highly popular for US residents, Schwab restricts Non-Resident Aliens from purchasing EU-listed UCITS ETFs, making it unsuitable for the Irish ETF strategy.

## Summary Matrix

| Factor | Level 2 (IBKR Direct) | Level 1 (Paasa / ICICI Direct / INX) | Level 0 (INDmoney / Vested / ET Money) |
|---|---|---|---|
| **Primary Market** | Global (LSE, EU, US) | Global (via IBKR) | US Only |
| **Irish UCITS ETFs** | ✅ Yes | ✅ Yes (Platform dependent) | ❌ No |
| **Brokerage** | ~$1 to £1.70 / order | IBKR + intermediary fee | Zero or low |
| **FX Conversion** | IBKR IdealFX (~0.002%) | Platform/Bank rates | Platform rate |
| **Desktop TWS Access** | ✅ Yes | ❌ No | ❌ No |
| **LRS Handling** | Self-managed | Bundled / Assisted | Integrated |

## Opening an IBKR Direct Account

Getting started with IBKR Direct is relatively straightforward for Indian residents:
1. **Sign Up**: Visit `ibkr.com/ind` to begin the application.
2. **Account Type**: Select "Individual" (or Joint if preferred) and choose a "Cash" account initially. You can upgrade to a Margin account later if needed.
3. **Base Currency**: Select USD as your base currency to avoid unnecessary conversion displays for your US/Irish ETFs.
4. **KYC**: You will need your PAN card, Aadhaar for address proof, and a bank statement for funding proof.
5. **Funding**: Once approved, use the LRS methods discussed in earlier chapters to wire funds. Always create a "Deposit Notification" in the IBKR portal before wiring from your Indian bank.

## Account Types and Succession Planning

A critical limitation of international brokerages like IBKR is the **lack of a standard nomination facility** for non-US residents. Unlike Indian demat accounts where you can easily assign a nominee to take over the assets, an international Individual account requires standard estate processing upon the account holder's death.

### The Problem with Individual Accounts
If you open an "Individual" account and pass away, your heirs must go through a lengthy estate settlement process with the broker. While holding Irish UCITS ETFs completely shields your heirs from the dreaded US IRS estate tax clearance (and the 40% tax itself), the broker will still require proper legal documentation (like a probated Will or Succession Certificate) to transfer the assets. Having a clearly drafted Will can significantly fast-track this process, but a delay is inevitable.

### The Joint Account Solution (With Right of Survivorship)
The most effective workaround for succession planning is to open a **Joint Account** (specifically, Joint Tenants with Right of Survivorship) with your spouse. 
- **The Benefit**: In the event of one holder's death, the surviving spouse automatically retains full access and ownership of the account in a very short span of time, bypassing the lengthy probate and estate processing entirely. 
- **The Catch (Tax Filing)**: The Indian Income Tax Department requires all foreign assets to be disclosed. If you have a Joint Account, the secondary holder (e.g., your spouse) is considered a beneficial owner. Consequently, **the spouse must also declare the IBKR account in the Schedule FA (Foreign Assets) section of their own Income Tax Return**, even if they did not fund it. 

### The Estate Planning Matrix: Worst to Best

When you combine asset domicile (US vs. Irish) with the account type (Individual vs. Joint), the outcomes for your heirs change drastically. 

| Scenario | Asset Type | Account Type | Succession Outcome |
| :--- | :--- | :--- | :--- |
| **Worst** | US ETFs (e.g., VOO) | Individual | **High Risk & Delay**: Subject to 40% US Estate Tax. Requires IRS tax clearance (Form 5173), massive legal fees, and lengthy broker probate. |
| **Bad** | US ETFs (e.g., VOO) | Joint Account | **Tax Risk**: Survivor gets immediate access, but the portfolio remains structurally exposed to US Estate Tax upon the survivor's passing (or requires complex US tax filings). |
| **Good** | Irish ETFs (e.g., CSPX) | Individual | **Delayed but Safe**: No US Estate Tax and no IRS clearance needed. However, transferring the account requires Indian probate/Will execution which takes time. |
| **Best** | Irish ETFs (e.g., CSPX) | Joint Account | **Immediate & Safe**: No US Estate Tax. The surviving spouse retains instant access and ownership of the account via Right of Survivorship, entirely bypassing probate. |

> **Key Takeaway**: A Joint Account holding Irish UCITS ETFs provides the smoothest, most tax-efficient generational wealth transfer for an Indian investor, provided both spouses are prepared to file Schedule FA annually.

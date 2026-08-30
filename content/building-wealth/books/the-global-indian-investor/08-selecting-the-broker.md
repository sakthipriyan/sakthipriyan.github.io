---
title: "Selecting the Broker"
subtitle: "Evaluating international prime brokers, domestic intermediaries, and the GIFT City route for accessing Irish UCITS ETFs."
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

The first generation of Indian cross-border fintech platforms — such as **INDmoney, Vested, and Stockal** — revolutionized retail access by partnering with US clearing brokers (like DriveWealth) to offer fractional trading of US shares.

**The critical limitation**: Because their backend API infrastructure is fundamentally designed around US clearinghouses, these platforms are traditionally confined entirely to offering US-listed securities. **You cannot purchase a true Irish-domiciled UCITS ETF listed on the LSE through these platforms.** 


| Indian Platform | Backend US Broker | European ETF Access |
| :--- | :--- | :--- |
| **[Appreciate](https://appreciatewealth.com/)** | [DriveWealth](https://drivewealth.com/) | ❌ No |
| **[Axis Securities](https://simplehai.axisdirect.in/dynamicWeb/global-investing/index.html)** | [DriveWealth](https://drivewealth.com/) (via Vested) | ❌ No |
| **[HDFC Securities](https://www.hdfcsec.com/globalinvesting)** | [DriveWealth](https://drivewealth.com/) (via Vested) | ❌ No |
| **[INDmoney](https://www.indmoney.com/us-stocks)** | [DriveWealth](https://drivewealth.com/) / [Alpaca](https://alpaca.markets/) | ❌ No |
| **[Stockal](https://www.stockal.com/)** | [DriveWealth](https://drivewealth.com/) | ❌ No |
| **[Tickertape](https://www.tickertape.in/)** | [ViewTrade](https://viewtrade.com/) | ❌ No |
| **[Vested](https://vestedfinance.com/in/)** | [DriveWealth](https://drivewealth.com/) | ❌ No |

*(Note: A platform like INDmoney might allow the purchase of `EIRL` — the iShares MSCI Ireland ETF — but this is merely a US-listed ETF tracking Irish domestic companies. It is completely distinct from a UCITS ETF and remains subject to the punitive 25% US dividend withholding tax and 40% estate tax.)*

While top private bank brokerages — such as **HDFC Securities** and **Axis Securities** — heavily market their "global investing" platforms, they typically partner with fintechs like Vested Finance (powered by DriveWealth). Consequently, despite the massive domestic brand name, their international offering remains structurally restricted to the US-only ecosystem. For a detailed breakdown of why US-listed ETFs destroy compounding compared to Irish ETFs, review [Chapter 6: What to Buy - Irish ETFs vs US ETFs](/building-wealth/books/the-global-indian-investor/06-what-to-buy-irish-etfs/).

*(Note: Major public sector bank brokerages, such as SBI Securities or BoB Capital Markets, currently lack dedicated retail global investing tie-ups entirely, leaving investors to seek direct platforms.)*

## Level 1: Indian Establishments with IBKR Backend

A specialized subset of platforms uses Interactive Brokers (IBKR) as their underlying clearing or custodial partner. This allows them to offer access to global markets (including Ireland/Europe) while abstracting some of the complexity for the investor.


Examples of these domestic intermediaries include:

| Indian Platform | Backend US Broker | European ETF Access |
| :--- | :--- | :--- |
| **[ICICI Direct Global](https://www.icicidirect.com/global-investment-services)** | [Interactive Brokers](https://www.interactivebrokers.com/) | ✅ Yes |
| **[Kotak Securities (Neo)](https://www.kotakneo.com/global-investment/)** | [Interactive Brokers](https://www.interactivebrokers.com/) | ✅ Yes |
| **[MoneyIsle (TradeCross)](https://moneyisle.in/tradecross/)** | [Interactive Brokers](https://www.interactivebrokers.com/) | ✅ Yes |
| **[Paasa](https://paasa.com/)** | [Interactive Brokers](https://www.interactivebrokers.com/) | ✅ Yes |

**Pros of Level 1**:
- Easy to start with a familiar Indian interface.
- Additional features like automated Indian tax reports (Schedule FA, Form 67).
- Access to bundled LRS promotions (as discussed in the *How to Send Money* chapter).

**Cons of Level 1**:
- Needless addition of complexity and an intermediary fee layer on top of IBKR's base execution costs.
- Restrictive or trimmed-down web apps compared to the full broker platform.
- **No Desktop App Access**: You are locked out of IBKR's advanced Trader Workstation (TWS).
- Dependency on the intermediary's support team to get credentials or resolve direct account issues.


### Deep Dive: The GIFT City IFSC Route

Gujarat International Finance Tec-City (GIFT City) has emerged as a strategic sandbox for global capital routing. The International Financial Services Centres Authority (IFSCA) established a "Global Access Framework," allowing IFSC-registered brokers to act as Global Access Providers (GAPs) or Introducing Brokers. 

For Indian residents looking to buy European UCITS ETFs, this route offers a highly regulated, LRS-compliant pathway. The prominent entities providing this access include:

| GIFT City Platform | Backend Execution Partner | European ETF Access |
| :--- | :--- | :--- |
| **[India INX GA](https://www.indiainxga.com/)** | Interactive Brokers | ✅ Yes |
| **[NSE IX GAP](https://www.nseix.com/)** | Multiple / Cyprus SE | ⏳ Planned (FY27) |
| **[SMC Global IFSC](https://www.smcglobalifsc.com/)** | Interactive Brokers | ✅ Yes |

- **India INX Global Access**: Currently the most robust option within the IFSC. It acts as a centralized digital platform providing a gateway to over 135 exchanges across 33 countries, explicitly including **European exchanges**. They achieve this by partnering with international prime brokers on the backend.
- **NSE IX**: Operates its own "Global Access Platform" (GAP). While initially focused entirely on US equities, NSE IX recently signed a strategic MoU with the Cyprus Stock Exchange to act as a springboard into the European Union, with plans to finalize broad European exchange connectivity by FY27.
- **SMC Global IFSC**: Operates as a specialized introducing broker under the IFSC framework to route clients to global execution platforms.

*(Note: Major Indian Mutual Fund houses are also aggressively setting up entities in GIFT City. By launching Alternative Investment Funds (AIFs) in this jurisdiction, these AMCs can pool LRS capital directly from Indian high-net-worth investors, completely bypassing the restrictive $7 Billion RBI industry limit that froze domestic global mutual funds.)*

*(Note on FinTech GIFT City Routing: Platforms like INDmoney are increasingly routing clients through their own GIFT City entities. While this attempts to reduce steep SWIFT/intermediary bank charges by remitting to a domestic IFSC bank branch instead of a US bank, the strict LRS rules, 20% TCS, and FX markups still fully apply. More importantly, it does not change the underlying asset class. They are still exclusively offering US-listed equities. This means you remain fully exposed to the 25% US dividend withholding tax and 40% estate tax, and you still cannot purchase Irish UCITS ETFs through this route.)*

**The Verdict on GIFT City**: While politically and regulatorily favorable, mechanically, utilizing a GIFT City broker places you squarely in the **Level 1** category. You are using an Introducing Broker (India INX GA) that ultimately routes your orders to an International Prime Broker (like IBKR) to execute on the London Stock Exchange. It is an excellent, compliant setup, but it carries the same limitations of Level 1 (intermediary dependence, potential lack of advanced desktop platforms).

## Level 2: Direct International Prime Brokers

For investors seeking the absolute lowest long-term cost and full market control, opening an account directly with an international prime broker is the ultimate destination. The setup overhead is more or less the same as Level 1, but taxation filing and LRS must be taken care of by the investor themselves.

| International Prime Broker | Domicile | European ETF Access |
| :--- | :--- | :--- |
| **[Charles Schwab](https://international.schwab.com/)** | United States | ❌ No |
| **[Interactive Brokers](https://www.interactivebrokers.co.in/)** | United States | ✅ Yes |
| **[Saxo Bank](https://www.home.saxo/)** | Denmark | ✅ Yes |
| **[Swissquote](https://en.swissquote.com/)** | Switzerland | ✅ Yes |


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

| Factor | Level 2 (IBKR Direct) | Level 1 (Paasa / ICICI Direct / Kotak) | Level 0 (INDmoney / Vested / Stockal) |
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

## My Personal Journey

My foray into direct global investing started when the RBI imposed industry-wide limits on international mutual funds, effectively blocking that convenient route for a long time. 

Looking for alternatives, I discovered the **ICICI Direct Global** approach (Level 1) and opened my first account there. It served as an excellent stepping stone, abstracting away some of the complexities while I learned the mechanics of cross-border investing. 

After using it for a while and extensively researching the brokerage landscape (which eventually formed the basis of this chapter), I realized the limitations of using an intermediary. Once I became comfortable navigating LRS remittances directly with my bank, I eventually opened a **Direct IBKR account** (Level 2).

Currently, I have moved my residual cash from the ICICI Direct Global account to my direct IBKR account. I am yet to transfer the actual ETF positions, but fortunately, the old ICICI account is not incurring any ongoing maintenance costs since I downgraded it to their free pricing tier.

**On the estate planning front:** I am currently utilizing the "Good" approach (Individual Account holding Irish ETFs) rather than the "Best" approach (Joint Account). The primary reason is administrative: opening a Joint Account would classify my spouse as a beneficial owner, forcing her to upgrade to the far more complex **ITR-2** tax filing just to declare the account in Schedule FA. For now, relying on an Individual Account supported by a clearly drafted Will avoids that annual tax-filing friction.

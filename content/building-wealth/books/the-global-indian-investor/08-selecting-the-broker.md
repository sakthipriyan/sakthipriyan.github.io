---
title: "Selecting the Broker"
subtitle: "Evaluating international brokers, domestic intermediaries, and the GIFT City route for accessing Irish UCITS ETFs."
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

Indian residents face a roadblock here: popular European brokers (like Trading 212 or DEGIRO) generally refuse to open accounts for non-European residents due to strict local regulations. 

Consequently, access must be routed through either heavily regulated international brokers with a global footprint or domestic Indian fintech overlays acting as introducing brokers. To evaluate these options, we can categorize them into three structural tiers.

## Tier 0: US-Only Platforms

The first generation of Indian cross-border fintech platforms — such as **INDmoney, Vested, and Stockal** — revolutionized retail access by partnering with US clearing brokers (like DriveWealth) to offer fractional trading of US shares.

**The critical limitation**: Because their backend API infrastructure is fundamentally designed around US clearinghouses, these platforms are traditionally confined entirely to offering US-listed securities. **As currently offered, these platforms do not provide access to Irish-domiciled UCITS ETFs listed on European exchanges such as the LSE.** 


| Indian Platform | Broker / execution partner | European ETF Access |
| :--- | :--- | :--- |
| **[Appreciate](https://appreciatewealth.com/us-stocks/)** | [DriveWealth](https://drivewealth.com/) | ❌ No |
| **[Axis Securities](https://simplehai.axisdirect.in/dynamicWeb/global-investing/index.html)** | [DriveWealth](https://drivewealth.com/) (via Vested) | ❌ No |
| **[Dhan](https://dhan.co/us-stocks/)** | [ViewTrade](https://viewtrade.com/) | ❌ No |
| **[HDFC Securities](https://www.hdfcsec.com/globalinvesting)** | [DriveWealth](https://drivewealth.com/) (via Vested) | ❌ No |
| **[INDmoney](https://www.indmoney.com/us-stocks)** | [DriveWealth](https://drivewealth.com/) / [Alpaca](https://alpaca.markets/) | ❌ No |
| **[Stockal (Borderless)](https://www.borderless.world/stocks)** | [DriveWealth](https://drivewealth.com/) | ❌ No |
| **[Tickertape](https://www.tickertape.in/us-stocks)** | [ViewTrade](https://viewtrade.com/) | ❌ No |
| **[Vested](https://vestedfinance.com/in/)** | [DriveWealth](https://drivewealth.com/) | ❌ No |

### Notes on Tier 0 Platforms

*   **The "Irish" ETF Illusion:** A platform like INDmoney might allow the purchase of `EIRL` (the iShares MSCI Ireland ETF). Be aware that this is merely a US-listed ETF tracking Irish domestic companies. `EIRL` is a US-listed, US-domiciled ETF that happens to track Irish companies. This is entirely different from a European-listed, Irish-domiciled UCITS ETF like `CSPX` or `VWRA`. Because `EIRL` is US-domiciled, it remains fully exposed to the US tax traps detailed in [Chapter 6: US Estate Tax Risk](/building-wealth/books/the-global-indian-investor/06-what-to-buy-irish-etfs/#1-us-estate-tax-risk).
*   **Private Bank Wrappers:** While top private bank brokerages—such as **HDFC Securities** and **Axis Securities**—heavily market their "global investing" platforms, they typically partner with fintechs like Vested (powered by DriveWealth). Consequently, despite the massive domestic brand name, their offering remains structurally restricted to the US-only ecosystem. (For a detailed breakdown of why US-listed ETFs destroy compounding compared to Irish ETFs, review [Chapter 6: Why I chose Irish ETFs](/building-wealth/books/the-global-indian-investor/06-what-to-buy-irish-etfs/#why-i-chose-irish-etfs)).
*   **Public Sector Banks:** Major public sector bank brokerages, such as **SBI Securities** or **BoB Capital Markets**, currently lack dedicated retail global investing tie-ups entirely, leaving investors to seek direct platforms.
*   **Vested’s "UCITS" Marketing:** Vested Finance recently began marketing access to "UCITS". However, it is critical to understand that **only actively managed UCITS mutual funds are accessible through this route, not UCITS ETFs** (like CSPX or VWRA). Because their backend (DriveWealth) lacks direct market access to European stock exchanges, they cannot execute trades for exchange-listed ETFs. Instead, they facilitate off-exchange purchases of expensive, actively managed mutual funds directly from asset managers. While these mutual funds technically bypass the US estate tax, they carry much higher expense ratios and entirely fail to provide access to the cheap, broad-market European indexes discussed in this book.

### The Hidden Risk: Platform Dependency

Because these platforms act as thin technology wrappers sitting between you, Indian banking regulations (LRS/TCS), and a foreign clearinghouse API, their business models can create significant platform-dependency risk. 

When a fintech wrapper decides to sunset its global investing feature, the investor suffers massively. We have seen this repeatedly:
*   **Groww** abruptly halted its US stocks offering in early 2024.
*   **Fi Money** completely sunsetted its US stocks feature in April 2026.
*   **Winvesta** and **Kuvera** faced similar closures or migrations.

When a fintech exits the market, investors become dependent on the provider's transition process. Depending on the arrangement, this can involve transferring positions to another broker via ACATS (Automated Customer Account Transfer Service), opening a replacement account, or being forced into liquidating positions.

This structural fragility is another reason serious, long-term investors naturally gravitate toward direct international brokers (Tier 2).

## Tier 1: Indian Establishments with IBKR Backend

A specialized subset of platforms uses Interactive Brokers (IBKR) as their underlying clearing or custodial partner. This allows them to offer access to global markets (including Ireland/Europe) while abstracting some of the complexity for the investor.


Examples of these domestic intermediaries include:

| Indian Platform | Broker / execution partner | European ETF Access |
| :--- | :--- | :--- |
| **[ICICI Direct Global](https://www.icicidirect.com/global-investment-services)** | [Interactive Brokers](https://www.interactivebrokers.com/) | ✅ Yes |
| **[Kotak Securities (Neo)](https://www.kotakneo.com/global-investment/)** | [Interactive Brokers](https://www.interactivebrokers.com/) | ✅ Yes |
| **[MoneyIsle (TradeCross)](https://moneyisle.in/tradecross/)** | [Interactive Brokers](https://www.interactivebrokers.com/) | ✅ Yes |
| **[Paasa](https://paasa.com/)** | [Interactive Brokers](https://www.interactivebrokers.com/) | ✅ Yes |

**Pros of Tier 1**:
- Easy to start with a familiar Indian interface.
- Some platforms provide tax reports or documentation that can simplify Indian tax filing.
- Access to bundled LRS promotions (as discussed in the *How to Send Money* chapter).

*Note: Product capabilities and routing partnerships change over time. Always verify with the platform whether their current offering actively permits direct execution of Irish-domiciled UCITS ETFs on European exchanges.*

**Cons of Tier 1**:
- Additional complexity and an intermediary fee layer on top of the underlying broker's costs.
- **Platform Access**: Intermediary accounts typically provide a restrictive, trimmed-down web experience compared to a direct IBKR account. The availability of advanced tools like TWS or IBKR Desktop depends entirely on the specific intermediary's arrangement.
- Dependency on the intermediary's support team to get credentials or resolve direct account issues.


### Deep Dive: The GIFT City IFSC Route

Gujarat International Finance Tec-City (GIFT City) has emerged as a strategic sandbox for global capital routing. The International Financial Services Centres Authority (IFSCA) established a "Global Access Framework," allowing IFSC-registered brokers to act as Global Access Providers (GAPs) or Introducing Brokers. 

For Indian residents looking to buy European UCITS ETFs, this route offers a highly regulated, LRS-compliant pathway. The prominent entities providing this access include:

| GIFT City Platform | Backend Execution Partner | European ETF Access |
| :--- | :--- | :--- |
| **[India INX GA](https://www.indiainxga.com/)** | Interactive Brokers | ✅ Yes |
| **[NSE IX GAP](https://www.nseix.com/)** | Multiple / Cyprus SE | ⏳ Planned (FY27) |
| **[SMC Global IFSC](https://www.smcglobalifsc.com/)** | Interactive Brokers | ✅ Yes |

- **India INX Global Access**: One of the more established options within the IFSC. It acts as a centralized digital platform providing a gateway to over 135 exchanges across 33 countries (according to [India INX's documentation](https://www.indiainx.com/)), explicitly including **European exchanges**. They achieve this by partnering with international brokers on the backend.
- **NSE IX**: Operates its own "Global Access Platform" (GAP). While initially focused entirely on US equities, NSE IX recently signed a strategic MoU with the Cyprus Stock Exchange to act as a springboard into the European Union, with plans to finalize broad European exchange connectivity by FY27.
- **SMC Global IFSC**: Operates as a specialized introducing broker under the IFSC framework to route clients to global execution platforms.

#### Other Emerging Use Cases in GIFT City
The IFSC ecosystem is rapidly expanding beyond simple introducing brokers, serving two other major functions for global investing:
1. **The Mutual Fund Workaround**: Major Indian Asset Management Companies (AMCs) are aggressively setting up Alternative Investment Funds (AIFs) in GIFT City. By doing so, they can pool LRS capital directly from Indian high-net-worth investors, providing an alternative route for pooling LRS capital under the applicable IFSC framework that froze domestic global mutual funds (as covered in [Chapter 2: Fragility in Indian Mutual Funds](/building-wealth/books/the-global-indian-investor/02-three-paths-to-global-investing/#fragility-in-indian-mutual-funds-investing-globally)).
2. **The FinTech Cost Optimization**: Retail platforms (like INDmoney) are increasingly routing clients through their own GIFT City entities. While this attempts to reduce steep SWIFT/intermediary bank charges by remitting to a domestic IFSC bank branch instead of a US bank, the strict LRS rules, 20% TCS (see [Chapter 5: What is TCS on LRS?](/building-wealth/books/the-global-indian-investor/05-tcs-opportunity-cost/#what-is-tcs-on-lrs)), and FX markups still fully apply. *More importantly, it does not change the underlying asset class.* Their current offering remains focused on US-listed securities. You still cannot purchase Irish UCITS ETFs through this route.

**The Verdict on GIFT City**: While politically and regulatorily favorable, mechanically, utilizing a GIFT City broker for Irish ETFs places you squarely in the **Tier 1** category. You are using an Introducing Broker (like India INX GA) that ultimately routes your orders to an International Broker (like IBKR) to execute on the London Stock Exchange. It is an excellent, compliant setup, but it carries the same limitations as Tier 1 (intermediary dependence, potential lack of advanced desktop platforms).

> **An Evolving Landscape**: GIFT City is still in its early days. Recent proposals aim to permit the [**secondary listing of global ETFs on the NSE IX**](https://www.moneycontrol.com/news/business/markets/gift-city-opens-its-door-wider-through-proposal-for-secondary-listing-of-global-etfs-14017534.html). While this could eventually allow direct access to Irish UCITS ETFs without needing a foreign broker account, we must "wait and watch" if global issuers like BlackRock or Vanguard are actually willing to undertake the regulatory overhead to list there.


## Tier 2: Direct International Brokers

For investors prioritizing long-term cost, control, and independence from domestic intermediaries, opening an account directly with an international broker is the preferred route. The setup overhead is more or less the same as Tier 1, but taxation filing and LRS must be taken care of by the investor themselves.

| International Broker | Domicile | European ETF Access |
| :--- | :--- | :--- |
| **[Charles Schwab](https://international.schwab.com/)** | United States | ❌ No |
| **[Interactive Brokers](https://www.interactivebrokers.co.in/en/home.php)** | United States | ✅ Yes |
| **[Saxo Bank](https://www.home.saxo/)** | Denmark | ✅ Yes |
| **[Swissquote](https://en.swissquote.com/)** | Switzerland | ✅ Yes |


### Charles Schwab
I did not shortlist Schwab because its current European UCITS trading workflow for Indian residents is significantly less convenient and more expensive than IBKR's.

### Interactive Brokers (IBKR Direct)
IBKR is one of the most established international brokers available to Indian residents seeking direct access to global markets. 
- **Regulation**: Your global investing account is held with their US entity (IBKR LLC, regulated by the US SEC/FINRA). Notably, Interactive Brokers also has a direct presence in the Indian stock markets and is locally registered with SEBI, adding a strong layer of institutional trust. They fully support LRS remittances directly from Indian banks.
- **Costs**: Western European ETFs typically incur commissions of ~$2 to $4 per trade minimum (which grows with volume), depending on whether you opt for IBKR's [Fixed or Tiered pricing structure](https://www.interactivebrokers.co.in/en/pricing/commissions-stocks-europe.php) and the specific exchange.
- **Accessibility**: No account minimums and no inactivity fees, making it capital-efficient for both systematic monthly investments (SIPs) and lump-sum deployments.
- **Platforms**: Full access to mobile, web, the modern **IBKR Desktop** app, and the highly advanced Trader Workstation (TWS).

> **Opening an IBKR account directly** gives the full account with no intermediary layer and remains the **highly recommended** path.

#### Opening an Account

Getting started with IBKR Direct is relatively straightforward for Indian residents:
1. **Sign Up**: Visit [interactivebrokers.co.in](https://www.interactivebrokers.co.in/en/home.php) to begin the application.
2. **Account Type**: Select "Individual" or "Joint" (see [Succession Planning](#account-types-and-succession-planning) below). You must choose a **"Cash"** account to comply with RBI LRS rules against leveraged trading (IBKR natively hides Margin accounts for Indian residents).
3. **Base Currency**: Select USD as your base currency to avoid unnecessary conversion displays for your US/Irish ETFs.
4. **KYC**: You will need your PAN card and Aadhaar for address proof.
5. **Funding**: Once approved, use the LRS methods discussed in [Chapter 3: Execution Flow](/building-wealth/books/the-global-indian-investor/03-lrs-how-to-send-money/#execution-flow) to wire funds. Always create a "Deposit Notification" in the IBKR portal before wiring from your Indian bank.

### Saxo Bank
Headquartered in Copenhagen, Saxo Bank serves as a premium, banking-grade alternative to IBKR. *(Note: Saxo is included for completeness; availability for new Indian-resident applicants should be checked directly with Saxo.)*
- **Costs**: Standard custody fees historically run around 0.12% to 0.15% annually depending on your region, which creates an ongoing drag on portfolio growth compared to IBKR.
- **Accessibility**: Better suited for larger portfolios prioritizing European banking-grade security.

### Swissquote
A fully licensed Swiss bank offering ultimate banking-grade custody and privacy, but its pricing architecture is deliberately prohibitive for small-scale retail investors.
- **Costs**: Imposes high trading commissions (typically $25–$30+ per trade on international exchanges) and mandatory quarterly custody fees (minimum CHF 20 per quarter). Its fee structure makes it more appropriate for investors who place a high value on Swiss banking/custody infrastructure and are less sensitive to higher trading and custody costs.

## Summary Matrix

| Factor | Tier 0 (INDmoney / Vested / Stockal) | Tier 1 (Paasa / ICICI Direct / Kotak) | Tier 2 (IBKR Direct) |
|---|---|---|---|
| **Primary Market** | US Only | Global (via IBKR) | Global (LSE, EU, US) |
| **Irish UCITS ETFs** | ❌ No | ✅ Yes (Platform dependent) | ✅ Yes |
| **Brokerage** | Zero or low | IBKR + intermediary fee | ~$2 to $4 minimum / order |
| **FX Conversion** | Platform Markup (INR ➞ USD) | Platform/bank dependent | Bank Rates (INR ➞ USD)<br>See [Chapter 3: Cost Components in an Overseas Remittance](/building-wealth/books/the-global-indian-investor/03-lrs-how-to-send-money/#cost-components-in-an-overseas-remittance-lrs) |
| **Desktop TWS Access** | ❌ No | Platform dependent | ✅ Yes |
| **LRS Handling** | Integrated | Bundled / Assisted | Self-managed |

## SIPC Protection

For platforms utilizing a US entity (such as DriveWealth for Tier 0 or IBKR LLC for Tier 1 and 2), where the assets are held with a SIPC-member US broker-dealer, SIPC protection may apply.

> SIPC protects against the failure of the broker, subject to its rules and limits (up to $500,000, including a $250,000 limit for cash); it does not protect against market losses.

## Account Types and Succession Planning

A critical limitation of international brokerages like IBKR is the **lack of a standard nomination facility** for non-US residents. While US residents can easily assign a **"Transfer on Death" (TOD)** beneficiary to automatically bypass probate, this legal mechanism is not available to foreign residents. Thus, unlike Indian demat accounts where a nominee simply takes over, an international Individual account requires standard estate processing upon the account holder's untimely demise.

### The Problem with Individual Accounts
If you open an "Individual" account and pass away, your heirs must go through a lengthy estate settlement process with the broker. While holding Irish UCITS ETFs generally shields your heirs from direct U.S. estate-tax exposure (recall the $60,000 Form 706-NA filing threshold detailed in [Chapter 6: US Estate Tax Rates](/building-wealth/books/the-global-indian-investor/06-what-to-buy-irish-etfs/#us-estate-tax-rates)), the broker will still require proper legal documentation (like a probated Will or Succession Certificate) to transfer the assets. Having a clearly drafted Will can significantly fast-track this process, but a delay is inevitable.

### The Joint Account Solution (With Right of Survivorship)
The most effective workaround for succession planning is to open a **Joint Account** (specifically, Joint Tenants with Right of Survivorship) with your spouse. 
- **The Benefit**: In the event of one holder's untimely demise, the surviving spouse may be able to take control of the account without the same lengthy estate-administration process that applies to an individual account. 
- **The Catch (Tax Filing)**: The Indian Income Tax Department requires all foreign assets to be disclosed. If you have a Joint Account, the secondary holder (e.g., your spouse) is considered a beneficial owner. A joint foreign account can create a Schedule FA reporting obligation for the second holder, depending on their ownership/beneficial-interest status and tax-filing circumstances. 

### The Estate Planning Matrix: Worst to Best

When you combine asset domicile (US vs. Irish) with the account type (Individual vs. Joint), the outcomes for your heirs change drastically. 

| Scenario | Asset Type | Account Type | Main Consideration |
| :--- | :--- | :--- | :--- |
| **1** | US ETFs (e.g., VOO) | Individual | U.S.-situs estate-tax exposure + estate administration |
| **2** | US ETFs (e.g., VOO) | Joint Account | May simplify succession, but U.S.-situs estate-tax exposure remains |
| **3** | Irish ETFs (e.g., CSPX) | Individual | Generally avoids direct U.S.-situs exposure; estate administration still required |
| **4** | Irish ETFs (e.g., CSPX) | Joint Account | May simplify succession while generally avoiding direct U.S.-situs exposure |

> **Key Takeaway**: For an Indian investor using this structure, a properly configured joint account holding Irish UCITS ETFs may simplify succession while generally avoiding direct U.S.-situs exposure. The trade-off is additional reporting and tax-filing considerations for the joint holder.

## My Personal Journey

My foray into direct global investing started when the RBI imposed industry-wide limits on international mutual funds, effectively blocking that convenient route for a long time. 

Initially, I opened an account with **INDmoney** (Tier 0), but I didn't actually use it, as I was still actively researching the global investing landscape. 

Through that research, I discovered the **ICICI Direct Global** approach (Tier 1) and opened my first funded account there. It served as an excellent stepping stone, abstracting away some of the complexities while I learned the mechanics of cross-border investing. 

After using it for a while and extensively researching the brokerage landscape (which eventually formed the basis of this chapter), I realized the limitations of using an intermediary. Once I became comfortable navigating LRS remittances directly with my bank, I eventually opened a **Direct IBKR account** (Tier 2).

Currently, I have moved my residual cash from the ICICI Direct Global account to my direct IBKR account. I am yet to transfer the actual ETF positions, but fortunately, the old ICICI account is not incurring any ongoing maintenance costs since I downgraded it to their free pricing tier.

Given my priority for cost efficiency, using IBKR exclusively minimizes intermediary risk, but concentrating the portfolio with a single broker creates broker concentration risk. These are different risks. As my portfolio grows, I will reassess whether broker diversification is worthwhile despite the additional complexity.

**On the estate planning front:** I am currently utilizing the "Good" approach (Individual Account holding Irish ETFs) rather than the "Best" approach (Joint Account). The primary reason is administrative: I concluded that opening a Joint Account would create an additional Schedule FA reporting obligation for my spouse and would require her to file the more complex **ITR-2** tax form. For now, relying on an Individual Account—with plans to create a clearly drafted Will to support it—avoids that annual tax-filing friction.

---

> Work In Progress: Writing further chapters and refining published chapters. Stay tuned!

*Next up: Chapter 9 on Taxation and Tax Filing.*

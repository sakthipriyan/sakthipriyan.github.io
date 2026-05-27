---
title: "Selecting the Global Indexes"
subtitle: "Mapping the Irish ETF Universe Across Equities, Sovereign Debt and Physical Gold"
type: "books"
chapter: 7
date: 2026-04-25
author: "Sakthi Priyan H"
draft: false
---

In previous chapter we have seen that, Irish ETFs are more efficient for Indian Investor compared to US ETFs. As part of this Chapter we will look at Irish ETF universe and shortlist various ETFs available for Equities, Debt and Gold.

**Important**: When you pick the TICKER, ensure it is traded in USD to avoid additional currency conversions.

## Global Equity ETFs

When expanding outside India, you want to capture either the entire investable world or focus purely on developed markets (since your domestic portfolio already gives you heavy emerging market exposure).

When constructing a global passive equity portfolio, the index provider (MSCI, FTSE) is the architect and the ETF issuer (Vanguard, BlackRock) is simply the builder executing the blueprint.

FTSE (Financial Times Stock Exchange, now FTSE Russell) and MSCI (Morgan Stanley Capital International) are the two dominant architects in the global equity space. While their goal is the same—to capture the performance of global stock markets—they draw their lines differently regarding market capitalization and country classification.

### The Methodology

* **MSCI**: Focuses exclusively on **Large and Mid-cap** stocks. Capturing ~85% of the market keeps transaction costs and bid-ask spreads low by sticking to highly liquid equities.
* **MSCI IMI (Investable Market Index)**: Takes the standard Large/Mid-cap index and adds **Small-cap** stocks to cover ~99% of the investable market. This is the truest representation of a "total market" index.
* **FTSE**: While their standard indices officially target Large and Mid-caps (~90-95% coverage), their methodology naturally dips slightly deeper down the market-cap spectrum than standard MSCI. Vanguard heavily favors this tier for its flagship global funds to keep licensing costs (and TERs) low.
* **FTSE All-Cap**:This is FTSE’s equivalent to MSCI’s IMI tier. By adding Small-cap stocks to the standard blueprint, it captures the full 99% of the investable market to provide true total-market exposure.
### The Classification Trap: Mixing Indices

If you are building a one-fund equity portfolio (e.g., just buying a single Global fund), the difference between FTSE and MSCI is negligible; their long-term performance is virtually identical.

However, if you are splitting your portfolio into separate **Developed Markets (DM)** and **Emerging Markets (EM)** ETFs to control your own weightings, **you must never mix index providers**.

The critical difference is how they classify **South Korea** and **Poland**:

* **FTSE** classifies South Korea and Poland as **Developed Markets**.
* **MSCI** classifies South Korea and Poland as **Emerging Markets**.

If you pair a FTSE Developed World ETF with an MSCI Emerging Markets ETF, you will hold South Korea twice. If you pair an MSCI World ETF with a FTSE Emerging Markets ETF, you will exclude South Korea entirely. Pick one provider's ecosystem and stick to it.

### The Index Blueprint (Standard vs. Total Market)

This table shows exactly how both MSCI and FTSE apply their standard and small-cap modifiers across geographies. Note that "IMI" and "All Cap" are not separate regions, but simply a small-cap expansion applied to the base blueprints.

| Provider Family | Market Cap Focus | Market Coverage | Global Markets<br/>*(DM + EM)* | Developed Markets<br/> *(DM Only)* | Emerging Markets<br/> *(EM Only)* |
| --- | --- | ---: | --- | --- | --- |
| **MSCI** | Large + Mid | ~85% | [MSCI ACWI](https://www.justetf.com/en/search.html?search=ETFS&assetClass=class-equity&dc=IE&ls=any&distributionPolicy=distributionPolicy-accumulating&index=MSCI%2BAll%2BCountry%2BWorld%2B%2528ACWI%2529) | [MSCI World](https://www.justetf.com/en/search.html?search=ETFS&assetClass=class-equity&dc=IE&ls=any&distributionPolicy=distributionPolicy-accumulating&index=MSCI%2BWorld) | [MSCI Emerging Markets](https://www.justetf.com/en/search.html?search=ETFS&assetClass=class-equity&dc=IE&ls=any&distributionPolicy=distributionPolicy-accumulating&index=MSCI%2BEmerging%2BMarkets) |
| **MSCI IMI** | Large&nbsp;+&nbsp;Mid&nbsp;+&nbsp;Small | ~99% | [MSCI ACWI IMI](https://www.justetf.com/en/search.html?search=ETFS&assetClass=class-equity&dc=IE&ls=any&distributionPolicy=distributionPolicy-accumulating&index=MSCI%2BAll%2BCountry%2BWorld%2BInvestable%2BMarket%2B%2528ACWI%2BIMI%2529) | [MSCI World IMI](https://www.justetf.com/en/search.html?search=ETFS&assetClass=class-equity&dc=IE&ls=any&distributionPolicy=distributionPolicy-accumulating&index=MSCI%2BWorld%2BIMI) | [MSCI&nbsp;Emerging&nbsp;Markets&nbsp;IMI](https://www.justetf.com/en/search.html?search=ETFS&assetClass=class-equity&dc=IE&ls=any&distributionPolicy=distributionPolicy-accumulating&index=MSCI%2BEmerging%2BMarkets%2BInvestable%2BMarket%2B%28IMI%29) |
| **FTSE**¹ | Large + Mid | ~90-95% | [FTSE All-World](https://www.justetf.com/en/search.html?search=ETFS&assetClass=class-equity&dc=IE&ls=any&distributionPolicy=distributionPolicy-accumulating&index=FTSE%2BAll-World) | [FTSE Developed](https://www.justetf.com/en/search.html?search=ETFS&assetClass=class-equity&dc=IE&ls=any&distributionPolicy=distributionPolicy-accumulating&index=FTSE%2BDeveloped) | [FTSE Emerging](https://www.justetf.com/en/search.html?search=ETFS&assetClass=class-equity&dc=IE&ls=any&distributionPolicy=distributionPolicy-accumulating&index=FTSE%2BEmerging) |
| **FTSE&nbsp;All&nbsp;Cap** | Large + Mid + Small | ~99% | [FTSE&nbsp;Global&nbsp;All&nbsp;Cap](https://www.justetf.com/en/search.html?search=ETFS&assetClass=class-equity&dc=IE&ls=any&distributionPolicy=distributionPolicy-accumulating&index=FTSE%2BGlobal%2BAll%2BCap%2BChoice) | FTSE&nbsp;Developed&nbsp;All&nbsp;Cap² | [FTSE Emerging All Cap](https://www.justetf.com/en/search.html?search=ETFS&assetClass=class-equity&dc=IE&ls=any&distributionPolicy=distributionPolicy-accumulating&index=FTSE%2BEmerging%2BAll%2BCap%2BChoice) |

**Notes**

1. While the standard FTSE indices officially target Large and Mid-caps, their methodology naturally dips slightly deeper down the market-cap spectrum than standard MSCI, capturing a broader slice of the total market.
2. No plain-vanilla, standard ETF tracking this exact index exists as of writing this chapter, use FTSE Developed instead.

### The Implementation Cheat Sheet (Irish UCITS)

Here is how those blueprints translate into actual, investable Irish-domiciled UCITS ETFs. Notice how you are often forced to mix Standard and IMI/All-Cap tiers simply because certain index combinations lack a highly liquid, low-cost ETF.

| Provider Family | Global Markets | Developed Markets | Emerging Markets |
| --- | --- | --- | --- |
| **MSCI** | **ISAC** *(iShares)* | **SWRD** *(SPDR)* **IWDA** *(iShares)* | *No highly liquid Irish UCITS* |
| **MSCI IMI** | **SPYI / IMID** *(SPDR)* | **WIMI** *(Xtrackers)* | **EIMI** *(iShares)* |
| **FTSE** | **VWCE / VWRA** *(Vanguard)* **FWRA** *(Invesco)* | **VHVE** *(Vanguard)* | **VFEA** *(Vanguard)* |
| **FTSE All Cap** | *No highly liquid, non-ESG Irish UCITS* | *No highly liquid Irish UCITS* | *No highly liquid Irish UCITS* |

## Debt ETFs
> TODO

## Gold ETCs (Exchange Traded Commodities)

### Why do we need international gold?

As part of a global asset allocation strategy, holding a portion of gold through international instruments can make portfolio rebalancing more efficient. If both global equities and gold are held in USD, investors can rebalance between them **without incurring additional foreign exchange costs** (usually the major cost for international investment even after optimizations of [Chapter 3: How to Transfer Money Efficiently?](/building-wealth/books/the-global-indian-investor/03-lrs-how-to-send-money/)).

For example:
- If **equities fall** while **gold rises**, a portion of the gold holdings can be sold in USD and the proceeds can be redeployed into equities.
- Conversely, if **equities rally** and **gold underperforms**, some equity exposure can be trimmed and reallocated to gold.

Because both assets are denominated in the same currency, this process avoids repeated INR–USD conversions and the associated forex spreads or remittance costs.

In this way, international gold acts not only as a **diversifier and crisis hedge**, but also as a **liquidity buffer that enables low-friction portfolio rebalancing within the global allocation**.

### What is Gold ETC

Gold ETCs are exchange-traded securities designed to track the price of gold. They trade on stock exchanges like regular stocks and allow investors to gain exposure to gold without physically buying, storing, or insuring gold bars.

Unlike traditional exchange-traded funds (ETFs), Gold ETCs are legally structured as **debt securities issued by financial institutions**, not as investment funds. This structural difference exists because European UCITS fund rules do not allow a fund to hold a single commodity like gold directly.

Most modern gold ETCs are **physically backed**, meaning that gold bullion is held in secure vaults (typically in London) and acts as collateral for the securities issued to investors.
Here is the refined comparison, enhanced with the exact scale and cost multiples, along with the strategic context regarding the Irish domicile.

### A Gold Comparison

Let's compare Indian Gold ETFs/Mutual Funds vs Irish Gold ETCs.

#### Indian Gold Mutual Funds (FoFs)

Top 3 by AUM and Top 3 by TER are listed here.

| Fund Name | AUM<br/>(₹ Cr) | AUM<br/>($ million) | Fund&nbsp;TER <br/>(%) | ETF Name | ETF&nbsp;TER <br/>(%) | Total&nbsp;TER <br/>(%) | Rank |
| --- | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| **SBI Gold Fund** | 15,691 | 1,640 | 0.25 | SBI Gold ETF | 0.65 | 0.90 | AUM #1 |
| **HDFC Gold Fund** | 11,464 | 1,198 | 0.20 | HDFC Gold ETF | 0.59 | 0.79 | AUM #2 |
| **Nippon India Gold Savings Fund** | 7,178 | 750 | 0.05 | Nippon India ETF Gold BeES | 0.81 | 0.86 | AUM #3 |
| **DSP Gold ETF FoF** | 494 | 52 | 0.15 | DSP Gold ETF | 0.38 | 0.53 | TER #3 |
| **Mirae Asset Gold ETF FoF** | 483 | 50 | 0.12 | Mirae Asset Gold ETF | 0.33 | 0.45 | TER #1 |
| **Angel One Gold ETF FoF** | 32 | 3 | 0.15 | Angel One Gold ETF | 0.35 | 0.50 | TER #2 |

> Indian Gold FoF Total TER ranges from 0.45% to 0.90% as shown in the table


#### Indian Gold ETFs

Top 3 by AUM and Top 3 by TER are listed here.

| ETF Name | ISIN | AUM<br/>(Rs Cr) | AUM<br/>($ million) | TER<br/>(%) | Rank |
| --- | --- | ---: | ---: | ---: | ---: |
| Nippon India ETF Gold BeES | INF204KB17I5 | 55,540 | 5,804 | 0.80 | AUM #1 |
| ICICI Prudential Gold ETF | INF109KC1NT3 | 26,380 | 2,757 | 0.49 | AUM #2 |
| SBI Gold Exchange Traded Scheme - Growth Option | INF200KA16D8 | 24,549 | 2,565 | 0.65 | AUM #3 |
| Zerodha Gold ETF | INF0R8F01042 | 2,218 | 232 | 0.35 | TER #2 |
| The Wealth Company Gold ETF | INF2F0001370 | 23 | 2 | 0.29 | TER #1 |
| Angel One Gold ETF | INF1J2R01114 | 83 | 9 | 0.35 | TER #3 |

> Indian Gold ETF TER ranges from 0.29% to 0.80% as shown in the table

#### Irish Gold ETCs

Top 3 by AUM and Top 3 by TER are listed here.

| ETC Name | ISIN | AUM<br/>($ million) | TER<br/>(%) | USD Ticker | Rank |
| --- | --- | ---: | ---: | --- | --- |
| iShares Physical Gold ETC | IE00B4ND3602 | 37,627 | 0.12 | IGLN | AUM #1, TER #2 |
| Invesco Physical Gold ETC | IE00B579F325 | 29,100 | 0.12 | SGLD | AUM #2, TER #2 |
| Amundi Physical Gold ETC (C) | FR0013416716 | 12,229 | 0.12 | GLDD | AUM #3, TER #2 |
| Xtrackers IE Physical Gold ETC Securities | DE000A2T0VU5 | 6,949 | 0.11 | XGDU | TER #1 |

> TER is very competitive globally, ranging from just 0.11% to 0.12%

- Source: [justETF](https://www.justetf.com/en/search.html?search=ETFS&index=Gold&dc=IE&quoteCurrency=USD&resetPage=true) as of May 2026 filtered for Ireland Domicile and Gold asset class.
- ISIN prefixes reflect where the instrument was initially registered or the parent entity's location, while the legal domicile of the vehicle remains in Ireland

#### Comparing the AUM and TER
Min and Max cost and AUM are based on the filtered list of Top 3 AUM and Top 3 TER rankings below.

| Instrument | Min AUM<br/>($ million) | Max AUM<br/>($ million) | Min TER<br/>(%) | Max TER<br/>(%) |
| --- | ---: | ---: | ---: | ---: |
| Indian Gold Mutual Funds (FoFs) | 3 | 1,640 | 0.45 | 0.90 |
| Indian Gold ETFs | 2 | 5,804 | 0.29 | 0.80 |
| Irish Gold ETCs | 6,949 | 37,627 | 0.11 | 0.12 |



**The Scale & Cost Gap:**
When looking at the numbers, the structural advantage of global markets becomes obvious:

* **Scale:** The largest Indian Gold ETF **~$5.8B** is **~6.5x smaller** than the largest Irish Gold ETC **~$37.6B**, while the largest Indian Gold Mutual Fund is **nearly 23x smaller**.
* **Cost:** Because the gold in global ETCs is held in massive institutional bars (~12.5kg) with high operational efficiency, their costs are rock bottom. Indian Gold Mutual Funds are anywhere from **3.7x to 7.5x costlier** than their Irish counterparts, with Total TERs dragging at up to 0.90% annually compared to a flat 0.12%.

#### Notes
- **The Domicile Note:**
Unlike global equity ETFs (where an Ireland domicile slashes US Dividend Withholding Tax from 30% to 15%), gold does not pay dividends. Therefore, there is **no specific tax treaty advantage** to domiciling gold in Ireland. However, if you are already building a global passive equity portfolio using Ireland-domiciled UCITS ETFs, routing your gold allocation to an Irish ETC is highly recommended for **portfolio consolidation**
- 1 USD = 95.70 INR used for Indian AUM conversions to USD
- Data is taken by last week of May 2026

### TER Drag Compounds Hard Over Long Durations

At first glance, the difference between a 0.12% TER Global Gold ETC and a 0.90% Indian Gold Fund may appear small. But gold is usually a long-duration holding, and recurring costs compound aggressively over time.

Historically, gross INR gold returns are driven by two compounding components:

* **Gold Growth (USD):** ~7%
* **USD/INR Depreciation:** ~4%
* **Combined Gross INR Return:** 11.28% *[(1.07 * 1.04) - 1]*

Crucially, the investment structure dictates exactly *where* the Total Expense Ratio (TER) is deducted, which alters the final math.

For a **Global Gold ETC**, the 0.12% TER is deducted directly from the underlying USD gold return, meaning you still get the full, un-taxed benefit of the currency depreciation on that net USD amount. For an **Indian Gold Fund**, the 0.90% TER is deducted from the *total combined* INR return.

Here is how that structural difference impacts the effective return rate:

### 1. Deriving the Effective Net Rate

| Structure | Gross USD Growth | TER | Net USD Growth | USD/INR Growth | Effective Net INR CAGR |
| --- | --- | --- | --- | --- | --- |
| **Low-cost Gold ETC** | 7.00% | 0.12% | 6.88% | 4.00% | **11.16%**  *[(1.0688 * 1.04) - 1]* |
| **Indian Gold Fund** | 7.00% | N/A* | 7.00% | 4.00% | **10.38%**  *[11.28% - 0.90%]* |

*(Note: The Indian Fund's TER is applied to the final INR return, not the USD leg).*

While a ~0.78% difference in net CAGR might sound easily ignorable, time amplifies this gap significantly.

### 2. Comparison of Long-Term Growth

For a simple ₹1 lakh lump sum held for 30 years, here is how that effective rate divergence plays out:

| Structure | Effective Net INR CAGR | Final Value (Nominal) | Additional (₹) | Additional (%) |
| --- | --- | --- | --- | --- |
| **Indian Gold Fund** | [10.38%](https://sakthipriyan.com/building-wealth/tools/realvalue-sip-engine/#v1otd30yf202605c1lm0kg10.38h0i6t15p30y) | **₹19.35 lakh** | - | - |
| **Low-cost Gold ETC** | [11.16%](https://sakthipriyan.com/building-wealth/tools/realvalue-sip-engine/#v1otd30yf202605c1lm0kg11.16h0i6t15p30y) | **₹23.90 lakh** | **₹4.55 lakh** | **23%** |

By switching from an Indian Gold Fund to a low-cost Global Gold ETC, the investor pockets an extra **₹4.55 lakh**—yielding a final portfolio value nearly **23% higher** over 30 years, simply through structural efficiency.

This is why recurring structural costs matter enormously for long-term passive assets like gold. One-time forex conversion and routing costs to access global markets may hurt initially, but the recurring TER drag of domestic funds compounds against the investor every single year.

**Note**: These calculations exclude the initial one-time forex conversion and brokerage costs required to access global markets. However, the recurring TER savings from lower-cost Global Gold ETCs typically offset these upfront costs within the first 2–3 years of holding. In practice, the effective forex cost may be even lower when gold investments are piggybacked on existing international equity allocations, since the same USD balance can be reused across assets without repeated INR–USD conversions. There is no forex cost involved when rebalancing from Global Equity to Gold. 

### Notes
- Unlike global ETCs that track the pure international market, Indian gold assets track a domestic price heavily distorted by local import duties and GST, exposing your portfolio to sudden, policy-driven wealth destruction whenever the government arbitrarily slashes trade tariffs.
- Currently, my gold allocation sits in Indian Mutual Funds. While I initially planned to upgrade to Indian ETFs, I am routing all my future gold investments into Irish ETCs to eliminate the heavy domestic cost drag and avoid arbitrary tax distortions entirely.



----

Merge/dedupe/simlify


## Global Equity ETFs
When expanding outside India, you want to capture either the entire investable world or focus purely on developed markets (since your domestic portfolio already gives you heavy emerging market exposure).

When constructing a global passive equity portfolio, the index provider is the architect and the ETF issuer (Vanguard, BlackRock) is simply the builder executing the blueprint.

FTSE and MSCI are the two dominant architects in the global equity space. While their goal is the same—to capture the performance of global stock markets—they draw their lines differently regarding market capitalization and country classification.

Here is how they break down.

## 1. MSCI (Standard)

MSCI (Morgan Stanley Capital International) is the most widely tracked index provider globally. Their standard indices—such as the **MSCI ACWI** (All Country World Index) or **MSCI World** (Developed Markets only)—focus exclusively on **Large and Mid-cap** stocks.

* **Coverage:** Approximately **85%** of the free float-adjusted market capitalization in each country.
* **Philosophy:** By capturing the top 85%, you get the vast majority of the market's return with highly liquid stocks, keeping ETF transaction costs and bid-ask spreads low.
* **Popular UCITS ETFs:** ISAC (iShares MSCI ACWI), SSAC (State Street MSCI ACWI).

## 2. MSCI IMI (Investable Market Index)

"IMI" is MSCI’s expanded blueprint. An IMI index takes the standard Large/Mid-cap index and adds **Small-cap** stocks to it.

* **Coverage:** Approximately **99%** of the global investable market.
* **Philosophy:** This is the truest representation of a "total market" index. The **MSCI ACWI IMI** captures essentially every investable stock in the world across both Developed and Emerging markets.
* **Popular UCITS ETFs:** SPYI / IMID (SPDR MSCI ACWI IMI).

## 3. FTSE

FTSE (Financial Times Stock Exchange, now FTSE Russell) is MSCI's primary competitor. Their methodology sits somewhere between MSCI Standard and MSCI IMI. Their flagship global index is the **FTSE All-World**.

* **Coverage:** Approximately **90% to 95%** of the investable market. It captures Large and Mid-caps, but dips slightly further down the market-cap spectrum than standard MSCI, capturing a slice of what MSCI would classify as upper-small-cap.
* **Philosophy:** Vanguard heavily favors FTSE indices for their international ETFs to keep licensing costs down (which translates to lower TERs for investors) while capturing slightly more market breadth than standard MSCI.
* **Popular UCITS ETFs:** VWRA / VWCE (Vanguard FTSE All-World).

---

## The Structural Comparison

When selecting a single-fund global equity allocation, the choice usually comes down to these three tiers:

| Index Family | Market Cap Focus | Target Market Coverage | Flagship Global Index | Example Irish UCITS |
| --- | --- | --- | --- | --- |
| **MSCI Standard** | Large + Mid | ~85% | MSCI ACWI | ISAC |
| **FTSE** | Large + Mid + (Some Small) | ~90-95% | FTSE All-World | VWRA |
| **MSCI IMI** | Large + Mid + Small | ~99% | MSCI ACWI IMI | IMID |

## The Classification Trap: Mixing Indices

If you are building a one-fund equity portfolio (e.g., just buying VWRA or ISAC), the difference between FTSE and MSCI is negligible; their long-term performance is virtually identical.

However, if you are splitting your portfolio into separate Developed Markets (DM) and Emerging Markets (EM) ETFs to control your own weightings, **you must never mix index providers**.

The most critical difference between the two is how they classify **South Korea** and **Poland**:

* **FTSE** classifies South Korea and Poland as **Developed Markets**.
* **MSCI** classifies South Korea and Poland as **Emerging Markets**.

If you pair a FTSE Developed World ETF with an MSCI Emerging Markets ETF, you will hold South Korea twice. If you pair an MSCI World ETF with a FTSE Emerging Markets ETF, you will exclude South Korea entirely.

|Provider | World Markets | Developed Markets | Emerging Markets | 
|---|---|---|---|
|MSCI | MSCI ACWI | MSCI World | MSCI Emerging Markets |
|MSCI IMI | MSCI ACWI IMI | MSCI World | MSCI Emerging Markets |
|FTSE | All World | FTSE Developed | FTSE Emerging |

This is a clean, simple reference table. However, since index naming conventions are notoriously confusing for beginners, we can optimize this to prevent a very specific trap.

The biggest point of confusion for new investors is seeing the name **"MSCI World"** and assuming it covers the entire globe, when in reality, it *only* covers Developed Markets.

To make this a bulletproof reference guide for your readers—and to tie in your earlier explanation of the "IMI" framework—I recommend renaming the columns slightly for clarity and adding the "Total Market" tier.

Here is the polished version:
Here is the structurally perfect breakdown showing exactly how both MSCI and FTSE apply their "Total Market" modifiers across all geographies.

By restructuring the table with regions as the columns and the market-cap methodology as the rows, it becomes clear that "IMI" and "All Cap" are not separate regions, but simply a small-cap expansion applied to existing blueprints.

### The Index Blueprint (Standard vs. Total Market)

| Provider Family | Market Cap Focus | Global Markets*(DM + EM)* | Developed Markets*(DM Only)* | Emerging Markets*(EM Only)* |
| --- | --- | --- | --- | --- |
| **MSCI (Standard)** | Large + Mid | MSCI ACWI | MSCI World | MSCI Emerging Markets |
| **MSCI (IMI)** | Large + Mid + Small | MSCI ACWI IMI | MSCI World IMI | MSCI Emerging Markets IMI |
| **FTSE (Standard)** | Large + Mid* | FTSE All-World | FTSE Developed | FTSE Emerging |
| **FTSE (All Cap)** | Large + Mid + Small | FTSE Global All Cap | FTSE Developed All Cap | FTSE Emerging All Cap |

> *Note: While the standard FTSE indices officially target Large and Mid-caps, their methodology naturally dips slightly deeper down the market-cap spectrum than standard MSCI.*

### The Implementation Cheat Sheet (Irish UCITS)

To make this instantly actionable, here is the updated ticker map. It reveals exactly where the ETF issuers decided to launch products. Notice how you are forced to mix standard and IMI/All Cap methodologies simply because certain index combinations lack a liquid, low-cost ETF.

| Provider Family | Global Markets | Developed Markets | Emerging Markets |
| --- | --- | --- | --- |
| **MSCI (Standard)** | **ISAC** *(iShares)* | **SWRD** *(SPDR)* **IWDA** *(iShares)* | *No highly liquid, low-TER ETF* |
| **MSCI (IMI)** | **SPYI / IMID** *(SPDR)* | **WIMI** *(Xtrackers)* | **EIMI** *(iShares)* |
| **FTSE (Standard)** | **VWCE / VWRA** *(Vanguard)* | **VHVE** *(Vanguard)* | **VFEA** *(Vanguard)* |
| **FTSE (All Cap)** | **FWRA** *(Invesco)* | *No highly liquid Irish UCITS* | *No highly liquid Irish UCITS* |
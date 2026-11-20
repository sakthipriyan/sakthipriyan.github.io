---
title: "Selecting the Global Indexes"
subtitle: "Mapping the Irish ETF Universe Across Equities, Sovereign Debt and Gold"
type: "books"
chapter: 7
date: 2026-04-25
author: "Sakthi Priyan H"
draft: false
covers: selecting-the-global-indexes
wealth_tags:
  - Index Funds
  - Portfolio Construction
---

In the previous chapter, we saw that Irish ETFs are more efficient for Indian investors compared to US ETFs. As part of this chapter, we will look at the Irish ETF universe and shortlist various ETFs available for Equities, Debt and Gold.

> **ETF Selection & Data Criteria**
> * **Currency**: When you pick the TICKER, ensure it is traded in USD to avoid additional currency conversions.
> * **Liquidity & Safety**: To ensure robust liquidity and minimize fund closure risk, the equity and debt ETFs shortlisted exclusively feature physically replicated, accumulating Irish-domiciled UCITS ETFs with an **AUM exceeding $1 Billion**.
> * **Gold Exception**: Gold is shortlisted by legal structure instead of domicile. Only funds and trusts (Swiss and Canadian) make the cut; Irish Gold ETCs are debt securities and are shown for reference only. See [Gold](#gold-funds-and-etcs) below.
> * **Ranking**: Across the various indexes, the tables list the Top 3 funds by AUM and the Top 3 by lowest TER.
> * **Data Vintage**: Fund size, TER, and rankings are based on [justETF](https://www.justetf.com/) data taken in the **3rd week of November 2026** (first published with June 2026 data).

## Global Equity ETFs

When expanding outside India, you want to capture either the entire investable world or focus purely on developed markets (since your domestic portfolio already gives you heavy emerging market exposure).

When constructing a global passive equity portfolio, the index provider (MSCI, FTSE) is the architect and the ETF issuer (Vanguard, BlackRock) is simply the builder executing the blueprint.

MSCI (Morgan Stanley Capital International) and FTSE (Financial Times Stock Exchange, now FTSE Russell) are the two dominant architects in the global equity space. While their goal is the same—to capture the performance of global stock markets—they draw their lines differently regarding market capitalization and country classification.

### The Methodology

* **MSCI**: Focuses exclusively on **Large and Mid-cap** stocks. Capturing ~85% of the market keeps transaction costs and bid-ask spreads low by sticking to highly liquid equities.
* **MSCI IMI (Investable Market Index)**: Takes the standard Large/Mid-cap index and adds **Small-cap** stocks to cover ~99% of the investable market. This is the truest representation of a "total market" index.
* **FTSE**: While their standard indices officially target Large and Mid-caps (~90-95% coverage), their methodology naturally dips slightly deeper down the market-cap spectrum than standard MSCI. Vanguard heavily favors this tier for its flagship global funds to keep licensing costs (and TERs) low.
* **FTSE All-Cap**: This is FTSE's equivalent to MSCI's IMI tier. By adding Small-cap stocks to the standard blueprint, it captures the full 99% of the investable market to provide true total-market exposure.

### The Classification Difference: Mixing Indices

If you are building a one-fund equity portfolio (e.g., just buying a single Global fund), the difference between FTSE and MSCI is negligible; their long-term performance is virtually identical.

However, if you are splitting your portfolio into separate **Developed Markets (DM)** and **Emerging Markets (EM)** ETFs to control your own weightings, **you must never mix index providers**.

The critical difference is how they classify **South Korea** and **Poland**:

* **FTSE** classifies South Korea and Poland as **Developed Markets**.
* **MSCI** classifies South Korea and Poland as **Emerging Markets**.

If you pair a FTSE Developed World ETF with an MSCI Emerging Markets ETF, you will hold South Korea twice. If you pair an MSCI World ETF with a FTSE Emerging Markets ETF, you will exclude South Korea entirely. Pick one provider's ecosystem and stick to it.

### The Global Index Blueprint

This table shows exactly how both MSCI and FTSE apply their standard and small-cap modifiers across geographies. Note that "IMI" and "All Cap" are not separate regions, but simply a small-cap expansion applied to the base blueprints.

| Provider Family | Market Cap Focus | Market Coverage | Global Markets<br/>*(DM + EM)* | Developed Markets<br/> *(DM Only)* | Emerging Markets<br/> *(EM Only)* |
| --- | --- | ---: | --- | --- | --- |
| **MSCI** | Large + Mid | ~85% | [MSCI ACWI](https://www.justetf.com/en/search.html?search=ETFS&assetClass=class-equity&dc=IE&ls=any&distributionPolicy=distributionPolicy-accumulating&index=MSCI%2BAll%2BCountry%2BWorld%2B%2528ACWI%2529&quoteCurrency=USD) | [MSCI World](https://www.justetf.com/en/search.html?search=ETFS&assetClass=class-equity&dc=IE&ls=any&distributionPolicy=distributionPolicy-accumulating&index=MSCI%2BWorld&quoteCurrency=USD) | [MSCI Emerging Markets](https://www.justetf.com/en/search.html?search=ETFS&assetClass=class-equity&dc=IE&ls=any&distributionPolicy=distributionPolicy-accumulating&index=MSCI%2BEmerging%2BMarkets&quoteCurrency=USD) |
| **MSCI IMI** | Large&nbsp;+&nbsp;Mid&nbsp;+&nbsp;Small | ~99% | [MSCI ACWI IMI](https://www.justetf.com/en/search.html?search=ETFS&assetClass=class-equity&dc=IE&ls=any&distributionPolicy=distributionPolicy-accumulating&index=MSCI%2BAll%2BCountry%2BWorld%2BInvestable%2BMarket%2B%2528ACWI%2BIMI%2529&quoteCurrency=USD) | [MSCI World IMI](https://www.justetf.com/en/search.html?search=ETFS&assetClass=class-equity&dc=IE&ls=any&distributionPolicy=distributionPolicy-accumulating&index=MSCI%2BWorld%2BIMI&quoteCurrency=USD) | [MSCI&nbsp;Emerging&nbsp;Markets&nbsp;IMI](https://www.justetf.com/en/search.html?search=ETFS&assetClass=class-equity&dc=IE&ls=any&distributionPolicy=distributionPolicy-accumulating&index=MSCI%2BEmerging%2BMarkets%2BInvestable%2BMarket%2B%28IMI%29&quoteCurrency=USD) |
| **FTSE**¹ | Large + Mid | ~90-95% | [FTSE All-World](https://www.justetf.com/en/search.html?search=ETFS&assetClass=class-equity&dc=IE&ls=any&distributionPolicy=distributionPolicy-accumulating&index=FTSE%2BAll-World&quoteCurrency=USD) | [FTSE Developed](https://www.justetf.com/en/search.html?search=ETFS&assetClass=class-equity&dc=IE&ls=any&distributionPolicy=distributionPolicy-accumulating&index=FTSE%2BDeveloped&quoteCurrency=USD) | [FTSE Emerging](https://www.justetf.com/en/search.html?search=ETFS&assetClass=class-equity&dc=IE&ls=any&distributionPolicy=distributionPolicy-accumulating&index=FTSE%2BEmerging&quoteCurrency=USD) |
| **FTSE&nbsp;All&nbsp;Cap**² | Large + Mid + Small | ~99% | [FTSE&nbsp;Global&nbsp;All&nbsp;Cap](https://www.justetf.com/en/search.html?search=ETFS&assetClass=class-equity&dc=IE&ls=any&distributionPolicy=distributionPolicy-accumulating&index=FTSE%2BGlobal%2BAll%2BCap&quoteCurrency=USD) | FTSE&nbsp;Developed&nbsp;All&nbsp;Cap | FTSE Emerging All Cap |

**Notes**

1. While the standard FTSE indices officially target Large and Mid-caps, their methodology naturally dips slightly deeper down the market-cap spectrum than standard MSCI, capturing a broader slice of the total market.
2. In August 2026, Vanguard launched the [Vanguard FTSE Global All-Cap UCITS ETF USD Acc](https://www.justetf.com/en/etf-profile.html?isin=IE000VAHT5T0) (ticker `VALU` on LSE in USD), the first plain-vanilla Irish ETF on FTSE Global All Cap. It crossed $1 Billion AUM within three months. FTSE Developed All Cap and FTSE Emerging All Cap still have only ESG variants, such as [FTSE Emerging All Cap Choice](https://www.justetf.com/en/search.html?search=ETFS&assetClass=class-equity&dc=IE&ls=any&distributionPolicy=distributionPolicy-accumulating&quoteCurrency=USD&index=FTSE%2BEmerging%2BAll%2BCap%2BChoice). I would rather use the standard FTSE ones.

Index providers build various indexes but ETF issuer only issue ETFs which have real demand. For example: [MSCI ACWI ex India Index (USD)](https://www.msci.com/documents/10199/a789e2c1-0f2e-4582-a821-fd1f0ac13261) exists but there is no ETF.

#### MSCI Comparison
<iframe width="100%" height="750" src="https://curvo.eu/backtest/en/compare-indexes/msci-acwi-vs-msci-acwi-imi-vs-msci-emerging-markets-vs-msci-emerging-markets-imi-vs-msci-world/evolution/embed?currency=usd" frameborder="0" scrolling="no" loading="lazy"></iframe>

### The Implementation Cheat Sheet for Global Indexes (Irish UCITS)

Here is how those blueprints translate into actual, investable Irish-domiciled UCITS ETFs. Notice how you are often forced to mix Standard and IMI/All-Cap tiers simply because certain index combinations lack a highly liquid, low-cost ETF.

#### Global Markets (All World/ACWI) = Developed Markets (DM) + Emerging Markets (EM)

| Index              |ETF                                                                                                                                                      | AUM<br/>($ million) | AUM Rank | TER (%) | TER Rank |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------: | -------: | ------: | -------: |
| **FTSE&nbsp;All&#8209;World** | [Vanguard FTSE All-World UCITS ETF (USD) Accumulating](https://www.justetf.com/en/etf-profile.html?isin=IE00BK5BQT80)                                    |              62,706 |        1 |   0.14% |        3 |
| **MSCI ACWI**      | [iShares MSCI All Country World UCITS ETF USD (Acc)](https://www.justetf.com/en/etf-profile.html?isin=IE00B6R52259)                                      |              34,712 |        2 |   0.20% |          |
| **MSCI ACWI**      | [State Street SPDR MSCI All Country World UCITS ETF USD Unhedged (Acc)](https://www.justetf.com/en/etf-profile.html?isin=IE00B44Z5B48)                   |              21,161 |        3 |   0.12% |        2 |
| **MSCI ACWI IMI**  | [State Street SPDR MSCI All Country World Investable Market UCITS ETF USD Unhedged (Acc)](https://www.justetf.com/en/etf-profile.html?isin=IE00B3YLTY66) |               9,460 |          |   0.17% |          |
| **FTSE&nbsp;Global&nbsp;All&nbsp;Cap** | [Vanguard FTSE Global All-Cap UCITS ETF USD Acc](https://www.justetf.com/en/etf-profile.html?isin=IE000VAHT5T0)                         |               4,982 |          |   0.07% |        1 |

If you want to pick one index fund for your equity portfolio, pick one of these based on your preference (Index/AUM/TER). Since there is no ETF tracking MSCI ACWI ex India Index (USD), picking this will have slight overlap with your Indian Equity holding. But this is the simplest way to get exposure to Global Equity investing.

Two things changed since the first version of this table:

* **Vanguard cut the TER** of its FTSE All-World ETF (`VWRA`) from 0.19% to 0.14%. That pushed the [Invesco FTSE All-World UCITS ETF Acc](https://www.justetf.com/en/etf-profile.html?isin=IE000716YHJ7) (0.15%) out of the Top 3 by TER.
* **Vanguard FTSE Global All-Cap** (`VALU`) is now the cheapest *and* the broadest one-fund option: ~6,400 holdings across large, mid and small caps at 0.07%. It is FTSE's answer to MSCI ACWI IMI, at less than half the cost of the SPDR ACWI IMI (0.17%). The catch is a short track record, since it launched in August 2026. I still list the SPDR ACWI IMI (outside the Top 3) as the only MSCI IMI option.

#### Developed Markets (DM) only
| Index                    | ETF                                                                                                                  | AUM<br/>($ million) | AUM Rank | TER (%) | TER Rank |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------- | ------------------: | -------: | ------: | -------: |
| **MSCI World**           | [iShares Core MSCI World UCITS ETF USD (Acc)](https://www.justetf.com/en/etf-profile.html?isin=IE00B4L5Y983)         |             141,934 |        1 |   0.20% |          |
| **MSCI World**           | [Xtrackers MSCI World UCITS ETF 1C](https://www.justetf.com/en/etf-profile.html?isin=IE00BJ0KDQ92)                   |              24,045 |        2 |   0.12% |          |
| **MSCI World**           | [State Street SPDR MSCI World UCITS ETF USD Unhedged](https://www.justetf.com/en/etf-profile.html?isin=IE00BFY0GT14) |              20,456 |        3 |   0.12% |          |
| **MSCI World**           | [UBS Core MSCI World UCITS ETF USD acc](https://www.justetf.com/en/etf-profile.html?isin=IE00BD4TXV59)               |              13,269 |          |   0.06% |        2 |
| **MSCI World**           | [Invesco MSCI World UCITS ETF Acc](https://www.justetf.com/en/etf-profile.html?isin=IE00B60SX394)                    |              10,553 |          |   0.05% |        1 |
| **FTSE Developed World** | [Vanguard FTSE Developed World UCITS ETF Acc](https://www.justetf.com/en/etf-profile.html?isin=IE00BK5BQV03)         |               6,686 |          |   0.12% |        3 |

Since these are Developed Market indexes they won't have any overlap with Indian Equity portfolio. If you want to pick one DM index fund and use Indian Equity portfolio to proxy EM, then pick one of these based on your preference (Index/AUM/TER). 

#### Emerging Markets (EM) only
| Index                         | ETF                                                                                                                          | AUM<br/>($ million) | AUM Rank | TER (%) | TER Rank |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------: | -------: | ------: | -------: |
| **MSCI Emerging Markets IMI** | [iShares Core MSCI Emerging Markets IMI UCITS ETF (Acc)](https://www.justetf.com/en/etf-profile.html?isin=IE00BKM4GZ66)      |              39,827 |        1 |   0.18% |          |
| **MSCI Emerging Markets**     | [Xtrackers MSCI Emerging Markets UCITS ETF 1C](https://www.justetf.com/en/etf-profile.html?isin=IE00BTJRMP35)                |              12,590 |        2 |   0.18% |          |
| **MSCI Emerging Markets**     | [iShares MSCI EM UCITS ETF (Acc)](https://www.justetf.com/en/etf-profile.html?isin=IE00B4L5YC18)                             |               9,710 |        3 |   0.18% |          |
| **FTSE Emerging Markets**     | [Vanguard FTSE Emerging Markets UCITS ETF (USD) Accumulating](https://www.justetf.com/en/etf-profile.html?isin=IE00BK5BR733) |               2,381 |          |   0.17% |        2 |
| **MSCI Emerging Markets**     | [State Street SPDR MSCI Emerging Markets UCITS ETF USD](https://www.justetf.com/en/etf-profile.html?isin=IE00B469F816)       |               2,002 |          |   0.18% |        3 |
| **MSCI Emerging Markets**     | [HSBC MSCI Emerging Markets UCITS ETF USD (Acc)](https://www.justetf.com/en/etf-profile.html?isin=IE000KCS7J59)              |               1,705 |          |   0.15% |        1 |

If you want more Emerging Markets exposure beyond India you can pick one of these. See the holdings of [iShares Core MSCI Emerging Markets IMI UCITS ETF (Acc)](https://www.justetf.com/en/etf-profile.html?isin=IE00BKM4GZ66#holdings) to know which countries it covers. It has ~11% of India and Taiwan/China/South Korea with higher allocation. 

### Country Allocation by Index

Where does the money actually go? These are the country weights of one large fund per index, *as of 30 September 2026* ([justETF](https://www.justetf.com/), which lists every country above 1%; the rest is grouped as Other). Click an index name to see its fund's holdings. "<1%" means the country is in the index but below 1%; "0%" means the provider classifies it elsewhere (South Korea and Poland are Developed for FTSE, Emerging for MSCI).

#### Global Markets (DM + EM)

| Country | [FTSE All-World](https://www.justetf.com/en/etf-profile.html?isin=IE00BK5BQT80#holdings) | [FTSE Global All Cap](https://www.justetf.com/en/etf-profile.html?isin=IE000VAHT5T0#holdings) | [MSCI ACWI](https://www.justetf.com/en/etf-profile.html?isin=IE00B6R52259#holdings) | [MSCI ACWI IMI](https://www.justetf.com/en/etf-profile.html?isin=IE00B3YLTY66#holdings) |
| --- | ---: | ---: | ---: | ---: |
| United States | 60.33% | 58.37% | 62.39% | 61.61% |
| Japan | 6.04% | 5.83% | 5.22% | 5.83% |
| Taiwan | 3.53% | 3.36% | 3.44% | 3.45% |
| United Kingdom | 3.16% | 3.14% | 3.12% | 3.28% |
| Canada | 2.84% | 2.81% | 2.86% | 3.02% |
| South Korea | 2.60% | 2.45% | 2.57% | 2.50% |
| China | 2.44% | 2.30% | 2.11% | 1.96% |
| Switzerland | 2.18% | 2.05% | 2.21% | 2.10% |
| Germany | 1.75% | 1.60% | 1.81% | 1.78% |
| France | 1.74% | 1.63% | 1.76% | 1.76% |
| India | 1.50% | 1.54% | 1.25% | 1.46% |
| Australia | 1.50% | 1.45% | 1.34% | 1.47% |
| Netherlands | 1.46% | 1.40% | 1.49% | 1.47% |
| Ireland | <1% | <1% | 1.03% | <1% |
| *Other (each <1%)* | 8.93% | 12.07% | 7.40% | 8.31% |

#### Developed Markets (DM)

| Country | [MSCI World](https://www.justetf.com/en/etf-profile.html?isin=IE00B4L5Y983#holdings) | [FTSE Developed](https://www.justetf.com/en/etf-profile.html?isin=IE00BK5BQV03#holdings) |
| --- | ---: | ---: |
| United States | 70.81% | 66.58% |
| Japan | 5.91% | 6.67% |
| United Kingdom | 3.60% | 3.48% |
| Canada | 3.24% | 3.13% |
| South Korea | 0% | 2.86% |
| Switzerland | 2.47% | 2.38% |
| Germany | 2.03% | 1.93% |
| France | 2.01% | 1.92% |
| Netherlands | 1.69% | 1.60% |
| Australia | 1.52% | 1.66% |
| Ireland | 1.09% | <1% |
| *Other (each <1%)* | 5.63% | 7.79% |

#### Emerging Markets (EM)

| Country | [MSCI EM](https://www.justetf.com/en/etf-profile.html?isin=IE00B4L5YC18#holdings) | [MSCI EM IMI](https://www.justetf.com/en/etf-profile.html?isin=IE00BKM4GZ66#holdings) | [FTSE Emerging](https://www.justetf.com/en/etf-profile.html?isin=IE00BK5BR733#holdings) |
| --- | ---: | ---: | ---: |
| Taiwan | 28.71% | 28.63% | 34.97% |
| China | 17.64% | 16.30% | 24.09% |
| South Korea | 21.27% | 20.55% | 0% |
| India | 10.56% | 11.75% | 14.90% |
| Brazil | 4.00% | 3.95% | 4.42% |
| South Africa | 2.46% | 2.55% | 3.09% |
| Saudi Arabia | 2.29% | 2.38% | 3.06% |
| Mexico | 1.56% | 1.55% | 2.04% |
| UAE | 1.22% | 1.23% | 1.70% |
| Malaysia | <1% | 1.09% | 1.49% |
| Thailand | <1% | 1.12% | 1.43% |
| Hong Kong | 1.20% | 1.34% | 1.13% |
| Poland | 1.04% | 1.12% | 0% |
| *Other (each <1%)* | 8.05% | 6.44% | 7.68% |

**What stands out:**

* **South Korea shows the classification split in numbers.** It is ~21% of MSCI EM but absent from FTSE Emerging, and it is in FTSE Developed (2.86%) but not MSCI World. Mix providers and you hold it twice or not at all.
* **India barely registers globally.** At 1.25–1.54% of the global indexes, a global fund overlaps very little with an Indian portfolio. In EM funds India is 10.6–14.9%.
* **A global fund is ~60% US already**, and MSCI World is ~71%. Adding a separate US fund on top concentrates further.
* **Small caps spread the weight.** FTSE Global All Cap has the lowest US share (58.4%) and the largest "Other" (12.1%).

## US Equity ETFs

US equities dominate both Developed Market (DM) and Global (DM + EM) equity indexes, accounting for ~67–71% of developed-market capitalization and ~60–62% of global market capitalization (as of 30 September 2026).

| Index | Market | US Contribution (%) | Example UCITS ETF |
| --- | --- | ---: | --- |
| **MSCI World** | DM only | 70.81% | [iShares Core MSCI World UCITS ETF USD (Acc)](https://www.justetf.com/en/etf-profile.html?isin=IE00B4L5Y983#holdings) |
| **FTSE Developed** | DM only | 66.58% | [Vanguard FTSE Developed World UCITS ETF Acc](https://www.justetf.com/en/etf-profile.html?isin=IE00BK5BQV03#holdings) |
| **MSCI ACWI** | DM + EM | 62.39% | [iShares MSCI All Country World UCITS ETF USD (Acc)](https://www.justetf.com/en/etf-profile.html?isin=IE00B6R52259#holdings) |
| **FTSE All-World** | DM + EM | 60.33% | [Vanguard FTSE All-World UCITS ETF (USD) Accumulating](https://www.justetf.com/en/etf-profile.html?isin=IE00BK5BQT80#holdings) |

For many investors, a broad global ETF already provides substantial exposure to the United States. However, some investors prefer to control their US allocation separately.

Common reasons for separating US exposure include:
- Overweighting or underweighting the US market relative to global market-cap weights.
- Increasing exposure to growth-oriented sectors such as technology.
- Combining a World [ex USA](https://www.justetf.com/en/search.html?search=ETFS&assetClass=class-equity&quoteCurrency=USD&replicationType=replicationType-full&distributionPolicy=distributionPolicy-accumulating&sortOrder=desc&sortField=fundSize&index=MSCI%2BWorld%2Bex%2BUSA&ls=any&fsg=more500&resetPage=true) portfolio with a dedicated US allocation.
- Implementing a custom asset allocation based on personal risk tolerance and return expectations.

### The US Index Blueprint

When isolating US exposure, investors using Irish UCITS ETFs will primarily encounter three index families:

| Index Family   | Constituents | Market Cap Focus | Market Coverage | Typical Use              |
| -------------- | -----------: | ---------------- | --------------: | ------------------------ |
| **[MSCI USA](https://www.justetf.com/en/search.html?search=ETFS&assetClass=class-equity&quoteCurrency=USD&replicationType=replicationType-full&distributionPolicy=distributionPolicy-accumulating&sortOrder=desc&sortField=fundSize&ls=any&fsg=more500&dc=IE&currencyHedged=none&index=MSCI%2BUSA)**   |         ~600 | Large + Mid Cap  |            ~85% | Broad US Exposure        |
| **[S&P 500](https://www.justetf.com/en/search.html?search=ETFS&assetClass=class-equity&country=US&index=S%2526P%2B500%25C2%25AE&quoteCurrency=USD&replicationType=replicationType-full&distributionPolicy=distributionPolicy-accumulating&ls=any&sortOrder=desc&sortField=fundSize&fsg=more500)**    |         ~500 | Large Cap        |            ~80% | Core US Exposure         |
| **[Nasdaq 100](https://www.justetf.com/en/search.html?assetClass=class-equity&search=ETFS&index=Nasdaq%2B100%25C2%25AE&quoteCurrency=USD&distributionPolicy=distributionPolicy-accumulating&dc=IE&replicationType=replicationType-full&ls=any)** |         ~100 | Large-Cap Growth |            ~50% | Growth / Technology Tilt |

Other index families such as Russell (Russell 1000, Russell 2000, Russell 3000), FTSE USA, Solactive GBS USA, and the Dow Jones Industrial Average (DJIA) exist but have relatively limited representation within the Irish-domiciled UCITS ETF universe. Most investors building portfolios with Irish ETFs will primarily encounter MSCI USA, S&P 500 and Nasdaq 100 products.

Unlike MSCI USA and S&P 500, the Nasdaq 100 is not intended to represent the broad US equity market. Rather, it is a growth-tilted index that has historically delivered higher returns than the broader market, albeit with greater volatility.

#### US Indexes Comparison
<iframe width="100%" height="720" src="https://curvo.eu/backtest/en/compare-indexes/msci-usa-vs-sp-500-vs-nasdaq-100/evolution/embed?currency=usd" frameborder="0" scrolling="no" loading="lazy"></iframe>

| Objective                                | MSCI USA | S&P 500 | Nasdaq 100 |
| ---------------------------------------- | :------: | :-----: | :--------: |
| Broad US exposure                        |  **Yes** |  Maybe  |     No     |
| Standard US allocation                   |   Maybe  | **Yes** |     No     |
| Lowest-cost implementation               |  **Yes** | **Yes** |     No     |
| Technology and growth tilt               |    No    |  Maybe  |   **Yes**  |
| Maximum diversification                  |  **Yes** |  Maybe  |     No     |
| Highest concentration in mega-cap growth |    No    |  Maybe  |   **Yes**  |
| Closest to a global market-cap portfolio |  **Yes** |  Maybe  |     No     |

### The Implementation Cheat Sheet for US Indexes (Irish UCITS)

### MSCI USA

| ETF | AUM<br/>($ million) | AUM Rank | TER (%) | TER Rank |
| --- | ---: | ---: | ---: | ---: |
| [Xtrackers MSCI USA UCITS ETF 1C](https://www.justetf.com/en/etf-profile.html?isin=IE00BJ0KDR00) | 13,841 | 1 | 0.03% | 1 |
| [iShares MSCI USA UCITS ETF (Acc)](https://www.justetf.com/en/etf-profile.html?isin=IE00B52SFT06) | 5,153 | 2 | 0.03% | 1 |
| [Amundi Core MSCI USA UCITS ETF Acc](https://www.justetf.com/en/etf-profile.html?isin=IE000FSN19U2) | 4,803 | 3 | 0.03% | 1 |
| [UBS Core MSCI USA UCITS ETF USD acc](https://www.justetf.com/en/etf-profile.html?isin=IE00BD4TXS21) | 3,234 |  | 0.03% | 1 |

### S&P 500
| ETF | AUM<br/>($ million) | AUM Rank | TER (%) | TER Rank |
| --- | ---: | ---: | ---: | ---: |
| [iShares Core S&P 500 UCITS ETF USD (Acc)](https://www.justetf.com/en/etf-profile.html?isin=IE00B5BMR087) | 150,110 | 1 | 0.07% | 2 |
| [Vanguard S&P 500 UCITS ETF (USD) Accumulating](https://www.justetf.com/en/etf-profile.html?isin=IE00BFMXXD54) | 36,503 | 2 | 0.07% | 2 |
| [State Street SPDR S&P 500 UCITS ETF USD Unhedged (Acc)](https://www.justetf.com/en/etf-profile.html?isin=IE000XZSV718) | 19,679 | 3 | 0.03% | 1 |
| [Xtrackers S&P 500 UCITS ETF 4C](https://www.justetf.com/en/etf-profile.html?isin=IE000Z9SJA06) | 2,938 |  | 0.03% | 1 |
| [UBS Core S&P 500 UCITS ETF USD acc](https://www.justetf.com/en/etf-profile.html?isin=IE00BD4TXW66) | 2,457 |  | 0.03% | 1 |

### Nasdaq 100
| ETF | AUM<br/>($ million) | AUM Rank | TER (%) | TER Rank |
| --- | ---: | ---: | ---: | ---: |
| [iShares Nasdaq 100 UCITS ETF (Acc)](https://www.justetf.com/en/etf-profile.html?isin=IE00B53SZB19) | 27,747 | 1 | 0.30% | 3 |
| [Invesco EQQQ Nasdaq-100 UCITS ETF Acc](https://www.justetf.com/en/etf-profile.html?isin=IE00BFZXGZ54) | 4,855 | 2 | 0.30% | 3 |
| [Xtrackers Nasdaq 100 UCITS ETF 1C](https://www.justetf.com/en/etf-profile.html?isin=IE00BMFKG444) | 3,065 | 3 | 0.20% | 2 |
| [BNP Paribas Easy II NASDAQ 100 UCITS ETF USD Acc](https://www.justetf.com/en/etf-profile.html?isin=IE000QDFFK00) | 2,904 |  | 0.14% | 1 |

For most long-term investors, the practical difference between MSCI USA and S&P 500 is relatively small. The more consequential decision is whether to own the broad US market (MSCI USA/S&P 500) or to make a deliberate growth bet through the Nasdaq 100.

#### Observations

- S&P 500 remains more popular than MSCI USA despite covering fewer companies.
- Several MSCI USA and S&P 500 ETFs with assets exceeding $10 billion are available at just 0.03% TER.
- Nasdaq 100 ETFs remain considerably (~5x) more expensive, with the lowest-cost fund charging 0.14% TER.
- Investors pay a meaningful premium for concentrated growth exposure.

## MSCI Comparison of India, USA and ACWI

<iframe width="100%" height="720" src="https://curvo.eu/backtest/en/compare-indexes/msci-acwi-vs-msci-india-vs-msci-usa/evolution/embed?currency=usd" frameborder="0" scrolling="no" loading="lazy"></iframe>

### Observations

* **MSCI ACWI** provides broad diversification across both developed and emerging markets, reducing dependence on any single country.
* **MSCI USA** has been the strongest performer over the past decade, driven largely by the growth of mega-cap technology companies.
* **MSCI India** has experienced periods of significant outperformance, but with greater volatility and larger valuation swings.
* **Market leadership changes over time.** The best-performing country in one decade is rarely guaranteed to lead in the next.
* A global index allows investors to participate in future winners without needing to predict which country will outperform.

> **Key Takeaway:** Investing in a global index such as MSCI ACWI is not about maximizing returns from a single market. It is about reducing concentration risk while participating in global economic growth.

## Sovereign Debt ETFs

Debt ETFs primarily serve as the defensive allocation within a portfolio. During accumulation, they provide liquidity, stability, and dry powder for rebalancing. During capital preservation and decumulation, they can also serve as a retirement spending bucket and a source of portfolio income.

The purpose of the debt allocation is not to maximize returns but to provide stability, liquidity, and dry powder for rebalancing. Short-term U.S. Treasuries achieve this objective without the additional credit, duration, currency-hedging, and geopolitical risks introduced by corporate bonds, aggregate bond funds, or emerging-market debt.

Filtering on [USD-denominated, US government bond ETFs, accumulating share class, unhedged, Ireland-domiciled, and assets under management greater than $1 billion](https://www.justetf.com/en/search.html?search=ETFS&dc=IE&ls=any&distributionPolicy=distributionPolicy-accumulating&quoteCurrency=USD&assetClass=class-bonds&fsg=more500&sortOrder=desc&sortField=fundSize&bondType=Government&currency=USD&currencyHedged=none&country=US) yielded 7 funds as follows

### US Treasury Bond ETFs

| ETF                                                                                                                                       | AUM<br/>($ million) | AUM Rank | TER (%) | TER Rank |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------: | -------: | ------: | -------: |
| **[iShares USD Treasury Bond 0-1yr UCITS ETF (Acc)](https://www.justetf.com/en/etf-profile.html?isin=IE00BGSF1X88)**                   |              20,614 |        1 |   0.07% |        2 |
| [iShares USD Treasury Bond 3-7yr UCITS ETF (Acc)](https://www.justetf.com/en/etf-profile.html?isin=IE00B3VWN393)                   |               8,102 |        2 |   0.07% |        2 |
| [iShares USD Treasury Bond 1-3yr UCITS ETF (Acc)](https://www.justetf.com/en/etf-profile.html?isin=IE00BYXPSP02)                   |               7,698 |        3 |   0.07% |        2 |
| [iShares USD Treasury Bond 7-10yr UCITS ETF (Acc)](https://www.justetf.com/en/etf-profile.html?isin=IE00B3VWN518)                  |               5,042 |         |   0.07% |        2 |
| [iShares USD Treasury Bond 20+yr UCITS ETF USD (Acc)](https://www.justetf.com/en/etf-profile.html?isin=IE00BFM6TC58)               |               3,388 |         |   0.07% |        2 |
| **[Vanguard U.S. Treasury 0-1 Year Bond UCITS ETF (USD) Accumulating](https://www.justetf.com/en/etf-profile.html?isin=IE00BLRPPV00)** |               2,693 |         |   0.05% |        1 |
| [Vanguard USD Treasury Bond UCITS ETF Accumulating](https://www.justetf.com/en/etf-profile.html?isin=IE00BGYWFS63)                 |               1,610 |         |   0.05% |        1 |

Based on your preference for TER/AUM you can pick the iShares or Vanguard for 0-1 year Treasury bond ETFs.
Picking up long term debt ETFs such as 7-10yr or 20+yr will expose you more to interest rate risks. So stick to short term (0-1 or 1-3yr) bond ETFs if you are investing in debt.

Depending on your overall portfolio construction/goals, you may also choose to keep the entire defensive allocation in INR-denominated debt instruments and use global equities and global gold (discussed below) as the primary rebalancing assets. In such a setup, a dedicated international debt allocation may not be necessary.

## Gold Funds and ETCs

### Why do we need international gold?

As part of a global asset allocation strategy, holding a portion of gold through international instruments can make portfolio rebalancing more efficient. If both global equities and gold are held in USD, investors can rebalance between them **without incurring additional foreign exchange costs** (usually the major cost for international investment even after optimizations of [Chapter 3: How to Transfer Money Efficiently?](/building-wealth/books/the-global-indian-investor/03-lrs-how-to-send-money/)).

For example:
- If **equities fall** while **gold rises**, a portion of the gold holdings can be sold in USD and the proceeds can be redeployed into equities.
- Conversely, if **equities rally** and **gold underperforms**, some equity exposure can be trimmed and reallocated to gold.

Because both assets are denominated in the same currency, this process avoids repeated INR–USD conversions and the associated forex spreads or remittance costs.

In this way, international gold acts not only as a **diversifier and crisis hedge**, but also as a **liquidity buffer that enables low-friction portfolio rebalancing within the global allocation**.

### Structure Decides the Tax: Fund vs ETC

For equities and debt, domicile (Ireland) is the filter. For gold, the **legal structure** matters more, because it decides how India taxes the gain.

| Structure | Examples | What you legally own | How I expect it to be taxed in India |
| --- | --- | --- | --- |
| **Gold ETC** (Exchange Traded Commodity) | Irish ETCs from iShares, Invesco, Amundi, Xtrackers | A **debt security** (zero-coupon note) issued by a special-purpose company, backed by gold | Risk of being treated as an unlisted debenture under **Section 50AA**: slab rate, whatever the holding period |
| **Swiss gold ETF** | iShares Gold (CH), UBS ETF (CH) Gold | **Units of a fund** that owns physical gold | Like any foreign ETF: **12.5% LTCG** after 24 months |
| **Canadian gold trust** | Sprott Physical Gold Trust (PHYS) | **Units of a closed-end trust** that owns physical gold | Like any foreign ETF: **12.5% LTCG** after 24 months |

* **Why Ireland has only ETCs:** European UCITS rules do not allow a fund to hold a single commodity like gold. Issuers work around it with ETCs, which are notes rather than funds.
* **Why Switzerland has real gold funds:** Swiss fund law has no such restriction, so iShares, UBS and others run physically backed gold ETFs domiciled in Switzerland, traded in USD on the SIX Swiss Exchange.
* **Canada:** The Sprott trusts are structured as closed-end mutual fund trusts, with the gold held at the Royal Canadian Mint. `PHYS` is listed on NYSE Arca and TSX in USD.

> **Gold Filter**: Physically backed gold **funds or trusts** (not ETCs), traded in **USD**, with an **AUM exceeding $1 Billion**. Since gold pays no dividends, distributing vs accumulating share classes make no practical difference here.

This is my reading of the rules, not tax advice. Section 50AA was introduced in 2023 and amended in 2024 and 2025, so check the current position (or ask a CA) before you buy.

#### Taxes in Switzerland and Canada (as a Non-Resident)

As far as I can tell, neither country takes anything from an Indian resident holding a gold fund. Gold earns no income, so there is nothing to withhold tax on, and neither country taxes non-residents on these gains or on death. This is the same advantage Irish ETFs have over US ETFs ([Chapter 6](/building-wealth/books/the-global-indian-investor/06-what-to-buy-irish-etfs/)).

| | Swiss gold ETFs (`CSGOLD`, `AUUSI`, …) | Canadian trust (`PHYS`) |
| --- | --- | --- |
| **Capital gains tax there** | None for non-residents on fund units | None, as long as the units are not "taxable Canadian property" (value mostly from Canadian real estate or resources), which bullion is not ([Sprott F-10](https://www.sec.gov/Archives/edgar/data/1477049/000183988222017744/phys-f10_080922.htm)) |
| **Withholding tax** | 35% on dividend or interest payouts, cut to 10% under the India–Switzerland DTAA via a slow refund claim. A gold fund has no income, so in practice nil | 25% on distributions, reduced by treaty. `PHYS` does not normally distribute, so in practice nil |
| **Estate / inheritance tax** | No federal inheritance tax; cantonal taxes follow the deceased's domicile, so a non-resident's fund units are not caught | No estate tax; the deemed sale on death reaches non-residents only through taxable Canadian property |
| **US estate tax** | Not applicable | Not applicable, even though `PHYS` trades on NYSE Arca: it is a Canadian trust, not US property |
| **Other** | Swiss stamp duty (~0.075% per trade) applies only when a Swiss securities dealer is involved; check your broker's trade confirmations | Can trade at a small premium or discount to the value of its gold |

**In India:**

* **Capital gains:** 12.5% LTCG after 24 months (no indexation); STCG at slab rate.
* **Foreign tax credit:** normally nothing to claim. If Swiss tax is ever withheld, claim the 10% treaty rate through Form 67.
* **Disclosure:** report the holdings in Schedule FA, like any other foreign asset.

**Estate processing:** The real hurdle is the broker, not the fund's country. Your heirs go through the broker's process for a deceased account holder (death certificate, and possibly a succession certificate or probate). That is the same whether you hold Irish ETFs, Swiss ETFs or `PHYS`, so keep nominees and documents in order.

### Shortlisted Global Gold Funds (Swiss and Canadian)

Top 3 by AUM and Top 3 by TER are listed here.

| Fund | Domicile | Ticker (USD) | AUM<br/>($ million) | AUM Rank | TER<br/>(%) | TER Rank |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| [Sprott Physical Gold Trust](https://sprott.com/investment-strategies/exchange-listed-products/physical-bullion-funds/gold/) | Canada | `PHYS` (NYSE Arca) | 15,640 | 1 | 0.39 | |
| [UBS ETF (CH) Gold (USD) A-dis](https://www.justetf.com/en/etf-profile.html?isin=CH0106027193) | Switzerland | `AUUSI` (SIX) | 5,471 | 2 | 0.23 | 2 |
| [Swisscanto (CH) Gold ETF EA USD](https://www.justetf.com/en/etf-profile.html?isin=CH0047533549) | Switzerland | `ZGLDUS` (SIX) | 4,511 | 3 | 0.40 | |
| [iShares Gold (CH)](https://www.justetf.com/en/etf-profile.html?isin=CH0104136236) | Switzerland | `CSGOLD` (SIX) | 1,502 | | 0.19 | 1 |
| [Raiffeisen ETF Solid Gold Responsibly Sourced & Traceable A USD](https://www.justetf.com/en/etf-profile.html?isin=CH1122756740) | Switzerland | `RGRTU` (SIX) | 1,011 | | 0.29 | 3 |

> TER ranges from 0.19% to 0.40%, higher than Irish ETCs, in exchange for a cleaner tax structure.

- Source: [justETF](https://www.justetf.com/en/search.html?search=ETFS&index=Gold&quoteCurrency=USD&ls=any&sortOrder=desc&sortField=fundSize&currencyHedged=none) for the Swiss funds (3rd week of November 2026). Swisscanto's AUM is for its USD share class only.
- `PHYS` net assets are as of September 30, 2026, from its interim report; its TER is the management expense ratio (0.35% management fee plus trust expenses).
- `PHYS` is a closed-end trust, so it can trade at a small premium or discount to the value of its gold. The Swiss ETFs create and redeem units, so they stay close to NAV.
- The other big Canadian option, Sprott Physical Gold and Silver Trust (`CEF`, ~$7.4B), holds silver too, so it is not a pure gold holding. Canadian-listed gold ETFs such as iShares `CGL.C` trade in CAD, adding another currency conversion.

I am choosing between `CSGOLD` for the lowest cost and `PHYS` for the largest pool of gold.

### A Gold Comparison

Let's compare Indian Gold ETFs/Mutual Funds against the global options.

#### Indian Gold Mutual Funds (FoFs)

Top 3 by AUM and Top 3 by TER are listed here.

| Fund Name                          | AUM<br/>(₹ Cr) | AUM<br/>($ million) | AUM Rank | Fund TER <br/>(%) | ETF Name                   | ETF TER <br/>(%) | Total TER <br/>(%) | TER Rank |
| ---------------------------------- | -------------: | ------------------: | -------: | ----------------: | -------------------------- | ---------------: | -----------------: | -------: |
| **SBI Gold Fund**                  |         15,691 |               1,640 |        1 |              0.25 | SBI Gold ETF               |             0.65 |               0.90 |          |
| **HDFC Gold Fund**                 |         11,464 |               1,198 |        2 |              0.20 | HDFC Gold ETF              |             0.59 |               0.79 |          |
| **Nippon India Gold Savings Fund** |          7,178 |                 750 |        3 |              0.05 | Nippon India ETF Gold BeES |             0.81 |               0.86 |          |
| **DSP Gold ETF FoF**               |            494 |                  52 |          |              0.15 | DSP Gold ETF               |             0.38 |               0.53 |        3 |
| **Mirae Asset Gold ETF FoF**       |            483 |                  50 |          |              0.12 | Mirae Asset Gold ETF       |             0.33 |               0.45 |        1 |
| **Angel One Gold ETF FoF**         |             32 |                   3 |          |              0.15 | Angel One Gold ETF         |             0.35 |               0.50 |        2 |

> Indian Gold FoF Total TER ranges from 0.45% to 0.90% as shown in the table

#### Indian Gold ETFs

Top 3 by AUM and Top 3 by TER are listed here.

| ETF Name                                        | ISIN         | AUM<br/>(₹ Cr) | AUM<br/>($ million) | AUM Rank | TER<br/>(%) | TER Rank |
| ----------------------------------------------- | ------------ | -------------: | ------------------: | -------: | ----------: | -------: |
| Nippon India ETF Gold BeES                      | INF204KB17I5 |         55,540 |               5,804 |        1 |        0.80 |          |
| ICICI Prudential Gold ETF                       | INF109KC1NT3 |         26,380 |               2,757 |        2 |        0.49 |          |
| SBI Gold Exchange Traded Scheme - Growth Option | INF200KA16D8 |         24,549 |               2,565 |        3 |        0.65 |          |
| Zerodha Gold ETF                                | INF0R8F01042 |          2,218 |                 232 |          |        0.35 |        2 |
| The Wealth Company Gold ETF                     | INF2F0001370 |             23 |                   2 |          |        0.29 |        1 |
| Angel One Gold ETF                              | INF1J2R01114 |             83 |                   9 |          |        0.35 |        3 |

> Indian Gold ETF TER ranges from 0.29% to 0.80% as shown in the table

- Indian fund data is from the last week of May 2026, with 1 USD = 95.70 INR used for the AUM conversions to USD.

#### Irish Gold ETCs (for reference)

These fail the structure filter above, but they remain the cheapest way to hold gold if the tax treatment ever becomes clear. Top 3 by AUM and Top 3 by TER are listed here.

| ETC Name                                                                                                   | AUM<br/>($ million) | AUM Rank | TER<br/>(%) | TER Rank |
| ---------------------------------------------------------------------------------------------------------- | ------------------: | -------: | ----------: | -------: |
| [iShares Physical Gold ETC](https://www.justetf.com/en/etf-profile.html?isin=IE00B4ND3602)                 |              35,610 |        1 |        0.12 |        2 |
| [Invesco Physical Gold ETC](https://www.justetf.com/en/etf-profile.html?isin=IE00B579F325)                 |              28,266 |        2 |        0.12 |        2 |
| [Amundi Physical Gold ETC (C)](https://www.justetf.com/en/etf-profile.html?isin=FR0013416716)              |              11,365 |        3 |        0.12 |        2 |
| [Xtrackers IE Physical Gold ETC Securities](https://www.justetf.com/en/etf-profile.html?isin=DE000A2T0VU5) |               6,365 |          |        0.11 |        1 |

- Source: [justETF](https://www.justetf.com/en/search.html?search=ETFS&index=Gold&dc=IE&quoteCurrency=USD&resetPage=true) as of the 3rd week of November 2026, filtered for Ireland Domicile and Gold asset class.
- ISIN prefixes reflect where the instrument was initially registered or the parent entity's location, while the legal domicile of the vehicle remains in Ireland.

#### Comparing the AUM and TER
Min and Max cost and AUM are based on the filtered list of Top 3 AUM and Top 3 TER rankings above.

| Instrument | Min AUM<br/>($ million) | Max AUM<br/>($ million) | Min TER<br/>(%) | Max TER<br/>(%) |
| --- | ---: | ---: | ---: | ---: |
| Indian Gold Mutual Funds (FoFs) | 3 | 1,640 | 0.45 | 0.90 |
| Indian Gold ETFs | 2 | 5,804 | 0.29 | 0.80 |
| **Global Gold Funds (Swiss & Canadian)** | 1,011 | 15,640 | 0.19 | 0.40 |
| Irish Gold ETCs (reference) | 6,365 | 35,610 | 0.11 | 0.12 |

**The Scale & Cost Gap:**

* **Scale:** The largest Indian Gold ETF (**~$5.8B**) is **~2.7x smaller** than `PHYS` (**~$15.6B**), while the largest Indian Gold Mutual Fund is **nearly 10x smaller**.
* **Cost:** Indian Gold Mutual Funds are **2.4x to 4.7x costlier** than iShares Gold (CH) at 0.19%. At 0.39%, `PHYS` costs about the same as the cheaper Indian options; what you get there is scale, USD liquidity and a price that tracks global gold (see the next section).

#### Notes
- **The Domicile Note:** Unlike global equity ETFs (where an Ireland domicile slashes US Dividend Withholding Tax from 30% to 15%), gold does not pay dividends. So there is **no tax-treaty advantage** to any domicile for gold. Pick the structure first and the domicile follows: Switzerland or Canada for a fund, Ireland only for an ETC.

### Import Duty: Indian Gold Does Not Track the Global Price

Indian Gold ETFs value their gold at the **domestic price**: the international (LBMA) price, converted to INR, **plus import duty**. So every Budget-day change in duty moves your Indian gold NAV overnight, with no change in the actual price of gold.

| Date | Import duty change | Effect on Indian Gold ETF NAVs |
| --- | --- | --- |
| July 2024 (Union Budget) | Cut from 15% to 6% | Fell overnight, while global gold was flat |
| May 2026 | Raised from 6% to 15%, the [steepest increase on record](https://www.gold.org/goldhub/gold-focus/2026/05/india-gold-market-update-import-tightening) | Rose overnight, while global gold was flat |

What this means for an investor:

* **Duty is policy risk, not return.** A gain from a duty hike can reverse at the next Budget. Over a 20–30 year holding, you are exposed to every policy cycle in between.
* **Buy high, sell low, by accident.** If you buy while duty is 15% and sell after a cut, you lose the difference even if gold itself rose.
* **Global gold funds price gold at the international price in USD.** Your INR return is just gold's USD return plus the USD/INR move, which is what the TER drag calculation below assumes.

### TER Drag Compounds Hard Over Long Durations

At first glance, the difference between a 0.19% Global Gold Fund and a 0.90% Indian Gold Fund may appear small. But gold is usually a long-duration holding, and recurring costs compound aggressively over time.

Historically, gross INR gold returns are driven by two compounding components:

* **Gold Growth (USD):** ~7%
* **USD/INR Depreciation:** ~4%
* **Combined Gross INR Return:** 11.28% *[(1.07 * 1.04) - 1]*

Crucially, the investment structure dictates exactly *where* the Total Expense Ratio (TER) is deducted, which alters the final math.

For a **Global Gold Fund**, the 0.19% TER is deducted directly from the underlying USD gold return, meaning you still get the full benefit of the currency depreciation on that net USD amount. For an **Indian Gold Fund**, the 0.90% TER is deducted from the *total combined* INR return.

Here is how that structural difference impacts the effective return rate:

#### 1. Deriving the Effective Net Rate

| Structure | Gross USD Growth | TER | Net USD Growth | USD/INR Growth | Effective Net INR CAGR |
| --- | --- | --- | --- | --- | --- |
| **Low-cost Global Gold Fund** | 7.00% | 0.19% | 6.81% | 4.00% | **11.08%**  *[(1.0681 * 1.04) - 1]* |
| **Indian Gold Fund** | 7.00% | N/A* | 7.00% | 4.00% | **10.38%**  *[11.28% - 0.90%]* |

*(Note: The Indian Fund's TER is applied to the final INR return, not the USD leg).*

While a ~0.70% difference in net CAGR might sound easily ignorable, time amplifies this gap significantly.

#### 2. Comparison of Long-Term Growth

For a simple ₹1 lakh lump sum held for 30 years, here is how that effective rate divergence plays out:

| Structure | Effective Net INR CAGR | Final Value (Nominal) | Additional (₹) | Additional (%) |
| --- | --- | --- | --- | --- |
| **Indian Gold Fund** | [10.38%](https://sakthipriyan.com/building-wealth/tools/realvalue-sip-engine/#v1otd30yf202605c1lm0kg10.38h0i6t15p30y) | **₹19.35 lakh** | - | - |
| **Low-cost Global Gold Fund** | [11.08%](https://sakthipriyan.com/building-wealth/tools/realvalue-sip-engine/#v1otd30yf202605c1lm0kg11.08h0i6t15p30y) | **₹23.39 lakh** | **₹4.04 lakh** | **21%** |

By switching from an Indian Gold Fund to a low-cost Global Gold Fund, the investor pockets an extra **₹4.04 lakh**, a final portfolio value nearly **21% higher** over 30 years, simply through structural efficiency. An Irish ETC at 0.12% would add a little more (₹23.90 lakh), but only if it escapes slab-rate taxation, which is exactly the risk the structure filter avoids.

This is why recurring structural costs matter enormously for long-term passive assets like gold. One-time forex conversion and routing costs to access global markets may hurt initially, but the recurring TER drag of domestic funds compounds against the investor every single year.

**Note**: These calculations exclude the initial one-time forex conversion and brokerage costs required to access global markets, and any import-duty swings on the Indian side. However, the recurring TER savings from lower-cost Global Gold Funds typically offset these upfront costs within the first few years of holding. In practice, the effective forex cost may be even lower when gold investments are piggybacked on existing international equity allocations, since the same USD balance can be reused across assets without repeated INR–USD conversions. There is no forex cost involved when rebalancing from Global Equity to Gold.

### Notes
- Indian gold prices include the impact of import duties, GST, and other local market factors (see [Import Duty](#import-duty-indian-gold-does-not-track-the-global-price) above), so they can move independently of global gold prices.
- Currently, my gold allocation sits in Indian Mutual Funds. I had planned to route future gold investments into Irish ETCs, but the Section 50AA risk changed that. My future gold investments go into gold funds structured as funds or trusts (Swiss ETFs or `PHYS`), to eliminate the domestic cost drag, the import-duty distortion and the debt-tax risk together.

## Portfolio Construction

The indexes and ETFs discussed throughout this chapter can be combined in several ways depending on how much diversification, concentration, and control an investor desires.

At one end of the spectrum sits the fully diversified global market portfolio. At the other end sits a concentrated, high-conviction portfolio built around India and US technology. As diversification decreases, concentration in a smaller set of countries, sectors, and companies naturally increases. This may lead to higher returns, but it also increases volatility and the risk of underperforming the broader global market.

| Portfolio | DM Allocation | EM Allocation | Description |
| :--- | :--- | :--- | :--- |
| **GM** | Included | Included | One-fund global portfolio (FTSE All-World / MSCI ACWI). |
| **DM + EM** | MSCI World / FTSE Developed | MSCI EM / FTSE Emerging | Full control over Developed and Emerging Market weights. |
| **DM + India** | MSCI World / FTSE Developed | India | India replaces dedicated EM allocation. |
| **USA + India** | MSCI USA / S&P 500 | India | Simple two-region portfolio. |
| **Nasdaq 100 + India** | Nasdaq 100 | India | Concentrated growth portfolio focused on India and US technology. |

### The Concentration Ladder

As we move down the ladder—from **GM → DM → MSCI USA → S&P 500 → Nasdaq 100**—the portfolio gradually becomes more concentrated. 

The number of countries and individual companies decreases, reducing overall diversification. Conversely, the weight of the top 10 companies, technology exposure, and volatility all increase. This magnifies both the potential for massive outperformance and the risk of severe underperformance.

### The Role of Gold and Debt

Growth assets are only one side of portfolio construction. Gold and Debt serve an entirely different purpose:

| Asset | Primary Role |
| :--- | :--- |
| **Equity** | Long-term growth |
| **Gold** | Crisis hedge and rebalancing asset |
| **Debt** | Stability, liquidity, and dry powder |

Rather than maximizing returns, Gold and Debt create opportunities for systematic rebalancing. For example:

* During equity bear markets, Gold or Debt can be sold to purchase equities at lower valuations.
* During strong equity rallies, excess profits can be redirected into Gold or Debt.
* During retirement, Debt can provide spending liquidity while allowing equities to recover from temporary drawdowns.

A later chapter on **The Perpetual Rebalancing Framework** will cover the exact mechanics I follow to maintain my desired asset allocation, detailing both the Accumulation and Decumulation phases end-to-end.

### My current asset allocation (Tax Year 2026-27)

My current asset allocation is based on the **Concentrated Diversification** approach. 
US is highly concentrated via Nasdaq 100, while India is highly diversified in the Nifty 500 companies using custom weights. Concentrated on just 2 countries but diversified over 600 companies.

Instead of owning the entire world, I focus on two primary growth engines:

1. **India** through broad market indexes (Nifty 50, Nifty Next 50, Nifty Midcap 150, & Nifty Smallcap 250).
2. **US Technology and Innovation** through the Nasdaq 100.

This results in exposure to approximately 600 companies (Nifty 500 via custom weights + Nasdaq 100). While significantly more concentrated than a global index, it still provides meaningful diversification across sectors, industries, and market capitalizations.

My current asset allocation looks like this:

| Asset | Allocation |
| --- | --- |
| **India** | 45% |
| **Nasdaq 100** | 40% |
| **Gold** | 10% |
| **Debt** | 5% |

This gives me 50% INR (India + Debt) and 50% USD (Nasdaq 100 + Gold) based assets. 85% in Equity and 15% in defensive assets.

> This allocation reflects my own goals, risk tolerance, and conviction. It should be viewed as an example implementation rather than a recommendation.

### Key Takeaway

The decision is not simply a binary choice between diversification and concentration. It is a choice between:

* **Maximum Diversification** through Global Market portfolios, which aim to capture global economic growth with minimal concentration risk. This is truly moving to a global index and not worry about which country/sector will perform better.
* **Concentrated Diversification** through portfolios such as India + Nasdaq 100, which focus on a smaller set of high-conviction growth engines while relying on Gold and Debt to provide stability and rebalancing opportunities. This is for investors who have conviction in their country and top global growth engine. This is the approach I currently follow.

Neither approach is inherently superior. The appropriate choice depends entirely on an investor's goals, conviction, risk tolerance, and willingness to weather periods of underperformance relative to the global market.

> The important part is selecting an allocation that you can consistently maintain through both bull and bear markets. A good portfolio is not the one with the highest historical return, but the one you can hold for decades without abandoning the plan.

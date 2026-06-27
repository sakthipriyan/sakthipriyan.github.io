---
title: "The Perpetual Rebalancing Framework"
date: 2026-06-27
draft: false
type: "blogs"
wealth_tags:
  - Asset Allocation
  - Perpetual Rebalancing
  - Rebalancing
  - Retirement
summary: "A unified framework that handles buying, selling, liquidity management, and withdrawals under one coherent rule set for both Accumulation and Retirement Phases."
js_tools:
  - echarts
  # - d2
---

## 1. Introduction

The **Perpetual Rebalancing Framework** is a stateful, drift-aware, liquidity-aware, and tax-aware portfolio operating system designed to support both phases of an investor's journey:

1. **Accumulation:** Building wealth through regular contributions.
2. **Retirement:** Funding expenses while preserving long-term portfolio stability.

The framework is built on **3 core principles**:

1. **Liquidity First**: Maintain sufficient liquidity for emergencies during accumulation and for regular expenditures during retirement.

2. **Risk Management**:
   - **Passive Drift Control:** Use portfolio cash flows to continuously reduce drift month on month.
   - **Active Drift Control:** Perform tax-aware **slow rebalancing** only when overall portfolio drift exceeds predefined thresholds.

3. **Tax Efficiency**: Minimize taxes by preferentially realizing Long-Term Capital Gains (LTCG) while keeping portfolio turnover low.


> The framework is designed for **globally diversified, multi-asset portfolios**

For example, **Indian Equities, US Equities, Gold, and Debt** — where different asset classes often experience significant return **dispersion** over **long horizon**. This natural divergence creates **portfolio drift**, making **continuous, systematic rebalancing** an effective mechanism for maintaining the desired strategic asset allocation while minimizing unnecessary **portfolio churn**.

The framework is stateful, meaning investment decisions depend not only on current portfolio weights, but also on liquidity reserve status and the current rebalancing state.


## 2. System Overview

The framework consists of **5 primary components**:

1. **Income:** Cash inflows into the system from salary, business income, dividends, asset sales, and other sources.
2. **Liquidity Reserves:** Dedicated reserves maintained separately from the core portfolio to fund emergencies during accumulation and planned expenditures during retirement.
3. **Core Portfolio:** The strategic asset classes that form the long-term investment portfolio. These assets are expected to drift naturally over time and are systematically rebalanced toward their target allocations.
4. **Buy Engine:** A forward water-filling engine that deploys available capital into underweight asset classes while respecting liquidity priorities.
5. **Sell Engine:** A reverse water-filling, tax-aware engine that gradually harvests Long-Term Capital Gains from overweight asset classes when portfolio drift exceeds configured thresholds.

```d2
direction: down

Income: {
  Salary
  Dividends
  Business
  MutualFundETFSale: "Mutual Fund / ETF Sale"
  Etc: "..."
}

BuyEngine: "Buy Engine"

Assets: {
  direction: right

  Liquidity: "Liquidity Reserves" {
    ArbitrageFund: "Arbitrage Fund"
  }

  CorePortfolio: "Core Portfolio" {
    EquityIN: "Equity IN"
    EquityUS: "Equity US"
    Debt
    Gold
  }
}

SellEngine: "Sell Engine"

TaxReserve: "Tax Payment"

Income -> TaxReserve: Priority 0
Income -> Assets.Liquidity: Priority 1
Income -> BuyEngine: Priority 2

BuyEngine -> Assets.CorePortfolio

Assets.CorePortfolio -> SellEngine

Spending: {
  Emergency
  Retirement
}

Assets.Liquidity -> Spending

SellEngine -> Income

```

## 3. System Components

The following sections describe each component of the framework in detail.

### 1. Income

Income represents all cash inflows into the framework. During the **Accumulation Phase**, typically salary / business income is the primary source of deployable capital.

Various income source across both phases include:
* **Salary**
* **Business income**
* Dividends
* Interest
* Maturity proceeds
* Proceeds from asset sales
* Any other external cash inflows


#### Prioritized Routing

All income is routed according to the framework's capital priority rules.

| Priority | Destination | Purpose |
|----------|-------------|---------|
| **0**&nbsp;(Highest) | **Tax Payment** | Reserve funds to meet tax liabilities before any capital is redeployed. Typically after sale of any assets. |
| **1** (Medium) | **Liquidity&nbsp;Reserve** | Fund the active liquidity reserve (Emergency during accumulation or Retirement during retirement) until its target is reached. |
| **2** (Lowest) | **Core Portfolio** | Deploy any remaining capital into underweight assets through Buy Engine. |

#### Policy Configurations

- **The default priority order is always followed during both Accumulation Phase and Retirement Phase**
- One override option during a job loss in Accumulation Phase:
  - The Emergency Reserve is used to fund essential living expenses.
  - Investors may choose to **temporarily suspend replenishing the Emergency Reserve** while it is being drawn down.
  - This optional policy encourages prioritizing re-employment over immediately rebuilding the reserve.
  - Once employment resumes, the default priority order is followed.


### 2. Liquidity Reserves

Liquidity Reserves are dedicated reserves maintained separately from the Core Portfolio. They are excluded from portfolio drift calculations and exist solely to satisfy liquidity requirements.

The liquidity reserve depends on the investor's lifecycle state:

- **Accumulation Phase**: Acts as **Emergency Fund**
- **Retirement Phase**: Acts as **Retirement Fund**

Whenever the liquidity reserve is below its target, available capital is usually directed to the liquidity reserve before being invested in the Core Portfolio.

#### Policy Configurations

The framework exposes a small set of policy parameters that determine the size of each reserve.

| Phase | Reserve | Default Target | Description |
|-------|---------|----------------|-------------|
| **Accumulation** | **Emergency Reserve** | **12 months of essential expenses** | Maintains a reserve for income disruptions and emergencies. The framework prioritizes building and replenishing this reserve before investing in the Core Portfolio. |
| **Retirement** | **Retirement Reserve** | **3 years of annual expenses** | Maintains a reserve for planned withdrawals, reducing the need to sell Core Portfolio assets during adverse market conditions and mitigating sequence of returns risk. |

- Reserve targets are configurable and should reflect an investor's risk tolerance and financial circumstances.
- During retirement, the Retirement Reserve is gradually replenished from future portfolio harvests as withdrawals are made.

#### Illustrative Reserve Assets

| Asset Class | Currency | Primary Purpose | Minimum LTCG Holding Period | LTCG  | STCG |
|-------------|----------|-----------------|----------------------------------------|---|---|
| **Indian Arbitrage Funds** | INR | Provide highly liquid, low-volatility reserves for short-term liquidity needs. | **1 year** | 12.5% | 20% |
| **Irish ETFs holding short-duration U.S. Treasury Bills** | USD | Provide defensive USD reserves while preserving capital and maintaining liquidity. | **2 years** | 12.5% | Slab rate |

**Note:** The LTCG holding periods above are based on prevailing Indian tax law. Investors should always verify current tax regulations and consult with tax advisors regarding their specific circumstances.

### 3. Core Portfolio

The Core Portfolio contains the strategic long-term asset allocation, for example:

| Asset Class | Indian | International¹ |
|-------------|--------------------|--------------------------|
| **Equities** |  Equities (Stocks, ETFs, Mutual Funds) | MSCI ACWI / MSCI USA / S&P 500 / Nasdaq 100 / Apple |
| **Debt** |  Debt Funds / Bonds | Irish ETFs holding short term US Treasuries |
| **Gold** |  Gold Funds / ETFs | International Gold ETFs such as Sprott Physical Gold Trust (PHYS) |

1. See **The Global Indian Investor** book: **[Chapter 7: Selecting the Global Indexes](https://sakthipriyan.com/building-wealth/books/the-global-indian-investor/07-selecting-the-global-indexes/)** for more on selecting the Global Indexes.

### Example Portfolio: Current State
The following example illustrates a real global multi-asset portfolio. Each asset has a **target allocation** and a **current market value**. As markets move, the portfolio naturally drifts away from its target allocation over time.

| Asset            |      Target |     Current |      Drift | State               |
| ---------------- | ----------: | ----------: | ---------: | ------------------- |
| **Nasdaq 100**   |      40.00% |      38.75% | **−1.25%** | Underweight         |
| **Nifty 50**     |      20.00% |      20.20% | **+0.20%** | Slightly Overweight |
| **Next 50**      |      10.00% |       9.64% | **−0.36%** | Underweight         |
| **Midcap 150**   |      10.00% |       9.56% | **−0.44%** | Underweight         |
| **Smallcap 250** |       5.00% |       4.92% | **−0.08%** | Slightly Underweight|
| **Debt**         |       5.00% |       6.15% | **+1.15%** | Overweight          |
| **Gold**         |      10.00% |      10.78% | **+0.78%** | Overweight          |
| **Total**        | **100.00%** | **100.00%** | **+2.13%** |                     |

See: [State of the 1 Portfolio](/building-wealth/tags/state-of-the-1-portfolio/) or [State of the Portfolio](/building-wealth/tags/state-of-the-portfolio/) for more such data points.

This Example Portfolio has Total Positive Drift: **2.13%** and hence Total Negative Drift: **−2.13%**. Simply, I use **Total Positive Drift** as **Portfolio Drift**. 

> **Portfolio Drift** is essentially the representation of how much we have to sell and reinvest in order to bring back the portfolio to its **Target Allocation**. (Excluding taxation/transaction cost)

**Managing the Portfolio Drift is the act of managing risk profile of the portfolio.** 
If Portfolio Drift is unmanaged, the risk profile will change considerably over time. That is where **Buy Engine** and **Sell Engine** contribute towards this process.
* **Buy Engine** is used to reduce underweights using fresh capital via **Forward Water-Filling** algorithm.
* **Sell Engine** is used to reduce excessive overweights using **Reverse Water-Filling** algorithm when portfolio drift becomes unacceptable.

Both approaches are essentially optimizing the Portfolio Drift after SELL/BUY actions.

> Primary Goal of **Risk Management** is to **Steer** the **Portfolio Drift** towards **Zero**.

#### Policy Configurations

- The **Core Portfolio allocation** should be determined by the investor's **risk tolerance**, investment horizon, and financial goals.
- A globally diversified portfolio should include at least four broad asset classes:
  - **Indian Equities**
  - **International Equities**
  - **Gold**
  - **Debt**
- Each broad asset class may be further subdivided to improve diversification. For example:
  - **Indian Equities:** Nifty 50, Nifty Next 50, Midcap 150, Smallcap 250, or other broad-market indices.
  - **International Equities:** MSCI ACWI, MSCI World + MSCI Emerging Markets, MSCI USA, S&P 500, Nasdaq 100, or similar diversified global indices.
- **Defensive assets** such as **Gold** and **Debt** reduce overall portfolio risk and provide stability during periods of market stress.
  - **Gold** primarily serves as a hedge against macroeconomic uncertainty and inflation.
  - **Debt** provides liquidity, lowers portfolio volatility, and serves as dry powder for future rebalancing opportunities.
- During the **Retirement Phase**, the strategic asset allocation typically shifts toward defensive assets by reducing equity exposure and increasing allocations to Gold and Debt. This generally sacrifices some long-term growth in exchange for lower volatility and greater portfolio stability.

### 4. Buy Engine

**The Buy Engine is responsible for deploying available capital into the Core Portfolio.**

Traditional approaches often rely on **calendar-based rebalancing** or **threshold-based rebalancing** , both of which typically require selling winners and can increase portfolio turnover and tax realization. **The Perpetual Rebalancing Framework** instead uses **cash-flow-based rebalancing** as its **primary mechanism**. 

By directing fresh capital to underweight assets, the framework continuously reduces portfolio drift while minimizing unnecessary sales, portfolio turnover, and taxes. Active selling is reserved only for situations where overall portfolio drift exceeds predefined thresholds which is taken care by the **Sell Engine**.

It implements the **Forward Water-Filling** algorithm, which allocates capital only to underweight asset classes. I will explain this using following Example Portfolio data and visuals.

### Example Portfolio: Buy Engine Deployment Summary

The following table summarizes the impact of the Buy Engine deployment for the above  Example Portfolio. Here, we are investing **2.11%** of current portfolio value as part of monthly investment cycle. It has reduced the Portfolio Drift from **2.13%** to **1.58%** and correcting **0.55%** of the total drift. Essentially 25% improvement of the Portfolio Drift.

| Asset Class | Target | Pre-Allocation (%) | Pre-Drift | Allocation | Post-Allocation (%) | Post-Drift |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| **Nasdaq 100** | 40.00% | 38.75% | -1.25% | 80.30% | 39.61% | **-0.39%** |
| **Nifty 50** | 20.00% | 20.20% | +0.20% | 0.00% | 19.78% | -0.22% |
| **Next 50** | 10.00% | 9.64% | -0.36% | 7.91% | 9.61% | **-0.39%** |
| **Midcap 150** | 10.00% | 9.56% | -0.44% | 11.79% | 9.61% | **-0.39%** |
| **Smallcap 250** | 5.00% | 4.92% | -0.08% | 0.00% | 4.81% | -0.19% |
| **Debt** | 5.00% | 6.15% | +1.15% | 0.00% | 6.02% | +1.02% |
| **Gold** | 10.00% | 10.78% | +0.78% | 0.00% | 10.55% | +0.55% |
| **Total** | **100%** | **100%** | **2.13%** | **100%** | **100%** | **1.58%** |

Same data represented as Stacked Bar Chart.

<div id="water-filling-chart" class="echarts-container" style="height: 700px;" data-chart='{
    "title": { "text": "Drift Correction Impact", "left": "center" },
    "tooltip": { "trigger": "axis", "axisPointer": { "type": "shadow" } },
    "legend": { 
        "data": ["Pre Drift", "Post Drift", "Improvement", "Improvement (Evaporated)", "Worsening"],
        "bottom": 0 
    },
    "grid": { "left": "3%", "right": "4%", "bottom": "15%", "containLabel": true },
    "xAxis": {
        "type": "category",
        "data": ["Nasdaq 100", "Nifty 50", "Next 50", "Midcap 150", "Smallcap 250", "Debt", "Gold"],
        "axisLabel": { "interval": 0, "rotate": 30 }
    },
    "yAxis": {
        "type": "value",
        "name": "Drift (%)",
        "min": -1.5,
        "max": 1.25,
        "axisLabel": { "formatter": "{value}%" }
    },
    "series": [
        { "name": "Pre Drift", "type": "bar", "data": [], "itemStyle": { "color": "#3b82f6" } },
        { "name": "Post Drift", "type": "bar", "data": [], "itemStyle": { "color": "#1e40af" } },
        { "name": "Improvement", "type": "bar", "data": [], "itemStyle": { "color": "#22c55e" } },
        { "name": "Improvement (Evaporated)", "type": "bar", "data": [], "itemStyle": { "color": "#22c55e", "opacity": 0.4, "decal": { "symbol": "rect", "color": "rgba(0,0,0,0.2)", "dashArrayX": [1, 0], "dashArrayY": [2, 4], "rotation": 0.785 } } },
        { "name": "Worsening", "type": "bar", "data": [], "itemStyle": { "color": "#ef4444", "opacity": 0.4, "decal": { "symbol": "rect", "color": "rgba(0,0,0,0.2)", "dashArrayX": [1, 0], "dashArrayY": [2, 4], "rotation": 0.785 } } },
        {
            "name": "Empty",
            "type": "bar",
            "barWidth": "70%",
            "stack": "main",
            "data": [-0.39, 0, -0.36, -0.39, -0.08, 0, 0],
            "itemStyle": { "color": "transparent" },
            "tooltip": { "show": false }
        },
        {
            "name": "Neg Delta",
            "type": "bar",
            "barWidth": "70%",
            "stack": "main",
            "data": [
                { "value": -0.86, "itemStyle": { "color": "#22c55e" } },
                { "value": -0.22, "itemStyle": { "color": "#ef4444", "opacity": 0.4, "decal": { "symbol": "rect", "color": "rgba(0,0,0,0.2)", "dashArrayX": [1, 0], "dashArrayY": [2, 4], "rotation": 0.785 } } },
                { "value": -0.03, "itemStyle": { "color": "#ef4444", "opacity": 0.4, "decal": { "symbol": "rect", "color": "rgba(0,0,0,0.2)", "dashArrayX": [1, 0], "dashArrayY": [2, 4], "rotation": 0.785 } } },
                { "value": -0.05, "itemStyle": { "color": "#22c55e" } },
                { "value": -0.11, "itemStyle": { "color": "#ef4444", "opacity": 0.4, "decal": { "symbol": "rect", "color": "rgba(0,0,0,0.2)", "dashArrayX": [1, 0], "dashArrayY": [2, 4], "rotation": 0.785 } } },
                0, 0
            ],
            "tooltip": { "show": false }
        },
        {
            "name": "Neg Base",
            "type": "bar",
            "barWidth": "70%",
            "stack": "main",
            "data": [
                { "value": -0.25, "itemStyle": { "color": "#3b82f6" } },
                { "value": -1.28, "itemStyle": { "color": "#1e40af" } },
                { "value": -1.11, "itemStyle": { "color": "#1e40af" } },
                { "value": -1.06, "itemStyle": { "color": "#3b82f6" } },
                { "value": -1.31, "itemStyle": { "color": "#1e40af" } },
                { "value": -1.50, "itemStyle": { "color": "#1e40af" } },
                { "value": -1.50, "itemStyle": { "color": "#1e40af" } }
            ],
            "tooltip": { "show": false }
        },
        {
            "name": "Pos Base",
            "type": "bar",
            "barWidth": "70%",
            "stack": "main",
            "data": [
                0, 0, 0, 0, 0, 
                { "value": 1.02, "itemStyle": { "color": "#1e40af" } },
                { "value": 0.55, "itemStyle": { "color": "#1e40af" } }
            ],
            "tooltip": { "show": false }
        },
        {
            "name": "Pos Delta",
            "type": "bar",
            "barWidth": "70%",
            "stack": "main",
            "data": [
                0,
                { "value": 0.20, "itemStyle": { "color": "#ef4444", "opacity": 0.4, "decal": { "symbol": "rect", "color": "rgba(0,0,0,0.2)", "dashArrayX": [1, 0], "dashArrayY": [2, 4], "rotation": 0.785 } } },
                0, 0, 0,
                { "value": 0.13, "itemStyle": { "color": "#22c55e", "opacity": 0.4, "decal": { "symbol": "rect", "color": "rgba(0,0,0,0.2)", "dashArrayX": [1, 0], "dashArrayY": [2, 4], "rotation": 0.785 } } },
                { "value": 0.23, "itemStyle": { "color": "#22c55e", "opacity": 0.4, "decal": { "symbol": "rect", "color": "rgba(0,0,0,0.2)", "dashArrayX": [1, 0], "dashArrayY": [2, 4], "rotation": 0.785 } } }
            ],
            "tooltip": { "show": false }
        },
        {
            "name": "Pre Drift",
            "type": "line",
            "data": [-1.25, 0.20, -0.36, -0.44, -0.08, 1.15, 0.78],
            "itemStyle": { "color": "#3b82f6" },
            "lineStyle": { "opacity": 0 },
            "symbol": "none"
        },
        {
            "name": "Post Drift",
            "type": "line",
            "data": [-0.39, -0.22, -0.39, -0.39, -0.19, 1.02, 0.55],
            "itemStyle": { "color": "#1e40af" },
            "lineStyle": { "opacity": 0 },
            "symbol": "none"
        },
        {
            "name": "Improvement",
            "type": "line",
            "data": [0.86, "-", "-", 0.05, "-", 0.13, 0.23],
            "itemStyle": { "color": "#22c55e" },
            "lineStyle": { "opacity": 0 },
            "symbol": "none"
        },
        {
            "name": "Worsening",
            "type": "line",
            "data": ["-", -0.42, -0.03, "-", -0.11, "-", "-"],
            "itemStyle": { "color": "#ef4444" },
            "lineStyle": { "opacity": 0 },
            "symbol": "none"
        }
    ]
}'></div>


* **Capital Deployment:** In this round, The Buy Engine focused exclusively on underweight assets (Nasdaq 100, Next 50, and Midcap 150) to minimize drift while avoiding additional exposure to already overweight positions.
* **Passive Normalization:** Overweight assets—specifically **Nifty 50, Debt, and Gold**—were not allocated new capital. Their post-allocation percentages decreased slightly due to the increased total portfolio base, illustrating the natural normalization process inherent in the framework.
* **System State:** The portfolio remains in a "drift-aware" state, with Nasdaq 100 showing the most significant improvement, closing the gap from **-1.25%** to **-0.39%**.

This example demonstrates an important property of the framework:

> **Even though Gold has returned significantly more than Debt (≈91% vs ≈19% cumulative gain), it receives no special treatment. Decisions are driven solely by portfolio drift relative to the strategic allocation—not by recent returns or performance.**

I think this last observation is one of the strongest teaching moments in your framework. It reinforces that the operating system is **allocation-driven**, not **performance-chasing**, which is a key distinction.


Since the aggregate positive drift is **well below** the Sell Engine activation threshold (10% by default), **no assets are sold**.

Instead, the **Buy Engine** deploys future contributions using Forward Water-Filling:

1. Nasdaq 100
2. Midcap 150
3. Next 50
4. Smallcap 250

Debt, Gold, and Nifty 50 receive no additional allocation until their positive drift has been offset by future investments.



Its objectives are to:

* passively reduce portfolio drift,
* minimize portfolio turnover,
* avoid unnecessary selling, and
* preserve tax efficiency by using fresh inflows as the primary rebalancing mechanism.

The Buy Engine operates only after all liquidity obligations have been satisfied.

### 5. Sell Engine

The Sell Engine actively controls portfolio drift when passive rebalancing is no longer sufficient.

It implements the **Reverse Water-Filling** algorithm, which gradually harvests gains from overweight asset classes whenever aggregate portfolio drift exceeds the configured threshold.

The Sell Engine follows three constraints:

* sell only LTCG-eligible lots,
* reserve taxes before redeploying proceeds, and
* distribute sales across overweight assets to restore the portfolio toward its strategic allocation.

Unlike the Buy Engine, the Sell Engine is event-driven and activates only when the portfolio requires active drift correction.

---


## 3. System Components
### 1. Income

### 2. Liquidity Buckets

### 3. Core Portfolio

### 4. Buy Engine

### 5. Sell Engine



## 3. Core Design Principles
1. **Fresh inflows do most of the rebalancing:** Directing new money to underweights reduces turnover and taxes.
2. **Winners are not constantly cut:** Assets drift within a tolerance band; sales only trigger at portfolio-level extremes.
3. **Liquidity is protected first:** Emergency and Retirement buckets must be funded before any drift optimization occurs.
4. **Sells are portfolio-level:** Reverse water-filling distributes the sell burden mathematically across all overweight assets.
5. **Retirement bucket is a liquidity sink:** It absorbs harvested gains and funds withdrawals, fully decoupled from drift logic.

## 4. System States & Portfolio Structure

### States
* **Accumulation Mode:** Wealth-building phase. Fresh inflows continue; Emergency Bucket prioritised.
* **Retirement Mode:** Withdrawal phase. Portfolio funds living expenses; Retirement Bucket prioritised.

### Structure
* **Core Portfolio (Strategic Assets):** Participates in drift measurement, buy-side water-filling, and sell-side reverse water-filling. (e.g., Equities, Debt, Gold).
* **Liquidity Buckets (Emergency / Retirement):** Special-purpose cash reserves. Excluded from ordinary drift optimization.

## 5. Liquidity Bucket Design

### Emergency Bucket (Accumulation)
* **Purpose:** Short-term resilience against income loss or shocks.
* **Refill Rule:** If below target, it claims all fresh inflows and harvested sell proceeds before the core portfolio.

### Retirement Bucket (Retirement)
* **Target Size:** 3 years of expenses (E₁ + E₂ + E₃).
* **Assets:** Indian Arbitrage Funds (immediate local liquidity) and USD Treasuries (0–3 year defensive reserve).
* **Refill Rule:** If below target, it claims all eligible capital first.

## 6. Mathematical Definitions
For $n$ core assets:
* $w_i$ = target weight
* $p_i$ = current weight
* $d_i = p_i - w_i$ (Drift)
* $d_i^+ = \max(d_i, 0)$ (Positive drift)
* $D^+ = \sum d_i^+$ (Total System-Wide Positive Drift)

## 7. Buy Engine: Forward Water-Filling
Allocates deployable capital ($C$) to underweight assets ($d_i < 0$) to minimize post-allocation drift imbalance:
* **Objective:** $\min \sum (d_i^{post})^2$
* **Rule:** Deepest deficits receive capital first. Stops when an asset reaches target. Overweights never receive capital.

## 8. Sell Engine: Reverse Water-Filling
Activated when aggregate positive drift becomes excessive.

* **Sell Trigger:** $D^+ > 10\%$
* **Trailing Ceiling Progression:** Steps down over successive reviews: 10% → 9% → 8% → 7% → 6% → 5%.
* **Eligibility:** Only assets with LTCG-eligible lots are sold.
* **Objective:** At active ceiling $c$, minimizes squared excess drifts: $\min \sum (\max(d_i^{post} - c, 0))^2$.
* **Execution:** Sells the most overweight assets down to the active ceiling.

## 9. Tax Rules & Capital Priority
* **Net Capital:** Taxes are computed and reserved immediately on sold lots. Only post-tax net proceeds are redeployed.
* **Capital Routing Cascade:**
  * **Accumulation:** Emergency Bucket → Core Underweights
  * **Retirement:** Retirement Bucket → Core Underweights

## 10. Monthly Execution Engine
1. **Update State:** Refresh asset values and determine active state (Accumulation vs Retirement).
2. **Determine Liquidity Obligation:** Calculate active bucket deficit.
3. **Collect Inflows:** Aggregate SIP, dividends, and idle cash.
4. **Route Inflows:** Fill active bucket deficit first.
5. **Forward Water-Filling:** Allocate any residual inflows to core underweights.
6. **Compute Drift:** Calculate total positive drift ($D^+$).
7. **Evaluate Sell Trigger:** If $D^+ > 10\%$, activate sell program.
8. **Reverse Water-Filling:** Trim LTCG overweights down to the active ceiling.
9. **Reserve Taxes:** Deduct tax liability to find net harvested capital.
10. **Route Harvested Capital:** Fill active bucket deficit first, then allocate remainder via forward water-filling.
11. **Update State Machine:** Step down sell ceiling for the next review cycle.

## 11. Canonical Rule Set
* **State:** Accumulation Mode or Retirement Mode.
* **Liquidity Bucket:** Emergency (Accumulation) / Retirement (Retirement).
* **Liquidity Priority:** Active bucket is always filled first.
* **Retirement Specs:** 3 years of expenses in INR Arbitrage + short USD Treasuries.
* **Buy Rule:** Forward water-filling into underweights only.
* **Sell Trigger:** Total positive drift across core assets > 10%.
* **Sell Execution:** Reverse water-filling across LTCG-eligible lots with trailing ceilings (10→5).
* **Tax Handling:** Reserve taxes before capital reuse.

## 12. Final Interpretation
Perpetual Rebalancing is a portfolio operating system consisting of four layers: a strategic multi-asset portfolio, a drift-aware buy engine, a drift-aware sell engine, and a lifecycle liquidity layer. It unifies rebalancing, tax-aware selling, emergency liquidity, and retirement withdrawals into a single coherent system.

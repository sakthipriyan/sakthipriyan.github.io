---
title: "The Perpetual Rebalancing Framework"
date: 2026-06-29
draft: false
type: "blogs"
wealth_tags:
  - Asset Allocation
  - Perpetual Rebalancing
  - Rebalancing
  - Retirement
summary: "A unified portfolio operating system that handles buying, selling, liquidity management, and withdrawals under one coherent rule set for both Accumulation and Retirement Phases."
js_tools:
  - echarts
  - d2
---

## 1. Introduction

The **Perpetual Rebalancing Framework** is a liquidity-aware, drift-aware, tax-aware and stateful portfolio **operating system** designed to support both phases of an investor's journey:

1. **Accumulation:** Building wealth through regular contributions.
2. **Retirement:** Funding expenses while preserving long-term portfolio stability.

The framework is built on **3 core principles**:

1. **Liquidity First**: Maintain sufficient liquidity for emergencies during accumulation and for regular expenditures during retirement.

2. **Risk Management**:
   - **Passive Drift Control:** Use portfolio cash flows to continuously reduce **portfolio drift** month on month.
   - **Active Drift Control:** Perform tax-aware **slow rebalancing** only when overall portfolio drift exceeds predefined thresholds.

3. **Tax Efficiency**: Minimize taxes by preferentially realizing Long-Term Capital Gains (LTCG) while keeping portfolio turnover low.

> The framework is designed for **global multi-asset portfolios**

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

### 3.1. Income

Income represents all cash inflows into the framework. During the **Accumulation Phase**, typically salary / business income is the primary source of deployable capital.

Various income sources across both phases include:
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


### 3.2. Liquidity Reserves

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

### 3.3. Core Portfolio

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
| **Smallcap 250** |       5.00% |       4.92% | **−0.08%** | Slightly Underweight |
| **Debt**         |       5.00% |       6.15% | **+1.15%** | Overweight          |
| **Gold**         |      10.00% |      10.78% | **+0.78%** | Overweight          |
| **Total**        | **100.00%** | **100.00%** | **+2.13%** |                     |

See: [State of the 1 Portfolio](/building-wealth/tags/state-of-the-1-portfolio/) or [State of the Portfolio](/building-wealth/tags/state-of-the-portfolio/) for more such data points.

This Example Portfolio has Total Positive Drift: **2.13%** and hence Total Negative Drift: **−2.13%**.  

> **Portfolio Drift = Total Positive Drift**
> 
> **Portfolio Drift** is essentially the representation of how much we have to **reinvest** in order to bring back the portfolio to its **Target Allocation**. (Excluding taxation/transaction cost).

**Managing the portfolio drift is the act of managing risk profile of the portfolio.** 

If portfolio drift is unmanaged, the risk profile will change considerably over time. That is where **Buy Engine** and **Sell Engine** contribute towards this process.
* **Buy Engine** is used to reduce underweights using fresh capital.
* **Sell Engine** is used to reduce excessive overweights when portfolio drift becomes unacceptable.

Both approaches are essentially optimizing the **portfolio drift** via sell/buy actions.

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
- During the **Retirement Phase**, the strategic asset allocation typically shifts toward defensive assets by reducing equity exposure and increasing allocations to Gold and Debt. This generally sacrifices long-term growth in exchange for lower volatility and greater portfolio stability. 

### 3.4. Buy Engine

> **The Buy Engine is responsible for deploying available capital into the Core Portfolio.**

Traditional approaches often rely on **calendar-based rebalancing** or **threshold-based rebalancing**, both of which typically require selling winners and can increase portfolio turnover and tax realization. 

**The Perpetual Rebalancing Framework** instead uses **cash-flow-based rebalancing** as its primary mechanism. Rather than selling winners, fresh capital is directed toward underweight assets using the **Forward Water-Filling algorithm**.

The **Buy Engine** operates only after all liquidity obligations have been satisfied. Active selling is reserved for the **Sell Engine**, which activates only when the aggregate portfolio drift exceeds predefined thresholds.

#### Forward Water-Filling

* Allocates fresh capital by first filling the most underweight asset.
* When its drift reaches that of the next most underweight asset, both assets are raised together at the same rate.
* As additional assets reach the common drift level, they join the allocation, and all participating assets continue to rise together until the available capital is exhausted.
* Every purchase increases the total portfolio value, changing the denominator used to compute drift for every asset. The algorithm automatically accounts for this denominator effect when solving for the final water level.
* As a result, some underweight assets may remain slightly more underweight even after receiving allocations, while overweight assets move closer to their target allocations without requiring any purchases.
* Underweight assets whose drift is already above the final water level receive no allocation, as they do not require additional capital under the optimal solution.

#### Example Portfolio

The following example illustrates how the Buy Engine deploys fresh capital into an existing portfolio.

During this monthly investment cycle, **2.11%** of the portfolio value is added as fresh capital. The **Buy Engine** allocates this capital using **Forward Water-Filling**.

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

The Buy Engine reduces aggregate portfolio drift from **2.13%** to **1.58%**, correcting **0.55%** of total drift. In other words, a monthly contribution equal to **2.11%** of the portfolio improves the overall drift by approximately **25%**, without selling a single asset.

```echarts
{
    "height": "700px",
    "title": { "text": "Drift Correction Impact", "left": "center" },
    "tooltip": { "trigger": "axis", "axisPointer": { "type": "shadow" } },
    "legend": { 
        "data": ["Pre Drift", "Post Drift", "Improvement", "Improvement (Evaporated)", "Worsening", "New Water Level"],
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
            "name": "New Water Level",
            "type": "line",
            "data": [],
            "itemStyle": { "color": "#1e40af" },
            "lineStyle": { "type": "dashed", "color": "#1e40af", "width": 2 },
            "markLine": {
                "symbol": "none",
                "silent": true,
                "label": { "show": false },
                "lineStyle": { "type": "dashed", "color": "#1e40af", "width": 2 },
                "data": [
                    { "yAxis": -0.39 }
                ]
            }
        },
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
}
```

#### Observations
* **Zero allocation to overweights** - As they are already overweight (Debt and Gold). Drift improved/moved towards 0 due to the denominator effect without requiring any sales.
* **Zero allocation to underweight assets above new water level.** Nifty 50 and Smallcap 250 are not allocated despite being underweight.  
* **Largest deficits receive the highest allocation.** Nasdaq 100 receives most of the fresh capital because it begins with the largest negative drift.
* **Allocations to underweights below the new water level.** Next 50 and Midcap 150 received allocations to reach the new water level. Interestingly Next 50 drift worsened after allocation due to denominator effect. 
* **The Buy Engine minimizes overall portfolio drift, not individual asset drift.** Some allocated assets may experience a slightly larger negative drift due to the denominator effect, but the aggregate portfolio drift is reduced.

> **The Buy Engine is allocation-driven, not performance-driven.** 

Its sole objective is to move the portfolio closer to its strategic allocation using fresh capital while avoiding unnecessary turnover and taxes.

#### Contrarian by Construction

The Buy Engine naturally follows a **value-oriented, contrarian investment philosophy**.

As asset prices diverge over time, the portfolio drifts away from its strategic allocation. Assets that have **underperformed** become underweight, while assets that have **outperformed** become overweight.

Rather than chasing recent winners, the Buy Engine systematically directs fresh capital toward the underweight assets. This results in:

* **Buying relatively cheaper assets** that have fallen below their target allocation.
* **Avoiding additional purchases** of assets that have recently outperformed.
* **Selling nothing** unless overall portfolio drift becomes excessive.

In effect, the framework follows the classic investment principle of:

> **Buy relatively low, avoid buying relatively high.**

Unlike traditional value investing, this approach does **not** rely on estimating intrinsic value, valuation multiples, or future returns. The investor's chosen **strategic asset allocation** acts as the reference point, and portfolio drift serves as the signal for where new capital should be deployed.

This makes the framework **systematically contrarian**—it continuously buys relative underperformers and naturally resists performance chasing, all without requiring market forecasts or subjective judgment.

#### Target-Weighted Capital Allocation

Forward Water-Filling optimizes for **portfolio-level drift reduction**, not equal treatment across asset classes.

As a result, larger strategic allocations naturally receive more capital than smaller satellite allocations because they contribute more to the portfolio's overall tracking error.

For example, in the illustrative portfolio:

| Asset          | Target Allocation | Pre-Drift | Post-Drift | Relative Tracking Error |
| -------------- | ----------------: | --------: | ---------: | ----------------------: |
| **Nasdaq 100** |               40% |    -1.25% | **-0.39%** |   **0.39 / 40 = 0.98%** |
| **Next 50**    |               10% |    -0.36% | **-0.39%** |   **0.39 / 10 = 3.90%** |

Although both assets end up with a similar **absolute drift** of **-0.39%**, the impact is very different:

* For **Nasdaq 100**, a **0.39%** drift represents only **0.98%** of its target allocation.
* For **Next 50**, the same **0.39%** drift represents **3.90%** of its target allocation.

Consequently, the Buy Engine allocates significantly more capital to **Nasdaq 100** than to **Next 50**. The objective is not to make every asset equally close to its target, but to produce the **largest reduction in overall portfolio drift for each unit of fresh capital invested**.

This produces two desirable properties:

* **Core allocations remain tightly aligned** with their strategic targets, resulting in lower tracking error for the largest portfolio positions.
* **Satellite allocations are allowed to drift more naturally**, avoiding the need to continuously inject small amounts of capital into relatively minor positions.

> **Forward Water-Filling minimizes portfolio-level tracking error, not per-asset drift.**

#### Policy Configurations
**The Buy Engine has no policy configurations. It simply executes the Forward Water-Filling algorithm.**

### 3.5. Sell Engine

> The **Sell Engine** actively controls portfolio drift when cash-flow-based rebalancing through the Buy Engine is no longer sufficient.

Traditional rebalancing approaches, such as **calendar-based** or **threshold-based** rebalancing, typically sell overweight assets and immediately buy underweight assets in a **single rebalance**. While simple, this approach interrupts long-term winners, increases portfolio turnover, and often realizes unnecessary taxable gains.

**The Perpetual Rebalancing Framework** takes a different approach. Rather than treating portfolio drift as a problem to eliminate, the framework treats sustained positive drift as evidence of persistent price momentum. Instead of continuously resetting the portfolio back to its target allocation, the Sell Engine intervenes only when portfolio drift exceeds a configurable threshold. Using the **Reverse Water-Filling** algorithm, it gradually reduces drift from **N%** toward **N/2%** over **M** review periods, allowing long-term winners to remain overweight while keeping portfolio risk within a controlled operating band.

> Capture momentum by harvesting gains only after meaningful outperformance.

During the early accumulation phase, fresh contributions are usually sufficient to rebalance the portfolio. As the portfolio grows and enters a flywheel stage—where market movements dominate the impact of monthly investments—the Sell Engine becomes increasingly necessary to control portfolio drift.


#### Reverse Water-Filling
- Reverse Water-Filling is the counterpart to Forward Water-Filling and is used by the Sell Engine to reduce portfolio drift when cash-flow-based rebalancing is no longer sufficient. 
- Rather than allocating fresh capital to underweight assets, it withdraws capital from overweight assets. 
- Selling begins with the most overweight asset. Once its drift falls to match the next most overweight asset, both assets are reduced together at the same rate. 
- As additional assets reach the common level, they join the process, causing all eligible assets to be reduced evenly until the required amount has been sold. 
- Since each sale also decreases the total portfolio value, the resulting denominator effect changes the drift of every asset. 
- Consequently, even assets that are sold may become slightly more overweight if their sale is insufficient to offset the reduction in the portfolio's total value, while underweight assets naturally move closer to their targets. 
- The algorithm automatically accounts for this denominator effect when determining the final water level.

#### Policy Configurations

| Configuration | Default | Description |
|--------------|:-------:|-------------|
| **Maximum Portfolio Drift (N)** | **10%** | Aggregate positive drift that activates the Sell Engine. |
| **Minimum Portfolio Drift (N/2)** | **5%** | Aggregate positive drift at which active selling stops. |
| **Sell Duration (M)** | **6 months** | Number of review periods over which drift is gradually reduced. |
| **Sell LTCG Lots Only** | **Enabled** | Restrict selling to Long-Term Capital Gain (LTCG) eligible lots to maximize tax efficiency. |

#### Example

Example configuration:

- **Maximum Drift:** 10%
- **Minimum Drift:** 5%
- **Sell Duration:** 6 monthly reviews

| Review | Active Drift Ceiling | Action |
|---------|---------------------:|--------|
| Before Trigger | ≤10% | No selling |
| Month 1 (Trigger) | 10% | Sell program begins |
| Month 2 | 9% | Continue if required |
| Month 3 | 8% | Continue if required |
| Month 4 | 7% | Continue if required |
| Month 5 | 6% | Continue if required |
| Month 6 | 5% | Stop selling |

The following chart illustrates a hypothetical scenario. It shows the portfolio drift over time, triggering the sell program, and how the **Active Drift Ceiling** steps down. Selling occurs only when the portfolio drift exceeds the active ceiling.

```echarts
{
    "height": "500px",
    "title": { "text": "Sell Engine: Active Drift Ceiling and Execution", "left": "center" },
    "tooltip": { "trigger": "axis" },
    "legend": { "data": ["Portfolio Drift", "Active Ceiling"], "bottom": 0 },
    "grid": { "left": "5%", "right": "5%", "bottom": "15%", "containLabel": true },
    "xAxis": {
        "type": "category",
        "boundaryGap": false,
        "data": ["M-3", "M-2", "M-1", "M1 (Trigger)", "M2", "M3", "M4", "M5", "M6 (Stop)", "M7", "M8"]
    },
    "yAxis": {
        "type": "value",
        "name": "Aggregate Positive Drift (%)",
        "min": 4,
        "max": 12,
        "axisLabel": { "formatter": "{value}%" }
    },
    "series": [
        {
            "name": "Active Ceiling",
            "type": "line",
            "step": "end",
            "data": [10, 10, 10, 10, 9, 8, 7, 6, 5, 10, 10],
            "itemStyle": { "color": "#ef4444" },
            "lineStyle": { "width": 2, "type": "dashed" },
            "markArea": {
                "itemStyle": { "color": "rgba(239, 68, 68, 0.05)" },
                "data": [
                    [
                        { "name": "Sell Program Active", "xAxis": "M1 (Trigger)" },
                        { "xAxis": "M6" }
                    ]
                ]
            }
        },
        {
            "name": "Portfolio Drift",
            "type": "line",
            "data": [6.0, 8.0, 9.5, 10.8, 9.5, 8.5, 6.5, 6.2, 4.8, 5.5, 6.0],
            "itemStyle": { "color": "#3b82f6" },
            "lineStyle": { "width": 3 },
            "symbol": "circle",
            "symbolSize": 8,
            "markPoint": {
                "symbol": "circle",
                "symbolSize": 1,
                "label": {
                    "show": true,
                    "position": "top",
                    "color": "#1e40af",
                    "fontWeight": "bold",
                    "formatter": "{b}",
                    "distance": 10
                },
                "data": [
                    { "name": "No Sell", "xAxis": "M-3", "yAxis": 6.0 },
                    { "name": "No Sell", "xAxis": "M-2", "yAxis": 8.0 },
                    { "name": "No Sell", "xAxis": "M-1", "yAxis": 9.5 },
                    { "name": "Sell", "xAxis": "M1 (Trigger)", "yAxis": 10.8 },
                    { "name": "Sell", "xAxis": "M2", "yAxis": 9.5 },
                    { "name": "Sell", "xAxis": "M3", "yAxis": 8.5 },
                    { "name": "No Sell", "xAxis": "M4", "yAxis": 6.5 },
                    { "name": "Sell", "xAxis": "M5", "yAxis": 6.2 },
                    { "name": "No Sell", "xAxis": "M6 (Stop)", "yAxis": 4.8 },
                    { "name": "No Sell", "xAxis": "M7", "yAxis": 5.5 },
                    { "name": "No Sell", "xAxis": "M8", "yAxis": 6.0 }
                ]
            }
        }
    ]
}
```

#### Execution Model

The framework follows a deterministic execution sequence that prioritizes **cash-flow-based rebalancing** before realizing capital gains. During the accumulation phase, regular contributions are the primary source of capital, while during the withdrawal phase, liquidity is typically generated through the Sell Engine.

> **Project → Sell Engine (Compute & Execute, if required) → Buy Engine (Execute)**

1. **Project:** Estimate the portfolio state after accounting for expected cash inflows, required withdrawals, taxes, and liquidity requirements.
2. **Evaluate:** Determine whether the projected aggregate positive drift exceeds the Active Drift Ceiling. If not, the Buy Engine alone performs the rebalancing.
3. **Sell Engine:** When required, compute the sales using Reverse Water-Filling to reach the active drift ceiling.
4. **Reserve:** Immediately reserve estimated taxes and replenish any required liquidity reserve. Only the remaining net proceeds become available for reinvestment.
5. **Buy Engine:** Execute a single Forward Water-Filling allocation using all deployable capital, including fresh contributions (if any) and the net sale proceeds. 

**Execution Constraints**

* Fresh contributions are available only during the accumulation phase; they may be absent during Retirement Phase.
* Only **LTCG-eligible lots** are sold when the configured policy restricts sales to long-term capital gains.
* The Sell and Buy Engines may interact iteratively until taxes, liquidity reserves, and the final water level converge.
* Taxes are estimated and reserved immediately upon sale.
* Liquidity requirements are satisfied before any capital is allocated to the Core Portfolio.
* Only the remaining **deployable capital** is invested through a single Forward Water-Filling allocation.

This execution model minimizes unnecessary buy-sell cycles, maintains required liquidity, improves tax efficiency, and ensures that fresh capital is fully utilized before realizing capital gains.

#### Tax Harvesting
Annual LTCG exemption harvesting and opportunistic tax-loss harvesting may provide incremental tax benefits. However, in globally diversified portfolios, the ₹1.25 lakh annual LTCG exemption typically applies only to the Indian equity allocation, limiting its overall impact. Tax-loss harvesting opportunities also become less frequent in long-term, buy-and-hold index investing, except for relatively recent purchases in newer low TER funds. Since both strategies introduce additional transaction complexity, record-keeping, and potential deviations from the optimal allocation, they are intentionally treated as optional optimizations rather than core components of the framework.

## 4. Summary
> Perpetual Rebalancing is a portfolio operating system consisting of four layers: a strategic global multi-asset portfolio, a drift-aware buy engine, a drift-aware sell engine, and a lifecycle liquidity layer. It unifies rebalancing, tax-aware selling, emergency liquidity, and retirement withdrawals into a single coherent system.

### 4.1 Traditional vs Perpetual Rebalancing

| Traditional Rebalancing | Perpetual Rebalancing |
|-------------------------|-----------------------|
| Static SIP month on month | Dynamic SIP based on market conditions |
| Reacts to every rebalance event | Activates selling only when drift becomes excessive |
| Resets portfolio back to target | Maintains an acceptable drift band |
| Frequently interrupts winners | Preserves long-term momentum |
| Large taxable rebalances | Small, gradual tax-aware realizations |
| Independent buy and sell transactions | Integrated Buy and Sell Engine |


### 4.2 The Buy Engine and Sell Engine have complementary objectives:

| Attribute               | **Buy Engine**                                                               | **Sell Engine**                                                              |
| ----------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **Primary Objective**   | Continuously steer portfolio drift toward **0%** using fresh capital.        | Gradually steer aggregate positive drift from **N%** toward **N/2%**.        |
| **Trigger**             | Deployable capital is available after satisfying all liquidity requirements. | Aggregate positive drift exceeds the configured threshold.                   |
| **Typical Operation**   | Executes every review cycle whenever fresh capital is available.             | Executes only when required to control excessive portfolio drift.            |
| **Allocation&nbsp;Strategy** | **Forward Water-Filling** allocates capital to underweight assets.           | **Reverse Water-Filling** trims overweight assets.                           |
| **Investment&nbsp;Analogy**  | Systematic **value investing**—buy relative weakness.                        | Systematic **momentum capture**—harvest sustained strength.                  |
| **Trading Bias**        | Buy-only.                                                                    | Sell-only.                                                                   |
| **Tax Impact**          | No capital gains realization.                                                | Realizes capital gains only when the configured drift threshold is exceeded. |

### 4.3 Why I Built This Framework

**The Perpetual Rebalancing Framework was originally built to solve my own long-term portfolio management problem.** Along the way, I discovered that almost every individual building block already existed. Strategic asset allocation, lifecycle investing, liquidity reserves, cash-flow-based rebalancing, tax-aware selling, and systematic withdrawals are all well-established concepts with decades of history.

The challenge was not inventing new investment strategies, but integrating these proven ideas into a single coherent, rules-based system that manages an investor's entire journey—from wealth accumulation through retirement. Instead of treating each problem independently, the framework unifies buying, selling, liquidity management, taxation, and withdrawals under one consistent set of principles.

In many ways, this project is an attempt to **democratize disciplined portfolio management** by expressing these established principles as a transparent, systematic, and reproducible framework that individual investors can understand, implement, and adapt to their own needs.

The framework is accompanied by practical reference implementations. 
- **[RealValue Portfolio](/building-wealth/tools/realvalue-portfolio/)** helps investors monitor portfolio drift, track asset allocation, and visualize the state of the framework. 
- **[RealValue Family SIP Engine](/building-wealth/tools/realvalue-family-sip-allocator/)** implements the Buy Engine, optimizing fresh capital allocation across multiple portfolios belonging to members of the same family. 

Together, these tools demonstrate how the framework can be applied in practice, with additional components planned as the project continues to evolve.


## 5. Future Work

**The Perpetual Rebalancing Framework** introduces several configurable policy parameters, including:

- Strategic asset allocation
- Maximum portfolio drift (N)
- Minimum portfolio drift (N/2)
- Sell duration (M)
- Liquidity reserve targets
- Tax policies

The interaction between these parameters influences portfolio turnover, realized taxes, tracking error, and long-term returns.

A comprehensive historical backtest is therefore required to evaluate:

- Long-term CAGR
- Portfolio volatility
- Maximum drawdown
- Portfolio turnover
- Realized tax liability
- Tracking error
- Liquidity utilization
- Sequence-of-returns resilience during retirement

The primary objective of the backtest is **not to optimize for the highest returns**, but to understand the trade-offs between tax efficiency, risk control, turnover, and portfolio stability under different market conditions.

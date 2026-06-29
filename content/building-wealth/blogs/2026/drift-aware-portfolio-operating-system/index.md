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
  - d2
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

Traditional approaches often rely on **calendar-based rebalancing** or **threshold-based rebalancing** , both of which typically require selling winners and can increase portfolio turnover and tax realization. 

**The Perpetual Rebalancing Framework** instead uses **cash-flow-based rebalancing** as its primary mechanism. Rather than selling winners, fresh capital is directed toward underweight assets using the Forward Water-Filling algorithm.

The **Buy Engine** operates only after all liquidity obligations have been satisfied. Active selling is reserved for the **Sell Engine**, which activates only when the aggregate portfolio drift exceeds predefined thresholds.

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

The Buy Engine reduces the aggregate portfolio drift from **2.13%** to **1.58%**, correcting **0.55%** of total drift. In other words, a monthly contribution equal to **2.11%** of the portfolio improves the overall drift by approximately **25%**, without selling a single asset.

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

* **Largest deficits receive the highest allocation.** Nasdaq 100 receives most of the fresh capital because it has the largest negative drift.
* **Only underweight assets receive capital.** Next 50 and Midcap 150 also receive allocations, while overweight assets receive none.
* **Overweights naturally normalize.** Debt and Gold become slightly closer to their target allocations simply because the total portfolio value increases.
* **No selling is required.** Since the aggregate positive drift (**2.13%**) is well below the Sell Engine threshold (**10%** by default), no assets are sold.
* **Allocation decisions ignore recent performance.** Although Gold has generated substantially higher returns than Debt, neither receives additional capital because both are already overweight. The framework responds only to portfolio drift, not recent performance.

> **The Buy Engine is allocation-driven, not performance-driven.** Its sole objective is to move the portfolio closer to its strategic allocation using fresh capital while avoiding unnecessary turnover and taxes.

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
Zero Policy Configurations for the Buy Engine. Just Execute the mathematical logic.

### 5. Sell Engine

The **Sell Engine** actively controls portfolio drift when cash-flow-based rebalancing through the Buy Engine is no longer sufficient.

Traditional rebalancing approaches, such as **calendar-based** or **threshold-based** rebalancing, typically sell overweight assets and immediately buy underweight assets in a single rebalance. While simple, this approach interrupts long-term winners, increases portfolio turnover, and often realizes unnecessary taxable gains.

The Perpetual Rebalancing Framework takes a different approach.

Instead of treating **portfolio drift as a problem to eliminate**, it treats drift as evidence of **positive price momentum**. The objective is therefore **not to eliminate drift**, but to keep it within an acceptable operating range.

To achieve this, the Sell Engine uses the **Reverse Water-Filling** algorithm to gradually harvest gains from overweight assets while allowing long-term winners to continue compounding.

Unlike the Buy Engine, the Sell Engine is **event-driven** and activates only when aggregate portfolio drift exceeds a configurable threshold.

The Buy Engine and Sell Engine have complementary objectives:

| Engine | Objective | Typical Operation |
|--------|-----------|-------------------|
| **Buy Engine** | Continuously steer portfolio drift toward **0%** using fresh capital. | Executes every review cycle whenever deployable capital is available. |
| **Sell Engine** | Gradually steer aggregate positive drift from **N%** toward **N/2%**. | Executes only when aggregate drift exceeds the configured threshold. |

#### Design Principles

The Sell Engine follows four principles:

1. **Activate only when necessary.**
   - Ignore normal portfolio drift.
   - Begin active selling only when aggregate positive drift exceeds **N%**.

2. **Reduce drift gradually.**
   - Spread selling over **M review periods** rather than performing a single rebalance.

3. **Maintain a drift band.**
   - Reduce portfolio drift from **N%** to **N/2%**.
   - Do not force the portfolio back to its target allocation.

4. **Preserve momentum.**
   - Allow winning assets to remain overweight as long as overall portfolio risk stays within the configured drift band.

#### Policy Configuration
| Configuration | Default | Description |
|--------------|:-------:|-------------|
| **Maximum Portfolio Drift (N)** | **10%** | Aggregate positive drift that activates the Sell Engine. |
| **Minimum Portfolio Drift (N/2)** | **5%** | Aggregate positive drift at which active selling stops. |
| **Sell Duration (M)** | **6 Months** | Number of review periods over which drift is gradually reduced. |
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

The following chart illustrates a hypothetical scenario. It shows the portfolio drift over time, triggering the sell program, and how the **Active Drift Ceiling** steps down. Notice how selling only occurs when the portfolio drift is *above* the active ceiling.

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
        "data": ["M-3", "M-2", "M-1", "M1 (Trigger)", "M2", "M3", "M4", "M5", "M6", "M7", "M8"]
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
                    { "name": "Triggered!", "xAxis": "M1 (Trigger)", "yAxis": 10.8 },
                    { "name": "Sell", "xAxis": "M2", "yAxis": 9.5 },
                    { "name": "Sell", "xAxis": "M3", "yAxis": 8.5 },
                    { "name": "No Sell", "xAxis": "M4", "yAxis": 6.5 },
                    { "name": "Sell", "xAxis": "M5", "yAxis": 6.2 },
                    { "name": "Done", "xAxis": "M6", "yAxis": 4.8 }
                ]
            }
        }
    ]
}
```

At each monthly review, selling occurs only if the current portfolio drift exceeds the active ceiling. If market movements or the Buy Engine have already reduced drift below the ceiling, no selling occurs during that review.

#### Execution Model

The system operates in a highly specific sequence to ensure that fresh capital performs as much rebalancing as possible before any assets are sold. A single, unified execution pattern governs the portfolio whether the sell program is active or inactive:

> **Sell Engine (Compute & Optionally Execute) → Buy Engine (Execute)**

1. **Sell Engine (Compute):** The Sell Engine receives the fresh cash flow amount. It calculates what the projected portfolio drift would be if that cash were deployed purely via Forward Water-Filling.
2. **Evaluation:** It compares this projected drift against the current Active Drift Ceiling (which defaults to $N\%$, or steps down during an active sell program).
3. **Sell Engine (Optionally Execute):** If the projected drift exceeds the active ceiling, the Sell Engine computes exactly what must be sold using Reverse Water-Filling (factoring in tax reserves) so that the post-repurchase drift matches the ceiling. It then executes those sell orders. If the projected drift is below the ceiling, this step is skipped.
4. **Buy Engine (Execute):** The Buy Engine combines the original fresh inflows with any net sale proceeds generated by the Sell Engine, and executes a single Forward Water-Filling allocation across the portfolio.

**Execution Constraints:**

- Only **LTCG-eligible lots** are considered for selling based on the policy.
- Taxes are estimated and reserved immediately upon sale.
- Only **net sale proceeds** (along with fresh cash) are pushed to the Buy Engine for reinvestment in a **single Forward Water-Filling allocation**.

This tight integration between the engines minimizes unnecessary buy-sell cycles, reduces transaction costs, and ensures maximum tax efficiency.

#### Traditional vs Perpetual Rebalancing

| Traditional Rebalancing | Perpetual Rebalancing |
|-------------------------|-----------------------|
| Reacts to every rebalance event | Activates only when drift becomes excessive |
| Resets portfolio back to target | Maintains an acceptable drift band |
| Frequently interrupts winners | Preserves long-term momentum |
| Large taxable rebalances | Small, gradual tax-aware realizations |
| Independent buy and sell transactions | Integrated Buy and Sell Engine |

> **The Sell Engine manages drift rather than eliminating it. By allowing winners to remain overweight and reducing drift only when necessary, the framework captures long-term momentum while keeping portfolio risk within a configurable operating band.**

## 4. Summary
**Perpetual Rebalancing is a portfolio operating system consisting of four layers: a strategic global multi-asset portfolio, a drift-aware buy engine, a drift-aware sell engine, and a lifecycle liquidity layer. It unifies rebalancing, tax-aware selling, emergency liquidity, and retirement withdrawals into a single coherent system.**

## 5. Future Work

The Perpetual Rebalancing Framework introduces several configurable policy parameters, including:

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

The objective of the backtest is **not to optimize for the highest returns**, but to understand the trade-offs between tax efficiency, risk control, turnover, and portfolio stability under different market conditions.

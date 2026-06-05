---
title: State of the 1 Portfolio — Returns, Allocation & Rebalancing (June 2026)
date: 2026-06-05
draft: false
type: "blogs"
wealth_tags:
  - "State of the 1 Portfolio"
  - "Asset Allocation"
  - "Rebalancing"

summary: "June 2026 edition of “State of the 1 Portfolio” report covering portfolio returns, asset allocation, drift, and system optimizations"
---
I am publishing two portfolio reports:

| Report                       | Frequency                | Purpose                                                                           |
| ---------------------------- | ---------------------- | --------------------------------------------------------------------------------- |
| **[State of the Portfolio](/building-wealth/tags/state-of-the-portfolio/)**   | Annual (April)         | Comprehensive yearly review of performance, allocation and strategy.              |
| **[State of the 1 Portfolio](/building-wealth/tags/state-of-the-1-portfolio/)** | Monthly (Except April) | Regular portfolio updates covering returns, allocation, learnings and improvements |

The **1 Portfolio** represents the core long-term wealth portfolio, excluding the Emergency and Travel funds.

## Portfolio Snapshot — June 2026

| Metric               | Value                           |
| -------------------- | ------------------------------- |
| Portfolio Strategy   | **Global Multi-Asset Passive** Investing using<br/> **Indian Mutual Funds** & **Irish ETFs**      |
| 1 Portfolio XIRR  | **21.73%**                      |
| Target Equity Allocation    | **85.00%**                        |
| Current Equity Allocation    | **81.43%**                        |
| Largest Market Values         | **Nasdaq 100 (40.14%)**, **Nifty 50 (19.09%)**         |
| Rebalancing Method   | **[Perpetual Rebalancing](/building-wealth/tags/perpetual-rebalancing/)** |
| International Broker | **[Interactive Brokers (IBKR)](https://www.interactivebrokers.co.in/en/home.php) (Tiered)**               |
| FX Optimization      | **[FX Retail](https://www.fxretail.co.in/) + [Bharat Connect Forex](https://www.bharat-connect.com/forex/)** via BHIM. <br/><small>Read [this post](/building-wealth/blogs/fx-retail-via-bharat-connect-private-bank-speed-at-public-bank-rates-a-live-transaction-walkthrough/) for more details.</small>  |

## 1 Portfolio — Performance & Drift

Following is the current state of the **1 Portfolio**.

| Asset Class      |       XIRR | Growth Share | Current Allocation <br/><small>(on June 5, 2026)</small> | Target Allocation <br/><small>(for TY 2026-27)</small> |                                   Drift |
| :--------------- | ---------: | -----------: | -------------------------------------------------------: | -----------------------------------------------------: | --------------------------------------: |
| **Nasdaq 100**   |     40.07% |       63.61% |                                                   40.07% |                                                 40.00% | <span style="color:green">+0.07%</span> |
| **Nifty 50**     |      2.14% |        2.55% |                                                   19.11% |                                                 20.00% |   <span style="color:red">-0.89%</span> |
| **Next 50**      |     26.20% |        2.57% |                                                    9.18% |                                                 10.00% |   <span style="color:red">-0.82%</span> |
| **Midcap 150**   |     24.54% |        2.48% |                                                    9.20% |                                                 10.00% |   <span style="color:red">-0.80%</span> |
| **Smallcap 250** |     43.24% |        1.87% |                                                    4.65% |                                                  5.00% |   <span style="color:red">-0.35%</span> |
| **Debt**         |      7.12% |        3.11% |                                                    5.92% |                                                  5.00% | <span style="color:green">+0.92%</span> |
| **Gold**         |     41.81% |       23.81% |                                                   11.87% |                                                 10.00% | <span style="color:green">+1.87%</span> |
| **Total**        | **21.67%** |  **100.00%** |                                              **100.00%** |                                            **100.00%** |                               **2.86%** |


- Growth Share represents the percentage contribution of each asset class to the portfolio’s total gains
- This snapshot is taken post monthly investment
- The portfolio is currently in the 8-figure INR range
- Next 50, Midcap 150, Smallcap 250 show higher XIRR because of recent [hard rebalancing](/building-wealth/slides/red-days-productive-days-portfolio-reset/).


> Used **[RealValue Portfolio](/building-wealth/tools/realvalue-portfolio/)** to tag goals/asset classes to derive the XIRR.  
> **Your data stays with you! All processing done in your browser!**


<div style="display: flex; gap: 20px; align-items: flex-start; flex-wrap: wrap;">
  
  <!-- First Image Container -->
  <div style="flex: 1; min-width: 300px;">
    <img src="1_Portfolio_Performance_2026-06-05.png" 
         alt="Portfolio Performance" 
         style="width: 100%; height: auto; border-radius: 8px; border: 1px solid #ddd; padding: 20px">
  </div>

  <!-- Second Image Container -->
  <div style="flex: 1; min-width: 300px;">
    <img src="1_Portfolio_Drift_2026-06-05.png" 
         alt="Portfolio Drift" 
         style="width: 100%; height: auto; border-radius: 8px; border: 1px solid #ddd; padding: 20px">
  </div>

</div>

### Key Performance Drivers

- **Concentrated Growth**: The Nasdaq 100 is the undisputed powerhouse of the portfolio. Nearly at target allocation now (+0.07% drift), it accounts for **63.61%** of the total growth share. Phenomenal growth in the past month. It appears [the allocator](/building-wealth/tools/realvalue-family-sip-allocator/) will stop directing new investments to it very soon.
- **Gold Outperformance**: Gold has significantly exceeded expectations with a **41.81% XIRR**, and still carries the largest positive drift in the portfolio (**+1.87%**).
- **Domestic Lag**: The Nifty 50 remains the primary laggard with an XIRR of only **2.14%**, contributing just **2.55%** to the overall growth share despite being the second-largest allocation. All four Indian equity indices (Nifty 50, Next 50, Midcap 150, and Smallcap 250) contributed just **9.47%** of total growth share compared to their current combined allocation of **42.14%**.

> In a globally diversified portfolio, performance leadership rotates continuously.
> The objective is not to predict the next winner, but to systematically rebalance capital toward undervalued assets.


My Strategy is to use **Perpetual Rebalancing** to do both **Value Buying** (buy assets with negative drift) and **Momentum Capturing** (dynamically sell over a period of 6 months to reduce overall drift from say 10% to 4%). I will write about this in detail later.

## Drift Correction aka Monthly Investment

The table below consolidates the current state, monthly investment allocation and the target allocation in one view:

| Asset Class      |     Current |                               Pre Drift |  New Invest |  Post Invest |                              Post Drift |      Target |
| :--------------- | ----------: | --------------------------------------: | ----------: | ----------: | --------------------------------------: | ----------: |
| **Nasdaq 100**   |      40.10% | <span style="color:green">+0.10%</span> |      12.44% |      39.40% |   <span style="color:red">-0.60%</span> |      40.00% |
| **Nifty 50**     |      17.89% |   <span style="color:red">-2.11%</span> |      77.44% |      19.40% |   <span style="color:red">-0.60%</span> |      20.00% |
| **Next 50**      |       9.47% |   <span style="color:red">-0.53%</span> |       6.59% |       9.40% |   <span style="color:red">-0.60%</span> |      10.00% |
| **Midcap 150**   |       9.55% |   <span style="color:red">-0.45%</span> |       3.54% |       9.40% |   <span style="color:red">-0.60%</span> |      10.00% |
| **Smallcap 250** |       4.76% |   <span style="color:red">-0.24%</span> |       0.00% |       4.64% |   <span style="color:red">-0.36%</span> |       5.00% |
| **Debt**         |       6.05% | <span style="color:green">+1.05%</span> |       0.00% |       5.89% | <span style="color:green">+0.89%</span> |       5.00% |
| **Gold**         |      12.18% | <span style="color:green">+2.18%</span> |       0.00% |      11.87% | <span style="color:green">+1.87%</span> |      10.00% |
| **Total**   | **100.00%** | **3.33%** | **100.00%** | **100.00%** |  **2.76%** | **100.00%** |


### Definitions
- **Asset Class**: Underlying asset class part of the 1 Portfolio
- **Current**: Actual market value
- **Pre Drift**: Current deviation from target (sum of positive values = total drift)
- **New Invest**: Percentage of next monthly investment directed to each asset class
- **Post Alloc**: Estimated market value after the investment
- **Post Drift**: Estimated drift after investment
- **Target**: Target allocation for the asset class
- **Total Drift**: Drift is calculated as the sum of positive deviations from target allocations

> Used the **[RealValue Family SIP Allocator](/building-wealth/tools/realvalue-family-sip-allocator/)** framework used for monthly allocation. \
> Allocations are directed exclusively to underweight assets and [evenly spread the drift](/building-wealth/blogs/perpetual-rebalancing-engineering-a-mathematically-superior-sip-allocator/).

<div style="display: flex; gap: 20px; align-items: flex-start; flex-wrap: wrap;">
  
  <!-- First Image Container -->
  <div style="flex: 1; min-width: 300px;">
    <img src="drift1.png" 
         alt="Portfolio Drift 1" 
         style="width: 100%; height: auto; border-radius: 8px; border: 1px solid #ddd; padding: 20px">
  </div>

  <!-- Second Image Container -->
  <div style="flex: 1; min-width: 300px;">
    <img src="drift2.png" 
         alt="Portfolio Drift 2" 
         style="width: 100%; height: auto; border-radius: 8px; border: 1px solid #ddd; padding: 20px">
  </div>

</div>

> New Allocation:	**2.25%**, Drift Correction:	**0.42%** (from **4.09%** to **3.67%**)


### Key Observations from this month's allocation
*   **Nasdaq 100 receives 53.79%** of the next investment — as the most underweight asset relative to its large 40% target, it remains the primary destination for fresh capital.
*  **Tiered Domestic Allocation** - Fresh funds are being funneled into Nifty 50 (25.76%), mid-tier equities (~9% each for Next 50 and Midcap 150) and smallcaps (2.27%) to ensure the entire equity sleeve moves upward in unison.
*   **Gold and Debt receive zero** — both assets are currently overweight. By directing no new funds here, their weightage naturally "drifts" down toward the target as the equity base grows.
*   **Total portfolio drift reduces** from 4.09% to 3.67% — a meaningful **0.42% correction** achieved solely through a single monthly cash flow, avoiding the tax impact of selling winners.


---

## Optimizing International Investment

**For International Investment, Forex Cost and Broker Cost will be a huge drag if not optimized.**

### Direct IBKR Account
For Broker Cost optimization, I set up a direct account with IBKR with tiered pricing.  
Earlier used an account created via ICICI Direct Global which was using a fixed pricing model.

#### Main differences are
1. Direct IBKR access gets full access to the IBKR environment including Desktop app
2. Tiered pricing minimum is ~$1.7 where as Fixed plan I was using earlier was minimum $4
3. There was a fixed ₹999/year plan I subscribed with ICICI Direct Global. With direct IBKR it is $0/year

#### Migration In Progress
* I was able to move the residual Cash from older account to the newer one seamlessly
* Positions are still in the old account but planning to move them to the new account as well
* Planning to buy this month allocation in the new account

### Forex Optimization
For international investments, the foreign exchange transaction cost on INR-to-USD conversion is a recurring drag that compounds over years of regular funding. Optimizing it matters.

| | Option 1 | Option 2 | Option 3 |
|:---|---:|---:|---:|
| Bank | **ICICI Bank** | **Bank of Baroda** | **ICICI Bank** |
| Channel | Direct Bank | FX Retail Web | FX Retail + Bharat Connect + BHIM
| Interbank Rate | ₹94.91/USD | ₹94.91/USD | ₹94.91/USD |
| Bank Rate | ₹96.54/USD | ₹95.01/USD | ₹95.11/USD |
| FX Spread | ₹1.63/USD | ₹0.10/USD | ₹0.20/USD |
| Processing Fee | ₹1,000 + GST | ₹1,250 + GST | ₹1,000 + GST |
| Effective Rate | ₹96.97/USD | ₹95.52/USD | ₹95.54/USD |
| **Transaction Cost %** | **2.17%** | **0.64%** | **0.66%** |
| Visual Reference | <img src="fx1.png" style="max-width:100%;"> | <img src="fx2.png" style="max-width:100%;"> | <img src="fx3.png" style="max-width:100%;"> |

- Computation based on 2 May 2026 mid-market rate from public sources (Google) and ICICI FX rate in Money2World. (FX Retail ones just added 10p/USD or 20p/USD as applicable). Computed using my actual allocation (6 figure INR).
- The higher the allocation, the lower the effective transaction cost
- Switching to [FX Retail](https://fxretail.co.in) with Bank of Baroda reduces the effective transaction cost from **2.17% to 0.64%** — a saving of ~1.53% per transfer. The key driver is BoB's exceptionally low FX spread of just ₹0.10/USD through FX Retail. 
- Interestingly, FX Retail via Bharat Connect (using apps such as BHIM) allows private banks to process forex transfers with only a ₹0.20/USD markup. **So we get the speed of private banks at the cost of public bank.**

> Used the **[RealValue FX Engine](/building-wealth/tools/realvalue-fx-engine/)** to find the true transaction cost and compare various rates.  
> Using to compute/track TCS for Form 122 (previously known as 12BAA Form) and to find the TCS opportunity cost.


---
## Key lessons for me
- Equity recovering improved overall market value of the 1 Portfolio
- Most importantly, drift came down to 4.09% even prior to new allocation
- Broker cost optimized for Global Investment
- Still optimizing the FX Cost with newer channels like FX Retail via Bharat Connect
- Speed of capital deployment is as important as Markup optimizations for Global Investment

### Forward Expectations | Guessing the Future Allocation
- I am anticipating that equity recovery/growth will continue for few months
- Nasdaq will swing up so fast that I will stop allocating to it this year sometime
- I will see Gold/Debt fund allocation by the system this year
- Nifty performance remains muted relative to global equities and may require policy catalysts to regain leadership
- Still not sure If I will hit 0% drift perfection this year!

## Transparency Note

> This portfolio reflects my personal investment strategy and risk tolerance. It is not investment advice.

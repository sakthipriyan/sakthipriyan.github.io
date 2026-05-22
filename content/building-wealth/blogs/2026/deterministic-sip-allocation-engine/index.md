---
title: "Perpetual Rebalancing: Engineering a Mathematically Superior SIP Allocator"
date: 2026-05-22
draft: false
type: "blogs"
wealth_tags:
  - SIP
  - Asset Allocation
  - Rebalancing
  - RealValue Engines

summary: "How I upgraded my *RealValue Family SIP Allocator* from a proportional cash-deficit allocation to a drift-equalization engine and why it reduced structural portfolio variance by 66%."
---

The way average retail investors execute their monthly investments is fundamentally "dumb". 
They set up a static SIP (I was there!) — a fixed amount into each fund — and let it run. 
The AMCs execute it blindly, completely ignoring the fact that the actual portfolio is drifting from its target risk profile.
Eventually doing a calendar based or threshold based rebalancing and paying tax and timing risk.

Earlier published [Perpetual Rebalancing: A Practical Framework for Long-Term Wealth](/building-wealth/blogs/perpetual-rebalancing-a-practical-framework-for-long-term-wealth/).   
I mentioned **"Allocate fresh investments proportionally to underweight assets"** under *1. Drift-Proportional Buying (Monthly, No Selling)* section.




When I built the first version of the **RealValue Family SIP Allocator**, I wanted to fix this. I built a dynamic engine that calculated the exact cash deficit of every asset in my family's portfolio and allocated our monthly capital proportionally to fill those holes.

It worked. But as the portfolio scaled, I realized it had a structural flaw. It was leaving "drift debt" on the table, introducing uncompensated variance, and failing to fully capture the mathematical alpha of rebalancing.

So I tore it down and rebuilt it.

This post documents that evolution — from a reactive "Cash-Deficit" script to an institutional-grade "Even-Drift Equalization" engine — and why it dropped my portfolio's structural drift variance by over **66%**.

## The Setup: A Constrained Family Portfolio

Before diving into the engine, it helps to understand the real-world constraints I was working within.

My family's portfolio has a fixed target allocation across seven asset classes:

| Asset Class  | Target |
| ------------ | -----: |
| Nasdaq 100   |    40% |
| Nifty 50     |    20% |
| Next 50      |    10% |
| Midcap 150   |    10% |
| Smallcap 250 |     5% |
| Gold         |    10% |
| Debt         |     5% |

The monthly SIP is split across two investors: one with international access (Nasdaq 100 eligible) and one without, due to TCS and remittance constraints. This is a hard constraint the engine must respect — it is not just a preference.

---

## V1: The Cash Deficit Model

The original engine used a simple approach:

1. Compute the target rupee value for every asset based on the new total portfolio size (current + new SIP).
2. Calculate the **cash deficit** for each underweight asset.
3. Allocate the SIP proportionally to those deficits.
4. Skip overweight assets entirely.

This feels intuitive. An asset that is "missing" more money should receive more capital. And it does work — in the short term.

---

## The Problem I Observed

One month I noticed something strange. Even after deploying the SIP, some assets moved toward their target while others drifted *further away*.

**Pre-allocation state (real data, May 2026):**

| Asset Class  | Target | Actual  |    Drift |
| ------------ | -----: | ------: | -------: |
| Nasdaq 100   |    40% |  39.79% |  −0.21% |
| Nifty 50     |    20% |  17.99% |  −2.01% |
| Next 50      |    10% |   9.29% |  −0.71% |
| Midcap 150   |    10% |   9.53% |  −0.47% |
| Smallcap 250 |     5% |   4.75% |  −0.25% |
| Debt         |     5% |   6.11% |  +1.11% |
| Gold         |    10% |  12.54% |  +2.54% |

The V1 engine identified Nifty 50's massive −2.01% drift and gave it the largest allocation (43% of the SIP). But when I looked at the *post-allocation* drift:

**V1 Post-allocation drift:**

| Asset Class  | % of SIP |  Post-Drift |
| ------------ | -------: | ----------: |
| Nasdaq 100   |   21.25% |     −0.68% |
| Nifty 50     |   43.13% |     −1.38% |
| Next 50      |   16.88% |     −0.52% |
| Midcap 150   |   12.50% |     −0.40% |
| Smallcap 250 |    6.25% |     −0.21% |
| Debt         |    0.00% |     +0.96% |
| Gold         |    0.00% |     +2.23% |

Nifty 50 received 43% of the capital and *still* ended up at −1.38%. The allocator was plugging holes, not solving the system.

The drift was **scattered** — ranging from −0.21% to −1.38% across the equity universe. Standard deviation across the five equity assets: **0.45%**.

At first this looked like a bug. It wasn't.

---

## The Hidden System Dynamic

The issue was structural. The engine was solving local cash deficits but ignoring global portfolio expansion.

When the portfolio grows by the SIP amount, the *target* values for every asset also grow — proportionally to their allocation weight.

```
For every ₹100 added to the portfolio,
Nasdaq 100's target value increases by ₹40.
Nifty 50's target value increases by ₹20.
```

This means every asset is simultaneously "running uphill." An asset at 40% weight faces four times the target expansion of an asset at 10% weight. The cash-deficit model completely ignores this dynamic. It only looks at the *current* gap, not the gap that will exist *after* the portfolio grows.

This creates what I call **Drift Debt** — unresolved imbalance that silently compounds into future allocation pressure, month after month.

---

## The Realization

The portfolio was not a collection of independent assets. It was a **constrained dynamic system**.

Instead of asking:

> "Which asset needs the most cash?"

the right question is:

> "What is the tightest achievable equilibrium state the entire system can be forced into?"

That leads to a completely different formulation.

---

## V2: Even-Drift Equalization

The upgraded engine uses **Tracking Error Minimization** — the same principle behind institutional cash-flow rebalancing and direct indexing platforms. The idea: minimize the *variance* of post-allocation drifts across the portfolio.

### The Core Insight: Drifts Must Sum to Zero

In a fully-invested portfolio (100% allocated), the sum of all drifts is always exactly zero. Positive drift in overweight assets must be perfectly offset by negative drift in underweight assets.

This is not an approximation — it is a mathematical identity.

**In our portfolio, Gold and Debt are overweight:**

| Asset | Post-Drift (locked) |
| ----- | ------------------: |
| Gold  |              +2.23% |
| Debt  |              +0.96% |
| Total |              +3.19% |

Since these assets receive zero new allocation (they're already overweight), their post-drift is determined purely by how much the portfolio grows around them. And since total drift must sum to zero, the remaining equity assets must collectively absorb **−3.19%** of drift.

### The Iterative Algorithm

The engine finds the optimal equilibrium in up to N+2 iterations:

1. **Seed the fixed set.** Mark all individually overweight assets, and all assets in overweight groups (e.g., Debt + Gold exceed their "Defense" group cap), as fixed at 0 allocation.

2. **Compute locked drift.** For each fixed asset:
   `locked drift = currentValue / newPortfolioTotal − targetPercent`

3. **Derive remaining drift budget.**
   `remaining budget = −(sum of locked drifts)`

4. **Calculate target drift.** Divide the remaining budget equally across all solvable assets:
   `target drift = remaining budget / N`

5. **Constraint check.** For each solvable asset, compute the required allocation:
   `required = (targetPercent + targetDrift) × newTotal − currentValue`
   If any required allocation is *negative* (would require selling), move that asset to the fixed set and restart from Step 2.

6. **Converge.** Stop when all solvable assets require positive allocations.

### Iteration 1 (this portfolio):

- **Fixed:** Debt (+1.11% locked drift), Gold (+2.54% locked drift)
- **Locked drift sum:** +3.19% (roughly — exact post-SIP values used)
- **Remaining budget:** −3.19%
- **N = 5** (Nasdaq, Nifty, Next 50, Midcap, Smallcap)
- **Target drift:** −3.19% ÷ 5 = **−0.638%**
- **Constraint check:** Smallcap 250 (at −0.25%) would need a *negative* allocation to reach −0.638%. → Move to fixed set, restart.

### Iteration 2:

- **Fixed:** Debt, Gold, Smallcap 250 (locked at its natural post-SIP drift of ≈ −0.37%)
- **New locked drift sum:** +2.82%
- **Remaining budget:** −2.82%
- **N = 4** (Nasdaq, Nifty, Next 50, Midcap)
- **Target drift:** −2.82% ÷ 4 = **−0.705%**
- **Constraint check:** All four assets require positive allocations. ✓ **Converged.**

The engine then computes the precise allocation for each asset to hit −0.705% post-drift simultaneously.

---

## The Results

**V2 Post-allocation drift (same ₹8L SIP, same portfolio):**

| Asset Class  | % of SIP |  Post-Drift |
| ------------ | -------: | ----------: |
| Nasdaq 100   |   20.00% |     −0.71% |
| Nifty 50     |   70.00% |     −0.71% |
| Next 50      |   10.00% |     −0.69% |
| Midcap 150   |    0.00% |     −0.71% |
| Smallcap 250 |    0.00% |     −0.37% |
| Debt         |    0.00% |     +0.96% |
| Gold         |    0.00% |     +2.23% |

**Drift variance comparison (equity universe):**

| Metric               | V1 (Cash Deficit) | V2 (Even-Drift) | Improvement |
| -------------------- | ----------------: | --------------: | ----------: |
| Std deviation        |            0.448% |          0.150% |       −66% |
| Spread (max − min)   |            1.167% |          0.343% |       −71% |
| Convergence set spread |        —        |          0.018% |           — |

The four assets in the convergence set (Nasdaq, Nifty, Next 50, Midcap) achieved a post-drift spread of just **0.018%** — essentially simultaneous equilibrium.

Note what the engine did: it aggressively funneled **70% of the SIP into Nifty 50** — the asset dragging the system's standard deviation the most — while intentionally giving zero to Midcap and Smallcap, because giving them capital would *worsen* the overall system variance. This is counterintuitive if you think in cash terms. It is mathematically obvious if you think in drift terms.

---

## Why This Matters

### Variance Drag Elimination

Uncompensated tracking error is a silent tax on long-term compound growth. A portfolio that continuously runs at −1.38% in one asset and −0.21% in another is structurally inefficient. That asymmetry means the portfolio is not capturing the rebalancing premium it theoretically should.

### The Rebalancing Premium (Shannon's Demon)

The even-drift engine mechanically guarantees that you are buying the *cheapest relative asset at maximum volume* every single month. This is not market timing — it is **geometrically optimal cash-flow deployment**. Shannon's Demon shows that rebalancing a volatile portfolio generates a return bonus above the weighted average of components. The V2 engine extracts this premium at maximum efficiency.

### Deterministic, Explainable Outcomes

The V1 engine produced different results depending on which assets happened to be most underweight that month. The V2 engine produces a mathematically predictable outcome. Given the same portfolio state, the same SIP will always produce the same result. This matters for systematic investors who want to understand — and verify — their own system.

### No Drift Debt

The V1 engine carried residual imbalance forward every month. Nifty at −1.38% is not just an aesthetic problem — it is structural vulnerability that compounds. V2 forces the maximum achievable correction in a single pass.

---

## What This Is NOT

This is not:

* market prediction or timing,
* AI or machine learning,
* alpha forecasting,
* tactical or dynamic asset allocation.

It is **control systems engineering** applied to a financial portfolio. The goal is not predicting returns — it is maintaining portfolio integrity with every rupee deployed.

Think of it as the difference between a thermostat that turns the heater on when it feels cold (V1) versus one that continuously adjusts the heat output to minimize temperature deviation from setpoint across all rooms simultaneously (V2).

---

## Investor Constraints Are First-Class Citizens

One often-overlooked aspect of real family portfolios: **not all capital is fungible**.

In this portfolio, one investor cannot access international assets due to TCS regulations. The engine handles this as a hard constraint during investor-level capital distribution — after the asset-level drift equalization is complete. The same framework works with slab-rate investors, TCS-applicable accounts, and multi-member SIPs.

---

## Try It

The updated algorithm is live in the [RealValue Family SIP Allocator](/building-wealth/tools/realvalue-family-sip-allocator/).

Import your portfolio, set your monthly SIP amounts, and look at the Post Allocation Drift column in the Allocation Report table. The convergence-set assets will show nearly identical drift values — proof that the engine found the equilibrium point.

---

## Final Thoughts

I originally thought I was building a SIP calculator. What emerged instead was a constrained equilibrium engine for continuous portfolio maintenance.

The surprising part is that the complexity did not come from overengineering. It emerged naturally from observing real system failures:

* drift worsening after buying,
* unstable month-to-month allocation patterns,
* unresolved structural imbalance compounding silently.

Most retail investing tools think in terms of **cash flow**. Very few think in terms of **portfolio geometry**. That distinction fundamentally changes allocator behavior.

Good engineering often looks like this — local heuristics break, system constraints become visible, equilibrium models emerge.

If you are serious about passive investing, you cannot rely on "dumb" static SIPs. Wealth generation is a systems engineering problem. The tighter your logic, the fewer leaks in your compounding.

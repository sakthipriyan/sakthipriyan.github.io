---
title: "RealValue Family SIP Allocator"
date: "2026-02-15"
draft: "false"
description: "Smart portfolio rebalancing for families: allocates monthly SIPs across multiple investors, handles international assets with TCS, optimizes debt for lower tax slabs, and corrects drift proportionally."
type: "tools"
tool_type: "multiAssetAllocator"
tool_script: "js/realvalue-family-sip-allocator.js"
tool_dependencies:
  - echarts
summary: "A smart cashflow rebalancing engine that minimizes allocation drift across investors, with built-in tax-slab optimization and automated international TCS handling."
wealth_tags:
  - Asset Allocation
  - Rebalancing
  - Portfolio Management
---

## Overview

Intelligently rebalance your portfolio by allocating new investments to underweight assets. Handles multiple investors, international assets with TCS, tax slab optimization, and asset group constraints—all without selling existing holdings.

### Key Features

| Feature | Description |
|---------|-------------|
| **Tax-Efficient** | Rebalancing via new investments only (no selling) |
| **Multi-Investor** | Different amounts and constraints per investor |
| **Slab Assets** | User-controlled priority via drag-and-drop |
| **International TCS** | Automatic calculation and tracking |
| **Asset Groups** | Enforce max limits for related assets |
| **Transaction Minimization** | Prefers single-investor allocations |
| **Deterministic Algorithm** | Consistent, repeatable results with priority-based allocation |
| **Visual Analytics** | Charts for reviewing pre/post allocation and drift analysis |

### Algorithm

The allocation engine works in two distinct phases to ensure optimal rebalancing:

**Phase 1: Determine Asset Needs**

First, the tool calculates how much should be invested in each asset class:

1. **Calculate Target Values**: For each asset, determine what its value should be based on your target percentage of the total portfolio
2. **Identify Gaps**: Compare target value against current holdings to find underweight assets (negative drift)
3. **Prioritize Underweight Assets**: Only assets below target receive new allocations
4. **Account for TCS**: For international assets where TCS applies, budget 20% extra (1.2× multiplier) since that money goes to tax collection

At this stage, the tool knows exactly how much each asset needs, but hasn't decided which investor buys what.

**Phase 2: Assign Investments to Investors**

Now the tool distributes these asset needs across your investors using different strategies:

**For Slab Rate Assets (e.g., Debt)**:
- Uses bottom-to-top investor order from your table
- Last investor gets first priority, second-last gets next priority, and so on
- You control this by dragging investors in the table
- Useful for tax optimization—put lower tax slab investors at the bottom

**For Regular Assets**:
- Prefers investors without international access first (since they're constrained)
- Then prefers investors with smaller remaining capacity (to free them up)
- Uses transaction minimization: if one investor can cover 80%+ of an asset's need, gives them 100%
- Otherwise, distributes proportionally across available investors

**Throughout Both Phases**:
- Enforces asset group limits (e.g., max 30% in defensive assets)
- Respects international access restrictions
- Applies rounding to keep amounts manageable
- Handles TCS calculations automatically for eligible investors

The result is a deterministic allocation that rebalances your portfolio efficiently while respecting all constraints and minimizing transaction costs.

### Rebalancing Explained
Earlier, part of this video explained in detail (without multi investor & TCS complexities)

{{< youtube id="mIHc2yV7nU0" start="456" >}}


<br/>


---

## FAQ

**What are slab rate assets?**  
Tax-sensitive assets (e.g., debt) allocated by investor position (bottom-to-top). Drag to reorder for priority control.


**What makes this deterministic?**  
Strict priority order ensures identical results for identical inputs.

**How does transaction minimization work?**  
When allocating non-slab assets, if a single investor has capacity to take ≥80% of an asset's allocation need, the tool assigns 100% to that investor instead of splitting across multiple investors. This reduces the total number of buy transactions, saving on transaction costs and simplifying execution.

**How is TCS calculated?**  
Budgets 1.2× (investment + 20% TCS), rounds total outflow, back-calculates investment.

**What are asset groups for?**  
Set limits across related assets (e.g., total equity max 80%).

**Can I save my configuration?**  
Yes. Export as JSON, import next month.

---

## Usage Guide

### Inputs

**Investors**
- Name, Amount, International access, TCS applicability
- Drag to reorder (controls slab asset priority)

**Asset Classes**
- Name, Target %, Current value, Slab rate flag, International flag
- Targets must sum to 100%

**Asset Groups** (Optional)
- Group name, included assets, min/max % limits

**Round Off**
- Allocation rounding value (e.g., ₹5K = multiples of ₹5,000)
- For TCS investors, total outflow (investment + TCS) is rounded

### Outputs

**Summary Metrics**
- Percentages of New Allocation, Drift Correction, TCS Drag

**Allocation Matrix**
- Investment per investor per asset
- Net Total (investments) and Gross Total (with TCS)

**Charts/Table**
- Portfolio Allocation: Pre/Post vs Target
- Drift Analysis: Pre/Post drift per asset
- Toggle percentage/amount view

### Tips

1. Update current values before each period
2. Drag investors to control slab asset priority
3. Export configuration for reuse
4. Check drift correction to verify rebalancing impact
5. Use asset groups for defensive assets (debt/gold)

---

> **Note**: This tool implements a sophisticated methodology. Adjust based on your goals, risk tolerance, and market conditions.

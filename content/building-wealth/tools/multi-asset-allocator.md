---
title: "Multi Asset Allocator"
date: "2026-02-08"
draft: "false"
description: "Allocate investments across multiple assets based on target allocation, current portfolio, and investor constraints with smart rebalancing."
type: "tools"
tool_type: "multiAssetAllocator"
tool_script: "js/multi-asset-allocator.js"
tool_dependencies:
  - echarts
summary: "Deterministic portfolio rebalancing tool that allocates new investments to minimize drift from target allocation across multiple investors with different constraints."
wealth_tags:
  - Asset Allocation
  - Rebalancing
  - Portfolio Management
---

## About Multi Asset Allocator

> **Multi Asset Allocator** helps you **rebalance your portfolio intelligently** by allocating new investments to underweight assets using a deterministic algorithm that respects investor constraints and minimizes transactions.

The **Multi Asset Allocator** implements a sophisticated asset-centric allocation strategy that maintains your target asset allocation without selling any holdings. It handles complex scenarios including multiple investors, tax slab constraints, international assets with TCS, and asset group limits.

### Key Features

- **Deterministic Algorithm**: Asset-centric allocation with priority-based investor selection
- **Multi-Investor Support**: Handle different investment amounts and constraints per investor
- **Tax-Efficient**: No selling required — rebalancing via new investments only
- **Slab Rate Assets**: Priority allocation to investors in specific tax slabs
- **International Assets**: Automatic TCS calculation and tracking
- **Asset Groups**: Set minimum/maximum allocation limits for asset groups
- **Transaction Minimization**: Reduces number of transactions by preferring single-investor allocations
- **Visual Analytics**: Dual charts showing portfolio allocation and drift analysis
- **Comprehensive Summary**: Quick metrics including transaction count, drift correction, and TCS drag

### How It Works

1. **Define Investors**: Set investment amounts, international access, and TCS applicability
2. **Configure Assets**: Set target percentages, current values, slab rates, and international flags
3. **Set Asset Groups** (Optional): Define min/max allocation limits for related assets
4. **Calculate Allocation**: The deterministic algorithm allocates investments optimally
5. **Review Results**: See summary metrics, allocation matrix, and visual charts

### The Allocation Algorithm

The tool uses a **two-phase deterministic allocation engine**:

**Phase 1: Asset Allocation Calculation**
- Calculate deviation for each asset: `(Target % × Portfolio Value) - Current Value`
- Account for TCS budget (1.2× multiplier for international assets)
- Compute exact allocation per asset based on deviation

**Phase 2: Investor Assignment**
- **Priority Order**: Slab assets → Non-international investors → Lower tax → Smaller capacity
- **Slab Assets**: Column-first greedy allocation ensuring slab-constrained investors get priority
- **Non-Slab Assets**: Transaction minimization (80% threshold for single-investor allocation)
- **Constraints**: Respect asset groups, international access, and rounding requirements

This approach:
- ✅ Produces deterministic, repeatable results
- ✅ Minimizes number of buy transactions
- ✅ Respects all investor and asset constraints
- ✅ Automatically handles TCS for international investments
- ✅ Maintains target allocation over time

### Learn More

For detailed explanation of the methodology, check out: [My Asset Allocation & Rebalancing](/building-wealth/slides/2025/asset-allocation/)

---

## Frequently Asked Questions (FAQs)

### What makes this allocation "deterministic"?

The algorithm follows a strict priority order and always produces the same allocation for the same inputs. This ensures consistency and predictability in your rebalancing strategy.

### What are slab rate assets?

Assets marked with slab rate are allocated preferentially to investors in specific tax brackets. For example, debt assets might be better suited for investors in lower tax slabs to minimize tax impact.

### How does transaction minimization work?

When an asset's allocation can be satisfied by a single investor (≥80% of their capacity), the tool allocates the entire amount to that investor, reducing the number of transactions and associated costs.

### What if all assets are overweight?

If all assets are above target (rare), the tool will show zero allocations. In this case, you could either skip investing this month or manually invest in the least overweight asset.

### How is TCS calculated for international investments?

When an investor has TCS enabled:
- The tool budgets 1.2× the allocation amount (investment + 20% TCS)
- Total outflow is rounded to the nearest round-off value
- Investment amount is back-calculated: Total ÷ 1.2
- TCS = Total - Investment

### What are asset groups useful for?

Asset groups let you set allocation limits across related assets. For example, you might want equity (Nifty 50 + Nasdaq 100) to stay between 60-80% total, even if individual assets drift.

### Can I save my portfolio configuration?

Yes! Use the "Export Data" button to save your configuration as JSON. Import it next month to quickly load your settings and only update current values.

---

## Help

### Input Section

#### Investors
- **Name**: Investor's name for identification
- **Amount**: Investment amount available this period
- **International**: Check if this investor can invest in international assets
- **TCS**: Applicable if international investment is subject to Tax Collected at Source (20%)
- **Drag to reorder**: Change investor priority by dragging rows

#### Round Off
- Set the rounding value for allocation amounts
- Example: If set to ₹5,000, all allocations will be multiples of ₹5,000
- For TCS-enabled investors, total outflow (investment + TCS) will be rounded
- Higher values = fewer transactions, Lower values = more precise allocation

#### Asset Classes
- **Asset Class**: Name of the asset (e.g., Nifty 50, Nasdaq 100, Gold)
- **Target (%)**: Your desired allocation percentage for this asset
- **Current (Rs)**: Current portfolio value in this asset
- **Slab Rate**: Check if this asset should prioritize investors in specific tax slabs
- **International**: Mark for international assets (like Nasdaq 100)
- **Drag to reorder**: Change asset display order by dragging rows

#### Asset Groups (Optional)
- **Group Name**: Descriptive name for the group (e.g., "Equity", "Debt")
- **Assets**: Select related assets to include in the group
- **Min %**: Minimum allocation percentage for the group (optional)
- **Max %**: Maximum allocation percentage for the group (optional)

### Output Section

#### Summary
Quick overview of the allocation:
- **Buy Transactions**: Number of asset purchases across all investors
- **New Allocation**: Percentage of current portfolio being invested
- **Drift Correction**: Reduction in total absolute drift (Pre - Post)
- **TCS Drag**: TCS amount as percentage of total outflow (only if TCS applicable)

#### Allocation Results
Matrix table showing:
- Rows: Asset classes
- Columns: Investors
- Values: Allocation amount per investor per asset
- **Net Total**: Total investment amounts (excluding TCS)
- **TCS rows**: TCS amounts for international assets (if applicable)
- **Gross Total**: Total outflow including TCS (if applicable)

#### Portfolio Summary Report
Toggle between:

**Chart View**:
- **Portfolio Allocation**: Grouped bars showing Pre/Post allocation vs Target (percentage mode only shows Target)
- **Drift Analysis**: Horizontal bars showing Pre/Post drift for each asset

**Table View**:
- **Pre Allocation**: Target value, Current value, Actual %, Drift %
- **Allocation**: New investment amount and percentage
- **Post Allocation**: Target value, Post value, Actual %, Drift %
- Toggle between Percentage and Amount views

### Tips for Using the Tool

1. **Update Regularly**: Run allocation before each investment period
2. **Maintain Targets**: Ensure target percentages sum to 100%
3. **Review Summary**: Check drift correction to see rebalancing impact
4. **Use Asset Groups**: Set limits for related assets to maintain broader allocation bands
5. **Order Matters**: Drag to reorder investors/assets to influence allocation priority
6. **Export Data**: Save your configuration for next month
7. **Check Charts**: Visual analysis helps quickly identify over/underweight assets
8. **TCS Planning**: Factor in TCS drag when planning international investments

### Example Use Case

**Portfolio**: ₹12.5L with 40% target in Nifty 50 (currently ₹3L = 24%), 30% target in Nasdaq 100 (currently ₹6L = 48%), 20% in Midcap (₹2.5L = 20%), 10% in Gold (₹1L = 8%)

**Investors**: 
- Sakthi: ₹5,35,000 (International + TCS enabled)
- Indira: ₹85,000 (Non-international)

**Smart Allocation**: 
- Nasdaq is overweight (+18%) → ₹3,04,167 to reduce drift (Sakthi only)
- Nifty is underweight (-16%) → ₹45,000 (Sakthi)
- Midcap is on target → ₹2,10,000 split between both (₹1,25,000 Sakthi + ₹85,000 Indira)
- Gold is underweight (-2%) → ₹0 (smaller deviation, not prioritized)

**Result**: 
- 5 buy transactions
- Drift correction: 14.27% → 12.88% (1.39% improvement)
- TCS drag: 10.13% (due to international investments)

---

## Technical Details

### Allocation Algorithm

**Phase 1: Asset Allocation**
```
For each asset:
  targetValue = (targetPercent / 100) × postTotal
  deviation = targetValue - currentValue
  
  If asset is international and has TCS:
    allocate from TCS budget (1.2× multiplier)
  
  allocation = max(0, deviation)
```

**Phase 2: Investor Assignment**
```
Priority order:
  1. Slab assets first (column-first greedy)
  2. Non-slab assets (transaction minimization)
  
For each asset:
  Sort investors by:
    - Non-international first (for non-intl assets)
    - Lower max capacity
    - UI order
  
  If single investor can take ≥80%:
    Assign entire amount to that investor
  Else:
    Distribute across investors proportionally
```

### Constraints Handled

1. **Asset Groups**: Min/max allocation limits enforced
2. **Slab Rates**: Priority allocation to appropriate investors
3. **International Access**: Only eligible investors can buy international assets
4. **TCS Calculation**: Automatic 20% TCS for applicable investors
5. **Rounding**: Total outflow (investment + TCS) rounded to round-off value
6. **Single Asset Per Group**: Each asset can only belong to one group
7. **Transaction Minimization**: Prefer single-investor allocations when possible

---

> **Remember**: Asset allocation is personal. This tool implements a sophisticated methodology, but adjust based on your comfort, goals, risk tolerance, and market conditions.


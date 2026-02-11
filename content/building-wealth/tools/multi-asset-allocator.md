---
title: "Multi Asset Allocator"
date: "2026-02-08"
draft: "false"
description: "Allocate monthly investments across multiple assets based on target allocation and current portfolio."
type: "tools"
tool_type: "multiAssetAllocator"
tool_script: "js/multi-asset-allocator.js"
tool_dependencies:
  - echarts
summary: "Smart rebalancing tool that allocates new investments to underweight assets based on deviation from target allocation."
wealth_tags:
  - Asset Allocation
  - Rebalancing
  - Portfolio Management
---

## About Multi Asset Allocator

> **Multi Asset Allocator** helps you **rebalance your portfolio dynamically** by allocating new monthly investments to underweight assets based on deviation from target allocation.

The **Multi Asset Allocator** implements a cash-flow based rebalancing strategy that maintains your target asset allocation without selling any holdings. Instead of static SIPs into each asset, it intelligently directs new money only to underweight assets proportional to their deviation.

### Key Features

- **Smart Rebalancing**: Automatically calculates allocation for multiple investors
- **Tax-Efficient**: No selling required — rebalancing via new investments only
- **Multi-Investor Support**: Handle allocations for multiple family members
- **International Assets**: Tracks TCS (Tax Collected at Source) for international investments
- **Flexible Rounding**: Configurable round-off values for practical investing
- **Detailed Reports**: See before and after allocation percentages

### How It Works

1. **Define Asset Classes**: Set your target allocation percentages (e.g., 40% Nifty 50, 35% Nasdaq 100)
2. **Current Portfolio**: Enter current portfolio values for each asset class
3. **Add Investors**: Input monthly investment amounts for each family member
4. **Smart Allocation**: The tool calculates optimal allocation to bring portfolio closer to target
5. **Review Report**: See detailed breakdown of allocations and updated percentages

### The Methodology

Based on the **threshold-based cash-flow rebalancing** strategy:

- Calculate deviation: `Target ₹ - Current ₹` for each asset
- Exclude any negative deviations (overweight assets)
- Allocate new money proportional to positive deviations
- Apply rounding for practical transaction amounts

This approach:
- ✅ Avoids tax implications from selling
- ✅ Automatically buys low (underweight assets)
- ✅ Maintains target allocation over time
- ✅ Emotion-free, rules-based investing

### Learn More

For detailed explanation of the methodology, check out: [My Asset Allocation & Rebalancing](/building-wealth/slides/2025/asset-allocation/)

---

## Frequently Asked Questions (FAQs)

### Why allocate based on deviation instead of fixed SIPs?

Fixed SIPs invest the same amount into each asset regardless of market movements. Over time, winning assets become overweight and losing assets underweight. Deviation-based allocation automatically corrects this by directing more money to underweight assets, maintaining your target allocation without selling.

### What if all assets are overweight?

If all assets are above target (rare), the tool will show zero allocations. In this case, you could either skip investing this month or manually invest in the least overweight asset.

### How is international investment handled?

When you mark an investor's investment as international and TCS applicable, the tool will only allocate to international assets (like Nasdaq 100) for that investor, respecting tax regulations.

### What round-off value should I use?

Common values:
- ₹5,000 - For smaller monthly investments (₹50K-₹1L)
- ₹10,000 - For medium investments (₹1L-₹2L)
- ₹25,000 - For larger investments (₹2L+)

Round-off makes transactions practical and reduces brokerage costs.

### Can I save my portfolio configuration?

Currently, you can export your configuration as JSON using the "Export Data" button. Save this file and import it later to quickly load your settings.

---

## Help

### Input Section

#### Investors
- **Name**: Investor's name for identification
- **Amount**: Monthly investment amount available
- **International**: Check if this investor can invest in international assets
- **TCS**: Applicable if international investment is subject to Tax Collected at Source

You can add multiple investors by clicking "Add Investor".

#### Round Off
- Set the rounding value for allocation amounts
- Example: If set to ₹5,000, all allocations will be multiples of ₹5,000
- Higher values = fewer transactions, Lower values = more precise allocation

#### Asset Classes
- **Asset Class**: Name of the asset (e.g., Nifty 50, Nasdaq 100, Gold)
- **Target (%)**: Your desired allocation percentage for this asset
- **Current (Rs)**: Current portfolio value in this asset

Mark international assets (like Nasdaq 100) so they can be allocated to investors with international access.

### Output Section

#### Individual Allocations
Shows allocation for each investor across asset classes, respecting their constraints (international access, TCS rules).

#### Summary Report
Comprehensive view showing:
- Asset class names
- Target percentages
- Current values and percentages
- New allocation amounts
- Post-allocation values and percentages
- Deviation from target (final gap)

### Tips for Using the Tool

1. **Update Monthly**: Run this allocation every month before investing
2. **Maintain Targets**: Ensure target percentages sum to 100%
3. **Review Gaps**: Check "Diff (%)" column to see remaining deviations
4. **Export Data**: Save your configuration for next month
5. **Adjust Rounding**: Balance between precision and transaction convenience
6. **International Rules**: Mark international assets correctly for TCS compliance

### Example Use Case

**Portfolio**: ₹50L with 40% target in Nifty 50 (currently ₹18L = 36%), 40% target in Nasdaq 100 (currently ₹22L = 44%), 20% in Gold (₹10L = 20%)

**New Investment**: ₹50K this month

**Static Approach**: ₹20K to Nifty, ₹20K to Nasdaq, ₹10K to Gold
- Result: Nasdaq remains overweight, Nifty stays underweight

**Smart Allocation**: 
- Nasdaq is overweight (+4%) → ₹0 allocation
- Nifty is underweight (-4%) → Full ₹50K to Nifty
- Gold is on target → ₹0 allocation
- Result: Portfolio moves closer to target without selling anything

---

## Technical Details

### Allocation Algorithm

```
For each asset class:
  deviation = (target% × total_portfolio) - current_value
  
If deviation > 0 (underweight):
  eligible_assets.add(asset, deviation)

For each investor:
  total_deviation = sum(all positive deviations)
  
  For each eligible asset:
    raw_allocation = (asset_deviation / total_deviation) × investor_amount
    rounded_allocation = round(raw_allocation, round_off_value)
```

### Constraints Handled

1. **Total allocation cannot exceed investor's amount**
2. **International assets only to investors with international access**
3. **TCS considerations for applicable investors**
4. **Rounding must maintain total investment amount**
5. **Only underweight assets receive allocation**

---

> **Remember**: Asset allocation is personal. This tool implements one methodology. Adjust based on your comfort, goals, and market conditions.


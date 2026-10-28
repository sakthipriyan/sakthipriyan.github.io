---
title: "FX Retail via Bharat Connect — Private Bank Speed at Public Bank Rates"
engine: slidetake
date: "2026-10-26"
draft: false
layout: "slides"
type: "slides"
summary: "A live INR-to-USD remittance: lock the FX Retail rate through BHIM, wire it through ICICI Money2World, and invest in an Irish ETF on IBKR the same afternoon."
wealth_tags:
  - FX Retail
  - Bharat Connect
  - Remittance
  - IBKR
# the screenshots live with the blog post
base: https://sakthipriyan.com/building-wealth/blogs/fx-retail-via-bharat-connect-private-bank-speed-at-public-bank-rates-a-live-transaction-walkthrough/
brand: sakthipriyan.com/building-wealth
pip: bottom-right
pip_size: 24%
camera: 24%, 40%, full, off
duration: 12m
related:
  - "[Blog: the full walkthrough](https://sakthipriyan.com/building-wealth/blogs/fx-retail-via-bharat-connect-private-bank-speed-at-public-bank-rates-a-live-transaction-walkthrough/)"
  - "[When this flow failed: 11 days to unwind](https://sakthipriyan.com/building-wealth/blogs/failed-fx-retail-bhim-bharat-connect-transaction/)"
  - "[RealValue FX Engine](https://sakthipriyan.com/building-wealth/tools/realvalue-fx-engine/)"
---

<!-- camera: on, full, on -->

# FX Retail via Bharat Connect

**Private bank speed at public bank rates.** A live remittance, from INR to an Irish ETF on IBKR in one morning.

📖 The Global Indian Investor · Building Wealth

## 📌 Disclaimer

<!-- camera: off, on -->

|  |  |
|---|---|
| **Personal Experience** | One live transaction, as it happened for me. |
| **Purpose** | For learning and awareness, not financial advice. |
| **Rates** | FX rates and bank spreads change every day. |
| **Channels** | Bharat Connect and FX Retail availability may change. |
| **Responsibility** | Verify current rates and limits before you transact. |

## ⚖️ The trade-off

<!-- steps -->
- **Public banks** (Bank of Baroda): the lowest FX spreads, but slow, manual execution
- **Private banks** (ICICI): fast, reliable remittance, but higher spreads
- **FX Retail via Bharat Connect** breaks the trade-off: lock the public-bank rate on **BHIM**, wire it through **ICICI Money2World**

### What it saves

| Channel | Rate (₹/USD) |
|---|---:|
| ICICI default | 96.54 |
| FX Retail + Bharat Connect | **95.105** |
| **Saved per $1,000** | **₹1,435** |

For about **3 extra minutes** on BHIM.

## ⚙️ How it works

<!-- steps -->
- The rate is discovered on **CCIL's FX Retail** platform
- **Bharat Connect** exposes deal booking inside **BHIM**
- The wire is executed by your relationship bank, **ICICI**

## 🔄 The hybrid flow

<!-- view: overview -->

```d2
vars: {
  d2-config: {
    pad: 20
  }
}

grid-columns: 1

classes: {
  n: {
    style: {
      border-radius: 6
      stroke-width: 1
      font-size: 15
    }
  }
  group: {
    grid-gap: 40
    style: {
      border-radius: 8
      stroke-width: 2
      font-size: 16
    }
  }
}

RateLocking: "① Rate Locking — FX Retail + Bharat Connect + BHIM App" {
  class: group
  grid-columns: 3

  BHIM: "BHIM App\nBills & recharges > Forex" { class: n }
  FXRetail: "FX Retail (RBI / CCIL)\nBank Spread: ₹0.20/USD" { class: n }
  Deal: "Deal Confirmed @ ₹95.105/USD" { class: n }

  BHIM -> FXRetail -> Deal
}

WireTransfer: "② Wire Transfer — ICICI Money2World" {
  class: group
  grid-columns: 3

  M2W: "Money2World\nDefault Bank Rate: ₹96.54/USD" { class: n }
  TradeNo: "Apply FX-Retail Trade No.\nRate Updated: ₹95.105/USD" { class: n }
  Wire: "OTP → Wire Initiated → Completed" { class: n }

  M2W -> TradeNo -> Wire
}

InvestmentBlock: "③ Investment — IBKR" {
  class: group
  grid-columns: 2

  IBKR: "USD Credited in IBKR" { class: n }
  Order: "Buy ANAU (Nasdaq 100 UCITS ETF)" { class: n }

  IBKR -> Order
}

RateLocking.Deal -> WireTransfer.TradeNo: "Trade No. via SMS/Email" { style.stroke-dash: 5 }
WireTransfer.Wire -> InvestmentBlock.IBKR
```

## 📱 Step 1: Book the deal on BHIM

<!-- steps -->
- ![Bills & recharges](BHIM1.png)
- ![Finances → Forex](BHIM2.png)
- ![FX Retail already set up: proceed](BHIM3.png)
- ![Pick the relationship bank](BHIM4.jpg)
- ![ICICI, for investment routing](BHIM5.jpg)
- ![₹0.20/USD over the CCIL rate](BHIM6.png)
- ![Enter the USD amount](BHIM7.png)
- ![Rates move in real time: Book](BHIM8.png)
- ![Choose the linked account](BHIM9.png)
- ![Confirmation by SMS and email](BHIM10.png)
- ![Market hours: 9:15 AM – 3:30 PM](BHIM11.png)

### Confirmed in a minute

> **9:32 AM** · FX-Retail: *Trade No 20260504XXXXXX Buy CASH for USD XXX @ 95.1050 INR*
>
> **9:33 AM** · ICICI: *Forex Deal … is available for utilisation*

## 🏦 Step 2: Wire via Money2World

<!-- view: full -->

<!-- steps -->
- ![Money2World opens at ICICI's own rate, ₹96.54/USD: tap "Have an FX-Retail Trade No.?"](m2w_1.png)
- ![Enter the trade number: the locked ₹95.105/USD replaces ICICI's, ₹1.435 saved on every dollar](m2w_2.png)
- ![Confirmed at ₹95.105, then the usual Money2World flow](m2w_3.png)

## ⏱️ Two hours, end to end

| Time | Event |
|---|---|
| **9:32** | Deal booked on BHIM @ ₹95.105 |
| **9:42** | Money2World transfer started |
| **11:11** | Wire completed (SWIFT copy) |
| **11:27** | USD available in IBKR |

> It felt like a domestic NEFT transfer.

### Invested the same afternoon

| Field | Value |
|---|---|
| Instrument | ANAU (Nasdaq 100, Irish UCITS) |
| Executed | 1:52 PM |
| IBKR fee | $1.91 |

## 📈 What the savings become

~**$50/month** saved, invested for **20 years** at **16%**, with a 10% yearly step-up:

| | USD | INR (₹95.1) |
|---|---:|---:|
| Invested | $34,404 | ₹32.7 lakh |
| After 15% tax | $122,757 | **₹1.17 crore** |

### Growth of the savings

```echarts
{
  "tooltip": {"trigger": "axis"},
  "legend": {"top": 0},
  "grid": {"left": 56, "right": 24, "top": 40, "bottom": 36},
  "xAxis": {"type": "category", "name": "Year", "nameLocation": "middle", "nameGap": 26, "boundaryGap": false,
    "data": [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]},
  "yAxis": {"type": "value", "name": "USD (thousands)", "axisLabel": {"formatter": "${value}k"}},
  "series": [
    {"name": "After 15% tax", "type": "line", "smooth": true, "areaStyle": {"opacity": 0.18},
      "data": [0.6, 1.4, 2.4, 3.6, 5.1, 6.8, 9.0, 11.5, 14.6, 18.2, 22.6, 27.8, 33.9, 41.2, 49.9, 60.1, 72.1, 86.3, 103.1, 122.8]},
    {"name": "Invested", "type": "line", "smooth": true, "areaStyle": {"opacity": 0.18},
      "data": [0.6, 1.3, 2.0, 2.8, 3.7, 4.6, 5.7, 6.9, 8.2, 9.6, 11.1, 12.8, 14.7, 16.8, 19.1, 21.6, 24.4, 27.4, 30.7, 34.4]}
  ]
}
```

## ⚠️ Downsides

<!-- steps -->
- Up to **₹5 lakh** per transaction (the UPI limit)
- Four parties: FX Retail, Bharat Connect, BHIM and ICICI. When it fails, it takes time: a later attempt took **11 days and 43 follow-ups** to unwind
- A **₹0.10 buffer** in the quoted rate makes the USD amount slightly off

## ✅ Summary

> For remittances up to ₹5 lakh, FX Retail via Bharat Connect gives public-bank pricing at private-bank speed, with no negotiation.

One recurring step, optimised once: no change to the investment strategy at all.

## 🙏 Thank you

<!-- camera: on, full, on, off -->

👍 Like · 💬 Comment · 🔄 Share · 📌 Subscribe

📖 The full walkthrough is on the blog.

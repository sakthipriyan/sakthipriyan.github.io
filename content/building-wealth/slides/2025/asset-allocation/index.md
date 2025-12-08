---
title: "My Asset Allocation & Rebalancing"
date: "2025-12-06"
draft: false
layout: "slides"
type: "slides"
summary: "How early financial decisions can create huge long-term opportunity costs."
js_tools:
  - echarts
wealth_tags:
  - Building Block
  - Asset Allocation
---

<span style="
  display:inline-block;
  background: linear-gradient(90deg, #fbbf24, #f59e0b);
  color: #fff;
  padding: 4px 30px;
  border-radius: 30px;
">
sakthipriyan.com/building-wealth
</span>

## My Asset Allocation <br/>& Rebalancing
<br/>

#### What is my asset allocation and How do I manage it?
#### Dec 06, 2025
<br/><br/>
<br/>
--

### Disclaimer
|                    |                                                             |
|--------------------|-------------------------------------------------------------|
| **Personal Fit**   | Based on my experience & comfort.                     |
| **Purpose**        | Educational — not financial advice.                    |
| **Risk**           | Markets involve capital risk.                    |
| **Rules**          | Verify tax/regulatory details.                        |
| **Responsibility** | Make decisions aligned with your goals.                     |

--

### Contents
<br/>
<ol class="fragment grow">
  <li>⚖️ What is Asset Allocation?</li>
  <li>🎯 My Asset Allocation</li>
  <li>🔄 Rebalancing</li>
  <li>🛠️ How I manage Rebalancing?</li>
  <li>📝 Summary</li>
</ol>
<br/>
<br/>
<br/>
<br/>

---

### 1️⃣ What is Asset Allocation? ⚖️ 

> 📊 Asset allocation is how you **divide your portfolio** across different asset types 
> based on your **time horizon** and **risk comfort** —  
> such as **Equity (India, US)**, **Debt** and **Gold**.

🍲 It is the **portfolio’s recipe**. The mix determines, 

<!-- .element: class="fragment fade-up" --> 

- ⚖️ Risk level & Return potential <!-- .element: class="fragment fade-up" style="margin-right:500px" --> 
- 🌊 Volatility <!-- .element: class="fragment fade-up" style="margin-right:400px" -->  
- 🚀 Smooth compounding <!-- .element: class="fragment fade-up"  style="margin-right:400px"-->  
<br/><br/>

---

### 2️⃣ My Asset Allocation
<div id="asset-treemap" class="echarts-container" data-chart='{
  "baseOption": {
    "timeline": {
      "loop": false,
      "axisType": "category",
      "autoPlay": true,
      "playInterval": 10000,
      "bottom": 0,
      "data": ["FY 2022-24", "FY 2024-25", "FY 2025-26", "FY 2026-27"]
    },
    "tooltip": {
      "formatter": "{b}: {c}%"
    },
    "series": [
      {
        "type": "treemap",
        "roam": false,
        "nodeClick": false,
        "levels": [
          {
            "upperLabel": { "show": false },
            "label": { "show": false }
          }
        ],
        "breadcrumb": { "show": false },
        "label": {
          "show": true,
          "formatter": "{b} {c}%",
          "fontWeight": "bold",
          "height": 36,
          "fontSize": 30,
          "overflow": "break",
          "ellipsis": "",
          "lineHeight": 36
        },
        "upperLabel": {
          "show": true,
          "height": 36,
          "fontSize": 30,
          "fontWeight": "bold",
          "overflow": "break",
          "ellipsis": ""
        },
        "itemStyle": {
          "borderWidth": 2,
          "borderRadius": 14,
          "borderColor": "transparent"
        }
      }
    ]
  },
  "options": [
    {
      "title": { 
        "text": "FY 2022–24", 
        "left": "center",
        "textStyle": {
          "fontSize": 48,
          "fontWeight": "bold"
        } 
      },
      "series": [{
        "data": [
          {
            "name": "US Equity",
            "value": 25,
            "itemStyle": { "color": "#3B82F6" },
            "children": [
              { "name": "Nasdaq 100 Fund", "value": 25, "itemStyle": { "color": "#60A5FA" } }
            ]
          },
          {
            "name": "India Equity",
            "value": 50,
            "itemStyle": { "color": "#10B981" },
            "children": [
              { "name": "Sensex Fund", "value": 25, "itemStyle": { "color": "#059669" } },
              { "name": "Multicap Fund", "value": 15, "itemStyle": { "color": "#7E57C2" } },
              { "name": "IT Fund", "value": 10, "itemStyle": { "color": "#FF6F61" } }
            ]
          },
          {
            "name": "Non-Equity",
            "value": 25,
            "itemStyle": { "color": "#F59E0B" },
            "children": [
              { "name": "Debt (Dynamic) Fund", "value": 15, "itemStyle": { "color": "#9CA3AF" } },
              { "name": "Gold Fund", "value": 10, "itemStyle": { "color": "#FBBF24" } }
            ]
          }
        ]
      }]
    },
    {
      "title": { "text": "FY 2024–25", "left": "center" },
      "series": [{
        "data": [
          {
            "name": "US Equity",
            "value": 30,
            "itemStyle": { "color": "#3B82F6" },
            "children": [
              { "name": "Nasdaq 100 Fund", "value": 30, "itemStyle": { "color": "#60A5FA" } }
            ]
          },
          {
            "name": "India Equity",
            "value": 50,
            "itemStyle": { "color": "#10B981" },
            "children": [
              { "name": "Sensex Fund", "value": 30, "itemStyle": { "color": "#059669" } },
              { "name": "Midcap Fund", "value": 10, "itemStyle": { "color": "#34D399" } },
              { "name": "Smallcap Fund", "value": 10, "itemStyle": { "color": "#6EE7B7" } }
            ]
          },
          {
            "name": "Non-Equity",
            "value": 20,
            "itemStyle": { "color": "#F59E0B" },
            "children": [
              { "name": "Debt (Dynamic) Fund", "value": 10, "itemStyle": { "color": "#9CA3AF" } },
              { "name": "Gold Fund", "value": 10, "itemStyle": { "color": "#FBBF24" } }
            ]
          }
        ]
      }]
    },
    {
      "title": { "text": "FY 2025–26", "left": "center" },
      "series": [{
        "data": [
          {
            "name": "US Equity",
            "value": 35,
            "itemStyle": { "color": "#3B82F6" },
            "children": [
              { "name": "Nasdaq 100 ETF", "value": 35, "itemStyle": { "color": "#60A5FA" } }
            ]
          },
          {
            "name": "India Equity",
            "value": 45,
            "itemStyle": { "color": "#10B981" },
            "children": [
              { "name": "Nifty 50 Fund", "value": 20, "itemStyle": { "color": "#059669" } },
              { "name": "Next 50 Fund", "value": 10, "itemStyle": { "color": "#34D399" } },
              { "name": "Midcap 150 Fund", "value": 10, "itemStyle": { "color": "#6EE7B7" } },
              { "name": "Smallcap 250 Fund", "value": 5, "itemStyle": { "color": "#A7F3D0" } }
            ]
          },
          {
            "name": "Non-Equity",
            "value": 20,
            "itemStyle": { "color": "#F59E0B" },
            "children": [
              { "name": "Debt (Dynamic) Fund", "value": 10, "itemStyle": { "color": "#9CA3AF" } },
              { "name": "Gold Fund", "value": 10, "itemStyle": { "color": "#FBBF24" } }
            ]
          }
        ]
      }]
    },
    {
      "title": { "text": "FY 2026–27", "left": "center" },
      "series": [{
        "data": [
          {
            "name": "US Equity",
            "value": 40,
            "itemStyle": { "color": "#3B82F6" },
            "children": [
              { "name": "Nasdaq 100 ETF", "value": 40, "itemStyle": { "color": "#60A5FA" } }
            ]
          },
          {
            "name": "India Equity",
            "value": 40,
            "itemStyle": { "color": "#10B981" },
            "children": [
              { "name": "Nifty 50 Fund", "value": 20, "itemStyle": { "color": "#059669" } },
              { "name": "Next 50 Fund", "value": 10, "itemStyle": { "color": "#34D399" } },
              { "name": "Midcap 150 Fund", "value": 10, "itemStyle": { "color": "#6EE7B7" } }
            ]
          },
          {
            "name": "Non-Equity",
            "value": 20,
            "itemStyle": { "color": "#F59E0B" },
            "children": [
              { "name": "Debt (Arbitrage) Fund", "value": 10, "itemStyle": { "color": "#9CA3AF" } },
              { "name": "Gold ETF", "value": 10, "itemStyle": { "color": "#FBBF24" } }
            ]
          }
        ]
      }]
    }
  ]
}'></div>


--

### 2️⃣ My Asset Allocation / Why?
- Strong long-term equity focus (80%) <!-- .element: class="fragment fade-up" -->  
- Diversified across asset classes, geography/currency & market cap <!-- .element: class="fragment fade-up" -->  
- Equity Exposure via index funds only <!-- .element: class="fragment fade-up" -->  
- 20% Non-equity provides drawdown protection and dry powder <!-- .element: class="fragment fade-up" -->  
- 6 target buckets to manage and rebalance <!-- .element: class="fragment fade-up" -->  
- Simple to maintain yet optimized for compounding <!-- .element: class="fragment fade-up" -->  
<br/><br/><br/><br/><br/>
---
### 3️⃣ Rebalancing 🔄 
|                |                                                                  |
|--------------------|------------------------------------------------------------------------|
| **What** | Adjusting your portfolio periodically to maintain your target asset allocation. |
| **Why** | Prevents overweighting in high-performing assets. Maintains desired risk profile. |
| **When** | Time-based (e.g. annually) or <br/> Threshold-based (e.g drifts beyond 5%). |
| **How** | Sell overweight assets & Buy underweight assets. |
| **Taxation** | Consider tax implications and cost-effective strategies. |

---

### 4️⃣ How I Manage Rebalancing? 🛠️

> 💡 I use monthly **Cash-Flow** to do <br/> **Threshold based** rebalancing.

What does it mean?

- If an asset is above its target → I stop buying it.
- I invest new money only into underweight assets.
- The split is proportional to how underweight each asset is.

--
<!-- .slide: data-transition="fade" -->
### 4️⃣ How I Manage Rebalancing? 🛠️
Steps to allocate monthly investment
1. Calculate deviation (Target ₹ – Current ₹) for each asset
2. Exclude anything that is negative
3. Allocate new money based on these deviation ratios

> 💡 This fixes imbalance without selling.

<br/><br/><br/><br/><br/>

--
<!-- .slide: data-transition="fade" -->
### 4️⃣ Rebalancing Example
Current Portfolio:  ₹ 5,00,000 - Monthly Inflow: ₹ 20,000 

|Asset|Current|Target| ₹ Current | ₹  Target |
|-|-|-|-:|-:|
|Nifty 50	| 39.00%| 40.00% | 1,95,000 | 2,08,000 |
|Nasdaq 100	| 39.90%| 40.00% | 1,99,500 | 2,08,000 |
|Debt	|  10.50%| 10.00% | 52,500 | 52,000 |
|Gold	| 10.60%| 10.00% | 53,000 | 52,000 |
|Total | 100.00% | 100.00% | 5,00,000 | 5,20,000 |

<small>Target Total is ₹ 5,20,000 after this month’s ₹ 20,000 investment.</small>



--
<!-- .slide: data-transition="fade" -->
### 4️⃣ Rebalancing Example
Current Portfolio:  ₹ 5,00,000 - Monthly Inflow: ₹ 20,000 

|Asset| ₹ Current | ₹  Target | ₹ Diff | ₹ Adjusted|
|-|-:|-:|-:|-:|
|Nifty 50	| 1,95,000 | 2,08,000 | 13,000 | 12,000 |
|Nasdaq 100	| 1,99,500 | 2,08,000 | 8,500 | 8,000 |
|Debt	 | 52,500 | 52,000 |  |  |
|Gold	| 53,000 | 52,000 |  |  |
|Total | 100.00% | 100.00% | 21,500 | 20,000 |

<small>₹ Diff = ₹ Target – ₹ Current. <br/> ₹ Adjusted = Apply ₹ Diff ratio and round off </small>

--
<!-- .slide: data-transition="fade" -->
### 4️⃣ Rebalancing Example
Comparing Dynamic monthly purchase vs Static SIP

|Asset| ₹ Current | ₹  Target | ₹ Dynamic| ₹ Static |
|-|-:|-:|-:|-:|
|Nifty 50	| 1,95,000 | 2,08,000 | 12,000 | 8,000 |
|Nasdaq 100	| 1,99,500 | 2,08,000 | 8,000 | 8,000 |
|Debt	 | 52,500 | 52,000 |  | 2,000 | 
|Gold	| 53,000 | 52,000 |  | 2,000 |
|Total | 100.00% | 100.00% | 20,000 | 20,000 |

<small>Static SIP = Fixed investment into each asset</small>

--

### 4️⃣ Why This Works Well ⭐

- No selling → No taxes <!-- .element: class="fragment fade-up" -->  
- Automatically maintains target allocation  <!-- .element: class="fragment fade-up" -->  
- Emotion-free & rules-based <!-- .element: class="fragment fade-up" -->  
- Buys low, avoids buying high <!-- .element: class="fragment fade-up" -->  
- Best suited for the accumulation stage <!-- .element: class="fragment fade-up" -->  
<br/><br/><br/><br/>
---

### 5️⃣ Summary 📝 

- Allocation: 80% Equity / 20% Non-Equity <!-- .element: class="fragment fade-up" -->  
- Diversified across India, US, Debt and Gold <!-- .element: class="fragment fade-up" -->
- Rebalancing uses cash-flow + deviation ratios <!-- .element: class="fragment fade-up" -->  
- Zero selling unless absolutely necessary <!-- .element: class="fragment fade-up" -->  
- Clean, mathematically precise, tax-efficient strategy <!-- .element: class="fragment fade-up" --> 
<br/><br/><br/><br/><br/>
---

<span style="
  display:inline-block;
  background: linear-gradient(90deg, #fbbf24, #f59e0b);
  color: #fff;
  padding: 4px 30px;
  border-radius: 30px;
">
sakthipriyan.com/building-wealth
</span>

**Found this useful? 🙂**
| |
|-|
|👍 Like | 
|💬 Comment|
|🔄 Share |
| 📌 Subscribe  |
for more videos...

**✨ Thank You 🙏**

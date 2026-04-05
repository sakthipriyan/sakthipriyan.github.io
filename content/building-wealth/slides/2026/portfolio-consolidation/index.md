---
title: "Red Days = Productive Days: Portfolio Reset"
date: "2026-04-05"
draft: false
layout: "slides"
type: "slides"
summary: "How I tagged every fund to a goal, identified the noise, and consolidated 30 funds across 5 goals into a cleaner, simpler setup — using a market dip as the trigger."
js_tools:
 - echarts
 - gsap
wealth_tags:
 - Portfolio
 - Mutual Funds
 - Goal Based Investing
 - Index Funds
 - Consolidation
 
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

<h2 class="title-scramble">Red Days = Productive Days</h2>
<br/>
<h4 class="subtitle-fade" data-gsap='{"from": {"opacity": 0, "y": 30}, "duration": 1, "delay": 2.5}'>Portfolio Reset Edition</h4>
<h4 class="subtitle-fade2" data-gsap='{"from": {"opacity": 0, "y": 30}, "duration": 1, "delay": 3}'>Apr 05, 2026</h4>
<br/><br/>
<br/>
--

### Disclaimer
|                    |                                                             |
|--------------------|-------------------------------------------------------------|
| **Personal Fit**   | Based on my experience & comfort                     |
| **Purpose**        | Educational — not financial advice                    |
| **Risk**           | Markets involve capital risk                     |
| **Rules**          | Verify tax/regulatory details                        |
| **Responsibility** | Make decisions aligned with your goals                |

---

### Contents

1. 🏷️ Tag Every Fund to a Goal
2. 🗂️ My Old Setup - 5 Goals, 30 Funds
3. 🔴 Red Days = Productive Days
4. ✅ My New Setup - 3 Goals, 25 Funds
5. 📉 Active → Passive Shift
6. Summary

<br/><br/><br/><br/>

---

### 1️⃣ Tag Every Fund to a Goal 🏷️


<div class="fragment">
<p style="font-size: 1.3em;">Every rupee should know its job.</p>
<p style="font-size: 1em; color: #6b7280; margin-top: 20px;">
  The moment you buy a fund without a goal, <br/>you create future confusion — and bad exit decisions.
</p>
</div>

<div class="fragment">
<p style="font-size: 1.2em; color: #f59e0b;"><strong>If you can't answer these, the fund has no home:</strong></p>
<ul style="font-size: 1em; margin-top: 15px; text-align: left; display: inline-block;">
  <li class="fragment fade-up">What is this fund for?</li>
  <li class="fragment fade-up">When will I need this money?</li>
  <li class="fragment fade-up">What happens if this drops 30%?</li>
</ul>
</div>

<div class="fragment">
<p style="font-size: 1.1em; color: #10b981;"><strong>Goal tagging gives you clarity on:</strong></p>
<ul style="font-size: 1em; margin-top: 15px; text-align: left; display: inline-block;">
  <li class="fragment fade-up">Which funds to hold through volatility</li>
  <li class="fragment fade-up">Which funds to exit first (and when)</li>
  <li class="fragment fade-up">How to rebalance without panic</li>
</ul>
</div>

---

### 2️⃣ My Old Setup — 5 Goals, 30 Funds 🗂️

<div id="old-goals-pie" class="echarts-container" data-chart='{
  "tooltip": {
    "trigger": "item",
    "formatter": "{b}: {c}%"
  },
  "legend": {
    "orient": "vertical",
    "right": "5%",
    "top": "center",
    "textStyle": { "fontSize": 18 }
  },
  "series": [{
    "name": "Goals",
    "type": "pie",
    "radius": ["40%", "70%"],
    "center": ["40%", "52%"],
    "label": {
      "show": true,
      "formatter": "{c}%",
      "fontSize": 16,
      "fontWeight": "bold"
    },
    "data": [
      { "name": "Savings",   "value": 79.32, "itemStyle": { "color": "#10B981" } },
      { "name": "Retirement","value": 12.03, "itemStyle": { "color": "#3B82F6" } },
      { "name": "Emergency", "value": 5.13,  "itemStyle": { "color": "#F59E0B" } },
      { "name": "Travel",    "value": 2.70,  "itemStyle": { "color": "#06B6D4" } },
      { "name": "Education", "value": 0.81,  "itemStyle": { "color": "#8B5CF6" } }
    ],
    "emphasis": {
      "itemStyle": { "shadowBlur": 10, "shadowOffsetX": 0, "shadowColor": "rgba(0,0,0,0.5)" }
    }
  }]
}'></div>

--

### 2️⃣ Old Setup — Savings (20 Funds) Breakdown

<div id="old-savings-treemap" class="echarts-container" data-chart='{
  "tooltip": {
    "formatter": "{b}: {c}%"
  },
  "series": [{
    "type": "treemap",
    "roam": false,
    "nodeClick": false,
    "breadcrumb": { "show": false },
    "label": {
      "show": true,
      "formatter": "{b}\n{c}%",
      "fontWeight": "bold",
      "fontSize": 22,
      "lineHeight": 28
    },
    "itemStyle": {
      "borderWidth": 2,
      "borderRadius": 10,
      "borderColor": "transparent"
    },
    "data": [
      { "name": "Nasdaq 100",    "value": 30.84, "itemStyle": { "color": "#3B82F6" } },
      { "name": "Nifty 50",     "value": 23.78, "itemStyle": { "color": "#10B981" } },
      { "name": "Gold",          "value": 16.82, "itemStyle": { "color": "#FBBF24" } },
      { "name": "Active",        "value": 10.91, "itemStyle": { "color": "#7E57C2" } },
      { "name": "Debt",          "value": 8.16,  "itemStyle": { "color": "#9CA3AF" } },
      { "name": "Midcap 150",   "value": 4.25,  "itemStyle": { "color": "#F59E0B" } },
      { "name": "Next 50",      "value": 3.51,  "itemStyle": { "color": "#06B6D4" } },
      { "name": "Smallcap 250", "value": 1.75,  "itemStyle": { "color": "#EF4444" } }
    ]
  }]
}'></div>

--

### 2️⃣ Old Setup — The Problems

<div class="fragment">
<p style="font-size: 1.3em; color: #ef4444;"><strong>Too many inputs. Too much noise.</strong></p>
<ul style="font-size: 1em; margin-top: 15px; text-align: left; display: inline-block;">
  <li class="fragment fade-up">30 funds across 5 buckets</li>
  <li class="fragment fade-up">8 active funds across goals — each needing monitor</li>
</ul>
</div>

<div class="fragment">
<p style="font-size: 1.1em; color: #f59e0b;"><strong>Structural issues:</strong></p>
<ul style="font-size: 1em; margin-top: 15px; text-align: left; display: inline-block;">
  <li class="fragment fade-up">Retirement and Education had similar time horizons but much weaker diversification</li>
  <li class="fragment fade-up">Active funds create fund manager dependency</li>
  <li class="fragment fade-up">Too many overlapping mandates across savings funds</li>
</ul>
</div>

<div class="fragment">
<p style="font-size: 1.1em; color: #6b7280;">Avoided restructuring for years because of tax impact.</p>
</div>

---

### 3️⃣ Red Days = Productive Days 🔴

<div class="r-stack">

<div class="fragment fade-in-then-out">
<p style="font-size: 1.4em; color: #ef4444;"><strong>Market dips are uncomfortable.</strong></p>
<p style="font-size: 1.1em; color: #6b7280; margin-top: 20px;">Everyone's watching the red. Panicking. Freezing.</p>
</div>

<div class="fragment fade-in-then-out">
<p style="font-size: 1.3em; color: #f59e0b;"><strong>Or... you restructure.</strong></p>
<p style="font-size: 1em; color: #6b7280; margin-top: 15px;">
  Exiting underperforming active funds at a dip means lower LTCG to pay.<br/>
  Same exits at ATH would cost more tax.
</p>

</div>

<div class="fragment">
<p style="font-size: 1.1em; color: #10b981;"><strong>The dip gave an opportunity to:</strong></p>
<ul style="font-size: 1em; margin-top: 15px; text-align: left; display: inline-block;">
  <li class="fragment fade-up">Exit 5 active funds from Savings + 3 active funds from Retirement</li>
  <li class="fragment fade-up">Merge Education + Retirement into main portfolio</li>
  <li class="fragment fade-up">Redeploy into passive index funds and global ETFs</li>
  <li class="fragment fade-up">Tried to stay near zero tax impact using the ₹1.25L LTCG exemption.
Still exited ELSS funds despite the tax cost to simplify the portfolio.</li>
  <li class="fragment fade-up">Some small portion is struck due to a transaction mistake</li>
</ul>
</div>

</div>

--

### 3️⃣ What Changed?

<table>
<tr class="fragment fade-up"><th>What</th><th>Before</th><th>After</th></tr>
<tr class="fragment fade-up"><td>Total Funds</td><td style="color:#ef4444;">30</td><td style="color:#10b981;">25</td></tr>
<tr class="fragment fade-up"><td>Goals / Buckets</td><td style="color:#ef4444;">5</td><td style="color:#10b981;">3 (simpler)</td></tr>
<tr class="fragment fade-up"><td>Active Funds</td><td style="color:#ef4444;">8</td><td style="color:#10b981;">~0</td></tr>
</table>

---

### 4️⃣ My New Setup — 3 Goals, 25 Funds ✅

<div id="new-goals-pie" class="echarts-container" data-chart='{
  "tooltip": {
    "trigger": "item",
    "formatter": "{b}: {c}%"
  },
  "legend": {
    "orient": "vertical",
    "right": "5%",
    "top": "center",
    "textStyle": { "fontSize": 18 }
  },
  "series": [{
    "name": "Goals",
    "type": "pie",
    "radius": ["40%", "70%"],
    "center": ["40%", "52%"],
    "label": {
      "show": true,
      "formatter": "{c}%",
      "fontSize": 16,
      "fontWeight": "bold"
    },
    "data": [
      { "name": "1 Portfolio", "value": 92.04, "itemStyle": { "color": "#10B981" } },
      { "name": "Emergency",   "value": 5.08,  "itemStyle": { "color": "#F59E0B" } },
      { "name": "Travel",      "value": 2.63,  "itemStyle": { "color": "#06B6D4" } },
      { "name": "Legacy Retirement",  "value": 0.25,  "itemStyle": { "color": "#3B82F6" } }
    ],
    "emphasis": {
      "itemStyle": { "shadowBlur": 10, "shadowOffsetX": 0, "shadowColor": "rgba(0,0,0,0.5)" }
    }
  }]
}'></div>

--

### 4️⃣ New Setup — 1 Portfolio (19 Funds) Breakdown

<div id="new-portfolio-treemap" class="echarts-container" data-chart='{
  "tooltip": {
    "formatter": "{b}: {c}%"
  },
  "series": [{
    "type": "treemap",
    "roam": false,
    "nodeClick": false,
    "breadcrumb": { "show": false },
    "label": {
      "show": true,
      "formatter": "{b}\n{c}%",
      "fontWeight": "bold",
      "fontSize": 22,
      "lineHeight": 28
    },
    "itemStyle": {
      "borderWidth": 2,
      "borderRadius": 10,
      "borderColor": "transparent"
    },
    "data": [
      { "name": "Nasdaq 100",    "value": 36.08, "itemStyle": { "color": "#3B82F6" } },
      { "name": "Nifty 50",     "value": 19.73, "itemStyle": { "color": "#10B981" } },
      { "name": "Gold",          "value": 13.36, "itemStyle": { "color": "#FBBF24" } },
      { "name": "Midcap 150",   "value": 9.57,  "itemStyle": { "color": "#F59E0B" } },
      { "name": "Next 50",      "value": 9.42,  "itemStyle": { "color": "#06B6D4" } },
      { "name": "Debt",          "value": 7.05,  "itemStyle": { "color": "#9CA3AF" } },
      { "name": "Smallcap 250", "value": 4.80,  "itemStyle": { "color": "#EF4444" } }
    ]
  }]
}'></div>

--
### 4️⃣ New Setup — Target Allocation 
### Tax Year 2026-27

<div id="new-portfolio-treemap-target" class="echarts-container" data-chart='{
  "tooltip": {
    "formatter": "{b}: {c}%"
  },
  "series": [{
    "type": "treemap",
    "roam": false,
    "nodeClick": false,
    "breadcrumb": { "show": false },
    "label": {
      "show": true,
      "formatter": "{b}\n{c}%",
      "fontWeight": "bold",
      "fontSize": 22,
      "lineHeight": 28
    },
    "itemStyle": {
      "borderWidth": 2,
      "borderRadius": 10,
      "borderColor": "transparent"
    },
    "data": [
      { "name": "Nasdaq 100",    "value": 40, "itemStyle": { "color": "#3B82F6" } },
      { "name": "Nifty 50",     "value": 20, "itemStyle": { "color": "#10B981" } },
      { "name": "Gold",          "value": 10, "itemStyle": { "color": "#FBBF24" } },
      { "name": "Midcap 150",   "value": 10,  "itemStyle": { "color": "#F59E0B" } },
      { "name": "Next 50",      "value": 10,  "itemStyle": { "color": "#06B6D4" } },
      { "name": "Debt",          "value": 5,  "itemStyle": { "color": "#9CA3AF" } },
      { "name": "Smallcap 250", "value": 5,  "itemStyle": { "color": "#EF4444" } }
    ]
  }]
}'></div>

---

### 5️⃣ Active → Passive Shift 📉

<div class="r-stack">

<div class="fragment fade-in-then-out">
<p style="font-size: 1.2em;"><strong>The old portfolio had 8 active funds.</strong></p>
<p style="font-size: 1em; color: #6b7280; margin-top: 15px;">
  Each fund needed tracking. Each had a manager. <br/>
  Each was a potential source of underperformance.
</p>
</div>

<div class="fragment fade-in-then-out">
<p style="font-size: 1.1em; color: #f59e0b;"><strong>The equity strategy (now clear):</strong></p>
<br/>
<table style="font-size: 0.9em;">
<tr><th>Geography</th><th>Index</th><th>My Allocation</th><th>Global Share</th></tr>
<tr><td>India</td><td>Nifty 50 + Next 50 + Midcap 150 + Smallcap 250</td><td>45%</td><td>~4%</td></tr>
<tr><td>US</td><td>Nasdaq 100 (India MF + Irish ETFs)</td><td>40%</td><td>35 - 40%</td></tr>
</table>
<p style="font-size: 0.9em; color: #6b7280; margin-top: 15px;">Broad exposure. No fund manager dependency. No future churn.</p>
</div>

</div>

--
### 5️⃣ Fund Matrix - 1 Portfolio
<table style="font-size: 0.75em;">
<tr class="fragment fade-up"><th>Category</th><th>Index/Asset Class</th><th>Primary</th><th>Secondary</th><th>Watching</th></tr>
<tr class="fragment fade-up"><td rowspan="4">India Equity</td><td>Nifty 50</td><td><b>Nippon</b></td><td>HDFC</td></tr>
<tr class="fragment fade-up"><td>Next 50</td><td><b>Kotak</b></td><td>—</td></tr>
<tr class="fragment fade-up"><td>Midcap 150</td><td><b>ICICI</b></td><td>HDFC</td><td>JBR</td></tr>
<tr class="fragment fade-up"><td>Smallcap 250</td><td><b>ICICI</b></td><td>—</td><td>JBR</td></tr>
<tr class="fragment fade-up"><td rowspan="2">US Equity<br/><small>Nasdaq 100</small></td><td>Indian MF</td><td>Kotak</td><td>ICICI</td></tr>
<tr class="fragment fade-up"><td>Irish ETFs</td><td><b>ANAU</b></td><td>XNAS</td><td>QQQA</td></tr>
<tr class="fragment fade-up"><td rowspan="2">Gold</td><td>Indian MF</td><td>Axis</td><td>—</td></tr>
<tr class="fragment fade-up"><td>Indian ETFs</td><td><b>??</b></td><td>—</td></tr>
<tr class="fragment fade-up"><td rowspan="2">Debt</td><td>Dynamic Bond</td><td><b>ICICI</b></td><td>—</td></tr>
<tr class="fragment fade-up"><td>Arbitrage</td><td><b>Kotak</b></td><td>—</td></tr>

<tr></tr>

</table>

--

### 5️⃣ Fund Matrix - Emergency Fund & Travel Fund
<table style="font-size: 0.75em;">
<tr class="fragment fade-up"><th>Category</th><th>Asset Class</th><th>AMC</th></tr>
<tr class="fragment fade-up"><td>Travel</td><td>Arbitrage</td><td>Kotak</td></tr>
<tr class="fragment fade-up"><td rowspan="3">Emergency</td><td>Liquid</td><td>Axis</td></tr>
<tr class="fragment fade-up"><td>Arbitrage</td><td>Kotak</td></tr>
<tr class="fragment fade-up"><td>Hybrid</td><td>ICICI + Kotak </td></tr>
<tr></tr>
</table>
---

### 6️⃣ Summary 📝

- Tag every fund to a goal — clarity on when & why to exit <!-- .element: class="fragment fade-up" -->
- Old setup: 5 goals, 30 funds — too complex <!-- .element: class="fragment fade-up" -->
- Merged Education & Retirement → unified long-term portfolio <!-- .element: class="fragment fade-up" -->
- Exited 8 active funds, moving firmly passive <!-- .element: class="fragment fade-up" -->
- New setup: 3 goals, 25 funds — drift cut to ~5% <!-- .element: class="fragment fade-up" -->
- Fewer funds = less noise, easier rebalancing <!-- .element: class="fragment fade-up" -->
- Market dips are restructuring opportunities <!-- .element: class="fragment fade-up" -->
- Every rupee should know its job <!-- .element: class="fragment fade-up" -->
<br/><br/><br/>

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

<div style="margin-top: 30px;">
<h3 data-gsap='{"from": {"opacity": 0, "y": -50, "scale": 1.5}, "duration": 0.8, "delay": 1.2}'>
<strong>Found this useful? 🙂</strong>
</h3>
</div>

<div style="font-size: 1.4em; margin: 35px 0;">
<p data-gsap='{"from": {"opacity": 0, "x": -100, "rotation": -45}, "duration": 0.6, "delay": 2, "ease": "elastic.out(1, 0.5)"}'>
👍 Like
</p>
<p data-gsap='{"from": {"opacity": 0, "x": 100, "rotation": 45}, "duration": 0.6, "delay": 2.4, "ease": "elastic.out(1, 0.5)"}'>
💬 Comment
</p>
<p data-gsap='{"from": {"opacity": 0, "scale": 0}, "duration": 0.6, "delay": 2.8, "ease": "back.out(2)"}'>
🔄 Share
</p>
<p data-gsap='{"from": {"opacity": 0, "y": 100}, "duration": 0.6, "delay": 3.2, "ease": "bounce.out"}'>
📌 Subscribe
</p>
<p style="font-size: 0.9em; opacity: 0.8;" data-gsap='{"from": {"opacity": 0}, "duration": 0.5, "delay": 3.8}'>
for more tools and portfolio insights...
</p>
</div>

<h3 data-gsap='{"from": {"opacity": 0, "scale": 3, "rotation": 360}, "duration": 1.5, "delay": 4.5, "ease": "elastic.out(1, 0.3)"}'>
<strong>✨ Thank You 🙏</strong>
</h3>

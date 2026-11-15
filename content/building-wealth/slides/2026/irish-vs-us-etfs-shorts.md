---
title: "Irish ETFs vs US ETFs (Shorts)"
engine: slidetake
accent: "#f5c542"          # the section's colour, so a recording matches the site
date: "2026-11-14"
draft: true
layout: "slides"
type: "slides"
summary: "Five portrait Shorts from Irish ETFs vs US ETFs, one slide each: the $60,000 estate tax exemption, what it costs heirs, how long they wait, the tax on a 2% dividend, and $448,654 over 30 years. The full video has the rest."
js_tools:
  - gsap
wealth_tags:
  - ETF
  - Tax Optimization
  - Global Investing
# Slidetake: 9:16 Shorts, one slide = one Short; the card on top, the camera below
format: portrait
pip: behind top
duration: 30s             # per slide: each slide is its own Short
related:
  - "[Slides: Irish ETFs vs US ETFs](https://sakthipriyan.com/building-wealth/slides/irish-etfs-vs-us-etfs-what-indian-investors-should-buy/)"
  - "[Book chapter: What to Buy — Irish ETFs vs US ETFs](https://sakthipriyan.com/building-wealth/books/the-global-indian-investor/06-what-to-buy-irish-etfs/)"
---

# <span style="color:var(--accent)">Only $60k is tax-free</span>

<!-- camera: behind top solid -->

```echarts
{
 "grid": {"left": 10, "right": 10, "top": 50, "bottom": 10, "containLabel": true},
 "xAxis": {"type": "category", "axisTick": {"show": false},
  "axisLabel": {"fontSize": 20, "fontWeight": "bold"},
  "data": ["US citizen", "You (Indian)"]},
 "yAxis": {"type": "value", "show": false, "max": 15},
 "series": [{"type": "bar", "barWidth": "50%",
  "label": {"show": true, "position": "top", "fontSize": 26, "fontWeight": "bold"},
  "data": [
   {"value": 15, "itemStyle": {"color": "#3bb273"}, "label": {"formatter": "$15M"}},
   {"value": 0.06, "itemStyle": {"color": "#e8735a"}, "label": {"formatter": "$60k"}}
  ]}]
}
```

US estate tax · fix: **VOO → VUAA**

## <span style="color:var(--accent)">Up to 40% to the IRS</span>

<!-- camera: behind top solid -->

```echarts
{
 "legend": {"top": 0, "textStyle": {"fontSize": 16}},
 "grid": {"left": 10, "right": 10, "top": 44, "bottom": 10, "containLabel": true},
 "xAxis": {"type": "category", "axisTick": {"show": false},
  "axisLabel": {"fontSize": 18, "fontWeight": "bold"},
  "data": ["$100k", "$500k", "$1M", "$2M"]},
 "yAxis": {"type": "value", "show": false, "max": 2300},
 "series": [
  {"name": "Heirs receive", "type": "bar", "stack": "p", "barWidth": "60%", "color": "#3bb273",
   "label": {"show": true, "position": "inside", "fontSize": 17, "fontWeight": "bold", "color": "#fff"},
   "data": [
    {"value": 89.2, "label": {"show": false}},
    {"value": 357.2, "label": {"show": false}},
    {"value": 667.2, "label": {"formatter": "$667k"}},
    {"value": 1267.2, "label": {"formatter": "$1.27M"}}]},
  {"name": "US estate tax", "type": "bar", "stack": "p", "color": "#e8735a",
   "label": {"show": true, "position": "top", "fontSize": 18, "fontWeight": "bold", "color": "#e8735a", "lineHeight": 22},
   "data": [
    {"value": 10.8, "label": {"formatter": "$10.8k\n11%"}},
    {"value": 142.8, "label": {"formatter": "$143k\n29%"}},
    {"value": 332.8, "label": {"formatter": "$333k\n33%"}},
    {"value": 732.8, "label": {"formatter": "$733k\n37%"}}]}
 ]
}
```

US estate tax · Irish ETFs: **$0**

## <span style="color:var(--accent)">Heirs wait up to 2 years</span>

<!-- camera: behind top solid -->

```echarts
{
 "grid": {"left": 10, "right": 20, "top": 10, "bottom": 30, "containLabel": true},
 "xAxis": {"type": "value", "min": 0, "max": 24, "interval": 6,
  "axisLabel": {"fontSize": 16, "formatter": "{value} mo"}, "splitLine": {"lineStyle": {"type": "dashed", "opacity": 0.3}}},
 "yAxis": {"type": "category", "inverse": true, "axisTick": {"show": false},
  "axisLabel": {"fontSize": 17, "fontWeight": "bold"},
  "data": ["US ETFs", "Irish\nIndividual", "Irish\nJoint / TOD"]},
 "series": [
  {"type": "bar", "stack": "t", "silent": true, "itemStyle": {"color": "transparent"}, "data": [12, 6, 0.5]},
  {"type": "bar", "stack": "t", "barWidth": 40,
   "label": {"show": true, "position": "inside", "fontSize": 18, "fontWeight": "bold", "color": "#fff"},
   "data": [
    {"value": 12, "itemStyle": {"color": "#e8735a"}, "label": {"formatter": "12–24 mo"}},
    {"value": 6, "itemStyle": {"color": "#3bb273"}, "label": {"formatter": "6–12 mo"}},
    {"value": 1, "itemStyle": {"color": "#3bb273"}, "label": {"position": "right", "color": "#3bb273", "formatter": "2–6 weeks"}}
   ]}
 ]
}
```

Frozen until the IRS clears

## <span style="color:var(--accent)">Dividends: 36% vs 15%</span>

<!-- camera: behind top solid -->

```echarts
{
 "legend": {"top": 0, "textStyle": {"fontSize": 16}},
 "grid": {"left": 10, "right": 10, "top": 50, "bottom": 10, "containLabel": true},
 "xAxis": {"type": "category", "axisTick": {"show": false},
  "axisLabel": {"fontSize": 18, "fontWeight": "bold"},
  "data": ["US ETF", "Irish Acc"]},
 "yAxis": {"type": "value", "show": false, "max": 2},
 "series": [
  {"name": "Tax", "type": "bar", "stack": "d", "barWidth": "50%", "color": "#e8735a",
   "label": {"show": true, "fontSize": 20, "fontWeight": "bold", "color": "#fff", "formatter": "{c}%"},
   "data": [0.72, 0.30]},
  {"name": "Reinvested", "type": "bar", "stack": "d", "color": "#3bb273",
   "label": {"show": true, "fontSize": 20, "fontWeight": "bold", "color": "#fff", "formatter": "{c}%"},
   "data": [1.28, 1.70]}
 ]
}
```

2% S&P 500 dividend, top slab

## <span style="color:var(--accent)">Same S&P 500, +$448k</span>

<!-- camera: behind top solid -->

```echarts
{
 "grid": {"left": 10, "right": 20, "top": 50, "bottom": 10, "containLabel": true},
 "xAxis": {"type": "category", "boundaryGap": false, "axisTick": {"show": false},
  "axisLabel": {"fontSize": 16, "formatter": "Yr {value}", "interval": 9},
  "data": [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]},
 "yAxis": {"type": "value", "show": false},
 "series": [{"type": "line", "smooth": true, "symbol": "none", "color": "#3bb273",
  "lineStyle": {"width": 5}, "areaStyle": {"opacity": 0.25},
  "data": [0,0,0,1,1,1,2,3,5,6,8,11,14,18,23,30,37,46,57,70,86,105,127,153,185,222,266,317,378,
   {"value": 449, "symbol": "circle", "symbolSize": 14,
    "label": {"show": true, "position": "left", "fontSize": 26, "fontWeight": "bold", "formatter": "+$448,654"}}]}]
}
```

$1,000/month for 30 years

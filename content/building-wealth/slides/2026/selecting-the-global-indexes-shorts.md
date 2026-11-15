---
title: "Selecting the Global Indexes (Shorts)"
engine: slidetake
accent: "#f5c542"          # the section's colour, so a recording matches the site
date: "2026-11-14"
draft: true
layout: "slides"
type: "slides"
summary: "Six portrait Shorts from Selecting the Global Indexes, one slide each: Nasdaq 100 costs ~5× more, Irish vs US-listed fees, never mixing MSCI and FTSE, gold fund fees in India vs Ireland, ₹4.55 lakh lost to gold fees, and my allocation. The full video has the rest."
js_tools:
  - gsap
wealth_tags:
  - Index Funds
  - ETF
  - Global Investing
# Slidetake: 9:16 Shorts, one slide = one Short; the card on top, the camera below
format: portrait
pip: behind top
duration: 30s             # per slide: each slide is its own Short
related:
  - "[Slides: Selecting the Global Indexes](https://sakthipriyan.com/building-wealth/slides/selecting-the-global-indexes-irish-etfs-for-indian-investors/)"
  - "[Book chapter: Selecting the Global Indexes](https://sakthipriyan.com/building-wealth/books/the-global-indian-investor/07-selecting-the-global-indexes/)"
---

# <span style="color:var(--accent)">Nasdaq 100: 5× fees</span>

<!-- camera: behind top solid -->

```echarts
{
 "grid": {
  "left": 10,
  "right": 10,
  "top": 50,
  "bottom": 10,
  "containLabel": true
 },
 "xAxis": {
  "type": "category",
  "axisTick": {
   "show": false
  },
  "axisLabel": {
   "fontSize": 18,
   "fontWeight": "bold"
  },
  "data": [
   "MSCI USA",
   "S&P 500",
   "Nasdaq 100"
  ]
 },
 "yAxis": {
  "type": "value",
  "show": false,
  "max": 0.17
 },
 "series": [
  {
   "type": "bar",
   "barWidth": "55%",
   "label": {
    "show": true,
    "position": "top",
    "fontSize": 24,
    "fontWeight": "bold",
    "formatter": "{c}%"
   },
   "data": [
    {
     "value": 0.03,
     "itemStyle": {
      "color": "#3bb273"
     }
    },
    {
     "value": 0.03,
     "itemStyle": {
      "color": "#3bb273"
     }
    },
    {
     "value": 0.14,
     "itemStyle": {
      "color": "#e8735a"
     }
    }
   ]
  }
 ]
}
```

Cheapest Irish fund · yearly fee

## <span style="color:var(--accent)">Irish ETFs cost more? No</span>

<!-- camera: behind top solid -->

```echarts
{
 "legend": {
  "top": 0,
  "textStyle": {
   "fontSize": 15
  },
  "data": [
   "Cheapest US",
   "Cheapest Irish"
  ]
 },
 "grid": {
  "left": 10,
  "right": 10,
  "top": 50,
  "bottom": 10,
  "containLabel": true
 },
 "xAxis": {
  "type": "category",
  "axisTick": {
   "show": false
  },
  "axisLabel": {
   "fontSize": 15,
   "fontWeight": "bold",
   "lineHeight": 20
  },
  "data": [
   "MSCI\nACWI",
   "MSCI\nWorld",
   "S&P\n500",
   "Nasdaq\n100"
  ]
 },
 "yAxis": {
  "type": "value",
  "show": false,
  "max": 0.38
 },
 "series": [
  {
   "name": "Cheapest US",
   "type": "bar",
   "barGap": "10%",
   "color": "#e8735a",
   "label": {
    "show": true,
    "position": "top",
    "fontSize": 15,
    "fontWeight": "bold",
    "formatter": "{c}%"
   },
   "data": [
    0.32,
    0.24,
    0.02,
    0.15
   ]
  },
  {
   "name": "Cheapest Irish",
   "type": "bar",
   "color": "#3bb273",
   "label": {
    "show": true,
    "position": "top",
    "fontSize": 15,
    "fontWeight": "bold",
    "formatter": "{c}%"
   },
   "data": [
    0.12,
    0.05,
    0.03,
    0.14
   ]
  }
 ]
}
```

Cheapest fund, each side

## <span style="color:var(--accent)">Never mix MSCI and FTSE</span>

<!-- camera: behind top solid -->

South Korea is **developed** in FTSE, **emerging** in MSCI

FTSE Developed + MSCI EM → South Korea **twice**

MSCI World + FTSE EM → South Korea **missing**

## <span style="color:var(--accent)">Gold funds: 7.5× the fee</span>

<!-- camera: behind top solid -->

```echarts
{
 "grid": {
  "left": 10,
  "right": 10,
  "top": 50,
  "bottom": 10,
  "containLabel": true
 },
 "xAxis": {
  "type": "category",
  "axisTick": {
   "show": false
  },
  "axisLabel": {
   "fontSize": 16,
   "fontWeight": "bold",
   "lineHeight": 20
  },
  "data": [
   "Indian\nGold FoFs",
   "Indian\nGold ETFs",
   "Irish\nGold ETCs"
  ]
 },
 "yAxis": {
  "type": "value",
  "show": false,
  "min": 0,
  "max": 1.05
 },
 "series": [
  {
   "type": "bar",
   "stack": "t",
   "silent": true,
   "itemStyle": {
    "color": "transparent"
   },
   "data": [
    0.45,
    0.29,
    0.11
   ]
  },
  {
   "type": "bar",
   "stack": "t",
   "barWidth": "50%",
   "label": {
    "show": true,
    "position": "top",
    "fontSize": 18,
    "fontWeight": "bold",
    "lineHeight": 22
   },
   "data": [
    {
     "value": 0.45,
     "itemStyle": {
      "color": "#e8735a"
     },
     "label": {
      "formatter": "0.45–\n0.90%",
      "color": "#e8735a"
     }
    },
    {
     "value": 0.51,
     "itemStyle": {
      "color": "#e8735a"
     },
     "label": {
      "formatter": "0.29–\n0.80%",
      "color": "#e8735a"
     }
    },
    {
     "value": 0.01,
     "itemStyle": {
      "color": "#3bb273"
     },
     "label": {
      "formatter": "0.11–\n0.12%",
      "color": "#3bb273"
     }
    }
   ]
  }
 ]
}
```

Yearly fee range

## <span style="color:var(--accent)">₹4.55 lakh lost to fees</span>

<!-- camera: behind top solid -->

```echarts
{
 "legend": {
  "top": 0,
  "textStyle": {
   "fontSize": 15
  },
  "data": [
   "Irish ETC 0.12%",
   "Indian fund 0.90%"
  ]
 },
 "grid": {
  "left": 10,
  "right": 20,
  "top": 50,
  "bottom": 10,
  "containLabel": true
 },
 "xAxis": {
  "type": "category",
  "boundaryGap": false,
  "axisTick": {
   "show": false
  },
  "axisLabel": {
   "fontSize": 15,
   "formatter": "Yr {value}",
   "interval": 9
  },
  "data": [
   0,
   1,
   2,
   3,
   4,
   5,
   6,
   7,
   8,
   9,
   10,
   11,
   12,
   13,
   14,
   15,
   16,
   17,
   18,
   19,
   20,
   21,
   22,
   23,
   24,
   25,
   26,
   27,
   28,
   29,
   30
  ]
 },
 "yAxis": {
  "type": "value",
  "show": false
 },
 "series": [
  {
   "name": "Irish ETC 0.12%",
   "type": "line",
   "smooth": true,
   "symbol": "none",
   "color": "#3bb273",
   "lineStyle": {
    "width": 5
   },
   "data": [
    1.0,
    1.11,
    1.24,
    1.37,
    1.53,
    1.7,
    1.89,
    2.1,
    2.33,
    2.59,
    2.88,
    3.2,
    3.56,
    3.96,
    4.4,
    4.89,
    5.43,
    6.04,
    6.72,
    7.46,
    8.3,
    9.22,
    10.25,
    11.4,
    12.67,
    14.08,
    15.66,
    17.4,
    19.34,
    21.5,
    {
     "value": 23.9,
     "symbol": "circle",
     "symbolSize": 12,
     "label": {
      "show": true,
      "position": "left",
      "fontSize": 22,
      "fontWeight": "bold",
      "formatter": "₹23.90L"
     }
    }
   ]
  },
  {
   "name": "Indian fund 0.90%",
   "type": "line",
   "smooth": true,
   "symbol": "none",
   "color": "#e8735a",
   "lineStyle": {
    "width": 5
   },
   "data": [
    1.0,
    1.1,
    1.22,
    1.34,
    1.48,
    1.64,
    1.81,
    2.0,
    2.2,
    2.43,
    2.68,
    2.96,
    3.27,
    3.61,
    3.99,
    4.4,
    4.86,
    5.36,
    5.92,
    6.53,
    7.21,
    7.96,
    8.78,
    9.69,
    10.7,
    11.81,
    13.04,
    14.39,
    15.88,
    17.53,
    {
     "value": 19.35,
     "symbol": "circle",
     "symbolSize": 12,
     "label": {
      "show": true,
      "position": "bottom",
      "fontSize": 22,
      "fontWeight": "bold",
      "formatter": "₹19.35L"
     }
    }
   ]
  }
 ]
}
```

₹1 lakh in gold · 30 years

## <span style="color:var(--accent)">My portfolio</span>

<!-- camera: behind top solid -->

```echarts
{
 "series": [
  {
   "type": "pie",
   "radius": [
    "40%",
    "70%"
   ],
   "center": [
    "50%",
    "52%"
   ],
   "label": {
    "fontSize": 18,
    "fontWeight": "bold",
    "formatter": "{b}\n{c}%",
    "lineHeight": 22
   },
   "data": [
    {
     "name": "India",
     "value": 45,
     "itemStyle": {
      "color": "#F97316"
     }
    },
    {
     "name": "Nasdaq 100",
     "value": 40,
     "itemStyle": {
      "color": "#2563EB"
     }
    },
    {
     "name": "Gold",
     "value": 10,
     "itemStyle": {
      "color": "#D4AF37"
     }
    },
    {
     "name": "Debt",
     "value": 5,
     "itemStyle": {
      "color": "#64748B"
     }
    }
   ]
  }
 ]
}
```

Not a recommendation

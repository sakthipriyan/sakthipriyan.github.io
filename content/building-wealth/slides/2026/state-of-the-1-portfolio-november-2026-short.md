---
title: "This Month I Bought Nasdaq 100, Not Nifty 50 — November 2026 (Short)"
engine: slidetake
accent: "#f5c542"          # the section's colour, so a recording matches the site
date: "2026-11-07"
draft: true
layout: "slides"
type: "slides"
summary: "A 30-second portrait cut of the November 2026 State of the 1 Portfolio: Nasdaq 100 and Nifty 50 swapped sides, so this month's money went to Nasdaq 100, after October's money went to Nifty 50. The full video has the rest."
js_tools:
  - gsap
wealth_tags:
  - Asset Allocation
  - Rebalancing
  - State Of The 1 Portfolio
# Slidetake: a 9:16 Short, the words over the camera
format: portrait
pip: behind top          # the opening slide over the camera (its words below); then the card on top, the camera below (solid)
duration: 30s             # a Short: about 8 seconds a slide
related:
  - "[Full video: State of the 1 Portfolio (November 2026)](https://sakthipriyan.com/building-wealth/videos/state-of-the-1-portfolio-returns-allocation-rebalancing-november-2026/)"
  - "[Slides: State of the 1 Portfolio (November 2026)](https://sakthipriyan.com/building-wealth/slides/2026/state-of-the-1-portfolio-november-2026/)"
  - "[Blog: State of the 1 Portfolio (November 2026)](https://sakthipriyan.com/building-wealth/blogs/state-of-the-1-portfolio-returns-allocation-rebalancing-november-2026/)"
---

# <span style="color:var(--accent)">This month I bought Nasdaq 100, not Nifty 50</span>

<!-- camera: behind bottom -->

State of the 1 Portfolio · November 2026

*Educational, not financial advice*

## <span style="color:var(--accent)">New money goes to what's below target</span>

<!-- camera: behind top solid -->

**October:** Nifty 50 was below, so I bought Nifty 50.

**November:** Nasdaq 100 is below, so I'm buying Nasdaq 100.

## <span style="color:var(--accent)">Rebalancing with new money</span>

<!-- camera: behind top solid -->

```echarts
{
 "title": [
  {
   "text": "Nifty 50  ·  target 20%",
   "left": 10,
   "top": 0,
   "textStyle": {
    "fontSize": 24,
    "color": "#f5c542"
   }
  }
 ],
 "grid": {
  "left": 50,
  "right": 50,
  "top": 60,
  "bottom": 10,
  "containLabel": true
 },
 "xAxis": {
  "type": "category",
  "data": [
   "Oct\nbefore",
   "Oct\nafter",
   "Nov\nbefore",
   "Nov\nafter"
  ],
  "boundaryGap": false,
  "axisTick": {
   "show": false
  },
  "axisLabel": {
   "fontSize": 16,
   "lineHeight": 22
  }
 },
 "yAxis": {
  "type": "value",
  "min": 17.5,
  "max": 22.5,
  "show": false
 },
 "series": [
  {
   "name": "Nifty 50",
   "type": "line",
   "xAxisIndex": 0,
   "yAxisIndex": 0,
   "color": "#f5c542",
   "data": [
    "18.76",
    "19.40",
    "20.77",
    "20.49"
   ],
   "lineStyle": {
    "width": 4
   },
   "symbol": "circle",
   "symbolSize": 12,
   "label": {
    "show": true,
    "position": "top",
    "fontSize": 20,
    "fontWeight": "bold",
    "formatter": "{c}%"
   },
   "markLine": {
    "symbol": "none",
    "silent": true,
    "lineStyle": {
     "type": "dashed",
     "width": 2,
     "color": "#888"
    },
    "label": {
     "show": false
    },
    "data": [
     {
      "yAxis": 20
     }
    ]
   },
   "markArea": {
    "silent": true,
    "itemStyle": {
     "color": "#f5c542",
     "opacity": 0.12
    },
    "label": {
     "position": "insideBottom",
     "fontSize": 18,
     "fontWeight": "bold",
     "color": "#f5c542"
    },
    "data": [
     [
      {
       "name": "bought 54.96%",
       "xAxis": "Oct\nbefore"
      },
      {
       "xAxis": "Oct\nafter"
      }
     ],
     [
      {
       "name": "bought 0%",
       "xAxis": "Nov\nbefore"
      },
      {
       "xAxis": "Nov\nafter"
      }
     ]
    ]
   }
  }
 ]
}
```

## <span style="color:var(--accent)">Rebalancing with new money</span>

<!-- camera: behind bottom solid -->

```echarts
{
 "title": [
  {
   "text": "Nasdaq 100  ·  target 40%",
   "left": 10,
   "top": 0,
   "textStyle": {
    "fontSize": 24,
    "color": "#6e9ef7"
   }
  }
 ],
 "grid": {
  "left": 50,
  "right": 50,
  "top": 60,
  "bottom": 10,
  "containLabel": true
 },
 "xAxis": {
  "type": "category",
  "data": [
   "Oct\nbefore",
   "Oct\nafter",
   "Nov\nbefore",
   "Nov\nafter"
  ],
  "boundaryGap": false,
  "axisTick": {
   "show": false
  },
  "axisLabel": {
   "fontSize": 16,
   "lineHeight": 22
  }
 },
 "yAxis": {
  "type": "value",
  "min": 37.5,
  "max": 42.5,
  "show": false
 },
 "series": [
  {
   "name": "Nasdaq 100",
   "type": "line",
   "xAxisIndex": 0,
   "yAxisIndex": 0,
   "color": "#6e9ef7",
   "data": [
    "41.89",
    "41.15",
    "39.59",
    "39.63"
   ],
   "lineStyle": {
    "width": 4
   },
   "symbol": "circle",
   "symbolSize": 12,
   "label": {
    "show": true,
    "position": "top",
    "fontSize": 20,
    "fontWeight": "bold",
    "formatter": "{c}%"
   },
   "markLine": {
    "symbol": "none",
    "silent": true,
    "lineStyle": {
     "type": "dashed",
     "width": 2,
     "color": "#888"
    },
    "label": {
     "show": false
    },
    "data": [
     {
      "yAxis": 40
     }
    ]
   },
   "markArea": {
    "silent": true,
    "itemStyle": {
     "color": "#6e9ef7",
     "opacity": 0.12
    },
    "label": {
     "position": "insideBottom",
     "fontSize": 18,
     "fontWeight": "bold",
     "color": "#6e9ef7"
    },
    "data": [
     [
      {
       "name": "bought 0%",
       "xAxis": "Oct\nbefore"
      },
      {
       "xAxis": "Oct\nafter"
      }
     ],
     [
      {
       "name": "bought 42.78%",
       "xAxis": "Nov\nbefore"
      },
      {
       "xAxis": "Nov\nafter"
      }
     ]
    ]
   }
  }
 ]
}
```

## <span style="color:var(--accent)">The full breakdown ↓</span>

<!-- camera: behind bottom solid -->

Returns, costs and the Irish ETF: in the full video.

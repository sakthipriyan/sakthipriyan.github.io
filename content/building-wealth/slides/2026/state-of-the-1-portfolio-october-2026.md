---
title: "State of the 1 Portfolio — October 2026"
engine: slidetake
date: "2026-10-25"
draft: false
layout: "slides"
type: "slides"
summary: "October 2026 State of the 1 Portfolio in a few slides: returns, drift, this month's drift-correcting investment and the allocation history."
js_tools:
  - gsap
  - echarts
wealth_tags:
  - Asset Allocation
  - Rebalancing
  - State Of The 1 Portfolio
# Traverse: recording and the publish pack (the reveal.js layout ignores these)
brand: sakthipriyan.com/building-wealth
pip: bottom-right
pip_size: 24%
camera: 24%, 40%, full, off
duration: 8m
timer: always
related:
  - "[Blog: State of the 1 Portfolio (October 2026)](https://sakthipriyan.com/building-wealth/blogs/st1p-october/)"
  - "[State of the 1 Portfolio (September 2026)](https://sakthipriyan.com/building-wealth/blogs/st1p-september/)"
  - "[Perpetual rebalancing](https://sakthipriyan.com/building-wealth/tags/perpetual-rebalancing/)"
  - "[RealValue Family SIP Allocator](https://sakthipriyan.com/building-wealth/tools/realvalue-family-sip-allocator/)"
---

<!-- camera: on, full, on -->

<h2 class="title-scramble">State of the 1 Portfolio</h2>
<h4 class="subtitle-fade2" style="color: var(--r-heading-color, var(--text))" data-gsap='{"from": {"opacity": 0, "y": 30}, "duration": 1, "delay": 2}'>📊 October 2026</h4>
<br/>
<h4 class="subtitle-fade" data-gsap='{"from": {"opacity": 0, "y": 30}, "duration": 1, "delay": 2.5}'>Returns, allocation and this month's rebalancing</h4>
<br/>

---

### Disclaimer
<!-- camera: off, on -->

|                    |                                                             |
|--------------------|-------------------------------------------------------------|
| **Personal Fit**   | Based on my experience & comfort                     |
| **Purpose**        | Educational — not financial advice                    |
| **Risk**           | Investing involves market and currency risk                     |
| **Returns**        | All figures in INR, currency movement included                     |
| **Responsibility** | Make decisions aligned with your goals                     |

---

### 📸 Snapshot

Global multi-asset passive: <strong>Indian mutual funds</strong> + <strong>Irish ETFs</strong>

| | Sep&nbsp;30&nbsp;EOD | Target | Last month |
|---|---:|---:|---:|
| **XIRR** | **16.92%** <span style="color:#ef4444">▼</span> |  | 18.76% |
| **Equity** | **83.59%** <span style="color:#22c55e">▲</span> | 85% | 82.77% |
| India equity | **41.70%** <span style="color:#ef4444">▼</span> | 45% | 43.30% |
| US equity | **41.89%** <span style="color:#22c55e">▲</span> | 40% | 39.47% |
| **Total drift** | **3.30%** <span style="color:#ef4444">▲</span> |  | 2.24% |
| **New investment** | **1.81%** <span style="color:#ef4444">▼</span> |  | 2.02% |

<p class="fragment fade-up"><strong>Nasdaq 100</strong> flipped from −0.53% to <strong>+1.89% overweight</strong><br/><strong>Nifty 50</strong> is now the largest underweight at −1.24%.</p>

---

### 📈 Performance

<div id="st1p-oct-performance" class="echarts-container" data-chart='{
 "title": [
  {
   "text": "1 Portfolio Performance",
   "left": "center",
   "top": 0,
   "textStyle": {
    "color": "#888",
    "fontSize": 16,
    "fontWeight": 600
   }
  },
  {
   "text": "Market Value",
   "left": "center",
   "top": "37%",
   "textStyle": {
    "fontSize": 15,
    "fontWeight": 600,
    "color": "#888"
   }
  },
  {
   "text": "Growth Share",
   "left": "center",
   "top": "57%",
   "textStyle": {
    "fontSize": 15,
    "fontWeight": 600,
    "color": "#888"
   }
  }
 ],
 "tooltip": {
  "trigger": "item"
 },
 "color": [
  "#2563EB",
  "#F97316",
  "#F59E0B",
  "#10B981",
  "#047857",
  "#64748B",
  "#D4AF37"
 ],
 "legend": {
  "bottom": 0,
  "left": "center",
  "orient": "horizontal",
  "data": [
   "Nasdaq 100",
   "Nifty 50",
   "Next 50",
   "Midcap 150",
   "Smallcap 250",
   "Debt",
   "Gold"
  ],
  "textStyle": {
   "color": "#888"
  }
 },
 "series": [
  {
   "name": "Growth Contribution",
   "type": "pie",
   "radius": [
    "36%",
    "58%"
   ],
   "center": [
    "50%",
    "52%"
   ],
   "startAngle": 180,
   "clockwise": false,
   "label": {
    "show": true,
    "position": "outside",
    "formatter": "{b} ({c}%)",
    "color": "#888"
   },
   "data": [
    {
     "name": "Nasdaq 100",
     "value": 65.81
    },
    {
     "name": "Nifty 50",
     "value": 0.74
    },
    {
     "name": "Next 50",
     "value": 2.58
    },
    {
     "name": "Midcap 150",
     "value": 1.81
    },
    {
     "name": "Smallcap 250",
     "value": 2.78
    },
    {
     "name": "Debt",
     "value": 3.82
    },
    {
     "name": "Gold",
     "value": 22.46
    },
    {
     "name": "__placeholder__",
     "value": 99.99,
     "itemStyle": {
      "color": "transparent"
     },
     "label": {
      "show": false
     },
     "tooltip": {
      "show": false
     },
     "labelLine": {
      "show": false
     }
    }
   ]
  },
  {
   "name": "Market Value Allocation",
   "type": "pie",
   "radius": [
    "36%",
    "58%"
   ],
   "center": [
    "50%",
    "48%"
   ],
   "startAngle": 180,
   "clockwise": true,
   "label": {
    "show": true,
    "position": "outside",
    "formatter": "{b} ({c}%)",
    "color": "#888"
   },
   "data": [
    {
     "name": "Nasdaq 100",
     "value": 41.89
    },
    {
     "name": "Nifty 50",
     "value": 18.76
    },
    {
     "name": "Next 50",
     "value": 9.22
    },
    {
     "name": "Midcap 150",
     "value": 9.12
    },
    {
     "name": "Smallcap 250",
     "value": 4.61
    },
    {
     "name": "Debt",
     "value": 5.75
    },
    {
     "name": "Gold",
     "value": 10.66
    },
    {
     "name": "__placeholder__",
     "value": 100.0,
     "itemStyle": {
      "color": "transparent"
     },
     "label": {
      "show": false
     },
     "tooltip": {
      "show": false
     },
     "labelLine": {
      "show": false
     }
    }
   ]
  }
 ]
}'></div>

--

### 📈 Performance / Drift

<div id="st1p-oct-drift" class="echarts-container" data-chart='{
 "title": {
  "text": "1 Portfolio Drift",
  "left": "center",
  "top": 0,
  "textStyle": {
   "color": "#888",
   "fontSize": 16,
   "fontWeight": 600
  }
 },
 "tooltip": {
  "trigger": "axis",
  "axisPointer": {
   "type": "shadow"
  }
 },
 "grid": {
  "left": "15%",
  "right": "15%",
  "bottom": "10%",
  "top": "16%",
  "containLabel": true
 },
 "xAxis": {
  "type": "value",
  "name": "Drift %",
  "nameLocation": "middle",
  "nameGap": 30,
  "nameTextStyle": {
   "color": "#888"
  },
  "axisLabel": {
   "color": "#888"
  },
  "splitLine": {
   "lineStyle": {
    "color": "#666"
   }
  }
 },
 "yAxis": {
  "type": "category",
  "data": [
   "Gold",
   "Debt",
   "Smallcap 250",
   "Midcap 150",
   "Next 50",
   "Nifty 50",
   "Nasdaq 100"
  ],
  "axisLabel": {
   "color": "#888"
  }
 },
 "series": [
  {
   "name": "Drift",
   "type": "bar",
   "label": {
    "show": true,
    "formatter": "{c}%",
    "color": "#888"
   },
   "data": [
    {
     "value": 0.66,
     "itemStyle": {
      "color": "#D4AF37"
     },
     "label": {
      "position": "left"
     }
    },
    {
     "value": 0.75,
     "itemStyle": {
      "color": "#64748B"
     },
     "label": {
      "position": "left"
     }
    },
    {
     "value": -0.39,
     "itemStyle": {
      "color": "#047857"
     },
     "label": {
      "position": "right"
     }
    },
    {
     "value": -0.88,
     "itemStyle": {
      "color": "#10B981"
     },
     "label": {
      "position": "right"
     }
    },
    {
     "value": -0.78,
     "itemStyle": {
      "color": "#F59E0B"
     },
     "label": {
      "position": "right"
     }
    },
    {
     "value": -1.24,
     "itemStyle": {
      "color": "#F97316"
     },
     "label": {
      "position": "right"
     }
    },
    {
     "value": 1.89,
     "itemStyle": {
      "color": "#2563EB"
     },
     "label": {
      "position": "left"
     }
    }
   ]
  }
 ]
}'></div>

--

### 📈 Performance / Observations

- <!-- .element: class="fragment fade-up" --> <strong>Nasdaq 100</strong> XIRR rose to <strong>34.38%</strong>; Nifty 50 fell to <strong>0.50%</strong>
- <!-- .element: class="fragment fade-up" --> <strong>Gold</strong> eased to 33.00% but still punches at <strong>2.11×</strong> its weight
- <!-- .element: class="fragment fade-up" --> Nasdaq 100 + Gold: <strong>52.55%</strong> of the portfolio, <strong>88.27%</strong> of the gains
- <!-- .element: class="fragment fade-up" --> Total drift widened from <strong>2.24%</strong> to <strong>3.30%</strong>

---

### 🎯 Monthly Investment

Using <strong>perpetual rebalancing</strong>

| Asset class | Pre drift | New invest | Post drift |
|---|---:|---:|---:|
| **Nasdaq 100** | +1.89% | 0.00% | +1.15% |
| **Nifty 50** | −1.24% | **54.96%** | −0.60% |
| **Next 50** | −0.78% | **19.84%** | −0.60% |
| **Midcap 150** | −0.88% | **25.20%** | −0.60% |
| **Smallcap 250** | −0.39% | 0.00% | −0.47% |
| **Debt** | +0.75% | 0.00% | +0.65% |
| **Gold** | +0.66% | 0.00% | +0.47% |
| **Total drift** | **3.30%** | **100%** | **2.27%** |

<p class="fragment fade-up">A <strong>1.81%</strong> top-up cuts drift by <strong>1.03%</strong>, filling the three biggest underweights to a <strong>−0.60%</strong> water level.</p>

--

### 🎯 Monthly Investment / Drift Correction

<div id="st1p-oct-correction" class="echarts-container" data-chart='{
 "title": {
  "text": "Drift Correction aka Monthly Investment",
  "left": "center",
  "textStyle": {
   "color": "#888"
  }
 },
 "tooltip": {
  "trigger": "axis",
  "axisPointer": {
   "type": "shadow"
  }
 },
 "legend": {
  "data": [
   "Pre Drift",
   "Post Drift",
   "Improvement",
   "Improvement (Evaporated)",
   "Worsening",
   "New Water Level"
  ],
  "bottom": 0,
  "textStyle": {
   "color": "#888"
  }
 },
 "grid": {
  "left": "3%",
  "right": "4%",
  "bottom": "15%",
  "containLabel": true
 },
 "xAxis": {
  "type": "category",
  "data": [
   "Nasdaq 100",
   "Nifty 50",
   "Next 50",
   "Midcap 150",
   "Smallcap 250",
   "Debt",
   "Gold"
  ],
  "axisLabel": {
   "interval": 0,
   "rotate": 30,
   "color": "#888"
  }
 },
 "yAxis": {
  "type": "value",
  "name": "Drift (%)",
  "min": -2.0,
  "max": 2.0,
  "axisLabel": {
   "formatter": "{value}%",
   "color": "#888"
  },
  "nameTextStyle": {
   "color": "#888"
  },
  "splitLine": {
   "lineStyle": {
    "color": "#666"
   }
  }
 },
 "series": [
  {
   "name": "Pre Drift",
   "type": "bar",
   "data": [],
   "itemStyle": {
    "color": "#3b82f6"
   }
  },
  {
   "name": "Post Drift",
   "type": "bar",
   "data": [],
   "itemStyle": {
    "color": "#1e40af"
   }
  },
  {
   "name": "Improvement",
   "type": "bar",
   "data": [],
   "itemStyle": {
    "color": "#22c55e"
   }
  },
  {
   "name": "Improvement (Evaporated)",
   "type": "bar",
   "data": [],
   "itemStyle": {
    "color": "#22c55e",
    "opacity": 0.4,
    "decal": {
     "symbol": "rect",
     "color": "rgba(0,0,0,0.2)",
     "dashArrayX": [
      1,
      0
     ],
     "dashArrayY": [
      2,
      4
     ],
     "rotation": 0.785
    }
   }
  },
  {
   "name": "Worsening",
   "type": "bar",
   "data": [],
   "itemStyle": {
    "color": "#ef4444",
    "opacity": 0.4,
    "decal": {
     "symbol": "rect",
     "color": "rgba(0,0,0,0.2)",
     "dashArrayX": [
      1,
      0
     ],
     "dashArrayY": [
      2,
      4
     ],
     "rotation": 0.785
    }
   }
  },
  {
   "name": "New Water Level",
   "type": "line",
   "data": [],
   "itemStyle": {
    "color": "#1e40af"
   },
   "lineStyle": {
    "type": "dashed",
    "color": "#1e40af",
    "width": 2
   },
   "markLine": {
    "symbol": "none",
    "silent": true,
    "label": {
     "show": false
    },
    "lineStyle": {
     "type": "dashed",
     "color": "#1e40af",
     "width": 2
    },
    "data": [
     {
      "yAxis": -0.6
     }
    ]
   }
  },
  {
   "name": "Empty",
   "type": "bar",
   "barWidth": "70%",
   "stack": "main",
   "data": [
    0,
    -0.6,
    -0.6,
    -0.6,
    -0.39,
    0,
    0
   ],
   "itemStyle": {
    "color": "transparent"
   },
   "tooltip": {
    "show": false
   }
  },
  {
   "name": "Neg Delta",
   "type": "bar",
   "barWidth": "70%",
   "stack": "main",
   "data": [
    0,
    {
     "value": -0.64,
     "itemStyle": {
      "color": "#22c55e"
     }
    },
    {
     "value": -0.18,
     "itemStyle": {
      "color": "#22c55e"
     }
    },
    {
     "value": -0.28,
     "itemStyle": {
      "color": "#22c55e"
     }
    },
    {
     "value": -0.08,
     "itemStyle": {
      "color": "#ef4444",
      "opacity": 0.4,
      "decal": {
       "symbol": "rect",
       "color": "rgba(0,0,0,0.2)",
       "dashArrayX": [
        1,
        0
       ],
       "dashArrayY": [
        2,
        4
       ],
       "rotation": 0.785
      }
     }
    },
    0,
    0
   ],
   "tooltip": {
    "show": false
   }
  },
  {
   "name": "Neg Base",
   "type": "bar",
   "barWidth": "70%",
   "stack": "main",
   "data": [
    {
     "value": -2.0,
     "itemStyle": {
      "color": "#1e40af"
     }
    },
    {
     "value": -0.76,
     "itemStyle": {
      "color": "#3b82f6"
     }
    },
    {
     "value": -1.22,
     "itemStyle": {
      "color": "#3b82f6"
     }
    },
    {
     "value": -1.12,
     "itemStyle": {
      "color": "#3b82f6"
     }
    },
    {
     "value": -1.53,
     "itemStyle": {
      "color": "#1e40af"
     }
    },
    {
     "value": -2.0,
     "itemStyle": {
      "color": "#1e40af"
     }
    },
    {
     "value": -2.0,
     "itemStyle": {
      "color": "#1e40af"
     }
    }
   ],
   "tooltip": {
    "show": false
   }
  },
  {
   "name": "Pos Base",
   "type": "bar",
   "barWidth": "70%",
   "stack": "main",
   "data": [
    {
     "value": 1.15,
     "itemStyle": {
      "color": "#1e40af"
     }
    },
    0,
    0,
    0,
    0,
    {
     "value": 0.65,
     "itemStyle": {
      "color": "#1e40af"
     }
    },
    {
     "value": 0.47,
     "itemStyle": {
      "color": "#1e40af"
     }
    }
   ],
   "tooltip": {
    "show": false
   }
  },
  {
   "name": "Pos Delta",
   "type": "bar",
   "barWidth": "70%",
   "stack": "main",
   "data": [
    {
     "value": 0.74,
     "itemStyle": {
      "color": "#22c55e",
      "opacity": 0.4,
      "decal": {
       "symbol": "rect",
       "color": "rgba(0,0,0,0.2)",
       "dashArrayX": [
        1,
        0
       ],
       "dashArrayY": [
        2,
        4
       ],
       "rotation": 0.785
      }
     }
    },
    0,
    0,
    0,
    0,
    {
     "value": 0.1,
     "itemStyle": {
      "color": "#22c55e",
      "opacity": 0.4,
      "decal": {
       "symbol": "rect",
       "color": "rgba(0,0,0,0.2)",
       "dashArrayX": [
        1,
        0
       ],
       "dashArrayY": [
        2,
        4
       ],
       "rotation": 0.785
      }
     }
    },
    {
     "value": 0.19,
     "itemStyle": {
      "color": "#22c55e",
      "opacity": 0.4,
      "decal": {
       "symbol": "rect",
       "color": "rgba(0,0,0,0.2)",
       "dashArrayX": [
        1,
        0
       ],
       "dashArrayY": [
        2,
        4
       ],
       "rotation": 0.785
      }
     }
    }
   ],
   "tooltip": {
    "show": false
   }
  },
  {
   "name": "Pre Drift",
   "type": "line",
   "data": [
    1.89,
    -1.24,
    -0.78,
    -0.88,
    -0.39,
    0.75,
    0.66
   ],
   "itemStyle": {
    "color": "#3b82f6"
   },
   "lineStyle": {
    "opacity": 0
   },
   "symbol": "none"
  },
  {
   "name": "Post Drift",
   "type": "line",
   "data": [
    1.15,
    -0.6,
    -0.6,
    -0.6,
    -0.47,
    0.65,
    0.47
   ],
   "itemStyle": {
    "color": "#1e40af"
   },
   "lineStyle": {
    "opacity": 0
   },
   "symbol": "none"
  },
  {
   "name": "Improvement",
   "type": "line",
   "data": [
    "-",
    0.64,
    0.18,
    0.28,
    "-",
    "-",
    "-"
   ],
   "itemStyle": {
    "color": "#22c55e"
   },
   "lineStyle": {
    "opacity": 0
   },
   "symbol": "none"
  },
  {
   "name": "Worsening",
   "type": "line",
   "data": [
    "-",
    "-",
    "-",
    "-",
    0.08,
    "-",
    "-"
   ],
   "itemStyle": {
    "color": "#ef4444"
   },
   "lineStyle": {
    "opacity": 0
   },
   "symbol": "none"
  }
 ]
}'></div>

---

### 🔁 Drift Correction History

<div id="st1p-oct-history" class="echarts-container" data-chart='{
 "title": {
  "text": "Historical Capital Allocation & Total Post Drift",
  "left": "center",
  "textStyle": {
   "color": "#888"
  }
 },
 "tooltip": {
  "trigger": "axis",
  "axisPointer": {
   "type": "shadow"
  }
 },
 "legend": {
  "bottom": 0,
  "textStyle": {
   "color": "#888"
  },
  "data": [
   "Nasdaq 100",
   "Nifty 50",
   "Next 50",
   "Midcap 150",
   "Smallcap 250",
   "Debt",
   "Gold",
   "Total Post Drift"
  ]
 },
 "grid": {
  "left": "3%",
  "right": "4%",
  "bottom": "15%",
  "containLabel": true
 },
 "xAxis": {
  "type": "category",
  "axisLabel": {
   "color": "#888"
  },
  "data": [
   "Apr 26",
   "May 26",
   "Jun 26",
   "Jul 26",
   "Aug 26",
   "Sep 26",
   "Oct 26"
  ]
 },
 "yAxis": [
  {
   "type": "value",
   "name": "Allocation %",
   "max": 100,
   "nameTextStyle": {
    "color": "#888"
   },
   "axisLabel": {
    "formatter": "{value}%",
    "color": "#888"
   },
   "splitLine": {
    "lineStyle": {
     "color": "#666"
    }
   }
  },
  {
   "type": "value",
   "name": "Total Drift %",
   "nameTextStyle": {
    "color": "#888"
   },
   "axisLabel": {
    "formatter": "{value}%",
    "color": "#888"
   },
   "splitLine": {
    "show": false
   }
  }
 ],
 "color": [
  "#2563EB",
  "#F97316",
  "#F59E0B",
  "#10B981",
  "#047857",
  "#64748B",
  "#D4AF37",
  "#E11D48"
 ],
 "series": [
  {
   "name": "Nasdaq 100",
   "type": "bar",
   "stack": "total",
   "data": [
    65.0,
    53.79,
    12.44,
    59.01,
    85.02,
    46.25,
    0.0
   ]
  },
  {
   "name": "Nifty 50",
   "type": "bar",
   "stack": "total",
   "data": [
    10.71,
    25.76,
    77.44,
    8.31,
    4.87,
    40.53,
    54.96
   ]
  },
  {
   "name": "Next 50",
   "type": "bar",
   "stack": "total",
   "data": [
    10.71,
    9.09,
    6.59,
    16.34,
    0.0,
    9.3,
    19.84
   ]
  },
  {
   "name": "Midcap 150",
   "type": "bar",
   "stack": "total",
   "data": [
    9.29,
    9.09,
    3.54,
    16.34,
    10.11,
    3.92,
    25.2
   ]
  },
  {
   "name": "Smallcap 250",
   "type": "bar",
   "stack": "total",
   "data": [
    4.29,
    2.27,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0
   ]
  },
  {
   "name": "Debt",
   "type": "bar",
   "stack": "total",
   "data": [
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0
   ]
  },
  {
   "name": "Gold",
   "type": "bar",
   "stack": "total",
   "data": [
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0
   ]
  },
  {
   "name": "Total Post Drift",
   "type": "line",
   "yAxisIndex": 1,
   "lineStyle": {
    "width": 3
   },
   "data": [
    4.89,
    3.67,
    2.76,
    1.6,
    1.68,
    1.9,
    2.27
   ]
  }
 ]
}'></div>

<p class="fragment fade-up">Not forecasts: the <strong>mechanical output</strong> of the rebalancing algorithm, month after month.</p>

---

### 💭 Reflections

- <!-- .element: class="fragment fade-up" --> <strong>100% domestic this month:</strong> no FX, no TCS, no live-market ETF buying. Simple.
- <!-- .element: class="fragment fade-up" --> <strong>Investment day:</strong> back to the <strong>first working day of the next month</strong>, not salary day
- <!-- .element: class="fragment fade-up" --> The goal: personal finance in <strong>under an hour, once a month</strong>

---

<!-- camera: on, full, on, off -->

<div>
<h3 data-gsap='{"from": {"opacity": 0, "y": -50, "scale": 1.5}, "duration": 0.8, "delay": 1.2}'>
<strong>Found this useful? 🙂</strong>
</h3>
</div>

<div style="font-size: 1.3em; margin: 30px 0;">
<p data-gsap='{"from": {"opacity": 0, "x": -100}, "duration": 0.6, "delay": 2}'>📝 Full report: State of the 1 Portfolio (October 2026)</p>
<p data-gsap='{"from": {"opacity": 0, "scale": 0}, "duration": 0.6, "delay": 2.6, "ease": "back.out(2)"}'>👍 Like · 💬 Comment · 🔄 Share · 📌 Subscribe</p>
</div>

<h3 data-gsap='{"from": {"opacity": 0, "scale": 3, "rotation": 360}, "duration": 1.5, "delay": 3.4, "ease": "elastic.out(1, 0.3)"}'>
<strong>✨ Thank You 🙏</strong>
</h3>

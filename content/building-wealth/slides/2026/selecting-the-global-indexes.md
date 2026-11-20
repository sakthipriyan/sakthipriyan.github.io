---
title: "Selecting the Global Indexes — Irish ETFs for Indian Investors"
engine: slidetake
accent: "#f5c542"          # the section's colour, so a recording matches the site
date: "2026-10-25"
draft: false
layout: "slides"
type: "slides"
summary: "Equity, debt and gold for Indian investors: which index, which fund and which provider for global equity, US equity and US Treasuries (Irish UCITS), gold (Swiss and Canadian funds), and how to combine them."
js_tools:
 - gsap
covers: selecting-the-global-indexes
wealth_tags:
  - Index Funds
  - ETF
  - Portfolio Construction
  - Global Investing
# Traverse: recording and the publish pack (the reveal.js layout ignores these)
brand: sakthipriyan.com/building-wealth
pip: bottom-right
pip_size: 24%
camera: 24%, 40%, full, off
duration: 20m
timer: always
related:
  - "[Book chapter: Selecting the Global Indexes](https://sakthipriyan.com/building-wealth/books/the-global-indian-investor/07-selecting-the-global-indexes/)"
  - "[Chapter 6: Irish ETFs vs US ETFs](https://sakthipriyan.com/building-wealth/books/the-global-indian-investor/06-what-to-buy-irish-etfs/)"
  - "[Chapter 8: Selecting the broker](https://sakthipriyan.com/building-wealth/books/the-global-indian-investor/08-selecting-the-broker/)"
  - "[RealValue SIP Engine](https://sakthipriyan.com/building-wealth/tools/realvalue-sip-engine/)"
---

<!-- camera: on, full, on -->

<h2 class="title-scramble">Selecting the Global Indexes</h2>
<h4 class="subtitle-fade2" style="color: var(--r-heading-color, var(--text))" data-gsap='{"from": {"opacity": 0, "y": 30}, "duration": 1, "delay": 2}'>📖 <a href="https://sakthipriyan.com/building-wealth/books/the-global-indian-investor/" target="_blank">The Global Indian Investor</a> · <a href="https://sakthipriyan.com/building-wealth/books/the-global-indian-investor/07-selecting-the-global-indexes/" target="_blank">Chapter 7</a></h4>
<br/>
<h4 class="subtitle-fade" data-gsap='{"from": {"opacity": 0, "y": 30}, "duration": 1, "delay": 2.5}'>Equity, Debt and Gold: which index, which fund, which provider</h4>
<h4 class="subtitle-fade2" data-gsap='{"from": {"opacity": 0, "y": 30}, "duration": 1, "delay": 3}'>Oct 25, 2026 · Updated Nov 19, 2026</h4>
<br/>
--

### Disclaimer
<!-- camera: off, on -->

|                    |                                                             |
|--------------------|-------------------------------------------------------------|
| **Personal Fit**   | Based on my experience & comfort                     |
| **Purpose**        | Educational — not financial advice                    |
| **Risk**           | Investing involves market and currency risk                     |
| **Rules**          | Verify tax/regulatory details with a professional                        |
| **Responsibility** | Make decisions aligned with your goals                     |

--

### Contents

<!-- camera: behind right solid -->

- <!-- .element: class="fragment fade-up" style="list-style:none" --> 🏗️ Index Providers: MSCI vs FTSE
- <!-- .element: class="fragment fade-up" style="list-style:none" --> 🌍 Global Equity ETFs
- <!-- .element: class="fragment fade-up" style="list-style:none" --> 🇺🇸 US Equity ETFs
- <!-- .element: class="fragment fade-up" style="list-style:none" --> 🛡️ US Treasury ETFs
- <!-- .element: class="fragment fade-up" style="list-style:none" --> 🥇 Gold
- <!-- .element: class="fragment fade-up" style="list-style:none" --> 🧩 Portfolio Construction

---

### 🏗️ Index Providers: The Blueprint

The **index provider** (MSCI, FTSE) is the architect; the **ETF provider** (iShares, Vanguard, …) is the builder.

| Family | Covers | Coverage | Global (DM + EM) | Developed (DM) | Emerging (EM) |
|---|---|---:|---|---|---|
| **MSCI** | Large + Mid | ~85% | MSCI ACWI | MSCI World | MSCI Emerging Markets |
| **MSCI IMI** | + Small | ~99% | MSCI ACWI IMI | MSCI World IMI* | MSCI EM IMI |
| **FTSE** | Large + Mid | ~90–95% | FTSE All-World | FTSE Developed | FTSE Emerging |
| **FTSE All Cap** | + Small | ~99% | FTSE Global All Cap | FTSE Developed All Cap* | FTSE Emerging All Cap* |

<small>Index providers publish many indexes, but ETFs exist only where there is demand: MSCI ACWI ex India exists, with no ETF tracking it.<br/>* No plain fund above $1B.</small>

---


### 🌍 Global Equity / Global Markets by Country

<!-- view: full -->

<small>Global (DM + EM) · Countries above 1%, the rest as Other · US bar broken to fit · One large fund per index · justETF · <strong>as of 30 Sep 2026</strong></small>

```echarts
{
 "title": [
  {
   "text": "FTSE All-World",
   "subtext": "Vanguard · LSE: VWRA",
   "left": "23.8%",
   "top": 0,
   "textAlign": "center",
   "textStyle": {
    "fontSize": 16,
    "fontWeight": "bold"
   },
   "subtextStyle": {
    "fontSize": 12
   }
  },
  {
   "text": "FTSE Global All Cap",
   "subtext": "Vanguard · LSE: VALU · EBS: VALL",
   "left": "44.6%",
   "top": 0,
   "textAlign": "center",
   "textStyle": {
    "fontSize": 16,
    "fontWeight": "bold"
   },
   "subtextStyle": {
    "fontSize": 12
   }
  },
  {
   "text": "MSCI ACWI",
   "subtext": "iShares · LSE: ISAC · EBS: SSAC",
   "left": "65.4%",
   "top": 0,
   "textAlign": "center",
   "textStyle": {
    "fontSize": 16,
    "fontWeight": "bold"
   },
   "subtextStyle": {
    "fontSize": 12
   }
  },
  {
   "text": "MSCI ACWI IMI",
   "subtext": "SPDR · LSE: IMID · EBS: IMID",
   "left": "86.2%",
   "top": 0,
   "textAlign": "center",
   "textStyle": {
    "fontSize": 16,
    "fontWeight": "bold"
   },
   "subtextStyle": {
    "fontSize": 12
   }
  }
 ],
 "tooltip": {
  "show": false
 },
 "grid": [
  {
   "left": "16.0%",
   "width": "19.6%",
   "top": 58,
   "bottom": 6
  },
  {
   "left": "36.8%",
   "width": "19.6%",
   "top": 58,
   "bottom": 6
  },
  {
   "left": "57.6%",
   "width": "19.6%",
   "top": 58,
   "bottom": 6
  },
  {
   "left": "78.4%",
   "width": "19.6%",
   "top": 58,
   "bottom": 6
  }
 ],
 "xAxis": [
  {
   "type": "value",
   "gridIndex": 0,
   "show": false,
   "max": 18.85
  },
  {
   "type": "value",
   "gridIndex": 1,
   "show": false,
   "max": 18.85
  },
  {
   "type": "value",
   "gridIndex": 2,
   "show": false,
   "max": 18.85
  },
  {
   "type": "value",
   "gridIndex": 3,
   "show": false,
   "max": 18.85
  }
 ],
 "yAxis": [
  {
   "type": "category",
   "gridIndex": 0,
   "inverse": true,
   "axisTick": {
    "show": false
   },
   "axisLine": {
    "show": false
   },
   "axisLabel": {
    "show": true,
    "fontSize": 14,
    "fontWeight": "bold",
    "margin": 10
   },
   "data": [
    "United States 🇺🇸",
    "Japan 🇯🇵",
    "Taiwan 🇹🇼",
    "United Kingdom 🇬🇧",
    "Canada 🇨🇦",
    "South Korea 🇰🇷",
    "China 🇨🇳",
    "Switzerland 🇨🇭",
    "Germany 🇩🇪",
    "France 🇫🇷",
    "Australia 🇦🇺",
    "India 🇮🇳",
    "Netherlands 🇳🇱",
    "Ireland 🇮🇪",
    "Other 🌐"
   ]
  },
  {
   "type": "category",
   "gridIndex": 1,
   "inverse": true,
   "axisTick": {
    "show": false
   },
   "axisLine": {
    "show": false
   },
   "axisLabel": {
    "show": false,
    "fontSize": 14,
    "fontWeight": "bold",
    "margin": 10
   },
   "data": [
    "United States 🇺🇸",
    "Japan 🇯🇵",
    "Taiwan 🇹🇼",
    "United Kingdom 🇬🇧",
    "Canada 🇨🇦",
    "South Korea 🇰🇷",
    "China 🇨🇳",
    "Switzerland 🇨🇭",
    "Germany 🇩🇪",
    "France 🇫🇷",
    "Australia 🇦🇺",
    "India 🇮🇳",
    "Netherlands 🇳🇱",
    "Ireland 🇮🇪",
    "Other 🌐"
   ]
  },
  {
   "type": "category",
   "gridIndex": 2,
   "inverse": true,
   "axisTick": {
    "show": false
   },
   "axisLine": {
    "show": false
   },
   "axisLabel": {
    "show": false,
    "fontSize": 14,
    "fontWeight": "bold",
    "margin": 10
   },
   "data": [
    "United States 🇺🇸",
    "Japan 🇯🇵",
    "Taiwan 🇹🇼",
    "United Kingdom 🇬🇧",
    "Canada 🇨🇦",
    "South Korea 🇰🇷",
    "China 🇨🇳",
    "Switzerland 🇨🇭",
    "Germany 🇩🇪",
    "France 🇫🇷",
    "Australia 🇦🇺",
    "India 🇮🇳",
    "Netherlands 🇳🇱",
    "Ireland 🇮🇪",
    "Other 🌐"
   ]
  },
  {
   "type": "category",
   "gridIndex": 3,
   "inverse": true,
   "axisTick": {
    "show": false
   },
   "axisLine": {
    "show": false
   },
   "axisLabel": {
    "show": false,
    "fontSize": 14,
    "fontWeight": "bold",
    "margin": 10
   },
   "data": [
    "United States 🇺🇸",
    "Japan 🇯🇵",
    "Taiwan 🇹🇼",
    "United Kingdom 🇬🇧",
    "Canada 🇨🇦",
    "South Korea 🇰🇷",
    "China 🇨🇳",
    "Switzerland 🇨🇭",
    "Germany 🇩🇪",
    "France 🇫🇷",
    "Australia 🇦🇺",
    "India 🇮🇳",
    "Netherlands 🇳🇱",
    "Ireland 🇮🇪",
    "Other 🌐"
   ]
  }
 ],
 "series": [
  {
   "type": "bar",
   "xAxisIndex": 0,
   "yAxisIndex": 0,
   "stack": "s0",
   "barWidth": "68%",
   "name": "FTSE All-World",
   "label": {
    "show": true,
    "position": "right",
    "fontSize": 13,
    "fontWeight": "bold",
    "formatter": "{c}%"
   },
   "data": [
    {
     "value": 8.06,
     "itemStyle": {
      "color": "#3987e5",
      "borderRadius": 0
     },
     "label": {
      "show": false
     }
    },
    {
     "value": 6.04,
     "itemStyle": {
      "color": "#d95926",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 3.53,
     "itemStyle": {
      "color": "#199e70",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 3.16,
     "itemStyle": {
      "color": "#c98500",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 2.84,
     "itemStyle": {
      "color": "#d55181",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 2.6,
     "itemStyle": {
      "color": "#0ca30c",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 2.44,
     "itemStyle": {
      "color": "#9085e9",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 2.18,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.75,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.74,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.5,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.5,
     "itemStyle": {
      "color": "#e66767",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.46,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 0,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     },
     "label": {
      "formatter": "<1%"
     }
    },
    {
     "value": 8.93,
     "itemStyle": {
      "color": "#43474d",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    }
   ]
  },
  {
   "type": "bar",
   "xAxisIndex": 0,
   "yAxisIndex": 0,
   "stack": "s0",
   "barWidth": "68%",
   "name": "FTSE All-World",
   "silent": true,
   "itemStyle": {
    "color": "rgba(57,135,229,0.18)",
    "decal": {
     "symbol": "rect",
     "symbolSize": 1,
     "dashArrayX": [
      1,
      0
     ],
     "dashArrayY": [
      2,
      4
     ],
     "rotation": -0.785,
     "color": "#3987e5"
    }
   },
   "label": {
    "show": false
   },
   "tooltip": {
    "show": false
   },
   "data": [
    {
     "value": 1.04
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    }
   ]
  },
  {
   "type": "bar",
   "xAxisIndex": 0,
   "yAxisIndex": 0,
   "stack": "s0",
   "barWidth": "68%",
   "name": "FTSE All-World",
   "label": {
    "show": false,
    "position": "right",
    "fontSize": 13,
    "fontWeight": "bold"
   },
   "data": [
    {
     "value": 3.8999999999999995,
     "itemStyle": {
      "color": "#3987e5",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     },
     "label": {
      "show": true,
      "formatter": "60.33%"
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    }
   ]
  },
  {
   "type": "bar",
   "xAxisIndex": 1,
   "yAxisIndex": 1,
   "stack": "s1",
   "barWidth": "68%",
   "name": "FTSE Global All Cap",
   "label": {
    "show": true,
    "position": "right",
    "fontSize": 13,
    "fontWeight": "bold",
    "formatter": "{c}%"
   },
   "data": [
    {
     "value": 8.06,
     "itemStyle": {
      "color": "#3987e5",
      "borderRadius": 0
     },
     "label": {
      "show": false
     }
    },
    {
     "value": 5.83,
     "itemStyle": {
      "color": "#d95926",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 3.36,
     "itemStyle": {
      "color": "#199e70",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 3.14,
     "itemStyle": {
      "color": "#c98500",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 2.81,
     "itemStyle": {
      "color": "#d55181",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 2.45,
     "itemStyle": {
      "color": "#0ca30c",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 2.3,
     "itemStyle": {
      "color": "#9085e9",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 2.05,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.6,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.63,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.45,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.54,
     "itemStyle": {
      "color": "#e66767",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.4,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 0,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     },
     "label": {
      "formatter": "<1%"
     }
    },
    {
     "value": 12.07,
     "itemStyle": {
      "color": "#43474d",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    }
   ]
  },
  {
   "type": "bar",
   "xAxisIndex": 1,
   "yAxisIndex": 1,
   "stack": "s1",
   "barWidth": "68%",
   "name": "FTSE Global All Cap",
   "silent": true,
   "itemStyle": {
    "color": "rgba(57,135,229,0.18)",
    "decal": {
     "symbol": "rect",
     "symbolSize": 1,
     "dashArrayX": [
      1,
      0
     ],
     "dashArrayY": [
      2,
      4
     ],
     "rotation": -0.785,
     "color": "#3987e5"
    }
   },
   "label": {
    "show": false
   },
   "tooltip": {
    "show": false
   },
   "data": [
    {
     "value": 1.04
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    }
   ]
  },
  {
   "type": "bar",
   "xAxisIndex": 1,
   "yAxisIndex": 1,
   "stack": "s1",
   "barWidth": "68%",
   "name": "FTSE Global All Cap",
   "label": {
    "show": false,
    "position": "right",
    "fontSize": 13,
    "fontWeight": "bold"
   },
   "data": [
    {
     "value": 3.8999999999999995,
     "itemStyle": {
      "color": "#3987e5",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     },
     "label": {
      "show": true,
      "formatter": "58.37%"
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    }
   ]
  },
  {
   "type": "bar",
   "xAxisIndex": 2,
   "yAxisIndex": 2,
   "stack": "s2",
   "barWidth": "68%",
   "name": "MSCI ACWI",
   "label": {
    "show": true,
    "position": "right",
    "fontSize": 13,
    "fontWeight": "bold",
    "formatter": "{c}%"
   },
   "data": [
    {
     "value": 8.06,
     "itemStyle": {
      "color": "#3987e5",
      "borderRadius": 0
     },
     "label": {
      "show": false
     }
    },
    {
     "value": 5.22,
     "itemStyle": {
      "color": "#d95926",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 3.44,
     "itemStyle": {
      "color": "#199e70",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 3.12,
     "itemStyle": {
      "color": "#c98500",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 2.86,
     "itemStyle": {
      "color": "#d55181",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 2.57,
     "itemStyle": {
      "color": "#0ca30c",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 2.11,
     "itemStyle": {
      "color": "#9085e9",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 2.21,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.81,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.76,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.34,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.25,
     "itemStyle": {
      "color": "#e66767",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.49,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.03,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 7.4,
     "itemStyle": {
      "color": "#43474d",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    }
   ]
  },
  {
   "type": "bar",
   "xAxisIndex": 2,
   "yAxisIndex": 2,
   "stack": "s2",
   "barWidth": "68%",
   "name": "MSCI ACWI",
   "silent": true,
   "itemStyle": {
    "color": "rgba(57,135,229,0.18)",
    "decal": {
     "symbol": "rect",
     "symbolSize": 1,
     "dashArrayX": [
      1,
      0
     ],
     "dashArrayY": [
      2,
      4
     ],
     "rotation": -0.785,
     "color": "#3987e5"
    }
   },
   "label": {
    "show": false
   },
   "tooltip": {
    "show": false
   },
   "data": [
    {
     "value": 1.04
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    }
   ]
  },
  {
   "type": "bar",
   "xAxisIndex": 2,
   "yAxisIndex": 2,
   "stack": "s2",
   "barWidth": "68%",
   "name": "MSCI ACWI",
   "label": {
    "show": false,
    "position": "right",
    "fontSize": 13,
    "fontWeight": "bold"
   },
   "data": [
    {
     "value": 3.8999999999999995,
     "itemStyle": {
      "color": "#3987e5",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     },
     "label": {
      "show": true,
      "formatter": "62.39%"
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    }
   ]
  },
  {
   "type": "bar",
   "xAxisIndex": 3,
   "yAxisIndex": 3,
   "stack": "s3",
   "barWidth": "68%",
   "name": "MSCI ACWI IMI",
   "label": {
    "show": true,
    "position": "right",
    "fontSize": 13,
    "fontWeight": "bold",
    "formatter": "{c}%"
   },
   "data": [
    {
     "value": 8.06,
     "itemStyle": {
      "color": "#3987e5",
      "borderRadius": 0
     },
     "label": {
      "show": false
     }
    },
    {
     "value": 5.83,
     "itemStyle": {
      "color": "#d95926",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 3.45,
     "itemStyle": {
      "color": "#199e70",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 3.28,
     "itemStyle": {
      "color": "#c98500",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 3.02,
     "itemStyle": {
      "color": "#d55181",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 2.5,
     "itemStyle": {
      "color": "#0ca30c",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.96,
     "itemStyle": {
      "color": "#9085e9",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 2.1,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.78,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.76,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.47,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.46,
     "itemStyle": {
      "color": "#e66767",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.47,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 0,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     },
     "label": {
      "formatter": "<1%"
     }
    },
    {
     "value": 8.31,
     "itemStyle": {
      "color": "#43474d",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    }
   ]
  },
  {
   "type": "bar",
   "xAxisIndex": 3,
   "yAxisIndex": 3,
   "stack": "s3",
   "barWidth": "68%",
   "name": "MSCI ACWI IMI",
   "silent": true,
   "itemStyle": {
    "color": "rgba(57,135,229,0.18)",
    "decal": {
     "symbol": "rect",
     "symbolSize": 1,
     "dashArrayX": [
      1,
      0
     ],
     "dashArrayY": [
      2,
      4
     ],
     "rotation": -0.785,
     "color": "#3987e5"
    }
   },
   "label": {
    "show": false
   },
   "tooltip": {
    "show": false
   },
   "data": [
    {
     "value": 1.04
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    },
    {
     "value": 0
    }
   ]
  },
  {
   "type": "bar",
   "xAxisIndex": 3,
   "yAxisIndex": 3,
   "stack": "s3",
   "barWidth": "68%",
   "name": "MSCI ACWI IMI",
   "label": {
    "show": false,
    "position": "right",
    "fontSize": 13,
    "fontWeight": "bold"
   },
   "data": [
    {
     "value": 3.8999999999999995,
     "itemStyle": {
      "color": "#3987e5",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     },
     "label": {
      "show": true,
      "formatter": "61.61%"
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    },
    {
     "value": 0,
     "label": {
      "show": false
     }
    }
   ]
  }
 ]
}
```

<p class="fragment fade-up">Global funds are already <strong>~60% US</strong>; India is only <strong>~1.5%</strong>.</p>

--

### How the Funds Were Picked

| | |
|---|---|
| **Domicile** | Ireland (UCITS), physically replicated |
| **Share class** | Accumulating, traded in **USD** |
| **Size** | AUM above **$1 billion** (liquidity, low closure risk) |
| **Gold** | Funds and trusts only (Swiss, Canadian), not debt-like ETCs |
| **Shortlist** | Top 3 by AUM and Top 3 by lowest TER |
| **Data** | justETF, 3rd week of **November 2026** |

--

### 🌍 Global Equity / One Fund for the World

Global Markets = Developed + Emerging (overlaps a little with your Indian equity)

```echarts
{
 "grid": {
  "left": 10,
  "right": 150,
  "top": 10,
  "bottom": 10,
  "containLabel": true
 },
 "xAxis": {
  "type": "value",
  "show": false,
  "max": 64.0
 },
 "yAxis": {
  "type": "category",
  "inverse": true,
  "axisTick": {
   "show": false
  },
  "axisLine": {
   "show": false
  },
  "axisLabel": {
   "rich": {
    "t": {
     "fontSize": 15,
     "fontWeight": "bold",
     "lineHeight": 19,
     "align": "right"
    },
    "k": {
     "fontSize": 12,
     "color": "#a1a1aa",
     "lineHeight": 15,
     "align": "right"
    }
   }
  },
  "data": [
   "{t|Vanguard · FTSE All-World}\n{k|LSE: VWRA}",
   "{t|iShares · MSCI ACWI}\n{k|LSE: ISAC · EBS: SSAC}",
   "{t|SPDR · MSCI ACWI}\n{k|LSE: ACWD}",
   "{t|SPDR · MSCI ACWI IMI}\n{k|LSE: IMID · EBS: IMID}",
   "{t|Vanguard · FTSE Global All Cap}\n{k|LSE: VALU · EBS: VALL}"
  ]
 },
 "series": [
  {
   "type": "bar",
   "barWidth": "62%",
   "label": {
    "show": true,
    "position": "right",
    "fontSize": 16,
    "fontWeight": "bold"
   },
   "data": [
    {
     "value": 62.71,
     "itemStyle": {
      "color": "#6e9ef7"
     },
     "label": {
      "formatter": "$62.7B · 0.14%"
     }
    },
    {
     "value": 34.71,
     "itemStyle": {
      "color": "#6e9ef7"
     },
     "label": {
      "formatter": "$34.7B · 0.20%"
     }
    },
    {
     "value": 21.16,
     "itemStyle": {
      "color": "#6e9ef7"
     },
     "label": {
      "formatter": "$21.2B · 0.12%"
     }
    },
    {
     "value": 9.46,
     "itemStyle": {
      "color": "#6e9ef7"
     },
     "label": {
      "formatter": "$9.5B · 0.17%"
     }
    },
    {
     "value": 4.98,
     "itemStyle": {
      "color": "#3bb273"
     },
     "label": {
      "formatter": "$5.0B · 0.07%"
     }
    }
   ]
  }
 ]
}
```

<small>Bar: fund size (AUM) · label: AUM · TER · <span style="color:#3bb273">green: lowest TER</span></small>

<p class="fragment fade-up">🆕 <strong>VALU</strong>: ~6,400 stocks, large to small cap, at <strong>0.07%</strong>. Launched Aug 2026, already ~$5B. And VWRA cut its TER from 0.19% to 0.14%.</p>

--

### 🌍 Global Equity / Developed Markets Only

No overlap with Indian equity: let your Indian portfolio stand in for EM.

```echarts
{
 "grid": {
  "left": 10,
  "right": 150,
  "top": 10,
  "bottom": 10,
  "containLabel": true
 },
 "xAxis": {
  "type": "value",
  "show": false,
  "max": 144.8
 },
 "yAxis": {
  "type": "category",
  "inverse": true,
  "axisTick": {
   "show": false
  },
  "axisLine": {
   "show": false
  },
  "axisLabel": {
   "rich": {
    "t": {
     "fontSize": 15,
     "fontWeight": "bold",
     "lineHeight": 19,
     "align": "right"
    },
    "k": {
     "fontSize": 12,
     "color": "#a1a1aa",
     "lineHeight": 15,
     "align": "right"
    }
   }
  },
  "data": [
   "{t|iShares · MSCI World}\n{k|LSE: IWDA · EBS: SWDA}",
   "{t|Xtrackers · MSCI World}\n{k|LSE: XDWD · EBS: XDWD}",
   "{t|SPDR · MSCI World}\n{k|LSE: SWRD · EBS: SWRD}",
   "{t|UBS · MSCI World}\n{k|LSE: WRDB · EBS: WRDUSW}",
   "{t|Invesco · MSCI World}\n{k|LSE: MXWO · EBS: MXWO}",
   "{t|Vanguard · FTSE Developed}\n{k|LSE: VHVE}"
  ]
 },
 "series": [
  {
   "type": "bar",
   "barWidth": "62%",
   "label": {
    "show": true,
    "position": "right",
    "fontSize": 16,
    "fontWeight": "bold"
   },
   "data": [
    {
     "value": 141.93,
     "itemStyle": {
      "color": "#6e9ef7"
     },
     "label": {
      "formatter": "$141.9B · 0.20%"
     }
    },
    {
     "value": 24.05,
     "itemStyle": {
      "color": "#6e9ef7"
     },
     "label": {
      "formatter": "$24.0B · 0.12%"
     }
    },
    {
     "value": 20.46,
     "itemStyle": {
      "color": "#6e9ef7"
     },
     "label": {
      "formatter": "$20.5B · 0.12%"
     }
    },
    {
     "value": 13.27,
     "itemStyle": {
      "color": "#6e9ef7"
     },
     "label": {
      "formatter": "$13.3B · 0.06%"
     }
    },
    {
     "value": 10.55,
     "itemStyle": {
      "color": "#3bb273"
     },
     "label": {
      "formatter": "$10.6B · 0.05%"
     }
    },
    {
     "value": 6.69,
     "itemStyle": {
      "color": "#6e9ef7"
     },
     "label": {
      "formatter": "$6.7B · 0.12%"
     }
    }
   ]
  }
 ]
}
```

<small>Bar: fund size (AUM) · label: AUM · TER · <span style="color:#3bb273">green: lowest TER</span></small>

--

### 🌍 Global Equity / Emerging Markets by Country

<!-- view: full -->

<small>Emerging Markets · Countries above 1%, the rest as Other · One large fund per index · justETF · <strong>as of 30 Sep 2026</strong></small>

```echarts
{
 "title": [
  {
   "text": "MSCI EM",
   "subtext": "iShares · LSE: IEMA · EBS: SEMA",
   "left": "27.3%",
   "top": 0,
   "textAlign": "center",
   "textStyle": {
    "fontSize": 16,
    "fontWeight": "bold"
   },
   "subtextStyle": {
    "fontSize": 12
   }
  },
  {
   "text": "MSCI EM IMI",
   "subtext": "iShares · LSE: EIMI · EBS: EIMI",
   "left": "54.9%",
   "top": 0,
   "textAlign": "center",
   "textStyle": {
    "fontSize": 16,
    "fontWeight": "bold"
   },
   "subtextStyle": {
    "fontSize": 12
   }
  },
  {
   "text": "FTSE Emerging",
   "subtext": "Vanguard · LSE: VFEA",
   "left": "82.6%",
   "top": 0,
   "textAlign": "center",
   "textStyle": {
    "fontSize": 16,
    "fontWeight": "bold"
   },
   "subtextStyle": {
    "fontSize": 12
   }
  }
 ],
 "tooltip": {
  "show": false
 },
 "grid": [
  {
   "left": "17.0%",
   "width": "25.7%",
   "top": 58,
   "bottom": 6
  },
  {
   "left": "44.7%",
   "width": "25.7%",
   "top": 58,
   "bottom": 6
  },
  {
   "left": "72.3%",
   "width": "25.7%",
   "top": 58,
   "bottom": 6
  }
 ],
 "xAxis": [
  {
   "type": "value",
   "gridIndex": 0,
   "show": false,
   "max": 48.96
  },
  {
   "type": "value",
   "gridIndex": 1,
   "show": false,
   "max": 48.96
  },
  {
   "type": "value",
   "gridIndex": 2,
   "show": false,
   "max": 48.96
  }
 ],
 "yAxis": [
  {
   "type": "category",
   "gridIndex": 0,
   "inverse": true,
   "axisTick": {
    "show": false
   },
   "axisLine": {
    "show": false
   },
   "axisLabel": {
    "show": true,
    "fontSize": 14,
    "fontWeight": "bold",
    "margin": 10
   },
   "data": [
    "Taiwan 🇹🇼",
    "China 🇨🇳",
    "South Korea 🇰🇷",
    "India 🇮🇳",
    "Brazil 🇧🇷",
    "South Africa 🇿🇦",
    "Saudi Arabia 🇸🇦",
    "Mexico 🇲🇽",
    "UAE 🇦🇪",
    "Malaysia 🇲🇾",
    "Thailand 🇹🇭",
    "Hong Kong 🇭🇰",
    "Poland 🇵🇱",
    "Other 🌐"
   ]
  },
  {
   "type": "category",
   "gridIndex": 1,
   "inverse": true,
   "axisTick": {
    "show": false
   },
   "axisLine": {
    "show": false
   },
   "axisLabel": {
    "show": false,
    "fontSize": 14,
    "fontWeight": "bold",
    "margin": 10
   },
   "data": [
    "Taiwan 🇹🇼",
    "China 🇨🇳",
    "South Korea 🇰🇷",
    "India 🇮🇳",
    "Brazil 🇧🇷",
    "South Africa 🇿🇦",
    "Saudi Arabia 🇸🇦",
    "Mexico 🇲🇽",
    "UAE 🇦🇪",
    "Malaysia 🇲🇾",
    "Thailand 🇹🇭",
    "Hong Kong 🇭🇰",
    "Poland 🇵🇱",
    "Other 🌐"
   ]
  },
  {
   "type": "category",
   "gridIndex": 2,
   "inverse": true,
   "axisTick": {
    "show": false
   },
   "axisLine": {
    "show": false
   },
   "axisLabel": {
    "show": false,
    "fontSize": 14,
    "fontWeight": "bold",
    "margin": 10
   },
   "data": [
    "Taiwan 🇹🇼",
    "China 🇨🇳",
    "South Korea 🇰🇷",
    "India 🇮🇳",
    "Brazil 🇧🇷",
    "South Africa 🇿🇦",
    "Saudi Arabia 🇸🇦",
    "Mexico 🇲🇽",
    "UAE 🇦🇪",
    "Malaysia 🇲🇾",
    "Thailand 🇹🇭",
    "Hong Kong 🇭🇰",
    "Poland 🇵🇱",
    "Other 🌐"
   ]
  }
 ],
 "series": [
  {
   "type": "bar",
   "xAxisIndex": 0,
   "yAxisIndex": 0,
   "stack": "s0",
   "barWidth": "68%",
   "name": "MSCI EM",
   "label": {
    "show": true,
    "position": "right",
    "fontSize": 13,
    "fontWeight": "bold",
    "formatter": "{c}%"
   },
   "data": [
    {
     "value": 28.71,
     "itemStyle": {
      "color": "#199e70",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 17.64,
     "itemStyle": {
      "color": "#9085e9",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 21.27,
     "itemStyle": {
      "color": "#0ca30c",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 10.56,
     "itemStyle": {
      "color": "#e66767",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 4.0,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 2.46,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 2.29,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.56,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.22,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 0,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     },
     "label": {
      "formatter": "<1%"
     }
    },
    {
     "value": 0,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     },
     "label": {
      "formatter": "<1%"
     }
    },
    {
     "value": 1.2,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.04,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 8.05,
     "itemStyle": {
      "color": "#43474d",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    }
   ]
  },
  {
   "type": "bar",
   "xAxisIndex": 1,
   "yAxisIndex": 1,
   "stack": "s1",
   "barWidth": "68%",
   "name": "MSCI EM IMI",
   "label": {
    "show": true,
    "position": "right",
    "fontSize": 13,
    "fontWeight": "bold",
    "formatter": "{c}%"
   },
   "data": [
    {
     "value": 28.63,
     "itemStyle": {
      "color": "#199e70",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 16.3,
     "itemStyle": {
      "color": "#9085e9",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 20.55,
     "itemStyle": {
      "color": "#0ca30c",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 11.75,
     "itemStyle": {
      "color": "#e66767",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 3.95,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 2.55,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 2.38,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.55,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.23,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.09,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.12,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.34,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.12,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 6.44,
     "itemStyle": {
      "color": "#43474d",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    }
   ]
  },
  {
   "type": "bar",
   "xAxisIndex": 2,
   "yAxisIndex": 2,
   "stack": "s2",
   "barWidth": "68%",
   "name": "FTSE Emerging",
   "label": {
    "show": true,
    "position": "right",
    "fontSize": 13,
    "fontWeight": "bold",
    "formatter": "{c}%"
   },
   "data": [
    {
     "value": 34.97,
     "itemStyle": {
      "color": "#199e70",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 24.09,
     "itemStyle": {
      "color": "#9085e9",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 0,
     "itemStyle": {
      "color": "#0ca30c",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     },
     "label": {
      "formatter": "0%"
     }
    },
    {
     "value": 14.9,
     "itemStyle": {
      "color": "#e66767",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 4.42,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 3.09,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 3.06,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 2.04,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.7,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.49,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.43,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 1.13,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    },
    {
     "value": 0,
     "itemStyle": {
      "color": "#6b7079",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     },
     "label": {
      "formatter": "0%"
     }
    },
    {
     "value": 7.68,
     "itemStyle": {
      "color": "#43474d",
      "borderRadius": [
       0,
       4,
       4,
       0
      ]
     }
    }
   ]
  }
 ]
}
```

<p class="fragment fade-up">South Korea is <strong>~21%</strong> of MSCI EM and <strong>absent</strong> from FTSE Emerging: never mix providers.</p>

--

### 🌍 Global Equity / Emerging Markets Only

For more EM beyond India (EM IMI holds ~11% India; Taiwan, China, South Korea weigh more).

```echarts
{
 "grid": {
  "left": 10,
  "right": 150,
  "top": 10,
  "bottom": 10,
  "containLabel": true
 },
 "xAxis": {
  "type": "value",
  "show": false,
  "max": 40.6
 },
 "yAxis": {
  "type": "category",
  "inverse": true,
  "axisTick": {
   "show": false
  },
  "axisLine": {
   "show": false
  },
  "axisLabel": {
   "rich": {
    "t": {
     "fontSize": 15,
     "fontWeight": "bold",
     "lineHeight": 19,
     "align": "right"
    },
    "k": {
     "fontSize": 12,
     "color": "#a1a1aa",
     "lineHeight": 15,
     "align": "right"
    }
   }
  },
  "data": [
   "{t|iShares · MSCI EM IMI}\n{k|LSE: EIMI · EBS: EIMI}",
   "{t|Xtrackers · MSCI EM}\n{k|LSE: XMME}",
   "{t|iShares · MSCI EM}\n{k|LSE: IEMA · EBS: SEMA}",
   "{t|Vanguard · FTSE Emerging}\n{k|LSE: VFEA}",
   "{t|SPDR · MSCI EM}\n{k|LSE: EMRD · EBS: EMRD}",
   "{t|HSBC · MSCI EM}\n{k|LSE: HEMA}"
  ]
 },
 "series": [
  {
   "type": "bar",
   "barWidth": "62%",
   "label": {
    "show": true,
    "position": "right",
    "fontSize": 16,
    "fontWeight": "bold"
   },
   "data": [
    {
     "value": 39.83,
     "itemStyle": {
      "color": "#6e9ef7"
     },
     "label": {
      "formatter": "$39.8B · 0.18%"
     }
    },
    {
     "value": 12.59,
     "itemStyle": {
      "color": "#6e9ef7"
     },
     "label": {
      "formatter": "$12.6B · 0.18%"
     }
    },
    {
     "value": 9.71,
     "itemStyle": {
      "color": "#6e9ef7"
     },
     "label": {
      "formatter": "$9.7B · 0.18%"
     }
    },
    {
     "value": 2.38,
     "itemStyle": {
      "color": "#6e9ef7"
     },
     "label": {
      "formatter": "$2.4B · 0.17%"
     }
    },
    {
     "value": 2.0,
     "itemStyle": {
      "color": "#6e9ef7"
     },
     "label": {
      "formatter": "$2.0B · 0.18%"
     }
    },
    {
     "value": 1.71,
     "itemStyle": {
      "color": "#3bb273"
     },
     "label": {
      "formatter": "$1.7B · 0.15%"
     }
    }
   ]
  }
 ]
}
```

<small>Bar: fund size (AUM) · label: AUM · TER · <span style="color:#3bb273">green: lowest TER</span></small>

--

### 🌍 Global Equity / How Much India?

<!-- view: full -->

<small>India's weight in each index · justETF · <strong>as of 30 Sep 2026</strong></small>


```echarts
{
 "legend": {
  "top": 0,
  "textStyle": {
   "fontSize": 15
  }
 },
 "grid": {
  "left": 10,
  "right": 20,
  "top": 40,
  "bottom": 10,
  "containLabel": true
 },
 "xAxis": {
  "type": "value",
  "show": false,
  "max": 100
 },
 "yAxis": {
  "type": "category",
  "inverse": true,
  "axisTick": {
   "show": false
  },
  "axisLine": {
   "show": false
  },
  "axisLabel": {
   "fontSize": 17,
   "fontWeight": "bold"
  },
  "data": [
   "MSCI ACWI",
   "MSCI ACWI IMI",
   "FTSE All-World",
   "FTSE Global All Cap",
   "MSCI EM",
   "MSCI EM IMI",
   "FTSE Emerging"
  ]
 },
 "series": [
  {
   "name": "India",
   "type": "bar",
   "stack": "s",
   "barWidth": 30,
   "color": "#e66767",
   "label": {
    "show": true,
    "position": "right",
    "distance": 6,
    "fontSize": 17,
    "fontWeight": "bold",
    "color": "#fff",
    "formatter": "India {c}%"
   },
   "data": [
    1.25,
    1.46,
    1.5,
    1.54,
    10.56,
    11.75,
    14.9
   ]
  },
  {
   "name": "Rest of the index",
   "type": "bar",
   "stack": "s",
   "color": "#64748B",
   "label": {
    "show": true,
    "position": "insideRight",
    "fontSize": 17,
    "fontWeight": "bold",
    "color": "#fff",
    "formatter": "{c}%"
   },
   "data": [
    98.75,
    98.54,
    98.5,
    98.46,
    89.44,
    88.25,
    85.1
   ]
  }
 ]
}
```


<p class="fragment fade-up">~1.5% of a global fund: <strong>little overlap</strong> with your Indian portfolio.</p>

---


### 🇺🇸 US Equity / Already Inside Global Funds

```echarts
{
 "legend": {
  "top": 0,
  "textStyle": {
   "fontSize": 15
  }
 },
 "grid": {
  "left": 10,
  "right": 20,
  "top": 40,
  "bottom": 10,
  "containLabel": true
 },
 "xAxis": {
  "type": "value",
  "show": false,
  "max": 100
 },
 "yAxis": {
  "type": "category",
  "inverse": true,
  "axisTick": {
   "show": false
  },
  "axisLine": {
   "show": false
  },
  "axisLabel": {
   "fontSize": 17,
   "fontWeight": "bold"
  },
  "data": [
   "MSCI World",
   "FTSE Developed",
   "MSCI ACWI",
   "FTSE All-World"
  ]
 },
 "series": [
  {
   "name": "US",
   "type": "bar",
   "stack": "s",
   "barWidth": 30,
   "color": "#2563EB",
   "label": {
    "show": true,
    "fontSize": 17,
    "fontWeight": "bold",
    "color": "#fff",
    "formatter": "US ~{c}%"
   },
   "data": [
    71,
    67,
    62,
    60
   ]
  },
  {
   "name": "Rest of the world",
   "type": "bar",
   "stack": "s",
   "color": "#64748B",
   "label": {
    "show": true,
    "fontSize": 17,
    "fontWeight": "bold",
    "color": "#fff",
    "formatter": "{c}%"
   },
   "data": [
    29,
    33,
    38,
    40
   ]
  }
 ]
}
```

<small>DM: MSCI World, FTSE Developed · Global: MSCI ACWI, FTSE All-World · justETF · <strong>as of 30 Sep 2026</strong></small>

Why hold the US separately?

- <!-- .element: class="fragment fade-up" --> Over- or underweight the US against market weights
- <!-- .element: class="fragment fade-up" --> More technology and growth exposure
- <!-- .element: class="fragment fade-up" --> Pair a World ex USA fund with a dedicated US allocation
- <!-- .element: class="fragment fade-up" --> A custom allocation for your risk and return expectations

--

### 🇺🇸 US Equity / Three Index Families

| Index | Companies | Focus | Coverage | Typical use |
|---|---:|---|---:|---|
| **MSCI USA** | ~600 | Large + Mid | ~85% | Broad US exposure |
| **S&P 500** | ~500 | Large | ~80% | Core US exposure |
| **Nasdaq 100** | ~100 | Large-cap growth | ~50% | Growth / tech tilt |

<p class="fragment fade-up">MSCI USA vs S&P 500 matters little. The real choice: <strong>the broad US market</strong> or a deliberate <strong>growth bet</strong> (Nasdaq 100).</p>

--

### 🇺🇸 US Equity / MSCI USA

```echarts
{
 "grid": {
  "left": 10,
  "right": 150,
  "top": 10,
  "bottom": 10,
  "containLabel": true
 },
 "xAxis": {
  "type": "value",
  "show": false,
  "max": 14.1
 },
 "yAxis": {
  "type": "category",
  "inverse": true,
  "axisTick": {
   "show": false
  },
  "axisLine": {
   "show": false
  },
  "axisLabel": {
   "rich": {
    "t": {
     "fontSize": 15,
     "fontWeight": "bold",
     "lineHeight": 19,
     "align": "right"
    },
    "k": {
     "fontSize": 12,
     "color": "#a1a1aa",
     "lineHeight": 15,
     "align": "right"
    }
   }
  },
  "data": [
   "{t|Xtrackers}\n{k|LSE: XD9U · EBS: XD9U}",
   "{t|iShares}\n{k|LSE: CSUS · EBS: CSUS}",
   "{t|Amundi}\n{k|XETRA: WEBL}",
   "{t|UBS}\n{k|LSE: 4UBB · EBS: USAUSW}"
  ]
 },
 "series": [
  {
   "type": "bar",
   "barWidth": "62%",
   "label": {
    "show": true,
    "position": "right",
    "fontSize": 16,
    "fontWeight": "bold"
   },
   "data": [
    {
     "value": 13.84,
     "itemStyle": {
      "color": "#3bb273"
     },
     "label": {
      "formatter": "$13.8B · 0.03%"
     }
    },
    {
     "value": 5.15,
     "itemStyle": {
      "color": "#3bb273"
     },
     "label": {
      "formatter": "$5.2B · 0.03%"
     }
    },
    {
     "value": 4.8,
     "itemStyle": {
      "color": "#3bb273"
     },
     "label": {
      "formatter": "$4.8B · 0.03%"
     }
    },
    {
     "value": 3.23,
     "itemStyle": {
      "color": "#3bb273"
     },
     "label": {
      "formatter": "$3.2B · 0.03%"
     }
    }
   ]
  }
 ]
}
```

<small>Bar: fund size (AUM) · label: AUM · TER · <span style="color:#3bb273">green: lowest TER</span></small>

--

### 🇺🇸 US Equity / S&P 500

```echarts
{
 "grid": {
  "left": 10,
  "right": 150,
  "top": 10,
  "bottom": 10,
  "containLabel": true
 },
 "xAxis": {
  "type": "value",
  "show": false,
  "max": 153.1
 },
 "yAxis": {
  "type": "category",
  "inverse": true,
  "axisTick": {
   "show": false
  },
  "axisLine": {
   "show": false
  },
  "axisLabel": {
   "rich": {
    "t": {
     "fontSize": 15,
     "fontWeight": "bold",
     "lineHeight": 19,
     "align": "right"
    },
    "k": {
     "fontSize": 12,
     "color": "#a1a1aa",
     "lineHeight": 15,
     "align": "right"
    }
   }
  },
  "data": [
   "{t|iShares}\n{k|LSE: CSPX · EBS: CSSPX}",
   "{t|Vanguard}\n{k|LSE: VUAA}",
   "{t|SPDR}\n{k|LSE: SPYL · EBS: SPYL}",
   "{t|Xtrackers}\n{k|LSE: XDPU}",
   "{t|UBS}\n{k|LSE: S5UU · EBS: SP5AU}"
  ]
 },
 "series": [
  {
   "type": "bar",
   "barWidth": "62%",
   "label": {
    "show": true,
    "position": "right",
    "fontSize": 16,
    "fontWeight": "bold"
   },
   "data": [
    {
     "value": 150.11,
     "itemStyle": {
      "color": "#6e9ef7"
     },
     "label": {
      "formatter": "$150.1B · 0.07%"
     }
    },
    {
     "value": 36.5,
     "itemStyle": {
      "color": "#6e9ef7"
     },
     "label": {
      "formatter": "$36.5B · 0.07%"
     }
    },
    {
     "value": 19.68,
     "itemStyle": {
      "color": "#3bb273"
     },
     "label": {
      "formatter": "$19.7B · 0.03%"
     }
    },
    {
     "value": 2.94,
     "itemStyle": {
      "color": "#3bb273"
     },
     "label": {
      "formatter": "$2.9B · 0.03%"
     }
    },
    {
     "value": 2.46,
     "itemStyle": {
      "color": "#3bb273"
     },
     "label": {
      "formatter": "$2.5B · 0.03%"
     }
    }
   ]
  }
 ]
}
```

<small>Bar: fund size (AUM) · label: AUM · TER · <span style="color:#3bb273">green: lowest TER</span></small>

--

### 🇺🇸 US Equity / Nasdaq 100

```echarts
{
 "grid": {
  "left": 10,
  "right": 150,
  "top": 10,
  "bottom": 10,
  "containLabel": true
 },
 "xAxis": {
  "type": "value",
  "show": false,
  "max": 28.3
 },
 "yAxis": {
  "type": "category",
  "inverse": true,
  "axisTick": {
   "show": false
  },
  "axisLine": {
   "show": false
  },
  "axisLabel": {
   "rich": {
    "t": {
     "fontSize": 15,
     "fontWeight": "bold",
     "lineHeight": 19,
     "align": "right"
    },
    "k": {
     "fontSize": 12,
     "color": "#a1a1aa",
     "lineHeight": 15,
     "align": "right"
    }
   }
  },
  "data": [
   "{t|iShares}\n{k|LSE: CNDX · EBS: CSNDX}",
   "{t|Invesco}\n{k|EBS: EQAC}",
   "{t|Xtrackers}\n{k|LSE: XNAS}",
   "{t|BNP Paribas}\n{k|LSE: ANAU · EBS: ANAU}"
  ]
 },
 "series": [
  {
   "type": "bar",
   "barWidth": "62%",
   "label": {
    "show": true,
    "position": "right",
    "fontSize": 16,
    "fontWeight": "bold"
   },
   "data": [
    {
     "value": 27.75,
     "itemStyle": {
      "color": "#6e9ef7"
     },
     "label": {
      "formatter": "$27.7B · 0.30%"
     }
    },
    {
     "value": 4.86,
     "itemStyle": {
      "color": "#6e9ef7"
     },
     "label": {
      "formatter": "$4.9B · 0.30%"
     }
    },
    {
     "value": 3.06,
     "itemStyle": {
      "color": "#6e9ef7"
     },
     "label": {
      "formatter": "$3.1B · 0.20%"
     }
    },
    {
     "value": 2.9,
     "itemStyle": {
      "color": "#3bb273"
     },
     "label": {
      "formatter": "$2.9B · 0.14%"
     }
    }
   ]
  }
 ]
}
```

<small>Bar: fund size (AUM) · label: AUM · TER · <span style="color:#3bb273">green: lowest TER</span></small>

<p class="fragment fade-up">MSCI USA and S&P 500: $10B+ funds at <strong>0.03%</strong>. Nasdaq 100 costs <strong>~5×</strong> more (cheapest 0.14%): a premium for concentrated growth.</p>

--

### 🇺🇸 US Equity / Irish vs US-Listed Fees

The lowest-TER fund on each side, same index

```echarts
{
 "legend": {
  "top": 0,
  "textStyle": {
   "fontSize": 16
  }
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
   "fontSize": 18,
   "fontWeight": "bold"
  },
  "data": [
   "MSCI ACWI",
   "MSCI World",
   "S&P 500",
   "Nasdaq-100"
  ]
 },
 "yAxis": {
  "type": "value",
  "show": false,
  "max": 0.38
 },
 "series": [
  {
   "name": "Cheapest US ETF",
   "type": "bar",
   "barGap": "15%",
   "color": "#e8735a",
   "label": {
    "show": true,
    "position": "top",
    "fontSize": 17,
    "fontWeight": "bold",
    "lineHeight": 22
   },
   "data": [
    {
     "value": 0.32,
     "label": {
      "formatter": "0.32%\nACWI"
     }
    },
    {
     "value": 0.24,
     "label": {
      "formatter": "0.24%\nURTH"
     }
    },
    {
     "value": 0.02,
     "label": {
      "formatter": "0.02%\nSPYM"
     }
    },
    {
     "value": 0.15,
     "label": {
      "formatter": "0.15%\nQQQM"
     }
    }
   ]
  },
  {
   "name": "Cheapest Irish UCITS Acc",
   "type": "bar",
   "color": "#3bb273",
   "label": {
    "show": true,
    "position": "top",
    "fontSize": 17,
    "fontWeight": "bold",
    "lineHeight": 22
   },
   "data": [
    {
     "value": 0.12,
     "label": {
      "formatter": "0.12%\nSPDR"
     }
    },
    {
     "value": 0.05,
     "label": {
      "formatter": "0.05%\nInvesco"
     }
    },
    {
     "value": 0.03,
     "label": {
      "formatter": "0.03%\nSPDR"
     }
    },
    {
     "value": 0.14,
     "label": {
      "formatter": "0.14%\nBNP"
     }
    }
   ]
  }
 ]
}
```

<p class="fragment fade-up">Within <strong>1 basis point</strong> on S&P 500 and Nasdaq-100, and <strong>cheaper</strong> on MSCI ACWI and MSCI World: going Irish costs nothing extra.</p>

<small>Irish and US TERs: November 2026</small>

---


### 🛡️ US Treasury ETFs

Debt is the **defensive** allocation: stability, liquidity and **dry powder** for rebalancing, not returns.

```echarts
{
 "grid": {
  "left": 10,
  "right": 150,
  "top": 10,
  "bottom": 10,
  "containLabel": true
 },
 "xAxis": {
  "type": "value",
  "show": false,
  "max": 21.0
 },
 "yAxis": {
  "type": "category",
  "inverse": true,
  "axisTick": {
   "show": false
  },
  "axisLine": {
   "show": false
  },
  "axisLabel": {
   "rich": {
    "t": {
     "fontSize": 15,
     "fontWeight": "bold",
     "lineHeight": 19,
     "align": "right"
    },
    "k": {
     "fontSize": 12,
     "color": "#a1a1aa",
     "lineHeight": 15,
     "align": "right"
    }
   }
  },
  "data": [
   "{t|iShares · 0-1yr}\n{k|LSE: IB01 · EBS: IB01}",
   "{t|iShares · 3-7yr}\n{k|LSE: CBU7 · EBS: CSBGU7}",
   "{t|iShares · 1-3yr}\n{k|LSE: IBTA}",
   "{t|iShares · 7-10yr}\n{k|LSE: CBU0 · EBS: CSBGU0}",
   "{t|iShares · 20+yr}\n{k|LSE: DTLA}",
   "{t|Vanguard · 0-1yr}\n{k|LSE: VDST · EBS: VDST}",
   "{t|Vanguard · all maturities}\n{k|LSE: VDTA}"
  ]
 },
 "series": [
  {
   "type": "bar",
   "barWidth": "62%",
   "label": {
    "show": true,
    "position": "right",
    "fontSize": 16,
    "fontWeight": "bold"
   },
   "data": [
    {
     "value": 20.61,
     "itemStyle": {
      "color": "#6e9ef7"
     },
     "label": {
      "formatter": "$20.6B · 0.07%"
     }
    },
    {
     "value": 8.1,
     "itemStyle": {
      "color": "#6e9ef7"
     },
     "label": {
      "formatter": "$8.1B · 0.07%"
     }
    },
    {
     "value": 7.7,
     "itemStyle": {
      "color": "#6e9ef7"
     },
     "label": {
      "formatter": "$7.7B · 0.07%"
     }
    },
    {
     "value": 5.04,
     "itemStyle": {
      "color": "#6e9ef7"
     },
     "label": {
      "formatter": "$5.0B · 0.07%"
     }
    },
    {
     "value": 3.39,
     "itemStyle": {
      "color": "#6e9ef7"
     },
     "label": {
      "formatter": "$3.4B · 0.07%"
     }
    },
    {
     "value": 2.69,
     "itemStyle": {
      "color": "#3bb273"
     },
     "label": {
      "formatter": "$2.7B · 0.05%"
     }
    },
    {
     "value": 1.61,
     "itemStyle": {
      "color": "#3bb273"
     },
     "label": {
      "formatter": "$1.6B · 0.05%"
     }
    }
   ]
  }
 ]
}
```

<small>Bar: fund size (AUM) · label: AUM · TER · <span style="color:#3bb273">green: lowest TER</span></small>

- <!-- .element: class="fragment fade-up" --> 7-10yr and 20+yr add <strong>interest-rate risk</strong>: stay at 0-1 year
- <!-- .element: class="fragment fade-up" --> Short Treasuries skip credit, duration, hedging and geopolitical risk

---

### 🥇 Gold / Why Hold It in USD?

<!-- camera: behind solid -->

- <!-- .element: class="fragment fade-up" --> Gold and equities both in USD: rebalance <strong>without converting INR</strong>
- <!-- .element: class="fragment fade-up" --> Equities fall, gold rises → sell gold, buy equities
- <!-- .element: class="fragment fade-up" --> Equities rally, gold lags → trim equities, add gold
- <!-- .element: class="fragment fade-up" --> Diversifier, crisis hedge, <strong>rebalancing buffer</strong>

--


### 🥇 Gold / Structure Decides the Tax

| Structure | You own | Tax in India (my reading) |
|---|---|---|
| **Irish Gold ETC** | A <b>debt note</b> backed by gold | Risk of <b>Section 50AA</b>: slab rate, any holding period |
| **Swiss gold ETF** | Units of a <b>fund</b> | Foreign ETF: <b>12.5% LTCG</b> after 24 months |
| **Canadian trust (PHYS)** | Units of a <b>trust</b> | Foreign ETF: <b>12.5% LTCG</b> after 24 months |

- <!-- .element: class="fragment fade-up" --> UCITS rules bar single-commodity funds, so Ireland only has ETCs
- <!-- .element: class="fragment fade-up" --> Swiss law allows real gold funds, traded in <strong>USD on SIX</strong>
- <!-- .element: class="fragment fade-up" --> Filter: fund or trust, USD, AUM above <strong>$1B</strong>

--

### 🥇 Gold / Swiss & Canadian Gold Funds

```echarts
{
 "grid": {
  "left": 10,
  "right": 150,
  "top": 10,
  "bottom": 10,
  "containLabel": true
 },
 "xAxis": {
  "type": "value",
  "show": false,
  "max": 16.0
 },
 "yAxis": {
  "type": "category",
  "inverse": true,
  "axisTick": {
   "show": false
  },
  "axisLine": {
   "show": false
  },
  "axisLabel": {
   "rich": {
    "t": {
     "fontSize": 15,
     "fontWeight": "bold",
     "lineHeight": 19,
     "align": "right"
    },
    "k": {
     "fontSize": 12,
     "color": "#a1a1aa",
     "lineHeight": 15,
     "align": "right"
    }
   }
  },
  "data": [
   "{t|Sprott PHYS · Canada}\n{k|NYSE Arca: PHYS}",
   "{t|UBS · Switzerland}\n{k|EBS: AUUSI}",
   "{t|Swisscanto · Switzerland}\n{k|EBS: ZGLDUS}",
   "{t|iShares · Switzerland}\n{k|EBS: CSGOLD}",
   "{t|Raiffeisen · Switzerland}\n{k|EBS: RGRTU}"
  ]
 },
 "series": [
  {
   "type": "bar",
   "barWidth": "62%",
   "label": {
    "show": true,
    "position": "right",
    "fontSize": 16,
    "fontWeight": "bold"
   },
   "data": [
    {
     "value": 15.64,
     "itemStyle": {
      "color": "#6e9ef7"
     },
     "label": {
      "formatter": "$15.6B · 0.39%"
     }
    },
    {
     "value": 5.47,
     "itemStyle": {
      "color": "#6e9ef7"
     },
     "label": {
      "formatter": "$5.5B · 0.23%"
     }
    },
    {
     "value": 4.51,
     "itemStyle": {
      "color": "#6e9ef7"
     },
     "label": {
      "formatter": "$4.5B · 0.40%"
     }
    },
    {
     "value": 1.5,
     "itemStyle": {
      "color": "#3bb273"
     },
     "label": {
      "formatter": "$1.5B · 0.19%"
     }
    },
    {
     "value": 1.01,
     "itemStyle": {
      "color": "#6e9ef7"
     },
     "label": {
      "formatter": "$1.0B · 0.29%"
     }
    }
   ]
  }
 ]
}
```

<small>Bar: fund size (AUM) · label: AUM · TER · <span style="color:#3bb273">green: lowest TER</span> · PHYS: Sep 30, 2026; others: justETF, Nov 2026</small>

<p class="fragment fade-up">My shortlist: <strong>CSGOLD</strong> for the lowest cost, <strong>PHYS</strong> for the largest pool of gold.</p>

--

### 🥇 Gold / TER: India vs Global

Yearly fee (TER) range of each option

```echarts
{
 "grid": {
  "left": 10,
  "right": 30,
  "top": 10,
  "bottom": 30,
  "containLabel": true
 },
 "xAxis": {
  "type": "value",
  "min": 0,
  "max": 1,
  "interval": 0.1,
  "axisLabel": {
   "fontSize": 15,
   "formatter": "{value}%"
  },
  "splitLine": {
   "lineStyle": {
    "type": "dashed",
    "opacity": 0.3
   }
  }
 },
 "yAxis": {
  "type": "category",
  "inverse": true,
  "axisTick": {
   "show": false
  },
  "axisLabel": {
   "fontSize": 17,
   "fontWeight": "bold"
  },
  "data": [
   "Indian Gold FoFs",
   "Indian Gold ETFs",
   "Global Gold Funds",
   "Irish Gold ETCs*"
  ]
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
    0.19,
    0.11
   ]
  },
  {
   "type": "bar",
   "stack": "t",
   "barWidth": 36,
   "label": {
    "show": true,
    "position": "inside",
    "fontSize": 17,
    "fontWeight": "bold",
    "color": "#fff"
   },
   "data": [
    {
     "value": 0.45,
     "itemStyle": {
      "color": "#e8735a"
     },
     "label": {
      "formatter": "0.45% – 0.90%"
     }
    },
    {
     "value": 0.51,
     "itemStyle": {
      "color": "#e8735a"
     },
     "label": {
      "formatter": "0.29% – 0.80%"
     }
    },
    {
     "value": 0.21,
     "itemStyle": {
      "color": "#3bb273"
     },
     "label": {
      "formatter": "0.19% – 0.40%"
     }
    },
    {
     "value": 0.01,
     "itemStyle": {
      "color": "#9aa5b1"
     },
     "label": {
      "position": "right",
      "color": "#9aa5b1",
      "formatter": "0.11% – 0.12%"
     }
    }
   ]
  }
 ]
}
```

<p class="fragment fade-up">Indian gold FoFs cost <strong>2.4× to 4.7×</strong> more than iShares Gold (CH) at 0.19%.</p>

<small>* Irish ETCs shown for reference: cheapest, but debt-tax risk</small>

--

### 🥇 Gold / Import Duty Distorts Indian Gold

Indian gold NAV = global price × USD/INR <strong>+ import duty</strong>

| When | Duty | Indian gold NAV |
|---|---|---|
| **July 2024** | 15% → 6% | Fell overnight, global gold flat |
| **May 2026** | 6% → 15% | Rose overnight, global gold flat |

- <!-- .element: class="fragment fade-up" --> Duty is <strong>policy risk, not return</strong>: buy at 15%, sell after a cut, and you lose
- <!-- .element: class="fragment fade-up" --> Global gold funds track the <strong>real international price</strong> in USD

--

### 🥇 Gold / TER Drag Over 30 Years

₹1 lakh lump sum · 7% gold (USD) + 4% USD/INR

```echarts
{
 "legend": {
  "top": 0,
  "textStyle": {
   "fontSize": 15
  }
 },
 "tooltip": {
  "trigger": "axis"
 },
 "grid": {
  "left": 10,
  "right": 30,
  "top": 40,
  "bottom": 30,
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
   "interval": 5
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
  "axisLabel": {
   "fontSize": 15,
   "formatter": "₹{value}L"
  },
  "splitLine": {
   "lineStyle": {
    "type": "dashed",
    "opacity": 0.3
   }
  }
 },
 "series": [
  {
   "name": "Global Gold Fund (0.19%)",
   "type": "line",
   "smooth": true,
   "symbol": "none",
   "color": "#3bb273",
   "lineStyle": {
    "width": 4
   },
   "data": [
    1.0,
    1.11,
    1.23,
    1.37,
    1.52,
    1.69,
    1.88,
    2.09,
    2.32,
    2.57,
    2.86,
    3.18,
    3.53,
    3.92,
    4.35,
    4.84,
    5.37,
    5.97,
    6.63,
    7.36,
    8.18,
    9.09,
    10.09,
    11.21,
    12.45,
    13.83,
    15.37,
    17.07,
    18.96,
    21.06,
    {
     "value": 23.39,
     "symbol": "circle",
     "symbolSize": 10,
     "label": {
      "show": true,
      "position": "left",
      "fontSize": 18,
      "fontWeight": "bold",
      "formatter": "₹23.39L"
     }
    }
   ]
  },
  {
   "name": "Indian Gold Fund (0.90%)",
   "type": "line",
   "smooth": true,
   "symbol": "none",
   "color": "#e8735a",
   "lineStyle": {
    "width": 4
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
     "symbolSize": 10,
     "label": {
      "show": true,
      "position": "bottom",
      "fontSize": 18,
      "fontWeight": "bold",
      "formatter": "₹19.35L"
     }
    }
   ]
  }
 ]
}
```

<p class="fragment fade-up"><strong>₹4.04 lakh (21%) more</strong> with a 0.19% Swiss gold fund, from structure alone, without the debt-tax risk of Irish ETCs.</p>

---


### 🧩 Portfolio Construction

| Portfolio | Developed | Emerging | In short |
|---|---|---|---|
| **GM** | Included | Included | One global fund (FTSE All-World / MSCI ACWI) |
| **DM + EM** | MSCI World / FTSE Developed | MSCI EM / FTSE Emerging | Full control of the weights |
| **DM + India** | MSCI World / FTSE Developed | India | India replaces EM |
| **USA + India** | MSCI USA / S&P 500 | India | Simple two-region |
| **Nasdaq 100 + India** | Nasdaq 100 | India | Concentrated growth |

<p class="fragment fade-up"><strong>Concentration ladder:</strong> GM → DM → MSCI USA → S&P 500 → Nasdaq 100. Fewer countries and companies at each step; more top-10 weight, technology and volatility.</p>

<p class="fragment fade-up"><strong>Equity</strong> for long-term growth · <strong>Gold</strong> as crisis hedge and rebalancing asset · <strong>Debt</strong> for stability and dry powder</p>

--

### 🧩 Portfolio Construction / My Allocation (2026-27)

**Concentrated diversification:** two growth engines, ~600 companies.

```echarts
{
 "series": [
  {
   "type": "pie",
   "radius": [
    "42%",
    "72%"
   ],
   "center": [
    "50%",
    "52%"
   ],
   "label": {
    "fontSize": 17,
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

<small>India: Nifty 50, Next 50, Midcap 150, Smallcap 250</small>

<p class="fragment fade-up"><strong>50% INR, 50% USD · 85% equity, 15% defensive.</strong> My own goals and conviction, not a recommendation.</p>

---

<!-- camera: on, full, on, off -->

<div>
<h3 data-gsap='{"from": {"opacity": 0, "y": -50, "scale": 1.5}, "duration": 0.8, "delay": 1.2}'>
<strong>Found this useful? 🙂</strong>
</h3>
</div>

<div style="font-size: 1.3em; margin: 30px 0;">
<p data-gsap='{"from": {"opacity": 0, "x": -100}, "duration": 0.6, "delay": 2}'>📖 <a href="https://sakthipriyan.com/building-wealth/books/the-global-indian-investor/" target="_blank">The Global Indian Investor</a> · <a href="https://sakthipriyan.com/building-wealth/books/the-global-indian-investor/07-selecting-the-global-indexes/" target="_blank">Chapter 7</a></p>
<p data-gsap='{"from": {"opacity": 0, "scale": 0}, "duration": 0.6, "delay": 2.6, "ease": "back.out(2)"}'>👍 Like · 💬 Comment · 🔄 Share · 📌 Subscribe <a href="https://www.youtube.com/channel/UC2XqaTqSPfLwgTSf5sIF_BQ" target="_blank">YouTube</a> | <a href="https://sakthipriyan.com/building-wealth/books/the-global-indian-investor/07-selecting-the-global-indexes/#subscribe" target="_blank">Digest</a></p>
</div>

<h3 data-gsap='{"from": {"opacity": 0, "scale": 3, "rotation": 360}, "duration": 1.5, "delay": 3.4, "ease": "elastic.out(1, 0.3)"}'>
<strong>✨ Thank You 🙏</strong>
</h3>

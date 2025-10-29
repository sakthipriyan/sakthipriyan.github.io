---
title: "Financial Tools"
date: "2025-10-02"
draft: false
layout: "slides"
type: "slides"
summary: "Quick overview of financial tools for building wealth"
bw_tags:
  - Building Wealth
  - Financial Tools
---

<section data-autoslide="2500">
  <small>sakthipriyan.com/building-wealth</small>
  <h2>Sakthi Priyan H</h2>
  <h2>Building Wealth</h2>
  <h4 class="fragment">presenting</h4>
</section>

<section data-autoslide="2500">
  <h2>Financial Tools</h2>
  <h3>Needed for Building Wealth</h3>
  <h4 class="fragment">Nov 02, 2025</h4>
</section>

---

### Disclaimer
<!-- .slide: data-autoslide="5000" -->
|  |  |
|---------------|----------------|
| **Personal Variation** | What works for me may not suit everyone. |
| **Educational Purpose** | For learning only, not financial advice. |
| **Investment Risk** | Values can rise or fall; capital may be lost. |
| **Regulatory Note** | Check local laws and tax rules before investing. |
| **Personal Responsibility** | Viewers are responsible for their own decisions. |

---

### Contents

1. Cash & Bank Accounts  
2. Insurance  
3. Market Investments  
4. Gold  
5. Real Assets  
6. Retirement  
7. Credit Cards & Loans
8. Summary  

---

### 1. Cash & Bank Accounts

**Purpose:** Liquidity and easy access 💧  

|  |  |  |
|------|--------------|---------|
| Bank Accounts | For salary credit, bill payments and daily expenses | 🟢&nbsp;Continue |
| Cash in Hand | Limited non-digital usage | 🟡&nbsp;Minimal |
| FD/RD | Used once; very tax inefficient | 🔴&nbsp;Exited |

> 💡 *Immediate liquidity and stability.*

---

### 2. Insurance

**Purpose:** Risk management, not returns 🛡️  

|  |  |  |
|------|--------------|---------|
| Medical | Covers hospitalization & health-related expenses | 🟢&nbsp;Continue |
| Term / Accident | Protects dependents in case of untimely demise | 🟢&nbsp;Continue |
| Vehicle | Mandatory for all vehicles | 🟢&nbsp;Continue |
| Home | Protects property & belongings | 🟡&nbsp;Optional |

> 💡 First line of defense for **Building Wealth.**

---

### 3. Market Investments

**Purpose:** 📈 Long-term growth, building wealth and diversification  

--

#### Equity Investments

|  |  |  |
|------|--------------|---------|
| Mutual Funds: Index | Low-cost, broad-market exposure | 🟢&nbsp;Continue |
| Mutual Funds: Active | Higher cost, inconsistent alpha | 🟡&nbsp;Paused |
| Demat Account | For direct equity and ETF holdings | 🟢&nbsp;Continue |
| US Equity | Global diversification via IBKR | 🟢&nbsp;Continue |
| Startup / Stock Options | High-risk, long-term potential | ⚠️&nbsp;High&nbsp;Risk |

--

#### Hybrid & Debt

|  |  |  |
|------|--------------|---------|
| Arbitrage Funds | Short-term parking for travel/medical corpus | 🟢&nbsp;Continue |
| Conservative Hybrid Funds | Used in the past; paused post-tax change | 🟡&nbsp;Paused |
| Debt Mutual Funds | Reduced benefit after Apr 2023 taxation | 🟡&nbsp;Paused |

> 📈 *Build wealth through disciplined, diversified, long-term investing.*

---

### 4. Gold

**Purpose:** Inflation hedge, diversification, and jewellery 💍  

|  |  |  |
|------|--------------|---------|
| Gold ETF | Preferred for future investments — low-cost, liquid | 🟢&nbsp;Planned |
| Gold Mutual Fund | Existing investment, held for diversification | 🟡&nbsp;Paused |
| Physical Gold | Minimal jewellery holding as required | 🟡&nbsp;Minimal |

> 💡 *Acts as a portfolio stabilizer.*

---

### 5. Real Assets

**Purpose:** Tangible assets for utility and lifestyle 🏠  

|  |  |  |
|------|--------------|---------|
| House | Primary residence with potential appreciation | 🟡&nbsp;Minimal |
| Vehicles | Utility, not investment; manage depreciation sensibly | 🟡&nbsp;Minimal |

> 💡 *Requires maintenance for functionality.*

---

### 6. Retirement

**Purpose:** Tax-efficient wealth building over decades ⏳  

|  |  |  |
|------|--------------|---------|
| PPF | Long-term, government-backed, tax-efficient savings | 🟢&nbsp;Maximum |
| EPF | Mandatory for salaried; offers tax-free compounding | 🟡&nbsp;Minimum |
| NPS | Limited flexibility and withdrawal constraints | 🟡&nbsp;Paused |

> 💡 *Compounding with time and discipline.*

---

### 7. Credit Cards & Loans

**Purpose:** Smart leverage and cash-flow management 💳  

|  |  |  |
|------|--------------|---------|
| Credit Cards | Use responsibly for rewards and short-term credit | 🟢&nbsp;Continue |
| Loans | Avoid for consumption; consider only for appreciating assets or true emergencies | 🟡&nbsp;Minimal |

> 💡 *Use credit but, don’t let it use you.*

---

### 8. Summary
#### 🟢 Core financial tools 
```dot
digraph FinancialTools {
  rankdir=TB;
  graph [fontsize=12, fontname="Arial"];
  node [shape=box, style="rounded,filled", fontname="Arial", fontsize=11, fillcolor="#ffffff"];
  edge [color="#666666"];

  /* Central Node */
  core [label="🏦 Core Financial Tools", shape=box, style="filled", fillcolor="#f7f7f7", fontsize=13];

  /* Categories */
  liquid [label="💧 Liquid", fillcolor="#eaf6ff"];
  insurance [label="🛡️ Insurance", fillcolor="#effaf0"];
  market [label="📈 Market Investments", fillcolor="#fff4e6"];
  retirement [label="🧱 Retirement", fillcolor="#f6efff"];
  credit [label="💳 Credit", fillcolor="#f0fbfb"];

  /* Core Connections */
  core -> liquid;
  core -> insurance;
  core -> market;
  core -> retirement;
  core -> credit;

  /* Liquid Subnodes */
  cash [label="Cash"];
  bank [label="Bank Accounts"];
  liquid -> cash;
  liquid -> bank;

  /* Insurance Subnodes */
  medical [label="Medical"];
  term [label="Term / Accident"];
  vehicle [label="Vehicle"];
  insurance -> medical;
  insurance -> term;
  insurance -> vehicle;

  /* Market Subnodes */
  index [label="Index Fund"];
  index_in [label="India"];
  index_us [label="US"];
  market -> index;
  index -> index_in;
  index -> index_us;

  arbitrage [label="Arbitrage Fund"];
  gold [label="Gold ETF"];
  market -> arbitrage;
  market -> gold;

  /* Retirement Subnodes */
  ppf [label="PPF"];
  retirement -> ppf;

  /* Credit Subnodes */
  creditcard [label="Credit Cards"];
  credit -> creditcard;
}

```

---

<section data-autoslide="1000">
  <h2>Sakthi Priyan H</h2>
  <h2>Building Wealth</h2>
  <h4 class="fragment" data-fragment-index="1">Nice! You watched till the end 🎉</h4><br/><br/>
  <span class="fragment" data-fragment-index="2">Found this helpful? 💡</span><br/><br/>
  <span class="fragment" data-fragment-index="3">
    👍 Like & 💬 Share with friends & family!<br/>
    📌 Subscribe for more videos.
  </span><br/>
</section>

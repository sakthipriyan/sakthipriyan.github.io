---
title: "Managing Money Flows"
date: "2025-10-19"
draft: false
layout: "slides"
type: "slides"
summary: "Manage money flow via Bank Accounts, Credit Cards & Mutual Funds"
bw_tags:
  - Money Flow 
  - Building Block
---


<section data-autoslide="2500">
  <h2>Sakthi Priyan H</h2>
  <h2>Building Wealth</h2>
  <h4 class="fragment">presenting</h4>
</section>
<section data-autoslide="2500">
  <h2>Managing Money Flows</h2> via <h3> Bank Accounts, Credit Cards <br/>& Mutual Funds</h3>
  <h4 class="fragment">Oct 19, 2025</h4>
</section>

---

### Disclaimer
<!-- .slide: data-autoslide="5000" -->
|  | |
|---------------|----------------|
| **Personal Variation** | What works for me may not suit everyone. |
| **Educational Purpose** | For learning only, not financial advice. |
| **Investment Risk** | Values can rise or fall; capital may be lost. |
| **Regulatory Note** | Check local laws and tax rules before investing. |
| **Personal Responsibility** | Viewers are responsible for their own decisions             |

---

#### Contents

1. The Core Idea
2. Investments
3. Living Expenses
4. Medical Expenses
5. Travel Spends
6. Key Takeaways 

---

## 1. The Core Idea  

> Money separated by **purpose**, **budgeted** yearly & **allocated** monthly.  
> Each bank account or credit card serves a specific purpose.  

--

### My Bank Accounts  
| 🏦 **Account Type** | 💡 **Purpose** |
|----------------------|------------------------|
| 💰 **Income** | Where salary or income lands |
| 📈 **Investment** | For long-term wealth building  |
| 🧾 **Expense** | For all regular bills and daily expenses |
| 🏥 **Medical** | For health-related expenses |
| ✈️ **Travel** | For trips, vacations and experiences |
--

### My Credit Cards
| 💳 **Credit Card** | 💡 **Purpose** |
|--------------------|----------------------|
| 🧾 **Expense** | General Expenses and Jewellery |
| 🍔 **Food** | Food/Quick commerce |
| 🛒 **Online** | Exclusive for Online purchases |
| 🏥 **Medical** | Exclusive for Medical Expenses |
| 🌏 **Travel** | Domestic/International travel spends |

---

## 2. 📈 Investments
- Monthly flow from Salary Account to Investment Account
- Investment Account to Mutual Funds, International ETFs, Gold Jewellery Scheme
- Mutual Funds cover Equity, Debt and Gold funds
- Gold Scheme routed via Expense Credit Card for rewards

--
### Investment Flow

```dot
digraph InvestmentFlow {
  rankdir=TB; // top-to-bottom
  bgcolor=transparent;
  splines=true;
  overlap=false;

  node [shape=rectangle, style="rounded,filled", fontname="Inter", fontsize=12, fillcolor="#f7fbff"];
  edge [arrowsize=0.9, fontname="Inter", fontsize=10, color="#2b7cff"];

  // --- Bank Accounts ---
  Salary [label="💼 Salary Account", shape=folder, fillcolor="#e8f3ff"];
  Investment [label="📈 Investment Account", shape=folder, fillcolor="#e6f7ff"];

  // --- Mutual Funds and Categories ---
  MutualFunds [label="📊 Mutual Funds", shape=folder, fillcolor="#e6fff0"];
  INEquity [label="🇮🇳 Indian Equity Index Funds", shape=folder, fillcolor="#f0fff0"];
  DebtMF [label="💰 Debt / Arbitrage Funds", shape=folder, fillcolor="#f0fff0"];

  // --- International Investments ---
  IntlBroker [label="🌍 International Broker Account", shape=folder, fillcolor="#fff4e6"];
  USEquity [label="🇺🇸 US Equity (NASDAQ 100)", shape=folder, fillcolor="#fff7e6"];

  // --- Credit Card Path ---
  CreditCard [label="💳 Expense Credit Card", shape=folder, fillcolor="#e6f7ff"];

  // --- Gold Cluster ---
  subgraph cluster_gold {
    label="🏆 Gold Investments";
    style="rounded,dashed";
    color="#ffd700";
    fontcolor="#c09000";
    fontsize=13;
    fontname="Inter";

    GoldMF [label="🏅 Gold Mutual Fund", shape=folder, fillcolor="#fffbe6"];
    GoldScheme [label="👑 Gold Jewellery Scheme", shape=folder, fillcolor="#fff4cc"];
  }

  // --- Flows ---
  Salary -> Investment [label=" Monthly allocation"];
  Investment -> MutualFunds [label=" Mutual Fund purchases"];
  MutualFunds -> INEquity [label="Equity"];
  MutualFunds -> DebtMF [label="Debt"];
  MutualFunds -> GoldMF [label=" Digital Gold"];

  Investment -> IntlBroker [label="INR to USD"];
  IntlBroker -> USEquity [label=" Buy ETFs"];

  Investment -> CreditCard [label=" Credit Card Bill"];
  CreditCard -> GoldScheme [label=" Physical Gold"];
}
```

---
## 3. 🧾 Living Expenses
- Covers all expenses except Medical and Travel
- Using Expense Account and various Credit Cards
- Reserve allocated within Salary Account for yearly expenses
- Relatively less complex one without a Mutual Fund

--
### Expense Flow

```dot
digraph ExpensesFlow {
  rankdir=TB; // top-to-bottom layout
  bgcolor=transparent;
  splines=true;
  overlap=false;

  node [shape=rectangle, style="rounded,filled", fontname="Inter", fontsize=12, fillcolor="#f7fbff"];
  edge [arrowsize=0.9, fontname="Inter", fontsize=10, color="#2b7cff"];

  // --- Bank Accounts ---
  Salary [label="💼 Salary Account", shape=folder, fillcolor="#e8f3ff"];
  ExpenseAccount [label="🧾 Expense Account", shape=folder, fillcolor="#e6f7ff"];
  Expenses [label="💰 Expenses", shape=folder, fillcolor="#f0fff0"];

  // --- Credit Cards Cluster ---
  subgraph cluster_credit_cards {
    label="💳 Credit Cards";
    style="rounded,dashed";
    color="#ffa500";
    fontcolor="#cc6600";
    fontsize=13;
    fontname="Inter";

    FoodCard [label="🍔 Food Credit Card", shape=folder, fillcolor="#fff4e6"];
    OnlineCard [label="🛒 Online Credit Card", shape=folder, fillcolor="#fff4e6"];
    GeneralCard [label="💳 Expense Credit Card", shape=folder, fillcolor="#fff4e6"];
  }

  // --- Flows ---
  Salary -> ExpenseAccount [label="Monthly Allocation"];
  Salary -> ExpenseAccount [label="Yearly Allocation", style=dashed];

  ExpenseAccount -> Expenses [label="UPI"];
  
  ExpenseAccount -> FoodCard [label="Credit Card Bill"];
  ExpenseAccount -> OnlineCard [label="Credit Card Bill"];
  ExpenseAccount -> GeneralCard [label="Credit Card Bill"];

  FoodCard -> Expenses [label="Credit Card"];
  OnlineCard -> Expenses [label="Credit Card"];
  GeneralCard -> Expenses [label="Credit Card"];
}
```

---

## 4. 🏥 Medical Expenses
- Upfront allocate for monthly/planned medical expenses
- Keeping it separate to ensure immediate availability
- Using both Medical Account and Medical Credit Card
- Hospitalizations covered by insurance and   
  funded by Medical Fund/Emergency Fund

--
### Medical Flow

```dot
digraph MedicalFlow {
  rankdir=TB; // top-to-bottom layout
  bgcolor=transparent;
  splines=true;
  overlap=false;

  node [shape=rectangle, style="rounded,filled", fontname="Inter", fontsize=12, fillcolor="#f7fbff"];
  edge [arrowsize=0.9, fontname="Inter", fontsize=10, color="#2b7cff"];

  // --- Bank & Investment Accounts ---
  Salary [label="💼 Salary Account", shape=folder, fillcolor="#e8f3ff"];
  Investment [label="📈 Investment Account", shape=folder, fillcolor="#e6f7ff"];
  Medical [label="🏥 Medical Account", shape=folder, fillcolor="#e6f7ff"];

  // --- Medical Mutual Funds Cluster ---
  subgraph cluster_medical_funds {
    label="Mutual Funds";
    style="rounded,dashed";
    color="#66cdaa";
    fontcolor="#2f6655";
    fontsize=13;
    fontname="Inter";

    MedFund [label="💊 Medical Fund\n(Arbitrage)", shape=folder, fillcolor="#f0fff0"];
    Emergency [label="🚨 Emergency Fund\n(Liquid, Hybrid)", shape=folder, fillcolor="#fff4e6"];
  }

  // --- Credit Cards & Expenses ---
  MedCard [label="💳 Medical Credit Card", shape=folder, fillcolor="#e6f7ff"];
  MedExpenses [label="🧾 Medical Expenses", shape=folder, fillcolor="#f0fff0"];
  Hospital [label="🏨 Hospitalizations", shape=folder, fillcolor="#fff7e6"];

  // --- Insurance ---
  Insurance [label="🩺 Health Insurance", shape=folder, fillcolor="#e6fff0"];

  // --- Flows ---
  Salary -> Medical [label=" Monthly allocation"];
  Salary -> Investment [label=" Planned allocation"];
  Investment -> MedFund [label=" Invest"];
  MedFund -> Investment [label=" Redeem"];

  Medical -> MedCard [label="Credit Card Bill"];
  Medical -> MedExpenses [label="UPI"];
  MedCard -> MedExpenses [label="Credit Card"];
  MedCard -> Hospital [label="Emergency Spends"];

  Insurance -> Hospital [label=" Coverage"];
  Emergency -> Investment [label=" Redeem on unplanned"];
  Investment -> Medical [label="Hospitalizations/Top ups"];
}

```

---

## 5. ✈️ Travel Spends
- Covers domestic/international trips
- Travel budgeted yearly & allocated monthly
- Expenses via bank account + credit card
- Backed by **Arbitrage Fund**

--

### Travel Flow

```dot
digraph InvestmentTravelFlow {
  rankdir=TB; // top-to-bottom
  bgcolor=transparent;
  splines=true;
  overlap=false;

  node [shape=rectangle, style="rounded,filled", fontname="Inter", fontsize=12, fillcolor="#f7fbff"];
  edge [arrowsize=0.9, fontname="Inter", fontsize=10, color="#2b7cff"];

  // Salary and Investment (standalone)
  Salary [label="💼 Salary Account", shape=folder, fillcolor="#e8f3ff"];
  Investment [label="📈 Investment Account", shape=folder, fillcolor="#e6f7ff"];

  Salary -> Investment [label=" Monthly travel allocation"];

  // Travel subgraph
  subgraph cluster_travel {
    label="✈️ Travel Fund & Expenses";
    color="#00e6d9";
    style=rounded;
    
    Arbitrage [label="⚖️ Travel Fund\n(Arbitrage)", shape=folder, fillcolor="#e6fff0"];
    Travel [label="✈️ Travel Account", shape=folder, fillcolor="#fff4e6"];
    TravelCard [label="💳 Travel Credit Card", shape=folder, fillcolor="#e6f7ff"];
    TravelExpense [label="💰 Travel Expenses", shape=folder, fillcolor="#fff7e6"];
  }

  // Flows within Travel subgraph
  Investment -> Arbitrage [label=" Invest"];
  Arbitrage -> Investment [label=" Redeem"];
  Investment -> Travel [label=" Transfer"];
  Travel -> TravelExpense [label=" UPI / Debit Card"];
  TravelCard -> TravelExpense [label=" Credit Card"];
  Travel -> TravelCard [label=" Credit Card Bill"];
}
```
---

## 6. Key Takeaways  
- Segment money → reduce stress  
- Budget/Allocate → everything is planned
- Automate transfers → reduce friction  
- Use credit cards smartly → earn rewards  
- Short-term needs → back with liquid assets


---
<section data-autoslide="1000">
  <h2>Sakthi Priyan H</h2>
  <h2>Building Wealth</h2>
  <h4 class="fragment" data-fragment-index="1">Thank you! 🎉</h4><br/><br/>
  <span class="fragment" data-fragment-index="2">Found this helpful? 💡</span><br/><br/>
  <span class="fragment" data-fragment-index="3">
    👍 Like & 💬 Share with friends & family!<br/>
    📌 Subscribe for more videos.
  </span><br/>
</section>


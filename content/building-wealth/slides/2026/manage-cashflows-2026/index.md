---
title: "Managing Money Flows 2026"
date: "2026-04-24"
draft: false
layout: "slides"
type: "slides"
summary: "Manage and automate your money flow via purpose-built Bank Accounts, Credit Cards, and Mutual Funds."
js_tools:
  - viz
  - gsap
wealth_tags:
  - Money Flow 
  - Building Block
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

<h2 class="title-scramble">Managing Money Flows 2026</h2>
<br/>
<h3 class="subtitle-fade" data-gsap='{"from": {"opacity": 0, "y": 30}, "duration": 1, "delay": 2.5}'>Designing a Personal Finance System</h3>
<h4 class="subtitle-fade" data-gsap='{"from": {"opacity": 0, "y": 30}, "duration": 1, "delay": 4.5}'>using Bank Accounts, Credit Cards & Mutual Funds</h4>
<h4 class="subtitle-fade2" data-gsap='{"from": {"opacity": 0, "y": 30}, "duration": 1, "delay": 5}'>Apr 25, 2026</h4>
<br/><br/>
<br/>

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

## 1️⃣ The Core Idea  

> Money separated by **purpose**,  
> **budgeted** yearly & **allocated** monthly.  

*Each bank account serves a specific purpose.*
<br/>
<br/>
<br/>
<br/>
<br/>
--

### My Bank Accounts  
| 🏦 **Account Type** | 💡 **Purpose** |
|----------------------|------------------------|
| 💰 **Income** | Where salary or income lands |
| 📈 **Investment** | For long-term wealth building  |
| 📈 **Investment Intl.** | For international forex routing  |
| 🧾 **Expense** | For all regular bills and daily expenses |
| 🏥 **Medical** | For health-related expenses |
| ✈️ **Travel** | For trips, vacations and experiences |
--

### My Credit Cards
| 💳 **Credit Card** | 💡 **Purpose** |
|--------------------|----------------------|
| 🧾 **Primary** | All Expenses, Travel and Gold schemes |
| 🏥 **Medical (Addon)** | Exclusive for Medical Expenses |
| 🛒 **Back up** | Bank redundancy in case Primary fails |

--

### Overview

```dot
digraph FinanceArchitecture {

  rankdir=TB;
  bgcolor=transparent;
  splines=true;
  overlap=false;

  node [
    shape=rectangle,
    style="rounded,filled",
    fontname="Inter",
    fontsize=13,
    fillcolor="#f7fbff"
  ];

  edge [
    arrowsize=0.9,
    fontname="Inter",
    fontsize=11,
    color="#2b7cff"
  ];

  // --- Income ---
  Salary [
    label="💼 Salary / Income",
    shape=folder,
    fillcolor="#e8f3ff"
  ];

  // --- Routing Layer ---
  subgraph cluster_routing {
    label="🏦 Routing Layer (Bank Accounts)";
    style="rounded,dashed";
    color="#4a90e2";

    IncomeAcc [label="💰 Income Account", shape=folder, fillcolor="#e6f7ff"];
    InvestmentAcc [label="📈 Investment Accounts", shape=folder, fillcolor="#e6f7ff"];
    ExpenseAcc [label="🧾 Expense Accounts", shape=folder, fillcolor="#e6f7ff"];

    { rank=same; IncomeAcc; InvestmentAcc; ExpenseAcc; }
  }

  // --- Outcomes ---
  Rewards [
    label="✨ Reward Points",
    shape=folder,
    fillcolor="#f9f0ff"
  ];

  // --- Credit Card Layer ---
  CreditCard [
    label="💳 Credit Cards",
    shape=folder,
    fillcolor="#fff4e6"
  ];

  // --- Expenses ---
  Expenses [
    label="💳 Expenses",
    shape=folder,
    fillcolor="#ffeaea"
  ];

  Assets [
    label="🏆 Multiple Goals & \n Global Multi Asset Portfolio",
    shape=folder,
    fillcolor="#fffbe6"
  ];

  // --- Core Flow ---
  Salary -> IncomeAcc [label=" Salary Credit"];

  IncomeAcc -> InvestmentAcc [label=" Allocate"];
  IncomeAcc -> ExpenseAcc [label=" Allocate"];
  InvestmentAcc -> ExpenseAcc [label=" Redeem"];

  // --- Investments ---
  InvestmentAcc -> Assets [label=" Invest"];

  // --- Spending Paths ---
  ExpenseAcc -> Expenses [label=" UPI"];

  ExpenseAcc -> CreditCard [label=" Bill Payment", style=dotted];
  InvestmentAcc -> CreditCard [label=" Bill Payment", style=dotted];

  CreditCard -> Expenses [label=" Spend"];

  // --- Rewards ---
  CreditCard -> Rewards [label=" Earn", constraint=false];
  Rewards -> Expenses [label=" Redeem"];

  // --- Asset Creation via Card ---
  CreditCard -> Assets [label=" Gold Schemes"];

  // --- Layout hints ---
  { rank=same; Rewards; CreditCard; }
  { rank=same; Assets; Expenses; }
}
```

---
<!-- .slide: data-transition="fade" -->
## 2️⃣ Investments 📈
```dot
digraph InvestmentFlow {
  rankdir=TB; // top-to-bottom
  bgcolor=transparent;
  splines=true;
  overlap=false;

  node [shape=rectangle, style="rounded,filled", fontname="Inter", fontsize=12, fillcolor="#f7fbff"];
  edge [arrowsize=0.9, fontname="Inter", fontsize=10, color="#2b7cff"];

  // --- Bank Accounts Cluster ---
  subgraph cluster_banks {
    label="🏦 Bank Accounts";
    style="rounded,dashed";
    color="#4a90e2";
    fontcolor="#1a4b99";
    fontsize=13;
    fontname="Inter";
    margin=12;
    invis=true;
    Salary [label="💼 Salary Account", shape=folder, fillcolor="#e8f3ff"];
    Investment [label="📈 Investment Account", shape=folder, fillcolor="#e6f7ff"];
    IntlAccount [label="🏦 Investment Intl. Account", shape=folder, fillcolor="#e6f7ff", style="invis"];

    { rank=same; Salary; Investment; IntlAccount; }
  }

  // --- Mutual Funds and Categories ---
  MutualFunds [label="📊 Mutual Funds / ETFs", shape=folder, fillcolor="#e6fff0", style="invis"];
  INEquity [label="🇮🇳 Indian Equity Index Funds", shape=folder, fillcolor="#f0fff0", style="invis"];
  DebtMF [label="💰 Debt / Arbitrage Funds", shape=folder, fillcolor="#f0fff0", style="invis"];

  // --- International Investments ---
  IntlBroker [label="🌍 International Broker Account", shape=folder, fillcolor="#fff4e6", style="invis"];
  USEquity [label="🇺🇸 US Equity (NASDAQ 100)", shape=folder, fillcolor="#fff7e6", style="invis"];

  // --- Credit Cards & Rewards Cluster ---
  subgraph cluster_credit_cards {
    label="💳 Credit Cards & Rewards";
    style="rounded,dashed";
    color="#ffa500";
    fontcolor="#cc6600";
    fontsize=13;
    fontname="Inter";
    style="invis";

    CreditCard [label="🧾 Primary Credit Card", shape=folder, fillcolor="#fff4e6", style="invis"];
    RewardPoints [label="✨ Reward Points", shape=folder, fillcolor="#f9f0ff", style="invis"];
  }

  // --- Gold Cluster ---
  subgraph cluster_gold {
    label="🏆 Gold Investments";
    style="rounded,dashed,invis";
    color="#ffd700";
    fontcolor="#c09000";
    fontsize=13;
    fontname="Inter";

    GoldMF [label="🏅 Gold Mutual Fund / ETFs", shape=folder, fillcolor="#fffbe6", style="invis"];
    GoldScheme [label="👑 Gold Jewellery Scheme", shape=folder, fillcolor="#fff4cc", style="invis"];
  }

  // --- Flows ---
  
  Salary -> Investment [label=" Monthly allocation"];
  edge [style="invis"];
  Investment -> IntlAccount [label=" Fund allocation"];
  Investment -> MutualFunds [label=" Mutual Fund purchases"];
  MutualFunds -> INEquity [label="Equity"];
  MutualFunds -> DebtMF [label="Debt"];
  MutualFunds -> GoldMF [label=" Digital Gold"];

  // --- Updated International Flow ---
  IntlAccount -> IntlBroker [label=" INR to USD"];
  IntlBroker -> USEquity [label=" Buy ETFs"];

  // --- Credit Card & Rewards Flow ---
  Investment -> CreditCard [label=" Bharat Connect (Bill Pay)", style="dotted,invis"];
  CreditCard -> GoldScheme [label=" Physical Gold"];
  CreditCard -> RewardPoints [label=" Earn"];
}
```

--
<!-- .slide: data-transition="fade" -->
## 2️⃣ Investments 📈
```dot
digraph InvestmentFlow {
  rankdir=TB; // top-to-bottom
  bgcolor=transparent;
  splines=true;
  overlap=false;

  node [shape=rectangle, style="rounded,filled", fontname="Inter", fontsize=12, fillcolor="#f7fbff"];
  edge [arrowsize=0.9, fontname="Inter", fontsize=10, color="#2b7cff"];

  // --- Bank Accounts Cluster ---
  subgraph cluster_banks {
    label="🏦 Bank Accounts";
    style="rounded,dashed";
    color="#4a90e2";
    fontcolor="#1a4b99";
    fontsize=13;
    fontname="Inter";
    margin=12;
    invis=true;
    Salary [label="💼 Salary Account", shape=folder, fillcolor="#e8f3ff"];
    Investment [label="📈 Investment Account", shape=folder, fillcolor="#e6f7ff"];
    IntlAccount [label="🏦 Investment Intl. Account", shape=folder, fillcolor="#e6f7ff", style="invis"];

    { rank=same; Salary; Investment; IntlAccount; }
  }

  // --- Mutual Funds and Categories ---
  MutualFunds [label="📊 Mutual Funds / ETFs", shape=folder, fillcolor="#e6fff0"];
  INEquity [label="🇮🇳 Indian Equity Index Funds", shape=folder, fillcolor="#f0fff0"];
  DebtMF [label="💰 Debt / Arbitrage Funds", shape=folder, fillcolor="#f0fff0"];

  // --- International Investments ---
  IntlBroker [label="🌍 International Broker Account", shape=folder, fillcolor="#fff4e6", style="invis"];
  USEquity [label="🇺🇸 US Equity (NASDAQ 100)", shape=folder, fillcolor="#fff7e6", style="invis"];

  // --- Credit Cards & Rewards Cluster ---
  subgraph cluster_credit_cards {
    label="💳 Credit Cards & Rewards";
    style="rounded,dashed";
    color="#ffa500";
    fontcolor="#cc6600";
    fontsize=13;
    fontname="Inter";
    style="invis";

    CreditCard [label="🧾 Primary Credit Card", shape=folder, fillcolor="#fff4e6", style="invis"];
    RewardPoints [label="✨ Reward Points", shape=folder, fillcolor="#f9f0ff", style="invis"];
  }

  // --- Gold Cluster ---
  subgraph cluster_gold {
    label="🏆 Gold Investments";
    style="rounded,dashed";
    color="#ffd700";
    fontcolor="#c09000";
    fontsize=13;
    fontname="Inter";

    GoldMF [label="🏅 Gold Mutual Fund / ETFs", shape=folder, fillcolor="#fffbe6"];
    GoldScheme [label="👑 Gold Jewellery Scheme", shape=folder, fillcolor="#fff4cc", style="invis"];
  }

  // --- Flows ---
  
  Salary -> Investment [label=" Monthly allocation"];
  Investment -> IntlAccount [label=" Fund allocation", style="invis"];
  Investment -> MutualFunds [label=" Mutual Fund purchases"];
  MutualFunds -> INEquity [label="Equity"];
  MutualFunds -> DebtMF [label="Debt"];
  MutualFunds -> GoldMF [label=" Digital Gold"];
  edge [style="invis"];
  // --- Updated International Flow ---
  IntlAccount -> IntlBroker [label=" INR to USD"];
  IntlBroker -> USEquity [label=" Buy ETFs"];

  // --- Credit Card & Rewards Flow ---
  Investment -> CreditCard [label=" Bharat Connect (Bill Pay)", style="dotted,invis"];
  CreditCard -> GoldScheme [label=" Physical Gold"];
  CreditCard -> RewardPoints [label=" Earn"];
}
```

--
<!-- .slide: data-transition="fade" -->
## 2️⃣ Investments 📈
```dot
digraph InvestmentFlow {
  rankdir=TB; // top-to-bottom
  bgcolor=transparent;
  splines=true;
  overlap=false;

  node [shape=rectangle, style="rounded,filled", fontname="Inter", fontsize=12, fillcolor="#f7fbff"];
  edge [arrowsize=0.9, fontname="Inter", fontsize=10, color="#2b7cff"];

  // --- Bank Accounts Cluster ---
  subgraph cluster_banks {
    label="🏦 Bank Accounts";
    style="rounded,dashed";
    color="#4a90e2";
    fontcolor="#1a4b99";
    fontsize=13;
    fontname="Inter";
    margin=12;
    invis=true;
    Salary [label="💼 Salary Account", shape=folder, fillcolor="#e8f3ff"];
    Investment [label="📈 Investment Account", shape=folder, fillcolor="#e6f7ff"];
    IntlAccount [label="🏦 Investment Intl. Account", shape=folder, fillcolor="#e6f7ff", style="invis"];

    { rank=same; Salary; Investment; IntlAccount; }
  }

  // --- Mutual Funds and Categories ---
  MutualFunds [label="📊 Mutual Funds / ETFs", shape=folder, fillcolor="#e6fff0"];
  INEquity [label="🇮🇳 Indian Equity Index Funds", shape=folder, fillcolor="#f0fff0"];
  DebtMF [label="💰 Debt / Arbitrage Funds", shape=folder, fillcolor="#f0fff0"];

  // --- International Investments ---
  IntlBroker [label="🌍 International Broker Account", shape=folder, fillcolor="#fff4e6", style="invis"];
  USEquity [label="🇺🇸 US Equity (NASDAQ 100)", shape=folder, fillcolor="#fff7e6", style="invis"];

  // --- Credit Cards & Rewards Cluster ---
  subgraph cluster_credit_cards {
    label="💳 Credit Cards & Rewards";
    style="rounded,dashed";
    color="#ffa500";
    fontcolor="#cc6600";
    fontsize=13;
    fontname="Inter";

    CreditCard [label="🧾 Primary Credit Card", shape=folder, fillcolor="#fff4e6"];
    RewardPoints [label="✨ Reward Points", shape=folder, fillcolor="#f9f0ff"];
  }

  // --- Gold Cluster ---
  subgraph cluster_gold {
    label="🏆 Gold Investments";
    style="rounded,dashed";
    color="#ffd700";
    fontcolor="#c09000";
    fontsize=13;
    fontname="Inter";

    GoldMF [label="🏅 Gold Mutual Fund / ETFs", shape=folder, fillcolor="#fffbe6"];
    GoldScheme [label="👑 Gold Jewellery Scheme", shape=folder, fillcolor="#fff4cc"];
  }

  // --- Flows ---
  
  Salary -> Investment [label=" Monthly allocation"];
  Investment -> IntlAccount [label=" Fund allocation", style="invis"];
  Investment -> MutualFunds [label=" Mutual Fund purchases"];
  MutualFunds -> INEquity [label="Equity"];
  MutualFunds -> DebtMF [label="Debt"];
  MutualFunds -> GoldMF [label=" Digital Gold"];

  // --- Updated International Flow ---
  IntlAccount -> IntlBroker [label=" INR to USD", style="invis"];
  IntlBroker -> USEquity [label=" Buy ETFs", style="invis"];

  // --- Credit Card & Rewards Flow ---
  Investment -> CreditCard [label=" Bharat Connect (Bill Pay)", style="dotted"];
  CreditCard -> GoldScheme [label=" Physical Gold"];
  CreditCard -> RewardPoints [label=" Earn"];
}
```

--
<!-- .slide: data-transition="fade" -->
## 2️⃣ Investments 📈

```dot
digraph InvestmentFlow {
  rankdir=TB; // top-to-bottom
  bgcolor=transparent;
  splines=true;
  overlap=false;

  node [shape=rectangle, style="rounded,filled", fontname="Inter", fontsize=12, fillcolor="#f7fbff"];
  edge [arrowsize=0.9, fontname="Inter", fontsize=10, color="#2b7cff"];

  // --- Bank Accounts Cluster ---
  subgraph cluster_banks {
    label="🏦 Bank Accounts";
    style="rounded,dashed";
    color="#4a90e2";
    fontcolor="#1a4b99";
    fontsize=13;
    fontname="Inter";
    margin=12;
    invis=true;
    Salary [label="💼 Salary Account", shape=folder, fillcolor="#e8f3ff"];
    Investment [label="📈 Investment Account", shape=folder, fillcolor="#e6f7ff"];
    IntlAccount [label="🏦 Investment Intl. Account", shape=folder, fillcolor="#e6f7ff"];

    { rank=same; Salary; Investment; IntlAccount; }
  }

  // --- Mutual Funds and Categories ---
  MutualFunds [label="📊 Mutual Funds / ETFs", shape=folder, fillcolor="#e6fff0"];
  INEquity [label="🇮🇳 Indian Equity Index Funds", shape=folder, fillcolor="#f0fff0"];
  DebtMF [label="💰 Debt / Arbitrage Funds", shape=folder, fillcolor="#f0fff0"];

  // --- International Investments ---
  IntlBroker [label="🌍 International Broker Account", shape=folder, fillcolor="#fff4e6"];
  USEquity [label="🇺🇸 US Equity (NASDAQ 100)", shape=folder, fillcolor="#fff7e6"];

  // --- Credit Cards & Rewards Cluster ---
  subgraph cluster_credit_cards {
    label="💳 Credit Cards & Rewards";
    style="rounded,dashed";
    color="#ffa500";
    fontcolor="#cc6600";
    fontsize=13;
    fontname="Inter";

    CreditCard [label="🧾 Primary Credit Card", shape=folder, fillcolor="#fff4e6"];
    RewardPoints [label="✨ Reward Points", shape=folder, fillcolor="#f9f0ff"];
  }

  // --- Gold Cluster ---
  subgraph cluster_gold {
    label="🏆 Gold Investments";
    style="rounded,dashed";
    color="#ffd700";
    fontcolor="#c09000";
    fontsize=13;
    fontname="Inter";

    GoldMF [label="🏅 Gold Mutual Fund / ETFs", shape=folder, fillcolor="#fffbe6"];
    GoldScheme [label="👑 Gold Jewellery Scheme", shape=folder, fillcolor="#fff4cc"];
  }

  // --- Flows ---
  Salary -> Investment [label=" Monthly allocation"];
  Investment -> MutualFunds [label=" Mutual Fund purchases"];
  MutualFunds -> INEquity [label="Equity"];
  MutualFunds -> DebtMF [label="Debt"];
  MutualFunds -> GoldMF [label=" Digital Gold"];

  // --- Updated International Flow ---
  Investment -> IntlAccount [label=" Fund allocation"];
  IntlAccount -> IntlBroker [label=" INR to USD"];
  IntlBroker -> USEquity [label=" Buy ETFs"];

  // --- Credit Card & Rewards Flow ---
  Investment -> CreditCard [label=" Bharat Connect (Bill Pay)", style="dotted"];
  CreditCard -> GoldScheme [label=" Physical Gold"];
  CreditCard -> RewardPoints [label=" Earn"];
}
```

---
<!-- .slide: data-transition="fade" -->
## 3️⃣ Living Expenses 🧾

```dot
digraph ExpensesFlow {
  rankdir=TB;
  bgcolor=transparent;
  splines=true;
  overlap=false;

  node [shape=rectangle, style="rounded,filled", fontname="Inter", fontsize=12, fillcolor="#f7fbff"];
  edge [arrowsize=0.9, fontname="Inter", fontsize=10, color="#2b7cff"];

  // --- Bank Accounts Cluster ---
  subgraph cluster_banks {
    label="🏦 Bank Accounts";
    style="rounded,dashed";
    color="#4a90e2";
    fontcolor="#1a4b99";
    fontsize=13;
    fontname="Inter";
    margin=10;

    Salary [label="💼 Salary Account", shape=folder, fillcolor="#e8f3ff"];
    ExpenseAccount [label="🧾 Expense Account", shape=folder, fillcolor="#e6f7ff"];

    { rank=same; Salary; ExpenseAccount; }
  }

  // --- Credit Cards & Rewards Cluster ---
  subgraph cluster_credit_cards {
    label="💳 Credit Cards & Rewards";
    style="rounded,dashed,invis";
    color="#ffa500";
    fontcolor="#cc6600";
    fontsize=13;
    fontname="Inter";

    PrimaryCard [label="🧾 Primary Credit Card", shape=folder, fillcolor="#fff4e6", style="invis"];
    RewardPoints [label="✨ Reward Points", shape=folder, fillcolor="#f9f0ff", style="invis"];
  }

  // --- Card Payment Interfaces Cluster ---
  subgraph cluster_interfaces {
    label="📱 Card Interfaces";
    style="rounded,dashed,invis";
    color="#2b7cff";
    fontcolor="#1a4b99";
    fontsize=13;
    fontname="Inter";

    SamsungWallet [label="⌚ Samsung Wallet\n(me/mobile)", shape=folder, fillcolor="#e6f7ff", style="invis"];
    GooglePay [label="📱 Google Pay\n(spouse)", shape=folder, fillcolor="#e6f7ff", style="invis"];
    PhysicalCard [label="💳 Physical Card", shape=folder, fillcolor="#e6f7ff", style="invis"];
    VoucherSystem [label="🎟️ Voucher System", shape=folder, fillcolor="#fffbe6", style="invis"];

    { rank=same; SamsungWallet; GooglePay; PhysicalCard; VoucherSystem; }
  }

  // --- UPI Payment Interfaces Cluster ---
  subgraph cluster_upi_interfaces {
    label="🔗 UPI Interfaces";
    style="rounded,dashed,invis";
    color="#00a86b";
    fontcolor="#008050";
    fontsize=13;
    fontname="Inter";

    UPISamsung [label="⌚ Samsung Wallet\n(me)", shape=folder, fillcolor="#e6fff0", style="invis"];
    UPIGoogle [label="📱 Google Pay\n(Spouse/UPI Circle)", shape=folder, fillcolor="#e6fff0", style="invis"];

    { rank=same; UPISamsung; UPIGoogle; }
  }

  // --- Expenses Cluster ---
  subgraph cluster_expenses {
    label="💰 Expenses";
    style="rounded,dashed,invis";
    color="#ff6b81";
    fontcolor="#c0392b";
    fontsize=13;
    fontname="Inter";

    Expenses [label="💰 Expenses", shape=folder, fillcolor="#f0fff0", style="invis"];
  }

  // --- Allocation Flows ---
  Salary -> ExpenseAccount [label=" Monthly Allocation", weight=10];
  Salary -> ExpenseAccount [label=" Yearly Allocation", style=dashed];

  edge [style="invis"];
  // --- UPI Spending Flows ---
  ExpenseAccount -> UPISamsung [label=" Linked"];
  ExpenseAccount -> UPIGoogle [label=" Linked"];
  UPISamsung -> Expenses [label=" Scan to Pay"];
  UPIGoogle -> Expenses [label=" Scan to Pay"];

  // --- Credit Card Bill Payment Flows ---
  ExpenseAccount -> PrimaryCard [label=" Bill Payment (direct)", style="invis"];

  // --- Spending Flows (Vouchers) ---
  PrimaryCard -> VoucherSystem [label=" Buy Vouchers"];
  VoucherSystem -> Expenses [label=" Redeem Vouchers"];

  // --- Spending Flows (Primary Card Intermediaries) ---
  PrimaryCard -> SamsungWallet [label=" Linked"];
  PrimaryCard -> GooglePay [label=" Linked"];
  PrimaryCard -> PhysicalCard [label=" Linked"];

  PhysicalCard -> Expenses [label=" Tap or Insert"];
  SamsungWallet -> Expenses [label=" Tap to Pay"];
  GooglePay -> Expenses [label=" Tap to Pay"];

  // --- Rewards Flows ---
  PrimaryCard -> RewardPoints [label=" Earn"];
}
```

--
<!-- .slide: data-transition="fade" -->
## 3️⃣ Living Expenses 🧾

```dot
digraph ExpensesFlow {
  rankdir=TB;
  bgcolor=transparent;
  splines=true;
  overlap=false;

  node [shape=rectangle, style="rounded,filled", fontname="Inter", fontsize=12, fillcolor="#f7fbff"];
  edge [arrowsize=0.9, fontname="Inter", fontsize=10, color="#2b7cff"];

  // --- Bank Accounts Cluster ---
  subgraph cluster_banks {
    label="🏦 Bank Accounts";
    style="rounded,dashed";
    color="#4a90e2";
    fontcolor="#1a4b99";
    fontsize=13;
    fontname="Inter";
    margin=10;

    Salary [label="💼 Salary Account", shape=folder, fillcolor="#e8f3ff"];
    ExpenseAccount [label="🧾 Expense Account", shape=folder, fillcolor="#e6f7ff"];

    { rank=same; Salary; ExpenseAccount; }
  }

  // --- Credit Cards & Rewards Cluster ---
  subgraph cluster_credit_cards {
    label="💳 Credit Cards & Rewards";
    style="rounded,dashed,invis";
    color="#ffa500";
    fontcolor="#cc6600";
    fontsize=13;
    fontname="Inter";

    PrimaryCard [label="🧾 Primary Credit Card", shape=folder, fillcolor="#fff4e6", style="invis"];
    RewardPoints [label="✨ Reward Points", shape=folder, fillcolor="#f9f0ff", style="invis"];
  }

  // --- Card Payment Interfaces Cluster ---
  subgraph cluster_interfaces {
    label="📱 Card Interfaces";
    style="rounded,dashed,invis";
    color="#2b7cff";
    fontcolor="#1a4b99";
    fontsize=13;
    fontname="Inter";

    SamsungWallet [label="⌚ Samsung Wallet\n(me/mobile)", shape=folder, fillcolor="#e6f7ff", style="invis"];
    GooglePay [label="📱 Google Pay\n(spouse)", shape=folder, fillcolor="#e6f7ff", style="invis"];
    PhysicalCard [label="💳 Physical Card", shape=folder, fillcolor="#e6f7ff", style="invis"];
    VoucherSystem [label="🎟️ Voucher System", shape=folder, fillcolor="#fffbe6", style="invis"];

    { rank=same; SamsungWallet; GooglePay; PhysicalCard; VoucherSystem; }
  }

  // --- UPI Payment Interfaces Cluster ---
  subgraph cluster_upi_interfaces {
    label="🔗 UPI Interfaces";
    style="rounded,dashed";
    color="#00a86b";
    fontcolor="#008050";
    fontsize=13;
    fontname="Inter";

    UPISamsung [label="⌚ Samsung Wallet\n(me)", shape=folder, fillcolor="#e6fff0"];
    UPIGoogle [label="📱 Google Pay\n(Spouse/UPI Circle)", shape=folder, fillcolor="#e6fff0"];

    { rank=same; UPISamsung; UPIGoogle; }
  }

  // --- Expenses Cluster ---
  subgraph cluster_expenses {
    label="💰 Expenses";
    style="rounded,dashed";
    color="#ff6b81";
    fontcolor="#c0392b";
    fontsize=13;
    fontname="Inter";

    Expenses [label="💰 Expenses", shape=folder, fillcolor="#f0fff0"];
  }

  // --- Allocation Flows ---
  Salary -> ExpenseAccount [label=" Monthly Allocation", weight=10];
  Salary -> ExpenseAccount [label=" Yearly Allocation", style=dashed];

  // --- UPI Spending Flows ---
  ExpenseAccount -> UPISamsung [label=" Linked"];
  ExpenseAccount -> UPIGoogle [label=" Linked"];
  UPISamsung -> Expenses [label=" Scan to Pay"];
  UPIGoogle -> Expenses [label=" Scan to Pay"];

  edge [style="invis"];
  // --- Credit Card Bill Payment Flows ---
  ExpenseAccount -> PrimaryCard [label=" Bill Payment (direct)", style="invis"];

  // --- Spending Flows (Vouchers) ---
  PrimaryCard -> VoucherSystem [label=" Buy Vouchers"];
  VoucherSystem -> Expenses [label=" Redeem Vouchers"];

  // --- Spending Flows (Primary Card Intermediaries) ---
  PrimaryCard -> SamsungWallet [label=" Linked"];
  PrimaryCard -> GooglePay [label=" Linked"];
  PrimaryCard -> PhysicalCard [label=" Linked"];

  PhysicalCard -> Expenses [label=" Tap or Insert"];
  SamsungWallet -> Expenses [label=" Tap to Pay"];
  GooglePay -> Expenses [label=" Tap to Pay"];

  // --- Rewards Flows ---
  PrimaryCard -> RewardPoints [label=" Earn"];
}
```

--
<!-- .slide: data-transition="fade" -->
## 3️⃣ Living Expenses 🧾

```dot
digraph ExpensesFlow {
  rankdir=TB;
  bgcolor=transparent;
  splines=true;
  overlap=false;

  node [shape=rectangle, style="rounded,filled", fontname="Inter", fontsize=12, fillcolor="#f7fbff"];
  edge [arrowsize=0.9, fontname="Inter", fontsize=10, color="#2b7cff"];

  // --- Bank Accounts Cluster ---
  subgraph cluster_banks {
    label="🏦 Bank Accounts";
    style="rounded,dashed";
    color="#4a90e2";
    fontcolor="#1a4b99";
    fontsize=13;
    fontname="Inter";
    margin=10;

    Salary [label="💼 Salary Account", shape=folder, fillcolor="#e8f3ff"];
    ExpenseAccount [label="🧾 Expense Account", shape=folder, fillcolor="#e6f7ff"];

    { rank=same; Salary; ExpenseAccount; }
  }

  // --- Credit Cards & Rewards Cluster ---
  subgraph cluster_credit_cards {
    label="💳 Credit Cards & Rewards";
    style="rounded,dashed";
    color="#ffa500";
    fontcolor="#cc6600";
    fontsize=13;
    fontname="Inter";

    PrimaryCard [label="🧾 Primary Credit Card", shape=folder, fillcolor="#fff4e6"];
    RewardPoints [label="✨ Reward Points", shape=folder, fillcolor="#f9f0ff"];
  }

  // --- Card Payment Interfaces Cluster ---
  subgraph cluster_interfaces {
    label="📱 Card Interfaces";
    style="rounded,dashed";
    color="#2b7cff";
    fontcolor="#1a4b99";
    fontsize=13;
    fontname="Inter";

    SamsungWallet [label="⌚ Samsung Wallet\n(me/mobile)", shape=folder, fillcolor="#e6f7ff", style="invis"];
    GooglePay [label="📱 Google Pay\n(spouse)", shape=folder, fillcolor="#e6f7ff", style="invis"];
    PhysicalCard [label="💳 Physical Card", shape=folder, fillcolor="#e6f7ff"];
    VoucherSystem [label="🎟️ Voucher System", shape=folder, fillcolor="#fffbe6", style="invis"];

    { rank=same; SamsungWallet; GooglePay; PhysicalCard; VoucherSystem; }
  }

  // --- UPI Payment Interfaces Cluster ---
  subgraph cluster_upi_interfaces {
    label="🔗 UPI Interfaces";
    style="rounded,dashed";
    color="#00a86b";
    fontcolor="#008050";
    fontsize=13;
    fontname="Inter";

    UPISamsung [label="⌚ Samsung Wallet\n(me)", shape=folder, fillcolor="#e6fff0"];
    UPIGoogle [label="📱 Google Pay\n(Spouse/UPI Circle)", shape=folder, fillcolor="#e6fff0"];

    { rank=same; UPISamsung; UPIGoogle; }
  }

  // --- Expenses Cluster ---
  subgraph cluster_expenses {
    label="💰 Expenses";
    style="rounded,dashed";
    color="#ff6b81";
    fontcolor="#c0392b";
    fontsize=13;
    fontname="Inter";

    Expenses [label="💰 Expenses", shape=folder, fillcolor="#f0fff0"];
  }

  // --- Allocation Flows ---
  Salary -> ExpenseAccount [label=" Monthly Allocation", weight=10];
  Salary -> ExpenseAccount [label=" Yearly Allocation", style=dashed];

  // --- UPI Spending Flows ---
  ExpenseAccount -> UPISamsung [label=" Linked"];
  ExpenseAccount -> UPIGoogle [label=" Linked"];
  UPISamsung -> Expenses [label=" Scan to Pay"];
  UPIGoogle -> Expenses [label=" Scan to Pay"];

  // --- Credit Card Bill Payment Flows ---
  ExpenseAccount -> PrimaryCard [label=" Bill Payment (direct)", style="dotted"];

  // --- Spending Flows (Vouchers) ---
  PrimaryCard -> VoucherSystem [label=" Buy Vouchers", style="invis"];
  VoucherSystem -> Expenses [label=" Redeem Vouchers", style="invis"];

  // --- Spending Flows (Primary Card Intermediaries) ---
  PrimaryCard -> SamsungWallet [label=" Linked", style="invis"];
  PrimaryCard -> GooglePay [label=" Linked", style="invis"];
  PrimaryCard -> PhysicalCard [label=" Linked"];

  PhysicalCard -> Expenses [label=" Tap or Insert"];
  SamsungWallet -> Expenses [label=" Tap to Pay", style="invis"];
  GooglePay -> Expenses [label=" Tap to Pay", style="invis"];

  // --- Rewards Flows ---
  PrimaryCard -> RewardPoints [label=" Earn"];
}
```

--
<!-- .slide: data-transition="fade" -->
## 3️⃣ Living Expenses 🧾

```dot
digraph ExpensesFlow {
  rankdir=TB;
  bgcolor=transparent;
  splines=true;
  overlap=false;

  node [shape=rectangle, style="rounded,filled", fontname="Inter", fontsize=12, fillcolor="#f7fbff"];
  edge [arrowsize=0.9, fontname="Inter", fontsize=10, color="#2b7cff"];

  // --- Bank Accounts Cluster ---
  subgraph cluster_banks {
    label="🏦 Bank Accounts";
    style="rounded,dashed";
    color="#4a90e2";
    fontcolor="#1a4b99";
    fontsize=13;
    fontname="Inter";
    margin=10;

    Salary [label="💼 Salary Account", shape=folder, fillcolor="#e8f3ff"];
    ExpenseAccount [label="🧾 Expense Account", shape=folder, fillcolor="#e6f7ff"];

    { rank=same; Salary; ExpenseAccount; }
  }

  // --- Credit Cards & Rewards Cluster ---
  subgraph cluster_credit_cards {
    label="💳 Credit Cards & Rewards";
    style="rounded,dashed";
    color="#ffa500";
    fontcolor="#cc6600";
    fontsize=13;
    fontname="Inter";

    PrimaryCard [label="🧾 Primary Credit Card", shape=folder, fillcolor="#fff4e6"];
    RewardPoints [label="✨ Reward Points", shape=folder, fillcolor="#f9f0ff"];
  }

  // --- Card Payment Interfaces Cluster ---
  subgraph cluster_interfaces {
    label="📱 Card Interfaces";
    style="rounded,dashed";
    color="#2b7cff";
    fontcolor="#1a4b99";
    fontsize=13;
    fontname="Inter";

    SamsungWallet [label="⌚ Samsung Wallet\n(me/mobile)", shape=folder, fillcolor="#e6f7ff", style="invis"];
    GooglePay [label="📱 Google Pay\n(spouse)", shape=folder, fillcolor="#e6f7ff", style="invis"];
    PhysicalCard [label="💳 Physical Card", shape=folder, fillcolor="#e6f7ff"];
    VoucherSystem [label="🎟️ Voucher System", shape=folder, fillcolor="#fffbe6"];

    { rank=same; SamsungWallet; GooglePay; PhysicalCard; VoucherSystem; }
  }

  // --- UPI Payment Interfaces Cluster ---
  subgraph cluster_upi_interfaces {
    label="🔗 UPI Interfaces";
    style="rounded,dashed";
    color="#00a86b";
    fontcolor="#008050";
    fontsize=13;
    fontname="Inter";

    UPISamsung [label="⌚ Samsung Wallet\n(me)", shape=folder, fillcolor="#e6fff0"];
    UPIGoogle [label="📱 Google Pay\n(Spouse/UPI Circle)", shape=folder, fillcolor="#e6fff0"];

    { rank=same; UPISamsung; UPIGoogle; }
  }

  // --- Expenses Cluster ---
  subgraph cluster_expenses {
    label="💰 Expenses";
    style="rounded,dashed";
    color="#ff6b81";
    fontcolor="#c0392b";
    fontsize=13;
    fontname="Inter";

    Expenses [label="💰 Expenses", shape=folder, fillcolor="#f0fff0"];
  }

  // --- Allocation Flows ---
  Salary -> ExpenseAccount [label=" Monthly Allocation", weight=10];
  Salary -> ExpenseAccount [label=" Yearly Allocation", style=dashed];

  // --- UPI Spending Flows ---
  ExpenseAccount -> UPISamsung [label=" Linked"];
  ExpenseAccount -> UPIGoogle [label=" Linked"];
  UPISamsung -> Expenses [label=" Scan to Pay"];
  UPIGoogle -> Expenses [label=" Scan to Pay"];

  // --- Credit Card Bill Payment Flows ---
  ExpenseAccount -> PrimaryCard [label=" Bill Payment (direct)", style="dotted"];

  // --- Spending Flows (Vouchers) ---
  PrimaryCard -> VoucherSystem [label=" Buy Vouchers"];
  VoucherSystem -> Expenses [label=" Redeem Vouchers"];

  // --- Spending Flows (Primary Card Intermediaries) ---
  PrimaryCard -> SamsungWallet [label=" Linked", style="invis"];
  PrimaryCard -> GooglePay [label=" Linked", style="invis"];
  PrimaryCard -> PhysicalCard [label=" Linked"];

  PhysicalCard -> Expenses [label=" Tap or Insert"];
  SamsungWallet -> Expenses [label=" Tap to Pay", style="invis"];
  GooglePay -> Expenses [label=" Tap to Pay", style="invis"];

  // --- Rewards Flows ---
  PrimaryCard -> RewardPoints [label=" Earn"];
}
```

--
<!-- .slide: data-transition="fade" -->
## 3️⃣ Living Expenses 🧾

```dot
digraph ExpensesFlow {
  rankdir=TB;
  bgcolor=transparent;
  splines=true;
  overlap=false;

  node [shape=rectangle, style="rounded,filled", fontname="Inter", fontsize=12, fillcolor="#f7fbff"];
  edge [arrowsize=0.9, fontname="Inter", fontsize=10, color="#2b7cff"];

  // --- Bank Accounts Cluster ---
  subgraph cluster_banks {
    label="🏦 Bank Accounts";
    style="rounded,dashed";
    color="#4a90e2";
    fontcolor="#1a4b99";
    fontsize=13;
    fontname="Inter";
    margin=10;

    Salary [label="💼 Salary Account", shape=folder, fillcolor="#e8f3ff"];
    ExpenseAccount [label="🧾 Expense Account", shape=folder, fillcolor="#e6f7ff"];

    { rank=same; Salary; ExpenseAccount; }
  }

  // --- Credit Cards & Rewards Cluster ---
  subgraph cluster_credit_cards {
    label="💳 Credit Cards & Rewards";
    style="rounded,dashed";
    color="#ffa500";
    fontcolor="#cc6600";
    fontsize=13;
    fontname="Inter";

    PrimaryCard [label="🧾 Primary Credit Card", shape=folder, fillcolor="#fff4e6"];
    RewardPoints [label="✨ Reward Points", shape=folder, fillcolor="#f9f0ff"];
  }

  // --- Card Payment Interfaces Cluster ---
  subgraph cluster_interfaces {
    label="📱 Card Interfaces";
    style="rounded,dashed";
    color="#2b7cff";
    fontcolor="#1a4b99";
    fontsize=13;
    fontname="Inter";

    SamsungWallet [label="⌚ Samsung Wallet\n(me/mobile)", shape=folder, fillcolor="#e6f7ff"];
    GooglePay [label="📱 Google Pay\n(spouse)", shape=folder, fillcolor="#e6f7ff"];
    PhysicalCard [label="💳 Physical Card", shape=folder, fillcolor="#e6f7ff"];
    VoucherSystem [label="🎟️ Voucher System", shape=folder, fillcolor="#fffbe6"];

    { rank=same; SamsungWallet; GooglePay; PhysicalCard; VoucherSystem; }
  }

  // --- UPI Payment Interfaces Cluster ---
  subgraph cluster_upi_interfaces {
    label="🔗 UPI Interfaces";
    style="rounded,dashed";
    color="#00a86b";
    fontcolor="#008050";
    fontsize=13;
    fontname="Inter";

    UPISamsung [label="⌚ Samsung Wallet\n(me)", shape=folder, fillcolor="#e6fff0"];
    UPIGoogle [label="📱 Google Pay\n(Spouse/UPI Circle)", shape=folder, fillcolor="#e6fff0"];

    { rank=same; UPISamsung; UPIGoogle; }
  }

  // --- Expenses Cluster ---
  subgraph cluster_expenses {
    label="💰 Expenses";
    style="rounded,dashed";
    color="#ff6b81";
    fontcolor="#c0392b";
    fontsize=13;
    fontname="Inter";

    Expenses [label="💰 Expenses", shape=folder, fillcolor="#f0fff0"];
  }

  // --- Allocation Flows ---
  Salary -> ExpenseAccount [label=" Monthly Allocation", weight=10];
  Salary -> ExpenseAccount [label=" Yearly Allocation", style=dashed];

  // --- UPI Spending Flows ---
  ExpenseAccount -> UPISamsung [label=" Linked"];
  ExpenseAccount -> UPIGoogle [label=" Linked"];
  UPISamsung -> Expenses [label=" Scan to Pay"];
  UPIGoogle -> Expenses [label=" Scan to Pay"];

  // --- Credit Card Bill Payment Flows ---
  ExpenseAccount -> PrimaryCard [label=" Bill Payment (direct)", style="dotted"];

  // --- Spending Flows (Vouchers) ---
  PrimaryCard -> VoucherSystem [label=" Buy Vouchers"];
  VoucherSystem -> Expenses [label=" Redeem Vouchers"];

  // --- Spending Flows (Primary Card Intermediaries) ---
  PrimaryCard -> SamsungWallet [label=" Linked"];
  PrimaryCard -> GooglePay [label=" Linked"];
  PrimaryCard -> PhysicalCard [label=" Linked"];

  PhysicalCard -> Expenses [label=" Tap or Insert"];
  SamsungWallet -> Expenses [label=" Tap to Pay"];
  GooglePay -> Expenses [label=" Tap to Pay"];

  // --- Rewards Flows ---
  PrimaryCard -> RewardPoints [label=" Earn"];
}
```

---
<!-- .slide: data-transition="fade" -->
## 4️⃣ Medical Expenses 🏥
```dot
digraph MedicalFlow {
  compound=true; 
  rankdir=TB; 
  bgcolor=transparent;
  splines=true;
  overlap=false;

  node [shape=rectangle, style="rounded,filled", fontname="Inter", fontsize=12, fillcolor="#f7fbff"];
  edge [arrowsize=0.9, fontname="Inter", fontsize=10, color="#2b7cff"];

  // --- Bank Accounts Cluster ---
  subgraph cluster_banks {
    label="🏦 Bank Accounts";
    style="rounded,dashed";
    color="#4a90e2";
    fontcolor="#1a4b99";
    fontsize=13;
    fontname="Inter";
    margin=10;

    Salary [label="💼 Salary Account", shape=folder, fillcolor="#e8f3ff"];
    Investment [label="📈 Investment Account", shape=folder, fillcolor="#e6f7ff", style="invis"];
    Medical [label="🏥 Medical Account", shape=folder, fillcolor="#e6f7ff"];
    
    { rank=same; Salary; Investment; Medical; }
  }

  // --- Medical Mutual Funds Cluster ---
  subgraph cluster_medical_funds {
    label="Mutual Funds";
    style="rounded,dashed,invis";
    color="#66cdaa";
    fontcolor="#2f6655";
    fontsize=13;
    fontname="Inter";

    MedFund [label="💊 Medical Fund\n(Arbitrage)", shape=folder, fillcolor="#f0fff0", style="invis"];
    Emergency [label="🚨 Emergency Fund\n(Liquid, Hybrids)", shape=folder, fillcolor="#fff4e6", style="invis"];
    
    { rank=same; MedFund; Emergency; }
  }

  // --- Credit Cards & Rewards Cluster ---
  subgraph cluster_credit_cards {
    label="💳 Credit Cards & Rewards";
    style="rounded,dashed,invis";
    color="#ffa500";
    fontcolor="#cc6600";
    fontsize=13;
    fontname="Inter";
    
    MedCard [label="💳 Medical Credit Card", shape=folder, fillcolor="#fff4e6", style="invis"];
    RewardPoints [label="✨ Reward Points", shape=folder, fillcolor="#f9f0ff", style="invis"];
  }

  // --- Health Insurance Cluster ---
  subgraph cluster_insurance {
    label="🩺 Health Insurance";
    style="rounded,dashed,invis";
    color="#20b2aa";
    fontcolor="#105955";
    fontsize=13;
    fontname="Inter";

    PersonalIns [label="🛡️ Personal Policy", shape=folder, fillcolor="#e6fff0", style="invis"];
    SpouseIns [label="🏢 Spouse Employer", shape=folder, fillcolor="#e6fff0", style="invis"];
    EmpIns [label="🏢 My Employer", shape=folder, fillcolor="#e6fff0", style="invis"];
    
    { rank=same; EmpIns; SpouseIns; PersonalIns; }
  }

  // --- Expenses & Destinations Cluster ---
  subgraph cluster_expenses {
    label="💰 Expenses";
    style="rounded,dashed,invis";
    color="#ff6b81";
    fontcolor="#c0392b";
    fontsize=13;
    fontname="Inter";

    MedExpenses [label="🧾 Medical Expenses", shape=folder, fillcolor="#f0fff0", style="invis"];
    Hospital [label="🏨 Hospitalizations", shape=folder, fillcolor="#fff7e6", style="invis"];
    
    { rank=same; MedExpenses; Hospital; }
  }

  // --- Flows (Investments) ---
  Salary -> Medical [label=" Monthly allocation"];
  edge [style="invis"];
  Salary -> Investment [label=" Planned allocation"];
  Investment -> MedFund [label=" Invest"];
  MedFund -> Investment [label=" Redeem"];
  Emergency -> Investment [label=" Redeem on unplanned"];
  Investment -> Medical [label=" Hospitalizations/Top ups"];

  // --- Credit Card Bill Payment Flow ---
  Medical -> MedCard [label=" Bill Payment (direct)", style="invis"];

  // --- Spending Flows ---
  Medical -> MedExpenses [label=" UPI Scan to Pay"];
  MedCard -> MedExpenses [label=" Card Spend"];
  MedCard -> Hospital [label=" Emergency Spends"];

  // --- Insurance Flow ---
  SpouseIns -> Hospital [label=" Coverage", ltail=cluster_insurance];

  // --- Rewards Flow ---
  MedCard -> RewardPoints [label=" Earn"];
}
```

--
<!-- .slide: data-transition="fade" -->
## 4️⃣ Medical Expenses 🏥
```dot
digraph MedicalFlow {
  compound=true; 
  rankdir=TB; 
  bgcolor=transparent;
  splines=true;
  overlap=false;

  node [shape=rectangle, style="rounded,filled", fontname="Inter", fontsize=12, fillcolor="#f7fbff"];
  edge [arrowsize=0.9, fontname="Inter", fontsize=10, color="#2b7cff"];

  // --- Bank Accounts Cluster ---
  subgraph cluster_banks {
    label="🏦 Bank Accounts";
    style="rounded,dashed";
    color="#4a90e2";
    fontcolor="#1a4b99";
    fontsize=13;
    fontname="Inter";
    margin=10;

    Salary [label="💼 Salary Account", shape=folder, fillcolor="#e8f3ff"];
    Investment [label="📈 Investment Account", shape=folder, fillcolor="#e6f7ff"];
    Medical [label="🏥 Medical Account", shape=folder, fillcolor="#e6f7ff"];
    
    { rank=same; Salary; Investment; Medical; }
  }

  // --- Medical Mutual Funds Cluster ---
  subgraph cluster_medical_funds {
    label="Mutual Funds";
    style="rounded,dashed";
    color="#66cdaa";
    fontcolor="#2f6655";
    fontsize=13;
    fontname="Inter";

    MedFund [label="💊 Medical Fund\n(Arbitrage)", shape=folder, fillcolor="#f0fff0"];
    Emergency [label="🚨 Emergency Fund\n(Liquid, Hybrids)", shape=folder, fillcolor="#fff4e6"];
    
    { rank=same; MedFund; Emergency; }
  }

  // --- Credit Cards & Rewards Cluster ---
  subgraph cluster_credit_cards {
    label="💳 Credit Cards & Rewards";
    style="rounded,dashed,invis";
    color="#ffa500";
    fontcolor="#cc6600";
    fontsize=13;
    fontname="Inter";
    
    MedCard [label="💳 Medical Credit Card", shape=folder, fillcolor="#fff4e6", style="invis"];
    RewardPoints [label="✨ Reward Points", shape=folder, fillcolor="#f9f0ff", style="invis"];
  }

  // --- Health Insurance Cluster ---
  subgraph cluster_insurance {
    label="🩺 Health Insurance";
    style="rounded,dashed,invis";
    color="#20b2aa";
    fontcolor="#105955";
    fontsize=13;
    fontname="Inter";

    PersonalIns [label="🛡️ Personal Policy", shape=folder, fillcolor="#e6fff0", style="invis"];
    SpouseIns [label="🏢 Spouse Employer", shape=folder, fillcolor="#e6fff0", style="invis"];
    EmpIns [label="🏢 My Employer", shape=folder, fillcolor="#e6fff0", style="invis"];
    
    { rank=same; EmpIns; SpouseIns; PersonalIns; }
  }

  // --- Expenses & Destinations Cluster ---
  subgraph cluster_expenses {
    label="💰 Expenses";
    style="rounded,dashed,invis";
    color="#ff6b81";
    fontcolor="#c0392b";
    fontsize=13;
    fontname="Inter";

    MedExpenses [label="🧾 Medical Expenses", shape=folder, fillcolor="#f0fff0", style="invis"];
    Hospital [label="🏨 Hospitalizations", shape=folder, fillcolor="#fff7e6", style="invis"];
    
    { rank=same; MedExpenses; Hospital; }
  }

  // --- Flows (Investments) ---
  Salary -> Medical [label=" Monthly allocation"];
  Salary -> Investment [label=" Planned allocation"];
  Investment -> MedFund [label=" Invest"];
  MedFund -> Investment [label=" Redeem"];
  Emergency -> Investment [label=" Redeem on unplanned"];
  Investment -> Medical [label=" Hospitalizations/Top ups"];

  edge [style="invis"];
  // --- Credit Card Bill Payment Flow ---
  Medical -> MedCard [label=" Bill Payment (direct)", style="invis"];

  // --- Spending Flows ---
  Medical -> MedExpenses [label=" UPI Scan to Pay"];
  MedCard -> MedExpenses [label=" Card Spend"];
  MedCard -> Hospital [label=" Emergency Spends"];

  // --- Insurance Flow ---
  SpouseIns -> Hospital [label=" Coverage", ltail=cluster_insurance];

  // --- Rewards Flow ---
  MedCard -> RewardPoints [label=" Earn"];
}
```


--
<!-- .slide: data-transition="fade" -->
## 4️⃣ Medical Expenses 🏥
```dot
digraph MedicalFlow {
  compound=true; 
  rankdir=TB; 
  bgcolor=transparent;
  splines=true;
  overlap=false;

  node [shape=rectangle, style="rounded,filled", fontname="Inter", fontsize=12, fillcolor="#f7fbff"];
  edge [arrowsize=0.9, fontname="Inter", fontsize=10, color="#2b7cff"];

  // --- Bank Accounts Cluster ---
  subgraph cluster_banks {
    label="🏦 Bank Accounts";
    style="rounded,dashed";
    color="#4a90e2";
    fontcolor="#1a4b99";
    fontsize=13;
    fontname="Inter";
    margin=10;

    Salary [label="💼 Salary Account", shape=folder, fillcolor="#e8f3ff"];
    Investment [label="📈 Investment Account", shape=folder, fillcolor="#e6f7ff"];
    Medical [label="🏥 Medical Account", shape=folder, fillcolor="#e6f7ff"];
    
    { rank=same; Salary; Investment; Medical; }
  }

  // --- Medical Mutual Funds Cluster ---
  subgraph cluster_medical_funds {
    label="Mutual Funds";
    style="rounded,dashed";
    color="#66cdaa";
    fontcolor="#2f6655";
    fontsize=13;
    fontname="Inter";

    MedFund [label="💊 Medical Fund\n(Arbitrage)", shape=folder, fillcolor="#f0fff0"];
    Emergency [label="🚨 Emergency Fund\n(Liquid, Hybrids)", shape=folder, fillcolor="#fff4e6"];
    
    { rank=same; MedFund; Emergency; }
  }

  // --- Credit Cards & Rewards Cluster ---
  subgraph cluster_credit_cards {
    label="💳 Credit Cards & Rewards";
    style="rounded,dashed,invis";
    color="#ffa500";
    fontcolor="#cc6600";
    fontsize=13;
    fontname="Inter";
    
    MedCard [label="💳 Medical Credit Card", shape=folder, fillcolor="#fff4e6", style="invis"];
    RewardPoints [label="✨ Reward Points", shape=folder, fillcolor="#f9f0ff", style="invis"];
  }

  // --- Health Insurance Cluster ---
  subgraph cluster_insurance {
    label="🩺 Health Insurance";
    style="rounded,dashed,invis";
    color="#20b2aa";
    fontcolor="#105955";
    fontsize=13;
    fontname="Inter";

    PersonalIns [label="🛡️ Personal Policy", shape=folder, fillcolor="#e6fff0", style="invis"];
    SpouseIns [label="🏢 Spouse Employer", shape=folder, fillcolor="#e6fff0", style="invis"];
    EmpIns [label="🏢 My Employer", shape=folder, fillcolor="#e6fff0", style="invis"];
    
    { rank=same; EmpIns; SpouseIns; PersonalIns; }
  }

  // --- Expenses & Destinations Cluster ---
  subgraph cluster_expenses {
    label="💰 Expenses";
    style="rounded,dashed";
    color="#ff6b81";
    fontcolor="#c0392b";
    fontsize=13;
    fontname="Inter";

    MedExpenses [label="🧾 Medical Expenses", shape=folder, fillcolor="#f0fff0"];
    Hospital [label="🏨 Hospitalizations", shape=folder, fillcolor="#fff7e6", style="invis"];
    
    { rank=same; MedExpenses; Hospital; }
  }

  // --- Flows (Investments) ---
  Salary -> Medical [label=" Monthly allocation"];
  Salary -> Investment [label=" Planned allocation"];
  Investment -> MedFund [label=" Invest"];
  MedFund -> Investment [label=" Redeem"];
  Emergency -> Investment [label=" Redeem on unplanned"];
  Investment -> Medical [label=" Hospitalizations/Top ups"];

  // --- Credit Card Bill Payment Flow ---
  Medical -> MedCard [label=" Bill Payment (direct)", style="invis"];

  // --- Spending Flows ---
  Medical -> MedExpenses [label=" UPI Scan to Pay"];
  edge [style="invis"];
  MedCard -> MedExpenses [label=" Card Spend"];
  MedCard -> Hospital [label=" Emergency Spends"];

  // --- Insurance Flow ---
  SpouseIns -> Hospital [label=" Coverage", ltail=cluster_insurance];

  // --- Rewards Flow ---
  MedCard -> RewardPoints [label=" Earn"];
}
```

--
<!-- .slide: data-transition="fade" -->
## 4️⃣ Medical Expenses 🏥
```dot
digraph MedicalFlow {
  compound=true; 
  rankdir=TB; 
  bgcolor=transparent;
  splines=true;
  overlap=false;

  node [shape=rectangle, style="rounded,filled", fontname="Inter", fontsize=12, fillcolor="#f7fbff"];
  edge [arrowsize=0.9, fontname="Inter", fontsize=10, color="#2b7cff"];

  // --- Bank Accounts Cluster ---
  subgraph cluster_banks {
    label="🏦 Bank Accounts";
    style="rounded,dashed";
    color="#4a90e2";
    fontcolor="#1a4b99";
    fontsize=13;
    fontname="Inter";
    margin=10;

    Salary [label="💼 Salary Account", shape=folder, fillcolor="#e8f3ff"];
    Investment [label="📈 Investment Account", shape=folder, fillcolor="#e6f7ff"];
    Medical [label="🏥 Medical Account", shape=folder, fillcolor="#e6f7ff"];
    
    { rank=same; Salary; Investment; Medical; }
  }

  // --- Medical Mutual Funds Cluster ---
  subgraph cluster_medical_funds {
    label="Mutual Funds";
    style="rounded,dashed";
    color="#66cdaa";
    fontcolor="#2f6655";
    fontsize=13;
    fontname="Inter";

    MedFund [label="💊 Medical Fund\n(Arbitrage)", shape=folder, fillcolor="#f0fff0"];
    Emergency [label="🚨 Emergency Fund\n(Liquid, Hybrids)", shape=folder, fillcolor="#fff4e6"];
    
    { rank=same; MedFund; Emergency; }
  }

  // --- Credit Cards & Rewards Cluster ---
  subgraph cluster_credit_cards {
    label="💳 Credit Cards & Rewards";
    style="rounded,dashed";
    color="#ffa500";
    fontcolor="#cc6600";
    fontsize=13;
    fontname="Inter";
    
    MedCard [label="💳 Medical Credit Card", shape=folder, fillcolor="#fff4e6"];
    RewardPoints [label="✨ Reward Points", shape=folder, fillcolor="#f9f0ff"];
  }

  // --- Health Insurance Cluster ---
  subgraph cluster_insurance {
    label="🩺 Health Insurance";
    style="rounded,dashed,invis";
    color="#20b2aa";
    fontcolor="#105955";
    fontsize=13;
    fontname="Inter";

    PersonalIns [label="🛡️ Personal Policy", shape=folder, fillcolor="#e6fff0", style="invis"];
    SpouseIns [label="🏢 Spouse Employer", shape=folder, fillcolor="#e6fff0", style="invis"];
    EmpIns [label="🏢 My Employer", shape=folder, fillcolor="#e6fff0", style="invis"];
    
    { rank=same; EmpIns; SpouseIns; PersonalIns; }
  }

  // --- Expenses & Destinations Cluster ---
  subgraph cluster_expenses {
    label="💰 Expenses";
    style="rounded,dashed";
    color="#ff6b81";
    fontcolor="#c0392b";
    fontsize=13;
    fontname="Inter";

    MedExpenses [label="🧾 Medical Expenses", shape=folder, fillcolor="#f0fff0"];
    Hospital [label="🏨 Hospitalizations", shape=folder, fillcolor="#fff7e6", style="invis"];
    
    { rank=same; MedExpenses; Hospital; }
  }

  // --- Flows (Investments) ---
  Salary -> Medical [label=" Monthly allocation"];
  Salary -> Investment [label=" Planned allocation"];
  Investment -> MedFund [label=" Invest"];
  MedFund -> Investment [label=" Redeem"];
  Emergency -> Investment [label=" Redeem on unplanned"];
  Investment -> Medical [label=" Hospitalizations/Top ups"];

  // --- Credit Card Bill Payment Flow ---
  Medical -> MedCard [label=" Bill Payment (direct)", style="dotted"];

  // --- Spending Flows ---
  Medical -> MedExpenses [label=" UPI Scan to Pay"];
  MedCard -> MedExpenses [label=" Card Spend"];
  MedCard -> Hospital [label=" Emergency Spends", style="invis"];

  // --- Insurance Flow ---
  SpouseIns -> Hospital [label=" Coverage", ltail=cluster_insurance, style="invis"];

  // --- Rewards Flow ---
  MedCard -> RewardPoints [label=" Earn"];
}
```

--
<!-- .slide: data-transition="fade" -->
## 4️⃣ Medical Expenses 🏥
```dot
digraph MedicalFlow {
  compound=true; 
  rankdir=TB; 
  bgcolor=transparent;
  splines=true;
  overlap=false;

  node [shape=rectangle, style="rounded,filled", fontname="Inter", fontsize=12, fillcolor="#f7fbff"];
  edge [arrowsize=0.9, fontname="Inter", fontsize=10, color="#2b7cff"];

  // --- Bank Accounts Cluster ---
  subgraph cluster_banks {
    label="🏦 Bank Accounts";
    style="rounded,dashed";
    color="#4a90e2";
    fontcolor="#1a4b99";
    fontsize=13;
    fontname="Inter";
    margin=10;

    Salary [label="💼 Salary Account", shape=folder, fillcolor="#e8f3ff"];
    Investment [label="📈 Investment Account", shape=folder, fillcolor="#e6f7ff"];
    Medical [label="🏥 Medical Account", shape=folder, fillcolor="#e6f7ff"];
    
    { rank=same; Salary; Investment; Medical; }
  }

  // --- Medical Mutual Funds Cluster (Moved Below Banks) ---
  subgraph cluster_medical_funds {
    label="Mutual Funds";
    style="rounded,dashed";
    color="#66cdaa";
    fontcolor="#2f6655";
    fontsize=13;
    fontname="Inter";

    MedFund [label="💊 Medical Fund\n(Arbitrage)", shape=folder, fillcolor="#f0fff0"];
    Emergency [label="🚨 Emergency Fund\n(Liquid, Hybrids)", shape=folder, fillcolor="#fff4e6"];
    
    { rank=same; MedFund; Emergency; }
  }

  // --- Credit Cards & Rewards Cluster ---
  subgraph cluster_credit_cards {
    label="💳 Credit Cards & Rewards";
    style="rounded,dashed";
    color="#ffa500";
    fontcolor="#cc6600";
    fontsize=13;
    fontname="Inter";
    
    MedCard [label="💳 Medical Credit Card", shape=folder, fillcolor="#fff4e6"];
    RewardPoints [label="✨ Reward Points", shape=folder, fillcolor="#f9f0ff"];
  }

  // --- Health Insurance Cluster ---
  subgraph cluster_insurance {
    label="🩺 Health Insurance";
    style="rounded,dashed";
    color="#20b2aa";
    fontcolor="#105955";
    fontsize=13;
    fontname="Inter";

    PersonalIns [label="🛡️ Personal Policy", shape=folder, fillcolor="#e6fff0"];
    SpouseIns [label="🏢 Spouse Employer", shape=folder, fillcolor="#e6fff0"];
    EmpIns [label="🏢 My Employer", shape=folder, fillcolor="#e6fff0"];
    
    { rank=same; EmpIns; SpouseIns; PersonalIns; }
  }

  // --- Expenses & Destinations Cluster ---
  subgraph cluster_expenses {
    label="💰 Expenses";
    style="rounded,dashed";
    color="#ff6b81";
    fontcolor="#c0392b";
    fontsize=13;
    fontname="Inter";

    MedExpenses [label="🧾 Medical Expenses", shape=folder, fillcolor="#f0fff0"];
    Hospital [label="🏨 Hospitalizations", shape=folder, fillcolor="#fff7e6"];
    
    { rank=same; MedExpenses; Hospital; }
  }

  // --- Flows (Investments) ---
  Salary -> Medical [label=" Monthly allocation"];
  Salary -> Investment [label=" Planned allocation"];
  Investment -> MedFund [label=" Invest"];
  MedFund -> Investment [label=" Redeem"];
  Emergency -> Investment [label=" Redeem on unplanned"];
  Investment -> Medical [label=" Hospitalizations/Top ups"];

  // --- Credit Card Bill Payment Flow ---
  Medical -> MedCard [label=" Bill Payment (direct)", style="dotted"];

  // --- Spending Flows ---
  Medical -> MedExpenses [label=" UPI Scan to Pay"];
  MedCard -> MedExpenses [label=" Card Spend"];
  MedCard -> Hospital [label=" Emergency Spends"];

  // --- Insurance Flow ---
  SpouseIns -> Hospital [label=" Coverage", ltail=cluster_insurance];

  // --- Rewards Flow ---
  MedCard -> RewardPoints [label=" Earn"];
}
```

---
<!-- .slide: data-transition="fade" -->
## 5️⃣ Travel Spends ✈️
```dot
digraph TravelFlow {
  rankdir=TB;
  bgcolor=transparent;
  splines=true;
  overlap=false;

  node [shape=rectangle, style="rounded,filled", fontname="Inter", fontsize=12, fillcolor="#f7fbff"];
  edge [arrowsize=0.9, fontname="Inter", fontsize=10, color="#2b7cff"];

  // --- Bank Accounts Cluster ---
  subgraph cluster_banks {
    label="🏦 Bank Accounts";
    style="rounded,dashed";
    color="#4a90e2";
    fontcolor="#1a4b99";
    fontsize=13;
    fontname="Inter";
    margin=10;
    edge [minlen=0.5];

    Salary [label="💼 Salary Account", shape=folder, fillcolor="#e8f3ff"];
    Investment [label="📈 Investment Account", shape=folder, fillcolor="#e6f7ff"];
    Travel [label="✈️ Travel Account", shape=folder, fillcolor="#e6f7ff"];

    { rank=same; Salary; Investment; Travel; }
  }

  // --- Travel Mutual Funds Cluster ---
  subgraph cluster_travel_funds {
    label="Mutual Funds";
    style="rounded,dashed";
    color="#00e6d9";
    fontcolor="#009991";
    fontsize=13;
    fontname="Inter";

    Arbitrage [label="⚖️ Travel Fund\n(Arbitrage)", shape=folder, fillcolor="#e6fff0"];
  }

  // --- Credit Cards & Rewards Cluster ---
  subgraph cluster_credit_cards {
    label="💳 Credit Cards & Rewards";
    style="rounded,dashed,invis";
    color="#ffa500";
    fontcolor="#cc6600";
    fontsize=13;
    fontname="Inter";

    TravelCard [label="💳 Primary Credit Card", shape=folder, fillcolor="#fff4e6", style="invis"];
    RewardPoints [label="✨ Reward Points", shape=folder, fillcolor="#f9f0ff", style="invis"];
  }

  // --- Expenses & Destinations Cluster ---
  subgraph cluster_expenses {
    label="💰 Expenses";
    style="rounded,dashed,invis";
    color="#ff6b81";
    fontcolor="#c0392b";
    fontsize=13;
    fontname="Inter";

    TravelExpense [label="🧾 Travel Expenses", shape=folder, fillcolor="#f0fff0", style="invis"];
    FlightHotel [label="🏨 Flights & Hotels", shape=folder, fillcolor="#fff7e6", style="invis"];
  }

  // --- Flows (Investments & Transfers) ---
  Salary -> Investment [label=" Monthly travel\nallocation", weight=10];
  Investment -> Arbitrage [label=" Invest"];
  Arbitrage -> Investment [label=" Redeem"];
  Investment -> Travel [label=" Transfer", weight=10];

  edge [style="invis"];
  // --- Credit Card Bill Payment Flow ---
  Travel -> TravelCard [label=" Bharat Connect (Bill Pay)", style="invis"];

  // --- UPI Spending Flows ---
  Travel -> TravelExpense [label=" UPI Scan to Pay"];

  // --- Spending Flows (Credit Card) ---
  TravelCard -> FlightHotel [label=" Online Bookings"];
  TravelCard -> TravelExpense [label=" Card Spend"];

  // --- Rewards Flow (Earn & Redeem) ---
  TravelCard -> RewardPoints [label=" Earn on Spends"];
  RewardPoints -> FlightHotel [label=" Redeem for Bookings", color="#9b59b6"];
}
```

--
<!-- .slide: data-transition="fade" -->
## 5️⃣ Travel Spends ✈️
```dot
digraph TravelFlow {
  rankdir=TB;
  bgcolor=transparent;
  splines=true;
  overlap=false;

  node [shape=rectangle, style="rounded,filled", fontname="Inter", fontsize=12, fillcolor="#f7fbff"];
  edge [arrowsize=0.9, fontname="Inter", fontsize=10, color="#2b7cff"];

  // --- Bank Accounts Cluster ---
  subgraph cluster_banks {
    label="🏦 Bank Accounts";
    style="rounded,dashed";
    color="#4a90e2";
    fontcolor="#1a4b99";
    fontsize=13;
    fontname="Inter";
    margin=10;
    edge [minlen=0.5];

    Salary [label="💼 Salary Account", shape=folder, fillcolor="#e8f3ff"];
    Investment [label="📈 Investment Account", shape=folder, fillcolor="#e6f7ff"];
    Travel [label="✈️ Travel Account", shape=folder, fillcolor="#e6f7ff"];

    { rank=same; Salary; Investment; Travel; }
  }

  // --- Travel Mutual Funds Cluster ---
  subgraph cluster_travel_funds {
    label="Mutual Funds";
    style="rounded,dashed";
    color="#00e6d9";
    fontcolor="#009991";
    fontsize=13;
    fontname="Inter";

    Arbitrage [label="⚖️ Travel Fund\n(Arbitrage)", shape=folder, fillcolor="#e6fff0"];
  }

  // --- Credit Cards & Rewards Cluster ---
  subgraph cluster_credit_cards {
    label="💳 Credit Cards & Rewards";
    style="rounded,dashed,invis";
    color="#ffa500";
    fontcolor="#cc6600";
    fontsize=13;
    fontname="Inter";

    TravelCard [label="💳 Primary Credit Card", shape=folder, fillcolor="#fff4e6", style="invis"];
    RewardPoints [label="✨ Reward Points", shape=folder, fillcolor="#f9f0ff", style="invis"];
  }

  // --- Expenses & Destinations Cluster ---
  subgraph cluster_expenses {
    label="💰 Expenses";
    style="rounded,dashed";
    color="#ff6b81";
    fontcolor="#c0392b";
    fontsize=13;
    fontname="Inter";

    TravelExpense [label="🧾 Travel Expenses", shape=folder, fillcolor="#f0fff0"];
    FlightHotel [label="🏨 Flights & Hotels", shape=folder, fillcolor="#fff7e6", style="invis"];
  }

  // --- Flows (Investments & Transfers) ---
  Salary -> Investment [label=" Monthly travel\nallocation", weight=10];
  Investment -> Arbitrage [label=" Invest"];
  Arbitrage -> Investment [label=" Redeem"];
  Investment -> Travel [label=" Transfer", weight=10];

  // --- Credit Card Bill Payment Flow ---
  Travel -> TravelCard [label=" Bharat Connect (Bill Pay)", style="invis"];

  // --- UPI Spending Flows ---
  Travel -> TravelExpense [label=" UPI Scan to Pay"];

  edge [style="invis"];
  // --- Spending Flows (Credit Card) ---
  TravelCard -> FlightHotel [label=" Online Bookings"];
  TravelCard -> TravelExpense [label=" Card Spend"];

  // --- Rewards Flow (Earn & Redeem) ---
  TravelCard -> RewardPoints [label=" Earn on Spends"];
  RewardPoints -> FlightHotel [label=" Redeem for Bookings", color="#9b59b6"];
}
```

--
<!-- .slide: data-transition="fade" -->
## 5️⃣ Travel Spends ✈️
```dot
digraph TravelFlow {
  rankdir=TB; // top-to-bottom layout
  bgcolor=transparent;
  splines=true;
  overlap=false;

  node [shape=rectangle, style="rounded,filled", fontname="Inter", fontsize=12, fillcolor="#f7fbff"];
  edge [arrowsize=0.9, fontname="Inter", fontsize=10, color="#2b7cff"];

  // --- Bank Accounts Cluster ---
  subgraph cluster_banks {
    label="🏦 Bank Accounts";
    style="rounded,dashed";
    color="#4a90e2";
    fontcolor="#1a4b99";
    fontsize=13;
    fontname="Inter";
    margin=10; // Tightens the padding inside this cluster only
    edge [minlen=0.5];

    Salary [label="💼 Salary Account", shape=folder, fillcolor="#e8f3ff"];
    Investment [label="📈 Investment Account", shape=folder, fillcolor="#e6f7ff"];
    Travel [label="✈️ Travel Account", shape=folder, fillcolor="#e6f7ff"];
    
    { rank=same; Salary; Investment; Travel; }
  }

  // --- Travel Mutual Funds Cluster ---
  subgraph cluster_travel_funds {
    label="Mutual Funds";
    style="rounded,dashed";
    color="#00e6d9";
    fontcolor="#009991";
    fontsize=13;
    fontname="Inter";

    Arbitrage [label="⚖️ Travel Fund\n(Arbitrage)", shape=folder, fillcolor="#e6fff0"];
  }

  // --- Credit Cards & Rewards Cluster ---
  subgraph cluster_credit_cards {
    label="💳 Credit Cards & Rewards";
    style="rounded,dashed";
    color="#ffa500";
    fontcolor="#cc6600";
    fontsize=13;
    fontname="Inter";

    TravelCard [label="💳 Primary Credit Card", shape=folder, fillcolor="#fff4e6"];
    RewardPoints [label="✨ Reward Points", shape=folder, fillcolor="#f9f0ff"];
  }

  // --- Expenses & Destinations Cluster ---
  subgraph cluster_expenses {
    label="💰 Expenses";
    style="rounded,dashed";
    color="#ff6b81";
    fontcolor="#c0392b";
    fontsize=13;
    fontname="Inter";

    TravelExpense [label="🧾 Travel Expenses", shape=folder, fillcolor="#f0fff0"];
    FlightHotel [label="🏨 Flights & Hotels", shape=folder, fillcolor="#fff7e6"];
  }

  // --- Flows (Investments & Transfers) ---
  // High weight keeps these specific nodes tightly aligned and short
  Salary -> Investment [label=" Monthly travel\nallocation", weight=10]; 
  Investment -> Arbitrage [label=" Invest"];
  Arbitrage -> Investment [label=" Redeem"];
  Investment -> Travel [label=" Transfer", weight=10];

  // --- Credit Card Bill Payment Flow ---
  Travel -> TravelCard [label=" Bharat Connect (Bill Pay)", style="dotted"];

  // --- UPI Spending Flows ---
  Travel -> TravelExpense [label=" UPI Scan to Pay"];

  // --- Spending Flows (Credit Card) ---
  TravelCard -> FlightHotel [label=" Online Bookings"];
  TravelCard -> TravelExpense [label=" Card Spend"];
  
  // --- Rewards Flow (Earn & Redeem) ---
  TravelCard -> RewardPoints [label=" Earn on Spends"];
  RewardPoints -> FlightHotel [label=" Redeem for Bookings", color="#9b59b6"]; 
}
```
---

## 6️⃣ Bill Payment Overhead
- Earlier I used to have multiple credit cards each assigned to its own purpose
- Now, consolidated all them into a 1 Primary Credit Card
- Overhead is in marking each entry for a specific purpose
- Pay parts of credit card bill from the corresponding bank account

---

## 7️⃣ Summary
1. **Segment money by purpose** → clarity & reduced financial stress
2. **Budget yearly, allocate monthly** → spending is always planned
3. **Automate transfers** → less friction, fewer missed allocations
4. **Credit cards as tools** → earn rewards on every rupee spent
5. **Match liquidity to time horizon** → short-term needs backed by liquid assets

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
for more...
</p>
</div>

<h3 data-gsap='{"from": {"opacity": 0, "scale": 3, "rotation": 360}, "duration": 1.5, "delay": 4.5, "ease": "elastic.out(1, 0.3)"}'>
<strong>✨ Thank You 🙏</strong>
</h3>

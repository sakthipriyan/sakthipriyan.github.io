---
title: "Using Form 12BAA to Reduce Cashflow Drag on International Investments"
date: "2026-03-19"
draft: false
type: "blogs"
wealth_tags:
  - "TCS"
  - "Form 12BAA"
  - "LRS"
  - "Cashflow"
  - "International Investing"
summary: "How salaried Indians investing internationally via LRS can use Form 12BAA to reduce cashflow drag from TCS, optimize compounding, and avoid capital lock-in."
---

## Who is this for?

This applies to:
- Salaried individuals in India
- Investing internationally via LRS (e.g., US equities, ETFs)
- Crossing the ₹10 lakh remittance threshold
- Looking to optimize **cashflow and compounding**, not just tax filing

## 🧩 The Problem: TCS Creates Hidden Cashflow Friction

Under the Liberalised Remittance Scheme (LRS):

- Up to ₹10 lakh/year → no TCS
- Beyond ₹10 lakh → **20% TCS applies**

This TCS:
- Is **not an additional tax**
- Can be claimed back or adjusted

However:

> It creates a **timing mismatch** — your capital is blocked even though it is already your money.

## ⚙️ Example Scenario

Assume:

- You invest ₹1,00,000 start of every month
- By Jan 1st → you reach ₹10,00,000 in total
- Feb 1st → ₹1,00,000 + ₹20,000 TCS
- Mar 1st → ₹1,00,000 + ₹20,000 TCS


## ❌ Case 1: Without Using Form 12BAA

You do nothing during the year.


### ⏳ Capital Lock Duration
| Month | TCS | Available Back |
|------|-----|----------------|
| Feb  | 20K | Oct (~8 months) |
| Mar  | 20K | Oct (~7 months) |

### 📈 What is the actual cost of TCS lock-in?
This can be modelled using a limited contribution SIP calculation.

Using [RealValue SIP Engine](https://sakthipriyan.com/building-wealth/tools/realvalue-sip-engine/#v1otd8mf202601c0lm20kg12h10i6t15p2m):

- If you invest ₹20,000/month for 2 months (Feb & Mar), and it remains locked for 8 and 7 months respectively, at 12% CAGR:
   - **Total invested:** ₹40,000
   - **Portfolio value after lock-in:** ₹42,936 (nominal), ₹41,301 (real, inflation-adjusted)
   - **Post-tax value:** ₹42,495 (nominal), ₹40,876 (real)

So, the **opportunity cost** of TCS lock-in is about ₹2,500 (nominal) at 12% expected return.

This is the hidden drag on your compounding — and why optimizing TCS adjustment timing matters!

## ✅ Case 2: Using Form 12BAA (Adjustment via Salary TDS)
**Backstory**: Before discovering 12BAA form, I felt too much tax drag in international investment.
Actually this one enabled me to take LRS route since other avenues are closed/non optimal.

You declare TCS to your employer using 12BAA form.

Employer adjusts against future TDS:

- Feb 1st ₹20K:
  - ₹10K adjusted in Feb 28th salary
  - ₹10K adjusted in Mar 31st salary
- Mar 1st ₹20K:
  - Fully adjusted in Mar 31st salary

### ⏳ Capital Lock Duration

| Month | TCS | Adjustment |
|------|-----|------------|
| Feb  | 20K | Feb + Mar |
| Mar  | 20K | Mar |

#### 💡 Opportunity Cost Calculation (with proration)

| Month | TCS | Adjustment Schedule | Amount | Lock Period | Value if Invested @12% p.a. | Opportunity Cost |
|-------|-----|---------------------|--------|-------------|-----------------------------|------------------|
| Feb   | 20K | 50% Feb end         | 10K    | 1 month     | ₹10,094                     | ₹94              |
|       |     | 50% Mar end         | 10K    | 2 months    | ₹10,189                     | ₹189             |
| Mar   | 20K | 100% Mar end        | 20K    | 1 month     | ₹20,188                     | ₹188             |

**Total opportunity cost for Case 2:**
- For ₹20K: ₹471 (vs ~₹2,500 in Case 1)

This shows how using Form 12BAA to adjust TCS via salary TDS dramatically reduces the compounding drag, as the capital is locked for a much shorter period. If you are scaling up international investment and not using 12BAA, you are just leaving lot of cash on the table for no good reason.

## ⚖️ Why This Matters More for International Investing

- LRS limit = $250K (~₹2.32Cr)
- But TCS threshold = ₹10L

This creates a mismatch:

- You are allowed to invest large amounts
- But **cashflow friction starts very early**

## 🧾 Final Thought

> Tax optimization is not just about how much you pay —  
> it is also about **when your money is available to compound**.

## 📊 Tracking

- I plan and track monthly remittance/TCS paid using [RealValue FX Engine](/building-wealth/tools/realvalue-fx-engine/)
- I promptly fill up 12BAA form to HR/Payroll team for TCS setup in the system
  - Since this was relatively new one, there was some initial hesitation/delay in setting this up

---

## 🔗 Related Reading
- [How to Invest in NASDAQ 100 from India (Mutual Funds, ETFs, and IBKR Guide)](/building-wealth/blogs/how-to-invest-in-nasdaq-100-from-india-mutual-funds-etfs-and-ibkr-guide/)
- [Funding Interactive Brokers from India Using FX Retail](/building-wealth/blogs/funding-interactive-brokers-from-india-using-fx-retail/)

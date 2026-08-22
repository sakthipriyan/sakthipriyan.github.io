---
title: "FX Retail via BHIM Bharat Connect: An 11-Day Lien and What It Actually Cost"
slug: "failed-fx-retail-bhim-bharat-connect-transaction"
date: "2026-08-22"
draft: false
type: "blogs"
js_tools:
  - echarts
wealth_tags:
  - FX Retail
  - Forex
  - BHIM
  - Bharat Connect
  - ICICI Bank
  - Bank of Baroda
  - NPCI
  - LRS
  - International Investing
  - Remittance
  - Risk Management
summary: "A failed FX Retail booking via BHIM Bharat Connect put a substantial sum under lien for 11 days, with BHIM, ICICI, and FX Retail each pointing at the others. The money came back — the July 31 entry window it was meant for never did. The full account, and what it actually cost."
---

> **📖 [The Global Indian Investor](/building-wealth/books/the-global-indian-investor/)**
>
> Learn how to build a globally diversified portfolio from India. **7 of 12 chapters are live**, covering LRS, FX, global indexes, and Irish ETFs.

---

## FX Retail Booking Failed in BHIM But Amount Liened

On **July 31, 2026**, I attempted a routine forex purchase via the Bharat Connect/Forex option on the BHIM app — the same [hybrid flow](/building-wealth/blogs/fx-retail-via-bharat-connect-private-bank-speed-at-public-bank-rates-a-live-transaction-walkthrough/) I'd already used successfully three times before. The UPI mandate went through, and the amount was **liened**. Nothing else happened: no deal confirmation, no failure message, no funds movement.

> It took 11 days to remove the lien after an enormous number of follow-ups across the board.

That failure reshaped the month's investment plan. With the lien still unresolved on **August 7**, I executed the domestic legs (Nifty 50, Midcap 150) and left Nasdaq 100 blocked — full numbers in [State of the 1 Portfolio — August 2026](/building-wealth/blogs/state-of-the-1-portfolio-returns-allocation-rebalancing-august-2026/). Once the lien cleared on **Day 11**, I moved straight to [Bank of Baroda's manual FX Retail flow](/building-wealth/blogs/bank-of-baroda-fx-retail-for-ibkr-from-a-0.10-per-usd-markup-to-an-additional-foreign-bank-charge/), and the Nasdaq 100 leg was bought two days later, on August 13. That fallback carried its own surprise: an [additional foreign bank charge](/building-wealth/blogs/bank-of-baroda-fx-retail-for-ibkr-from-a-0.10-per-usd-markup-to-an-additional-foreign-bank-charge/#the-foreign-bank-charge-a-structural-cost-not-a-one-off) I only discovered by using it.

> Due to market movements and money being locked for 11 days, I'd already lost a significant growth opportunity — one that was gone for good regardless of how the lien resolved. [How much, exactly, is below](#what-i-actually-lost).

## Why This Channel Has So Many Places to Fail

| Route | Parties in the Chain | Role of Each Party |
| :--- | :--- | :--- |
| **Direct** — bank's own card rate, not FX Retail | Bank | Bank quotes its own rate and executes the remittance. No CCIL/FX Retail platform involved at all. |
| **FX Retail Web** | Bank + FX Retail (CCIL) | FX Retail (CCIL) handles rate discovery and deal booking on the CCIL web platform; the bank executes the wire against the booked deal. |
| **FX Retail via Bharat Connect** — App | Bank + FX Retail (CCIL) + Bharat Connect + a UPI app (BHIM, CRED, etc.) | A Bharat Connect-enabled UPI app — BHIM, in my case, though CRED and others also support it — surfaces the Forex option and initiates the UPI mandate; Bharat Connect routes the booking request; FX Retail (CCIL) does deal discovery and booking; the bank settles the actual remittance. |

Every extra party in that chain is a rate improvement when the flow works — it's what let me [combine a public-bank spread with private-bank execution speed](/building-wealth/blogs/fx-retail-via-bharat-connect-private-bank-speed-at-public-bank-rates-a-live-transaction-walkthrough/). But it's also one more organization with a legitimate claim that a failure "isn't (only) their problem" when something breaks. My failure happened somewhere between BHIM and ICICI — and once it did, all four parties in that bottom row had somewhere else to point.

## What I Actually Lost

Everything financial about this was eventually made whole:

- **The principal** — released in full after 11 days under lien.
- **The investment itself** — completed on August 13 via the Bank of Baroda fallback, at that day's rate and price.
- **The plan** — this month's [drift correction](/building-wealth/blogs/state-of-the-1-portfolio-returns-allocation-rebalancing-august-2026/#drift-correction-aka-monthly-investment) still executed, just later and in two parts instead of one.

What didn't come back is the **July 31 entry itself** — and unlike the lien, that's something I can actually put a number on, by comparing what was planned on July 31 against what actually executed on August 12–13.

| Leg | Planned (Jul 31) | Actual | Move | Basis |
| :--- | ---: | ---: | ---: | :--- |
| USD/INR (booked rate) | ₹95.6075 | ₹95.515 | -0.0925 (9 paise cheaper) | Planned rate backed out of the mandate amount less this route's standard ~10 paise/USD buffer, both figures kept out of this post. Actual is what the [Bank of Baroda remittance](/building-wealth/blogs/bank-of-baroda-fx-retail-for-ibkr-from-a-0.10-per-usd-markup-to-an-additional-foreign-bank-charge/) booked on August 12. |
| [ANAU](https://funds.axa-im.com/en/fund/bnp-paribas-easy-ii-nasdaq-100-ucits-etf-accumulation-usd/#performanceRisk) per unit | $24.4689 | $25.8999 | **+$1.4310 (+5.85%)** | The Nasdaq 100 UCITS ETF (USD Acc) I invest through. Actual is the real August 13 fill. Because ANAU is exchange-traded, a fill tracks the *previous* day's NAV — this one landed within half a cent of August 12's. The planned side therefore uses July 30's NAV, which keeps both ends on identical footing. |

The chart below covers the whole window, from the day before the attempt to the day the units were finally bought. The line is the RBI reference rate; the red dots are my own two bookings.

```echarts
{
  "title": { "text": "USD/INR — Mid-Market, FX Retail, and a Bank Card Rate", "left": "center", "textStyle": { "color": "#2c3e50", "fontSize": 15, "fontWeight": 600 } },
  "tooltip": { "trigger": "axis" },
  "legend": { "bottom": 0, "data": ["RBI Reference Rate", "My FX Retail Rate", "SBI TT Sell (card rate)"] },
  "color": ["#2563EB", "#DC2626", "#F97316"],
  "grid": { "left": "13%", "right": "6%", "top": "18%", "bottom": "17%" },
  "xAxis": { "type": "category", "data": ["Jul 30","Jul 31","Aug 3","Aug 4","Aug 5","Aug 6","Aug 7","Aug 10","Aug 11","Aug 12","Aug 13","Aug 14"] },
  "yAxis": { "type": "value", "scale": true, "name": "₹ per USD", "nameLocation": "middle", "nameGap": 50 },
  "series": [
    { "name": "RBI Reference Rate", "type": "line", "smooth": true, "data": [95.7327,95.3706,95.2601,95.3487,95.1237,95.2053,95.2135,95.2560,95.4321,95.4261,95.4098,95.4263] },
    { "name": "My FX Retail Rate", "type": "scatter", "symbolSize": 12, "data": [null,{ "value": 95.6075, "label": { "show": true, "position": "top", "formatter": "Attempted", "fontSize": 11, "fontWeight": 600, "color": "#334155" } },null,null,null,null,null,null,null,{ "value": 95.5150, "label": { "show": true, "position": "top", "formatter": "Executed", "fontSize": 11, "fontWeight": 600, "color": "#334155" } },null,null] },
    { "name": "SBI TT Sell (card rate)", "type": "line", "smooth": true, "lineStyle": { "type": "dashed" }, "data": [96.05,95.85,95.75,95.81,95.60,95.57,95.75,95.60,95.80,95.86,95.86,95.85] }
  ]
}
```

My FX Retail bookings sit about midway between the mid-market benchmark and a bank card rate — roughly 24 paise above one and below the other — and the rupee itself barely moved across the episode, so the currency wasn't what this cost me.

```echarts
{
  "title": { "text": "ANAU — Published NAV vs. My Entry Points", "left": "center", "textStyle": { "color": "#2c3e50", "fontSize": 15, "fontWeight": 600 } },
  "tooltip": { "trigger": "axis" },
  "legend": { "bottom": 0, "data": ["NAV (USD Acc)", "My Entry"] },
  "color": ["#10B981", "#DC2626"],
  "grid": { "left": "12%", "right": "6%", "top": "18%", "bottom": "17%" },
  "xAxis": { "type": "category", "data": ["Jul 30","Jul 31","Aug 3","Aug 4","Aug 5","Aug 6","Aug 7","Aug 10","Aug 11","Aug 12","Aug 13"] },
  "yAxis": { "type": "value", "scale": true, "name": "USD", "nameLocation": "middle", "nameGap": 45 },
  "series": [
    { "name": "NAV (USD Acc)", "type": "line", "smooth": true, "data": [24.4689,24.6163,25.0537,25.8860,25.6722,25.5725,25.8763,25.7904,25.7065,25.8957,26.1935] },
    { "name": "My Entry", "type": "scatter", "symbolSize": 12, "data": [null,{ "value": 24.4689, "label": { "show": true, "position": "bottom", "formatter": "Planned", "fontSize": 11, "fontWeight": 600, "color": "#334155" } },null,null,null,null,null,null,null,null,{ "value": 25.8999, "label": { "show": true, "position": "bottom", "formatter": "Executed", "fontSize": 11, "fontWeight": 600, "color": "#334155" } }] }
  ]
}
```

This is where the cost came from. The fund climbed almost without pause through the eleven days the money was frozen. Both red dots sit just under the NAV line, and deliberately so: an ANAU fill tracks the previous day's NAV rather than the current one. The executed dot is the real August 13 fill, which landed within half a cent of August 12's NAV; the planned dot applies the same rule to July 31 and sits at July 30's NAV. Like against like.

**Sources.** Fund NAVs from [AXA IM's ANAU page](https://funds.axa-im.com/en/fund/bnp-paribas-easy-ii-nasdaq-100-ucits-etf-accumulation-usd/#performanceRisk); USD/INR mid-market from the [RBI reference rate archive](https://www.rbi.org.in/scripts/referenceratearchive.aspx); SBI card rates from my own [captured rate history](https://data.sakthipriyan.com/). The two booked FX Retail rates and the August 13 fill price come from my own transaction records.

The FX leg moved in my favor by less than a tenth of a rupee per dollar — noise, in context. The fund leg didn't: buying on August 13 instead of July 31 meant paying **5.85% more** per unit for the exact same fund — net of the small FX offset, that works out to about **5.7% of whatever was actually invested that day**. I'm keeping the exact amount out of this post, but here's what that 5.7% means across a realistic range for a monthly tranche — each figure in the last column links into the [RealValue SIP Engine](/building-wealth/tools/realvalue-sip-engine/), pre-filled with that row's numbers:

| Amount Invested | Units of ANAU "Lost" | Value Lost (at Aug 13 price) | After 20 Years @ 20% | Same, in Today's Money After Tax |
| ---: | ---: | ---: | ---: | ---: |
| ₹1,00,000 | 2.3 | ₹5,700 | ₹2.19 L | [₹58,200](/building-wealth/tools/realvalue-sip-engine/#v1otd20yf202608c5.7km0kg20h0i6t15p20y) |
| ₹2,00,000 | 4.6 | ₹11,500 | ₹4.41 L | [₹1.17 L](/building-wealth/tools/realvalue-sip-engine/#v1otd20yf202608c11.5km0kg20h0i6t15p20y) |
| ₹5,00,000 | 11.6 | ₹28,700 | ₹11.0 L | [₹2.93 L](/building-wealth/tools/realvalue-sip-engine/#v1otd20yf202608c28.7km0kg20h0i6t15p20y) |
| ₹10,00,000 | 23.2 | ₹57,500 | ₹22.0 L | [₹5.87 L](/building-wealth/tools/realvalue-sip-engine/#v1otd20yf202608c57.5km0kg20h0i6t15p20y) |

The missing units don't just stay missing — they stop compounding. The 20% isn't a stretch: it's roughly what this asset delivered to a rupee investor over the past two decades — the Nasdaq 100 compounded at about **15.2%** in USD across 2006–2025, and the rupee gave up another **~3.8% a year** against the dollar over the same stretch. At that rate a ₹57,500 gap becomes about **₹22 lakh** over 20 years, or **₹5.9 lakh in today's money** once discounted for 6% inflation and 15% tax.

To be clear about what that is: not a realised cash loss, and not a claim of permanent 5.7% underperformance. It's the same rupees buying fewer units of the same fund, and no resolution buys back July 31's price. The estimate I gave the bank on Day 7, written before I knew how the market would move, lands in the same range.

> Money under lien is a recoverable state — released, usable, invested, eventually. A missed entry window isn't. "Invest on July 31" and "invest on August 13" are two different trades, and once July 31 passes the first one no longer exists as an option. The 11 days and the runaround between four organizations both resolved. That month's entry price didn't.

## Actions Taken & Responses

What follows is the full contact log — every email, call, branch visit, and reply — condensed into one table. Amounts and reference numbers are omitted throughout; timestamps and the substance of each message are not.

Before the detail, the shape of it — every contact I initiated, by day and channel:

```echarts
{
  "title": { "text": "What It Took: My Outbound Contacts by Day", "left": "center", "textStyle": { "color": "#2c3e50", "fontSize": 15, "fontWeight": 600 } },
  "tooltip": { "trigger": "axis", "axisPointer": { "type": "shadow" } },
  "legend": { "bottom": 0, "data": ["Email", "Call", "X", "X Chat", "Branch"] },
  "color": ["#2563EB", "#F97316", "#DC2626", "#7C3AED", "#10B981"],
  "grid": { "left": "10%", "right": "6%", "top": "18%", "bottom": "17%" },
  "xAxis": { "type": "category", "data": ["D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13"] },
  "yAxis": { "type": "value", "name": "contacts", "nameLocation": "middle", "nameGap": 35, "minInterval": 1 },
  "series": [
    { "name": "Email", "type": "bar", "stack": "t", "data": [1,1,0,4,3,1,1,1,0,0,3,0,2] },
    { "name": "Call", "type": "bar", "stack": "t", "data": [0,1,0,3,1,2,3,0,0,0,0,0,0] },
    { "name": "X", "type": "bar", "stack": "t", "data": [0,0,0,1,2,3,1,2,0,0,2,0,0] },
    { "name": "X Chat", "type": "bar", "stack": "t", "data": [0,0,0,1,1,0,1,1,0,0,0,0,0] },
    { "name": "Branch", "type": "bar", "stack": "t", "data": [0,0,0,1,0,0,0,0,0,0,0,0,0] }
  ]
}
```

Forty-three contacts I had to initiate across thirteen days, on top of everything arriving the other way. The three empty bars are Sunday, Saturday and Sunday. The tallest is Day 4 — ten contacts on the day I was told to get an NOC from a UPI handle, and the day I went public. Effort then tapers while nothing moves, and Day 11, the day it actually cleared, took five. SMS appears nowhere because it only ever went one way: the mandate confirmation on Day 1 was the only one I got.

```echarts
{
  "title": {
    "text": "When the Work Happened — Hour by Day",
    "left": "center",
    "textStyle": {
      "color": "#2c3e50",
      "fontSize": 15,
      "fontWeight": 600
    }
  },
  "tooltip": {
    "position": "top",
    "formatter": "{b}"
  },
  "grid": {
    "left": "12%",
    "right": "6%",
    "top": "16%",
    "bottom": "18%"
  },
  "xAxis": {
    "type": "category",
    "data": [
      "D1",
      "D2",
      "D3",
      "D4",
      "D5",
      "D6",
      "D7",
      "D8",
      "D9",
      "D10",
      "D11",
      "D12",
      "D13"
    ],
    "splitArea": {
      "show": true
    },
    "axisTick": {
      "show": false
    }
  },
  "yAxis": {
    "type": "category",
    "inverse": true,
    "data": [
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00"
    ],
    "splitArea": {
      "show": true
    },
    "axisTick": {
      "show": false
    }
  },
  "visualMap": {
    "min": 1,
    "max": 4,
    "calculable": false,
    "orient": "horizontal",
    "left": "center",
    "bottom": 0,
    "text": [
      "4 contacts",
      "1"
    ],
    "inRange": {
      "color": [
        "#dbeafe",
        "#93c5fd",
        "#3b82f6",
        "#1d4ed8"
      ]
    }
  },
  "series": [
    {
      "name": "Contacts",
      "type": "heatmap",
      "data": [
        {
          "value": [
            0,
            4,
            1
          ],
          "name": "Day 1, 11:00 — Email"
        },
        {
          "value": [
            1,
            8,
            2
          ],
          "name": "Day 2, 15:00 — Call, Email"
        },
        {
          "value": [
            3,
            4,
            1
          ],
          "name": "Day 4, 11:00 — Call"
        },
        {
          "value": [
            3,
            5,
            1
          ],
          "name": "Day 4, 12:00 — Branch"
        },
        {
          "value": [
            3,
            9,
            4
          ],
          "name": "Day 4, 16:00 — Email×2, Call×2"
        },
        {
          "value": [
            3,
            12,
            3
          ],
          "name": "Day 4, 19:00 — Email, X, X Chat"
        },
        {
          "value": [
            3,
            14,
            1
          ],
          "name": "Day 4, 21:00 — Email"
        },
        {
          "value": [
            4,
            1,
            2
          ],
          "name": "Day 5, 08:00 — Email, X"
        },
        {
          "value": [
            4,
            5,
            1
          ],
          "name": "Day 5, 12:00 — X Chat"
        },
        {
          "value": [
            4,
            9,
            1
          ],
          "name": "Day 5, 16:00 — Email"
        },
        {
          "value": [
            4,
            10,
            2
          ],
          "name": "Day 5, 17:00 — X, Call"
        },
        {
          "value": [
            4,
            11,
            1
          ],
          "name": "Day 5, 18:00 — Email"
        },
        {
          "value": [
            5,
            4,
            1
          ],
          "name": "Day 6, 11:00 — Email"
        },
        {
          "value": [
            5,
            5,
            1
          ],
          "name": "Day 6, 12:00 — X"
        },
        {
          "value": [
            5,
            6,
            2
          ],
          "name": "Day 6, 13:00 — X×2"
        },
        {
          "value": [
            5,
            10,
            1
          ],
          "name": "Day 6, 17:00 — Call"
        },
        {
          "value": [
            5,
            11,
            1
          ],
          "name": "Day 6, 18:00 — Call"
        },
        {
          "value": [
            6,
            3,
            1
          ],
          "name": "Day 7, 10:00 — X"
        },
        {
          "value": [
            6,
            5,
            1
          ],
          "name": "Day 7, 12:00 — Call"
        },
        {
          "value": [
            6,
            7,
            1
          ],
          "name": "Day 7, 14:00 — Call"
        },
        {
          "value": [
            6,
            8,
            2
          ],
          "name": "Day 7, 15:00 — Email, X Chat"
        },
        {
          "value": [
            6,
            10,
            1
          ],
          "name": "Day 7, 17:00 — Call"
        },
        {
          "value": [
            7,
            0,
            3
          ],
          "name": "Day 8, 07:00 — X, X Chat, Email"
        },
        {
          "value": [
            7,
            10,
            1
          ],
          "name": "Day 8, 17:00 — X"
        },
        {
          "value": [
            10,
            3,
            1
          ],
          "name": "Day 11, 10:00 — Email"
        },
        {
          "value": [
            10,
            4,
            3
          ],
          "name": "Day 11, 11:00 — Email, X×2"
        },
        {
          "value": [
            10,
            9,
            1
          ],
          "name": "Day 11, 16:00 — Email"
        },
        {
          "value": [
            12,
            6,
            2
          ],
          "name": "Day 13, 13:00 — Email×2"
        }
      ],
      "label": {
        "show": true,
        "formatter": "{@[2]}",
        "fontSize": 10,
        "color": "#0f172a"
      },
      "itemStyle": {
        "borderColor": "#fff",
        "borderWidth": 2
      },
      "emphasis": {
        "itemStyle": {
          "shadowBlur": 6,
          "shadowColor": "rgba(0,0,0,0.3)"
        }
      }
    }
  ]
}
```

Each square is an hour in which I had to do something. Empty means nothing from me — the three blank columns are weekends. The work clusters into two bands: late mornings and the 16:00–19:00 stretch after a working day, which is when most of this actually got done.

<table>
  <thead>
    <tr><th>Date/Time</th><th>Channel</th><th>From</th><th>To</th><th>Message</th></tr>
  </thead>
  <tbody>
    <tr><td colspan="5"><div style="display:flex; justify-content:space-between;"><strong>Jul 31, Fri</strong><strong>Day 1</strong></div></td></tr>
    <tr><td>11:23</td><td>SMS</td><td>ICICI Bank</td><td>Me</td><td><em>"Your AutoPay mandate with ONETIME is successfully created towards Axis Bank from 31-Jul-26 to 31-Aug-26 for Rs. &lt;redacted&gt;, RRN &lt;redacted&gt; – ICICI Bank."</em> — the same amount that would show up as the lien minutes later.</td></tr>
    <tr><td>11:36</td><td>Email</td><td>Me</td><td>BHIM Support / FX Retail (CCIL)</td><td>Reported it the same hour: <em>"When I pressed Book, the UPI mandate went through and it liened the amount. But nothing happened further."</em> And the part that mattered most — <em>"Since the amount is liened I am not able to try again."</em></td></tr>
    <tr><td>17:08</td><td>Email</td><td>BHIM Support</td><td>Me</td><td><em>"We request you to kindly contact your respective bank… Your bank will be able to check the details and provide the necessary support."</em> The first handoff, on day one.</td></tr>
    <tr><td colspan="5"><div style="display:flex; justify-content:space-between;"><strong>Aug 1, Sat</strong><strong>Day 2</strong></div></td></tr>
    <tr><td>15:05</td><td>Call</td><td>Me</td><td>ICICI (Customer Care)</td><td>Called ICICI, discussed multiple items; raised the lien issue and was asked to contact a nearby branch.</td></tr>
    <tr><td>15:51</td><td>Email</td><td>Me</td><td>ICICI (NRI / Customer Care)</td><td>Forwarded the BHIM thread with the lien screenshot and two questions: when the amount would be accessible again, and what caused the booking to fail so it could be avoided next time. Sending it to two ICICI desks opened two separate service requests on the same incident, which then ran in parallel and never converged.</td></tr>
    <tr><td colspan="5"><div style="display:flex; justify-content:space-between;"><strong>Aug 2, Sun</strong><strong>Day 3</strong></div></td></tr>
    <tr><td>—</td><td>—</td><td>—</td><td>—</td><td>No response from any party; lien still in place.</td></tr>
    <tr><td colspan="5"><div style="display:flex; justify-content:space-between;"><strong>Aug 3, Mon</strong><strong>Day 4</strong></div></td></tr>
    <tr><td>11:45</td><td>Call</td><td>Me</td><td>Home branch DM</td><td>No answer. I'd waited two days hoping the lien would clear on its own; with the entire investment corpus blocked, I stopped waiting.</td></tr>
    <tr><td>~12:30</td><td>Branch</td><td>Me</td><td>Nearby ICICI branch</td><td>Went in person instead. Said only that I was there about a lien, and waited for my turn.</td></tr>
    <tr><td>12:44</td><td>Call</td><td>Home branch DM</td><td>Me</td><td>Called back while I was still waiting at the branch. He could see the lien but could not determine the reason for it, and said he'd escalate to the backend team. I left without taking it up with the branch, expecting it to be investigated.</td></tr>
    <tr><td>16:30</td><td>Email</td><td>ICICI (Wealth Management)</td><td>Me</td><td>Said the lien traced to "a notice from <strong>296bbf4d299b4206b5a17b64029bf593@upi</strong>" — an anonymous, machine-generated UPI handle; asked me to obtain a clearance letter or NOC from that "authority" and submit it at the nearest branch with original photo ID. No process exists to obtain an NOC from a UPI handle.</td></tr>
    <tr><td>16:42</td><td>Email</td><td>Me</td><td>BHIM / FX Retail / ICICI</td><td>Put all three on one thread and named the loop: <em>"BHIM is asking me to reach the bank, and the bank is asking me to reach out to BHIM. How long will it take to remove the lien?"</em> Noted three prior transactions through the same flow with no issues, and asked plainly: <em>"Who is this 296bbf4d299b4206b5a17b64029bf593@upi?"</em></td></tr>
    <tr><td>16:44</td><td>Email</td><td>ICICI (auto-reply)</td><td>Me</td><td><em>"We will assure you to respond within 1 business day."</em></td></tr>
    <tr><td>16:44</td><td>Call</td><td>Me</td><td>FX Retail (CCIL)</td><td>Called after the NOC email. They had no record of my Day 1 email at all.</td></tr>
    <tr><td>16:50</td><td>Email</td><td>Me</td><td>FX Retail (CCIL)</td><td>Resent the entire thread from the top, per that call.</td></tr>
    <tr><td>16:54</td><td>Call</td><td>Me</td><td>BHIM Support</td><td>Tried a couple of numbers found online. Couldn't reach anyone — BHIM has no phone line I could get through to.</td></tr>
    <tr><td>18:51</td><td>Email</td><td>ICICI (Customer Care)</td><td>Me</td><td>Said additional information was required; asked me to visit the nearest branch. <em>"We have checked the details and require additional information to process your request."</em></td></tr>
    <tr><td>19:12</td><td>Email</td><td>Me</td><td>ICICI (Customer Care)</td><td>Wrote back with everything I now knew and didn't know: the home branch DM couldn't explain the lien either, and <em>"I have absolutely no clue who this authority is."</em> Asked to be routed to the NRI/Money2World team that actually built the FX Retail Bharat Connect integration — <em>"I don't think anyone else understands the issue here"</em> — and noted the amount had been locked for no apparent reason.</td></tr>
    <tr><td>19:27</td><td>X</td><td>Me</td><td>@ICICIBank @ICICICare @NPCI_BHIM @NPCI_NPCI, cc @dilipasbe @RBI</td><td>Went public. Opened with <em>"Need help… Multiple lakhs of my funds have been under lien for several days after a transaction failed,"</em> then laid out the whole sequence over an eight-post thread: the same flow had worked multiple times before, the mandate succeeded but the booking never completed, and the reason given was a UPI handle nobody could identify. <a href="https://x.com/sakthipriyan/status/2084277485425119504">Thread →</a></td></tr>
    <tr><td>19:39</td><td>X Chat</td><td>Me</td><td>BHIM Support</td><td>Sent the full case summary by DM — the flow, the successful mandate, the failed booking, and every desk contacted so far.</td></tr>
    <tr><td>19:52</td><td>X Chat</td><td>BHIM Support</td><td>Me</td><td><em>"Please allow us some time as we are currently reviewing this."</em></td></tr>
    <tr><td>21:33</td><td>Email</td><td>Me</td><td>BHIM / FX Retail / ICICI</td><td>Did the investigation myself and sent the evidence: the AutoPay mandate SMS from Day 1, matching the lien in net banking to the paisa. <em>"This AutoPay mandate was never executed due to a failure, yet the lien continues to remain on my account."</em> Asked four specific questions — which entity holds the lien, the reason code behind it, the RRN's current status, and why it survived a failed execution.</td></tr>
    <tr><td>21:35</td><td>Email</td><td>ICICI (auto-reply)</td><td>Me</td><td>Second automated reply of the day, this one noting <em>"you have reached out to us multiple times"</em> and promising <em>"our expert team is reviewing them… You will hear from us shortly."</em> The next substantive reply from ICICI came seven days later.</td></tr>
    <tr><td>22:45</td><td>Email</td><td>ICICI (Wealth Management)</td><td>Me</td><td>Replied to the "who is this UPI handle" question by asking for four things about my branch visit: date, branch name, IFSC code, and the name of the employee I'd spoken with. Nothing about the lien.</td></tr>
    <tr><td colspan="5"><div style="display:flex; justify-content:space-between;"><strong>Aug 4, Tue</strong><strong>Day 5</strong></div></td></tr>
    <tr><td>08:46</td><td>Email</td><td>Me</td><td>ICICI (Wealth Management)</td><td>Wrote the whole sequence out end to end — the failed booking, the customer care call, the branch visit, the NOC email — and named what I thought the actual problem was: <em>"there appears to be an integration gap between BHIM/FX Retail and ICICI Bank for this Bharat Connect/Forex transaction."</em> Asked to be escalated to the team that owns Bharat Connect/UPI AutoPay and Forex, with a concrete timeline.</td></tr>
    <tr><td>08:49</td><td>Email</td><td>ICICI (auto-reply)</td><td>Me</td><td>Three minutes later, the machine: <em>"you have reached out to us multiple times… our expert team is reviewing them."</em></td></tr>
    <tr><td>08:56</td><td>X</td><td>Me</td><td>@UPI_NPCI, @ICICIBank_Care</td><td>Kept the thread alive: <em>"In a multi party transaction when things goes wrong everyone asking to reach out to other."</em></td></tr>
    <tr><td>09:09</td><td>Email</td><td>BHIM Support</td><td>Me</td><td><em>"Please allow us some time as we are currently reviewing your details with our internal team. We will update you as soon as we have more information."</em></td></tr>
    <tr><td>12:14</td><td>X Chat</td><td>Me</td><td>Bharat Connect</td><td>Opened a second DM thread — sent the mandate SMS and a link to the public thread.</td></tr>
    <tr><td>15:13</td><td>X Chat</td><td>Bharat Connect</td><td>Me</td><td><em>"We kindly request you to connect with the BHIM Support Team."</em></td></tr>
    <tr><td>16:30</td><td>X Chat</td><td>BHIM Support</td><td>Me</td><td><em>"We kindly request you to contact your respective bank."</em></td></tr>
    <tr><td>16:31</td><td>Email</td><td>Me</td><td>BHIM Support</td><td>Replied to the morning's "allow us some time" with the only thing I wanted: <em>"If i can get an update on when i will get further details/timeline for resolution that would be great."</em></td></tr>
    <tr><td>17:38</td><td>X</td><td>Me</td><td>Public post</td><td>Posted the loop as it actually was: Bharat Connect says contact BHIM, BHIM says contact ICICI, ICICI says get an NOC from the "Authority." <em>"No one is really taking ownership to help the customer."</em></td></tr>
    <tr><td>17:56</td><td>Call</td><td>Me</td><td>FX Retail (CCIL)</td><td>Second call. They forwarded the issue to the ICICI official who owns the system and said ICICI would reach out.</td></tr>
    <tr><td>18:19</td><td>Email</td><td>Me</td><td>FX Retail (CCIL) / BHIM / ICICI</td><td>Sent SMS and lien screenshots after the call above; shared account/customer IDs; asked for help.</td></tr>
    <tr><td>18:24</td><td>Email</td><td>ICICI (auto-reply)</td><td>Me</td><td>Same template, second time today.</td></tr>
    <tr><td>18:38</td><td>Email</td><td>FX Retail (CCIL)</td><td>Me</td><td><em>"We have forwarded your query to the concerned officials at ICICI Bank… The team will get in touch with you shortly."</em> No one did.</td></tr>
    <tr><td>19:19</td><td>Email</td><td>ICICI (Head Service Quality)</td><td>Me</td><td>A separate grievance ticket opened at the Head Service Quality office: <em>"We shall update you with the status by August 10, 2026."</em> Six days, for money that was already frozen.</td></tr>
    <tr><td colspan="5"><div style="display:flex; justify-content:space-between;"><strong>Aug 5, Wed</strong><strong>Day 6</strong></div></td></tr>
    <tr><td>11:49</td><td>Email</td><td>Me</td><td>FX Retail (CCIL)</td><td>Still nothing from the bank, money still liened. Said I'd check back the same evening if I hadn't heard from them.</td></tr>
    <tr><td>12:15</td><td>X</td><td>Me</td><td>@ICICIBank_Care</td><td>FX Retail had passed the case to the ICICI official who owns the system, and said ICICI would call. Nobody did. <em>"Radio silence from customer care and wealth management email ids as well."</em></td></tr>
    <tr><td>13:11</td><td>X</td><td>Me</td><td>@ICICIBank_Care</td><td>First time I put a rupee figure on it publicly — what not investing on 31 July had already cost me — and asked whether the bank would bear it, or at minimum give a timeline.</td></tr>
    <tr><td>13:23</td><td>X</td><td>Me</td><td>@ICICIBank_Care</td><td><em>"Any timeline on when you will be able to give me a timeline to resolve this?"</em></td></tr>
    <tr><td>17:42, 18:24</td><td>Call</td><td>Me</td><td>FX Retail (CCIL)</td><td>Third and fourth calls, and the first time the owner moved: FX Retail said the issue had to be resolved by the BHIM/NPCI team, and that NPCI officials had already passed it to BHIM. Day 4 it was ICICI's; Day 6 it was BHIM's.</td></tr>
    <tr><td>18:31</td><td>Call</td><td>FX Retail (CCIL)</td><td>Me</td><td>Someone on the FX Retail team called me back on a direct line — the first time anyone in this whole chain rang me without being chased.</td></tr>
    <tr><td colspan="5"><div style="display:flex; justify-content:space-between;"><strong>Aug 6, Thu</strong><strong>Day 7</strong></div></td></tr>
    <tr><td>10:17</td><td>X</td><td>Me</td><td>@ICICIBank_Care @NPCI_BHIM</td><td>FX Retail had now confirmed the issue <em>"needs to be resolved by @NPCI_BHIM"</em> — the third party to name a different owner. Asked them to expedite.</td></tr>
    <tr><td>12:08, 14:02</td><td>Call</td><td>Me</td><td>FX Retail (CCIL) — direct line</td><td>Tried the direct line twice. The person assisting me was unavailable both times.</td></tr>
    <tr><td>15:38</td><td>Email</td><td>Me</td><td>BHIM / FX Retail / ICICI</td><td>New thread, subject line <em>"Urgent Escalation: Day 7 – BHIM/FX Retail/Bharat Connect-Forex Lien Still Not Resolved."</em> Relayed what FX Retail had said on the phone the day before, put the same rupee estimate of the lost investment opportunity in writing, and asked for a status and an expected timeline.</td></tr>
    <tr><td>15:40</td><td>Email</td><td>BHIM Support (automated)</td><td>Me</td><td>Two minutes later, a brand new ticket — not the one opened on Day 1 — asking for my registered mobile number, transaction ID, and a screenshot of the error. All of it had already been sent, more than once. <em>"Our team will review your request and get back to you within 24 hours."</em></td></tr>
    <tr><td>15:41</td><td>X Chat</td><td>Me</td><td>BHIM Support</td><td>Sent them the <em>original</em> ticket ID from Day 1 by DM, plus a link to the day's post, to stop the case fragmenting further.</td></tr>
    <tr><td>15:43</td><td>Email</td><td>ICICI (auto-reply)</td><td>Me</td><td>And the ICICI template, to close out five minutes in which one escalation produced a new ticket, a request for details already supplied, and two automated non-answers.</td></tr>
    <tr><td>17:01</td><td>Call</td><td>Me</td><td>FX Retail (CCIL)</td><td>Fifth call to the one desk that kept picking up.</td></tr>
    <tr><td colspan="5"><div style="display:flex; justify-content:space-between;"><strong>Aug 7, Fri</strong><strong>Day 8</strong></div></td></tr>
    <tr><td>07:01</td><td>X</td><td>Me</td><td>@ICICIBank @ICICICare @NPCI_BHIM @NPCI_NPCI @dilipasbe</td><td>A six-post thread reframing the whole thing: <em>"This is no longer just a failed transaction. It is now a service deficiency arising from an end-to-end process failure, where the customer is left without ownership, communication, or a resolution timeline."</em> Asked for two things only — current status, and a date. <a href="https://x.com/sakthipriyan/status/2085539300146565597">Thread →</a></td></tr>
    <tr><td>07:06</td><td>X Chat</td><td>Me</td><td>BHIM Support</td><td>Forwarded that thread into the DM thread as well.</td></tr>
    <tr><td>07:37</td><td>Email</td><td>Me</td><td>BHIM / FX Retail / ICICI — seven desks, incl. Head of Service Quality and the Principal Nodal Officer</td><td>Went up the ladder. Subject: <em>"Urgent Escalation – Day 8: Failed FX Retail/Bharat Connect Transaction Still Unresolved."</em> Asked ICICI to assign one case owner to coordinate with BHIM/NPCI and FX Retail, since <em>"as a customer, I should not be required to coordinate between multiple organizations to resolve a failed transaction."</em> Requested three things — current status, expected release timeline, and the case owner's details — and said I'd otherwise take it to grievance redressal and regulatory channels.</td></tr>
    <tr><td>07:41, 07:45</td><td>Email</td><td>ICICI (auto-reply)</td><td>Me</td><td>Writing to the Principal Nodal Officer unlocked a different template: <em>"We acknowledge receipt of your email addressed to the higher authority… your concern has been escalated to the appropriate team… We request your patience while we examine the details."</em> It arrived twice, four minutes apart, on two separate threads — one escalation, two parallel cases. Still automated, still no owner, still no date.</td></tr>
    <tr><td>09:31</td><td>Call</td><td>FX Retail (CCIL)</td><td>Me</td><td>They rang me, verified that the issue was still unresolved since 31 July, and looped in the ICICI team.</td></tr>
    <tr><td>09:40</td><td>Email</td><td>FX Retail (CCIL)</td><td>ICICI escalation team (cc: Me)</td><td><em>"Looping ICICI team for support. Please look into the below customer issue on priority."</em> The platform operator escalating on my behalf, to a named ICICI contact.</td></tr>
    <tr><td>17:17</td><td>X</td><td>Me</td><td>@ICICIBank_Care</td><td><em>"Day 8 is also over. I have to keep posting this again over X, Email and calls on Day 11. 😔"</em></td></tr>
    <tr><td colspan="5"><div style="display:flex; justify-content:space-between;"><strong>Aug 8, Sat</strong><strong>Day 9</strong></div></td></tr>
    <tr><td>—</td><td>—</td><td>—</td><td>—</td><td>No response from any party; lien still in place.</td></tr>
    <tr><td colspan="5"><div style="display:flex; justify-content:space-between;"><strong>Aug 9, Sun</strong><strong>Day 10</strong></div></td></tr>
    <tr><td>—</td><td>—</td><td>—</td><td>—</td><td>No response from any party; lien still in place.</td></tr>
    <tr><td colspan="5"><div style="display:flex; justify-content:space-between;"><strong>Aug 10, Mon</strong><strong>Day 11</strong></div></td></tr>
    <tr><td>10:19</td><td>Email</td><td>Me</td><td>ICICI (Wealth Management)</td><td>Resent the Day 7 escalation verbatim to the desk that had gone quiet since Day 4.</td></tr>
    <tr><td>11:25</td><td>Email</td><td>Me</td><td>FX Retail / ICICI escalation desk (+ the same seven desks)</td><td>Same subject line, now reading <em>"Day 11."</em> Dropped the formal register: <em>"I have been running behind so many emails/calls/branches/x."</em> Narrowed everything down to two asks — remove the lien immediately, and confirm whether the BHIM/Bharat Connect Forex route is safe to try again — with a fallback: <em>"At least do 1 today."</em></td></tr>
    <tr><td>11:31, 11:35</td><td>Email</td><td>ICICI (auto-reply)</td><td>Me</td><td>The "higher authority" template, twice again, four minutes apart — the same doubling as Day 8. <em>"We request your patience while we examine the details."</em></td></tr>
    <tr><td>11:31</td><td>X</td><td>Me</td><td>@ICICIBank_Care @NPCI_BHIM</td><td><em>"Day 11, issue is neither resolved nor a timeline provided for resolution."</em> Said I'd be sending documentation of the loss.</td></tr>
    <tr><td>11:35</td><td>X</td><td>Me</td><td>@ICICIBank_Care @bhim</td><td>Narrowed the ask to two lines: remove the lien, and confirm whether the BHIM/Bharat Connect Forex route is safe to try again. <em>"At least do 1 today."</em></td></tr>
    <tr><td>11:36</td><td>Email</td><td>ICICI (escalation desk)</td><td>Me + BHIM + NPCI + internal ICICI</td><td>Eleven days in, the first straight answer from ICICI: <em>"The lien has been marked by the BHIM team. We have raised this concern with the team."</em> Sent to a wide list including an NPCI address, and tagging a named colleague for priority resolution. Note what this isn't — the NOC-from-a-UPI-handle instruction of Day 4 quietly stopped being the bank's position.</td></tr>
    <tr><td>11:41</td><td>Email</td><td>ICICI (escalation desk)</td><td>Me + all</td><td>Five minutes later: <strong>"…would like to recall the message."</strong> The recall notice went to the same wide list, NPCI included. Outlook recalls don't work on external mailboxes, so the original stayed sitting in my inbox — all the recall achieved was telling all fourteen recipients — BHIM and NPCI among them — that ICICI wanted that sentence taken back.</td></tr>
    <tr><td>13:15</td><td>Email</td><td>ICICI (auto-reply)</td><td>Me</td><td>The "you have reached out to us multiple times… <em>You will hear from us shortly</em>" template again, an hour and a half after the recall.</td></tr>
    <tr><td>15:54</td><td>Call</td><td>Home branch manager</td><td>Me</td><td>Explained the issue to him and passed on the email address of the backend team working on it. He asked me to call back if it wasn't resolved.</td></tr>
    <tr><td>16:12</td><td>Email</td><td>Me</td><td>ICICI (escalation desk)</td><td>Asked the only question the recall left me with: <em>"Should I pursue further with the BHIM team or ICICI team is addressing/resolving this issue?"</em> Then spelled out the relationship — a customer since 2009, across wealth, mutual funds, credit cards and securities, with the yearly domestic and international investments all routed through this account.</td></tr>
    <tr><td>16:36</td><td>Email</td><td>ICICI (escalation desk)</td><td>Me</td><td><em>"The lien is being marked by the BHIM team. We are following up with BHIM team to get this resolved on priority. Kindly allow us sometime."</em> Still no timeline, and no answer on whether I should keep chasing BHIM myself.</td></tr>
    <tr><td>17:38</td><td>Email</td><td>ICICI (Head Service Quality)</td><td>Me</td><td>The grievance ticket came back on its promised date — closed, on the strength of that call. The branch manager <em>"had spoken to you and we confirm that all your concerns related to account lien have been clarified."</em> He had ended the call by telling me to ring back if it wasn't resolved. It wasn't: the lien was still on the account as I read the email.</td></tr>
    <tr><td>18:12</td><td>Call</td><td>ICICI (NRI team)</td><td>Me</td><td>Briefed me that they were actively working with the BHIM team, and that a further update would follow. It never did — no confirmation ever came from the bank that the lien was gone.</td></tr>
    <tr><td>~21:00</td><td>App</td><td>Me</td><td>—</td><td><strong>Lien released.</strong> Found it myself, checking the balance in Samsung Wallet, because nobody was going to tell me.</td></tr>
    <tr><td colspan="5"><div style="display:flex; justify-content:space-between;"><strong>Aug 11, Tue</strong><strong>Day 12</strong></div></td></tr>
    <tr><td>14:01</td><td>Call</td><td>FX Retail (CCIL) — direct line</td><td>Me</td><td>Rang to ask whether the issue had been resolved. I confirmed the lien was gone. The only party in the entire chain that followed up on its own to close the loop — and it was the platform operator, not the bank holding the money.</td></tr>
    <tr><td>18:11</td><td>X Chat</td><td>Bharat Connect</td><td>Me</td><td><em>"The lien removal needs to be processed from the bank's end… We kindly request you to check with your bank."</em> Arrived a full day after the lien had already been released.</td></tr>
    <tr><td colspan="5"><div style="display:flex; justify-content:space-between;"><strong>Aug 12, Wed</strong><strong>Day 13</strong></div></td></tr>
    <tr><td>09:43</td><td>Email</td><td>ICICI (Wealth Management)</td><td>Me</td><td>Answered the Day 7 escalation, five days late and one account off: <em>"As per our record, there is no lien mark in your account xxxx&lt;redacted&gt;."</em> True, but that wasn't the account the lien had ever been on.</td></tr>
    <tr><td>13:00</td><td>Email</td><td>BHIM Support</td><td>Me</td><td>Word for word the same message as Day 5, eight days later: <em>"Please allow us some time as we are currently reviewing your details with our internal team."</em> Different agent, same template, two days after the lien was gone.</td></tr>
    <tr><td>13:01</td><td>Email</td><td>Me</td><td>BHIM Support</td><td><em>"Issue was resolved on 10 August 2026. Thank you."</em> The customer closing the loop for the support team.</td></tr>
    <tr><td>13:03</td><td>Email</td><td>Me</td><td>ICICI (Wealth Management)</td><td>Corrected the account and closed it out myself: <em>"Issue has been resolved on 10 Aug 2026 on the account ending with &lt;redacted&gt;. You can close all related tickets auto created on various email/x."</em></td></tr>
    <tr><td>13:05</td><td>Email</td><td>BHIM Support</td><td>Me</td><td>Closed the ticket, glad to hear <em>"the lien amount against the forex purchased has been released"</em> — describing a forex purchase that never happened. Thirteen days, and the closing message still had the transaction wrong.</td></tr>
    <tr><td>13:09</td><td>Email</td><td>ICICI (auto-reply)</td><td>Me</td><td>The sixth firing of that same template in nine days — this time in response to me telling them the issue was already closed. <em>"You will hear from us shortly."</em></td></tr>
    <tr><td>13:57</td><td>Email</td><td>ICICI (Wealth Management)</td><td>Me</td><td><em>"Thank you for your confirmation. In case of future, if you face any problem we request you write back to us for serving you happier."</em> The last message in thirteen days of correspondence, thanking me for confirming a resolution I had found myself.</td></tr>
  </tbody>
</table>

## Reflections

- **An additional relationship bank is what let me stop waiting for an answer I was never given.** It didn't lift the lien any faster; it meant that when the money came back I could route around the flow that had just swallowed it. I asked repeatedly whether the BHIM/Bharat Connect route was safe to retry, and never got a reply.
- **I picked the wrong door first.** Two days after it cleared, I wrote: [*"I should have pursued FX Retail helpline rather than connecting with customer cares of ICICI/BHIM."*](https://x.com/sakthipriyan/status/2087351454193639481) The generic customer-care desks at either end couldn't see the transaction at all; the platform operator in the middle was the only party that could reach the people who could.
- **Nobody could name an owner partly because, in their systems, there wasn't one case to own.** Every escalation spawned a new ticket rather than joining an existing one — two ICICI service requests, a second BHIM ticket asking again for details already supplied five times, and the nodal-officer address opening two parallel cases from one email, twice. Each desk was looking at a fragment, which is why the last thing I had to write was a request to *"close all related tickets auto created on various email/x."*

## Related Reading

- [State of the 1 Portfolio — August 2026](/building-wealth/blogs/state-of-the-1-portfolio-returns-allocation-rebalancing-august-2026/)
- [Bank of Baroda FX Retail for IBKR: From a ₹0.10 Per USD Markup to an Additional Foreign Bank Charge](/building-wealth/blogs/bank-of-baroda-fx-retail-for-ibkr-from-a-0.10-per-usd-markup-to-an-additional-foreign-bank-charge/)
- [FX Retail via Bharat Connect: Private Bank Speed at Public Bank Rates — A Live Transaction Walkthrough](/building-wealth/blogs/fx-retail-via-bharat-connect-private-bank-speed-at-public-bank-rates-a-live-transaction-walkthrough/)
- [Chapter 4: FX Retail — A Deep Dive](/building-wealth/books/the-global-indian-investor/04-fx-retail-a-deep-dive/)

## Disclaimer
### For educational purpose only
> This post reflects my personal experience and is not investment or financial advice. Amounts and identifiers are redacted. The FX rates are the ones that applied to my own planned and executed transactions; the fund NAVs are published figures. I don't have a confirmed root cause from BHIM, ICICI, or FX Retail, and your experience with this flow may differ from mine.

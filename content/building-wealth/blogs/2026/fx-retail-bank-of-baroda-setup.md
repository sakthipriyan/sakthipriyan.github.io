---
title: "Bank of Baroda FX Retail for IBKR: From a ₹0.10 Per USD Markup to an Additional Foreign Bank Charge"
date: "2026-08-22"
draft: false
type: "blogs"
wealth_tags:
  - Bank of Baroda
  - Cost Optimization
  - Forex
  - FX Retail
  - IBKR
  - International Investing
  - ISO 20022
  - LRS
  - Remittance
  - Wire Transfer
summary: "The full record of onboarding Bank of Baroda as a second FX Retail relationship bank — a cold email to treasury, branch paperwork, a USD 100 test remittance, the real 2-day transfer and SWIFT message quirks that followed, and a structural Foreign Bank Charge that narrows its cost advantage."
---

> With the easier [domestic options closed off](/building-wealth/books/the-global-indian-investor/02-three-paths-to-global-investing/#the-systematic-conclusion) by regulatory limits, I moved to LRS directly, where minimizing transaction cost became the priority. At the volume I was transferring, securing the lowest possible FX markup wasn't just an optimization — it was the deciding factor.

When ICICI Direct's **ISEC40** promo code got pulled, the economics of smaller, lower-volume transfers to IBKR stopped working — full backstory in [Chapter 3: LRS — How to Send Money](/building-wealth/books/the-global-indian-investor/03-lrs-how-to-send-money/#disadvantages-1). That sent me hunting for the best way to send money from India to my IBKR account, which led to discovering FX Retail Web as well as FX Retail via [Bharat Connect / Forex](https://www.bharat-connect.com/forex/) — and, as part of that journey, setting it up with Bank of Baroda. This article goes into full depth on that process.

It started with a cold email, went through the branch that took it on, and the paperwork chain that ended in a working test remittance — kept on file for the next time any part of it needs repeating.

## The Result, Up Front

This is a long post, so here's the short version before the full walkthrough:

- **FX markup**: Bank of Baroda's ₹0.10/USD was the lowest of the three banks I compared — on paper, the clear pick.
- **But**: its US correspondent bank charges a [Foreign Bank Charge](#the-foreign-bank-charge-a-structural-cost-not-a-one-off) that ICICI and HDFC's direct-to-Chase routes don't carry. That materially narrows the markup advantage.
- **Operationally**: a remittance takes about 2 days, plus a further day before the money is actually invested, because IBKR can't auto-match Bank of Baroda's SWIFT message the way it can ICICI's.
- **My conclusion**: [Bharat Connect / Forex](#my-conclusion) remains the cheapest and fastest route when it works; HDFC + FX Retail Web is the cleaner fallback; Bank of Baroda is now my last-resort backup, not the default.

Everything below is how I got there — the onboarding, the real transaction, and the SWIFT/FBC investigation that changed the conclusion.

## FX Rate Comparison

Before getting into the process, let's look at what we're trying to achieve. Here's the rate comparison that made Bank of Baroda the pick. All rates below are ₹ needed to buy $1. Google showed **95.41**; CCIL's USD buy rate showed **95.415** (12 Aug, 10:15 AM).

| Bank | Direct | FX Retail Web | Bharat Connect / Forex | <span style="color:#e65100">●</span> Total Processing Fee | Foreign Bank Charge |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Bank of Baroda | <span style="color:#888">●</span> 95.85 (+43.5p) | <span style="color:#2e7d32">●</span> 95.515 (+10p) | <span style="color:#2e7d32">●</span> 95.515 (+10p) | ₹1,000 (≤ ₹25,000)<br/>₹1,250 (> ₹25,000) | [Yes (variable)](https://www.bankofbaroda-usa.com/rates-and-charges/service-charges) |
| ICICI | <span style="color:#888">●</span> 96.83 (+141.5p) | <span style="color:#888">●</span> 97.115 (+170p) | <span style="color:#888">●</span> 95.615 (+20p) | ₹500 (≤ $500)<br/>₹1,000 (> $500) | Not observed |
| HDFC | <span style="color:#888">●</span> 97.16 (+174.5p) | <span style="color:#2e7d32">●</span> 95.915 (+50p) | <span style="color:#888">●</span> 95.615 (+20p) | ₹500 (≤ $500)<br/>₹1,000 (> $500) | Not observed |

<span style="color:#888">●</span> **Default, unnegotiated rate** &nbsp;&nbsp; <span style="color:#2e7d32">●</span> **Negotiated rate** &nbsp;&nbsp; <span style="color:#e65100">●</span> **+18% GST applied** — see [RealValue FX Engine](/building-wealth/tools/realvalue-fx-engine/) for breakup

## Prerequisites

- A **savings account** with Bank of Baroda. I didn't have one going in — opening it was the first real step.
- An **Authorised Dealer (AD) branch**, or one that's used to handling forex/remittance transactions — not every branch is.
- An existing FX Retail account with another bank, if Bank of Baroda is being added as an additional relationship bank rather than registered from scratch — registration itself is a one-time step and doesn't need repeating.

## Figuring Out the Branch and Account Setup

| Date | From | What Happened |
| :--- | :--- | :--- |
| <span style="white-space:nowrap">**Feb 10**</span> | Me | Cold email to Bank of Baroda's treasury desk — no existing relationship or referral — asking for the indicative FX markup over CCIL mid (CCIL, the Clearing Corporation of India, runs the FX Retail platform underneath all of this), SWIFT/handling/processing charges, relationship or volume-based pricing, and the onboarding process. Stated volume upfront: a low-to-mid four-figure USD amount per month to start. |
| <span style="white-space:nowrap">**Feb 10** (PM)</span> | Treasury | Treasury Marketing Department replied: indicative markup of **₹0.10/USD** over CCIL mid on FX Retail flows (subject to revision at the bank's discretion), SWIFT/handling charges to be confirmed with the AD/link branch, relationship and volume-based concessions available, and onboarding only after a recommendation from an AD branch. |
| <span style="white-space:nowrap">**Feb 27**</span> | Me | Emailed a Specialized MSME Branch in Chennai to open an individual savings account and confirm whether they were the AD branch treasury had pointed to. |
| <span style="white-space:nowrap">**Feb 27** (PM)</span> | Branch | Branch (Forex Manager) confirmed AD-branch status and asked for a phone number to take it further. |
| <span style="white-space:nowrap">**Mar 20**</span> | Me | Picked it back up after a multi-week scheduling gap — shared phone number, set up a branch visit. |
| <span style="white-space:nowrap">**Mar 26**</span> | Me | Visited the branch — opened a zero-balance savings account (enrolled, along with it, in a ₹20/year insurance scheme). |

## FX Retail Setup

| Date | From | What Happened |
| :--- | :--- | :--- |
| <span style="white-space:nowrap">**Mar 26**</span> | Me | Filled up the `FXRETAIL FORM.pdf` right there at the branch — turned out to be an older version of the form. |
| <span style="white-space:nowrap">**Mar 26**</span> | Branch | Branch sent the `FXRETAIL FORM.pdf` application and an FAQ/registration guide, with instructions to register on the FX Retail portal first, then submit the form for onward transmission to their treasury. |
| <span style="white-space:nowrap">**Mar 26** (PM)</span> | Me | Registered Bank of Baroda as an additional bank on FX Retail. CCIL confirmed within minutes: "Add Bank" request accepted, pending bank-side approval. |
| <span style="white-space:nowrap">**Mar 27**</span> | Branch | Branch asked for Annexure II plus a revised form. Annexure I turned out to be the trading-limit form — filled out for a **full year at a larger amount** rather than a small limit needing frequent renewal. Annexure II (forward contracts) wasn't applicable, and the branch confirmed it could be skipped. |
| <span style="white-space:nowrap">**Mar 31–Apr 6**</span> | Me | Two follow-ups chasing movement, citing year-end and a run of holidays slowing things down. |
| <span style="white-space:nowrap">**Apr 8**</span> | Branch | FX Retail onboarding completed — only after the form submission, just under 2 weeks after Annexure I went in on Mar 27. |

## Test Transaction

| Date | From | What Happened |
| :--- | :--- | :--- |
| <span style="white-space:nowrap">**Apr 10**</span> | Me | Requested a USD 100 test remittance, the first LRS transaction of the tax year, headed to the IBKR account. Branch sent the application and declaration forms. |
| <span style="white-space:nowrap">**Apr 13**</span> | Me | Submitted completed forms; branch asked the same day for a manually signed (non-editable) copy plus an underlying investment document proving the remittance was tied to the applicant. Sent the signed forms, IBKR's Account Confirmation Letter and Account Activity Statement. |
| <span style="white-space:nowrap">**Apr 15**</span> | Branch | Confirmed the file was clear — *"You may now report for USD 100 in FXRETAIL platform and provide deal confirmation."* |
| <span style="white-space:nowrap">**Apr 15**</span> | Me | Booked the deal on FX Retail and reported it. |
| <span style="white-space:nowrap">**Apr 15**</span> | Branch | Received the deal confirmation and completed the remittance the same day. |

## What Nine Weeks Bought

From the first cold email to a working test remittance took about nine weeks — though very little of that was active work, most of it was waiting on approvals, holidays, and a scheduling gap of my own. What it bought: a live relationship bank on my FX Retail account, ready to use without repeating any of this setup, at the ₹0.10/USD markup negotiated upfront before onboarding even started.

## Discovering Bharat Connect in the BoB App

The month after Bank of Baroda's onboarding wrapped up, the branch's Forex Manager was on leave — no one available to run the manual "get approval from the treasury/backend team, then process the Trade Deal PDF" process the branch requires. Digging through the **Bank of Baroda mobile app** for a self-service workaround, I discovered it too listed a **[Bharat Connect / Forex](https://www.bharat-connect.com/forex/)** option — the same route that gives ICICI and HDFC customers a default markup of **20 paise/USD**, documented in [FX Retail via Bharat Connect — A Live Transaction Walkthrough](/building-wealth/blogs/fx-retail-via-bharat-connect-private-bank-speed-at-public-bank-rates-a-live-transaction-walkthrough/). I started executing it via the **BHIM app** instead.

It stayed my default for regular remittances for the months after, simply because it kept working. Right up until it didn't: the full account of that failure, an 11-day lien and a permanently lost investment window, is in [FX Retail via BHIM Bharat Connect: An 11-Day Lien and What It Actually Cost](/building-wealth/blogs/failed-fx-retail-bhim-bharat-connect-transaction/). That failure is what sent this cycle's remittance to Bank of Baroda instead.

## Putting It to Real Use: Less Than 2 Days to IBKR

Four months later, with the account, FX Retail registration, and trading limit already in place from April, actually using it took two days:

| Date | From | What Happened |
| :--- | :--- | :--- |
| <span style="white-space:nowrap">**Aug 11, 09:12**</span> | Me | Emailed the branch requesting approval to book — attached the [Round 1 documents](#round-1--lrs-remittance--trade-deal-approval) (details below), reusing the same set from the Apr 15 test transaction. |
| <span style="white-space:nowrap">**Aug 11, 11:48**</span> | Me | Called the Forex Manager's mobile to check on approval — he'd been transferred to another branch and said he'd send the new Forex Manager's contact details. In the meantime, found the branch's landline on the bank's website and called that instead, which got the new Forex Manager's direct line. |
| <span style="white-space:nowrap">**Aug 11, 11:49**</span> | Me | Called the new Forex Manager directly, walked through the email/request — he started the process. |
| <span style="white-space:nowrap">**Aug 11, 13:42**</span><br/><span style="white-space:nowrap">**Aug 11, 14:17**</span> | Me | Two follow-up calls to check on approval — neither picked up. |
| <span style="white-space:nowrap">**Aug 11, 14:51**</span> | Me | Followed up by email instead, asking for backend/central-team confirmation so the deal could be booked the same day. |
| <span style="white-space:nowrap">**Aug 11, 16:21**</span> | Branch | Approved by email: *"You may take rate and provide us the pdf."* |
| <span style="white-space:nowrap">**Aug 11, 16:28**</span> | Me | Confirmed the trade would be booked the next morning once the market opened. |
| <span style="white-space:nowrap">**Aug 12, 10:07**</span> | Me | Sent the Trade Deal PDF; funds had already been transferred into the account to cover the remittance and the applicable Tax Collected at Source (TCS). |
| <span style="white-space:nowrap">**Aug 12, 11:17**</span> | Me | Called to confirm the trade deal email had gone through — it was processed shortly after. |
| <span style="white-space:nowrap">**Aug 12, 13:04**</span> | Branch | Confirmed the outward remittance completed — **XXX** sent to Interactive Brokers LLC, with **XXX** debited from the account to cover it, including charges and TCS. A separate SWIFT completion confirmation followed minutes later. |

Form submitted Tuesday morning, funds landed at IBKR by Wednesday evening — less than 2 days end to end, though a fair chunk of Tuesday was spent chasing the right person by phone rather than waiting on email. In hindsight, reaching out first thing when the branch opened on Aug 11 — rather than mid-morning — could plausibly have compressed this into a single day. (On the TCS: see [Using Form 12BAA to Reduce Cashflow Drag on International Investments](/building-wealth/blogs/using-form-12baa-to-reduce-cashflow-drag-on-international-investments/) for how to avoid that 20% sitting idle until tax filing.)

This is actually three separate clocks, not one:

- **Approval**: same-day, Aug 11 (09:12 request → 16:21 approved).
- **Remittance**: booked and completed Aug 12 — about 1 business day after approval.
- **Investment**: pushed a day further, to Aug 13, by the SWIFT matching gap covered next.

Less than 2 days for the money to move; 3 calendar dates before it was actually invested.

## The SWIFT Message Variations

Bank of Baroda's SWIFT message differs from ICICI's and HDFC's in ways that go beyond formatting — and one of those differences had a real, practical consequence.

### Impact

IBKR's own cash deposit confirmation explained it directly:

> Please note that the crediting of this transaction to your account was delayed because we did not receive enough information in the transaction message received from your originating bank/institution.

That match should have happened automatically — IBKR's system reads a specific structured field, Ultimate Creditor Name, to route funds straight to the right sub-account, and Bank of Baroda's message didn't populate it. The funds were available for trading the same day, per IBKR, but needed a manual match first. By the time that happened, the European exchanges where the [Irish ETFs](/building-wealth/books/the-global-indian-investor/06-what-to-buy-irish-etfs/) (tracking Nasdaq 100) trade had already closed — pushing the actual purchase to **Aug 13**, a day after the funds reached IBKR on **Aug 12**.

### What Differs

The rest of each message is boilerplate or effectively identical across banks; three fields actually differ:

| Field | Bank of Baroda | ICICI Bank | HDFC Bank |
| :--- | :--- | :--- | :--- |
| Instructed Agent BIC | BARBUS33XXX | CHASUS33XXX | CHASUS33XXX |
| Remittance Information | \<Name\> PAYMENT REFERENCE \<IBKR account no\> | — | \<IBKR account no\> \<Name\> INVESTMENT EQUITY |
| Ultimate Creditor Name | — | FURTHER CREDIT TO \<IBKR account no\> \<Name\> | — |

*(The trailing `XXX` in a BIC denotes the bank's primary/head office in standard SWIFT formatting — it isn't a redaction, unlike the account numbers elsewhere in this post.)*

**Instructed Agent BIC** shows the routing difference straight away: ICICI and HDFC both address Chase directly (`CHASUS33XXX`), because their USD nostro accounts sit at the same Chase branch that holds my IBKR account — one hop, done. Bank of Baroda routes through its own US correspondent (`BARBUS33XXX`) first, since its nostro relationship isn't with Chase directly. I don't have evidence this extra hop caused the delay — IBKR pointed at missing message information, not routing — but it's a real structural difference, and it's connected to a second problem: the [Foreign Bank Charge](#the-foreign-bank-charge-a-structural-cost-not-a-one-off) covered later in this post. On the ICICI and HDFC routes I examined, routing straight to Chase, I didn't observe an intermediary bank in the chain to charge one at all.

**Ultimate Creditor Name** is the structured field IBKR reads to auto-route to the right sub-account — only ICICI's message populates it. Bank of Baroda and HDFC have no equivalent field; both bury the same reference inside the unstructured **Remittance Information** text instead, which needs a human to read and match.

### Improving the SWIFT Message

Two SWIFT fields worth getting right on Bank of Baroda's side:

| SWIFT Field | Details |
| :--- | :--- |
| **Remittance Information** (`RmtInf > Ustrd`) | On the LRS A2 form, I filled in exactly `<IBKR account no> / <Name>` — the format IBKR's own instructions recommend. What actually went out in the SWIFT message was `<Name> PAYMENT REFERENCE <IBKR account no>` instead, a different order with "PAYMENT REFERENCE" inserted in between. That looks like an oversight in how the branch transcribed the form into their system, not a limitation of it — so simply confirming the field matches what was submitted, word for word, should fix it. |
| **Ultimate Creditor Name** (`UltmtCdtr > Nm`) | I don't yet know if Bank of Baroda's remittance processing system exposes an Ultimate Creditor field at all, or if branch staff only ever populate Remittance Information. Worth asking the branch directly before assuming it's out of reach. |

Since ICICI, using `UltmtCdtr > Nm`, landed the money in the brokerage account almost immediately, populating the same field on Bank of Baroda's side should eliminate this specific manual-matching problem. That's a narrower claim than "operationally equivalent to ICICI or HDFC" — it would fix the one thing I've actually diagnosed, not necessarily everything else that differs between a manual and an automated process.

## The Foreign Bank Charge: A Structural Cost, Not a One-Off

The [USD 100 test remittance](#test-transaction) showed **NIL** for Foreign Bank Charges (FBC), so I assumed there wasn't one. On this cycle's real remittance, there was — here's how that unfolded:

| Date | From | What Happened |
| :--- | :--- | :--- |
| <span style="white-space:nowrap">**Aug 17**</span> | Bank | SMS: *"Rs.XXX transferred from A/c ...XXX to:XXX. Total Bal:Rs.XXX CR. Avlbl Amt:Rs.XXX — Bank of Baroda"* — an unexpected debit, five days after the remittance had already completed. |
| <span style="white-space:nowrap">**Aug 17**</span> | Me | Emailed the branch, quoting the SMS, asking for an updated breakdown PDF. |
| <span style="white-space:nowrap">**Aug 18**</span> | Me | Followed up — asked the branch to clarify the reason for the additional debit (the April test transaction had no such charge), and requested documentation for Form 122/TCS purposes. |
| <span style="white-space:nowrap">**Aug 18**</span> | Branch | Confirmed: *"Rs.XXX is debited towards Foreign Bank Charges (FBC) deducted from us by the Intermediary Bank(s). If this charge has to be borne by the beneficiary, please use SHA option in the Application instead of OUR."* |
| <span style="white-space:nowrap">**Aug 18**</span> | Me | Asked for the FBC slab/rate schedule, to plan future transactions. |
| <span style="white-space:nowrap">**Aug 19**</span> | Me | Found [Bank of Baroda USA's FBC schedule](https://www.bankofbaroda-usa.com/rates-and-charges/service-charges) myself — confirmed it matched exactly for this transaction and the earlier one. |

This isn't a generic SWIFT-remittance risk that applies equally everywhere — it traces directly back to the routing difference already covered in [What Differs](#what-differs) above. ICICI and HDFC both address Chase directly (`CHASUS33XXX`), because their USD nostro accounts sit at the same Chase branch that holds my IBKR account — one hop, no intermediary bank in the chain, nothing to charge an FBC on. Bank of Baroda routes through its own US correspondent (`BARBUS33XXX`) first, and that correspondent is the point in the chain where this additional charge appears to arise. **Bank of Baroda's current routing creates a structural exposure to this charge, whereas the ICICI and HDFC routes I examined did not.**

The two options behave differently in practice, not just in who's nominally billed:

| Option | Intermediary's Cut | How It Reaches Me |
| :--- | :--- | :--- |
| **OUR** (the default) | Still taken out of the USD in transit, but Bank of Baroda has committed to the beneficiary receiving the full amount | Topped up separately and billed back to me in **INR**, at Bank of Baroda's own rate for the top-up — that's the ₹ charge in the notice above |
| **SHA** | Comes straight out of the USD en route, no make-whole billing | Beneficiary simply receives a slightly smaller USD amount — no separate INR debit at all |

So switching to **SHA** doesn't just shift who's nominally responsible — it changes the deduction from a separate INR charge (at whatever rate Bank of Baroda applies for the top-up) to a direct USD deduction from the transfer itself. My guess is **SHA works out cheaper**: the OUR top-up is billed at Bank of Baroda's own rate rather than a market rate, which is rarely in the customer's favor. But I've only ever used OUR (the default) — I haven't actually run a transaction through SHA to confirm.

Factoring this in changes the [FX Rate Comparison](#fx-rate-comparison) at the top of this post: Bank of Baroda's ~10 paise/USD markup edge over the Bharat Connect/FX Retail route was never the full cost picture, since ICICI and HDFC's rates never carried this charge to begin with. See [Bank of Baroda USA's published Foreign Bank Charges schedule](https://www.bankofbaroda-usa.com/rates-and-charges/service-charges) — the correspondent entity this charge actually comes from.

## Documents Submitted (Reference)

Everything went back and forth as PDFs — scanned copies of physically signed paper, not editable files — across three distinct rounds.

### Round 0 — FX Retail Setup

*Sent once, during FX Retail setup — then yearly, at financial year end.*

| File Name | Source | Notes |
| :--- | :--- | :--- |
| `FXRETAIL FORM.pdf` | Branch | Annexure I (trading-limit) filled and signed; Annexure II (forward-contract) left blank, not applicable. Expiry was set to the financial year end, so it needs resetting each year, based on that year's projected volume. |

### Round 1 — LRS Remittance & Trade Deal Approval

*Sent with the initial approval-request email, before booking.*

| File Name | Source | Notes |
| :--- | :--- | :--- |
| `BOB Outward Remittance Application Form_A2 CUM LRS DECLARATION.pdf` | Branch | Form A2 and the LRS Declaration combined into one document; signed, scanned. |
| `OVERSEAS PORTFOLIO INVESTMENT DECLARATION.docx` | Branch | Overseas Portfolio Investment under Liberalised Remittance Scheme — Self-Declaration by Remitter. |
| `Account Confirmation Letter.pdf` | IBKR | Underlying investment proof. Performance & Reports → Other Reports → Account Confirmation Letter. |
| `<IBKR account no>_<from date>_<to date>.pdf` | IBKR | Account Activity Statement. Performance & Reports → Statements → Activity Statement → Download PDF, after selecting the period (used Year to Date). |
| `Wire Details For Reference.pdf` | IBKR | Transfer & Pay → Transfer Funds → Deposit Funds → Create/use existing Bank Wire → enter the amount, and the next screen shows the precise details to fill in — printed to PDF. Added on top of the manually filled, printed, and scanned form, since a clean IBKR-generated document reads more clearly than a scan. |

### Round 2 — Trade Deal Confirmation

*Sent right after booking the deal on FX Retail Web.*

| File Name | Source | Notes |
| :--- | :--- | :--- |
| Trade Deal Confirmation PDF | FX Retail | Downloaded from FX Retail Web after booking (auto-named with a UUID by the platform), forwarded to the branch to complete settlement. |

## My Conclusion

Bharat Connect/Forex comes out ahead on both speed and overall cost. Across the times I've used it, it's worked **3 out of 4** — landing in an extra ~5 minutes each time — and failed once, the [11-day lien](/building-wealth/blogs/failed-fx-retail-bhim-bharat-connect-transaction/) covered elsewhere on this site. Bank of Baroda's lower headline markup doesn't actually win once the [Foreign Bank Charge](#the-foreign-bank-charge-a-structural-cost-not-a-one-off) is factored in — it adds enough cost to offset most of that markup advantage.

For the volume I'm transferring, the ranking looks like this:

| Priority | Route | Multi-Party Risk | Speed | Reliability | Notes |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **1** | **Bharat Connect / Forex** | High — see [this](/building-wealth/blogs/failed-fx-retail-bhim-bharat-connect-transaction/#why-this-channel-has-so-many-places-to-fail) for chain of parties | Fast — typically ~5 minutes when it works | | Cheapest overall and lowest overhead. Looking at alternate app/bank combos to avoid the lien issue I faced. |
| ↳ | BHIM + ICICI | High | | 3 of 4 attempts succeeded; 1 failed (the [11-day lien](/building-wealth/blogs/failed-fx-retail-bhim-bharat-connect-transaction/)) | Used to be primary — avoiding this option in the short term. |
| ↳ | CRED + ICICI | High | | Untried | CRED doesn't appear to allow changing the relationship bank — still need to explore this further. |
| ↳ | BHIM + HDFC | High | | Untried | Alternate bank. |
| **2** | HDFC + FX Retail Web | Low — bank + FX Retail (CCIL) only, no Bharat Connect/UPI hop | Fast, fully online | Used it 1 / 1 | My existing negotiated setup — second-best on cost with far fewer parties in the chain. Fallback for when I see persistent, recurring issues across the app/bank combos above over a longer stretch, not just a one-off failure. |
| **3** | Bank of Baroda | Low — bank + FX Retail (CCIL) only, though settlement routes through Bank of Baroda's own US correspondent | ~2 days for the remittance, plus a day for the SWIFT-matching gap covered above | Used it 2 / 2 | Fallback of last resort, not the default: reliable, but the highest total cost of the three once FBC is included. |

I haven't explored the inward side of this yet — sending money back from IBKR to India. That needs two conditions to line up: Nasdaq 100 has to be overweight enough and LTCG-eligible lots available to actually trigger the [Sell Engine of the Perpetual Rebalancing Framework](/building-wealth/blogs/the-perpetual-rebalancing-framework/#35-sell-engine). The LTCG condition alone isn't met before **mid-2027**, when the initial lots graduate past the wait period — so inward remittance stays a non-issue until at least then, regardless of how overweight Nasdaq 100 gets before that. Bank of Baroda could potentially turn out to be cheaper on the inward leg — that needs exploring when the time actually comes.

## What Worked Really Well

> 1. Choosing a Specialized MSME branch, one already familiar with the FX Retail system, made a real difference.

> 2. Apart from the one branch visit to open the account back in March, none of this — including this remittance — needed me to show up in person. Everything else ran over email and phone.

> 3. I discovered the 20 paise/USD default markup rate that ICICI/HDFC customers get on [Bharat Connect / Forex](https://www.bharat-connect.com/forex/), while digging through the Bank of Baroda app for a self-service workaround.

## Related Reading

- [Chapter 3: LRS — How to Send Money](/building-wealth/books/the-global-indian-investor/03-lrs-how-to-send-money/)
- [Chapter 4: FX Retail — A Deep Dive](/building-wealth/books/the-global-indian-investor/04-fx-retail-a-deep-dive/)
- [State of the 1 Portfolio — Returns, Allocation & Rebalancing (August 2026)](/building-wealth/blogs/state-of-the-1-portfolio-returns-allocation-rebalancing-august-2026/)
- [FX Retail via BHIM Bharat Connect: An 11-Day Lien and What It Actually Cost](/building-wealth/blogs/failed-fx-retail-bhim-bharat-connect-transaction/)

## Disclaimer
### For educational purpose only
> This post reflects my personal experience and is not investment or financial advice. Forex rates, bank processes, and onboarding timelines may change, and your branch's experience may differ from mine. Amounts and account identifiers marked **XXX** are redacted for privacy.

---
title: "Selecting the Broker"
subtitle: "Evaluating international prime brokers and domestic intermediaries for accessing Irish UCITS ETFs."
type: "books"
chapter: 8
date: 2026-08-29
author: "Sakthi Priyan H"
draft: false
wealth_tags:
  - IBKR
  - Broker
---

## Why a Broker?

To invest directly in international ETFs — specifically, the highly tax-efficient Irish UCITS ETFs listed on European exchanges like the London Stock Exchange (LSE) — you require a foreign brokerage account. This account acts as your gateway for deploying Liberalised Remittance Scheme (LRS) capital. 

Indian residents face a unique logistical hurdle here. Traditional retail banking institutions physically located in Europe (e.g., Davy Select) or popular pan-European fintech platforms (e.g., Trading 212, DEGIRO, Lightyear) generally **refuse to onboard non-European Economic Area residents**. This exclusion is driven by strict Anti-Money Laundering (AML) protocols and the PRIIPs regulation. 

Consequently, access must be routed through either:
1. Heavily regulated international prime brokerages with a global footprint.
2. Domestic Indian fintech overlays acting as introducing brokers.

## Direct International Prime Brokers

For Indian investors seeking direct market access to the LSE and European bourses, the selection of an international prime broker dictates execution quality and ongoing portfolio drag.

### Interactive Brokers (IBKR)
IBKR stands as the undisputed primary conduit for global capital flows originating from India. 
- **Regulation**: Indian residents typically onboard with IBKR LLC (regulated by the US SEC/FINRA), providing SIPC insurance while fully supporting LRS remittances directly from Indian banks.
- **Costs**: Highly competitive. Trades on the LSE incur a minimal commission of ~£1.70 (or 0.05%). More crucially, their FX desk applies a negligible markup (~0.002%), preserving your principal when converting USD to GBP/EUR.
- **Accessibility**: No account minimums and no inactivity fees, making it capital-efficient for both systematic monthly investments (SIPs) and lump-sum deployments.
- **Platforms**: Full access to mobile, web, and the advanced Trader Workstation (TWS) desktop platform.

**Opening an IBKR account directly** (at ibkr.com/ind) gives the full account with no intermediary layer and remains the **highly recommended** path.

### Saxo Bank
Headquartered in Copenhagen, Saxo Bank serves as a premium, banking-grade alternative to IBKR.
- **Costs**: While they have eliminated minimum deposits for their "Classic" tier, they apply a 0.25% currency conversion fee (higher than IBKR) and an annual custody fee of 0.15%.
- **Optimization**: Astute investors can waive the custody fee by opting into Saxo's securities lending program. 

### Swissquote
A fully licensed Swiss bank, offering ultimate banking-grade custody and privacy, but its pricing architecture is deliberately prohibitive for small-scale retail investors.
- **Costs**: Strict $1,000 minimum deposit, high trading fees ($25–$30+ per trade), and mandatory quarterly custody fees (CHF 20–50). Mathematically optimal only for very large, static portfolios.

### Charles Schwab
While highly popular for US residents, Schwab restricts Non-Resident Aliens from purchasing EU-listed UCITS ETFs, making it unsuitable for the Irish ETF strategy.

## Domestic Fintech Intermediaries (The US-Only Trap)

The first generation of Indian cross-border fintech platforms — such as **INDmoney, Vested, and Stockal** — revolutionized retail access by partnering with US clearing brokers (like DriveWealth) to offer fractional trading of US shares.

**The critical limitation**: Because their backend API infrastructure is fundamentally designed around US clearinghouses, these platforms are traditionally confined entirely to offering US-listed securities. **You cannot purchase a true Irish-domiciled UCITS ETF listed on the LSE through these platforms.** 

*(Note: A platform like INDmoney might allow the purchase of `EIRL` — the iShares MSCI Ireland ETF — but this is merely a US-listed ETF tracking Irish domestic companies. It is completely distinct from a UCITS ETF and remains subject to the punitive 30% US dividend withholding tax and 40% estate tax.)*

While legacy domestic apps (like HDFC Securities or ICICI Direct, powered by Stockal on the backend) are attempting to bridge connections to European/UK markets, the availability of UCITS ETFs remains highly fractured, restricted, or entirely non-existent compared to IBKR.

## Domestic Intermediaries Using IBKR

A specialized subset of platforms uses IBKR as their underlying global custodian, allowing them to offer access to Irish/European markets while abstracting the immense complexity of LRS compliance and Indian tax reporting (Schedule FA).

| Broker | Type | Notes |
|---|---|---|
| **Paasa** | SEBI RIA (IBKR Custody) | Specialized in automated Indian tax reporting and UX. Handles LRS but adds a fee layer. |
| **ICICI Direct Global** | Custodian (IBKR) | Bundled remittance; ICICI fees on top of IBKR. |

**Important limitation for indirect accounts**: If you open IBKR through ICICI Direct Global or Paasa, you do not get access to IBKR's Trader Workstation (TWS) desktop platform. You are limited to the mobile app and web access provided by the intermediary. Additionally, you are dependent on their proprietary FX rates unless you negotiate FX Retail separately with your bank.

## Cost Comparison Summary

| Factor | IBKR Direct | Paasa / ICICI Direct Global | INDmoney / Vested / Stockal |
|---|---|---|---|
| **Primary Market** | Global (LSE, EU, US) | Global (via IBKR) | US Only |
| **Irish UCITS ETFs** | ✅ Yes | ✅ Yes (Platform dependent) | ❌ No |
| **Brokerage** | ~$1 to £1.70 / order | IBKR + intermediary fee | Zero or low |
| **FX Conversion** | IBKR IdealFX (~0.002%) | Platform/Bank rates | Platform rate |
| **LRS Handling** | Self-managed | Bundled / Assisted | Integrated |

## Who Should Choose What

**IBKR Direct**: For investors who want Irish UCITS ETFs, the full global instrument universe, and the absolute lowest long-term cost. Requires self-managed LRS and ITR filing.

**Paasa / ICICI Direct Global**: For investors who want access to Irish UCITS but prioritize a simpler, guided experience for LRS compliance and automated tax reports (Schedule FA), and are willing to pay an intermediary premium for convenience.

**INDmoney / Vested**: For investors exclusively wanting US direct stocks with minimal setup. **Not suitable** for the Irish ETF investing strategy outlined in this book.

## Opening an IBKR Direct Account

Getting started with IBKR Direct is relatively straightforward for Indian residents:
1. **Sign Up**: Visit `ibkr.com/ind` to begin the application.
2. **Account Type**: Select "Individual" (or Joint if preferred) and choose a "Cash" account initially. You can upgrade to a Margin account later if needed.
3. **Base Currency**: Select USD as your base currency to avoid unnecessary conversion displays for your US/Irish ETFs.
4. **KYC**: You will need your PAN card, Aadhaar for address proof, and a bank statement for funding proof.
5. **Funding**: Once approved, use the LRS methods discussed in earlier chapters to wire funds. Always create a "Deposit Notification" in the IBKR portal before wiring from your Indian bank.

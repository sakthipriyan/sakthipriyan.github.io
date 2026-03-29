---
title: "RealValue Portfolio Tracker"
date: "2026-03-29"
draft: "false"
description: "Parse your CAMS & KFinTech combined CAS PDF securely in your browser to organize and tag your mutual fund portfolio."
type: "tools"
tool_type: "portfolioTracker"
tool_script: "js/realvalue-portfolio.js"
tool_dependencies:
  - echarts
summary: "Understand your portfolio at a glance. Upload your mutual fund CAS securely in the browser, auto-extract your holdings, and tag by category and asset class to unlock meaningful insights and track value."
wealth_tags:
  - Portfolio Management
  - Asset Allocation
---

## Overview

Gain clarity on your mutual fund investments by parsing your combined CAS directly in your browser. Tag each holding with custom Categories, Asset Classes, and Statuses, which are automatically saved to your browser's local storage for future reference.

### Key Features

| Feature | Description |
|---------|-------------|
| **100% Private** | PDF parsing happens entirely in your browser; your financial data never leaves your device. |
| **Auto-Extraction** | Automatically pulls out your holdings, folios, ISINs, and current market values. |
| **Custom Tagging** | Create and assign custom Categories and Asset Classes to group related funds together. |
| **Status Tracking** | Mark funds to "Buy", "Hold", or "Sell" to keep your portfolio strategy clear. |
| **Visual Summary** | Get instant aggregated views and charts of your entire portfolio broken down by Asset Class and Category. |

---

## Usage Guide

### 1. Generating Your CAS Request

To use this tool, you need a CAMS + KFinTech Consolidated Account Statement (CAS). To get this:
1. Visit the [CAMS CAS Request Page](https://www.camsonline.com/Investors/Statements/Consolidated-Account-Statement).
2. Request a **Detailed** statement (not Summary).
3. Choose the period covering your investments.
4. Input your email address and a password.
5. Once you receive the PDF in your email, you can upload it straight to this tool. If it is encrypted with the password you set, just provide the password in the input box before uploading!

### 2. Uploading the PDF
Click the upload box above and select your CAS PDF. If you have provided the password, the tool will instantly decrypt it locally to parse the data and display all your mutual fund holdings in a detailed list.

### 3. Tagging Your Funds
Organize your funds to match your mental models:
- **Category**: E.g., Emergency, Travel, Core Portfolio, Kid's Education.
- **Asset Class**: E.g., Equity Large Cap, Debt, Gold, Midcap 150.
- **Status**: Mark the fund as Buy, Hold, or Sell depending on your conviction and strategy.

Your tags are saved automatically in your browser's local storage. The next time you upload an updated CAS, your previous tags will automatically map to the respective funds via their unique ISIN.

### 4. Reviewing Summaries
Scroll down to the **Allocation Report** section. The tool aggregates the market values of all funds grouped by your assigned Asset Classes and Categories. Switch between the Table and Chart views to visualize your portfolio’s distribution.

---

> **Security Note**: This tool uses a client-side parser powered by PDF.js. Your document and financial data are never transmitted to any external server. To verify, you may inspect the network tab in your browser's developer tools.

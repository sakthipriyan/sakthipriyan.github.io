# AI Agent Guidelines

This file contains instructions and context for any AI agent operating within this repository. Agents should read this file before modifying content to ensure consistency with the blog's tone, formatting, and technical standards.

## 1. Content & Tone
- **Personal Framing:** Prefer a personal, experiential tone ("In my experience...") over authoritative legal, tax, or financial advice. The blog documents personal journeys, not prescriptive advice.
- **Succinct Explanations:** Keep points concise and compact. When linking to other articles or book chapters for context, let the link do the heavy lifting rather than over-explaining inline.

## 2. Formatting & Syntax
- **Large Figures (Redactions):** For absolute large financial figures (e.g., gross salary, total net worth, specific asset balances), replace the exact amount with the `&lt;redacted&gt;` tag. Use the HTML encoded version `&lt;redacted&gt;` rather than raw angle brackets (`<redacted>`) to ensure it renders cleanly in Hugo/Markdown without breaking HTML.
- **Small Figures:** Small, contextual figures (like standard deduction, refunds, penalties) can be kept exact.
- **Currency:** Prefix Indian Rupee amounts with the ₹ symbol (e.g., ₹440).

## 3. Links & Citations
- **No Localhost:** Never use `localhost` or local dev server URLs (`http://localhost:1313`) in any links. Always use relative root paths (e.g., `/building-wealth/books/...`).
- **Citation Stability:** Indian government and tax portals often have fragile links that expire or change. When citing rules, thresholds, or statutory relaxations, prefer linking to stable, high-quality sources like ClearTax or established financial newspapers (e.g., Business Standard, Economic Times, TaxGuru).
- **External Links:** Ensure external links actually resolve (verify no 404s) before committing them to a post.

## 4. Agent Workflow & Lifecycle
- **Branching & PRs:** All work must be done via a separate Pull Request. Direct commits to `main` are restricted.
- **Local Development:** Locally, Hugo runs in continuous mode (`hugo server -D`) and files are typically edited manually via Zed. Keep this in mind when discussing previewing changes.
- **Merging:** PRs are approved via GitHub checks. When the user explicitly requests to merge, always use a **Squash Merge** to keep the `main` history clean.
- **Deployment:** Upon merging, GitHub Actions will automatically build the Hugo site and publish it via GitHub Pages.
- **Content Syndication:** Post-merging, generate promotional social media content to distribute the new article link. Create posts tailored for **Twitter**, **YouTube** (if a video applies), and **Reddit**. If the article falls under the `building-systems` category, additionally draft a short **LinkedIn** article/post.

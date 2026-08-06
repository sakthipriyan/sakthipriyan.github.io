# sakthipriyan.github.io

Source code for [sakthipriyan.com](https://sakthipriyan.com/), the personal website of Sakthi Priyan H.

## Overview

This repository contains the Hugo-based static site source, including:
- **Building Wealth**: Articles, videos, and interactive tools on asset allocation, portfolio management, and personal finance.
- **The Global Indian Investor**: Chapters and guides for building a globally diversified portfolio from India.
- **Building Systems**: Content related to software architecture and building scalable systems.
- **Tools**: In-browser utilities like the *RealValue Portfolio Tracker* and *FX Engine* that run locally for complete privacy.

## Tech Stack
- **Site Generator:** [Hugo](https://gohugo.io/) v0.164.0 Extended
- **Theme:** Custom `continuum` theme (located in `/themes/continuum`)
- **Hosting:** GitHub Pages (served from the `gh-pages` branch)
- **CI/CD:** GitHub Actions (auto-deploys on every push to `main`)

## Local Development

1. Install Hugo via Homebrew:
   ```bash
   brew install hugo
   ```
2. Clone this repository.
3. Start the local development server:
   ```bash
   hugo server -D
   ```
4. View the site at `http://localhost:1313/`

> **Note:** You don't need to build manually anymore. Pushing to `main` (via a PR) triggers the CI pipeline which builds and deploys automatically.


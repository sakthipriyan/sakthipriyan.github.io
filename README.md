# sakthipriyan.github.io

Source code for [sakthipriyan.com](https://sakthipriyan.com/), the personal website of Sakthi Priyan H.

## Overview

This repository contains the Hugo-based static site source, including:
- **Building Wealth**: Articles, videos, and interactive tools on asset allocation, portfolio management, and personal finance.
- **The Global Indian Investor**: Chapters and guides for building a globally diversified portfolio from India.
- **Building Systems**: Content related to software architecture and building scalable systems.
- **Tools**: In-browser utilities like the *RealValue Portfolio Tracker* and *FX Engine* that run locally for complete privacy.

## Tech Stack
- **Site Generator:** [Hugo](https://gohugo.io/)
- **Theme:** Custom `continuum` theme (located in `/themes/continuum`)
- **Hosting:** GitHub Pages (served from the `/docs` directory)

## Local Development

1. Ensure [Hugo (Extended version)](https://gohugo.io/installation/) is installed.
2. Clone this repository.
3. Start the local development server:
   ```bash
   hugo server -D
   ```
4. View the site at `http://localhost:1313/`
5. To build for production (generates output in the `/docs` folder for GitHub Pages):
   ```bash
   hugo
   ```

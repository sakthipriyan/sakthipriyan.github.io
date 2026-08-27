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
- **Theme:** [`continuum`](https://github.com/sakthipriyan/hugo-continuum), consumed as a Hugo Module
- **Hosting:** GitHub Pages (served from the `gh-pages` branch)
- **CI/CD:** GitHub Actions (auto-deploys on every push to `main`)

## Local Development

1. Install Hugo and Go (Hugo Modules need Go to resolve the theme):
   ```bash
   brew install hugo go
   ```
2. Clone this repository.
3. Start the local development server:
   ```bash
   hugo server -D
   ```
   The theme is downloaded automatically on first run.
4. View the site at `http://localhost:1313/`

### Working on the theme at the same time

To edit the theme and see changes here immediately, check out
[hugo-continuum](https://github.com/sakthipriyan/hugo-continuum) and point this
site at it:

```bash
cp config/development/module.yaml.example config/development/module.yaml
# then set the absolute path to your hugo-continuum checkout
```

That file is gitignored and only applies to `hugo server`; production builds
always use the published module.

To pull in a new published version of the theme:

```bash
hugo mod get -u github.com/sakthipriyan/hugo-continuum
hugo mod tidy
```

`hugo mod get` only ever adds hashes to `go.sum`; it never removes the ones it
supersedes. Without the second line every bump leaves its predecessor behind —
this is how ten versions accumulated between v0.5.1 and v0.15.0.

Not `go mod tidy`. Go finds dependencies by reading `import` statements in Go
source and this site has none, the theme being imported through
`module.imports` in `config.yaml`. It reads the require as unused and deletes
it, leaving a site with no theme. The `// indirect` marker on that require is
correct for the same reason.

> **Note:** You don't need to build manually anymore. Pushing to `main` (via a PR) triggers the CI pipeline which builds and deploys automatically.

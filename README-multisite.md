# Multi-Site Hugo Configuration

This Hugo project is configured to generate 3 separate sites from a single codebase:

## Sites Structure

1. **Root Site** (`/`)
   - Main homepage with overview of both sections
   - Base URL: `https://sakthipriyan.com/`
   - Content: `content/` (includes all content)
   - Config: `config/root.toml`

2. **Building Wealth Site** (`/building-wealth/`)
   - Dedicated site for financial content
   - Base URL: `https://sakthipriyan.com/building-wealth/`
   - Content: `content/building-wealth/`
   - Config: `config/building-wealth.toml`

3. **Software Engineering Site** (`/software-engineering/`)
   - Dedicated site for technical content  
   - Base URL: `https://sakthipriyan.com/software-engineering/`
   - Content: `content/software-engineering/`
   - Config: `config/software-engineering.toml`

## Development

### Quick Start
```bash
# Start development server
./serve-dev.sh

# Or manually:
hugo server --config config.toml --bind 0.0.0.0 -D
```

### Access URLs (Development)
- **Main Site**: http://localhost:1313
- **Building Wealth**: http://localhost:1313/building-wealth/
- **Software Engineering**: http://localhost:1313/software-engineering/

## Building for Production

```bash
# Build all sites
./build-sites.sh

# Or manually:
hugo --config config.toml
```

## File Structure

```
├── config.toml              # Main multi-site configuration
├── config/
│   ├── root.toml           # Root site specific config
│   ├── building-wealth.toml # Building Wealth site config
│   └── software-engineering.toml # Software Engineering site config
├── content/
│   ├── _index.md           # Root homepage
│   ├── building-wealth/    # Building Wealth content
│   └── software-engineering/ # Software Engineering content
├── public/                 # Generated sites
│   ├── index.html         # Root site
│   ├── building-wealth/   # Building Wealth site
│   └── software-engineering/ # Software Engineering site
└── themes/continuum/       # Hugo theme
```

## Configuration Details

### Main Configuration (`config.toml`)
- Defines the multi-site structure using `[[sites]]` blocks
- Each site has its own `baseURL`, `contentDir`, and `config` file
- Uses Hugo's multi-site feature for organized content management

### Individual Site Configs
- `config/root.toml`: Root site with navigation to subsites
- `config/building-wealth.toml`: Financial content focused configuration
- `config/software-engineering.toml`: Technical content focused configuration

## Notes

- All sites share the same theme (`continuum`)
- Each site can have its own menu structure and parameters
- Content is organized by directory, allowing for focused site generation
- RSS feeds are enabled for all sites
- Build stats are enabled for performance monitoring
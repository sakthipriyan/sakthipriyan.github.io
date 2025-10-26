# Continuum Hugo Theme

A comprehensive Hugo theme designed to support multiple content types including blogs, slides (reveal.js), books, videos (YouTube), custom JavaScript tools, and about pages.

## Features

- **📝 Blogs**: Markdown-based blog posts with tags and author support
- **🎯 Slides**: Reveal.js-powered presentation slides from markdown
- **📚 Books**: Book publishing with chapters and download links
- **🎥 Videos**: YouTube video embedding with thumbnails
- **🛠️ Tools**: Custom JavaScript tools (SIP calculator, compound interest, etc.)
- **👤 About**: Personal/company about pages with social links
- **📱 Responsive**: Mobile-first responsive design
- **🎨 Modern**: Clean, professional styling

## Installation

1. Copy this theme into your Hugo site's `themes/` directory:
   ```bash
   cp -r continuum /path/to/your-site/themes/
   ```

2. Set the theme in your site's `config.toml`:
   ```toml
   theme = "continuum"
   ```

## Content Structure

The theme supports a hierarchical content structure with multiple top-level sections:

```
content/
├── software-engineering/
│   ├── blog/
│   ├── videos/
│   ├── slides/
│   ├── tools/
│   │   ├── json-diff/
│   │   └── regex-tester/
│   └── books/
├── building-wealth/
│   ├── blog/
│   ├── videos/
│   ├── tools/
│   │   ├── sip-calculator/
│   │   └── gold-allocation/
│   └── slides/
└── about/
```

## Content Types

### Hierarchical Blogs
Create section-specific blog posts:
```bash
hugo new software-engineering/blog/my-tech-post.md
hugo new building-wealth/blog/investment-strategy.md
```

### Hierarchical Videos
Create section-specific videos:
```bash
hugo new software-engineering/videos/coding-tutorial.md
hugo new building-wealth/videos/sip-explained.md
```

### Hierarchical Slides
Create section-specific presentations:
```bash
hugo new software-engineering/slides/architecture-patterns.md
hugo new building-wealth/slides/portfolio-diversification.md
```

### Custom Tools
Two types of tools are supported:

#### 1. JavaScript-Based Tools
Set `tool_type` in front matter:
```yaml
title: "SIP Calculator"
tool_type: "sipCalculator"
```

Available JavaScript tools:
- `sipCalculator`: SIP investment calculator
- `compoundInterestCalculator`: Compound interest calculator
- `jsonDiff`: JSON comparison tool
- `regexTester`: Regular expression tester
- `goldAllocation`: Gold portfolio allocation

#### 2. Custom HTML Tools
For complex tools, create standalone HTML files:

```bash
# Create tool content
hugo new software-engineering/tools/json-diff.md
```

Front matter:
```yaml
title: "JSON Diff Tool"
custom_html: true
description: "Compare JSON objects"
```

The theme will automatically load the tool from:
`static/tools/software-engineering/json-diff/index.html`

### Books
Create books in any section:
```bash
hugo new software-engineering/books/clean-code-guide.md
```

### About Pages
```bash
hugo new about/_index.md
```

## Built-in Tools

### Software Engineering Tools
- **JSON Diff**: Compare JSON objects and highlight differences
- **Regex Tester**: Test regular expressions with live feedback and highlighting

### Building Wealth Tools  
- **SIP Calculator**: Monthly investment planning and returns calculation
- **Compound Interest Calculator**: Principal calculation with different compounding frequencies
- **Gold Allocation**: Portfolio gold allocation calculator

### Tool Development
Create custom tools in two ways:

#### Method 1: JavaScript Integration
Add your tool to `static/js/tools.js`:
```javascript
window.initializeTool.myTool = function(container, config) {
    // Your tool implementation
};
```

#### Method 2: Standalone HTML
Create complete HTML tools in `static/tools/section/tool-name/index.html`

## Customization

### Adding New Tools
1. Add tool logic to `static/js/tools.js`:
```javascript
window.initializeTool.yourTool = function(container, config) {
    // Your tool implementation
};
```

2. Create content with `tool_type = "yourTool"`

### Styling
Modify `static/css/style.css` or add your own CSS files.

### Navigation
Update the navigation in `layouts/partials/header.html`.

## File Structure
```
themes/continuum/
├── archetypes/          # Content templates
│   ├── blogs.md
│   ├── slides.md
│   ├── books.md
│   ├── videos.md
│   ├── tools.md
│   └── about.md
├── layouts/
│   ├── _default/        # Base templates
│   ├── blogs/           # Blog layouts
│   ├── slides/          # Slide layouts
│   ├── books/           # Book layouts
│   ├── videos/          # Video layouts
│   ├── tools/           # Tool layouts
│   ├── about/           # About layouts
│   └── partials/        # Shared components
├── static/
│   ├── css/
│   │   └── style.css    # Main stylesheet
│   └── js/
│       └── tools.js     # Interactive tools
└── README.md
```

## Dependencies

- **Reveal.js**: Automatically loaded for slide presentations
- **Hugo**: Requires Hugo 0.80.0 or later

## License

MIT License - feel free to use and modify as needed.

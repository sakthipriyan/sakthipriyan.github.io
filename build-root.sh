#!/bin/bash

# Build Root site independently
echo "🏠 Building Root site (aggregator)..."
echo ""

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf public/index.html public/feed.xml public/sitemap.xml public/css public/js public/images

# Build the site
echo "📦 Building site..."
hugo --config="config/root.yaml" --contentDir="content" --destination="public"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Root site built successfully!"
    echo "📂 Available at: public/index.html"
    echo "🌐 Aggregates content from both sub-sites"
    echo ""
    echo "🚀 To serve locally: hugo server --config=config/root.yaml --contentDir=content --port=1313"
else
    echo "❌ Failed to build Root site"
    exit 1
fi
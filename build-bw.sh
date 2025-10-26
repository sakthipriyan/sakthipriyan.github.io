#!/bin/bash

# Build Building Wealth site independently
echo "💰 Building Building Wealth site..."
echo ""

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf public/building-wealth/*

# Build the site
echo "📦 Building site..."
hugo --config="config/building-wealth.yaml" --contentDir="content/building-wealth" --destination="public/building-wealth"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Building Wealth site built successfully!"
    echo "📂 Available at: public/building-wealth/index.html"
    echo "🏷️  Tags available at: public/building-wealth/tags/"
    echo ""
    echo "🚀 To serve locally: hugo server --config=config/building-wealth.yaml --contentDir=content/building-wealth --port=1314"
else
    echo "❌ Failed to build Building Wealth site"
    exit 1
fi
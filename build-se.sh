#!/bin/bash

# Build Software Engineering site independently
echo "🚀 Building Software Engineering site..."
echo ""

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf public/software-engineering/*

# Build the site
echo "📦 Building site..."
hugo --config="config/software-engineering.yaml" --contentDir="content/software-engineering" --destination="public/software-engineering"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Software Engineering site built successfully!"
    echo "📂 Available at: public/software-engineering/index.html"
    echo "🏷️  Tags available at: public/software-engineering/tags/"
    echo ""
    echo "🚀 To serve locally: hugo server --config=config/software-engineering.yaml --contentDir=content/software-engineering --port=1315"
else
    echo "❌ Failed to build Software Engineering site"
    exit 1
fi
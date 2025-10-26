#!/bin/bash

# Build script for 3 independent Hugo sites
echo "🚀 Building 3 independent Hugo sites..."
echo ""

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf public/*

# Function to build a site with specific config
build_site() {
    local site_name=$1
    local config_file=$2
    local output_dir=$3
    local content_dir=$4
    
    echo "📦 Building $site_name..."
    hugo --config="$config_file" --contentDir="$content_dir" --destination="public/$output_dir"
    
    if [ $? -eq 0 ]; then
        echo "✅ $site_name built successfully"
    else
        echo "❌ Failed to build $site_name"
        return 1
    fi
    echo ""
}

# Build Root site (aggregator)
build_site "Root Site" "config/root.yaml" "." "content"

# Build Building Wealth site
build_site "Building Wealth" "config/building-wealth.yaml" "building-wealth" "content/building-wealth"

# Build Software Engineering site  
build_site "Software Engineering" "config/software-engineering.yaml" "software-engineering" "content/software-engineering"

echo "🎉 All sites built successfully!"
echo ""
echo "📂 Sites available:"
echo "🏠 Root (aggregator): public/index.html"
echo "💰 Building Wealth: public/building-wealth/index.html (independent tags)"
echo "🚀 Software Engineering: public/software-engineering/index.html (independent tags)"
echo ""
echo "🔧 For development, use: ./serve-dev.sh"
echo "📊 Each site has its own independent tag system!"
#!/bin/bash

# Test individual site servers
echo "🧪 Testing individual Hugo site servers..."
echo ""

# Function to start and test a site
test_site() {
    local site_name=$1
    local config_file=$2
    local port=$3
    local content_dir=$4
    
    echo "🌐 Testing $site_name on port $port..."
    hugo server --config="$config_file" --contentDir="$content_dir" --bind=0.0.0.0 --port=$port -D &
    local pid=$!
    
    # Wait a moment for server to start
    sleep 2
    
    # Test if server is responding
    if curl -s "http://localhost:$port" > /dev/null; then
        echo "✅ $site_name server working on http://localhost:$port"
    else
        echo "❌ $site_name server failed to start"
    fi
    
    # Stop the server
    kill $pid 2>/dev/null
    echo ""
}

# Test each site individually
test_site "Root Site" "config/root.yaml" 3000 "content"
test_site "Building Wealth" "config/building-wealth.yaml" 3001 "content/building-wealth"  
test_site "Software Engineering" "config/software-engineering.yaml" 3002 "content/software-engineering"

echo "🎉 All site tests completed!"
echo ""
echo "🚀 To run all servers together: ./serve-dev.sh"
echo "💡 To run individual sites:"
echo "   Root: hugo server --config=config/root.yaml --contentDir=content --port=1313"
echo "   BW:   hugo server --config=config/building-wealth.yaml --contentDir=content/building-wealth --port=1314"
echo "   SE:   hugo server --config=config/software-engineering.yaml --contentDir=content/software-engineering --port=1315"
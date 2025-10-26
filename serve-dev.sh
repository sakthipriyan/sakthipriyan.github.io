#!/bin/bash

# Development server for 3 independent Hugo sites
echo "🚀 Starting 3 independent Hugo development servers..."
echo ""

# Function to start a site server
start_site_server() {
    local site_name=$1
    local config_file=$2
    local port=$3
    local content_dir=$4
    local base_url=$5
    
    echo "🌐 Starting $site_name server on port $port..."
    hugo server --config="$config_file" --contentDir="$content_dir" --bind=0.0.0.0 --port=$port --baseURL="$base_url" -D &
    
    # Store the PID
    echo $! >> /tmp/hugo_pids.txt
}

# Clean up previous PIDs file
rm -f /tmp/hugo_pids.txt

echo "📡 Starting development servers..."
echo ""

# Start Root site server (port 1313)
start_site_server "Root Site" "config/root.yaml" 1313 "content" "http://localhost:1313"

# Start Building Wealth server (port 1314)  
start_site_server "Building Wealth" "config/building-wealth.yaml" 1314 "content/building-wealth" "http://localhost:1314"

# Start Software Engineering server (port 1315)
start_site_server "Software Engineering" "config/software-engineering.yaml" 1315 "content/software-engineering" "http://localhost:1315"

# Wait a moment for servers to start
sleep 3

echo ""
echo "� All development servers started!"
echo ""
echo "📂 Access your sites:"
echo "🏠 Root (aggregator):        http://localhost:1313"
echo "💰 Building Wealth:          http://localhost:1314 (independent tags)"
echo "🚀 Software Engineering:     http://localhost:1315 (independent tags)"
echo ""
echo "🔄 Each site rebuilds independently when you edit its content!"
echo "⚡ Each site has its own tag system - no conflicts!"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping all Hugo servers..."
    if [ -f /tmp/hugo_pids.txt ]; then
        while read pid; do
            kill $pid 2>/dev/null
        done < /tmp/hugo_pids.txt
        rm -f /tmp/hugo_pids.txt
    fi
    echo "✅ All servers stopped"
    exit 0
}

# Set up signal handling
trap cleanup SIGINT SIGTERM

# Wait for Ctrl+C
wait
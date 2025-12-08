#!/bin/bash
# Download company logos using Clearbit Logo API
# Usage: bash download-logos.sh

set -e

BASE_DIR="/Users/sakthipriyan/sakthipriyans/sakthipriyan.github.io/content/building-wealth/slides/invest-in-equities-and-index-funds/logos"
cd "$BASE_DIR"

echo "🚀 Starting logo downloads..."

# Function to download logo with retry
download_logo() {
    local dir=$1
    local filename=$2
    local domain=$3
    
    if [ -f "$dir/$filename" ]; then
        echo "⏭️  Skipping $filename (already exists)"
        return
    fi
    
    echo "📥 Downloading $filename from $domain..."
    if curl -f -s -o "$dir/$filename" "https://logo.clearbit.com/$domain" 2>/dev/null; then
        echo "✅ Downloaded $filename"
    else
        echo "❌ Failed to download $filename from $domain"
    fi
}

# Sensex
echo -e "\n📊 Downloading Sensex logos..."
download_logo "sensex" "reliance.png" "ril.com"
download_logo "sensex" "hdfc-bank.png" "hdfcbank.com"
download_logo "sensex" "icici-bank.png" "icicibank.com"
download_logo "sensex" "infosys.png" "infosys.com"
download_logo "sensex" "itc.png" "itcportal.com"
download_logo "sensex" "tcs.png" "tcs.com"
download_logo "sensex" "larsen-toubro.png" "larsentoubro.com"
download_logo "sensex" "bharti-airtel.png" "airtel.in"

# Nifty 50
echo -e "\n📊 Downloading Nifty 50 logos..."
download_logo "nifty50" "reliance.png" "ril.com"
download_logo "nifty50" "hdfc-bank.png" "hdfcbank.com"
download_logo "nifty50" "icici-bank.png" "icicibank.com"
download_logo "nifty50" "infosys.png" "infosys.com"
download_logo "nifty50" "itc.png" "itcportal.com"
download_logo "nifty50" "tcs.png" "tcs.com"
download_logo "nifty50" "kotak-bank.png" "kotak.com"
download_logo "nifty50" "sbi.png" "sbi.co.in"

# Nifty Next 50
echo -e "\n📊 Downloading Nifty Next 50 logos..."
download_logo "niftynext50" "lic.png" "licindia.in"
download_logo "niftynext50" "hal.png" "hal-india.co.in"
download_logo "niftynext50" "adani-power.png" "adanipower.com"
download_logo "niftynext50" "dmart.png" "dmartindia.com"
download_logo "niftynext50" "ioc.png" "iocl.com"
download_logo "niftynext50" "vedanta.png" "vedantalimited.com"
download_logo "niftynext50" "hindustan-zinc.png" "hzlindia.com"
download_logo "niftynext50" "hyundai.png" "hyundai.com"

# Midcap 150
echo -e "\n📊 Downloading Midcap 150 logos..."
download_logo "midcap150" "muthoot-finance.png" "muthootfinance.com"
download_logo "midcap150" "cummins-india.png" "cummins.com"
download_logo "midcap150" "indian-bank.png" "indianbank.in"
download_logo "midcap150" "union-bank.png" "unionbankofindia.co.in"
download_logo "midcap150" "hdfc-amc.png" "hdfcfund.com"
download_logo "midcap150" "polycab.png" "polycab.com"
download_logo "midcap150" "bse.png" "bseindia.com"
download_logo "midcap150" "indus-towers.png" "industowers.com"

# Smallcap 250
echo -e "\n📊 Downloading Smallcap 250 logos..."
download_logo "smallcap250" "sjvn.png" "sjvn.nic.in"
download_logo "smallcap250" "godigit.png" "godigit.com"
download_logo "smallcap250" "apar.png" "apar.com"
download_logo "smallcap250" "cdsl.png" "cdslindia.com"
download_logo "smallcap250" "apollo-tyres.png" "apollotyres.com"
download_logo "smallcap250" "tata-elxsi.png" "tataelxsi.com"
download_logo "smallcap250" "hindustan-copper.png" "hindustancopper.com"
download_logo "smallcap250" "delhivery.png" "delhivery.com"

# Nasdaq 100
echo -e "\n📊 Downloading Nasdaq 100 logos..."
download_logo "nasdaq100" "apple.png" "apple.com"
download_logo "nasdaq100" "microsoft.png" "microsoft.com"
download_logo "nasdaq100" "nvidia.png" "nvidia.com"
download_logo "nasdaq100" "amazon.png" "amazon.com"
download_logo "nasdaq100" "meta.png" "meta.com"
download_logo "nasdaq100" "alphabet.png" "google.com"
download_logo "nasdaq100" "adobe.png" "adobeaem.com"
download_logo "nasdaq100" "intuit.png" "intuit.com"

# S&P 500
echo -e "\n📊 Downloading S&P 500 logos..."
download_logo "sp500" "apple.png" "apple.com"
download_logo "sp500" "microsoft.png" "microsoft.com"
download_logo "sp500" "nvidia.png" "nvidia.com"
download_logo "sp500" "amazon.png" "amazon.com"
download_logo "sp500" "meta.png" "meta.com"
download_logo "sp500" "alphabet.png" "google.com"
download_logo "sp500" "berkshire-hathaway.png" "berkshirehathaway.com"
download_logo "sp500" "tesla.png" "tesla.com"

echo -e "\n✨ Logo download complete!"
echo "📁 Logos saved to: $BASE_DIR"

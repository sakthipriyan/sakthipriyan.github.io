// RealValue Portfolio Tracker (Vue.js + ECharts + PDF.js)
window.initializeTool = window.initializeTool || {};

window.initializeTool.portfolioTracker = async function (container, config) {
    // 1. Load PDF.js dynamically
    const loadPdfJs = () => {
        return new Promise((resolve, reject) => {
            if (window.pdfjsLib) {
                resolve();
                return;
            }
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
            script.onload = () => {
                window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
                resolve();
            };
            script.onerror = reject;
            document.head.appendChild(script);
        });
    };

    try {
        await loadPdfJs();
    } catch (e) {
        console.error("Failed to load PDF.js", e);
        container.innerHTML = `<div class="error-message">⚠️ Failed to load PDF parser. Please check your internet connection and refresh.</div>`;
        return;
    }

    // Config defaults
    const cfg = config || {};
    
    // Inject styles
    const styleId = 'portfolio-tracker-styles';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `
            .portfolio-tracker th,
            .portfolio-tracker .summary-table th,
            .portfolio-tracker .asset-table th {
                text-align: left;
            }
            .chart-container {
                width: 100%;
                height: 400px;
                min-height: 400px;
            }

            .loading-text { 
                color: var(--state-success, #4CAF50); 
                font-weight: bold; 
                margin-top: 1rem;
            }
            .error-text { 
                color: var(--state-danger, #ff5252); 
                font-weight: bold; 
                margin-top: 1rem;
            }
            .fund-input {
                width: 100%;
                padding: 0.4rem;
                border: 1px solid var(--gray-medium, #ddd);
                border-radius: 4px;
                font-size: 0.9em;
                background: var(--bg-primary, #fff);
                color: var(--text-primary, #333);
            }
            .unit-buttons button.active-buy {
                border-color: #27ae60;
                background: #27ae60;
                color: white;
            }
            .unit-buttons button.active-hold {
                border-color: #f39c12;
                background: #f39c12;
                color: white;
            }
            .unit-buttons button.active-sell {
                border-color: #c0392b;
                background: #c0392b;
                color: white;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Create Vue app template
    container.innerHTML = `
        <div id="portfolio-app">
            <div class="portfolio-tracker">
                
                <!-- Datalists for Autocomplete -->
                <datalist id="category-options">
                    <option v-for="cat in autocompleteCategories" :value="cat" :key="cat"></option>
                </datalist>
                <datalist id="asset-class-options">
                    <option v-for="ac in autocompleteAssetClasses" :value="ac" :key="ac"></option>
                </datalist>

                <!-- Persistent Top Bar + Upload Trigger -->
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
                    <h3 style="margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                        📑 Mutual Fund Portfolio
                        <span v-if="funds.length > 0" style="font-size: 0.7em; background: #e0f2fe; color: #0284c7; padding: 0.2rem 0.5rem; border-radius: 12px; font-weight: 600;">
                            {{ funds.length }} Funds
                        </span>
                    </h3>
                    
                    <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                        <div style="display: flex; border: 1px solid var(--gray-medium, #ddd); border-radius: 4px; overflow: hidden; background: var(--bg-primary, #fff);">
                            <div style="padding: 0.5rem 0.6rem; background: #f8f9fa; border-right: 1px solid #ddd; font-size: 0.85em; color: #555; display: flex; align-items: center;">
                                🔒
                            </div>
                            <input 
                                type="password" 
                                v-model="pdfPassword" 
                                placeholder="CAS Password (opt)" 
                                style="border: none; padding: 0.5rem; outline: none; width: 130px; font-size: 0.9em;"
                            >
                            <button type="button" @click.stop="copyPassword" style="border: none; border-left: 1px solid #ddd; background: #f8f9fa; padding: 0.5rem 0.6rem; cursor: pointer; font-size: 0.9em; color: #555;" title="Copy">📋</button>
                            <button type="button" @click.stop="clearPassword" style="border: none; border-left: 1px solid #ddd; background: #f8f9fa; padding: 0.5rem 0.6rem; cursor: pointer; font-size: 0.9em; color: #d32f2f;" title="Clear">✕</button>
                        </div>
                        <button type="button" class="share-button" @click="$refs.pdfInput.click()">
                            🔄 Upload CAS PDF
                        </button>
                    </div>
                </div>

                <!-- Hidden file input -->
                <input type="file" ref="pdfInput" accept="application/pdf" style="display: none;" @change="handleFileUpload" />
                
                <div v-if="isParsing" class="loading-text" style="margin-bottom: 1.5rem;">⏳ Loading and parsing PDF... Please wait securely in browser.</div>
                <div v-if="parseError" class="error-text" style="margin-bottom: 1.5rem;">⚠️ {{ parseError }}</div>

                <div v-if="funds.length > 0">

                    <div style="margin-bottom: 2rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
                            <h4 style="margin: 0; color: var(--text-primary);">
                                🏷️ Tag Your Holdings
                            </h4>
                            <button type="button" class="share-button btn-clear-all" @click="clearPortfolio" style="padding: 0.4rem 0.8rem; font-size: 0.85em;">
                                🗑️ Clear Portfolio
                            </button>
                        </div>
                        <div class="table-responsive">
                            <table class="asset-table">
                                <thead>
                                    <tr>
                                        <th style="width: 35%;">Fund Details</th>
                                        <th style="width: 15%; text-align: right;">Value (₹)</th>
                                        <th style="width: 20%;">Category</th>
                                        <th style="width: 20%;">Asset Class</th>
                                        <th style="width: 10%; text-align: center;">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="fund in funds" :key="fund.id">
                                        <td>
                                            <div style="font-weight: 500; font-size: 0.95em; color: var(--text-primary); margin-bottom: 0.2rem;">{{ fund.fundName }}</div>
                                            <div style="font-size: 0.8em; color: var(--text-secondary);">
                                                {{ fund.fundHouse }} | Folio: {{ fund.folioNo }} <br> ISIN: {{ fund.isin }}
                                            </div>
                                        </td>
                                        <td style="text-align: right; vertical-align: top;">
                                            <div style="font-weight: 600; color: var(--text-primary);">{{ formatNumber(fund.marketValue) }}</div>
                                            <div style="font-size: 0.8em; color: var(--text-secondary);">{{ formatNumber(fund.closingUnits, 3) }} units</div>
                                        </td>
                                        <td style="vertical-align: top;">
                                            <input 
                                                type="text" 
                                                v-model="tags[fund.id].category" 
                                                class="fund-input"
                                                list="category-options"
                                                placeholder="e.g. 1 Portfolio, Emergency"
                                                @change="saveTagsAndCalculate"
                                                @input="debouncedSaveAndCalculate"
                                            >
                                        </td>
                                        <td style="vertical-align: top;">
                                            <input 
                                                type="text" 
                                                v-model="tags[fund.id].assetClass" 
                                                class="fund-input"
                                                list="asset-class-options"
                                                placeholder="e.g. Equity, Debt, Gold"
                                                @change="saveTagsAndCalculate"
                                                @input="debouncedSaveAndCalculate"
                                            >
                                        </td>
                                        <td style="vertical-align: top; text-align: center; min-width: 160px;">
                                            <div class="unit-buttons" style="justify-content: center;">
                                                <button 
                                                    type="button" 
                                                    :class="{'active-buy': tags[fund.id].status === 'Buy'}" 
                                                    @click="toggleStatus(fund.id, 'Buy')"
                                                    style="padding: 0.35rem 0.5rem; font-size: 0.8em; flex: 1;">
                                                    BUY
                                                </button>
                                                <button 
                                                    type="button" 
                                                    :class="{'active-hold': tags[fund.id].status === 'Hold'}" 
                                                    @click="toggleStatus(fund.id, 'Hold')"
                                                    style="padding: 0.35rem 0.5rem; font-size: 0.8em; flex: 1;">
                                                    HOLD
                                                </button>
                                                <button 
                                                    type="button" 
                                                    :class="{'active-sell': tags[fund.id].status === 'Sell'}" 
                                                    @click="toggleStatus(fund.id, 'Sell')"
                                                    style="padding: 0.35rem 0.5rem; font-size: 0.8em; flex: 1;">
                                                    SELL
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- 📈 Summary Report -->
                    <div class="investment-plan" v-if="summaryData.length > 0">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem;">
                            <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
                                <h2 style="margin: 0;">📊 Allocation Report</h2>
                                <div class="mode-toggle">
                                    <button 
                                        type="button"
                                        :class="{'active': portfolioViewTab === 'chart'}"
                                        @click="portfolioViewTab = 'chart'"
                                        style="white-space: nowrap;">
                                        📊 Chart
                                    </button>
                                    <button 
                                        type="button"
                                        :class="{'active': portfolioViewTab === 'table'}"
                                        @click="portfolioViewTab = 'table'"
                                        style="white-space: nowrap;">
                                        📋 Table
                                    </button>
                                </div>
                                <div class="mode-toggle">
                                    <button 
                                        type="button"
                                        :class="{'active': selectedReportArea === 'overview'}"
                                        @click="selectedReportArea = 'overview'; calculateSummary()"
                                        style="white-space: nowrap;">
                                        🌍 Overview
                                    </button>
                                    <button 
                                        v-for="cat in uniqueCategories" :key="cat"
                                        type="button"
                                        :class="{'active': selectedReportArea === cat}"
                                        @click="selectedReportArea = cat; calculateSummary()"
                                        style="white-space: nowrap;">
                                        📁 {{ cat }}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Table View -->
                        <div v-show="portfolioViewTab === 'table'" class="table-responsive">
                            <table class="summary-table">
                                <thead>
                                    <tr>
                                        <th>{{ selectedReportArea === 'overview' ? 'Category' : 'Asset Class' }}</th>
                                        <th style="text-align: right;">Value (₹)</th>
                                        <th style="text-align: right;">Allocation %</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="row in summaryData" :key="row.name">
                                        <td><strong>{{ row.name || 'Unclassified' }}</strong></td>
                                        <td style="text-align: right;">₹{{ formatNumber(row.value) }}</td>
                                        <td style="text-align: right;">{{ formatPercent(row.percent) }}</td>
                                    </tr>
                                    <tr class="total-row">
                                        <td><strong>Total Portfolio</strong></td>
                                        <td style="text-align: right;"><strong>₹{{ formatNumber(totalPortfolioValue) }}</strong></td>
                                        <td style="text-align: right;"><strong>100.00%</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Chart View -->
                        <div v-show="portfolioViewTab === 'chart'" style="margin-bottom: 2rem;">
                            <h3 style="text-align: center; margin-bottom: 1rem;">
                                {{ selectedReportArea === 'overview' ? 'Category Distribution (Overview)' : 'Asset Class Distribution (' + selectedReportArea + ')' }}
                            </h3>
                            <div id="portfolio-allocation-chart" class="chart-container"></div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    `;

    // Initialize logic
    const app = Vue.createApp({
        data() {
            // Load from localStorage
            let storedTags = {};
            let storedFunds = [];
            try {
                const rawTags = localStorage.getItem('realvalue-portfolio-tags');
                if (rawTags) storedTags = JSON.parse(rawTags);
                
                const rawFunds = localStorage.getItem('realvalue-portfolio-funds');
                if (rawFunds) {
                    storedFunds = JSON.parse(rawFunds);
                    // Migration: ensure every fund has an id and tag map exists for it
                    storedFunds = storedFunds.map(f => {
                        if (!f.id) f.id = f.folioNo + '_' + f.isin;
                        
                        // Migrate old ISIN tags to the new ID if needed
                        if (!storedTags[f.id]) {
                            storedTags[f.id] = storedTags[f.isin] ? { ...storedTags[f.isin] } : { category: '', assetClass: '', status: '' };
                        }
                        return f;
                    });
                }
            } catch (e) {
                console.warn("Failed to read from localStorage", e);
            }

            return {
                isParsing: false,
                parseError: null,
                pdfPassword: '',
                funds: storedFunds, // { fundName, isin, marketValue, closingUnits, fundHouse, folioNo }
                tags: storedTags, // Map: isin -> { category, assetClass, status }
                
                uniqueCategories: [],
                uniqueAssetClasses: [],
                autocompleteCategories: [],
                autocompleteAssetClasses: [],
                
                // Common default options to seed the datalist
                defaultCategories: ['1 Portfolio', 'Emergency', 'Travel', 'Retirement', 'Kids Education'],
                defaultAssetClasses: ['Equity Large Cap', 'Equity Mid Cap', 'Equity Small Cap', 'Debt Liquid', 'Gold', 'International'],
                
                summaryData: [],
                totalPortfolioValue: 0,
                
                portfolioViewTab: 'chart',
                selectedReportArea: 'overview',
                chart: null,
                resizeHandler: null,
                debounceTimer: null,
            };
        },
        mounted() {
            this.extractUniqueOptions();
            this.calculateSummary();
            this.resizeHandler = () => {
                if (this.chart) this.chart.resize();
            };
            window.addEventListener('resize', this.resizeHandler);
        },
        unmounted() {
            if (this.resizeHandler) {
                window.removeEventListener('resize', this.resizeHandler);
            }
            this.chart?.dispose();
        },
        watch: {
            portfolioViewTab() {
                if (this.portfolioViewTab === 'chart' && this.summaryData.length > 0) {
                    this.$nextTick(() => {
                        this.updateChart();
                    });
                }
            }
        },
        methods: {
            // Helpers
            parseNumericStr(val) {
                if (!val) return null;
                const isNegative = val.includes('(') || val.includes('-');
                const cleanVal = val.replace(/[^\d.]/g, '');
                if (cleanVal === '') return null;
                return isNegative ? -parseFloat(cleanVal) : parseFloat(cleanVal);
            },
            formatNumber(value, decimals = 0) {
                if (value === null || value === undefined || isNaN(value)) return '0';
                return Number(value).toLocaleString('en-IN', {
                    maximumFractionDigits: decimals,
                    minimumFractionDigits: decimals
                });
            },
            formatPercent(value) {
                if (value === null || value === undefined || isNaN(value)) return '0.00%';
                return Number(value).toFixed(2) + '%';
            },
            clearPortfolio() {
                if(confirm("Are you sure you want to clear your current portfolio list? Your custom tags are saved safely.")) {
                    this.funds = [];
                    this.saveTagsAndCalculate();
                }
            },
            toggleStatus(fundId, newStatus) {
                const tag = this.tags[fundId] || { category: '', assetClass: '', status: '' };
                tag.status = (tag.status === newStatus) ? '' : newStatus;
                this.tags[fundId] = tag;
                this.saveTagsAndCalculate();
            },

            // File uploading & parsing
            async handleFileUpload(e) {
                const file = e.target.files[0];
                if (!file) return;

                this.isParsing = true;
                this.parseError = null;

                const fileReader = new FileReader();

                fileReader.onload = async () => {
                    try {
                        const typedarray = new Uint8Array(fileReader.result);
                        
                        const loadingTaskParams = { data: typedarray };
                        if (this.pdfPassword && this.pdfPassword.trim() !== '') {
                            loadingTaskParams.password = this.pdfPassword.trim();
                        }
                        
                        const loadingTask = pdfjsLib.getDocument(loadingTaskParams);
                        const pdf = await loadingTask.promise;
                        
                        let fullText = '';
                        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                            const page = await pdf.getPage(pageNum);
                            const textContent = await page.getTextContent();
                            const pageText = textContent.items.map(item => item.str).join(' ');
                            fullText += pageText + ' \n ';
                        }

                        this.processParsedText(fullText);
                    } catch (error) {
                        console.error("PDF Parsing Error:", error);
                        if (error.name === 'PasswordException') {
                            this.parseError = "PDF is encrypted. Please provide the correct password before uploading.";
                        } else {
                            this.parseError = `Error extracting data. Ensure it's a valid CAS. (${error.message})`;
                        }
                    } finally {
                        this.isParsing = false;
                        // Reset input
                        this.$refs.pdfInput.value = '';
                    }
                };
                fileReader.readAsArrayBuffer(file);
            },

            // The core regex logic adapted from pdf.html
            processParsedText(rawText) {
                const blocks = rawText.split(/Folio No:/i);
                if (blocks.length <= 1) {
                    this.parseError = "Could not find any Folio numbers in the document text.";
                    return;
                }

                let currentFundHouse = "Unknown Fund House";
                const extractedFunds = [];

                for (let i = 0; i < blocks.length - 1; i++) {
                    const preBlock = blocks[i];
                    const postBlock = blocks[i + 1];

                    // Extract Fund House
                    const fhMatch = preBlock.match(/([A-Za-z\s]+Mutual Fund)(?!.*Mutual Fund)/i);
                    if (fhMatch) {
                        currentFundHouse = fhMatch[1]
                            .replace(/PORTFOLIO SUMMARY/i, '')
                            .replace(/.*?Balance\s*/i, '')
                            .trim();
                    }

                    // Extract Fund Name & ISIN
                    const isinMatch = preBlock.match(/([^\n\r]*?)\s*-\s*ISIN\s*:\s*([A-Z0-9\s]+)(?!.*ISIN\s*:)/i);
                    let fundName = "Unknown Fund";
                    let isin = "Unknown ISIN";
                    
                    if (isinMatch) {
                        fundName = isinMatch[1]
                            .replace(/.*(?:PAN|KYC).*?OK\s*/gi, '')
                            .replace(/^OK\s*/i, '')
                            .replace(/^[A-Z0-9\s]+\s*-\s*/, '')
                            .replace(/\s+/g, ' ')
                            .trim();
                        
                        isin = isinMatch[2]
                            .replace(/Registrar.*/i, '')
                            .replace(/\s+/g, '')
                            .trim(); 
                    }

                    // Get Folio Number
                    const folioMatch = postBlock.match(/^\s*([A-Za-z0-9\/\-]+)/);
                    const folioNo = folioMatch ? folioMatch[1].trim() : "Unknown Folio";

                    // Values
                    const closingUnits = this.parseNumericStr((postBlock.match(/Closing Unit Balance:\s*([\d,.]+)/i) || [])[1]) || 0;
                    const marketValue = this.parseNumericStr((postBlock.match(/Market Value.*?:\s*(?:INR)?\s*([\d,.]+)/i) || [])[1]) || 0;

                    if (isin !== "Unknown ISIN") {
                        const fundId = folioNo + '_' + isin;
                        
                        const existingIdx = this.funds.findIndex(f => f.id === fundId);
                        if (existingIdx !== -1) {
                            // Update values of existing fund
                            this.funds[existingIdx].closingUnits = closingUnits;
                            this.funds[existingIdx].marketValue = marketValue;
                            this.funds[existingIdx].fundName = fundName;
                        } else {
                            // Append new fund
                            this.funds.push({
                                id: fundId,
                                fundHouse: currentFundHouse,
                                folioNo: folioNo,
                                fundName: fundName,
                                isin: isin,
                                closingUnits: closingUnits,
                                marketValue: marketValue
                            });
                        }

                        // Initialize tag if not exists, try migrating old isin tag
                        if (!this.tags[fundId]) {
                            this.tags[fundId] = this.tags[isin] ? { ...this.tags[isin] } : { category: '', assetClass: '', status: '' };
                        }
                    }
                }

                // Sync to localStorage
                this.saveTagsAndCalculate();
            },

            debouncedSaveAndCalculate() {
                clearTimeout(this.debounceTimer);
                this.debounceTimer = setTimeout(() => {
                    this.saveTagsAndCalculate();
                }, 500); // 500ms debounce for typing
            },

            saveTagsAndCalculate() {
                // Save both tags and funds
                try {
                    localStorage.setItem('realvalue-portfolio-tags', JSON.stringify(this.tags));
                    localStorage.setItem('realvalue-portfolio-funds', JSON.stringify(this.funds));
                } catch(e) {
                    console.error("Failed to save to localStorage", e);
                }

                this.extractUniqueOptions();
                this.calculateSummary();
            },

            extractUniqueOptions() {
                const cats = new Set();
                const acs = new Set();
                let hasUncategorized = false;
                
                this.funds.forEach(f => {
                    const t = this.tags[f.id] || {};
                    if (t.category && t.category.trim() !== '') {
                        cats.add(t.category.trim());
                    } else {
                        hasUncategorized = true;
                    }
                    if (t.assetClass && t.assetClass.trim() !== '') {
                        acs.add(t.assetClass.trim());
                    }
                });

                // Convert to array and sort
                this.uniqueCategories = Array.from(cats).sort();
                if (hasUncategorized) {
                    this.uniqueCategories.push('Uncategorized');
                }
                
                this.uniqueAssetClasses = Array.from(acs).sort();
                
                // Autocomplete includes defaults
                this.autocompleteCategories = [...this.uniqueCategories];
                this.defaultCategories.forEach(c => {
                    if (!this.autocompleteCategories.includes(c) && c !== 'Uncategorized') this.autocompleteCategories.push(c);
                });
                
                this.autocompleteAssetClasses = [...this.uniqueAssetClasses];
                this.defaultAssetClasses.forEach(c => {
                    if (!this.autocompleteAssetClasses.includes(c)) this.autocompleteAssetClasses.push(c);
                });
            },

            calculateSummary() {
                let total = 0;
                const map = {};

                // Aggregate across all loaded funds
                this.funds.forEach(f => {
                    const tag = this.tags[f.id] || {};
                    const val = f.marketValue || 0;
                    
                    if (this.selectedReportArea === 'overview') {
                        // Group by Category
                        const cat = (tag.category && tag.category.trim() !== '') ? tag.category.trim() : 'Uncategorized';
                        total += val;
                        map[cat] = (map[cat] || 0) + val;
                    } else {
                        // Filter by specific category and group by Asset Class
                        const cat = (tag.category && tag.category.trim() !== '') ? tag.category.trim() : 'Uncategorized';
                        if (cat === this.selectedReportArea) {
                            const ac = (tag.assetClass && tag.assetClass.trim() !== '') ? tag.assetClass.trim() : 'Unclassified';
                            total += val;
                            map[ac] = (map[ac] || 0) + val;
                        }
                    }
                });

                this.totalPortfolioValue = total;

                // Create array and sort by value descending
                const data = [];
                for (const [name, value] of Object.entries(map)) {
                    // Only include in summary if there is actual value
                    if (value > 0) {
                        data.push({
                            name,
                            value,
                            percent: total > 0 ? (value / total) * 100 : 0
                        });
                    }
                }

                data.sort((a, b) => b.value - a.value);
                this.summaryData = data;

                if (this.portfolioViewTab === 'chart') {
                    this.$nextTick(() => {
                        this.updateChart();
                    });
                }
            },

            updateChart() {
                const chartDom = document.getElementById('portfolio-allocation-chart');
                if (!chartDom) return;
                
                if (!window.echarts) {
                    console.warn("ECharts not loaded");
                    return;
                }

                if (!this.chart) {
                    this.chart = window.echarts.init(chartDom);
                }

                // Prepare data for ECharts Pie
                const chartData = this.summaryData.map(item => ({
                    name: item.name,
                    value: item.value
                }));

                const option = {
                    title: {
                        text: this.selectedReportArea === 'overview' ? 'Portfolio Category Overview' : `Asset Allocation: ${this.selectedReportArea}`,
                        left: 'center',
                        top: 0,
                        textStyle: { color: '#2c3e50', fontSize: 16 }
                    },
                    toolbox: {
                        right: 15,
                        feature: {
                            saveAsImage: {
                                title: 'Download Snapshot',
                                name: `Portfolio_Report_${this.selectedReportArea === 'overview' ? 'Overview' : this.selectedReportArea.replace(/[^a-zA-Z0-9]/g, '_')}`,
                                pixelRatio: 2
                            }
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function(params) {
                            return `<strong>${params.name}</strong><br/>
                                   ₹${Number(params.value).toLocaleString('en-IN')}<br/>
                                   ${params.percent}%`;
                        }
                    },
                    legend: {
                        top: 'bottom',
                        type: 'scroll'
                    },
                    color: [
                        '#2c3e50', '#0066cc', '#1890ff', '#13c2c2', '#52c41a', 
                        '#eb2f96', '#722ed1', '#fa8c16', '#fadb14', '#a0d911'
                    ],
                    series: [
                        {
                            name: this.selectedReportArea === 'overview' ? 'Category' : 'Asset Class',
                            type: 'pie',
                            radius: ['35%', '65%'],
                            center: ['50%', '55%'],
                            avoidLabelOverlap: true,
                            itemStyle: {
                                borderRadius: 10,
                                borderColor: '#fff',
                                borderWidth: 2
                            },
                            label: {
                                show: true,
                                formatter: '{b}\n{d}%'
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '16',
                                    fontWeight: 'bold'
                                }
                            },
                            data: chartData
                        }
                    ]
                };

                this.chart.setOption(option);
            },
            
            copyPassword() {
                if (this.pdfPassword) {
                    navigator.clipboard.writeText(this.pdfPassword).catch(err => console.error("Clipboard copy failed", err));
                }
            },
            clearPassword() {
                this.pdfPassword = '';
            }
        }
    });

    app.mount(container);
};

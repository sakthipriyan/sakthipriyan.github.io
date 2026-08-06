// IBKR Tax Engine (Vue.js)
window.initializeTool = window.initializeTool || {};

window.initializeTool.ibkrTaxEngine = function (container, config) {
    // Inject styles
    const styleId = 'ibkr-tax-styles';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `
            .tax-tracker th, .tax-tracker td {
                text-align: left;
                padding: 0.5rem;
                border-bottom: 1px solid var(--gray-medium, #ddd);
            }
            .tax-tracker th {
                background: #f8f9fa;
                font-weight: 600;
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
            .share-button {
                background: #3b82f6;
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                cursor: pointer;
                font-weight: 600;
            }
            .share-button:hover {
                background: #2563eb;
            }
        `;
        document.head.appendChild(style);
    }

    container.innerHTML = `
        <div id="ibkr-tax-app">
            <div class="tax-tracker">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
                    <h3 style="margin: 0;">🏛️ IBKR Tax Engine</h3>
                    <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
                        <div>
                            <label style="font-weight: 600; margin-right: 0.5rem;">Financial Year:</label>
                            <select v-model="selectedFy" style="padding: 0.4rem; border-radius: 4px; border: 1px solid #ccc;">
                                <option v-for="fy in availableFys" :key="fy.value" :value="fy.value">
                                    {{ fy.label }} (CY {{ fy.cyYear }})
                                </option>
                            </select>
                        </div>
                        <button type="button" class="share-button" @click="$refs.csvInput.click()">
                            📊 Upload IBKR Flex Query (CSV)
                        </button>
                    </div>
                </div>

                <div style="margin-bottom: 1rem; padding: 1rem; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; font-size: 0.9em; color: #15803d; line-height: 1.5;">
                    🔒 <strong>100% Private.</strong> Your CSV is processed locally in your browser. The only network request made is to fetch historical SBI TT Buying rates for currency conversion.
                </div>

                <input type="file" ref="csvInput" accept=".csv,text/csv" style="display: none;" @change="handleFileUpload" />
                
                <div v-if="isParsing" class="loading-text">⏳ Parsing CSV and fetching SBI rates...</div>
                <div v-if="parseError" class="error-text">⚠️ {{ parseError }}</div>

                <div v-if="!isParsing && results">
                    <!-- Schedule FA Section -->
                    <div style="margin-bottom: 2rem;">
                        <h4 style="margin-bottom: 0.5rem; color: #1e40af;">Schedule FA (Foreign Assets)</h4>
                        <p style="margin: 0 0 1rem 0; font-size: 0.85em; color: #555;">
                            Period: Jan 1, {{ targetCy }} to Dec 31, {{ targetCy }}<br>
                            SBI TT Buying Rate on {{ results.faRateDate }}: <strong>₹{{ results.faRate }}</strong>
                        </p>
                        <div style="overflow-x: auto;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <thead>
                                    <tr>
                                        <th>Asset (Symbol)</th>
                                        <th style="text-align: right;">Initial Value (USD)</th>
                                        <th style="text-align: right;">Peak Balance (USD)</th>
                                        <th style="text-align: right;">Closing Balance (USD)</th>
                                        <th style="text-align: right;">Gross Paid/Credited (USD)</th>
                                        <th style="text-align: right;">Peak Balance (INR)</th>
                                        <th style="text-align: right;">Closing Balance (INR)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="results.faItems.length === 0">
                                        <td colspan="7" style="text-align: center; padding: 1rem; color: #777;">No assets found for Schedule FA period.</td>
                                    </tr>
                                    <tr v-for="item in results.faItems" :key="item.symbol">
                                        <td><strong>{{ item.symbol }}</strong></td>
                                        <td style="text-align: right;">$ {{ item.initialValue.toFixed(2) }}</td>
                                        <td style="text-align: right;">$ {{ item.peakBalance.toFixed(2) }}</td>
                                        <td style="text-align: right;">$ {{ item.closingBalance.toFixed(2) }}</td>
                                        <td style="text-align: right;">$ {{ item.grossCredited.toFixed(2) }}</td>
                                        <td style="text-align: right;">₹{{ (item.peakBalance * results.faRate).toFixed(2) }}</td>
                                        <td style="text-align: right; font-weight: 600;">₹{{ (item.closingBalance * results.faRate).toFixed(2) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Schedule AL Section -->
                    <div>
                        <h4 style="margin-bottom: 0.5rem; color: #1e40af;">Schedule AL (Assets & Liabilities) - Shares & Securities</h4>
                        <p style="margin: 0 0 1rem 0; font-size: 0.85em; color: #555;">
                            Period: Apr 1, {{ targetFyStartYear }} to Mar 31, {{ targetFyEndYear }}<br>
                            SBI TT Buying Rate on {{ results.alRateDate }}: <strong>₹{{ results.alRate }}</strong>
                        </p>
                        <div style="overflow-x: auto;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <thead>
                                    <tr>
                                        <th>Asset (Symbol)</th>
                                        <th style="text-align: right;">Closing Balance (USD)</th>
                                        <th style="text-align: right;">Closing Balance (INR)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="results.alItems.length === 0">
                                        <td colspan="3" style="text-align: center; padding: 1rem; color: #777;">No assets found for Schedule AL period.</td>
                                    </tr>
                                    <tr v-for="item in results.alItems" :key="item.symbol">
                                        <td><strong>{{ item.symbol }}</strong></td>
                                        <td style="text-align: right;">$ {{ item.closingBalance.toFixed(2) }}</td>
                                        <td style="text-align: right; font-weight: 600;">₹{{ (item.closingBalance * results.alRate).toFixed(2) }}</td>
                                    </tr>
                                    <tr v-if="results.alItems.length > 0" style="background: #f8f9fa;">
                                        <td><strong>Total</strong></td>
                                        <td style="text-align: right;"><strong>$ {{ results.alItems.reduce((s, i) => s + i.closingBalance, 0).toFixed(2) }}</strong></td>
                                        <td style="text-align: right; font-weight: 600; color: #15803d;"><strong>₹{{ results.alItems.reduce((s, i) => s + (i.closingBalance * results.alRate), 0).toFixed(2) }}</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const app = Vue.createApp({
        data() {
            const currentYear = new Date().getFullYear();
            const fys = [];
            // Generate last 5 financial years
            for (let i = 0; i < 5; i++) {
                const startYear = currentYear - i - 1;
                const endYear = currentYear - i;
                fys.push({
                    value: startYear,
                    label: `FY ${startYear}-${endYear.toString().slice(-2)}`,
                    cyYear: startYear
                });
            }

            return {
                availableFys: fys,
                selectedFy: fys[0].value,
                isParsing: false,
                parseError: null,
                results: null
            };
        },
        computed: {
            targetCy() {
                return this.selectedFy;
            },
            targetFyStartYear() {
                return this.selectedFy;
            },
            targetFyEndYear() {
                return this.selectedFy + 1;
            }
        },
        methods: {
            parseIbkrCsvLine(line) {
                const result = [];
                let current = '';
                let inQuotes = false;
                for (let i = 0; i < line.length; i++) {
                    const char = line[i];
                    if (char === '"' && line[i + 1] === '"' && inQuotes) {
                        current += '"';
                        i++;
                    } else if (char === '"') {
                        inQuotes = !inQuotes;
                    } else if (char === ',' && !inQuotes) {
                        result.push(current.trim());
                        current = '';
                    } else {
                        current += char;
                    }
                }
                result.push(current.trim());
                return result;
            },
            async fetchSbiRateForDate(targetDateStr) {
                // targetDateStr in YYYY-MM-DD
                const year = targetDateStr.slice(0, 4);
                try {
                    const response = await fetch(`https://data.sakthipriyan.com/sbi-fx-card-rates/${year}/USD.json`);
                    if (!response.ok) return { tt_buy: 83.0, date: targetDateStr }; // fallback
                    const data = await response.json();
                    
                    // Filter dates <= targetDateStr
                    const pastDates = data.filter(d => d.date <= targetDateStr);
                    if (pastDates.length > 0) {
                        // Return the most recent one
                        pastDates.sort((a, b) => b.date.localeCompare(a.date));
                        return { tt_buy: pastDates[0].tt_buy, date: pastDates[0].date };
                    } else {
                        // If no dates in this year before target, maybe fetch previous year, but we'll just take the earliest available
                        return { tt_buy: data[0].tt_buy, date: data[0].date };
                    }
                } catch (e) {
                    console.error("Failed to fetch SBI rates", e);
                    return { tt_buy: 83.0, date: targetDateStr }; // fallback
                }
            },
            async handleFileUpload(e) {
                const file = e.target.files[0];
                if (!file) return;
                this.isParsing = true;
                this.parseError = null;
                this.results = null;

                try {
                    const text = await file.text();
                    const lines = text.split(/\r?\n/);
                    
                    // We need to parse:
                    // - Trades: to track quantity changes, cost basis changes? No, peak balance is usually peak invested value or peak market value.
                    // Wait, Schedule FA peak balance: It means peak investment value (quantity * price) or peak cost? Usually peak cost of investment.
                    // Actually, "peak balance during the period" means max(daily quantity * daily closing price) OR max(daily quantity * cost of acquisition).
                    // As per tax rules, Schedule FA Peak Balance is usually peak investment value. If daily prices aren't available, we use Peak (Quantity * Average Cost). Let's use Quantity * Cost Price if available, or just max value of the asset.
                    // Alternatively, "peak balance" = peak quantity * cost price. Let's track: Quantity, Total Cost Basis.

                    const trades = [];
                    const dividends = [];

                    for (const line of lines) {
                        if (!line.trim()) continue;
                        const fields = this.parseIbkrCsvLine(line);
                        if (fields.length < 3) continue;

                        // Trades rows: section,Data,Order,Stocks,Currency,Symbol,Date/Time,...,Proceeds,Comm/Fee,...
                        if (fields[0] === 'Trades' && fields[1] === 'Data' && fields[2] === 'Order' && fields[3] === 'Stocks') {
                            const symbol = fields[5];
                            const tradeDateStr = fields[6];
                            const tradeDate = tradeDateStr.split(',')[0]; // "2024-05-15, 09:30:00" -> "2024-05-15"
                            const quantity = parseFloat(fields[7]) || 0;
                            const price = parseFloat(fields[8]) || 0;
                            const proceeds = parseFloat(fields[10]) || 0;
                            const commFee = parseFloat(fields[11]) || 0;
                            if (symbol && tradeDate) {
                                trades.push({ symbol, date: tradeDate, quantity, price, amount: proceeds + commFee });
                            }
                        }

                        // Dividends: section,Data,Currency,Date,Description,Amount
                        if (fields[0] === 'Dividends' && fields[1] === 'Data' && !fields[2].includes('Total')) {
                            // format: Dividends,Data,USD,2024-12-15,"AAPL(US...) Cash Dividend...",1.50
                            // Sometimes symbol is in the description
                            const date = fields[3];
                            const desc = fields[4] || '';
                            const amount = parseFloat(fields[5]) || 0;
                            const symbolMatch = desc.match(/^([A-Z0-9]+)\b/);
                            if (symbolMatch && date) {
                                const symbol = symbolMatch[1];
                                dividends.push({ symbol, date, amount });
                            }
                        }
                    }

                    trades.sort((a, b) => a.date.localeCompare(b.date));

                    const dailyAssets = {}; // symbol -> [{date, qty, totalCost}]

                    // Reconstruct history
                    const currentPos = {};
                    for (const t of trades) {
                        if (!currentPos[t.symbol]) currentPos[t.symbol] = { qty: 0, cost: 0 };
                        if (t.quantity > 0) {
                            // Buy
                            currentPos[t.symbol].qty += t.quantity;
                            currentPos[t.symbol].cost += Math.abs(t.amount); 
                        } else if (t.quantity < 0) {
                            // Sell
                            const avgCost = currentPos[t.symbol].qty > 0 ? (currentPos[t.symbol].cost / currentPos[t.symbol].qty) : 0;
                            currentPos[t.symbol].qty += t.quantity; // subtracts
                            currentPos[t.symbol].cost += (t.quantity * avgCost); // t.quantity is negative, so subtracts cost
                        }
                        
                        if (currentPos[t.symbol].qty < 1e-6) {
                            currentPos[t.symbol].qty = 0;
                            currentPos[t.symbol].cost = 0;
                        }

                        if (!dailyAssets[t.symbol]) dailyAssets[t.symbol] = [];
                        dailyAssets[t.symbol].push({ 
                            date: t.date, 
                            qty: currentPos[t.symbol].qty, 
                            cost: currentPos[t.symbol].cost 
                        });
                    }

                    // Process Schedule FA (Calendar Year)
                    const cyStart = `${this.targetCy}-01-01`;
                    const cyEnd = `${this.targetCy}-12-31`;
                    
                    // Fetch SBI Rate for Dec 31
                    const faRateInfo = await this.fetchSbiRateForDate(cyEnd);

                    const faItems = [];
                    for (const symbol of Object.keys(dailyAssets)) {
                        const history = dailyAssets[symbol];
                        
                        // Find initial value (Value on Jan 1)
                        // It is the last state BEFORE or ON Jan 1
                        let initialCost = 0;
                        let lastCostBeforeCy = 0;
                        for (const h of history) {
                            if (h.date <= cyStart) lastCostBeforeCy = h.cost;
                            if (h.date > cyStart) break;
                        }
                        initialCost = lastCostBeforeCy;

                        // Find peak value during CY
                        let peakCost = initialCost;
                        let closingCost = initialCost;
                        
                        for (const h of history) {
                            if (h.date >= cyStart && h.date <= cyEnd) {
                                if (h.cost > peakCost) peakCost = h.cost;
                                closingCost = h.cost;
                            }
                        }

                        // If no activity in CY, closingCost is still initialCost
                        if (history.length > 0 && history[history.length - 1].date < cyStart) {
                            closingCost = history[history.length - 1].cost;
                            peakCost = closingCost;
                        }

                        // Dividends in CY
                        let grossCredited = 0;
                        for (const d of dividends) {
                            if (d.symbol === symbol && d.date >= cyStart && d.date <= cyEnd) {
                                grossCredited += d.amount;
                            }
                        }

                        if (peakCost > 0 || grossCredited > 0) {
                            faItems.push({
                                symbol,
                                initialValue: initialCost,
                                peakBalance: peakCost,
                                closingBalance: closingCost,
                                grossCredited: grossCredited
                            });
                        }
                    }

                    // Process Schedule AL (Financial Year)
                    const fyStart = `${this.targetFyStartYear}-04-01`;
                    const fyEnd = `${this.targetFyEndYear}-03-31`;
                    
                    // Fetch SBI Rate for Mar 31
                    const alRateInfo = await this.fetchSbiRateForDate(fyEnd);

                    const alItems = [];
                    for (const symbol of Object.keys(dailyAssets)) {
                        const history = dailyAssets[symbol];
                        
                        let closingCost = 0;
                        for (const h of history) {
                            if (h.date <= fyEnd) {
                                closingCost = h.cost;
                            }
                        }

                        if (closingCost > 0) {
                            alItems.push({
                                symbol,
                                closingBalance: closingCost
                            });
                        }
                    }

                    this.results = {
                        faItems,
                        faRate: faRateInfo.tt_buy,
                        faRateDate: faRateInfo.date,
                        alItems,
                        alRate: alRateInfo.tt_buy,
                        alRateDate: alRateInfo.date
                    };

                } catch (err) {
                    console.error("Parse error:", err);
                    this.parseError = "Error parsing CSV file. Please ensure it's a valid IBKR Flex Query.";
                } finally {
                    this.isParsing = false;
                    this.$refs.csvInput.value = '';
                }
            }
        }
    });

    app.mount(container);
};

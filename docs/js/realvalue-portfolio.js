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
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 0.5rem;">
                    <h3 style="margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                        📑 Mutual Fund Portfolio
                        <span v-if="funds.length > 0" style="font-size: 0.7em; background: #e0f2fe; color: #0284c7; padding: 0.2rem 0.5rem; border-radius: 12px; font-weight: 600;">
                            {{ funds.length }} Funds
                        </span>
                    </h3>
                    
                    <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                        
                        <div style="display: flex; border: 2px solid var(--secondary-color); border-radius: 4px; overflow: hidden; background: var(--bg-primary, #fff);">
                            <div style="padding: 0.5rem 0.6rem; background: #f8f9fa; border-right: 1px solid #ddd; font-size: 0.85em; color: #555; display: flex; align-items: center;">
                                👤
                            </div>
                            <input 
                                type="text" 
                                v-model="uploadInvestorName" 
                                placeholder="Investor/Owner Name" 
                                style="border: none; padding: 0.5rem; outline: none; width: 150px; font-size: 0.9em;"
                            >
                        </div>
\n                        <div style="display: flex; border: 2px solid var(--secondary-color); border-radius: 4px; overflow: hidden; background: var(--bg-primary, #fff);">
                            <div style="padding: 0.5rem 0.6rem; background: #f8f9fa; border-right: 1px solid #ddd; font-size: 0.85em; color: #555; display: flex; align-items: center;">
                                🔒
                            </div>
                            <input 
                                type="password" 
                                v-model="pdfPassword" 
                                placeholder="CAS Password (opt)" 
                                style="border: none; padding: 0.5rem; outline: none; width: 130px; font-size: 0.9em;"
                            >
                            <button type="button" class="share-button" @click="$refs.pdfInput.click()" style="border-radius: 0; border-left: 1px solid #ddd; border-top: none; border-bottom: none; border-right: none;">
                                🔄 Import CAS PDF
                            </button>
                        </div>
                        <button type="button" class="share-button" @click="$refs.ibkrInput.click()" style="align-self: stretch;">
                            📊 Import IBKR CSV
                        </button>
                    </div>
                </div>

                <!-- Privacy row: message left, verify button right -->
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; margin-bottom: 0.75rem; flex-wrap: wrap;">
                    <p style="font-size: 0.95em; color: #15803d; font-weight: 500; margin: 0; line-height: 1.5; flex: 1; min-width: 200px;">
                        🔒 Your sensitive financial files are processed entirely within your browser. <strong>Your data never leaves your device!</strong>
                    </p>
                    <button type="button" @click="showPrivacyDetails = !showPrivacyDetails"
                        style="flex-shrink: 0; padding: 0.3rem 0.7rem; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 4px; font-size: 0.8em; font-weight: 600; color: #15803d; cursor: pointer; display: flex; align-items: center; gap: 0.35rem; white-space: nowrap;">
                        🔍 Verify It Yourself <span>{{ showPrivacyDetails ? '▲' : '▼' }}</span>
                    </button>
                </div>

                <!-- Expandable Privacy & Verification Panel -->
                <div v-show="showPrivacyDetails" style="margin-bottom: 1rem; padding: 1rem; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 0.85em; color: #374151; line-height: 1.7;">
                    <div style="display: flex; align-items: flex-start; gap: 0.75rem; margin-bottom: 1rem; padding: 0.6rem 0.85rem; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 5px;">
                        <span style="font-size: 1.1em;">🔒</span>
                        <div>
                            <strong style="color: #15803d;">100% Private. 100% Local.</strong>
                            <ul style="margin: 0.25rem 0 0; padding-left: 1.2rem; color: #166534; line-height: 1.8;">
                                <li>Processed locally via JavaScript.</li>
                                <li>No data ever leaves your device.</li>
                                <li>Stored locally in your browser cache.</li>
                                <li>Fully functional in offline mode.</li>
                            </ul>
                        </div>
                    </div>
                    <div style="margin-bottom: 0.75rem; padding: 0.5rem 0.85rem; background: #eff6ff; border-left: 3px solid #3b82f6; border-radius: 4px; color: #1e40af;">
                        💡 <strong>Try with a smaller window:</strong> Upload a CAS PDF covering just the first year or two — quicker to verify, and a great way to explore tagging, XIRR, and allocation views.
                    </div>
                    <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #374151;">Three ways to verify your data stays private:</p>
                    <div style="margin-bottom: 0.75rem; padding: 0.6rem 0.85rem; background: #fff; border: 1px solid #e5e7eb; border-radius: 5px;">
                        <p style="margin: 0 0 0.35rem 0; font-weight: 600;">📴 Approach 1: Go Offline</p>
                        <ol style="margin: 0 0 0.35rem 0; padding-left: 1.4rem;">
                            <li>Load the page fully</li>
                            <li>Disconnect from the internet</li>
                            <li>Upload your CAS file</li>
                        </ol>
                        <p style="margin: 0; color: #15803d;">✅ Analysis completes — no network needed.</p>
                    </div>
                    <div style="margin-bottom: 0.75rem; padding: 0.6rem 0.85rem; background: #fff; border: 1px solid #e5e7eb; border-radius: 5px;">
                        <p style="margin: 0 0 0.35rem 0; font-weight: 600;">🔍 Approach 2: Check Network Activity</p>
                        <ol style="margin: 0 0 0.35rem 0; padding-left: 1.4rem;">
                            <li>Open developer tools (<code style="background: #f3f4f6; padding: 0.1rem 0.3rem; border-radius: 3px;">F12</code> or <code style="background: #f3f4f6; padding: 0.1rem 0.3rem; border-radius: 3px;">Ctrl+Shift+I</code>)</li>
                            <li>Go to the <strong>Network</strong> tab</li>
                            <li>Upload your CAS file</li>
                        </ol>
                        <p style="margin: 0; color: #15803d;">✅ No file upload request appears in the Network tab.</p>
                    </div>
                    <div style="margin-bottom: 0.75rem; padding: 0.6rem 0.85rem; background: #fff; border: 1px solid #e5e7eb; border-radius: 5px;">
                        <p style="margin: 0 0 0.35rem 0; font-weight: 600;">📚 Approach 3: Read the Source</p>
                        <ul style="margin: 0 0 0.35rem 0; padding-left: 1.4rem;">
                            <li>This site is hosted on <strong>GitHub Pages</strong> — a static file host. It cannot run server-side code or receive uploads.</li>
                            <li>The full source is open on GitHub. Browse the <a href="https://github.com/sakthipriyan/sakthipriyan.github.io/blob/master/docs/building-wealth/tools/realvalue-portfolio/index.html" target="_blank" rel="noopener noreferrer" style="color: #2563eb;">HTML</a> and <a href="https://github.com/sakthipriyan/sakthipriyan.github.io/blob/master/docs/js/realvalue-portfolio.js" target="_blank" rel="noopener noreferrer" style="color: #2563eb;">JavaScript</a> — there is no upload or network-send code.</li>
                            <li>
                                Ask any AI tool (ChatGPT, Gemini, etc.) — copy this prompt:
                                <div style="display: flex; align-items: stretch; gap: 0; margin-top: 0.4rem; border: 1px solid #d1d5db; border-radius: 4px; overflow: hidden; font-size: 0.9em;">
                                    <span style="flex: 1; padding: 0.4rem 0.6rem; background: #f9fafb; color: #374151; font-style: italic; line-height: 1.4;">I want to verify this tool is completely private. When I upload my files and use this tool, does it send any of my data to a server or the internet? Please review these files and confirm: https://sakthipriyan.com/building-wealth/tools/realvalue-portfolio/ | https://sakthipriyan.com/building-wealth/tools/realvalue-portfolio/index.html | https://sakthipriyan.com/js/realvalue-portfolio.js</span>
                                    <button type="button" @click="copyAiPrompt" style="flex-shrink: 0; border: none; border-left: 1px solid #d1d5db; background: #f3f4f6; padding: 0.4rem 0.7rem; cursor: pointer; font-size: 0.85em; color: #374151; white-space: nowrap;">{{ promptCopied ? '✅ Copied' : '📋 Copy' }}</button>
                                </div>
                            </li>
                            <li>📦 Uses <a href="https://mozilla.github.io/pdf.js/" target="_blank" rel="noopener noreferrer" style="color: #2563eb;">PDF.js</a> — all PDF parsing runs locally in your browser, no server needed.</li>
                        </ul>
                        <p style="margin: 0; color: #15803d;">✅ The code confirms it — your data never leaves your device.</p>
                    </div>
                </div>

                <!-- Hidden file inputs -->
                <input type="file" ref="pdfInput" accept="application/pdf" style="display: none;" @change="handleFileUpload" />
                <input type="file" ref="ibkrInput" accept=".csv,text/csv" style="display: none;" @change="handleIbkrUpload" />
                
                <div v-if="isParsing" class="loading-text" style="margin-bottom: 1.5rem;">⏳ Loading and parsing PDF... Please wait securely in browser.</div>
                <div v-if="parseError" class="error-text" style="margin-bottom: 1.5rem;">⚠️ {{ parseError }}</div>
                <div v-if="isIbkrParsing" class="loading-text" style="margin-bottom: 1.5rem;">⏳ Parsing IBKR CSV and loading exchange rate...</div>
                <div v-if="ibkrError" class="error-text" style="margin-bottom: 1.5rem;">⚠️ {{ ibkrError }}</div>
                <div v-if="funds.length > 0">

                    <div style="margin-bottom: 2rem;">
                        
                    <!-- TABS NAVIGATION -->
                    <div class="mode-toggle" style="margin-bottom: 2rem; display: flex; justify-content: center; gap: 0.5rem; flex-wrap: wrap;">
                        <button type="button" :class="{'active': activeTab === 'overview'}" @click="activeTab = 'overview'" style="padding: 0.8rem 2rem; font-size: 1.1em; border-radius: 6px;">🌍 Overview</button>
                        <button type="button" :class="{'active': activeTab === 'goals'}" @click="activeTab = 'goals'" style="padding: 0.8rem 2rem; font-size: 1.1em; border-radius: 6px;">🎯 Goals</button>
                        <button type="button" :class="{'active': activeTab === 'tagging'}" @click="activeTab = 'tagging'" style="padding: 0.8rem 2rem; font-size: 1.1em; border-radius: 6px;">🏷️ Tagging</button>
                        <button type="button" :class="{'active': activeTab === 'data'}" @click="activeTab = 'data'" style="padding: 0.8rem 2rem; font-size: 1.1em; border-radius: 6px;">🗂️ Data</button>
                    </div>

                    <!-- TAB 1: OVERVIEW -->
                    <div v-show="activeTab === 'overview'">
                        <!-- Goal Cards (above Investors) -->
                        <div v-if="goals.length > 0" style="margin-bottom: 2rem;">
                            <h3 style="margin: 0 0 1rem 0; color: var(--primary-color); font-size: 1.1em; letter-spacing: 0.02em;">
                                🎯 Goal{{ goals.length > 1 ? 's' : '' }}
                            </h3>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem;">

                                <!-- Combined Goals card (only when multiple goals) -->
                                <div v-if="goals.length > 1" style="background: var(--bg-primary, #fff); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--gray-medium, #ddd); box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                                    <h3 style="margin: 0 0 0.25rem 0; color: var(--primary-color);">✨ Combined Goals</h3>
                                    <p style="margin: 0 0 0.75rem 0; color: var(--text-secondary); font-size: 0.85em;">Sum of all goal-assigned funds</p>
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                        <span style="color: var(--text-secondary);">Total Value</span>
                                        <strong style="font-size: 1.2em;">₹{{ formatNumber(Object.values(goalCurrentValues).reduce((s, v) => s + v, 0)) }}</strong>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                                        <span style="color: var(--text-secondary); font-size: 0.85em;">Next Milestone</span>
                                        <span style="font-size: 0.85em;">₹{{ formatNumber(calculateNextMilestone(Object.values(goalCurrentValues).reduce((s, v) => s + v, 0), 'INR')) }}</span>
                                    </div>
                                    <div style="width: 100%; background-color: #e0e0e0; border-radius: 4px; height: 8px; margin-bottom: 0.2rem;">
                                        <div :style="{ width: Math.min(100, (Object.values(goalCurrentValues).reduce((s,v) => s+v, 0) / calculateNextMilestone(Object.values(goalCurrentValues).reduce((s,v) => s+v, 0), 'INR')) * 100) + '%', backgroundColor: '#3b82f6', height: '100%', borderRadius: '4px' }"></div>
                                    </div>
                                    <div style="text-align: right; font-size: 0.75em; color: var(--text-secondary);">
                                        {{ formatPercent((Object.values(goalCurrentValues).reduce((s,v) => s+v, 0) / calculateNextMilestone(Object.values(goalCurrentValues).reduce((s,v) => s+v, 0), 'INR')) * 100) }} to milestone
                                    </div>
                                </div>

                                <!-- Individual goal cards -->
                                <div v-for="goal in goals" :key="goal.id" style="background: var(--bg-primary, #fff); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--gray-medium, #ddd); box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                                    <h3 style="margin: 0 0 0.5rem 0; color: var(--primary-color);">🎯 {{ goal.name }}</h3>
                                    <p v-if="goal.description" style="margin: 0 0 0.75rem 0; color: var(--text-secondary); font-size: 0.9em;">{{ goal.description }}</p>

                                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                        <span style="color: var(--text-secondary);">Current Value</span>
                                        <strong style="font-size: 1.2em;">₹{{ formatNumber(goalCurrentValues[goal.id] || 0) }}</strong>
                                    </div>

                                    <!-- Has target amount → amount progress bar -->
                                    <template v-if="getGoalTargetAmount(goal) > 0">
                                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                                            <span style="color: var(--text-secondary); font-size: 0.85em;">Target Amount</span>
                                            <span style="font-size: 0.85em;">₹{{ formatNumber(getGoalTargetAmount(goal)) }}</span>
                                        </div>
                                        <!-- Two-segment bar: green up to target, amber for overflow -->
                                        <div style="width: 100%; background-color: #e0e0e0; border-radius: 4px; height: 8px; margin-bottom: 0.2rem; display: flex; overflow: hidden;">
                                            <div :style="{ width: ((goalCurrentValues[goal.id] || 0) >= getGoalTargetAmount(goal) ? (getGoalTargetAmount(goal) / (goalCurrentValues[goal.id] || 1)) * 100 : ((goalCurrentValues[goal.id] || 0) / getGoalTargetAmount(goal)) * 100) + '%', backgroundColor: '#4CAF50', height: '100%', flexShrink: 0 }"></div>
                                            <div v-if="(goalCurrentValues[goal.id] || 0) > getGoalTargetAmount(goal)" :style="{ width: (((goalCurrentValues[goal.id] || 0) - getGoalTargetAmount(goal)) / (goalCurrentValues[goal.id] || 1)) * 100 + '%', backgroundColor: '#f59e0b', height: '100%', flexShrink: 0 }"></div>
                                        </div>
                                        <div style="text-align: right; font-size: 0.75em; color: var(--text-secondary); margin-bottom: 0.5rem;">
                                            {{ formatPercent(((goalCurrentValues[goal.id] || 0) / getGoalTargetAmount(goal)) * 100) }} of target
                                        </div>
                                    </template>

                                    <!-- No target amount AND no target date → next milestone bar -->
                                    <template v-else-if="!goal.targetDate">
                                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                                            <span style="color: var(--text-secondary); font-size: 0.85em;">Next Milestone</span>
                                            <span style="font-size: 0.85em;">₹{{ formatNumber(calculateNextMilestone(goalCurrentValues[goal.id] || 0, 'INR')) }}</span>
                                        </div>
                                        <div style="width: 100%; background-color: #e0e0e0; border-radius: 4px; height: 8px; margin-bottom: 0.2rem;">
                                            <div :style="{ width: Math.min(100, ((goalCurrentValues[goal.id] || 0) / calculateNextMilestone(goalCurrentValues[goal.id] || 0, 'INR')) * 100) + '%', backgroundColor: '#3b82f6', height: '100%', borderRadius: '4px' }"></div>
                                        </div>
                                        <div style="text-align: right; font-size: 0.75em; color: var(--text-secondary); margin-bottom: 0.5rem;">
                                            {{ formatPercent(((goalCurrentValues[goal.id] || 0) / calculateNextMilestone(goalCurrentValues[goal.id] || 0, 'INR')) * 100) }} to milestone
                                        </div>
                                    </template>

                                    <!-- Target date time progress bar -->
                                    <template v-if="goal.targetDate">
                                        <div style="margin-top: 0.25rem;">
                                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                                                <span style="color: var(--text-secondary); font-size: 0.85em;">⏱ Time Progress</span>
                                                <span style="font-size: 0.85em; color: var(--text-secondary);">Target: {{ formatNavDate(goal.targetDate) }}</span>
                                            </div>
                                            <div style="width: 100%; background-color: #e0e0e0; border-radius: 4px; height: 8px; margin-bottom: 0.2rem; display: flex; overflow: hidden;">
                                                <div :style="{ width: (getGoalTimePercent(goal) >= 100 ? 85 : getGoalTimePercent(goal)) + '%', backgroundColor: '#4CAF50', height: '100%', flexShrink: 0 }"></div>
                                                <div v-if="getGoalTimePercent(goal) >= 100" style="width: 15%; background-color: #f59e0b; height: 100%; flex-shrink: 0;"></div>
                                            </div>
                                            <div style="text-align: right; font-size: 0.75em; color: var(--text-secondary);">
                                                {{ formatPercent(getGoalTimePercent(goal)) }} elapsed
                                            </div>
                                        </div>
                                    </template>
                                </div>

                            </div>
                        </div>

                        <!-- Investor Cards -->
                        <div v-if="investorCards.length > 0" style="margin-bottom: 2rem;">
                            <h3 style="margin: 0 0 1rem 0; color: var(--primary-color); font-size: 1.1em; letter-spacing: 0.02em;">
                                👤 Investor{{ investorCards.length > 1 ? 's' : '' }}
                            </h3>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
                                <div v-for="inv in investorCards" :key="inv.name" style="background: var(--bg-primary, #fff); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--gray-medium, #ddd); box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                                    <h3 style="margin: 0 0 1rem 0; color: var(--primary-color);">👤 {{ inv.name }}</h3>
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                        <span style="color: var(--text-secondary);">Market Value</span>
                                        <strong style="font-size: 1.1em;">₹{{ formatNumber(inv.marketValue) }}</strong>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                        <span style="color: var(--text-secondary);">Invested Value</span>
                                        <span>₹{{ formatNumber(inv.investedValue) }}</span>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; padding-top: 0.5rem; border-top: 1px solid #eee;">
                                        <span style="color: var(--text-secondary);">Absolute Return</span>
                                        <strong :style="{ color: inv.marketValue >= inv.investedValue ? 'var(--state-success, #4CAF50)' : 'var(--state-danger, #ff5252)' }">
                                            {{ inv.marketValue >= inv.investedValue ? '+' : '' }}₹{{ formatNumber(inv.marketValue - inv.investedValue) }}
                                        </strong>
                                    </div>
                                </div>
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
                                        <th style="text-align: right;"># Funds</th>
                                        <th style="text-align: right;">Invested Value</th>
                                        <th style="text-align: right;">Market Value</th>
                                        <th style="text-align: right;">XIRR %</th>
                                        <th v-if="selectedReportArea !== 'overview' && summaryData.length > 1" style="text-align: right;">Target %</th>
                                        <th v-if="selectedReportArea === 'overview' || summaryData.length > 1" style="text-align: right;">Allocation %</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="row in summaryData" :key="row.name">
                                        <td><strong>{{ row.name || 'Unclassified' }}</strong></td>
                                        <td style="text-align: right;">{{ row.fundCount }}</td>
                                        <td style="text-align: right;">₹{{ formatNumber(row.investedValue) }}</td>
                                        <td style="text-align: right;">₹{{ formatNumber(row.value) }}</td>
                                        <td style="text-align: right; font-weight: 600; color: var(--text-primary);">{{ formatXirr(row.xirrInr) }}</td>
                                        <td v-if="selectedReportArea !== 'overview' && summaryData.length > 1" style="text-align: right; color: var(--text-secondary);">{{ getTargetPercent(row.name) !== null ? formatPercent(getTargetPercent(row.name)) : '—' }}</td>
                                        <td v-if="selectedReportArea === 'overview' || summaryData.length > 1" style="text-align: right;">{{ formatPercent(row.percent) }}</td>
                                    </tr>
                                    <tr class="total-row">
                                        <td><strong>Total Portfolio</strong></td>
                                        <td style="text-align: right;"><strong>{{ totalPortfolioFundCount }}</strong></td>
                                        <td style="text-align: right;"><strong>₹{{ formatNumber(totalPortfolioInvestedValue) }}</strong></td>
                                        <td style="text-align: right;"><strong>₹{{ formatNumber(totalPortfolioValue) }}</strong></td>
                                        <td style="text-align: right; font-weight: 600; color: var(--text-primary);"><strong>{{ formatXirr(totalPortfolioXirrInr) }}</strong></td>
                                        <td v-if="selectedReportArea !== 'overview' && summaryData.length > 1" style="text-align: right;"><strong>100.00%</strong></td>
                                        <td v-if="selectedReportArea === 'overview' || summaryData.length > 1" style="text-align: right;"><strong>100.00%</strong></td>
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
   
                    </div>

                    <!-- TAB 2: GOALS -->
                    <div v-show="activeTab === 'goals'">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                            <h3 style="margin: 0;">🎯 Financial Goals</h3>
                            <button type="button" @click="addNewGoal" style="padding: 0.5rem 1rem; background: var(--state-success, #4CAF50); border: none; border-radius: 4px; color: white; cursor: pointer; font-weight: bold;">+ Add Goal</button>
                        </div>
                        
                        <div v-if="goals.length === 0" style="padding: 2rem; text-align: center; background: white; border-radius: 8px; border: 1px dashed #ccc; color: #666;">
                            No goals defined yet. Create your first goal to track progress and assign asset allocation.
                        </div>

                        <div v-for="(goal, index) in goals" :key="goal.id" style="background: white; border: 1px solid #ddd; border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem;">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                                <div>
                                    <label style="display: block; font-size: 0.85em; font-weight: bold; margin-bottom: 0.25rem;">Goal Name</label>
                                    <input type="text" v-model="goal.name" class="fund-input" placeholder="e.g. Emergency Fund" @change="saveGoalsAndTags">
                                </div>
                                <div>
                                    <label style="display: block; font-size: 0.85em; font-weight: bold; margin-bottom: 0.25rem;">Target Date (Optional)</label>
                                    <input type="date" v-model="goal.targetDate" class="fund-input" @change="saveGoalsAndTags">
                                </div>
                                <div style="grid-column: span 2;">
                                    <label style="display: block; font-size: 0.85em; font-weight: bold; margin-bottom: 0.25rem;">Description</label>
                                    <input type="text" v-model="goal.description" class="fund-input" placeholder="What is this goal for?" @change="saveGoalsAndTags">
                                </div>
                            </div>
                            
                            <div style="margin-bottom: 1.5rem; padding: 1rem; background: #f9f9f9; border-radius: 6px;">
                                <h4 style="margin: 0 0 0.5rem 0; font-size: 1em;">Target Amount Setup</h4>
                                <div style="display: flex; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap;">
                                    <label style="cursor: pointer;"><input type="radio" v-model="goal.amountType" value="NONE" @change="saveGoalsAndTags"> No Set Target (Track Milestones)</label>
                                    <label style="cursor: pointer;"><input type="radio" v-model="goal.amountType" value="FLAT" @change="saveGoalsAndTags"> Flat Amount</label>
                                    <label style="cursor: pointer;"><input type="radio" v-model="goal.amountType" value="MONTHS" @change="saveGoalsAndTags"> Contextual (Months × Monthly Amount)</label>
                                </div>
                                
                                <div v-if="goal.amountType === 'FLAT'">
                                    <label style="display: block; font-size: 0.85em; font-weight: bold; margin-bottom: 0.25rem;">Target Amount (₹)</label>
                                    <input type="number" v-model.number="goal.targetAmountFlat" class="fund-input" placeholder="0" @change="saveGoalsAndTags">
                                </div>
                                <div v-if="goal.amountType === 'MONTHS'" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                    <div>
                                        <label style="display: block; font-size: 0.85em; font-weight: bold; margin-bottom: 0.25rem;">Number of Months</label>
                                        <input type="number" v-model.number="goal.months" class="fund-input" placeholder="e.g. 12" @change="saveGoalsAndTags">
                                    </div>
                                    <div>
                                        <label style="display: block; font-size: 0.85em; font-weight: bold; margin-bottom: 0.25rem;">Monthly Amount (₹)</label>
                                        <input type="number" v-model.number="goal.monthlyAmount" class="fund-input" placeholder="e.g. 40000" @change="saveGoalsAndTags">
                                    </div>
                                    <div style="grid-column: span 2; font-size: 0.9em; color: #15803d;">
                                        <strong>Computed Goal Target: </strong> ₹{{ formatNumber((goal.months || 0) * (goal.monthlyAmount || 0)) }}
                                    </div>
                                </div>
                            </div>
                            
                            <div style="margin-bottom: 1rem;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                                    <h4 style="margin: 0; font-size: 1em;">Target Asset Allocation (100% Total)</h4>
                                    <button type="button" @click="addAllocationRow(goal)" style="padding: 0.25rem 0.5rem; font-size: 0.8em; cursor: pointer;">+ Add Asset Class</button>
                                </div>
                                <div class="table-responsive">
                                    <table style="width: 100%; border-collapse: collapse; font-size: 0.9em;">
                                        <thead>
                                            <tr style="border-bottom: 1px solid #ddd;">
                                                <th style="text-align: left; padding: 0.5rem;">Asset Class</th>
                                                <th style="text-align: left; padding: 0.5rem;">Allocation Type</th>
                                                <th style="text-align: left; padding: 0.5rem;">Value</th>
                                                <th style="text-align: right; padding: 0.5rem;">Computed %</th>
                                                <th style="width: 40px;"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(alloc, aIdx) in goal.allocations" :key="aIdx" style="border-bottom: 1px solid #eee;">
                                                <td style="padding: 0.5rem;">
                                                    <input type="text" v-model="alloc.assetClass" class="fund-input" list="asset-class-options" @change="saveGoalsAndTags" style="padding: 0.25rem;">
                                                </td>
                                                <td style="padding: 0.5rem;">
                                                    <select v-model="alloc.type" class="fund-input" @change="saveGoalsAndTags" style="padding: 0.25rem;">
                                                        <option value="PERCENT">Percentage %</option>
                                                        <option value="MONTHS">Months</option>
                                                    </select>
                                                </td>
                                                <td style="padding: 0.5rem;">
                                                    <input type="number" v-model.number="alloc.value" class="fund-input" @change="saveGoalsAndTags" style="padding: 0.25rem;">
                                                </td>
                                                <td style="padding: 0.5rem; text-align: right; font-weight: bold;">
                                                    {{ formatPercent(computeAllocationPercent(goal, aIdx)) }}
                                                </td>
                                                <td style="padding: 0.5rem; text-align: center;">
                                                    <button type="button" @click="removeAllocationRow(goal, aIdx)" style="color: red; border: none; background: none; cursor: pointer; font-weight: bold; font-size: 1.2em;">&times;</button>
                                                </td>
                                            </tr>
                                            <tr v-if="!goal.allocations || goal.allocations.length === 0">
                                                <td colspan="5" style="padding: 1rem; text-align: center; color: #999; font-style: italic;">No asset class allocations defined</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div v-if="verifyTotalAllocation(goal) && goal.allocations.length > 0" style="color: var(--state-danger, #ff5252); font-size: 0.85em; margin-top: 0.5rem; text-align: right;">
                                    ⚠️ Warning: Total computed allocation is roughly {{ formatPercent(getTotalAllocationPercent(goal)) }} (should be 100%)
                                </div>
                            </div>
                            
                            <div style="text-align: right; border-top: 1px solid #ddd; padding-top: 1rem;">
                                <button type="button" @click="deleteGoal(index)" style="padding: 0.4rem 1rem; background: var(--state-danger, #ff5252); border: none; border-radius: 4px; color: white; cursor: pointer; font-size: 0.85em;">🗑️ Delete Goal</button>
                            </div>
                        </div>
                    </div>

                    <!-- TAB 3: TAGGING -->
                    <div v-show="activeTab === 'tagging'">
                        <div style="margin-bottom: 2rem;">
                            <!-- We inject the tagging table here, wrapped properly -->
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
                            <h4 style="margin: 0; color: var(--text-primary);">
                                🏷️ Tag Your Holdings
                            </h4>
                            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                                <button type="button" class="share-button" @click="downloadTransactionsCsv" style="padding: 0.4rem 0.8rem; font-size: 0.85em;">
                                    ⬇️ Download Transactions
                                </button>
                                <button type="button" class="share-button btn-clear-all" @click="clearPortfolio" style="padding: 0.4rem 0.8rem; font-size: 0.85em;">
                                    🗑️ Clear Portfolio
                                </button>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="asset-table">
                                <thead>
                                    <tr>
                                        <th style="width: 35%;">Fund Details</th>
                                        <th style="width: 13%; text-align: right;">Invested Value</th>
                                        <th style="width: 13%; text-align: right;">Market Value</th>
                                        <th style="width: 8%; text-align: right;">XIRR %</th>
                                        <th style="width: 15%;">Goal</th>
                                        <th style="width: 15%;">Asset Class</th>
                                        <th style="width: 6%; text-align: center;">Status</th>
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
                                            <template v-if="fund.source === 'IBKR'">
                                                <div style="font-weight: 600; color: var(--text-primary);">₹{{ formatNumber(fund.investedValue) }}</div>
                                                <div style="font-size: 0.8em; color: #0284c7;">&#36;{{ formatNumber(fund.investedValueUsd, 2) }}</div>
                                                <div style="font-size: 0.8em; color: var(--text-secondary);">{{ formatNumber(fund.closingUnits, 0) }} units</div>
                                            </template>
                                            <template v-else>
                                                <div style="font-weight: 600; color: var(--text-primary);">₹{{ fund.investedValue ? formatNumber(fund.investedValue) : '-' }}</div>
                                                <div style="font-size: 0.8em; color: var(--text-secondary);">{{ formatNumber(fund.closingUnits, 3) }} units</div>
                                            </template>
                                        </td>
                                        <td style="text-align: right; vertical-align: top;">
                                            <template v-if="fund.source === 'IBKR'">
                                                <div style="font-weight: 600; color: var(--text-primary);">₹{{ formatNumber(fund.marketValue) }}</div>
                                                <div style="font-size: 0.8em; color: #0284c7;">&#36;{{ formatNumber(fund.marketValueUsd, 2) }}</div>
                                                <div v-if="getFundNavInr(fund) !== null" style="font-size: 0.8em; color: var(--text-secondary);">₹{{ formatNumber(getFundNavInr(fund), 4) }}/unit</div>
                                                <div v-if="getFundNavUsd(fund) !== null" style="font-size: 0.8em; color: #0284c7;">&#36;{{ formatNumber(getFundNavUsd(fund), 4) }}/unit</div>
                                                <div v-if="fund.valuationDate" style="font-size: 0.72em; color: var(--text-secondary);">{{ formatNavDate(fund.valuationDate) }}</div>
                                            </template>
                                            <template v-else>
                                                <div style="font-weight: 600; color: var(--text-primary);">₹{{ formatNumber(fund.marketValue) }}</div>
                                                <div v-if="getFundNavInr(fund) !== null" style="font-size: 0.8em; color: var(--text-secondary);">₹{{ formatNumber(getFundNavInr(fund), 4) }}/unit</div>
                                                <div v-if="fund.valuationDate" style="font-size: 0.72em; color: var(--text-secondary);">{{ formatNavDate(fund.valuationDate) }}</div>
                                            </template>
                                        </td>
                                        <td style="text-align: right; vertical-align: top;">
                                            <template v-if="fund.source === 'IBKR'">
                                                <div style="font-weight: 600; color: var(--text-primary);">{{ formatXirr(tags[fund.id].xirrInr) }}</div>
                                                <div style="font-size: 0.8em; color: #0284c7;">{{ formatXirr(tags[fund.id].xirrUsd) }}</div>
                                                <div v-if="tags[fund.id].xirrNote" style="font-size: 0.72em; color: #b45309; line-height: 1.3; margin-top: 0.2rem;">{{ tags[fund.id].xirrNote }}</div>
                                            </template>
                                            <template v-else>
                                                <div style="font-weight: 600; color: var(--text-primary);">{{ formatXirr(tags[fund.id].xirrInr || tags[fund.id].xirr) }}</div>
                                                <div v-if="tags[fund.id].xirrNote" style="font-size: 0.72em; color: #b45309; line-height: 1.3; margin-top: 0.2rem; text-align: left;">{{ tags[fund.id].xirrNote }}</div>
                                            </template>
                                        </td>
                                        <td style="vertical-align: top;">
                                            <select
                                                v-model="tags[fund.id].goalId"
                                                class="fund-input"
                                                @change="saveTagsAndCalculate"
                                            >
                                                <option value="">— Unassigned —</option>
                                                <option v-for="g in goals" :key="g.id" :value="g.id">{{ g.name }}</option>
                                            </select>
                                        </td>
                                        <td style="vertical-align: top;">
                                            <select
                                                v-model="tags[fund.id].assetClass"
                                                class="fund-input"
                                                @change="saveTagsAndCalculate"
                                            >
                                                <option value="">— Unclassified —</option>
                                                <option v-for="ac in getAssetClassesForGoal(tags[fund.id].goalId)" :key="ac" :value="ac">{{ ac }}</option>
                                            </select>
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

                    
                        </div>
                    </div>

                    <!-- TAB 4: DATA -->
                    <div v-show="activeTab === 'data'">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                            <h3 style="margin: 0;">🗂️ Portfolio Raw Data</h3>
                            <button type="button" class="share-button btn-clear-all" @click="clearPortfolio" style="padding: 0.4rem 0.8rem; font-size: 0.85em;">
                                🗑️ Clear All Data
                            </button>
                        </div>
                        
                        <div v-if="dataHierarchyCAS.length > 0" style="margin-bottom: 2rem;">
                            <h4 style="border-bottom: 2px solid var(--gray-medium, #ddd); padding-bottom: 0.5rem; margin-bottom: 1rem; color: var(--primary-color);">🇮🇳 India Mutual Funds (CAS)</h4>
                            
                            <div v-for="house in dataHierarchyCAS" :key="house.name" style="margin-bottom: 1rem; border: 1px solid var(--gray-medium, #e0e0e0); border-radius: 6px; overflow: hidden; background: white;">
                                <div style="background: #f5f5f5; padding: 0.75rem 1rem; font-weight: bold; font-size: 1.05em; display: flex; justify-content: space-between; flex-wrap: wrap;">
                                    <span>🏦 {{ house.name }}</span>
                                    <span>₹{{ formatNumber(house.marketValue) }}</span>
                                </div>
                                <div v-for="folio in house.folios" :key="folio.folioNo" style="border-top: 1px solid #eee; padding: 0;">
                                    <div style="padding: 0.5rem 1rem; background: #fafafa; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                                        <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
                                            <span style="font-weight: 500;">Folio: {{ folio.folioNo }}</span>
                                            <div style="display: flex; align-items: center; gap: 0.25rem;">
                                                <span style="font-size: 0.85em; color: #666;">Investor:</span>
                                                <input type="text" v-model="folioMappings[folio.folioNo]" @change="saveGoalsAndTags" placeholder="Assign Name" style="padding: 0.2rem 0.4rem; font-size: 0.85em; border: 1px solid #ccc; border-radius: 3px; max-width: 150px;">
                                            </div>
                                        </div>
                                        <span style="font-size: 0.9em; font-weight: bold;">₹{{ formatNumber(folio.marketValue) }}</span>
                                    </div>
                                    <div v-for="fund in folio.funds" :key="fund.id" style="padding: 0.5rem 1rem 0.5rem 2rem; border-top: 1px dotted #eee; overflow-x: auto;">
                                        <div style="display: flex; justify-content: space-between; cursor: pointer; align-items: flex-start; min-width: 300px;" @click="toggleDataRowExpand(fund.id)">
                                            <div>
                                                <div>{{ expandedDataRows[fund.id] ? '▼' : '▶' }} <strong>{{ fund.fundName }}</strong></div>
                                                <div style="font-size: 0.8em; color: #666; margin-left: 1.2rem; margin-top: 0.2rem;">
                                                    <span>{{ formatNumber(fund.closingUnits, 3) }} units</span>
                                                    <span style="margin: 0 0.4rem;">·</span>
                                                    <span>NAV ₹{{ formatNumber(getFundNavInr(fund), 4) }}</span>
                                                    <span v-if="fund.valuationDate" style="margin: 0 0.4rem;">·</span>
                                                    <span v-if="fund.valuationDate" style="color: #999;">as of {{ formatNavDate(fund.valuationDate) }}</span>
                                                </div>
                                            </div>
                                            <div style="text-align: right;">
                                                <div style="font-weight: bold;">₹{{ formatNumber(fund.marketValue) }}</div>
                                                <div style="font-size: 0.8em; color: #666;">Inv: ₹{{ formatNumber(fund.investedValue) }}</div>
                                            </div>
                                        </div>
                                        
                                        <div v-if="expandedDataRows[fund.id]" style="margin-top: 0.5rem; margin-left: 1.2rem; background: #fdfdfd; border-radius: 4px; padding: 0.5rem; font-size: 0.85em;">
                                            <table style="width: 100%; border-collapse: collapse; min-width: 300px;">
                                                <tr style="border-bottom: 1px solid #ddd;">
                                                    <th style="text-align: left; padding: 2px;">Date</th>
                                                    <th style="text-align: right; padding: 2px;">Units</th>
                                                    <th style="text-align: right; padding: 2px;">NAV (₹)</th>
                                                    <th style="text-align: right; padding: 2px;">Value (₹)</th>
                                                </tr>
                                                <tr v-for="(cf, idx) in fund.transactionCashflowsInr" :key="cf.date">
                                                    <td style="padding: 2px;">{{ formatNavDate(cf.date) }}</td>
                                                    <td style="text-align: right; padding: 2px;" :style="{ color: cf.amount > 0 ? '#c0392b' : '#27ae60' }">
                                                        <template v-if="fund.transactionUnitFlows && fund.transactionUnitFlows[idx]">
                                                            {{ cf.amount > 0 ? '-' : '+' }}{{ formatNumber(Math.abs(fund.transactionUnitFlows[idx].amount), 3) }}
                                                        </template>
                                                        <template v-else>—</template>
                                                    </td>
                                                    <td style="text-align: right; padding: 2px; color: #666;">
                                                        <template v-if="fund.transactionUnitFlows && fund.transactionUnitFlows[idx] && fund.transactionUnitFlows[idx].amount !== 0">
                                                            ₹{{ formatNumber(Math.abs(cf.amount) / Math.abs(fund.transactionUnitFlows[idx].amount), 4) }}
                                                        </template>
                                                        <template v-else>—</template>
                                                    </td>
                                                    <td style="text-align: right; padding: 2px;" :style="{ color: cf.amount > 0 ? '#c0392b' : '#27ae60' }">{{ cf.amount > 0 ? '-' : '+' }}₹{{ formatNumber(Math.abs(cf.amount)) }}</td>
                                                </tr>
                                                <tr v-if="!fund.transactionCashflowsInr || fund.transactionCashflowsInr.length === 0">
                                                    <td colspan="4" style="text-align: center; color: #999; padding: 5px;">No transactions</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="dataHierarchyIBKR.length > 0" style="margin-bottom: 2rem;">
                            <h4 style="border-bottom: 2px solid var(--gray-medium, #ddd); padding-bottom: 0.5rem; margin-bottom: 1rem; color: var(--primary-color);">🌎 International Stocks (IBKR)</h4>
                            
                            <div v-for="account in dataHierarchyIBKR" :key="account.accountNo" style="margin-bottom: 1rem; border: 1px solid var(--gray-medium, #e0e0e0); border-radius: 6px; overflow: hidden; background: white;">
                                <div style="background: #f5f5f5; padding: 0.75rem 1rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                                    <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
                                        <span style="font-weight: bold; font-size: 1.05em;">📂 Account: {{ account.accountNo }}</span>
                                        <div style="display: flex; align-items: center; gap: 0.25rem;">
                                            <span style="font-size: 0.85em; color: #666;">Investor:</span>
                                            <input type="text" v-model="folioMappings[account.accountNo]" @change="saveGoalsAndTags" placeholder="Assign Name" style="padding: 0.2rem 0.4rem; font-size: 0.85em; border: 1px solid #ccc; border-radius: 3px; max-width: 150px;">
                                        </div>
                                    </div>
                                    <span style="font-weight: bold;">₹{{ formatNumber(account.marketValue) }} / &#36;{{ formatNumber(account.marketValueUsd) }}</span>
                                </div>
                                <div v-for="fund in account.funds" :key="fund.id" style="padding: 0.5rem 1rem; border-top: 1px solid #eee; overflow-x: auto;">
                                    <div style="display: flex; justify-content: space-between; cursor: pointer; align-items: flex-start; min-width: 300px;" @click="toggleDataRowExpand(fund.id)">
                                        <div>
                                            <div>{{ expandedDataRows[fund.id] ? '▼' : '▶' }} <strong>{{ fund.fundName }}</strong></div>
                                            <div style="font-size: 0.8em; color: #666; margin-left: 1.2rem; margin-top: 0.2rem;">
                                                <span>{{ formatNumber(fund.closingUnits, 0) }} shares</span>
                                                <span style="margin: 0 0.4rem;">·</span>
                                                <span>&#36;{{ formatNumber(getFundNavUsd(fund), 4) }} / share</span>
                                                <span v-if="fund.navUsd && fund.nav" style="margin: 0 0.4rem;">·</span>
                                                <span v-if="fund.navUsd && fund.nav" style="color: #0284c7;">SBI Ref Rate ₹{{ formatNumber(fund.nav / fund.navUsd, 2) }}/&#36;</span>
                                                <span v-if="fund.valuationDate" style="margin: 0 0.4rem;">·</span>
                                                <span v-if="fund.valuationDate" style="color: #999;">as of {{ formatNavDate(fund.valuationDate) }}</span>
                                            </div>
                                        </div>
                                        <div style="text-align: right;">
                                            <div style="font-weight: bold;">₹{{ formatNumber(fund.marketValue) }}</div>
                                            <div style="font-size: 0.8em; color: #0284c7;">&#36;{{ formatNumber(fund.marketValueUsd, 2) }}</div>
                                        </div>
                                    </div>
                                    <div v-if="expandedDataRows[fund.id]" style="margin-top: 0.5rem; margin-left: 1.2rem; background: #fdfdfd; border-radius: 4px; padding: 0.5rem; font-size: 0.85em;">
                                        <table style="width: 100%; border-collapse: collapse; min-width: 500px;">
                                            <tr style="border-bottom: 1px solid #ddd;">
                                                <th style="text-align: left; padding: 2px;">Date</th>
                                                <th style="text-align: right; padding: 2px;">Units</th>
                                                <th style="text-align: right; padding: 2px;">NAV ($)</th>
                                                <th style="text-align: right; padding: 2px;">Value ($)</th>
                                                <th style="text-align: right; padding: 2px; color: #0284c7;">Rate (&#8377;/$)</th>
                                                <th style="text-align: right; padding: 2px;">NAV (&#8377;)</th>
                                                <th style="text-align: right; padding: 2px;">Value (&#8377;)</th>
                                            </tr>
                                            <tr v-for="(cfUsd, idx) in normalizeDatedFlows(fund.transactionCashflowsUsd)" :key="cfUsd.date">
                                                <td style="padding: 2px;">{{ formatNavDate(cfUsd.date) }}</td>
                                                <!-- Units -->
                                                <td style="text-align: right; padding: 2px;" :style="{ color: cfUsd.amount > 0 ? '#c0392b' : '#27ae60' }">
                                                    <template v-if="fund.transactionUnitFlows && fund.transactionUnitFlows[idx]">
                                                        {{ cfUsd.amount > 0 ? '-' : '+' }}{{ formatNumber(Math.abs(fund.transactionUnitFlows[idx].amount), 4) }}
                                                    </template>
                                                    <template v-else>&#8212;</template>
                                                </td>
                                                <!-- NAV ($) = Value($) / Units -->
                                                <td style="text-align: right; padding: 2px;">
                                                    <template v-if="fund.transactionUnitFlows && fund.transactionUnitFlows[idx] && fund.transactionUnitFlows[idx].amount !== 0">
                                                        &#36;{{ formatNumber(Math.abs(cfUsd.amount) / Math.abs(fund.transactionUnitFlows[idx].amount), 4) }}
                                                    </template>
                                                    <template v-else>&#8212;</template>
                                                </td>
                                                <!-- Value ($) -->
                                                <td style="text-align: right; padding: 2px;" :style="{ color: cfUsd.amount > 0 ? '#c0392b' : '#27ae60' }">{{ cfUsd.amount > 0 ? '-' : '+' }}&#36;{{ formatNumber(Math.abs(cfUsd.amount), 2) }}</td>
                                                <template v-if="normalizeDatedFlows(fund.transactionCashflowsInr)[idx]">
                                                    <!-- Rate (₹/$) = INR / USD -->
                                                    <td style="text-align: right; padding: 2px; color: #0284c7;">
                                                        {{ cfUsd.amount !== 0 ? '&#8377;' + formatNumber(Math.abs(normalizeDatedFlows(fund.transactionCashflowsInr)[idx].amount) / Math.abs(cfUsd.amount), 2) : '&#8212;' }}
                                                    </td>
                                                    <!-- NAV (₹) = INR / Units -->
                                                    <td style="text-align: right; padding: 2px;">
                                                        <template v-if="fund.transactionUnitFlows && fund.transactionUnitFlows[idx] && fund.transactionUnitFlows[idx].amount !== 0">
                                                            &#8377;{{ formatNumber(Math.abs(normalizeDatedFlows(fund.transactionCashflowsInr)[idx].amount) / Math.abs(fund.transactionUnitFlows[idx].amount), 4) }}
                                                        </template>
                                                        <template v-else>&#8212;</template>
                                                    </td>
                                                    <!-- Value (₹) -->
                                                    <td style="text-align: right; padding: 2px;" :style="{ color: normalizeDatedFlows(fund.transactionCashflowsInr)[idx].amount > 0 ? '#c0392b' : '#27ae60' }">
                                                        {{ normalizeDatedFlows(fund.transactionCashflowsInr)[idx].amount > 0 ? '-' : '+' }}&#8377;{{ formatNumber(Math.abs(normalizeDatedFlows(fund.transactionCashflowsInr)[idx].amount)) }}
                                                    </td>
                                                </template>
                                                <td style="text-align: right; padding: 2px;" v-else colspan="3">&#8212;</td>
                                            </tr>
                                            <tr v-if="!fund.transactionCashflowsUsd || fund.transactionCashflowsUsd.length === 0">
                                                <td colspan="7" style="text-align: center; color: #999; padding: 5px;">No transactions</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
</div>\n            </div>\n        </div>
    `;

    const app = Vue.createApp({
        data() {
            // Load from localStorage
            let storedTags = {};
            let storedFunds = [];
            let storedUsdRate = null;
            let storedGoals = [];
            let storedFolioMappings = {};
            try {
                const rawTags = localStorage.getItem('realvalue-portfolio-tags');
                if (rawTags) storedTags = JSON.parse(rawTags);
                
                const rawFunds = localStorage.getItem('realvalue-portfolio-funds');
                if (rawFunds) {
                    storedFunds = JSON.parse(rawFunds);
                    storedFunds = storedFunds.map(f => {
                        if (!f.id) f.id = f.folioNo + '_' + f.isin;
                        if (!Array.isArray(f.transactionCashflowsInr)) f.transactionCashflowsInr = [];
                        if (!Array.isArray(f.transactionCashflowsUsd)) f.transactionCashflowsUsd = [];
                        if (!Array.isArray(f.transactionUnitFlows)) f.transactionUnitFlows = [];
                        if (!f.valuationDate) f.valuationDate = new Date().toISOString().slice(0, 10);
                        if (f.investedValue === undefined) f.investedValue = 0;
                        if (f.nav === undefined) f.nav = null;
                        if (f.navUsd === undefined) f.navUsd = null;
                        if (!storedTags[f.id]) {
                            storedTags[f.id] = storedTags[f.isin] ? { ...storedTags[f.isin] } : { category: '', assetClass: '', status: '', xirr: '', xirrInr: '', xirrUsd: '', xirrNote: '' };
                        }
                        if (storedTags[f.id] && storedTags[f.id].xirr === undefined) storedTags[f.id].xirr = '';
                        if (storedTags[f.id] && storedTags[f.id].xirrInr === undefined) storedTags[f.id].xirrInr = '';
                        if (storedTags[f.id] && storedTags[f.id].xirrUsd === undefined) storedTags[f.id].xirrUsd = '';
                        if (storedTags[f.id] && storedTags[f.id].xirrNote === undefined) storedTags[f.id].xirrNote = '';
                        return f;
                    });
                }

                const rawGoals = localStorage.getItem('realvalue-portfolio-goals');
                if (rawGoals) storedGoals = JSON.parse(rawGoals);

                const rawFolioMappings = localStorage.getItem('realvalue-portfolio-foliomappings');
                if (rawFolioMappings) storedFolioMappings = JSON.parse(rawFolioMappings);

                // Migration: convert tag.category to goalId
                let needsMigration = false;
                for (const key of Object.keys(storedTags)) {
                    if (storedTags[key] && storedTags[key].category) {
                        const cat = storedTags[key].category.trim();
                        if (cat === '') { delete storedTags[key].category; continue; }
                        let goalOpt = storedGoals.find(g => g.name === cat);
                        if (!goalOpt) {
                            goalOpt = { id: 'goal_' + Date.now() + Math.random().toString(36).substr(2, 5), name: cat, description: '', amountType: 'NONE', targetDate: '', allocations: [] };
                            storedGoals.push(goalOpt);
                            needsMigration = true;
                        }
                        storedTags[key].goalId = goalOpt.id;
                        delete storedTags[key].category;
                        needsMigration = true;
                    }
                }
                if (needsMigration) {
                    localStorage.setItem('realvalue-portfolio-goals', JSON.stringify(storedGoals));
                    localStorage.setItem('realvalue-portfolio-tags', JSON.stringify(storedTags));
                }

                const rawUsdRate = localStorage.getItem('realvalue-portfolio-usd-rate');
                if (rawUsdRate) storedUsdRate = JSON.parse(rawUsdRate);
            } catch (e) {
                console.warn("Failed to read from localStorage", e);
            }

            return {
                activeTab: 'overview',
                uploadInvestorName: '',
                goals: storedGoals,
                folioMappings: storedFolioMappings,
                investorCards: [],
                goalCurrentValues: {},
                dataHierarchyCAS: [],
                dataHierarchyIBKR: [],
                expandedDataRows: {},
                isParsing: false,
                parseError: null,
                showParserDisclaimer: false,
                pdfPassword: '',
                isIbkrParsing: false,
                ibkrError: null,
                usdToInr: storedUsdRate ? storedUsdRate.rate : null,
                usdRateDate: storedUsdRate ? storedUsdRate.date : null,
                funds: storedFunds,
                tags: storedTags,
                
                uniqueCategories: [],
                uniqueAssetClasses: [],
                autocompleteCategories: [],
                autocompleteAssetClasses: [],
                
                defaultCategories: ['1 Portfolio', 'Emergency', 'Travel', 'Retirement', 'Kids Education'],
                defaultAssetClasses: [
                        'Equity Large Cap', 'Equity Mid Cap', 'Equity Small Cap', 'Equity Flexi Cap', 'Equity ELSS',
                        'Hybrid Aggressive', 'Hybrid Conservative', 'Hybrid Arbitrage',
                        'Debt Liquid', 'Debt Ultra Short', 'Debt Short Duration', 'Debt Medium Duration', 'Debt Long Duration',
                        'Gold ETF', 'Gold Fund of Fund', 'International Equity',
                    ],
                
                summaryData: [],
                totalPortfolioValue: 0,
                totalPortfolioInvestedValue: 0,
                totalPortfolioFundCount: 0,
                totalPortfolioXirrInr: null,
                totalPortfolioXirrUsd: null,
                
                portfolioViewTab: 'chart',
                selectedReportArea: 'overview',
                chart: null,
                resizeHandler: null,
                debounceTimer: null,
                showPrivacyDetails: false,
                promptCopied: false,
            };
        },
    
        mounted() {
            this.extractUniqueOptions();
            this.calculateSummary();
            this.warmSbiRateCache();
            this.resizeHandler = () => {
                if (this.chart) this.chart.resize();
            };
            window.addEventListener('resize', this.resizeHandler);
        },
        unmounted() {
            if (this.resizeHandler) {
                window.removeEventListener('resize', this.resizeHandler);
            }
            if (this.chart) this.chart.dispose();
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
            saveMappings() {
                try {
                    localStorage.setItem('realvalue-portfolio-foliomappings', JSON.stringify(this.folioMappings));
                } catch(e) {}
                this.calculateSummary();
            },
            saveGoalsAndTags() {
                try {
                    localStorage.setItem('realvalue-portfolio-goals', JSON.stringify(this.goals));
                    localStorage.setItem('realvalue-portfolio-foliomappings', JSON.stringify(this.folioMappings));
                } catch(e) {}
                this.saveTagsAndCalculate();
            },
            addNewGoal() {
                this.goals.push({
                    id: 'goal_' + Date.now() + Math.random().toString(36).substr(2, 5),
                    name: 'New Goal',
                    description: '',
                    amountType: 'NONE',
                    targetAmountFlat: 0,
                    months: 0,
                    monthlyAmount: 0,
                    targetDate: '',
                    allocations: []
                });
                this.saveGoalsAndTags();
            },
            deleteGoal(index) {
                if(confirm("Are you sure you want to delete this goal?")) {
                    this.goals.splice(index, 1);
                    this.saveGoalsAndTags();
                }
            },
            addAllocationRow(goal) {
                if (!goal.allocations) goal.allocations = [];
                goal.allocations.push({ assetClass: '', type: 'PERCENT', value: 0 });
                this.saveGoalsAndTags();
            },
            removeAllocationRow(goal, index) {
                goal.allocations.splice(index, 1);
                this.saveGoalsAndTags();
            },
            getGoalTargetAmount(goal) {
                if (goal.amountType === 'FLAT') return Number(goal.targetAmountFlat) || 0;
                if (goal.amountType === 'MONTHS') return (Number(goal.months) || 0) * (Number(goal.monthlyAmount) || 0);
                return 0;
            },
            getAssetClassesForGoal(goalId) {
                if (!goalId) return this.defaultAssetClasses;
                const goal = this.goals.find(g => g.id === goalId);
                if (!goal || !goal.allocations || goal.allocations.length === 0) return this.defaultAssetClasses;
                const classes = goal.allocations.map(a => a.assetClass).filter(ac => ac && ac.trim() !== '');
                return classes.length > 0 ? classes : this.defaultAssetClasses;
            },
            getGoalEarliestDate(goal) {
                // Find earliest transaction date across all funds tagged to this goal
                let earliest = null;
                this.funds.forEach(f => {
                    const tag = this.tags[f.id] || {};
                    if (tag.goalId !== goal.id) return;
                    const flows = f.transactionCashflowsInr || [];
                    flows.forEach(cf => {
                        if (cf.date && (!earliest || cf.date < earliest)) earliest = cf.date;
                    });
                });
                return earliest;
            },
            getGoalTimePercent(goal) {
                if (!goal.targetDate) return 0;
                const startStr = this.getGoalEarliestDate(goal);
                if (!startStr) return 0;
                const start = new Date(startStr).getTime();
                const end = new Date(goal.targetDate).getTime();
                const now = Date.now();
                if (end <= start) return 100;
                return Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100));
            },
            getTargetPercent(rowName) {
                // Overview mode: rowName is a goal name
                if (this.selectedReportArea === 'overview') {
                    const goal = this.goals.find(g => g.name === rowName);
                    if (!goal || !goal.allocations || goal.allocations.length === 0) return null;
                    // Sum all allocation percentages for this goal
                    const total = goal.allocations.reduce((sum, _, idx) => sum + this.computeAllocationPercent(goal, idx), 0);
                    return total > 0 ? total : null;
                }
                // Drill-down mode: selectedReportArea is a goal name, rowName is an asset class
                const goal = this.goals.find(g => g.name === this.selectedReportArea);
                if (!goal || !goal.allocations) return null;
                const alloc = goal.allocations.find(a => a.assetClass === rowName);
                if (!alloc) return null;
                const idx = goal.allocations.indexOf(alloc);
                return this.computeAllocationPercent(goal, idx);
            },
            computeAllocationPercent(goal, allocIndex) {
                if (!goal || !goal.allocations || !goal.allocations[allocIndex]) return 0;
                const alloc = goal.allocations[allocIndex];
                if (alloc.type === 'PERCENT') return Number(alloc.value) || 0;
                
                let totalMonths = 0;
                goal.allocations.forEach(a => { if (a.type === 'MONTHS') totalMonths += Number(a.value) || 0; });
                
                if (alloc.type === 'MONTHS') {
                    if (goal.amountType === 'MONTHS' && goal.months > 0) {
                        return ((Number(alloc.value) || 0) / goal.months) * 100;
                    }
                    if (totalMonths > 0) {
                        return ((Number(alloc.value) || 0) / totalMonths) * 100;
                    }
                }
                return 0;
            },
            getTotalAllocationPercent(goal) {
                if (!goal || !goal.allocations) return 0;
                return goal.allocations.reduce((sum, _, idx) => sum + this.computeAllocationPercent(goal, idx), 0);
            },
            verifyTotalAllocation(goal) {
                const total = this.getTotalAllocationPercent(goal);
                return Math.abs(total - 100) > 0.01;
            },
            calculateNextMilestone(currentValue, currency) {
                currentValue = Number(currentValue) || 0;
                if (currency === 'USD') {
                    if (currentValue < 1000) return 1000;
                    if (currentValue < 10000) return Math.ceil((currentValue + 1) / 1000) * 1000;
                    if (currentValue < 100000) return Math.ceil((currentValue + 1) / 10000) * 10000;
                    if (currentValue < 1000000) return Math.ceil((currentValue + 1) / 100000) * 100000;
                    return Math.ceil((currentValue + 1) / 1000000) * 1000000;
                } else {
                    // INR
                    if (currentValue < 10000) return 10000;
                    if (currentValue < 100000) return Math.ceil((currentValue + 1) / 10000) * 10000;
                    if (currentValue < 1000000) return Math.ceil((currentValue + 1) / 100000) * 100000;
                    if (currentValue < 10000000) return Math.ceil((currentValue + 1) / 1000000) * 1000000;
                    return Math.ceil((currentValue + 1) / 10000000) * 10000000;
                }
            },
            toggleDataRowExpand(id) {
                this.expandedDataRows[id] = !this.expandedDataRows[id];
            },
            buildHierarchies() {
                const casMap = {}; // house -> folio -> funds
                const ibkrMap = {}; // account -> funds
                
                this.funds.forEach(f => {
                    if (f.source === 'IBKR') {
                        if (!ibkrMap[f.folioNo]) ibkrMap[f.folioNo] = { marketValue: 0, marketValueUsd: 0, funds: [] };
                        ibkrMap[f.folioNo].funds.push(f);
                        ibkrMap[f.folioNo].marketValue += Number(f.marketValue) || 0;
                        ibkrMap[f.folioNo].marketValueUsd += Number(f.marketValueUsd) || 0;
                    } else {
                        if (!casMap[f.fundHouse]) casMap[f.fundHouse] = { marketValue: 0, folios: {} };
                        if (!casMap[f.fundHouse].folios[f.folioNo]) casMap[f.fundHouse].folios[f.folioNo] = { marketValue: 0, funds: [] };
                        casMap[f.fundHouse].folios[f.folioNo].funds.push(f);
                        casMap[f.fundHouse].folios[f.folioNo].marketValue += Number(f.marketValue) || 0;
                        casMap[f.fundHouse].marketValue += Number(f.marketValue) || 0;
                    }
                });
                
                this.dataHierarchyCAS = Object.keys(casMap).sort().map(h => {
                    return {
                        name: h,
                        marketValue: casMap[h].marketValue,
                        folios: Object.keys(casMap[h].folios).sort().map(folioNo => ({
                            folioNo,
                            marketValue: casMap[h].folios[folioNo].marketValue,
                            funds: casMap[h].folios[folioNo].funds.sort((a,b) => b.marketValue - a.marketValue)
                        }))
                    };
                });
                
                this.dataHierarchyIBKR = Object.keys(ibkrMap).sort().map(acc => ({
                    accountNo: acc,
                    marketValue: ibkrMap[acc].marketValue,
                    marketValueUsd: ibkrMap[acc].marketValueUsd,
                    funds: ibkrMap[acc].funds.sort((a,b) => b.marketValue - a.marketValue)
                }));
            },
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
            formatXirr(value) {
                if (value === null || value === undefined || value === '') return '-';
                const num = Number(value);
                if (!isFinite(num) || isNaN(num)) return '-';
                return num.toFixed(2) + '%';
            },
            formatNavDate(dateStr) {
                if (!dateStr) return '-';
                const dt = new Date(dateStr + 'T00:00:00');
                if (isNaN(dt.getTime())) return dateStr;
                return dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
            },
            getFundNavInr(fund) {
                if (!fund) return null;
                const explicitNav = Number(fund.nav);
                if (isFinite(explicitNav) && explicitNav > 0) return explicitNav;

                const units = Number(fund.closingUnits);
                const marketValue = Number(fund.marketValue);
                if (!isFinite(units) || units <= 0 || !isFinite(marketValue) || marketValue <= 0) return null;
                return marketValue / units;
            },
            getFundNavUsd(fund) {
                if (!fund) return null;
                const explicitNavUsd = Number(fund.navUsd);
                if (isFinite(explicitNavUsd) && explicitNavUsd > 0) return explicitNavUsd;

                const units = Number(fund.closingUnits);
                const marketValueUsd = Number(fund.marketValueUsd);
                if (!isFinite(units) || units <= 0 || !isFinite(marketValueUsd) || marketValueUsd <= 0) return null;
                return marketValueUsd / units;
            },
            // IBKR CSV parsing
            parseIbkrCsvLine(line) {
                const result = [];
                let current = '';
                let inQuotes = false;
                for (let i = 0; i < line.length; i++) {
                    const ch = line[i];
                    if (ch === '"') {
                        if (inQuotes && line[i + 1] === '"') {
                            current += '"';
                            i++;
                        } else {
                            inQuotes = !inQuotes;
                        }
                    } else if (ch === ',' && !inQuotes) {
                        result.push(current.trim());
                        current = '';
                    } else {
                        current += ch;
                    }
                }
                result.push(current.trim());
                return result;
            },
            parseMonthDateYear(str) {
                // "March 27, 2026" -> "2026-03-27"
                const months = { January:1,February:2,March:3,April:4,May:5,June:6,July:7,August:8,September:9,October:10,November:11,December:12 };
                const m = str.trim().match(/(\w+)\s+(\d+),\s*(\d{4})/);
                if (!m) return new Date().toISOString().slice(0, 10);
                const month = String(months[m[1]] || 1).padStart(2, '0');
                const day = m[2].padStart(2, '0');
                return `${m[3]}-${month}-${day}`;
            },
            parseIbkrDateTime(str) {
                // "2026-03-24, 06:25:10" -> "2026-03-24"
                if (!str) return null;
                const m = str.match(/(\d{4}-\d{2}-\d{2})/);
                return m ? m[1] : null;
            },
            parseCasDate(str) {
                if (!str) return null;
                const months = { jan:1, feb:2, mar:3, apr:4, may:5, jun:6, jul:7, aug:8, sep:9, oct:10, nov:11, dec:12 };
                const m = str.trim().match(/(\d{2})-([A-Za-z]{3})-(\d{4})/);
                if (!m) return null;
                const month = months[m[2].toLowerCase()];
                if (!month) return null;
                return `${m[3]}-${String(month).padStart(2, '0')}-${m[1]}`;
            },
            extractPdfPageText(textContent) {
                // Y/X coordinate stitching (pdf1.html approach)
                const rowThreshold = 5;
                const items = [...(textContent.items || [])]
                    .filter(item => item && item.str)
                    .sort((a, b) => {
                        const ay = a.transform ? a.transform[5] : 0;
                        const by = b.transform ? b.transform[5] : 0;
                        if (Math.abs(ay - by) > rowThreshold) {
                            return by - ay; // top to bottom
                        }
                        const ax = a.transform ? a.transform[4] : 0;
                        const bx = b.transform ? b.transform[4] : 0;
                        return ax - bx; // left to right
                    });

                let currentY = null;
                let line = [];
                const lines = [];
                for (const item of items) {
                    if (currentY === null || Math.abs(item.transform[5] - currentY) > rowThreshold) {
                        if (line.length > 0) lines.push(line.join(' '));
                        line = [item.str];
                        currentY = item.transform[5];
                    } else {
                        line.push(item.str);
                    }
                }
                if (line.length > 0) lines.push(line.join(' '));
                return lines.join('\n');
            },
            extractCasReportDate(rawText) {
                const patterns = [
                    /(?:as on|statement\s+for\s+the\s+period\s+ending|portfolio\s+valuation\s+as\s+on)\s*:?\s*(\d{2}-[A-Za-z]{3}-\d{4})/i,
                    /(?:from|period)\s*:?\s*\d{2}-[A-Za-z]{3}-\d{4}\s*(?:to|-)\s*(\d{2}-[A-Za-z]{3}-\d{4})/i
                ];

                for (const pattern of patterns) {
                    const match = rawText.match(pattern);
                    if (match) {
                        const parsed = this.parseCasDate(match[1]);
                        if (parsed) return parsed;
                    }
                }

                const allDates = rawText.match(/\b\d{2}-[A-Za-z]{3}-\d{4}\b/g) || [];
                const parsedDates = allDates.map(d => this.parseCasDate(d)).filter(Boolean).sort();
                return parsedDates.length ? parsedDates[parsedDates.length - 1] : new Date().toISOString().slice(0, 10);
            },
            extractCasTransactions(blockText) {
                const rawTransactions = [];
                const lines = String(blockText || '')
                    .split('\n')
                    .map(line => line.trim())
                    .filter(Boolean);

                for (const line of lines) {
                    // Ignore summary lines; only parse transaction-like lines with dates.
                    if (/Opening Unit Balance|Closing Unit Balance|Total Cost Value|Market Value|NAV on/i.test(line)) {
                        continue;
                    }

                    const dateMatch = line.match(/\b(\d{2}-[A-Za-z]{3}-\d{4})\b/);
                    if (!dateMatch) continue;
                    const date = dateMatch[1];

                    const numRegex = /(?:\s|^)(\(?(?:\d+,)*\d+\.\d{2,4}\)?)(?=\s|$)/g;
                    const nums = [];
                    let match;
                    while ((match = numRegex.exec(line)) !== null) {
                        nums.push(match[1]);
                    }

                    let description = line.replace(date, '');
                    nums.forEach(n => {
                        description = description.replace(n, '');
                    });
                    description = description.replace(/\s{2,}/g, ' ').trim();

                    if (/closing unit|market value/i.test(description)) continue;

                    // Full transaction: Amount, NAV, Units, Balance
                    if (nums.length >= 4) {
                        const amount = this.parseNumericStr(nums[0]);
                        const balance = this.parseNumericStr(nums[3]);

                        let nav;
                        let units;
                        const dec1 = ((nums[1].split('.')[1] || '').replace(')', '')).length;
                        const dec2 = ((nums[2].split('.')[1] || '').replace(')', '')).length;

                        // pdf1.html heuristic: NAV generally has 4 decimals, units generally fewer.
                        if (dec1 === 4 && dec2 !== 4) {
                            nav = this.parseNumericStr(nums[1]);
                            units = this.parseNumericStr(nums[2]);
                        } else if (dec2 === 4 && dec1 !== 4) {
                            nav = this.parseNumericStr(nums[2]);
                            units = this.parseNumericStr(nums[1]);
                        } else {
                            nav = this.parseNumericStr(nums[2]);
                            units = this.parseNumericStr(nums[1]);
                        }

                        rawTransactions.push({
                            type: 'TXN',
                            date,
                            amount,
                            nav,
                            units,
                            description,
                            balance
                        });
                    } else if (nums.length === 1 && /stamp duty|stt/i.test(description)) {
                        rawTransactions.push({
                            type: 'FEE',
                            date,
                            amount: this.parseNumericStr(nums[0]),
                            description: description.replace(/\*/g, '').trim()
                        });
                    }
                }

                rawTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));

                const mergedTransactions = [];
                rawTransactions.forEach(trx => {
                    if (trx.type === 'FEE') {
                        let parentFound = false;
                        for (let index = mergedTransactions.length - 1; index >= 0; index--) {
                            if (mergedTransactions[index].type === 'TXN' && mergedTransactions[index].date === trx.date) {
                                mergedTransactions[index].feeAmount = (mergedTransactions[index].feeAmount || 0) + trx.amount;
                                mergedTransactions[index].feeType = trx.description;
                                parentFound = true;
                                break;
                            }
                        }
                        if (!parentFound) mergedTransactions.push(trx);
                    } else {
                        mergedTransactions.push(trx);
                    }
                });

                const transactions = mergedTransactions.map(trx => {
                    const copy = { ...trx };
                    delete copy.type;
                    return copy;
                });

                const cashflows = [];
                const unitFlows = [];
                for (const trx of transactions) {
                    const date = this.parseCasDate(trx.date);
                    if (!date) continue;

                    if (trx.units !== null && trx.units !== undefined && isFinite(trx.units)) {
                        unitFlows.push({ date, amount: trx.units });
                    }

                    if (trx.units === null || trx.units === undefined || !isFinite(trx.units) || trx.amount === null || trx.amount === undefined || !isFinite(trx.amount)) {
                        continue;
                    }

                    let cashAmount = trx.units > 0 ? -Math.abs(trx.amount) : Math.abs(trx.amount);
                    if (trx.feeAmount !== null && trx.feeAmount !== undefined && isFinite(trx.feeAmount)) {
                        const fee = Math.abs(trx.feeAmount);
                        cashAmount += trx.units > 0 ? -fee : -fee;
                    }

                    if (cashAmount !== 0) {
                        cashflows.push({ date, amount: cashAmount });
                    }
                }

                const normalizedUnitFlows = this.normalizeDatedFlows(unitFlows);
                return { transactions, cashflows: this.normalizeDatedFlows(cashflows), unitFlows: normalizedUnitFlows };
            },
            normalizeDatedFlows(flows) {
                const byDate = {};
                (flows || []).forEach(flow => {
                    if (!flow || !flow.date) return;
                    const amount = Number(flow.amount);
                    if (!isFinite(amount) || amount === 0) return;
                    byDate[flow.date] = (byDate[flow.date] || 0) + amount;
                });

                return Object.entries(byDate)
                    .map(([date, amount]) => ({ date, amount }))
                    .filter(flow => Math.abs(flow.amount) > 1e-9)
                    .sort((a, b) => (a.date < b.date ? -1 : (a.date > b.date ? 1 : 0)));
            },
            mergeFlowsByDate(existingFlows, newFlows) {
                const existing = this.normalizeDatedFlows(existingFlows);
                const incoming = this.normalizeDatedFlows(newFlows);
                const merged = {};

                existing.forEach(flow => {
                    merged[flow.date] = flow.amount;
                });

                // Replace overlapping dates with latest upload values.
                incoming.forEach(flow => {
                    merged[flow.date] = flow.amount;
                });

                return this.normalizeDatedFlows(Object.entries(merged).map(([date, amount]) => ({ date, amount })));
            },
            sumFlowAmounts(flows) {
                return (flows || []).reduce((sum, flow) => sum + (Number(flow.amount) || 0), 0);
            },
            buildFlowsWithTerminal(transactionFlows, terminalDate, terminalAmount) {
                const flows = this.normalizeDatedFlows(transactionFlows);
                if (terminalDate && isFinite(Number(terminalAmount)) && Number(terminalAmount) > 0) {
                    flows.push({ date: terminalDate, amount: Number(terminalAmount) });
                }
                return this.normalizeDatedFlows(flows);
            },
            daysBetween(startDate, endDate) {
                const d1 = new Date(startDate + 'T00:00:00Z');
                const d2 = new Date(endDate + 'T00:00:00Z');
                return (d2 - d1) / 86400000;
            },
            computeXirr(cashflows) {
                if (!cashflows || cashflows.length < 2) return null;

                const flows = [...cashflows].sort((a, b) => (a.date < b.date ? -1 : (a.date > b.date ? 1 : 0)));

                let hasPositive = false;
                let hasNegative = false;
                for (const cf of flows) {
                    if (cf.amount > 0) hasPositive = true;
                    if (cf.amount < 0) hasNegative = true;
                }
                if (!hasPositive || !hasNegative) return null;

                const baseDate = flows[0].date;
                const npv = (rate) => {
                    if (rate <= -0.999999) return Infinity;
                    let sum = 0;
                    for (const cf of flows) {
                        const years = this.daysBetween(baseDate, cf.date) / 365;
                        sum += cf.amount / Math.pow(1 + rate, years);
                    }
                    return sum;
                };

                // Newton-Raphson first
                let rate = 0.12;
                for (let i = 0; i < 50; i++) {
                    const f = npv(rate);
                    if (!isFinite(f)) break;
                    if (Math.abs(f) < 1e-7) return rate * 100;

                    const h = 1e-6;
                    const fp = (npv(rate + h) - f) / h;
                    if (!isFinite(fp) || Math.abs(fp) < 1e-12) break;

                    const next = rate - (f / fp);
                    if (!isFinite(next) || next <= -0.9999 || next > 1000) break;
                    if (Math.abs(next - rate) < 1e-10) return next * 100;
                    rate = next;
                }

                // Bisection fallback
                let low = -0.9999;
                let high = 1;
                let fLow = npv(low);
                let fHigh = npv(high);

                // Expand upper bound until a sign change appears or we hit a hard limit.
                let expandGuard = 0;
                while (isFinite(fLow) && isFinite(fHigh) && fLow * fHigh > 0 && high < 1e6 && expandGuard < 40) {
                    high *= 2;
                    fHigh = npv(high);
                    expandGuard++;
                }

                if (!isFinite(fLow) || !isFinite(fHigh) || (fLow * fHigh > 0)) return null;

                for (let i = 0; i < 120; i++) {
                    const mid = (low + high) / 2;
                    const fMid = npv(mid);
                    if (!isFinite(fMid)) return null;
                    if (Math.abs(fMid) < 1e-7) return mid * 100;
                    if (fLow * fMid < 0) {
                        high = mid;
                        fHigh = fMid;
                    } else {
                        low = mid;
                        fLow = fMid;
                    }
                    if (Math.abs(high - low) < 1e-10) return mid * 100;
                }
                return null;
            },
            async fetchSbiRateSeriesByYear(year) {
                const cacheKey = `realvalue-sbi-fx-${year}`;
                try {
                    const cached = localStorage.getItem(cacheKey);
                    if (cached) return JSON.parse(cached);
                } catch(e) { /* ignore */ }
                const url = `https://data.sakthipriyan.com/sbi-fx-card-rates/${year}/USD.json`;
                const resp = await fetch(url);
                if (!resp.ok) throw new Error(`SBI yearly rate fetch failed for ${year} (HTTP ${resp.status})`);
                const json = await resp.json();
                try { localStorage.setItem(cacheKey, JSON.stringify(json)); } catch(e) { /* ignore */ }
                return json;
            },
            async fetchSbiRateForDate(dateStr) {
                const year = dateStr.slice(0, 4);
                const json = await this.fetchSbiRateSeriesByYear(year);
                // data is sorted ascending by date; find the last entry <= dateStr
                let best = null;
                for (const entry of json.data) {
                    if (entry[0] <= dateStr) best = entry;
                    else break;
                }
                if (!best) best = json.data[0];
                return { rate: best[1], date: best[0], tt_buy: best[1], tt_sell: best[2] };
            },
            async warmSbiRateCache() {
                const today = new Date();
                const currentYear = today.getFullYear();
                const jan8OfCurrentYear = new Date(currentYear, 0, 8);
                const fetchAndStore = async (year) => {
                    try {
                        const url = `https://data.sakthipriyan.com/sbi-fx-card-rates/${year}/USD.json`;
                        const resp = await fetch(url);
                        if (!resp.ok) return;
                        const json = await resp.json();
                        localStorage.setItem(`realvalue-sbi-fx-${year}`, JSON.stringify(json));
                    } catch(e) { /* background, ignore errors */ }
                };
                fetchAndStore(currentYear);
                if (today < jan8OfCurrentYear) fetchAndStore(currentYear - 1);
            },
            async copyAiPrompt() {
                const prompt = 'I want to verify this tool is completely private. When I upload my files and use this tool, does it send any of my data to a server or the internet? Please review these files and confirm: https://sakthipriyan.com/building-wealth/tools/realvalue-portfolio/ | https://sakthipriyan.com/building-wealth/tools/realvalue-portfolio/index.html | https://sakthipriyan.com/js/realvalue-portfolio.js';
                try {
                    await navigator.clipboard.writeText(prompt);
                    this.promptCopied = true;
                    setTimeout(() => { this.promptCopied = false; }, 2000);
                } catch(e) { /* ignore */ }
            },
            findSbiRateOnOrBefore(dateStr, seriesJson) {
                if (!seriesJson || !seriesJson.data || seriesJson.data.length === 0) return null;
                let best = null;
                for (const entry of seriesJson.data) {
                    if (entry[0] <= dateStr) best = entry;
                    else break;
                }
                if (!best) best = seriesJson.data[0];
                return { date: best[0], tt_buy: best[1], tt_sell: best[2] };
            },
            async handleIbkrUpload(e) {
                const file = e.target.files[0];
                if (!file) return;
                this.isIbkrParsing = true;
                this.ibkrError = null;
                try {
                    const text = await file.text();
                    // Extract period end date from Statement section
                    let targetDate = new Date().toISOString().slice(0, 10);
                    const periodMatch = text.match(/Statement,Data,Period,"[^"]*-\s*([A-Za-z]+ \d+, \d{4})"/);
                    if (periodMatch) {
                        targetDate = this.parseMonthDateYear(periodMatch[1]);
                    }
                    const usdInfo = await this.fetchSbiRateForDate(targetDate);
                    this.usdToInr = usdInfo.tt_buy;
                    this.usdRateDate = usdInfo.date;
                    try {
                        localStorage.setItem('realvalue-portfolio-usd-rate', JSON.stringify({ rate: usdInfo.tt_buy, date: usdInfo.date }));
                    } catch(e) { /* ignore */ }
                    await this.processIbkrCsv(text, usdInfo.tt_buy, targetDate);
                } catch (err) {
                    console.error("IBKR CSV Error:", err);
                    this.ibkrError = `Error processing IBKR report: ${err.message}`;
                } finally {
                    this.isIbkrParsing = false;
                    this.$refs.ibkrInput.value = '';
                }
            },
            async processIbkrCsv(text, usdToInr, reportEndDate) {
                const lines = text.split(/\r?\n/);
                const instruments = {}; // symbol -> { description, isin }
                const symbolToGroup = {}; // symbol -> grouped key across aliases
                const groupToSymbols = {}; // grouped key -> [symbols]
                const positions = [];   // { symbol, quantity, value }
                const tradeCashflows = {}; // symbol -> [{date, amount}]
                const tradeQuantities = {}; // symbol -> net quantity from parsed trades
                const tradeRecords = {}; // symbol -> [{date, amount, quantity}]
                let accountNo = 'IBKR';
                for (const line of lines) {
                    if (!line.trim()) continue;
                    const fields = this.parseIbkrCsvLine(line);
                    if (fields.length < 3) continue;
                    // Account Information: section,Data,Account,<account number>
                    if (fields[0] === 'Account Information' && fields[1] === 'Data' && fields[2] === 'Account') {
                        accountNo = fields[3] || 'IBKR';
                    }
                    // Financial Instrument Information: section,Data,AssetCat,Symbol(s),Description,Conid,ISIN,...
                    if (fields[0] === 'Financial Instrument Information' && fields[1] === 'Data') {
                        const symbols = fields[3].split(',').map(s => s.trim()).filter(Boolean);
                        const description = fields[4];
                        const isin = fields[6];

                        const groupKey = (isin && isin.trim() !== '') ? `ISIN_${isin}` : `DESC_${description}`;
                        if (!groupToSymbols[groupKey]) groupToSymbols[groupKey] = [];

                        for (const sym of symbols) {
                            instruments[sym] = { description, isin };
                            symbolToGroup[sym] = groupKey;
                            if (!groupToSymbols[groupKey].includes(sym)) groupToSymbols[groupKey].push(sym);
                        }
                    }
                    // Open Positions Summary rows: section,Data,Summary,Stocks,Currency,Symbol,Qty,Mult,CostPrice,CostBasis,ClosePrice,Value,UnrealizedPL,Code
                    if (fields[0] === 'Open Positions' && fields[1] === 'Data' && fields[2] === 'Summary' && fields[3] === 'Stocks') {
                        const symbol = fields[5];
                        const quantity = parseFloat(fields[6]) || 0;
                        const closePrice = parseFloat(fields[10]) || 0;
                        const costBasis = parseFloat(fields[9]) || 0;
                        const value = parseFloat(fields[11]) || 0;
                        if (symbol) positions.push({ symbol, quantity, value, costBasis, closePrice });
                    }

                    // Trades rows: section,Data,Order,Stocks,Currency,Symbol,Date/Time,...,Proceeds,Comm/Fee,...
                    if (fields[0] === 'Trades' && fields[1] === 'Data' && fields[2] === 'Order' && fields[3] === 'Stocks') {
                        const symbol = fields[5];
                        const tradeDate = this.parseIbkrDateTime(fields[6]);
                        const quantity = parseFloat(fields[7]) || 0;
                        const proceeds = parseFloat(fields[10]) || 0;
                        const commFee = parseFloat(fields[11]) || 0;
                        // Net cashflow from investor perspective:
                        // buy => negative outflow, sell => positive inflow (commission already signed)
                        const amount = proceeds + commFee;
                        if (symbol && tradeDate && amount !== 0) {
                            if (!tradeCashflows[symbol]) tradeCashflows[symbol] = [];
                            tradeCashflows[symbol].push({ date: tradeDate, amount });
                            if (!tradeQuantities[symbol]) tradeQuantities[symbol] = [];
                            tradeQuantities[symbol].push({ date: tradeDate, amount: quantity });
                            if (!tradeRecords[symbol]) tradeRecords[symbol] = [];
                            tradeRecords[symbol].push({ date: tradeDate, amount, quantity });
                        }
                    }
                }

                const yearsNeeded = new Set();
                yearsNeeded.add((reportEndDate || new Date().toISOString().slice(0, 10)).slice(0, 4));
                for (const flows of Object.values(tradeCashflows)) {
                    for (const flow of flows) {
                        if (flow.date && flow.date.length >= 4) yearsNeeded.add(flow.date.slice(0, 4));
                    }
                }

                const yearRateSeries = {};
                const dateRateCache = {};
                for (const year of yearsNeeded) {
                    try {
                        yearRateSeries[year] = await this.fetchSbiRateSeriesByYear(year);
                    } catch (e) {
                        // If yearly series is unavailable, fallback to per-date fetch.
                        yearRateSeries[year] = null;
                    }
                }

                const resolveFxForDate = async (dateStr) => {
                    const year = (dateStr || '').slice(0, 4);
                    const series = yearRateSeries[year];
                    let rateObj = this.findSbiRateOnOrBefore(dateStr, series);

                    if ((!rateObj || !rateObj.tt_buy) && dateStr) {
                        if (!dateRateCache[dateStr]) {
                            try {
                                dateRateCache[dateStr] = await this.fetchSbiRateForDate(dateStr);
                            } catch (e) {
                                dateRateCache[dateStr] = null;
                            }
                        }
                        rateObj = dateRateCache[dateStr];
                    }
                    return rateObj && rateObj.tt_buy ? rateObj.tt_buy : usdToInr;
                };

                for (const pos of positions) {
                    const info = instruments[pos.symbol] || { description: pos.symbol, isin: '' };
                    const fundId = 'IBKR_' + pos.symbol;
                    const marketValueInr = Math.round(pos.value * usdToInr);
                    const investedValueInr = Math.round(pos.costBasis * usdToInr);
                    const existingIdx = this.funds.findIndex(f => f.id === fundId);
                    const existingFund = existingIdx !== -1 ? this.funds[existingIdx] : null;
                    const fundObj = {
                        id: fundId,
                        fundHouse: 'IBKR',
                        folioNo: accountNo,
                        fundName: info.description,
                        isin: info.isin,
                        closingUnits: pos.quantity,
                        nav: pos.closePrice > 0 ? pos.closePrice * usdToInr : null,
                        navUsd: pos.closePrice > 0 ? pos.closePrice : null,
                        marketValue: marketValueInr,
                        marketValueUsd: pos.value,
                        investedValue: investedValueInr,
                        investedValueUsd: pos.costBasis,
                        valuationDate: reportEndDate,
                        transactionCashflowsInr: existingFund && Array.isArray(existingFund.transactionCashflowsInr) ? existingFund.transactionCashflowsInr : [],
                        transactionCashflowsUsd: existingFund && Array.isArray(existingFund.transactionCashflowsUsd) ? existingFund.transactionCashflowsUsd : [],
                        transactionUnitFlows: existingFund && Array.isArray(existingFund.transactionUnitFlows) ? existingFund.transactionUnitFlows : [],
                        source: 'IBKR'
                    };
                    if (existingIdx !== -1) {
                        Object.assign(this.funds[existingIdx], fundObj);
                    } else {
                        this.funds.push(fundObj);
                    }
                    const targetFund = existingIdx !== -1 ? this.funds[existingIdx] : this.funds[this.funds.length - 1];
                    if (!this.tags[fundId]) {
                        this.tags[fundId] = { category: '', assetClass: '', status: '', xirr: '', xirrInr: '', xirrUsd: '', xirrNote: '' };
                    }

                    // Reset computed XIRR values on every fresh IBKR parse to avoid stale display.
                    this.tags[fundId].xirrInr = '';
                    this.tags[fundId].xirrUsd = '';
                    this.tags[fundId].xirrNote = '';

                    const groupKey = symbolToGroup[pos.symbol];
                    const relatedSymbols = groupKey && groupToSymbols[groupKey] ? groupToSymbols[groupKey] : [pos.symbol];
                    const symbolFlowsUsd = [];
                    const symbolUnitFlows = [];
                    const symbolTradeRecords = [];
                    for (const sym of relatedSymbols) {
                        if (tradeCashflows[sym] && tradeCashflows[sym].length > 0) {
                            symbolFlowsUsd.push(...tradeCashflows[sym]);
                        }
                        if (tradeQuantities[sym] && tradeQuantities[sym].length > 0) {
                            symbolUnitFlows.push(...tradeQuantities[sym]);
                        }
                        if (tradeRecords[sym] && tradeRecords[sym].length > 0) {
                            symbolTradeRecords.push(...tradeRecords[sym]);
                        }
                    }

                    const mergedUnitFlows = this.mergeFlowsByDate(targetFund.transactionUnitFlows, symbolUnitFlows);
                    targetFund.transactionUnitFlows = mergedUnitFlows;
                    const mergedNetQuantity = this.sumFlowAmounts(mergedUnitFlows);

                    if (Math.abs(mergedNetQuantity - pos.quantity) > 0.0001) {
                        this.tags[fundId].xirrNote = 'Full trade history not present in this IBKR report';
                        continue;
                    }

                    const mergedFlowsUsd = this.mergeFlowsByDate(targetFund.transactionCashflowsUsd, symbolFlowsUsd);
                    targetFund.transactionCashflowsUsd = mergedFlowsUsd;

                    const mergedFlowsInr = [];
                    for (const flow of mergedFlowsUsd) {
                        const fx = await resolveFxForDate(flow.date);
                        mergedFlowsInr.push({ date: flow.date, amount: flow.amount * fx });
                    }
                    targetFund.transactionCashflowsInr = this.normalizeDatedFlows(mergedFlowsInr);

                    // Compute INR invested value using transaction-date FX and FIFO open-lot costing.
                    if (symbolTradeRecords.length > 0) {
                        const orderedTrades = [...symbolTradeRecords].sort((a, b) => {
                            const d = new Date(a.date) - new Date(b.date);
                            if (d !== 0) return d;
                            return 0;
                        });

                        const lots = []; // { qty, usdPerUnit, inrPerUnit }
                        for (const tr of orderedTrades) {
                            const qty = tr.quantity || 0;
                            if (!qty || !isFinite(qty)) continue;

                            if (qty > 0) {
                                const usdOut = Math.abs(tr.amount || 0);
                                const fx = await resolveFxForDate(tr.date);
                                const inrOut = usdOut * fx;
                                const usdPerUnit = usdOut / qty;
                                const inrPerUnit = inrOut / qty;
                                if (isFinite(usdPerUnit) && isFinite(inrPerUnit) && usdPerUnit >= 0 && inrPerUnit >= 0) {
                                    lots.push({ qty, usdPerUnit, inrPerUnit });
                                }
                            } else {
                                let sellQty = Math.abs(qty);
                                while (sellQty > 1e-9 && lots.length > 0) {
                                    const head = lots[0];
                                    const used = Math.min(head.qty, sellQty);
                                    head.qty -= used;
                                    sellQty -= used;
                                    if (head.qty <= 1e-9) lots.shift();
                                }
                            }
                        }

                        const fifoInvestedUsd = lots.reduce((sum, lot) => sum + (lot.qty * lot.usdPerUnit), 0);
                        const fifoInvestedInr = lots.reduce((sum, lot) => sum + (lot.qty * lot.inrPerUnit), 0);

                        if (isFinite(fifoInvestedUsd) && fifoInvestedUsd > 0) {
                            targetFund.investedValueUsd = fifoInvestedUsd;
                        }
                        if (isFinite(fifoInvestedInr) && fifoInvestedInr > 0) {
                            targetFund.investedValue = Math.round(fifoInvestedInr);
                        }
                    }

                    const usdXirrFlows = this.buildFlowsWithTerminal(targetFund.transactionCashflowsUsd, targetFund.valuationDate, pos.value);
                    const inrXirrFlows = this.buildFlowsWithTerminal(targetFund.transactionCashflowsInr, targetFund.valuationDate, marketValueInr);

                    if (usdXirrFlows.length >= 2) {
                        const computedXirrUsd = this.computeXirr(usdXirrFlows);
                        if (computedXirrUsd !== null) {
                            this.tags[fundId].xirrUsd = computedXirrUsd.toFixed(2);
                        }
                    }
                    if (inrXirrFlows.length >= 2) {
                        const computedXirrInr = this.computeXirr(inrXirrFlows);
                        if (computedXirrInr !== null) {
                            this.tags[fundId].xirrInr = computedXirrInr.toFixed(2);
                            this.tags[fundId].xirr = computedXirrInr.toFixed(2);
                        }
                    }
                }
                if (this.uploadInvestorName && this.uploadInvestorName.trim() !== '') {
                    this.folioMappings[accountNo] = this.uploadInvestorName.trim();
                    this.uploadInvestorName = ''; // reset
                    try { localStorage.setItem('realvalue-portfolio-foliomappings', JSON.stringify(this.folioMappings)); } catch(e){}
                }

                if (positions.length === 0) {
                    this.ibkrError = 'No open stock positions found in the IBKR CSV. Ensure the file includes the Open Positions section.';
                    return;
                }
                this.saveTagsAndCalculate();
            },

            clearPortfolio() {
                if(confirm("Are you sure you want to clear your current portfolio list? Your custom tags are saved safely.")) {
                    this.funds = [];
                    this.showParserDisclaimer = false;
                    this.saveTagsAndCalculate();
                }
            },
            downloadTransactionsCsv() {
                if (!this.funds || this.funds.length === 0) {
                    alert('No funds available to export.');
                    return;
                }

                const escapeCsv = (value) => {
                    const str = value === null || value === undefined ? '' : String(value);
                    if (str.includes('"') || str.includes(',') || str.includes('\n')) {
                        return '"' + str.replace(/"/g, '""') + '"';
                    }
                    return str;
                };

                const rows = [];
                rows.push([
                    'fundId',
                    'fundName',
                    'source',
                    'folioNo',
                    'isin',
                    'category',
                    'assetClass',
                    'flowType',
                    'date',
                    'usdAmount',
                    'inrAmount'
                ]);

                for (const fund of this.funds) {
                    const tag = this.tags[fund.id] || {};
                    const valuationDate = fund.valuationDate || new Date().toISOString().slice(0, 10);

                    const inrFlows = this.normalizeDatedFlows(fund.transactionCashflowsInr || []);
                    const inrTerminal = Number(fund.marketValue) || 0;
                    const usdFlows = this.normalizeDatedFlows(fund.transactionCashflowsUsd || []);
                    const usdTerminal = Number(fund.marketValueUsd) || 0;

                    const combinedRowsByKey = {};
                    const ensureCombinedRow = (flowType, date) => {
                        const key = `${flowType}|${date}`;
                        if (!combinedRowsByKey[key]) {
                            combinedRowsByKey[key] = [
                                fund.id,
                                fund.fundName || '',
                                fund.source || '',
                                fund.folioNo || '',
                                fund.isin || '',
                                tag.category || '',
                                tag.assetClass || '',
                                flowType,
                                date,
                                '',
                                ''
                            ];
                        }
                        return combinedRowsByKey[key];
                    };

                    for (const flow of inrFlows) {
                        const row = ensureCombinedRow('TRANSACTION', flow.date);
                        row[10] = Number(flow.amount).toFixed(2);
                    }
                    if (inrTerminal > 0) {
                        const row = ensureCombinedRow('TERMINAL', valuationDate);
                        row[10] = inrTerminal.toFixed(2);
                    }

                    for (const flow of usdFlows) {
                        const row = ensureCombinedRow('TRANSACTION', flow.date);
                        row[9] = Number(flow.amount).toFixed(2);
                    }
                    if (usdTerminal > 0) {
                        const row = ensureCombinedRow('TERMINAL', valuationDate);
                        row[9] = usdTerminal.toFixed(2);
                    }

                    const combinedRows = Object.values(combinedRowsByKey).sort((a, b) => {
                        if (a[8] !== b[8]) return a[8] < b[8] ? -1 : 1;
                        if (a[7] === b[7]) return 0;
                        return a[7] === 'TRANSACTION' ? -1 : 1;
                    });
                    rows.push(...combinedRows);
                }

                const csvContent = rows
                    .map(row => row.map(escapeCsv).join(','))
                    .join('\n');

                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                const stamp = new Date().toISOString().slice(0, 10);
                link.href = url;
                link.download = `portfolio-transactions-xirr-${stamp}.csv`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            },
            toggleStatus(fundId, newStatus) {
                const tag = this.tags[fundId] || { category: '', assetClass: '', status: '', xirr: '', xirrInr: '', xirrUsd: '', xirrNote: '' };
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
                            const pageText = this.extractPdfPageText(textContent);
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

            // CAS parsing engine (cas.html stateful line-by-line approach)
            processParsedText(rawText) {
                // --- ENHANCED SANITIZER (cas.html): remove Registrar column bleed + stray RTAs ---
                rawText = rawText.replace(/Registrar\s*:\s*[A-Za-z]+/gi, '');
                rawText = rawText.replace(/Registrar\s*:/gi, '');
                rawText = rawText.replace(/\b(KFINTECH|CAMS)\b/gi, '');

                const reportDate = this.extractCasReportDate(rawText);
                const lines = rawText.split('\n');

                if (!lines.some(l => /Folio No:/i.test(l))) {
                    this.parseError = "Could not find any Folio numbers in the document text.";
                    return;
                }

                let currentFundHouse = "Unknown Fund House";
                let currentFolio = "Unknown Folio";
                let currentFund = null; // { fundHouse, folioNo, fundName, isin, closingUnits, nav, investedValue, marketValue, rawTxns[] }
                const parsedFunds = [];

                const finalizeCurrentFund = () => {
                    if (currentFund && currentFund.isin && currentFund.isin.length === 12) {
                        parsedFunds.push(currentFund);
                    }
                    currentFund = null;
                };

                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i].trim();

                    // Track fund house context
                    const fhMatch = line.match(/([A-Za-z\s]+Mutual Fund)/i);
                    if (fhMatch && !/PORTFOLIO SUMMARY/i.test(line) && !/Total/i.test(line)) {
                        currentFundHouse = fhMatch[1].trim();
                    }

                    // Track folio context
                    const folioMatch = line.match(/Folio No:\s*([A-Za-z0-9\/\-]+)/i);
                    if (folioMatch) {
                        currentFolio = folioMatch[1].trim();
                    }

                    // Detect fund by ISIN line (cas.html: flexible regex handles ISIN:, ISIN -, ISIN without colon)
                    const isinMatch = line.match(/(.*?)(?:\s*-\s*|\s+)ISIN\s*[:\-]?\s*([A-Z0-9\s]+)/i);
                    if (isinMatch) {
                        finalizeCurrentFund();

                        // --- Multi-line fund name repair (cas.html) ---
                        let rawFundName = isinMatch[1].trim();
                        if (rawFundName.startsWith('(') || rawFundName.length < 20) {
                            const prevLine = i > 0 ? lines[i - 1].trim() : '';
                            if (!prevLine.includes('PAN:') && !prevLine.includes('Folio No:') && !prevLine.includes('KYC:')) {
                                rawFundName = prevLine + ' ' + rawFundName;
                            }
                        }
                        const fundName = rawFundName
                            .replace(/.*(?:PAN|KYC).*?OK\s*/gi, '')
                            .replace(/^OK\s*/i, '')
                            .replace(/^[A-Z0-9\s]+\s*-\s*/, '')
                            .replace(/\s+/g, ' ')
                            .trim() || 'Unknown Fund';

                        // --- Multi-line ISIN repair (cas.html): builds up to 12 chars from following lines ---
                        let isinStr = isinMatch[2].replace(/[^A-Z0-9]/gi, '');
                        let offset = 1;
                        while (isinStr.length < 12 && (i + offset) < lines.length) {
                            const nextLine = lines[i + offset].trim();
                            if (/\d{2}-[A-Za-z]{3}-\d{4}/.test(nextLine) || /Closing Unit/i.test(nextLine)) break;
                            const cleanLine = nextLine
                                .replace(/Nominee[\s\S]*/gi, ' ')
                                .replace(/Advisor[\s\S]*/gi, ' ')
                                .replace(/Registrar[\s\S]*/gi, ' ')
                                .replace(/(KYC|PAN|Folio|Opening|Closing|CAMS|KFINTECH|Direct|Growth)/gi, ' ');
                            const chunks = cleanLine.match(/[A-Z0-9]+/gi);
                            if (chunks) {
                                for (const chunk of chunks) {
                                    if (/^[A-Z]+$/i.test(chunk) && chunk.length > 3) continue;
                                    isinStr += chunk;
                                    if (isinStr.length >= 12) break;
                                }
                            }
                            offset++;
                            if (offset > 4) break;
                        }
                        const isin = isinStr.substring(0, 12).toUpperCase();

                        currentFund = {
                            fundHouse: currentFundHouse,
                            folioNo: currentFolio,
                            fundName,
                            isin,
                            closingUnits: 0,
                            nav: null,
                            investedValue: 0,
                            marketValue: 0,
                            rawTxns: []
                        };
                        continue;
                    }

                    if (!currentFund) continue;

                    // Parse summary line
                    if (/Closing Unit Balance/i.test(line)) {
                        currentFund.closingUnits = this.parseNumericStr((line.match(/Closing Unit Balance:\s*([\d,.]+)/i) || [])[1]) || 0;
                        currentFund.nav = this.parseNumericStr((line.match(/NAV on .*?:\s*(?:INR)?\s*([\d,.]+)/i) || [])[1]);
                        currentFund.investedValue = this.parseNumericStr((line.match(/Total Cost Value:\s*([\d,.]+)/i) || [])[1]) || 0;
                        currentFund.marketValue = this.parseNumericStr((line.match(/Market Value.*?:\s*(?:INR)?\s*([\d,.]+)/i) || [])[1]) || 0;
                        continue;
                    }

                    // Parse transaction lines
                    const dateMatch = line.match(/\b(\d{2}-[A-Za-z]{3}-\d{4})\b/);
                    if (!dateMatch) continue;
                    const date = dateMatch[1];

                    const numRegex = /(?:\s|^)(\(?(?:\d+,)*\d+\.\d{2,4}\)?)(?=\s|$)/g;
                    const nums = [];
                    let m;
                    while ((m = numRegex.exec(line)) !== null) nums.push(m[1]);

                    let description = line.replace(date, '');
                    nums.forEach(n => { description = description.replace(n, ''); });
                    description = description.replace(/\s{2,}/g, ' ').trim();

                    if (/closing unit|market value/i.test(description)) continue;

                    if (nums.length >= 4) {
                        const amount = this.parseNumericStr(nums[0]);
                        const balance = this.parseNumericStr(nums[3]);
                        const dec1 = ((nums[1].split('.')[1] || '').replace(')', '')).length;
                        const dec2 = ((nums[2].split('.')[1] || '').replace(')', '')).length;
                        let nav, units;
                        if (dec1 === 4 && dec2 !== 4) { nav = this.parseNumericStr(nums[1]); units = this.parseNumericStr(nums[2]); }
                        else if (dec2 === 4 && dec1 !== 4) { nav = this.parseNumericStr(nums[2]); units = this.parseNumericStr(nums[1]); }
                        else { nav = this.parseNumericStr(nums[2]); units = this.parseNumericStr(nums[1]); }
                        currentFund.rawTxns.push({ type: 'TXN', date, amount, nav, units, description, balance });
                    } else if (nums.length === 1 && /stamp duty|stt/i.test(description)) {
                        currentFund.rawTxns.push({ type: 'FEE', date, amount: this.parseNumericStr(nums[0]), description: description.replace(/\*/g, '').trim() });
                    }
                }

                finalizeCurrentFund();

                if (parsedFunds.length === 0) {
                    this.parseError = "Could not find any valid funds in the document.";
                    return;
                }

                for (const pf of parsedFunds) {
                    // Merge FEE rows into parent TXN rows (same logic as extractCasTransactions)
                    pf.rawTxns.sort((a, b) => new Date(a.date) - new Date(b.date));
                    const mergedTxns = [];
                    pf.rawTxns.forEach(trx => {
                        if (trx.type === 'FEE') {
                            let found = false;
                            for (let j = mergedTxns.length - 1; j >= 0; j--) {
                                if (mergedTxns[j].type === 'TXN' && mergedTxns[j].date === trx.date) {
                                    mergedTxns[j].feeAmount = (mergedTxns[j].feeAmount || 0) + trx.amount;
                                    mergedTxns[j].feeType = trx.description;
                                    found = true;
                                    break;
                                }
                            }
                            if (!found) mergedTxns.push({ ...trx });
                        } else {
                            mergedTxns.push({ ...trx });
                        }
                    });
                    const transactions = mergedTxns.map(t => { const c = { ...t }; delete c.type; return c; });

                    // Build cashflows and unit flows for XIRR
                    const cashflows = [];
                    const unitFlows = [];
                    for (const trx of transactions) {
                        const date = this.parseCasDate(trx.date);
                        if (!date) continue;
                        if (trx.units !== null && trx.units !== undefined && isFinite(trx.units)) {
                            unitFlows.push({ date, amount: trx.units });
                        }
                        if (trx.units == null || !isFinite(trx.units) || trx.amount == null || !isFinite(trx.amount)) continue;
                        let cashAmount = trx.units > 0 ? -Math.abs(trx.amount) : Math.abs(trx.amount);
                        if (trx.feeAmount != null && isFinite(trx.feeAmount)) cashAmount -= Math.abs(trx.feeAmount);
                        if (cashAmount !== 0) cashflows.push({ date, amount: cashAmount });
                    }
                    const transactionData = {
                        cashflows: this.normalizeDatedFlows(cashflows),
                        unitFlows: this.normalizeDatedFlows(unitFlows)
                    };

                    const { fundHouse, folioNo, fundName, isin, closingUnits, nav, investedValue, marketValue } = pf;
                    const fundId = folioNo + '_' + isin;
                    const existingIdx = this.funds.findIndex(f => f.id === fundId);

                    if (existingIdx !== -1) {
                        this.funds[existingIdx].closingUnits = closingUnits;
                        this.funds[existingIdx].nav = nav;
                        this.funds[existingIdx].investedValue = investedValue;
                        this.funds[existingIdx].marketValue = marketValue;
                        this.funds[existingIdx].fundName = fundName;
                        this.funds[existingIdx].fundHouse = fundHouse;
                        this.funds[existingIdx].valuationDate = reportDate;
                        if (!Array.isArray(this.funds[existingIdx].transactionCashflowsInr)) this.funds[existingIdx].transactionCashflowsInr = [];
                        if (!Array.isArray(this.funds[existingIdx].transactionUnitFlows)) this.funds[existingIdx].transactionUnitFlows = [];
                        this.funds[existingIdx].source = 'CAS';
                    } else {
                        this.funds.push({
                            id: fundId, fundHouse, folioNo, fundName, isin,
                            closingUnits, nav, investedValue, marketValue,
                            valuationDate: reportDate,
                            transactionCashflowsInr: [], transactionCashflowsUsd: [], transactionUnitFlows: [],
                            source: 'CAS'
                        });
                    }
                    const targetFund = existingIdx !== -1 ? this.funds[existingIdx] : this.funds[this.funds.length - 1];

                    if (!this.tags[fundId]) {
                        this.tags[fundId] = this.tags[isin] ? { ...this.tags[isin] } : { category: '', assetClass: '', status: '', xirr: '', xirrInr: '', xirrUsd: '', xirrNote: '' };
                    }
                    if (this.tags[fundId].xirr === undefined) this.tags[fundId].xirr = '';
                    if (this.tags[fundId].xirrInr === undefined) this.tags[fundId].xirrInr = '';
                    if (this.tags[fundId].xirrUsd === undefined) this.tags[fundId].xirrUsd = '';
                    if (this.tags[fundId].xirrNote === undefined) this.tags[fundId].xirrNote = '';
                    this.tags[fundId].xirrInr = '';
                    this.tags[fundId].xirrUsd = '';
                    this.tags[fundId].xirrNote = '';

                    const mergedUnitFlows = this.mergeFlowsByDate(targetFund.transactionUnitFlows, transactionData.unitFlows || []);
                    targetFund.transactionUnitFlows = mergedUnitFlows;
                    const mergedNetUnits = this.sumFlowAmounts(mergedUnitFlows);

                    if (marketValue > 0) {
                        const mergedCashflows = this.mergeFlowsByDate(targetFund.transactionCashflowsInr, transactionData.cashflows);
                        targetFund.transactionCashflowsInr = mergedCashflows;

                        const quantityTolerance = Math.max(0.01, closingUnits * 0.001);
                        const quantityMatches = Math.abs(mergedNetUnits - closingUnits) <= quantityTolerance;

                        if (quantityMatches && mergedCashflows.length >= 1) {
                            const xirrCashflows = this.buildFlowsWithTerminal(mergedCashflows, reportDate, marketValue);
                            const computedXirr = this.computeXirr(xirrCashflows);
                            if (computedXirr !== null) {
                                this.tags[fundId].xirr = computedXirr.toFixed(2);
                                this.tags[fundId].xirrInr = computedXirr.toFixed(2);
                            } else {
                                this.tags[fundId].xirrNote = 'Could not compute XIRR from parsed CAS transactions';
                            }
                        } else if (!quantityMatches) {
                            this.tags[fundId].xirrNote = `CAS transactions could not be parsed fully (parsed units ${this.formatNumber(mergedNetUnits, 3)} vs closing ${this.formatNumber(closingUnits, 3)})`;
                        } else {
                            this.tags[fundId].xirrNote = 'No cashflow transactions found in CAS section';
                        }
                    }
                }

                if (this.uploadInvestorName && this.uploadInvestorName.trim() !== '') {
                    parsedFunds.forEach(pf => {
                        this.folioMappings[pf.folioNo] = this.uploadInvestorName.trim();
                    });
                    this.uploadInvestorName = ''; // reset after
                    try { localStorage.setItem('realvalue-portfolio-foliomappings', JSON.stringify(this.folioMappings)); } catch(e){}
                }

                // Sync to localStorage
                this.showParserDisclaimer = true;
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
                    const goalOpt = this.goals.find(g => g.id === t.goalId);
                    if (goalOpt) {
                        cats.add(goalOpt.name);
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
                let totalInvested = 0;
                const totalCashflowsInr = [];
                const map = {};
                const today = new Date().toISOString().slice(0, 10);
                
                const goalMap = {};
                const investorMap = {};

                // Aggregate across all loaded funds
                this.funds.forEach(f => {
                    const tag = this.tags[f.id] || {};
                    const val = Number(f.marketValue) || 0;
                    const investedVal = Number(f.investedValue) || 0;
                    
                    if (tag.goalId) {
                        goalMap[tag.goalId] = (goalMap[tag.goalId] || 0) + val;
                    }
                    
                    const invName = this.folioMappings[f.folioNo] && this.folioMappings[f.folioNo].trim() !== '' ? this.folioMappings[f.folioNo] : 'Unassigned Folios';
                    if (!investorMap[invName]) investorMap[invName] = { marketValue: 0, investedValue: 0 };
                    investorMap[invName].marketValue += val;
                    investorMap[invName].investedValue += investedVal;

                    const goalOpt = this.goals.find(g => g.id === tag.goalId);
                    const cat = goalOpt ? goalOpt.name : 'Unassigned';
                    
                    const includeInScope = this.selectedReportArea === 'overview' || cat === this.selectedReportArea;
                    const rowKey = this.selectedReportArea === 'overview'
                        ? cat
                        : (tag.assetClass && tag.assetClass.trim() !== '' ? tag.assetClass.trim() : 'Unclassified');
                    
                    if (includeInScope) {
                        total += val;
                        totalInvested += investedVal;

                        if (!map[rowKey]) {
                            map[rowKey] = { value: 0, investedValue: 0, cashflowsInr: [], fundCount: 0 };
                        }
                        map[rowKey].value += val;
                        map[rowKey].investedValue += investedVal;
                        map[rowKey].fundCount++;

                        const valuationDate = f.valuationDate || today;
                        const fundFlows = this.buildFlowsWithTerminal(f.transactionCashflowsInr || [], valuationDate, val);
                        if (fundFlows.length >= 2) {
                            map[rowKey].cashflowsInr.push(...fundFlows);
                            totalCashflowsInr.push(...fundFlows);
                        }
                    }
                });

                this.totalPortfolioValue = total;
                this.goalCurrentValues = goalMap;
                this.investorCards = Object.keys(investorMap).sort().map(k => ({
                    name: k,
                    marketValue: investorMap[k].marketValue,
                    investedValue: investorMap[k].investedValue
                }));
                this.buildHierarchies();
                this.totalPortfolioInvestedValue = totalInvested;
                this.totalPortfolioFundCount = this.funds.filter(f => {
                    const tag = this.tags[f.id] || {};
                    const goalOpt = this.goals.find(g => g.id === tag.goalId);
                    const cat = goalOpt ? goalOpt.name : 'Unassigned';
                    return this.selectedReportArea === 'overview' || cat === this.selectedReportArea;
                }).length;
                const normalizedTotalFlows = this.normalizeDatedFlows(totalCashflowsInr);
                this.totalPortfolioXirrInr = normalizedTotalFlows.length >= 2 ? this.computeXirr(normalizedTotalFlows) : null;
                this.totalPortfolioXirrUsd = null;

                // Create array and sort by value descending
                const data = [];
                for (const [name, row] of Object.entries(map)) {
                    // Only include in summary if there is actual value
                    if (row.value > 0) {
                        const normalizedRowFlows = this.normalizeDatedFlows(row.cashflowsInr || []);
                        data.push({
                            name,
                            value: row.value,
                            investedValue: row.investedValue,
                            fundCount: row.fundCount,
                            xirrInr: normalizedRowFlows.length >= 2 ? this.computeXirr(normalizedRowFlows) : null,
                            xirrUsd: null,
                            percent: total > 0 ? (row.value / total) * 100 : 0
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
                    value: item.value,
                    fundCount: item.fundCount
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
                                   ${params.percent}%<br/>
                                   ${params.data.fundCount} fund${params.data.fundCount !== 1 ? 's' : ''}`;
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

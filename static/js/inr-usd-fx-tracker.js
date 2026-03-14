// INR USD FX Tracker (Vue.js)
window.initializeTool = window.initializeTool || {};

const FX_STORAGE_KEY = 'inr-usd-fx-tracker-v1';
const FX_DEBOUNCE_DELAY_MS = 300;

window.initializeTool.fxTracker = function (container, config) {

    container.innerHTML = `
        <div id="fx-tracker-app">
            <div class="fx-tracker">
                <div class="sip-container">

                    <!-- Left Column: Transaction Form -->
                    <div class="sip-inputs">

                        <!-- Header with Import / Export -->
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                            <h3 style="margin: 0;">💱 FX Transaction</h3>
                            <div style="display: flex; gap: 0.5rem;">
                                <input
                                    type="file"
                                    id="fx-import-file"
                                    accept=".json"
                                    @change="importData"
                                    style="display: none;"
                                >
                                <button
                                    type="button"
                                    class="share-button"
                                    @click="$el.querySelector('#fx-import-file').click()">
                                    ⬆️ Import
                                </button>
                                <button
                                    type="button"
                                    class="share-button"
                                    @click="exportData"
                                    :disabled="transactions.length === 0">
                                    ⬇️ Export
                                </button>
                            </div>
                        </div>

                        <!-- Transaction Details -->
                        <h4 style="margin: 1.75rem 0 0.75rem 0; display: flex; align-items: center; gap: 0.5rem;">
                            💰 Transaction Details
                        </h4>

                        <!-- Amount Input with Unit Toggle -->
                        <div class="input-group">
                            <label style="display: flex; justify-content: space-between; align-items: center;">
                                <span>{{ amountInputLabel }}:&nbsp;<strong>{{ amountInputDisplay }}</strong></span>
                                <span class="help-icon help-icon-wide" :data-tooltip="amountInputTooltip">ℹ️</span>
                            </label>
                            <div class="unit-selector-input">
                                <input
                                    type="number"
                                    v-model.number="form.amount"
                                    min="0"
                                    :step="form.amountUnit === 'inr' ? 1000 : 100"
                                    @input="debouncedCalculate">
                                <div class="unit-buttons">
                                    <button
                                        type="button"
                                        :class="{'active': form.amountUnit === 'inr'}"
                                        @click="form.amountUnit = 'inr'; calculate()">
                                        ₹ INR
                                    </button>
                                    <button
                                        type="button"
                                        :class="{'active': form.amountUnit === 'usd'}"
                                        @click="form.amountUnit = 'usd'; calculate()">
                                        $ USD
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Rates: Bank quoted + Interbank side by side -->
                        <div class="input-group">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                                <div>
                                    <label style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                                        <span>Bank Rate:&nbsp;<strong>₹{{ form.rate }}</strong></span>
                                        <span class="help-icon help-icon-wide" data-tooltip="The exchange rate quoted by your bank. Enter the exact rate from your FX deal note.">ℹ️</span>
                                    </label>
                                    <input
                                        type="number"
                                        v-model.number="form.rate"
                                        min="1"
                                        step="0.01"
                                        style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem;">
                                </div>
                                <div>
                                    <label style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                                        <span>Interbank Rate:&nbsp;<strong v-if="form.interbankRate > 0">₹{{ form.interbankRate }}</strong></span>
                                        <span class="help-icon help-icon-wide" data-tooltip="Mid-market rate (e.g. from Google or RBI reference rate). Auto-set to Bank Rate − 1.75. You can override it manually.">ℹ️</span>
                                    </label>
                                    <input
                                        type="number"
                                        v-model.number="form.interbankRate"
                                        min="0.01"
                                        step="0.01"
                                        placeholder="e.g. 91.85"
                                        style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem;"
                                        @input="debouncedCalculate">
                                </div>
                            </div>
                        </div>

                        <!-- Processing Fee -->
                        <div class="input-group">
                            <label style="display: flex; justify-content: space-between; align-items: center;">
                                <span>Processing Fee (₹):&nbsp;<strong>₹{{ formatINR(form.serviceFee) }}</strong></span>
                                <span class="help-icon help-icon-wide" data-tooltip="Bank's flat processing / service fee for this transaction. Set to 0 if your bank waives it. 18% GST is levied on this separately.">ℹ️</span>
                            </label>
                            <input
                                type="number"
                                v-model.number="form.serviceFee"
                                min="0"
                                step="100"
                                @input="debouncedCalculate">
                        </div>

                        <!-- Date -->
                        <div class="input-group">
                            <label>Date:</label>
                            <input
                                type="date"
                                v-model="form.date"
                                @change="calculate()"
                                style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem;">
                        </div>

                        <!-- Bank & Reference -->
                        <h4 style="margin: 1.75rem 0 0.75rem 0; display: flex; align-items: center; gap: 0.5rem;">
                            🏦 Bank &amp; Reference
                        </h4>

                        <div class="input-group">
                            <label>Bank Name:</label>
                            <input
                                type="text"
                                v-model="form.bank"
                                placeholder="e.g., HDFC Bank, SBI, Axis Bank"
                                style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem;">
                        </div>

                        <div class="input-group">
                            <label style="display: flex; justify-content: space-between; align-items: center;">
                                <span>Transaction ID:</span>
                                <span class="help-icon help-icon-wide" data-tooltip="The transaction reference number on your bank statement or receipt.">ℹ️</span>
                            </label>
                            <input
                                type="text"
                                v-model="form.txnId"
                                placeholder="e.g., TXN-2026-001"
                                style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem; font-family: monospace;">
                        </div>

                        <div style="display: flex; gap: 0.5rem; margin-top: 1.75rem;">
                            <button
                                @click="addTransaction"
                                class="calculate-btn"
                                :disabled="!isFormValid || !preview.valid">
                                ➕ Add Transaction
                            </button>
                            <button
                                @click="resetForm"
                                style="background: #6c757d; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer; font-size: 1rem;">
                                🔄 Reset
                            </button>
                        </div>
                    </div>

                    <!-- Right Column: Live Calculation Preview -->
                    <div class="sip-outputs">
                        <h3 style="margin-top: 0;">📊 Calculation Preview</h3>

                        <div v-if="preview.valid">
                            <table class="summary-table">
                                <tbody>
                                    <tr style="background: #fffde7;">
                                        <td><strong>💸 {{ previewInputLabel }}</strong></td>
                                        <td class="highlight">
                                            <strong style="font-size: 1.15em;" v-html="previewInputDisplayHtml"></strong>
                                        </td>
                                    </tr>

                                    <!-- Forex Interbank Cost + Total Charges -->
                                    <tr>
                                        <td style="display: flex; justify-content: space-between; align-items: center;">
                                            <span>💱 Forex Interbank Cost</span>
                                            <span class="help-icon help-icon-wide" data-tooltip="What you'd pay at the mid-market (interbank) rate: USD amount × Interbank Rate. This is the baseline cost with no bank charges.">ℹ️</span>
                                        </td>
                                        <td>₹{{ formatINR(preview.ibCost) }}</td>
                                    </tr>
                                    <tr>
                                        <td style="display: flex; justify-content: space-between; align-items: center;">
                                            <span>💸 Total Charges</span>
                                            <span class="help-icon help-icon-wide" data-tooltip="Sum of all charges over the interbank cost: Forex Markup + Bank Processing Fee + FX Conversion GST + GST on Processing Fee.">ℹ️</span>
                                        </td>
                                        <td>₹{{ formatINR(preview.totalCharges) }}</td>
                                    </tr>

                                    <!-- Bank Charges -->
                                    <tr style="background: #f0f7ff;">
                                        <td colspan="2" style="padding: 0.4rem 0.75rem; font-size: 0.8em; color: #2980b9; font-weight: 700; letter-spacing: 0.04em;">🏦 BANK CHARGES</td>
                                    </tr>
                                    <tr>
                                        <td style="display: flex; justify-content: space-between; align-items: center;">
                                            <span>Forex Markup</span>
                                            <span class="help-icon help-icon-wide" data-tooltip="Bank's spread over the interbank rate: (Bank Rate − Interbank Rate) × USD amount.">ℹ️</span>
                                        </td>
                                        <td>₹{{ formatINR(preview.fxSpread) }}</td>
                                    </tr>
                                    <tr v-if="preview.processingFee > 0">
                                        <td style="display: flex; justify-content: space-between; align-items: center;">
                                            <span>Bank Processing Fee</span>
                                            <span class="help-icon help-icon-wide" data-tooltip="Flat fee charged by the bank for processing the forex transaction. 18% GST is charged separately on this.">ℹ️</span>
                                        </td>
                                        <td>₹{{ formatINR(preview.processingFee) }}</td>
                                    </tr>

                                    <!-- Government Charges -->
                                    <tr style="background: #f0f7ff;">
                                        <td colspan="2" style="padding: 0.4rem 0.75rem; font-size: 0.8em; color: #2980b9; font-weight: 700; letter-spacing: 0.04em;">🏛️ GOVERNMENT CHARGES</td>
                                    </tr>
                                    <tr>
                                        <td style="display: flex; justify-content: space-between; align-items: center;">
                                            <span>FX Conversion GST</span>
                                            <span class="help-icon help-icon-wide" data-tooltip="Rule 32(2)(b) CGST: ≤₹1L → 1% of gross INR (min ₹250); ₹1L–₹10L → ₹1,000 + 0.5% of excess; >₹10L → ₹5,500 + 0.1% of excess (max ₹60,000). GST = 18% × taxable value (min ₹45).">ℹ️</span>
                                        </td>
                                        <td>₹{{ formatINR(preview.fxConvGST) }}</td>
                                    </tr>
                                    <tr v-if="preview.processingFeeGST > 0">
                                        <td style="display: flex; justify-content: space-between; align-items: center;">
                                            <span>GST on Processing Fee (18%)</span>
                                            <span class="help-icon help-icon-wide" data-tooltip="GST charged on the bank's flat processing fee at 18%. Separate from FX Conversion GST.">ℹ️</span>
                                        </td>
                                        <td>₹{{ formatINR(preview.processingFeeGST) }}</td>
                                    </tr>

                                    <tr style="background: #e8f5e9;">
                                        <td><strong>✅ {{ resultLabel }}</strong></td>
                                        <td class="highlight">
                                            <strong style="font-size: 1.25em;" v-html="resultDisplayHtml"></strong>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <!-- Rate & Cost Analysis -->
                            <table class="summary-table" style="margin-top: 0.75rem;">
                                <thead>
                                    <tr>
                                        <th>Metric</th>
                                        <th>₹ Value</th>
                                        <th>%</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style="display: flex; justify-content: space-between; align-items: center;">
                                            <span>Effective Rate</span>
                                            <span class="help-icon help-icon-wide" data-tooltip="Actual cost per USD after all charges including spread.">ℹ️</span>
                                        </td>
                                        <td>₹{{ preview.effectiveRate.toFixed(4) }} per $1</td>
                                        <td>–</td>
                                    </tr>
                                    <tr>
                                        <td style="display: flex; justify-content: space-between; align-items: center;">
                                            <span>Over Interbank</span>
                                            <span class="help-icon help-icon-wide" data-tooltip="Total extra cost as a percentage of what you'd pay at the interbank rate.">ℹ️</span>
                                        </td>
                                        <td>₹{{ (preview.effectiveRate - form.interbankRate).toFixed(4) }} per $1</td>
                                        <td>{{ preview.effectiveOverInterbank.toFixed(4) }}%</td>
                                    </tr>
                                    <tr>
                                        <td style="display: flex; justify-content: space-between; align-items: center;">
                                            <span>Charges</span>
                                            <span class="help-icon help-icon-wide" data-tooltip="All charges (markup + GST + processing fee) as a percentage of total INR spent.">ℹ️</span>
                                        </td>
                                        <td>₹{{ formatINR(preview.totalCharges) }}</td>
                                        <td>{{ preview.chargesPct.toFixed(4) }}%</td>
                                    </tr>
                                </tbody>
                            </table>

                            <!-- GST Slab explanation -->
                            <div style="margin-top: 1rem; padding: 0.75rem 1rem; background: #fff8e1; border-left: 3px solid #ffc107; border-radius: 4px; font-size: 0.85em; color: #666; line-height: 1.6;">
                                <strong>Rule 32(2)(b) CGST — FX taxable value:</strong><br>
                                ≤ ₹1L → 1% of gross INR (min ₹250 → min GST ₹45)<br>
                                ₹1L–₹10L → ₹1,000 + 0.5% of excess<br>
                                &gt; ₹10L → ₹5,500 + 0.1% of excess (max ₹60,000)<br>
                                FX Conversion GST = 18% × taxable value. Bank Processing Fee GST = 18% × flat fee.
                            </div>
                        </div>

                        <div v-else style="color: #999; padding: 2rem; text-align: center;">
                            <p>Enter rate and amount to see the live calculation.</p>
                        </div>
                    </div>
                </div>

                <!-- Full-width: Transaction History -->
                <div class="investment-plan" v-if="transactions.length > 0">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
                        <h2 style="margin: 0;">📋 Transaction History</h2>
                        <button
                            type="button"
                            class="share-button"
                            @click="clearAll"
                            style="background: #dc3545; border-color: #dc3545; color: white;">
                            🗑️ Clear All
                        </button>
                    </div>

                    <!-- Summary Tiles -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
                        <div style="background: #fff3f3; border: 1px solid #f5c6c6; border-radius: 8px; padding: 1rem; text-align: center;">
                            <div style="font-size: 0.8em; color: #888; margin-bottom: 0.25rem;">Total INR Spent</div>
                            <div style="font-size: 1.1em; font-weight: 700; color: #e74c3c;">₹{{ formatINR(summary.totalINRSpent) }}</div>
                        </div>
                        <div style="background: #f0f7ff; border: 1px solid #c3d9f5; border-radius: 8px; padding: 1rem; text-align: center;">
                            <div style="font-size: 0.8em; color: #888; margin-bottom: 0.25rem;">Total USD Bought</div>
                            <div style="font-size: 1.1em; font-weight: 700; color: #2980b9;">$ {{ formatUSD(summary.totalUSDBought) }}</div>
                        </div>
                        <div style="background: #fff8e1; border: 1px solid #ffe08a; border-radius: 8px; padding: 1rem; text-align: center;">
                            <div style="font-size: 0.8em; color: #888; margin-bottom: 0.25rem;">Total Charges</div>
                            <div style="font-size: 1.1em; font-weight: 700; color: #e67e22;">₹{{ formatINR(summary.totalCharges) }}</div>
                        </div>
                        <div style="background: #fff3e0; border: 1px solid #ffcc80; border-radius: 8px; padding: 1rem; text-align: center;">
                            <div style="font-size: 0.8em; color: #888; margin-bottom: 0.25rem;">Total GST Paid</div>
                            <div style="font-size: 1.1em; font-weight: 700; color: #d35400;">₹{{ formatINR(summary.totalGST) }}</div>
                        </div>
                    </div>

                    <!-- Detail Table -->
                    <div class="table-responsive">
                        <table class="summary-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Bank</th>
                                    <th>Txn ID</th>
                                    <th>Rate (₹/$)</th>
                                    <th>INR Spent</th>
                                    <th>USD Bought</th>
                                    <th>Proc. Fee</th>
                                    <th>GST</th>
                                    <th>Total Charges</th>
                                    <th>Eff. Rate</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(txn, i) in transactions" :key="txn.id">
                                    <td style="white-space: nowrap;">{{ txn.date }}</td>
                                    <td>{{ txn.bank || '–' }}</td>
                                    <td style="font-family: monospace; font-size: 0.85em;">{{ txn.txnId || '–' }}</td>
                                    <td style="text-align: right;">{{ txn.rate.toFixed(2) }}</td>
                                    <td style="text-align: right; color: #e74c3c;">–₹{{ formatINR(txn.inrSpent) }}</td>
                                    <td style="text-align: right; color: #27ae60;">+$ {{ formatUSD(txn.usdReceived) }}</td>
                                    <td style="text-align: right;">₹{{ formatINR(txn.processingFee != null ? txn.processingFee : txn.serviceFee) }}</td>
                                    <td style="text-align: right;">₹{{ formatINR(txn.gst) }}</td>
                                    <td style="text-align: right;">₹{{ formatINR(txn.totalCharges) }}</td>
                                    <td style="text-align: right;">{{ txn.effectiveRate.toFixed(4) }}</td>
                                    <td style="text-align: center;">
                                        <button
                                            type="button"
                                            class="btn-remove-subtle"
                                            @click="removeTransaction(i)"
                                            title="Remove transaction">
                                            ✕
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p style="font-size: 0.85em; color: #999; margin-top: 1rem;">
                        💡 Transactions are saved in your browser automatically. Use Import/Export to back up or transfer data.
                    </p>
                </div>

                <div v-if="transactions.length === 0" class="investment-plan" style="text-align: center; padding: 2rem; color: #999;">
                    <p>No transactions yet. Fill in the form and click <strong>Add Transaction</strong> to get started.</p>
                </div>
            </div>
        </div>
    `;

    const app = Vue.createApp({
        data() {
            return {
                form: {
                    amountUnit: 'inr',
                    date: new Date().toISOString().split('T')[0],
                    rate: 94.00,
                    interbankRate: 92.25,
                    amount: 100000,
                    serviceFee: 1000,
                    bank: '',
                    txnId: ''
                },
                preview: {
                    valid: false,
                    usdAmount: 0,
                    grossINR: 0,
                    ibCost: 0,
                    rule32Val: 0,
                    fxConvGST: 0,
                    processingFee: 0,
                    processingFeeGST: 0,
                    fxSpread: 0,
                    totalCharges: 0,
                    totalExtraCost: 0,
                    result: 0,
                    inrDebit: null,
                    effectiveRate: 0,
                    effectiveOverInterbank: 0,
                    chargesPct: 0,
                    hasSpread: false
                },
                transactions: [],
                debounceTimer: null
            };
        },

        computed: {
            isFormValid() {
                if (!this.form.rate || this.form.rate <= 0) return false;
                if (!this.form.amount || this.form.amount <= 0) return false;
                if (!this.form.interbankRate || this.form.interbankRate <= 0) return false;
                return true;
            },
            amountInputLabel() {
                return this.form.amountUnit === 'inr' ? 'INR Amount to Spend' : 'USD Amount to Buy';
            },
            amountInputDisplay() {
                if (this.form.amountUnit === 'inr') return '₹' + this.formatINR(this.form.amount);
                return '$ ' + this.formatUSD(this.form.amount);
            },
            amountInputTooltip() {
                if (this.form.amountUnit === 'inr') return 'Total INR you want to spend. FX conversion GST and processing fee GST will be computed on top.';
                return 'Target USD you want to receive. The tool back-computes how much INR you need to spend including all charges.';
            },
            previewInputLabel() {
                return this.form.amountUnit === 'inr' ? 'INR You Spend' : 'USD You Want';
            },
            previewInputDisplay() {
                if (this.form.amountUnit === 'inr') return '₹' + this.formatINR(this.form.amount);
                return '$ ' + this.formatUSD(this.form.amount);
            },
            previewInputDisplayHtml() {
                if (this.form.amountUnit === 'inr' && this.preview.inrDebit !== null)
                    return '₹' + this.formatINRHtml(this.preview.inrDebit);
                if (this.form.amountUnit === 'inr') return '₹' + this.formatINRHtml(this.form.amount);
                return '$ ' + this.formatUSD(this.form.amount);
            },
            resultLabel() {
                return this.form.amountUnit === 'inr' ? 'USD You Receive' : 'INR You Must Spend';
            },
            resultDisplay() {
                if (this.form.amountUnit === 'inr') return '$ ' + this.formatUSD(this.preview.result);
                return '₹' + this.formatINR(this.preview.result);
            },
            resultDisplayHtml() {
                if (this.form.amountUnit === 'inr') return '$ ' + this.formatUSDHtml(this.preview.result);
                return '₹' + this.formatINRHtml(this.preview.result);
            },
            summary() {
                let totalINRSpent = 0;
                let totalUSDBought = 0;
                let totalGST = 0;
                let totalCharges = 0;
                this.transactions.forEach(t => {
                    totalGST += t.gst || 0;
                    totalINRSpent += t.inrSpent || 0;
                    totalUSDBought += t.usdReceived || 0;
                    totalCharges += t.totalCharges || 0;
                });
                return { totalINRSpent, totalUSDBought, totalGST, totalCharges };
            }
        },

        watch: {
            'form.rate'(newRate) {
                this.form.interbankRate = parseFloat((newRate - 1.75).toFixed(2));
                this.debouncedCalculate();
            }
        },

        mounted() {
            this.loadFromStorage();
            this.calculate();
        },

        methods: {
            debouncedCalculate() {
                clearTimeout(this.debounceTimer);
                this.debounceTimer = setTimeout(() => this.calculate(), FX_DEBOUNCE_DELAY_MS);
            },

            // Rule 32(2)(b) CGST Rules – deemed taxable value for money-changing services
            // Returns the Rule 32(2)(b) CGST taxable value (deemed forex service charge).
            // GST = 18% × this value. Min taxable value ₹250 → min GST ₹45.
            calcRule32(grossINR) {
                if (grossINR <= 100000) {
                    return Math.max(grossINR * 0.01, 250);
                } else if (grossINR <= 1000000) {
                    return 1000 + (grossINR - 100000) * 0.005;
                } else {
                    return Math.min(5500 + (grossINR - 1000000) * 0.001, 60000);
                }
            },

            // Solve grossINR given budget = grossINR + 0.18×rule32(grossINR)
            // Used for the "given INR → find USD" direction.
            solveGrossINR(budget) {
                // Slab 1a: grossINR < 25000 (min taxable value ₹250 applies, GST = ₹45)
                // budget = grossINR + 0.18×250 = grossINR + 45
                let g = budget - 45;
                if (g > 0 && g < 25000) return g;

                // Slab 1b: grossINR ≥ 25000, ≤ 1,00,000  → 1% of grossINR applies
                // budget = grossINR + 0.18×(0.01×grossINR) = grossINR × 1.0018
                g = budget / 1.0018;
                if (g >= 25000 && g <= 100000) return g;

                // Slab 2: 1,00,000 < grossINR ≤ 10,00,000
                // rule32 = 1000 + 0.005×(g-100000)
                // budget = g + 0.18×(1000+0.005×(g-100000)) = g×1.0009 + 90
                g = (budget - 90) / 1.0009;
                if (g > 100000 && g <= 1000000) return g;

                // Slab 3a: grossINR > 10,00,000 (uncapped)
                // rule32 = 5500 + 0.001×(g-1000000)
                // budget = g×1.00018 + 810
                g = (budget - 810) / 1.00018;
                if (g > 1000000 && (5500 + (g - 1000000) * 0.001) < 60000) return g;

                // Slab 3b: capped at rule32 = 60000
                // budget = g + 0.18×60000 = g + 10800
                g = budget - 10800;
                return g > 0 ? g : 0;
            },

            calculate() {
                if (!this.isFormValid) {
                    this.preview.valid = false;
                    return;
                }

                const rate = this.form.rate;
                const ibRate = this.form.interbankRate > 0 ? this.form.interbankRate : rate;
                const amount = this.form.amount;
                const unit = this.form.amountUnit;
                const processingFee = this.form.serviceFee >= 0 ? this.form.serviceFee : 0;
                const processingFeeGST = processingFee * 0.18;
                const fixedCharges = processingFee + processingFeeGST;

                let usdAmount, grossINR, ibCost, rule32Val, fxConvGST, fxSpread, totalCharges,
                    totalExtraCost, result, effectiveRate, effectiveOverInterbank, chargesPct;

                if (unit === 'usd') {
                    // Given USD target → compute total INR to spend
                    usdAmount = amount;
                    grossINR = usdAmount * rate;
                    ibCost = usdAmount * ibRate;
                    rule32Val = this.calcRule32(grossINR);
                    fxConvGST = rule32Val * 0.18;
                    fxSpread = (rate - ibRate) * usdAmount;
                    totalCharges = fxSpread + fxConvGST + processingFee + processingFeeGST;
                    result = grossINR + fxConvGST + processingFee + processingFeeGST;
                    totalExtraCost = totalCharges;
                    effectiveRate = usdAmount > 0 ? result / usdAmount : 0;
                    effectiveOverInterbank = (ibRate > 0 && usdAmount > 0) ? ((result - usdAmount * ibRate) / (usdAmount * ibRate)) * 100 : 0;
                    chargesPct = result > 0 ? (totalCharges / result) * 100 : 0;

                } else {
                    // Given INR budget → back-compute grossINR → USD received (floored to whole dollars)
                    const budget = amount - fixedCharges;
                    grossINR = budget > 0 ? this.solveGrossINR(budget) : 0;
                    usdAmount = Math.floor(grossINR > 0 ? grossINR / rate : 0);
                    grossINR = usdAmount * rate; // recompute from whole-dollar USD
                    ibCost = usdAmount * ibRate;
                    rule32Val = this.calcRule32(grossINR);
                    fxConvGST = rule32Val * 0.18;
                    fxSpread = (rate - ibRate) * usdAmount;
                    totalCharges = fxSpread + fxConvGST + processingFee + processingFeeGST;
                    result = usdAmount;
                    const inrDebit = grossINR + fxConvGST + processingFee + processingFeeGST;
                    totalExtraCost = totalCharges;
                    effectiveRate = usdAmount > 0 ? inrDebit / usdAmount : 0;
                    effectiveOverInterbank = (ibRate > 0 && usdAmount > 0) ? ((inrDebit - usdAmount * ibRate) / (usdAmount * ibRate)) * 100 : 0;
                    chargesPct = inrDebit > 0 ? (totalCharges / inrDebit) * 100 : 0;

                    this.preview = {
                        valid: true,
                        usdAmount, grossINR, ibCost, rule32Val,
                        fxConvGST, processingFee, processingFeeGST,
                        fxSpread, totalCharges, totalExtraCost,
                        result, inrDebit, effectiveRate, effectiveOverInterbank, chargesPct,
                        hasSpread: true
                    };
                    return;
                }

                this.preview = {
                    valid: true,
                    usdAmount, grossINR, ibCost, rule32Val,
                    fxConvGST, processingFee, processingFeeGST,
                    fxSpread, totalCharges, totalExtraCost,
                    result, inrDebit: null, effectiveRate, effectiveOverInterbank, chargesPct,
                    hasSpread: true
                };
            },

            addTransaction() {
                if (!this.isFormValid || !this.preview.valid) return;

                const p = this.preview;
                const txn = {
                    id: Date.now() + '-' + Math.random().toString(36).substr(2, 9),
                    operation: 'buy',
                    date: this.form.date,
                    rate: this.form.rate,
                    interbankRate: this.form.interbankRate || 0,
                    bank: this.form.bank,
                    txnId: this.form.txnId,
                    processingFee: p.processingFee,
                    processingFeeGST: p.processingFeeGST,
                    fxConvGST: p.fxConvGST,
                    rule32Val: p.rule32Val,
                    fxSpread: p.fxSpread,
                    totalCharges: p.totalCharges,
                    gst: p.fxConvGST + p.processingFeeGST,   // total GST for summary
                    effectiveRate: p.effectiveRate,
                    createdAt: new Date().toISOString()
                };

                if (this.form.amountUnit === 'inr') {
                    txn.inrSpent = this.form.amount;
                    txn.usdReceived = p.result;
                } else {
                    txn.inrSpent = p.result;        // computed INR needed
                    txn.usdReceived = this.form.amount;
                }

                this.transactions.unshift(txn);
                this.saveToStorage();
                this.resetForm();
            },

            removeTransaction(index) {
                this.transactions.splice(index, 1);
                this.saveToStorage();
            },

            clearAll() {
                if (confirm('Clear all transactions? This cannot be undone.')) {
                    this.transactions = [];
                    this.saveToStorage();
                }
            },

            resetForm() {
                const today = new Date().toISOString().split('T')[0];
                const defaultAmount = this.form.amountUnit === 'inr' ? 100000 : 1000;
                this.form = Object.assign({}, this.form, {
                    date: today,
                    amount: defaultAmount,
                    serviceFee: 1000,
                    bank: '',
                    txnId: ''
                });
                this.calculate();
            },

            saveToStorage() {
                try {
                    localStorage.setItem(FX_STORAGE_KEY, JSON.stringify(this.transactions));
                } catch (e) {
                    console.warn('FX Tracker: could not save to localStorage:', e);
                }
            },

            loadFromStorage() {
                try {
                    const saved = localStorage.getItem(FX_STORAGE_KEY);
                    if (saved) {
                        this.transactions = JSON.parse(saved);
                    }
                } catch (e) {
                    console.warn('FX Tracker: could not load from localStorage:', e);
                }
            },

            exportData() {
                const data = {
                    tool: 'INR USD FX Tracker',
                    version: '1.0',
                    exportDate: new Date().toISOString(),
                    transactions: this.transactions
                };
                const json = JSON.stringify(data, null, 2);
                const blob = new Blob([json], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'fx-transactions-' + new Date().toISOString().split('T')[0] + '.json';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            },

            importData(event) {
                const file = event.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const data = JSON.parse(e.target.result);
                        if (!data.transactions || !Array.isArray(data.transactions)) {
                            alert('Invalid file format. Please use a file exported from this tool.');
                            event.target.value = '';
                            return;
                        }
                        if (this.transactions.length > 0) {
                            if (!confirm('Merge imported transactions with existing ones? Click OK to merge, or Cancel to abort.')) {
                                event.target.value = '';
                                return;
                            }
                            // Merge — skip duplicates by ID
                            const existingIds = new Set(this.transactions.map(t => t.id));
                            const newTxns = data.transactions.filter(t => !existingIds.has(t.id));
                            this.transactions = [...this.transactions, ...newTxns];
                            // Re-sort by date descending
                            this.transactions.sort((a, b) => b.date.localeCompare(a.date));
                        } else {
                            this.transactions = data.transactions;
                        }
                        this.saveToStorage();
                        event.target.value = '';
                    } catch (error) {
                        alert('Error reading file: Invalid JSON format.');
                        console.error('FX Tracker import error:', error);
                        event.target.value = '';
                    }
                };
                reader.readAsText(file);
            },

            formatINR(amount) {
                if (amount === null || amount === undefined || isNaN(amount)) return '0.00';
                return parseFloat(amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            },
            formatINRHtml(amount) {
                if (amount === null || amount === undefined || isNaN(amount)) return '0<small style="font-size:0.7em">.00</small>';
                const num = parseFloat(amount);
                const whole = Math.floor(num);
                const paise = Math.round((num - whole) * 100).toString().padStart(2, '0');
                return whole.toLocaleString('en-IN') + '<small style="font-size:0.7em">.' + paise + '</small>';
            },

            formatUSD(amount) {
                if (amount === null || amount === undefined || isNaN(amount)) return '0.00';
                return parseFloat(amount).toFixed(2);
            },
            formatUSDHtml(amount) {
                if (amount === null || amount === undefined || isNaN(amount)) return '0<small style="font-size:0.7em">.00</small>';
                const num = parseFloat(amount);
                const whole = Math.floor(num);
                const cents = Math.round((num - whole) * 100).toString().padStart(2, '0');
                return whole.toLocaleString('en-US') + '<small style="font-size:0.7em">.' + cents + '</small>';
            }
        }
    });

    app.mount(container);
};

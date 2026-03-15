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

                        <!-- Date -->
                        <div class="input-group">
                            <label>Transaction Date:</label>
                            <input
                                type="date"
                                v-model="form.date"
                                @change="ibRateError = ''; calculate()"
                                style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem;">
                        </div>

                        <!-- Rates: Bank quoted + Interbank side by side -->
                        <div class="input-group">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                                <div>
                                    <label style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                                        <span>Bank Rate:&nbsp;<strong>₹{{ parseFloat(form.rate).toFixed(4) }}</strong></span>
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
                                        <span>Interbank Rate:&nbsp;<strong v-if="form.interbankRate > 0">₹{{ parseFloat(form.interbankRate).toFixed(4) }}</strong></span>
                                        <span class="help-icon help-icon-wide" data-tooltip="Mid-market rate (e.g. from Google or RBI reference rate). Auto-set to Bank Rate − 1.75. You can override it manually.">ℹ️</span>
                                    </label>
                                    <div class="unit-buttons" style="align-items: center;">
                                        <input
                                            type="number"
                                            v-model.number="form.interbankRate"
                                            min="0.01"
                                            step="0.01"
                                            placeholder="e.g. 91.85"
                                            style="flex: 1; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem;"
                                            @input="debouncedCalculate">
                                        <button
                                            type="button"
                                            @click="fetchInterbankRate"
                                            :disabled="ibRateLoading || !form.date"
                                            style="white-space: nowrap;"
                                            title="Fetch interbank rate from Stooq for the selected date">
                                            {{ ibRateLoading ? '…' : 'Auto' }}
                                        </button>
                                    </div>
                                    <div v-if="ibRateError" style="font-size: 0.8em; color: #c0392b; margin-top: 0.25rem; display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;">
                                        <span>{{ ibRateError }}</span>
                                        <button
                                            type="button"
                                            @click="ibRateError = ''"
                                            title="Dismiss"
                                            aria-label="Dismiss message"
                                            style="border: none; background: transparent; color: #c0392b; cursor: pointer; font-size: 0.9em; line-height: 1; padding: 0;">
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Processing Fee -->
                        <div class="input-group">
                            <label style="display: flex; justify-content: space-between; align-items: center;">
                                <span>Processing Fee:&nbsp;<strong>₹{{ formatINR(form.serviceFee) }}</strong></span>
                                <span class="help-icon help-icon-wide" data-tooltip="Bank's flat processing / service fee for this transaction. Set to 0 if your bank waives it. 18% GST is levied on this separately.">ℹ️</span>
                            </label>
                            <input
                                type="number"
                                v-model.number="form.serviceFee"
                                min="0"
                                step="100"
                                @input="debouncedCalculate">
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

                        <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1.75rem;">
                            <button
                                @click="addTransaction"
                                class="share-button"
                                :disabled="!isFormValid || !preview.valid">
                                ➕ Transaction
                            </button>
                        </div>
                        <p style="font-size: 0.85em; color: #999; margin-top: 0.85rem;">
                            💡 Transactions are saved in your browser automatically. Use Import/Export to back up or transfer data.
                        </p>
                    </div>

                    <!-- Right Column: FX Analysis -->
                    <div class="sip-outputs">
                        <h3 style="margin-top: 0;">📈 Summary</h3>

                        <div v-if="preview.valid">
                            <table class="summary-table" style="margin-bottom: 1rem;">
                                <tbody>
                                    <tr>
                                        <td style="display: flex; justify-content: space-between; align-items: center;"><strong>Effective Rate</strong> <span class="help-icon help-icon-wide" data-tooltip="Actual cost per USD after all charges including spread.">ℹ️</span></td>
                                        <td class="highlight"><span style="cursor: default; opacity: 1; font-size: 1.2em;">₹{{ preview.effectiveRate.toFixed(2) }}</span></td>
                                    </tr>
                                    <tr>
                                        <td style="display: flex; justify-content: space-between; align-items: center;"><strong>Transaction Cost</strong> <span class="help-icon help-icon-wide" data-tooltip="All charges (markup + GST + processing fee) as a percentage of total INR spent.">ℹ️</span></td>
                                        <td class="highlight"><span style="cursor: default; opacity: 1; font-size: 1.2em;">{{ preview.chargesPct.toFixed(2) }}%</span></td>
                                    </tr>
                                    <tr v-if="preview.tcs > 0">
                                        <td style="display: flex; justify-content: space-between; align-items: center;"><strong>TCS Drag</strong> <span class="help-icon help-icon-wide" data-tooltip="TCS as a percentage of total permanent charges (markup + GST). Since TCS is refundable, this shows the temporary cash-flow burden it adds on top of your real costs.">ℹ️</span></td>
                                        <td class="highlight"><span style="cursor: default; opacity: 1; font-size: 1.2em;">{{ preview.tcsDrag.toFixed(2) }}%</span></td>
                                    </tr>
                                </tbody>
                            </table>

                            <h3 style="margin: 0 0 0.5rem 0;">🧾 FX Analysis</h3>
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
                                        <td v-html="'₹' + formatINRHtml(preview.ibCost)"></td>
                                    </tr>
                                    <tr>
                                        <td style="display: flex; justify-content: space-between; align-items: center;">
                                            <span>💸 Total Charges</span>
                                            <span class="help-icon help-icon-wide" data-tooltip="Sum of all charges over the interbank cost: Forex Markup + Bank Processing Fee + FX Conversion GST + GST on Processing Fee.">ℹ️</span>
                                        </td>
                                        <td v-html="'₹' + formatINRHtml(preview.totalCharges)"></td>
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
                                        <td v-html="'₹' + formatINRHtml(preview.fxSpread)"></td>
                                    </tr>
                                    <tr v-if="preview.processingFee > 0">
                                        <td style="display: flex; justify-content: space-between; align-items: center;">
                                            <span>Bank Processing Fee</span>
                                            <span class="help-icon help-icon-wide" data-tooltip="Flat fee charged by the bank for processing the forex transaction. 18% GST is charged separately on this.">ℹ️</span>
                                        </td>
                                        <td v-html="'₹' + formatINRHtml(preview.processingFee)"></td>
                                    </tr>

                                    <!-- Taxes -->
                                    <tr style="background: #f0f7ff;">
                                        <td colspan="2" style="padding: 0.4rem 0.75rem; font-size: 0.8em; color: #2980b9; font-weight: 700; letter-spacing: 0.04em;">🏛️ TAXES</td>
                                    </tr>
                                    <tr>
                                        <td style="display: flex; justify-content: space-between; align-items: center;">
                                            <span>FX Conversion GST</span>
                                            <span class="help-icon help-icon-wide" data-tooltip="Rule 32(2)(b) CGST: ≤₹1L → 1% of gross INR (min ₹250); ₹1L–₹10L → ₹1,000 + 0.5% of excess; >₹10L → ₹5,500 + 0.1% of excess (max ₹60,000). GST = 18% × taxable value (min ₹45).">ℹ️</span>
                                        </td>
                                        <td v-html="'₹' + formatINRHtml(preview.fxConvGST)"></td>
                                    </tr>
                                    <tr v-if="preview.processingFeeGST > 0">
                                        <td style="display: flex; justify-content: space-between; align-items: center;">
                                            <span>GST on Processing Fee (18%)</span>
                                            <span class="help-icon help-icon-wide" data-tooltip="GST charged on the bank's flat processing fee at 18%. Separate from FX Conversion GST.">ℹ️</span>
                                        </td>
                                        <td v-html="'₹' + formatINRHtml(preview.processingFeeGST)"></td>
                                    </tr>
                                    <tr v-if="preview.tcs > 0">
                                        <td style="display: flex; justify-content: space-between; align-items: center;">
                                            <span>TCS @ 20% (refundable)</span>
                                            <span class="help-icon help-icon-wide" data-tooltip="Tax Collected at Source under LRS. Levied at 20% on the gross INR amount exceeding ₹10,00,000 (Bank Rate × USD bought). Fully refundable when filing your ITR.">ℹ️</span>
                                        </td>
                                        <td v-html="'₹' + formatINRHtml(preview.tcs)"></td>
                                    </tr>

                                    <tr style="background: #e8f5e9;">
                                        <td><strong>✅ {{ resultLabel }}</strong></td>
                                        <td class="highlight">
                                            <strong style="font-size: 1.15em;" v-html="resultDisplayHtml"></strong>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div id="fx-breakdown-chart" style="width: 100%; height: 420px; margin-top: 1.5rem;"></div>
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
                        <div style="background: #f0f7ff; border: 1px solid #c3d9f5; border-radius: 8px; padding: 1rem; text-align: center;">
                            <div style="font-size: 0.8em; color: #888; margin-bottom: 0.25rem;">Total USD Bought</div>
                            <div style="font-size: 1.1em; font-weight: 700; color: #2980b9;" v-html="'$' + formatUSDHtml(summary.totalUSDBought)"></div>
                            <div v-if="summary.totalUSDBought > 0" style="font-size: 0.8em; color: #2980b9; margin-top: 0.2rem;">Eff Rate: ₹{{ ((summary.totalINRSpent - summary.totalTCS) / summary.totalUSDBought).toFixed(4) }}</div>
                        </div>
                        <div style="background: #fff3f3; border: 1px solid #f5c6c6; border-radius: 8px; padding: 1rem; text-align: center;">
                            <div style="font-size: 0.8em; color: #888; margin-bottom: 0.25rem;">Total INR Spent</div>
                            <div style="font-size: 1.1em; font-weight: 700; color: #e74c3c;" v-html="'₹' + formatINRHtml(summary.totalINRSpent)"></div>
                            <div v-if="summary.totalINRSpent > 0" style="font-size: 0.8em; color: #e74c3c; margin-top: 0.2rem;" v-html="'Ex-TCS: ₹' + formatINRHtml(summary.totalINRSpent - summary.totalTCS)"></div>
                        </div>
                        <div style="background: #fff8e1; border: 1px solid #ffe08a; border-radius: 8px; padding: 1rem; text-align: center;">
                            <div style="font-size: 0.8em; color: #888; margin-bottom: 0.25rem;">Total Charges</div>
                            <div style="font-size: 1.1em; font-weight: 700; color: #e67e22;" v-html="'₹' + formatINRHtml(summary.totalCharges)"></div>
                            <div v-if="summary.totalIBCost > 0" style="font-size: 0.8em; color: #e67e22; margin-top: 0.2rem;">{{ (summary.totalCharges / summary.totalIBCost * 100).toFixed(2) }}%</div>
                        </div>
                        <div style="background: #fff3e0; border: 1px solid #ffcc80; border-radius: 8px; padding: 1rem; text-align: center;">
                            <div style="font-size: 0.8em; color: #888; margin-bottom: 0.25rem;">Total GST Paid</div>
                            <div style="font-size: 1.1em; font-weight: 700; color: #d35400;" v-html="'₹' + formatINRHtml(summary.totalGST)"></div>
                            <div v-if="summary.totalIBCost > 0" style="font-size: 0.8em; color: #d35400; margin-top: 0.2rem;">{{ (summary.totalGST / summary.totalIBCost * 100).toFixed(2) }}%</div>
                        </div>
                        <div style="background: #f3f0ff; border: 1px solid #c5b8f5; border-radius: 8px; padding: 1rem; text-align: center;">
                            <div style="font-size: 0.8em; color: #888; margin-bottom: 0.25rem;">Total TCS Paid</div>
                            <div style="font-size: 1.1em; font-weight: 700; color: #6c3fc0;" v-html="'₹' + formatINRHtml(summary.totalTCS)"></div>
                            <div v-if="summary.totalINRSpent > 0" style="font-size: 0.8em; color: #6c3fc0; margin-top: 0.2rem;">{{ (summary.totalTCS / (summary.totalINRSpent - summary.totalTCS) * 100).toFixed(2) }}%</div>
                        </div>
                    </div>

                    <!-- Detail Table -->
                    <div class="table-responsive">
                        <table class="summary-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Bank</th>
                                    <th>Transaction ID</th>
                                    <th>USD Bought</th>
                                    <th>INR Spent</th>
                                    <th>Bank Charges</th>
                                    <th>GST Paid</th>
                                    <th>TCS Paid</th>
                                    <th>Transaction Cost</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(txn, i) in transactions" :key="txn.id">
                                    <td style="white-space: nowrap;">{{ txn.date }}</td>
                                    <td>{{ txn.bank || '–' }}</td>
                                    <td style="font-family: monospace; font-size: 0.85em;">{{ txn.txnId || '–' }}</td>
                                    <td style="text-align: right;" v-html="'$' + formatUSDHtml(txn.usdReceived)"></td>
                                    <td style="text-align: right;" v-html="'₹' + formatINRHtml(txn.inrSpent)"></td>
                                    <td style="text-align: right;" v-html="(txn.fxSpread != null) ? '₹' + formatINRHtml((txn.fxSpread || 0) + (txn.processingFee || 0)) : '–'"></td>
                                    <td style="text-align: right;" v-html="txn.gst != null ? '₹' + formatINRHtml(txn.gst) : '–'"></td>
                                    <td style="text-align: right;" v-html="txn.tcs != null ? '₹' + formatINRHtml(txn.tcs) : '–'"></td>
                                    <td style="text-align: right;">{{ (txn.interbankRate > 0 && txn.usdReceived > 0) ? (((txn.fxSpread || 0) + (txn.processingFee || 0) + (txn.gst || 0)) / (txn.interbankRate * txn.usdReceived) * 100).toFixed(2) + '%' : '–' }}</td>
                                    <td style="text-align: center;">
                                        <button
                                            v-if="i === 0"
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
                </div>

                <div v-if="transactions.length === 0" class="investment-plan" style="text-align: center; padding: 2rem; color: #999;">
                    <p>No transactions yet. Fill in the form and click <strong>Transaction</strong> to get started.</p>
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
                ibRateLoading: false,
                ibRateError: '',
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
                    tcs: 0,
                    tcsDrag: 0,
                    hasSpread: false
                },
                transactions: [],
                debounceTimer: null,
                suppressAutoInterbankSync: false,
                fxBreakdownChart: null,
                fxBreakdownResizeHandler: null
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
                if (this.form.amountUnit === 'inr') return '₹' + Math.round(this.form.amount).toLocaleString('en-IN');
                return '$' + Math.round(this.form.amount).toLocaleString('en-US');
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
                return '$' + this.formatUSDHtml(this.form.amount);
            },
            resultLabel() {
                return this.form.amountUnit === 'inr' ? 'USD You Receive' : 'INR You Must Spend';
            },
            resultDisplay() {
                if (this.form.amountUnit === 'inr') return '$' + this.formatUSD(this.preview.result);
                return '₹' + this.formatINR(this.preview.result);
            },
            resultDisplayHtml() {
                if (this.form.amountUnit === 'inr') return '$' + this.formatUSDHtml(this.preview.result);
                return '₹' + this.formatINRHtml(this.preview.result);
            },
            summary() {
                let totalINRSpent = 0;
                let totalUSDBought = 0;
                let totalGST = 0;
                let totalCharges = 0;
                let totalTCS = 0;
                let totalIBCost = 0;
                this.transactions.forEach(t => {
                    totalGST += t.gst || 0;
                    totalINRSpent += t.inrSpent || 0;
                    totalUSDBought += t.usdReceived || 0;
                    totalCharges += t.totalCharges || 0;
                    totalTCS += t.tcs || 0;
                    totalIBCost += (t.interbankRate || 0) * (t.usdReceived || 0);
                });
                return { totalINRSpent, totalUSDBought, totalGST, totalCharges, totalTCS, totalIBCost };
            },
            fyGrossINR() {
                // Sum of (rate × usdReceived) for all transactions in the same Indian financial year
                // as the current form date (FY = Apr 1 – Mar 31).
                const formDate = this.form.date ? new Date(this.form.date) : new Date();
                const fy = formDate.getMonth() < 3 ? formDate.getFullYear() - 1 : formDate.getFullYear();
                const fyStart = new Date(fy, 3, 1);       // Apr 1
                const fyEnd   = new Date(fy + 1, 2, 31);  // Mar 31 next year
                return this.transactions.reduce((sum, t) => {
                    const d = new Date(t.date);
                    if (d >= fyStart && d <= fyEnd) sum += (t.rate || 0) * (t.usdReceived || 0);
                    return sum;
                }, 0);
            }
        },

        watch: {
            form: {
                handler() {
                    this.saveToStorage();
                },
                deep: true
            },
            'form.rate'(newRate) {
                if (this.suppressAutoInterbankSync) return;
                this.form.interbankRate = parseFloat((newRate - 1.75).toFixed(2));
                this.debouncedCalculate();
            }
        },

        mounted() {
            this.loadFromStorage();
            this.calculate();
        },

        beforeUnmount() {
            if (this.fxBreakdownResizeHandler) {
                window.removeEventListener('resize', this.fxBreakdownResizeHandler);
                this.fxBreakdownResizeHandler = null;
            }
            if (this.fxBreakdownChart) {
                this.fxBreakdownChart.dispose();
                this.fxBreakdownChart = null;
            }
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

            // Binary search: find grossINR such that grossINR + GST(grossINR) + TCS(grossINR) = budget.
            // tolerance: within ₹0.01 of budget.
            solveGrossINR(budget, calcTCS) {
                let low = 0;
                let high = budget;
                const totalCost = (g) => {
                    const gst = this.calcRule32(g) * 0.18;
                    const tcs = calcTCS ? calcTCS(g) : 0;
                    return g + gst + tcs;
                };
                for (let i = 0; i < 64; i++) {
                    const mid = (low + high) / 2;
                    if (high - low < 0.01) break;
                    if (totalCost(mid) < budget) low = mid;
                    else high = mid;
                }
                return (low + high) / 2;
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
                    totalExtraCost, result, effectiveRate, effectiveOverInterbank, chargesPct, tcs, tcsDrag;

                if (unit === 'usd') {
                    // Given USD target → compute total INR to spend
                    usdAmount = amount;
                    grossINR = usdAmount * rate;
                    ibCost = usdAmount * ibRate;
                    rule32Val = this.calcRule32(grossINR);
                    fxConvGST = rule32Val * 0.18;
                    fxSpread = (rate - ibRate) * usdAmount;
                    totalCharges = fxSpread + fxConvGST + processingFee + processingFeeGST;
                    const runningUSD = this.fyGrossINR;
                    tcs = Math.min(grossINR, Math.max(0, runningUSD + grossINR - 1000000)) * 0.20;
                    result = grossINR + fxConvGST + processingFee + processingFeeGST + tcs;
                    const inrExTCS = result - tcs;
                    totalExtraCost = totalCharges;
                    effectiveRate = usdAmount > 0 ? inrExTCS / usdAmount : 0;
                    effectiveOverInterbank = (ibRate > 0 && usdAmount > 0) ? ((inrExTCS - usdAmount * ibRate) / (usdAmount * ibRate)) * 100 : 0;
                    chargesPct = inrExTCS > 0 ? (totalCharges / inrExTCS) * 100 : 0;
                    tcsDrag = (ibCost + totalCharges) > 0 ? (tcs / (ibCost + totalCharges)) * 100 : 0;

                } else {
                    // Given INR budget → back-compute grossINR → USD received (floored to whole dollars)
                    // Binary search accounts for GST + cumulative TCS within budget.
                    const running = this.fyGrossINR;
                    const calcTCS = (g) => Math.min(g, Math.max(0, running + g - 1000000)) * 0.20;

                    const budget = amount - fixedCharges;
                    grossINR = budget > 0 ? this.solveGrossINR(budget, calcTCS) : 0;
                    usdAmount = Math.floor(grossINR > 0 ? grossINR / rate : 0);
                    grossINR = usdAmount * rate; // recompute from whole-dollar USD
                    ibCost = usdAmount * ibRate;
                    rule32Val = this.calcRule32(grossINR);
                    fxConvGST = rule32Val * 0.18;
                    fxSpread = (rate - ibRate) * usdAmount;
                    totalCharges = fxSpread + fxConvGST + processingFee + processingFeeGST;
                    tcs = calcTCS(grossINR);
                    result = usdAmount;
                    const inrDebit = grossINR + fxConvGST + processingFee + processingFeeGST + tcs;
                    const inrDebitExTCS = grossINR + fxConvGST + processingFee + processingFeeGST;
                    totalExtraCost = totalCharges;
                    effectiveRate = usdAmount > 0 ? inrDebitExTCS / usdAmount : 0;
                    effectiveOverInterbank = (ibRate > 0 && usdAmount > 0) ? ((inrDebitExTCS - usdAmount * ibRate) / (usdAmount * ibRate)) * 100 : 0;
                    chargesPct = inrDebitExTCS > 0 ? (totalCharges / inrDebitExTCS) * 100 : 0;
                    tcsDrag = (ibCost + totalCharges) > 0 ? (tcs / (ibCost + totalCharges)) * 100 : 0;

                    this.preview = {
                        valid: true,
                        usdAmount, grossINR, ibCost, rule32Val,
                        fxConvGST, processingFee, processingFeeGST,
                        fxSpread, totalCharges, totalExtraCost,
                        result, inrDebit, effectiveRate, effectiveOverInterbank, chargesPct,
                        tcs, tcsDrag,
                        hasSpread: true
                    };
                    this.$nextTick(() => this.renderFXBreakdownChart());
                    return;
                }

                this.preview = {
                    valid: true,
                    usdAmount, grossINR, ibCost, rule32Val,
                    fxConvGST, processingFee, processingFeeGST,
                    fxSpread, totalCharges, totalExtraCost,
                    result, inrDebit: null, effectiveRate, effectiveOverInterbank, chargesPct,
                    tcs, tcsDrag,
                    hasSpread: true
                };
                this.$nextTick(() => this.renderFXBreakdownChart());
            },

            renderFXBreakdownChart() {
                if (!this.preview.valid) return;
                if (typeof echarts === 'undefined') return;

                const chartDom = document.getElementById('fx-breakdown-chart');
                if (!chartDom) return;

                if (!this.fxBreakdownChart) {
                    this.fxBreakdownChart = echarts.init(chartDom);
                    if (!this.fxBreakdownResizeHandler) {
                        this.fxBreakdownResizeHandler = () => this.fxBreakdownChart?.resize();
                        window.addEventListener('resize', this.fxBreakdownResizeHandler);
                    }
                }

                const p = this.preview;
                const data = [
                    { value: Math.max(0, p.ibCost || 0), name: 'Forex Interbank Cost', itemStyle: { color: '#4CAF50' } },
                    { value: Math.max(0, (p.fxSpread || 0) + (p.processingFee || 0)), name: 'FX Charges', itemStyle: { color: '#ef4444' } },
                    { value: Math.max(0, (p.fxConvGST || 0) + (p.processingFeeGST || 0)), name: 'GST', itemStyle: { color: '#b91c1c' } }
                ];
                if ((p.tcs || 0) > 0) {
                    data.push({ value: Math.max(0, p.tcs || 0), name: 'TCS', itemStyle: { color: '#FFC107' } });
                }

                const filtered = data.filter(d => d.value > 0);
                const total = filtered.reduce((sum, d) => sum + d.value, 0);
                const inrSpent = this.form.amountUnit === 'inr' ? (p.inrDebit || 0) : (p.result || 0);
                const usdBought = this.form.amountUnit === 'inr' ? (p.result || 0) : (p.usdAmount || 0);
                const inrSpentText = '₹' + Number(inrSpent).toLocaleString('en-IN', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                });
                const usdBoughtText = '$' + Number(usdBought).toLocaleString('en-US', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                });

                const fmt = (v) => '₹' + Number(v).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                this.fxBreakdownChart.setOption({
                    toolbox: {
                        feature: { saveAsImage: { title: 'Save as Image' } }
                    },
                    tooltip: {
                        formatter: function (x) {
                            return x.marker + '<strong>' + x.name + '</strong><br>' + fmt(x.value) + ' (' + x.percent.toFixed(2) + '%)';
                        }
                    },
                    legend: { bottom: 0 },
                    series: [
                        {
                            name: 'FX Cost Composition',
                            type: 'pie',
                            radius: ['50%', '74%'],
                            avoidLabelOverlap: true,
                            label: {
                                formatter: function (x) {
                                    return x.name + '\n' + x.percent.toFixed(2) + '%';
                                }
                            },
                            data: filtered
                        }
                    ],
                    graphic: {
                        type: 'text',
                        left: 'center',
                        top: 'middle',
                        style: {
                            text: '{value|' + inrSpentText + '}\n{mid|spent for}\n{value|' + usdBoughtText + '}',
                            rich: {
                                value: {
                                    fontSize: 15,
                                    fontWeight: 700,
                                    fill: '#1f2937',
                                    lineHeight: 18
                                },
                                mid: {
                                    fontSize: 10,
                                    fontWeight: 600,
                                    fill: '#64748b',
                                    lineHeight: 14
                                }
                            },
                            textAlign: 'center',
                            textVerticalAlign: 'middle',
                            lineHeight: 15
                        }
                    }
                });
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
                    tcs: p.tcs,
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
                this.form.txnId = '';
                this.calculate();
            },

            removeTransaction(index) {
                this.transactions.splice(index, 1);
                this.saveToStorage();
                this.calculate();
            },

            async fetchInterbankRate() {
                if (!this.form.date) return;
                this.ibRateLoading = true;
                this.ibRateError = '';
                try {
                    const target = this.form.date; // YYYY-MM-DD
                    const d2 = target.replace(/-/g, '');
                    const fromDate = new Date(target);
                    fromDate.setDate(fromDate.getDate() - 4);
                    const d1 = fromDate.toISOString().split('T')[0].replace(/-/g, '');
                    const stooqUrl = `https://stooq.com/q/d/l/?s=usdinr&d1=${d1}&d2=${d2}&i=d`;
                    const url = `https://corsproxy.io/?url=${encodeURIComponent(stooqUrl)}`;
                    const resp = await fetch(url);
                    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
                    const text = await resp.text();
                    const lines = text.trim().split('\n').filter(l => l.trim());
                    if (lines.length < 2) throw new Error('No data available for this period');
                    // Find exact date row; fallback to last available row
                    const dataLines = lines.slice(1); // skip header
                    const exactRow = dataLines.find(l => l.startsWith(target));
                    if (exactRow) {
                        const cols = exactRow.split(',');
                        const open = parseFloat(cols[1]);
                        if (isNaN(open) || open <= 0) throw new Error('Invalid rate received');
                        this.form.interbankRate = open;
                    } else {
                        // Use Close of most recent available day
                        const lastRow = dataLines[dataLines.length - 1];
                        const cols = lastRow.split(',');
                        const close = parseFloat(cols[4]);
                        if (isNaN(close) || close <= 0) throw new Error('Invalid rate received');
                        this.form.interbankRate = close;
                        this.ibRateError = `No data for ${target}; using Close from ${cols[0]}`;
                    }
                    this.debouncedCalculate();
                } catch (e) {
                    this.ibRateError = 'Could not fetch rate: ' + e.message;
                } finally {
                    this.ibRateLoading = false;
                }
            },

            clearAll() {
                if (confirm('Clear all transactions? This cannot be undone.')) {
                    this.transactions = [];
                    this.saveToStorage();
                }
            },

            resetForm() {
                this.form = Object.assign({}, this.form, { txnId: '' });
                this.calculate();
            },

            saveToStorage() {
                try {
                    const data = {
                        transactions: this.transactions,
                        formPrefs: {
                            amountUnit: this.form.amountUnit,
                            rate: this.form.rate,
                            interbankRate: this.form.interbankRate,
                            amount: this.form.amount,
                            serviceFee: this.form.serviceFee,
                            bank: this.form.bank
                        }
                    };
                    localStorage.setItem(FX_STORAGE_KEY, JSON.stringify(data));
                } catch (e) {
                    console.warn('FX Tracker: could not save to localStorage:', e);
                }
            },

            loadFromStorage() {
                try {
                    const saved = localStorage.getItem(FX_STORAGE_KEY);
                    if (saved) {
                        const parsed = JSON.parse(saved);
                        // Backward compatibility: older versions stored only transactions array.
                        if (Array.isArray(parsed)) {
                            this.transactions = parsed;
                        } else {
                            this.transactions = Array.isArray(parsed.transactions) ? parsed.transactions : [];
                            if (parsed.formPrefs && typeof parsed.formPrefs === 'object') {
                                this.suppressAutoInterbankSync = true;
                                this.form = Object.assign({}, this.form, {
                                    amountUnit: parsed.formPrefs.amountUnit || this.form.amountUnit,
                                    rate: parsed.formPrefs.rate || this.form.rate,
                                    interbankRate: parsed.formPrefs.interbankRate || this.form.interbankRate,
                                    amount: parsed.formPrefs.amount || this.form.amount,
                                    serviceFee: parsed.formPrefs.serviceFee || this.form.serviceFee,
                                    bank: parsed.formPrefs.bank || ''
                                });
                                this.suppressAutoInterbankSync = false;
                            }
                        }
                    }
                    // Always start with today's date and a blank transaction id.
                    this.form.date = new Date().toISOString().split('T')[0];
                    this.form.txnId = '';
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

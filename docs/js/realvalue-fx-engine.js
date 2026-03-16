// RealValue FX Engine (Vue.js)
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
                                        <span class="help-icon help-icon-wide" data-tooltip="Mid-market rate (e.g. from Google or RBI reference rate). It auto-follows Bank Rate − 1.75 until you set a custom value.">ℹ️</span>
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

                        <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.75rem; margin-top: 1.75rem;">
                            <p style="font-size: 0.85em; color: #999; margin: 0; flex: 1;">
                                💡 Transactions are saved in your browser to track remittance for TCS computations when it crosses 10 lakhs in a FY.
                            </p>
                            <button
                                @click="addTransaction"
                                class="share-button"
                                style="flex-shrink: 0;"
                                :disabled="!isFormValid || !preview.valid">
                                ➕ Transaction
                            </button>
                        </div>
                    </div>

                    <!-- Right Column: FX Analysis -->
                    <div class="sip-outputs">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                            <h3 style="margin: 0;">🧾 FX Analysis</h3>
                            <div style="display: flex; gap: 0.5rem; flex-shrink: 0;">
                                <button
                                    v-if="preview.valid"
                                    type="button"
                                    class="share-button"
                                    @click="shareCalculation"
                                    style="min-width: 110px;">
                                    {{ shareButtonText }}
                                </button>
                                <button
                                    v-if="preview.valid"
                                    type="button"
                                    class="share-button"
                                    @click="copyJSON"
                                    style="min-width: 110px;">
                                    {{ copyButtonText }}
                                </button>
                            </div>
                        </div>

                        <div v-if="preview.valid">
                            <table class="summary-table">
                                <tbody>
                                    <tr style="background: #fffde7;">
                                        <td><strong>💸 {{ previewInputLabel }}</strong></td>
                                        <td class="highlight">
                                            <strong style="font-size: 1.15em;" v-html="previewInputDisplayHtml"></strong>
                                        </td>
                                    </tr>

                                    <!-- FX Interbank Cost + Total Charges -->
                                    <tr>
                                        <td style="display: flex; justify-content: space-between; align-items: center;">
                                            <span>FX Interbank</span>
                                            <span class="help-icon help-icon-wide" data-tooltip="What you'd pay at the mid-market (interbank) rate: USD amount × Interbank Rate. This is the baseline cost with no provider charges.">ℹ️</span>
                                        </td>
                                        <td v-html="'₹' + formatINRHtml(preview.ibCost)"></td>
                                    </tr>
                                    <tr>
                                        <td style="display: flex; justify-content: space-between; align-items: center;">
                                            <span>FX Charges + Taxes</span>
                                            <span class="help-icon help-icon-wide" data-tooltip="Sum of all charges over interbank cost: FX Markup + Processing Fee + FX Conversion GST + GST on Processing Fee.">ℹ️</span>
                                        </td>
                                        <td v-html="'₹' + formatINRHtml(preview.totalCharges)"></td>
                                    </tr>
                                    <tr>
                                        <td style="display: flex; justify-content: space-between; align-items: center;"><strong>Transaction Cost</strong> <span class="help-icon help-icon-wide" data-tooltip="FX Charges + Taxes as a percentage of FX Interbank Cost.">ℹ️</span></td>
                                        <td class="highlight"><span style="cursor: default; opacity: 1; font-size: 1.05em;">{{ preview.chargesPct.toFixed(2) }}%</span></td>
                                    </tr>

                                    <!-- FX Charges -->
                                    <tr style="background: #f0f7ff;">
                                        <td style="padding: 0.4rem 0.75rem; font-size: 0.8em; color: #2980b9; font-weight: 700; letter-spacing: 0.04em;">💸 FX CHARGES</td>
                                        <td style="padding: 0.4rem 0.75rem; text-align: right; font-size: 0.9em; color: #2980b9; font-weight: 700;" v-html="'₹' + formatINRHtml((preview.fxSpread || 0) + (preview.processingFee || 0))"></td>
                                    </tr>
                                    <tr>
                                        <td style="display: flex; justify-content: space-between; align-items: center;">
                                            <span>Forex Markup</span>
                                            <span class="help-icon help-icon-wide" data-tooltip="Provider spread over the interbank rate: (Quoted Rate − Interbank Rate) × USD amount.">ℹ️</span>
                                        </td>
                                        <td v-html="'₹' + formatINRHtml(preview.fxSpread)"></td>
                                    </tr>
                                    <tr v-if="preview.processingFee > 0">
                                        <td style="display: flex; justify-content: space-between; align-items: center;">
                                            <span>Processing Fee</span>
                                            <span class="help-icon help-icon-wide" data-tooltip="Flat fee charged by the provider for processing the forex transaction. 18% GST is charged separately on this.">ℹ️</span>
                                        </td>
                                        <td v-html="'₹' + formatINRHtml(preview.processingFee)"></td>
                                    </tr>

                                    <!-- Taxes -->
                                    <tr style="background: #f0f7ff;">
                                        <td style="padding: 0.4rem 0.75rem; font-size: 0.8em; color: #2980b9; font-weight: 700; letter-spacing: 0.04em;">🏛️ TAXES</td>
                                        <td style="padding: 0.4rem 0.75rem; text-align: right; font-size: 0.9em; color: #2980b9; font-weight: 700;" v-html="'₹' + formatINRHtml((preview.fxConvGST || 0) + (preview.processingFeeGST || 0))"></td>
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
                                    <tr v-if="preview.tcs > 0" style="background: #f0f7ff;">
                                        <td style="display: flex; justify-content: space-between; align-items: center; padding: 0.4rem 0.75rem; font-size: 0.8em; color: #2980b9; font-weight: 700; letter-spacing: 0.04em;">
                                            <span>💰 TCS @ 20% (refundable)</span>
                                            <span class="help-icon help-icon-wide help-icon-above" data-tooltip="Tax Collected at Source under LRS. Levied at 20% on the gross INR amount exceeding ₹10,00,000 (Bank Rate × USD bought). You can claim this as tax credit in your ITR, and also submit Form 12BAA to your employer to adjust salary TDS where applicable.">ℹ️</span>
                                        </td>
                                        <td style="padding: 0.4rem 0.75rem; text-align: right; font-size: 0.9em; color: #2980b9; font-weight: 700;" v-html="'₹' + formatINRHtml(preview.tcs)"></td>
                                    </tr>

                                    <tr style="background: #e8f5e9;">
                                        <td><strong>✅ {{ resultLabel }}</strong></td>
                                        <td class="highlight">
                                            <strong style="font-size: 1.15em;" v-html="resultDisplayHtml"></strong>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div id="fx-breakdown-chart" style="width: 100%; height: 480px; margin-top: 1.5rem;"></div>
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
                        <div style="background: #f3f0ff; border: 1px solid #c5b8f5; border-radius: 8px; padding: 1rem; text-align: center;">
                            <div style="font-size: 0.8em; color: #888; margin-bottom: 0.25rem;">Total TCS Paid</div>
                            <div style="font-size: 1.1em; font-weight: 700; color: #6c3fc0;" v-html="'₹' + formatINRHtml(summary.totalTCS)"></div>
                            <div v-if="summary.totalINRSpent > 0" style="font-size: 0.8em; color: #6c3fc0; margin-top: 0.2rem;">{{ (summary.totalTCS / (summary.totalINRSpent - summary.totalTCS) * 100).toFixed(2) }}%</div>
                        </div>
                        <div style="background: #fff8e1; border: 1px solid #ffe08a; border-radius: 8px; padding: 1rem; text-align: center;">
                            <div style="font-size: 0.8em; color: #888; margin-bottom: 0.25rem;">Total FX Charges</div>
                            <div style="font-size: 1.1em; font-weight: 700; color: #e67e22;" v-html="'₹' + formatINRHtml(summary.totalCharges)"></div>
                            <div v-if="summary.totalIBCost > 0" style="font-size: 0.8em; color: #e67e22; margin-top: 0.2rem;">{{ (summary.totalCharges / summary.totalIBCost * 100).toFixed(2) }}%</div>
                        </div>
                        <div style="background: #fff3e0; border: 1px solid #ffcc80; border-radius: 8px; padding: 1rem; text-align: center;">
                            <div style="font-size: 0.8em; color: #888; margin-bottom: 0.25rem;">Total GST Paid</div>
                            <div style="font-size: 1.1em; font-weight: 700; color: #d35400;" v-html="'₹' + formatINRHtml(summary.totalGST)"></div>
                            <div v-if="summary.totalIBCost > 0" style="font-size: 0.8em; color: #d35400; margin-top: 0.2rem;">{{ (summary.totalGST / summary.totalIBCost * 100).toFixed(2) }}%</div>
                        </div>
                    </div>

                    <!-- Detail Table -->
                    <div class="table-responsive">
                        <table class="summary-table">
                            <thead>
                                <tr>
                                    <th style="text-align: center;">Date</th>
                                    <th style="text-align: center;">Bank</th>
                                    <th style="text-align: center;">Trans ID</th>
                                    <th style="text-align: center;">USD Bought</th>
                                    <th style="text-align: center;">INR Spent</th>
                                    <th style="text-align: center;">TCS</th>
                                    <th style="text-align: center;">FX Interbank</th>
                                    <th style="text-align: center;">FX Charges</th>
                                    <th style="text-align: center;">GST</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(txn, i) in computedTransactions" :key="txn.id">
                                    <td style="white-space: nowrap;">{{ txn.date }}</td>
                                    <td>{{ txn.bank || '–' }}</td>
                                    <td style="font-family: monospace; font-size: 0.85em;">{{ txn.txnId || '–' }}</td>
                                    <td style="text-align: right;" v-html="'$' + formatUSDHtml(txn.usdReceived)"></td>
                                    <td style="text-align: right;" v-html="'₹' + formatINRHtml(txn.inrSpent)"></td>
                                    <td style="text-align: right;" v-html="txn.tcs != null ? '₹' + formatINRHtml(txn.tcs) : '–'"></td>
                                    <td style="text-align: right;" v-html="'₹' + formatINRHtml(txn.ibCost)"></td>
                                    <td style="text-align: right;" v-html="'₹' + formatINRHtml((txn.fxSpread || 0) + (txn.processingFee || 0))"></td>
                                    <td style="text-align: right;" v-html="'₹' + formatINRHtml(txn.gst)"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p style="font-size: 0.82em; color: #999; margin-top: 0.75rem;">
                            ℹ️ There may be a difference of a couple of paise between the numbers shown here and your bank statement due to how rounding is applied at each step.
                    </p>
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
                fxBreakdownResizeHandler: null,
                copyButtonText: '📋 JSON',
                shareButtonText: '🔗 Share'
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
                this.computedTransactions.forEach(t => {
                    totalGST += t.gst || 0;
                    totalINRSpent += t.inrSpent || 0;
                    totalUSDBought += t.usdReceived || 0;
                    totalCharges += t.totalCharges || 0;
                    totalTCS += t.tcs || 0;
                    totalIBCost += t.ibCost || 0;
                });
                return { totalINRSpent, totalUSDBought, totalGST, totalCharges, totalTCS, totalIBCost };
            },
            exportJSON() {
                if (!this.preview.valid) return '';

                const data = {
                    input: {
                        amountUnit: this.form.amountUnit,
                        amount: this.form.amount,
                        date: this.form.date,
                        bankRate: this.form.rate,
                        interbankRate: this.form.interbankRate,
                        processingFee: this.form.serviceFee,
                        bank: this.form.bank,
                        transactionId: this.form.txnId
                    },
                    output: {
                        resultLabel: this.resultLabel,
                        resultValue: this.preview.result,
                        usdAmount: this.preview.usdAmount,
                        inrDebit: this.preview.inrDebit,
                        grossINR: this.preview.grossINR,
                        ibCost: this.preview.ibCost,
                        fxSpread: this.preview.fxSpread,
                        fxConvGST: this.preview.fxConvGST,
                        processingFeeGST: this.preview.processingFeeGST,
                        totalCharges: this.preview.totalCharges,
                        tcs: this.preview.tcs,
                        effectiveRate: this.preview.effectiveRate,
                        transactionCostPct: this.preview.chargesPct
                    }
                };

                return JSON.stringify(data, null, 2);
            },
            fyGrossINR() {
                // Sum of computed grossINR for all stored transactions in the same Indian FY.
                const formDate = this.form.date ? new Date(this.form.date) : new Date();
                const fy = formDate.getMonth() < 3 ? formDate.getFullYear() - 1 : formDate.getFullYear();
                const fyStart = new Date(fy, 3, 1);       // Apr 1
                const fyEnd   = new Date(fy + 1, 2, 31);  // Mar 31 next year
                return this.computedTransactions.reduce((sum, t) => {
                    const d = new Date(t.date);
                    if (d >= fyStart && d <= fyEnd) sum += t.grossINR || 0;
                    return sum;
                }, 0);
            },
            computedTransactions() {
                // Process ascending by date so TCS accumulates correctly within each FY.
                const sorted = [...this.transactions].sort((a, b) =>
                    a.date.localeCompare(b.date) || (a.createdAt || '').localeCompare(b.createdAt || '')
                );
                const fyAccum = {}; // fy (number) → running grossINR
                const enriched = sorted.map(t => {
                    const rate = t.rate || 0;
                    const ibRate = t.interbankRate > 0 ? t.interbankRate : rate;
                    const processingFee = t.processingFee || 0;
                    const processingFeeGST = this.trunc2(processingFee * 0.18);
                    const d = new Date(t.date);
                    const fy = d.getMonth() < 3 ? d.getFullYear() - 1 : d.getFullYear();
                    const running = fyAccum[fy] || 0;

                    const unit = t.amountUnit || 'usd';
                    const rawAmount = t.amount != null ? t.amount : (t.usdReceived || 0);

                    let usdReceived, grossINR;
                    if (unit === 'usd') {
                        usdReceived = rawAmount;
                        const split = this.splitGrossAndMarkup(usdReceived, rate, ibRate);
                        grossINR = split.grossINR;
                    } else {
                        const budget = rawAmount - processingFee - processingFeeGST;
                        const calcTCSLocal = (g) => Math.min(g, Math.max(0, running + g - 1000000)) * 0.20;
                        grossINR = budget > 0 ? this.solveGrossINR(budget, calcTCSLocal) : 0;
                        usdReceived = Math.floor(grossINR > 0 ? grossINR / rate : 0);
                        const split = this.splitGrossAndMarkup(usdReceived, rate, ibRate);
                        grossINR = split.grossINR;
                    }

                    const split = this.splitGrossAndMarkup(usdReceived, rate, ibRate);
                    const ibCost = split.ibCost;
                    const rule32Val = this.calcRule32(grossINR);
                    const fxConvGST = this.trunc2(rule32Val * 0.18);
                    const fxSpread = split.fxSpread;
                    const tcs = this.trunc2(Math.min(grossINR, Math.max(0, running + grossINR - 1000000)) * 0.20);
                    const totalCharges = this.trunc2(fxSpread + fxConvGST + processingFee + processingFeeGST);
                    const gst = this.trunc2(fxConvGST + processingFeeGST);
                    const inrSpent = this.trunc2(grossINR + fxConvGST + processingFee + processingFeeGST + tcs);
                    const effectiveRate = usdReceived > 0 ? (inrSpent - tcs) / usdReceived : 0;

                    fyAccum[fy] = running + grossINR;

                    return {
                        ...t,
                        usdReceived, grossINR, ibCost,
                        rule32Val, fxConvGST, processingFeeGST,
                        fxSpread, totalCharges, tcs, gst, inrSpent, effectiveRate
                    };
                });
                return enriched.reverse(); // newest-first for display
            }
        },

        watch: {
            form: {
                handler() {
                    this.saveToStorage();
                },
                deep: true
            },
            'form.rate'(newRate, oldRate) {
                if (this.suppressAutoInterbankSync) return;
                const currentInterbank = Number(this.form.interbankRate);
                const prevAuto = Number.isFinite(Number(oldRate)) ? parseFloat((Number(oldRate) - 1.75).toFixed(2)) : null;
                const followsAuto = prevAuto !== null && Math.abs(currentInterbank - prevAuto) < 0.0001;
                if (currentInterbank <= 0 || followsAuto) {
                    this.form.interbankRate = parseFloat((Number(newRate) - 1.75).toFixed(2));
                }
                this.debouncedCalculate();
            }
        },

        mounted() {
            const hasSharedState = !!this.decodeState(window.location.hash.slice(1));
            this.loadFromStorage(hasSharedState);
            this.loadFromUrl();
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

            trunc2(value) {
                // Add epsilon before flooring to avoid binary float artifacts like 250127.999999 -> 250127.99
                return Math.floor(((Number(value) || 0) + 1e-9) * 100) / 100;
            },

            splitGrossAndMarkup(usdAmount, rate, ibRate) {
                const usd = Number(usdAmount) || 0;
                const bankRate = Number(rate) || 0;
                const interbank = (Number(ibRate) || 0) > 0 ? Number(ibRate) : bankRate;
                const grossINR = this.trunc2(usd * bankRate);
                const ibCost = this.trunc2(usd * interbank);
                const fxSpread = this.trunc2(grossINR - ibCost);
                return { grossINR, ibCost, fxSpread };
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
                // Banks truncate monetary values to paise (2 dp) — mirror that to avoid sub-paise drift
                const trunc2 = this.trunc2;
                const processingFeeGST = trunc2(processingFee * 0.18);
                const fixedCharges = processingFee + processingFeeGST;

                let usdAmount, grossINR, ibCost, rule32Val, fxConvGST, fxSpread, totalCharges,
                    totalExtraCost, result, effectiveRate, effectiveOverInterbank, chargesPct, tcs, tcsDrag;

                if (unit === 'usd') {
                    // Given USD target → compute total INR to spend
                    usdAmount = amount;
                    const split = this.splitGrossAndMarkup(usdAmount, rate, ibRate);
                    grossINR = split.grossINR;
                    ibCost = split.ibCost;
                    rule32Val = this.calcRule32(grossINR);
                    fxConvGST = trunc2(rule32Val * 0.18);
                    fxSpread = split.fxSpread;
                    totalCharges = trunc2(fxSpread + fxConvGST + processingFee + processingFeeGST);
                    const runningUSD = this.fyGrossINR;
                    tcs = trunc2(Math.min(grossINR, Math.max(0, runningUSD + grossINR - 1000000)) * 0.20);
                    result = trunc2(grossINR + fxConvGST + processingFee + processingFeeGST + tcs);
                    const inrExTCS = trunc2(result - tcs);
                    totalExtraCost = totalCharges;
                    effectiveRate = usdAmount > 0 ? inrExTCS / usdAmount : 0;
                    effectiveOverInterbank = ibCost > 0 ? ((inrExTCS - ibCost) / ibCost) * 100 : 0;
                    chargesPct = ibCost > 0 ? (totalCharges / ibCost) * 100 : 0;
                    tcsDrag = (ibCost + totalCharges) > 0 ? (tcs / (ibCost + totalCharges)) * 100 : 0;

                } else {
                    // Given INR budget → back-compute grossINR → USD received (floored to whole dollars)
                    // Binary search accounts for GST + cumulative TCS within budget.
                    const running = this.fyGrossINR;
                    const calcTCS = (g) => Math.min(g, Math.max(0, running + g - 1000000)) * 0.20;

                    const budget = amount - fixedCharges;
                    grossINR = budget > 0 ? this.solveGrossINR(budget, calcTCS) : 0;
                    usdAmount = Math.floor(grossINR > 0 ? grossINR / rate : 0);
                    const split = this.splitGrossAndMarkup(usdAmount, rate, ibRate);
                    grossINR = split.grossINR; // recompute from whole-dollar USD
                    ibCost = split.ibCost;
                    rule32Val = this.calcRule32(grossINR);
                    fxConvGST = trunc2(rule32Val * 0.18);
                    fxSpread = split.fxSpread;
                    totalCharges = trunc2(fxSpread + fxConvGST + processingFee + processingFeeGST);
                    tcs = trunc2(calcTCS(grossINR));
                    result = usdAmount;
                    const inrDebit = trunc2(grossINR + fxConvGST + processingFee + processingFeeGST + tcs);
                    const inrDebitExTCS = trunc2(grossINR + fxConvGST + processingFee + processingFeeGST);
                    totalExtraCost = totalCharges;
                    effectiveRate = usdAmount > 0 ? inrDebitExTCS / usdAmount : 0;
                    effectiveOverInterbank = ibCost > 0 ? ((inrDebitExTCS - ibCost) / ibCost) * 100 : 0;
                    chargesPct = ibCost > 0 ? (totalCharges / ibCost) * 100 : 0;
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

                // The chart container is under v-if. When preview becomes invalid, the DOM node is removed.
                // Recreate the chart if the existing instance points to an old detached node.
                if (this.fxBreakdownChart && this.fxBreakdownChart.getDom() !== chartDom) {
                    this.fxBreakdownChart.dispose();
                    this.fxBreakdownChart = null;
                }

                if (!this.fxBreakdownChart) {
                    this.fxBreakdownChart = echarts.init(chartDom);
                    if (!this.fxBreakdownResizeHandler) {
                        this.fxBreakdownResizeHandler = () => this.fxBreakdownChart?.resize();
                        window.addEventListener('resize', this.fxBreakdownResizeHandler);
                    }
                }

                const p = this.preview;
                const data = [
                    { value: Math.max(0, p.ibCost || 0), name: 'FX Interbank', itemStyle: { color: '#4CAF50' } },
                    { value: Math.max(0, (p.fxSpread || 0) + (p.processingFee || 0)), name: 'FX Charges', itemStyle: { color: '#ef4444' } },
                    { value: Math.max(0, (p.fxConvGST || 0) + (p.processingFeeGST || 0)), name: 'GST', itemStyle: { color: '#b91c1c' } }
                ];
                if ((p.tcs || 0) > 0) {
                    data.push({ value: Math.max(0, p.tcs || 0), name: 'TCS', itemStyle: { color: '#FFC107' } });
                }

                const filtered = data.filter(d => d.value > 0);
                const ibRateText = Number(p.interbankRate > 0 ? p.interbankRate : (this.form.interbankRate || 0)).toFixed(4);
                const effRateText = Number(p.effectiveRate || 0).toFixed(4);
                const fmt = (v) => '₹' + Number(v).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                this.fxBreakdownChart.setOption({
                    title: [
                        {
                            text: 'Interbank',
                            left: '50%', top: '33%',
                            textAlign: 'center',
                            textStyle: { fontSize: 11, fontWeight: '600', color: '#64748b' }
                        },
                        {
                            text: '₹' + ibRateText,
                            left: '50%', top: '37%',
                            textAlign: 'center',
                            textStyle: { fontSize: 19, fontWeight: '700', color: '#1f2937' }
                        },
                        {
                            text: 'vs',
                            left: '50%', top: '44%',
                            textAlign: 'center',
                            textStyle: { fontSize: 10, fontWeight: '600', color: '#94a3b8' }
                        },
                        {
                            text: 'Effective',
                            left: '50%', top: '48%',
                            textAlign: 'center',
                            textStyle: { fontSize: 11, fontWeight: '600', color: '#64748b' }
                        },
                        {
                            text: '₹' + effRateText,
                            left: '50%', top: '52%',
                            textAlign: 'center',
                            textStyle: { fontSize: 19, fontWeight: '700', color: '#1f2937' }
                        }
                    ],
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
                            center: ['50%', '44%'],
                            avoidLabelOverlap: true,
                            label: {
                                formatter: function (x) {
                                    return x.name + '\n' + x.percent.toFixed(2) + '%';
                                }
                            },
                            data: filtered
                        }
                    ]
                });
            },

            addTransaction() {
                if (!this.isFormValid || !this.preview.valid) return;

                const txn = {
                    id: Date.now() + '-' + Math.random().toString(36).substr(2, 9),
                    operation: 'buy',
                    date: this.form.date,
                    rate: this.form.rate,
                    interbankRate: this.form.interbankRate || 0,
                    bank: this.form.bank,
                    txnId: this.form.txnId,
                    processingFee: this.form.serviceFee >= 0 ? this.form.serviceFee : 0,
                    amountUnit: this.form.amountUnit,
                    amount: this.form.amount,
                    createdAt: new Date().toISOString()
                };

                this.transactions.unshift(txn);
                this.saveToStorage();
                this.form.txnId = '';
                this.calculate();
            },

            removeTransaction(id) {
                this.transactions = this.transactions.filter(t => t.id !== id);
                this.saveToStorage();
                this.calculate();
            },

            async fetchInterbankRate() {
                if (!this.form.date) return;
                this.ibRateLoading = true;
                this.ibRateError = '';
                try {
                    const target = this.form.date; // YYYY-MM-DD
                    // Use fawazahmed0/currency-api via jsDelivr CDN — no proxy, no key needed
                    const apiUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${target}/v1/currencies/usd.json`;
                    const fallbackUrl = `https://latest.currency-api.pages.dev/v1/currencies/usd.json`;
                    let resp = null;
                    try {
                        const r = await fetch(apiUrl);
                        if (r.ok) resp = r;
                    } catch (_) {}
                    if (!resp) {
                        const r = await fetch(fallbackUrl);
                        if (!r.ok) throw new Error(`HTTP ${r.status}`);
                        resp = r;
                        this.ibRateError = `No data for ${target}; showing latest available rate`;
                    }
                    const json = await resp.json();
                    const rate = json?.usd?.inr;
                    if (!rate || isNaN(rate) || rate <= 0) throw new Error('INR rate not found in response');
                    this.form.interbankRate = parseFloat(rate.toFixed(4));
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

            normalizeTxn(t) {
                // Convert pre-v2 fat-stored format to lean raw-input-only format.
                if (t.amountUnit != null) return t; // already lean
                return {
                    id: t.id,
                    operation: t.operation || 'buy',
                    date: t.date,
                    rate: t.rate || 0,
                    interbankRate: t.interbankRate || 0,
                    bank: t.bank || '',
                    txnId: t.txnId || '',
                    processingFee: t.processingFee || 0,
                    amountUnit: 'usd',
                    amount: t.usdReceived || 0,
                    createdAt: t.createdAt || new Date().toISOString()
                };
            },

            loadFromStorage(skipFormPrefs) {
                try {
                    const saved = localStorage.getItem(FX_STORAGE_KEY);
                    if (saved) {
                        const parsed = JSON.parse(saved);
                        // Backward compatibility: older versions stored only transactions array.
                        if (Array.isArray(parsed)) {
                            this.transactions = parsed.map(t => this.normalizeTxn(t));
                        } else {
                            this.transactions = Array.isArray(parsed.transactions) ? parsed.transactions.map(t => this.normalizeTxn(t)) : [];
                            if (!skipFormPrefs && parsed.formPrefs && typeof parsed.formPrefs === 'object') {
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

            encodeState() {
                const f = this.form;
                let s = 'v1';
                s += 'u' + (f.amountUnit === 'inr' ? 'i' : 'd');
                s += 'd' + (f.date || '').replace(/-/g, '');
                s += 'r' + (f.rate || 0);
                s += 'b' + (f.interbankRate || 0);
                s += 'a' + (f.amount || 0);
                s += 'f' + (f.serviceFee || 0);
                return s;
            },

            decodeState(hash) {
                if (!hash || !hash.startsWith('v1')) return null;
                const state = {};
                let i = 2;
                while (i < hash.length) {
                    const prefix = hash[i]; i++;
                    if (prefix === 'u') {
                        state.amountUnit = hash[i] === 'i' ? 'inr' : 'usd'; i++;
                    } else if (prefix === 'd') {
                        const raw = hash.slice(i, i + 8); i += 8;
                        if (raw.length === 8) {
                            state.date = raw.slice(0, 4) + '-' + raw.slice(4, 6) + '-' + raw.slice(6, 8);
                        }
                    } else {
                        let val = '';
                        while (i < hash.length && /[\d.]/.test(hash[i])) val += hash[i++];
                        const num = parseFloat(val);
                        if (!isNaN(num)) {
                            if (prefix === 'r') state.rate = num;
                            else if (prefix === 'b') state.interbankRate = num;
                            else if (prefix === 'a') state.amount = num;
                            else if (prefix === 'f') state.serviceFee = num;
                        }
                    }
                }
                return state;
            },

            loadFromUrl() {
                const hash = window.location.hash.slice(1);
                if (!hash) return;
                const state = this.decodeState(hash);
                if (!state) return;
                this.suppressAutoInterbankSync = true;
                Object.keys(state).forEach(k => {
                    if (state[k] !== undefined) this.form[k] = state[k];
                });
                this.suppressAutoInterbankSync = false;
            },

            async shareCalculation() {
                const encoded = this.encodeState();
                const url = `${window.location.origin}${window.location.pathname}#${encoded}`;
                try {
                    await navigator.clipboard.writeText(url);
                    this.shareButtonText = '✅ Copied!';
                    window.history.replaceState(null, '', `#${encoded}`);
                } catch (err) {
                    this.shareButtonText = '❌ Failed';
                }
                setTimeout(() => { this.shareButtonText = '🔗 Share'; }, 2000);
            },

            async copyJSON() {
                const json = this.exportJSON;
                if (!json) return;
                try {
                    await navigator.clipboard.writeText(json);
                    this.copyButtonText = '✅ Copied!';
                } catch (err) {
                    this.copyButtonText = '❌ Failed';
                }
                setTimeout(() => { this.copyButtonText = '📋 JSON'; }, 2000);
            },

            exportData() {
                const data = {
                    tool: 'RealValue FX Engine',
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
                            const newTxns = data.transactions
                                .filter(t => !existingIds.has(t.id))
                                .map(t => this.normalizeTxn(t));
                            this.transactions = [...this.transactions, ...newTxns];
                            // Re-sort by date descending
                            this.transactions.sort((a, b) => b.date.localeCompare(a.date));
                        } else {
                            this.transactions = data.transactions.map(t => this.normalizeTxn(t));
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

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
                            <label style="display: flex; justify-content: space-between; align-items: center;">
                                <span>Bank Name:</span>
                                <span class="help-icon help-icon-wide" data-tooltip="This name identifies the institution in the Compare view as well as the final Transaction history.">ℹ️</span>
                            </label>
                            <div style="display: flex; gap: 0.5rem;">
                                <input
                                    type="text"
                                    v-model="form.bank"
                                    placeholder="e.g., HDFC Bank, SBI, Axis Bank"
                                    style="flex: 1; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem;">
                                <button
                                    type="button"
                                    @click="addToCompare"
                                    class="share-button"
                                    style="flex-shrink: 0; min-width: 110px;"
                                    :disabled="!isFormValid || !preview.valid">
                                    ➕ Compare
                                </button>
                            </div>
                            <p style="font-size: 0.82em; color: #999; margin: 0.5rem 0 0 0;">
                                💡 Compared rates are saved in your browser so you can evaluate the best rates side-by-side before buying USD.
                            </p>
                        </div>

                        <div class="input-group">
                            <label style="display: flex; justify-content: space-between; align-items: center;">
                                <span>Transaction ID:</span>
                                <span class="help-icon help-icon-wide" data-tooltip="The transaction reference number on your bank statement or receipt.">ℹ️</span>
                            </label>
                            <div style="display: flex; gap: 0.5rem;">
                                <input
                                    type="text"
                                    v-model="form.txnId"
                                    placeholder="e.g., TXN-2026-001"
                                    style="flex: 1; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem; font-family: monospace;">
                                <button
                                    type="button"
                                    @click="addTransaction"
                                    class="share-button"
                                    style="flex-shrink: 0; min-width: 110px;"
                                    :disabled="!isFormValid || !preview.valid">
                                    ➕ Transaction
                                </button>
                            </div>
                        </div>

                        <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.75rem; margin-top: 1.75rem;">
                            <p style="font-size: 0.85em; color: #999; margin: 0; flex: 1;">
                                💡 Transactions are saved in your browser to track remittance for TCS computations when it crosses 10 lakhs in a FY.
                            </p>
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
                                            <span>FX Markup</span>
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

                <div class="investment-plan" v-if="comparisonItems.length > 0" style="margin-bottom: 2rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
                        <div style="display: flex; gap: 1rem; align-items: center;">
                            <h2 style="margin: 0;">⚖️ Compare Rates</h2>
                            <div class="mode-toggle">
                                <button 
                                    type="button"
                                    :class="{'active': !showComparisonTable}"
                                    @click="showComparisonTable = false"
                                    style="white-space: nowrap;">
                                    🎴 Cards
                                </button>
                                <button 
                                    type="button"
                                    :class="{'active': showComparisonTable}"
                                    @click="showComparisonTable = true"
                                    style="white-space: nowrap;">
                                    📋 Table
                                </button>
                            </div>
                        </div>
                        <button
                            type="button"
                            @click="clearComparison"
                            class="share-button btn-clear-all"
                            style="white-space: nowrap;">
                            🗑️ Clear All
                        </button>
                    </div>

                    <div v-show="!showComparisonTable" style="display: flex; align-items: stretch; gap: 1rem; overflow-x: auto; padding-bottom: 0.5rem;">
                        <div
                            v-for="(item, index) in comparisonItems"
                            :key="item.id"
                            :style="getCompareCardStyle(item)"
                        >
                            <button
                                type="button"
                                @click="removeCompare(item.id)"
                                class="btn-remove-subtle"
                                title="Remove Compare"
                                style="position: absolute; top: 0.25rem; right: 0.25rem;"
                            >✕</button>

                            <div style="font-size: 0.8em; color: #888; margin-bottom: 0.25rem; padding: 0 1rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                {{ item.inputs.bank || 'Bank ' + (index + 1) }}
                            </div>
                            <div style="font-size: 1.1em; font-weight: 700; color: #2980b9;" v-html="'&#36;' + formatUSDHtml(item.outputs.usdAmount)"></div>
                            <div style="font-size: 0.8em; color: #2980b9; margin-top: 0.2rem;">{{ item.outputs.chargesPct.toFixed(2) }}%</div>
                        </div>
                    </div>

                    <div v-if="showComparisonTable" class="table-responsive" style="margin-top: 1rem; border-top: 1px solid #eee; padding-top: 1rem;">
                        <table class="summary-table">
                            <thead>
                                <tr>
                                    <th style="min-width: 180px;"></th>
                                    <th v-for="(item, index) in comparisonItems" :key="item.id" style="text-align: center; min-width: 120px; position: relative; padding: 0.5rem 1.5rem;">
                                        {{ item.inputs.bank || 'Bank ' + (index + 1) }}
                                        <button
                                            type="button"
                                            @click="removeCompare(item.id)"
                                            class="btn-remove-subtle"
                                            title="Remove Compare"
                                            style="position: absolute; top: 50%; right: 0.5rem; transform: translateY(-50%);"
                                        >✕</button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>USD Amount</strong></td>
                                    <td v-for="item in comparisonItems" :key="item.id" class="highlight" style="text-align: right; color: #2980b9;">
                                        <strong style="font-size: 1.15em;" v-html="'&#36;' + formatUSDHtml(item.outputs.usdAmount)"></strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Transaction Cost %</strong></td>
                                    <td v-for="item in comparisonItems" :key="item.id" 
                                        :style="[
                                            { textAlign: 'right', fontWeight: 'bold' },
                                            getCompareRank(item.outputs.chargesPct) === 0 ? { color: '#155724', background: '#d4edda', borderRadius: '4px' } : 
                                            (getCompareRank(item.outputs.chargesPct) === 1 && comparisonItems.length > 2) ? { color: '#1e7e34', background: '#e8f5e9', borderRadius: '4px' } : 
                                            {}
                                        ]">
                                        {{ item.outputs.chargesPct.toFixed(2) }}%
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Effective Rate</strong></td>
                                    <td v-for="item in comparisonItems" :key="item.id" style="text-align: right; font-weight: bold;">
                                        ₹{{ item.outputs.effectiveRate.toFixed(4) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Bank Rate</strong></td>
                                    <td v-for="item in comparisonItems" :key="item.id" style="text-align: right;">₹{{ parseFloat(item.inputs.rate).toFixed(4) }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Interbank Rate</strong></td>
                                    <td v-for="item in comparisonItems" :key="item.id" style="text-align: right; color: #666;">₹{{ parseFloat(item.inputs.interbankRate).toFixed(4) }}</td>
                                </tr>
                                <tr style="background: #f4f4f4; height: 16px;">
                                    <td :colspan="1 + comparisonItems.length" style="padding: 0;"></td>
                                </tr>
                                <tr>
                                    <td><strong>FX Interbank</strong></td>
                                    <td v-for="item in comparisonItems" :key="item.id" style="text-align: right;" v-html="'₹' + formatINRHtml(item.outputs.ibCost)"></td>
                                </tr>
                                <tr>
                                    <td><strong>FX Markup</strong></td>
                                    <td v-for="item in comparisonItems" :key="item.id" style="text-align: right;" v-html="'₹' + formatINRHtml(item.outputs.fxSpread)"></td>
                                </tr>
                                <tr>
                                    <td><strong>Processing Fee</strong></td>
                                    <td v-for="item in comparisonItems" :key="item.id" style="text-align: right;" v-html="'₹' + formatINRHtml(item.inputs.serviceFee)"></td>
                                </tr>
                                <tr>
                                    <td><strong>FX Conversion GST</strong></td>
                                    <td v-for="item in comparisonItems" :key="item.id" style="text-align: right;" v-html="'₹' + formatINRHtml(item.outputs.fxConvGST)"></td>
                                </tr>
                                <tr>
                                    <td><strong>GST on Processing Fee</strong></td>
                                    <td v-for="item in comparisonItems" :key="item.id" style="text-align: right;" v-html="'₹' + formatINRHtml(item.outputs.processingFeeGST)"></td>
                                </tr>
                                <template v-if="comparisonItems.some(i => i.outputs.tcs > 0)">
                                    <tr>
                                        <td><strong>Net INR Amount</strong></td>
                                        <td v-for="item in comparisonItems" :key="item.id" style="text-align: right; font-weight: bold;" v-html="'₹' + formatINRHtml(item.outputs.inrDebit - item.outputs.tcs)"></td>
                                    </tr>
                                    <tr>
                                        <td><strong>TCS @ 20% (refundable)</strong></td>
                                        <td v-for="item in comparisonItems" :key="item.id" style="text-align: right;" v-html="item.outputs.tcs > 0 ? '₹' + formatINRHtml(item.outputs.tcs) : '–'"></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Gross INR Amount</strong></td>
                                        <td v-for="item in comparisonItems" :key="item.id" class="highlight" style="text-align: right; font-weight: bold;">
                                            <strong style="font-size: 1.15em;" v-html="'₹' + formatINRHtml(item.outputs.inrDebit)"></strong>
                                        </td>
                                    </tr>
                                </template>
                                <template v-else>
                                    <tr>
                                        <td><strong>INR Amount</strong></td>
                                        <td v-for="item in comparisonItems" :key="item.id" class="highlight" style="text-align: right; font-weight: bold;">
                                            <strong style="font-size: 1.15em;" v-html="'₹' + formatINRHtml(item.outputs.inrDebit)"></strong>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div v-if="comparisonItems.length === 0" class="investment-plan" style="margin-bottom: 2rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
                        <div style="display: flex; gap: 1rem; align-items: center;">
                            <h2 style="margin: 0;">⚖️ Compare Rates</h2>
                        </div>
                    </div>
                    <div style="text-align: center; padding: 2rem 0; color: #999;">
                        <p>No rates to compare. Fill in the form and click <strong>Compare</strong> to get started.</p>
                    </div>
                </div>

                <!-- Full-width: Transaction History -->
                <div class="investment-plan" v-if="transactions.length > 0">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
                        <h2 style="margin: 0;">📋 Transaction History</h2>
                        <button
                            type="button"
                            class="share-button btn-clear-all"
                            @click="clearAll"
                            style="white-space: nowrap;">
                            🗑️ Clear All
                        </button>
                    </div>

                    <!-- Summary Tiles -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
                        <div style="background: #d4edda; border: 1px solid #c3e6cb; border-radius: 8px; padding: 1rem; text-align: center;">
                            <div style="font-size: 0.8em; color: #888; margin-bottom: 0.25rem;">Total USD Bought</div>
                            <div style="font-size: 1.1em; font-weight: 700; color: #155724;" v-html="'$' + formatUSDHtml(summary.totalUSDBought)"></div>
                            <div v-if="summary.totalUSDBought > 0" style="font-size: 0.8em; color: #155724; margin-top: 0.2rem;">Eff Rate: ₹{{ ((summary.totalINRSpent - summary.totalTCS) / summary.totalUSDBought).toFixed(4) }}</div>
                        </div>
                        <div style="background: #f0f7ff; border: 1px solid #c3d9f5; border-radius: 8px; padding: 1rem; text-align: center;">
                            <div style="font-size: 0.8em; color: #888; margin-bottom: 0.25rem;">Total INR Spent</div>
                            <div style="font-size: 1.1em; font-weight: 700; color: #2980b9;" v-html="'₹' + formatINRHtml(summary.totalINRSpent)"></div>
                            <div v-if="summary.totalINRSpent > 0" style="font-size: 0.8em; color: #2980b9; margin-top: 0.2rem;" v-html="'Ex-TCS: ₹' + formatINRHtml(summary.totalINRSpent - summary.totalTCS)"></div>
                        </div>
                        <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 1rem; text-align: center;">
                            <div style="font-size: 0.8em; color: #888; margin-bottom: 0.25rem;">Total TCS Paid</div>
                            <div style="font-size: 1.1em; font-weight: 700; color: #d97706;" v-html="'₹' + formatINRHtml(summary.totalTCS)"></div>
                            <div v-if="summary.totalINRSpent > 0" style="font-size: 0.8em; color: #d97706; margin-top: 0.2rem;">{{ (summary.totalTCS / (summary.totalINRSpent - summary.totalTCS) * 100).toFixed(2) }}%</div>
                        </div>
                        <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 1rem; text-align: center;">
                            <div style="font-size: 0.8em; color: #888; margin-bottom: 0.25rem;">Total FX Charges</div>
                            <div style="font-size: 1.1em; font-weight: 700; color: #ef4444;" v-html="'₹' + formatINRHtml(summary.totalCharges)"></div>
                            <div v-if="summary.totalIBCost > 0" style="font-size: 0.8em; color: #ef4444; margin-top: 0.2rem;">{{ (summary.totalCharges / summary.totalIBCost * 100).toFixed(2) }}%</div>
                        </div>
                        <div style="background: #fff1f2; border: 1px solid #fecdd3; border-radius: 8px; padding: 1rem; text-align: center;">
                            <div style="font-size: 0.8em; color: #888; margin-bottom: 0.25rem;">Total GST Paid</div>
                            <div style="font-size: 1.1em; font-weight: 700; color: #b91c1c;" v-html="'₹' + formatINRHtml(summary.totalGST)"></div>
                            <div v-if="summary.totalIBCost > 0" style="font-size: 0.8em; color: #b91c1c; margin-top: 0.2rem;">{{ (summary.totalGST / summary.totalIBCost * 100).toFixed(2) }}%</div>
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

                <!-- TCS Drag Table -->
                <div class="investment-plan" v-if="tcsDragSchedule.length > 0">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
                        <h2 style="margin: 0;">📉 TCS Opportunity Cost</h2>
                    </div>

                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap;">
                        <div class="input-group" style="margin: 0; min-width: 200px;">
                            <label style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                                <span>Your XIRR (%)</span>
                                <span class="help-icon help-icon-wide" data-tooltip="Your expected annual compound growth rate, used to compute the opportunity cost of locked TCS capital.">ℹ️</span>
                            </label>
                            <input 
                                type="number" 
                                v-model.number="form.cagr" 
                                min="0" 
                                max="50" 
                                step="0.5"
                                @input="debouncedCalculate"
                                style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem;"
                            >
                        </div>
                        <div class="input-group" style="margin: 0; min-width: 200px;">
                            <label style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                                <span>TCS Adjustment Method</span>
                                <span class="help-icon help-icon-wide" data-tooltip="When predicting the refund schedule, assume either Form 12BAA (monthly payroll adjustment) or standard ITR Filing.">ℹ️</span>
                            </label>
                            <div class="unit-buttons">
                                <button 
                                    type="button"
                                    :class="{'active': form.use12BAA}"
                                    @click="form.use12BAA = true; debouncedCalculate()">
                                    Form 12BAA (Monthly)
                                </button>
                                <button 
                                    type="button"
                                    :class="{'active': !form.use12BAA}"
                                    @click="form.use12BAA = false; debouncedCalculate()">
                                    ITR Filing (July 31)
                                </button>
                            </div>
                        </div>
                        <div class="input-group" style="margin: 0; min-width: 200px;" v-if="!form.use12BAA">
                            <label style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                                <span>Expected Refund By</span>
                                <span class="help-icon help-icon-wide" data-tooltip="When do you realistically expect the actual refund to be credited to your bank account after filing the ITR?">ℹ️</span>
                            </label>
                            <div class="unit-buttons">
                                <button type="button" :class="{'active': form.refundDelay === 3}" @click="form.refundDelay = 3; debouncedCalculate()">Oct 31</button>
                                <button type="button" :class="{'active': form.refundDelay === 6}" @click="form.refundDelay = 6; debouncedCalculate()">Jan 31</button>
                                <button type="button" :class="{'active': form.refundDelay === 9}" @click="form.refundDelay = 9; debouncedCalculate()">Apr 30</button>
                                <button type="button" :class="{'active': form.refundDelay === 12}" @click="form.refundDelay = 12; debouncedCalculate()">Jul 31</button>
                            </div>
                        </div>
                    </div>

                    <div style="margin-bottom: 1.5rem; max-width: 320px;">
                        <div style="background: #fdf2f8; border: 1px solid #fbcfe8; border-radius: 8px; padding: 1rem; text-align: center;">
                            <div style="font-size: 0.8em; color: #888; margin-bottom: 0.25rem;">TCS Opp. Cost ({{ form.cagr || 12 }}%)</div>
                            <div style="font-size: 1.1em; font-weight: 700; color: #db2777;" v-html="'₹' + formatINRHtml(summary.totalOppCost)"></div>
                            <div v-if="summary.totalINRSpent > summary.totalTCS" style="font-size: 0.8em; color: #db2777; margin-top: 0.2rem;">{{ (summary.totalOppCost / (summary.totalINRSpent - summary.totalTCS) * 100).toFixed(2) }}% of Ex-TCS</div>
                        </div>
                    </div>

                    <div class="table-responsive">
                        <table class="summary-table">
                            <thead>
                                <tr>
                                    <th style="text-align: center;">Date</th>
                                    <th style="text-align: center;">TCS Paid</th>
                                    <th style="text-align: center;">TCS Adjusted</th>
                                    <th style="text-align: center;">Pending TCS</th>
                                    <th style="text-align: center;">Opp. Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row, i) in tcsDragSchedule" :key="i">
                                    <td style="white-space: nowrap;">{{ row.date }}</td>
                                    <td style="text-align: right; color: #d35400;" v-html="row.paid > 0 ? '₹' + formatINRHtml(row.paid) : '–'"></td>
                                    <td style="text-align: right; color: #27ae60;" v-html="row.adjusted > 0 ? '₹' + formatINRHtml(row.adjusted) : '–'"></td>
                                    <td style="text-align: right; font-weight: 700; color: #2980b9;" v-html="'₹' + formatINRHtml(row.pending)"></td>
                                    <td style="text-align: right; color: #db2777;" v-html="row.oppCost > 0 ? '₹' + formatINRHtml(row.oppCost) : '–'"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p style="font-size: 0.82em; color: #999; margin-top: 0.75rem;">
                        <span v-if="form.use12BAA">ℹ️ TCS is adjusted linearly over the remaining months of the financial year.</span>
                        <span v-else>ℹ️ TCS adjustment date is computed as ITR Filing (July of next year) + Expected Refund Delay.</span>
                    </p>
                </div>

                <div v-if="transactions.length === 0" class="investment-plan">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
                        <h2 style="margin: 0;">📋 Transaction History</h2>
                    </div>
                    <div style="text-align: center; padding: 2rem 0; color: #999;">
                        <p>No transactions yet. Fill in the form and click <strong>Transaction</strong> to get started.</p>
                    </div>
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
                    txnId: '',
                    use12BAA: false,
                    cagr: 12,
                    refundDelay: 3
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
                comparisonItems: [],
                showComparisonTable: false,
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

                // Calculate Opportunity Cost directly from the schedule column
                let totalOppCost = 0;
                for (const row of this.tcsDragSchedule) {
                    totalOppCost += row.oppCost || 0;
                }

                return { totalINRSpent, totalUSDBought, totalGST, totalCharges, totalTCS, totalIBCost, totalOppCost };
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
            },
            tcsDragSchedule() {
                const txns = this.computedTransactions.filter(t => t.tcs > 0);
                if (txns.length === 0) return [];

                // Group by FY
                const fyGroups = {};
                txns.forEach(t => {
                    const d = new Date(t.date);
                    const fy = d.getMonth() < 3 ? d.getFullYear() - 1 : d.getFullYear();
                    if (!fyGroups[fy]) fyGroups[fy] = [];
                    fyGroups[fy].push({ type: 'txn', date: t.date, paid: t.tcs, fy });
                });

                let events = [];
                for (const fyStr in fyGroups) {
                    const fy = parseInt(fyStr, 10);
                    events.push(...fyGroups[fy]);

                    if (this.form.use12BAA) {
                        for (let monthOffset = 0; monthOffset < 12; monthOffset++) {
                            const monthIndex = (3 + monthOffset) % 12; // April is 3
                            const year = monthIndex < 3 ? fy + 1 : fy;
                            // Last day of the month
                            const lastDay = new Date(year, monthIndex + 1, 0);
                            const ds = `${lastDay.getFullYear()}-${String(lastDay.getMonth() + 1).padStart(2, '0')}-${String(lastDay.getDate()).padStart(2, '0')}`;
                            const rem = 12 - monthOffset;
                            events.push({ type: 'adj', date: ds, fy, remMonths: rem });
                        }
                    } else {
                        // ITR Filing (July of FY + 1) + Delay Months
                        const ayYear = fy + 1;
                        const delay = this.form.refundDelay || 3;
                        const targetMonth = 6 + delay; // July is month 6 (0-indexed)
                        const lastDay = new Date(ayYear, targetMonth + 1, 0); // End of target month
                        const ds = `${lastDay.getFullYear()}-${String(lastDay.getMonth() + 1).padStart(2, '0')}-${String(lastDay.getDate()).padStart(2, '0')}`;
                        events.push({ type: 'adj', date: ds, fy, remMonths: 1 });
                    }
                }

                events.sort((a, b) => {
                    if (a.date !== b.date) return a.date.localeCompare(b.date);
                    return a.type === 'txn' ? -1 : 1;
                });

                const schedule = [];
                let globalPending = 0;
                let lastDate = null;
                const fyPending = {};
                const cagr = this.form.cagr || 0;

                events.forEach(ev => {
                    let rowOppCost = 0;
                    const currentDate = new Date(ev.date);
                    
                    if (lastDate !== null && cagr > 0) {
                        const days = (currentDate - lastDate) / (1000 * 60 * 60 * 24);
                        if (days > 0 && globalPending > 0) {
                            rowOppCost = globalPending * (Math.pow(1 + cagr / 100, days / 365.25) - 1);
                        }
                    }

                    if (ev.type === 'txn') {
                        globalPending += ev.paid;
                        fyPending[ev.fy] = (fyPending[ev.fy] || 0) + ev.paid;
                        schedule.push({ date: ev.date, paid: ev.paid, adjusted: 0, pending: globalPending, oppCost: rowOppCost, isPaid: true });
                        lastDate = currentDate;
                    } else if (ev.type === 'adj') {
                        let currentFyPending = fyPending[ev.fy] || 0;
                        if (currentFyPending > 0.001) { // fp tolerance
                            let adj = currentFyPending / ev.remMonths;
                            adj = Math.round((adj + Number.EPSILON) * 100) / 100;
                            if (ev.remMonths === 1) adj = currentFyPending;
                            
                            fyPending[ev.fy] = Math.max(0, currentFyPending - adj);
                            globalPending = Math.max(0, globalPending - adj);
                            schedule.push({ date: ev.date, paid: 0, adjusted: adj, pending: globalPending, oppCost: rowOppCost, isPaid: false });
                            lastDate = currentDate;
                        }
                    }
                });

                return schedule;
            }
        },

        watch: {
            transactions: {
                deep: true,
                handler() {
                    this.saveData();
                }
            },
            comparisonItems: {
                deep: true,
                handler() {
                    this.saveData();
                }
            },
            'form.amountUnit'() { this.debouncedCalculate(); },
            'form.rate'(newRate, oldRate) {
                if (this.suppressAutoInterbankSync) return;
                const currentInterbank = Number(this.form.interbankRate);
                const prevAuto = Number.isFinite(Number(oldRate)) ? parseFloat((Number(oldRate) - 1.75).toFixed(2)) : null;
                const followsAuto = prevAuto !== null && Math.abs(currentInterbank - prevAuto) < 0.0001;
                if (currentInterbank <= 0 || followsAuto) {
                    this.form.interbankRate = parseFloat((Number(newRate) - 1.75).toFixed(2));
                }
                this.debouncedCalculate();
            },
            'form.interbankRate'() { this.debouncedCalculate(); },
            'form.amount'() { this.debouncedCalculate(); },
            'form.serviceFee'() { this.debouncedCalculate(); },
            'form.date'() { this.debouncedCalculate(); },
            'form.bank'() { this.saveData(); },
            'form.txnId'() { this.saveData(); }
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
            addToCompare() {
                if (!this.preview.valid) return;
                if (this.comparisonItems.length >= 6) {
                    alert('You can only compare a maximum of 6 rates at a time.');
                    return;
                }
                this.comparisonItems.push({
                    id: Date.now().toString(36) + Math.random().toString(36).substring(2),
                    inputs: JSON.parse(JSON.stringify(this.form)),
                    outputs: JSON.parse(JSON.stringify(this.preview))
                });
            },
            removeCompare(id) {
                this.comparisonItems = this.comparisonItems.filter(item => item.id !== id);
                if (this.comparisonItems.length === 0) {
                    this.showComparisonTable = false;
                }
            },
            clearComparison() {
                if (confirm('Are you sure you want to clear all comparisons?')) {
                    this.comparisonItems = [];
                    this.showComparisonTable = false;
                }
            },
            debouncedCalculate() {
                clearTimeout(this.debounceTimer);
                this.debounceTimer = setTimeout(() => this.calculate(), FX_DEBOUNCE_DELAY_MS);
            },
            getCompareRank(val) {
                if (this.comparisonItems.length <= 1) return -1;
                const vals = [...new Set(this.comparisonItems.map(i => i.outputs.chargesPct))].sort((a, b) => a - b);
                return vals.indexOf(val);
            },
            getCompareCardStyle(item) {
                const rank = this.getCompareRank(item.outputs.chargesPct);
                const baseStyle = { borderRadius: '8px', padding: '1rem', position: 'relative', textAlign: 'center', minWidth: '180px', flex: '1' };
                if (rank === 0) {
                    return { ...baseStyle, background: '#d4edda', border: '1px solid #c3e6cb' };
                } else if (rank === 1 && this.comparisonItems.length > 2) {
                    return { ...baseStyle, background: '#e8f5e9', border: '1px solid #c8e6c9' };
                } else {
                    return { ...baseStyle, background: '#f0f7ff', border: '1px solid #c3d9f5' };
                }
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
                    totalExtraCost, result, inrDebit, effectiveRate, effectiveOverInterbank, chargesPct, tcs, tcsDrag;

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
                    inrDebit = result;
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
                    inrDebit = trunc2(grossINR + fxConvGST + processingFee + processingFeeGST + tcs);
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
                    result, inrDebit, effectiveRate, effectiveOverInterbank, chargesPct,
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
                this.saveData();
                this.form.txnId = '';
                this.calculate();
            },

            removeTransaction(id) {
                this.transactions = this.transactions.filter(t => t.id !== id);
                this.saveData();
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
                    this.saveData();
                }
            },

            resetForm() {
                this.form = Object.assign({}, this.form, { txnId: '' });
                this.calculate();
            },

            saveData() {
                try {
                    const data = {
                        transactions: this.transactions,
                        comparisonItems: this.comparisonItems,
                        formPrefs: {
                            amountUnit: this.form.amountUnit,
                            rate: this.form.rate,
                            interbankRate: this.form.interbankRate,
                            amount: this.form.amount,
                            serviceFee: this.form.serviceFee,
                            bank: this.form.bank,
                            txnId: this.form.txnId,
                            use12BAA: this.form.use12BAA,
                            cagr: this.form.cagr,
                            refundDelay: this.form.refundDelay
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
                            this.comparisonItems = Array.isArray(parsed.comparisonItems) ? parsed.comparisonItems : [];
                            if (!skipFormPrefs && parsed.formPrefs && typeof parsed.formPrefs === 'object') {
                                this.suppressAutoInterbankSync = true;
                                this.form = Object.assign({}, this.form, {
                                    amountUnit: parsed.formPrefs.amountUnit || this.form.amountUnit,
                                    rate: parsed.formPrefs.rate || this.form.rate,
                                    interbankRate: parsed.formPrefs.interbankRate || this.form.interbankRate,
                                    amount: parsed.formPrefs.amount || this.form.amount,
                                    serviceFee: parsed.formPrefs.serviceFee || this.form.serviceFee,
                                    bank: parsed.formPrefs.bank || '',
                                    use12BAA: parsed.formPrefs.use12BAA ?? this.form.use12BAA,
                                    cagr: parsed.formPrefs.cagr ?? this.form.cagr,
                                    refundDelay: parsed.formPrefs.refundDelay ?? this.form.refundDelay
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
                s += 'y' + (f.use12BAA ? '1' : '0');
                s += 'g' + (f.cagr || 0);
                s += 'm' + (f.refundDelay || 3);
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
                            else if (prefix === 'y') state.use12BAA = (num === 1);
                            else if (prefix === 'g') state.cagr = num;
                            else if (prefix === 'm') state.refundDelay = num;
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

// RealValue EMI Engine (Vue.js + ECharts)
window.initializeTool = window.initializeTool || {};

// Constants
const CURRENCY_MULTIPLIERS = {
    crores: 10000000,
    lakhs: 100000,
    thousands: 1000
};
const MAX_LOAN_YEARS = 50;
const MAX_LOAN_MONTHS = MAX_LOAN_YEARS * 12;
const DEBOUNCE_DELAY_MS = 300;
const EMI_STORAGE_KEY = 'emi-calculator-v1';

window.initializeTool.emiCalculator = function (container, config) {
    // Create Vue app template
    container.innerHTML = `
        <div id="emi-calculator-app">
            <div class="sip-calculator">
                <div class="sip-container">
                    <!-- Left Column: Inputs + Compare -->
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <!-- Input Fields -->
                    <div class="sip-inputs">

                        <!-- Section: Calculation Mode -->
                        <h4 style="margin: 0 0 1rem 0; display: flex; align-items: center; gap: 0.5rem;">
                            🎯 Calculation Mode
                            <span class="help-icon help-icon-wide" data-tooltip="Choose what you want to calculate:
Loan EMI: Calculate monthly EMI required
Loan Tenure: Calculate time needed to repay
Loan Amount: Calculate loan amount you can borrow">ℹ️</span>
                        </h4>

                        <!-- Calculation Mode toggle -->
                        <div class="input-group">
                            <div class="mode-toggle" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem;">
                                <button 
                                    type="button"
                                    :class="{'active': calculationMode === 'emi'}"
                                    @click="setCalculationMode('emi')"
                                    style="font-size: 0.85rem; padding: 0.5rem 0.5rem;">
                                    Loan EMI
                                </button>
                                <button 
                                    type="button"
                                    :class="{'active': calculationMode === 'time'}"
                                    @click="setCalculationMode('time')"
                                    style="font-size: 0.85rem; padding: 0.5rem 0.5rem;">
                                    Loan Tenure
                                </button>
                                <button 
                                    type="button"
                                    :class="{'active': calculationMode === 'loan'}"
                                    @click="setCalculationMode('loan')"
                                    style="font-size: 0.85rem; padding: 0.5rem 0.5rem;">
                                    Loan Amount
                                </button>
                            </div>
                        </div>

                        <!-- Section: Loan Details -->
                        <h4 style="margin: 2rem 0 1rem 0; display: flex; align-items: center; gap: 0.5rem;">
                            💰 Loan Details
                            <span class="help-icon help-icon-wide" data-tooltip="The core loan parameters: how much you borrow, for how long, and your monthly payment">ℹ️</span>
                        </h4>

                        <!-- Time Period Input - Show if not calculating time -->
                        <div class="input-group" v-if="calculationMode !== 'time'">
                            <label>
                                Loan Tenure:&nbsp;<strong>{{ formattedTimePeriod }}</strong>
                                <span class="help-icon help-icon-wide" data-tooltip="Duration of your loan. Longer tenure = lower EMI but more total interest">ℹ️</span>
                            </label>
                            <div class="unit-selector-input">
                                <input 
                                    type="number" 
                                    v-model.number="formData.timePeriodValue" 
                                    min="1" 
                                    step="1"
                                    @input="debouncedCalculate"
                                >
                                <div class="unit-buttons">
                                    <button 
                                        type="button"
                                        :class="{'active': formData.timePeriodUnit === 'years'}"
                                        @click="formData.timePeriodUnit = 'years'; calculateResults()">
                                        Years
                                    </button>
                                    <button 
                                        type="button"
                                        :class="{'active': formData.timePeriodUnit === 'months'}"
                                        @click="formData.timePeriodUnit = 'months'; calculateResults()">
                                        Months
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Loan Amount Input - Show if not calculating loan -->
                        <div class="input-group" v-if="calculationMode !== 'loan'">
                            <label>
                                Loan Amount:&nbsp;<strong>₹ {{ formatCurrencyFull(loanAmount) }}</strong>
                                <span class="help-icon help-icon-wide" data-tooltip="The total amount you want to borrow">ℹ️</span>
                            </label>
                            <div class="unit-selector-input">
                                <input 
                                    type="number" 
                                    v-model.number="formData.loanAmountValue" 
                                    min="0" 
                                    step="0.1"
                                    @input="debouncedCalculate"
                                >
                                <div class="unit-buttons">
                                    <button 
                                        type="button"
                                        :class="{'active': formData.loanAmountUnit === 'crores'}"
                                        @click="formData.loanAmountUnit = 'crores'; calculateResults()">
                                        Crores
                                    </button>
                                    <button 
                                        type="button"
                                        :class="{'active': formData.loanAmountUnit === 'lakhs'}"
                                        @click="formData.loanAmountUnit = 'lakhs'; calculateResults()">
                                        Lakhs
                                    </button>
                                    <button 
                                        type="button"
                                        :class="{'active': formData.loanAmountUnit === 'thousands'}"
                                        @click="formData.loanAmountUnit = 'thousands'; calculateResults()">
                                        Thousands
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- EMI Amount Input - Show if not calculating EMI -->
                        <div class="input-group" v-if="calculationMode !== 'emi'">
                            <label>
                                Monthly EMI:&nbsp;<strong>₹ {{ formatCurrencyFull(monthlyEMI) }}</strong>
                                <span class="help-icon help-icon-wide" data-tooltip="The fixed amount you will pay every month">ℹ️</span>
                            </label>
                            <div class="unit-selector-input">
                                <input 
                                    type="number" 
                                    v-model.number="formData.emiValue" 
                                    min="0" 
                                    step="0.1"
                                    @input="debouncedCalculate"
                                >
                                <div class="unit-buttons">
                                    <button 
                                        type="button"
                                        :class="{'active': formData.emiUnit === 'crores'}"
                                        @click="formData.emiUnit = 'crores'; calculateResults()">
                                        Crores
                                    </button>
                                    <button 
                                        type="button"
                                        :class="{'active': formData.emiUnit === 'lakhs'}"
                                        @click="formData.emiUnit = 'lakhs'; calculateResults()">
                                        Lakhs
                                    </button>
                                    <button 
                                        type="button"
                                        :class="{'active': formData.emiUnit === 'thousands'}"
                                        @click="formData.emiUnit = 'thousands'; calculateResults()">
                                        Thousands
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Start Month Selection -->
                        <div class="input-group">
                            <label>
                                Loan Start Month:
                                <span class="help-icon help-icon-wide" data-tooltip="When you plan to start the loan. This determines the calendar dates in your repayment plan">ℹ️</span>
                            </label>
                            <input type="month" v-model="formData.startMonth" @input="debouncedCalculate">
                        </div>

                        <!-- Section: Rates -->
                        <h4 style="margin: 2rem 0 1rem 0; display: flex; align-items: center; gap: 0.5rem;">
                            📊 Rates
                            <span class="help-icon help-icon-wide" data-tooltip="Interest and inflation rates used in the calculation">ℹ️</span>
                        </h4>

                        <div class="input-group-row">
                            <div class="input-group-col" style="flex: 1;">
                                <label>
                                    Interest Rate:&nbsp;<strong>{{ formData.interestRate }}%</strong>
                                    <span class="help-icon help-icon-wide" data-tooltip="Annual interest rate on your loan. Home loans: 8-9%, Personal loans: 10-15%, Car loans: 9-11%">ℹ️</span>
                                </label>
                                <input 
                                    type="number" 
                                    v-model.number="formData.interestRate" 
                                    min="0.1" 
                                    max="30" 
                                    step="0.1"
                                    @input="debouncedCalculate"
                                >
                            </div>

                            <div class="input-group-col" style="flex: 1;">
                                <label>
                                    Inflation Rate:&nbsp;<strong>{{ formData.inflationRate }}%</strong>
                                    <span class="help-icon help-icon-wide" data-tooltip="Expected average inflation rate per year. Used to calculate real burden in today's money. Historical India average: 5-7%">ℹ️</span>
                                </label>
                                <input 
                                    type="number" 
                                    v-model.number="formData.inflationRate" 
                                    min="0" 
                                    max="15" 
                                    step="0.5"
                                    @input="debouncedCalculate"
                                >
                            </div>
                        </div>

                        <p style="font-size: 0.9em; color: #666; margin-top: 1rem; font-style: italic;">💡 Results update automatically as you adjust inputs</p>
                    </div>

                    <!-- Compare Scenarios Box (below inputs, same column) -->
                    <div class="sip-inputs">
                        <h3 style="margin: 0 0 0.75rem 0; font-size: 1.1em; color: #2c3e50; display: flex; align-items: center; gap: 0.4rem;">⚖️ Compare Scenarios <span class="help-icon help-icon-wide" data-tooltip="Save this scenario to compare side-by-side with others. Up to 6 scenarios. Saved in your browser.">ℹ️</span></h3>
                        <label style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                            <span>Scenario Name (Optional):</span>
                        </label>
                        <div style="display: flex; gap: 0.5rem;">
                            <input
                                type="text"
                                v-model="formData.scenarioName"
                                placeholder="e.g., Scenario 1"
                                style="flex: 1; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem;">
                            <button
                                type="button"
                                @click="addToCompare"
                                class="share-button"
                                style="flex-shrink: 0; min-width: 90px;"
                                :disabled="!results.calculated">
                                ➕ Add
                            </button>
                            <button
                                type="button"
                                v-if="comparisonItems.length > 0"
                                class="share-button"
                                @click="scrollToCompare"
                                style="flex-shrink: 0; min-width: 80px;">
                                👁️ View ({{ comparisonItems.length }})
                            </button>
                        </div>
                    </div>
                    </div><!-- end left column wrapper -->
                    
                    <!-- Right Column: Output Results and Chart -->
                    <div class="sip-outputs" v-if="results.calculated">
                        <div class="sip-summary">
                            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem; gap: 1rem;">
                                <h3 style="margin: 0;">🎯 Calculated Result</h3>
                                <div style="display: flex; gap: 0.5rem; flex-shrink: 0;">
                                    <button 
                                        type="button" 
                                        class="share-button"
                                        @click="shareCalculation"
                                        :disabled="!results.calculated"
                                        style="min-width: 110px;">
                                        {{ shareButtonText }}
                                    </button>
                                    <button 
                                        type="button" 
                                        class="share-button"
                                        @click="copyJSON"
                                        :disabled="!results.calculated"
                                        style="min-width: 110px;">
                                        {{ copyButtonText }}
                                    </button>
                                </div>
                            </div>
                            <table class="summary-table">
                                <tbody>
                                    <tr v-if="calculationMode === 'loan'">
                                        <td><strong>Maximum Loan Amount</strong></td>
                                        <td class="highlight">
                                            <span class="help-icon" :data-tooltip="'₹ ' + results.calculatedValue.toLocaleString('en-IN', {maximumFractionDigits: 0})" style="cursor: default; opacity: 1; font-size: 1.2em;">₹ {{ formatCurrency(results.calculatedValue) }}</span>
                                        </td>
                                    </tr>
                                    <tr v-if="calculationMode === 'time'">
                                        <td><strong>Time Required</strong></td>
                                        <td class="highlight">{{ results.timeRequired }}</td>
                                    </tr>
                                    <tr v-if="calculationMode === 'emi'">
                                        <td><strong>Required Monthly EMI</strong></td>
                                        <td class="highlight">
                                            <span class="help-icon" :data-tooltip="'₹ ' + results.calculatedValue.toLocaleString('en-IN', {maximumFractionDigits: 0})" style="cursor: default; opacity: 1; font-size: 1.2em;">₹ {{ formatCurrency(results.calculatedValue) }}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            
                            <h3 style="margin: 1rem 0 0.5rem 0;">📊 Loan Cost Analysis</h3>
                            <table class="summary-table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Nominal</th>
                                        <th>Real</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Loan Amount</strong></td>
                                        <td>
                                            <span class="help-icon" :data-tooltip="'₹ ' + results.nominalLoanAmount.toLocaleString('en-IN', {maximumFractionDigits: 0})" style="cursor: default; opacity: 1; font-size: 1.2em;">₹ {{ formatCurrency(results.nominalLoanAmount) }}</span>
                                        </td>
                                        <td>
                                            <span class="help-icon" :data-tooltip="'₹ ' + results.realLoanAmount.toLocaleString('en-IN', {maximumFractionDigits: 0})" style="cursor: default; opacity: 1; font-size: 1.2em;">₹ {{ formatCurrency(results.realLoanAmount) }}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>Interest Paid</strong></td>
                                        <td style="background-color: #fff3cd; font-weight: 600;">
                                            <span class="help-icon" :data-tooltip="'₹ ' + (results.totalNominalEMIs - results.nominalLoanAmount).toLocaleString('en-IN', {maximumFractionDigits: 0})" style="cursor: default; opacity: 1; font-size: 1.2em;">₹ {{ formatCurrency(results.totalNominalEMIs - results.nominalLoanAmount) }}</span>
                                            <div style="font-size: 0.85em; color: #666; margin-top: 2px;">{{ (((results.totalNominalEMIs - results.nominalLoanAmount) / results.nominalLoanAmount) * 100).toFixed(1) }}%</div>
                                        </td>
                                        <td style="background-color: #d4edda; font-weight: 600;">
                                            <span class="help-icon" :data-tooltip="'₹ ' + (results.totalRealEMIs - results.realLoanAmount).toLocaleString('en-IN', {maximumFractionDigits: 0})" style="cursor: default; opacity: 1; font-size: 1.2em;">₹ {{ formatCurrency(results.totalRealEMIs - results.realLoanAmount) }}</span>
                                            <div style="font-size: 0.85em; color: #666; margin-top: 2px;">{{ (((results.totalRealEMIs - results.realLoanAmount) / results.realLoanAmount) * 100).toFixed(1) }}%</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>Total EMIs Paid</strong></td>
                                        <td>
                                            <span class="help-icon" :data-tooltip="'₹ ' + results.totalNominalEMIs.toLocaleString('en-IN', {maximumFractionDigits: 0})" style="cursor: default; opacity: 1; font-size: 1.2em;">₹ {{ formatCurrency(results.totalNominalEMIs) }}</span>
                                            <div style="font-size: 0.85em; color: #666; margin-top: 2px;">{{ (results.totalNominalEMIs / results.nominalLoanAmount).toFixed(2) }}x</div>
                                        </td>
                                        <td>
                                            <span class="help-icon" :data-tooltip="'₹ ' + results.totalRealEMIs.toLocaleString('en-IN', {maximumFractionDigits: 0})" style="cursor: default; opacity: 1; font-size: 1.2em;">₹ {{ formatCurrency(results.totalRealEMIs) }}</span>
                                            <div style="font-size: 0.85em; color: #666; margin-top: 2px;">{{ (results.totalRealEMIs / results.realLoanAmount).toFixed(2) }}x</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            
                            <div id="emi-breakdown-chart" style="width: 100%; height: 420px; margin-top: 1.5rem;"></div>
                            <h3 style="margin-top: 1.5rem; margin-bottom: 0.5rem;">Understanding Values</h3>
                            <ul style="font-size: 0.9em; color: #666; line-height: 1.8;">
                                <li><strong>Nominal:</strong> Actual rupee amounts, unadjusted for inflation.</li>
                                <li><strong>Real:</strong> Today's purchasing power, adjusted for inflation.</li>
                            </ul>
                            <p style="font-size: 0.9em; color: #666; margin-top: 0.5rem;">
                                📚 Learn more: <a href="#frequently-asked-questions-faqs" style="color: #0066cc; text-decoration: none;">FAQs</a> | 
                                <a href="#help" style="color: #0066cc; text-decoration: none;">Help</a>
                            </p>
                        </div>
                    </div>
                    
                    <div class="sip-outputs placeholder" v-else>
                        <div class="placeholder-content">
                            <h3 style="margin-top: 0;">🎯 Your Results Will Appear Here</h3>
                            <p>Fill in your loan details on the left to see your EMI analysis</p>
                            <div class="placeholder-features">
                                <p>✅ Nominal vs Real EMI burden</p>
                                <p>✅ Inflation-adjusted cost analysis</p>
                                <p>✅ Month-by-month repayment tracking</p>
                                <p>✅ Interactive EMI burden chart</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- EMI Plan - Full Width Below -->
                <div class="investment-plan" v-if="results.calculated && monthlyPlan.length > 0">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem;">
                        <div style="display: flex; gap: 1rem; align-items: center;">
                            <h2 style="margin: 0;">📊 EMI Burden Over Time</h2>
                            <!-- Tab Toggle -->
                            <div class="mode-toggle">
                                <button 
                                    type="button"
                                    :class="{'active': emiBurdenTab === 'chart'}"
                                    @click="emiBurdenTab = 'chart'"
                                    style="white-space: nowrap;">
                                    📊 Chart
                                </button>
                                <button 
                                    type="button"
                                    :class="{'active': emiBurdenTab === 'data'}"
                                    @click="emiBurdenTab = 'data'"
                                    style="white-space: nowrap;">
                                    📋 Table
                                </button>
                            </div>
                        </div>
                        <div style="display: flex; gap: 1rem; align-items: center;">
                            <!-- Time Granularity Toggle -->
                            <div class="mode-toggle">
                                <button 
                                    type="button"
                                    :class="{'active': planGranularity === 'yearly'}"
                                    @click="planGranularity = 'yearly'">
                                    Yearly
                                </button>
                                <button 
                                    type="button"
                                    :class="{'active': planGranularity === 'monthly'}"
                                    @click="planGranularity = 'monthly'">
                                    Monthly
                                </button>
                            </div>
                            <!-- Mode Toggle -->
                            <div class="mode-toggle">
                                <button 
                                    type="button"
                                    :class="{'active': planViewMode === 'nominal'}"
                                    @click="planViewMode = 'nominal'">
                                    Nominal
                                </button>
                                <button 
                                    type="button"
                                    :class="{'active': planViewMode === 'real'}"
                                    @click="planViewMode = 'real'">
                                    Real
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Chart Tab -->
                    <div v-show="emiBurdenTab === 'chart'" style="margin-bottom: 2rem;">
                        <div id="emi-chart" style="width: 100%; height: 400px;"></div>
                    </div>
                    
                    <!-- Data Tab -->
                    <div v-show="emiBurdenTab === 'data'" class="plan-table-wrapper">
                        <table class="plan-table" style="margin: 0;">
                            <thead>
                                <tr>
                                    <th rowspan="2">{{ planGranularity === 'yearly' ? 'Year' : 'Year/Month' }}</th>
                                    <th colspan="3">EMI Payment</th>
                                    <th colspan="2">Outstanding</th>
                                </tr>
                                <tr>
                                    <th>{{ planGranularity === 'yearly' ? 'Yearly' : 'Monthly' }}</th>
                                    <th>Principal</th>
                                    <th>Interest</th>
                                    <th>Principal</th>
                                    <th>EMI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row, index) in displayedPlan" :key="index">
                                    <td>{{ row.period }}</td>
                                    <td>₹{{ formatCurrencyFull(row.emi) }}</td>
                                    <td>₹{{ formatCurrencyFull(row.principal) }}</td>
                                    <td>₹{{ formatCurrencyFull(row.interest) }}</td>
                                    <td>₹{{ formatCurrencyFull(row.outstanding) }}</td>
                                    <td>₹{{ formatCurrencyFull(row.outstandingEMI) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <!-- Monthly EMI Plan - Full Width Below -->
                <div class="investment-plan" v-if="results.calculated && emiTable.length > 0">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <div style="display: flex; gap: 1rem; align-items: center;">
                            <h2 style="margin: 0;">📅 Monthly EMI Plan</h2>
                            <!-- Tab Toggle -->
                            <div class="mode-toggle">
                                <button 
                                    type="button"
                                    :class="{'active': monthlyPlanTab === 'chart'}"
                                    @click="monthlyPlanTab = 'chart'"
                                    style="white-space: nowrap;">
                                    📊 Chart
                                </button>
                                <button 
                                    type="button"
                                    :class="{'active': monthlyPlanTab === 'data'}"
                                    @click="monthlyPlanTab = 'data'"
                                    style="white-space: nowrap;">
                                    📋 Table
                                </button>
                            </div>
                        </div>
                        <!-- View Mode Toggle -->
                        <div class="mode-toggle">
                            <button 
                                type="button"
                                :class="{'active': emiViewMode === 'nominal'}"
                                @click="emiViewMode = 'nominal'; renderEMIPlanChart();">
                                Nominal
                            </button>
                            <button 
                                type="button"
                                :class="{'active': emiViewMode === 'real'}"
                                @click="emiViewMode = 'real'; renderEMIPlanChart();">
                                Real
                            </button>
                        </div>
                    </div>
                    
                    <!-- Chart Tab -->
                    <div v-show="monthlyPlanTab === 'chart'" style="margin-bottom: 2rem;">
                        <div id="emiPlanChart" style="width: 100%; height: 400px;"></div>
                    </div>
                    
                    <!-- Data Tab -->
                    <div v-show="monthlyPlanTab === 'data'" class="plan-table-wrapper">
                        <table class="plan-table" style="margin: 0;">
                            <thead>
                                <tr>
                                    <th>Year</th>
                                    <th>Jan</th>
                                    <th>Feb</th>
                                    <th>Mar</th>
                                    <th>Apr</th>
                                    <th>May</th>
                                    <th>Jun</th>
                                    <th>Jul</th>
                                    <th>Aug</th>
                                    <th>Sep</th>
                                    <th>Oct</th>
                                    <th>Nov</th>
                                    <th>Dec</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(yearRow, index) in emiTable" :key="index">
                                    <td><strong>{{ yearRow.year }}</strong></td>
                                    <td v-for="(amount, monthIndex) in yearRow.months" :key="monthIndex">
                                        <span v-if="amount !== null" class="help-icon" :data-tooltip="'₹ ' + (emiViewMode === 'nominal' ? amount.nominal : amount.real).toLocaleString('en-IN', {maximumFractionDigits: 0})" style="cursor: default; opacity: 1;">{{ formatCurrency(emiViewMode === 'nominal' ? amount.nominal : amount.real) }}</span>
                                        <span v-else style="color: #999;">-</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- Compare Scenarios -->
                <div id="compare-scenarios" class="investment-plan" v-if="comparisonItems.length > 0" style="margin-bottom: 2rem; scroll-margin-top: 80px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
                        <div style="display: flex; gap: 1rem; align-items: center;">
                            <h2 style="margin: 0;">⚖️ Compare Scenarios</h2>
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

                            <div style="font-size: 0.85em; font-weight: bold; color: #555; margin-bottom: 0.75rem; border-bottom: 1px solid rgba(0,0,0,0.1); padding-bottom: 0.4rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: center;">
                                {{ item.inputs.scenarioName || 'Scenario ' + (index + 1) }}
                            </div>
                            
                            <div style="font-size: 0.95em; text-align: left; line-height: 1.4;">
                                <div :style="item.inputs.calculationMode === 'loan' ? { fontWeight: 'bold', color: '#2980b9' } : {}">
                                    <span style="color: #666; font-size: 0.75em; display: block; text-transform: uppercase; letter-spacing: 0.5px;">Loan Amount</span>
                                    ₹{{ formatCurrencyFull(item.outputs.nominalLoanAmount) }}
                                </div>
                                
                                <div :style="item.inputs.calculationMode === 'time' ? { fontWeight: 'bold', color: '#2980b9', marginTop: '0.6rem' } : { marginTop: '0.6rem' }">
                                    <span style="color: #666; font-size: 0.75em; display: block; text-transform: uppercase; letter-spacing: 0.5px;">Tenure</span>
                                    <span style="text-transform: capitalize;">{{ item.inputs.calculationMode === 'time' ? item.outputs.timeRequired : item.inputs.timePeriodValue + ' ' + (item.inputs.timePeriodValue === 1 ? item.inputs.timePeriodUnit.slice(0, -1) : item.inputs.timePeriodUnit) }}</span>
                                </div>
                                
                                <div :style="item.inputs.calculationMode === 'emi' ? { fontWeight: 'bold', color: '#2980b9', marginTop: '0.6rem' } : { marginTop: '0.6rem' }">
                                    <span style="color: #666; font-size: 0.75em; display: block; text-transform: uppercase; letter-spacing: 0.5px;">EMI</span>
                                    ₹{{ formatCurrencyFull(item.inputs.calculationMode === 'emi' ? item.outputs.calculatedValue : item.inputs.emiValue * (item.inputs.emiUnit === 'crores' ? 10000000 : item.inputs.emiUnit === 'lakhs' ? 100000 : 1000)) }}
                                </div>
                                
                                <div style="margin-top: 0.6rem; border-top: 1px dashed rgba(0,0,0,0.15); padding-top: 0.5rem; font-weight: bold;">
                                    <span style="color: #666; font-size: 0.75em; display: block; text-transform: uppercase; letter-spacing: 0.5px; font-weight: normal;">Interest (Real)</span>
                                    ₹{{ formatCurrencyFull(item.outputs.totalRealEMIs - item.outputs.realLoanAmount) }}
                                    <span style="font-size: 0.8em; color: #888; font-weight: normal; margin-left: 2px;">({{ (((item.outputs.totalRealEMIs - item.outputs.realLoanAmount) / item.outputs.realLoanAmount) * 100).toFixed(1) }}%)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="showComparisonTable" class="table-responsive" style="margin-top: 1rem; border-top: 1px solid #eee; padding-top: 1rem;">
                        <table class="summary-table">
                            <thead>
                                <tr>
                                    <th style="min-width: 180px;"></th>
                                    <th v-for="(item, index) in comparisonItems" :key="item.id" style="text-align: center; min-width: 120px; position: relative; padding: 0.5rem 1.5rem;">
                                        {{ item.inputs.scenarioName || 'Scenario ' + (index + 1) }}
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
                                    <td><strong>Calculation Mode</strong></td>
                                    <td v-for="item in comparisonItems" :key="'mode-'+item.id" style="text-align: right; color: #666;">
                                        {{ item.inputs.calculationMode === 'emi' ? 'Loan EMI' : item.inputs.calculationMode === 'time' ? 'Loan Tenure' : 'Loan Amount' }}
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Loan Amount</strong></td>
                                    <td v-for="item in comparisonItems" :key="'out-loan-'+item.id" :style="item.inputs.calculationMode === 'loan' ? { textAlign: 'right', fontWeight: 'bold', color: '#2980b9', background: '#f0f7ff', fontSize: '1.1em' } : { textAlign: 'right', fontWeight: 'bold', fontSize: '1.1em' }">
                                        ₹{{ formatCurrencyFull(item.outputs.nominalLoanAmount) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Tenure</strong></td>
                                    <td v-for="item in comparisonItems" :key="'out-time-'+item.id" :style="item.inputs.calculationMode === 'time' ? { textAlign: 'right', fontWeight: 'bold', color: '#2980b9', background: '#f0f7ff', textTransform: 'capitalize', fontSize: '1.1em' } : { textAlign: 'right', fontWeight: 'bold', textTransform: 'capitalize', fontSize: '1.1em' }">
                                        {{ item.inputs.calculationMode === 'time' ? item.outputs.timeRequired : item.inputs.timePeriodValue + ' ' + (item.inputs.timePeriodValue === 1 ? item.inputs.timePeriodUnit.slice(0, -1) : item.inputs.timePeriodUnit) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>EMI</strong></td>
                                    <td v-for="item in comparisonItems" :key="'out-emi-'+item.id" :style="item.inputs.calculationMode === 'emi' ? { textAlign: 'right', fontWeight: 'bold', color: '#2980b9', background: '#f0f7ff', fontSize: '1.1em' } : { textAlign: 'right', fontWeight: 'bold', fontSize: '1.1em' }">
                                        ₹{{ formatCurrencyFull(item.inputs.calculationMode === 'emi' ? item.outputs.calculatedValue : item.inputs.emiValue * (item.inputs.emiUnit === 'crores' ? 10000000 : item.inputs.emiUnit === 'lakhs' ? 100000 : 1000)) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Interest Rate</strong></td>
                                    <td v-for="item in comparisonItems" :key="'in-rate-'+item.id" style="text-align: right;">
                                        {{ item.inputs.interestRate }}%
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Inflation Rate</strong></td>
                                    <td v-for="item in comparisonItems" :key="'in-inf-'+item.id" style="text-align: right; color: #666;">
                                        {{ item.inputs.inflationRate }}%
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Interest (Nominal)</strong></td>
                                    <td v-for="item in comparisonItems" :key="'out-nint-'+item.id" style="text-align: right;">
                                        <div style="font-size: 1.05em;">₹{{ formatCurrencyFull(item.outputs.totalNominalEMIs - item.outputs.nominalLoanAmount) }}</div>
                                        <div style="font-size: 0.85em; color: #666; margin-top: 2px;">{{ (((item.outputs.totalNominalEMIs - item.outputs.nominalLoanAmount) / item.outputs.nominalLoanAmount) * 100).toFixed(1) }}%</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Interest (Real)</strong></td>
                                    <td v-for="item in comparisonItems" :key="'out-rint-'+item.id" style="text-align: right; font-weight: bold;">
                                        <div style="font-size: 1.1em;">₹{{ formatCurrencyFull(item.outputs.totalRealEMIs - item.outputs.realLoanAmount) }}</div>
                                        <div style="font-size: 0.85em; color: #999; margin-top: 2px; font-weight: normal;">{{ (((item.outputs.totalRealEMIs - item.outputs.realLoanAmount) / item.outputs.realLoanAmount) * 100).toFixed(1) }}%</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Total EMI (Nominal)</strong></td>
                                    <td v-for="item in comparisonItems" :key="'out-temi-'+item.id" style="text-align: right;">
                                        <div style="font-size: 1.05em;">₹{{ formatCurrencyFull(item.outputs.totalNominalEMIs) }}</div>
                                        <div style="font-size: 0.85em; color: #666; margin-top: 2px;">{{ (item.outputs.totalNominalEMIs / item.outputs.nominalLoanAmount).toFixed(2) }}x</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Total EMI (Real)</strong></td>
                                    <td v-for="item in comparisonItems" :key="'out-tremi-'+item.id" style="text-align: right; color: #666;">
                                        <div style="font-size: 1.05em;">₹{{ formatCurrencyFull(item.outputs.totalRealEMIs) }}</div>
                                        <div style="font-size: 0.85em; color: #999; margin-top: 2px;">{{ (item.outputs.totalRealEMIs / item.outputs.realLoanAmount).toFixed(2) }}x</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div v-if="comparisonItems.length === 0" class="investment-plan" style="margin-bottom: 2rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
                        <div style="display: flex; gap: 1rem; align-items: center;">
                            <h2 style="margin: 0;">⚖️ Compare Scenarios</h2>
                        </div>
                    </div>
                    <div style="text-align: center; padding: 2rem 0; color: #999;">
                        <p>No scenarios to compare yet. Click <strong>➕ Add</strong> under <strong>⚖️ Compare Scenarios</strong> with an optional scenario name to get started.</p>
                    </div>
                </div>
                


            </div>
        </div>
    `;

    // Initialize Vue App
    const { createApp } = Vue;

    const app = createApp({
        data() {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            
            return {
                formData: {
                    calculationMode: 'emi',
                    timePeriodValue: 20,
                    timePeriodUnit: 'years',
                    loanAmountValue: 50,
                    loanAmountUnit: 'lakhs',
                    emiValue: 50,
                    emiUnit: 'thousands',
                    interestRate: 9,
                    inflationRate: 6,
                    startMonth: currentYear + '-' + currentMonth,
                    scenarioName: ''
                },
                calculationMode: 'emi',
                results: {
                    calculated: false,
                    calculatedValue: null,
                    timeRequired: null,
                    nominalLoanAmount: 0,
                    realLoanAmount: 0,
                    totalNominalEMIs: 0,
                    totalRealEMIs: 0,
                    numberOfMonths: 0
                },
                comparisonItems: [],
                showComparisonTable: false,
                monthlyPlan: [],
                emiTable: [],
                emiBurdenTab: 'chart',
                monthlyPlanTab: 'chart',
                emiViewMode: 'nominal',
                planViewMode: 'nominal',
                planGranularity: 'yearly',
                calculating: false,
                debounceTimer: null,
                chart: null,
                emiPlanChart: null,
                breakdownChart: null,
                copyButtonText: '📋 JSON',
                shareButtonText: '🔗 Share'
            }
        },
        computed: {
            loanAmount() {
                const { loanAmountValue, loanAmountUnit } = this.formData;
                return loanAmountValue * CURRENCY_MULTIPLIERS[loanAmountUnit];
            },
            monthlyEMI() {
                const { emiValue, emiUnit } = this.formData;
                return emiValue * CURRENCY_MULTIPLIERS[emiUnit];
            },
            numberOfYears() {
                const { timePeriodValue, timePeriodUnit } = this.formData;
                return timePeriodUnit === 'months' ? timePeriodValue / 12 : timePeriodValue;
            },
            formattedTimePeriod() {
                const { timePeriodValue, timePeriodUnit } = this.formData;
                
                if (timePeriodUnit === 'years') {
                    return timePeriodValue + ' ' + (timePeriodValue === 1 ? 'Year' : 'Years');
                } else {
                    const totalMonths = Math.floor(timePeriodValue);
                    const years = Math.floor(totalMonths / 12);
                    const months = totalMonths % 12;
                    
                    if (years === 0) {
                        return months + ' ' + (months === 1 ? 'Month' : 'Months');
                    } else if (months === 0) {
                        return years + ' ' + (years === 1 ? 'Year' : 'Years');
                    } else {
                        return years + ' ' + (years === 1 ? 'Year' : 'Years') + ' ' + months + ' ' + (months === 1 ? 'Month' : 'Months');
                    }
                }
            },
            displayedPlan() {
                if (!this.monthlyPlan || this.monthlyPlan.length === 0) return [];
                
                let filteredPlan = this.monthlyPlan;
                
                // Get the standard monthly EMI (not the last potentially different one)
                const standardEMI = this.monthlyPlan[0].emi;
                const standardRealEMI = this.monthlyPlan[0].realEMI;
                
                if (this.planGranularity === 'yearly') {
                    filteredPlan = this.monthlyPlan.filter((row, index) => {
                        const isDecember = row.month === 'Dec';
                        const isLastMonth = index === this.monthlyPlan.length - 1;
                        return isDecember || isLastMonth;
                    });
                    
                    return filteredPlan.map((row, index) => {
                        const yearRows = this.monthlyPlan.filter(r => r.year === row.year);
                        const isLastYear = index === filteredPlan.length - 1;
                        
                        if (this.planViewMode === 'nominal') {
                            const yearlyPrincipal = yearRows.reduce((sum, r) => sum + (r.principal || 0), 0);
                            const yearlyInterest = yearRows.reduce((sum, r) => sum + (r.interest || 0), 0);
                            const yearlyEMI = yearlyPrincipal + yearlyInterest;
                            
                            return {
                                period: row.year,
                                emi: yearlyEMI,
                                principal: yearlyPrincipal,
                                interest: yearlyInterest,
                                outstanding: row.outstanding,
                                outstandingEMI: row.outstandingEMI
                            };
                        } else {
                            // Real mode
                            const yearlyRealPrincipal = Math.round(yearRows.reduce((sum, r) => sum + (r.realPrincipal || 0), 0));
                            const yearlyRealInterest = Math.round(yearRows.reduce((sum, r) => sum + (r.realInterest || 0), 0));
                            const yearlyRealEMI = yearlyRealPrincipal + yearlyRealInterest;
                            const inflationFactor = this.getInflationFactor(row.monthIndex + 1);
                            
                            return {
                                period: row.year,
                                emi: yearlyRealEMI,
                                principal: yearlyRealPrincipal,
                                interest: yearlyRealInterest,
                                outstanding: Math.round(row.outstanding / inflationFactor),
                                outstandingEMI: row.realOutstandingEMI
                            };
                        }
                    });
                } else {
                    return this.monthlyPlan.map((row, index) => {
                        if (this.planViewMode === 'nominal') {
                            return {
                                period: row.year + ' ' + row.month,
                                emi: row.emi,
                                principal: row.principal,
                                interest: row.interest,
                                outstanding: row.outstanding,
                                outstandingEMI: row.outstandingEMI
                            };
                        } else {
                            // Real mode
                            const inflationFactor = this.getInflationFactor(row.monthIndex + 1);
                            return {
                                period: row.year + ' ' + row.month,
                                emi: row.realEMI,
                                principal: row.realPrincipal,
                                interest: row.realInterest,
                                outstanding: Math.round(row.outstanding / inflationFactor),
                                outstandingEMI: row.realOutstandingEMI
                            };
                        }
                    });
                }
            },
            exportJSON() {
                if (!this.results.calculated) return '';
                
                const data = {
                    input: {
                        calculationMode: this.calculationMode,
                        timePeriod: this.calculationMode !== 'time' ? {
                            value: this.formData.timePeriodValue,
                            unit: this.formData.timePeriodUnit
                        } : null,
                        loanAmount: this.calculationMode !== 'loan' ? {
                            value: this.formData.loanAmountValue,
                            unit: this.formData.loanAmountUnit,
                            inRupees: this.loanAmount
                        } : null,
                        monthlyEMI: this.calculationMode !== 'emi' ? {
                            value: this.formData.emiValue,
                            unit: this.formData.emiUnit,
                            inRupees: this.monthlyEMI
                        } : null,
                        interestRate: this.formData.interestRate,
                        inflationRate: this.formData.inflationRate,
                        startMonth: this.formData.startMonth
                    },
                    output: {
                        calculatedValue: this.results.calculatedValue,
                        timeRequired: this.results.timeRequired,
                        nominalLoanAmount: this.results.nominalLoanAmount,
                        realLoanAmount: this.results.realLoanAmount,
                        totalNominalEMIs: this.results.totalNominalEMIs,
                        totalRealEMIs: this.results.totalRealEMIs,
                        nominalInterest: this.results.totalNominalEMIs - this.results.nominalLoanAmount,
                        realInterest: this.results.totalRealEMIs - this.results.realLoanAmount,
                        numberOfMonths: this.results.numberOfMonths
                    }
                };
                
                return JSON.stringify(data, null, 2);
            }
        },
        watch: {
            comparisonItems: {
                deep: true,
                handler(newVal) {
                    try {
                        localStorage.setItem(EMI_STORAGE_KEY, JSON.stringify(newVal));
                    } catch (e) {
                        console.warn('EMI Calculator: could not save to localStorage:', e);
                    }
                }
            },
            planViewMode() {
                this.$nextTick(() => {
                    this.updateChart();
                });
            },
            planGranularity() {
                this.$nextTick(() => {
                    this.updateChart();
                });
            }
        },
        methods: {
            scrollToCompare() {
                const el = document.getElementById('compare-scenarios');
                if (!el) return;
                const navbarHeight = document.querySelector('header, nav, .navbar, [role="navigation"]')?.offsetHeight || 70;
                const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
                window.scrollTo({ top, behavior: 'smooth' });
            },
            addToCompare() {
                if (!this.results.calculated) return;
                if (this.comparisonItems.length >= 6) {
                    alert('You can only compare a maximum of 6 scenarios at a time.');
                    return;
                }
                this.comparisonItems.push({
                    id: Date.now().toString(36) + Math.random().toString(36).substring(2),
                    inputs: JSON.parse(JSON.stringify(this.formData)),
                    outputs: JSON.parse(JSON.stringify(this.results))
                });
                // Ensure array triggers reactivity
                this.comparisonItems = [...this.comparisonItems];
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
            getCompareRank(val, type = 'nominal') {
                if (this.comparisonItems.length <= 1) return -1;
                // Rank based on lowest value
                const vals = [...new Set(this.comparisonItems.map(i => {
                    return type === 'real' 
                        ? (i.outputs.totalRealEMIs - i.outputs.realLoanAmount)
                        : (i.outputs.totalNominalEMIs - i.outputs.nominalLoanAmount);
                }))].sort((a, b) => a - b);
                return Math.max(0, vals.indexOf(val));
            },
            getCompareCardStyle(item) {
                return { borderRadius: '8px', padding: '1rem', position: 'relative', textAlign: 'left', minWidth: '180px', flex: '1', background: '#f8f9fa', border: '1px solid #dee2e6' };
            },
            getInflationFactor(monthIndex) {
                const monthlyInflation = Math.pow(1 + this.formData.inflationRate / 100, 1 / 12) - 1;
                return Math.pow(1 + monthlyInflation, monthIndex);
            },
            
            setCalculationMode(mode) {
                this.formData.calculationMode = mode;
                this.calculationMode = mode;
                this.calculateResults();
            },
            
            debouncedCalculate() {
                if (this.debounceTimer) {
                    clearTimeout(this.debounceTimer);
                }
                this.debounceTimer = setTimeout(() => {
                    this.calculateResults();
                }, DEBOUNCE_DELAY_MS);
            },
            
            calculateEMI(principal, monthlyRate, months) {
                if (monthlyRate === 0) {
                    return principal / months;
                }
                const compoundFactor = Math.pow(1 + monthlyRate, months);
                return principal * monthlyRate * compoundFactor / (compoundFactor - 1);
            },
            
            calculateLoanAmount(emi, monthlyRate, months) {
                if (monthlyRate === 0) {
                    return emi * months;
                }
                const compoundFactor = Math.pow(1 + monthlyRate, months);
                return emi * (compoundFactor - 1) / (monthlyRate * compoundFactor);
            },
            
            calculateTime(principal, emi, monthlyRate) {
                if (monthlyRate === 0) {
                    return Math.ceil(principal / emi);
                }
                
                const minimumEMI = principal * monthlyRate;
                if (emi <= minimumEMI) {
                    return -1;
                }
                
                const months = Math.log(emi / (emi - principal * monthlyRate)) / Math.log(1 + monthlyRate);
                return Math.ceil(months);
            },
            
            simulateEMI(params) {
                const { loanAmount, emi, months, interestRate, inflationRate } = params;
                const monthlyRate = interestRate / 100 / 12;
                const inflationBase = 1 + (Math.pow(1 + inflationRate / 100, 1 / 12) - 1);
                
                // Round EMI to whole rupee like banks do
                const roundedEMI = Math.round(emi);
                
                const monthlyData = [];
                let outstanding = loanAmount;
                let totalNominalEMIs = 0;
                let totalRealEMIs = 0;
                let inflationFactor = 1; // Start at 1, multiply each iteration
                
                for (let i = 0; i < months; i++) {
                    // Calculate interest (unrounded for precision)
                    const interestFloat = outstanding * monthlyRate;
                    
                    // Check if this is the last payment
                    const isLastPayment = (i === months - 1) || (outstanding <= roundedEMI);
                    
                    let actualEMI, principal, interest;
                    if (isLastPayment) {
                        // Last EMI: pay exactly what's remaining
                        principal = outstanding;
                        interest = Math.round(interestFloat);
                        actualEMI = principal + interest;
                        outstanding = 0;
                    } else {
                        // Regular EMI: round principal to maintain precision
                        actualEMI = roundedEMI;
                        principal = Math.round(roundedEMI - interestFloat);
                        interest = actualEMI - principal; // Ensures EMI = principal + interest exactly
                        outstanding = Math.round(outstanding - (roundedEMI - interestFloat));
                    }
                    
                    // Calculate real values in rupees
                    const realPrincipal = Math.round(principal / inflationFactor);
                    const realInterest = Math.round(interest / inflationFactor);
                    const realEMI = realPrincipal + realInterest; // Exact sum in rupees
                    
                    // Accumulate totals in the loop
                    totalNominalEMIs += actualEMI;
                    totalRealEMIs += realEMI;
                    
                    monthlyData.push({
                        monthIndex: i,
                        emi: actualEMI,
                        principal: principal,
                        interest: interest,
                        outstanding: outstanding,
                        realEMI: realEMI,
                        realPrincipal: realPrincipal,
                        realInterest: realInterest
                    });
                    
                    if (outstanding === 0) break;
                    
                    // Update inflation factor for next month (incremental multiplication)
                    inflationFactor *= inflationBase;
                }
                
                return {
                    monthlyData: monthlyData,
                    totalNominalEMIs: totalNominalEMIs,
                    totalRealEMIs: totalRealEMIs
                };
            },
            
            buildMonthlyPlan(simulation) {
                const parts = this.formData.startMonth.split('-');
                const startYear = parseInt(parts[0]);
                const startMonth = parseInt(parts[1]);
                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                
                // Enhance existing data with date info (avoid creating new objects)
                const plan = simulation.monthlyData;
                for (let i = 0; i < plan.length; i++) {
                    const monthOffset = startMonth - 1 + i;
                    plan[i].month = monthNames[monthOffset % 12];
                    plan[i].year = startYear + Math.floor(monthOffset / 12);
                }
                
                // Compute outstanding in reverse order - O(n) single pass
                // Accumulate totals as we go backwards
                let cumulativeEMI = 0;
                let cumulativeRealEMI = 0;
                
                for (let i = plan.length - 1; i >= 0; i--) {
                    // Set outstanding for current month
                    plan[i].outstandingEMI = cumulativeEMI;
                    plan[i].realOutstandingEMI = cumulativeRealEMI;
                    
                    // Add current month's EMIs to cumulative totals for previous months
                    cumulativeEMI += plan[i].emi;
                    cumulativeRealEMI += plan[i].realEMI;
                }
                
                return plan;
            },
            
            calculateResults() {
                if (this.calculating) return;
                this.calculating = true;
                
                try {
                    // Validate inputs
                    if (this.formData.interestRate < 0 || this.formData.inflationRate < 0) {
                        this.results.calculated = false;
                        this.calculating = false;
                        return;
                    }
                    
                    const mode = this.formData.calculationMode;
                    const monthlyRate = this.formData.interestRate / 100 / 12;
                    
                    let loanAmount, emi, months;
                    let calculatedValue = null;
                    let timeRequired = null;
                    
                    if (mode === 'loan') {
                        emi = this.monthlyEMI;
                        months = Math.ceil(this.numberOfYears * 12);
                        loanAmount = this.calculateLoanAmount(emi, monthlyRate, months);
                        calculatedValue = Math.round(loanAmount);
                    } else if (mode === 'time') {
                        emi = this.monthlyEMI;
                        loanAmount = this.loanAmount;
                        months = this.calculateTime(loanAmount, emi, monthlyRate);
                        
                        if (months === -1) {
                            this.results.calculated = false;
                            this.calculating = false;
                            return;
                        }
                        
                        const years = Math.floor(months / 12);
                        const remainingMonths = months % 12;
                        if (years === 0) {
                            timeRequired = remainingMonths + ' ' + (remainingMonths === 1 ? 'Month' : 'Months');
                        } else if (remainingMonths === 0) {
                            timeRequired = years + ' ' + (years === 1 ? 'Year' : 'Years');
                        } else {
                            timeRequired = years + ' ' + (years === 1 ? 'Year' : 'Years') + ' ' + remainingMonths + ' ' + (remainingMonths === 1 ? 'Month' : 'Months');
                        }
                    } else {
                        loanAmount = this.loanAmount;
                        months = Math.ceil(this.numberOfYears * 12);
                        emi = this.calculateEMI(loanAmount, monthlyRate, months);
                        calculatedValue = Math.round(emi);
                    }
                    
                    const simulation = this.simulateEMI({
                        loanAmount: loanAmount,
                        emi: emi,
                        months: months,
                        interestRate: this.formData.interestRate,
                        inflationRate: this.formData.inflationRate
                    });
                    
                    const realLoanAmount = loanAmount;
                    
                    this.results = {
                        calculated: true,
                        calculatedValue: calculatedValue,
                        timeRequired: timeRequired,
                        nominalLoanAmount: loanAmount,
                        realLoanAmount: realLoanAmount,
                        totalNominalEMIs: simulation.totalNominalEMIs,
                        totalRealEMIs: simulation.totalRealEMIs,
                        numberOfMonths: simulation.monthlyData.length
                    };
                    
                    this.monthlyPlan = this.buildMonthlyPlan(simulation);
                    this.emiTable = this.buildEMITable();
                    
                    this.$nextTick(() => {
                        this.updateChart();
                        this.renderEMIPlanChart();
                        this.renderBreakdownChart();
                    });
                } catch (error) {
                    console.error('Calculation error:', error);
                    this.results.calculated = false;
                } finally {
                    this.calculating = false;
                }
            },
            
            updateChart() {
                if (!this.chart) {
                    this.chart = echarts.init(document.getElementById('emi-chart'));
                }
                
                if (!this.monthlyPlan || this.monthlyPlan.length === 0) return;
                
                // Filter plan based on granularity
                let filteredPlan = this.monthlyPlan;
                if (this.planGranularity === 'yearly') {
                    filteredPlan = this.monthlyPlan.filter((row, index) => {
                        const isDecember = row.month === 'Dec';
                        const isLastMonth = index === this.monthlyPlan.length - 1;
                        return isDecember || isLastMonth;
                    });
                }
                
                const categories = [];
                const outstandingBalanceData = [];
                const outstandingEMIData = [];
                
                // Calculate total EMI first
                let totalEMI = 0;
                if (this.planViewMode === 'nominal') {
                    totalEMI = this.monthlyPlan.reduce((sum, row) => sum + row.emi, 0);
                } else {
                    totalEMI = this.monthlyPlan.reduce((sum, row) => sum + row.realEMI, 0);
                }
                
                let accumulatedEMI = 0;
                
                // For yearly view, we need to accumulate up to each year-end point
                this.monthlyPlan.forEach(row => {
                    const isYearEnd = filteredPlan.includes(row);
                    
                    if (this.planViewMode === 'nominal') {
                        accumulatedEMI += row.emi;
                    } else {
                        accumulatedEMI += row.realEMI;
                    }
                    
                    if (isYearEnd) {
                        categories.push(this.planGranularity === 'yearly' ? row.year : row.year + ' ' + row.month);
                        
                        if (this.planViewMode === 'nominal') {
                            outstandingBalanceData.push(row.outstanding);
                            outstandingEMIData.push(Math.round(totalEMI - accumulatedEMI));
                        } else {
                            // Real mode
                            const inflationFactor = this.getInflationFactor(row.monthIndex + 1);
                            outstandingBalanceData.push(Math.round(row.outstanding / inflationFactor));
                            outstandingEMIData.push(Math.round(totalEMI - accumulatedEMI));
                        }
                    }
                });
                
                const option = {
                    toolbox: {
                        feature: {
                            saveAsImage: { title: 'Save as Image' }
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function(params) {
                            return `<strong>${params.name}</strong><br/>${params.marker} ${params.seriesName}: ₹${params.value.toLocaleString('en-IN', {maximumFractionDigits: 0})}`;
                        },
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        },
                        backgroundColor: 'rgba(50, 50, 50, 0.9)',
                        borderColor: '#333',
                        borderWidth: 1,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    legend: {
                        data: ['Outstanding EMI', 'Outstanding Principal']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '2%',
                        top: '8%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: categories,
                        axisLabel: {
                            fontSize: 11,
                            rotate: 45
                        }
                    },
                    yAxis: {
                        type: 'value',
                        name: 'Amount (₹)',
                        nameLocation: 'middle',
                        nameGap: 50,
                        axisLabel: {
                            formatter: function(value) {
                                if (value >= 10000000) {
                                    return (value / 10000000).toFixed(1) + ' Cr';
                                } else if (value >= 100000) {
                                    return (value / 100000).toFixed(1) + ' L';
                                } else if (value >= 1000) {
                                    return (value / 1000).toFixed(1) + 'K';
                                }
                                return value.toLocaleString('en-IN');
                            },
                            fontSize: 11
                        }
                    },
                    series: [
                        {
                            name: 'Outstanding EMI',
                            type: 'line',
                            data: outstandingEMIData,
                            itemStyle: {
                                color: '#f39c12'
                            },
                            lineStyle: {
                                width: 3
                            },
                            areaStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    { offset: 0, color: 'rgba(243, 156, 18, 0.3)' },
                                    { offset: 1, color: 'rgba(243, 156, 18, 0.05)' }
                                ])
                            },
                            smooth: true
                        },
                        {
                            name: 'Outstanding Principal',
                            type: 'line',
                            data: outstandingBalanceData,
                            itemStyle: {
                                color: '#dc3545'
                            },
                            lineStyle: {
                                width: 3
                            },
                            areaStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    { offset: 0, color: 'rgba(220, 53, 69, 0.3)' },
                                    { offset: 1, color: 'rgba(220, 53, 69, 0.05)' }
                                ])
                            },
                            smooth: true
                        }
                    ]
                };
                
                this.chart.setOption(option);
            },
            
            formatCurrency(value) {
                if (value >= 10000000) {
                    return (value / 10000000).toFixed(2) + ' Cr';
                } else if (value >= 100000) {
                    return (value / 100000).toFixed(2) + ' L';
                } else if (value >= 1000) {
                    return (value / 1000).toFixed(2) + ' K';
                } else {
                    return Math.round(value).toLocaleString('en-IN');
                }
            },
            
            formatCurrencyFull(value) {
                return Math.round(value).toLocaleString('en-IN');
            },
            
            encodeState() {
                const f = this.formData;
                let url = 'v1';
                
                // Calculation mode (o)
                if (f.calculationMode === 'emi') {
                    url += 'oe';
                } else if (f.calculationMode === 'time') {
                    url += 'ot';
                } else if (f.calculationMode === 'loan') {
                    url += 'ol';
                }
                
                // Time period (d)
                const timeUnit = f.timePeriodUnit === 'years' ? 'y' : 'm';
                url += `d${f.timePeriodValue}${timeUnit}`;
                
                // Loan amount (l)
                const loanUnit = f.loanAmountUnit === 'crores' ? 'c' : 
                                 f.loanAmountUnit === 'lakhs' ? 'l' : 't';
                url += `l${f.loanAmountValue}${loanUnit}`;
                
                // EMI amount (e)
                const emiUnit = f.emiUnit === 'crores' ? 'c' : 
                                f.emiUnit === 'lakhs' ? 'l' : 't';
                url += `e${f.emiValue}${emiUnit}`;
                
                // Interest rate (r)
                url += `r${f.interestRate}`;
                
                // Inflation rate (i)
                url += `i${f.inflationRate}`;
                
                // Start month (s) - format YYYYMM
                if (f.startMonth) {
                    const ym = f.startMonth.replace('-', '');
                    url += `s${ym}`;
                }
                
                return url;
            },
            
            decodeState(hash) {
                if (!hash || !hash.startsWith('v1')) {
                    return null;
                }
                
                const state = {};
                let i = 2; // Skip 'v1'
                
                while (i < hash.length) {
                    const prefix = hash[i];
                    i++;
                    
                    let value = '';
                    
                    // Special handling for single-char prefixes
                    if (prefix === 'o') {
                        if (i < hash.length) {
                            value = hash[i];
                            i++;
                        }
                    } else if (prefix === 's') {
                        // Start month is always 6 digits (YYYYMM)
                        for (let j = 0; j < 6 && i < hash.length; j++) {
                            value += hash[i];
                            i++;
                        }
                    } else {
                        // Fields with unit suffixes: d, l, e
                        const hasUnitSuffix = ['d', 'l', 'e'].includes(prefix);
                        
                        while (i < hash.length) {
                            const char = hash[i];
                            const prevChar = value.slice(-1);
                            
                            // Check if this is a new prefix
                            if (/[odleris]/.test(char)) {
                                if (hasUnitSuffix && /\d/.test(prevChar)) {
                                    value += char;
                                    i++;
                                    break;
                                } else {
                                    break;
                                }
                            }
                            
                            value += char;
                            i++;
                        }
                    }
                    
                    // Parse based on prefix
                    switch(prefix) {
                        case 'o': // Calculation mode
                            if (value === 'e') state.calculationMode = 'emi';
                            else if (value === 't') state.calculationMode = 'time';
                            else if (value === 'l') state.calculationMode = 'loan';
                            break;
                        case 'd': // Time period
                            const timeUnit = value.slice(-1);
                            const timeValue = parseFloat(value.slice(0, -1));
                            state.timePeriodValue = timeValue;
                            state.timePeriodUnit = timeUnit === 'y' ? 'years' : 'months';
                            break;
                        case 'l': // Loan amount
                            const loanUnit = value.slice(-1);
                            const loanValue = parseFloat(value.slice(0, -1));
                            state.loanAmountValue = loanValue;
                            state.loanAmountUnit = loanUnit === 'c' ? 'crores' : 
                                                   loanUnit === 'l' ? 'lakhs' : 'thousands';
                            break;
                        case 'e': // EMI amount
                            const emiUnit = value.slice(-1);
                            const emiValue = parseFloat(value.slice(0, -1));
                            state.emiValue = emiValue;
                            state.emiUnit = emiUnit === 'c' ? 'crores' : 
                                           emiUnit === 'l' ? 'lakhs' : 'thousands';
                            break;
                        case 'r': // Interest rate
                            state.interestRate = parseFloat(value);
                            break;
                        case 'i': // Inflation rate
                            state.inflationRate = parseFloat(value);
                            break;
                        case 's': // Start month YYYYMM
                            if (value.length === 6) {
                                state.startMonth = `${value.slice(0,4)}-${value.slice(4,6)}`;
                            }
                            break;
                    }
                }
                
                return state;
            },
            
            async shareCalculation() {
                const encoded = this.encodeState();
                const url = `${window.location.origin}${window.location.pathname}#${encoded}`;
                
                try {
                    await navigator.clipboard.writeText(url);
                    this.shareButtonText = '✅ Copied!';
                    
                    // Update URL without reload
                    window.history.replaceState(null, '', `#${encoded}`);
                    
                    setTimeout(() => {
                        this.shareButtonText = '🔗 Share';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                    this.shareButtonText = '❌ Failed';
                    setTimeout(() => {
                        this.shareButtonText = '🔗 Share';
                    }, 2000);
                }
            },
            
            copyJSON() {
                const json = this.exportJSON;
                navigator.clipboard.writeText(json).then(() => {
                    this.copyButtonText = '✅ Copied!';
                    setTimeout(() => {
                        this.copyButtonText = '📋 JSON';
                    }, 2000);
                });
            },
            
            buildEMITable() {
                if (!this.monthlyPlan || this.monthlyPlan.length === 0) return [];
                
                const parts = this.formData.startMonth.split('-');
                const startYear = parseInt(parts[0]);
                const startMonth = parseInt(parts[1]) - 1;
                
                const table = [];
                const yearMap = {};
                
                this.monthlyPlan.forEach(row => {
                    const year = row.year;
                    const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(row.month);
                    
                    if (!yearMap[year]) {
                        yearMap[year] = { year: year, months: Array(12).fill(null) };
                    }
                    
                    yearMap[year].months[monthIndex] = {
                        nominal: row.emi,
                        real: row.realEMI
                    };
                });
                
                return Object.values(yearMap);
            },
            
            renderBreakdownChart() {
                if (!this.results.calculated) return;

                const chartDom = document.getElementById('emi-breakdown-chart');
                if (!chartDom) return;

                if (!this.breakdownChart) {
                    this.breakdownChart = echarts.init(chartDom);

                    if (!this.breakdownResizeHandler) {
                        this.breakdownResizeHandler = () => this.breakdownChart?.resize();
                        window.addEventListener('resize', this.breakdownResizeHandler);
                    }
                }

                const r = this.results;
                const nominalPrincipal = r.nominalLoanAmount;
                const nominalInterest  = r.totalNominalEMIs - r.nominalLoanAmount;
                const realPrincipal    = r.realLoanAmount;
                const realInterest     = r.totalRealEMIs - r.realLoanAmount;

                const fmt = v => {
                    const n = Math.round(v);
                    if (n >= 10000000) return '₹' + (n / 10000000).toFixed(2) + ' Cr';
                    if (n >= 100000)   return '₹' + (n / 100000).toFixed(2) + ' L';
                    if (n >= 1000)     return '₹' + (n / 1000).toFixed(2) + ' K';
                    return '₹' + n.toLocaleString('en-IN');
                };

                const labelMap = {
                    'Nominal|Principal':              'Nominal Principal',
                    'Nominal|Interest':               'Nominal Interest',
                    'Real (Inflation Adjusted)|Principal': 'Real Principal',
                    'Real (Inflation Adjusted)|Interest':  'Real Interest'
                };

                this.breakdownChart.setOption({
                    toolbox: {
                        feature: { saveAsImage: { title: 'Save as Image' } }
                    },
                    tooltip: {
                        formatter: function(p) {
                            const label = labelMap[p.seriesName + '|' + p.name] || (p.seriesName + ' ' + p.name);
                            return p.marker + '<strong>' + label + '</strong><br>' +
                                   fmt(p.value) + ' (' + p.percent.toFixed(2) + '%)';
                        }
                    },
                    legend: { bottom: 0 },
                    series: [
                        {
                            name: 'Nominal',
                            type: 'pie',
                            radius: ['55%', '80%'],
                            label: { formatter: function(p) {
                                const label = labelMap[p.seriesName + '|' + p.name] || (p.seriesName + ' ' + p.name);
                                return label + '\n' + fmt(p.value) + ' (' + p.percent.toFixed(2) + '%)';
                            }},
                            data: [
                                { value: Math.round(nominalPrincipal), name: 'Principal', itemStyle: { color: '#FFE082' } },
                                { value: Math.round(nominalInterest),  name: 'Interest',  itemStyle: { color: '#fca5a5' } }
                            ]
                        },
                        {
                            name: 'Real (Inflation Adjusted)',
                            type: 'pie',
                            radius: ['30%', '50%'],
                            label: { formatter: function(p) {
                                const label = labelMap[p.seriesName + '|' + p.name] || (p.seriesName + ' ' + p.name);
                                return label + '\n' + fmt(p.value) + ' (' + p.percent.toFixed(2) + '%)';
                            }},
                            data: [
                                { value: Math.round(realPrincipal), name: 'Principal', itemStyle: { color: '#FFC107' } },
                                { value: Math.round(realInterest),  name: 'Interest',  itemStyle: { color: '#dc2626' } }
                            ]
                        }
                    ],
                    graphic: {
                        type: 'text',
                        left: 'center',
                        top: 'center',
                        style: {
                            text: 'Real vs\nNominal',
                            textAlign: 'center',
                            fontSize: 16,
                            fontWeight: 600
                        }
                    }
                });
            },

            renderEMIPlanChart() {
                if (!this.emiPlanChart) {
                    this.emiPlanChart = echarts.init(document.getElementById('emiPlanChart'));
                }
                
                if (!this.monthlyPlan || this.monthlyPlan.length === 0) return;
                
                const categories = [];
                const emiData = [];
                
                this.monthlyPlan.forEach(row => {
                    categories.push(row.year + ' ' + row.month);
                    emiData.push(this.emiViewMode === 'nominal' ? row.emi : row.realEMI);
                });
                
                const option = {
                    toolbox: {
                        feature: {
                            saveAsImage: { title: 'Save as Image' }
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function(params) {
                            return `<strong>${params.name}</strong><br/>${params.marker} EMI: ₹${params.value.toLocaleString('en-IN', {maximumFractionDigits: 0})}`;
                        },
                        backgroundColor: 'rgba(50, 50, 50, 0.9)',
                        borderColor: '#333',
                        borderWidth: 1,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '2%',
                        top: '8%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: categories,
                        axisLabel: {
                            rotate: 45,
                            fontSize: 10,
                            interval: Math.max(0, Math.floor(categories.length / 24))
                        }
                    },
                    yAxis: {
                        type: 'value',
                        name: 'Amount (₹)',
                        nameLocation: 'middle',
                        nameGap: 50,
                        axisLabel: {
                            formatter: function(value) {
                                if (value >= 10000000) {
                                    return (value / 10000000).toFixed(1) + ' Cr';
                                } else if (value >= 100000) {
                                    return (value / 100000).toFixed(1) + ' L';
                                } else if (value >= 1000) {
                                    return (value / 1000).toFixed(1) + 'K';
                                }
                                return value.toLocaleString('en-IN');
                            },
                            fontSize: 11
                        }
                    },
                    series: [{
                        name: 'EMI',
                        type: 'bar',
                        data: emiData,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#f39c12' },
                                { offset: 1, color: '#f9c74f' }
                            ])
                        },
                        barMaxWidth: 40
                    }]
                };
                
                this.emiPlanChart.setOption(option);
            },
            
            loadFromUrl() {
                const hash = window.location.hash.slice(1); // Remove '#'
                if (!hash) return;
                
                const state = this.decodeState(hash);
                if (state) {
                    // Apply state to formData
                    Object.keys(state).forEach(key => {
                        if (state[key] !== undefined) {
                            this.formData[key] = state[key];
                            if (key === 'calculationMode') {
                                this.calculationMode = state[key];
                            }
                        }
                    });
                }
            }
        },
        mounted() {
            try {
                const saved = localStorage.getItem(EMI_STORAGE_KEY);
                if (saved) {
                    this.comparisonItems = JSON.parse(saved);
                }
            } catch (e) {
                console.warn('EMI Calculator: could not load from localStorage:', e);
            }

            this.loadFromUrl();
            this.calculateResults();
            
            // Add single resize listener
            this.handleResize = () => {
                if (this.chart) this.chart.resize();
                if (this.emiPlanChart) this.emiPlanChart.resize();
                if (this.breakdownChart) this.breakdownChart.resize();
            };
            window.addEventListener('resize', this.handleResize);
        },
        beforeUnmount() {
            // Clean up event listeners
            if (this.handleResize) {
                window.removeEventListener('resize', this.handleResize);
            }
            
            // Dispose charts
            if (this.chart) {
                this.chart.dispose();
                this.chart = null;
            }
            if (this.emiPlanChart) {
                this.emiPlanChart.dispose();
                this.emiPlanChart = null;
            }
            if (this.breakdownChart) {
                this.breakdownChart.dispose();
                this.breakdownChart = null;
            }
            if (this.breakdownResizeHandler) {
                window.removeEventListener('resize', this.breakdownResizeHandler);
            }
            
            // Clear debounce timer
            if (this.debounceTimer) {
                clearTimeout(this.debounceTimer);
                this.debounceTimer = null;
            }
        }
    });

    app.mount('#emi-calculator-app');
};

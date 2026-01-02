// RealValue SIP Engine (Vue.js + ECharts)
window.initializeTool = window.initializeTool || {};

// Constants
const CURRENCY_MULTIPLIERS = {
    crores: 10000000,
    lakhs: 100000,
    thousands: 1000
};
const MAX_INVESTMENT_YEARS = 100;
const MAX_INVESTMENT_MONTHS = MAX_INVESTMENT_YEARS * 12;
const DEBOUNCE_DELAY_MS = 300;

window.initializeTool.sipCalculator = function (container, config) {
    // Create Vue app template
    container.innerHTML = `
        <div id="sip-calculator-app">
            <div class="sip-calculator">
                <div class="sip-container">
                    <!-- Left Column: Input Fields -->
                    <div class="sip-inputs">
                        <h3 style="margin-top: 0;">🎯 Define Your Investment Goals</h3>
                        <!-- Target Group with Background -->
                        <div class="target-group">
                            <!-- Target Mode Block -->
                            <div class="input-group">
                                <label>
                                    Target Mode:
                                    <span class="help-icon" data-tooltip="Time: Calculate portfolio value for a fixed investment period.
Money: Calculate time needed to reach a target amount.
Time+Money: Calculate monthly SIP needed to reach target amount in fixed time">ℹ️</span>
                                </label>
                                <div class="mode-toggle">
                                    <button 
                                        type="button"
                                        :class="{'active': formData.targetTime}"
                                        @click="toggleTarget('time')">
                                        ⏱️ Time
                                    </button>
                                    <button 
                                        type="button"
                                        :class="{'active': formData.targetMoney}"
                                        @click="toggleTarget('money')">
                                        💰 Money
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Target Time Period Input - Show if Time is targeted -->
                            <div class="input-group" v-if="formData.targetTime">
                                <label>
                                    Target Time Period:&nbsp;<strong>{{ formattedTimePeriod }}</strong>
                                    <span class="help-icon" data-tooltip="Duration of your SIP investment. Long-term investing (10+ years) helps ride out market volatility">ℹ️</span>
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
                            
                            <!-- Target Amount Input - Show if Money is targeted -->
                            <div class="input-group" v-if="formData.targetMoney">
                                <label>
                                    Target Amount:&nbsp;<strong>₹ {{ formatCurrencyFull(targetAmount) }}</strong>
                                    <span class="help-icon" data-tooltip="🎯 Target in today's money (Real). The final portfolio value you want to achieve adjusted for inflation">ℹ️</span>
                                </label>
                                <div class="unit-selector-input">
                                    <input 
                                        type="number" 
                                        v-model.number="formData.targetAmountValue" 
                                        min="0" 
                                        step="0.1"
                                        @input="debouncedCalculate"
                                    >
                                    <div class="unit-buttons">
                                        <button 
                                            type="button"
                                            :class="{'active': formData.targetAmountUnit === 'crores'}"
                                            @click="formData.targetAmountUnit = 'crores'; calculateResults()">
                                            Crores
                                        </button>
                                        <button 
                                            type="button"
                                            :class="{'active': formData.targetAmountUnit === 'lakhs'}"
                                            @click="formData.targetAmountUnit = 'lakhs'; calculateResults()">
                                            Lakhs
                                        </button>
                                        <button 
                                            type="button"
                                            :class="{'active': formData.targetAmountUnit === 'thousands'}"
                                            @click="formData.targetAmountUnit = 'thousands'; calculateResults()">
                                            Thousands
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Start Month Selection -->
                            <div class="input-group">
                                <label>
                                    Start Month:
                                    <span class="help-icon" data-tooltip="Choose when you want to start your SIP. This determines the calendar dates in your investment plan">ℹ️</span>
                                </label>
                                <input type="month" v-model="formData.startMonth" @input="debouncedCalculate">
                            </div>
                        </div>
                        
                        <!-- Investment Parameters Group -->
                        <div class="investment-params-group">
                            <div class="input-group">
                                <label>
                                    Current Investment:&nbsp;<strong>₹ {{ formatCurrencyFull(currentInvestment) }}</strong>
                                    <span class="help-icon" data-tooltip="The lump sum amount you already have invested or plan to invest today">ℹ️</span>
                                </label>
                            <div class="unit-selector-input">
                                <input 
                                    type="number" 
                                    v-model.number="formData.currentInvestmentValue" 
                                    min="0" 
                                    step="0.1"
                                    @input="debouncedCalculate"
                                >
                                <div class="unit-buttons">
                                    <button 
                                        type="button"
                                        :class="{'active': formData.currentInvestmentUnit === 'crores'}"
                                        @click="formData.currentInvestmentUnit = 'crores'; calculateResults()">
                                        Crores
                                    </button>
                                    <button 
                                        type="button"
                                        :class="{'active': formData.currentInvestmentUnit === 'lakhs'}"
                                        @click="formData.currentInvestmentUnit = 'lakhs'; calculateResults()">
                                        Lakhs
                                    </button>
                                    <button 
                                        type="button"
                                        :class="{'active': formData.currentInvestmentUnit === 'thousands'}"
                                        @click="formData.currentInvestmentUnit = 'thousands'; calculateResults()">
                                        Thousands
                                    </button>
                                </div>
                            </div>
                            </div>
                            
                            <!-- Monthly Investment Input - Only show if not calculating it -->
                            <div class="input-group" v-if="!isBothTargetsMode">
                            <label>
                                Monthly Investment:&nbsp;<strong>₹ {{ formatCurrencyFull(monthlyInvestment) }}</strong>
                                <span class="help-icon" data-tooltip="The fixed amount you plan to invest every month through SIP">ℹ️</span>
                            </label>
                            <div class="unit-selector-input">
                                <input 
                                    type="number" 
                                    v-model.number="formData.monthlyInvestmentValue" 
                                    min="0" 
                                    step="0.1"
                                    @input="debouncedCalculate"
                                >
                                <div class="unit-buttons">
                                    <button 
                                        type="button"
                                        :class="{'active': formData.monthlyInvestmentUnit === 'crores'}"
                                        @click="formData.monthlyInvestmentUnit = 'crores'; calculateResults()">
                                        Crores
                                    </button>
                                    <button 
                                        type="button"
                                        :class="{'active': formData.monthlyInvestmentUnit === 'lakhs'}"
                                        @click="formData.monthlyInvestmentUnit = 'lakhs'; calculateResults()">
                                        Lakhs
                                    </button>
                                    <button 
                                        type="button"
                                        :class="{'active': formData.monthlyInvestmentUnit === 'thousands'}"
                                        @click="formData.monthlyInvestmentUnit = 'thousands'; calculateResults()">
                                        Thousands
                                    </button>
                                </div>
                            </div>
                            </div>
                            
                            <div class="input-group-row">
                            <div class="input-group-col" style="flex: 1;">
                                <label>
                                    Expected Growth:&nbsp;<strong>{{ formData.cagr }}%</strong>
                                    <span class="help-icon" data-tooltip="Expected annual return rate (Compound Annual Growth Rate). Typical equity funds: 10-15%, Debt funds: 6-8%">ℹ️</span>
                                </label>
                                <input 
                                    type="number" 
                                    v-model.number="formData.cagr" 
                                    min="1" 
                                    max="30" 
                                    step="0.5"
                                    @input="debouncedCalculate"
                                >
                            </div>
                            
                            <div class="input-group-col" style="flex: 1;">
                                <label>
                                    Yearly Hike:&nbsp;<strong>{{ formData.yearlyHike }}%</strong>
                                    <span class="help-icon" data-tooltip="Annual percentage increase in your monthly SIP amount. Helps you invest more as your income grows">ℹ️</span>
                                </label>
                                <input 
                                    type="number" 
                                    v-model.number="formData.yearlyHike" 
                                    min="0" 
                                    max="50" 
                                    step="1"
                                    @input="debouncedCalculate"
                                >
                            </div>
                            </div>
                            
                            <div class="input-group-row">
                            <div class="input-group-col" style="flex: 1;">
                                <label>
                                    Yearly Inflation:&nbsp;<strong>{{ formData.inflationRate }}%</strong>
                                    <span class="help-icon" data-tooltip="Expected average inflation rate per year. Used to calculate real returns in today's money. Historical India average: 5-7%">ℹ️</span>
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
                            
                            <div class="input-group-col" style="flex: 1;">
                                <label>
                                    Exit Tax:&nbsp;<strong>{{ formData.taxRate }}%</strong>
                                    <span class="help-icon" data-tooltip="Applied on total real gains at exit. Equity: 13-14.95% (LTCG + Dividend), Debt: 5.2-42.74% (based on tax slab). Actual taxation may differ">ℹ️</span>
                                </label>
                                <input 
                                    type="number" 
                                    v-model.number="formData.taxRate" 
                                    min="0" 
                                    max="50" 
                                    step="0.5"
                                    @input="debouncedCalculate"
                                >
                            </div>
                            </div>
                        </div>
                        
                        <p style="font-size: 0.9em; color: #666; margin-top: 1rem; font-style: italic;">💡 Results update automatically as you adjust inputs</p>
                    </div>
                    
                    <!-- Right Column: Output Results and Chart -->
                    <div class="sip-outputs" v-if="results.calculated">
                        <div class="sip-summary">
                            <h3 v-if="isBothTargetsMode || results.timeRequired" style="margin-top: 0;">🎯 Target Results</h3>
                            <table class="summary-table" v-if="isBothTargetsMode || results.timeRequired">
                                <tbody>
                                    <tr v-if="isBothTargetsMode && results.requiredMonthlyInvestment !== null && results.requiredMonthlyInvestment !== undefined">
                                        <td><strong>Starting Monthly Investment</strong></td>
                                        <td class="highlight">₹ {{ formatCurrency(results.requiredMonthlyInvestment) }}</td>
                                    </tr>
                                    <tr v-if="results.timeRequired">
                                        <td><strong>Time Required</strong></td>
                                        <td class="highlight">{{ results.timeRequired }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            
                            <h3 style="margin-top: 0; margin-bottom: 0.5rem;">📊 Investment Growth Analysis</h3>
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
                                        <td><strong>Investment</strong></td>
                                        <td><span class="help-icon" :data-tooltip="'₹ ' + results.totalInvestment.toLocaleString('en-IN', {maximumFractionDigits: 0})" style="cursor: default; opacity: 1;">₹ {{ formatCurrency(results.totalInvestment) }}</span></td>
                                        <td><span class="help-icon" :data-tooltip="'₹ ' + results.realInvestment.toLocaleString('en-IN', {maximumFractionDigits: 0})" style="cursor: default; opacity: 1;">₹ {{ formatCurrency(results.realInvestment) }}</span></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Growth</strong></td>
                                        <td><span class="help-icon" :data-tooltip="'₹ ' + (results.expectedValue - results.totalInvestment).toLocaleString('en-IN', {maximumFractionDigits: 0})" style="cursor: default; opacity: 1;">₹ {{ formatCurrency(results.expectedValue - results.totalInvestment) }}</span></td>
                                        <td><span class="help-icon" :data-tooltip="'₹ ' + (results.inflationAdjustedValue - results.realInvestment).toLocaleString('en-IN', {maximumFractionDigits: 0})" style="cursor: default; opacity: 1;">₹ {{ formatCurrency(results.inflationAdjustedValue - results.realInvestment) }}</span></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Portfolio Value</strong></td>
                                        <td><span class="help-icon" :data-tooltip="'₹ ' + results.expectedValue.toLocaleString('en-IN', {maximumFractionDigits: 0})" style="cursor: default; opacity: 1;">₹ {{ formatCurrency(results.expectedValue) }}</span></td>
                                        <td><span class="help-icon" :data-tooltip="'₹ ' + results.inflationAdjustedValue.toLocaleString('en-IN', {maximumFractionDigits: 0})" style="cursor: default; opacity: 1;">₹ {{ formatCurrency(results.inflationAdjustedValue) }}</span></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Post Tax</strong></td>
                                        <td><span class="help-icon" :data-tooltip="'₹ ' + (results.totalInvestment + (results.expectedValue - results.totalInvestment) * (1 - formData.taxRate / 100)).toLocaleString('en-IN', {maximumFractionDigits: 0})" style="cursor: default; opacity: 1;">₹ {{ formatCurrency(results.totalInvestment + (results.expectedValue - results.totalInvestment) * (1 - formData.taxRate / 100)) }}</span></td>
                                        <td><span class="help-icon" :data-tooltip="'₹ ' + results.postTaxRealValue.toLocaleString('en-IN', {maximumFractionDigits: 0})" style="cursor: default; opacity: 1;">₹ {{ formatCurrency(results.postTaxRealValue) }}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                            <h3 style="margin-top: 1.5rem; margin-bottom: 0.5rem;">Understanding Values</h3>
                            <ul style="font-size: 0.9em; color: #666; line-height: 1.8;">
                                <li><strong>Nominal:</strong> Future value without adjusting for inflation.</li>
                                <li><strong>Real:</strong> Today's purchasing power after adjusting for inflation.</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="sip-outputs placeholder" v-else>
                        <div class="placeholder-content">
                            <h3 style="margin-top: 0;">🎯 Your Results Will Appear Here</h3>
                            <p>Fill in your SIP details on the left to see your investment growth projection</p>
                            <div class="placeholder-features">
                                <p>✅ Investment vs Returns calculation</p>
                                <p>✅ Inflation adjusted returns</p>
                                <p>✅ Year-by-year growth visualization</p>
                                <p>✅ Interactive ECharts graph</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Investment and Growth - Full Width Below -->
                <div class="investment-plan" v-if="results.calculated && monthlyPlan.length > 0">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem;">
                        <div style="display: flex; gap: 1rem; align-items: center;">
                            <h2 style="margin: 0;">📊 Investment and Growth</h2>
                            <!-- Tab Toggle -->
                            <div class="mode-toggle">
                                <button 
                                    type="button"
                                    :class="{'active': investmentGrowthTab === 'chart'}"
                                    @click="investmentGrowthTab = 'chart'; $nextTick(() => $nextTick(() => renderChart()))"
                                    style="white-space: nowrap;">
                                    📊 Chart
                                </button>
                                <button 
                                    type="button"
                                    :class="{'active': investmentGrowthTab === 'data'}"
                                    @click="investmentGrowthTab = 'data'"
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
                            <!-- Post Tax Toggle -->
                            <div class="mode-toggle">
                                <button 
                                    type="button"
                                    :class="{'active': applyPostTax}"
                                    @click="applyPostTax = !applyPostTax"
                                    style="white-space: nowrap;">
                                    Post Tax
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Chart Tab -->
                    <div v-if="investmentGrowthTab === 'chart'" style="margin-bottom: 2rem;">
                        <div id="sip-chart" style="width: 100%; height: 400px;"></div>
                    </div>
                    
                    <!-- Data Tab -->
                    <div v-if="investmentGrowthTab === 'data'" class="plan-table-wrapper">
                        <table class="plan-table" style="margin: 0;">
                            <thead>
                                <tr>
                                    <th rowspan="2">{{ planGranularity === 'yearly' ? 'Year' : 'Year/Month' }}</th>
                                    <th colspan="2" style="text-align: center;">Investment</th>
                                    <th colspan="2" style="text-align: center;">Growth</th>
                                    <th rowspan="2" style="text-align: right;">Portfolio Value<span v-if="applyPostTax"><br/>(Post Tax)</span></th>
                                </tr>
                                <tr>
                                    <th style="text-align: right;">{{ planGranularity === 'yearly' ? 'Yearly' : 'Monthly' }}</th>
                                    <th style="text-align: right;">Accumulated</th>
                                    <th style="text-align: right;">{{ planGranularity === 'yearly' ? 'Yearly' : 'Monthly' }}</th>
                                    <th style="text-align: right;">Accumulated</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row, index) in displayedPlan" :key="index">
                                    <td>{{ row.period }}</td>
                                    <td style="text-align: right;">₹{{ formatCurrencyFull(row.contribution) }}</td>
                                    <td style="text-align: right;">₹{{ formatCurrencyFull(row.accumulatedContribution) }}</td>
                                    <td style="text-align: right;">₹{{ formatCurrencyFull(row.growth) }}</td>
                                    <td style="text-align: right;">₹{{ formatCurrencyFull(row.accumulatedGrowth) }}</td>
                                    <td style="text-align: right;">₹{{ formatCurrencyFull(row.portfolioValue) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <!-- Monthly Investment Plan - Full Width Below -->
                <div class="investment-plan" v-if="results.calculated && contributionTable.length > 0">

                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <div style="display: flex; gap: 1rem; align-items: center;">
                            <h2 style="margin: 0;">📅 Monthly Investment Plan</h2>
                            <!-- Tab Toggle -->
                            <div class="mode-toggle">
                                <button 
                                    type="button"
                                    :class="{'active': monthlyPlanTab === 'chart'}"
                                    @click="monthlyPlanTab = 'chart'; $nextTick(() => renderContributionChart())"
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
                                :class="{'active': contributionViewMode === 'nominal'}"
                                @click="contributionViewMode = 'nominal'; renderContributionChart();">
                                Nominal
                            </button>
                            <button 
                                type="button"
                                :class="{'active': contributionViewMode === 'real'}"
                                @click="contributionViewMode = 'real'; renderContributionChart();">
                                Real
                            </button>
                        </div>
                    </div>
                    
                    <!-- Chart Tab -->
                    <div v-if="monthlyPlanTab === 'chart'" style="margin-bottom: 2rem;">
                        <div id="contributionChart" style="width: 100%; height: 400px;"></div>
                    </div>
                    
                    <!-- Data Tab -->
                    <div v-if="monthlyPlanTab === 'data'" class="plan-table-wrapper">
                        <table class="plan-table" style="margin: 0;">
                            <thead>
                                <tr>
                                    <th style="text-align: right;">Year</th>
                                    <th style="text-align: right;">Jan</th>
                                    <th style="text-align: right;">Feb</th>
                                    <th style="text-align: right;">Mar</th>
                                    <th style="text-align: right;">Apr</th>
                                    <th style="text-align: right;">May</th>
                                    <th style="text-align: right;">Jun</th>
                                    <th style="text-align: right;">Jul</th>
                                    <th style="text-align: right;">Aug</th>
                                    <th style="text-align: right;">Sep</th>
                                    <th style="text-align: right;">Oct</th>
                                    <th style="text-align: right;">Nov</th>
                                    <th style="text-align: right;">Dec</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(yearRow, index) in contributionTable" :key="index">
                                    <td style="text-align: right;"><strong>{{ yearRow.year }}</strong></td>
                                    <td v-for="(amount, monthIndex) in yearRow.months" :key="monthIndex" style="text-align: right;">
                                        <span v-if="amount !== null" class="help-icon" :data-tooltip="'₹ ' + (contributionViewMode === 'nominal' ? amount.nominal : amount.real).toLocaleString('en-IN', {maximumFractionDigits: 0})" style="cursor: default; opacity: 1;">{{ formatCurrency(contributionViewMode === 'nominal' ? amount.nominal : amount.real) }}</span>
                                        <span v-else style="color: #999;">-</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Initialize Vue app
    const { createApp } = Vue;

    createApp({
        data() {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            return {
                formData: {
                    currentInvestmentValue: 10,
                    currentInvestmentUnit: 'lakhs',
                    monthlyInvestmentValue: 20,
                    monthlyInvestmentUnit: 'thousands',
                    cagr: 12,
                    yearlyHike: 10,
                    inflationRate: 6,
                    taxRate: 15,
                    timePeriodValue: 25,
                    timePeriodUnit: 'years',
                    targetAmountValue: 50,
                    targetAmountUnit: 'lakhs',
                    targetTime: true,
                    targetMoney: false,
                    startMonth: `${year}-${month}`
                },
                results: {
                    calculated: false,
                    totalInvestment: 0,
                    realInvestment: 0,
                    expectedValue: 0,
                    totalReturns: 0,
                    inflationAdjustedValue: 0,
                    realReturns: 0,
                    postTaxRealValue: 0
                },
                yearlyData: [],
                monthlyPlan: [],
                contributionTable: [],
                contributionViewMode: 'nominal',
                planViewMode: 'nominal',
                applyPostTax: false,
                planGranularity: 'yearly',
                investmentGrowthTab: 'chart',
                monthlyPlanTab: 'chart',
                calculating: false,
                debounceTimer: null,
                chart: null,
                contributionChart: null,
                contributionResizeHandler: null,
                copyButtonText: 'Copy JSON'
            }
        },
        computed: {
            isBothTargetsMode() {
                return this.formData.targetTime && this.formData.targetMoney;
            },
            isFormValid() {
                const { cagr, timePeriodValue, targetAmountValue, targetTime, targetMoney } = this.formData;
                
                // Both targets: need time period and target amount
                if (this.isBothTargetsMode) {
                    return cagr > 0 && timePeriodValue > 0 && targetAmountValue > 0;
                }
                // Only Time: need time period
                if (targetTime && !targetMoney) {
                    return cagr > 0 && timePeriodValue > 0;
                }
                // Only Money: need target amount
                if (targetMoney && !targetTime) {
                    return cagr > 0 && targetAmountValue > 0;
                }
                return false;
            },
            currentInvestment() {
                const { currentInvestmentValue, currentInvestmentUnit } = this.formData;
                return currentInvestmentValue * CURRENCY_MULTIPLIERS[currentInvestmentUnit];
            },
            monthlyInvestment() {
                const { monthlyInvestmentValue, monthlyInvestmentUnit } = this.formData;
                return monthlyInvestmentValue * CURRENCY_MULTIPLIERS[monthlyInvestmentUnit];
            },
            numberOfYears() {
                const { timePeriodValue, timePeriodUnit } = this.formData;
                // Convert to years (supporting fractional values)
                return timePeriodUnit === 'months' ? timePeriodValue / 12 : timePeriodValue;
            },
            formattedTimePeriod() {
                const { timePeriodValue, timePeriodUnit } = this.formData;
                
                if (timePeriodUnit === 'years') {
                    // If years, show as is (whole numbers only)
                    return `${timePeriodValue} ${timePeriodValue === 1 ? 'Year' : 'Years'}`;
                } else {
                    // If months, convert to Years and Months format
                    const totalMonths = Math.floor(timePeriodValue);
                    const years = Math.floor(totalMonths / 12);
                    const months = totalMonths % 12;
                    
                    if (years === 0) {
                        return `${months} ${months === 1 ? 'Month' : 'Months'}`;
                    } else if (months === 0) {
                        return `${years} ${years === 1 ? 'Year' : 'Years'}`;
                    } else {
                        return `${years} ${years === 1 ? 'Year' : 'Years'} ${months} ${months === 1 ? 'Month' : 'Months'}`;
                    }
                }
            },
            displayedPlan() {
                if (!this.monthlyPlan || this.monthlyPlan.length === 0) return [];
                
                const monthlyInflation = Math.pow(1 + this.formData.inflationRate / 100, 1 / 12) - 1;

                // Filter based on granularity
                let filteredPlan = this.monthlyPlan;
                if (this.planGranularity === 'yearly') {
                    // Show only December of each year, plus the final month if it's not December
                    filteredPlan = this.monthlyPlan.filter((row, index) => {
                        const isDecember = row.month === 'Dec';
                        const isLastMonth = index === this.monthlyPlan.length - 1;
                        return isDecember || isLastMonth;
                    });
                }
                
                // Transform based on view mode
                // Note: Post-tax calculations are only applied at exit (final value in results),
                // not during accumulation. This matches real-world LTCG tax behavior.
                return filteredPlan.map((row, index) => {
                    const monthIndex = row.monthIndex;
                    
                    let period, contribution, growth, accumulatedContribution, accumulatedGrowth, portfolioValue;
                    
                    if (this.planGranularity === 'yearly') {
                        period = row.year;
                        // For yearly view, aggregate all months in this year
                        const yearRows = this.monthlyPlan.filter(r => r.year === row.year);
                        const yearlyContribution = yearRows.reduce((sum, r) => sum + (r.contribution || 0), 0);
                        const yearlyGrowth = yearRows.reduce((sum, r) => sum + (r.growth || 0), 0);
                        // Get accumulated values from the last month of this year (current row)
                        const totalInvested = row.accumulatedContribution || row.totalInvested || 0;
                        const nominalPortfolio = row.nominalPortfolio || 0;
                        const realPortfolio = row.realPortfolio || 0;
                        const realInvestmentPV = row.totalInvestedPresentValue || 0;
                        
                        if (this.planViewMode === 'nominal') {
                            contribution = yearlyContribution;
                            growth = yearlyGrowth;
                            accumulatedContribution = totalInvested;
                            accumulatedGrowth = nominalPortfolio - totalInvested;
                            portfolioValue = nominalPortfolio;
                        } else {
                            // Real mode: discount by inflation
                            let realYearlyContribution, realYearlyGrowth;
                            if (yearlyContribution === 0 && totalInvested > 0) {
                                // Only initial investment, no SIP
                                realYearlyContribution = 0;
                                realYearlyGrowth = realPortfolio - realInvestmentPV;
                            } else {
                                realYearlyContribution = yearRows.reduce((sum, r) => {
                                    const mIdx = r.monthIndex;
                                    const mInflation = Math.pow(1 + monthlyInflation, mIdx);
                                    return sum + (r.contribution || 0) / mInflation;
                                }, 0);
                                realYearlyGrowth = yearRows.reduce((sum, r) => {
                                    const mIdx = r.monthIndex;
                                    const mInflation = Math.pow(1 + monthlyInflation, mIdx + 1);
                                    return sum + (r.growth || 0) / mInflation;
                                }, 0);
                            }
                            contribution = realYearlyContribution;
                            growth = realYearlyGrowth;
                            accumulatedContribution = realInvestmentPV;
                            accumulatedGrowth = realPortfolio - realInvestmentPV;
                            portfolioValue = realPortfolio;
                        }
                    } else {
                        // Monthly view - use individual month values
                        period = `${row.year} ${row.month}`;
                        
                        const totalInvested = row.accumulatedContribution || row.totalInvested || 0;
                        const nominalPortfolio = row.nominalPortfolio || 0;
                        const realPortfolio = row.realPortfolio || 0;
                        const realInvestmentPV = row.totalInvestedPresentValue || 0;
                        
                        if (this.planViewMode === 'nominal') {
                            contribution = row.contribution || 0;
                            growth = row.growth || 0;
                            accumulatedContribution = totalInvested;
                            accumulatedGrowth = nominalPortfolio - totalInvested;
                            portfolioValue = nominalPortfolio;
                        } else {
                            // Real mode: discount by inflation
                            let realContribution, realGrowth;
                            if ((row.contribution || 0) === 0 && totalInvested > 0) {
                                // Only initial investment, no SIP
                                realContribution = 0;
                                realGrowth = realPortfolio - realInvestmentPV;
                            } else {
                                const inflationAtContribution = Math.pow(1 + monthlyInflation, monthIndex);
                                const inflationAtEnd = Math.pow(1 + monthlyInflation, monthIndex + 1);
                                realContribution = (row.contribution || 0) / inflationAtContribution;
                                realGrowth = (row.growth || 0) / inflationAtEnd;
                            }
                            contribution = realContribution;
                            growth = realGrowth;
                            accumulatedContribution = realInvestmentPV;
                            accumulatedGrowth = realPortfolio - realInvestmentPV;
                            portfolioValue = realPortfolio;
                        }
                    }
                    
                    return {
                        period,
                        contribution,
                        growth,
                        accumulatedContribution,
                        accumulatedGrowth,
                        portfolioValue
                    };
                });
            },
            targetAmount() {
                const { targetAmountValue, targetAmountUnit } = this.formData;
                return targetAmountValue * CURRENCY_MULTIPLIERS[targetAmountUnit];
            },
            exportJSON() {
                if (!this.results.calculated) return '';
                
                const data = {
                    input: {
                        targetMode: {
                            time: this.formData.targetTime,
                            money: this.formData.targetMoney
                        },
                        timePeriod: this.formData.targetTime ? {
                            value: this.formData.timePeriodValue,
                            unit: this.formData.timePeriodUnit
                        } : null,
                        targetAmount: this.formData.targetMoney ? {
                            value: this.formData.targetAmountValue,
                            unit: this.formData.targetAmountUnit,
                            inRupees: this.targetAmount
                        } : null,
                        currentInvestment: {
                            value: this.formData.currentInvestmentValue,
                            unit: this.formData.currentInvestmentUnit,
                            inRupees: this.currentInvestment
                        },
                        monthlyInvestment: !this.isBothTargetsMode ? {
                            value: this.formData.monthlyInvestmentValue,
                            unit: this.formData.monthlyInvestmentUnit,
                            inRupees: this.monthlyInvestment
                        } : null,
                        expectedCAGR: this.formData.cagr,
                        yearlyHike: this.formData.yearlyHike,
                        inflationRate: this.formData.inflationRate,
                        taxRate: this.formData.taxRate,
                        startMonth: this.formData.startMonth
                    },
                    output: {
                        startingMonthlyInvestment: this.results.requiredMonthlyInvestment || null,
                        timeRequired: this.results.timeRequired || null,
                        nominal: {
                            investment: this.results.totalInvestment,
                            portfolioValue: this.results.expectedValue,
                            postTax: this.results.totalInvestment + (this.results.expectedValue - this.results.totalInvestment) * (1 - this.formData.taxRate / 100)
                        },
                        real: {
                            investment: this.results.realInvestment,
                            portfolioValue: this.results.inflationAdjustedValue,
                            postTax: this.results.postTaxRealValue
                        }
                    }
                };
                
                console.log('RealValue SIP Engine Results:', data);
                return JSON.stringify(data, null, 2);
            }
        },
        watch: {
            planGranularity() {
                this.renderChart();
            },
            planViewMode() {
                this.renderChart();
            }
            // Note: applyPostTax removed - it only affects summary display, not chart data
            // Tax is applied only at exit (final value), not during accumulation
        },
        mounted() {
            this.calculateResults();
        },
        methods: {
            toggleTarget(type) {
                if (type === 'time') {
                    // If trying to deselect Time, only allow if Money is selected
                    if (this.formData.targetTime && this.formData.targetMoney) {
                        this.formData.targetTime = false;
                    } else if (!this.formData.targetTime) {
                        this.formData.targetTime = true;
                    }
                } else if (type === 'money') {
                    // If trying to deselect Money, only allow if Time is selected
                    if (this.formData.targetMoney && this.formData.targetTime) {
                        this.formData.targetMoney = false;
                    } else if (!this.formData.targetMoney) {
                        this.formData.targetMoney = true;
                    }
                }
                this.calculateResults();
            },
            
            debouncedCalculate() {
                clearTimeout(this.debounceTimer);
                this.debounceTimer = setTimeout(() => {
                    this.calculateResults();
                }, DEBOUNCE_DELAY_MS);
            },

            calculateResults() {
                this.calculating = true;
                
                if (this.isBothTargetsMode) {
                    this.calculateMonthlyInvestment();
                } else if (this.formData.targetTime && !this.formData.targetMoney) {
                    this.calculateByTargetYears();
                } else if (this.formData.targetMoney && !this.formData.targetTime) {
                    this.calculateByTargetAmount();
                }
            },
            
            // Binary search helper to find required months
            binarySearchMonths(testFn, targetValue, maxMonths, tolerance = 1) {
                let low = 0;
                let high = maxMonths;
                
                while (high - low > tolerance) {
                    const testMonths = Math.floor((low + high) / 2);
                    const testYears = testMonths / 12;
                    const result = testFn(testYears);
                    
                    if (result < targetValue) {
                        low = testMonths;
                    } else {
                        high = testMonths;
                    }
                }
                
                return high;
            },
            
            // Core SIP simulation engine - computes monthly then rolls up to yearly
            simulateSIP({ years, monthlyInvestmentFn, currentInvestment, cagr, inflationRate }) {
                // Validation
                if (cagr <= -100) {
                    throw new Error('Expected Growth must be greater than -100%');
                }
                if (years <= 0 || years > MAX_INVESTMENT_YEARS) {
                    throw new Error(`Investment period must be between 0 and ${MAX_INVESTMENT_YEARS} years`);
                }
                if (currentInvestment < 0) {
                    throw new Error('Current investment cannot be negative');
                }
                
                const monthlyData = [];
                const yearlyData = [];
                let portfolioValue = currentInvestment; // Start with current investment
                let totalInvested = currentInvestment; // Current investment is part of accumulated
                let totalInvestedPresentValue = currentInvestment; // Current investment has no inflation discount
                const monthlyCagr = Math.pow(1 + cagr / 100, 1 / 12) - 1;
                const monthlyInflation = Math.pow(1 + inflationRate / 100, 1 / 12) - 1;
                
                const totalMonths = Math.ceil(years * 12);
                
                // Optimized: Calculate inflation factors incrementally
                let inflationFactorForContribution = 1;
                let inflationFactor = 1 + monthlyInflation;
                
                // Monthly computation
                for (let monthIndex = 0; monthIndex < totalMonths; monthIndex++) {
                    const year = Math.floor(monthIndex / 12) + 1;
                    const month = (monthIndex % 12) + 1;
                    
                    // Contribution at start of month (doesn't include currentInvestment)
                    const contribution = Math.round(monthlyInvestmentFn(year, month));
                    
                    // Track present value of this contribution
                    totalInvestedPresentValue += contribution / inflationFactorForContribution;
                    
                    totalInvested += contribution;
                    portfolioValue = portfolioValue * (1 + monthlyCagr) + contribution;
                    
                    const realValue = portfolioValue / inflationFactor;
                    
                    monthlyData.push({
                        monthIndex,
                        year,
                        month,
                        contribution,
                        portfolioValue: Math.round(portfolioValue),
                        totalInvested: Math.round(totalInvested),
                        totalInvestedPresentValue: Math.round(totalInvestedPresentValue),
                        realValue: Math.round(realValue)
                    });
                    
                    // Increment inflation factors for next iteration
                    inflationFactorForContribution *= (1 + monthlyInflation);
                    inflationFactor *= (1 + monthlyInflation);
                }
                
                // Roll up to yearly data
                for (let year = 1; year <= Math.ceil(years); year++) {
                    const lastMonthOfYear = Math.min(year * 12 - 1, totalMonths - 1);
                    const yearEndData = monthlyData[lastMonthOfYear];
                    
                    yearlyData.push({
                        year: year,
                        investment: yearEndData.totalInvested,
                        investmentPresentValue: yearEndData.totalInvestedPresentValue,
                        value: yearEndData.portfolioValue,
                        inflationAdjustedValue: yearEndData.realValue
                    });
                }
                
                const finalMonth = monthlyData[monthlyData.length - 1];
                
                // Calculate post-tax real value
                const taxRate = this.formData.taxRate;
                const postTaxRealValue = Math.round(finalMonth.totalInvestedPresentValue + (finalMonth.realValue - finalMonth.totalInvestedPresentValue) * (1 - taxRate / 100));
                
                return {
                    monthlyData,
                    yearlyData,
                    finalPortfolioValue: finalMonth.portfolioValue,
                    finalInvestment: finalMonth.totalInvested,
                    finalInflationAdjustedValue: finalMonth.realValue,
                    finalInvestmentPresentValue: finalMonth.totalInvestedPresentValue,
                    postTaxRealValue: postTaxRealValue,
                    totalMonths: monthlyData.length
                };
            },
            
            calculateByTargetYears() {
                const { cagr, yearlyHike, inflationRate } = this.formData;
                const numberOfYears = this.numberOfYears;
                const currentInvestment = this.currentInvestment;
                const monthlyInvestment = this.monthlyInvestment;

                // Parse start month for display
                const [startYear, startMonth] = this.formData.startMonth.split('-').map(Number);
                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

                // Use simulateSIP for calculations
                const startingMonthly = monthlyInvestment;
                const monthlyInvestmentFn = (year, month) => {
                    const hikeMultiplier = Math.pow(1 + yearlyHike / 100, year - 1);
                    return startingMonthly * hikeMultiplier;
                };

                const simulation = this.simulateSIP({
                    years: numberOfYears,
                    monthlyInvestmentFn,
                    currentInvestment,
                    cagr,
                    inflationRate
                });

                this.yearlyData = simulation.yearlyData;
                
                // Use monthly data from simulation instead of recomputing
                this.monthlyPlan = simulation.monthlyData.map((data, index) => {
                    const currentMonthNum = (startMonth - 1 + index) % 12;
                    const currentYear = startYear + Math.floor((startMonth - 1 + index) / 12);
                    const prevValue = index > 0 ? simulation.monthlyData[index - 1].portfolioValue : currentInvestment;
                    const prevInvested = index > 0 ? simulation.monthlyData[index - 1].totalInvested : 0;
                    const monthlyGrowth = data.portfolioValue - prevValue - data.contribution;
                    const accumulatedGrowth = data.portfolioValue - data.totalInvested;
                    
                    return {
                        monthIndex: data.monthIndex,
                        year: currentYear,
                        month: monthNames[currentMonthNum],
                        contribution: data.contribution,
                        growth: monthlyGrowth,
                        accumulatedContribution: data.totalInvested,
                        accumulatedGrowth: accumulatedGrowth,
                        nominalPortfolio: data.portfolioValue,
                        realPortfolio: data.realValue,
                        totalInvestedPresentValue: data.totalInvestedPresentValue
                    };
                });

                this.results = {
                    calculated: true,
                    totalInvestment: simulation.finalInvestment,
                    realInvestment: simulation.finalInvestmentPresentValue,
                    expectedValue: simulation.finalPortfolioValue,
                    totalReturns: simulation.finalPortfolioValue - simulation.finalInvestment,
                    inflationAdjustedValue: simulation.finalInflationAdjustedValue,
                    realReturns: simulation.finalInflationAdjustedValue - simulation.finalInvestmentPresentValue,
                    postTaxRealValue: simulation.postTaxRealValue
                };

                this.$nextTick(() => {
                    this.renderChart();
                    this.generateContributionTable();
                    this.$nextTick(() => {
                        this.renderContributionChart();
                    });
                    this.calculating = false;
                });
            },
            
            calculateByTargetAmount() {
                const { cagr, yearlyHike, inflationRate } = this.formData;
                const currentInvestment = this.currentInvestment;
                const monthlyInvestment = this.monthlyInvestment;
                const targetAmount = this.targetAmount;

                // Build monthly investment function with hike
                const startingMonthly = monthlyInvestment;
                const monthlyInvestmentFn = (yr, month) => {
                    const hikeMultiplier = Math.pow(1 + yearlyHike / 100, yr - 1);
                    return startingMonthly * hikeMultiplier;
                };

                // Binary search on months to find when Real Value reaches target
                const requiredMonths = this.binarySearchMonths(
                    (testYears) => {
                        const simulation = this.simulateSIP({
                            years: testYears,
                            monthlyInvestmentFn,
                            currentInvestment,
                            cagr,
                            inflationRate
                        });
                        return simulation.postTaxRealValue;
                    },
                    targetAmount,
                    MAX_INVESTMENT_MONTHS
                );
                const finalYears = requiredMonths / 12;
                
                const simulation = this.simulateSIP({
                    years: finalYears,
                    monthlyInvestmentFn,
                    currentInvestment,
                    cagr,
                    inflationRate
                });

                this.yearlyData = simulation.yearlyData;
                
                // Format time required
                const years = Math.floor(requiredMonths / 12);
                const months = requiredMonths % 12;
                let timeRequiredStr = '';
                if (years > 0) {
                    timeRequiredStr += `${years} ${years === 1 ? 'year' : 'years'}`;
                }
                if (months > 0) {
                    if (timeRequiredStr) timeRequiredStr += ' ';
                    timeRequiredStr += `${months} ${months === 1 ? 'month' : 'months'}`;
                }
                
                this.results = {
                    calculated: true,
                    totalInvestment: simulation.finalInvestment,
                    realInvestment: simulation.finalInvestmentPresentValue,
                    expectedValue: simulation.finalPortfolioValue,
                    totalReturns: simulation.finalPortfolioValue - simulation.finalInvestment,
                    inflationAdjustedValue: simulation.finalInflationAdjustedValue,
                    realReturns: simulation.finalInflationAdjustedValue - simulation.finalInvestmentPresentValue,
                    timeRequired: timeRequiredStr,
                    postTaxRealValue: simulation.postTaxRealValue
                };
                
                // Generate monthly plan from simulation monthly data
                const [startYear, startMonth] = this.formData.startMonth.split('-').map(Number);
                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                
                this.monthlyPlan = simulation.monthlyData.map((data, index) => {
                    const currentMonthNum = (startMonth - 1 + index) % 12;
                    const currentYear = startYear + Math.floor((startMonth - 1 + index) / 12);
                    const prevValue = index > 0 ? simulation.monthlyData[index - 1].portfolioValue : currentInvestment;
                    const monthlyGrowth = data.portfolioValue - prevValue - data.contribution;
                    const accumulatedGrowth = data.portfolioValue - data.totalInvested;
                    
                    return {
                        monthIndex: data.monthIndex,
                        year: currentYear,
                        month: monthNames[currentMonthNum],
                        contribution: data.contribution,
                        growth: monthlyGrowth,
                        accumulatedContribution: data.totalInvested,
                        accumulatedGrowth: accumulatedGrowth,
                        nominalPortfolio: data.portfolioValue,
                        realPortfolio: data.realValue,
                        totalInvestedPresentValue: data.totalInvestedPresentValue
                    };
                });

                this.$nextTick(() => {
                    this.renderChart();
                    this.generateContributionTable();
                    this.$nextTick(() => {
                        this.renderContributionChart();
                    });
                    this.calculating = false;
                });
            },

            calculateMonthlyInvestment() {
                const { cagr, yearlyHike, inflationRate } = this.formData;
                const numberOfYears = this.numberOfYears;
                const currentInvestment = this.currentInvestment;
                const targetAmount = this.targetAmount;
                
                // First check if current investment alone already exceeds target
                const checkZeroSIP = this.simulateSIP({
                    years: numberOfYears,
                    monthlyInvestmentFn: () => 0,
                    currentInvestment,
                    cagr,
                    inflationRate
                });
                
                // If current investment alone exceeds or meets target, no monthly SIP needed
                if (checkZeroSIP.postTaxRealValue >= targetAmount) {
                    // Calculate when target will be reached (binary search on time)
                    const requiredMonths = this.binarySearchMonths(
                        (testYears) => {
                            const testResult = this.simulateSIP({
                                years: testYears,
                                monthlyInvestmentFn: () => 0,
                                currentInvestment,
                                cagr,
                                inflationRate
                            });
                            return testResult.postTaxRealValue;
                        },
                        targetAmount,
                        numberOfYears * 12
                    );
                    const finalYears = requiredMonths / 12;
                    
                    // Run final simulation for the found time period
                    const finalSimulation = this.simulateSIP({
                        years: finalYears,
                        monthlyInvestmentFn: () => 0,
                        currentInvestment,
                        cagr,
                        inflationRate
                    });
                    
                    // Format time required
                    const years = Math.floor(requiredMonths / 12);
                    const months = requiredMonths % 12;
                    let timeRequiredStr = '';
                    if (years > 0) {
                        timeRequiredStr += `${years} ${years === 1 ? 'year' : 'years'}`;
                    }
                    if (months > 0) {
                        if (timeRequiredStr) timeRequiredStr += ' ';
                        timeRequiredStr += `${months} ${months === 1 ? 'month' : 'months'}`;
                    }
                    
                    this.yearlyData = finalSimulation.yearlyData;
                    this.results = {
                        calculated: true,
                        totalInvestment: finalSimulation.finalInvestment,
                        realInvestment: finalSimulation.finalInvestmentPresentValue,
                        expectedValue: finalSimulation.finalPortfolioValue,
                        totalReturns: finalSimulation.finalPortfolioValue - finalSimulation.finalInvestment,
                        inflationAdjustedValue: finalSimulation.finalInflationAdjustedValue,
                        realReturns: finalSimulation.finalInflationAdjustedValue - finalSimulation.finalInvestmentPresentValue,
                        requiredMonthlyInvestment: 0,
                        timeRequired: timeRequiredStr,
                        postTaxRealValue: finalSimulation.postTaxRealValue
                    };
                    
                    // Generate monthly plan
                    const [startYear, startMonth] = this.formData.startMonth.split('-').map(Number);
                    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    
                    this.monthlyPlan = finalSimulation.monthlyData.map((data, index) => {
                        const currentMonthNum = (startMonth - 1 + index) % 12;
                        const currentYear = startYear + Math.floor((startMonth - 1 + index) / 12);
                        const prevValue = index > 0 ? finalSimulation.monthlyData[index - 1].portfolioValue : currentInvestment;
                        const monthlyGrowth = data.portfolioValue - prevValue - data.contribution;
                        const accumulatedGrowth = data.portfolioValue - data.totalInvested;
                        
                        return {
                            monthIndex: data.monthIndex,
                            year: currentYear,
                            month: monthNames[currentMonthNum],
                            contribution: data.contribution,
                            growth: monthlyGrowth,
                            accumulatedContribution: data.totalInvested,
                            accumulatedGrowth: accumulatedGrowth,
                            nominalPortfolio: data.portfolioValue,
                            realPortfolio: data.realValue,
                            totalInvestedPresentValue: data.totalInvestedPresentValue
                        };
                    });
                    
                    this.$nextTick(() => {
                        this.renderChart();
                        this.generateContributionTable();
                        this.$nextTick(() => {
                            this.renderContributionChart();
                        });
                        this.calculating = false;
                    });
                    return;
                }
                
                // Binary search for the required monthly investment
                let low = 0;
                let high = targetAmount / Math.pow(1 + cagr/100, numberOfYears);
                let requiredMonthly = 0;
                const tolerance = 100;
                
                while (high - low > tolerance) {
                    requiredMonthly = (low + high) / 2;
                    
                    // Use simulateSIP with test monthly amount
                    const startingAmount = requiredMonthly;
                    const testFn = (year, month) => {
                        const hikeMultiplier = Math.pow(1 + yearlyHike / 100, year - 1);
                        return startingAmount * hikeMultiplier;
                    };
                    
                    const testResult = this.simulateSIP({
                        years: numberOfYears,
                        monthlyInvestmentFn: testFn,
                        currentInvestment,
                        cagr,
                        inflationRate
                    });
                    
                    if (testResult.postTaxRealValue < targetAmount) {
                        low = requiredMonthly;
                    } else {
                        high = requiredMonthly;
                    }
                }
                
                requiredMonthly = high;
                
                // Final simulation with found monthly investment
                const startingAmount = requiredMonthly;
                const finalFn = (year, month) => {
                    const hikeMultiplier = Math.pow(1 + yearlyHike / 100, year - 1);
                    return startingAmount * hikeMultiplier;
                };
                
                const simulation = this.simulateSIP({
                    years: numberOfYears,
                    monthlyInvestmentFn: finalFn,
                    currentInvestment,
                    cagr,
                    inflationRate
                });

                this.yearlyData = simulation.yearlyData;
                this.results = {
                    calculated: true,
                    totalInvestment: simulation.finalInvestment,
                    realInvestment: simulation.finalInvestmentPresentValue,
                    expectedValue: simulation.finalPortfolioValue,
                    totalReturns: simulation.finalPortfolioValue - simulation.finalInvestment,
                    inflationAdjustedValue: simulation.finalInflationAdjustedValue,
                    realReturns: simulation.finalInflationAdjustedValue - simulation.finalInvestmentPresentValue,
                    requiredMonthlyInvestment: requiredMonthly,
                    postTaxRealValue: simulation.postTaxRealValue
                };

                // Generate monthly plan from simulation monthly data
                const [startYear, startMonth] = this.formData.startMonth.split('-').map(Number);
                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                
                this.monthlyPlan = simulation.monthlyData.map((data, index) => {
                    const currentMonthNum = (startMonth - 1 + index) % 12;
                    const currentYear = startYear + Math.floor((startMonth - 1 + index) / 12);
                    const prevValue = index > 0 ? simulation.monthlyData[index - 1].portfolioValue : currentInvestment;
                    const monthlyGrowth = data.portfolioValue - prevValue - data.contribution;
                    const accumulatedGrowth = data.portfolioValue - data.totalInvested;
                    
                    return {
                        monthIndex: data.monthIndex,
                        year: currentYear,
                        month: monthNames[currentMonthNum],
                        contribution: data.contribution,
                        growth: monthlyGrowth,
                        accumulatedContribution: data.totalInvested,
                        accumulatedGrowth: accumulatedGrowth,
                        nominalPortfolio: data.portfolioValue,
                        realPortfolio: data.realValue,
                        totalInvestedPresentValue: data.totalInvestedPresentValue
                    };
                });

                this.$nextTick(() => {
                    this.renderChart();
                    this.generateContributionTable();
                    this.$nextTick(() => {
                        this.renderContributionChart();
                    });
                    this.calculating = false;
                });
            },

            renderChart() {
                this.$nextTick(() => {
                    this.$nextTick(() => {
                        if (!this.results.calculated || !this.displayedPlan || this.displayedPlan.length === 0) {
                            return;
                        }

                        // Dispose existing chart if any
                        if (this.chart) {
                            this.chart.dispose();
                        }

                        const chartDom = document.getElementById('sip-chart');
                        if (!chartDom) return;

                        this.chart = echarts.init(chartDom);

                        // Get view mode label
                        const granularityLabel = this.planGranularity === 'yearly' ? 'Yearly' : 'Monthly';
                        
                        const option = {
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
                                data: ['Accumulated Investment', 'Portfolio Value']
                            },
                            grid: {
                                left: '3%',
                                right: '2%',
                                bottom: '2%',
                                top: '2%',
                                containLabel: true
                            },
                            xAxis: {
                                type: 'category',
                                boundaryGap: false,
                                data: this.displayedPlan.map(d => d.period),
                                axisLabel: {
                                    fontSize: 11,
                                    rotate: this.planGranularity === 'monthly' ? 45 : 0
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
                                        }
                                        return value.toLocaleString('en-IN');
                                    },
                                    fontSize: 11
                                }
                            },
                            series: [
                                {
                                    name: 'Accumulated Investment',
                                    type: 'line',
                                    data: this.displayedPlan.map(d => d.accumulatedContribution),
                                    smooth: true,
                                    areaStyle: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            { offset: 0, color: 'rgba(255, 193, 7, 0.5)' },
                                            { offset: 1, color: 'rgba(255, 193, 7, 0.1)' }
                                        ])
                                    },
                                    lineStyle: {
                                        width: 2,
                                        color: '#FFC107'
                                    },
                                    itemStyle: {
                                        color: '#FFC107'
                                    },
                                    symbol: 'circle',
                                    symbolSize: 6,
                                    emphasis: {
                                        focus: 'series'
                                    }
                                },
                                {
                                    name: 'Portfolio Value',
                                    type: 'line',
                                    data: this.displayedPlan.map(d => d.portfolioValue),
                                    smooth: true,
                                    areaStyle: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            { offset: 0, color: 'rgba(76, 175, 80, 0.5)' },
                                            { offset: 1, color: 'rgba(76, 175, 80, 0.1)' }
                                        ])
                                    },
                                    lineStyle: {
                                        width: 3,
                                        color: '#4CAF50'
                                    },
                                    itemStyle: {
                                        color: '#4CAF50'
                                    },
                                    symbol: 'circle',
                                    symbolSize: 6,
                                    emphasis: {
                                        focus: 'series'
                                    }
                                }
                            ]
                        };

                        this.chart.setOption(option);

                        // Make chart responsive
                        if (this.resizeHandler) {
                            window.removeEventListener('resize', this.resizeHandler);
                        }
                        this.resizeHandler = () => this.chart?.resize();
                        window.addEventListener('resize', this.resizeHandler);
                    });
                });
            },

            renderContributionChart() {
                // Dispose existing chart if any
                if (this.contributionChart) {
                    this.contributionChart.dispose();
                }

                const chartDom = document.getElementById('contributionChart');
                if (!chartDom) return;

                this.contributionChart = echarts.init(chartDom);

                // Prepare data for bar chart - monthly contributions
                const categories = [];
                const contributions = [];
                
                const [startYear, startMonth] = this.formData.startMonth.split('-').map(Number);
                const monthlyInflation = Math.pow(1 + this.formData.inflationRate / 100, 1 / 12) - 1;
                
                this.monthlyPlan.forEach((plan, index) => {
                    // Skip entries with 0 contribution
                    if (!plan.contribution || plan.contribution === 0) {
                        return;
                    }
                    
                    const label = `${plan.year} ${plan.month}`;
                    categories.push(label);
                    
                    let value;
                    if (this.contributionViewMode === 'nominal') {
                        value = plan.contribution;
                    } else {
                        // Real value - discount by inflation
                        const inflationFactor = Math.pow(1 + monthlyInflation, index);
                        value = plan.contribution / inflationFactor;
                    }
                    contributions.push(Math.round(value));
                });

                const option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: function(params) {
                            return `<strong>${params.name}</strong><br/>${params.marker} Contribution: ₹${params.value.toLocaleString('en-IN', {maximumFractionDigits: 0})}`;
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
                        right: '2%',
                        bottom: '2%',
                        top: '2%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: categories,
                        axisLabel: {
                            rotate: 45,
                            fontSize: 10,
                            interval: Math.max(0, Math.floor(categories.length / 24)) // Show ~24 labels max
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
                        name: 'Contribution',
                        type: 'bar',
                        data: contributions,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#f39c12' },
                                { offset: 1, color: '#f9c74f' }
                            ])
                        },
                        barMaxWidth: 40
                    }]
                };

                this.contributionChart.setOption(option);

                // Make chart responsive
                if (!this.contributionResizeHandler) {
                    this.contributionResizeHandler = () => this.contributionChart?.resize();
                    window.addEventListener('resize', this.contributionResizeHandler);
                }
            },
            
            generateContributionTable() {
                if (!this.monthlyPlan || this.monthlyPlan.length === 0) {
                    this.contributionTable = [];
                    return;
                }
                
                const [startYear, startMonth] = this.formData.startMonth.split('-').map(Number);
                const monthlyInflation = Math.pow(1 + this.formData.inflationRate / 100, 1 / 12) - 1;
                
                // Group contributions by year, excluding entries with 0 contribution
                const yearMap = new Map();
                
                this.monthlyPlan.forEach((plan, index) => {
                    // Skip entries with 0 contribution (like the final growth-only month)
                    if (!plan.contribution || plan.contribution === 0) {
                        return;
                    }
                    
                    const year = plan.year;
                    
                    if (!yearMap.has(year)) {
                        yearMap.set(year, Array(12).fill(null));
                    }
                    
                    const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(plan.month);
                    const nominalContribution = plan.contribution;
                    
                    // Calculate real contribution (present value)
                    const inflationFactor = Math.pow(1 + monthlyInflation, index);
                    const realContribution = nominalContribution / inflationFactor;
                    
                    yearMap.get(year)[monthIndex] = {
                        nominal: nominalContribution,
                        real: Math.round(realContribution)
                    };
                });
                
                // Convert map to array
                this.contributionTable = Array.from(yearMap.entries()).map(([year, months]) => ({
                    year,
                    months
                }));
            },

            formatCurrency(amount) {
                // Format large numbers in Crores, Lakhs, or Thousands
                if (amount >= 10000000) { // 1 crore or more
                    return (amount / 10000000).toFixed(1) + ' Cr';
                } else if (amount >= 100000) { // 1 lakh or more
                    return (amount / 100000).toFixed(1) + ' L';
                } else if (amount >= 1000) { // 1 thousand or more
                    return (amount / 1000).toFixed(1) + ' K';
                } else {
                    return amount.toLocaleString('en-IN', { maximumFractionDigits: 0 });
                }
            },
            formatCurrencyFull(amount) {
                // Full number format with Indian locale
                if (amount === null || amount === undefined || isNaN(amount)) {
                    return '0';
                }
                return amount.toLocaleString('en-IN', { maximumFractionDigits: 0 });
            },
            copyJSON() {
                navigator.clipboard.writeText(this.exportJSON).then(() => {
                    this.copyButtonText = 'Copied!';
                    setTimeout(() => {
                        this.copyButtonText = 'Copy JSON';
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy:', err);
                    this.copyButtonText = 'Copy Failed';
                    setTimeout(() => {
                        this.copyButtonText = 'Copy JSON';
                    }, 2000);
                });
            }
        },
        beforeUnmount() {
            if (this.chart) {
                this.chart.dispose();
            }
            if (this.contributionChart) {
                this.contributionChart.dispose();
            }
            if (this.resizeHandler) {
                window.removeEventListener('resize', this.resizeHandler);
            }
            if (this.contributionResizeHandler) {
                window.removeEventListener('resize', this.contributionResizeHandler);
            }
        }
    }).mount('#sip-calculator-app');
};

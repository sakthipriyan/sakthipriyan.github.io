// RealValue SIP Engine (Vue.js + ECharts)
window.initializeTool = window.initializeTool || {};

window.initializeTool.sipCalculator = function (container, config) {
    // Create Vue app template
    container.innerHTML = `
        <div id="sip-calculator-app">
            <div class="sip-calculator">
                <div class="sip-container">
                    <!-- Left Column: Input Fields -->
                    <div class="sip-inputs">
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
                        
                        <div class="button-row">
                            <button @click="calculateResults" class="calculate-btn" :disabled="!isFormValid">
                                <span v-if="calculating">Calculating...</span>
                                <span v-else>{{ results.calculated ? 'Recalculate' : 'Calculate SIP Returns' }}</span>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Right Column: Output Results and Chart -->
                    <div class="sip-outputs" v-if="results.calculated">
                        <div class="sip-summary">
                            <h3 v-if="isBothTargetsMode || results.timeRequired">🎯 Target Results</h3>
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
                            
                            <h3>📊 Investment Growth Analysis</h3>
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
                                        <td>₹ {{ formatCurrency(results.totalInvestment) }}</td>
                                        <td>₹ {{ formatCurrency(results.realInvestment) }}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Portfolio Value</strong></td>
                                        <td>₹ {{ formatCurrency(results.expectedValue) }}</td>
                                        <td>₹ {{ formatCurrency(results.inflationAdjustedValue) }}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Post Tax</strong></td>
                                        <td>₹ {{ formatCurrency(results.totalInvestment + (results.expectedValue - results.totalInvestment) * (1 - formData.taxRate / 100)) }}</td>
                                        <td>₹ {{ formatCurrency(results.postTaxRealValue) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem;">Understanding Values</h4>
                            <ul style="font-size: 0.9em; color: #666; line-height: 1.8;">
                                <li><strong>Nominal:</strong> Future value without adjusting for inflation.</li>
                                <li><strong>Real:</strong> Today's purchasing power after adjusting for inflation.</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="sip-outputs placeholder" v-else>
                        <div class="placeholder-content">
                            <h4>🎯 Your Results Will Appear Here</h4>
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
                
                <!-- Chart - Full Width Below -->
                <div class="chart-section" v-if="results.calculated">
                    <div class="chart-container">
                        <div id="sip-chart"></div>
                    </div>
                </div>
                
                <!-- Monthly Investment Plan - Full Width Below -->
                <div class="investment-plan" v-if="results.calculated && monthlyPlan.length > 0">
                    <hr>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <h4 style="margin: 0;">📅 Monthly Investment Plan</h4>
                        <div class="start-month-selector">
                            <label>Start Month:</label>
                            <input type="month" v-model="formData.startMonth">
                        </div>
                    </div>
                    <div class="plan-table-wrapper">
                        <table class="plan-table">
                            <thead>
                                <tr>
                                    <th>Year</th>
                                    <th>Month</th>
                                    <th>Contribution</th>
                                    <th>Growth</th>
                                    <th>Nominal Portfolio</th>
                                    <th>Real Portfolio</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row, index) in monthlyPlan" :key="index">
                                    <td>{{ row.year }}</td>
                                    <td>{{ row.month }}</td>
                                    <td>₹{{ formatCurrencyFull(row.contribution) }}</td>
                                    <td>₹{{ formatCurrencyFull(row.growth) }}</td>
                                    <td>₹{{ formatCurrencyFull(row.nominalPortfolio) }}</td>
                                    <td>₹{{ formatCurrencyFull(row.realPortfolio) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <!-- Contribution Table - Full Width Below -->
                <div class="contribution-table-section" v-if="results.calculated && contributionTable.length > 0">
                    <hr>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <h4 style="margin: 0;">💰 Contribution Table</h4>
                        <div class="mode-toggle">
                            <button 
                                type="button"
                                :class="{'active': contributionViewMode === 'nominal'}"
                                @click="contributionViewMode = 'nominal'">
                                Nominal
                            </button>
                            <button 
                                type="button"
                                :class="{'active': contributionViewMode === 'real'}"
                                @click="contributionViewMode = 'real'">
                                Real
                            </button>
                        </div>
                    </div>
                    <table class="plan-table contribution-grid" style="width: 100%;">
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
                                    <span v-if="amount !== null" :title="'₹ ' + (contributionViewMode === 'nominal' ? amount.nominal : amount.real).toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})">{{ formatCurrency(contributionViewMode === 'nominal' ? amount.nominal : amount.real) }}</span>
                                    <span v-else style="color: #999;">-</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
                calculating: false,
                debounceTimer: null,
                chart: null,
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
                const multipliers = { crores: 10000000, lakhs: 100000, thousands: 1000 };
                return currentInvestmentValue * multipliers[currentInvestmentUnit];
            },
            monthlyInvestment() {
                const { monthlyInvestmentValue, monthlyInvestmentUnit } = this.formData;
                const multipliers = { crores: 10000000, lakhs: 100000, thousands: 1000 };
                return monthlyInvestmentValue * multipliers[monthlyInvestmentUnit];
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
            targetAmount() {
                const { targetAmountValue, targetAmountUnit } = this.formData;
                const multipliers = { crores: 10000000, lakhs: 100000, thousands: 1000 };
                return targetAmountValue * multipliers[targetAmountUnit];
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
                }, 300);
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
            
            // Core SIP simulation engine - computes monthly then rolls up to yearly
            simulateSIP({ years, monthlyInvestmentFn, currentInvestment, cagr, inflationRate }) {
                const monthlyData = [];
                const yearlyData = [];
                let portfolioValue = 0;
                let totalInvested = 0;
                const monthlyCagr = Math.pow(1 + cagr / 100, 1 / 12) - 1;
                const monthlyInflation = Math.pow(1 + inflationRate / 100, 1 / 12) - 1;
                
                const totalMonths = Math.ceil(years * 12);
                
                // Monthly computation
                for (let monthIndex = 0; monthIndex < totalMonths; monthIndex++) {
                    const year = Math.floor(monthIndex / 12) + 1;
                    const month = (monthIndex % 12) + 1;
                    
                    const contribution = (monthIndex === 0) 
                        ? currentInvestment + monthlyInvestmentFn(year, month)
                        : monthlyInvestmentFn(year, month);
                    
                    totalInvested += contribution;
                    portfolioValue = portfolioValue * (1 + monthlyCagr) + contribution;
                    
                    const inflationFactor = Math.pow(1 + monthlyInflation, monthIndex);
                    const realValue = portfolioValue / inflationFactor;
                    
                    monthlyData.push({
                        monthIndex,
                        year,
                        month,
                        contribution,
                        portfolioValue,
                        totalInvested,
                        realValue
                    });
                }
                
                // Roll up to yearly data
                let totalInvestedPresentValue = 0;
                for (let year = 1; year <= years; year++) {
                    const lastMonthOfYear = Math.min(year * 12 - 1, totalMonths - 1);
                    const yearEndData = monthlyData[lastMonthOfYear];
                    
                    // Calculate investment made this year in present value
                    const startMonth = (year - 1) * 12;
                    const endMonth = Math.min(year * 12 - 1, totalMonths - 1);
                    for (let m = startMonth; m <= endMonth; m++) {
                        const contribution = monthlyData[m].contribution;
                        // Discount each contribution based on when it was made (month m)
                        const inflationFactor = Math.pow(1 + monthlyInflation, m);
                        totalInvestedPresentValue += contribution / inflationFactor;
                    }
                    
                    yearlyData.push({
                        year: year,
                        investment: yearEndData.totalInvested,
                        investmentPresentValue: totalInvestedPresentValue,
                        value: yearEndData.portfolioValue,
                        inflationAdjustedValue: yearEndData.realValue
                    });
                }
                
                const finalMonth = monthlyData[monthlyData.length - 1];
                
                // Calculate post-tax real value
                const taxRate = this.formData.taxRate;
                const postTaxRealValue = totalInvestedPresentValue + (finalMonth.realValue - totalInvestedPresentValue) * (1 - taxRate / 100);
                
                return {
                    monthlyData,
                    yearlyData,
                    finalPortfolioValue: finalMonth.portfolioValue,
                    finalInvestment: finalMonth.totalInvested,
                    finalInflationAdjustedValue: finalMonth.realValue,
                    finalInvestmentPresentValue: totalInvestedPresentValue,
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
                    const prevValue = index > 0 ? simulation.monthlyData[index - 1].portfolioValue : 0;
                    const growth = data.portfolioValue - prevValue - data.contribution;
                    
                    return {
                        year: currentYear,
                        month: monthNames[currentMonthNum],
                        contribution: Math.round(data.contribution),
                        growth: Math.round(growth),
                        nominalPortfolio: Math.round(data.portfolioValue),
                        realPortfolio: Math.round(data.realValue)
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
                let low = 0;
                let high = 100 * 12; // Max 100 years in months
                let requiredMonths = 0;
                
                while (high - low > 1) {
                    const testMonths = Math.floor((low + high) / 2);
                    const testYears = testMonths / 12;
                    
                    const simulation = this.simulateSIP({
                        years: testYears,
                        monthlyInvestmentFn,
                        currentInvestment,
                        cagr,
                        inflationRate
                    });
                    
                    if (simulation.postTaxRealValue < targetAmount) {
                        low = testMonths;
                    } else {
                        high = testMonths;
                    }
                }
                
                requiredMonths = high;
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
                    const prevValue = index > 0 ? simulation.monthlyData[index - 1].portfolioValue : 0;
                    const growth = data.portfolioValue - prevValue - data.contribution;
                    
                    return {
                        year: currentYear,
                        month: monthNames[currentMonthNum],
                        contribution: Math.round(data.contribution),
                        growth: Math.round(growth),
                        nominalPortfolio: Math.round(data.portfolioValue),
                        realPortfolio: Math.round(data.realValue)
                    };
                });

                this.$nextTick(() => {
                    this.renderChart();
                    this.generateContributionTable();
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
                    let low = 0;
                    let high = numberOfYears * 12;
                    let requiredMonths = 0;
                    
                    while (high - low > 1) {
                        const testMonths = Math.floor((low + high) / 2);
                        const testYears = testMonths / 12;
                        
                        const testResult = this.simulateSIP({
                            years: testYears,
                            monthlyInvestmentFn: () => 0,
                            currentInvestment,
                            cagr,
                            inflationRate
                        });
                        
                        if (testResult.postTaxRealValue < targetAmount) {
                            low = testMonths;
                        } else {
                            high = testMonths;
                        }
                    }
                    
                    requiredMonths = high;
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
                        const prevValue = index > 0 ? finalSimulation.monthlyData[index - 1].portfolioValue : 0;
                        const growth = data.portfolioValue - prevValue - data.contribution;
                        
                        return {
                            year: currentYear,
                            month: monthNames[currentMonthNum],
                            contribution: Math.round(data.contribution),
                            growth: Math.round(growth),
                            nominalPortfolio: Math.round(data.portfolioValue),
                            realPortfolio: Math.round(data.realValue)
                        };
                    });
                    
                    this.$nextTick(() => {
                        this.renderChart();
                        this.generateContributionTable();
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
                    const prevValue = index > 0 ? simulation.monthlyData[index - 1].portfolioValue : 0;
                    const growth = data.portfolioValue - prevValue - data.contribution;
                    
                    return {
                        year: currentYear,
                        month: monthNames[currentMonthNum],
                        contribution: Math.round(data.contribution),
                        growth: Math.round(growth),
                        nominalPortfolio: Math.round(data.portfolioValue),
                        realPortfolio: Math.round(data.realValue)
                    };
                });

                this.$nextTick(() => {
                    this.renderChart();
                    this.generateContributionTable();
                    this.calculating = false;
                });
            },

            renderChart() {
                // Dispose existing chart if any
                if (this.chart) {
                    this.chart.dispose();
                }

                const chartDom = document.getElementById('sip-chart');
                if (!chartDom) return;

                this.chart = echarts.init(chartDom);

                const option = {
                    title: {
                        text: 'Investment Growth Over Time',
                        left: 'center',
                        textStyle: {
                            fontSize: 16,
                            fontWeight: 'bold'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        },
                        formatter: function(params) {
                            let result = `<strong>Year ${params[0].axisValue}</strong><br/>`;
                            params.forEach(param => {
                                result += `${param.marker} ${param.seriesName}: ₹${param.value.toLocaleString('en-IN')}<br/>`;
                            });
                            return result;
                        }
                    },
                    legend: {
                        data: ['Nominal Portfolio', 'Real Portfolio', 'Nominal Investment', 'Real Investment'],
                        bottom: 10,
                        textStyle: {
                            fontSize: 12
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '15%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: this.yearlyData.map(d => d.year),
                        name: 'Years',
                        nameLocation: 'middle',
                        nameGap: 30,
                        axisLabel: {
                            fontSize: 11
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
                            name: 'Nominal Portfolio',
                            type: 'line',
                            data: this.yearlyData.map(d => Math.round(d.value)),
                            smooth: true,
                            lineStyle: {
                                width: 3,
                                color: '#4ECDC4'
                            },
                            itemStyle: {
                                color: '#4ECDC4'
                            },
                            areaStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    { offset: 0, color: 'rgba(78, 205, 196, 0.3)' },
                                    { offset: 1, color: 'rgba(78, 205, 196, 0.05)' }
                                ])
                            }
                        },
                        {
                            name: 'Real Portfolio',
                            type: 'line',
                            data: this.yearlyData.map(d => Math.round(d.inflationAdjustedValue)),
                            smooth: true,
                            lineStyle: {
                                width: 3,
                                color: '#95E1D3',
                                type: 'dashed'
                            },
                            itemStyle: {
                                color: '#95E1D3'
                            }
                        },
                        {
                            name: 'Nominal Investment',
                            type: 'line',
                            data: this.yearlyData.map(d => Math.round(d.investment)),
                            smooth: true,
                            lineStyle: {
                                width: 3,
                                color: '#FF6B6B'
                            },
                            itemStyle: {
                                color: '#FF6B6B'
                            },
                            areaStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    { offset: 0, color: 'rgba(255, 107, 107, 0.3)' },
                                    { offset: 1, color: 'rgba(255, 107, 107, 0.05)' }
                                ])
                            }
                        },
                        {
                            name: 'Real Investment',
                            type: 'line',
                            data: this.yearlyData.map(d => Math.round(d.investmentPresentValue)),
                            smooth: true,
                            lineStyle: {
                                width: 3,
                                color: '#FFB6B6',
                                type: 'dashed'
                            },
                            itemStyle: {
                                color: '#FFB6B6'
                            }
                        }
                    ]
                };

                this.chart.setOption(option);

                // Make chart responsive
                this.resizeHandler = () => this.chart?.resize();
                window.addEventListener('resize', this.resizeHandler);
            },
            
            generateContributionTable() {
                if (!this.monthlyPlan || this.monthlyPlan.length === 0) {
                    this.contributionTable = [];
                    return;
                }
                
                const [startYear, startMonth] = this.formData.startMonth.split('-').map(Number);
                const monthlyInflation = Math.pow(1 + this.formData.inflationRate / 100, 1 / 12) - 1;
                
                // Group contributions by year
                const yearMap = new Map();
                
                this.monthlyPlan.forEach((plan, index) => {
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
            if (this.resizeHandler) {
                window.removeEventListener('resize', this.resizeHandler);
            }
        }
    }).mount('#sip-calculator-app');
};

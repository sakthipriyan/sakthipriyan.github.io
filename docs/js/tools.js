// Tools JavaScript Module - Emergency Fund Tool Only
window.initializeTool = {
    // Emergency Fund Calculator Tool (Vue.js)
    emergencyFund: function (container, config) {
        // Create Vue app template
        container.innerHTML = `
            <div id="emergency-fund-app">
                <div class="emergency-fund">
                    <div class="ef-container">
                        <!-- Left Column: Input Fields -->
                        <div class="ef-inputs">
                            <h4>💰 Emergency Fund Calculator</h4>
                            
                            <div class="input-group">
                                <label>Monthly Expenses (₹):</label>
                                <input 
                                    type="number" 
                                    v-model.number="formData.monthlyExpenses" 
                                    min="5000" 
                                    step="1000"
                                    @input="debouncedCalculate"
                                >
                            </div>
                            
                            <div class="input-group">
                                <label>Coverage Period (Months):</label>
                                <select v-model.number="formData.coveragePeriod" @change="calculateResults">
                                    <option value="3">3 Months (Minimum)</option>
                                    <option value="6">6 Months (Standard)</option>
                                    <option value="9">9 Months (Conservative)</option>
                                    <option value="12">12 Months (Maximum)</option>
                                </select>
                            </div>
                            
                            <div class="input-group">
                                <label>Current Emergency Savings (₹):</label>
                                <input 
                                    type="number" 
                                    v-model.number="formData.currentSavings" 
                                    min="0" 
                                    step="5000"
                                    @input="debouncedCalculate"
                                >
                            </div>
                            
                            <div class="input-group">
                                <label>Monthly Savings Capacity (₹):</label>
                                <input 
                                    type="number" 
                                    v-model.number="formData.monthlySavings" 
                                    min="1000" 
                                    step="1000"
                                    @input="debouncedCalculate"
                                >
                            </div>
                            
                            <div class="input-group">
                                <label>Annual Increment in Savings (%):</label>
                                <input 
                                    type="number" 
                                    v-model.number="formData.annualIncrement" 
                                    min="0" 
                                    max="25" 
                                    step="1"
                                    @input="debouncedCalculate"
                                >
                            </div>
                            
                            <button @click="calculateResults" class="calculate-btn" :disabled="!isFormValid">
                                <span v-if="calculating">Calculating...</span>
                                <span v-else>{{ results.calculated ? 'Recalculate' : 'Calculate Emergency Fund' }}</span>
                            </button>
                        </div>
                        
                        <!-- Right Column: Output Results -->
                        <div class="ef-outputs" v-if="results.calculated">
                            <h4>📊 Emergency Fund Plan</h4>
                            
                            <div class="fund-summary">
                                <div class="summary-item">
                                    <span class="label">Target Amount:</span>
                                    <span class="value">₹{{ formatCurrency(results.targetAmount) }}</span>
                                </div>
                                <div class="summary-item">
                                    <span class="label">Amount Needed:</span>
                                    <span class="value">₹{{ formatCurrency(results.amountNeeded) }}</span>
                                </div>
                                <div class="summary-item">
                                    <span class="label">Time to Goal:</span>
                                    <span class="value">{{ results.timeToGoal }}</span>
                                </div>
                                <div class="summary-item">
                                    <span class="label">Progress:</span>
                                    <span class="value">{{ results.currentProgress.toFixed(1) }}%</span>
                                </div>
                            </div>
                            
                            <div class="progress-bar-container">
                                <div class="progress-bar">
                                    <div 
                                        class="progress-fill" 
                                        :style="{ width: Math.min(results.currentProgress, 100) + '%' }"
                                    ></div>
                                </div>
                                <span class="progress-text">{{ Math.min(results.currentProgress, 100).toFixed(1) }}%</span>
                            </div>
                            
                            <div class="savings-timeline">
                                <h5>⏱️ Savings Timeline:</h5>
                                <div class="timeline">
                                    <div 
                                        v-for="year in timeline" 
                                        :key="year.year" 
                                        class="timeline-item"
                                        :class="{ 'goal-achieved': year.progress >= 100 }"
                                    >
                                        <strong>Year {{ year.year }}:</strong> 
                                        ₹{{ formatCurrency(year.savings) }} 
                                        ({{ year.progress.toFixed(1) }}% complete)
                                        <span v-if="year.progress >= 100"> ✅ Goal Achieved!</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="ef-outputs placeholder" v-else>
                            <div class="placeholder-content">
                                <h4>🎯 Your Results Will Appear Here</h4>
                                <p>Fill in your financial details on the left to see your emergency fund plan</p>
                                <div class="placeholder-features">
                                    <p>✅ Target amount calculation</p>
                                    <p>✅ Progress visualization</p>
                                    <p>✅ Year-by-year timeline</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Initialize Vue app
        const { createApp } = Vue;

        createApp({
            data() {
                return {
                    formData: {
                        monthlyExpenses: 50000,
                        coveragePeriod: 6,
                        currentSavings: 0,
                        monthlySavings: 10000,
                        annualIncrement: 10
                    },
                    results: {
                        calculated: false,
                        targetAmount: 0,
                        amountNeeded: 0,
                        timeToGoal: '',
                        currentProgress: 0,
                        monthsToGoal: 0
                    },
                    timeline: [],
                    calculating: false,
                    debounceTimer: null
                }
            },
            computed: {
                isFormValid() {
                    const { monthlyExpenses, monthlySavings } = this.formData;
                    return monthlyExpenses > 0 && monthlySavings > 0;
                }
            },
            watch: {
                'formData.coveragePeriod': 'calculateResults'
            },
            mounted() {
                this.calculateResults();
            },
            methods: {
                debouncedCalculate() {
                    clearTimeout(this.debounceTimer);
                    this.debounceTimer = setTimeout(() => {
                        this.calculateResults();
                    }, 300);
                },

                calculateResults() {
                    this.calculating = true;
                    const { monthlyExpenses, coveragePeriod, currentSavings, monthlySavings, annualIncrement } = this.formData;

                    // Calculate target amount
                    const targetAmount = monthlyExpenses * coveragePeriod;
                    const amountNeeded = Math.max(0, targetAmount - currentSavings);
                    const currentProgress = (currentSavings / targetAmount) * 100;

                    // Calculate time to reach goal
                    let monthsToGoal = 0;
                    let totalSaved = currentSavings;
                    let currentMonthlySaving = monthlySavings;

                    if (amountNeeded > 0) {
                        while (totalSaved < targetAmount && monthsToGoal < 120) { // Max 10 years
                            totalSaved += currentMonthlySaving;
                            monthsToGoal++;

                            // Apply annual increment
                            if (monthsToGoal % 12 === 0) {
                                currentMonthlySaving *= (1 + annualIncrement / 100);
                            }
                        }
                    }

                    // Format time to goal
                    const years = Math.floor(monthsToGoal / 12);
                    const months = monthsToGoal % 12;
                    let timeToGoalText = '';
                    if (amountNeeded === 0) {
                        timeToGoalText = 'Goal already achieved! 🎉';
                    } else if (years > 0) {
                        timeToGoalText = `${years} year${years > 1 ? 's' : ''} ${months > 0 ? `and ${months} month${months > 1 ? 's' : ''}` : ''}`;
                    } else {
                        timeToGoalText = `${months} month${months > 1 ? 's' : ''}`;
                    }

                    // Update results
                    this.results = {
                        calculated: true,
                        targetAmount,
                        amountNeeded,
                        timeToGoal: timeToGoalText,
                        currentProgress,
                        monthsToGoal
                    };

                    // Generate timeline
                    this.generateTimeline();

                    // Simulate calculation time for UX
                    setTimeout(() => {
                        this.calculating = false;
                    }, 200);
                },

                generateTimeline() {
                    const { currentSavings, monthlySavings, annualIncrement } = this.formData;
                    const { targetAmount, monthsToGoal } = this.results;

                    this.timeline = [];
                    let totalSaved = currentSavings;
                    let currentMonthlySaving = monthlySavings;

                    for (let year = 1; year <= Math.min(Math.ceil(monthsToGoal / 12), 5); year++) {
                        const yearEndSavings = Math.min(totalSaved + (currentMonthlySaving * 12), targetAmount);
                        const progress = (yearEndSavings / targetAmount) * 100;

                        this.timeline.push({
                            year,
                            savings: yearEndSavings,
                            progress
                        });

                        totalSaved = yearEndSavings;
                        currentMonthlySaving *= (1 + annualIncrement / 100);

                        if (progress >= 100) break;
                    }
                },

                formatCurrency(amount) {
                    return amount.toLocaleString('en-IN');
                }
            }
        }).mount('#emergency-fund-app');
    },

    // SIP Calculator Tool (Vue.js + ECharts)
    sipCalculator: function (container, config) {
        // Create Vue app template
        container.innerHTML = `
            <div id="sip-calculator-app">
                <div class="sip-calculator">
                    <div class="sip-container">
                        <!-- Left Column: Input Fields -->
                        <div class="sip-inputs">
                            <h4>📈 SIP Calculator</h4>
                            
                            <div class="input-group">
                                <label>Current Investment (₹):</label>
                                <input 
                                    type="number" 
                                    v-model.number="formData.currentInvestment" 
                                    min="0" 
                                    step="10000"
                                    @input="debouncedCalculate"
                                >
                            </div>
                            
                            <div class="input-group">
                                <label>Monthly Investment (₹):</label>
                                <input 
                                    type="number" 
                                    v-model.number="formData.monthlyInvestment" 
                                    min="500" 
                                    step="1000"
                                    @input="debouncedCalculate"
                                >
                            </div>
                            
                            <div class="input-group">
                                <label>Expected CAGR (%):</label>
                                <input 
                                    type="number" 
                                    v-model.number="formData.cagr" 
                                    min="1" 
                                    max="30" 
                                    step="0.5"
                                    @input="debouncedCalculate"
                                >
                            </div>
                            
                            <div class="input-group">
                                <label>Yearly Hike in Investment (%):</label>
                                <input 
                                    type="number" 
                                    v-model.number="formData.yearlyHike" 
                                    min="0" 
                                    max="50" 
                                    step="1"
                                    @input="debouncedCalculate"
                                >
                            </div>
                            
                            <div class="input-group">
                                <label>Inflation Rate (%):</label>
                                <input 
                                    type="number" 
                                    v-model.number="formData.inflationRate" 
                                    min="0" 
                                    max="15" 
                                    step="0.5"
                                    @input="debouncedCalculate"
                                >
                            </div>
                            
                            <div class="input-group">
                                <label>Investment Period (Years):</label>
                                <input 
                                    type="number" 
                                    v-model.number="formData.numberOfYears" 
                                    min="1" 
                                    max="50" 
                                    step="1"
                                    @input="debouncedCalculate"
                                >
                            </div>
                            
                            <button @click="calculateResults" class="calculate-btn" :disabled="!isFormValid">
                                <span v-if="calculating">Calculating...</span>
                                <span v-else>{{ results.calculated ? 'Recalculate' : 'Calculate SIP Returns' }}</span>
                            </button>
                        </div>
                        
                        <!-- Right Column: Output Results and Chart -->
                        <div class="sip-outputs" v-if="results.calculated">
                            <h4>📊 Investment Growth Analysis</h4>
                            
                            <div class="sip-summary">
                                <div class="summary-item">
                                    <span class="label">Total Investment:</span>
                                    <span class="value">₹{{ formatCurrency(results.totalInvestment) }}</span>
                                </div>
                                <div class="summary-item">
                                    <span class="label">Expected Value:</span>
                                    <span class="value">₹{{ formatCurrency(results.expectedValue) }}</span>
                                </div>
                                <div class="summary-item">
                                    <span class="label">Total Returns:</span>
                                    <span class="value">₹{{ formatCurrency(results.totalReturns) }}</span>
                                </div>
                                <div class="summary-item">
                                    <span class="label">Inflation Adjusted Value:</span>
                                    <span class="value">₹{{ formatCurrency(results.inflationAdjustedValue) }}</span>
                                </div>
                                <div class="summary-item">
                                    <span class="label">Real Returns:</span>
                                    <span class="value">₹{{ formatCurrency(results.realReturns) }}</span>
                                </div>
                                <div class="summary-item">
                                    <span class="label">CAGR:</span>
                                    <span class="value">{{ formData.cagr }}%</span>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <div id="sip-chart" style="width: 100%; height: 400px;"></div>
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
                </div>
            </div>
        `;

        // Initialize Vue app
        const { createApp } = Vue;

        createApp({
            data() {
                return {
                    formData: {
                        currentInvestment: 1000000,
                        monthlyInvestment: 20000,
                        cagr: 12,
                        yearlyHike: 10,
                        inflationRate: 6,
                        numberOfYears: 25
                    },
                    results: {
                        calculated: false,
                        totalInvestment: 0,
                        expectedValue: 0,
                        totalReturns: 0,
                        inflationAdjustedValue: 0,
                        realReturns: 0
                    },
                    yearlyData: [],
                    calculating: false,
                    debounceTimer: null,
                    chart: null
                }
            },
            computed: {
                isFormValid() {
                    const { monthlyInvestment, cagr, numberOfYears } = this.formData;
                    return monthlyInvestment > 0 && cagr > 0 && numberOfYears > 0;
                }
            },
            mounted() {
                this.calculateResults();
            },
            methods: {
                debouncedCalculate() {
                    clearTimeout(this.debounceTimer);
                    this.debounceTimer = setTimeout(() => {
                        this.calculateResults();
                    }, 300);
                },

                calculateResults() {
                    this.calculating = true;
                    const { currentInvestment, monthlyInvestment, cagr, yearlyHike, inflationRate, numberOfYears } = this.formData;

                    // Calculate year-by-year growth
                    this.yearlyData = [];
                    let totalInvested = currentInvestment;
                    let portfolioValue = currentInvestment;
                    let currentMonthlyInvestment = monthlyInvestment;

                    for (let year = 1; year <= numberOfYears; year++) {
                        // Add monthly investments for the year with growth
                        for (let month = 1; month <= 12; month++) {
                            totalInvested += currentMonthlyInvestment;
                            // Apply monthly CAGR
                            portfolioValue = portfolioValue * (1 + cagr / 100 / 12) + currentMonthlyInvestment;
                        }

                        // Calculate inflation adjusted value
                        const inflationFactor = Math.pow(1 - inflationRate / 100, year);
                        const inflationAdjustedValue = portfolioValue * inflationFactor;

                        this.yearlyData.push({
                            year: year,
                            investment: totalInvested,
                            value: portfolioValue,
                            inflationAdjustedValue: inflationAdjustedValue
                        });

                        // Apply yearly hike to monthly investment for next year
                        currentMonthlyInvestment *= (1 + yearlyHike / 100);
                    }

                    // Final results
                    const finalData = this.yearlyData[this.yearlyData.length - 1];
                    this.results = {
                        calculated: true,
                        totalInvestment: finalData.investment,
                        expectedValue: finalData.value,
                        totalReturns: finalData.value - finalData.investment,
                        inflationAdjustedValue: finalData.inflationAdjustedValue,
                        realReturns: finalData.inflationAdjustedValue - finalData.investment
                    };

                    // Render chart after Vue updates DOM
                    this.$nextTick(() => {
                        this.renderChart();
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
                            data: ['Total Investment', 'Portfolio Value', 'Inflation Adjusted Value'],
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
                                name: 'Total Investment',
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
                                name: 'Portfolio Value',
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
                                name: 'Inflation Adjusted Value',
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
                            }
                        ]
                    };

                    this.chart.setOption(option);

                    // Make chart responsive
                    window.addEventListener('resize', () => {
                        if (this.chart) {
                            this.chart.resize();
                        }
                    });
                },

                formatCurrency(amount) {
                    return amount.toLocaleString('en-IN', { maximumFractionDigits: 0 });
                }
            },
            beforeUnmount() {
                if (this.chart) {
                    this.chart.dispose();
                }
            }
        }).mount('#sip-calculator-app');
    }
};

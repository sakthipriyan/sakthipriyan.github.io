// Emergency Fund Calculator Tool (Vue.js)
window.initializeTool = window.initializeTool || {};

window.initializeTool.emergencyFund = function (container, config) {
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
};

// RealValue Family SIP Allocator (Vue.js + ECharts)
window.initializeTool = window.initializeTool || {};

window.initializeTool.multiAssetAllocator = function (container, config) {
    // Create Vue app template
    container.innerHTML = `
        <style>
            .multi-asset-allocator th,
            .multi-asset-allocator .summary-table th,
            .multi-asset-allocator .allocation-table th,
            .multi-asset-allocator .asset-table th {
                text-align: center !important;
            }
            .chart-container {
                width: 100%;
                height: 400px;
                min-height: 400px;
            }
        </style>
        <div id="multi-asset-app">
            <div class="multi-asset-allocator">
                <div class="sip-container">
                    <!-- Left Column: Input Fields -->
                    <div class="sip-inputs">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                            <h3 style="margin: 0;">⚙️ Portfolio Configuration</h3>
                            <div style="display: flex; gap: 0.5rem;">
                                <input 
                                    type="file" 
                                    id="import-file" 
                                    accept=".json" 
                                    @change="importData" 
                                    style="display: none;"
                                >
                                <button 
                                    type="button" 
                                    class="unit-buttons-btn"
                                    @click="$el.querySelector('#import-file').click()">
                                    ⬆️ Import
                                </button>
                                <button 
                                    type="button" 
                                    class="unit-buttons-btn"
                                    @click="exportData"
                                    :disabled="results.summary.length === 0">
                                    ⬇️ Export
                                </button>
                            </div>
                        </div>
                        
                        <!-- Investors Section -->
                        <div class="investors-group">
                            <!-- Round Off -->
                            <div class="input-group" style="margin-bottom: 1.5rem;">
                                <label style="display: flex; align-items: center; gap: 0.5rem;">
                                    Round Off (K):
                                    <input 
                                        type="number" 
                                        v-model.number="roundOffValue" 
                                        min="1"
                                        step="1"
                                        @input="calculate"
                                        style="width: 80px; padding: 0.4rem; text-align: center;"
                                    >
                                    <span class="help-icon" :data-tooltip="'₹' + formatRoundOff() + ' - Investor allocations and asset allocations will be rounded to multiples of this value'">ℹ️</span>
                                </label>
                            </div>
                            
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                                <h4 style="margin: 0;">👥 Investors</h4>
                                <button type="button" class="unit-buttons-btn" @click="addInvestor">
                                    ➕ Add
                                </button>
                            </div>
                            
                            <table class="asset-table" style="margin-bottom: 1rem;">
                                <thead>
                                    <tr>
                                        <th style="width: 30px;"></th>
                                        <th>Name</th>
                                        <th>Allocation (K)</th>
                                        <th>Intl.</th>
                                        <th>TCS</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(investor, index) in investors" :key="index" 
                                        draggable="true"
                                        @dragstart="dragStart($event, index, 'investor')"
                                        @dragend="dragEnd($event)"
                                        @dragover.prevent
                                        @drop="drop($event, index, 'investor')"
                                        style="cursor: move;">
                                        <td style="text-align: center; cursor: grab;" @mousedown="$event.target.style.cursor='grabbing'" @mouseup="$event.target.style.cursor='grab'">
                                            ⋮⋮
                                        </td>
                                        <td>
                                            <input 
                                                type="text" 
                                                v-model="investor.name" 
                                                placeholder="Investor name"
                                                @input="calculate"
                                                style="width: 100%; border: none; background: transparent; padding: 0.25rem;"
                                            >
                                        </td>
                                        <td>
                                            <input 
                                                type="number" 
                                                v-model.number="investor.amountValue" 
                                                min="0"
                                                :step="roundOffValue"
                                                @input="calculate"
                                                style="width: 80px; padding: 0.25rem;"
                                            >
                                        </td>
                                        <td style="text-align: center;">
                                            <input 
                                                type="checkbox" 
                                                v-model="investor.international"
                                                @change="calculate"
                                            >
                                        </td>
                                        <td style="text-align: center;">
                                            <input 
                                                type="checkbox" 
                                                v-model="investor.tcs"
                                                @change="calculate"
                                                :disabled="!investor.international"
                                            >
                                        </td>
                                        <td style="text-align: center;">
                                            <button 
                                                type="button" 
                                                class="btn-remove-subtle"
                                                @click="removeInvestor(index)"
                                                v-if="investors.length > 1"
                                                title="Remove investor"
                                            >
                                                ✕
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            
                            <!-- Asset Classes -->
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; margin-top: 2rem;">
                                <h4 style="margin: 0;">🎯 Asset Classes</h4>
                                <button type="button" class="unit-buttons-btn" @click="addAsset">
                                    ➕ Add
                                </button>
                            </div>
                            <table class="asset-table">
                                <thead>
                                    <tr>
                                        <th style="width: 30px;"></th>
                                        <th>Asset Class</th>
                                        <th>Target %</th>
                                        <th>Current (₹)</th>
                                        <th>Slab rate</th>
                                        <th>Intl.</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(asset, index) in assets" :key="index"
                                        draggable="true"
                                        @dragstart="dragStart($event, index, 'asset')"
                                        @dragend="dragEnd($event)"
                                        @dragover.prevent
                                        @drop="drop($event, index, 'asset')"
                                        style="cursor: move;">
                                        <td style="text-align: center; cursor: grab;" @mousedown="$event.target.style.cursor='grabbing'" @mouseup="$event.target.style.cursor='grab'">
                                            ⋮⋮
                                        </td>
                                        <td>
                                            <input 
                                                type="text" 
                                                v-model="asset.name" 
                                                placeholder="Asset name"
                                                @input="calculate"
                                                style="width: 100%; border: none; background: transparent; padding: 0.25rem;"
                                            >
                                        </td>
                                        <td>
                                            <input 
                                                type="number" 
                                                v-model.number="asset.targetPercent" 
                                                min="0"
                                                max="100"
                                                step="0.1"
                                                @input="calculate"
                                                style="width: 70px; padding: 0.4rem; border: 1px solid var(--gray-medium); border-radius: 4px;"
                                            >
                                        </td>
                                        <td>
                                            <input 
                                                type="number" 
                                                v-model.number="asset.currentValue" 
                                                min="0"
                                                step="1000"
                                                @input="calculate"
                                                style="width: 100%; padding: 0.4rem; border: 1px solid var(--gray-medium); border-radius: 4px;"
                                            >
                                        </td>
                                        <td style="text-align: center;">
                                            <input 
                                                type="checkbox" 
                                                v-model="asset.hasSlabRate"
                                                @change="calculate"
                                                style="cursor: pointer;"
                                            >
                                        </td>
                                        <td style="text-align: center;">
                                            <input 
                                                type="checkbox" 
                                                v-model="asset.isInternational"
                                                @change="calculate"
                                                style="cursor: pointer;"
                                            >
                                        </td>
                                        <td style="text-align: center;">
                                            <button 
                                                type="button" 
                                                class="btn-remove-subtle"
                                                @click="removeAsset(index)"
                                                v-if="assets.length > 1"
                                                title="Remove asset"
                                            >
                                                ✕
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <!-- Asset Groups -->
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; margin-top: 2rem;">
                                <h4 style="margin: 0;">🏷️ Asset Groups</h4>
                                <button type="button" class="unit-buttons-btn" @click="addGroup">
                                    ➕ Add
                                </button>
                            </div>
                            <table class="asset-table" v-if="assetGroups.length > 0">
                                <thead>
                                    <tr>
                                        <th style="width: 30px;"></th>
                                        <th style="width: 100px;">Name</th>
                                        <th>Assets</th>
                                        <th style="width: 70px; text-align: center;">Max %</th>
                                        <th style="width: 40px;"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(group, index) in assetGroups" :key="index"
                                        draggable="true"
                                        @dragstart="dragStart($event, index, 'group')"
                                        @dragend="dragEnd($event)"
                                        @dragover.prevent
                                        @drop="drop($event, index, 'group')"
                                        style="cursor: move;">
                                        <td style="text-align: center; cursor: grab;" @mousedown="$event.target.style.cursor='grabbing'" @mouseup="$event.target.style.cursor='grab'">
                                            ⋮⋮
                                        </td>
                                        <td>
                                            <input 
                                                type="text" 
                                                v-model="group.name" 
                                                placeholder="Group name"
                                                @input="calculate"
                                                style="width: 100%; border: none; background: transparent; padding: 0.25rem;"
                                            >
                                        </td>
                                        <td>
                                            <div style="display: flex; flex-wrap: nowrap; gap: 0.375rem; align-items: center;">
                                                <span v-for="assetName in group.assetNames" :key="assetName" 
                                                      class="asset-badge">
                                                    {{ assetName }}
                                                    <button type="button" 
                                                            @click="removeAssetFromGroup(index, assetName)"
                                                            class="asset-badge-remove"
                                                            title="Remove asset">
                                                        ✕
                                                    </button>
                                                </span>
                                                <select @change="addAssetToGroup(index, $event)" 
                                                        style="border: 1px solid #ddd; border-radius: 4px; padding: 0.25rem 0.5rem; font-size: 0.875rem; background: white; flex-shrink: 0;">
                                                    <option value="">+ Add</option>
                                                    <option v-for="asset in getAvailableAssetsForGroup(group)" 
                                                            :key="asset.name" 
                                                            :value="asset.name">
                                                        {{ asset.name }}
                                                    </option>
                                                </select>
                                            </div>
                                        </td>
                                        <td style="text-align: center; font-weight: 600; color: #666;">
                                            {{ getGroupMaxPercent(group) }}%
                                        </td>
                                        <td style="text-align: center;">
                                            <button 
                                                type="button" 
                                                class="btn-remove-subtle"
                                                @click="removeGroup(index)"
                                                title="Remove group"
                                            >
                                                ✕
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <p style="font-size: 0.9em; color: #666; margin-top: 1rem; font-style: italic;">💡 Allocations update automatically as you adjust inputs</p>
                    </div>
                    
                    <!-- Right Column: Output Results -->
                    <div class="sip-outputs">
                        
                        <!-- Validation Messages -->
                        <div v-if="validationErrors.length > 0" class="validation-errors">
                            <div v-for="error in validationErrors" class="error-message">
                                ⚠️ {{ error }}
                            </div>
                        </div>
                        
                        <!-- Summary Metrics -->
                        <div v-if="results.investorAllocations.length > 0">
                            <h3 style="margin-top: 0;">📈 Summary</h3>
                            <div style="margin-bottom: 2rem;">
                                <table class="summary-table">
                                    <tbody>
                                        <tr>
                                            <td><strong>New Allocation</strong></td>
                                            <td class="highlight">{{ formatNewAllocationPercent() }}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Drift Correction</strong></td>
                                            <td class="highlight">{{ formatDriftCorrection() }}</td>
                                        </tr>
                                        <tr v-if="getTotalTCS() > 0">
                                            <td><strong>TCS Drag</strong></td>
                                            <td class="highlight">{{ formatTCSDrag() }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            
                            <h3 style="margin-top: 2rem;">📋 Allocation Results</h3>
                        </div>

                        <!-- Individual Allocations -->
                        <div v-if="results.investorAllocations.length > 0">
                            
                            <div class="table-responsive" style="margin-bottom: 2rem;">
                                <table class="allocation-table">
                                    <thead>
                                        <tr>
                                            <th>Asset Class</th>
                                            <th v-for="allocation in results.investorAllocations" :key="allocation.name" style="text-align: right;">
                                                {{ allocation.name }}
                                            </th>
                                            <th v-if="results.investorAllocations.length > 1" style="text-align: right;">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="assetClass in getAllocatedAssetClasses()" :key="assetClass">
                                            <td>{{ assetClass }}</td>
                                            <td v-for="allocation in results.investorAllocations" :key="allocation.name" style="text-align: right;">
                                                {{ getInvestorAssetAllocation(allocation, assetClass) }}
                                            </td>
                                            <td v-if="results.investorAllocations.length > 1" style="text-align: right;"><strong>{{ getAssetClassTotal(assetClass) }}</strong></td>
                                        </tr>
                                        <tr class="total-row">
                                            <td><strong>Net Total</strong></td>
                                            <td v-for="allocation in results.investorAllocations" :key="allocation.name" style="text-align: right;">
                                                <strong>₹{{ formatNumber(allocation.total) }}</strong>
                                            </td>
                                            <td v-if="results.investorAllocations.length > 1" style="text-align: right;"><strong>₹{{ formatNumber(results.totalNewAllocation) }}</strong></td>
                                        </tr>
                                        <tr v-for="assetClass in getAllocatedAssetClassesWithTCS()" :key="assetClass + '-tcs'">
                                            <td>{{ assetClass }} (TCS)</td>
                                            <td v-for="allocation in results.investorAllocations" :key="allocation.name" style="text-align: right;">
                                                {{ getInvestorAssetTCS(allocation, assetClass) }}
                                            </td>
                                            <td v-if="results.investorAllocations.length > 1" style="text-align: right;"><strong>{{ getAssetClassTCSTotal(assetClass) }}</strong></td>
                                        </tr>
                                        <tr class="total-row" v-if="getAllocatedAssetClassesWithTCS().length > 0">
                                            <td><strong>Gross Total</strong></td>
                                            <td v-for="allocation in results.investorAllocations" :key="allocation.name" style="text-align: right;">
                                                <strong>₹{{ formatNumber(allocation.total + allocation.tcs) }}</strong>
                                            </td>
                                            <td v-if="results.investorAllocations.length > 1" style="text-align: right;"><strong>₹{{ formatNumber(results.totalNewAllocation + getTotalTCS()) }}</strong></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            
                            <h3 style="margin-top: 1.5rem; margin-bottom: 0.5rem;">Understanding Terms</h3>
                            <ul style="font-size: 0.9em; color: #666; line-height: 1.8;">
                                <li><strong>Pre Allocation:</strong> Portfolio state before new investments.</li>
                                <li><strong>Post Allocation:</strong> Portfolio state after new investments.</li>
                                <li><strong>Drift:</strong> Deviation from target allocation.</li>
                                <li><strong>TCS:</strong> Tax Collected at Source on international investments.</li>
                            </ul>
                            <p style="font-size: 0.9em; color: #666; margin-top: 0.5rem;">
                                📚 Learn more: <a href="/building-wealth/tools/multi-asset-allocator/#how-it-works" style="color: #0066cc; text-decoration: none;">How It Works</a> | 
                                <a href="/building-wealth/tools/multi-asset-allocator/#frequently-asked-questions" style="color: #0066cc; text-decoration: none;">FAQs</a> | 
                                <a href="/building-wealth/tools/multi-asset-allocator/#features" style="color: #0066cc; text-decoration: none;">Features</a>
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- 📈 Summary Report - Full Width Below -->
                <div class="investment-plan" v-if="results.summary.length > 0">
                    
                    <!-- Portfolio 📈 Summary with toggles -->
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <div style="display: flex; gap: 1rem; align-items: center;">
                            <h2 style="margin: 0;">📊 Allocation Report</h2>
                            <!-- Chart/Table Toggle -->
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
                        </div>
                        <!-- Percentage/Amount Toggle -->
                        <div class="mode-toggle">
                            <button 
                                type="button"
                                :class="{'active': portfolioViewMode === 'percentage'}"
                                @click="portfolioViewMode = 'percentage'; updateChart()">
                                Percentage
                            </button>
                            <button 
                                type="button"
                                :class="{'active': portfolioViewMode === 'amount'}"
                                @click="portfolioViewMode = 'amount'; updateChart()">
                                Amount
                            </button>
                        </div>
                    </div>
                    
                    <!-- Table View -->
                    <div v-show="portfolioViewTab === 'table'" class="table-responsive">
                        <table class="summary-table">
                            <thead>
                                <tr v-if="portfolioViewMode === 'percentage'">
                                    <th rowspan="2">Asset Class</th>
                                    <th colspan="3">Pre Allocation</th>
                                    <th rowspan="2">Allocation</th>
                                    <th colspan="3">Post Allocation</th>
                                </tr>
                                <tr v-if="portfolioViewMode === 'percentage'">
                                    <th>Target</th>
                                    <th>Actual</th>
                                    <th>Drift</th>
                                    <th>Target</th>
                                    <th>Actual</th>
                                    <th>Drift</th>
                                </tr>
                                <tr v-if="portfolioViewMode === 'amount'">
                                    <th rowspan="2">Asset Class</th>
                                    <th colspan="3">Pre Allocation</th>
                                    <th rowspan="2">Allocation</th>
                                    <th colspan="3">Post Allocation</th>
                                </tr>
                                <tr v-if="portfolioViewMode === 'amount'">
                                    <th>Target</th>
                                    <th>Actual</th>
                                    <th>Drift</th>
                                    <th>Target</th>
                                    <th>Actual</th>
                                    <th>Drift</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="row in results.summary" :key="row.assetClass">
                                    <td><strong>{{ row.assetClass }}</strong></td>
                                    <template v-if="portfolioViewMode === 'percentage'">
                                        <td>{{ row.targetPercent.toFixed(2) }}%</td>
                                        <td>{{ row.preActualPercent.toFixed(2) }}%</td>
                                        <td :class="getDiffClass(row.preDrift)">
                                            {{ formatDrift(row.preDrift) }}
                                        </td>
                                        <td>{{ row.newAllocationPercent.toFixed(2) }}%</td>
                                        <td>{{ row.targetPercent.toFixed(2) }}%</td>
                                        <td>{{ row.postPercent.toFixed(2) }}%</td>
                                        <td :class="getDiffClass(row.postDrift)">
                                            {{ formatDrift(row.postDrift) }}
                                        </td>
                                    </template>
                                    <template v-else>
                                        <td>₹{{ formatNumber(row.preTargetValue) }}</td>
                                        <td>₹{{ formatNumber(row.currentValue) }}</td>
                                        <td :class="getDiffClass(row.currentValue - row.preTargetValue)">
                                            {{ (row.currentValue - row.preTargetValue) >= 0 ? '+' : '-' }}₹{{ formatNumber(Math.abs(row.currentValue - row.preTargetValue)) }}
                                        </td>
                                        <td>₹{{ formatNumber(row.newAllocation) }}</td>
                                        <td>₹{{ formatNumber(row.targetValue) }}</td>
                                        <td>₹{{ formatNumber(row.postValue) }}</td>
                                        <td :class="getDiffClass(row.postValue - row.targetValue)">
                                            {{ (row.postValue - row.targetValue) >= 0 ? '+' : '-' }}₹{{ formatNumber(Math.abs(row.postValue - row.targetValue)) }}
                                        </td>
                                    </template>
                                </tr>
                                <tr class="total-row">
                                    <td><strong>Total</strong></td>
                                    <template v-if="portfolioViewMode === 'percentage'">
                                        <td>{{ results.totalTargetPercent.toFixed(2) }}%</td>
                                        <td>100.00%</td>
                                        <td><strong>{{ results.totalPreDriftPercent.toFixed(2) }}%</strong></td>
                                        <td>100.00%</td>
                                        <td>{{ results.totalTargetPercent.toFixed(2) }}%</td>
                                        <td>100.00%</td>
                                        <td><strong>{{ results.totalPostDriftPercent.toFixed(2) }}%</strong></td>
                                    </template>
                                    <template v-else>
                                        <td>₹{{ formatNumber(results.totalCurrent) }}</td>
                                        <td>₹{{ formatNumber(results.totalCurrent) }}</td>
                                        <td><strong>₹{{ formatNumber(results.totalPreDriftRupee) }}</strong></td>
                                        <td>₹{{ formatNumber(results.totalNewAllocation) }}</td>
                                        <td>₹{{ formatNumber(results.totalTarget) }}</td>
                                        <td>₹{{ formatNumber(results.totalPost) }}</td>
                                        <td><strong>₹{{ formatNumber(results.totalPostDriftRupee) }}</strong></td>
                                    </template>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- Chart View -->
                    <div v-show="portfolioViewTab === 'chart'" style="margin-bottom: 2rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                            <div>
                                <h3 style="text-align: center; margin-bottom: 1rem;">📊 Portfolio Allocation</h3>
                                <div id="allocation-chart" class="chart-container"></div>
                            </div>
                            <div>
                                <h3 style="text-align: center; margin-bottom: 1rem;">📉 Drift Analysis</h3>
                                <div id="drift-chart" class="chart-container"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Create Vue app
    const app = Vue.createApp({
        data() {
            return {
                investors: [
                    { name: 'Investor 1', amountValue: 50, amountUnit: 'thousands', international: false, tcs: false }
                ],
                roundOffValue: 5,
                roundOffUnit: 'thousands',
                assets: [
                    { name: 'Nifty 50', targetPercent: 40, currentValue: 500000, hasSlabRate: false, isInternational: false },
                    { name: 'Nasdaq 100', targetPercent: 40, currentValue: 500000, hasSlabRate: false, isInternational: true },
                    { name: 'Gold', targetPercent: 20, currentValue: 250000, hasSlabRate: true, isInternational: false }
                ],
                assetGroups: [],
                results: {
                    investorAllocations: [],
                    summary: [],
                    totalCurrent: 0,
                    totalNewAllocation: 0,
                    totalPost: 0,
                    totalTargetPercent: 0
                },
                validationErrors: [],
                chart: null,
                driftChart: null,
                resizeHandler: null,
                driftResizeHandler: null,
                portfolioViewMode: 'percentage',
                portfolioViewTab: 'chart',
                draggedIndex: null,
                draggedType: null
            };
        },
        mounted() {
            this.calculate();
        },
        watch: {
            'results.summary': {
                handler(newVal, oldVal) {
                    // When results disappear (validation error), dispose charts
                    if ((!newVal || newVal.length === 0) && oldVal && oldVal.length > 0) {
                        if (this.chart) {
                            this.chart.dispose();
                            this.chart = null;
                        }
                        if (this.driftChart) {
                            this.driftChart.dispose();
                            this.driftChart = null;
                        }
                    }
                    // When results become available and we're on chart view, render charts
                    else if (newVal && newVal.length > 0 && this.portfolioViewTab === 'chart') {
                        this.$nextTick(() => {
                            setTimeout(() => {
                                this.updateChart();
                            }, 100);
                        });
                    }
                },
                deep: false
            },
            portfolioViewTab() {
                // When switching to chart tab, render charts
                if (this.portfolioViewTab === 'chart' && this.results.summary.length > 0) {
                    this.$nextTick(() => {
                        setTimeout(() => {
                            this.updateChart();
                        }, 100);
                    });
                }
            },
            portfolioViewMode() {
                // When view mode changes, update charts if on chart view
                if (this.portfolioViewTab === 'chart' && this.results.summary.length > 0) {
                    this.updateChart();
                }
            }
        },
        methods: {
            dragStart(event, index, type) {
                this.draggedIndex = index;
                this.draggedType = type;
                event.target.closest('tr').style.opacity = '0.5';
            },
            dragEnd(event) {
                event.target.closest('tr').style.opacity = '1';
            },
            drop(event, dropIndex, type) {
                event.preventDefault();
                if (this.draggedType !== type || this.draggedIndex === null) return;
                
                let array;
                if (type === 'investor') {
                    array = this.investors;
                } else if (type === 'asset') {
                    array = this.assets;
                } else if (type === 'group') {
                    array = this.assetGroups;
                } else {
                    return;
                }
                
                const draggedItem = array[this.draggedIndex];
                
                // Remove from old position
                array.splice(this.draggedIndex, 1);
                // Insert at new position
                array.splice(dropIndex, 0, draggedItem);
                
                // Reset drag state
                this.draggedIndex = null;
                this.draggedType = null;
                
                this.calculate();
            },
            getUnitMultiplier(unit) {
                const multipliers = {
                    crores: 10000000,
                    lakhs: 100000,
                    thousands: 1000
                };
                return multipliers[unit] || 1;
            },
            getInvestorAmount(investor) {
                return (investor.amountValue || 0) * this.getUnitMultiplier(investor.amountUnit);
            },
            getAssetCurrentValue(asset) {
                return asset.currentValue || 0;
            },
            formatInvestorAmount(investor) {
                const amount = this.getInvestorAmount(investor);
                if (amount === 0) return '0';
                return amount.toLocaleString('en-IN');
            },
            getRoundOff() {
                return (this.roundOffValue || 0) * this.getUnitMultiplier(this.roundOffUnit);
            },
            formatRoundOff() {
                const amount = this.getRoundOff();
                if (amount === 0) return '0';
                return amount.toLocaleString('en-IN');
            },
            addInvestor() {
                this.investors.push({
                    name: `Investor ${this.investors.length + 1}`,
                    amountValue: 0,
                    amountUnit: 'thousands',
                    international: false,
                    tcs: false
                });
            },
            removeInvestor(index) {
                this.investors.splice(index, 1);
                this.calculate();
                // Resize charts after data change
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.chart?.resize();
                        this.driftChart?.resize();
                    }, 150);
                });
            },
            addAsset() {
                this.assets.push({
                    name: `Asset ${this.assets.length + 1}`,
                    targetPercent: 0,
                    currentValue: 0,
                    hasSlabRate: false,
                    isInternational: false
                });
            },
            removeAsset(index) {
                this.assets.splice(index, 1);
                this.calculate();
            },
            addGroup() {
                this.assetGroups.push({
                    name: `Group ${this.assetGroups.length + 1}`,
                    assetNames: []
                });
            },
            removeGroup(index) {
                this.assetGroups.splice(index, 1);
                this.calculate();
            },
            addAssetToGroup(groupIndex, event) {
                const assetName = event.target.value;
                if (assetName && !this.assetGroups[groupIndex].assetNames.includes(assetName)) {
                    this.assetGroups[groupIndex].assetNames.push(assetName);
                    this.calculate();
                }
                event.target.value = ''; // Reset dropdown
            },
            removeAssetFromGroup(groupIndex, assetName) {
                const group = this.assetGroups[groupIndex];
                const assetIndex = group.assetNames.indexOf(assetName);
                if (assetIndex > -1) {
                    group.assetNames.splice(assetIndex, 1);
                    this.calculate();
                }
            },
            getAvailableAssetsForGroup(group) {
                // Get all assets that are already in any group (excluding current group)
                const assetsInOtherGroups = new Set();
                this.assetGroups.forEach(g => {
                    if (g !== group) {
                        g.assetNames.forEach(name => assetsInOtherGroups.add(name));
                    }
                });
                
                // Filter out assets already in current group or in other groups
                return this.assets.filter(asset => 
                    !group.assetNames.includes(asset.name) && 
                    !assetsInOtherGroups.has(asset.name)
                );
            },
            getGroupMaxPercent(group) {
                return group.assetNames.reduce((sum, assetName) => {
                    const asset = this.assets.find(a => a.name === assetName);
                    return sum + (asset ? asset.targetPercent : 0);
                }, 0).toFixed(2);
            },
            getAllocatedAssetClasses() {
                // Get unique asset classes that have allocations
                const assetClasses = new Set();
                this.results.investorAllocations.forEach(allocation => {
                    allocation.allocations.forEach(item => {
                        assetClasses.add(item.asset);
                    });
                });
                return Array.from(assetClasses);
            },
            getAllocatedAssetClassesWithTCS() {
                // Get unique asset classes that have TCS
                const assetClasses = new Set();
                this.results.investorAllocations.forEach(allocation => {
                    allocation.allocations.forEach(item => {
                        if (item.tcs > 0) {
                            assetClasses.add(item.asset);
                        }
                    });
                });
                return Array.from(assetClasses);
            },
            getInvestorAssetAllocation(allocation, assetClass) {
                const item = allocation.allocations.find(a => a.asset === assetClass);
                if (item && item.amount > 0) {
                    return '₹' + this.formatNumber(item.amount);
                }
                return '-';
            },
            getInvestorAssetTCS(allocation, assetClass) {
                const item = allocation.allocations.find(a => a.asset === assetClass);
                if (item && item.tcs > 0) {
                    return '₹' + this.formatNumber(item.tcs);
                }
                return '-';
            },
            getAssetClassTotal(assetClass) {
                let total = 0;
                this.results.investorAllocations.forEach(allocation => {
                    const item = allocation.allocations.find(a => a.asset === assetClass);
                    if (item) {
                        total += item.amount;
                    }
                });
                return '₹' + this.formatNumber(total);
            },
            getAssetClassTCSTotal(assetClass) {
                let total = 0;
                this.results.investorAllocations.forEach(allocation => {
                    const item = allocation.allocations.find(a => a.asset === assetClass);
                    if (item) {
                        total += item.tcs;
                    }
                });
                return '₹' + this.formatNumber(total);
            },
            getTotalTCS() {
                let total = 0;
                this.results.investorAllocations.forEach(allocation => {
                    total += allocation.tcs;
                });
                return total;
            },
            getTotalTransactions() {
                let count = 0;
                this.results.investorAllocations.forEach(allocation => {
                    allocation.allocations.forEach(item => {
                        if (item.amount > 0) {
                            count++;
                        }
                    });
                });
                return count;
            },
            formatDriftCorrection() {
                const correction = this.results.totalPreDriftPercent - this.results.totalPostDriftPercent;
                return correction.toFixed(2) + '%';
            },
            formatNewAllocationPercent() {
                if (this.results.totalCurrent === 0) return '100%';
                const percent = (this.results.totalNewAllocation / this.results.totalCurrent) * 100;
                return percent.toFixed(2) + '%';
            },
            formatTCSDrag() {
                const totalTCS = this.getTotalTCS();
                if (totalTCS === 0) return '0%';
                const drag = (totalTCS / (this.results.totalNewAllocation + totalTCS)) * 100;
                return drag.toFixed(2) + '%';
            },
            validate() {
                const errors = [];
                
                // Check if there are investors
                if (this.investors.length === 0) {
                    errors.push('At least one investor is required');
                }
                
                // Check if there are assets
                if (this.assets.length === 0) {
                    errors.push('At least one asset class is required');
                }
                
                // Check target percentages sum to 100
                const totalTarget = this.assets.reduce((sum, asset) => sum + (asset.targetPercent || 0), 0);
                if (Math.abs(totalTarget - 100) > 0.01) {
                    errors.push(`Target percentages must sum to 100% (current: ${totalTarget.toFixed(2)}%)`);
                }
                
                // Check for empty names
                const emptyAssetNames = this.assets.filter(a => !a.name || a.name.trim() === '');
                if (emptyAssetNames.length > 0) {
                    errors.push('All asset classes must have names');
                }
                
                const emptyInvestorNames = this.investors.filter(i => !i.name || i.name.trim() === '');
                if (emptyInvestorNames.length > 0) {
                    errors.push('All investors must have names');
                }
                
                // Check for duplicate names
                const assetNames = this.assets.map(a => a.name.trim().toLowerCase());
                const duplicateAssets = assetNames.filter((name, index) => assetNames.indexOf(name) !== index);
                if (duplicateAssets.length > 0) {
                    errors.push('Asset class names must be unique');
                }
                
                this.validationErrors = errors;
                return errors.length === 0;
            },
            calculate() {
                if (!this.validate()) {
                    this.results = {
                        investorAllocations: [],
                        summary: [],
                        totalCurrent: 0,
                        totalNewAllocation: 0,
                        totalPost: 0,
                        totalTargetPercent: 0
                    };
                    return;
                }

                // Calculate current total portfolio value
                const currentTotal = this.assets.reduce((sum, asset) => sum + this.getAssetCurrentValue(asset), 0);
                
                // Calculate total new investment budget (includes TCS for planning)
                const totalNewInvestment = this.investors.reduce((sum, inv) => sum + this.getInvestorAmount(inv), 0);
                
                // Calculate deviations for each asset (use total investment for planning)
                const planningTotal = currentTotal + totalNewInvestment;
                const assetDeviations = this.assets.map(asset => {
                    const targetValue = (asset.targetPercent / 100) * planningTotal;
                    const currentValue = this.getAssetCurrentValue(asset);
                    const deviation = targetValue - currentValue;
                    return {
                        ...asset,
                        targetValue,
                        deviation,
                        isUnderweight: deviation > 0
                    };
                });
                
                // Check group constraints
                const groupCurrentValues = {};
                this.assetGroups.forEach(group => {
                    const groupTargetPercent = group.assetNames.reduce((sum, assetName) => {
                        const asset = this.assets.find(a => a.name === assetName);
                        return sum + (asset ? asset.targetPercent : 0);
                    }, 0);
                    
                    const groupCurrent = group.assetNames.reduce((sum, assetName) => {
                        const asset = assetDeviations.find(a => a.name === assetName);
                        return sum + (asset ? asset.targetValue - asset.deviation : 0); // current value
                    }, 0);
                    const groupCurrentPercent = planningTotal > 0 ? (groupCurrent / planningTotal) * 100 : 0;
                    groupCurrentValues[group.name] = {
                        currentPercent: groupCurrentPercent,
                        targetPercent: groupTargetPercent,
                        isOverweight: groupCurrentPercent >= groupTargetPercent,
                        assetNames: group.assetNames
                    };
                });
                
                // Filter assets: exclude those in overweight groups
                const eligibleAssetDeviations = assetDeviations.filter(asset => {
                    if (!asset.isUnderweight) return false;
                    
                    // Check if asset belongs to any overweight group
                    for (const groupName in groupCurrentValues) {
                        const groupInfo = groupCurrentValues[groupName];
                        if (groupInfo.isOverweight && groupInfo.assetNames.includes(asset.name)) {
                            return false; // Asset is in overweight group, exclude it
                        }
                    }
                    return true;
                });
                
                // Calculate total positive deviation from eligible assets only
                const totalPositiveDeviation = eligibleAssetDeviations
                    .reduce((sum, a) => sum + a.deviation, 0);
                
                if (totalPositiveDeviation === 0) {
                    // No assets to allocate
                    this.results = {
                        investorAllocations: [],
                        summary: this.assets.map(asset => {
                            const currentValue = this.getAssetCurrentValue(asset);
                            const preActualPercent = currentTotal > 0 ? (currentValue / currentTotal) * 100 : 0;
                            const preTargetValue = Math.round((asset.targetPercent / 100) * currentTotal);
                            const preDrift = preActualPercent - asset.targetPercent;
                            return {
                                assetClass: asset.name,
                                targetPercent: asset.targetPercent,
                                preTargetValue,
                                targetValue: preTargetValue,
                                currentValue,
                                preActualPercent,
                                preDrift,
                                newAllocation: 0,
                                newAllocationPercent: 0,
                                postValue: currentValue,
                                postPercent: preActualPercent,
                                postDrift: preDrift
                            };
                        }),
                        totalCurrent: currentTotal,
                        totalNewAllocation: 0,
                        totalPost: currentTotal,
                        totalTarget: currentTotal,
                        totalTargetPercent: this.assets.reduce((sum, a) => sum + a.targetPercent, 0)
                    };
                    return;
                }
                
                // Check if any investor has TCS enabled for international investments
                const anyInvestorHasTcs = this.investors.some(inv => inv.tcs && inv.international);
                
                // Calculate allocation ratios based on deviation, accounting for TCS budget impact
                // For international assets with TCS, they will consume 1.2x budget, so scale their "need" accordingly
                const adjustedDeviations = eligibleAssetDeviations.map(asset => ({
                    ...asset,
                    budgetNeed: (anyInvestorHasTcs && asset.isInternational) 
                        ? asset.deviation * 1.2  // International with TCS needs 1.2x budget
                        : asset.deviation
                }));
                
                const totalBudgetNeed = adjustedDeviations.reduce((sum, a) => sum + a.budgetNeed, 0);
                const assetTargetAllocations = {}; // Target allocation for each asset
                
                adjustedDeviations.forEach(asset => {
                    // Allocate based on budget need ratio
                    const budgetShare = (asset.budgetNeed / totalBudgetNeed) * totalNewInvestment;
                    // For international with TCS, the actual investment is budget / 1.2
                    assetTargetAllocations[asset.name] = (anyInvestorHasTcs && asset.isInternational)
                        ? budgetShare / 1.2
                        : budgetShare;
                });
                
                // ============================================================
                // DETERMINISTIC ALLOCATION ENGINE
                // Asset-centric approach using constrained transportation problem
                // ============================================================
                
                const roundOff = this.getRoundOff();
                
                // STEP 1: Calculate exact asset allocations (with rounding adjustment)
                const assetAllocations = [];
                let totalRounded = 0;
                
                adjustedDeviations.forEach(asset => {
                    const targetAmount = (asset.budgetNeed / totalBudgetNeed) * totalNewInvestment;
                    // For international with TCS, the actual investment is budget / 1.2
                    const investmentAmount = (anyInvestorHasTcs && asset.isInternational)
                        ? targetAmount / 1.2
                        : targetAmount;
                    const roundedAmount = Math.round(investmentAmount / roundOff) * roundOff;
                    
                    if (roundedAmount > 0) {
                        assetAllocations.push({
                            name: asset.name,
                            amount: roundedAmount,
                            isSlabAsset: asset.hasSlabRate,
                            isInternational: asset.isInternational,
                            originalAsset: asset
                        });
                        totalRounded += roundedAmount;
                    }
                });
                
                // Adjust for rounding error: allocate remaining to asset with highest positive difference
                const roundingDiff = totalNewInvestment - totalRounded;
                if (Math.abs(roundingDiff) >= roundOff && assetAllocations.length > 0) {
                    // Find asset with highest unrounded remainder
                    let maxDiff = 0;
                    let maxIdx = 0;
                    adjustedDeviations.forEach((asset, idx) => {
                        const targetAmount = (asset.budgetNeed / totalBudgetNeed) * totalNewInvestment;
                        const investmentAmount = (anyInvestorHasTcs && asset.isInternational)
                            ? targetAmount / 1.2
                            : targetAmount;
                        const roundedAmount = Math.round(investmentAmount / roundOff) * roundOff;
                        const diff = investmentAmount - roundedAmount;
                        if (diff > maxDiff) {
                            maxDiff = diff;
                            maxIdx = idx;
                        }
                    });
                    const adjustmentAmount = Math.round(roundingDiff / roundOff) * roundOff;
                    const assetToAdjust = assetAllocations.find(a => a.name === adjustedDeviations[maxIdx].name);
                    if (assetToAdjust) {
                        assetToAdjust.amount += adjustmentAmount;
                    }
                }
                
                // STEP 2: Prepare investor metadata with priorities
                const investorData = this.investors.map((inv, index) => ({
                    investor: inv,
                    name: inv.name,
                    capacity: this.getInvestorAmount(inv),
                    remaining: this.getInvestorAmount(inv),
                    internationalEnabled: inv.international || false,
                    taxSlab: inv.taxSlab || 0,  // Lower slab preferred for slab assets
                    uiOrder: index,
                    hasTcs: inv.tcs && inv.international,
                    allocations: []
                })).filter(invData => invData.capacity > 0);
                
                // STEP 3: Sort assets and investors for deterministic allocation
                
                // Separate slab and non-slab assets
                const slabAssets = assetAllocations.filter(a => a.isSlabAsset);
                const nonSlabAssets = assetAllocations.filter(a => !a.isSlabAsset);
                
                // Sort investors by priority (for use during allocation)
                const sortInvestors = () => {
                    investorData.sort((a, b) => {
                        // Priority 1: Non-international investors first (constrained)
                        if (!a.internationalEnabled && b.internationalEnabled) return -1;
                        if (a.internationalEnabled && !b.internationalEnabled) return 1;
                        // Priority 2: Lower tax slab first (for slab assets)
                        if (a.taxSlab !== b.taxSlab) return a.taxSlab - b.taxSlab;
                        // Priority 3: Smaller remaining capacity first
                        if (a.remaining !== b.remaining) return a.remaining - b.remaining;
                        // Priority 4: UI order for deterministic tie-breaking
                        return a.uiOrder - b.uiOrder;
                    });
                };
                
                // Helper: Check if investor can invest in asset
                const canInvest = (invData, asset) => {
                    if (asset.isInternational && !invData.internationalEnabled) return false;
                    if (invData.remaining < roundOff) return false;
                    if (asset.amount <= 0) return false;
                    return true;
                };
                
                // Helper: Allocate to investor (handles TCS and rounding)
                const allocate = (invData, asset, amount) => {
                    const maxAmount = Math.min(amount, asset.amount);
                    let investment, tcs, total;
                    
                    if (invData.hasTcs && asset.isInternational) {
                        // TCS calculation: total outflow (investment + TCS) must be multiple of roundOff
                        // TCS = 20% of investment, so total = investment × 1.2
                        const maxInvestmentWithTcs = invData.remaining / 1.2;
                        const desiredInvestment = Math.min(maxAmount, maxInvestmentWithTcs);
                        
                        // Round total outflow to multiple of roundOff
                        const desiredTotal = desiredInvestment * 1.2;
                        total = Math.round(desiredTotal / roundOff) * roundOff;
                        
                        if (total <= 0) return;
                        
                        // Back-calculate investment (must be whole rupees)
                        investment = Math.round(total / 1.2);
                        tcs = total - investment;
                    } else {
                        investment = Math.min(maxAmount, invData.remaining);
                        investment = Math.round(investment / roundOff) * roundOff;
                        
                        if (investment <= 0) return;
                        
                        tcs = 0;
                        total = investment;
                    }
                    
                    // Apply allocation
                    invData.allocations.push({
                        asset: asset.name,
                        amount: investment,
                        tcs: tcs
                    });
                    invData.remaining -= total;
                    asset.amount -= investment;
                };
                
                // PHASE 1: Allocate slab assets (column-first greedy with priority)
                for (const asset of slabAssets) {
                    while (asset.amount >= roundOff) {
                        sortInvestors(); // Re-sort for priority
                        
                        let allocated = false;
                        for (const invData of investorData) {
                            if (!canInvest(invData, asset)) continue;
                            
                            allocate(invData, asset, asset.amount); // Try to allocate all remaining
                            allocated = true;
                            
                            if (asset.amount < roundOff) break; // Asset fully allocated
                        }
                        
                        if (!allocated) break; // No investor can take more
                    }
                }
                
                // PHASE 2: Allocate non-slab assets (transaction minimization + greedy)
                
                // Step 2a: For small investors, try to allocate entire budget to single asset
                sortInvestors();
                for (const invData of investorData) {
                    if (invData.remaining < roundOff) continue;
                    
                    // Try to find a single non-slab asset that can absorb this investor's entire budget
                    for (const asset of nonSlabAssets) {
                        if (!canInvest(invData, asset)) continue;
                        if (asset.amount < roundOff) continue;
                        
                        const requiredAssetAmount = invData.hasTcs && asset.isInternational
                            ? invData.remaining / 1.2
                            : invData.remaining;
                        
                        // If asset has enough need to absorb 80%+ of investor's budget, allocate it all here
                        if (asset.amount >= requiredAssetAmount * 0.8) {
                            allocate(invData, asset, invData.remaining);
                            break; // Move to next investor
                        }
                    }
                }
                
                // Step 2b: Allocate remaining asset needs using greedy distribution
                for (const asset of nonSlabAssets) {
                    while (asset.amount >= roundOff) {
                        sortInvestors();
                        
                        let allocated = false;
                        for (const invData of investorData) {
                            if (!canInvest(invData, asset)) continue;
                            
                            allocate(invData, asset, asset.amount);
                            allocated = true;
                            
                            if (asset.amount < roundOff) break;
                        }
                        
                        if (!allocated) break;
                    }
                }
                
                // STEP 4: Build results in original investor order
                const investorAllocations = [];
                const investorAllocationMap = {};
                const assetTotals = {};
                
                // Create asset order map for sorting
                const assetOrderMap = {};
                this.assets.forEach((asset, index) => {
                    assetOrderMap[asset.name] = index;
                });
                
                // Build allocation map and totals
                investorData.forEach(invData => {
                    if (invData.allocations.length === 0) return;
                    
                    // Sort allocations by original asset order
                    invData.allocations.sort((a, b) => {
                        return assetOrderMap[a.asset] - assetOrderMap[b.asset];
                    });
                    
                    const totalAllocated = invData.allocations.reduce((sum, a) => sum + a.amount, 0);
                    const totalTcs = invData.allocations.reduce((sum, a) => sum + a.tcs, 0);
                    
                    // Update asset totals
                    invData.allocations.forEach(alloc => {
                        assetTotals[alloc.asset] = (assetTotals[alloc.asset] || 0) + alloc.amount;
                    });
                    
                    investorAllocationMap[invData.name] = {
                        name: invData.name,
                        amount: invData.capacity,
                        allocations: invData.allocations,
                        total: totalAllocated,
                        tcs: totalTcs
                    };
                });
                
                // Reorder investorAllocations to match original investor order
                this.investors.forEach(investor => {
                    if (investorAllocationMap[investor.name]) {
                        investorAllocations.push(investorAllocationMap[investor.name]);
                    }
                });
                
                // Calculate totals
                const totalTargetPercent = this.assets.reduce((sum, a) => sum + a.targetPercent, 0);
                const totalNewAllocation = Object.values(assetTotals).reduce((sum, val) => sum + val, 0);
                const totalPost = currentTotal + totalNewAllocation;
                const totalTarget = totalPost; // Target equals actual portfolio value
                
                // Build summary table
                const summary = this.assets.map(asset => {
                    const currentValue = this.getAssetCurrentValue(asset);
                    const newAllocation = assetTotals[asset.name] || 0;
                    const postValue = currentValue + newAllocation;
                    
                    // Pre allocation (current portfolio)
                    const preActualPercent = currentTotal > 0 ? (currentValue / currentTotal) * 100 : 0;
                    const preTargetValue = Math.round((asset.targetPercent / 100) * currentTotal);
                    const preDrift = preActualPercent - asset.targetPercent;
                    
                    // Post allocation (new portfolio)
                    const postPercent = totalPost > 0 ? (postValue / totalPost) * 100 : 0;
                    const targetValue = Math.round((asset.targetPercent / 100) * totalPost);
                    const postDrift = postPercent - asset.targetPercent;
                    
                    // Allocation percentage
                    const newAllocationPercent = totalNewAllocation > 0 ? (newAllocation / totalNewAllocation) * 100 : 0;
                    
                    return {
                        assetClass: asset.name,
                        targetPercent: asset.targetPercent,
                        preTargetValue,
                        currentValue,
                        preActualPercent,
                        preDrift,
                        newAllocation,
                        newAllocationPercent,
                        targetValue,
                        postValue,
                        postPercent,
                        postDrift
                    };
                });
                
                // Calculate total absolute drifts
                const totalPreDriftPercent = summary.reduce((sum, row) => sum + Math.abs(row.preDrift), 0);
                const totalPostDriftPercent = summary.reduce((sum, row) => sum + Math.abs(row.postDrift), 0);
                const totalPreDriftRupee = summary.reduce((sum, row) => sum + Math.abs(row.currentValue - row.preTargetValue), 0);
                const totalPostDriftRupee = summary.reduce((sum, row) => sum + Math.abs(row.postValue - row.targetValue), 0);
                
                this.results = {
                    investorAllocations,
                    summary,
                    totalCurrent: currentTotal,
                    totalNewAllocation,
                    totalPost,
                    totalTarget,
                    totalTargetPercent,
                    totalPreDriftPercent,
                    totalPostDriftPercent,
                    totalPreDriftRupee,
                    totalPostDriftRupee
                };
                
                // Update chart
                this.$nextTick(() => {
                    this.updateChart();
                });
            },
            updateChart() {
                // Check if results exist
                if (!this.results || !this.results.summary || this.results.summary.length === 0) {
                    return;
                }
                
                // Portfolio Chart
                const chartDom = document.getElementById('allocation-chart');
                if (!chartDom) return;
                
                if (!this.chart) {
                    this.chart = echarts.init(chartDom);
                    
                    // Setup resize handler once
                    if (!this.resizeHandler) {
                        this.resizeHandler = () => this.chart?.resize();
                        window.addEventListener('resize', this.resizeHandler);
                    }
                    
                    // Explicitly resize after initialization to ensure correct dimensions
                    this.$nextTick(() => {
                        this.chart?.resize();
                    });
                }
                
                const isPercentage = this.portfolioViewMode === 'percentage';
                
                const portfolioOption = {
                    tooltip: {
                        trigger: 'item',
                        formatter: (params) => {
                            const value = params.value;
                            const formattedValue = isPercentage 
                                ? parseFloat(value).toFixed(2) + '%' 
                                : '₹' + Math.round(parseFloat(value)).toLocaleString('en-IN');
                            return params.marker + ' <strong>' + params.seriesName + '</strong><br/>' +
                                   params.name + ': <strong>' + formattedValue + '</strong>';
                        }
                    },
                    legend: {
                        data: isPercentage ? ['Pre Allocation', 'Post Allocation', 'Target'] : ['Pre Allocation', 'Post Allocation'],
                        bottom: 0
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '15%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: this.results.summary.map(s => s.assetClass),
                        axisLabel: {
                            interval: 0,
                            rotate: 45,
                            fontSize: 11
                        }
                    },
                    yAxis: {
                        type: 'value',
                        name: isPercentage ? 'Percentage (%)' : 'Amount (₹)',
                        axisLabel: {
                            formatter: isPercentage ? '{value}%' : (value) => {
                                if (value >= 10000000) return (value / 10000000).toFixed(1) + 'Cr';
                                if (value >= 100000) return (value / 100000).toFixed(1) + 'L';
                                if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
                                return value;
                            }
                        }
                    },
                    series: isPercentage ? [
                        {
                            name: 'Pre Allocation',
                            type: 'bar',
                            data: this.results.summary.map(s => s.preActualPercent.toFixed(2)),
                            itemStyle: { color: '#3b82f6' }
                        },
                        {
                            name: 'Post Allocation',
                            type: 'bar',
                            data: this.results.summary.map(s => s.postPercent.toFixed(2)),
                            itemStyle: { color: '#10b981' }
                        },
                        {
                            name: 'Target',
                            type: 'bar',
                            data: this.results.summary.map(s => s.targetPercent.toFixed(2)),
                            itemStyle: { color: '#fbbf24' }
                        }
                    ] : [
                        {
                            name: 'Pre Allocation',
                            type: 'bar',
                            data: this.results.summary.map(s => s.currentValue),
                            itemStyle: { color: '#3b82f6' }
                        },
                        {
                            name: 'Post Allocation',
                            type: 'bar',
                            data: this.results.summary.map(s => s.postValue),
                            itemStyle: { color: '#10b981' }
                        }
                    ]
                };
                
                this.chart.setOption(portfolioOption, true);
                
                // Drift Chart
                const driftChartDom = document.getElementById('drift-chart');
                if (!driftChartDom) return;
                
                if (!this.driftChart) {
                    this.driftChart = echarts.init(driftChartDom);
                    
                    // Setup resize handler once
                    if (!this.driftResizeHandler) {
                        this.driftResizeHandler = () => this.driftChart?.resize();
                        window.addEventListener('resize', this.driftResizeHandler);
                    }
                    
                    // Explicitly resize after initialization to ensure correct dimensions
                    this.$nextTick(() => {
                        this.driftChart?.resize();
                    });
                }
                
                const driftOption = {
                    tooltip: {
                        trigger: 'item',
                        formatter: (params) => {
                            const value = params.value;
                            const formattedValue = isPercentage 
                                ? (value >= 0 ? '+' : '') + parseFloat(value).toFixed(2) + '%' 
                                : (value >= 0 ? '+' : '-') + '₹' + Math.abs(Math.round(parseFloat(value))).toLocaleString('en-IN');
                            return params.marker + ' <strong>' + params.seriesName + '</strong><br/>' +
                                   params.name + ': <strong>' + formattedValue + '</strong>';
                        }
                    },
                    legend: {
                        data: ['Pre Allocation Drift', 'Post Allocation Drift'],
                        bottom: 0
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '15%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        name: isPercentage ? 'Drift (%)' : 'Drift (₹)',
                        axisLabel: {
                            formatter: isPercentage ? '{value}%' : (value) => {
                                const absValue = Math.abs(value);
                                if (absValue >= 10000000) return (value >= 0 ? '+' : '-') + (absValue / 10000000).toFixed(1) + 'Cr';
                                if (absValue >= 100000) return (value >= 0 ? '+' : '-') + (absValue / 100000).toFixed(1) + 'L';
                                if (absValue >= 1000) return (value >= 0 ? '+' : '-') + (absValue / 1000).toFixed(1) + 'K';
                                return value;
                            }
                        },
                        splitLine: {
                            lineStyle: { type: 'dashed' }
                        }
                    },
                    yAxis: {
                        type: 'category',
                        data: this.results.summary.map(s => s.assetClass).reverse()
                    },
                    series: isPercentage ? [
                        {
                            name: 'Pre Allocation Drift',
                            type: 'bar',
                            data: this.results.summary.map(s => s.preDrift.toFixed(2)).reverse(),
                            itemStyle: { color: '#3b82f6' }
                        },
                        {
                            name: 'Post Allocation Drift',
                            type: 'bar',
                            data: this.results.summary.map(s => s.postDrift.toFixed(2)).reverse(),
                            itemStyle: { color: '#10b981' }
                        }
                    ] : [
                        {
                            name: 'Pre Allocation Drift',
                            type: 'bar',
                            data: this.results.summary.map(s => s.currentValue - s.preTargetValue).reverse(),
                            itemStyle: { color: '#3b82f6' }
                        },
                        {
                            name: 'Post Allocation Drift',
                            type: 'bar',
                            data: this.results.summary.map(s => s.postValue - s.targetValue).reverse(),
                            itemStyle: { color: '#10b981' }
                        }
                    ]
                };
                
                this.driftChart.setOption(driftOption, true);
            },
            formatNumber(value) {
                if (value === 0) return '0';
                if (!value) return '-';
                return value.toLocaleString('en-IN');
            },
            getDiffClass(diff) {
                if (diff < 0) return 'diff-positive'; // Green for negative drift (underweight, good to buy)
                return 'diff-negative'; // Red for positive drift (overweight, should not buy)
            },
            formatDrift(drift) {
                const sign = drift >= 0 ? '+' : '';
                return `${sign}${drift.toFixed(2)}%`;
            },
            exportData() {
                const data = {
                    investors: this.investors,
                    roundOffValue: this.roundOffValue,
                    roundOffUnit: this.roundOffUnit,
                    assets: this.assets,
                    assetGroups: this.assetGroups,
                    exportDate: new Date().toISOString()
                };
                
                const json = JSON.stringify(data, null, 2);
                const blob = new Blob([json], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `multi-asset-allocator-${new Date().toISOString().split('T')[0]}.json`;
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
                        
                        // Validate and import data
                        if (data.investors && Array.isArray(data.investors)) {
                            this.investors = data.investors;
                        }
                        if (data.roundOffValue !== undefined) {
                            this.roundOffValue = data.roundOffValue;
                        }
                        if (data.roundOffUnit) {
                            this.roundOffUnit = data.roundOffUnit;
                        }
                        if (data.assets && Array.isArray(data.assets)) {
                            this.assets = data.assets;
                        }
                        if (data.assetGroups && Array.isArray(data.assetGroups)) {
                            this.assetGroups = data.assetGroups;
                        }
                        
                        // Recalculate
                        this.calculate();
                        
                        // Reset file input
                        event.target.value = '';
                    } catch (error) {
                        alert('Error importing file: Invalid JSON format');
                        console.error('Import error:', error);
                    }
                };
                reader.readAsText(file);
            },
            resetData() {
                if (confirm('Are you sure you want to reset all data?')) {
                    this.investors = [
                        { name: 'Investor 1', amount: 50000, international: false, tcs: false }
                    ];
                    this.roundOff = 5000;
                    this.assets = [
                        { name: 'Nifty 50', targetPercent: 40, currentValue: 500000, isInternational: false },
                        { name: 'Nasdaq 100', targetPercent: 40, currentValue: 500000, isInternational: true },
                        { name: 'Gold', targetPercent: 20, currentValue: 250000, isInternational: false }
                    ];
                    this.calculate();
                }
            }
        }
    });

    app.mount('#multi-asset-app');
};

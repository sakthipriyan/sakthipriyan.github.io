// Multi Asset Allocator (Vue.js + ECharts)
window.initializeTool = window.initializeTool || {};

window.initializeTool.multiAssetAllocator = function (container, config) {
    // Create Vue app template
    container.innerHTML = `
        <div id="multi-asset-app">
            <div class="multi-asset-allocator">
                <div class="sip-container">
                    <!-- Left Column: Input Fields -->
                    <div class="sip-inputs">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                            <h3 style="margin: 0;">📋 Portfolio Configuration</h3>
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
                                                step="0.1"
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
                            
                            <!-- Round Off within Investors Block -->
                            <div class="input-group" style="margin-top: 1.5rem;">
                                <label>
                                    Round Off Amount (K):&nbsp;<strong>₹ {{ formatRoundOff() }}</strong>
                                    <span class="help-icon" data-tooltip="All allocations will be rounded to this value">ℹ️</span>
                                </label>
                                <input 
                                    type="number" 
                                    v-model.number="roundOffValue" 
                                    min="0.1"
                                    step="0.1"
                                    @input="calculate"
                                    style="width: 100%;"
                                >
                            </div>
                        </div>

                        <!-- Asset Classes & Groups Section -->
                        <div class="assets-group">
                            <!-- Asset Classes -->
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
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
                                        <th>LTCG</th>
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
                                                v-model="asset.hasLtcg"
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
                        <h3 style="margin-top: 0;">📋 Allocation Results</h3>
                        
                        
                        <!-- Validation Messages -->
                        <div v-if="validationErrors.length > 0" class="validation-errors">
                            <div v-for="error in validationErrors" class="error-message">
                                ⚠️ {{ error }}
                            </div>
                        </div>

                        <!-- Individual Allocations -->
                        <div v-if="results.investorAllocations.length > 0">
                            <div v-for="allocation in results.investorAllocations" :key="allocation.name" style="margin-bottom: 1.5rem;">
                                <h4 style="margin-top: 0; margin-bottom: 0.5rem;">
                                    {{ allocation.name }} (₹{{ formatNumber(allocation.amount) }})
                                </h4>
                                <table class="allocation-table">
                                    <thead>
                                        <tr>
                                            <th>Asset Class</th>
                                            <th>Allocation</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <template v-for="item in allocation.allocations" :key="item.asset">
                                            <tr>
                                                <td>{{ item.asset }}</td>
                                                <td>₹{{ formatNumber(item.amount) }}</td>
                                            </tr>
                                            <tr v-if="item.tcs > 0" style="opacity: 0.6;">
                                                <td style="padding-left: 1.5rem;">{{ item.asset }} (TCS)</td>
                                                <td>₹{{ formatNumber(item.tcs) }}</td>
                                            </tr>
                                        </template>
                                        <tr class="total-row">
                                            <td><strong>Total</strong></td>
                                            <td><strong>₹{{ formatNumber(allocation.total + allocation.tcs) }}</strong></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Summary Report - Full Width Below -->
                <div class="investment-plan" v-if="results.summary.length > 0">
                    
                    <!-- Portfolio Summary with toggles -->
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <div style="display: flex; gap: 1rem; align-items: center;">
                            <h2 style="margin: 0;">📊 Portfolio Summary Report</h2>
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
                                    <th>Asset Class</th>
                                    <th>Target</th>
                                    <th>Current</th>
                                    <th>Drift</th>
                                    <th>Allocation</th>
                                    <th>Post Allocation</th>
                                    <th>New Drift</th>
                                </tr>
                                <tr v-else>
                                    <th>Asset Class</th>
                                    <th>Target</th>
                                    <th>Current</th>
                                    <th>Drift</th>
                                    <th>Allocation</th>
                                    <th>Post Allocation</th>
                                    <th>New Drift</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="row in results.summary" :key="row.assetClass">
                                    <td><strong>{{ row.assetClass }}</strong></td>
                                    <template v-if="portfolioViewMode === 'percentage'">
                                        <td>{{ row.targetPercent.toFixed(2) }}%</td>
                                        <td>{{ row.currentPercent.toFixed(2) }}%</td>
                                        <td :class="getDiffClass(row.currentDrift)">
                                            {{ formatDrift(row.currentDrift) }}
                                        </td>
                                        <td>{{ row.newAllocationPercent.toFixed(2) }}%</td>
                                        <td>{{ row.postPercent.toFixed(2) }}%</td>
                                        <td :class="getDiffClass(row.postDrift)">
                                            {{ formatDrift(row.postDrift) }}
                                        </td>
                                    </template>
                                    <template v-else>
                                        <td>₹{{ formatNumber(row.targetValue) }}</td>
                                        <td>₹{{ formatNumber(row.currentValue) }}</td>
                                        <td :class="getDiffClass(row.currentDrift)">
                                            {{ row.currentDrift >= 0 ? '+' : '-' }}₹{{ formatNumber(Math.abs(row.currentValue - row.targetValue)) }}
                                        </td>
                                        <td>₹{{ formatNumber(row.newAllocation) }}</td>
                                        <td>₹{{ formatNumber(row.postValue) }}</td>
                                        <td :class="getDiffClass(row.postDrift)">
                                            {{ row.postDrift >= 0 ? '+' : '-' }}₹{{ formatNumber(Math.abs(row.postValue - row.targetValue)) }}
                                        </td>
                                    </template>
                                </tr>
                                <tr class="total-row">
                                    <td><strong>Total</strong></td>
                                    <template v-if="portfolioViewMode === 'percentage'">
                                        <td>{{ results.totalTargetPercent.toFixed(2) }}%</td>
                                        <td>100.00%</td>
                                        <td>-</td>
                                        <td>100.00%</td>
                                        <td>100.00%</td>
                                        <td>-</td>
                                    </template>
                                    <template v-else>
                                        <td>₹{{ formatNumber(results.totalTarget) }}</td>
                                        <td>₹{{ formatNumber(results.totalCurrent) }}</td>
                                        <td>-</td>
                                        <td>₹{{ formatNumber(results.totalNewAllocation) }}</td>
                                        <td>₹{{ formatNumber(results.totalPost) }}</td>
                                        <td>-</td>
                                    </template>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- Chart View -->
                    <div v-show="portfolioViewTab === 'chart'" style="margin-bottom: 2rem;">
                        <div id="allocation-chart" class="chart-container"></div>
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
                    { name: 'Nifty 50', targetPercent: 40, currentValue: 500000, hasLtcg: true, isInternational: false },
                    { name: 'Nasdaq 100', targetPercent: 40, currentValue: 500000, hasLtcg: true, isInternational: true },
                    { name: 'Gold', targetPercent: 20, currentValue: 250000, hasLtcg: false, isInternational: false }
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
                portfolioViewMode: 'percentage',
                portfolioViewTab: 'chart',
                draggedIndex: null,
                draggedType: null
            };
        },
        mounted() {
            this.calculate();
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
            },
            addAsset() {
                this.assets.push({
                    name: `Asset ${this.assets.length + 1}`,
                    targetPercent: 0,
                    currentValue: 0,
                    hasLtcg: false,
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
                return this.assets.filter(asset => !group.assetNames.includes(asset.name));
            },
            getGroupMaxPercent(group) {
                return group.assetNames.reduce((sum, assetName) => {
                    const asset = this.assets.find(a => a.name === assetName);
                    return sum + (asset ? asset.targetPercent : 0);
                }, 0).toFixed(2);
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
                
                // Calculate total new investment
                const totalNewInvestment = this.investors.reduce((sum, inv) => sum + this.getInvestorAmount(inv), 0);
                
                // Calculate new total portfolio value
                const newTotal = currentTotal + totalNewInvestment;
                
                // Calculate deviations for each asset
                const assetDeviations = this.assets.map(asset => {
                    const targetValue = (asset.targetPercent / 100) * newTotal;
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
                    const groupCurrentPercent = newTotal > 0 ? (groupCurrent / newTotal) * 100 : 0;
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
                        summary: this.assets.map(asset => ({
                            assetClass: asset.name,
                            targetPercent: asset.targetPercent,
                            targetValue: Math.round((asset.targetPercent / 100) * newTotal),
                            currentValue: this.getAssetCurrentValue(asset),
                            currentPercent: currentTotal > 0 ? (this.getAssetCurrentValue(asset) / currentTotal) * 100 : 0,
                            currentDrift: currentTotal > 0 ? ((this.getAssetCurrentValue(asset) / currentTotal) * 100) - asset.targetPercent : 0,
                            newAllocation: 0,
                            newAllocationPercent: 0,
                            postValue: this.getAssetCurrentValue(asset),
                            postPercent: newTotal > 0 ? (this.getAssetCurrentValue(asset) / newTotal) * 100 : 0,
                            postDrift: newTotal > 0 ? ((this.getAssetCurrentValue(asset) / newTotal) * 100) - asset.targetPercent : 0,
                            diffPercent: 0
                        })),
                        totalCurrent: currentTotal,
                        totalNewAllocation: 0,
                        totalPost: currentTotal,
                        totalTarget: Math.round(newTotal),
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
                
                // Sort investors by contribution (lower first for tax optimization)
                const sortedInvestors = [...this.investors].sort((a, b) => {
                    return this.getInvestorAmount(a) - this.getInvestorAmount(b);
                });
                
                // Separate assets by LTCG status
                const nonLtcgAssets = eligibleAssetDeviations.filter(a => !a.hasLtcg);
                const ltcgAssets = eligibleAssetDeviations.filter(a => a.hasLtcg);
                
                // Track remaining allocation needed per asset
                const remainingAllocation = {};
                Object.keys(assetTargetAllocations).forEach(assetName => {
                    remainingAllocation[assetName] = assetTargetAllocations[assetName];
                });
                
                // Allocate for each investor
                const investorAllocations = [];
                const assetTotals = {};
                const roundOff = this.getRoundOff();
                
                sortedInvestors.forEach((investor, investorIndex) => {
                    let investorAmount = this.getInvestorAmount(investor);
                    if (investorAmount === 0) return;
                    
                    const allocations = [];
                    let totalAllocated = 0;
                    let totalTcs = 0;
                    let remainingInvestorAmount = investorAmount;
                    
                    // Helper function to calculate allocation amount considering TCS for international assets
                    const calculateAllocation = (asset, desiredAmount) => {
                        if (investor.tcs && asset.isInternational) {
                            const maxInvestment = remainingInvestorAmount / 1.2;
                            const actualInvestment = Math.min(desiredAmount, maxInvestment);
                            const tcsAmount = Math.round(actualInvestment * 0.2);
                            return { investment: actualInvestment, tcs: tcsAmount, total: actualInvestment + tcsAmount };
                        } else {
                            return { investment: Math.min(desiredAmount, remainingInvestorAmount), tcs: 0, total: Math.min(desiredAmount, remainingInvestorAmount) };
                        }
                    };
                    
                    // Helper function to round allocation considering TCS (ensures total outflow is multiple of roundOff)
                    const roundAllocation = (asset, amount) => {
                        if (investor.tcs && asset.isInternational) {
                            // For TCS: investment + TCS = investment × 1.2 must be multiple of roundOff
                            // And investment must be whole rupees
                            // So find nearest investment where (investment × 1.2) is multiple of roundOff
                            const desiredTotal = amount * 1.2;
                            const roundedTotal = Math.round(desiredTotal / roundOff) * roundOff;
                            // Investment must be whole rupees, so round it
                            const investment = Math.round(roundedTotal / 1.2);
                            return investment;
                        } else {
                            // For non-TCS, just round the investment
                            return Math.round(amount / roundOff) * roundOff;
                        }
                    };
                    
                    // For the lowest contributor, try to allocate single largest asset to minimize transactions
                    if (investorIndex === 0) {
                        // Get all eligible assets for this investor (non-LTCG first for tax optimization)
                        const eligibleAssets = [...nonLtcgAssets, ...ltcgAssets].filter(asset => {
                            if (asset.isInternational && !investor.international) return false;
                            return remainingAllocation[asset.name] > roundOff;
                        });
                        
                        // Sort by allocation need (descending)
                        eligibleAssets.sort((a, b) => remainingAllocation[b.name] - remainingAllocation[a.name]);
                        
                        // Try to find a single asset that can absorb most/all of investor's budget
                        for (const asset of eligibleAssets) {
                            const assetNeed = remainingAllocation[asset.name];
                            const allocationCalc = calculateAllocation(asset, assetNeed);
                            
                            // If this asset can absorb at least 80% of investor's budget, allocate it fully to this investor
                            if (allocationCalc.total >= investorAmount * 0.8) {
                                const maxPossible = calculateAllocation(asset, assetNeed);
                                const roundedInvestment = roundAllocation(asset, Math.floor(maxPossible.investment / roundOff) * roundOff);
                                
                                if (roundedInvestment > 0) {
                                    const finalCalc = calculateAllocation(asset, roundedInvestment);
                                    allocations.push({ 
                                        asset: asset.name, 
                                        amount: roundedInvestment,
                                        tcs: finalCalc.tcs
                                    });
                                    totalAllocated += roundedInvestment;
                                    totalTcs += finalCalc.tcs;
                                    remainingInvestorAmount -= finalCalc.total;
                                    assetTotals[asset.name] = (assetTotals[asset.name] || 0) + roundedInvestment;
                                    remainingAllocation[asset.name] -= roundedInvestment;
                                    break; // Single transaction achieved
                                }
                            }
                        }
                        
                        // If we still have remaining amount and no allocation was made, fall back to proportional
                        if (allocations.length === 0 && remainingInvestorAmount >= roundOff) {
                            const eligibleNonLtcg = nonLtcgAssets.filter(asset => {
                                if (asset.isInternational && !investor.international) return false;
                                return remainingAllocation[asset.name] > roundOff;
                            });
                            
                            eligibleNonLtcg.sort((a, b) => remainingAllocation[b.name] - remainingAllocation[a.name]);
                            
                            for (const asset of eligibleNonLtcg) {
                                if (remainingInvestorAmount < roundOff) break;
                                
                                const assetNeed = remainingAllocation[asset.name];
                                const totalNeed = eligibleNonLtcg.reduce((sum, a) => sum + remainingAllocation[a.name], 0);
                                const proportion = assetNeed / totalNeed;
                                const maxForThis = investor.tcs && asset.isInternational 
                                    ? (remainingInvestorAmount / 1.2) * proportion
                                    : remainingInvestorAmount * proportion;
                                const roundedInvestment = roundAllocation(asset, Math.floor(maxForThis / roundOff) * roundOff);
                                
                                if (roundedInvestment > 0) {
                                    const finalCalc = calculateAllocation(asset, roundedInvestment);
                                    allocations.push({ 
                                        asset: asset.name, 
                                        amount: roundedInvestment,
                                        tcs: finalCalc.tcs
                                    });
                                    totalAllocated += roundedInvestment;
                                    totalTcs += finalCalc.tcs;
                                    remainingInvestorAmount -= finalCalc.total;
                                    assetTotals[asset.name] = (assetTotals[asset.name] || 0) + roundedInvestment;
                                    remainingAllocation[asset.name] -= roundedInvestment;
                                }
                            }
                        }
                    } else {
                        // For higher contributors, use normal proportional allocation
                        
                        // Phase 1: Allocate non-LTCG assets
                        const eligibleNonLtcg = nonLtcgAssets.filter(asset => {
                            if (asset.isInternational && !investor.international) return false;
                            return remainingAllocation[asset.name] > roundOff;
                        });
                        
                        eligibleNonLtcg.sort((a, b) => remainingAllocation[b.name] - remainingAllocation[a.name]);
                        
                        for (const asset of eligibleNonLtcg) {
                            if (remainingInvestorAmount < roundOff) break;
                            
                            const assetNeed = remainingAllocation[asset.name];
                            const allocationCalc = calculateAllocation(asset, assetNeed);
                            const roundedInvestment = roundAllocation(asset, allocationCalc.investment);
                            
                            if (roundedInvestment > 0 && calculateAllocation(asset, roundedInvestment).total <= remainingInvestorAmount + roundOff) {
                                const finalCalc = calculateAllocation(asset, roundedInvestment);
                                allocations.push({ 
                                    asset: asset.name, 
                                    amount: roundedInvestment,
                                    tcs: finalCalc.tcs
                                });
                                totalAllocated += roundedInvestment;
                                totalTcs += finalCalc.tcs;
                                remainingInvestorAmount -= finalCalc.total;
                                assetTotals[asset.name] = (assetTotals[asset.name] || 0) + roundedInvestment;
                                remainingAllocation[asset.name] -= roundedInvestment;
                            } else if (remainingInvestorAmount >= roundOff) {
                                const totalNonLtcgNeed = eligibleNonLtcg.reduce((sum, a) => sum + remainingAllocation[a.name], 0);
                                const proportion = remainingAllocation[asset.name] / totalNonLtcgNeed;
                                const maxForThis = investor.tcs && asset.isInternational 
                                    ? (remainingInvestorAmount / 1.2) * proportion
                                    : remainingInvestorAmount * proportion;
                                const roundedInvestment = roundAllocation(asset, Math.floor(maxForThis / roundOff) * roundOff);
                                
                                if (roundedInvestment > 0) {
                                    const finalCalc = calculateAllocation(asset, roundedInvestment);
                                    allocations.push({ 
                                        asset: asset.name, 
                                        amount: roundedInvestment,
                                        tcs: finalCalc.tcs
                                    });
                                    totalAllocated += roundedInvestment;
                                    totalTcs += finalCalc.tcs;
                                    remainingInvestorAmount -= finalCalc.total;
                                    assetTotals[asset.name] = (assetTotals[asset.name] || 0) + roundedInvestment;
                                    remainingAllocation[asset.name] -= roundedInvestment;
                                }
                            }
                        }
                        
                        // Phase 2: Allocate LTCG assets
                        const eligibleLtcg = ltcgAssets.filter(asset => {
                            if (asset.isInternational && !investor.international) return false;
                            return remainingAllocation[asset.name] > roundOff;
                        });
                        
                        eligibleLtcg.sort((a, b) => remainingAllocation[b.name] - remainingAllocation[a.name]);
                        
                        for (const asset of eligibleLtcg) {
                            if (remainingInvestorAmount < roundOff) break;
                            
                            const assetNeed = remainingAllocation[asset.name];
                            const allocationCalc = calculateAllocation(asset, assetNeed);
                            const roundedInvestment = roundAllocation(asset, allocationCalc.investment);
                            
                            if (roundedInvestment > 0 && calculateAllocation(asset, roundedInvestment).total <= remainingInvestorAmount + roundOff) {
                                const finalCalc = calculateAllocation(asset, roundedInvestment);
                                allocations.push({ 
                                    asset: asset.name, 
                                    amount: roundedInvestment,
                                    tcs: finalCalc.tcs
                                });
                                totalAllocated += roundedInvestment;
                                totalTcs += finalCalc.tcs;
                                remainingInvestorAmount -= finalCalc.total;
                                assetTotals[asset.name] = (assetTotals[asset.name] || 0) + roundedInvestment;
                                remainingAllocation[asset.name] -= roundedInvestment;
                            } else if (remainingInvestorAmount >= roundOff) {
                                const totalLtcgNeed = eligibleLtcg.reduce((sum, a) => sum + remainingAllocation[a.name], 0);
                                const proportion = remainingAllocation[asset.name] / totalLtcgNeed;
                                const maxForThis = investor.tcs && asset.isInternational 
                                    ? (remainingInvestorAmount / 1.2) * proportion
                                    : remainingInvestorAmount * proportion;
                                const roundedInvestment = roundAllocation(asset, Math.floor(maxForThis / roundOff) * roundOff);
                                
                                if (roundedInvestment > 0) {
                                    const finalCalc = calculateAllocation(asset, roundedInvestment);
                                    allocations.push({ 
                                        asset: asset.name, 
                                        amount: roundedInvestment,
                                        tcs: finalCalc.tcs
                                    });
                                    totalAllocated += roundedInvestment;
                                    totalTcs += finalCalc.tcs;
                                    remainingInvestorAmount -= finalCalc.total;
                                    assetTotals[asset.name] = (assetTotals[asset.name] || 0) + roundedInvestment;
                                    remainingAllocation[asset.name] -= roundedInvestment;
                                }
                            }
                        }
                    }
                    
                    // Top up: If there's remaining budget after rounding, add it to the largest allocation
                    if (remainingInvestorAmount >= roundOff && allocations.length > 0) {
                        // Find the largest allocation that's not international with TCS issues
                        const sortedAllocs = [...allocations].sort((a, b) => b.amount - a.amount);
                        
                        for (const alloc of sortedAllocs) {
                            const asset = this.assets.find(a => a.name === alloc.asset);
                            if (!asset) continue;
                            
                            // Check if we can add more to this asset
                            const rawTopUp = Math.floor(remainingInvestorAmount / roundOff) * roundOff;
                            const topUpAmount = roundAllocation(asset, rawTopUp);
                            if (topUpAmount > 0) {
                                const testCalc = calculateAllocation(asset, topUpAmount);
                                
                                if (testCalc.total <= remainingInvestorAmount) {
                                    alloc.amount += topUpAmount;
                                    alloc.tcs += testCalc.tcs;
                                    totalAllocated += topUpAmount;
                                    totalTcs += testCalc.tcs;
                                    remainingInvestorAmount -= testCalc.total;
                                    assetTotals[asset.name] = (assetTotals[asset.name] || 0) + topUpAmount;
                                    remainingAllocation[asset.name] -= topUpAmount;
                                    break;
                                }
                            }
                        }
                    }
                    
                    investorAllocations.push({
                        name: investor.name,
                        amount: investorAmount,
                        allocations,
                        total: totalAllocated,
                        tcs: totalTcs
                    });
                });
                
                // Calculate totals first
                const totalTargetPercent = this.assets.reduce((sum, a) => sum + a.targetPercent, 0);
                const totalNewAllocation = Object.values(assetTotals).reduce((sum, val) => sum + val, 0);
                const totalPost = currentTotal + totalNewAllocation;
                const totalTarget = Math.round((totalTargetPercent / 100) * (currentTotal + totalNewAllocation));
                
                // Build summary table
                const summary = this.assets.map(asset => {
                    const currentValue = this.getAssetCurrentValue(asset);
                    const currentPercent = currentTotal > 0 ? (currentValue / currentTotal) * 100 : 0;
                    const newAllocation = assetTotals[asset.name] || 0;
                    const postValue = currentValue + newAllocation;
                    const postPercent = newTotal > 0 ? (postValue / newTotal) * 100 : 0;
                    const diffPercent = postPercent - asset.targetPercent;
                    const targetValue = Math.round((asset.targetPercent / 100) * newTotal);
                    const newAllocationPercent = totalNewAllocation > 0 ? (newAllocation / totalNewAllocation) * 100 : 0;
                    const currentDrift = currentPercent - asset.targetPercent;
                    const postDrift = postPercent - asset.targetPercent;
                    
                    return {
                        assetClass: asset.name,
                        targetPercent: asset.targetPercent,
                        targetValue,
                        currentValue,
                        currentPercent,
                        currentDrift,
                        newAllocation,
                        newAllocationPercent,
                        postValue,
                        postPercent,
                        postDrift,
                        diffPercent
                    };
                });
                
                this.results = {
                    investorAllocations,
                    summary,
                    totalCurrent: currentTotal,
                    totalNewAllocation,
                    totalPost,
                    totalTarget,
                    totalTargetPercent
                };
                
                // Update chart
                this.$nextTick(() => {
                    this.updateChart();
                });
            },
            updateChart() {
                const chartDom = document.getElementById('allocation-chart');
                if (!chartDom) return;
                
                if (!this.chart) {
                    this.chart = echarts.init(chartDom);
                }
                
                const isPercentage = this.portfolioViewMode === 'percentage';
                
                const option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: (params) => {
                            const value = params.value;
                            const formattedValue = isPercentage 
                                ? parseFloat(value).toFixed(2) + '%' 
                                : '₹' + Math.round(parseFloat(value)).toLocaleString('en-IN');
                            return params.marker + ' ' + params.seriesName + '<br/>' + 
                                   params.name + ': <strong>' + formattedValue + '</strong>';
                        }
                    },
                    legend: {
                        data: ['Target', 'Current', 'Post Allocation']
                    },
                    xAxis: {
                        type: 'category',
                        data: this.results.summary.map(s => s.assetClass)
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
                            name: 'Target',
                            type: 'bar',
                            data: this.results.summary.map(s => s.targetPercent.toFixed(2)),
                            itemStyle: { color: '#3b82f6' }
                        },
                        {
                            name: 'Current',
                            type: 'bar',
                            data: this.results.summary.map(s => s.currentPercent.toFixed(2)),
                            itemStyle: { color: '#10b981' }
                        },
                        {
                            name: 'Post Allocation',
                            type: 'bar',
                            data: this.results.summary.map(s => s.postPercent.toFixed(2)),
                            itemStyle: { color: '#fbbf24' }
                        }
                    ] : [
                        {
                            name: 'Target',
                            type: 'bar',
                            data: this.results.summary.map(s => s.targetValue),
                            itemStyle: { color: '#3b82f6' }
                        },
                        {
                            name: 'Current',
                            type: 'bar',
                            data: this.results.summary.map(s => s.currentValue),
                            itemStyle: { color: '#10b981' }
                        },
                        {
                            name: 'Post Allocation',
                            type: 'bar',
                            data: this.results.summary.map(s => s.postValue),
                            itemStyle: { color: '#fbbf24' }
                        }
                    ]
                };
                
                this.chart.setOption(option);
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

// Multi Asset Allocator (Vue.js + ECharts)
// Blends 7 asset classes with optional monthly rebalancing. Historical backtest using monthly TRI series.
// Assets: Nasdaq 100 (TRI, USD→INR), Nifty 50 TRI, Nifty Next 50 TRI, Midcap 150 TRI, Smallcap 250 TRI, Gold, Debt.

window.initializeTool = window.initializeTool || {};

(function() {
  const CURRENCY_MULTIPLIERS = {
    crores: 10000000,
    lakhs: 100000,
    thousands: 1000
  };
  const DEBOUNCE_DELAY_MS = 300;
  const DEFAULT_START_MONTHLY_INVESTMENT_VALUE = 10;
  const DEFAULT_START_MONTHLY_INVESTMENT_UNIT = 'thousands';
  const DEFAULT_YEARLY_HIKE = 10; // percent
  const DEFAULT_INFLATION = 6; // percent annual
  const SUPPORTED_ASSETS = [
    { key: 'NASDAQ100_TRI_USD', label: 'Nasdaq 100', currency: 'INR' },
    { key: 'NIFTY50_TRI_INR', label: 'Nifty 50', currency: 'INR' },
    { key: 'NIFTY_NEXT50_TRI_INR', label: 'Nifty Next 50', currency: 'INR' },
    { key: 'NIFTY_MIDCAP150_TRI_INR', label: 'Nifty Midcap 150', currency: 'INR' },
    { key: 'NIFTY_SMALLCAP250_TRI_INR', label: 'Nifty Smallcap 250', currency: 'INR' },
    { key: 'GOLD_INR', label: 'Gold', currency: 'INR' },
    { key: 'DEBT_TRI_INR', label: 'Debt', currency: 'INR' },
  ];
  const ASSET_COLORS = {
    NASDAQ100_TRI_USD: '#9467bd',
    NIFTY50_TRI_INR: '#1f77b4',
    NIFTY_NEXT50_TRI_INR: '#ff7f0e',
    NIFTY_MIDCAP150_TRI_INR: '#2ca02c',
    NIFTY_SMALLCAP250_TRI_INR: '#d62728',
    GOLD_INR: '#b8860b',
    DEBT_TRI_INR: '#17becf'
  };

  // Utility helpers
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
  const sum = arr => arr.reduce((a, b) => a + b, 0);
  const round0 = v => Math.round(v);

  function parseMonth(str) {
    // 'YYYY-MM' → Date (first of month)
    const [y, m] = str.split('-').map(Number);
    return new Date(y, m - 1, 1);
  }

  function formatINR(n) {
    return n.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  }

  function monthDiff(startDate, endDate) {
    return (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
  }

  function addMonths(date, months) {
    const d = new Date(date.getTime());
    d.setMonth(d.getMonth() + months);
    return d;
  }

  function toYYYYMM(d) {
    const y = d.getFullYear();
    const m = (d.getMonth() + 1).toString().padStart(2, '0');
    return `${y}-${m}`;
  }

  // Newton-Raphson XIRR (monthly dates)
  function computeXIRR(cashflows, dates) {
    // cashflows: [-invest, ..., finalPositive]
    // dates: Date objects aligned with cashflows
    const maxIter = 100;
    const eps = 1e-7;
    let rate = 0.12; // initial guess 12%

    const t0 = dates[0].getTime();

    function f(r) {
      let s = 0;
      for (let i = 0; i < cashflows.length; i++) {
        const ti = (dates[i].getTime() - t0) / (1000 * 3600 * 24 * 365.0);
        s += cashflows[i] / Math.pow(1 + r, ti);
      }
      return s;
    }

    function fprime(r) {
      let s = 0;
      for (let i = 0; i < cashflows.length; i++) {
        const ti = (dates[i].getTime() - t0) / (1000 * 3600 * 24 * 365.0);
        s += (-ti) * cashflows[i] / Math.pow(1 + r, ti + 1);
      }
      return s;
    }

    for (let i = 0; i < maxIter; i++) {
      const y = f(rate);
      const yp = fprime(rate);
      if (Math.abs(yp) < 1e-12) break;
      const newRate = rate - y / yp;
      if (Math.abs(newRate - rate) < eps) {
        rate = newRate;
        break;
      }
      rate = newRate;
    }
    return rate;
  }

  function stdDev(values) {
    if (values.length === 0) return 0;
    const mean = sum(values) / values.length;
    const varSum = values.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0);
    return Math.sqrt(varSum / values.length);
  }

  function maxDrawdown(series) {
    // series: array of values (portfolio value over time)
    let peak = -Infinity;
    let mdd = 0;
    for (const v of series) {
      if (v > peak) peak = v;
      const dd = (peak - v) / peak;
      if (peak > 0 && dd > mdd) mdd = dd;
    }
    return mdd; // fraction
  }

  function computeSharpe(monthlyReturns, riskFreeMonthly = 0) {
    const excess = monthlyReturns.map(r => r - riskFreeMonthly);
    const mean = excess.length ? sum(excess) / excess.length : 0;
    const sd = stdDev(excess);
    const monthlySharpe = sd > 0 ? mean / sd : 0;
    return monthlySharpe * Math.sqrt(12); // annualized Sharpe
  }

  // Data loader: expects /data/multi-asset-allocation.json
  async function loadAssetData() {
    const resp = await fetch('/data/multi-asset-allocation.json');
    if (!resp.ok) throw new Error('Failed to load asset data');
    const json = await resp.json();
    
    // Transform columnar format to series format
    // json = { symbols: ["cpi", "niftybees", ...], start: "2002-01", data: [[val1, val2, ...], ...] }
    const result = {};
    const symbolMap = {
      'niftybees': 'NIFTY50_TRI_INR',
      'juniorbees': 'NIFTY_NEXT50_TRI_INR',
      'mid150bees': 'NIFTY_MIDCAP150_TRI_INR',
      'hdfcsml250': 'NIFTY_SMALLCAP250_TRI_INR',
      'goldbees': 'GOLD_INR',
      'ltgiltbees': 'DEBT_TRI_INR',
      'cndx.l': 'NASDAQ100_TRI_USD',
      'cpi': 'CPI'
    };
    
    // Create arrays for each symbol
    json.symbols.forEach((sym, idx) => {
      const mappedKey = symbolMap[sym] || sym;
      result[mappedKey] = [];
    });
    
    // Parse start date
    const [startYear, startMonth] = json.start.split('-').map(Number);
    
    // Fill data month by month
    json.data.forEach((row, monthOffset) => {
      const year = startYear + Math.floor((startMonth - 1 + monthOffset) / 12);
      const month = ((startMonth - 1 + monthOffset) % 12) + 1;
      const dateStr = `${year}-${String(month).padStart(2, '0')}`;
      
      json.symbols.forEach((sym, idx) => {
        const mappedKey = symbolMap[sym] || sym;
        const value = row[idx];
        if (value !== null && value !== undefined) {
          result[mappedKey].push({ date: dateStr, value });
        }
      });
    });
    
    return result;
  }

  function buildIndex(valuesByMonth) {
    // Ensure array sorted by date
    const arr = valuesByMonth.slice().sort((a, b) => a.date.localeCompare(b.date));
    // Compute monthly returns from TRI/value series: r_t = value_t/value_{t-1} - 1
    const monthly = [];
    for (let i = 1; i < arr.length; i++) {
      const prev = arr[i - 1].value;
      const cur = arr[i].value;
      const r = prev > 0 ? (cur / prev - 1) : 0;
      monthly.push({ date: arr[i].date, return: r, value: cur });
    }
    return monthly; // [{date, return, value}]
  }

  function convertUSDToINR(monthlyUSDSeries, usdInrSeries) {
    // Align by date and convert USD returns to INR returns using FX changes
    // Approximation: INR return ≈ (1 + r_usd) * (1 + r_fx) - 1, where r_fx is USDINR monthly change
    const fxMonthly = buildIndex(usdInrSeries);
    const usdMonthly = buildIndex(monthlyUSDSeries);
    const fxMap = new Map(fxMonthly.map(x => [x.date, x.return]));
    const res = [];
    for (const row of usdMonthly) {
      const fxr = fxMap.has(row.date) ? fxMap.get(row.date) : 0;
      const inrReturn = (1 + row.return) * (1 + fxr) - 1;
      res.push({ date: row.date, return: inrReturn, valueUSD: row.value });
    }
    return res; // monthly returns in INR terms
  }

  function slicePeriod(series, startYYYYMM, months) {
    // series: [{date, return, ...}]
    const startIdx = series.findIndex(x => x.date >= startYYYYMM);
    if (startIdx < 0) return [];
    return series.slice(startIdx, startIdx + months);
  }

  function computeMonthlyInvestment(monthIndex, baseMonthly, yearlyHikePct) {
    // Month index 0-based; apply hike each 12 months on the base
    const yearsPassed = Math.floor(monthIndex / 12);
    return baseMonthly * Math.pow(1 + yearlyHikePct / 100, yearsPassed);
  }

  function simulatePortfolio({ seriesByAsset, allocations, months, startYYYYMM, rebalancing, inflationAnnual, baseMonthly, yearlyHikePct }) {
    // seriesByAsset: {key: [{date, return}], ...} aligned or superset
    // allocations: {key: weight} weights sum to 1 for selected assets
    // rebalancing: true/false (monthly to target)
    const selectedKeys = Object.keys(allocations).filter(k => allocations[k] > 0);
    const weightSum = sum(selectedKeys.map(k => allocations[k]));
    const normAlloc = {};
    selectedKeys.forEach(k => normAlloc[k] = allocations[k] / weightSum);

    // Build per-asset sliced series
    const sliced = {};
    selectedKeys.forEach(k => {
      const s = seriesByAsset[k] || [];
      const part = slicePeriod(s, startYYYYMM, months);
      sliced[k] = part;
    });

    // Determine available months by intersection of dates
    const dates = sliced[selectedKeys[0]].map(x => x.date);
    for (let i = 1; i < selectedKeys.length; i++) {
      const set = new Set(sliced[selectedKeys[i]].map(x => x.date));
      // filter dates to intersection
      for (let d = dates.length - 1; d >= 0; d--) {
        if (!set.has(dates[d])) dates.splice(d, 1);
      }
    }
    const monthsAvailable = Math.min(months, dates.length);

    // Map date -> returns per asset
    const retByDate = new Map();
    for (const k of selectedKeys) {
      const map = new Map(sliced[k].map(x => [x.date, x.return]));
      for (const dt of dates) {
        const r = map.has(dt) ? map.get(dt) : 0;
        const prev = retByDate.get(dt) || {};
        prev[k] = r;
        retByDate.set(dt, prev);
      }
    }

    // Simulation state
    let portfolio = 0;
    const positions = {}; // value per asset
    selectedKeys.forEach(k => positions[k] = 0);

    const monthlyReturns = [];
    const portfolioValues = [];
    const cashflows = []; // negative contributions monthly, final liquidation positive
    const cashflowDates = [];

    const inflationMonthly = Math.pow(1 + inflationAnnual / 100, 1/12) - 1;

    for (let i = 0; i < monthsAvailable; i++) {
      const dt = dates[i];
      const monthlyInvest = computeMonthlyInvestment(i, baseMonthly, yearlyHikePct);

      // Contribution split by target weights
      for (const k of selectedKeys) {
        positions[k] += monthlyInvest * normAlloc[k];
      }
      portfolio += monthlyInvest;

      cashflows.push(-monthlyInvest);
      cashflowDates.push(parseMonth(dt));

      // Apply monthly returns
      let endValue = 0;
      for (const k of selectedKeys) {
        const r = (retByDate.get(dt)[k] ?? 0);
        positions[k] *= (1 + r);
        endValue += positions[k];
      }

      // Optional monthly rebalancing to target weights
      if (rebalancing) {
        for (const k of selectedKeys) {
          positions[k] = endValue * normAlloc[k];
        }
      }

      // Track real value adjusted for inflation
      const inflationFactor = Math.pow(1 + inflationMonthly, i + 1);
      const realValue = endValue / inflationFactor;

      const prevReal = portfolioValues.length ? portfolioValues[portfolioValues.length - 1] : 0;
      const monthlyReturn = prevReal > 0 ? (realValue / prevReal - 1) : 0;

      monthlyReturns.push(monthlyReturn);
      portfolioValues.push(realValue);
    }

    // Liquidate at final date
    const finalDate = parseMonth(dates[monthsAvailable - 1]);
    cashflows.push(portfolioValues[portfolioValues.length - 1]);
    cashflowDates.push(finalDate);

    // Metrics
    const xirr = computeXIRR(cashflows, cashflowDates);
    const sd = stdDev(monthlyReturns);
    const mdd = maxDrawdown(portfolioValues);
    const sharpe = computeSharpe(monthlyReturns, 0);

      return {
      monthsSimulated: monthsAvailable,
      monthlyReturns,
      portfolioValues,
      finalRealValue: portfolioValues[portfolioValues.length - 1] || 0,
      totalContributions: portfolio, // nominal sum of contributions
      xirr,
      stdDev: sd,
      maxDrawdown: mdd,
      sharpe,
      contributionByMonth: dates.slice(0, monthsAvailable).map((d, idx) => {
        const amt = computeMonthlyInvestment(idx, baseMonthly, yearlyHikePct);
        const perAsset = {};
        for (const k of selectedKeys) perAsset[k] = round0(amt * normAlloc[k]);
        return { date: d, total: round0(amt), assets: perAsset };
      })
    };
  }

  function simulateSingleAssetComparisons({ seriesByAsset, months, startYYYYMM, inflationAnnual, baseMonthly, yearlyHikePct }) {
    const comparisons = [];
    for (const asset of SUPPORTED_ASSETS) {
      const allocations = {}; allocations[asset.key] = 1;
      const res = simulatePortfolio({
        seriesByAsset,
        allocations,
        months,
        startYYYYMM,
        rebalancing: false,
        inflationAnnual,
        baseMonthly,
        yearlyHikePct
      });
      comparisons.push({ key: asset.key, label: asset.label, metrics: res });
    }
    return comparisons;
  }

  window.initializeTool.multiAssetAllocator = function(container, config) {
    // Build Vue app UI template
    container.innerHTML = `
      <div id="maa-tool-app">
        <div class="sip-calculator">
          <div class="sip-container">
            <div class="sip-inputs">
              <h3 style="margin-top:0;">📊 Multi Asset Allocator</h3>
              <div class="target-group">
                <!-- Backtest Period Selection -->
                <div class="input-group">
                  <label>
                    Backtest Period:&nbsp;<strong>{{ formattedPeriod }}</strong>
                    <span class="help-icon help-icon-wide" data-tooltip="Historical period for backtesting your portfolio allocation. Longer periods provide more reliable results but require assets with sufficient historical data">ℹ️</span>
                  </label>
                  <div class="unit-selector-input">
                    <input type="number" min="1" max="30" step="1" v-model.number="form.period.value" @input="onPeriodChange">
                    <div class="unit-buttons">
                      <button type="button" :class="{'active': form.period.unit === 'years'}" @click="form.period.unit = 'years'; onPeriodChange()">Years</button>
                      <button type="button" :class="{'active': form.period.unit === 'months'}" @click="form.period.unit = 'months'; onPeriodChange()">Months</button>
                    </div>
                  </div>
                </div>

                <!-- Asset Allocation -->
                <div class="input-group" v-if="availableAssets.length > 0">
                  <label>
                    Asset Allocation
                    <span class="help-icon help-icon-wide" data-tooltip="Distribute your investment across different asset classes. Total allocation must equal 100%. Diversification helps reduce risk while maintaining growth potential">ℹ️</span>
                  </label>
                  <div style="font-size:0.85rem;color:#666;margin-top:0.25rem;margin-bottom:0.5rem;">
                    Following assets available for {{ formattedPeriod }} backtest
                  </div>
                  <div style="display:flex;flex-direction:column;gap:0.75rem;margin-top:0.5rem;">
                    <div v-for="asset in availableAssets" :key="asset.key" style="display:flex;align-items:center;gap:0.75rem;">
                      <span style="display:inline-block;width:16px;height:16px;border-radius:3px;flex-shrink:0;" :style="{background: colors[asset.key]}"></span>
                      <span style="flex:1;min-width:180px;font-size:0.9rem;">{{ asset.label }}</span>
                      <input type="range" min="0" max="100" step="1" v-model.number="form.allocations[asset.key]" @input="onAllocationChange" style="flex:2;">
                      <input type="number" min="0" max="100" step="1" v-model.number="form.allocations[asset.key]" @input="onAllocationChange" style="width:70px;">
                      <span style="width:30px;text-align:right;font-weight:600;">%</span>
                    </div>
                  </div>
                  <div style="margin-top:0.75rem;display:flex;justify-content:space-between;align-items:center;padding:0.75rem;border-radius:4px;" :style="{background: totalAllocation === 100 ? '#d4edda' : '#fff3cd', border: '1px solid ' + (totalAllocation === 100 ? '#c3e6cb' : '#ffeeba')}">
                    <div style="font-size:0.95rem;font-weight:600;" :style="{color: totalAllocation === 100 ? '#155724' : '#856404'}">
                      Total Allocation: {{ totalAllocation }}% {{ totalAllocation === 100 ? '✓' : '(must be 100%)' }}
                    </div>
                    <button type="button" @click="equalWeight" style="padding:0.4rem 1rem;">Equal Weight</button>
                  </div>
                </div>
              </div>

              <!-- Investment Parameters -->
              <div class="investment-params-group" v-if="availableAssets.length > 0">
                <div class="input-group">
                  <label>
                    Initial Monthly Investment:&nbsp;<strong>₹ {{ formatCurrency(initialInvestment) }}</strong>
                    <span class="help-icon help-icon-wide" data-tooltip="The starting monthly SIP amount. This will be split across selected assets according to your allocation percentages">ℹ️</span>
                  </label>
                  <div class="unit-selector-input">
                    <input type="number" min="0" step="0.1" v-model.number="form.initialInvestmentValue" @input="debouncedCalculate">
                    <div class="unit-buttons">
                      <button type="button" :class="{'active': form.initialInvestmentUnit === 'crores'}" @click="form.initialInvestmentUnit = 'crores'; debouncedCalculate()">Crores</button>
                      <button type="button" :class="{'active': form.initialInvestmentUnit === 'lakhs'}" @click="form.initialInvestmentUnit = 'lakhs'; debouncedCalculate()">Lakhs</button>
                      <button type="button" :class="{'active': form.initialInvestmentUnit === 'thousands'}" @click="form.initialInvestmentUnit = 'thousands'; debouncedCalculate()">Thousands</button>
                    </div>
                  </div>
                </div>
                
                <div class="input-group">
                  <label>
                    Yearly Hike:&nbsp;<strong>{{ form.yearlyHike }}%</strong>
                    <span class="help-icon help-icon-wide" data-tooltip="Annual percentage increase in your monthly SIP amount. Simulates increasing contributions as your income grows over time">ℹ️</span>
                  </label>
                  <input type="number" min="0" max="50" step="0.5" v-model.number="form.yearlyHike" @input="debouncedCalculate" style="width:100%;">
                </div>

                <!-- Calculate Button -->
                <div class="input-group">
                  <button type="button" @click="calculate" :disabled="!canCalculate" 
                    style="width:100%;padding:0.75rem;font-size:1.1rem;font-weight:bold;background:#1f77b4;color:white;border:none;border-radius:4px;" 
                    :style="{opacity: canCalculate ? 1 : 0.5, cursor: canCalculate ? 'pointer' : 'not-allowed'}">
                    {{ canCalculate ? '🚀 Run Backtest' : '⚠️ Set Allocation to 100%' }}
                  </button>
                </div>
              </div>
              
              <p style="font-size: 0.9em; color: #666; margin-top: 1rem; font-style: italic;">💡 Adjust allocations and parameters to see different scenarios</p>
            </div>

            <!-- Results Section -->
            <div class="sip-outputs" v-if="results.ready">
              <div class="sip-summary">
                <h3 style="margin-top: 0; margin-bottom: 0.5rem;">📊 Backtest Results</h3>
                <table class="summary-table">
                  <tbody>
                    <tr>
                      <td><strong>Final Value</strong></td>
                      <td class="highlight">
                        <span class="help-icon" :data-tooltip="'₹ ' + results.finalValue.toLocaleString('en-IN', {maximumFractionDigits: 0})" style="cursor: default; opacity: 1; font-size: 1.2em;">
                          ₹ {{ formatCurrency(results.finalValue) }}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Total Invested</strong></td>
                      <td>
                        <span class="help-icon" :data-tooltip="'₹ ' + results.totalInvested.toLocaleString('en-IN', {maximumFractionDigits: 0})" style="cursor: default; opacity: 1; font-size: 1.2em;">
                          ₹ {{ formatCurrency(results.totalInvested) }}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>XIRR (Returns)</strong></td>
                      <td style="background-color: #d4edda; font-weight: 600;">
                        <span style="font-size: 1.1em;">{{ results.returns.toFixed(2) }}%</span>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Absolute Returns</strong></td>
                      <td>
                        {{ ((results.finalValue / results.totalInvested - 1) * 100).toFixed(2) }}% ({{ (results.finalValue / results.totalInvested).toFixed(2) }}x)
                      </td>
                    </tr>
                  </tbody>
                </table>
                
                <p style="font-size: 0.9em; color: #666; margin-top: 1rem;">
                  ℹ️ Results based on historical data. Past performance does not guarantee future returns.
                </p>
              </div>
            </div>
            <div class="sip-outputs placeholder" v-else>
              <div class="placeholder-content">
                <h3 style="margin-top: 0;">🎯 Your Results Will Appear Here</h3>
                <p v-if="availableAssets.length > 0">Set allocations to 100% and click "Run Backtest" to see results</p>
                <p v-else>Select a backtest period to begin</p>
                <div class="placeholder-features" v-if="availableAssets.length > 0">
                  <p>✅ Historical performance analysis</p>
                  <p>✅ Multi-asset portfolio simulation</p>
                  <p>✅ SIP with yearly hike support</p>
                  <p>✅ XIRR-based returns calculation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const app = Vue.createApp({
      data() {
        return {
          form: {
            period: {
              value: 10,
              unit: 'years' // 'years' or 'months'
            },
            allocations: {}, // Will be populated based on available assets
            initialInvestmentValue: DEFAULT_START_MONTHLY_INVESTMENT_VALUE,
            initialInvestmentUnit: DEFAULT_START_MONTHLY_INVESTMENT_UNIT,
            yearlyHike: DEFAULT_YEARLY_HIKE
          },
          assetData: null,
          availableAssets: [], // Assets that have sufficient data for selected period
          results: { 
            ready: false, 
            finalValue: 0,
            totalInvested: 0,
            returns: 0
          },
          colors: ASSET_COLORS
        };
      },
      computed: {
        totalMonths() {
          return this.form.period.unit === 'years' 
            ? this.form.period.value * 12 
            : this.form.period.value;
        },
        formattedPeriod() {
          const months = this.totalMonths;
          const years = Math.floor(months / 12);
          const remainingMonths = months % 12;
          
          if (years === 0) {
            return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
          } else if (remainingMonths === 0) {
            return `${years} year${years !== 1 ? 's' : ''}`;
          } else {
            return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
          }
        },
        initialInvestment() {
          return this.form.initialInvestmentValue * CURRENCY_MULTIPLIERS[this.form.initialInvestmentUnit];
        },
        totalAllocation() {
          return sum(Object.values(this.form.allocations));
        },
        canCalculate() {
          return this.availableAssets.length > 0 && this.totalAllocation === 100;
        }
      },
      methods: {
        formatCurrency(n) { 
          return n.toLocaleString('en-IN', { maximumFractionDigits: 0 }); 
        },
        
        async ensureDataLoaded() {
          if (!this.assetData) {
            try {
              this.assetData = await loadAssetData();
            } catch (e) {
              console.error(e);
              alert('Asset data not found. Please add /data/asset-series.json with monthly TRI values.');
              return false;
            }
          }
          return true;
        },

        async onPeriodChange() {
          const ok = await this.ensureDataLoaded();
          if (!ok) return;

          const requiredMonths = this.totalMonths;
          const available = [];

          // Check each asset for data availability
          for (const asset of SUPPORTED_ASSETS) {
            let dataLength = 0;
            
            if (this.assetData[asset.key]) {
              // buildIndex reduces length by 1 (calculating returns from consecutive values)
              dataLength = this.assetData[asset.key].length - 1;
            }

            // Check if asset has at least requiredMonths of return data
            if (dataLength >= requiredMonths) {
              available.push({
                key: asset.key,
                label: asset.label,
                dataPoints: dataLength
              });
            }
          }

          this.availableAssets = available;

          // Initialize allocations for available assets
          const newAllocations = {};
          const defaultAlloc = available.length > 0 ? Math.floor(100 / available.length) : 0;
          let remainder = available.length > 0 ? 100 - (defaultAlloc * available.length) : 0;
          
          for (let i = 0; i < available.length; i++) {
            const asset = available[i];
            newAllocations[asset.key] = defaultAlloc + (i === 0 ? remainder : 0);
          }
          
          this.form.allocations = newAllocations;
          this.results.ready = false;
        },

        onAllocationChange() {
          // User manually changed allocation
          // We'll let them manage it themselves
          this.debouncedCalculate();
        },

        equalWeight() {
          if (this.availableAssets.length === 0) return;
          
          const weight = Math.floor(100 / this.availableAssets.length);
          const remainder = 100 - (weight * this.availableAssets.length);
          
          for (let i = 0; i < this.availableAssets.length; i++) {
            const asset = this.availableAssets[i];
            this.form.allocations[asset.key] = weight + (i === 0 ? remainder : 0);
          }
          
          this.debouncedCalculate();
        },

        debouncedCalculate: null,

        async calculate() {
          if (!this.canCalculate) return;

          const ok = await this.ensureDataLoaded();
          if (!ok) return;

          // Build monthly return series in INR for each asset
          const seriesByAsset = {};

          // All assets are already in INR or INR-adjusted terms
          for (const key of Object.keys(this.assetData)) {
            if (key !== 'CPI') { // Skip CPI for now
              seriesByAsset[key] = buildIndex(this.assetData[key]);
            }
          }

          // Determine start date (most recent possible date minus required months)
          const selectedKeys = Object.keys(this.form.allocations);
          const lastDates = selectedKeys.map(k => {
            const s = seriesByAsset[k] || [];
            return s.length ? s[s.length - 1].date : null;
          }).filter(Boolean);
          
          if (!lastDates.length) {
            alert('No overlapping data for selected assets.');
            return;
          }
          
          lastDates.sort();
          const minLast = lastDates[0];
          const minLastDate = parseMonth(minLast);
          const startDate = addMonths(minLastDate, -this.totalMonths);
          const startYYYYMM = toYYYYMM(startDate);

          // Normalize allocations to weights (sum to 1)
          const allocations = {};
          for (const key of selectedKeys) {
            allocations[key] = this.form.allocations[key] / 100;
          }

          // Run simulation (simplified - no rebalancing, no inflation for now)
          const result = simulatePortfolio({
            seriesByAsset,
            allocations,
            months: this.totalMonths,
            startYYYYMM,
            rebalancing: false,
            inflationAnnual: 0, // Simplified: no inflation adjustment
            baseMonthly: this.initialInvestment,
            yearlyHikePct: this.form.yearlyHike
          });

          this.results = {
            ready: true,
            finalValue: result.finalRealValue,
            totalInvested: result.totalContributions,
            returns: result.xirr * 100
          };
        }
      },
      async mounted() {
        // Setup debounced calculate
        this.debouncedCalculate = (() => {
          let t = null;
          return () => { 
            clearTimeout(t); 
            t = setTimeout(() => this.calculate(), DEBOUNCE_DELAY_MS); 
          };
        })();

        // Load data and determine available assets for default period
        await this.onPeriodChange();
      }
    });

    app.mount('#maa-tool-app');
  };
})();

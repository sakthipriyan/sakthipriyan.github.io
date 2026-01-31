// Multi Asset Allocator (Vue.js + ECharts)
// Blends 7 asset classes with optional monthly rebalancing. Historical backtest using monthly TRI series.
// Assets: Nasdaq 100 (TRI, USD→INR), Nifty 50 TRI, Nifty Next 50 TRI, Midcap 150 TRI, Smallcap 250 TRI, Gold, Debt.

window.initializeTool = window.initializeTool || {};

(function() {
  const DEBOUNCE_DELAY_MS = 300;
  const DEFAULT_START_MONTHLY_INVESTMENT = 10000;
  const DEFAULT_YEARLY_HIKE = 10; // percent
  const DEFAULT_INFLATION = 6; // percent annual
  const SUPPORTED_ASSETS = [
    { key: 'NASDAQ100_TRI_USD', label: 'Nasdaq 100 (TRI, USD)', currency: 'USD' },
    { key: 'NIFTY50_TRI_INR', label: 'Nifty 50 TRI', currency: 'INR' },
    { key: 'NIFTY_NEXT50_TRI_INR', label: 'Nifty Next 50 TRI', currency: 'INR' },
    { key: 'NIFTY_MIDCAP150_TRI_INR', label: 'Midcap 150 TRI', currency: 'INR' },
    { key: 'NIFTY_SMALLCAP250_TRI_INR', label: 'Smallcap 250 TRI', currency: 'INR' },
    { key: 'GOLD_INR', label: 'Gold', currency: 'INR' },
    { key: 'DEBT_TRI_INR', label: 'Debt (TRI)', currency: 'INR' },
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

  // Data loader: expects /data/asset-series.json
  async function loadAssetData() {
    const resp = await fetch('/data/asset-series.json');
    if (!resp.ok) throw new Error('Failed to load asset data');
    const json = await resp.json();
    return json; // { key: [{date:'YYYY-MM', value:number}, ...], USDINR: [...] }
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
                <div class="input-group">
                  <label>Asset Classes (select any combination)</label>
                  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;">
                    ${SUPPORTED_ASSETS.map(a => `
                      <label style="display:flex;align-items:center;gap:0.5rem;">
                        <input type="checkbox" v-model="form.assets['${a.key}'].selected" @change="onSelectionChange">
                        <span style="display:inline-block;width:12px;height:12px;background:${ASSET_COLORS[a.key]};border-radius:2px;"></span>
                        ${a.label}
                      </label>
                    `).join('')}
                  </div>
                </div>
                <div class="input-group">
                  <label>Allocations (%) for selected assets</label>
                  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;">
                    ${SUPPORTED_ASSETS.map(a => `
                      <div style="display:flex;align-items:center;gap:0.5rem;">
                        <span style="min-width:160px;">${a.label}</span>
                        <input type="number" min="0" max="100" step="1" v-model.number="form.assets['${a.key}'].alloc" @input="onAllocInputAsset('${a.key}')">
                      </div>
                    `).join('')}
                  </div>
                  <div style="font-size:0.85rem;color:#666;margin-top:0.25rem;">Selected allocations should sum to 100%. Non-selected assets are ignored.</div>
                  <div style="margin-top:0.5rem;display:flex;gap:0.5rem;">
                    <button type="button" @click="equalWeight">Equal Weight</button>
                    <button type="button" @click="normalizeAlloc">Normalize to 100%</button>
                  </div>
                  <div style="margin-top:0.5rem;display:flex;align-items:center;gap:0.5rem;">
                    <span style="font-size:0.9rem;color:#333;">Auto-adjust:</span>
                    <select v-model="form.balancerKey" @change="onBalancerChange" style="padding:0.25rem 0.5rem;">
                      <option v-for="opt in selectedAssets()" :value="opt.key">{{ opt.label }}</option>
                    </select>
                    <span style="font-size:0.85rem;color:#666;">Changes auto-adjust {{ balancerLabel }}</span>
                  </div>
                  <div style="margin-top:0.75rem;">
                    <label>Interactive Allocation Editor (drag the separators)</label>
                    <div class="alloc-bar" ref="allocBar" style="display:flex;width:100%;height:44px;border:1px solid #ddd;border-radius:4px;overflow:hidden;">
                          <div v-for="(asset, i) in selectedAssets()" :key="asset.key" class="segment"
                            :style="segmentStyle(asset)">
                        <span class="label">{{ asset.label }} {{ form.assets[asset.key].alloc || 0 }}%</span>
                        <div v-if="i < selectedAssets().length - 1" class="handle"
                             @pointerdown="startDrag(i, $event)"
                             style="position:absolute; right:0; top:0; width:10px; height:100%; cursor:col-resize; background: rgba(0,0,0,0.25);"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="input-group-row">
                  <div class="input-group-col" style="flex:1;">
                    <label>Rebalancing</label>
                    <div class="mode-toggle">
                      <button type="button" :class="{'active': form.rebalance}" @click="form.rebalance = true; calculate()">Monthly to allocation</button>
                      <button type="button" :class="{'active': !form.rebalance}" @click="form.rebalance = false; calculate()">No rebalancing</button>
                    </div>
                  </div>
                  <div class="input-group-col" style="flex:1;">
                    <label>Lookback Period</label>
                    <div class="unit-selector-input">
                      <input type="number" min="1" step="1" v-model.number="form.years" @input="debouncedCalculate">
                      <div class="unit-buttons"><button type="button" class="active">Years</button></div>
                    </div>
                  </div>
                </div>
                <div class="input-group-row">
                  <div class="input-group-col" style="flex:1;">
                    <label>Starting Monthly Investment: <strong>₹ {{ formatCurrencyFull(form.monthly) }}</strong></label>
                    <input type="number" min="0" step="100" v-model.number="form.monthly" @input="debouncedCalculate">
                  </div>
                  <div class="input-group-col" style="flex:1;">
                    <label>Yearly Hike: <strong>{{ form.hike }}%</strong></label>
                    <input type="number" min="0" max="50" step="0.5" v-model.number="form.hike" @input="debouncedCalculate">
                  </div>
                </div>
                <div class="input-group-row">
                  <div class="input-group-col" style="flex:1;">
                    <label>Inflation: <strong>{{ form.inflation }}%</strong></label>
                    <input type="number" min="0" max="20" step="0.5" v-model.number="form.inflation" @input="debouncedCalculate">
                  </div>
                </div>
              </div>
            </div>
            <div class="sip-outputs" v-if="results.ready">
              <div class="sip-summary">
                <div class="summary-row">
                  <div class="summary-cell">
                    <div class="summary-label">Final Real Value</div>
                    <span class="help-icon" style="cursor:default;opacity:1;font-size:1.2em;">₹ {{ formatCurrency(results.blend.finalRealValue) }}</span>
                  </div>
                  <div class="summary-cell">
                    <div class="summary-label">XIRR</div>
                    <strong>{{ (results.blend.xirr*100).toFixed(2) }}%</strong>
                  </div>
                  <div class="summary-cell">
                    <div class="summary-label">Sharpe</div>
                    <strong>{{ results.blend.sharpe.toFixed(2) }}</strong>
                  </div>
                  <div class="summary-cell">
                    <div class="summary-label">Std Dev (monthly)</div>
                    <strong>{{ (results.blend.stdDev*100).toFixed(2) }}%</strong>
                  </div>
                  <div class="summary-cell">
                    <div class="summary-label">Max Drawdown</div>
                    <strong>{{ (results.blend.maxDrawdown*100).toFixed(1) }}%</strong>
                  </div>
                </div>
              </div>
              <div style="margin-top:1rem;">
                <h4>Comparison: 100% in each asset vs blended</h4>
                <table class="summary-table">
                  <thead>
                    <tr>
                      <th>Asset</th><th>Final Real Value</th><th>XIRR</th><th>Sharpe</th><th>Std Dev</th><th>Max DD</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Blended Allocation</strong></td>
                      <td>₹ {{ formatCurrency(results.blend.finalRealValue) }}</td>
                      <td>{{ (results.blend.xirr*100).toFixed(2) }}%</td>
                      <td>{{ results.blend.sharpe.toFixed(2) }}</td>
                      <td>{{ (results.blend.stdDev*100).toFixed(2) }}%</td>
                      <td>{{ (results.blend.maxDrawdown*100).toFixed(1) }}%</td>
                    </tr>
                    <tr v-for="row in results.singles" :key="row.key">
                      <td>{{ row.label }}</td>
                      <td>₹ {{ formatCurrency(row.metrics.finalRealValue) }}</td>
                      <td>{{ (row.metrics.xirr*100).toFixed(2) }}%</td>
                      <td>{{ row.metrics.sharpe.toFixed(2) }}</td>
                      <td>{{ (row.metrics.stdDev*100).toFixed(2) }}%</td>
                      <td>{{ (row.metrics.maxDrawdown*100).toFixed(1) }}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="margin-top:1rem;">
                <h4>Contribution Table</h4>
                <table class="summary-table">
                  <thead>
                    <tr>
                      <th>Year-Month</th>
                      ${SUPPORTED_ASSETS.map(a => `<th>${a.label}</th>`).join('')}
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in results.blend.contributionByMonth">
                      <td>{{ row.date }}</td>
                      ${SUPPORTED_ASSETS.map(a => `
                        <td>{{ row.assets['${a.key}'] ? formatCurrency(row.assets['${a.key}']) : '-' }}</td>
                      `).join('')}
                      <td>₹ {{ formatCurrency(row.total) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div id="maa-chart" style="width:100%;height:400px;margin-top:1rem;"></div>
            </div>
            <div class="sip-outputs placeholder" v-else>
              <p>Fill the allocations (sum 100%) and select assets to run the simulation.</p>
            </div>
          </div>
        </div>
      </div>
    `;

    const app = Vue.createApp({
      data() {
        const assetsState = {};
        for (const a of SUPPORTED_ASSETS) {
          assetsState[a.key] = { selected: false, alloc: 0 };
        }
        return {
          form: {
            assets: assetsState,
            rebalance: true,
            years: 10,
            monthly: DEFAULT_START_MONTHLY_INVESTMENT,
            hike: DEFAULT_YEARLY_HIKE,
            inflation: DEFAULT_INFLATION,
            balancerKey: 'DEBT_TRI_INR'
          },
          results: { ready: false, blend: {}, singles: [] },
          assetData: null,
          chart: null,
          dragging: null,
          _dragMoveHandler: null,
          _dragUpHandler: null,
          colors: ASSET_COLORS
        };
      },
      computed: {
        selectedAllocations() {
          const out = {};
          for (const a of SUPPORTED_ASSETS) {
            const s = this.form.assets[a.key];
            if (s.selected && s.alloc > 0) out[a.key] = s.alloc / 100;
          }
          return out;
        },
        balancerLabel() {
          const a = SUPPORTED_ASSETS.find(x => x.key === this.form.balancerKey);
          return a ? a.label : '—';
        }
      },
      methods: {
        formatCurrency(n) { return n.toLocaleString('en-IN', { maximumFractionDigits: 0 }); },
        formatCurrencyFull(n) { return n.toLocaleString('en-IN', { maximumFractionDigits: 0 }); },
        segmentStyle(asset) {
          const pct = this.form.assets[asset.key].alloc || 0;
          const bg = this.colors[asset.key] || '#6aa0ff';
          return {
            width: pct + '%',
            background: bg,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '0.85rem'
          };
        },
        onSelectionChange() {
          this.normalizeAlloc();
          this.onBalancerChange();
          this.debouncedCalculate();
        },
        onAllocInputAsset(key) {
          this.rebalanceTo100UsingBalancer(key);
          this.debouncedCalculate();
        },
        onBalancerChange() {
          // Ensure balancer is among selected; if not, pick first selected
          const sel = this.selectedAssets();
          if (!sel.find(s => s.key === this.form.balancerKey)) {
            this.form.balancerKey = sel.length ? sel[0].key : this.form.balancerKey;
          }
        },
        rebalanceTo100UsingBalancer(changedKey) {
          const sel = this.selectedAssets();
          if (sel.length === 0) return;
          let balKey = this.form.balancerKey;
          const balIsSelected = !!sel.find(s => s.key === balKey);
          if (!balIsSelected) {
            // Fallback to largest selected asset
            balKey = this.largestNonKeySelected(changedKey);
          }
          const total = this.totalAllocSelected();
          if (changedKey !== balKey) {
            // Set balancer to remaining so total = 100
            const others = sel.filter(s => s.key !== balKey);
            const sumOthers = others.reduce((acc, s) => acc + (this.form.assets[s.key].alloc || 0), 0);
            this.form.assets[balKey].alloc = clamp(100 - sumOthers, 0, 100);
            // If clamped caused mismatch, normalize
            const sumNow = this.totalAllocSelected();
            if (sumNow !== 100) this.normalizeAlloc();
          } else {
            // Balancer edited: adjust largest other asset
            const largest = this.largestNonKeySelected(balKey);
            if (!largest) return;
            const diff = 100 - total;
            const cur = this.form.assets[largest].alloc || 0;
            this.form.assets[largest].alloc = clamp(cur + diff, 0, 100);
            const sumNow = this.totalAllocSelected();
            if (sumNow !== 100) this.normalizeAlloc();
          }
        },
        largestNonKeySelected(excludeKey) {
          const sel = this.selectedAssets();
          let maxK = null; let maxV = -1;
          for (const s of sel) {
            if (s.key === excludeKey) continue;
            const v = this.form.assets[s.key].alloc || 0;
            if (v > maxV) { maxV = v; maxK = s.key; }
          }
          return maxK;
        },
        equalWeight() {
          const sel = this.selectedAssets();
          if (sel.length === 0) return;
          const w = 100 / sel.length;
          for (const s of sel) this.form.assets[s.key].alloc = Math.round(w);
          const sumNow = this.totalAllocSelected();
          const diff = 100 - sumNow;
          if (diff !== 0) this.form.assets[sel[0].key].alloc += diff;
          this.refreshAllocEditor();
          this.debouncedCalculate();
        },
        normalizeAlloc() {
          const total = this.totalAllocSelected();
          const sel = this.selectedAssets();
          if (sel.length === 0) return;
          if (total <= 0) {
            const w = 100 / sel.length;
            for (const s of sel) this.form.assets[s.key].alloc = Math.round(w);
          } else {
            for (const s of sel) {
              const cur = this.form.assets[s.key].alloc;
              this.form.assets[s.key].alloc = Math.round((cur / total) * 100);
            }
            const sumNow = this.totalAllocSelected();
            if (sumNow !== 100) this.form.assets[sel[0].key].alloc += (100 - sumNow);
          }
          this.refreshAllocEditor();
          this.debouncedCalculate();
        },
        totalAllocSelected() {
          return this.selectedAssets().reduce((acc, s) => acc + (this.form.assets[s.key].alloc || 0), 0);
        },
        selectedAssets() {
          const arr = [];
          for (const a of SUPPORTED_ASSETS) {
            const s = this.form.assets[a.key];
            if (s.selected) arr.push({ key: a.key, label: a.label, alloc: s.alloc });
          }
          return arr;
        },
        startDrag(index, event) {
          const bar = this.$refs.allocBar;
          if (!bar) return;
          const rect = bar.getBoundingClientRect();
          const barWidth = rect.width;
          const sel = this.selectedAssets();
          if (index >= sel.length - 1) return;
          const leftKey = sel[index].key;
          const rightKey = sel[index + 1].key;
          const leftStart = this.form.assets[leftKey].alloc || 0;
          const rightStart = this.form.assets[rightKey].alloc || 0;

          this.dragging = { index, leftKey, rightKey, startX: event.clientX, barWidth, leftStart, rightStart, pairTotal: leftStart + rightStart };

          this._dragMoveHandler = (e) => this.onDrag(e);
          this._dragUpHandler = (e) => this.stopDrag(e);
          window.addEventListener('pointermove', this._dragMoveHandler);
          window.addEventListener('pointerup', this._dragUpHandler, { once: true });
        },
        onDrag(e) {
          if (!this.dragging) return;
          const dx = e.clientX - this.dragging.startX;
          const deltaPct = (dx / this.dragging.barWidth) * 100;
          const minPct = 0; // could be 1 for minimum segment
          let left = this.dragging.leftStart + deltaPct;
          left = clamp(left, minPct, this.dragging.pairTotal - minPct);
          let right = this.dragging.pairTotal - left;
          // Snap to 1%
          const leftRounded = Math.round(left);
          const rightRounded = this.dragging.pairTotal - leftRounded;
          if (rightRounded < minPct) return;
          this.form.assets[this.dragging.leftKey].alloc = leftRounded;
          this.form.assets[this.dragging.rightKey].alloc = rightRounded;
        },
        stopDrag() {
          window.removeEventListener('pointermove', this._dragMoveHandler);
          this.dragging = null;
          this.debouncedCalculate();
        },
        async ensureDataLoaded() {
          if (!this.assetData) {
            try {
              this.assetData = await loadAssetData();
            } catch (e) {
              console.error(e);
              alert('Asset data not found. Please add /static/data/asset-series.json with monthly TRI values.');
              return false;
            }
          }
          return true;
        },
        debouncedCalculate: null,
        async calculate() {
          // Validate allocations
          const weight = sum(Object.values(this.selectedAllocations));
          if (weight <= 0 || Math.abs(weight - 1) > 1e-6) {
            this.results.ready = false;
            return;
          }

          const ok = await this.ensureDataLoaded();
          if (!ok) return;

          // Build monthly return series in INR for each asset
          const seriesByAsset = {};

          // USD→INR conversion for Nasdaq 100
          if (this.assetData['NASDAQ100_TRI_USD'] && this.assetData['USDINR']) {
            const converted = convertUSDToINR(this.assetData['NASDAQ100_TRI_USD'], this.assetData['USDINR']);
            // Use the same key as selection so allocations resolve
            seriesByAsset['NASDAQ100_TRI_USD'] = converted;
          }

          // INR series direct
          const directKeys = ['NIFTY50_TRI_INR','NIFTY_NEXT50_TRI_INR','NIFTY_MIDCAP150_TRI_INR','NIFTY_SMALLCAP250_TRI_INR','GOLD_INR','DEBT_TRI_INR'];
          for (const k of directKeys) {
            if (this.assetData[k]) seriesByAsset[k] = buildIndex(this.assetData[k]);
          }

          const months = this.form.years * 12;
          // Determine startYYYYMM by picking the latest possible start such that months exist in most series
          // For simplicity: use min last date across selected assets minus months
          const selectedKeys = Object.keys(this.selectedAllocations);
          const lastDates = selectedKeys.map(k => {
            const s = seriesByAsset[k] || [];
            return s.length ? s[s.length - 1].date : null;
          }).filter(Boolean);
          if (!lastDates.length) {
            alert('No overlapping data for selected assets.');
            this.results.ready = false;
            return;
          }
          lastDates.sort();
          const minLast = lastDates[0]; // earliest last date among selected
          const minLastDate = parseMonth(minLast);
          const startDate = addMonths(minLastDate, -months);
          const startYYYYMM = toYYYYMM(startDate);

          const blend = simulatePortfolio({
            seriesByAsset,
            allocations: this.selectedAllocations,
            months,
            startYYYYMM,
            rebalancing: this.form.rebalance,
            inflationAnnual: this.form.inflation,
            baseMonthly: this.form.monthly,
            yearlyHikePct: this.form.hike
          });

          const singles = simulateSingleAssetComparisons({
            seriesByAsset,
            months,
            startYYYYMM,
            inflationAnnual: this.form.inflation,
            baseMonthly: this.form.monthly,
            yearlyHikePct: this.form.hike
          });

          this.results = { ready: true, blend, singles };
          this.renderChart();
        },
        renderChart() {
          // Plot real portfolio value over time for blended vs a couple of assets
          const dom = document.getElementById('maa-chart');
          if (!dom) return;
          if (!this.chart) this.chart = echarts.init(dom);

          const months = this.results.blend.portfolioValues.length;
          const x = [];
          const startDate = new Date();
          for (let i = 0; i < months; i++) {
            x.push(i + 1);
          }

          const series = [
            {
              name: 'Blended (Real)', type: 'line', data: this.results.blend.portfolioValues.map(round0)
            }
          ];
          // Add up to 2 single-asset series for comparison
          for (let i = 0; i < Math.min(2, this.results.singles.length); i++) {
            series.push({ name: this.results.singles[i].label, type: 'line', data: this.results.singles[i].metrics.portfolioValues.map(round0) });
          }

          this.chart.setOption({
            tooltip: { trigger: 'axis' },
            legend: {},
            xAxis: { type: 'category', data: x },
            yAxis: { type: 'value' },
            series
          });
        }
      },
      async mounted() {
        // debounce
        this.debouncedCalculate = (() => {
          let t = null;
          return () => { clearTimeout(t); t = setTimeout(() => this.calculate(), DEBOUNCE_DELAY_MS); };
        })();
        // Defaults: select Nifty50 + Debt 50/50
        this.form.assets['NIFTY50_TRI_INR'].selected = true; this.form.assets['NIFTY50_TRI_INR'].alloc = 50;
        this.form.assets['DEBT_TRI_INR'].selected = true; this.form.assets['DEBT_TRI_INR'].alloc = 50;
        this.calculate();
      }
    });

    app.mount('#maa-tool-app');
  };
})();

/* ============================================================================
   MOCK_DATA_sales — deterministic sales generator used to attach sales fields
   onto every MOCK document. Output is stable per `_id` so reloads don't change
   the numbers.

   Exposed helpers:
     attachSales(_id)         → 8 timeframe objects { amount, qnt }
     salesTimeSeries(_id)     → 13-month [{ label, amount, qnt }] for charts
     pricePoints(_id, base)   → ~14-point [{ label, gross }] for price chart

   Currency: AED.
============================================================================ */

// FNV-1a hash → 32-bit unsigned integer.
const seedHash = (s) => {
  let h = 2166136261;
  const str = String(s);
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = (h * 16777619) >>> 0;
  }
  return h;
};

// Cheap deterministic [0, 1) PRNG.
const rand = (seed, salt) => {
  const x = Math.sin(seed * 9301 + salt * 49297) * 233280;
  return x - Math.floor(x);
};

const round2 = (n) => Math.round(n * 100) / 100;
const ri = (n) => Math.max(0, Math.round(n));

/* ----- 8 timeframe snapshots ----- */
export const attachSales = (id) => {
  const s = seedHash(id);

  const yQ = 1 + ri(rand(s, 1) * 40);                       // yesterday: 1–41 units
  const yA = round2(yQ * (25 + rand(s, 2) * 75));           // 25–100 AED per unit

  const weekQ = ri(yQ * (4.5 + rand(s, 3) * 3.5));
  const weekA = round2(weekQ * (25 + rand(s, 4) * 75));

  const mQ = ri(weekQ * (3.2 + rand(s, 5) * 1.6));
  const mA = round2(mQ * (25 + rand(s, 6) * 75));

  const lmQ = ri(mQ * (0.7 + rand(s, 7) * 0.6));
  const lmA = round2(lmQ * (25 + rand(s, 8) * 75));

  const qtrQ = ri(mQ * (2.4 + rand(s, 9) * 1.2));
  const qtrA = round2(qtrQ * (25 + rand(s, 10) * 75));

  const pqQ = ri(qtrQ * (0.75 + rand(s, 11) * 0.5));
  const pqA = round2(pqQ * (25 + rand(s, 12) * 75));

  const yrQ = ri(qtrQ * (3.4 + rand(s, 13) * 1.2));
  const yrA = round2(yrQ * (25 + rand(s, 14) * 75));

  const lyQ = ri(yrQ * (0.78 + rand(s, 15) * 0.45));
  const lyA = round2(lyQ * (25 + rand(s, 16) * 75));

  return {
    yesterdaySales:      { amount: yA,    qnt: yQ },
    thisWeeksSales:      { amount: weekA, qnt: weekQ },
    currentMonthSales:   { amount: mA,    qnt: mQ },
    lastMonthsSales:     { amount: lmA,   qnt: lmQ },
    thisQourterSales:    { amount: qtrA,  qnt: qtrQ },
    previusQourterSales: { amount: pqA,   qnt: pqQ },
    thisYearsSales:      { amount: yrA,   qnt: yrQ },
    lastYearsSales:      { amount: lyA,   qnt: lyQ },
  };
};

/* ----- Monthly time series for charts ----- */
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthLabel = (offsetBack) => {
  const d = new Date();
  d.setDate(1);
  d.setMonth(d.getMonth() - offsetBack);
  const y = d.getFullYear().toString().slice(2);
  return `${MONTH_NAMES[d.getMonth()]} ’${y}`;
};

export const salesTimeSeries = (id, points = 13) => {
  const s = seedHash(id);
  // Average monthly qnt derived from currentMonthSales-ish region.
  const base = 8 + ri(rand(s, 21) * 80);          // baseline units per month
  const trend = 0.92 + rand(s, 22) * 0.18;        // 0.92x to 1.10x monthly growth
  const out = [];
  let q = base;
  for (let i = points - 1; i >= 0; i--) {
    // Random month-to-month noise, plus weekly-ish bumps every ~3 months.
    const noise = 0.7 + rand(s, 30 + i) * 0.6;
    const bump = 1 + (Math.sin(i / 2.4 + rand(s, 99)) * 0.15);
    const m = ri(q * noise * bump);
    const a = round2(m * (25 + rand(s, 60 + i) * 75));
    out.push({ label: monthLabel(i), qnt: m, amount: a });
    q = q * trend;
  }
  return out;
};

/* ----- Price points for the priceHistory chart ----- */
export const pricePoints = (id, basePrice = 40, points = 14) => {
  const s = seedHash(id);
  const out = [];
  let p = basePrice * (0.78 + rand(s, 41) * 0.18);
  for (let i = points - 1; i >= 0; i--) {
    const drift = 0.985 + rand(s, 80 + i) * 0.03;
    p = round2(Math.max(1, p * drift));
    // Occasional re-price jumps.
    if (rand(s, 50 + i) < 0.12) {
      p = round2(p * (1 + (rand(s, 70 + i) - 0.4) * 0.18));
    }
    out.push({ label: monthLabel(i), gross: p });
  }
  // Make the final point exactly the basePrice so the current selling price
  // sits at the right edge of the chart.
  if (out.length) out[out.length - 1] = { ...out[out.length - 1], gross: basePrice };
  return out;
};

/* ----- Timeframe definitions exposed for filtering UIs ----- */
export const SALES_TIMEFRAMES = [
  { key: "yesterdaySales",      label: "Yesterday",        short: "1D" },
  { key: "thisWeeksSales",      label: "This Week",        short: "1W" },
  { key: "currentMonthSales",   label: "Current Month",    short: "1M" },
  { key: "lastMonthsSales",     label: "Last Month",       short: "L-M" },
  { key: "thisQourterSales",    label: "This Quarter",     short: "1Q" },
  { key: "previusQourterSales", label: "Previous Quarter", short: "L-Q" },
  { key: "thisYearsSales",      label: "This Year",        short: "1Y" },
  { key: "lastYearsSales",      label: "Last Year",        short: "L-Y" },
];

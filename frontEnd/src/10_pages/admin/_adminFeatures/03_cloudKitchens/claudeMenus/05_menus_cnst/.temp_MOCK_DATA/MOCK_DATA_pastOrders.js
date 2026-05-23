/* ============================================================================
   MOCK_DATA_pastOrders — deterministic generator for past order line items.

   Generates ~N line items per source _id, spread over the last 12 months,
   across multiple channels (Deliveroo / Careem / Talabat / Direct) and a few
   branches. Mock data only — no PII, no real ids; uses string-shaped ObjectIds
   that match the schema fields (brand/branch/channel are ObjectId-ish strings
   with denormalized snapshots beside them).
============================================================================ */

const seedHash = (s) => {
  let h = 2166136261;
  const str = String(s);
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = (h * 16777619) >>> 0; }
  return h;
};
const rand = (seed, salt) => {
  const x = Math.sin(seed * 9301 + salt * 49297) * 233280;
  return x - Math.floor(x);
};
const ri = (n) => Math.max(0, Math.round(n));
const round2 = (n) => Math.round(n * 100) / 100;

const CHANNELS = [
  { _id: "ch_deliveroo", name: "Deliveroo", logo: "https://example.com/deliveroo.png" },
  { _id: "ch_careem",    name: "Careem",    logo: "https://example.com/careem.png" },
  { _id: "ch_talabat",   name: "Talabat",   logo: "https://example.com/talabat.png" },
  { _id: "ch_direct",    name: "Direct",    logo: "https://example.com/direct.png" },
];

const BRANCHES = [
  { _id: "br_mall",     name: "Dubai Mall",         address: "Dubai Mall, Dubai, UAE",        coordinates: { lat: 25.197197, lng: 55.279376 } },
  { _id: "br_marina",   name: "Dubai Marina",       address: "Marina Walk, Dubai, UAE",       coordinates: { lat: 25.080540, lng: 55.140710 } },
  { _id: "br_jbr",      name: "JBR",                address: "The Walk, JBR, Dubai, UAE",     coordinates: { lat: 25.078580, lng: 55.130100 } },
  { _id: "br_downtown", name: "Downtown",           address: "Sheikh Mohammed Bin Rashid Blvd", coordinates: { lat: 25.197525, lng: 55.274288 } },
  { _id: "br_jlt",      name: "JLT",                address: "Cluster X, JLT, Dubai, UAE",    coordinates: { lat: 25.069330, lng: 55.137200 } },
];

const BRANDS = [
  { _id: "bd_vkusno",     name: "Vkusno",     logo: "https://example.com/vkusno.png" },
  { _id: "bd_competitor", name: "Competitor", logo: "https://example.com/competitor.png" },
];

export { CHANNELS, BRANCHES, BRANDS };

const ymd = (d) => d.toISOString();

const pickFrom = (arr, s, salt) => arr[Math.floor(rand(s, salt) * arr.length) % arr.length];

/* Generate up to ~count line items across the last 365 days. */
export const generatePastOrders = (id, { unitPriceBase = 35, count = 36, brandId = "bd_vkusno" } = {}) => {
  const s = seedHash(id);
  const out = [];
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;

  for (let i = 0; i < count; i++) {
    const daysBack = Math.floor(rand(s, 100 + i) * 365);
    const date = new Date(now - daysBack * day - rand(s, 200 + i) * day);

    const qty = 1 + Math.floor(rand(s, 300 + i) * 4);
    const priceVar = 0.85 + rand(s, 400 + i) * 0.3;
    const unitPrice = round2(unitPriceBase * priceVar);
    const grossAmount = round2(qty * unitPrice);

    // ~10% of orders get a discount, 5–25% off.
    const hasDiscount = rand(s, 500 + i) < 0.1;
    const discount = hasDiscount ? round2(grossAmount * (0.05 + rand(s, 600 + i) * 0.2)) : 0;
    const netAmount = round2(grossAmount - discount);

    // ~6% cancellation rate.
    const status = rand(s, 700 + i) < 0.06 ? "cancelled" : "completed";

    const channel = pickFrom(CHANNELS, s, 800 + i);
    const branch = pickFrom(BRANCHES, s, 900 + i);
    const brand = BRANDS.find((b) => b._id === brandId) || BRANDS[0];

    out.push({
      orderId: `ord_${s.toString(36)}_${i}`,
      uniqueOrderId: `${(1218210569568849920n + BigInt(s) + BigInt(i)).toString()}`,
      brand:   { _id: brand._id, name: brand.name, logo: brand.logo },
      branch:  { _id: branch._id, name: branch.name, address: branch.address, coordinates: branch.coordinates },
      channel: { _id: channel._id, name: channel.name, logo: channel.logo },
      receivedAt: ymd(date),
      qty,
      unitPrice,
      grossAmount,
      discount,
      netAmount,
      status,
    });
  }

  // Newest first.
  return out.sort((a, b) => new Date(b.receivedAt) - new Date(a.receivedAt));
};

/* ----- Aggregations ----- */

const inRange = (iso, from, to) => {
  const t = new Date(iso).getTime();
  return t >= from && t <= to;
};

const TIMEFRAMES_MS = {
  yesterday:      { from: () => Date.now() - 2 * 86_400_000, to: () => Date.now() - 86_400_000 },
  thisWeek:       { from: () => Date.now() - 7  * 86_400_000, to: () => Date.now() },
  currentMonth:   { from: () => Date.now() - 30 * 86_400_000, to: () => Date.now() },
  lastMonth:      { from: () => Date.now() - 60 * 86_400_000, to: () => Date.now() - 30 * 86_400_000 },
  thisQuarter:    { from: () => Date.now() - 90 * 86_400_000, to: () => Date.now() },
  previusQuarter: { from: () => Date.now() - 180 * 86_400_000, to: () => Date.now() - 90 * 86_400_000 },
  thisYear:       { from: () => Date.now() - 365 * 86_400_000, to: () => Date.now() },
  lastYear:       { from: () => Date.now() - 730 * 86_400_000, to: () => Date.now() - 365 * 86_400_000 },
};

/* Bucket a flat past-orders array into 12 monthly { label, amount, qnt } points. */
export const monthlyFromOrders = (orders = [], { months = 12, useGross = false } = {}) => {
  const buckets = new Array(months).fill(0).map((_, i) => {
    const d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() - (months - 1 - i));
    return { ts: d.getTime(), amount: 0, qnt: 0, label: d.toLocaleString("en-US", { month: "short", year: "2-digit" }) };
  });
  for (const o of orders) {
    if (o.status === "cancelled") continue;
    const t = new Date(o.receivedAt).getTime();
    for (let i = buckets.length - 1; i >= 0; i--) {
      if (t >= buckets[i].ts) {
        buckets[i].amount += useGross ? o.grossAmount : o.netAmount;
        buckets[i].qnt += o.qty;
        break;
      }
    }
  }
  return buckets.map((b) => ({ label: b.label, amount: round2(b.amount), qnt: b.qnt }));
};

/* Group past-orders by a key extractor → { [key]: { amount, qnt, label } }. */
export const groupOrdersBy = (orders = [], getKey, getLabel) => {
  const map = new Map();
  for (const o of orders) {
    if (o.status === "cancelled") continue;
    const k = getKey(o);
    if (!map.has(k)) map.set(k, { amount: 0, qnt: 0, label: getLabel ? getLabel(o) : k });
    const e = map.get(k);
    e.amount += o.netAmount;
    e.qnt += o.qty;
  }
  return [...map.values()].map((v) => ({ ...v, amount: round2(v.amount) }));
};

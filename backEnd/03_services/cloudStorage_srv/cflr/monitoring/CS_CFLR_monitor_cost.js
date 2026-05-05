// R2 pricing 2025
const PRICING = {
  storage: 0.015,              // $/GB/month after 10 GB free
  ops: {
    classA: 4.50 / 1_000_000, // $/request after 1M free
    classB: 0.36  / 1_000_000, // $/request after 10M free
  },
  egress: 0,                   // always free
};
const FREE_STORAGE_GB = 10;
const FREE_CLASS_A    = 1_000_000;
const FREE_CLASS_B    = 10_000_000;

function parseGb(str = "") {
  const match = String(str).match(/([\d.]+)\s*(GB|MB|KB|B)/i);
  if (!match) return 0;
  const val = parseFloat(match[1]), unit = match[2].toUpperCase();
  if (unit === "GB") return val;
  if (unit === "MB") return val / 1e3;
  if (unit === "KB") return val / 1e6;
  return val / 1e9;
}

export const CS_CFLR_monitor_cost = (storage, ops, _network) => {
  try {
    const usedGb      = storage?.used ?? 0;
    const storageCost = Math.max(0, usedGb - FREE_STORAGE_GB) * PRICING.storage;

    const billableA = Math.max(0, (ops?.classA ?? 0) - FREE_CLASS_A);
    const billableB = Math.max(0, (ops?.classB ?? 0) - FREE_CLASS_B);
    const opsCost   = billableA * PRICING.ops.classA + billableB * PRICING.ops.classB;

    const total     = storageCost + opsCost; // egress always 0
    const dayOfMonth  = new Date().getDate();
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const projected   = dayOfMonth > 0 ? (total / dayOfMonth) * daysInMonth : total;

    const buckets = (storage?.buckets ?? []).map((b) => ({
      name: b.name,
      cost: parseFloat((storageCost * (b.pct ?? 100) / 100).toFixed(4)),
    }));

    return {
      total:      parseFloat(total.toFixed(4)),
      storage:    parseFloat(storageCost.toFixed(4)),
      ops:        parseFloat(opsCost.toFixed(4)),
      egress:     0,
      projected:  parseFloat(projected.toFixed(4)),
      trend:      projected > total ? "up" : "flat",
      buckets,
      isEstimate: true,
    };
  } catch (error) {
    return { error: error?.message || String(error) };
  }
};

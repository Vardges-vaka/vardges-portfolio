// No external API — uses already-computed storage/ops/network data.
// Pricing: Google Cloud Standard multi-region US, 2025.
const PRICING = {
  storage: { standard: 0.020, nearline: 0.010, coldline: 0.004, archive: 0.0012 },
  ops:     { classA: 0.05 / 1000, classB: 0.004 / 1000 },
  egress:  0.08,
};

const FREE_EGRESS_GB = 1;

function parseGb(str = "") {
  const match = String(str).match(/([\d.]+)\s*(GB|MB|KB|B)/i);
  if (!match) return 0;
  const val  = parseFloat(match[1]);
  const unit = match[2].toUpperCase();
  if (unit === "GB") return val;
  if (unit === "MB") return val / 1e3;
  if (unit === "KB") return val / 1e6;
  return val / 1e9;
}

export const CS_GCS_monitor_cost = (storage, ops, network) => {
  try {
    const usedGb = storage?.used ?? 0;
    const classes = storage?.classes ?? {};
    const classPct = (cls) => (classes[cls] ?? 0) / 100;

    const storageCost =
      usedGb * classPct("standard") * PRICING.storage.standard +
      usedGb * classPct("nearline")  * PRICING.storage.nearline  +
      usedGb * classPct("coldline")  * PRICING.storage.coldline  +
      usedGb * classPct("archive")   * PRICING.storage.archive;

    const billableA   = Math.max(0, (ops?.classA ?? 0) - 5000);
    const billableB   = Math.max(0, (ops?.classB ?? 0) - 50000);
    const opsCost     = billableA * PRICING.ops.classA + billableB * PRICING.ops.classB;

    const egressGb    = parseGb(network?.egress);
    const billableEgr = Math.max(0, egressGb - FREE_EGRESS_GB);
    const egressCost  = billableEgr * PRICING.egress;

    const total = storageCost + opsCost + egressCost;

    const dayOfMonth  = new Date().getDate();
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const projected   = dayOfMonth > 0 ? (total / dayOfMonth) * daysInMonth : total;

    const buckets = (storage?.buckets ?? []).map((b) => {
      const pct = (b.pct ?? 0) / 100;
      return { name: b.name, cost: parseFloat((storageCost * pct).toFixed(4)) };
    });

    return {
      total:      parseFloat(total.toFixed(4)),
      storage:    parseFloat(storageCost.toFixed(4)),
      ops:        parseFloat(opsCost.toFixed(4)),
      egress:     parseFloat(egressCost.toFixed(4)),
      projected:  parseFloat(projected.toFixed(4)),
      trend:      projected > total ? "up" : "flat",
      buckets,
      isEstimate: true,
    };
  } catch (error) {
    return { error: error?.message || String(error) };
  }
};

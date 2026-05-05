// AWS S3 pricing 2025 (us-east-1, first 50 TB)
const PRICING = {
  storage: { standard: 0.023 },          // $/GB/month
  ops:     { classA: 0.005 / 1000, classB: 0.0004 / 1000 }, // $/request
  egress:  0.09,                          // $/GB above free tier
};
const FREE_EGRESS_GB  = 100;
const FREE_TIER_READS  = 20_000;
const FREE_TIER_WRITES = 2_000;

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

export const CS_AWS_monitor_cost = (storage, ops, network) => {
  try {
    const usedGb      = storage?.used ?? 0;
    const storageCost = usedGb * PRICING.storage.standard;

    const billableA  = Math.max(0, (ops?.classA ?? 0) - FREE_TIER_WRITES);
    const billableB  = Math.max(0, (ops?.classB ?? 0) - FREE_TIER_READS);
    const opsCost    = billableA * PRICING.ops.classA + billableB * PRICING.ops.classB;

    const egressGb   = parseGb(network?.egress);
    const billableEgr = Math.max(0, egressGb - FREE_EGRESS_GB);
    const egressCost  = billableEgr * PRICING.egress;

    const total       = storageCost + opsCost + egressCost;
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

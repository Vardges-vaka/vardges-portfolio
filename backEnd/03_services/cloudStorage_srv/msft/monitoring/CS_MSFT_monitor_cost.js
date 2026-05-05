// Azure Blob Hot tier pricing 2025 (LRS, East US)
const PRICING = {
  storage: 0.018,              // $/GB/month
  ops: {
    classA: 0.05  / 10000,    // $0.05 per 10K write ops
    classB: 0.004 / 10000,    // $0.004 per 10K read ops
  },
  egress: 0.087,               // $/GB after 10 GB free
};
const FREE_EGRESS_GB = 10;

function parseGb(str = "") {
  const match = String(str).match(/([\d.]+)\s*(GB|MB|KB|B)/i);
  if (!match) return 0;
  const val = parseFloat(match[1]), unit = match[2].toUpperCase();
  if (unit === "GB") return val;
  if (unit === "MB") return val / 1e3;
  if (unit === "KB") return val / 1e6;
  return val / 1e9;
}

export const CS_MSFT_monitor_cost = (storage, ops, network) => {
  try {
    const usedGb      = storage?.used ?? 0;
    const storageCost = usedGb * PRICING.storage;

    const opsCost = ((ops?.classA ?? 0) * PRICING.ops.classA)
                  + ((ops?.classB ?? 0) * PRICING.ops.classB);

    const egressGb   = parseGb(network?.egress);
    const egressCost = Math.max(0, egressGb - FREE_EGRESS_GB) * PRICING.egress;

    const total     = storageCost + opsCost + egressCost;
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

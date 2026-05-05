import { CloudStorage_MonitorWrraper } from "../_cloudStorage_MonitorPanel.index";
import "../../../_styles/cloudStorage_monitorShared.css";
import "../../../_styles/cloudStorage_monitorCostSection.css";

const BREAKDOWN_COLORS = {
  Storage: "#3b82f6",
  Operations: "#f59e0b",
  Egress: "#ef4444",
};

const CloudStorage_CostSection = ({ data }) => {
  const breakdownItems = [
    { label: "Storage", value: data.storage },
    { label: "Operations", value: data.ops },
    { label: "Egress", value: data.egress },
  ];

  return (
    <CloudStorage_MonitorWrraper title="Cost">
      <div className="cost-meta">
        <div className="cost-meta-block">
          <div className="cost-meta-label">Estimated This Month</div>
          <div className="cost-total">${data.total.toFixed(2)}</div>
        </div>
        <div className="cost-meta-block">
          <div className="cost-meta-label">Projected End-of-Month</div>
          <div className="cost-projected">
            ~${data.projected.toFixed(2)}
            {data.trend === "up" && <span className="trend-up">↗</span>}
            {data.trend === "flat" && (
              <span className="trend-flat">→</span>
            )}
          </div>
        </div>
      </div>

      <div className="monitor-sub-label">Cost Breakdown</div>
      {breakdownItems.map((item) => (
        <div key={item.label} className="cost-breakdown-row">
          <div className="cb-label">{item.label}</div>
          <div className="cb-value">${item.value.toFixed(2)}</div>
          <div className="cb-bar-wrap">
            <div
              className="cb-bar"
              style={{
                width: `${((item.value / data.total) * 100).toFixed(1)}%`,
                background: BREAKDOWN_COLORS[item.label],
                opacity: 0.8,
              }}
            />
          </div>
        </div>
      ))}

      <div className="monitor-sub-label monitor-sub-label--mt8">
        Cost Per Bucket
      </div>
      {data.buckets.map((b) => (
        <div key={b.name} className="cost-breakdown-row">
          <div className="cb-label">{b.name}</div>
          <div className="cb-value">${b.cost.toFixed(2)}</div>
        </div>
      ))}
    </CloudStorage_MonitorWrraper>
  );
};

export default CloudStorage_CostSection;

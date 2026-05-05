import { CloudStorage_MonitorWrraper } from "../_cloudStorage_MonitorPanel.index";
import "../../../_styles/cloudStorage_monitorShared.css";

const CloudStorage_OperationsSection = ({ data }) => {
  if (data.available === false) {
    return (
      <CloudStorage_MonitorWrraper title="Operations">
        <div className="not-impl-banner not-impl-banner--normal">
          {data.reason ??
            "Request metrics not enabled. Enable them in your cloud console to see operation counts."}
        </div>
      </CloudStorage_MonitorWrraper>
    );
  }

  if (data.error) {
    return (
      <CloudStorage_MonitorWrraper title="Operations">
        <div className="not-impl-banner">Could not load operations data.</div>
      </CloudStorage_MonitorWrraper>
    );
  }

  const classAPct = ((data.classA / data.classALimit) * 100).toFixed(1);
  const classBPct = ((data.classB / data.classBLimit) * 100).toFixed(1);

  return (
    <CloudStorage_MonitorWrraper title="Operations">
      <div className="section-note">
        Free tier: {data.classALimit.toLocaleString()} Class A /{" "}
        {data.classBLimit.toLocaleString()} Class B per month
      </div>

      <div className="stat-row">
        <div className="stat-label">Class A (writes / uploads)</div>
        <div className="stat-value">
          {data.classA.toLocaleString()} / {data.classALimit.toLocaleString()}
        </div>
        <div className="stat-bar-wrap">
          <div
            className={`stat-bar${parseFloat(classAPct) > 80 ? " orange" : ""}`}
            style={{ width: `${classAPct}%` }}
          />
        </div>
      </div>

      <div className="stat-row">
        <div className="stat-label">Class B (reads / downloads)</div>
        <div className="stat-value">
          {data.classB.toLocaleString()} / {data.classBLimit.toLocaleString()}
        </div>
        <div className="stat-bar-wrap">
          <div
            className={`stat-bar${parseFloat(classBPct) > 80 ? " orange" : ""}`}
            style={{ width: `${classBPct}%` }}
          />
        </div>
      </div>

      <div className="stat-row">
        <div className="stat-label">Total This Month</div>
        <div className="stat-plain">
          {data.total.toLocaleString()} operations
        </div>
      </div>

      <div className="stat-row">
        <div className="stat-label">Failed Operations</div>
        <div className={`stat-plain${data.failed > 0 ? " danger" : ""}`}>
          {data.failed > 0 ? `⚠ ${data.failed}` : "0 — all OK"}
        </div>
      </div>
    </CloudStorage_MonitorWrraper>
  );
};

export default CloudStorage_OperationsSection;

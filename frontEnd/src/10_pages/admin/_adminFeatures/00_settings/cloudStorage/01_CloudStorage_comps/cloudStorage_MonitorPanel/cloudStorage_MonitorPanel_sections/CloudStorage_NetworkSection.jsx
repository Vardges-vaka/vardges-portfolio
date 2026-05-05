import { CloudStorage_MonitorWrraper } from "../_cloudStorage_MonitorPanel.index";
import "../../../_styles/cloudStorage_monitorShared.css";

const CloudStorage_NetworkSection = ({ data }) => {
  if (data.available === false) {
    return (
      <CloudStorage_MonitorWrraper title="Network">
        <div className="not-impl-banner" style={{ fontStyle: "normal" }}>
          {data.reason ??
            "Request metrics not enabled. Enable them in your cloud console to see network data."}
        </div>
      </CloudStorage_MonitorWrraper>
    );
  }

  if (data.error) {
    return (
      <CloudStorage_MonitorWrraper title="Network">
        <div className="not-impl-banner">Could not load network data.</div>
      </CloudStorage_MonitorWrraper>
    );
  }

  return (
    <CloudStorage_MonitorWrraper title="Network">
      <div className="section-note">
        {data.egressFree
          ? "Egress is always free — R2 charges $0 for data transfer out"
          : "Egress pricing applies above free tier"}
      </div>

      <div className="stat-row">
        <div className="stat-label">Ingress (uploaded in)</div>
        {data.ingress === "N/A" ? (
          <div className="monitor-muted-italic">
            Not reported by this provider
          </div>
        ) : (
          <>
            <div className="stat-value">{data.ingress}</div>
            <div className="stat-bar-wrap">
              <div className="stat-bar green" style={{ width: "30%" }} />
            </div>
            <span className="stat-pill pill-free">Free</span>
          </>
        )}
      </div>

      <div className="stat-row">
        <div className="stat-label">Egress (sent to internet)</div>
        <div className="stat-value">{data.egress}</div>
        <div className="stat-bar-wrap">
          <div
            className={`stat-bar ${data.egressFree ? "teal" : "orange"}`}
            style={{ width: data.egressFree ? "100%" : `${data.egressPct}%` }}
          />
        </div>
        <span
          className={`stat-pill ${data.egressFree ? "pill-free" : "pill-billable"}`}>
          {data.egressFree ? "Always Free" : "Billable"}
        </span>
      </div>

      <div className="stat-row">
        <div className="stat-label">Inter-region Transfer</div>
        <div className="stat-plain">{data.interRegion}</div>
      </div>

      <div className="stat-row">
        <div className="stat-label">CDN Cache Hit Rate</div>
        {data.cdnHitRate != null ? (
          <>
            <div className="stat-value">{data.cdnHitRate}%</div>
            <div className="stat-bar-wrap">
              <div
                className="stat-bar teal"
                style={{ width: `${data.cdnHitRate}%` }}
              />
            </div>
          </>
        ) : (
          <div className="monitor-muted-italic">
            CDN not attached
          </div>
        )}
      </div>
    </CloudStorage_MonitorWrraper>
  );
};

export default CloudStorage_NetworkSection;

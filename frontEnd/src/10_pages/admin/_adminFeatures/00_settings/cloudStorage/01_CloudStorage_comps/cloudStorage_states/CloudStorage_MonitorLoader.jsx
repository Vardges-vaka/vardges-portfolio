import "../../_styles/cloudStorage_MonitorLoader.css";

const CloudStorage_MonitorLoader = () => (
  <div className="monitor-loader" role="status" aria-live="polite">
    <div className="monitor-loader-top">
      <div className="monitor-loader-core">
        <div className="monitor-loader-ring" />
        <div className="monitor-loader-stack">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="monitor-loader-copy">
        <div className="monitor-loader-title">Preparing monitor data...</div>
        <div className="monitor-loader-subtitle">
          Checking storage, operations, network, cost, and files.
        </div>
      </div>
    </div>

    <div className="monitor-loader-grid">
      <div className="monitor-loader-card">
        <span className="monitor-loader-card-title" />
        <span className="monitor-loader-card-value" />
        <span className="monitor-loader-card-bar" />
      </div>
      <div className="monitor-loader-card">
        <span className="monitor-loader-card-title" />
        <span className="monitor-loader-card-value" />
        <span className="monitor-loader-card-bar" />
      </div>
      <div className="monitor-loader-card">
        <span className="monitor-loader-card-title" />
        <span className="monitor-loader-card-value" />
        <span className="monitor-loader-card-bar" />
      </div>
    </div>

    <div className="monitor-loader-skeleton">
      <span />
      <span />
      <span />
    </div>
  </div>
);

CloudStorage_MonitorLoader.displayName = "CloudStorage_MonitorLoader";

export default CloudStorage_MonitorLoader;

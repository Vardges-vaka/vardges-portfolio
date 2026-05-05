import { CloudStorage_MonitorWrraper } from "../_cloudStorage_MonitorPanel.index";
import "../../../_styles/cloudStorage_monitorShared.css";
import "../../../_styles/cloudStorage_monitorStorageSection.css";

const CloudStorage_StorageSection = ({ data }) => {
  const usedPct = ((data.used / data.total) * 100).toFixed(1);

  return (
    <CloudStorage_MonitorWrraper title="Storage">
      <div className="stat-row">
        <div className="stat-label">Total Storage Used</div>
        <div className="stat-value">
          {data.used} {data.unit} / {data.total} {data.unit}
        </div>
        <div className="stat-bar-wrap">
          <div className="stat-bar" style={{ width: `${usedPct}%` }} />
        </div>
      </div>

      <div className="monitor-sub-label">Per Bucket</div>
      {data.buckets.map((bucket) => (
        <div key={bucket.name} className="bucket-row">
          <div className="bucket-name">{bucket.name}</div>
          <div className="bucket-size">{bucket.size}</div>
          <div className="bucket-bar-wrap">
            <div className="bucket-bar" style={{ width: `${bucket.pct}%` }} />
          </div>
        </div>
      ))}

      <div className="stat-row stat-row--mt6">
        <div className="stat-label">Object Count</div>
        <div className="stat-plain">
          {data.objects.toLocaleString()} objects
        </div>
      </div>

      <div className="monitor-sub-label">Storage Class Breakdown</div>
      <div className="storage-class-wrap">
        <div className="sc-pill sc-standard">
          Standard <strong>{data.classes.standard}%</strong>
        </div>
        <div className="sc-pill sc-nearline">
          Nearline <strong>{data.classes.nearline}%</strong>
        </div>
        <div className="sc-pill sc-coldline">
          Coldline <strong>{data.classes.coldline}%</strong>
        </div>
        <div className="sc-pill sc-archive">
          Archive <strong>{data.classes.archive}%</strong>
        </div>
      </div>
    </CloudStorage_MonitorWrraper>
  );
};

export default CloudStorage_StorageSection;

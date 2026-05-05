import { CloudStorage_MonitorWrraper } from "../_cloudStorage_MonitorPanel.index";
import "../../../_styles/cloudStorage_monitorShared.css";
import "../../../_styles/cloudStorage_monitorFilesSection.css";

const FILE_TYPE_MAP = {
  img: { cls: "icon-img", lbl: "IMG" },
  pdf: { cls: "icon-pdf", lbl: "PDF" },
  vid: { cls: "icon-vid", lbl: "VID" },
  doc: { cls: "icon-doc", lbl: "DOC" },
  oth: { cls: "icon-oth", lbl: "OTH" },
};

const TYPE_BAR_COLORS = {
  images: "#3b82f6",
  video: "#8b5cf6",
  audio: "#14b8a6",
  docs: "#f59e0b",
  other: "#9ca3af",
};

const FileListItem = ({ file, onCopyKey }) => {
  const t = FILE_TYPE_MAP[file.type] || FILE_TYPE_MAP.oth;
  return (
    <div
      className="file-list-item"
      title="Click to copy object key"
      onClick={() => onCopyKey && onCopyKey(file.name)}>
      <div className={`file-type-icon ${t.cls}`}>{t.lbl}</div>
      <span className="file-name">{file.name}</span>
      <span className="file-size">{file.size}</span>
      <span className="file-time">{file.ago}</span>
    </div>
  );
};

const CloudStorage_FilesSection = ({ data, onCopyKey }) => {
  const { images, video, audio, docs, other } = data.typeBreakdown;

  return (
    <CloudStorage_MonitorWrraper title="Files">
      <div className="monitor-sub-label">Recently Uploaded</div>
      {data.recent.map((f, i) => (
        <FileListItem key={i} file={f} onCopyKey={onCopyKey} />
      ))}

      <div className="monitor-sub-label monitor-sub-label--mt8">
        Largest Files
      </div>
      {data.largest.map((f, i) => (
        <FileListItem key={i} file={f} onCopyKey={onCopyKey} />
      ))}

      <div className="monitor-sub-label monitor-sub-label--mt8">
        File Type Breakdown
      </div>
      <div className="filetype-bar">
        <div
          className="filetype-segment ft-images"
          style={{ width: `${images}%` }}
        />
        <div
          className="filetype-segment ft-video"
          style={{ width: `${video}%` }}
        />
        <div
          className="filetype-segment ft-audio"
          style={{ width: `${audio}%` }}
        />
        <div
          className="filetype-segment ft-docs"
          style={{ width: `${docs}%` }}
        />
        <div
          className="filetype-segment ft-other"
          style={{ width: `${other}%` }}
        />
      </div>
      <div className="filetype-legend">
        {Object.entries({ images, video, audio, docs, other }).map(
          ([key, pct]) => (
            <div key={key} className="ft-legend-item">
              <div
                className="ft-legend-dot"
                style={{ background: TYPE_BAR_COLORS[key] }}
              />
              {key.charAt(0).toUpperCase() + key.slice(1)} {pct}%
            </div>
          ),
        )}
      </div>
    </CloudStorage_MonitorWrraper>
  );
};

export default CloudStorage_FilesSection;

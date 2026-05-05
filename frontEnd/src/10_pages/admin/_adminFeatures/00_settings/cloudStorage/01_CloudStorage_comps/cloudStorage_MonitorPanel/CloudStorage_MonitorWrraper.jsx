import { useState } from "react";
import { IconChevronDown } from "../_CloudStorage_comps.index.js";
import "../../_styles/cloudStorage_MonitorWrraper.css";
import "../../_styles/cloudStorage_monitorShared.css";

const CloudStorage_MonitorWrraper = ({ title, children }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="monitor-section">
      <div
        className="monitor-section-header"
        onClick={() => setOpen((o) => !o)}>
        <div className="monitor-section-title">{title}</div>
        <div className={`monitor-section-chevron${open ? " open" : ""}`}>
          <IconChevronDown size={14} />
        </div>
      </div>
      <div className={`monitor-section-body${open ? " open" : ""}`}>
        <div className="monitor-section-content">{children}</div>
      </div>
    </div>
  );
};

export default CloudStorage_MonitorWrraper;

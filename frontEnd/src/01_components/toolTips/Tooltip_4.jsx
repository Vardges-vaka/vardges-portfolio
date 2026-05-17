import "../_styles/toolTips/Tooltip_4.css";

const Tooltip_4 = () => {
  return (
    <div className="tooltip-container">
      <div className="trigger-wrapper">
        <svg className="branch-path-svg" viewBox="0 0 300 60">
          <path
            className="branch-line line-left"
            d="M150,0 C150,25 60,25 60,60"
            fill="none"
            stroke="#a371f7"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="branch-line line-right"
            d="M150,0 C150,25 240,25 240,60"
            fill="none"
            stroke="#238636"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="60"
            cy="60"
            r="3"
            className="branch-dot dot-left"
            fill="#a371f7"
          />
          <circle
            cx="240"
            cy="60"
            r="3"
            className="branch-dot dot-right"
            fill="#238636"
          />
        </svg>

        <button className="merge-btn">Review Code</button>
      </div>

      <div className="tooltips-wrapper">
        <div className="tooltip-content" style={{ borderLeft: "2px solid #a371f7" }}>
          <div className="tooltip-header" style={{ color: "#a371f7" }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"></path>
            </svg>
            <span>Changes Requested</span>
          </div>
          <div className="tooltip-info">2 comments unresolved</div>
        </div>

        <div className="tooltip-content" style={{ borderLeft: "2px solid #238636" }}>
          <div className="tooltip-header" style={{ color: "#238636" }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
            </svg>
            <span>Checks Passed</span>
          </div>
          <div className="tooltip-info">CI Reference #9082</div>
        </div>
      </div>
    </div>
  );
};

export default Tooltip_4;

import "../_styles/toolTips/Tooltip_1.css";

const Tooltip_1 = () => {
  return (
    <div className="custom-tooltip-container">
      <button className="custom-tooltip-btn">Hover me</button>
      <div className="custom-tooltip-content">
        <span className="custom-tooltip-arrow"></span>
        <p className="custom-tooltip-text">
          Warning: Hovering too long may result in a sudden craving for cookies!
        </p>
      </div>
    </div>
  );
};

export default Tooltip_1;

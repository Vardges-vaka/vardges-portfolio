import "../_styles/toolTips/Tooltip_10.css";

const Tooltip_10 = () => {
  return (
    <div className="void-wrapper">
      <div className="singularity">
        <div className="content">
          <span className="glitch-text">VOID_DATA</span>
          <div className="particles"></div>
        </div>
      </div>

      <button className="event-horizon">ENTER THE VOID</button>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        style={{ display: "block", width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"></feGaussianBlur>
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"></feColorMatrix>
            <feComposite
              in="SourceGraphic"
              in2="goo"
              operator="atop"></feComposite>
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default Tooltip_10;

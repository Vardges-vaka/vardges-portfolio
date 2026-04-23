import { DailySales_YYY_ZZZ } from "./DailySales_childComps/_dailySales_childComps.index";
import "../_styles/dailySales_YYY.css";

const DailySales_YYY = ({ states, handlers, t, childProps }) => {
  return (
    // Root element: <div> with the full component lineage as className.
    // Internal classNames: xXX_YYY_[elementName] (single underscore separator, never double)
    <div className="DailySales_YYY">
      {/* Example internal element with a properly scoped className */}
      <div className="xXX_YYY_header">
        <h2 className="xXX_YYY_title">{t("sampleTitle")}</h2>
      </div>

      {/* ---------- Child Component: XXX_YYY_ZZZ ----------
          Spread the pre-built child props from childProps.
          The key is: XXX_YYY_ZZZ_props (full lineage + "_props")
      */}
      <DailySales_YYY_ZZZ {...childProps.DailySales_YYY_ZZZ_props} />
    </div>
  );
};

export default DailySales_YYY;

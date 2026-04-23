import { useDailySales } from "./03_dailySales_hooks/_dailySales_hooks.index.js";
import { DailySales_YYY } from "./01_dailySales_comps/_dailySales_comps.index.js";
import "./_styles/dailySales.css";

const DailySales = () => {
  const { t, states, handlers, compProps } = useDailySales();

  return (
    <div className="dailySales">
      <DailySales_YYY {...compProps.DailySales_YYY_props} />
    </div>
  );
};

export default DailySales;

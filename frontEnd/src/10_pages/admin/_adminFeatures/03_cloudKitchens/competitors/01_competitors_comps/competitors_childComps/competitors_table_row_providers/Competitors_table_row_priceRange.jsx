import {
  Budget_Icon,
  Medium_Icon,
  Premium_Icon,
} from "../../../../../../../../01_components/components.index.js";
import { formatPriceRangeLabel } from "../../../02_competitors_helpers/_competitors_helpers.index.js";
import "../../../_styles/competitors_table_row_priceRange.css";

const Competitors_table_row_priceRange = ({ competitor, t }) => {
  const label = formatPriceRangeLabel(competitor?.priceRange, t);
  const detailTitle = t
    ? t("tableRow.detailPriceRange", { defaultValue: "Price range" })
    : "Price range";

  const icon =
    label === "budget"
      ? Budget_Icon()
      : label === "mid"
        ? Medium_Icon()
        : Premium_Icon();

  return (
    <div className="Competitors_table_row_priceRange">
      <img
        src={icon}
        alt={label}
        title={label.toUpperCase()}
        aria-label={detailTitle}
        className="Competitors_table_row_openIconBtn iconOnly"
      />
    </div>
  );
};

export default Competitors_table_row_priceRange;

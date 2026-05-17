import "../../../_styles/competitors_table_row_dineIn.css";

/* eslint-disable react-refresh/only-export-components */
const competitorHasDineIn = (competitor) => {
  const locs = competitor?.branches?.locations;
  if (!Array.isArray(locs) || locs.length === 0) return false;
  return locs.some((l) => l?.hasDineIn === true);
};

const CheckIcon = () => (
  <svg
    className="Competitors_table_row_dineIn_check"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M9 16.2l-3.5-3.5-1.4 1.4L9 19 20.3 7.7l-1.4-1.4z"
    />
  </svg>
);

const Competitors_table_row_dineIn = ({ competitor, t }) => {
  const has = competitorHasDineIn(competitor);
  const yes = t ? t("tableRow.dineInYes", "Has dine-in") : "Has dine-in";
  const no = t ? t("tableRow.dineInNo", "No dine-in") : "No dine-in";

  return (
    <div className="Competitors_table_row_dineIn">
      {has ? (
        <span title={yes} aria-label={yes}>
          <CheckIcon />
        </span>
      ) : (
        <span className="Competitors_table_row_dineIn_dash" title={no} aria-label={no}>
          —
        </span>
      )}
    </div>
  );
};

export default Competitors_table_row_dineIn;


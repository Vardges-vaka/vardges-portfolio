import "../../../_styles/competitors_table_row_ownDeliveryDubai.css";

/** Table cell: whether the competitor runs first-party delivery in Dubai. */
const Competitors_table_row_ownDeliveryDubai = ({ competitor, t }) => {
  const v = competitor?.hasOwnDeliveryDubai;
  const yesLabel = t
    ? t("tableRow.ownDeliveryYes", {
        defaultValue: "Own delivery in Dubai",
      })
    : "Own delivery in Dubai";
  const noLabel = t
    ? t("tableRow.ownDeliveryNo", {
        defaultValue: "No own delivery in Dubai",
      })
    : "No own delivery in Dubai";
  const unknownLabel = t
    ? t("tableRow.ownDeliveryUnknown", {
        defaultValue: "Own delivery in Dubai not recorded",
      })
    : "Own delivery in Dubai not recorded";

  if (v === true) {
    return (
      <div className="competitors_table_row_ownDeliveryDubai" title={yesLabel}>
        <span className="competitors_table_row_ownDeliveryDubai__srOnly">
          {yesLabel}
        </span>
        <svg
          className="competitors_table_row_ownDeliveryDubai__check"
          viewBox="0 0 24 24"
          aria-hidden="true">
          <path
            fill="currentColor"
            d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
          />
        </svg>
      </div>
    );
  }

  const isExplicitNo = v === false;
  const emptyLabel = isExplicitNo ? noLabel : unknownLabel;

  return (
    <div
      className="competitors_table_row_ownDeliveryDubai competitors_table_row_ownDeliveryDubai--empty"
      title={emptyLabel}>
      <span aria-hidden="true">—</span>
      <span className="competitors_table_row_ownDeliveryDubai__srOnly">
        {emptyLabel}
      </span>
    </div>
  );
};

export default Competitors_table_row_ownDeliveryDubai;

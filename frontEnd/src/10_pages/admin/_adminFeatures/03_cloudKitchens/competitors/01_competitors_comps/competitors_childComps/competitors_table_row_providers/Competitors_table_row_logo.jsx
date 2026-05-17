import "../../../_styles/competitors_table_row_logo.css";

const Competitors_table_row_logo = ({ competitor, handlers, t }) => {
  const h = handlers?.handleCompetitorTableAction;
  const src = competitor?.logo;
  const detailTitle = t
    ? t("tableRow.detailLogo", { defaultValue: "Logo details" })
    : "Logo details";

  return (
    <div className="Competitors_table_row_logo">
      <button
        type="button"
        className="Competitors_table_row_logo_thumbBtn"
        onClick={h}
        data-session="view_profile"
        data-competitor-id={competitor._id}
        title={detailTitle}
        aria-label={detailTitle}
      >
        {src ? (
          <img
            className="Competitors_table_row_logo_img"
            src={src}
            alt=""
            loading="lazy"
          />
        ) : (
          <span className="Competitors_table_row_logo_placeholder">—</span>
        )}
      </button>
    </div>
  );
};

export default Competitors_table_row_logo;

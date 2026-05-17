import "../../../_styles/competitors_table_row_socials.css";
import Competitors_table_row_openIconBtn from "./Competitors_table_row_openIconBtn.jsx";

const Competitors_table_row_socials = ({ competitor, handlers, t }) => {
  const h = handlers?.handleCompetitorTableAction;
  const detailTitle = t
    ? t("tableRow.detailSocials", { defaultValue: "Social profiles" })
    : "Social profiles";

  return (
    <div className="Competitors_table_row_socials">
      <Competitors_table_row_openIconBtn
        onClick={h}
        dataSession="view_socials"
        competitorId={competitor._id}
        title={detailTitle}
        ariaLabel={detailTitle}
      />
    </div>
  );
};

export default Competitors_table_row_socials;

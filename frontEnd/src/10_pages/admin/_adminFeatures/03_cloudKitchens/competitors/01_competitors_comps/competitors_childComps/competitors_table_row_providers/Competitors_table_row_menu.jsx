import "../../../_styles/competitors_table_row_menu.css";
import Competitors_table_row_openIconBtn from "./Competitors_table_row_openIconBtn.jsx";

const Competitors_table_row_menu = ({ competitor, handlers, t }) => {
  const h = handlers?.handleCompetitorTableAction;
  const detailTitle = t
    ? t("tableRow.detailMenu", { defaultValue: "Menu details" })
    : "Menu details";

  return (
    <div className="Competitors_table_row_menu">
      <Competitors_table_row_openIconBtn
        onClick={h}
        dataSession="view_menu"
        competitorId={competitor._id}
        title={detailTitle}
        ariaLabel={detailTitle}
      />
    </div>
  );
};

export default Competitors_table_row_menu;

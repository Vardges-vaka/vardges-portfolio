import "../../../_styles/competitors_table_row_contact.css";
import Competitors_table_row_openIconBtn from "./Competitors_table_row_openIconBtn.jsx";

const Competitors_table_row_contact = ({ competitor, handlers, t }) => {
  const h = handlers?.handleCompetitorTableAction;
  const detailTitle = t
    ? t("tableRow.detailContact", { defaultValue: "Contact details" })
    : "Contact details";

  return (
    <div className="Competitors_table_row_contact">
      <Competitors_table_row_openIconBtn
        onClick={h}
        dataSession="view_contact"
        competitorId={competitor._id}
        title={detailTitle}
        ariaLabel={detailTitle}
      />
    </div>
  );
};

export default Competitors_table_row_contact;

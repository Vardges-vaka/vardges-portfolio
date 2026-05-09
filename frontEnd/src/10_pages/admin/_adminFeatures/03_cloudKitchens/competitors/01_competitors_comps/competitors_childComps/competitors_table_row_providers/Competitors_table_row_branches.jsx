import "../../../_styles/competitors_table_row_branches.css";
import { getCompetitorBranchesCount } from "../../../02_competitors_helpers/_competitors_helpers.index.js";
import Competitors_table_row_openIconBtn from "./Competitors_table_row_openIconBtn.jsx";

const Competitors_table_row_branches = ({ competitor, handlers, t }) => {
  const h = handlers?.handleCompetitorTableAction;
  const n = getCompetitorBranchesCount(competitor?.branches);
  const detailTitle = t
    ? t("tableRow.detailBranches", { defaultValue: "Branches map" })
    : "Branches map";

  return (
    <div className="competitors_table_row_branches">
      <span className="competitors_table_row_branches__count">
        {n == null ? "—" : n}
      </span>
      <Competitors_table_row_openIconBtn
        onClick={h}
        dataSession="view_branches"
        competitorId={competitor._id}
        title={detailTitle}
        ariaLabel={detailTitle}
      />
    </div>
  );
};

export default Competitors_table_row_branches;

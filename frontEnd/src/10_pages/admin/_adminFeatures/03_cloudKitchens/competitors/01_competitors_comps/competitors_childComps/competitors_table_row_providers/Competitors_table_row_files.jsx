import "../../../_styles/competitors_table_row_files.css";
import {
  getCompetitorFilesCount,
} from "../../../02_competitors_helpers/_competitors_helpers.index.js";

const Competitors_table_row_files = ({ competitor, handlers, t }) => {
  const h = handlers?.handleCompetitorTableAction;
  const n = getCompetitorFilesCount(competitor?.files);
  const label = t ? t("tableRow.filesOpen", { count: n }) : `Open files (${n} total)`;

  return (
    <div className="Competitors_table_row_files">
      <button
        type="button"
        className="Competitors_table_row_files_btn"
        data-session="view_files"
        data-competitor-id={competitor._id}
        data-editing="false"
        onClick={h}
        title={label}
        aria-label={label}>
        <span className="Competitors_table_row_files_count">{n}</span>
      </button>
    </div>
  );
};

export default Competitors_table_row_files;

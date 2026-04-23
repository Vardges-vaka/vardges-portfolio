import "../../_styles/branches_item.css";

const Branches_list_item = ({ branch, isSelected, onSelect, onDelete, t }) => {
  return (
    <div
      className={`branchesListItem${isSelected ? " branchesListItem--selected" : ""}`}
      onClick={() => onSelect(branch)}
    >
      <span className="branchesListItem__name">{branch.name}</span>
      <div className="branchesListItem__actions">
        <button
          className="branchesListItem__editBtn"
          onClick={(e) => { e.stopPropagation(); onSelect(branch); }}
        >
          {t("edit")}
        </button>
        <button
          className="branchesListItem__deleteBtn"
          onClick={(e) => { e.stopPropagation(); onDelete(branch._id); }}
        >
          {t("delete")}
        </button>
      </div>
    </div>
  );
};

export default Branches_list_item;

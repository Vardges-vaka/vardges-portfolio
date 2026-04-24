import "../../_styles/branches_item.css";

// List row for a single branch. Four actions:
//   View       → opens detail view (read mode)
//   Edit       → opens detail view in bulk-edit mode (all sections unlocked)
//   Add Files  → placeholder (future S3 flow)
//   Add Cov.   → placeholder (future map/coverage flow)
//
// Delete has been intentionally moved into the detail view footer.
const Branches_list_item = ({
  branch,
  onView,
  onEdit,
  onAddFiles,
  onAddCoverage,
  t,
}) => {
  const isActive = branch?.operations?.isActive !== false;
  const address = branch?.location?.address || t("empty.noValue");

  return (
    <div className="branchesListItem">
      <div className="branchesListItem__main">
        <div className="branchesListItem__nameBlock">
          <span className="branchesListItem__name">{branch.name}</span>
          <span
            className={
              "branchesListItem__badge" +
              (isActive
                ? " branchesListItem__badge--active"
                : " branchesListItem__badge--inactive")
            }
          >
            {isActive ? t("badges.active") : t("badges.inactive")}
          </span>
        </div>
        <span className="branchesListItem__address">{address}</span>
      </div>

      <div className="branchesListItem__actions">
        <button
          type="button"
          className="branchesListItem__btn branchesListItem__btn--primary"
          onClick={() => onView(branch._id)}
        >
          {t("actions.view")}
        </button>
        <button
          type="button"
          className="branchesListItem__btn"
          onClick={() => onEdit(branch._id)}
        >
          {t("actions.edit")}
        </button>
        <button
          type="button"
          className="branchesListItem__btn"
          onClick={() => onAddFiles(branch._id)}
          title={t("viewModes.comingSoon")}
        >
          {t("actions.addFiles")}
        </button>
        <button
          type="button"
          className="branchesListItem__btn"
          onClick={() => onAddCoverage(branch._id)}
          title={t("viewModes.comingSoon")}
        >
          {t("actions.addCoverage")}
        </button>
      </div>
    </div>
  );
};

export default Branches_list_item;

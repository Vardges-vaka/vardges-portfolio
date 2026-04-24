import "../_styles/branches_viewToggle.css";

const MODES = ["list", "table", "map"];

const Branches_viewToggle = ({ viewMode, onChange, t }) => {
  return (
    <div
      className="branchesViewToggle"
      role="tablist"
      aria-label={t("viewModes.list")}
    >
      {MODES.map((mode) => {
        const isActive = viewMode === mode;
        const isPlaceholder = mode !== "list";
        return (
          <button
            key={mode}
            type="button"
            role="tab"
            aria-selected={isActive}
            title={isPlaceholder ? t("viewModes.comingSoon") : undefined}
            className={
              "branchesViewToggle__btn" +
              (isActive ? " branchesViewToggle__btn--active" : "")
            }
            onClick={() => onChange(mode)}
          >
            {t(`viewModes.${mode}`)}
            {isPlaceholder && (
              <span className="branchesViewToggle__badge">
                {t("viewModes.comingSoon")}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Branches_viewToggle;

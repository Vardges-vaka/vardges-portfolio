import { Menus_detail_sectionShell } from "./_menus_childComps.index.js";
import "../../_styles/menus_detail_picker.css";

const Menus_detail_branches = (props) => {
  const { menu, draft, branchesList, onIdToggle, t } = props;

  const selectedIds = Array.isArray(draft) ? draft : [];
  const readonlyBranches = Array.isArray(menu?.branches) ? menu.branches : [];

  return (
    <Menus_detail_sectionShell
      {...props}
      rootClass="menusDetailBranches"
      title={t("sections.branches")}
      renderReadonly={() => (
        <div className="menusDetailPicker__readonly">
          {readonlyBranches.length === 0 && (
            <p className="menusDetailPicker__empty">{t("pickers.noBranches")}</p>
          )}
          <div className="menusDetailPicker__chips">
            {readonlyBranches.map((branch) => (
              <span key={branch._id || branch} className="menusDetailPicker__chip">
                {branch?.name || branch._id || branch}
              </span>
            ))}
          </div>
        </div>
      )}
      renderEditable={() => (
        <div className="menusDetailPicker__edit">
          {branchesList.length === 0 && (
            <p className="menusDetailPicker__empty">{t("pickers.noBranches")}</p>
          )}
          <div className="menusDetailPicker__chips">
            {branchesList.map((branch) => {
              const id = branch._id;
              const isSelected = selectedIds.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  className={
                    "menusDetailPicker__chip" +
                    (isSelected ? " menusDetailPicker__chip--selected" : "")
                  }
                  onClick={() => onIdToggle(id)}
                >
                  {branch?.name || id}
                </button>
              );
            })}
          </div>
        </div>
      )}
    />
  );
};

export default Menus_detail_branches;

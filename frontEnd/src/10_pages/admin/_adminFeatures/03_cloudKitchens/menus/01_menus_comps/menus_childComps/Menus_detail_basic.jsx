import { Menus_detail_sectionShell } from "./_menus_childComps.index.js";
import "../../_styles/menus_detail_basic.css";

const Menus_detail_basic = (props) => {
  const { menu, draft, onDraftChange, t } = props;
  const editable = draft ?? {};

  return (
    <Menus_detail_sectionShell
      {...props}
      rootClass="menusDetailBasic"
      title={t("sections.basic")}
      renderReadonly={() => (
        <div className="menusDetailBasic__readonly">
          <p>
            <strong>{t("fields.isActive")}:</strong>{" "}
            {menu?.isActive !== false ? t("badges.yes") : t("badges.no")}
          </p>
        </div>
      )}
      renderEditable={() => (
        <div className="menusDetailBasic__form">
          <label className="menusDetailBasic__toggle">
            <input
              type="checkbox"
              checked={editable.isActive !== false}
              onChange={(event) => onDraftChange("isActive", event.target.checked)}
            />
            <span>{t("fields.isActive")}</span>
          </label>
        </div>
      )}
    />
  );
};

export default Menus_detail_basic;

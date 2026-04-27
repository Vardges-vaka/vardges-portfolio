import { MenuCategories_detail_sectionShell } from "./_menuCategories_childComps.index.js";
import "../../_styles/menuCategories_detail_basic.css";

const errorText = (t, code) => (code ? t(`validation.${code}`) : null);

const MenuCategories_detail_basic = (props) => {
  const {
    category,
    draft,
    fieldErrors,
    onDraftChange,
    onWindowAdd,
    onWindowRemove,
    onWindowChange,
    t,
  } = props;

  const editable = draft ?? {};
  const timings = editable.activeTimings ?? {};
  const windows = Array.isArray(timings.windows) ? timings.windows : [];

  return (
    <MenuCategories_detail_sectionShell
      {...props}
      rootClass="menuCategoriesDetailBasic"
      title={t("sections.basic")}
      renderReadonly={() => (
        <div className="menuCategoriesDetailBasic__readonly">
          <p>
            <strong>{t("fields.isActive")}:</strong>{" "}
            {category?.isActive !== false ? t("badges.yes") : t("badges.no")}
          </p>
          <p>
            <strong>{t("activeTimings.title")}:</strong>{" "}
            {category?.activeTimings?.isAlwaysActive !== false
              ? t("activeTimings.always")
              : t("activeTimings.custom")}
          </p>
          {category?.activeTimings?.isAlwaysActive === false &&
            Array.isArray(category?.activeTimings?.windows) &&
            category.activeTimings.windows.map((win, i) => (
              <p key={i} className="menuCategoriesDetailBasic__window">
                {win.label ? `${win.label}: ` : ""}
                {win.from || "?"} – {win.to || "?"}
              </p>
            ))}
        </div>
      )}
      renderEditable={() => (
        <div className="menuCategoriesDetailBasic__form">
          <label className="menuCategoriesDetailBasic__toggle">
            <input
              type="checkbox"
              checked={editable.isActive !== false}
              onChange={(event) => onDraftChange("isActive", event.target.checked)}
            />
            <span>{t("fields.isActive")}</span>
          </label>

          <label className="menuCategoriesDetailBasic__toggle">
            <input
              type="checkbox"
              checked={timings.isAlwaysActive !== false}
              onChange={(event) =>
                onDraftChange("activeTimings.isAlwaysActive", event.target.checked)
              }
            />
            <span>{t("activeTimings.alwaysActive")}</span>
          </label>

          {timings.isAlwaysActive === false && (
            <div className="menuCategoriesDetailBasic__windows">
              {windows.map((win, i) => (
                <div key={i} className="menuCategoriesDetailBasic__windowRow">
                  <input
                    value={win.label ?? ""}
                    onChange={(e) => onWindowChange(i, "label", e.target.value)}
                    placeholder={t("activeTimings.label")}
                  />
                  <input
                    type="time"
                    value={win.from ?? ""}
                    onChange={(e) => onWindowChange(i, "from", e.target.value)}
                  />
                  <input
                    type="time"
                    value={win.to ?? ""}
                    onChange={(e) => onWindowChange(i, "to", e.target.value)}
                  />
                  <button
                    type="button"
                    className="menuCategoriesDetailBasic__removeBtn"
                    onClick={() => onWindowRemove(i)}
                  >
                    {t("actions.removeRow")}
                  </button>
                  {fieldErrors?.[`activeTimings.windows[${i}].from`] && (
                    <small>{errorText(t, fieldErrors[`activeTimings.windows[${i}].from`])}</small>
                  )}
                  {fieldErrors?.[`activeTimings.windows[${i}].to`] && (
                    <small>{errorText(t, fieldErrors[`activeTimings.windows[${i}].to`])}</small>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="menuCategoriesDetailBasic__addBtn"
                onClick={onWindowAdd}
              >
                + {t("activeTimings.addWindow")}
              </button>
            </div>
          )}
        </div>
      )}
    />
  );
};

export default MenuCategories_detail_basic;

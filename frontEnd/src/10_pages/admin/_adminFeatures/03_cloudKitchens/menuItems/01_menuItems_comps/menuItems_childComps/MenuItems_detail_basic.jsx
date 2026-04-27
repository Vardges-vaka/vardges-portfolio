import { MenuItems_detail_sectionShell } from "./_menuItems_childComps.index.js";
import "../../_styles/menuItems_detail_basic.css";

const errorText = (t, code) => (code ? t(`validation.${code}`) : null);

const MenuItems_detail_basic = (props) => {
  const { menuItem, draft, fieldErrors, onDraftChange, t } = props;
  const editable = draft ?? {};

  return (
    <MenuItems_detail_sectionShell
      {...props}
      rootClass="menuItemsDetailBasic"
      title={t("sections.basic")}
      renderReadonly={() => (
        <div className="menuItemsDetailBasic__readonly">
          <p>
            <strong>{t("fields.cost")}:</strong>{" "}
            {menuItem?.cost != null ? `$${menuItem.cost}` : t("empty.noValue")}
          </p>
          <p>
            <strong>{t("fields.sellingPrice")}:</strong>{" "}
            {menuItem?.sellingPrice != null ? `$${menuItem.sellingPrice}` : t("empty.noValue")}
          </p>
          <p>
            <strong>{t("fields.isActive")}:</strong>{" "}
            {menuItem?.isActive !== false ? t("badges.yes") : t("badges.no")}
          </p>
          <div className="menuItemsDetailBasic__timings">
            <strong>{t("activeTimings.title")}:</strong>
            {menuItem?.activeTimings?.isAlwaysActive !== false ? (
              <span> {t("activeTimings.alwaysActive")}</span>
            ) : (
              <ul className="menuItemsDetailBasic__windowList">
                {(menuItem?.activeTimings?.windows ?? []).map((win, i) => (
                  <li key={i}>
                    {win.label && <strong>{win.label}: </strong>}
                    {win.from || "?"} – {win.to || "?"}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
      renderEditable={() => (
        <div className="menuItemsDetailBasic__form">
          <label className="menuItemsDetailBasic__field">
            <span>{t("fields.cost")}</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={editable.cost ?? ""}
              onChange={(e) => onDraftChange("cost", parseFloat(e.target.value) || 0)}
            />
            {fieldErrors?.cost && <small>{errorText(t, fieldErrors.cost)}</small>}
          </label>
          <label className="menuItemsDetailBasic__field">
            <span>{t("fields.sellingPrice")}</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={editable.sellingPrice ?? ""}
              onChange={(e) => onDraftChange("sellingPrice", parseFloat(e.target.value) || 0)}
            />
            {fieldErrors?.sellingPrice && <small>{errorText(t, fieldErrors.sellingPrice)}</small>}
          </label>
          <label className="menuItemsDetailBasic__toggle">
            <input
              type="checkbox"
              checked={editable.isActive !== false}
              onChange={(e) => onDraftChange("isActive", e.target.checked)}
            />
            <span>{t("fields.isActive")}</span>
          </label>

          <div className="menuItemsDetailBasic__timingsEdit">
            <label className="menuItemsDetailBasic__toggle">
              <input
                type="checkbox"
                checked={editable.activeTimings?.isAlwaysActive !== false}
                onChange={(e) => onDraftChange("activeTimings.isAlwaysActive", e.target.checked)}
              />
              <span>{t("activeTimings.alwaysActive")}</span>
            </label>

            {editable.activeTimings?.isAlwaysActive === false && (
              <div className="menuItemsDetailBasic__windows">
                {(editable.activeTimings?.windows ?? []).map((win, i) => (
                  <div key={i} className="menuItemsDetailBasic__windowRow">
                    <input
                      placeholder={t("activeTimings.label")}
                      value={win.label ?? ""}
                      onChange={(e) => onDraftChange(`activeTimings.windows.${i}.label`, e.target.value)}
                    />
                    <input
                      type="time"
                      value={win.from ?? ""}
                      onChange={(e) => onDraftChange(`activeTimings.windows.${i}.from`, e.target.value)}
                    />
                    <input
                      type="time"
                      value={win.to ?? ""}
                      onChange={(e) => onDraftChange(`activeTimings.windows.${i}.to`, e.target.value)}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  className="menuItemsDetailBasic__addWindowBtn"
                  onClick={() => {
                    const windows = [...(editable.activeTimings?.windows ?? []), { label: "", from: "", to: "" }];
                    onDraftChange("activeTimings.windows", windows);
                  }}
                >
                  + {t("activeTimings.addWindow")}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    />
  );
};

export default MenuItems_detail_basic;

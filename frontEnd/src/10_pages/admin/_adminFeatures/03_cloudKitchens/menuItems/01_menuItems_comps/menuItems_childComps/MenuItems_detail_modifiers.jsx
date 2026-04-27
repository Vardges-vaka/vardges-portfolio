import { MenuItems_detail_sectionShell } from "./_menuItems_childComps.index.js";
import "../../_styles/menuItems_detail_modifiers.css";

const MenuItems_detail_modifiers = (props) => {
  const { menuItem, draft, modifiersList, onModifierToggle, t } = props;
  const selected = Array.isArray(draft) ? draft : [];
  const allMods = Array.isArray(modifiersList) ? modifiersList : [];

  const resolveModName = (mod) => {
    if (typeof mod === "string") {
      const found = allMods.find((m) => m._id === mod);
      return found?.name?.en || mod;
    }
    return mod?.name?.en || mod?._id || "?";
  };

  return (
    <MenuItems_detail_sectionShell
      {...props}
      rootClass="menuItemsDetailModifiers"
      title={t("sections.modifiers")}
      renderReadonly={() => {
        const mods = menuItem?.modifiers ?? [];
        if (mods.length === 0) {
          return <p className="menuItemsDetailModifiers__empty">{t("empty.noModifiers")}</p>;
        }
        return (
          <div className="menuItemsDetailModifiers__chips">
            {mods.map((mod, i) => (
              <span key={mod?._id || i} className="menuItemsDetailModifiers__chip">
                {resolveModName(mod)}
              </span>
            ))}
          </div>
        );
      }}
      renderEditable={() => {
        if (allMods.length === 0) {
          return <p className="menuItemsDetailModifiers__empty">{t("empty.noModifiersAvailable")}</p>;
        }
        return (
          <div className="menuItemsDetailModifiers__picker">
            {allMods.map((mod) => {
              const id = mod._id;
              const isSelected = selected.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  className={
                    "menuItemsDetailModifiers__chip" +
                    (isSelected ? " menuItemsDetailModifiers__chip--selected" : "")
                  }
                  onClick={() => onModifierToggle(id)}
                >
                  {mod.name?.en || id}
                </button>
              );
            })}
          </div>
        );
      }}
    />
  );
};

export default MenuItems_detail_modifiers;

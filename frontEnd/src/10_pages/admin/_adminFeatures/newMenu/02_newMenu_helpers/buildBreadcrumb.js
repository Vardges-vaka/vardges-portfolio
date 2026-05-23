import { SESSION_LABELS } from "../05_newMenu_cnst/_newMenu_cnst.index.js";

/* ============================================================================
   buildBreadcrumb — derives the breadcrumb trail from session + viewingType +
   selected entity. The last crumb is non-clickable (current location).

   Output: array of { key, label, onClick? }
============================================================================ */

const getSelectedLabel = (states) => {
  if (states.viewingType !== "single") return null;
  switch (states.session) {
    case "menus":
      return states.selectedMenu?.label || states.selectedMenuId || "Detail";
    case "items":
      return (
        states.selectedItem?.name?.label ||
        states.selectedItem?.name ||
        states.selectedItemId ||
        "Detail"
      );
    case "modifiers":
      return (
        states.selectedModifier?.title?.label ||
        states.selectedModifierId ||
        "Detail"
      );
    case "options":
      return (
        states.selectedOption?.name?.label ||
        states.selectedOptionId ||
        "Detail"
      );
    default:
      return "Detail";
  }
};

export const buildBreadcrumb = ({ states, handlers, t }) => {
  const tr = (key, fallback) => (t ? t(`breadcrumb.${key}`, { defaultValue: fallback }) : fallback);

  const trail = [
    {
      key: "menus",
      label: tr("menus", SESSION_LABELS.menus),
      onClick: () => handlers.goto("menus", "all", null),
    },
  ];

  if (states.session !== "menus") {
    trail.push({
      key: states.session,
      label: tr(states.session, SESSION_LABELS[states.session] || states.session),
      onClick: () => handlers.goto(states.session, "all", null),
    });
  }

  if (states.viewingType === "single") {
    trail.push({
      key: "selected",
      label: getSelectedLabel(states),
    });
  }

  return trail;
};

export { getSelectedLabel };

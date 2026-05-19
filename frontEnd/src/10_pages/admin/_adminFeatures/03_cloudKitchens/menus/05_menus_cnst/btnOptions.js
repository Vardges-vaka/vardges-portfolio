import {
  Competitors_Icon,
  Brands_Icon,
} from "../../../../../../01_components/_components.index.js";
const BTN_VIEWING_SESSIONS = (session) => {
  return [
    {
      value: "menus",
      label: "Menus",
      isActive: session === "menus",
    },
    {
      value: "items",
      label: "Items",
      isActive: session === "items",
    },
    {
      value: "modifiers",
      label: "Modifiers",
      isActive: session === "modifiers",
    },
    {
      value: "options",
      label: "Options",
      isActive: session === "options",
    },
  ];
};
const BTN_OWNER_TYPES = (ownerType) => {
  const brandOn = ownerType === "brand" || ownerType === "both";
  const competitorOn = ownerType === "competitor" || ownerType === "both";

  return [
    {
      value: "brand",
      label: "Brand",
      isActive: brandOn,
      showIndicator: brandOn,
      icon: () => Brands_Icon(),
    },
    {
      value: "competitor",
      label: "Competitor",
      isActive: competitorOn,
      showIndicator: competitorOn,
      icon: () => Competitors_Icon(),
    },
  ];
};

export { BTN_VIEWING_SESSIONS, BTN_OWNER_TYPES };

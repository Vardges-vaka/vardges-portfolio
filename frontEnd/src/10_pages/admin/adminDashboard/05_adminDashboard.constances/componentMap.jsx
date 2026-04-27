import React, { useMemo, lazy, Suspense, useCallback } from "react";

export const componentMap = {
  vkusno: {
    vkusno_daily_sales: lazy(
      () => import("../../_adminFeatures/01_vkusno/dailySales/DailySales.jsx"),
    ),
  },
  me: {
    Ai: lazy(() => import("../../_adminFeatures/02_me/ai/Ai.jsx")),
    Health: lazy(() => import("../../_adminFeatures/02_me/health/Health.jsx")),
  },
  cloudKitchens: {
    cloudKitchens_branches: lazy(
      () => import("../../_adminFeatures/03_cloudKitchens/branches/Branches.jsx"),
    ),
    cloudKitchens_brands: lazy(
      () => import("../../_adminFeatures/03_cloudKitchens/brands/Brands.jsx"),
    ),
    cloudKitchens_employees: lazy(
      () => import("../../_adminFeatures/03_cloudKitchens/employees/Employees.jsx"),
    ),
    cloudKitchens_modifiers: lazy(
      () => import("../../_adminFeatures/03_cloudKitchens/modifiers/Modifiers.jsx"),
    ),
    cloudKitchens_menus: lazy(
      () => import("../../_adminFeatures/03_cloudKitchens/menus/Menus.jsx"),
    ),
    cloudKitchens_menuCategories: lazy(
      () => import("../../_adminFeatures/03_cloudKitchens/menuCategories/MenuCategories.jsx"),
    ),
    cloudKitchens_menuItems: lazy(
      () => import("../../_adminFeatures/03_cloudKitchens/menuItems/MenuItems.jsx"),
    ),
  },
  settings: {
    adminAcount: lazy(
      () =>
        import("../../_adminFeatures/00_settings/adminAccount/AdminAccount.jsx"),
    ),
    serverSettings: lazy(
      () =>
        import("../../_adminFeatures/00_settings/serverSettings/ServerSettings.jsx"),
    ),
    siteManagment: lazy(
      () =>
        import("../../_adminFeatures/00_settings/siteManagment/SiteManagment.jsx"),
    ),
    adminSettings: lazy(
      () =>
        import("../../_adminFeatures/00_settings/adminSettings/AdminSettings.jsx"),
    ),
  },
};

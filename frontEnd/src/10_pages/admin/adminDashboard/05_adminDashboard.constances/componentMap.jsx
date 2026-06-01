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
      () =>
        import("../../_adminFeatures/03_cloudKitchens/branches/Branches.jsx"),
    ),
    cloudKitchens_brands: lazy(
      () => import("../../_adminFeatures/03_cloudKitchens/brands/Brands.jsx"),
    ),
    cloudKitchens_employees: lazy(
      () =>
        import("../../_adminFeatures/03_cloudKitchens/employees/Employees.jsx"),
    ),
    cloudKitchens_menus: lazy(
      () =>
        import("../../_adminFeatures/03_cloudKitchens/claudeMenus/Menus.jsx"),
    ),
    cloudKitchens_newMenu: lazy(
      () => import("../../_adminFeatures/newMenu/NewMenu.jsx"),
    ),
    cloudKitchens_competitors: lazy(
      () =>
        import("../../_adminFeatures/03_cloudKitchens/competitors/Competitors.jsx"),
    ),
  },
  cloudKitchens_new: {
    cK_dashboard: lazy(
      () =>
        import("../../_adminFeatures/04_cloudKitchens_new/cK_dashboard/CK_dashboard.jsx"),
    ),
    cK_mapStudio: lazy(
      () =>
        import("../../_adminFeatures/04_cloudKitchens_new/cK_mapStudio/CK_mapStudio.jsx"),
    ),
    cK_simulation: lazy(
      () =>
        import("../../_adminFeatures/04_cloudKitchens_new/cK_simulation/CK_simulation.jsx"),
    ),
    cK_salesAndOrders: lazy(
      () =>
        import("../../_adminFeatures/04_cloudKitchens_new/cK_salesAndOrders/CK_salesAndOrders.jsx"),
    ),
    cK_menus: lazy(
      () =>
        import("../../_adminFeatures/04_cloudKitchens_new/cK_menus/CK_menus.jsx"),
    ),
    cK_recipesAndStock: lazy(
      () =>
        import("../../_adminFeatures/04_cloudKitchens_new/cK_recipesAndStock/CK_recipesAndStock.jsx"),
    ),
    cK_marketing: lazy(
      () =>
        import("../../_adminFeatures/04_cloudKitchens_new/cK_marketing/CK_marketing.jsx"),
    ),
    cK_competitors: lazy(
      () =>
        import("../../_adminFeatures/04_cloudKitchens_new/cK_competitors/CK_competitors.jsx"),
    ),
    cK_kitchens: lazy(
      () =>
        import("../../_adminFeatures/04_cloudKitchens_new/cK_kitchens/CK_kitchens.jsx"),
    ),
    cK_setup: lazy(
      () =>
        import("../../_adminFeatures/04_cloudKitchens_new/cK_setup/CK_setup.jsx"),
    ),
  },

  settings: {
    emailEngines: lazy(
      () =>
        import("../../_adminFeatures/00_settings/emailEngines/EmailEngines.jsx"),
    ),
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
    cloudStorage: lazy(
      () =>
        import("../../_adminFeatures/00_settings/cloudStorage/CloudStorage.jsx"),
    ),
  },
};

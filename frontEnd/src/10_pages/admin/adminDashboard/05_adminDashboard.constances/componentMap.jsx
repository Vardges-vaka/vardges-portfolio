import React, { useMemo, lazy, Suspense, useCallback } from "react";

export const componentMap = {
  me: {
    Ai: lazy(() => import("../../_adminFeatures/01_me/ai/Ai.jsx")),
    Health: lazy(() => import("../../_adminFeatures/01_me/health/Health.jsx")),
  },
  work_planning: {
    Calendar: lazy(() =>
      import("../../_adminFeatures/02_work_planning/calendar/Calendar.jsx")
    ),
    Countdown: lazy(() =>
      import("../../_adminFeatures/02_work_planning/countdown/Countdown.jsx")
    ),
    Projects: lazy(() =>
      import("../../_adminFeatures/02_work_planning/projects/Projects.jsx")
    ),
    To_do_list: lazy(() =>
      import("../../_adminFeatures/02_work_planning/to_do_list/To_do_list.jsx")
    ),
    TravelPlanner: lazy(() =>
      import(
        "../../_adminFeatures/02_work_planning/travelPlanner/TravelPlanner.jsx"
      )
    ),
  },
  Business_docs: {
    CV_Generator: lazy(() =>
      import(
        "../../_adminFeatures/03_business_docs/CV_Generator/CV_Generator.jsx"
      )
    ),
    EmailTools: lazy(() =>
      import("../../_adminFeatures/03_business_docs/emailTools/EmailTools.jsx")
    ),
    ExcelGenerator: lazy(() =>
      import(
        "../../_adminFeatures/03_business_docs/excelGenerator/ExcelGenerator.jsx"
      )
    ),
    FinTracker: lazy(() =>
      import("../../_adminFeatures/03_business_docs/finTracker/FinTracker.jsx")
    ),
    PDF_image_Formatting: lazy(() =>
      import(
        "../../_adminFeatures/03_business_docs/PDF_image_Formatting/PDF_image_Formatting.jsx"
      )
    ),
  },
  Assets_storage: {
    CloudStorage: lazy(() =>
      import(
        "../../_adminFeatures/04_assets_storage/cloudStorage/CloudStorage.jsx"
      )
    ),
    Vault: lazy(() =>
      import("../../_adminFeatures/04_assets_storage/vault/Vault.jsx")
    ),
    PersonalGallery: lazy(() =>
      import(
        "../../_adminFeatures/04_assets_storage/personalGallery/PersonalGallery.jsx"
      )
    ),
    PswManager: lazy(() =>
      import("../../_adminFeatures/04_assets_storage/pswManager/PswManager.jsx")
    ),
  },
  tools: {
    MapTools: lazy(() =>
      import("../../_adminFeatures/05_tools/mapTools/MapTools.jsx")
    ),
    QRCode: lazy(() =>
      import("../../_adminFeatures/05_tools/QRCode/QRCode.jsx")
    ),
    TemplateGenerator: lazy(() =>
      import(
        "../../_adminFeatures/05_tools/templateGenerator/TemplateGenerator.jsx"
      )
    ),
    WordCounter: lazy(() =>
      import("../../_adminFeatures/05_tools/wordCounter/WordCounter.jsx")
    ),
  },
  Brand_product: {
    BrandDevelopment: lazy(() =>
      import(
        "../../_adminFeatures/06_brand_product/brandDevelopment/BrandDevelopment.jsx"
      )
    ),
    BrandPortfolio: lazy(() =>
      import(
        "../../_adminFeatures/06_brand_product/brandPortfolio/BrandPortfolio.jsx"
      )
    ),
    BrandBook: lazy(() =>
      import("../../_adminFeatures/06_brand_product/brandBook/BrandBook.jsx")
    ),
    MenuDevelopment: lazy(() =>
      import(
        "../../_adminFeatures/06_brand_product/menuDevelopment/MenuDevelopment.jsx"
      )
    ),
    CocktailDevelopment: lazy(() =>
      import(
        "../../_adminFeatures/06_brand_product/cocktailDevelopment/CocktailDevelopment.jsx"
      )
    ),
  },
  settings: {
    adminAcount: lazy(() =>
      import("../../_adminFeatures/00_settings/adminAccount/AdminAccount.jsx")
    ),
    serverSettings: lazy(() =>
      import(
        "../../_adminFeatures/00_settings/serverSettings/ServerSettings.jsx"
      )
    ),
    siteManagment: lazy(() =>
      import("../../_adminFeatures/00_settings/siteManagment/SiteManagment.jsx")
    ),
    adminSettings: lazy(() =>
      import("../../_adminFeatures/00_settings/adminSettings/AdminSettings.jsx")
    ),
  },
};

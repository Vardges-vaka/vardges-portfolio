import {
  SiteManagment_icon,
  AdminAccount_icon,
  AdminSettings_icon,
  ServerSettings_icon,
  Ai_icon,
  Health_icon,
  Calendar_icon,
  Countdown_icon,
  Projects_icon,
  To_do_list_icon,
  TravelPlanner_icon,
  CV_Generator_icon,
  EmailTools_icon,
  ExcelGenerator_icon,
  FinTracker_icon,
  PDF_image_Formatting_icon,
  CloudStorage_icon,
  Vault_icon,
  PersonalGallery_icon,
  PswManager_icon,
  MapTools_icon,
  QRCode_icon,
  TemplateGenerator_icon,
  WordCounter_icon,
  BrandBook_icon,
  BrandDevelopment_icon,
  BrandPortfolio_icon,
  CocktailDevelopment_icon,
  MenuDevelopment_icon,
} from "../../../../01_components/components.index.js";

const settings_SIdeBar = (t) => {
  [
    {
      label: t("adminAcount"),
      path: "",
      icon: AdminAccount_icon,
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
    {
      label: t("serverSettings"),
      path: "",
      icon: ServerSettings_icon,
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
    {
      label: t("siteManagment"),
      path: "",
      icon: SiteManagment_icon,
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
    {
      label: t("adminSettings"),
      path: "",
      icon: AdminSettings_icon,
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
  ];
};

export default settings_SIdeBar;

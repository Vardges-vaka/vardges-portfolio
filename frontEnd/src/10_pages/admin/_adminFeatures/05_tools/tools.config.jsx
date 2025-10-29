import {
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
} from "../../../../01_components/components.index.js";

const tools_SideBar = (t) => {
  return [
    {
      label: t("MapTools"),
      path: "MapTools",
      icon: MapTools_icon(),
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
    {
      label: t("QRCode"),
      path: "QRCode",
      icon: QRCode_icon(),
      access: ["user", "admin", "superAdmin"],
      isDefault: false,
    },
    {
      label: t("TemplateGenerator"),
      path: "TemplateGenerator",
      icon: TemplateGenerator_icon(),
      access: ["user", "admin", "superAdmin"],
      isDefault: false,
    },
    {
      label: t("WordCounter"),
      path: "WordCounter",
      icon: WordCounter_icon(),
      access: ["user", "admin", "superAdmin"],
      isDefault: false,
    },
  ];
};

export default tools_SideBar;

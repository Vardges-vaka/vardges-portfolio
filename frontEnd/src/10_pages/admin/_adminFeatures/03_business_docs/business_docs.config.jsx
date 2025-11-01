import {
  CV_Generator_icon,
  EmailTools_icon,
  ExcelGenerator_icon,
  FinTracker_icon,
  PDF_image_Formatting_icon,
} from "../../../../01_components/components.index.js";

const business_docs_SideBar = (t) => {
  return [
    {
      label: t("CV_Generator"),
      path: "CV_Generator",
      icon: CV_Generator_icon(),
      access: ["user", "admin", "superAdmin"],
      isDefault: false,
    },
    {
      label: t("EmailTools"),
      path: "EmailTools",
      icon: EmailTools_icon(),
      access: ["user", "admin", "superAdmin"],
      isDefault: false,
    },
    {
      label: t("ExcelGenerator"),
      path: "ExcelGenerator",
      icon: ExcelGenerator_icon(),
      access: ["user", "admin", "superAdmin"],
      isDefault: false,
    },
    {
      label: t("FinTracker"),
      path: "FinTracker",
      icon: FinTracker_icon(),
      access: ["user", "admin", "superAdmin"],
      isDefault: false,
    },
    {
      label: t("PDF_image_Formatting"),
      path: "PDF_image_Formatting",
      icon: PDF_image_Formatting_icon(),
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
  ];
};

export default business_docs_SideBar;

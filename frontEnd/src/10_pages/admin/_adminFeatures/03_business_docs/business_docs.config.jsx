import {
  CV_Generator_icon,
  EmailTools_icon,
  ExcelGenerator_icon,
  FinTracker_icon,
  PDF_image_Formatting_icon,
} from "../../../../01_components/components.index.js";

const business_docs_SideBar = (t) => {
  [
    {
      label: t("CV_Generator"),
      path: "",
      icon: CV_Generator_icon,
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
    {
      label: t("EmailTools"),
      path: "",
      icon: EmailTools_icon,
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
    {
      label: t("ExcelGenerator"),
      path: "",
      icon: ExcelGenerator_icon,
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
    {
      label: t("FinTracker"),
      path: "",
      icon: FinTracker_icon,
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
    {
      label: t("PDF_image_Formatting"),
      path: "",
      icon: PDF_image_Formatting_icon,
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
  ];
};

export default business_docs_SideBar;

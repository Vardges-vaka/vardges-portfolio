import React from "react";
import {
  Me_Icons,
  Tools_Icons,
  Work_planning_Icons,
  Business_docs_Icons,
  Assets_storage_Icons,
  Brand_product_Icons,
} from "../../../../01_components/components.index.js";

import "../_styles/adminHeader_NavBar.css";

const AdminNavBar_Items = (t) => {
  return [
    {
      label: t("me"),
      icon: Me_Icons(),
      to: "me",
    },
    {
      label: t("Tools_"),
      icon: Tools_Icons(),
      to: "tools",
    },
    {
      label: t("Work_planning"),
      icon: Work_planning_Icons(),
      to: "work_planning",
    },
    {
      label: t("Business_docs"),
      icon: Business_docs_Icons(),
      to: "Business_docs",
    },
    {
      label: t("Assets_storage"),
      icon: Assets_storage_Icons(),
      to: "Assets_storage",
    },
    {
      label: t("Brand_product"),
      icon: Brand_product_Icons(),
      to: "Brand_product",
    },
  ];
};

export default AdminNavBar_Items;

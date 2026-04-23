const cloudKitchens_SideBar = (t) => [
  {
    label: t("branches") || "Branches",
    path: "cloudKitchens_branches",
    icon: null,
    access: ["admin", "superAdmin"],
    isDefault: true,
  },
];

export default cloudKitchens_SideBar;

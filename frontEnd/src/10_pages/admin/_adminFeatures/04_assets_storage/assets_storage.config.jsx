import {
  CloudStorage_icon,
  Vault_icon,
  PersonalGallery_icon,
  PswManager_icon,
} from "../../../../01_components/components.index.js";

const assets_storage_SideBar = (t) => {
  [
    {
      label: t("CloudStorage"),
      path: "",
      icon: CloudStorage_icon,
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
    {
      label: t("Vault"),
      path: "",
      icon: Vault_icon,
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
    {
      label: t("PersonalGallery"),
      path: "",
      icon: PersonalGallery_icon,
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
    {
      label: t("PswManager"),
      path: "",
      icon: PswManager_icon,
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
  ];
};

export default assets_storage_SideBar;

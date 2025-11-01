import {
  CloudStorage_icon,
  Vault_icon,
  PersonalGallery_icon,
  PswManager_icon,
} from "../../../../01_components/components.index.js";

const assets_storage_SideBar = (t) => {
  return [
    {
      label: t("CloudStorage"),
      path: "CloudStorage",
      icon: CloudStorage_icon(),
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
    {
      label: t("Vault"),
      path: "Vault",
      icon: Vault_icon(),
      access: ["user", "admin", "superAdmin"],
      isDefault: false,
    },
    {
      label: t("PersonalGallery"),
      path: "PersonalGallery",
      icon: PersonalGallery_icon(),
      access: ["user", "admin", "superAdmin"],
      isDefault: false,
    },
    {
      label: t("PswManager"),
      path: "PswManager",
      icon: PswManager_icon(),
      access: ["user", "admin", "superAdmin"],
      isDefault: false,
    },
  ];
};

export default assets_storage_SideBar;

import {
  SiteManagment_icon,
  AdminAccount_icon,
  AdminSettings_icon,
  ServerSettings_icon,
  CloudStorage,
  EmailEngine_Icon,
  LinkTo_Icon,
} from "../../../../01_components/components.index.js";

const settings_SIdeBar = (t) => {
  return [
    {
      label: "Cloud Storage",
      path: "cloudStorage",
      icon: CloudStorage(),
      access: ["user", "admin", "superAdmin"],
      isDefault: false,
    },
    {
      label: "Email Engines",
      path: "emailEngines",
      icon: EmailEngine_Icon(),
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
    {
      label: "Admin Account",
      path: "adminAccount",
      icon: AdminAccount_icon(),
      access: ["user", "admin", "superAdmin"],
      isDefault: false,
    },

    {
      label: t("serverSettings"),
      path: "serverSettings",
      icon: LinkTo_Icon(),
      access: ["user", "admin", "superAdmin"],
      isDefault: false,
    },
    {
      label: t("siteManagment"),
      path: "siteManagment",
      icon: SiteManagment_icon(),
      access: ["user", "admin", "superAdmin"],
      isDefault: false,
    },
    {
      label: t("adminSettings"),
      path: "adminSettings",
      icon: AdminSettings_icon(),
      access: ["user", "admin", "superAdmin"],
      isDefault: false,
    },
  ];
};

export default settings_SIdeBar;

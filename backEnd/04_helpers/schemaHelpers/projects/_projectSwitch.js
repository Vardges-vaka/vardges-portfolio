import {
  webApp_schema,
  mobileApp_schema,
  desktopApp_schema,
  branding_schema,
  marketing_schema,
  advertizing_schema,
} from "../_schemaHelpers.index.js";

const projectSwitch = (type) => {
  switch (type) {
    case "Web App":
      return webApp_schema();
    case "Mobile App":
      return mobileApp_schema();
    case "Desktop App":
      return desktopApp_schema();
    case "Branding":
      return branding_schema();
    case "Marketing":
      return marketing_schema();
    case "Advertizing":
      return advertizing_schema();
  }
};

export default projectSwitch;

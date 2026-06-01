import {
  Me_Icons,
  AboutIcon,
  HospIcon,
  Projects_icon,
} from "../../../../01_components/components.index.js";
import "../_styles/adminHeader_NavBar.css";

const AdminNavBar_Items = (t) => {
  return [
    {
      label: "Cloud Kitchens",
      icon: Projects_icon(),
      to: "cloudKitchens",
    },
    {
      label: "Vkusno",
      icon: AboutIcon(),
      to: "vkusno",
    },
    {
      label: "New Cloud Kitchens",
      icon: Me_Icons(),
      to: "cloudKitchens_new",
    },
  ];
};

export default AdminNavBar_Items;

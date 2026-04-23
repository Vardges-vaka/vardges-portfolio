import {
  Me_Icons,
  AboutIcon,
} from "../../../../01_components/components.index.js";
import "../_styles/adminHeader_NavBar.css";

const AdminNavBar_Items = (t) => {
  return [
    {
      label: "Vkusno",
      icon: AboutIcon(),
      to: "vkusno",
    },
    {
      label: t("me"),
      icon: Me_Icons(),
      to: "me",
    },
  ];
};

export default AdminNavBar_Items;

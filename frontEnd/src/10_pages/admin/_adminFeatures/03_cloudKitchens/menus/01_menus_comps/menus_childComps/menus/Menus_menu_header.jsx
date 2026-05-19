import "../../../_styles/menus_childComps/menus/menus_menu_header.css";
import { formatDate } from "../../../02_menus_helpers/_menus_helpers.index.js";
const Menus_menu_header = ({ states, handlers, childProps, t, menu }) => {
  // console.log("Menus_menu_header states:", states);
  // console.log("Menus_menu_header menu:", menu);

  return (
    <div className="Menus_menu_header">
      <h1>Menu: {menu.label}</h1>
      <p>Description: -- {menu.description}</p>
      <p>Owner Type: -- {menu.ownerType}</p>
      <p>Status: -- {menu.isActive ? "Active" : "Inactive"}</p>
      <p>Created By: -- {menu.createdBy}</p>
      <p>Created At: -- {formatDate(menu.createdAt)}</p>
      <p>Updated By: -- {menu.updatedBy}</p>
      <p>Updated At: -- {formatDate(menu.updatedAt)}</p>
    </div>
  );
};

export default Menus_menu_header;

/*const MOCK_MENU_15 = {
  _id: "15",
  label: "Odesa Ma Seafood",
  description: "Competitor menu — grilled fish and coastal plates",
  ownerType: "competitor",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  categories: [
    { ...MOCK_CATEGORY_2 },
    { ...MOCK_CATEGORY_5 },
    { ...MOCK_CATEGORY_8 },
    { ...MOCK_CATEGORY_10 },
  ],
  isActive: false,
  isDeleted: false,
  deletedAt: null,
  createdBy: "External",
  updatedBy: "Scraper",
}; */

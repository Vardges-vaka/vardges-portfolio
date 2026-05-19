import Menus_category_header from "./Menus_category_header.jsx";
import "../../../_styles/menus_childComps/menus/menus_categories.css";
import { Menus_menuItems_table } from "../../menus_tables/_menus_tables.index.js";

const Menus_categories = ({ states, handlers, childProps, t, categories }) => {
  // console.log("Menus_categories states:", states);
  // console.log("Menus_categories states.menu:", states.menu);
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
  return (
    <div className="menus_categories">
      {/* <h1>Menus_categories</h1> */}
      {/* <p>states.menu.label: {states.menu.label}</p> */}
      {categories.map((category) => {
        return (
          <div key={category._id}>
            <Menus_category_header
              key={category._id}
              category={category}
              states={states}
              handlers={handlers}
              childProps={childProps}
              t={t}
            />
            <div className="menus_categories_menuItems">
              <Menus_menuItems_table
                key={category._id}
                states={states}
                handlers={handlers}
                childProps={childProps}
                t={t}
                menuItems={category.menuItems}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Menus_categories;

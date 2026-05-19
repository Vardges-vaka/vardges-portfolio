import { formatDate } from "../../../02_menus_helpers/_menus_helpers.index.js";
import {
  User,
  Utensils,
  Star,
  ShoppingCart,
  Leaf,
  Info,
  Pencil,
} from "lucide-react";
import {
  MenuItem_field_name,
  MenuItem_field_description,
  MenuItem_field_pricing,
  MenuItem_field_images,
  MenuItem_field_nutrition,
  MenuItem_field_modifiers,
} from "./menuItem_view_one_fields/_menuItem_view_one_fields.index.js";
import "../../../_styles/menus_childComps/menus_menuItems/menus_menuItem_view_one.css";

const Menus_menuItem_view_one = ({ states, handlers, childProps, t }) => {
  console.log("Menus_menuItem_view_one states:", states);
  // console.log("Menus_menuItem_view_one states.menuItem:", states.menuItem);
  // let menuItem = null;
  const { menuItem } = states;

  /*
  
  const MOCK_MENU_ITEM_70 = {
  _id: "1.1.70",
  ownerType: "competitor",
  isActive: true,
  displayOrder: 70,
  isDeleted: false,
  deletedAt: null,
  createdBy: baseAuthors[9].createdBy,
  updatedBy: baseAuthors[9].updatedBy,
  
  images: {
    ...getImageSet(MenuItemImages[0]),
    other: getOtherImages(MenuItemImages[0], MenuItemImages[1]),
  },
  recipe: "mongoose.Schema.Types.ObjectId Sample",
  recipeFile: getRecipeOrTechCardFile(),
  techCardFile: getRecipeOrTechCardFile(),
  cost: {
    actualCost: 8,
    estimatedCost: 7,
  },
  sellingPrice: { gross: 44, net: 41.8, VAT: 2.2 },
  nutrition: {
    source: NUTRITION_SOURCES[0],
    calories: 320,
    protein: 6,
    carbs: 52,
    fat: 10,
    lastCalculatedAt: nutrition_lastCalculatedAt_samples[7],
  },
  otherFiles: getOtherImages(MenuItemImages[0], MenuItemImages[1]),

};
  

 
  */

  return (
    <div className="menus_menuItem_view_one">
      <div className="menus_menuItem_view_one_top">
        <MenuItem_field_images
          states={states}
          handlers={handlers}
          childProps={childProps}
          t={t}
          menuItem={menuItem}
        />
        <aside className="menus_menuItem_view_one_topRight">
          <MenuItem_field_name
            states={states}
            handlers={handlers}
            childProps={childProps}
            t={t}
            menuItem={menuItem}
          />
          <MenuItem_field_description
            states={states}
            handlers={handlers}
            childProps={childProps}
            t={t}
            menuItem={menuItem}
          />
          <MenuItem_field_pricing
            states={states}
            handlers={handlers}
            childProps={childProps}
            t={t}
            menuItem={menuItem}
          />
          <MenuItem_field_nutrition
            states={states}
            handlers={handlers}
            childProps={childProps}
            t={t}
            menuItem={menuItem}
          />{" "}
        </aside>
      </div>
      <MenuItem_field_modifiers
        states={states}
        handlers={handlers}
        childProps={childProps}
        t={t}
        menuItem={menuItem}
      />
    </div>
  );
  /*
    priceHistory: [],

  sizeByGrams: 200,
  quantity: 0,
  dietaryTags: [DIETARY_TAGS[0], DIETARY_TAGS[4]],
  allergens: [ALLERGENS[4], ALLERGENS[2]],
  spicyLevel: 0,
  preparationTimeMin: 10,
  sku: "DESS009",
  kitchenStation: KITCHEN_STATIONS[3],
  cuisineType: CUISINE_TYPES[3],
  mirroredWithOtherMenuItems: [
    {
      brand: { logo: vkusnyashka, name: "Vkusnyashka" },
      item: { image: MenuItemImages[71], name: "Strawberry Pavlova" },
      note: "Same Item as Vkusnyashka's [Strawberry Pavlova] menu item.",
    },
  ],
  competesWithOtherMenuItems: [
    { ...competesWithOtherMenuItems_samples[2] },
    { ...competesWithOtherMenuItems_samples[7] },
    { ...competesWithOtherMenuItems_samples[11] },
    { ...competesWithOtherMenuItems_samples[15] },
    { ...competesWithOtherMenuItems_samples[19] },
    { ...competesWithOtherMenuItems_samples[22] },
    { ...competesWithOtherMenuItems_samples[26] },
    { ...competesWithOtherMenuItems_samples[30] },
  ],
  source: "manual",
  externalId: "PAVLOVA001",
  cloudStorage: { isDefault: true, value: CLOUD_STORAGES[0] },
  availableInCategories: ["Desserts"],
  
  
  
  */
};

export default Menus_menuItem_view_one;

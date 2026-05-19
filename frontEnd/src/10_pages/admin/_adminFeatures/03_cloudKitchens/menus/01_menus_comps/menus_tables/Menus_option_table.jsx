import { OPTIONS_TBL_HDRS } from "../../05_menus_cnst/_menus_cnst.index.js";
import "../../_styles/menus_childComps/menus_options/menus_option_view_all.css";

const Menus_option_table = ({
  states,
  handlers,
  childProps,
  t,
  options,
}) => {
  const optionsTableHeaders = OPTIONS_TBL_HDRS();

  const getAvailableTags = (items) => {
    let value = "No Modifiers";
    let count = items.length;

    if (count > 0) {
      value = items[0];
    }
    return { value, count };
  };

  return (
    <div className="menus_option_view_all">
      <table className="menus_option_view_all_table">
        <thead>
          <tr>
            {optionsTableHeaders.map((header) => {
              return (
                <th
                  key={`menus_option_view_all_table_header ${header.label}`}
                  scope="col"
                  className={`menus_option_view_all_table_header ${header.className}`}
                  title={header.title}>
                  {header.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {options?.map((option, rowIndex) => {
            const modifiers = getAvailableTags(option.availableInModifiers);
            return (
              <tr
                className="menus_option_view_all_table_rows_provider"
                key={option._id}>
                <td className="menus_option_view_all_table_rows_provider_cell index">
                  {rowIndex + 1}
                </td>
                <td className="menus_option_view_all_table_rows_provider_cell image">
                  <button className="menus_option_view_all_table_row btn">
                    <img
                      src={option.images.main}
                      alt={option.name.label}
                      className="menus_option_view_all_table_row image"
                    />
                  </button>
                </td>
                <td className="menus_option_view_all_table_rows_provider_cell modifiers">
                  <div>
                    <span>{modifiers?.value}</span>
                    {modifiers?.count > 1 && (
                      <span style={{ fontWeight: "bold", marginLeft: "10px" }}>
                        {modifiers.count + 1}
                      </span>
                    )}
                  </div>
                </td>
                <td className="menus_option_view_all_table_rows_provider_cell label">
                  {option.name.label}
                </td>
                <td className="menus_option_view_all_table_rows_provider_cell description">
                  {option.description.short}
                </td>
                <td className="menus_option_view_all_table_rows_provider_cell ownerType">
                  {option.ownerType}
                </td>
                <td className="menus_option_view_all_table_rows_provider_cell sellingPrice">
                  {option.sellingPrice?.gross}
                </td>
                <td className="menus_option_view_all_table_rows_provider_cell cost">
                  {option.cost.estimatedCost}
                </td>
                <td className="menus_option_view_all_table_rows_provider_cell isFree">
                  {option.isFree ? "Free" : "Paid"}
                </td>{" "}
                <td className="menus_option_view_all_table_rows_provider_cell nutrition">
                  {option.nutrition?.calories} kcal
                </td>
                {/* // !  oprion.recipeFile btn */}
                <td className="menus_view_all_table_rows_provider_cell">
                  <button className="menus_view_all_table_rows_provider_cell_button">
                    Recipe File
                  </button>
                </td>
                {/* // !  oprion.techCardFile btn */}
                <td className="menus_view_all_table_rows_provider_cell">
                  <button className="menus_view_all_table_rows_provider_cell_button">
                    TechCard File
                  </button>
                </td>
                {/* 
    // !   1) index +1
    { label: "#", className: "index", title: "#" }, 
    // !   2) oprion.images.main || Add Images btn
    { label: "Image", className: "image", title: "Menu Item Modifier Option's Image", },
    // !   3) oprion.availableInModifiers
    { label: "Modifiers", className: "modifiers", title: "Used by Menu Modifiers", },
    // !   4) oprion.name.label
    { label: "Name", className: "name", title: "Menu Item Name" },
    // !   5) oprion.description.short
    { label: "Description", className: "description", title: "Menu Item Selling Price", },
    // !   6) oprion.ownerType
    { label: "Owner", className: "ownerType", title: "Modifier Owner" },


    // !   7) oprion.sellingPrice.gross
    { label: "Price", className: "price", title: "Menu Item Selling Price" },
    // !   8) oprion.cost.estimatedCost
    { label: "Cost", className: "cost", title: "Menu Item Cost" },
    // !   9) oprion.isFree
    { label: "Is Free", className: "isFree", title: "Is Modifier Free or Paid", },
    // !   10) oprion.nutrition.calories + kcal
    { label: "Nutrition", className: "nutrition", title: "Menu Item Nutrition", },
    // !   11) oprion.recipeFile btn
    { label: "Recipe", className: "recipeFile", title: "Modifier Options Recipe Files", },
    // !   12) oprion.techCardFile btn
    { label: "TechCard", className: "techCardFile", title: "Modifier Options Technical Cards Files", },
    // !   13) Seperate Components
    { label: "Update", className: "update", title: "Update the Menu Item" },
    // !   14) Seperate Components
    { label: "View", className: "view", title: "View the Menu Item" },
    // !   15) Seperate Components
    { label: "Dropdown", className: "dropdown", title: "Quick Look" },
*/}
                <td className="menus_view_all_table_rows_provider_cell">
                  <button className="menus_view_all_table_rows_provider_cell_button">
                    Update
                  </button>
                </td>
                <td className="menus_view_all_table_rows_provider_cell">
                  <button className="menus_view_all_table_rows_provider_cell_button">
                    View
                  </button>
                </td>
                <td className="menus_view_all_table_rows_provider_cell">
                  <button className="menus_view_all_table_rows_provider_cell_button">
                    Dropdown
                  </button>
                </td>
              </tr>
            );
            /*
const MOCK_OPTION_3 = {
  _id: "1.1.1.3",
  ownerType: "franchise",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  isActive: true,
  displayOrder: 2,
  isDeleted: false,
  deletedAt: null,
  availableInModifiers: [
    "Modifier 1",
    "Modifier 6",
  ],
  ...baseAuthors[2],
  name: { label: NAMES[2] },
  description: { short: SHORT_DESCS[2], long: LONG_DESCS[2] },
  images: {
    ...getImageSet(optionImages[2]),
    other: getOtherImages(optionImages[2], optionImages[3]),
  },
  recipeFile: getRecipeOrTechCardFile(),
  techCardFile: getRecipeOrTechCardFile(),
  cost: {
    actualCost: { type: Number },
    estimatedCost: { type: Number },
  },
  sellingPrice: { gross: 90, net: 80, VAT: 10 },
  nutrition: {
    source: NUTRITION_SOURCES[0],
    calories: 110,
    protein: 1,
    carbs: 14,
    fat: 2,
    lastCalculatedAt: new Date(),
  },
  cloudStorage: { isDefault: true, value: CLOUD_STORAGES[2] },
};
             */
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Menus_option_table;

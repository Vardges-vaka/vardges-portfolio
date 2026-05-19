import { MENU_ITEMS_TBL_HDRS } from "../../05_menus_cnst/_menus_cnst.index.js";
import "../../_styles/menus_childComps/menus_menuItems/menus_menuItem_view_all.css";

const Menus_menuItems_table = ({
  states,
  handlers,
  childProps,
  t,
  menuItems,
}) => {
  // console.log("Menus_menuItem_view_all states:", states);
  // console.log("Menus_menuItem_view_all states.menuItems:", states.menuItems);

  const menuItemsTableHeaders = MENU_ITEMS_TBL_HDRS();
  const getAvailableTags = (items) => {
    let value = "No categories";
    let count = items.length;

    if (count > 0) {
      value = items[0];
    }
    return { value, count };
  };
  const getModifiers = (Modifiers) => {
    let value = 0;
    let count = Modifiers.length;

    if (count > 0) {
      value = Modifiers[0].modifier.title.label;
    }
    return { value, count };
  };
  const getmirroredWithOtherMenuItems = (items) => {
    let logo = 0;
    let name = "0";
    let count = items.length;

    if (count > 0) {
      logo = items[0].brand.logo;
      name = items[0].brand.name;
      // count = count + 1;
    }
    return { logo, name, count };
  };

  return (
    <div className="menus_menuItem_view_all">
      <table className="menus_menuItem_view_all_table">
        <thead>
          <tr>
            {menuItemsTableHeaders.map((header) => {
              return (
                <th
                  key={`menus_menuItem_view_all_table_header ${header.label}`}
                  scope="col"
                  className={`menus_menuItem_view_all_table_header ${header.className}`}
                  title={header.title}>
                  {header.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {menuItems?.map((i, rowIndex) => {
            let menuItem = states.viewingType === "single" ? i.item : i;
            const {
              availableInCategories,
              dietaryTags: dTags,
              allergens: aTags,
              modifiers,
            } = menuItem;
            const categories = getAvailableTags(availableInCategories);
            const dietaryTags = getAvailableTags(dTags);
            const allergens = getAvailableTags(aTags);
            const Modifiers = getModifiers(modifiers);
            const mirroredWithOtherMenuItems = getmirroredWithOtherMenuItems(
              menuItem.mirroredWithOtherMenuItems,
            );
            const competesWithOtherMenuItems = getmirroredWithOtherMenuItems(
              menuItem.competesWithOtherMenuItems,
            );
            return (
              <tr
                className="menus_menuItem_view_all_table_rows_provider"
                key={menuItem._id}>
                <td className="menus_menuItem_view_all_table_rows_provider_cell index">
                  {rowIndex + 1}
                </td>
                <td className="menus_menuItem_view_all_table_rows_provider_cell image">
                  <button className="menus_menuItem_view_all_table_row btn">
                    <img
                      src={menuItem.images.main}
                      alt={menuItem.name}
                      className="menus_menuItem_view_all_table_row image"
                    />
                  </button>
                </td>
                <td className="menus_menuItem_view_all_table_rows_provider_cell category">
                  <div>
                    <span>{categories?.value}</span>
                    {categories?.count > 1 && (
                      <span style={{ fontWeight: "bold", marginLeft: "10px" }}>
                        {categories.count + 1}
                      </span>
                    )}
                  </div>
                </td>
                <td className="menus_menuItem_view_all_table_rows_provider_cell label">
                  {menuItem.name.label}
                </td>
                <td className="menus_menuItem_view_all_table_rows_provider_cell sellingPrice">
                  {menuItem.sellingPrice.gross}
                </td>
                <td className="menus_menuItem_view_all_table_rows_provider_cell cost">
                  {menuItem.cost.estimatedCost}
                </td>
                <td className="menus_menuItem_view_all_table_rows_provider_cell PrepTime">
                  {menuItem.preparationTimeMin}m
                </td>
                <td className="menus_menuItem_view_all_table_rows_provider_cell ownerType">
                  {menuItem.ownerType}
                </td>
                <td className="menus_menuItem_view_all_table_rows_provider_cell ownerType">
                  {menuItem.nutrition.calories} kcal
                </td>
                <td className="menus_menuItem_view_all_table_rows_provider_cell ownerType">
                  <span>{dietaryTags.value}</span>
                  {dietaryTags.count > 1 && (
                    <span style={{ fontWeight: "bold", marginLeft: "10px" }}>
                      {dietaryTags.count + 1}
                    </span>
                  )}
                </td>
                <td className="menus_menuItem_view_all_table_rows_provider_cell ownerType">
                  <span>{allergens.value}</span>
                  {allergens.count > 1 && (
                    <span style={{ fontWeight: "bold", marginLeft: "10px" }}>
                      {allergens.count + 1}
                    </span>
                  )}
                </td>
                <td className="menus_menuItem_view_all_table_rows_provider_cell ownerType">
                  <span>{Modifiers.value}</span>
                  {Modifiers.count > 1 && (
                    <span style={{ fontWeight: "bold", marginLeft: "10px" }}>
                      {Modifiers.count + 1}
                    </span>
                  )}
                </td>
                <td className="menus_menuItem_view_all_table_rows_provider_cell ownerType">
                  {/* <span>{mirroredWithOtherMenuItems.value}</span> */}
                  {mirroredWithOtherMenuItems.logo ? (
                    <button className="menus_menuItem_view_all_table_row btn">
                      <img
                        src={mirroredWithOtherMenuItems.logo}
                        alt={mirroredWithOtherMenuItems.name}
                        className="menus_menuItem_view_all_table_row image"
                      />
                    </button>
                  ) : (
                    <span>{mirroredWithOtherMenuItems.name}</span>
                  )}

                  {mirroredWithOtherMenuItems.count > 1 && (
                    <span style={{ fontWeight: "bold", marginLeft: "10px" }}>
                      {mirroredWithOtherMenuItems.count}
                    </span>
                  )}
                </td>
                <td className="menus_menuItem_view_all_table_rows_provider_cell ownerType">
                  {competesWithOtherMenuItems.logo ? (
                    <button className="menus_menuItem_view_all_table_row btn">
                      <img
                        src={competesWithOtherMenuItems.logo}
                        alt={competesWithOtherMenuItems.name}
                        className="menus_menuItem_view_all_table_row image"
                      />
                    </button>
                  ) : (
                    <span>{competesWithOtherMenuItems.name}</span>
                  )}

                  {competesWithOtherMenuItems.count > 1 && (
                    <span style={{ fontWeight: "bold", marginLeft: "10px" }}>
                      {competesWithOtherMenuItems.count}
                    </span>
                  )}
                </td>

                <td className="menus_view_all_table_rows_provider_cell">
                  <button
                    className="menus_view_all_table_rows_provider_cell_button"
                    data-id={menuItem._id}
                    onClick={handlers.handleUpdate_MenuItem}>
                    Update
                  </button>
                </td>
                <td className="menus_view_all_table_rows_provider_cell">
                  <button
                    className="menus_view_all_table_rows_provider_cell_button"
                    data-id={menuItem._id}
                    onClick={handlers.handleView_MenuItem}>
                    View
                  </button>
                </td>
                <td className="menus_view_all_table_rows_provider_cell">
                  <button
                    className="menus_view_all_table_rows_provider_cell_button"
                    data-id={menuItem._id}
                    onClick={handlers.handleDropdown_MenuItem}>
                    Dropdown
                  </button>
                </td>
              </tr>
            );
            /*




  preparationTimeMin: 10,


    { label: "Dietary Tags", className: "dietaryTags", title: "Menu Item Dietary Tags" },
    { label: "Allergens", className: "allergens", title: "Menu Item Allergens" },
    { label: "Modifiers ?", className: "modifiers", title: "Does Menu Item has modifiers" },
    { label: "Mirrored", className: "mirroredWithOtherMenuItems", title: "Menu Item Mirrored With Other Menu Items" },
    { label: "Competes", className: "competesWithOtherMenuItems", title: "Menu Item Competes With Other Menu Items" },
    { label: "Update", className: "update", title: "Update the Menu Item" },
    { label: "View", className: "view", title: "View the Menu Item" },
    { label: "Dropdown", className: "dropdown", title: "Dropdown the Menu Item" },
             */
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Menus_menuItems_table;

import { Menus_menuItems_table } from "../../menus_tables/_menus_tables.index.js";
import "../../../_styles/menus_childComps/menus_menuItems/menus_menuItem_view_all.css";

const Menus_menuItem_view_all = ({ states, handlers, childProps, t }) => {
  let menuItems = states.menuItems;
  if (states.ownerType !== "both") {
    menuItems = states.menuItems.filter(
      (item) => item.ownerType === states.ownerType,
    );
  }

  return (
    <div className="menus_menuItem_view_all">
      <Menus_menuItems_table
        states={states}
        handlers={handlers}
        childProps={childProps}
        t={t}
        menuItems={menuItems}
      />
    </div>
  );
};

export default Menus_menuItem_view_all;

/*

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
          {menuItems?.map((menuItem, rowIndex) => {
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

          })}
        </tbody>
      </table>
*/

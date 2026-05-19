import "../../_styles/menus_childComps/menus/menus_view_all.css";
import { MENU_TBL_HDRS } from "../../05_menus_cnst/_menus_cnst.index.js";
import { formatDate } from "../../02_menus_helpers/_menus_helpers.index.js";

const getMenuItemQNT = (menuCategories) => {
  return menuCategories.reduce((acc, category) => {
    return acc + category.menuItems.length;
  }, 0);
};
const getModifierQNT = (menuCategories) => {
  const modifierIds = new Set();
  menuCategories.forEach((category) => {
    category.menuItems.forEach((menuItem) => {
      if (menuItem.item?.modifiers) {
        menuItem.item.modifiers.forEach((mod) => {
          if (mod.modifier?._id) {
            modifierIds.add(mod.modifier._id);
          }
        });
      }
    });
  });
  return modifierIds.size;
};
const getOptionsQNT = (menuCategories) => {
  const optionIds = new Set();
  menuCategories.forEach((category) => {
    category.menuItems.forEach((menuItem) => {
      if (menuItem.item?.modifiers) {
        menuItem.item.modifiers.forEach((mod) => {
          if (mod.modifier?.options) {
            mod.modifier.options.forEach((opt) => {
              if (opt.option?._id) {
                optionIds.add(opt.option._id);
              }
            });
          }
        });
      }
    });
  });
  return optionIds.size;
};

const Menus_table = ({ states, handlers, childProps, t, menus }) => {
  const TableHeaders = MENU_TBL_HDRS();

  return (
    <div className="menus_view_all">
      <table className="menus_view_all_table">
        <thead>
          <tr>
            {TableHeaders.map((header) => {
              return (
                <th
                  key={`menus_view_all_table_header ${header.label}`}
                  scope="col"
                  className={`menus_view_all_table_header ${header.className}`}
                  title={header.title}>
                  {header.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {menus?.map((menu, rowIndex) => {
            const categoryQNT = menu.categories.length;
            const menuItemQNT = getMenuItemQNT(menu.categories);
            const modifierQNT = getModifierQNT(menu.categories);
            const optionsQNT = getOptionsQNT(menu.categories);
            return (
              <tr className="menus_view_all_table_rows_provider" key={menu._id}>
                <td className="menus_view_all_table_rows_provider_cell">
                  {rowIndex + 1}
                </td>
                <td className="menus_view_all_table_rows_provider_cell">
                  {menu.label}
                </td>
                <td className="menus_view_all_table_rows_provider_cell">
                  {menu.isActive ? "Active" : "Inactive"}
                </td>
                <td className="menus_view_all_table_rows_provider_cell">
                  {menu.description}
                </td>
                <td className="menus_view_all_table_rows_provider_cell">
                  {menu.ownerType}
                </td>
                <td className="menus_view_all_table_rows_provider_cell">
                  {categoryQNT}
                </td>
                <td className="menus_view_all_table_rows_provider_cell">
                  {menuItemQNT}
                </td>
                <td className="menus_view_all_table_rows_provider_cell">
                  {modifierQNT}
                </td>
                <td className="menus_view_all_table_rows_provider_cell">
                  {optionsQNT}
                </td>
                <td className="menus_view_all_table_rows_provider_cell">
                  15,150 | 85
                </td>
                {/* <td className="menus_view_all_table_rows_provider_cell">
                  420,150 | 2400
                </td> */}
                <td className="menus_view_all_table_rows_provider_cell createdBy">
                  {menu.createdBy}
                </td>
                <td className="menus_view_all_table_rows_provider_cell createdAt">
                  {/* {rowIndex + 1} */}
                  {formatDate(menu.createdAt)}
                </td>
                <td className="menus_view_all_table_rows_provider_cell updatedBy">
                  {menu.updatedBy}
                </td>
                <td className="menus_view_all_table_rows_provider_cell updatedAt">
                  {/* {rowIndex + 1} */}
                  {formatDate(menu.updatedAt)}
                </td>

                <td className="menus_view_all_table_rows_provider_cell">
                  <button
                    className="menus_view_all_table_rows_provider_cell_button"
                    onClick={() => handlers.handleUpdateAll(menu._id)}>
                    Update
                  </button>
                </td>
                <td className="menus_view_all_table_rows_provider_cell">
                  <button
                    className="menus_view_all_table_rows_provider_cell_button"
                    onClick={() => handlers.handleViewAll(menu._id)}>
                    View
                  </button>
                </td>
                <td className="menus_view_all_table_rows_provider_cell">
                  <button
                    className="menus_view_all_table_rows_provider_cell_button"
                    onClick={() => handlers.handleDropdown(menu._id)}>
                    Dropdown
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Menus_table;

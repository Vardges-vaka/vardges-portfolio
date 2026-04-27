import { useMenuItems } from "./03_menuItems_hooks/_menuItems_hooks.index.js";
import {
  MenuItems_viewToggle,
  MenuItems_list,
  MenuItems_tablePlaceholder,
  MenuItems_addForm,
  MenuItems_detail,
  MenuItems_confirmModal,
  MenuItems_discardModal,
  MenuItems_deleteModal,
} from "./01_menuItems_comps/_menuItems_comps.index.js";
import "./_styles/menuItems.css";

const MenuItems = () => {
  const { states, compProps } = useMenuItems();
  const { viewMode, showAddForm, confirmModal, discardModal, deleteModal } = states;

  return (
    <div className="menuItems">
      <MenuItems_viewToggle {...compProps.MenuItems_viewToggle_props} />

      {viewMode === "list" && <MenuItems_list {...compProps.MenuItems_list_props} />}
      {viewMode === "table" && (
        <MenuItems_tablePlaceholder {...compProps.MenuItems_tablePlaceholder_props} />
      )}
      {viewMode === "detail" && (
        <MenuItems_detail {...compProps.MenuItems_detail_props} />
      )}

      {showAddForm && <MenuItems_addForm {...compProps.MenuItems_addForm_props} />}
      {confirmModal.isOpen && (
        <MenuItems_confirmModal {...compProps.MenuItems_confirmModal_props} />
      )}
      {discardModal.isOpen && (
        <MenuItems_discardModal {...compProps.MenuItems_discardModal_props} />
      )}
      {deleteModal.isOpen && (
        <MenuItems_deleteModal {...compProps.MenuItems_deleteModal_props} />
      )}
    </div>
  );
};

export default MenuItems;

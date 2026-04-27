import { useMenuCategories } from "./03_menuCategories_hooks/_menuCategories_hooks.index.js";
import {
  MenuCategories_viewToggle,
  MenuCategories_list,
  MenuCategories_tablePlaceholder,
  MenuCategories_addForm,
  MenuCategories_detail,
  MenuCategories_confirmModal,
  MenuCategories_discardModal,
  MenuCategories_deleteModal,
} from "./01_menuCategories_comps/_menuCategories_comps.index.js";
import "./_styles/menuCategories.css";

const MenuCategories = () => {
  const { states, compProps } = useMenuCategories();
  const { viewMode, showAddForm, confirmModal, discardModal, deleteModal } = states;

  return (
    <div className="menuCategories">
      <MenuCategories_viewToggle {...compProps.MenuCategories_viewToggle_props} />

      {viewMode === "list" && <MenuCategories_list {...compProps.MenuCategories_list_props} />}
      {viewMode === "table" && (
        <MenuCategories_tablePlaceholder {...compProps.MenuCategories_tablePlaceholder_props} />
      )}
      {viewMode === "detail" && (
        <MenuCategories_detail {...compProps.MenuCategories_detail_props} />
      )}

      {showAddForm && <MenuCategories_addForm {...compProps.MenuCategories_addForm_props} />}
      {confirmModal.isOpen && (
        <MenuCategories_confirmModal {...compProps.MenuCategories_confirmModal_props} />
      )}
      {discardModal.isOpen && (
        <MenuCategories_discardModal {...compProps.MenuCategories_discardModal_props} />
      )}
      {deleteModal.isOpen && (
        <MenuCategories_deleteModal {...compProps.MenuCategories_deleteModal_props} />
      )}
    </div>
  );
};

export default MenuCategories;

import { useMenus } from "./03_menus_hooks/_menus_hooks.index.js";
import {
  Menus_viewToggle,
  Menus_list,
  Menus_tablePlaceholder,
  Menus_addForm,
  Menus_detail,
  Menus_confirmModal,
  Menus_discardModal,
  Menus_deleteModal,
} from "./01_menus_comps/_menus_comps.index.js";
import "./_styles/menus.css";

const Menus = () => {
  const { states, compProps } = useMenus();
  const { viewMode, showAddForm, confirmModal, discardModal, deleteModal } = states;

  return (
    <div className="menus">
      <Menus_viewToggle {...compProps.Menus_viewToggle_props} />

      {viewMode === "list" && <Menus_list {...compProps.Menus_list_props} />}
      {viewMode === "table" && (
        <Menus_tablePlaceholder {...compProps.Menus_tablePlaceholder_props} />
      )}
      {viewMode === "detail" && (
        <Menus_detail {...compProps.Menus_detail_props} />
      )}

      {showAddForm && <Menus_addForm {...compProps.Menus_addForm_props} />}
      {confirmModal.isOpen && (
        <Menus_confirmModal {...compProps.Menus_confirmModal_props} />
      )}
      {discardModal.isOpen && (
        <Menus_discardModal {...compProps.Menus_discardModal_props} />
      )}
      {deleteModal.isOpen && (
        <Menus_deleteModal {...compProps.Menus_deleteModal_props} />
      )}
    </div>
  );
};

export default Menus;

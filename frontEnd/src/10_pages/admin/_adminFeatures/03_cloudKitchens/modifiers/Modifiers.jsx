import { useModifiers } from "./03_modifiers_hooks/_modifiers_hooks.index.js";
import {
  Modifiers_viewToggle,
  Modifiers_list,
  Modifiers_tablePlaceholder,
  Modifiers_addForm,
  Modifiers_detail,
  Modifiers_confirmModal,
  Modifiers_discardModal,
  Modifiers_deleteModal,
} from "./01_modifiers_comps/_modifiers_comps.index.js";
import "./_styles/modifiers.css";

const Modifiers = () => {
  const { states, compProps } = useModifiers();
  const { viewMode, showAddForm, confirmModal, discardModal, deleteModal } = states;

  return (
    <div className="modifiers">
      <Modifiers_viewToggle {...compProps.Modifiers_viewToggle_props} />

      {viewMode === "list" && <Modifiers_list {...compProps.Modifiers_list_props} />}
      {viewMode === "table" && (
        <Modifiers_tablePlaceholder {...compProps.Modifiers_tablePlaceholder_props} />
      )}
      {viewMode === "detail" && (
        <Modifiers_detail {...compProps.Modifiers_detail_props} />
      )}

      {showAddForm && <Modifiers_addForm {...compProps.Modifiers_addForm_props} />}
      {confirmModal.isOpen && (
        <Modifiers_confirmModal {...compProps.Modifiers_confirmModal_props} />
      )}
      {discardModal.isOpen && (
        <Modifiers_discardModal {...compProps.Modifiers_discardModal_props} />
      )}
      {deleteModal.isOpen && (
        <Modifiers_deleteModal {...compProps.Modifiers_deleteModal_props} />
      )}
    </div>
  );
};

export default Modifiers;

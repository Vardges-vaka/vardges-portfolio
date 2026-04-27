import { useBrands } from "./03_brands_hooks/_brands_hooks.index.js";
import {
  Brands_viewToggle,
  Brands_list,
  Brands_tablePlaceholder,
  Brands_addForm,
  Brands_detail,
  Brands_confirmModal,
  Brands_discardModal,
  Brands_deleteModal,
} from "./01_brands_comps/_brands_comps.index.js";
import "./_styles/brands.css";

const Brands = () => {
  const { states, compProps } = useBrands();
  const { viewMode, showAddForm, confirmModal, discardModal, deleteModal } = states;

  return (
    <div className="brands">
      <Brands_viewToggle {...compProps.Brands_viewToggle_props} />

      {viewMode === "list" && <Brands_list {...compProps.Brands_list_props} />}
      {viewMode === "table" && (
        <Brands_tablePlaceholder {...compProps.Brands_tablePlaceholder_props} />
      )}
      {viewMode === "detail" && (
        <Brands_detail {...compProps.Brands_detail_props} />
      )}

      {showAddForm && <Brands_addForm {...compProps.Brands_addForm_props} />}
      {confirmModal.isOpen && (
        <Brands_confirmModal {...compProps.Brands_confirmModal_props} />
      )}
      {discardModal.isOpen && (
        <Brands_discardModal {...compProps.Brands_discardModal_props} />
      )}
      {deleteModal.isOpen && (
        <Brands_deleteModal {...compProps.Brands_deleteModal_props} />
      )}
    </div>
  );
};

export default Brands;

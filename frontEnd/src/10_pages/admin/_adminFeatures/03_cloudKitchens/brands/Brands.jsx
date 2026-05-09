import { useBrands } from "./03_brands_hooks/_brands_hooks.index.js";
import {
  Brands_table,
  Brands_addForm,
  Brands_detail,
  Brands_confirmModal,
  Brands_discardModal,
  Brands_deleteModal,
  Brands_logo_session,
} from "./01_brands_comps/_brands_comps.index.js";
import "./_styles/brands.css";

const Brands = () => {
  const { states, compProps } = useBrands();
  const { viewMode, showAddForm, confirmModal, discardModal, deleteModal } = states;

  const isLogoSession = viewMode === "logo_view" || viewMode === "logo_edit";

  return (
    <div className="brands">
      {viewMode === "table" && <Brands_table {...compProps.Brands_table_props} />}

      {isLogoSession && (
        <Brands_logo_session {...compProps.Brands_logo_session_props} />
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

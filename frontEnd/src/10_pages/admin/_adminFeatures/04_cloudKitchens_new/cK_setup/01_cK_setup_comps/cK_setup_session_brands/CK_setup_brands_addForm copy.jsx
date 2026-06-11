import { FormModal } from "../../../../../../../01_components/_components.index.js";
import { CK_setup_brands_add_initial } from "./_cK_setup_session_brands.index.js";
import "../../_styles/cK_setup_session_brands/cK_setup_brands_addForm.css";

const CK_setup_brands_addForm = ({ states, handlers, childProps, t }) => {
  return (
    <FormModal
      isOpen={states.isOpen}
      title="Add Brand"
      confirmLabel="Create"
      onConfirm={handlers.onSubmit}
      onCancel={handlers.onCancel}>
      <CK_setup_brands_add_initial states={states} handlers={handlers} t={t} />
    </FormModal>
  );
};

export default CK_setup_brands_addForm;

import "../../_styles/menus_modals/menus_confirmModal_fieldUpdate.css";
import { ConfirmModal } from "../../../../../../../01_components/_components.index.js";

const Menus_confirmModal_fieldUpdate = ({ states, handlers, t }) => {
  const modalBody = () => {
    return (
      <div className="menus_confirmModal_fieldUpdate_body">
        <h1>Menus_confirmModal_fieldUpdate_body</h1>
      </div>
    );
  };
  return (
    <ConfirmModal
      isOpen={states.isOpen}
      onCancel={handlers.handleCancelUpdate}
      title={states.updatingField}
      danger={false}
      confirmDisabled={false}
      cancelLabel="Cancel"
      confirmLabel="Confirm"
      onConfirm={handlers.handleConfirmUpdate}
      children={modalBody()}
    />
  );
};

export default Menus_confirmModal_fieldUpdate;

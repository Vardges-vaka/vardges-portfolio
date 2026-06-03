import "../../_styles/cK_setup_modals/cK_setup_confirmDelete_modal.css";
import { ConfirmModal } from "../../../../../../../01_components/_components.index.js";

const CK_setup_confirmDelete_modal = ({ isOpen, states, handlers, t }) => {
  // if (!states?.isOpen) return null;
  console.log("CK_setup_confirmDelete_modal isOpen", isOpen);
  console.log("CK_setup_confirmDelete_modal states", states);
  console.log("CK_setup_confirmDelete_modal handlers", handlers);
  const children = (
    <>
      <h1>CK_setup_confirmDelete_modal</h1>
    </>
  );

  return (
    <ConfirmModal
      cancelOperation="delete"
      confirmOperation="delete"
      isOpen={states?.isOpen}
      title={states?.title}
      cancelLabel={states?.cancelLabel}
      confirmLabel={states?.confirmLabel}
      danger={true}
      onConfirm={handlers?.onConfirm}
      onCancel={handlers?.onCancel}
      children={children}
    />
  );
};
export default CK_setup_confirmDelete_modal;

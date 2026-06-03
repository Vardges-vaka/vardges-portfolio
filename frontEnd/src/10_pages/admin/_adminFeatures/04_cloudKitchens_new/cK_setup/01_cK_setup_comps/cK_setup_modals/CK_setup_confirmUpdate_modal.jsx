import "../../_styles/cK_setup_modals/cK_setup_confirmUpdate_modal.css";
import { ConfirmModal } from "../../../../../../../01_components/_components.index.js";

const CK_setup_confirmUpdate_modal = ({ isOpen, states, handlers, t }) => {
  console.log("CK_setup_confirmUpdate_modal States", states);
  console.log("CK_setup_confirmUpdate_modal Handlers", handlers);
  console.log("CK_setup_confirmUpdate_modal isOpen", isOpen);
  // if (!states?.isOpen) return null;
  const children = (
    <>
      <h1>CK_setup_confirmUpdate_modal</h1>
    </>
  );

  return (
    <ConfirmModal
      cancelOperation="update"
      confirmOperation="update"
      isOpen={isOpen}
      // isOpen={states?.isOpen}
      title={states?.title}
      cancelLabel={states?.cancelLabel}
      confirmLabel={states?.confirmLabel}
      onConfirm={handlers?.onConfirm}
      onCancel={handlers?.onCancel}
      children={children}
    />
  );
};
export default CK_setup_confirmUpdate_modal;

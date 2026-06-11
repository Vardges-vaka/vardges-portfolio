import { useId } from "react";
import Modal from "./Modal";

/**
 * Stateless creation-form dialog. Parent owns open state + the form itself.
 * The actual form fields are passed as `children`; this shell frames them and
 * wires the confirm / cancel buttons (mirrors ConfirmModal).
 *
 * The confirm button is a real submit button (via formId), so pressing Enter
 * inside any field submits via the form's onSubmit → onConfirm.
 *
 * @param {boolean} isOpen
 * @param {import("react").ReactNode} title
 * @param {import("react").ReactNode} children — the form fields
 * @param {boolean} [confirmDisabled=false]
 * @param {string} [cancelLabel]
 * @param {string} [confirmLabel]
 * @param {() => void} onConfirm
 * @param {() => void} onCancel
 * @param {boolean} [closeOnBackdropClick=true]
 */
const FormModal = ({
  isOpen,
  title,
  children,
  confirmDisabled = false,
  cancelLabel = "Cancel",
  confirmLabel = "Create",
  onConfirm,
  onCancel,
  closeOnBackdropClick = true,
}) => {
  const formId = useId();

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm?.();
  };

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      onCancel={onCancel}
      onConfirm={onConfirm}
      withFooter
      closeOnBackdropClick={closeOnBackdropClick}
      dialogClassName="modal_dialogForm"
      formId={formId}
      footerLabels={{ cancelLabel, confirmLabel }}
      footerStates={{ isConfirmDisabled: confirmDisabled }}>
      <form id={formId} className="modal_bodyForm" onSubmit={handleSubmit}>
        {children}
      </form>
    </Modal>
  );
};

export default FormModal;

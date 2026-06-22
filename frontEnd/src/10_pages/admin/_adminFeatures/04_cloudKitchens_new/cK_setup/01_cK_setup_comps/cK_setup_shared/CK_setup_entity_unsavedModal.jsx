import { Modal } from "../../../../../../../01_components/_components.index.js";

const CK_setup_entity_unsavedModal = ({ states, handlers }) => (
  <Modal
    isOpen={states.unsavedModalOpen}
    title="Unsaved changes"
    onCancel={handlers.onUnsavedCancel}
    onConfirm={handlers.onUnsavedConfirm}
    withFooter
    danger
    footerStates={{
      isConfirmDisabled: states.isSaving,
      isCancelDisabled: states.isSaving,
    }}
    footerLabels={{
      cancelLabel: "Stay",
      confirmLabel: "Discard changes",
    }}>
    <p>
      You are editing this item. If you leave now, your unsaved changes will be
      lost.
    </p>
  </Modal>
);

export default CK_setup_entity_unsavedModal;

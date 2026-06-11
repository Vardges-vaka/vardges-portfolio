import { useId } from "react";
import { Modal } from "../../../../../../../01_components/_components.index.js";
import { CK_setup_contracts_add_initial } from "./_cK_setup_session_contracts.index.js";
import "../../_styles/cK_setup_session_contracts/cK_setup_contracts_addForm.css";

const CK_setup_contracts_addForm = ({ states, handlers, childProps, t }) => {
  const formId = useId();

  const handleSubmit = (e) => {
    e.preventDefault();
    handlers.onSubmit?.();
  };

  return (
    <Modal
      isOpen={states.isOpen}
      title="Add Contract"
      onCancel={handlers.onCancel}
      onConfirm={handlers.onSubmit}
      withFooter
      dialogClassName="modal_dialogForm"
      formId={formId}
      footerLabels={{ confirmLabel: "Create" }}>
      <form id={formId} className="modal_bodyForm" onSubmit={handleSubmit}>
        <CK_setup_contracts_add_initial
          states={states}
          handlers={handlers}
          t={t}
        />
      </form>
    </Modal>
  );
};

export default CK_setup_contracts_addForm;

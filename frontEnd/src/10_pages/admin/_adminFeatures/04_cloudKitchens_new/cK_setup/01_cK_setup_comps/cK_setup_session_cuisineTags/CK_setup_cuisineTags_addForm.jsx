import { useId, useMemo } from "react";
import { Modal } from "../../../../../../../01_components/_components.index.js";
import { validateCuisineTagCreate } from "../../02_cK_setup_hlpr/_cK_setup_hlpr.index.js";
import CK_stp_cuisineTag_editFields from "./CK_stp_cuisineTag_editFields.jsx";
import "../../_styles/cK_setup_session_cuisineTags/cK_setup_cuisineTags_addForm.css";

const CK_setup_cuisineTags_addForm = ({ states, handlers, childProps, t }) => {
  const formId = useId();
  const fieldErrors = states.fieldErrors ?? {};

  const isConfirmDisabled = useMemo(() => {
    const validation = validateCuisineTagCreate(
      states.values ?? {},
      states.existingTags ?? [],
    );
    return !validation.isValid;
  }, [states.values, states.existingTags]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handlers.onSubmit?.();
  };

  return (
    <Modal
      isOpen={states.isOpen}
      title="Add Cuisine Tag"
      onCancel={handlers.onCancel}
      onConfirm={handlers.onSubmit}
      withFooter
      dialogClassName="modal_dialogForm cK_setup_cuisineTags_addForm"
      formId={formId}
      footerLabels={{ confirmLabel: "Create" }}
      footerStates={{ isConfirmDisabled }}>
      <form id={formId} className="modal_bodyForm" onSubmit={handleSubmit}>
        <CK_stp_cuisineTag_editFields
          states={{
            values: states.values,
            fieldErrors,
          }}
          handlers={handlers}
          t={t}
        />
      </form>
    </Modal>
  );
};

export default CK_setup_cuisineTags_addForm;

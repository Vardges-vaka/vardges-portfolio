import {
  IconGlobal,
  ButtonGlobal,
  InputGlobal,
  SelectGlobal,
  PasswordInput,
  CheckboxGlobal,
} from "../../../../../../../../01_components/components.index.js";

import "../../../00_styles/newProjectsForm_footer.css";

const NewProjectsForm_footer = ({ states, handlers }) => {
  const { validations, addingStep } = states;
  const isValid = validations[addingStep].isValid;
  console.log("isValid in NewProjectsForm_footer", isValid);
  return (
    <div className="NewProjectsForm_footer">
      <button
        data-operation="cancel"
        data-session="adding"
        onClick={handlers.onCancel}>
        Cancel
      </button>
      <button
        data-operation="nextStep"
        data-session={addingStep === "config" ? "confirm" : "adding"}
        disabled={!isValid}
        onClick={handlers.onNext}>
        {addingStep === "config" ? "Add Project" : "Continue"}
      </button>
    </div>
  );
};

export default NewProjectsForm_footer;

import {
  IconGlobal,
  ButtonGlobal,
  InputGlobal,
  SelectGlobal,
  PasswordInput,
  CheckboxGlobal,
} from "../../../../../../../../01_components/components.index.js";

import "../../../00_styles/newProjectsForm_header.css";

const NewProjectsForm_header = ({ states, handlers }) => {
  return (
    <div className="NewProjectsForm_header">
      <button
        data-operation="cancel"
        data-session="adding"
        onClick={handlers.onCancel}>
        Cancel
      </button>{" "}
      <h1>AddProjectsForm</h1>
    </div>
  );
};

export default NewProjectsForm_header;

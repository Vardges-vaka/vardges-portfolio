import {
  IconGlobal,
  ButtonGlobal,
  InputGlobal,
  SelectGlobal,
  PasswordInput,
  CheckboxGlobal,
} from "../../../../../../01_components/components.index.js";
import "../00_styles/session_ViewOne_Project.css";

const Session_ViewOne_Project = ({ states, handlers }) => {
  return (
    <div className="Session_ViewOne_Project">
      <h1>Session_ViewOne_Project</h1>
      <ButtonGlobal
        children="Add  a Project"
        onClick={handlers.handlecurrentStateChange}
        data-state="addProject"
      />
    </div>
  );
};

export default Session_ViewOne_Project;

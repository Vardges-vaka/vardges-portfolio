import {
  IconGlobal,
  ButtonGlobal,
  InputGlobal,
  SelectGlobal,
  PasswordInput,
  CheckboxGlobal,
} from "../../../../../../01_components/components.index.js";
import "../00_styles/session_Updating_Project.css";

const Session_Updating_Project = ({ states, handlers }) => {
  return (
    <div className="Session_Updating_Project">
      <h1>Projects_Empty</h1>
      <ButtonGlobal
        children="Add  a Project"
        onClick={handlers.handlecurrentStateChange}
        data-state="addProject"
      />
    </div>
  );
};

export default Session_Updating_Project;

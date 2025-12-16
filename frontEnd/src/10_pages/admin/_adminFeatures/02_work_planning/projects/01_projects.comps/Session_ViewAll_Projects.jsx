import {
  IconGlobal,
  ButtonGlobal,
  InputGlobal,
  SelectGlobal,
  PasswordInput,
  CheckboxGlobal,
} from "../../../../../../01_components/components.index.js";
import { Projects_Empty } from "./projects.childComps/_projects.childComps.index.js";
import "../00_styles/session_ViewAll_Projects.css";

const Session_ViewAll_Projects = ({ states, handlers }) => {

  
  return (
    <div className="Session_ViewAll_Projects">
      <h1>Session_ViewAll_Projects</h1>

      {states.allProjects?.length === 0 && (
        <Projects_Empty onClick={handlers.startAddingProject} />
      )}
    </div>
  );
};

export default Session_ViewAll_Projects;

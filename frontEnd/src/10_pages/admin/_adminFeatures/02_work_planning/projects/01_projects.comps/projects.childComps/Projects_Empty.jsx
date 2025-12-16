import {
  IconGlobal,
  ButtonGlobal,
  InputGlobal,
  PasswordInput,
  CheckboxGlobal,
  GlobalSelect,
} from "../../../../../../../01_components/components.index.js";
import "../../00_styles/projects_Empty.css";

const Projects_Empty = ({ onClick }) => {
  return (
    <div className="Projects_Empty_cnt">
      <h1>Projects_Empty</h1>
      <button data-operation="start" data-session="adding" onClick={onClick}>
        Add a Project
      </button>
    </div>
  );
};

export default Projects_Empty;

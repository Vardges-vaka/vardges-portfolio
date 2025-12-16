import {
  IconGlobal,
  ButtonGlobal,
  InputGlobal,
  SelectGlobal,
  PasswordInput,
  CheckboxGlobal,
} from "../../../../../../../01_components/components.index.js";
import {
  AddProjects_textEntry,
  AddProjects_type,
} from "./_projects.childComps.index.js";
import { GENERAL_INFO_FIELDS } from "../../05_projects.constances/_projects.constances.index.js";
import "../../00_styles/addProjectsForm_generalInfo.css";

const AddProjectsForm_generalInfo = ({ states, handlers }) => {
  const titles = GENERAL_INFO_FIELDS.filter((item) => item.field === "title");

  const descriptions = GENERAL_INFO_FIELDS.filter(
    (item) => item.field === "description"
  );
  const descriptions_brief = descriptions?.filter(
    (item) => item.subField === "brief"
  );
  const descriptions_detailed = descriptions?.filter(
    (item) => item.subField === "detailed"
  );

  return (
    <div className="AddProjectsForm_generalInfo">
      <AddProjects_type
        state={states.addingProject_type}
        onChange={handlers.handle_type_change}
        onBlur={handlers.handle_type_blur}
      />
      <AddProjects_textEntry
        key="Title"
        state={states.addingProject_generalInfo}
        items={titles}
        onChange={handlers.handle_text_change}
        onBlur={handlers.handle_text_blur}
        title="Title"
      />
      <AddProjects_textEntry
        state={states.addingProject_generalInfo}
        key="Describtions_Brief"
        items={descriptions_brief}
        onChange={handlers.handle_text_change}
        onBlur={handlers.handle_text_blur}
        title="Brief Describtions"
      />
      <AddProjects_textEntry
        state={states.addingProject_generalInfo}
        key="Describtions_Detailed"
        items={descriptions_detailed}
        onChange={handlers.handle_text_change}
        onBlur={handlers.handle_text_blur}
        title="Detailed Describtions"
      />
    </div>
  );
};

export default AddProjectsForm_generalInfo;

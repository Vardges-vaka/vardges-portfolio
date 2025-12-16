import {
  IconGlobal,
  ButtonGlobal,
  InputGlobal,
  SelectGlobal,
  PasswordInput,
  CheckboxGlobal,
} from "../../../../../../01_components/components.index.js";
import {
  AddProjectsForm_generalInfo,
  AddProjectsForm_specificInfo,
  AddProjectsForm_config,
  NewProjectsForm_header,
  NewProjectsForm_footer,
} from "./projects.childComps/_projects.childComps.index.js";
import "../00_styles/session_Adding_Project.css";

const Session_Adding_Project = ({
  states,
  handlers,
  childProps,
  translations,
  status,
}) => {
  const {
    generalInfo_props,
    specificInfo_props,
    config_props,
    Adding_Project_footer_props,
    Adding_Project_Header_props,
  } = childProps;

  // const addingSteps = ["generalInfo", "specificInfo", "config"];

  return (
    <div className="Session_Adding_Project">
      <NewProjectsForm_header
        states={Adding_Project_Header_props.states}
        handlers={Adding_Project_Header_props.handlers}
      />

      <div className="Session_Adding_Project_content">
        {states.addingStep === "generalInfo" && (
          <AddProjectsForm_generalInfo
            states={generalInfo_props.states}
            handlers={generalInfo_props.handlers}
          />
        )}
        {states.addingStep === "specificInfo" && (
          <AddProjectsForm_specificInfo
            states={specificInfo_props.states}
            handlers={specificInfo_props.handlers}
          />
        )}
        {states.addingStep === "config" && (
          <AddProjectsForm_config
            states={config_props.states}
            handlers={config_props.handlers}
          />
        )}
      </div>
      <NewProjectsForm_footer
        states={Adding_Project_footer_props.states}
        handlers={Adding_Project_footer_props.handlers}
      />
    </div>
  );
};

export default Session_Adding_Project;

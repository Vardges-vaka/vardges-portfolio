import {
  IconGlobal,
  ButtonGlobal,
  InputGlobal,
  SelectGlobal,
  PasswordInput,
  CheckboxGlobal,
} from "../../../../../../../01_components/components.index.js";
import {
  NewProjectsForm_webApp,
  NewProjectsForm_mobileApp,
  NewProjectsForm_desktopApp,
  NewProjectsForm_branding,
  NewProjectsForm_marketing,
  NewProjectsForm_advertizing,
} from "./_projects.childComps.index.js";
import "../../00_styles/addProjectsForm_specificInfo.css";

const AddProjectsForm_specificInfo = ({ states, handlers }) => {
  const renderSpecificForm = () => {
    switch (states.addingProject_type) {
      case "Web App":
        return <NewProjectsForm_webApp states={states} handlers={handlers} />;
      case "Mobile App":
        return (
          <NewProjectsForm_mobileApp states={states} handlers={handlers} />
        );
      case "Desktop App":
        return (
          <NewProjectsForm_desktopApp states={states} handlers={handlers} />
        );
      case "Branding":
        return <NewProjectsForm_branding states={states} handlers={handlers} />;
      case "Marketing":
        return (
          <NewProjectsForm_marketing states={states} handlers={handlers} />
        );
      case "Advertizing":
        return (
          <NewProjectsForm_advertizing states={states} handlers={handlers} />
        );
      default:
        return null;
    }
  };
  return (
    <div className="AddProjectsForm_specificInfo">{renderSpecificForm()}</div>
  );
};

export default AddProjectsForm_specificInfo;

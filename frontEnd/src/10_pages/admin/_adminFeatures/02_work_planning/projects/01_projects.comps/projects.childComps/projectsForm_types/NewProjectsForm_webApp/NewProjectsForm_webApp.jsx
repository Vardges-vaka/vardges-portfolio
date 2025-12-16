import {
  IconGlobal,
  ButtonGlobal,
  InputGlobal,
  SelectGlobal,
  PasswordInput,
  CheckboxGlobal,
} from "../../../../../../../../../01_components/components.index.js";
import {
  DATABASES,
  CLOUD_STORAGES,
  FRONTEND_PACKAGES,
  BACKEND_PACKAGES,
  TECH_STACKS,
} from "../../../../05_projects.constances/_projects.constances.index.js";
import WebApp_togglers from "./WebApp_togglers.jsx";
import WebApp_techStack from "./WebApp_techStack.jsx";
import WebApp_packages from "./WebApp_packages.jsx";

import "../../../../00_styles/newProjectsForm_webApp.css";

export const NEW_PROJECT_INFO = {
  db: "",
  links: {
    gitHub: "",
    url: "",
  },
  cloudStorage: "",
  hasBackEnd: false,
  shouldShowPackages: false,

  techStack: [""],
  packages: [
    {
      ref: "frontEnd",
      name: "",
    },
  ],
};
// handleSpecificInfo_togglers
const NewProjectsForm_webApp = ({ states, handlers }) => {
  console.log(
    "states.addingProject_specificInfo",
    states.addingProject_specificInfo
  );
  return (
    <div className="NewProjectsForm_webApp">
      <div className="NewProjectsForm_webApp links">
        <label>links to the project</label>
        <input
          type="text"
          placeholder="GitHub"
          data-field="links"
          data-subfield="gitHub"
          value={states.addingProject_specificInfo.links.gitHub.value}
          onChange={handlers.handleSpecificInfo_text_change}
          onBlur={handlers.handleSpecificInfo_text_blur}
        />
        <input
          type="text"
          placeholder="URL"
          data-field="links"
          data-subfield="url"
          value={states.addingProject_specificInfo.links.url.value}
          onChange={handlers.handleSpecificInfo_text_change}
          onBlur={handlers.handleSpecificInfo_text_blur}
        />
      </div>
      <div className="NewProjectsForm_webApp cloudStorage">
        <label>Cloud Storage</label>

        {/* {state ? state : "Not Selected"} */}
        <select
          value={states.addingProject_specificInfo.cloudStorage.value}
          data-field="cloudStorage"
          onChange={handlers.handleSpecificInfo_text_change}
          style={{ marginBottom: "1rem" }}>
          <option value="" disabled>
            Select an option...
          </option>
          {CLOUD_STORAGES.map((opt, index) => (
            <option key={index} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {states.addingProject_specificInfo.cloudStorage.value}
      </div>
      <div className="NewProjectsForm_webApp cloudStorage">
        <label>Database</label>

        {/* {state ? state : "Not Selected"} */}
        <select
          value={states.addingProject_specificInfo.db.value}
          data-field="db"
          onChange={handlers.handleSpecificInfo_text_change}
          style={{ marginBottom: "1rem" }}>
          <option value="" disabled>
            Select an option...
          </option>
          {DATABASES.map((opt, index) => (
            <option key={index} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {states.addingProject_specificInfo.db.value}
      </div>

      <WebApp_togglers states={states} handlers={handlers} />
      <WebApp_techStack states={states} handlers={handlers} />
      <WebApp_packages states={states} handlers={handlers} />
    </div>
  );
};

export default NewProjectsForm_webApp;

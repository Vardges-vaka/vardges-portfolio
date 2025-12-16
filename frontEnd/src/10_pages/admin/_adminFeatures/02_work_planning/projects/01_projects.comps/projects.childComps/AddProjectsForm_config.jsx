import {
  IconGlobal,
  ButtonGlobal,
  InputGlobal,
  SelectGlobal,
  PasswordInput,
  CheckboxGlobal,
} from "../../../../../../../01_components/components.index.js";
import { AddProjects_timing } from "./_projects.childComps.index.js";
import { GLOBAL_PRIORITIES } from "../../05_projects.constances/_projects.constances.index.js";
import { AddProjects_timing_togglers } from "./_projects.childComps.index.js";

import "../../00_styles/addProjectsForm_config.css";

const AddProjectsForm_config = ({ states, handlers }) => {
  return (
    <div className="AddProjectsForm_config">
      <h2>Configuration</h2>
      <AddProjects_timing_togglers states={states} handlers={handlers} />
      <AddProjects_timing states={states} handlers={handlers} />
      <label>Priority</label>
      <select
        value={states.addingProject_config.priority}
        onChange={handlers.handleConfig_Priority_change}
        style={{ marginBottom: "1rem" }}>
        <option value="" disabled>
          Select an option...
        </option>
        {GLOBAL_PRIORITIES.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AddProjectsForm_config;

import { PROJECT_TYPES } from "../../05_projects.constances/_projects.constances.index.js";

import "../../00_styles/addProjects_type.css";

const AddProjects_type = ({ state, onChange, onBlur }) => {
  return (
    <div className="AddProjects_type">
      {state ? state : "Not Selected"}
      <select
        value={state ? state : "Not Selected"}
        onChange={onChange}
        onBlur={onBlur}
        style={{ marginBottom: "1rem" }}>
        <option value="" disabled>
          Select an option...
        </option>
        {PROJECT_TYPES.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AddProjects_type;

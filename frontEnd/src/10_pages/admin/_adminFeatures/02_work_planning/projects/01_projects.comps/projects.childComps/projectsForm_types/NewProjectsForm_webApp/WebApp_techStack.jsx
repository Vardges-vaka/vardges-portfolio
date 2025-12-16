import { TECH_STACKS } from "../../../../05_projects.constances/_projects.constances.index.js";

import "../../../../00_styles/webApp_techStack.css";

const WebApp_techStack = ({ states, handlers }) => {
  // Filter out empty strings and get selected tech stacks
  const selectedTechStack = states.addingProject_specificInfo.techStack.filter(
    (tech) => tech !== ""
  );

  // Get available tech stacks (not selected)
  const availableTechStack = TECH_STACKS.filter(
    (tech) => !selectedTechStack.includes(tech)
  );

  return (
    <div className="NewProjectsForm_webApp WebApp_techStack">
      <label className="WebApp_techStack__label">Tech Stack</label>

      {/* Available Tech Stack Pool */}
      <div className="WebApp_techStack__available">
        <h3 className="WebApp_techStack__pool-title">Available</h3>
        <div className="WebApp_techStack__pool">
          {availableTechStack.length > 0 ? (
            availableTechStack.map((tech, index) => (
              <button
                key={index}
                type="button"
                className="WebApp_techStack__item WebApp_techStack__item--available"
                data-item={tech}
                onClick={handlers.handleSpecificInfo_techStack_change}>
                {tech}
              </button>
            ))
          ) : (
            <p className="WebApp_techStack__empty">All tech stacks selected</p>
          )}
        </div>
      </div>

      {/* Selected Tech Stack Pool */}
      <div className="WebApp_techStack__selected">
        <h3 className="WebApp_techStack__pool-title">Selected</h3>
        <div className="WebApp_techStack__pool">
          {selectedTechStack.length > 0 ? (
            selectedTechStack.map((tech, index) => (
              <div
                key={index}
                className="WebApp_techStack__item WebApp_techStack__item--selected">
                <span>{tech}</span>
                <button
                  type="button"
                  className="WebApp_techStack__remove-btn"
                  data-item={tech}
                  onClick={handlers.handleSpecificInfo_techStack_remove}
                  aria-label={`Remove ${tech}`}>
                  ×
                </button>
              </div>
            ))
          ) : (
            <p className="WebApp_techStack__empty">No tech stacks selected</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebApp_techStack;

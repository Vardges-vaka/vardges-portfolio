import "../../00_styles/addProjects_timing_togglers.css";

const AddProjects_timing_togglers = ({ states, handlers }) => {
  return (
    <div className="AddProjects_timing_togglers">
      <div className="NewProjectsForm_webApp__toggler">
        <label
          htmlFor="isPublic-toggle"
          className="NewProjectsForm_webApp__toggler-label">
          is Public?
        </label>
        <label className="NewProjectsForm_webApp__toggle-switch">
          <input
            type="checkbox"
            id="isPublic-toggle"
            data-field="isPublic"
            checked={states.addingProject_config.isPublic}
            onChange={handlers.handleConfig_togglers}
          />
          <span className="NewProjectsForm_webApp__toggle-slider"></span>
        </label>
      </div>
      <div className="NewProjectsForm_webApp__toggler">
        <label
          htmlFor="timing-isOngoing-toggle"
          className="NewProjectsForm_webApp__toggler-label">
          is Ongoing?
        </label>
        <label className="NewProjectsForm_webApp__toggle-switch">
          <input
            type="checkbox"
            id="timing-isOngoing-toggle"
            data-field="timing"
            data-subfield="isOngoing"
            checked={states.addingProject_config.timing.isOngoing}
            onChange={handlers.handleConfig_togglers}
          />
          <span className="NewProjectsForm_webApp__toggle-slider"></span>
        </label>
      </div>

      <div className="NewProjectsForm_webApp__toggler">
        <label
          htmlFor="timing-isDeadline-toggle"
          className="NewProjectsForm_webApp__toggler-label">
          is there a Deadline?
        </label>
        <label className="NewProjectsForm_webApp__toggle-switch">
          <input
            type="checkbox"
            id="timing-isDeadline-toggle"
            data-field="timing"
            data-subfield="isDeadline"
            checked={states.addingProject_config.timing.isDeadline}
            onChange={handlers.handleConfig_togglers}
          />
          <span className="NewProjectsForm_webApp__toggle-slider"></span>
        </label>
      </div>
    </div>
  );
};

export default AddProjects_timing_togglers;

import "../../../../00_styles/webApp_togglers.css";

const WebApp_togglers = ({ states, handlers }) => {
  return (
    <div className="NewProjectsForm_webApp togglers">
      <div className="NewProjectsForm_webApp__toggler">
        <label
          htmlFor="hasBackEnd-toggle"
          className="NewProjectsForm_webApp__toggler-label">
          Has Backend
        </label>
        <label className="NewProjectsForm_webApp__toggle-switch">
          <input
            type="checkbox"
            id="hasBackEnd-toggle"
            data-field="hasBackEnd"
            checked={states.addingProject_specificInfo.hasBackEnd}
            onChange={handlers.handleSpecificInfo_togglers}
          />
          <span className="NewProjectsForm_webApp__toggle-slider"></span>
        </label>
      </div>
      <div className="NewProjectsForm_webApp__toggler">
        <label
          htmlFor="shouldShowPackages-toggle"
          className="NewProjectsForm_webApp__toggler-label">
          Show Packages
        </label>
        <label className="NewProjectsForm_webApp__toggle-switch">
          <input
            type="checkbox"
            id="shouldShowPackages-toggle"
            data-field="shouldShowPackages"
            checked={states.addingProject_specificInfo.shouldShowPackages}
            onChange={handlers.handleSpecificInfo_togglers}
          />
          <span className="NewProjectsForm_webApp__toggle-slider"></span>
        </label>
      </div>
    </div>
  );
};

export default WebApp_togglers;

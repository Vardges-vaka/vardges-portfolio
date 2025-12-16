import {
  FRONTEND_PACKAGES,
  BACKEND_PACKAGES,
} from "../../../../05_projects.constances/_projects.constances.index.js";

import "../../../../00_styles/webApp_packages.css";

const WebApp_packages = ({ states, handlers }) => {
  // Filter out empty packages and separate by ref
  const selectedPackages = states.addingProject_specificInfo.packages.filter(
    (pkg) => pkg.name !== ""
  );

  const selectedFrontendPackages = selectedPackages
    .filter((pkg) => pkg.ref === "frontEnd")
    .map((pkg) => pkg.name);

  const selectedBackendPackages = selectedPackages
    .filter((pkg) => pkg.ref === "backEnd")
    .map((pkg) => pkg.name);

  // Get available packages (not selected)
  const availableFrontendPackages = FRONTEND_PACKAGES.filter(
    (pkg) => !selectedFrontendPackages.includes(pkg)
  );

  const availableBackendPackages = BACKEND_PACKAGES.filter(
    (pkg) => !selectedBackendPackages.includes(pkg)
  );

  return (
    <div className="NewProjectsForm_webApp WebApp_packages">
      <label className="WebApp_packages__label">Packages</label>

      {/* Frontend Packages Section */}
      <div className="WebApp_packages__section">
        <h3 className="WebApp_packages__section-title">Frontend Packages</h3>

        {/* Available Frontend Packages */}
        <div className="WebApp_packages__available">
          <h4 className="WebApp_packages__pool-title">Available</h4>
          <div className="WebApp_packages__pool">
            {availableFrontendPackages.length > 0 ? (
              availableFrontendPackages.map((pkg, index) => (
                <button
                  key={index}
                  type="button"
                  className="WebApp_packages__item WebApp_packages__item--available"
                  data-item={pkg}
                  data-ref="frontEnd"
                  onClick={handlers.handleSpecificInfo_packages_change}>
                  {pkg}
                </button>
              ))
            ) : (
              <p className="WebApp_packages__empty">
                All frontend packages selected
              </p>
            )}
          </div>
        </div>

        {/* Selected Frontend Packages */}
        <div className="WebApp_packages__selected">
          <h4 className="WebApp_packages__pool-title">Selected</h4>
          <div className="WebApp_packages__pool">
            {selectedFrontendPackages.length > 0 ? (
              selectedFrontendPackages.map((pkg, index) => (
                <div
                  key={index}
                  className="WebApp_packages__item WebApp_packages__item--selected">
                  <span>{pkg}</span>
                  <button
                    type="button"
                    className="WebApp_packages__remove-btn"
                    data-item={pkg}
                    data-ref="frontEnd"
                    onClick={handlers.handleSpecificInfo_packages_remove}
                    aria-label={`Remove ${pkg}`}>
                    ×
                  </button>
                </div>
              ))
            ) : (
              <p className="WebApp_packages__empty">
                No frontend packages selected
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Backend Packages Section */}
      {states.addingProject_specificInfo.hasBackEnd && (
        <div className="WebApp_packages__section">
          <h3 className="WebApp_packages__section-title">Backend Packages</h3>

          {/* Available Backend Packages */}
          <div className="WebApp_packages__available">
            <h4 className="WebApp_packages__pool-title">Available</h4>
            <div className="WebApp_packages__pool">
              {availableBackendPackages.length > 0 ? (
                availableBackendPackages.map((pkg, index) => (
                  <button
                    key={index}
                    type="button"
                    className="WebApp_packages__item WebApp_packages__item--available"
                    data-item={pkg}
                    data-ref="backEnd"
                    onClick={handlers.handleSpecificInfo_packages_change}>
                    {pkg}
                  </button>
                ))
              ) : (
                <p className="WebApp_packages__empty">
                  All backend packages selected
                </p>
              )}
            </div>
          </div>

          {/* Selected Backend Packages */}
          <div className="WebApp_packages__selected">
            <h4 className="WebApp_packages__pool-title">Selected</h4>
            <div className="WebApp_packages__pool">
              {selectedBackendPackages.length > 0 ? (
                selectedBackendPackages.map((pkg, index) => (
                  <div
                    key={index}
                    className="WebApp_packages__item WebApp_packages__item--selected">
                    <span>{pkg}</span>
                    <button
                      type="button"
                      className="WebApp_packages__remove-btn"
                      data-item={pkg}
                      data-ref="backEnd"
                      onClick={handlers.handleSpecificInfo_packages_remove}
                      aria-label={`Remove ${pkg}`}>
                      ×
                    </button>
                  </div>
                ))
              ) : (
                <p className="WebApp_packages__empty">
                  No backend packages selected
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebApp_packages;

import {
  EMPTY_LOGIN_CREDENTIAL_ROW,
  getEmployeeDisplayName,
} from "../../02_brands_helpers/_brands_helpers.index.js";
import "../../_styles/brands_detail_integration.css";

const LOGIN_FIELDS = [
  ["belongTo.name", "belongToName", "text"],
  ["username", "username", "text"],
  ["password", "password", "password"],
  ["email", "email", "email"],
  ["phoneNumber", "phoneNumber", "text"],
  ["type", "type", "text"],
];

const errorText = (t, code) => (code ? t(`validation.${code}`) : null);

const setRowPath = (row, path, value) => {
  const next = { ...row };
  const keys = path.split(".");
  let cursor = next;
  for (let index = 0; index < keys.length - 1; index += 1) {
    cursor[keys[index]] = { ...(cursor[keys[index]] ?? {}) };
    cursor = cursor[keys[index]];
  }
  cursor[keys[keys.length - 1]] = value;
  return next;
};

const Brands_detail_integration_logins = ({
  draft,
  fieldErrors = {},
  employeesList = [],
  onDraftChange,
  t,
}) => {
  const logins = Array.isArray(draft?.loginCredentials)
    ? draft.loginCredentials
    : [];

  const replaceLogins = (next) => onDraftChange("loginCredentials", next);
  const changeLogin = (index, path, value) => {
    const next = logins.slice();
    next[index] = setRowPath(next[index] ?? {}, path, value);
    replaceLogins(next);
  };
  const rowError = (index, path) =>
    errorText(t, fieldErrors?.[`loginCredentials[${index}].${path}`]);

  return (
    <div className="brandsDetailIntegration_subSection">
      <div className="brandsDetailIntegration_subHeader">
        <h4 className="brandsDetailIntegration_subTitle">
          {t("sections.loginCredentials")}
        </h4>
        <button
          type="button"
          className="brandsDetailIntegration_addBtn"
          onClick={() =>
            replaceLogins([...logins, { ...EMPTY_LOGIN_CREDENTIAL_ROW }])
          }>
          {t("actions.addLogin")}
        </button>
      </div>

      {logins.length === 0 ? (
        <p className="brandsDetailIntegration_empty">{t("empty.noLogins")}</p>
      ) : (
        <div className="brandsDetailIntegration_array">
          {logins.map((login, index) => (
            <div key={login._id || index} className="brandsDetailIntegration_arrayRow">
              <div className="brandsDetailIntegration_grid">
                <label className="brandsDetailIntegration_field">
                  <span className="brandsDetailIntegration_label">
                    {t("fields.belongToEmployeeId")}
                  </span>
                  <select
                    className="brandsDetailIntegration_input"
                    value={login.belongTo?.employeeId ?? ""}
                    onChange={(e) =>
                      changeLogin(index, "belongTo.employeeId", e.target.value)
                    }>
                    <option value="">{t("empty.noValue")}</option>
                    {employeesList.map((employee) => (
                      <option key={employee._id} value={employee._id}>
                        {getEmployeeDisplayName(employee)}
                      </option>
                    ))}
                  </select>
                  {rowError(index, "belongTo.employeeId") && (
                    <small className="brandsDetailIntegration_error">
                      {rowError(index, "belongTo.employeeId")}
                    </small>
                  )}
                </label>

                {LOGIN_FIELDS.map(([path, label, type]) => (
                  <label className="brandsDetailIntegration_field" key={path}>
                    <span className="brandsDetailIntegration_label">
                      {t(`fields.${label}`)}
                    </span>
                    <input
                      className="brandsDetailIntegration_input"
                      type={type}
                      autoComplete={type === "password" ? "off" : undefined}
                      value={
                        path.includes(".")
                          ? login.belongTo?.name ?? ""
                          : login[path] ?? ""
                      }
                      onChange={(e) => changeLogin(index, path, e.target.value)}
                    />
                    {rowError(index, path) && (
                      <small className="brandsDetailIntegration_error">
                        {rowError(index, path)}
                      </small>
                    )}
                  </label>
                ))}
              </div>

              <label className="brandsDetailIntegration_checkbox">
                <input
                  type="checkbox"
                  checked={!!login.doesOtpRequired}
                  onChange={(e) =>
                    changeLogin(index, "doesOtpRequired", e.target.checked)
                  }
                />
                <span>{t("fields.doesOtpRequired")}</span>
              </label>

              <button
                type="button"
                className="brandsDetailIntegration_removeBtn"
                onClick={() => replaceLogins(logins.filter((_, i) => i !== index))}>
                {t("actions.remove")}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Brands_detail_integration_logins;

import "../_styles/employees_tablePlaceholder.css";
const Employees_tablePlaceholder = ({ t }) => (
  <div className="employeesTablePlaceholder">
    <h2>{t("placeholders.tableTitle")}</h2>
    <p>{t("placeholders.tableDescription")}</p>
  </div>
);
export default Employees_tablePlaceholder;

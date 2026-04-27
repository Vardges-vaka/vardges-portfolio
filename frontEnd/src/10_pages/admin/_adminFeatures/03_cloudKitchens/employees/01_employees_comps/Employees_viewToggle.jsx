import "../_styles/employees_viewToggle.css";
const Employees_viewToggle = ({ viewMode, onChange, t }) => (
  <div className="employeesViewToggle">
    {["list", "table"].map((mode) => (
      <button key={mode} type="button" className={"employeesViewToggle__btn" + (viewMode === mode ? " employeesViewToggle__btn--active" : "")} onClick={() => onChange(mode)}>
        {t(`viewModes.${mode}`)}
      </button>
    ))}
  </div>
);
export default Employees_viewToggle;

import { Employees_list_item } from "./employees_childComps/_employees_childComps.index.js";
import "../_styles/employees_list.css";
const Employees_list = ({ employees, isLoading, error, onShowAddForm, onView, onEdit, onAddFiles, onAddImages, t }) => (
  <div className="employeesList">
    <div className="employeesList__header">
      <h2>{t("title")}</h2>
      <button type="button" onClick={onShowAddForm}>+ {t("addEmployee")}</button>
    </div>
    {error && <p className="employeesList__error">{error}</p>}
    {isLoading && <p>{t("loading")}</p>}
    {!isLoading && employees.length === 0 && <p>{t("empty.noEmployees")}</p>}
    <div className="employeesList__items">
      {employees.map((employee) => <Employees_list_item key={employee._id} employee={employee} onView={onView} onEdit={onEdit} onAddFiles={onAddFiles} onAddImages={onAddImages} t={t} />)}
    </div>
  </div>
);
export default Employees_list;

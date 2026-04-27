import { useEmployees } from "./03_employees_hooks/_employees_hooks.index.js";
import {
  Employees_viewToggle,
  Employees_list,
  Employees_tablePlaceholder,
  Employees_addForm,
  Employees_detail,
  Employees_confirmModal,
  Employees_discardModal,
  Employees_deleteModal,
} from "./01_employees_comps/_employees_comps.index.js";
import "./_styles/employees.css";

const Employees = () => {
  const { states, compProps } = useEmployees();
  const { viewMode, showAddForm, confirmModal, discardModal, deleteModal } = states;
  return (
    <div className="employees">
      <Employees_viewToggle {...compProps.Employees_viewToggle_props} />
      {viewMode === "list" && <Employees_list {...compProps.Employees_list_props} />}
      {viewMode === "table" && <Employees_tablePlaceholder {...compProps.Employees_tablePlaceholder_props} />}
      {viewMode === "detail" && <Employees_detail {...compProps.Employees_detail_props} />}
      {showAddForm && <Employees_addForm {...compProps.Employees_addForm_props} />}
      {confirmModal.isOpen && <Employees_confirmModal {...compProps.Employees_confirmModal_props} />}
      {discardModal.isOpen && <Employees_discardModal {...compProps.Employees_discardModal_props} />}
      {deleteModal.isOpen && <Employees_deleteModal {...compProps.Employees_deleteModal_props} />}
    </div>
  );
};
export default Employees;

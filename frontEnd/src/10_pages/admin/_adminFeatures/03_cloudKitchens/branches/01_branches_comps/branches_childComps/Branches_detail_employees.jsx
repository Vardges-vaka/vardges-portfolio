import "../../_styles/branches_detail_employees.css";

const Branches_detail_employees = ({ t }) => {
  return (
    <section className="branchesDetailEmployees branchesDetailPlaceholder">
      <header className="branchesDetailPlaceholder__header">
        <h3 className="branchesDetailPlaceholder__title">
          {t("sections.employees")}
        </h3>
      </header>
      <p className="branchesDetailPlaceholder__body">
        {t("placeholders.employeesDescription")}
      </p>
    </section>
  );
};

export default Branches_detail_employees;

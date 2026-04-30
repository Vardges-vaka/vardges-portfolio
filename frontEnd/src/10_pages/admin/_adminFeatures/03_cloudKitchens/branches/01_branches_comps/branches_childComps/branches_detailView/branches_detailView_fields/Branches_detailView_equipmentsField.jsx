import "../../../../_styles/branches_detail_equipments.css";

const Branches_detailView_equipmentsField = ({ t }) => {
  return (
    <section className="branchesDetailEquipments branchesDetailPlaceholder">
      <header className="branchesDetailPlaceholder__header">
        <h3 className="branchesDetailPlaceholder__title">
          {t("sections.equipments")}
        </h3>
      </header>
      <p className="branchesDetailPlaceholder__body">
        {t("placeholders.equipmentsDescription")}
      </p>
    </section>
  );
};

export default Branches_detailView_equipmentsField;

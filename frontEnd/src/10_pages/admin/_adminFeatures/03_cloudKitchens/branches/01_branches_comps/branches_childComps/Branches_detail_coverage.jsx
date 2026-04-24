import "../../_styles/branches_detail_coverage.css";

// Placeholder — real coverage editor (polygons + radii on Google Maps) will
// arrive in its own plan. Branch schema already stores `coverageAreas`.
const Branches_detail_coverage = ({ t }) => {
  return (
    <section className="branchesDetailCoverage branchesDetailPlaceholder">
      <header className="branchesDetailPlaceholder__header">
        <h3 className="branchesDetailPlaceholder__title">
          {t("sections.coverage")}
        </h3>
      </header>
      <p className="branchesDetailPlaceholder__body">
        {t("placeholders.coverageDescription")}
      </p>
    </section>
  );
};

export default Branches_detail_coverage;

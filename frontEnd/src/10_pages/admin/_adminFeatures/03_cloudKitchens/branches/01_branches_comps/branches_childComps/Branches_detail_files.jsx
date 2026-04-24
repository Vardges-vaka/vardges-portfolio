import "../../_styles/branches_detail_files.css";

// Placeholder — S3 upload flow (contract PDF + gallery images) coming later.
const Branches_detail_files = ({ t }) => {
  return (
    <section className="branchesDetailFiles branchesDetailPlaceholder">
      <header className="branchesDetailPlaceholder__header">
        <h3 className="branchesDetailPlaceholder__title">
          {t("sections.files")}
        </h3>
      </header>
      <p className="branchesDetailPlaceholder__body">
        {t("placeholders.filesDescription")}
      </p>
    </section>
  );
};

export default Branches_detail_files;

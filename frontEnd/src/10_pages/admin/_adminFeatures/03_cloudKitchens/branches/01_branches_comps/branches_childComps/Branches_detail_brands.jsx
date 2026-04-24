import "../../_styles/branches_detail_brands.css";

// Placeholder — the Brand model does not exist yet; the Branch schema already
// has a `brands` ref array that a future CRUD will populate.
const Branches_detail_brands = ({ t }) => {
  return (
    <section className="branchesDetailBrands branchesDetailPlaceholder">
      <header className="branchesDetailPlaceholder__header">
        <h3 className="branchesDetailPlaceholder__title">
          {t("sections.brands")}
        </h3>
      </header>
      <p className="branchesDetailPlaceholder__body">
        {t("placeholders.brandsDescription")}
      </p>
    </section>
  );
};

export default Branches_detail_brands;

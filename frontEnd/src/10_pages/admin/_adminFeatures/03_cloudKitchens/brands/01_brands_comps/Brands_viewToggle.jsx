import "../_styles/brands_viewToggle.css";

const Brands_viewToggle = ({ viewMode, onChange, t }) => (
  <div className="brandsViewToggle">
    {["list", "table"].map((mode) => (
      <button
        key={mode}
        type="button"
        className={
          "brandsViewToggle__btn" +
          (viewMode === mode ? " brandsViewToggle__btn--active" : "")
        }
        onClick={() => onChange(mode)}
      >
        {t(`viewModes.${mode}`)}
      </button>
    ))}
  </div>
);

export default Brands_viewToggle;

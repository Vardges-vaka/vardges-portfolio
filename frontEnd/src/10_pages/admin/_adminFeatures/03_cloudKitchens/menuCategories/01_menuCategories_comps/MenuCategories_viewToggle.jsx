import "../_styles/menuCategories_viewToggle.css";

const MenuCategories_viewToggle = ({ viewMode, onChange, t }) => (
  <div className="menuCategoriesViewToggle">
    {["list", "table"].map((mode) => (
      <button
        key={mode}
        type="button"
        className={
          "menuCategoriesViewToggle__btn" +
          (viewMode === mode ? " menuCategoriesViewToggle__btn--active" : "")
        }
        onClick={() => onChange(mode)}
      >
        {t(`viewModes.${mode}`)}
      </button>
    ))}
  </div>
);

export default MenuCategories_viewToggle;

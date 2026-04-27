import "../_styles/menuItems_viewToggle.css";

const MenuItems_viewToggle = ({ viewMode, onChange, t }) => (
  <div className="menuItemsViewToggle">
    {["list", "table"].map((mode) => (
      <button
        key={mode}
        type="button"
        className={
          "menuItemsViewToggle__btn" +
          (viewMode === mode ? " menuItemsViewToggle__btn--active" : "")
        }
        onClick={() => onChange(mode)}
      >
        {t(`viewModes.${mode}`)}
      </button>
    ))}
  </div>
);

export default MenuItems_viewToggle;

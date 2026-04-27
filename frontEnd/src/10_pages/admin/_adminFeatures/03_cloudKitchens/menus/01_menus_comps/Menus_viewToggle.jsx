import "../_styles/menus_viewToggle.css";

const Menus_viewToggle = ({ viewMode, onChange, t }) => (
  <div className="menusViewToggle">
    {["list", "table"].map((mode) => (
      <button
        key={mode}
        type="button"
        className={
          "menusViewToggle__btn" +
          (viewMode === mode ? " menusViewToggle__btn--active" : "")
        }
        onClick={() => onChange(mode)}
      >
        {t(`viewModes.${mode}`)}
      </button>
    ))}
  </div>
);

export default Menus_viewToggle;

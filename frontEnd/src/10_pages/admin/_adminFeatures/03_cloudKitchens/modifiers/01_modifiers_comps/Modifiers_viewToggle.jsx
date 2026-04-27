import "../_styles/modifiers_viewToggle.css";

const Modifiers_viewToggle = ({ viewMode, onChange, t }) => (
  <div className="modifiersViewToggle">
    {["list", "table"].map((mode) => (
      <button
        key={mode}
        type="button"
        className={
          "modifiersViewToggle__btn" +
          (viewMode === mode ? " modifiersViewToggle__btn--active" : "")
        }
        onClick={() => onChange(mode)}
      >
        {t(`viewModes.${mode}`)}
      </button>
    ))}
  </div>
);

export default Modifiers_viewToggle;

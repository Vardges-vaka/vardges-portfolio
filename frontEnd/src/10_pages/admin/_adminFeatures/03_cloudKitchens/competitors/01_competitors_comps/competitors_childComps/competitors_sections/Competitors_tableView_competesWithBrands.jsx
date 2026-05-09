import "../../../_styles/competitors_tableView_competesWithBrands.css";

const Competitors_tableView_competesWithBrands = ({
  states,
  handlers,
  compProps,
  t,
}) => {
  const isEditing = !!states?.isEditing;
  return (
    <div className="competitors_tableView_competesWithBrands">
      <div className="competitors_tableView_competesWithBrands__topbar">
        <button
          type="button"
          onClick={() => (isEditing ? handlers?.handleStopEditing?.() : handlers?.handleToggleEditingMode?.())}
        >
          {isEditing ? (t ? t("actions.done", "Done") : "Done") : (t ? t("actions.edit", "Edit") : "Edit")}
        </button>
      </div>
      <h1>session: view_competesWithBrands </h1>
      <h2>Competes With Brands</h2>
    </div>
  );
};

export default Competitors_tableView_competesWithBrands;

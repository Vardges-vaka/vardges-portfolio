import "../../../_styles/competitors_tableView_cuisineTypes.css";

const Competitors_tableView_cuisineTypes = ({
  states,
  handlers,
  compProps,
  t,
}) => {
  const isEditing = !!states?.isEditing;
  return (
    <div className="competitors_tableView_cuisineTypes">
      <div className="competitors_tableView_cuisineTypes__topbar">
        <button
          type="button"
          onClick={() => (isEditing ? handlers?.handleStopEditing?.() : handlers?.handleToggleEditingMode?.())}
        >
          {isEditing ? (t ? t("actions.done", "Done") : "Done") : (t ? t("actions.edit", "Edit") : "Edit")}
        </button>
      </div>
      <h1>session: view_cuisineTypes </h1>
      <h2>Cuisine Types</h2>
    </div>
  );
};

export default Competitors_tableView_cuisineTypes;

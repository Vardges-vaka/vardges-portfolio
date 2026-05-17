import "../../../_styles/competitors_tableView_menu.css";

const Competitors_tableView_menu = ({
  states,
  handlers,
  t,
}) => {
  const isEditing = !!states?.isEditing;
  return (
    <div className="Competitors_tableView_menu">
      <div className="Competitors_tableView_menu_topbar">
        <button
          type="button"
          onClick={() => (isEditing ? handlers?.handleStopEditing?.() : handlers?.handleToggleEditingMode?.())}
        >
          {isEditing ? (t ? t("actions.done", "Done") : "Done") : (t ? t("actions.edit", "Edit") : "Edit")}
        </button>
      </div>
      <h1>session: view_menu </h1>
      <h2>Menu</h2>
    </div>
  );
};

export default Competitors_tableView_menu;

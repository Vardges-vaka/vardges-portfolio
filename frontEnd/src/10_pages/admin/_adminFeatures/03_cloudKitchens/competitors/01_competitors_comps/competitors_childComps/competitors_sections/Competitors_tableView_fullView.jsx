import "../../../_styles/competitors_tableView_fullView.css";

const Competitors_tableView_fullView = ({
  states,
  handlers,
  t,
}) => {
  const isEditing = !!states?.isEditing;
  return (
    <div className="Competitors_tableView_fullView">
      <div className="Competitors_tableView_fullView_topbar">
        <button
          type="button"
          onClick={() =>
            isEditing
              ? handlers?.handleStopEditing?.()
              : handlers?.handleToggleEditingMode?.()
          }
        >
          {isEditing
            ? t
              ? t("actions.done", "Done")
              : "Done"
            : t
              ? t("actions.edit", "Edit")
              : "Edit"}
        </button>
      </div>
      <h1>session: view_fullView </h1>
      <h2>Full View</h2>
    </div>
  );
};

export default Competitors_tableView_fullView;

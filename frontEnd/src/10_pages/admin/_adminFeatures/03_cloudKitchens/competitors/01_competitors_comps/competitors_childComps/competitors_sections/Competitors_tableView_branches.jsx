import "../../../_styles/competitors_tableView_branches.css";

const Competitors_tableView_branches = ({ states, handlers, compProps, t }) => {
  const isEditing = !!states?.isEditing;
  return (
    <div className="competitors_tableView_branches">
      <div className="competitors_tableView_branches__topbar">
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
      <h1>session: view_branches </h1>
      <h2>Branches</h2>
    </div>
  );
};

export default Competitors_tableView_branches;

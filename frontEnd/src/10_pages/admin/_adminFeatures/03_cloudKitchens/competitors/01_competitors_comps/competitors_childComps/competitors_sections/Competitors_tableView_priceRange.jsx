const Competitors_tableView_priceRange = ({
  states,
  handlers,
  compProps,
  t,
}) => {
  const isEditing = !!states?.isEditing;
  return (
    <div className="competitors_tableView_priceRange">
      <div className="competitors_tableView_priceRange__topbar">
        <button
          type="button"
          onClick={() =>
            isEditing
              ? handlers?.handleStopEditing?.()
              : handlers?.handleToggleEditingMode?.()
          }>
          {isEditing
            ? t
              ? t("actions.done", "Done")
              : "Done"
            : t
              ? t("actions.edit", "Edit")
              : "Edit"}
        </button>
      </div>
      <h1>session: view_priceRange </h1>
      <h2>Price Range</h2>
    </div>
  );
};

export default Competitors_tableView_priceRange;

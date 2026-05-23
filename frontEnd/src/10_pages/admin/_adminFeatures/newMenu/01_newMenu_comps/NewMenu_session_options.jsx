import NewMenu_table_options from "./newMenu_childComps/NewMenu_table_options.jsx";
import NewMenu_option_viewOne from "./newMenu_childComps/NewMenu_option_viewOne.jsx";
import NewMenu_emptyState from "./newMenu_childComps/NewMenu_emptyState.jsx";
import "../_styles/newMenu_session.css";

/* ============================================================================
   NewMenu_session_options — routes between view_all (table) and view_one
   (single-option detail) for the Options session.
============================================================================ */
const NewMenu_session_options = ({
  viewingType,
  options,
  selectedOption,
  isUpdating,
  editingField,
  handlers,
  t,
}) => {
  const tr = (k, fb) => (t ? t(`session.${k}`, { defaultValue: fb }) : fb);

  if (viewingType === "single") {
    return (
      <div className="NewMenu_session NewMenu_session_options">
        <NewMenu_option_viewOne
          option={selectedOption}
          isUpdating={isUpdating}
          editingField={editingField}
          setEditingField={handlers.setEditingField}
          requestConfirm={handlers.requestConfirm}
          t={t}
        />
      </div>
    );
  }

  if (options.length === 0) {
    return (
      <div className="NewMenu_session NewMenu_session_options">
        <NewMenu_emptyState
          title={tr("emptyOptionsTitle", "No options to show")}
          hint={tr("emptyOptionsHint", "Adjust the owner filter or create your first option.")}
        />
      </div>
    );
  }

  return (
    <div className="NewMenu_session NewMenu_session_options">
      <NewMenu_table_options
        options={options}
        onView={handlers.handleViewOption}
        onUpdate={handlers.handleUpdateOption}
        t={t}
      />
    </div>
  );
};

export default NewMenu_session_options;

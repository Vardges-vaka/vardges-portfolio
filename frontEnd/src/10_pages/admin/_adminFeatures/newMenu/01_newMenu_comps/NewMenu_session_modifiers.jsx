import NewMenu_table_modifiers from "./newMenu_childComps/NewMenu_table_modifiers.jsx";
import NewMenu_modifier_viewOne from "./newMenu_childComps/NewMenu_modifier_viewOne.jsx";
import NewMenu_emptyState from "./newMenu_childComps/NewMenu_emptyState.jsx";
import "../_styles/newMenu_session.css";

/* ============================================================================
   NewMenu_session_modifiers — routes between view_all (table) and view_one
   (single-modifier detail) for the Modifiers session.
============================================================================ */
const NewMenu_session_modifiers = ({
  viewingType,
  modifiers,
  selectedModifier,
  isUpdating,
  editingField,
  handlers,
  t,
}) => {
  const tr = (k, fb) => (t ? t(`session.${k}`, { defaultValue: fb }) : fb);

  if (viewingType === "single") {
    return (
      <div className="NewMenu_session NewMenu_session_modifiers">
        <NewMenu_modifier_viewOne
          modifier={selectedModifier}
          isUpdating={isUpdating}
          editingField={editingField}
          setEditingField={handlers.setEditingField}
          requestConfirm={handlers.requestConfirm}
          onViewOption={handlers.handleViewOption}
          onUpdateOption={handlers.handleUpdateOption}
          t={t}
        />
      </div>
    );
  }

  if (modifiers.length === 0) {
    return (
      <div className="NewMenu_session NewMenu_session_modifiers">
        <NewMenu_emptyState
          title={tr("emptyModifiersTitle", "No modifiers to show")}
          hint={tr("emptyModifiersHint", "Adjust the owner filter or create your first modifier.")}
        />
      </div>
    );
  }

  return (
    <div className="NewMenu_session NewMenu_session_modifiers">
      <NewMenu_table_modifiers
        modifiers={modifiers}
        onView={handlers.handleViewModifier}
        onUpdate={handlers.handleUpdateModifier}
        t={t}
      />
    </div>
  );
};

export default NewMenu_session_modifiers;

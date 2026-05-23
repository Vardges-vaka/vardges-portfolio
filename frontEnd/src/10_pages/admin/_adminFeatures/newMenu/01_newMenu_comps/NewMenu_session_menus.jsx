import NewMenu_table_menus from "./newMenu_childComps/NewMenu_table_menus.jsx";
import NewMenu_menu_viewOne from "./newMenu_childComps/NewMenu_menu_viewOne.jsx";
import NewMenu_emptyState from "./newMenu_childComps/NewMenu_emptyState.jsx";
import "../_styles/newMenu_session.css";

/* ============================================================================
   NewMenu_session_menus — routes between view_all (table) and view_one
   (single-menu detail) for the Menus session.
============================================================================ */
const NewMenu_session_menus = ({
  viewingType,
  menus,
  selectedMenu,
  isUpdating,
  editingField,
  handlers,
  t,
}) => {
  const tr = (k, fb) => (t ? t(`session.${k}`, { defaultValue: fb }) : fb);

  if (viewingType === "single") {
    return (
      <div className="NewMenu_session NewMenu_session_menus">
        <NewMenu_menu_viewOne
          menu={selectedMenu}
          isUpdating={isUpdating}
          editingField={editingField}
          setEditingField={handlers.setEditingField}
          requestConfirm={handlers.requestConfirm}
          onViewItem={handlers.handleViewItem}
          onUpdateItem={handlers.handleUpdateItem}
          t={t}
        />
      </div>
    );
  }

  if (menus.length === 0) {
    return (
      <div className="NewMenu_session NewMenu_session_menus">
        <NewMenu_emptyState
          title={tr("emptyMenusTitle", "No menus to show")}
          hint={tr("emptyMenusHint", "Adjust the owner filter or create your first menu.")}
        />
      </div>
    );
  }

  return (
    <div className="NewMenu_session NewMenu_session_menus">
      <NewMenu_table_menus
        menus={menus}
        onView={handlers.handleViewMenu}
        onUpdate={handlers.handleUpdateMenu}
        t={t}
      />
    </div>
  );
};

export default NewMenu_session_menus;

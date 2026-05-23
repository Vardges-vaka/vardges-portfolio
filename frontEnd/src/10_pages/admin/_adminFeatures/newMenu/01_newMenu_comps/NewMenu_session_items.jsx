import NewMenu_table_items from "./newMenu_childComps/NewMenu_table_items.jsx";
import NewMenu_item_viewOne from "./newMenu_childComps/NewMenu_item_viewOne.jsx";
import NewMenu_emptyState from "./newMenu_childComps/NewMenu_emptyState.jsx";
import "../_styles/newMenu_session.css";

/* ============================================================================
   NewMenu_session_items — routes between view_all (table) and view_one
   (single-item detail) for the Items session.
============================================================================ */
const NewMenu_session_items = ({
  viewingType,
  items,
  selectedItem,
  isUpdating,
  editingField,
  handlers,
  t,
}) => {
  const tr = (k, fb) => (t ? t(`session.${k}`, { defaultValue: fb }) : fb);

  if (viewingType === "single") {
    return (
      <div className="NewMenu_session NewMenu_session_items">
        <NewMenu_item_viewOne
          item={selectedItem}
          isUpdating={isUpdating}
          editingField={editingField}
          setEditingField={handlers.setEditingField}
          requestConfirm={handlers.requestConfirm}
          onViewModifier={handlers.handleViewModifier}
          onUpdateModifier={handlers.handleUpdateModifier}
          t={t}
        />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="NewMenu_session NewMenu_session_items">
        <NewMenu_emptyState
          title={tr("emptyItemsTitle", "No items to show")}
          hint={tr("emptyItemsHint", "Adjust the owner filter or create your first item.")}
        />
      </div>
    );
  }

  return (
    <div className="NewMenu_session NewMenu_session_items">
      <NewMenu_table_items
        items={items}
        onView={handlers.handleViewItem}
        onUpdate={handlers.handleUpdateItem}
        t={t}
      />
    </div>
  );
};

export default NewMenu_session_items;

import { Eye, Pencil, Trash2 } from "lucide-react";
import { Modal } from "../../../../../../../01_components/_components.index.js";
import "../../_styles/cK_setup_session_brands/cK_setup_brands_viewAll.css";

const ACTION_ICON_SIZE = 16;

const CK_setup_entity_viewAll = ({
  items = [],
  getItemName,
  getItemMeta,
  handlers,
  states,
  rowClassName = "cK_brandRow",
  listClassName = "cK_setup_brands_viewAll",
}) => {
  const deleteModalOpen = states?.deleteModalOpen;
  const isSaving = states?.isSaving;

  return (
    <>
      <ul className={listClassName}>
        {items.map((item) => {
          const name = getItemName(item);
          const meta = getItemMeta?.(item);
          return (
            <li key={item._id} className={rowClassName}>
              <div className="cK_brandRow_avatar" aria-hidden="true">
                {(name[0] || "?").toUpperCase()}
              </div>
              <div className="cK_brandRow_main">
                <div className="cK_brandRow_titleLine">
                  <span className="cK_brandRow_name">{name}</span>
                </div>
                {meta ? (
                  <p className="cK_brandRow_tagline">{meta}</p>
                ) : null}
              </div>
              <div className="cK_brandRow_meta">
                {item.createdAt ? (
                  <span className="cK_brandRow_date">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                ) : null}
                <span className="cK_brandRow_id">{item._id}</span>
                <div className="cK_brandRow_actions">
                  <button
                    type="button"
                    className="cK_brandRow_actionBtn"
                    title="View"
                    aria-label={`View ${name}`}
                    onClick={() => handlers?.onView?.(item)}
                    disabled={isSaving}>
                    <Eye size={ACTION_ICON_SIZE} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="cK_brandRow_actionBtn"
                    title="Update"
                    aria-label={`Update ${name}`}
                    onClick={() => handlers?.onUpdate?.(item)}
                    disabled={isSaving}>
                    <Pencil size={ACTION_ICON_SIZE} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="cK_brandRow_actionBtn cK_brandRow_actionBtn_danger"
                    title="Delete"
                    aria-label={`Delete ${name}`}
                    onClick={() => handlers?.onDelete?.(item)}
                    disabled={isSaving}>
                    <Trash2 size={ACTION_ICON_SIZE} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <Modal
        isOpen={deleteModalOpen}
        title="Confirm delete"
        onCancel={handlers.onDeleteCancel}
        onConfirm={handlers.onDeleteConfirm}
        withFooter
        danger
        footerLabels={{ cancelLabel: "Cancel", confirmLabel: "Delete" }}>
        <p>
          Are you sure you want to delete{" "}
          <strong>{handlers.itemDisplayName?.() || "this item"}</strong>?
        </p>
      </Modal>
    </>
  );
};

export default CK_setup_entity_viewAll;

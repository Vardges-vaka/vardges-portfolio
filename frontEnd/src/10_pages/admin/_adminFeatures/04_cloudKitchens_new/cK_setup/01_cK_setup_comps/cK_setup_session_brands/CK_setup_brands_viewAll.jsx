import { Eye, Pencil, Trash2 } from "lucide-react";
import { Modal } from "../../../../../../../01_components/_components.index.js";
import "../../_styles/cK_setup_session_brands/cK_setup_brands_viewAll.css";

const asText = (v) => (typeof v === "string" ? v : v?.value) || "";
const brandName = (b) => asText(b.name) || "Untitled brand";
const initials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase() || "?";

const ACTION_ICON_SIZE = 16;

const CK_setup_brands_viewAll = ({ states, handlers, childProps, t }) => {
  const brands = states?.brands ?? [];
  const deleteModalOpen = states?.deleteModalOpen;
  const isSaving = states?.isSaving;

  return (
    <>
      <ul className="cK_setup_brands_viewAll">
        {brands.map((b) => {
          const name = brandName(b);
          const tagline = asText(b.tagline);
          const counts = [
            { label: "Branches", n: b.branches?.length ?? 0 },
            { label: "Menus", n: b.menus?.length ?? 0 },
            { label: "Employees", n: b.employees?.length ?? 0 },
            { label: "Competitors", n: b.competitors?.length ?? 0 },
          ];

          return (
            <li key={b._id} className="cK_brandRow">
              <div className="cK_brandRow_avatar" aria-hidden="true">
                {initials(name)}
              </div>

              <div className="cK_brandRow_main">
                <div className="cK_brandRow_titleLine">
                  <span className="cK_brandRow_name">{name}</span>
                  {b.priceRange ? (
                    <span className="cK_brandRow_badge">{b.priceRange}</span>
                  ) : null}
                </div>
                {tagline ? (
                  <p className="cK_brandRow_tagline">{tagline}</p>
                ) : (
                  <p className="cK_brandRow_tagline cK_brandRow_muted">
                    No tagline
                  </p>
                )}
                <div className="cK_brandRow_counts">
                  {counts.map((c) => (
                    <span key={c.label} className="cK_brandRow_count">
                      <strong>{c.n}</strong> {c.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="cK_brandRow_meta">
                {b.createdAt ? (
                  <span className="cK_brandRow_date">
                    {new Date(b.createdAt).toLocaleDateString()}
                  </span>
                ) : null}
                <span className="cK_brandRow_id">{b._id}</span>
                <div className="cK_brandRow_actions">
                  <button
                    type="button"
                    className="cK_brandRow_actionBtn"
                    title="View"
                    aria-label={`View ${name}`}
                    onClick={() => handlers?.onView?.(b)}
                    disabled={isSaving}>
                    <Eye size={ACTION_ICON_SIZE} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="cK_brandRow_actionBtn"
                    title="Update"
                    aria-label={`Update ${name}`}
                    onClick={() => handlers?.onUpdate?.(b)}
                    disabled={isSaving}>
                    <Pencil size={ACTION_ICON_SIZE} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="cK_brandRow_actionBtn cK_brandRow_actionBtn_danger"
                    title="Delete"
                    aria-label={`Delete ${name}`}
                    onClick={() => handlers?.onDelete?.(b)}
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
        title="Delete brand"
        onCancel={handlers.onDeleteCancel}
        onConfirm={handlers.onDeleteConfirm}
        withFooter
        danger
        footerLabels={{
          cancelLabel: "Cancel",
          confirmLabel: "Delete",
        }}>
        <div className="cK_brandRow_deleteModalBody">
          <p>
            Are you sure you want to delete{" "}
            <strong>{handlers.brandDisplayName?.() || "this brand"}</strong>?
            This action cannot be undone.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default CK_setup_brands_viewAll;

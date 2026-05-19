import "../../_styles/menus_modals/menus_confirmModal_fieldUpdate.css";
import { ConfirmModal } from "../../../../../../../01_components/_components.index.js";

/* ============================================================================
   Menus_confirmModal_fieldUpdate — the double-confirm modal that pops on top
   of any field update (top-level OR per-field).

   States contract (set by handlers.requestConfirm*):
     states.isOpen: boolean
     states.title:        string                ("Save change?")
     states.subtitle:     string                ("Field update")
     states.updatingField: string               (label shown in the body)
     states.prev:         any
     states.next:         any
     states.danger:       boolean

   Handlers contract:
     handlers.handleCancelUpdate()
     handlers.handleConfirmUpdate()
============================================================================ */

const Menus_confirmModal_fieldUpdate = ({ states, handlers, t }) => {
  const modalBody = () => {
    const showDiff = states.prev !== undefined || states.next !== undefined;
    return (
      <div className="menus_confirmModal_body">
        {states.subtitle && (
          <p className="menus_confirmModal_subtitle" style={{ margin: 0 }}>
            {states.subtitle}
          </p>
        )}
        <p>
          {states.updatingField ? (
            <>
              You are about to update{" "}
              <strong>{states.updatingField}</strong>. This change cannot be
              undone.
            </>
          ) : (
            <>This change cannot be undone.</>
          )}
        </p>
        {showDiff && (
          <div className="menus_confirmModal_diff">
            <div className="menus_confirmModal_diff_col prev">
              <span className="menus_confirmModal_diff_col_label">Current</span>
              <span className="menus_confirmModal_diff_col_value">
                {String(states.prev ?? "—")}
              </span>
            </div>
            <div className="menus_confirmModal_diff_col next">
              <span className="menus_confirmModal_diff_col_label">New</span>
              <span className="menus_confirmModal_diff_col_value">
                {String(states.next ?? "—")}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <ConfirmModal
      isOpen={states.isOpen}
      onCancel={handlers.handleCancelUpdate}
      title={states.title || "Are you sure?"}
      danger={!!states.danger}
      confirmDisabled={false}
      cancelLabel="Cancel"
      confirmLabel={states.danger ? "Yes, delete" : "Yes, confirm"}
      onConfirm={handlers.handleConfirmUpdate}>
      {modalBody()}
    </ConfirmModal>
  );
};

export default Menus_confirmModal_fieldUpdate;

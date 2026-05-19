import "../_styles/menus_sessionToggle.css";
import {
  Menus_FieldUpdateBtn,
  Menus_breadcrumb,
} from "./menus_childComps/_menus_childComps.index.js";
import {
  BTN_VIEWING_SESSIONS,
  BTN_OWNER_TYPES,
} from "../05_menus_cnst/_menus_cnst.index.js";

/* ============================================================================
   Menus_sessionToggle — sticky top bar.

   Middle slot now renders a clickable breadcrumb path (Menus / Items / Name)
   instead of the old "Back to Menus" button. Each breadcrumb segment is
   wired by the parent via props.trail (built in getCompProps).

   Right slot:
     - In view_all: owner-type filter icons + an "+ Add" entry-point button
     - In view_one: cancel/confirm or update-all entry via Menus_FieldUpdateBtn
============================================================================ */

const Menus_sessionToggle = ({ states, handlers, childProps, t }) => {
  const OWNER_TYPES = BTN_OWNER_TYPES(states.ownerType);
  const VIEWING_SESSIONS = BTN_VIEWING_SESSIONS(states.session);
  const isDisabled = states.isUpdating;

  // Breadcrumb trail built by the host (childProps.breadcrumb_trail).
  // Fallback: derive a minimal trail from states so this component still works
  // when the host hasn't migrated to passing the trail explicitly yet.
  const trail =
    childProps?.breadcrumb_trail ||
    [
      { key: "menus", label: "Menus", onClick: handlers.handleBack },
      states.session !== "menus" && {
        key: states.session,
        label: states.session?.toUpperCase?.(),
        onClick: handlers.handleBack,
      },
      states.viewingType === "single" && {
        key: "selected",
        label: states.selectedLabel || states[states.session]?.label || "Detail",
      },
    ].filter(Boolean);

  return (
    <div className={`menus_sessionToggle ${isDisabled ? "disabled" : ""}`}>
      <aside className="menus_sessionToggle_sessions">
        {VIEWING_SESSIONS.map((session) => (
          <button
            key={session.value}
            className={`menus_sessionToggle_session_btn ${session.isActive ? "active" : ""} ${session.value}`}
            data-value={session.value}
            onClick={handlers.handleViewingSession}>
            {session.label}
          </button>
        ))}
      </aside>

      <div className="menus_sessionToggle_middle">
        <Menus_breadcrumb trail={trail} />
      </div>

      <aside className="menus_sessionToggle_ownerTypes">
        {/* Owner-type filter icons only show in view_all and not during update. */}
        {!states.isUpdating && states.viewingType === "all" && (
          <>
            {OWNER_TYPES.map((type) => {
              const Icon = type.icon();
              return (
                <button
                  key={type.value}
                  type="button"
                  className={`menus_sessionToggle_ownerType_btn ${type.isActive ? "active" : ""} ${type.value}`}
                  data-value={type.value}
                  aria-label={type.label}
                  aria-pressed={type.isActive}
                  onClick={handlers.handleOwnerType}>
                  <span className="menus_sessionToggle_ownerType_iconWrap">
                    <img
                      src={Icon}
                      alt=""
                      className="menus_sessionToggle_ownerType_icon"
                    />
                    {type.showIndicator && (
                      <span
                        className="menus_sessionToggle_ownerType_indicator"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </>
        )}

        {/* In view_one, the FieldUpdateBtn drives top-level update lifecycle. */}
        {states.viewingType === "single" && (
          <Menus_FieldUpdateBtn
            viewType={states.viewingType}
            isUpdating={states.isUpdating}
            session={states.session}
            ownerType={states.ownerType}
            initiateFieldUpdate={handlers.initiateFieldUpdate}
            onCancel={handlers.handleCancelFieldUpdate}
            onConfirm={handlers.handleConfirmFieldUpdate}
          />
        )}

        {/* In view_all, an "+ New <thing>" button opens the creation form. */}
        {states.viewingType === "all" && handlers.openCreate && (
          <div className="menus_FieldUpdateBtn">
            <button
              type="button"
              className="menus_FieldUpdateBtn_btn"
              onClick={() => handlers.openCreate(states.session)}>
              +{" "}
              {{
                menus: "New menu",
                items: "New menu item",
                modifiers: "New modifier",
                options: "New option",
              }[states.session] || "New"}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};

export default Menus_sessionToggle;

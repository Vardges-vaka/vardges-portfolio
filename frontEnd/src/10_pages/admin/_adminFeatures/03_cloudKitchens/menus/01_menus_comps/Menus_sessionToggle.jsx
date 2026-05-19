import "../_styles/menus_sessionToggle.css";
import { Menus_FieldUpdateBtn } from "./menus_childComps/_menus_childComps.index.js";
import {
  BTN_VIEWING_SESSIONS,
  BTN_OWNER_TYPES,
} from "../05_menus_cnst/_menus_cnst.index.js";

const Menus_sessionToggle = ({ states, handlers, childProps, t }) => {
  const OWNER_TYPES = BTN_OWNER_TYPES(states.ownerType);
  // console.log("States in Menus_sessionToggle:", states);
  const VIEWING_SESSIONS = BTN_VIEWING_SESSIONS(states.session);
  const Header = () => {
    return (
      <div className="menus_sessionToggle_middle">
        {states.viewingType !== "all" && (
          <button
            className="menus_sessionToggle_session_btn"
            onClick={handlers.handleBack}>
            Back to Menus
          </button>
        )}{" "}
        {states.session.toUpperCase()}
      </div>
    );
  };
  const isDisabled = states.isUpdating;

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
      {Header()}

      <aside className="menus_sessionToggle_ownerTypes">
        {!states.isUpdating && (
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
        <Menus_FieldUpdateBtn
          viewType={states.viewingType}
          isUpdating={states.isUpdating}
          session={states.session}
          ownerType={states.ownerType}
          initiateFieldUpdate={handlers.initiateFieldUpdate}
          onCancel={handlers.handleCancelFieldUpdate}
          onConfirm={handlers.handleConfirmFieldUpdate}
        />
      </aside>
    </div>
  );
};

export default Menus_sessionToggle;

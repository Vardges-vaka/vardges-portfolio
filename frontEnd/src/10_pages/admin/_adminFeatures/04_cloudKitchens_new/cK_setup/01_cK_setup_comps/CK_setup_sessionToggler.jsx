import { VALID_SESSIONS } from "../05_cK_setup_cnst/_cK_setup_cnst.index.js";

import "../_styles/cK_setup_sessionToggler.css";

const CK_setup_sessionToggler = ({ states, handlers, childProps, t }) => {
  const SESSIONS = VALID_SESSIONS();
  const activeSession = SESSIONS.find(
    (session) => session.value === states.activeSession,
  );
  return (
    <div className="cK_setup_sessionToggler">
      {/* <h1>CK_setup_sessionToggler</h1> */}
      <aside className="cK_setup_sessionToggler_left">
        {SESSIONS.map((session) => (
          <button
            key={session.value}
            title={session.label}
            onClick={() => handlers.handleSessionChange(session)}
            className={`cK_setup_sessionToggler_session_btn ${states.activeSession === session.value ? "active" : ""}`}>
            <img
              src={session.icon()}
              alt={session.label}
              className={`cK_setup_sessionToggler_session_icon ${session.value}`}
            />
          </button>
        ))}
      </aside>
      <div className="cK_setup_sessionToggler_middle">
        <h1>{activeSession.label}</h1>
        <button onClick={handlers.handle}>View All</button>
      </div>
      <aside className="cK_setup_sessionToggler_right">
        <button
          className="cK_setup_sessionToggler_add_btn"
          onClick={handlers.handleAddNew}>
          Add New {activeSession.label.slice(0, -1)}
        </button>
      </aside>
    </div>
  );
};

export default CK_setup_sessionToggler;

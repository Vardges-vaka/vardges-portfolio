import { Store, Swords, Plus } from "lucide-react";
import { SESSIONS, SESSION_LABELS } from "../05_newMenu_cnst/_newMenu_cnst.index.js";
import NewMenu_breadcrumb from "./newMenu_childComps/NewMenu_breadcrumb.jsx";
import "../_styles/newMenu_sessionToggle.css";

/* ============================================================================
   NewMenu_sessionToggle — sticky top bar.

   Layout:
     ┌──────────────────────────────────────────────────────────────────────┐
     │ [Menus] [Items] [Modifiers] [Options]   Breadcrumb   [Owner filters] │
     │                                                      [+ New ___]      │
     └──────────────────────────────────────────────────────────────────────┘

   The right-hand slot toggles between:
     - view_all  → owner-type filters + "+ New" entry-point button
     - view_one  → Update-all chip (Cancel / Confirm or Initiate)
============================================================================ */
const NewMenu_sessionToggle = ({
  session,
  viewingType,
  ownerType,
  isUpdating,
  trail,
  onSessionClick,
  onOwnerToggle,
  onInitiateUpdate,
  onCancelUpdate,
  onConfirmUpdate,
  onOpenCreate,
  t,
}) => {
  const tr = (k, fb) => (t ? t(`sessionToggle.${k}`, { defaultValue: fb }) : fb);
  const brandOn = ownerType === "brand" || ownerType === "both";
  const competitorOn = ownerType === "competitor" || ownerType === "both";

  const addButtonLabel = {
    menus: tr("newMenu", "+ New menu"),
    items: tr("newItem", "+ New item"),
    modifiers: tr("newModifier", "+ New modifier"),
    options: tr("newOption", "+ New option"),
  }[session] || tr("newGeneric", "+ New");

  return (
    <div className="NewMenu_sessionToggle">
      <nav className="NewMenu_sessionToggle_sessions" aria-label={tr("sessionsAria", "Switch session")}>
        {SESSIONS.map((s) => (
          <button
            key={s}
            type="button"
            className={`NewMenu_sessionToggle_session ${session === s ? "NewMenu_sessionToggle_session_active" : ""}`}
            data-value={s}
            onClick={onSessionClick}
            disabled={isUpdating}>
            {tr(s, SESSION_LABELS[s])}
          </button>
        ))}
      </nav>

      <div className="NewMenu_sessionToggle_middle">
        <NewMenu_breadcrumb trail={trail} />
      </div>

      <aside className="NewMenu_sessionToggle_actions">
        {/* Owner-type filter — only in view_all + not while updating */}
        {viewingType === "all" && !isUpdating && (
          <>
            <button
              type="button"
              className={`NewMenu_sessionToggle_owner ${brandOn ? "NewMenu_sessionToggle_owner_active NewMenu_sessionToggle_owner_brand" : ""}`}
              data-value="brand"
              onClick={onOwnerToggle}
              aria-pressed={brandOn}
              aria-label={tr("brandFilter", "Brand filter")}>
              <Store size={14} aria-hidden="true" />
              <span>{tr("brand", "Brand")}</span>
              {brandOn && <span className="NewMenu_sessionToggle_owner_dot" aria-hidden="true" />}
            </button>
            <button
              type="button"
              className={`NewMenu_sessionToggle_owner ${competitorOn ? "NewMenu_sessionToggle_owner_active NewMenu_sessionToggle_owner_competitor" : ""}`}
              data-value="competitor"
              onClick={onOwnerToggle}
              aria-pressed={competitorOn}
              aria-label={tr("competitorFilter", "Competitor filter")}>
              <Swords size={14} aria-hidden="true" />
              <span>{tr("competitor", "Competitor")}</span>
              {competitorOn && <span className="NewMenu_sessionToggle_owner_dot" aria-hidden="true" />}
            </button>
          </>
        )}

        {/* + New entry-point button — only in view_all */}
        {viewingType === "all" && (
          <button
            type="button"
            className="NewMenu_sessionToggle_add"
            onClick={() => onOpenCreate?.(session)}>
            <Plus size={14} aria-hidden="true" />
            {addButtonLabel}
          </button>
        )}

        {/* Update-all chip — only in view_one */}
        {viewingType === "single" && (
          isUpdating ? (
            <>
              <button type="button" className="NewMenu_sessionToggle_update" onClick={onCancelUpdate}>
                {tr("cancel", "Cancel")}
              </button>
              <button type="button" className="NewMenu_sessionToggle_update NewMenu_sessionToggle_update_primary" onClick={onConfirmUpdate}>
                {tr("confirm", "Confirm")}
              </button>
            </>
          ) : (
            <button type="button" className="NewMenu_sessionToggle_update" onClick={onInitiateUpdate}>
              {tr("updateAll", "Update all")}
            </button>
          )
        )}
      </aside>
    </div>
  );
};

export default NewMenu_sessionToggle;

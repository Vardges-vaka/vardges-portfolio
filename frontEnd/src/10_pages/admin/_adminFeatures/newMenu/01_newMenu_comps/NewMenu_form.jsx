import { useState } from "react";
import { X as XIcon, Store, Swords } from "lucide-react";
import { FORM_COPY } from "../05_newMenu_cnst/_newMenu_cnst.index.js";
import "../_styles/newMenu_form.css";

/* ============================================================================
   NewMenu_form — 3-step creation wizard reused by all 5 entity kinds.

   Steps:
     0. Pick ownerType ("brand" or "competitor")
     1. Enter a label / title / name
     2. Review & create

   Image / files / pricing / modifiers etc. are intentionally NOT collected
   here — they are added later through the entity's view-one page.
============================================================================ */
const STEPS = ["owner", "name", "confirm"];

const NewMenu_form = ({
  kind,
  isOpen,
  isCreating = false,
  onClose,
  onCreate,
  t,
}) => {
  const [step, setStep] = useState(0);
  const [ownerType, setOwnerType] = useState("brand");
  const [label, setLabel] = useState("");

  if (!isOpen || !kind) return null;
  const copy = FORM_COPY[kind] || FORM_COPY.menu;
  const tr = (k, fb) => (t ? t(`form.${k}`, { defaultValue: fb }) : fb);
  const trKind = (k, fb) => (t ? t(`form.${kind}.${k}`, { defaultValue: fb }) : fb);

  const reset = () => {
    setStep(0); setOwnerType("brand"); setLabel("");
  };
  const handleClose = () => { reset(); onClose?.(); };
  const handleCreate = async () => {
    const res = await onCreate?.({ ownerType, label: label.trim() });
    if (res?.ok !== false) reset();
  };

  const canNext = step === 0
    ? !!ownerType
    : step === 1 ? label.trim().length > 1 : true;

  return (
    <div
      className="NewMenu_confirmModal_overlay"
      onClick={handleClose}
      role="dialog"
      aria-modal="true">
      <div className="NewMenu_form" onClick={(e) => e.stopPropagation()}>
        <header className="NewMenu_confirmModal_header">
          <div>
            <p className="NewMenu_confirmModal_subtitle">{tr("create", "Create")}</p>
            <h2 className="NewMenu_confirmModal_title">{trKind("title", copy.title)}</h2>
          </div>
          <button type="button" className="NewMenu_confirmModal_close" onClick={handleClose} aria-label={tr("close", "Close")}>
            <XIcon size={18} aria-hidden="true" />
          </button>
        </header>

        <div className="NewMenu_form_body">
          <ol className="NewMenu_form_steps">
            {STEPS.map((s, i) => (
              <li key={s} className={`NewMenu_form_step ${step === i ? "NewMenu_form_step_active" : i < step ? "NewMenu_form_step_done" : ""}`}>
                <span className="NewMenu_form_step_num">{i + 1}</span>
                <span className="NewMenu_form_step_label">{tr(`step_${s}`, s.charAt(0).toUpperCase() + s.slice(1))}</span>
              </li>
            ))}
          </ol>

          {step === 0 && (
            <div className="NewMenu_form_field">
              <label className="NewMenu_form_label">{tr("ownerLabel", "Owner type")}</label>
              <p className="NewMenu_form_helper">
                {tr("ownerHelper", `Pick whether this ${copy.entity} belongs to your brand or to a competitor.`)}
              </p>
              <div className="NewMenu_form_ownerPicker">
                <button
                  type="button"
                  className={`NewMenu_form_ownerCard ${ownerType === "brand" ? "NewMenu_form_ownerCard_selected" : ""}`}
                  onClick={() => setOwnerType("brand")}>
                  <Store size={36} aria-hidden="true" />
                  <span className="NewMenu_form_ownerCard_label">{tr("brand", "Brand")}</span>
                  <span className="NewMenu_form_ownerCard_hint">{tr("brandHint", "Owned by your kitchen.")}</span>
                </button>
                <button
                  type="button"
                  className={`NewMenu_form_ownerCard ${ownerType === "competitor" ? "NewMenu_form_ownerCard_selected" : ""}`}
                  onClick={() => setOwnerType("competitor")}>
                  <Swords size={36} aria-hidden="true" />
                  <span className="NewMenu_form_ownerCard_label">{tr("competitor", "Competitor")}</span>
                  <span className="NewMenu_form_ownerCard_hint">{tr("competitorHint", "External — for tracking and competition.")}</span>
                </button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="NewMenu_form_field">
              <label className="NewMenu_form_label">{trKind("input", copy.input)}</label>
              <input
                className="NewMenu_form_input"
                autoFocus
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder={trKind("hint", copy.hint)}
              />
              <p className="NewMenu_form_helper">
                {tr("nameHelper", "You can fill in everything else after the entry exists.")}
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="NewMenu_form_field">
              <label className="NewMenu_form_label">{tr("review", "Review")}</label>
              <div className="NewMenu_confirmModal_diff">
                <div className="NewMenu_confirmModal_diff_col">
                  <span className="NewMenu_confirmModal_diff_col_label">{tr("owner", "Owner")}</span>
                  <span className="NewMenu_confirmModal_diff_col_value">{ownerType}</span>
                </div>
                <div className="NewMenu_confirmModal_diff_col NewMenu_confirmModal_diff_col_next">
                  <span className="NewMenu_confirmModal_diff_col_label">{trKind("input", copy.input)}</span>
                  <span className="NewMenu_confirmModal_diff_col_value">{label}</span>
                </div>
              </div>
              <p className="NewMenu_form_helper">
                {tr("postCreateHelper", "Files, images, pricing, modifiers etc. are added later through the entry's detail view.")}
              </p>
            </div>
          )}
        </div>

        <footer className="NewMenu_confirmModal_actions NewMenu_form_actions">
          <div className="NewMenu_form_actions_left">
            {step > 0 && (
              <button type="button" className="NewMenu_confirmModal_btn" onClick={() => setStep(step - 1)}>
                {tr("back", "Back")}
              </button>
            )}
          </div>
          <div className="NewMenu_form_actions_right">
            <button type="button" className="NewMenu_confirmModal_btn" onClick={handleClose}>
              {tr("cancel", "Cancel")}
            </button>
            {step < 2 ? (
              <button
                type="button"
                className="NewMenu_confirmModal_btn NewMenu_confirmModal_btn_primary"
                disabled={!canNext}
                onClick={() => setStep(step + 1)}>
                {tr("next", "Next")}
              </button>
            ) : (
              <button
                type="button"
                className="NewMenu_confirmModal_btn NewMenu_confirmModal_btn_primary"
                disabled={isCreating}
                onClick={handleCreate}>
                {isCreating ? tr("creating", "Creating…") : tr("create", "Create")}
              </button>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default NewMenu_form;

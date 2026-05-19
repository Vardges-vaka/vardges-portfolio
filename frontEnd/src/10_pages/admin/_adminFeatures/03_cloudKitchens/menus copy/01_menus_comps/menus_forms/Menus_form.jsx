import { useState } from "react";
import { X, Store, Swords } from "lucide-react";
import "../../_styles/menus_forms/menus_forms.css";
import "../../_styles/menus_modals/menus_confirmModal_fieldUpdate.css";

/* ============================================================================
   Menus_form — shared 3-step creation wizard.

   Step 0: pick ownerType (brand / competitor)
   Step 1: enter label / title / name
   Step 2: review & create

   The 5 entity-specific forms (Menu / MenuItem / Modifier / Option / Category)
   pass their own copy and submit handler. File uploads, images, modifiers etc.
   are intentionally NOT collected here — those are added later via the view
   session.
============================================================================ */

const STEP_LABELS = ["Owner", "Name", "Confirm"];

const Menus_form = ({ copy, isOpen, onClose, onCreate, isLoading }) => {
  const [step, setStep] = useState(0);
  const [ownerType, setOwnerType] = useState("brand");
  const [label, setLabel] = useState("");

  if (!isOpen) return null;

  const canNext =
    step === 0 ? !!ownerType : step === 1 ? label.trim().length > 1 : true;

  const reset = () => {
    setStep(0);
    setOwnerType("brand");
    setLabel("");
  };
  const handleClose = () => {
    reset();
    onClose?.();
  };
  const handleCreate = async () => {
    const res = await onCreate?.({ ownerType, label: label.trim() });
    if (res?.ok !== false) {
      reset();
    }
  };

  return (
    <div className="menus_confirmModal_overlay" role="dialog" aria-modal="true">
      <div className="menus_confirmModal" style={{ width: "min(640px, 100%)" }}>
        <header className="menus_confirmModal_header">
          <div>
            <p className="menus_confirmModal_subtitle">Create</p>
            <h2 className="menus_confirmModal_title">{copy.title}</h2>
          </div>
          <button
            type="button"
            className="menus_confirmModal_close"
            onClick={handleClose}
            aria-label="Close">
            <X size={16} />
          </button>
        </header>

        <div className="menus_confirmModal_body">
          <div className="menus_form">
            <div className="menus_form_steps">
              {STEP_LABELS.map((s, i) => (
                <div
                  key={s}
                  className={`menus_form_step ${step === i ? "active" : i < step ? "done" : ""}`}>
                  <span className="menus_form_step_num">{i + 1}</span>
                  {s}
                </div>
              ))}
            </div>

            {step === 0 && (
              <div className="menus_form_field">
                <label>Owner type</label>
                <p className="menus_form_helper">
                  Pick whether this {copy.entity} belongs to your brand or to a
                  competitor. You can change this later.
                </p>
                <div className="menus_form_ownerTypePicker">
                  <button
                    type="button"
                    className={`menus_form_ownerType_card ${ownerType === "brand" ? "selected" : ""}`}
                    onClick={() => setOwnerType("brand")}>
                    <Store size={36} />
                    <span className="menus_form_ownerType_label">Brand</span>
                    <span className="menus_form_ownerType_hint">
                      Owned by your kitchen.
                    </span>
                  </button>
                  <button
                    type="button"
                    className={`menus_form_ownerType_card ${ownerType === "competitor" ? "selected" : ""}`}
                    onClick={() => setOwnerType("competitor")}>
                    <Swords size={36} />
                    <span className="menus_form_ownerType_label">Competitor</span>
                    <span className="menus_form_ownerType_hint">
                      External — for tracking and competition.
                    </span>
                  </button>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="menus_form_field">
                <label>{copy.input}</label>
                <input
                  className="menus_form_input"
                  autoFocus
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder={copy.hint}
                />
                <p className="menus_form_helper">
                  You can fill in all other details after the entry exists. File
                  uploads come later.
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="menus_form_field">
                <label>Review</label>
                <div className="menus_confirmModal_diff">
                  <div className="menus_confirmModal_diff_col">
                    <span className="menus_confirmModal_diff_col_label">
                      Owner
                    </span>
                    <span className="menus_confirmModal_diff_col_value">
                      {ownerType}
                    </span>
                  </div>
                  <div className="menus_confirmModal_diff_col next">
                    <span className="menus_confirmModal_diff_col_label">
                      {copy.input}
                    </span>
                    <span className="menus_confirmModal_diff_col_value">
                      {label}
                    </span>
                  </div>
                </div>
                <p className="menus_form_helper">
                  Files, images, pricing, modifiers etc. are added later via the
                  view session.
                </p>
              </div>
            )}
          </div>
        </div>

        <footer className="menus_confirmModal_actions">
          <div className="menus_form_actions_left">
            {step > 0 && (
              <button
                type="button"
                className="menus_confirmModal_btn"
                onClick={() => setStep(step - 1)}>
                Back
              </button>
            )}
          </div>
          <div className="menus_form_actions_right">
            <button
              type="button"
              className="menus_confirmModal_btn"
              onClick={handleClose}>
              Cancel
            </button>
            {step < 2 ? (
              <button
                type="button"
                className="menus_confirmModal_btn primary"
                disabled={!canNext}
                onClick={() => setStep(step + 1)}>
                Next
              </button>
            ) : (
              <button
                type="button"
                className="menus_confirmModal_btn primary"
                disabled={isLoading}
                onClick={handleCreate}>
                {isLoading ? "Creating…" : "Create"}
              </button>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Menus_form;

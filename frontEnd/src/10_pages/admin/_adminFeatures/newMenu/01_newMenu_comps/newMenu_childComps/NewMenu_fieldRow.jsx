import { useEffect, useState } from "react";
import { Pencil, Check, X as XIcon } from "lucide-react";
import NewMenu_iconBtn from "./NewMenu_iconBtn.jsx";
import "../../_styles/newMenu_fieldRow.css";

/* ============================================================================
   NewMenu_fieldRow — single editable field with a per-field update button.

   Visual states:
     idle      — readOnly input, pencil button enabled
     locked    — readOnly input, pencil disabled (parent has another field
                 already open OR top-level "Update all" is engaged)
     editing   — input writable, pencil swaps to check/cancel

   On Save the row does NOT commit directly; it calls
   `onRequestConfirm({ fieldLabel, prev, next, onCommit })` so the parent's
   confirm modal can pop and finalise the write. This keeps every save under
   the same double-confirm UX.
============================================================================ */
const NewMenu_fieldRow = ({
  label,
  value,
  type = "text",        // "text" | "number" | "textarea" | "select"
  options,              // for select
  fieldKey,             // unique id used for editingField tracking
  lockedBy = false,     // true while top-level "Update all" is engaged
  editingField,         // currently-edited field key (or null)
  setEditingField,      // setter
  onRequestConfirm,     // (payload) => void
  multiline,
  extraControls,        // React node, rendered next to the pencil
  inputProps = {},
}) => {
  const isEditing = editingField === fieldKey;
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value, isEditing]);

  const disabledByOther = (!!editingField && !isEditing) || (lockedBy && !isEditing);

  const startEdit = () => setEditingField(fieldKey);
  const cancelEdit = () => { setDraft(value); setEditingField(null); };
  const commit = () => {
    if (draft === value) {
      setEditingField(null);
      return;
    }
    onRequestConfirm?.({
      fieldLabel: label,
      prev: value,
      next: draft,
      onCommit: () => setEditingField(null),
    });
  };

  const inputClass = (multiline || type === "textarea")
    ? "NewMenu_fieldRow_textarea"
    : "NewMenu_fieldRow_input";

  const renderInput = () => {
    if (type === "select") {
      return (
        <select
          className={inputClass}
          value={draft ?? ""}
          disabled={!isEditing}
          onChange={(e) => setDraft(e.target.value)}>
          {(options || []).map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      );
    }
    if (multiline || type === "textarea") {
      return (
        <textarea
          className={inputClass}
          value={draft ?? ""}
          readOnly={!isEditing}
          rows={3}
          onChange={(e) => setDraft(e.target.value)}
          {...inputProps}
        />
      );
    }
    return (
      <input
        type={type === "number" ? "number" : "text"}
        className={inputClass}
        value={draft ?? ""}
        readOnly={!isEditing}
        onChange={(e) => setDraft(type === "number" ? Number(e.target.value) : e.target.value)}
        {...inputProps}
      />
    );
  };

  return (
    <div className="NewMenu_fieldRow">
      <div className="NewMenu_fieldRow_header">
        <label className="NewMenu_fieldRow_label">{label}</label>
        <div className="NewMenu_fieldRow_controls">
          {extraControls}
          {isEditing ? (
            <>
              <NewMenu_iconBtn
                icon={<Check size={16} />}
                tooltip="Save"
                active
                onClick={commit}
              />
              <NewMenu_iconBtn
                icon={<XIcon size={16} />}
                tooltip="Cancel"
                onClick={cancelEdit}
              />
            </>
          ) : (
            <NewMenu_iconBtn
              icon={<Pencil size={16} />}
              tooltip={`Update ${label}`}
              onClick={startEdit}
              disabled={disabledByOther}
            />
          )}
        </div>
      </div>
      {renderInput()}
    </div>
  );
};

export default NewMenu_fieldRow;

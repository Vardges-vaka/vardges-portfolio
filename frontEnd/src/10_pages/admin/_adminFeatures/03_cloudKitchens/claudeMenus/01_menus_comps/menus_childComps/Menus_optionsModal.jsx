import { useState, useEffect } from "react";
import { X } from "lucide-react";
import "../../_styles/menus_modals/menus_confirmModal_fieldUpdate.css";
import Menus_confirmModal_fieldUpdate from "../menus_modals/Menus_confirmModal_fieldUpdate.jsx";

/* ============================================================================
   Menus_optionsModal — modifier → "+N" option stack expands to this modal.
   Lets the user view, add, or remove options for a modifier, then double-
   confirms before committing.

   props:
   - open: boolean
   - modifier: { _id, title, options: string[] }
   - allOptions: { [_id]: optionDoc }     — required to render the picker
   - onClose: () => void
   - onSave: (selectedIds: string[]) => void
============================================================================ */
const Menus_optionsModal = ({ open, modifier, allOptions = {}, onClose, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [selectedIds, setSelectedIds] = useState(modifier?.options || []);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    setSelectedIds(modifier?.options || []);
    setEditing(false);
    setConfirming(false);
  }, [open, modifier]);

  if (!open || !modifier) return null;
  const toggle = (id) =>
    setSelectedIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const isEmpty = selectedIds.length === 0;
  const all = Object.keys(allOptions);

  return (
    <div className="menus_confirmModal_overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="menus_confirmModal" onClick={(e) => e.stopPropagation()} style={{ width: "min(640px, 96vw)" }}>
        <header className="menus_confirmModal_header">
          <div>
            <p className="menus_confirmModal_subtitle">Modifier</p>
            <h2 className="menus_confirmModal_title">{modifier.title?.label} — Options</h2>
          </div>
          <div style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
            {!editing && (
              <button className="menus_confirmModal_btn" onClick={() => setEditing(true)}>Update</button>
            )}
            <button className="menus_confirmModal_close" onClick={onClose}><X size={16} /></button>
          </div>
        </header>

        <div className="menus_confirmModal_body" style={{ gap: 8 }}>
          {!editing && isEmpty && (
            <button className="menus_confirmModal_btn primary" onClick={() => setEditing(true)}>+ Add options</button>
          )}
          {!editing && !isEmpty && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {selectedIds.map((oid) => {
                const o = allOptions[oid];
                if (!o) return null;
                return (
                  <div key={oid} style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "6px 10px",
                    border: "1px solid var(--menus-border-soft)", borderRadius: 8,
                    background: "var(--menus-bg-elev)",
                  }}>
                    <img src={o.images?.main} alt={o.name?.label}
                      style={{ width: 32, height: 32, borderRadius: 6, objectFit: "cover" }} />
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{o.name?.label}</span>
                    <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--menus-text-soft)" }}>{o.ownerType}</span>
                  </div>
                );
              })}
            </div>
          )}

          {editing && (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 8, maxHeight: 400, overflow: "auto",
            }}>
              {all.map((oid) => {
                const o = allOptions[oid];
                const on = selectedIds.includes(oid);
                return (
                  <button key={oid} type="button" onClick={() => toggle(oid)}
                    style={{
                      display: "flex", alignItems: "center", gap: 8, padding: "8px 10px",
                      border: `1.5px solid ${on ? "var(--menus-accent)" : "var(--menus-border-soft)"}`,
                      background: on ? "var(--menus-accent-soft)" : "var(--menus-bg-elev)",
                      borderRadius: 8, cursor: "pointer", font: "inherit", textAlign: "left",
                    }}>
                    <img src={o.images?.main} alt={o.name?.label}
                      style={{ width: 28, height: 28, borderRadius: 6, objectFit: "cover" }} />
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{o.name?.label}</span>
                    <span style={{ marginLeft: "auto" }}>{on ? "✓" : "+"}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <footer className="menus_confirmModal_actions">
          <button className="menus_confirmModal_btn" onClick={onClose}>Cancel</button>
          {editing && (
            <button className="menus_confirmModal_btn primary" onClick={() => setConfirming(true)}>
              Confirm changes
            </button>
          )}
        </footer>

        {confirming && (
          <Menus_confirmModal_fieldUpdate
            states={{
              isOpen: true,
              title: "Update options?",
              subtitle: "Double check",
              updatingField: "Modifier options",
              prev: `${(modifier.options || []).length} options`,
              next: `${selectedIds.length} options`,
            }}
            handlers={{
              handleCancelUpdate: () => setConfirming(false),
              handleConfirmUpdate: () => {
                setConfirming(false);
                onSave?.(selectedIds);
                onClose?.();
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Menus_optionsModal;

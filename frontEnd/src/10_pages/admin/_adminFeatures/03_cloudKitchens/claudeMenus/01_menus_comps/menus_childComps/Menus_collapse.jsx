import { useState } from "react";
import { ChevronDown } from "lucide-react";

/* ============================================================================
   Menus_collapse — generic collapsible card section.

   Displays a header row (with subtitle + title + optional rightSlot + chevron)
   that toggles its body open / closed. Useful for "Sales performance",
   "Menu header", "Attached modifiers", etc.

   props:
   - title: string
   - subtitle: string
   - defaultOpen: boolean (default true)
   - rightSlot: ReactNode rendered on the right of the header (e.g. an action btn)
============================================================================ */
const Menus_collapse = ({ title, subtitle, defaultOpen = true, children, rightSlot }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section
      style={{
        border: "1px solid var(--menus-border)",
        borderRadius: 10,
        background: "var(--menus-bg-elev)",
        boxShadow: "0 1px 2px color-mix(in srgb, var(--menus-shadow) 25%, transparent)",
        overflow: "hidden",
      }}>
      <header
        onClick={() => setOpen((o) => !o)}
        style={{
          cursor: "pointer",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          borderBottom: open ? "1px solid var(--menus-border-soft)" : "none",
          background: open ? "color-mix(in srgb, var(--menus-bg-soft) 30%, transparent)" : "transparent",
        }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
          {subtitle && (
            <span style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              color: "var(--menus-text-soft)",
            }}>
              {subtitle}
            </span>
          )}
          <span style={{
            fontSize: 15,
            fontWeight: 600,
            color: "var(--menus-title)",
          }}>{title}</span>
        </div>
        <div
          style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
          onClick={(e) => e.stopPropagation()}>
          {rightSlot}
          <span
            onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}
            style={{
              width: 26,
              height: 26,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid var(--menus-border-soft)",
              borderRadius: 6,
              color: "var(--menus-text-soft)",
              transition: "transform 200ms ease",
              transform: open ? "rotate(180deg)" : "none",
              cursor: "pointer",
            }}>
            <ChevronDown size={14} />
          </span>
        </div>
      </header>
      {open && <div style={{ padding: 16 }}>{children}</div>}
    </section>
  );
};

export default Menus_collapse;

import "../../_styles/newMenu_quickView.css";

/* ============================================================================
   NewMenu_quickView — inline-expanded row in any of the tables, showing
   a compact fact grid + optional sections + actions.

   Renders as a <tr> spanning `colSpan` columns. Parent controls visibility
   via the `open` prop.
============================================================================ */
const NewMenu_quickView = ({
  open,
  colSpan = 1,
  fields = [],
  sections = [],
  actions = null,
}) => (
  <tr
    className="NewMenu_quickView_row"
    data-quickview-open={open ? "true" : "false"}>
    <td className="NewMenu_quickView_cell" colSpan={colSpan}>
      <div className={`NewMenu_quickView ${open ? "NewMenu_quickView_open" : ""}`}>
        <div className="NewMenu_quickView_inner">
          {fields.length > 0 && (
            <div className="NewMenu_quickView_fields">
              {fields.map((f, i) => (
                <div key={i} className="NewMenu_quickView_field">
                  <span className="NewMenu_quickView_field_label">{f.label}</span>
                  <span className={`NewMenu_quickView_field_value ${f.wrap ? "NewMenu_quickView_field_value_wrap" : ""}`}>
                    {f.value ?? "—"}
                  </span>
                </div>
              ))}
            </div>
          )}
          {sections.length > 0 && (
            <div className="NewMenu_quickView_sections">
              {sections.map((s, i) => (
                <div key={i} className="NewMenu_quickView_section">
                  <span className="NewMenu_quickView_section_title">{s.title}</span>
                  <div className="NewMenu_quickView_section_body">{s.body}</div>
                </div>
              ))}
            </div>
          )}
          {actions && (
            <div className="NewMenu_quickView_actions">{actions}</div>
          )}
        </div>
      </div>
    </td>
  </tr>
);

export default NewMenu_quickView;

import "../../_styles/menus_childComps/menus_quickView.css";

/* ============================================================================
   Menus_quickView — generic dropdown-row body used by the four tables.
   The host renders this as a *new <tr>* directly under the row being expanded.

   props:
   - open: boolean
   - colSpan: number             — must equal the number of header columns
   - fields: Array<{ label, value, wrap? }>
   - sections: Array<{ title, body }>
   - actions: ReactNode          — buttons that go at the bottom right
============================================================================ */

const Menus_quickView = ({ open, colSpan, fields, sections, actions }) => {
  return (
    <tr
      className="menus_quickView_row"
      data-quickview-open={open ? "true" : "false"}>
      <td className="menus_quickView_cell" colSpan={colSpan}>
        <div className={`menus_quickView ${open ? "menus_quickView--open" : ""}`}>
          <div className="menus_quickView_inner">
            {fields &&
              fields.map((f, i) => (
                <div key={i} className="menus_quickView_field">
                  <span className="menus_quickView_field_label">{f.label}</span>
                  <span
                    className={`menus_quickView_field_value ${f.wrap ? "wrap" : ""}`}>
                    {f.value ?? "—"}
                  </span>
                </div>
              ))}
            {sections &&
              sections.map((s, i) => (
                <div key={"s" + i} className="menus_quickView_section">
                  <span className="menus_quickView_section_title">
                    {s.title}
                  </span>
                  {s.body}
                </div>
              ))}
            {actions && (
              <div className="menus_quickView_actions">{actions}</div>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default Menus_quickView;

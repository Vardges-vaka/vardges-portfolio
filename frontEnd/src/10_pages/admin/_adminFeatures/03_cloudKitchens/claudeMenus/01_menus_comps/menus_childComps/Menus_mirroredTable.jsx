import { formatDate } from "../../02_menus_helpers/_menus_helpers.index.js";

/* ============================================================================
   Menus_mirroredTable — table of `menuItem.mirroredWithOtherMenuItems`.

   props:
   - rows: Array<{ item: { image, name }, brand: { logo, name }, note }>
============================================================================ */
const Menus_mirroredTable = ({ rows = [] }) => {
  return (
    <div className="menus_view_all">
      <table className="menus_view_all_table">
        <thead>
          <tr>
            {["#", "Image", "Name", "Brand", "Brand Name", "Note"].map((h) => (
              <th key={h} className="menus_view_all_table_header">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td className="menus_view_all_table_rows_provider_cell" colSpan={6}
                style={{ color: "var(--menus-text-soft)", fontStyle: "italic" }}>
                None.
              </td>
            </tr>
          )}
          {rows.map((m, i) => (
            <tr key={i} className="menus_view_all_table_rows_provider">
              <td className="menus_view_all_table_rows_provider_cell">{i + 1}</td>
              <td className="menus_view_all_table_rows_provider_cell">
                <img src={m.item?.image} alt={m.item?.name}
                  style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 6 }} />
              </td>
              <td className="menus_view_all_table_rows_provider_cell">{m.item?.name}</td>
              <td className="menus_view_all_table_rows_provider_cell">
                <img src={m.brand?.logo} alt={m.brand?.name}
                  style={{ width: 24, height: 24, objectFit: "cover", borderRadius: 4 }} />
              </td>
              <td className="menus_view_all_table_rows_provider_cell">{m.brand?.name}</td>
              <td className="menus_view_all_table_rows_provider_cell"
                style={{ textAlign: "left", maxWidth: 320 }}>
                {m.note}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Menus_mirroredTable;

import { formatDate } from "../../02_menus_helpers/_menus_helpers.index.js";

/* ============================================================================
   Menus_competesTable — table of `menuItem.competesWithOtherMenuItems`.

   props:
   - rows: Array<{
       item: { image, name }, sellingPrice: { gross },
       brand: { logo, name }, capturedAt, note,
     }>
============================================================================ */
const Menus_competesTable = ({ rows = [] }) => {
  return (
    <div className="menus_view_all">
      <table className="menus_view_all_table">
        <thead>
          <tr>
            {["#", "Image", "Name", "Selling Price", "Brand", "Brand Name", "Captured At", "Note"].map(
              (h) => <th key={h} className="menus_view_all_table_header">{h}</th>,
            )}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td className="menus_view_all_table_rows_provider_cell" colSpan={8}
                style={{ color: "var(--menus-text-soft)", fontStyle: "italic" }}>
                None.
              </td>
            </tr>
          )}
          {rows.map((c, i) => (
            <tr key={i} className="menus_view_all_table_rows_provider">
              <td className="menus_view_all_table_rows_provider_cell">{i + 1}</td>
              <td className="menus_view_all_table_rows_provider_cell">
                <img src={c.item?.image} alt={c.item?.name}
                  style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 6 }} />
              </td>
              <td className="menus_view_all_table_rows_provider_cell">{c.item?.name}</td>
              <td className="menus_view_all_table_rows_provider_cell"
                style={{ fontWeight: 700 }}>
                {c.sellingPrice?.gross}
              </td>
              <td className="menus_view_all_table_rows_provider_cell">
                <img src={c.brand?.logo} alt={c.brand?.name}
                  style={{ width: 24, height: 24, objectFit: "cover", borderRadius: 4 }} />
              </td>
              <td className="menus_view_all_table_rows_provider_cell">{c.brand?.name}</td>
              <td className="menus_view_all_table_rows_provider_cell">
                {c.capturedAt ? formatDate(c.capturedAt) : "—"}
              </td>
              <td className="menus_view_all_table_rows_provider_cell"
                style={{ textAlign: "left", maxWidth: 280 }}>
                {c.note || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Menus_competesTable;

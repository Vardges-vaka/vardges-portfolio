import "../../_styles/cK_setup_session_brands/cK_setup_brands_viewAll.css";

// Data is mixed-shape: legacy docs store `name`/`tagline` as objects
// ({ value, translations }), newer ones as plain strings. Read both safely.
const asText = (v) => (typeof v === "string" ? v : v?.value) || "";
const brandName = (b) => asText(b.name) || "Untitled brand";
const initials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase() || "?";

const CK_setup_brands_viewAll = ({ states, handlers, childProps, t }) => {
  const brands = states?.brands ?? [];

  return (
    <ul className="cK_setup_brands_viewAll">
      {brands.map((b) => {
        const name = brandName(b);
        const tagline = asText(b.tagline);
        const counts = [
          { label: "Branches", n: b.branches?.length ?? 0 },
          { label: "Menus", n: b.menus?.length ?? 0 },
          { label: "Employees", n: b.employees?.length ?? 0 },
          { label: "Competitors", n: b.competitors?.length ?? 0 },
        ];

        return (
          <li key={b._id} className="cK_brandRow">
            <div className="cK_brandRow_avatar" aria-hidden="true">
              {initials(name)}
            </div>

            <div className="cK_brandRow_main">
              <div className="cK_brandRow_titleLine">
                <span className="cK_brandRow_name">{name}</span>
                {b.priceRange ? (
                  <span className="cK_brandRow_badge">{b.priceRange}</span>
                ) : null}
              </div>
              {tagline ? (
                <p className="cK_brandRow_tagline">{tagline}</p>
              ) : (
                <p className="cK_brandRow_tagline cK_brandRow_muted">
                  No tagline
                </p>
              )}
              <div className="cK_brandRow_counts">
                {counts.map((c) => (
                  <span key={c.label} className="cK_brandRow_count">
                    <strong>{c.n}</strong> {c.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="cK_brandRow_meta">
              {b.createdAt ? (
                <span className="cK_brandRow_date">
                  {new Date(b.createdAt).toLocaleDateString()}
                </span>
              ) : null}
              <span className="cK_brandRow_id">{b._id}</span>
              <button
                type="button"
                className="cK_brandRow_editBtn"
                onClick={() => handlers?.onEditFull?.(b)}>
                Continue building →
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CK_setup_brands_viewAll;

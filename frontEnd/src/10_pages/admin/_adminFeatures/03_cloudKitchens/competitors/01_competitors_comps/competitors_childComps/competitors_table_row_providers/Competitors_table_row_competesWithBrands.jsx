import "../../../_styles/competitors_table_row_competesWithBrands.css";
import { Tooltip_11 } from "../../../../../../../../01_components/components.index.js";
import { getCompetesWithLogos } from "../../../02_competitors_helpers/_competitors_helpers.index.js";

const ViewIcon = () => (
  <svg
    viewBox="0 0 24 24"
    style={{ width: "55%", height: "55%", color: "#fff", flexShrink: 0 }}
    aria-hidden
  >
    <path
      fill="currentColor"
      d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
    />
  </svg>
);

const Competitors_table_row_competesWithBrands = ({
  competitor,
  states,
  handlers,
  t,
}) => {
  const h = handlers?.handleCompetitorTableAction;
  const total = competitor?.competesWithBrands?.length ?? 0;
  const logos = getCompetesWithLogos(
    competitor?.competesWithBrands,
    2,
    states?.competitors ?? null,
  );

  const detailTitle = t
    ? t("tableRow.detailCompetes", { defaultValue: "Competing brands" })
    : "Competing brands";

  if (total === 0) {
    return (
      <div className="Competitors_table_row_competesWithBrands">
        <span className="Competitors_table_row_competesWithBrands_empty">—</span>
      </div>
    );
  }

  const items = [
    ...logos.map((logo) => ({
      content: logo.src ? (
        <img
          src={logo.src}
          alt={logo.alt}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          loading="lazy"
        />
      ) : (
        <span
          style={{
            fontSize: "0.45rem",
            fontWeight: 700,
            color: "var(--text-tertiary-color)",
            lineHeight: 1,
          }}
        >
          {logo.alt?.slice(0, 2).toUpperCase()}
        </span>
      ),
      ariaLabel: logo.alt,
    })),
    {
      content: <ViewIcon />,
      ariaLabel: detailTitle,
      gradient: "var(--t11-view-gradient)",
      onClick: h,
      dataProps: {
        "data-session": "view_competesWithBrands",
        "data-competitor-id": competitor._id,
        "data-editing": "false",
      },
    },
  ];

  return (
    <div className="Competitors_table_row_competesWithBrands">
      <Tooltip_11
        toggleContent={total}
        toggleAriaLabel={`${total} ${detailTitle}`}
        items={items}
      />
    </div>
  );
};

export default Competitors_table_row_competesWithBrands;

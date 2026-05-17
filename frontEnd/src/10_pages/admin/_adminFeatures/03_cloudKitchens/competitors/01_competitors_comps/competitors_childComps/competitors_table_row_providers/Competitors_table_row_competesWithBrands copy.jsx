import { Tooltip_3 } from "../../../../../../../../01_components/components.index.js";
import "../../../_styles/competitors_table_row_competesWithBrands.css";
import { getCompetesWithBrandsList } from "../../../02_competitors_helpers/_competitors_helpers.index.js";

const Competitors_table_row_competesWithBrands = ({
  competitor,
  handlers,
  t,
}) => {
  const h = handlers?.handleCompetitorTableAction;
  const allLogos = getCompetesWithBrandsList(competitor?.competesWithBrands);
  const total = allLogos.length;
  const stackTitle = allLogos.map((x) => x.alt).join(", ");
  const logoSlots = [allLogos[0] ?? null, allLogos[1] ?? null];

  const detailTitle = t
    ? t("tableRow.detailCompetes", { defaultValue: "Competing brands" })
    : "Competing brands";

  const toggleAriaLabel = t
    ? t("tableRow.competesRadialToggle", {
        defaultValue:
          "Open competing brands menu: {{count}} brands ({{names}})",
        count: total,
        names: stackTitle,
      })
    : `Open competing brands menu: ${total} brands (${stackTitle})`;

  const toggleCloseAriaLabel = t
    ? t("tableRow.competesRadialClose", {
        defaultValue: "Close competing brands menu",
      })
    : "Close competing brands menu";

  const idPh = t
    ? t("tableRow.competesIdPlaceholder", { defaultValue: "ID" })
    : "ID";

  return (
    <div className="Competitors_table_row_competesWithBrands">
      <div className="Competitors_table_row_competesWithBrands_logos">
        {total === 0 ? (
          <span className="Competitors_table_row_competesWithBrands_empty">
            —
          </span>
        ) : (
          <div className="Competitors_table_row_competesWithBrands_tooltipShell">
            <Tooltip_3
              instanceId={competitor._id}
              toggleContent={total}
              toggleAriaLabel={toggleAriaLabel}
              toggleCloseAriaLabel={toggleCloseAriaLabel}
              logoSlots={logoSlots}
              onViewClick={h}
              viewTitle={detailTitle}
              viewAriaLabel={detailTitle}
              competitorId={competitor._id}
              dataSession="view_competesWithBrands"
              idPlaceholderLabel={idPh}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Competitors_table_row_competesWithBrands;

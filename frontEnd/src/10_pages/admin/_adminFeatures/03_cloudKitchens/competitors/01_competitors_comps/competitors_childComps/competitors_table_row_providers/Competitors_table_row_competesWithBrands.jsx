import "../../../_styles/competitors_table_row_competesWithBrands.css";
import { getCompetesWithLogos } from "../../../02_competitors_helpers/_competitors_helpers.index.js";
import Competitors_table_row_openIconBtn from "./Competitors_table_row_openIconBtn.jsx";

const Competitors_table_row_competesWithBrands = ({
  competitor,
  handlers,
  t,
}) => {
  const h = handlers?.handleCompetitorTableAction;
  const logos = getCompetesWithLogos(competitor?.competesWithBrands, 3);
  const stackTitle = logos.map((x) => x.alt).join(", ");
  const detailTitle = t
    ? t("tableRow.detailCompetes", { defaultValue: "Competing brands" })
    : "Competing brands";

  return (
    <div className="competitors_table_row_competesWithBrands">
      <div className="competitors_table_row_competesWithBrands__logos">
        {logos.length === 0 ? (
          <span className="competitors_table_row_competesWithBrands__empty">
            —
          </span>
        ) : (
          <div
            className="competitors_table_row_competesWithBrands__stack"
            title={stackTitle}
            role="group"
            tabIndex={0}
            aria-label={
              t
                ? t("tableRow.competesStackLabel", {
                    defaultValue: "Competing brands: {{names}}",
                    names: stackTitle,
                  })
                : `Competing brands: ${stackTitle}`
            }
          >
            {logos.map((item, i) => (
              <div
                key={`${item.alt}-${i}`}
                className="competitors_table_row_competesWithBrands__thumbWrap"
                style={{ zIndex: i + 1 }}
              >
                {item.src ? (
                  <img
                    className="competitors_table_row_competesWithBrands__img"
                    src={item.src}
                    alt=""
                    title={item.alt}
                    loading="lazy"
                  />
                ) : (
                  <span
                    className="competitors_table_row_competesWithBrands__idPlaceholder"
                    title={item.alt}
                  >
                    ID
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Competitors_table_row_openIconBtn
        onClick={h}
        dataSession="view_competesWithBrands"
        competitorId={competitor._id}
        title={detailTitle}
        ariaLabel={detailTitle}
        variant="competesThumb"
      />
    </div>
  );
};

export default Competitors_table_row_competesWithBrands;

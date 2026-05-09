import "../../../_styles/competitors_table_row_cuisineTypes.css";
import { getCuisineTagsForRow } from "../../../02_competitors_helpers/_competitors_helpers.index.js";
import Competitors_table_row_openIconBtn from "./Competitors_table_row_openIconBtn.jsx";

const Competitors_table_row_cuisineTypes = ({ competitor, handlers, t }) => {
  const h = handlers?.handleCompetitorTableAction;
  const tags = getCuisineTagsForRow(competitor?.cuisineTypes, 3);
  const stackTitle = tags.join(", ");
  const detailTitle = t
    ? t("tableRow.detailCuisine", { defaultValue: "Cuisine types" })
    : "Cuisine types";

  return (
    <div className="competitors_table_row_cuisineTypes">
      <div className="competitors_table_row_cuisineTypes__tagsCol">
        {tags.length === 0 ? (
          <span className="competitors_table_row_cuisineTypes__empty">—</span>
        ) : (
          <div
            className="competitors_table_row_cuisineTypes__stack"
            title={stackTitle}
            role="group"
            tabIndex={0}
            aria-label={
              t
                ? t("tableRow.cuisineStackLabel", {
                    defaultValue: "Cuisine tags: {{names}}",
                    names: stackTitle,
                  })
                : `Cuisine tags: ${stackTitle}`
            }
          >
            {tags.map((tag, i) => (
              <span
                key={`${tag}-${i}`}
                className="competitors_table_row_cuisineTypes__tag"
                style={{ zIndex: i + 1 }}
                title={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <Competitors_table_row_openIconBtn
        onClick={h}
        dataSession="view_cuisineTypes"
        competitorId={competitor._id}
        title={detailTitle}
        ariaLabel={detailTitle}
      />
    </div>
  );
};

export default Competitors_table_row_cuisineTypes;

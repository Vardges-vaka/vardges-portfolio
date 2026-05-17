import {
  Competitors_table_row_profile,
  Competitors_table_row_cuisineTypes,
  Competitors_table_row_priceRange,
  Competitors_table_row_dineIn,
  Competitors_table_row_menu,
  Competitors_table_row_menuItemQty,
  Competitors_table_row_menuCategoryQty,
  Competitors_table_row_ownDeliveryDubai,
  Competitors_table_row_competesWithBrands,
  Competitors_table_row_branches,
  Competitors_table_row_files,
  Competitors_table_row_socials,
  Competitors_table_row_contact,
  Competitors_table_row_reviews,
} from "./competitors_table_row_providers/_competitors_table_row_providers.index.js";
import Competitors_table_row_openIconBtn from "./competitors_table_row_providers/Competitors_table_row_openIconBtn.jsx";
import "../../_styles/competitors_table_row_provider.css";

/* Column behaviour spec lives in backEnd/.../Competitor.js (comment block) and product notes. */

const Competitors_table_rows_provider = ({
  rowIndex,
  competitor,
  states,
  handlers,
  t,
}) => {
  if (!competitor) return null;

  const h = handlers?.handleCompetitorTableAction;

  return (
    <tr className="Competitors_table_rows_provider">
      <td className="Competitors_table_rows_provider_cell Competitors_table_rows_provider_cellNum">
        {rowIndex + 1}
      </td>
      <td className="Competitors_table_rows_provider_cell Competitors_table_rows_provider_cellProfile Competitors_table_rows_provider_cellHug">
        <Competitors_table_row_profile
          competitor={competitor}
          states={states}
          handlers={handlers}
          t={t}
        />
      </td>
      <td className="Competitors_table_rows_provider_cell Competitors_table_rows_provider_cellCuisineTypes Competitors_table_rows_provider_cellHug">
        <Competitors_table_row_cuisineTypes
          competitor={competitor}
          handlers={handlers}
          t={t}
        />
      </td>
      <td className="Competitors_table_rows_provider_cell Competitors_table_rows_provider_cellCompetesWithBrands Competitors_table_rows_provider_cellHug">
        <Competitors_table_row_competesWithBrands
          competitor={competitor}
          states={states}
          handlers={handlers}
          t={t}
        />
      </td>
      <td className="Competitors_table_rows_provider_cell Competitors_table_rows_provider_cellMenu Competitors_table_rows_provider_cellHug">
        <Competitors_table_row_menu
          competitor={competitor}
          handlers={handlers}
          t={t}
        />
      </td>
      <td className="Competitors_table_rows_provider_cell Competitors_table_rows_provider_cellMenuItemsQnt Competitors_table_rows_provider_cellHug">
        <Competitors_table_row_menuItemQty competitor={competitor} />
      </td>{" "}
      <td className="Competitors_table_rows_provider_cell Competitors_table_rows_provider_cellMenuCategoriesQnt Competitors_table_rows_provider_cellHug">
        <Competitors_table_row_menuCategoryQty competitor={competitor} />
      </td>
      <td className="Competitors_table_rows_provider_cell Competitors_table_rows_provider_cellPriceRange Competitors_table_rows_provider_cellHug">
        <Competitors_table_row_priceRange
          competitor={competitor}
          handlers={handlers}
          t={t}
        />
      </td>
      <td className="Competitors_table_rows_provider_cell Competitors_table_rows_provider_cellDineIn Competitors_table_rows_provider_cellHug">
        <Competitors_table_row_dineIn competitor={competitor} t={t} />
      </td>{" "}
      <td className="Competitors_table_rows_provider_cell Competitors_table_rows_provider_cellOwnDeliveryDubai Competitors_table_rows_provider_cellHug">
        <Competitors_table_row_ownDeliveryDubai competitor={competitor} t={t} />
      </td>
      <td className="Competitors_table_rows_provider_cell Competitors_table_rows_provider_cellBranches Competitors_table_rows_provider_cellHug">
        <Competitors_table_row_branches
          competitor={competitor}
          handlers={handlers}
          t={t}
        />
      </td>
      <td className="Competitors_table_rows_provider_cell Competitors_table_rows_provider_cellFiles Competitors_table_rows_provider_cellHug">
        <Competitors_table_row_files
          competitor={competitor}
          handlers={handlers}
          t={t}
        />
      </td>
      <td className="Competitors_table_rows_provider_cell Competitors_table_rows_provider_cellSocials Competitors_table_rows_provider_cellHug">
        <Competitors_table_row_socials
          competitor={competitor}
          handlers={handlers}
          t={t}
        />
      </td>
      <td className="Competitors_table_rows_provider_cell Competitors_table_rows_provider_cellContact Competitors_table_rows_provider_cellHug">
        <Competitors_table_row_contact
          competitor={competitor}
          handlers={handlers}
          t={t}
        />
      </td>
      <td className="Competitors_table_rows_provider_cell Competitors_table_rows_provider_cellReviews Competitors_table_rows_provider_cellHug">
        <Competitors_table_row_reviews
          competitor={competitor}
          handlers={handlers}
          t={t}
        />
      </td>
      <td className="Competitors_table_rows_provider_cell Competitors_table_rows_provider_cellIcon Competitors_table_rows_provider_cellHug">
        <button
          type="button"
          className="Competitors_table_rows_provider_iconBtn"
          data-session="view_competitor"
          data-competitor-id={competitor._id}
          data-editing="true"
          onClick={h}
          title={
            t
              ? t("tableRow.editCompetitor", "Edit competitor")
              : "Edit competitor"
          }
          aria-label={
            t
              ? t("tableRow.editCompetitor", "Edit competitor")
              : "Edit competitor"
          }>
          <svg
            className="Competitors_table_rows_provider_iconSvg"
            viewBox="0 0 24 24"
            aria-hidden>
            <path
              fill="currentColor"
              d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
            />
          </svg>
        </button>
      </td>
      <td className="Competitors_table_rows_provider_cell Competitors_table_rows_provider_cellIcon Competitors_table_rows_provider_cellHug">
        <button
          type="button"
          className="Competitors_table_rows_provider_iconBtn"
          data-session="view_competitor"
          data-competitor-id={competitor._id}
          data-editing="false"
          onClick={h}
          title={
            t
              ? t("tableRow.viewCompetitor", "View competitor")
              : "View competitor"
          }
          aria-label={
            t
              ? t("tableRow.viewCompetitor", "View competitor")
              : "View competitor"
          }>
          <svg
            className="Competitors_table_rows_provider_iconSvg"
            viewBox="0 0 24 24"
            aria-hidden>
            <path
              fill="currentColor"
              d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Competitors_table_rows_provider;

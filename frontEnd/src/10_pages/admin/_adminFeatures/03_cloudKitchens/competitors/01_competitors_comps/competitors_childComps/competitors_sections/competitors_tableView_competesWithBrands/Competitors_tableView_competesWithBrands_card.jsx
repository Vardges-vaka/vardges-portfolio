import { competitorsTableViewCompetesWithBrands_tagLabels as tagLabels } from "./competitors_tableView_competesWithBrands_tagLabels.js";

import "../../../../_styles/competitors_tableView_competesWithBrands/competitors_tableView_competesWithBrands_card.css";

const Competitors_tableView_competesWithBrands_card = ({ states, handlers }) => {
  const { row, other, text, isEditing } = states;
  const name = other?.name || `ID ${row.brand}`;
  const overlap = tagLabels(row.cuisineTags);
  const obsCount = row.observations?.length ?? 0;

  return (
    <li className="Competitors_tableView_competesWithBrands_card">
      <div className="Competitors_tableView_competesWithBrands_cardTop">
        <div className="Competitors_tableView_competesWithBrands_logoWrap">
          {other?.logo ? (
            <img
              className="Competitors_tableView_competesWithBrands_logo"
              src={other.logo}
              alt=""
            />
          ) : (
            <span className="Competitors_tableView_competesWithBrands_logoFallback">
              {name.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>
        {isEditing && (
          <button
            type="button"
            className="Competitors_tableView_competesWithBrands_removeBtn"
            onClick={() => handlers?.onRemove?.(row.brand)}
            aria-label={text.removeAria(name)}>
            ×
          </button>
        )}
      </div>
      <h3 className="Competitors_tableView_competesWithBrands_cardName">{name}</h3>
      <p className="Competitors_tableView_competesWithBrands_meta">
        <span className="Competitors_tableView_competesWithBrands_metaKey">
          {text.overlapLabel}:{" "}
        </span>
        {overlap || "—"}
      </p>
      <p className="Competitors_tableView_competesWithBrands_meta">
        <span className="Competitors_tableView_competesWithBrands_metaKey">
          {text.platformLabel}:{" "}
        </span>
        {row.platform || "—"}
      </p>
      <p className="Competitors_tableView_competesWithBrands_metaMuted">
        {text.observationsCount(obsCount)}
      </p>
    </li>
  );
};

export default Competitors_tableView_competesWithBrands_card;

import { competitorsTableViewCompetesWithBrands_tagLabels as tagLabels } from "./competitors_tableView_competesWithBrands_tagLabels.js";

import "../../../../_styles/competitors_tableView_competesWithBrands/competitors_tableView_competesWithBrands_addSection.css";

const Competitors_tableView_competesWithBrands_addSection = ({ states, handlers }) => {
  const {
    text,
    draftRows,
    maxLinks,
    eligibleAdd,
    filteredEligibleAdd,
    hostTagChips,
    addFilterTag,
  } = states;
  const { addCompetitor, setAddFilterTag } = handlers;

  return (
    <section
      className="Competitors_tableView_competesWithBrands_addSection"
      aria-label={text.addSectionTitle}>
      <h3 className="Competitors_tableView_competesWithBrands_addTitle">
        {text.addSectionTitle}
      </h3>

      <div
        className="Competitors_tableView_competesWithBrands_tagFilters"
        role="group"
        aria-label={text.addFilterHeading}>
        <span className="Competitors_tableView_competesWithBrands_tagFiltersLabel">
          {text.addFilterHeading}
        </span>
        <div className="Competitors_tableView_competesWithBrands_tagFiltersBtns">
          <button
            type="button"
            className={
              "Competitors_tableView_competesWithBrands_tagFilterBtn" +
              (addFilterTag == null
                ? " Competitors_tableView_competesWithBrands_tagFilterBtn--active"
                : "")
            }
            aria-pressed={addFilterTag == null}
            onClick={() => setAddFilterTag?.(null)}>
            {text.filterAllTags}
          </button>
          {hostTagChips.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              className={
                "Competitors_tableView_competesWithBrands_tagFilterBtn" +
                (addFilterTag === value
                  ? " Competitors_tableView_competesWithBrands_tagFilterBtn--active"
                  : "")
              }
              aria-pressed={addFilterTag === value}
              onClick={() => setAddFilterTag?.(value)}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {draftRows.length >= maxLinks ? (
        <p className="Competitors_tableView_competesWithBrands_addSectionEmpty">
          {text.maxLinksHint}
        </p>
      ) : eligibleAdd.length === 0 ? (
        <p className="Competitors_tableView_competesWithBrands_addSectionEmpty">
          {text.emptyEligible}
        </p>
      ) : filteredEligibleAdd.length === 0 ? (
        <p className="Competitors_tableView_competesWithBrands_addSectionEmpty">
          {text.filterEmpty}
        </p>
      ) : (
        <ul
          className="Competitors_tableView_competesWithBrands_addGrid"
          role="list">
          {filteredEligibleAdd.map(({ competitor: y, cuisineTags }) => {
            const overlap = tagLabels(cuisineTags);
            return (
              <li
                key={String(y._id)}
                className="Competitors_tableView_competesWithBrands_addCard">
                <div className="Competitors_tableView_competesWithBrands_addCardTop">
                  <div
                    className={
                      "Competitors_tableView_competesWithBrands_addLogoWrap Competitors_tableView_competesWithBrands_addLogoWrap--sm"
                    }>
                    {y.logo ? (
                      <img
                        className="Competitors_tableView_competesWithBrands_addLogo"
                        src={y.logo}
                        alt=""
                      />
                    ) : (
                      <span className="Competitors_tableView_competesWithBrands_addLogoFallback">
                        {(y.name || "?").slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="Competitors_tableView_competesWithBrands_addBtn"
                    onClick={() => addCompetitor?.(y._id)}>
                    +
                  </button>
                </div>
                <p className="Competitors_tableView_competesWithBrands_addName">
                  {y.name}
                </p>
                <p className="Competitors_tableView_competesWithBrands_addOverlap">
                  {overlap}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default Competitors_tableView_competesWithBrands_addSection;

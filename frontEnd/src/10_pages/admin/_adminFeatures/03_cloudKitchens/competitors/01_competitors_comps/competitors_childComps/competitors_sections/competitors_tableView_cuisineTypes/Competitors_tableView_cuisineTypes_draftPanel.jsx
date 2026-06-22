import "../../../../_styles/competitors_tableView_cuisineTypes/competitors_tableView_cuisineTypes_draftPanel.css";

const Competitors_tableView_cuisineTypes_draftPanel = ({
  states,
  handlers,
  t,
}) => {
  return (
    <section
      className="Competitors_tableView_cuisineTypes_draftPanel"
      aria-labelledby="cuisineTypes_draft_heading">
      <h3
        id="cuisineTypes_draft_heading"
        className="Competitors_tableView_cuisineTypes_draftTitle">
        {states.text.draftSelectionTitle}
      </h3>
      <p className="Competitors_tableView_cuisineTypes_draftHint">
        {states.text.draftSelectionHint}
      </p>
      {states.selectedCount === 0 ? (
        <p className="Competitors_tableView_cuisineTypes_draftEmpty">
          {states.text.draftSelectionEmpty}
        </p>
      ) : (
        <div
          className="Competitors_tableView_cuisineTypes_draftChips"
          role="list">
          {states.selectedMetas.map((tag) => (
            <div
              key={tag.value}
              className="Competitors_tableView_cuisineTypes_draftChipWrap"
              role="listitem">
              <button
                type="button"
                className="Competitors_tableView_cuisineTypes_draftChip"
                data-cuisine-kind={tag.kind || tag.type}
                onClick={() =>
                  handlers?.handleCatalogChipClick?.({ value: tag.value })
                }
                aria-label={handlers?.draftRemoveAria?.({ name: tag.label })}>
                {tag.label}
              </button>
            </div>
          ))}
          {states.legacyRows.map((row, index) => (
            <div
              key={`${row.tag}-${index}`}
              className="Competitors_tableView_cuisineTypes_draftChipWrap Competitors_tableView_cuisineTypes_draftChipWrapLegacy"
              role="listitem">
              <button
                type="button"
                className="Competitors_tableView_cuisineTypes_draftChip Competitors_tableView_cuisineTypes_draftChipLegacy"
                onClick={() =>
                  handlers?.setDetailSelection?.({ kind: "legacy", index })
                }>
                {row.tag}
              </button>
              <button
                type="button"
                className="Competitors_tableView_cuisineTypes_draftRemove"
                onClick={() => handlers?.removeLegacy?.({ index })}
                aria-label={states.text.removeLegacyLabel}>
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Competitors_tableView_cuisineTypes_draftPanel;

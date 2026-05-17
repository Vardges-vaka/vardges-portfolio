import "../../../../_styles/competitors_tableView_cuisineTypes/competitors_tableView_cuisineTypes_viewSelected.css";

const Competitors_tableView_cuisineTypes_viewSelected = ({
  states,
  handlers,
}) => {
  const hasAny =
    (Array.isArray(states.selectedMetas) && states.selectedMetas.length > 0) ||
    (Array.isArray(states.legacyRows) && states.legacyRows.length > 0);

  return (
    <div className="cuisineTypesViewSelected">
      <h3 className="cuisineTypesViewSelected__title">{states.title}</h3>
      {!hasAny && (
        <p className="cuisineTypesViewSelected__empty">{states.emptyHint}</p>
      )}
      {hasAny && (
        <div className="cuisineTypesViewSelected__chipGrid">
          {states.selectedMetas.map((tag) => {
            const isDetail =
              states.detailSelection?.kind === "catalog" &&
              states.detailSelection.value === tag.value;
            return (
              <button
                key={tag.value}
                type="button"
                className={
                  "cuisineTypesViewSelected__chip" +
                  (isDetail ? " cuisineTypesViewSelected__chipFocused" : "")
                }
                data-cuisine-kind={tag.type}
                onClick={() => handlers.onSelectCatalog(tag.value)}>
                {tag.label}
              </button>
            );
          })}
          {states.legacyRows.map((row, index) => {
            const isDetail =
              states.detailSelection?.kind === "legacy" &&
              states.detailSelection.index === index;
            return (
              <button
                key={`${row.tag}-${index}`}
                type="button"
                className={
                  "cuisineTypesViewSelected__chip cuisineTypesViewSelected__chipLegacy" +
                  (isDetail ? " cuisineTypesViewSelected__chipFocused" : "")
                }
                onClick={() => handlers.onSelectLegacy(index)}>
                {row.tag}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Competitors_tableView_cuisineTypes_viewSelected;

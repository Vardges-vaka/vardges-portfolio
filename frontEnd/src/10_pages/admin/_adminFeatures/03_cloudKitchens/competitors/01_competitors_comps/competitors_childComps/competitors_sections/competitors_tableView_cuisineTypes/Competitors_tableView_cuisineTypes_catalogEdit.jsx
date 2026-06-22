import "../../../../_styles/competitors_tableView_cuisineTypes/competitors_tableView_cuisineTypes_catalogEdit.css";

const Competitors_tableView_cuisineTypes_catalogEdit = ({
  t,
  states,
  handlers,
}) => {
  const catalogTitle = t
    ? t("cuisineTypes.catalogHeading", "Catalog")
    : "Catalog";

  const sectionTitle = (ty) =>
    t(`cuisineTypes.sectionTitles.${ty}`, { defaultValue: ty });

  const removeLegacyLabel = t
    ? t("cuisineTypes.removeLegacy", "Remove tag")
    : "Remove tag";

  return (
    <div className="cuisineTypesCatalogEdit">
      <h3 className="cuisineTypesCatalogEdit__panelTitle">{catalogTitle}</h3>
      {states.sections.map(({ type, tags }) => (
        <section
          key={type}
          className="cuisineTypesCatalogEdit__section"
          aria-labelledby={`cuisineTypesCatalogEdit_section_${type}`}>
          <h4
            id={`cuisineTypesCatalogEdit_section_${type}`}
            className="cuisineTypesCatalogEdit__sectionTitle">
            {sectionTitle(type)}
          </h4>
          <div className="cuisineTypesCatalogEdit__chipGrid">
            {tags.map((tag) => {
              const selected = states.draftKnownValues.includes(tag.value);
              const isDetail =
                states.detailSelection?.kind === "catalog" &&
                states.detailSelection.value === tag.value;
              return (
                <button
                  key={tag.value}
                  type="button"
                  className={
                    "cuisineTypesCatalogEdit__chip" +
                    (selected ? " cuisineTypesCatalogEdit__chipSelected" : "") +
                    (isDetail ? " cuisineTypesCatalogEdit__chipFocused" : "")
                  }
                  data-cuisine-kind={tag.kind || tag.type}
                  aria-pressed={selected}
                  aria-label={handlers.chipAria(tag.label)}
                  onClick={() => handlers.onCatalogChipClick(tag.value)}>
                  {tag.label}
                </button>
              );
            })}
          </div>
        </section>
      ))}

      {states.legacyRows.length > 0 && (
        <section
          className="cuisineTypesCatalogEdit__section"
          aria-labelledby="cuisineTypesCatalogEdit_legacy">
          <h4
            id="cuisineTypesCatalogEdit_legacy"
            className="cuisineTypesCatalogEdit__sectionTitle">
            {states.legacyHeading}
          </h4>
          <p className="cuisineTypesCatalogEdit__legacyHint">
            {states.legacyHint}
          </p>
          <div className="cuisineTypesCatalogEdit__chipGrid">
            {states.legacyRows.map((row, index) => {
              const isDetail =
                states.detailSelection?.kind === "legacy" &&
                states.detailSelection.index === index;
              return (
                <div
                  key={`${row.tag}-${index}`}
                  className="cuisineTypesCatalogEdit__tagRow cuisineTypesCatalogEdit__legacyRow">
                  <button
                    type="button"
                    className={
                      "cuisineTypesCatalogEdit__chip cuisineTypesCatalogEdit__chipLegacy" +
                      (isDetail ? " cuisineTypesCatalogEdit__chipFocused" : "")
                    }
                    onClick={() => handlers.onSelectDetailLegacy(index)}>
                    {row.tag}
                  </button>
                  <button
                    type="button"
                    className="cuisineTypesCatalogEdit__removeBtn"
                    onClick={() => handlers.onRemoveLegacy(index)}
                    aria-label={removeLegacyLabel}>
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default Competitors_tableView_cuisineTypes_catalogEdit;

import { useMemo, useState } from "react";
import {
  CUISINE_TYPES,
  AGGREGATOR_PLATFORMS,
  CUISINE_TAG_SOURCE_OPTIONS,
} from "../../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
import { CUISINE_TAG_SOURCE_ICONS } from "../../tempIcons/_.index.js";
import CK_stp_brand_cuisineTagRow from "./CK_stp_brand_cuisineTagRow.jsx";
import {
  Select_static,
  Input_search,
} from "../../../../../../../../01_components/_components.index.js";
import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_cuisineTags.css";

const normalizeAssignedIds = (tags = []) =>
  (Array.isArray(tags) ? tags : [])
    .map((item) => (typeof item === "string" ? item : item?._id))
    .filter(Boolean);

const svgLeftIcon = (src) => (src ? { type: "svg", svg_src: src } : null);

const withAllOption = (allLabel, items) => [
  { value: "all", label: allLabel },
  ...items,
];

const tagMatchesFilters = (
  tag,
  { search, kindFilter, sourceFilter, platformFilter },
) => {
  if (kindFilter !== "all" && tag.kind !== kindFilter) return false;
  if (sourceFilter !== "all" && tag.source !== sourceFilter) return false;

  if (platformFilter !== "all") {
    const tagPlatforms = Array.isArray(tag.platforms) ? tag.platforms : [];
    if (!tagPlatforms.includes(platformFilter)) return false;
  }

  const needle = search.trim().toLowerCase();
  if (!needle) return true;

  const haystack = [
    tag.label,
    tag.value,
    tag.description,
    tag.kind,
    tag.source,
    ...(tag.platforms || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(needle);
};

const CuisineTagList = ({ title, tags, mode, emptyMessage, handlers }) => (
  <div className="cK_stp_brand_fld_cuisineTags__listBlock">
    <h5 className="cK_stp_brand_fld_cuisineTags__listTitle">{title}</h5>
    {tags.length === 0 ? (
      <p className="cK_stp_brand_fld_cuisineTags__empty">{emptyMessage}</p>
    ) : (
      <div className="cK_stp_brand_fld_cuisineTags__tableWrap">
        <ul className="cK_stp_brand_fld_cuisineTags__table">
          <li className="cK_stp_brand_cuisineTagRow cK_stp_brand_cuisineTagRow--head">
            <span className="cK_stp_brand_cuisineTagRow__cell cK_stp_brand_cuisineTagRow__index">
              #
            </span>
            <span className="cK_stp_brand_cuisineTagRow__cell cK_stp_brand_cuisineTagRow__kind">
              Kind
            </span>
            <span className="cK_stp_brand_cuisineTagRow__cell cK_stp_brand_cuisineTagRow__label">
              Label
            </span>
            <span className="cK_stp_brand_cuisineTagRow__cell cK_stp_brand_cuisineTagRow__desc">
              Description
            </span>
            <span className="cK_stp_brand_cuisineTagRow__cell cK_stp_brand_cuisineTagRow__platforms">
              Platforms
            </span>
            <span className="cK_stp_brand_cuisineTagRow__cell cK_stp_brand_cuisineTagRow__source">
              Source
            </span>
            <span className="cK_stp_brand_cuisineTagRow__cell cK_stp_brand_cuisineTagRow__action">
              {mode === "assigned" ? "Remove" : "Add"}
            </span>
          </li>
          {tags.map((tag, i) => (
            <CK_stp_brand_cuisineTagRow
              key={tag._id}
              tag={tag}
              index={i + 1}
              mode={mode}
              onAdd={handlers.onAddCuisineTag}
              onRemove={handlers.onRemoveCuisineTag}
            />
          ))}
        </ul>
      </div>
    )}
  </div>
);

const CK_stp_brand_fld_cuisineTags = ({ states, handlers }) => {
  const catalog = states.cuisineTags ?? [];
  const assignedIds = useMemo(
    () => new Set(normalizeAssignedIds(states.values?.cuisineTags)),
    [states.values?.cuisineTags],
  );

  const [search, setSearch] = useState("");
  const [kindFilter, setKindFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");

  const filters = { search, kindFilter, sourceFilter, platformFilter };

  const kindFilterOptions = useMemo(
    () =>
      withAllOption(
        "All kinds",
        CUISINE_TYPES.map((ct) => ({
          value: ct.value,
          label: ct.label,
          leftIcon: svgLeftIcon(ct.logo),
        })),
      ),
    [],
  );

  const sourceFilterOptions = useMemo(
    () =>
      withAllOption(
        "All sources",
        CUISINE_TAG_SOURCE_OPTIONS.map((src) => ({
          value: src.value,
          label: src.label,
          leftIcon: svgLeftIcon(CUISINE_TAG_SOURCE_ICONS[src.value]),
        })),
      ),
    [],
  );

  const platformFilterOptions = useMemo(
    () =>
      withAllOption(
        "All platforms",
        AGGREGATOR_PLATFORMS.map((platform) => ({
          value: platform.value,
          label: platform.label,
          leftIcon: svgLeftIcon(platform.logo),
        })),
      ),
    [],
  );

  const catalogById = useMemo(() => {
    const map = new Map();
    catalog.forEach((tag) => {
      if (tag?._id) map.set(tag._id, tag);
    });
    return map;
  }, [catalog]);

  const assignedTags = useMemo(() => {
    return [...assignedIds]
      .map((id) => catalogById.get(id) || { _id: id, label: id, value: id })
      .filter((tag) => tagMatchesFilters(tag, filters))
      .sort((a, b) => (a.label || "").localeCompare(b.label || ""));
  }, [
    assignedIds,
    catalogById,
    search,
    kindFilter,
    sourceFilter,
    platformFilter,
  ]);

  const availableTags = useMemo(() => {
    return catalog
      .filter((tag) => {
        if (!tag?._id || assignedIds.has(tag._id)) return false;
        return tagMatchesFilters(tag, filters);
      })
      .sort((a, b) => (a.label || "").localeCompare(b.label || ""));
  }, [catalog, assignedIds, search, kindFilter, sourceFilter, platformFilter]);

  const emptyCatalog = catalog.length === 0;
  const hasActiveFilters =
    search.trim() ||
    kindFilter !== "all" ||
    sourceFilter !== "all" ||
    platformFilter !== "all";

  const resetFilters = () => {
    setSearch("");
    setKindFilter("all");
    setSourceFilter("all");
    setPlatformFilter("all");
  };
  const [showfilters, setShowfilters] = useState(false);
  const handleShowfilters = () => {
    setShowfilters(!showfilters);
    resetFilters();
  };
  const [showAvailable, setShowAvailable] = useState(false);
  const handleShowAvailable = () => {
    setShowAvailable(!showAvailable);
  };
  return (
    <section className="cK_stp_brand_fld_cuisineTags">
      <div className="cK_setup_form_sectionHead">
        <div>
          <h4 className="cK_setup_form_sectionTitle">Cuisine Tags</h4>
          <p className="cK_stp_brand_fld_cuisineTags__subtitle">
            Link catalog tags to this brand.
          </p>
        </div>
        <div className="cK_stp_brand_fld_cuisineTags__stats">
          <span className="cK_stp_brand_fld_cuisineTags__stat">
            <strong>{assignedIds.size}</strong> on brand
          </span>
          <span className="cK_stp_brand_fld_cuisineTags__stat">
            <strong>{availableTags.length}</strong> available
          </span>
        </div>
      </div>

      <div className="cK_stp_brand_fld_cuisineTags__filters">
        <CuisineTagList
          title="On this brand"
          tags={assignedTags}
          mode="assigned"
          emptyMessage={
            hasActiveFilters
              ? "No assigned tags match the current filters."
              : "No cuisine tags linked yet. Add tags from the catalog below."
          }
          handlers={handlers}
        />
        <button
          type="button"
          className="cK_stp_brand_fld_cuisineTags__clearSearch"
          onClick={handleShowAvailable}>
          See available
        </button>
        {showAvailable && (
          <div className="cK_stp_brand_fld_cuisineTags__filters">
            <Input_search
              labelProps={{ isActive: false }}
              placeholder="Search cuisine tags…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClear={() => setSearch("")}
              secondaryRightIconProps={{
                isActive: true,
                type: "lucide",
                lucidIcon: "SlidersHorizontal",
                title: "Open filters",
                onClick: handleShowfilters,
              }}
            />
            {showfilters && (
              <div className="cK_stp_brand_fld_cuisineTags__selectRow">
                <Select_static
                  optionsType="leftIcon"
                  labelProps={{ isActive: true, message: "Kind" }}
                  options={kindFilterOptions}
                  placeholder="All kinds"
                  value={kindFilter}
                  onChange={(e) => setKindFilter(e.target.value)}
                />
                <Select_static
                  optionsType="leftIcon"
                  labelProps={{ isActive: true, message: "Source" }}
                  options={sourceFilterOptions}
                  placeholder="All sources"
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                />
                <Select_static
                  optionsType="leftIcon"
                  labelProps={{ isActive: true, message: "Platform" }}
                  options={platformFilterOptions}
                  placeholder="All platforms"
                  value={platformFilter}
                  onChange={(e) => setPlatformFilter(e.target.value)}
                />
                {hasActiveFilters ? (
                  <button
                    type="button"
                    className="cK_stp_brand_fld_cuisineTags__resetFilters"
                    onClick={resetFilters}>
                    Reset filters
                  </button>
                ) : null}
              </div>
            )}

            {emptyCatalog ? (
              <p className="cK_stp_brand_fld_cuisineTags__empty">
                No cuisine tags in the catalog yet. Create tags in the Cuisine
                Tags session first.
              </p>
            ) : (
              <CuisineTagList
                title="Catalog — add tags"
                tags={availableTags}
                mode="catalog"
                emptyMessage={
                  hasActiveFilters
                    ? "No matching tags to add."
                    : "All catalog tags are already on this brand."
                }
                handlers={handlers}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default CK_stp_brand_fld_cuisineTags;

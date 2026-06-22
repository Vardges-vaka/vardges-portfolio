import { useMemo, useState } from "react";
import {
  CUISINE_TYPES,
  AGGREGATOR_PLATFORMS,
  CUISINE_TAG_SOURCE_OPTIONS,
} from "../../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
import {
  normalizeCuisineTagIds,
} from "../../../02_cK_setup_hlpr/brandDetail_helpers.js";
import {
  tagMatchesFilters,
  hasActiveCuisineTagFilters,
  buildFilterOptionsWithSelectAll,
  createMultiFilterChangeHandler,
  getFilterOptionValues,
  shouldShowSelectAllForFilter,
  collectSelectedFilterIcons,
} from "../../../02_cK_setup_hlpr/_cK_setup_hlpr.index.js";
import { CUISINE_TAG_SOURCE_ICONS } from "../../tempIcons/_.index.js";
import CK_stp_brand_cuisineTagRow from "./CK_stp_brand_cuisineTagRow.jsx";
import CK_stp_cuisineTag_platformIconStack from "../../cK_setup_shared/CK_stp_cuisineTag_platformIconStack.jsx";
import {
  Select_multi,
  Input_search,
} from "../../../../../../../../01_components/_components.index.js";
import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_cuisineTags.css";

const normalizeAssignedIds = normalizeCuisineTagIds;

const resolveAssignedTagRecords = (rawItems = [], catalogById) =>
  (Array.isArray(rawItems) ? rawItems : [])
    .map((item) => {
      if (item && typeof item === "object" && item._id) {
        const fromCatalog = catalogById.get(item._id);
        return fromCatalog ? { ...fromCatalog, ...item } : item;
      }

      const id = typeof item === "string" ? item : item?._id;
      if (!id) return null;

      return (
        catalogById.get(id) || {
          _id: id,
          label: id,
          value: id,
        }
      );
    })
    .filter(Boolean);

const svgLeftIcon = (src) => (src ? { type: "svg", svg_src: src } : null);

const CuisineTagList = ({ title, tags, emptyMessage }) => (
  <div className="cK_stp_brand_fld_cuisineTags__listBlock">
    {title ? (
      <h5 className="cK_stp_brand_fld_cuisineTags__listTitle">{title}</h5>
    ) : null}
    {tags.length === 0 ? (
      <p className="cK_stp_brand_fld_cuisineTags__empty">{emptyMessage}</p>
    ) : (
      <div className="cK_stp_brand_fld_cuisineTags__tableWrap">
        <ul className="cK_stp_brand_fld_cuisineTags__table">
          <li className="cK_stp_brand_cuisineTagRow cK_stp_brand_cuisineTagRow--head cK_stp_brand_cuisineTagRow--view">
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
          </li>
          {tags.map((tag, i) => (
            <CK_stp_brand_cuisineTagRow
              key={tag._id}
              tag={tag}
              index={i + 1}
              mode="view"
            />
          ))}
        </ul>
      </div>
    )}
  </div>
);

const CK_stp_brand_fld_cuisineTags = ({ states }) => {
  const catalog = states.cuisineTags ?? [];
  const assignedSource = useMemo(() => {
    const linked = states.linkedCuisineTags;
    if (Array.isArray(linked) && linked.length) return linked;
    return states.values?.cuisineTags ?? [];
  }, [states.linkedCuisineTags, states.values?.cuisineTags]);

  const assignedIds = useMemo(
    () => new Set(normalizeAssignedIds(assignedSource)),
    [assignedSource],
  );

  const [search, setSearch] = useState("");
  const [kindFilter, setKindFilter] = useState([]);
  const [sourceFilter, setSourceFilter] = useState([]);
  const [platformFilter, setPlatformFilter] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const filters = { search, kindFilter, sourceFilter, platformFilter };

  const kindFilterOptions = useMemo(
    () =>
      CUISINE_TYPES.map((ct) => ({
        value: ct.value,
        label: ct.label,
        leftIcon: svgLeftIcon(ct.logo),
      })),
    [],
  );

  const sourceFilterOptions = useMemo(
    () =>
      CUISINE_TAG_SOURCE_OPTIONS.map((src) => ({
        value: src.value,
        label: src.label,
        leftIcon: svgLeftIcon(CUISINE_TAG_SOURCE_ICONS[src.value]),
      })),
    [],
  );

  const platformFilterOptions = useMemo(
    () =>
      AGGREGATOR_PLATFORMS.map((platform) => ({
        value: platform.value,
        label: platform.label,
        leftIcon: svgLeftIcon(platform.logo),
      })),
    [],
  );

  const kindFilterValues = useMemo(
    () => getFilterOptionValues(kindFilterOptions),
    [kindFilterOptions],
  );

  const sourceFilterValues = useMemo(
    () => getFilterOptionValues(sourceFilterOptions),
    [sourceFilterOptions],
  );

  const platformFilterValues = useMemo(
    () => getFilterOptionValues(platformFilterOptions),
    [platformFilterOptions],
  );

  const showKindSelectAll = shouldShowSelectAllForFilter(
    sourceFilter,
    platformFilter,
  );
  const showSourceSelectAll = shouldShowSelectAllForFilter(
    kindFilter,
    platformFilter,
  );
  const showPlatformSelectAll = shouldShowSelectAllForFilter(
    kindFilter,
    sourceFilter,
  );

  const kindSelectOptions = useMemo(
    () => buildFilterOptionsWithSelectAll(kindFilterOptions, showKindSelectAll),
    [kindFilterOptions, showKindSelectAll],
  );

  const sourceSelectOptions = useMemo(
    () =>
      buildFilterOptionsWithSelectAll(sourceFilterOptions, showSourceSelectAll),
    [sourceFilterOptions, showSourceSelectAll],
  );

  const platformSelectOptions = useMemo(
    () =>
      buildFilterOptionsWithSelectAll(
        platformFilterOptions,
        showPlatformSelectAll,
      ),
    [platformFilterOptions, showPlatformSelectAll],
  );

  const catalogById = useMemo(() => {
    const map = new Map();
    catalog.forEach((tag) => {
      if (tag?._id) map.set(tag._id, tag);
    });
    return map;
  }, [catalog]);

  const assignedTagPool = useMemo(
    () =>
      resolveAssignedTagRecords(assignedSource, catalogById).sort((a, b) =>
        (a.label || "").localeCompare(b.label || ""),
      ),
    [assignedSource, catalogById],
  );

  const selectedFilterIcons = useMemo(
    () =>
      collectSelectedFilterIcons({
        kindFilter,
        sourceFilter,
        platformFilter,
        kindOptions: kindFilterOptions,
        sourceOptions: sourceFilterOptions,
        platformOptions: platformFilterOptions,
        tags: assignedTagPool,
        filters,
      }),
    [
      kindFilter,
      sourceFilter,
      platformFilter,
      kindFilterOptions,
      sourceFilterOptions,
      platformFilterOptions,
      assignedTagPool,
      search,
    ],
  );

  const otherFilterIcons = useMemo(
    () =>
      selectedFilterIcons.filter((icon) => icon.filterType !== "platform"),
    [selectedFilterIcons],
  );

  const platformFilterIcons = useMemo(
    () => selectedFilterIcons.filter((icon) => icon.filterType === "platform"),
    [selectedFilterIcons],
  );

  const assignedTags = useMemo(() => {
    return resolveAssignedTagRecords(assignedSource, catalogById)
      .filter((tag) => tagMatchesFilters(tag, filters))
      .sort((a, b) => (a.label || "").localeCompare(b.label || ""));
  }, [
    assignedSource,
    catalogById,
    search,
    kindFilter,
    sourceFilter,
    platformFilter,
  ]);

  const hasActiveFilters = hasActiveCuisineTagFilters(filters);

  const resetFilters = () => {
    setSearch("");
    setKindFilter([]);
    setSourceFilter([]);
    setPlatformFilter([]);
  };

  const showSearchPanel = Boolean(states.cuisineTagsSearchOpen);

  return (
    <section className="cK_stp_brand_fld_cuisineTags">
      <div className="cK_stp_brand_fld_cuisineTags__filters">
        {showSearchPanel ? (
          <Input_search
            labelProps={{ isActive: false }}
            placeholder="Search linked tags…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch("")}
            secondaryRightIconProps={{
              isActive: true,
              type: "lucide",
              lucidIcon: "SlidersHorizontal",
              title: showFilters ? "Hide filters" : "Show filters",
              onClick: () => setShowFilters((prev) => !prev),
            }}
          />
        ) : null}

        {showSearchPanel && showFilters ? (
          <div className="cK_stp_brand_fld_cuisineTags__selectRow">
            <Select_multi
              optionsType="leftIcon"
              labelProps={{ isActive: true, message: "Kind" }}
              options={kindSelectOptions}
              placeholder="All kinds"
              emptySummary="All kinds"
              value={kindFilter}
              onChange={createMultiFilterChangeHandler(
                setKindFilter,
                kindFilterValues,
              )}
            />
            <Select_multi
              optionsType="leftIcon"
              labelProps={{ isActive: true, message: "Source" }}
              options={sourceSelectOptions}
              placeholder="All sources"
              emptySummary="All sources"
              value={sourceFilter}
              onChange={createMultiFilterChangeHandler(
                setSourceFilter,
                sourceFilterValues,
              )}
            />
            <Select_multi
              optionsType="leftIcon"
              labelProps={{ isActive: true, message: "Platform" }}
              options={platformSelectOptions}
              placeholder="All platforms"
              emptySummary="All platforms"
              value={platformFilter}
              onChange={createMultiFilterChangeHandler(
                setPlatformFilter,
                platformFilterValues,
              )}
            />
            {hasActiveFilters ? (
              <div className="cK_stp_brand_fld_cuisineTags__filterActions">
                <button
                  type="button"
                  className="cK_stp_brand_fld_cuisineTags__resetFilters"
                  onClick={resetFilters}>
                  Reset filters
                </button>
                {selectedFilterIcons.length ? (
                  <div
                    className="cK_stp_brand_fld_cuisineTags__filterIcons"
                    aria-label="Active filter selections">
                    {otherFilterIcons.map((icon) => (
                      <span
                        key={icon.key}
                        className="cK_stp_brand_fld_cuisineTags__filterIconWrap"
                        title={
                          icon.count != null
                            ? `${icon.label} (${icon.count})`
                            : icon.label
                        }>
                        <img
                          className="cK_stp_brand_fld_cuisineTags__filterIcon"
                          src={icon.src}
                          alt={icon.label}
                        />
                        {icon.count != null ? (
                          <span className="cK_stp_brand_fld_cuisineTags__filterIconCount">
                            {icon.count}
                          </span>
                        ) : null}
                      </span>
                    ))}
                    {platformFilterIcons.length ? (
                      <CK_stp_cuisineTag_platformIconStack
                        sizeType="sm"
                        items={platformFilterIcons.map((icon) => ({
                          key: icon.key,
                          src: icon.src,
                          label: icon.label,
                          count: icon.count,
                        }))}
                      />
                    ) : null}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}

        {showSearchPanel && hasActiveFilters ? (
          <p className="cK_stp_brand_fld_cuisineTags__filterSummary">
            Showing <strong>{assignedTags.length}</strong> of{" "}
            <strong>{assignedIds.size}</strong> linked tags
          </p>
        ) : null}

        <CuisineTagList
          title=""
          tags={assignedTags}
          emptyMessage={
            assignedIds.size === 0
              ? "No cuisine tags linked to this brand yet."
              : hasActiveFilters
                ? "No linked tags match the current filters."
                : "No cuisine tags linked to this brand yet."
          }
        />
      </div>
    </section>
  );
};

export default CK_stp_brand_fld_cuisineTags;

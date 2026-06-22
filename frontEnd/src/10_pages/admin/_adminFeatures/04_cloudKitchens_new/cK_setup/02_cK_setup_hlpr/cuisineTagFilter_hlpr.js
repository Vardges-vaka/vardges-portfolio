const normalizeFilterList = (value) => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (value && value !== "all") return [value];
  return [];
};

export const SELECT_ALL_FILTER_VALUE = "__select_all__";

export const parseMultiSelectFilterValue = (e) => {
  const raw = e?.target?.value ?? "";
  return raw
    ? raw.split(",").map((item) => item.trim()).filter(Boolean)
    : [];
};

export const buildFilterOptionsWithSelectAll = (options, showSelectAll) => {
  if (!showSelectAll) return options;

  return [{ value: SELECT_ALL_FILTER_VALUE, label: "Select all" }, ...options];
};

export const shouldShowSelectAllForFilter = (...otherFilters) =>
  otherFilters.some((filter) => normalizeFilterList(filter).length > 0);

export const createMultiFilterChangeHandler = (setter, allValues) => (e) => {
  const next = parseMultiSelectFilterValue(e);

  if (next.includes(SELECT_ALL_FILTER_VALUE)) {
    const realNext = next.filter((value) => value !== SELECT_ALL_FILTER_VALUE);
    const allSelected =
      allValues.length > 0 &&
      allValues.every((value) => realNext.includes(value));

    setter(allSelected ? [] : [...allValues]);
    return;
  }

  setter(next);
};

export const getFilterOptionValues = (options = []) =>
  options.map((option) => option.value).filter(Boolean);

export const getFilterIconMatchCount = (
  tags = [],
  filters = {},
  filterType,
  filterValue,
) => {
  const scopedFilters = {
    search: filters.search,
    kindFilter:
      filterType === "kind" ? [filterValue] : normalizeFilterList(filters.kindFilter),
    sourceFilter:
      filterType === "source"
        ? [filterValue]
        : normalizeFilterList(filters.sourceFilter),
    platformFilter:
      filterType === "platform"
        ? [filterValue]
        : normalizeFilterList(filters.platformFilter),
  };

  return tags.filter((tag) => tagMatchesFilters(tag, scopedFilters)).length;
};

export const collectSelectedFilterIcons = ({
  kindFilter,
  sourceFilter,
  platformFilter,
  kindOptions,
  sourceOptions,
  platformOptions,
  tags = null,
  filters = null,
}) => {
  const icons = [];

  const appendIcons = (values, options, filterType) => {
    normalizeFilterList(values).forEach((value) => {
      const option = options.find((item) => item.value === value);
      const src = option?.leftIcon?.svg_src;
      if (!src) return;

      icons.push({
        key: `${filterType}-${value}`,
        src,
        label: option.label || value,
        filterType,
        filterValue: value,
        count:
          tags && filters
            ? getFilterIconMatchCount(tags, filters, filterType, value)
            : null,
      });
    });
  };

  appendIcons(kindFilter, kindOptions, "kind");
  appendIcons(sourceFilter, sourceOptions, "source");
  appendIcons(platformFilter, platformOptions, "platform");

  return icons;
};

export const tagMatchesFilters = (
  tag,
  { search, kindFilter, sourceFilter, platformFilter },
) => {
  const kinds = normalizeFilterList(kindFilter);
  const sources = normalizeFilterList(sourceFilter);
  const platforms = normalizeFilterList(platformFilter);

  if (kinds.length && !kinds.includes(tag.kind)) return false;
  if (sources.length && !sources.includes(tag.source)) return false;

  if (platforms.length) {
    const tagPlatforms = Array.isArray(tag.platforms) ? tag.platforms : [];
    if (!platforms.some((platform) => tagPlatforms.includes(platform))) {
      return false;
    }
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

export const hasActiveCuisineTagFilters = ({
  search,
  kindFilter,
  sourceFilter,
  platformFilter,
}) =>
  Boolean(search?.trim()) ||
  normalizeFilterList(kindFilter).length > 0 ||
  normalizeFilterList(sourceFilter).length > 0 ||
  normalizeFilterList(platformFilter).length > 0;

import { useEffect, useMemo, useState, useCallback } from "react";
import {
  buildSavedCuisineTypes,
  filterCuisineTags,
  filterCuisineTagsByPlatforms,
  findCuisineTagByValue,
  getCatalogTagsForValues,
  groupCuisineTagsByTypeOrdered,
  splitCompetitorCuisineForEditor,
} from "../../02_competitors_helpers/competitors_cuisineTags_helpers.js";
import { cuisineTypes_text_helpers } from "../../02_competitors_helpers/_competitors_helpers.index.js";

export const useCompetitors_sessions_cuisineTypes = ({
  states,
  handlers,
  t,
}) => {
  const competitor = states?.selectedCompetitor || null;
  const isEditing = !!states?.isEditing;

  // states
  const [draftKnownValues, setDraftKnownValues] = useState([]);
  const [legacyRows, setLegacyRows] = useState([]);
  const [detailSelection, setDetailSelection] = useState(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [platformFilterSet, setPlatformFilterSet] = useState(() => new Set());
  const [confirmSaveOpen, setConfirmSaveOpen] = useState(false);

  // useEffects
  useEffect(() => {
    if (!competitor) {
      setDraftKnownValues([]);
      setLegacyRows([]);
      setDetailSelection(null);
      return;
    }
    const { knownValues, legacyRows: leg } = splitCompetitorCuisineForEditor(
      competitor.cuisineTypes,
    );
    setDraftKnownValues(knownValues);
    setLegacyRows(leg);
    setDetailSelection(null);
  }, [competitor?._id, isEditing]);

  useEffect(() => {
    if (!isEditing) {
      setSearch("");
      setTypeFilter("all");
      setPlatformFilterSet(new Set());
      setConfirmSaveOpen(false);
    }
  }, [isEditing]);

  const editSections = useMemo(() => {
    let groups = groupCuisineTagsByTypeOrdered();
    if (typeFilter !== "all") {
      groups = groups.filter((g) => g.type === typeFilter);
    }
    return groups
      .map(({ type, tags }) => {
        const afterSearch = filterCuisineTags(tags, search);
        const afterPlat = filterCuisineTagsByPlatforms(
          afterSearch,
          platformFilterSet,
        );
        return { type, tags: afterPlat };
      })
      .filter((s) => s.tags.length > 0);
  }, [typeFilter, search, platformFilterSet]);

  const selectedMetas = useMemo(
    () => getCatalogTagsForValues(draftKnownValues),
    [draftKnownValues],
  );

  const detailModel = useMemo(() => {
    if (!detailSelection) return null;
    if (detailSelection.kind === "catalog") {
      const meta = findCuisineTagByValue(detailSelection.value);
      return meta ? { kind: "catalog", meta } : null;
    }
    const row = legacyRows[detailSelection.index];
    if (!row) return null;
    return {
      kind: "legacy",
      meta: {
        label: row.tag,
        description: row.description || "",
        platforms: [],
      },
    };
  }, [detailSelection, legacyRows]);

  const selectedCount = draftKnownValues.length + legacyRows.length;

  const draftRemoveAria = (name) =>
    t(
      "cuisineTypes.draftRemoveAria",
      "Remove {{name}} from this competitor's selection",
      { name },
    );

  const chipAria = (name) =>
    t("cuisineTypes.toggleTag", "Toggle tag: {{name}}", { name });

  const handleCatalogChipClick = useCallback(
    (value) => {
      const isOn = draftKnownValues.includes(value);
      if (isOn) {
        setDraftKnownValues((prev) => prev.filter((v) => v !== value));
        setDetailSelection((sel) =>
          sel?.kind === "catalog" && sel.value === value ? null : sel,
        );
      } else {
        setDraftKnownValues((prev) => [...prev, value]);
        setDetailSelection({ kind: "catalog", value });
      }
    },
    [draftKnownValues],
  );

  const removeLegacy = useCallback((index) => {
    setLegacyRows((prev) => prev.filter((_, i) => i !== index));
    setDetailSelection((prev) => {
      if (!prev || prev.kind !== "legacy") return prev;
      if (prev.index === index) return null;
      if (prev.index > index) return { kind: "legacy", index: prev.index - 1 };
      return prev;
    });
  }, []);

  const togglePlatform = useCallback((id) => {
    const key = String(id).toLowerCase();
    setPlatformFilterSet((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const performSave = useCallback(() => {
    if (!competitor?._id) return;
    const cuisineTypes = buildSavedCuisineTypes({
      values: draftKnownValues,
      legacyRows,
    });
    handlers?.handleCompetitorCuisineTypesSave?.({
      competitorId: competitor._id,
      cuisineTypes,
    });
  }, [competitor, draftKnownValues, legacyRows, handlers]);

  const openConfirmSave = useCallback(() => {
    setConfirmSaveOpen(true);
  }, []);

  const closeConfirmSave = useCallback(() => {
    setConfirmSaveOpen(false);
  }, []);

  const handleConfirmSaveModal = useCallback(() => {
    performSave();
    setConfirmSaveOpen(false);
  }, [performSave]);

  const text = cuisineTypes_text_helpers(t, selectedCount);

  const Competitors_tableView_cuisineTypes_header_props = {
    states: {
      text,
      competitor,
      isEditing,
    },
  };

  const Competitors_tableView_cuisineTypes_editHeader_props = {
    states: {
      typeFilter,
      search,
      platformFilterSet,
    },
    handlers: {
      onTogglePlatform: togglePlatform,
      onTypeFilter: setTypeFilter,
      onSearchChange: setSearch,
    },
  };

  const Competitors_tableView_cuisineTypes_catalogEdit_props = {
    states: {
      sections: editSections,
      draftKnownValues: draftKnownValues,
      legacyRows: legacyRows,
      detailSelection: detailSelection,
      legacyHeading: text.legacyHeading, //!
      legacyHint: text.legacyHint, //!
    },
    handlers: {
      onCatalogChipClick: handleCatalogChipClick,
      onSelectDetailLegacy: (index) =>
        setDetailSelection({ kind: "legacy", index }),
      onRemoveLegacy: removeLegacy,
      chipAria: chipAria,
    },
  };

  const Competitors_tableView_cuisineTypes_viewSelected_props = {
    states: {
      selectedMetas: selectedMetas,
      legacyRows: legacyRows,
      detailSelection: detailSelection,
      title: text.viewSelectedTitle,
      emptyHint: text.viewSelectedEmpty,
    },
    handlers: {
      onSelectCatalog: (value) =>
        setDetailSelection({ kind: "catalog", value }),
      onSelectLegacy: (index) => setDetailSelection({ kind: "legacy", index }),
    },
  };

  const Competitors_tableView_cuisineTypes_detailPanel_props = {
    states: {
      detailHeading: text.detailHeading,
      detailEmpty: isEditing ? text.detailEmptyEdit : text.detailEmptyView,
      detailModel: detailModel,
      labelHeading: text.labelHeading,
      descriptionHeading: text.descriptionHeading,
      platformsHeading: text.platformsHeading,
      noPlatforms: text.noPlatforms,
      legacyPlatformsNote: text.legacyPlatformsNote,
    },
    handlers: {},
  };

  const Competitors_tableView_cuisineTypes_draftPanel_props = {
    states: {
      text: cuisineTypes_text_helpers(t, selectedCount),
      selectedMetas,
      legacyRows,
      selectedCount,
    },
    handlers: {
      setDetailSelection,
      removeLegacy,
      handleCatalogChipClick,
      draftRemoveAria,
    },
  };
  const Competitors_confirmModal_cuisineTypes_props = {
    states: {
      isOpen: confirmSaveOpen,
      confirmTitle: text.confirmSaveTitle,
      confirmHint: text.confirmSaveHint,
      catalogTagsLabel: text.confirmCatalogTagsLabel,
      legacyTagsLabel: text.confirmLegacyTagsLabel,
      selectionHeading: text.confirmSelectionHeading,
      catalogCount: draftKnownValues.length,
      legacyCount: legacyRows.length,
      selectedSummary: text.selectedSummary,
      isConfirmDisabled: false,
      cancelLabel: text.cancelLabel,
      confirmLabel: text.confirmLabel,
    },
    handlers: {
      onConfirm: handleConfirmSaveModal,
      onCancel: closeConfirmSave,
    },
  };

  return {
    cuisineTypesStates: {
      competitor,
      isEditing,
      text,
    },
    cuisineTypesHandlers: {
      openConfirmSave,
    },
    cuisineTypesCompProps: {
      C_T_C_draftPanel_props:
        Competitors_tableView_cuisineTypes_draftPanel_props,
      C_T_C_header_props: Competitors_tableView_cuisineTypes_header_props,
      C_T_C_editHeader_props:
        Competitors_tableView_cuisineTypes_editHeader_props,
      C_T_C_catalogEdit_props:
        Competitors_tableView_cuisineTypes_catalogEdit_props,
      C_T_C_viewSelected_props:
        Competitors_tableView_cuisineTypes_viewSelected_props,
      C_T_C_detailPanel_props:
        Competitors_tableView_cuisineTypes_detailPanel_props,
      C_T_C_modal_props: Competitors_confirmModal_cuisineTypes_props,
    },
  };
};

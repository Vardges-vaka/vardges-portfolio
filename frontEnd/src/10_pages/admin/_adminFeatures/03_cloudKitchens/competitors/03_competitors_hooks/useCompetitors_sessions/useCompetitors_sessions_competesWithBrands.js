import { useCallback, useEffect, useMemo, useState } from "react";
import {
  findCuisineTagByValue,
  getCuisineValuesFromRow,
  getEligibleCompetitorsForCompetesWithBrandsAdd,
  intersectCuisineValues,
} from "../../02_competitors_helpers/_competitors_helpers.index.js";

/** Matches admin / schema cap for `competesWithBrands` length. */
const MAX_COMPETES_WITH_BRANDS_LINKS = 5;

const cloneRows = (rows) =>
  (Array.isArray(rows) ? rows : []).map((r) => ({
    brand: String(r.brand),
    cuisineTags: [...(r.cuisineTags || [])],
    platform: r.platform != null ? String(r.platform) : "",
    observations: Array.isArray(r.observations) ? [...r.observations] : [],
  }));

export const useCompetitors_sessions_competesWithBrands = ({
  states,
  handlers,
  t,
}) => {
  const competitor = states?.selectedCompetitor || null;
  const isEditing = !!states?.isEditing;
  const allCompetitors = states?.competitors || [];

  const [draftRows, setDraftRows] = useState([]);
  /** `null` = all shared-tag matches; otherwise filter add-list by this catalog `value`. */
  const [addFilterTag, setAddFilterTag] = useState(null);
  const [confirmSaveOpen, setConfirmSaveOpen] = useState(false);

  useEffect(() => {
    if (!competitor) {
      setDraftRows([]);
      return;
    }
    setDraftRows(cloneRows(competitor.competesWithBrands));
  }, [competitor?._id, competitor?.competesWithBrands, isEditing]);

  useEffect(() => {
    if (!isEditing) {
      setAddFilterTag(null);
      setConfirmSaveOpen(false);
    }
  }, [isEditing]);

  useEffect(() => {
    setAddFilterTag(null);
  }, [competitor?._id]);

  const text = useMemo(
    () => ({
      title: t
        ? t("competesWithBrandsSession.title", "Competes with competitors")
        : "Competes with competitors",
      subtitle: t
        ? t(
            "competesWithBrandsSession.subtitle",
            "Track other competitors you overlap with — filtered by shared cuisine tags.",
          )
        : "Track other competitors you overlap with — filtered by shared cuisine tags.",
      noSelection: t
        ? t(
            "competesWithBrandsSession.noSelection",
            "Select a competitor from the table to manage this list.",
          )
        : "Select a competitor from the table to manage this list.",
      empty: t
        ? t(
            "competesWithBrandsSession.empty",
            "No linked competitors yet. Edit to add from the filtered list.",
          )
        : "No linked competitors yet. Edit to add from the filtered list.",
      emptyEligible: t
        ? t(
            "competesWithBrandsSession.emptyEligible",
            "No other competitors share a cuisine tag with this one — adjust cuisine tags first.",
          )
        : "No other competitors share a cuisine tag with this one — adjust cuisine tags first.",
      addSectionTitle: t
        ? t(
            "competesWithBrandsSession.addSectionTitle",
            "Add from shared cuisine tags",
          )
        : "Add from shared cuisine tags",
      addFilterHeading: t
        ? t(
            "competesWithBrandsSession.addFilterHeading",
            "Filter competitors by your tag",
          )
        : "Filter competitors by your tag",
      filterAllTags: t
        ? t("competesWithBrandsSession.filterAllTags", "All tags")
        : "All tags",
      filterEmpty: t
        ? t(
            "competesWithBrandsSession.filterEmpty",
            "No competitors left for this tag — pick another tag or All tags.",
          )
        : "No competitors left for this tag — pick another tag or All tags.",
      overlapLabel: t
        ? t("competesWithBrandsSession.overlapLabel", "Shared tags")
        : "Shared tags",
      platformLabel: t
        ? t("competesWithBrandsSession.platformLabel", "Platform")
        : "Platform",
      observationsCount: (n) =>
        t
          ? t(
              "competesWithBrandsSession.observationsCount",
              "{{count}} notes",
              {
                count: n,
              },
            )
          : `${n} notes`,
      removeAria: (name) =>
        t
          ? t(
              "competesWithBrandsSession.removeAria",
              "Remove {{name}} from list",
              {
                name,
              },
            )
          : `Remove ${name} from list`,
      cardAria: (name, tags) =>
        t
          ? t(
              "competesWithBrandsSession.cardAria",
              "Competitor {{name}}, shared tags: {{tags}}",
              { name, tags },
            )
          : `Competitor ${name}, shared tags: ${tags}`,
      updateLabel: t ? t("actions.edit", "Edit") : "Edit",
      editLabel: t ? t("actions.edit", "Edit") : "Edit",
      cancelLabel: t ? t("actions.cancel", "Cancel") : "Cancel",
      confirmLabel: t ? t("actions.confirm", "Confirm") : "Confirm",
      maxLinksHint: t
        ? t(
            "competesWithBrandsSession.maxLinksHint",
            "You can link up to five competitors. Remove one to add another.",
          )
        : "You can link up to five competitors. Remove one to add another.",
      confirmSaveTitle: t
        ? t(
            "competesWithBrandsSession.confirmSaveTitle",
            "Save competing brands?",
          )
        : "Save competing brands?",
      confirmSaveHint: t
        ? t(
            "competesWithBrandsSession.confirmSaveHint",
            "This updates which competitors are linked as overlaps for this row.",
          )
        : "This updates which competitors are linked as overlaps for this row.",
      confirmLinksHeading: t
        ? t(
            "competesWithBrandsSession.confirmLinksHeading",
            "Linked competitors",
          )
        : "Linked competitors",
      confirmCountLabel: t
        ? t("competesWithBrandsSession.confirmCountLabel", "Count")
        : "Count",
      confirmNoneLinked: t
        ? t("competesWithBrandsSession.confirmNoneLinked", "(none)")
        : "(none)",
    }),
    [t],
  );

  const hostTagChips = useMemo(() => {
    if (!competitor) return [];
    const values = getCuisineValuesFromRow(competitor);
    const seen = new Set();
    const out = [];
    for (const value of values) {
      if (!value || seen.has(value)) continue;
      seen.add(value);
      const label = findCuisineTagByValue(value)?.label || value;
      out.push({ value, label });
    }
    return out;
  }, [competitor]);

  const linkedIds = useMemo(
    () => new Set(draftRows.map((r) => String(r.brand))),
    [draftRows],
  );

  const eligibleAdd = useMemo(() => {
    if (!competitor) return [];
    return getEligibleCompetitorsForCompetesWithBrandsAdd(
      competitor,
      allCompetitors,
      linkedIds,
    );
  }, [competitor, allCompetitors, linkedIds]);

  const filteredEligibleAdd = useMemo(() => {
    if (addFilterTag == null) return eligibleAdd;
    return eligibleAdd.filter(({ cuisineTags }) =>
      cuisineTags.includes(addFilterTag),
    );
  }, [eligibleAdd, addFilterTag]);

  const resolvedCards = useMemo(() => {
    if (!competitor) return [];
    return draftRows.map((row) => {
      const other =
        allCompetitors.find((c) => String(c?._id) === String(row.brand)) ||
        null;
      return { row, other };
    });
  }, [draftRows, allCompetitors, competitor]);

  const linkedNamesSummary = useMemo(() => {
    if (draftRows.length === 0) {
      return text.confirmNoneLinked;
    }
    return draftRows
      .map((r) => {
        const o = allCompetitors.find(
          (c) => String(c?._id) === String(r.brand),
        );
        return o?.name || String(r.brand);
      })
      .join(", ");
  }, [draftRows, allCompetitors, text.confirmNoneLinked]);

  const performSave = useCallback(() => {
    if (!competitor?._id) return;
    handlers?.handleCompetitorCompetesWithBrandsSave?.({
      competitorId: competitor._id,
      competesWithBrands: cloneRows(draftRows),
    });
  }, [competitor, draftRows, handlers]);

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

  const addCompetitor = useCallback(
    (brandId) => {
      if (!competitor) return;
      const y = allCompetitors.find((c) => String(c?._id) === String(brandId));
      if (!y) return;
      const cuisineTags = intersectCuisineValues(competitor, y);
      if (cuisineTags.length === 0) return;
      setDraftRows((prev) => {
        if (prev.length >= MAX_COMPETES_WITH_BRANDS_LINKS) return prev;
        if (prev.some((r) => String(r.brand) === String(brandId))) return prev;
        return [
          ...prev,
          {
            brand: String(brandId),
            cuisineTags: [...cuisineTags].sort(),
            platform: "talabat",
            observations: [],
          },
        ];
      });
    },
    [competitor, allCompetitors],
  );

  const removeCompetitor = useCallback((brandId) => {
    setDraftRows((prev) =>
      prev.filter((r) => String(r.brand) !== String(brandId)),
    );
  }, []);

  const Competitors_confirmModal_competesWithBrands_props = useMemo(
    () => ({
      states: {
        isOpen: confirmSaveOpen,
        confirmTitle: text.confirmSaveTitle,
        confirmHint: text.confirmSaveHint,
        linksHeading: text.confirmLinksHeading,
        linkedCount: draftRows.length,
        linkedNames: linkedNamesSummary,
        countLabel: text.confirmCountLabel,
        cancelLabel: text.cancelLabel,
        confirmLabel: text.confirmLabel,
        isConfirmDisabled: false,
      },
      handlers: {
        onConfirm: handleConfirmSaveModal,
        onCancel: closeConfirmSave,
      },
    }),
    [
      confirmSaveOpen,
      text,
      draftRows.length,
      linkedNamesSummary,
      handleConfirmSaveModal,
      closeConfirmSave,
    ],
  );

  const C_T_CWB_header_props = useMemo(
    () => ({
      states: {
        text,
        competitor,
        isEditing,
      },
      handlers: {
        handleToggleEditingMode: handlers?.handleToggleEditingMode,
        handleStopEditing: handlers?.handleStopEditing,
        openConfirmSave,
      },
    }),
    [text, competitor, isEditing, handlers, openConfirmSave],
  );

  const C_T_CWB_empty_props = useMemo(
    () => ({
      states: { message: text.empty },
      handlers: {},
    }),
    [text.empty],
  );

  const C_T_CWB_addSection_props = useMemo(
    () => ({
      states: {
        text,
        draftRows,
        maxLinks: MAX_COMPETES_WITH_BRANDS_LINKS,
        eligibleAdd,
        filteredEligibleAdd,
        hostTagChips,
        addFilterTag,
      },
      handlers: {
        addCompetitor,
        setAddFilterTag,
      },
    }),
    [
      text,
      draftRows,
      eligibleAdd,
      filteredEligibleAdd,
      hostTagChips,
      addFilterTag,
      addCompetitor,
      setAddFilterTag,
    ],
  );

  const C_T_CWB_card_handlers = useMemo(
    () => ({
      onRemove: removeCompetitor,
    }),
    [removeCompetitor],
  );

  return {
    competesWithBrandsStates: {
      competitor,
      isEditing,
      text,
      draftRows,
      maxLinks: MAX_COMPETES_WITH_BRANDS_LINKS,
      resolvedCards,
      eligibleAdd,
      filteredEligibleAdd,
      hostTagChips,
      addFilterTag,
    },
    competesWithBrandsHandlers: {
      addCompetitor,
      removeCompetitor,
      openConfirmSave,
      setAddFilterTag,
    },
    competesWithBrandsCompProps: {
      confirmModal_props: Competitors_confirmModal_competesWithBrands_props,
      C_T_CWB_header_props,
      C_T_CWB_empty_props,
      C_T_CWB_addSection_props,
      C_T_CWB_card_handlers,
    },
  };
};

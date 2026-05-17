import { useCallback } from "react";
import {
  parseMarkerKey,
  getLocationFromDraft,
  branchAddressLine,
  normalizeBranchLocation,
  branchHasValidCoordinates,
} from "../../../02_competitors_helpers/competitors_branches_helpers.js";
import { toNum } from "../../../02_competitors_helpers/_competitors_helpers.index.js";

const BOOL_FIELDS = new Set(["hasDineIn", "hasOwnDelivery"]);

export const useC_T_branches_handlers = ({
  C_T_br_states,
  C_T_br_setters,
  selectedCompetitor,
  parentHandlers,
}) => {
  const {
    draftLocations,
    editingBranchKey,
    coverageEditMode,
    removeMarkerKey,
    competitorId,
  } = C_T_br_states;

  const {
    setDraftLocations,
    setActiveMarkerKey,
    setEditingBranchKey,
    setEditStep,
    setCoverageEditMode,
    setConfirmRemoveOpen,
    setRemoveMarkerKey,
  } = C_T_br_setters;

  const persistBranches = useCallback(
    (nextLocations) => {
      if (!competitorId) return;
      parentHandlers?.handleCompetitorBranchesSave?.({
        competitorId,
        locations: nextLocations,
      });
    },
    [competitorId, parentHandlers],
  );

  const startEditBranch = useCallback(
    (markerKey) => {
      const key = String(markerKey || "");
      if (!key) return;
      setActiveMarkerKey(key);
      setEditingBranchKey(key);
      setEditStep("map");
      setCoverageEditMode(null);
    },
    [setActiveMarkerKey, setEditingBranchKey, setEditStep, setCoverageEditMode],
  );

  const cancelEditBranch = useCallback(() => {
    const locs = Array.isArray(selectedCompetitor?.branches?.locations)
      ? selectedCompetitor.branches.locations
      : [];
    setDraftLocations(locs.map((l) => JSON.parse(JSON.stringify(l))));
    setEditingBranchKey(null);
    setEditStep(null);
    setCoverageEditMode(null);
  }, [
    selectedCompetitor,
    setDraftLocations,
    setEditingBranchKey,
    setEditStep,
    setCoverageEditMode,
  ]);

  const confirmMapStep = useCallback(() => {
    const loc = getLocationFromDraft(draftLocations, editingBranchKey);
    if (!branchHasValidCoordinates(loc)) return false;
    setCoverageEditMode(null);
    setEditStep("details");
    return true;
  }, [
    draftLocations,
    editingBranchKey,
    setCoverageEditMode,
    setEditStep,
  ]);

  const backToMapStep = useCallback(() => {
    setEditStep("map");
    setCoverageEditMode(null);
  }, [setEditStep, setCoverageEditMode]);

  const updateDraftField = useCallback(
    (markerKey, field, value) => {
      const parsed = parseMarkerKey(markerKey);
      if (!parsed || String(parsed.competitorId) !== String(competitorId)) return;
      setDraftLocations((prev) => {
        const next = [...prev];
        const loc = next[parsed.idx];
        if (!loc) return prev;
        const v = BOOL_FIELDS.has(field)
          ? value === true || value === "true"
          : value;
        next[parsed.idx] = { ...loc, [field]: v };
        return next;
      });
    },
    [competitorId, setDraftLocations],
  );

  const updateDraftCoords = useCallback(
    (markerKey, lat, lng) => {
      const parsed = parseMarkerKey(markerKey);
      if (!parsed || String(parsed.competitorId) !== String(competitorId)) return;
      const latN = toNum(lat);
      const lngN = toNum(lng);
      if (latN == null || lngN == null) return;
      setDraftLocations((prev) => {
        const next = [...prev];
        const loc = next[parsed.idx];
        if (!loc) return prev;
        const prevBd = loc.coverageAreas?.byDistance || {};
        next[parsed.idx] = {
          ...loc,
          coordinates: { lat: latN, lng: lngN },
          coverageAreas: {
            ...(loc.coverageAreas || {}),
            byDistance: {
              ...prevBd,
              radius: {
                ...(prevBd.radius || {}),
                center: { lat: latN, lng: lngN },
              },
            },
          },
        };
        return next;
      });
    },
    [competitorId, setDraftLocations],
  );

  const applyCoverageToDraft = useCallback(
    (markerKey, { polygon, radiusKm, center }) => {
      const parsed = parseMarkerKey(markerKey);
      if (!parsed) return;
      setDraftLocations((prev) => {
        const next = [...prev];
        const loc = next[parsed.idx];
        if (!loc) return prev;
        const prevBd = loc.coverageAreas?.byDistance || {};
        const lat =
          toNum(center?.lat ?? loc?.coordinates?.lat) ??
          toNum(prevBd.radius?.center?.lat);
        const lng =
          toNum(center?.lng ?? loc?.coordinates?.lng) ??
          toNum(prevBd.radius?.center?.lng);
        const nextBd = {
          ...prevBd,
          radius: {
            ...(prevBd.radius || {}),
            km:
              radiusKm != null && radiusKm !== undefined
                ? radiusKm
                : prevBd.radius?.km ?? null,
            center:
              lat != null && lng != null
                ? { lat, lng }
                : prevBd.radius?.center,
          },
        };
        if (Array.isArray(polygon)) {
          nextBd.polygon = polygon;
        }
        next[parsed.idx] = {
          ...loc,
          coverageAreas: {
            ...(loc.coverageAreas || {}),
            byDistance: nextBd,
          },
        };
        return next;
      });
    },
    [setDraftLocations],
  );

  const updateDraftArrayField = useCallback(
    (markerKey, field, arrayValue) => {
      const parsed = parseMarkerKey(markerKey);
      if (!parsed || String(parsed.competitorId) !== String(competitorId)) return;
      setDraftLocations((prev) => {
        const next = [...prev];
        const loc = next[parsed.idx];
        if (!loc) return prev;
        next[parsed.idx] = {
          ...loc,
          [field]: Array.isArray(arrayValue) ? arrayValue : [],
        };
        return next;
      });
    },
    [competitorId, setDraftLocations],
  );

  const applyBranchFormDraft = useCallback(
    (markerKey, formData) => {
      const parsed = parseMarkerKey(markerKey);
      if (!parsed || String(parsed.competitorId) !== String(competitorId)) return;
      setDraftLocations((prev) => {
        const next = [...prev];
        const existing = next[parsed.idx];
        if (!existing) return prev;
        next[parsed.idx] = normalizeBranchLocation({
          ...existing,
          ...formData,
          coordinates: formData?.coordinates ?? existing.coordinates,
          coverageAreas: formData?.coverageAreas ?? existing.coverageAreas,
        });
        return next;
      });
    },
    [competitorId, setDraftLocations],
  );

  const saveEditBranch = useCallback(() => {
    if (!editingBranchKey) return;
    const parsed = parseMarkerKey(editingBranchKey);
    if (!parsed) return;
    setDraftLocations((prev) => {
      const next = prev.map((loc, i) =>
        i === parsed.idx ? normalizeBranchLocation(loc) : loc,
      );
      persistBranches(next);
      return next;
    });
    setEditingBranchKey(null);
    setEditStep(null);
    setCoverageEditMode(null);
  }, [
    editingBranchKey,
    persistBranches,
    setDraftLocations,
    setEditingBranchKey,
    setEditStep,
    setCoverageEditMode,
  ]);

  const openRemoveBranch = useCallback(
    (markerKey) => {
      setRemoveMarkerKey(String(markerKey || ""));
      setConfirmRemoveOpen(true);
    },
    [setRemoveMarkerKey, setConfirmRemoveOpen],
  );

  const cancelRemoveBranch = useCallback(() => {
    setConfirmRemoveOpen(false);
    setRemoveMarkerKey(null);
  }, [setConfirmRemoveOpen, setRemoveMarkerKey]);

  const confirmRemoveBranch = useCallback(() => {
    const parsed = parseMarkerKey(removeMarkerKey);
    if (!parsed || String(parsed.competitorId) !== String(competitorId)) {
      cancelRemoveBranch();
      return;
    }
    const next = draftLocations.filter((_, i) => i !== parsed.idx);
    setDraftLocations(next);
    persistBranches(next);
    setActiveMarkerKey(null);
    setEditingBranchKey(null);
    setEditStep(null);
    setCoverageEditMode(null);
    cancelRemoveBranch();
  }, [
    removeMarkerKey,
    competitorId,
    draftLocations,
    persistBranches,
    setDraftLocations,
    setActiveMarkerKey,
    setEditingBranchKey,
    setEditStep,
    setCoverageEditMode,
    cancelRemoveBranch,
  ]);

  const startCoverageEdit = useCallback(
    (mode) => {
      if (!editingBranchKey) return;
      setCoverageEditMode(mode === "radius" ? "radius" : "polygon");
    },
    [editingBranchKey, setCoverageEditMode],
  );

  const cancelCoverageEdit = useCallback(() => {
    setCoverageEditMode(null);
  }, [setCoverageEditMode]);

  /** Remove polygon and/or radius from draft (empty polygon[], radius.km null). */
  const clearBranchCoverage = useCallback(
    (type) => {
      if (!editingBranchKey) return;
      const parsed = parseMarkerKey(editingBranchKey);
      if (!parsed || String(parsed.competitorId) !== String(competitorId)) return;

      const clearPolygon = type === "polygon" || type === "all";
      const clearRadius = type === "radius" || type === "all";
      if (!clearPolygon && !clearRadius) return;

      setDraftLocations((prev) => {
        const next = [...prev];
        const loc = next[parsed.idx];
        if (!loc) return prev;
        const prevBd = loc.coverageAreas?.byDistance || {};
        const lat = toNum(loc?.coordinates?.lat);
        const lng = toNum(loc?.coordinates?.lng);
        const nextBd = { ...prevBd };

        if (clearPolygon) {
          nextBd.polygon = [];
        }
        if (clearRadius) {
          nextBd.radius = {
            ...(prevBd.radius || {}),
            km: null,
            center:
              lat != null && lng != null
                ? { lat, lng }
                : prevBd.radius?.center,
          };
        }

        next[parsed.idx] = {
          ...loc,
          coverageAreas: {
            ...(loc.coverageAreas || {}),
            byDistance: nextBd,
          },
        };
        return next;
      });

      if (
        (clearPolygon && coverageEditMode === "polygon") ||
        (clearRadius && coverageEditMode === "radius")
      ) {
        setCoverageEditMode(null);
      }
    },
    [
      editingBranchKey,
      competitorId,
      coverageEditMode,
      setDraftLocations,
      setCoverageEditMode,
    ],
  );

  return {
    C_T_br_handlers: {
      startEditBranch,
      cancelEditBranch,
      confirmMapStep,
      backToMapStep,
      saveEditBranch,
      updateDraftField,
      updateDraftCoords,
      applyCoverageToDraft,
      applyBranchFormDraft,
      updateDraftArrayField,
      openRemoveBranch,
      cancelRemoveBranch,
      confirmRemoveBranch,
      startCoverageEdit,
      cancelCoverageEdit,
      clearBranchCoverage,
      setActiveMarkerKey,
    },
  };
};

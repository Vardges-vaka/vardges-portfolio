import { useMemo } from "react";
import { googleMaps_apiKey } from "../../../../branches/branches.config.js";
import { useC_T_branches_map } from "./useC_T_branches_map.js";
import {
  useC_T_branches_states,
  useC_T_branches_handlers,
  useC_T_branches_apiHelpers,
} from "./_C_T_branches_hooks.index.js";
import {
  buildDraftCompetitor,
  getLocationFromDraft,
  branchAddressLine,
} from "../../../02_competitors_helpers/_competitors_helpers.index.js";

export const useC_T_branches = ({ states, handlers, t }) => {
  const selectedCompetitor = states?.selectedCompetitor ?? null;

  const { C_T_br_states, C_T_br_setters } =
    useC_T_branches_states(selectedCompetitor);
  const { C_T_br_apiHelpers } = useC_T_branches_apiHelpers();
  const { C_T_br_handlers } = useC_T_branches_handlers({
    C_T_br_states,
    C_T_br_setters,
    selectedCompetitor,
    parentHandlers: handlers,
    t,
  });

  const {
    draftLocations,
    activeMarkerKey,
    editingBranchKey,
    editStep,
    coverageEditMode,
    confirmRemoveOpen,
    removeMarkerKey,
    competitorId,
  } = C_T_br_states;

  const branchesCount = useMemo(
    () => draftLocations.length,
    [draftLocations],
  );

  const displayCompetitor = useMemo(
    () => buildDraftCompetitor(selectedCompetitor, draftLocations),
    [selectedCompetitor, draftLocations],
  );

  const { mapStates, mapHandlers } = useC_T_branches_map({
    competitor: selectedCompetitor,
    draftLocations,
    googleMaps_apiKey,
    activeMarkerKey,
    setActiveMarkerKey: C_T_br_setters.setActiveMarkerKey,
    editingBranchKey,
    editStep,
    coverageEditMode,
    setCoverageEditMode: C_T_br_setters.setCoverageEditMode,
  });

  const text = useMemo(
    () => ({
      title: t("branchesTableSession.title", { defaultValue: "Branches" }),
      subtitle: t("branchesTableSession.subtitle", {
        defaultValue:
          "Every saved branch appears as a pin. Coverage overlays use the same rules as the main competitors map (Dubai only).",
      }),
      noSelection: t("branchesTableSession.noSelection", {
        defaultValue: "Select a competitor from the table to see branches.",
      }),
      hint: t("branchesTableSession.hint", {
        defaultValue:
          "Tap a pin to edit or remove it. Use Polygon (all) / Radius (all) for Dubai coverage overlays.",
      }),
      pinDetailsTitle: t("branchesTableSession.pinDetailsTitle", {
        defaultValue: "Branch details",
      }),
      selectPinHint: t("branchesTableSession.selectPinHint", {
        defaultValue:
          "Select a branch pin on the map to see coordinates, coverage, and competitor context here.",
      }),
      clearSelectionTitle: t("branchesTableSession.clearSelectionTitle", {
        defaultValue: "Clear pin selection",
      }),
      coverageDubaiOnlyNote: t("branchesTableSession.coverageDubaiOnlyNote", {
        defaultValue:
          "Polygon and radius overlays are only available for Dubai locations in this tool.",
      }),
      polygonVerticesLabel: t("branchesTableSession.polygonVerticesLabel", {
        defaultValue: "Polygon points",
      }),
      dineInLabel: t("branchesTableSession.dineInLabel", {
        defaultValue: "Dine-in",
      }),
      branchNotesLabel: t("branchesTableSession.branchNotesLabel", {
        defaultValue: "Branch notes",
      }),
      pinNotFound: t("branchesTableSession.pinNotFound", {
        defaultValue: "Could not resolve this pin.",
      }),
      branchesCountLabel:
        typeof branchesCount === "number" && branchesCount >= 0
          ? t("branchesTableSession.branchesCount", {
              count: branchesCount,
              defaultValue: `${branchesCount} branches`,
            })
          : "—",
      dineInYes: t("branchesTableSession.dineInYes", { defaultValue: "Dine-in" }),
      dineInNo: t("branchesTableSession.dineInNo", { defaultValue: "No dine-in" }),
      updateLabel: t("tableheaders.actions.edit", { defaultValue: "Update" }),
      editLabel: t("actions.edit", { defaultValue: "Edit" }),
      cancelLabel: t("actions.cancel", { defaultValue: "Cancel" }),
      confirmLabel: t("actions.save", { defaultValue: "Save" }),
      editModeTitle: t("branchesTableSession.editModeTitle", {
        defaultValue: "Editing branch",
      }),
      dragPinHint: t("branchesTableSession.dragPinHint", {
        defaultValue: "Drag the pin on the map to update coordinates.",
      }),
      addCoverageLabel: t("branchesTableSession.addCoverageLabel", {
        defaultValue: "Add coverage",
      }),
      coveragePolygonBtn: t("branchesTableSession.coveragePolygonBtn", {
        defaultValue: "Draw polygon",
      }),
      coverageRadiusBtn: t("branchesTableSession.coverageRadiusBtn", {
        defaultValue: "Draw radius",
      }),
      coverageCancelBtn: t("branchesTableSession.coverageCancelBtn", {
        defaultValue: "Cancel coverage edit",
      }),
      coverageClearPolygonBtn: t("branchesTableSession.coverageClearPolygonBtn", {
        defaultValue: "Clear polygon",
      }),
      coverageClearRadiusBtn: t("branchesTableSession.coverageClearRadiusBtn", {
        defaultValue: "Clear radius",
      }),
      coverageHidePolygonBtn: t("branchesTableSession.coverageHidePolygonBtn", {
        defaultValue: "Hide polygon",
      }),
      coverageHideRadiusBtn: t("branchesTableSession.coverageHideRadiusBtn", {
        defaultValue: "Hide radius",
      }),
      coverageHideAllBtn: t("branchesTableSession.coverageHideAllBtn", {
        defaultValue: "Hide all coverage",
      }),
      emirateLabel: t("branchesTableSession.emirateLabel", {
        defaultValue: "Emirate",
      }),
      cityLabel: t("branchesTableSession.cityLabel", { defaultValue: "City" }),
      addressLabel: t("branchesTableSession.addressLabel", {
        defaultValue: "Address",
      }),
      latLabel: t("branchesTableSession.latLabel", { defaultValue: "Latitude" }),
      lngLabel: t("branchesTableSession.lngLabel", { defaultValue: "Longitude" }),
      notesLabel: t("branchesTableSession.notesLabel", { defaultValue: "Notes" }),
      saveBranchLabel: t("branchesTableSession.saveBranchLabel", {
        defaultValue: "Save branch",
      }),
      cancelEditLabel: t("branchesTableSession.cancelEditLabel", {
        defaultValue: "Cancel edit",
      }),
      confirmRemoveTitle: t("branchesTableSession.confirmRemoveTitle", {
        defaultValue: "Remove this branch?",
      }),
      confirmRemoveHint: t("branchesTableSession.confirmRemoveHint", {
        defaultValue:
          "This removes the branch from the competitor. You can add it again later from the full editor.",
      }),
      confirmRemoveButton: t("branchesTableSession.confirmRemoveButton", {
        defaultValue: "Remove branch",
      }),
      confirmRemoveBranchLabel: t("branchesTableSession.confirmRemoveBranchLabel", {
        defaultValue: "Branch",
      }),
      mapStepBadge: t("branchesTableSession.mapStepBadge", {
        defaultValue: "Step 1 — Map",
      }),
      mapStepTitle: t("branchesTableSession.mapStepTitle", {
        defaultValue: "Place branch on map",
      }),
      mapStepSubtitle: t("branchesTableSession.mapStepSubtitle", {
        defaultValue: "Drag the pin and draw coverage, then continue to branch details.",
      }),
      detailsStepTitle: t("branchesTableSession.detailsStepTitle", {
        defaultValue: "Branch details",
      }),
      detailsStepSubtitle: t("branchesTableSession.detailsStepSubtitle", {
        defaultValue: "Map is locked. Complete address, delivery flags, platforms, and promos.",
      }),
      mapStepInstructions: t("branchesTableSession.mapStepInstructions", {
        defaultValue:
          "Use Draw polygon / Draw radius in the header (Dubai only), then drag the pin to the exact location.",
      }),
      mapStepCoverageNote: t("branchesTableSession.mapStepCoverageNote", {
        defaultValue:
          "Coverage tools are in the header. You can skip coverage for non-Dubai branches.",
      }),
      continueToDetailsLabel: t("branchesTableSession.continueToDetailsLabel", {
        defaultValue: "Continue to branch details →",
      }),
      detailsStepBanner: t("branchesTableSession.detailsStepBanner", {
        defaultValue:
          "Step 2 — Pin and coverage are locked. Fill in the fields below, then save.",
      }),
      coverageLockedLabel: t("branchesTableSession.coverageLockedLabel", {
        defaultValue: "Map & coverage (locked)",
      }),
      coverageLockedHint: t("branchesTableSession.coverageLockedHint", {
        defaultValue: "Coordinates and coverage were set in step 1.",
      }),
      coordsLabel: t("branchesTableSession.coordsLabel", { defaultValue: "Coordinates" }),
      radiusKmLabel: t("branchesTableSession.radiusKmLabel", { defaultValue: "Radius" }),
      countryLabel: t("branchesTableSession.countryLabel", { defaultValue: "Country" }),
      stateLabel: t("branchesTableSession.stateLabel", { defaultValue: "State" }),
      hasOwnDeliveryLabel: t("branchesTableSession.hasOwnDeliveryLabel", {
        defaultValue: "Own delivery (branch)",
      }),
      hasOwnDeliveryYes: t("branchesTableSession.hasOwnDeliveryYes", { defaultValue: "Yes" }),
      hasOwnDeliveryNo: t("branchesTableSession.hasOwnDeliveryNo", { defaultValue: "No" }),
      backToMapLabel: t("branchesTableSession.backToMapLabel", {
        defaultValue: "← Back to map",
      }),
      platformsSectionTitle: t("branchesTableSession.platformsSectionTitle", {
        defaultValue: "Delivery platforms",
      }),
      addPlatformBtn: t("branchesTableSession.addPlatformBtn", { defaultValue: "+ Platform" }),
      platformsEmpty: t("branchesTableSession.platformsEmpty", {
        defaultValue: "No platforms added for this branch.",
      }),
      platformActiveLabel: t("branchesTableSession.platformActiveLabel", {
        defaultValue: "Active",
      }),
      deliveryFeeLabel: t("branchesTableSession.deliveryFeeLabel", {
        defaultValue: "Fee (AED)",
      }),
      promosSectionTitle: t("branchesTableSession.promosSectionTitle", {
        defaultValue: "Promotions",
      }),
      addPromoBtn: t("branchesTableSession.addPromoBtn", { defaultValue: "+ Promo" }),
      promosEmpty: t("branchesTableSession.promosEmpty", {
        defaultValue: "No promos recorded for this branch.",
      }),
      promoNameLabel: t("branchesTableSession.promoNameLabel", { defaultValue: "Promo name" }),
    }),
    [t, branchesCount],
  );

  const removeBranchLine = useMemo(() => {
    const loc = getLocationFromDraft(draftLocations, removeMarkerKey);
    return loc ? branchAddressLine(loc) : "—";
  }, [draftLocations, removeMarkerKey]);

  const mergedMapHandlers = useMemo(
    () => ({
      onMapLoad: mapHandlers.onMapLoad,
      handleMarkerClick: (markerKey) => {
        C_T_br_setters.setActiveMarkerKey(markerKey);
      },
      setActiveMarkerKey: C_T_br_setters.setActiveMarkerKey,
      startEditBranch: C_T_br_handlers.startEditBranch,
      openRemoveBranch: C_T_br_handlers.openRemoveBranch,
      updateDraftCoords: C_T_br_handlers.updateDraftCoords,
      applyCoverageToDraft: C_T_br_handlers.applyCoverageToDraft,
      handleToggleAllPolygon: mapHandlers.handleToggleAllPolygon,
      handleToggleAllRadius: mapHandlers.handleToggleAllRadius,
    }),
    [mapHandlers, C_T_br_handlers, C_T_br_setters],
  );

  const C_T_Br_info_handlers = useMemo(
    () => ({
      onClearBranchSelection: () => C_T_br_setters.setActiveMarkerKey(null),
      updateDraftField: C_T_br_handlers.updateDraftField,
      applyBranchFormDraft: C_T_br_handlers.applyBranchFormDraft,
      updateDraftArrayField: C_T_br_handlers.updateDraftArrayField,
      saveEditBranch: C_T_br_handlers.saveEditBranch,
      cancelEditBranch: C_T_br_handlers.cancelEditBranch,
      confirmMapStep: C_T_br_handlers.confirmMapStep,
      backToMapStep: C_T_br_handlers.backToMapStep,
    }),
    [C_T_br_handlers, C_T_br_setters.setActiveMarkerKey],
  );

  const Competitors_confirmModal_branches_props = useMemo(
    () => ({
      states: {
        isOpen: confirmRemoveOpen,
        confirmTitle: text.confirmRemoveTitle,
        confirmHint: text.confirmRemoveHint,
        branchLine: removeBranchLine,
        branchLabel: text.confirmRemoveBranchLabel,
        cancelLabel: text.cancelLabel,
        confirmLabel: text.confirmRemoveButton,
        isConfirmDisabled: false,
      },
      handlers: {
        onConfirm: C_T_br_handlers.confirmRemoveBranch,
        onCancel: C_T_br_handlers.cancelRemoveBranch,
      },
    }),
    [confirmRemoveOpen, text, removeBranchLine, C_T_br_handlers],
  );

  return {
    C_T_Br_states: { ...C_T_br_states, selectedCompetitor },
    C_T_Br_handlers: C_T_br_handlers,
    C_T_Br_apiHelpers: C_T_br_apiHelpers,
    confirmModal_props: Competitors_confirmModal_branches_props,
    C_T_Br_compProps: {
      C_T_Br_header_props: {
        states: {
          text,
          competitor: displayCompetitor,
          competitorLogo: selectedCompetitor?.logo || "",
          branchesCount,
          isEditing: !!states?.isEditing,
          showAllPolygon: mapStates.showAllPolygon,
          showAllRadius: mapStates.showAllRadius,
          editingBranchKey,
          editStep,
          coverageEditMode,
          draftLocations,
          polygonByMarkerKey: mapStates.polygonByMarkerKey,
          radiusByMarkerKey: mapStates.radiusByMarkerKey,
        },
        handlers: {
          handleToggleEditingMode: handlers?.handleToggleEditingMode,
          handleStopEditing: handlers?.handleStopEditing,
          openConfirmSave: () => handlers?.handleStopEditing?.(),
          handleToggleAllPolygon: mergedMapHandlers.handleToggleAllPolygon,
          handleToggleAllRadius: mergedMapHandlers.handleToggleAllRadius,
          startCoverageEdit: C_T_br_handlers.startCoverageEdit,
          cancelCoverageEdit: C_T_br_handlers.cancelCoverageEdit,
          clearBranchCoverage: C_T_br_handlers.clearBranchCoverage,
          hideBranchCoverage: mapHandlers.hideEditingBranchCoverage,
        },
      },
      C_T_Br_map_props: {
        states: {
          ...mapStates,
          googleMaps_apiKey,
          displayCompetitor,
          competitorId,
          draftLocations,
          activeMarkerKey,
          editingBranchKey,
          editStep,
          coverageEditMode,
        },
        handlers: mergedMapHandlers,
      },
      C_T_Br_info_props: {
        states: {
          text,
          competitor: displayCompetitor,
          draftLocations,
          activeMarkerKey,
          editingBranchKey,
          editStep,
          coverageEditMode,
          showAllPolygon: mapStates.showAllPolygon,
          showAllRadius: mapStates.showAllRadius,
          polygonByMarkerKey: mapStates.polygonByMarkerKey,
          radiusByMarkerKey: mapStates.radiusByMarkerKey,
        },
        handlers: C_T_Br_info_handlers,
      },
    },
  };
};

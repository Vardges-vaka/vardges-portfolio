const cuisineTypes_text_helpers = (t, selectedCount) => {
  const title = t
    ? t("cuisineTypes.title", "Tags & cuisines")
    : "Tags & cuisines";
  const subtitleEdit = t
    ? t(
        "cuisineTypes.subtitle",
        "Browse catalog tags by type. Tap a chip to add or remove it; details appear on the right.",
      )
    : "Browse catalog tags by type. Tap a chip to add or remove it; details appear on the right.";
  const subtitleView = t
    ? t(
        "cuisineTypes.viewSubtitle",
        "Tap a saved tag to read its catalog description and platforms.",
      )
    : "Tap a saved tag to read its catalog description and platforms.";
  const noSelection = t
    ? t(
        "cuisineTypes.noSelection",
        "Select a competitor from the table to manage cuisine and category tags.",
      )
    : "Select a competitor from the table to manage cuisine and category tags.";
  const detailHeading = t
    ? t("cuisineTypes.detailHeading", "Tag details")
    : "Tag details";
  const detailEmptyEdit = t
    ? t(
        "cuisineTypes.detailEmpty",
        "Tap a catalog chip to see its label, description, and platforms.",
      )
    : "Tap a catalog chip to see its label, description, and platforms.";
  const detailEmptyView = t
    ? t(
        "cuisineTypes.viewDetailEmpty",
        "Select a tag on the left to show details here.",
      )
    : "Select a tag on the left to show details here.";
  const labelHeading = t ? t("cuisineTypes.label", "Label") : "Label";
  const descriptionHeading = t
    ? t("cuisineTypes.description", "Description")
    : "Description";
  const platformsHeading = t
    ? t("cuisineTypes.platforms", "Platforms")
    : "Platforms";
  const noPlatforms = t
    ? t(
        "cuisineTypes.noPlatforms",
        "No platform list is defined for this tag in the catalog.",
      )
    : "No platform list is defined for this tag in the catalog.";
  const legacyPlatformsNote = t
    ? t(
        "cuisineTypes.legacyPlatformsNote",
        "Platform coverage is only listed for catalog tags.",
      )
    : "Platform coverage is only listed for catalog tags.";
  const legacyHeading = t
    ? t("cuisineTypes.legacyHeading", "Other saved tags")
    : "Other saved tags";
  const legacyHint = t
    ? t(
        "cuisineTypes.legacyHint",
        "These entries are not in the current catalog. You can remove them while editing.",
      )
    : "These entries are not in the current catalog. You can remove them while editing.";
  const selectedSummary = t
    ? t("cuisineTypes.selectedCount", "{{count}} selected", {
        count: selectedCount,
      })
    : `${selectedCount} selected`;
  const viewSelectedTitle = t
    ? t("cuisineTypes.viewSelectedTitle", "Saved tags")
    : "Saved tags";
  const viewSelectedEmpty = t
    ? t(
        "cuisineTypes.viewSelectedEmpty",
        "This competitor has no cuisine or category tags yet.",
      )
    : "This competitor has no cuisine or category tags yet.";
  const draftSelectionTitle = t
    ? t("cuisineTypes.draftSelectionTitle", "Selected for this competitor")
    : "Selected for this competitor";
  const draftSelectionHint = t
    ? t(
        "cuisineTypes.draftSelectionHint",
        "These tags will be stored when you tap Confirm. Tap a catalog chip again here or in the list below to remove it.",
      )
    : "These tags will be stored when you tap Confirm. Tap a catalog chip again here or in the list below to remove it.";
  const draftSelectionEmpty = t
    ? t(
        "cuisineTypes.draftSelectionEmpty",
        "Nothing selected yet — tap catalog chips below to add tags.",
      )
    : "Nothing selected yet — tap catalog chips below to add tags.";
  const removeLegacyLabel = t
    ? t("cuisineTypes.removeLegacy", "Remove tag")
    : "Remove tag";

  const editLabel = t ? t("actions.edit", "Edit") : "Edit";
  const updateLabel = editLabel;
  const cancelLabel = t ? t("actions.cancel", "Cancel") : "Cancel";
  const confirmLabel = t ? t("actions.confirm", "Confirm") : "Confirm";
  const confirmSaveTitle = t
    ? t(
        "cuisineTypes.confirmSaveTitle",
        "Save tags for this competitor?",
      )
    : "Save tags for this competitor?";
  const confirmSaveHint = t
    ? t(
        "cuisineTypes.confirmSaveHint",
        "Your current selection will replace cuisine and category tags stored for this competitor.",
      )
    : "Your current selection will replace cuisine and category tags stored for this competitor.";
  const confirmCatalogTagsLabel = t
    ? t("cuisineTypes.confirmCatalogTags", "Catalog tags")
    : "Catalog tags";
  const confirmLegacyTagsLabel = t
    ? t("cuisineTypes.confirmLegacyTags", "Other / legacy tags")
    : "Other / legacy tags";
  const confirmSelectionHeading = t
    ? t("cuisineTypes.confirmSelectionHeading", "Current selection")
    : "Current selection";

  return {
    title,
    subtitleEdit,
    subtitleView,
    noSelection,
    detailHeading,
    detailEmptyEdit,
    detailEmptyView,
    labelHeading,
    descriptionHeading,
    platformsHeading,
    noPlatforms,
    legacyPlatformsNote,
    legacyHeading,
    legacyHint,
    selectedSummary,
    viewSelectedTitle,
    viewSelectedEmpty,
    draftSelectionTitle,
    draftSelectionHint,
    draftSelectionEmpty,
    removeLegacyLabel,
    editLabel,
    updateLabel,
    cancelLabel,
    confirmLabel,
    confirmSaveTitle,
    confirmSaveHint,
    confirmCatalogTagsLabel,
    confirmLegacyTagsLabel,
    confirmSelectionHeading,
  };
};

export { cuisineTypes_text_helpers };

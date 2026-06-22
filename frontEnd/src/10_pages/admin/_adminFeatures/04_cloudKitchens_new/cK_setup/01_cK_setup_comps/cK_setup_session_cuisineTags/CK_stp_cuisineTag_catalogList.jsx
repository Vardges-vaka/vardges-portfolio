import { Fragment, useMemo, useState, useCallback, useRef, useEffect } from "react";
import {
  CUISINE_TYPES,
  AGGREGATOR_PLATFORMS,
  CUISINE_TAG_SOURCE_OPTIONS,
  DFLT_F_D_CUISINE_TAG_FULL,
} from "../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
import { CUISINE_TAG_SOURCE_ICONS } from "../tempIcons/_.index.js";
import { setByPath, tagMatchesFilters, hasActiveCuisineTagFilters, buildFilterOptionsWithSelectAll, createMultiFilterChangeHandler, getFilterOptionValues, shouldShowSelectAllForFilter, collectSelectedFilterIcons } from "../../02_cK_setup_hlpr/_cK_setup_hlpr.index.js";
import CK_stp_brand_cuisineTagRow from "../cK_setup_session_brands/ck_setup_brand_fields/CK_stp_brand_cuisineTagRow.jsx";
import CK_stp_cuisineTag_inlineEditPanel from "./CK_stp_cuisineTag_inlineEditPanel.jsx";
import CK_stp_cuisineTag_addFieldModal from "./CK_stp_cuisineTag_addFieldModal.jsx";
import CK_stp_cuisineTag_platformIconStack from "../cK_setup_shared/CK_stp_cuisineTag_platformIconStack.jsx";
import {
  Select_multi,
  Input_search,
} from "../../../../../../../01_components/_components.index.js";
import "../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_cuisineTags.css";
import "../../_styles/cK_setup_session_cuisineTags/cK_stp_cuisineTag_catalogList.css";

const svgLeftIcon = (src) => (src ? { type: "svg", svg_src: src } : null);

const seedDraftFromTag = (tag = {}) => ({
  ...DFLT_F_D_CUISINE_TAG_FULL,
  value: tag.value || "",
  label: tag.label || "",
  description: tag.description || "",
  kind: tag.kind || "",
  source: tag.source || "",
  platforms: Array.isArray(tag.platforms) ? [...tag.platforms] : [],
});

const normalizeDraft = (draft = {}) => ({
  value: draft.value ?? "",
  label: draft.label ?? "",
  description: draft.description ?? "",
  kind: draft.kind ?? "",
  source: draft.source ?? "",
  platforms: [...(Array.isArray(draft.platforms) ? draft.platforms : [])].sort(),
});

const areDraftsEqual = (left, right) =>
  JSON.stringify(normalizeDraft(left)) === JSON.stringify(normalizeDraft(right));

const EDIT_PANEL_MS = 320;

const seedFieldDraftFromTag = (tag, field) => {
  if (field === "platforms") {
    return Array.isArray(tag?.platforms) ? [...tag.platforms] : [];
  }
  if (field === "description") return tag?.description ?? "";
  if (field === "source") return tag?.source ?? "";
  return "";
};

const CK_stp_cuisineTag_catalogList = ({
  title = "All cuisine tags",
  tags = [],
  emptyMessage = "No cuisine tags found.",
  handlers = {},
  t,
}) => {
  const [search, setSearch] = useState("");
  const [kindFilter, setKindFilter] = useState([]);
  const [sourceFilter, setSourceFilter] = useState([]);
  const [platformFilter, setPlatformFilter] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [panelTagId, setPanelTagId] = useState(null);
  const [panelMode, setPanelMode] = useState("view");
  const [editDraft, setEditDraft] = useState(null);
  const [editBaseline, setEditBaseline] = useState(null);
  const [enteredEditFromView, setEnteredEditFromView] = useState(false);
  const [editPanelExpanded, setEditPanelExpanded] = useState(false);
  const closeEditTimerRef = useRef(null);
  const editPanelRef = useRef(null);
  const pendingEditScrollRef = useRef(false);
  const editScrollDelayRef = useRef(EDIT_PANEL_MS + 24);
  const [fieldModal, setFieldModal] = useState(null);
  const [fieldDraft, setFieldDraft] = useState("");

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

  const selectedFilterIcons = useMemo(
    () =>
      collectSelectedFilterIcons({
        kindFilter,
        sourceFilter,
        platformFilter,
        kindOptions: kindFilterOptions,
        sourceOptions: sourceFilterOptions,
        platformOptions: platformFilterOptions,
        tags,
        filters,
      }),
    [
      kindFilter,
      sourceFilter,
      platformFilter,
      kindFilterOptions,
      sourceFilterOptions,
      platformFilterOptions,
      tags,
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

  const filteredTags = useMemo(() => {
    return tags
      .filter((tag) => tag?._id && tagMatchesFilters(tag, filters))
      .sort((a, b) => (a.label || "").localeCompare(b.label || ""));
  }, [tags, search, kindFilter, sourceFilter, platformFilter]);

  const hasActiveFilters = hasActiveCuisineTagFilters(filters);

  const resetFilters = () => {
    setSearch("");
    setKindFilter([]);
    setSourceFilter([]);
    setPlatformFilter([]);
  };

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
    if (showFilters) resetFilters();
  };

  const clearCloseEditTimer = useCallback(() => {
    if (closeEditTimerRef.current) {
      window.clearTimeout(closeEditTimerRef.current);
      closeEditTimerRef.current = null;
    }
  }, []);

  const closePanel = useCallback(() => {
    clearCloseEditTimer();
    setEditPanelExpanded(false);
    closeEditTimerRef.current = window.setTimeout(() => {
      setPanelTagId(null);
      setPanelMode("view");
      setEditDraft(null);
      setEditBaseline(null);
      setEnteredEditFromView(false);
      closeEditTimerRef.current = null;
    }, EDIT_PANEL_MS);
  }, [clearCloseEditTimer]);

  const openPanel = useCallback(
    (tag, mode) => {
      if (!tag?._id) return;

      if (panelTagId === tag._id && panelMode === mode) {
        closePanel();
        return;
      }

      clearCloseEditTimer();
      const isSwitchingTag = Boolean(panelTagId && panelTagId !== tag._id);
      const isModeSwitch =
        panelTagId === tag._id && panelMode !== mode;

      const baseline = seedDraftFromTag(tag);

      setPanelTagId(tag._id);
      setPanelMode(mode);
      setEditDraft(baseline);
      setEditBaseline(baseline);
      setEnteredEditFromView(false);

      if (isSwitchingTag) {
        setEditPanelExpanded(true);
        editScrollDelayRef.current = 80;
        pendingEditScrollRef.current = true;
        return;
      }

      if (isModeSwitch) {
        return;
      }

      setEditPanelExpanded(false);
      editScrollDelayRef.current = EDIT_PANEL_MS + 24;
      pendingEditScrollRef.current = true;
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setEditPanelExpanded(true));
      });
    },
    [panelTagId, panelMode, closePanel, clearCloseEditTimer],
  );

  const openView = useCallback((tag) => openPanel(tag, "view"), [openPanel]);
  const openEdit = useCallback((tag) => openPanel(tag, "edit"), [openPanel]);
  const enablePanelEdit = useCallback(() => {
    setEnteredEditFromView(true);
    setPanelMode("edit");
  }, []);

  const handleRowUpdate = useCallback(
    (tag) => {
      if (!tag?._id) return;
      if (panelTagId === tag._id && panelMode === "view") {
        enablePanelEdit();
        return;
      }
      openEdit(tag);
    },
    [panelTagId, panelMode, enablePanelEdit, openEdit],
  );

  useEffect(() => {
    if (!pendingEditScrollRef.current || !editPanelExpanded || !panelTagId) {
      return;
    }

    pendingEditScrollRef.current = false;
    const node = editPanelRef.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const delay = prefersReducedMotion ? 0 : editScrollDelayRef.current;

    const timer = window.setTimeout(() => {
      node.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "nearest",
      });
    }, delay);

    return () => window.clearTimeout(timer);
  }, [editPanelExpanded, panelTagId]);

  const handleDraftChange = useCallback((name, value) => {
    if (panelMode === "view") return;
    setEditDraft((prev) => setByPath(prev, name, value));
  }, [panelMode]);

  const isDraftDirty = useMemo(() => {
    if (!editDraft || !editBaseline) return false;
    return !areDraftsEqual(editDraft, editBaseline);
  }, [editDraft, editBaseline]);

  const handlePanelCancel = useCallback(() => {
    if (panelMode === "view") {
      closePanel();
      return;
    }

    if (enteredEditFromView) {
      setEditDraft(editBaseline);
      setPanelMode("view");
      setEnteredEditFromView(false);
      return;
    }

    closePanel();
  }, [panelMode, enteredEditFromView, editBaseline, closePanel]);

  const handleConfirmUpdate = useCallback(async () => {
    if (!panelTagId || !editDraft || panelMode === "view" || !isDraftDirty) return;
    const ok = await handlers.onConfirmUpdate?.(panelTagId, editDraft);
    if (ok) closePanel();
  }, [panelTagId, panelMode, editDraft, isDraftDirty, handlers, closePanel]);

  const closeFieldModal = useCallback(() => {
    setFieldModal(null);
    setFieldDraft("");
  }, []);

  const openFieldModal = useCallback((tag, field) => {
    setFieldModal({ tag, field });
    setFieldDraft(seedFieldDraftFromTag(tag, field));
  }, []);

  const handleConfirmFieldAdd = useCallback(async () => {
    if (!fieldModal?.tag?._id || !fieldModal?.field) return;
    const ok = await handlers.onAddTagField?.(
      fieldModal.tag._id,
      fieldModal.field,
      fieldDraft,
    );
    if (ok) closeFieldModal();
  }, [fieldModal, fieldDraft, handlers, closeFieldModal]);

  const inlineFormHandlers = useMemo(
    () => ({ onChange: handleDraftChange }),
    [handleDraftChange],
  );

  const inlineFormStates = useMemo(
    () => ({ values: editDraft ?? {} }),
    [editDraft],
  );

  return (
    <section className="cK_stp_cuisineTag_catalogList">
      <CK_stp_cuisineTag_addFieldModal
        isOpen={Boolean(fieldModal)}
        field={fieldModal?.field}
        tagLabel={fieldModal?.tag?.label || fieldModal?.tag?.value}
        draft={fieldDraft}
        onDraftChange={setFieldDraft}
        onCancel={closeFieldModal}
        onConfirm={handleConfirmFieldAdd}
      />

      <div className="cK_stp_brand_fld_cuisineTags__filters">
        {/* {title ? (
          <h5 className="cK_stp_brand_fld_cuisineTags__listTitle">{title}</h5>
        ) : null} */}

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
            onClick: toggleFilters,
          }}
        />

        {showFilters ? (
          <div className="cK_stp_cuisineTag_catalogList__selectRow">
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
              <div className="cK_stp_cuisineTag_catalogList__filterActions">
                <button
                  type="button"
                  className="cK_stp_cuisineTag_catalogList__resetFilters"
                  onClick={resetFilters}>
                  Reset filters
                </button>
                <span className="cK_stp_cuisineTag_catalogList__filterCount">
                  {filteredTags.length} found
                </span>
                {selectedFilterIcons.length ? (
                  <div
                    className="cK_stp_cuisineTag_catalogList__filterIcons"
                    aria-label="Active filter selections">
                    {otherFilterIcons.map((icon) => (
                      <span
                        key={icon.key}
                        className="cK_stp_cuisineTag_catalogList__filterIconWrap"
                        title={
                          icon.count != null
                            ? `${icon.label} (${icon.count})`
                            : icon.label
                        }>
                        <img
                          className="cK_stp_cuisineTag_catalogList__filterIcon"
                          src={icon.src}
                          alt={icon.label}
                        />
                        {icon.count != null ? (
                          <span className="cK_stp_cuisineTag_catalogList__filterIconCount">
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

        {tags.length === 0 ? (
          <p className="cK_stp_brand_fld_cuisineTags__empty">{emptyMessage}</p>
        ) : filteredTags.length === 0 ? (
          <p className="cK_stp_brand_fld_cuisineTags__empty">
            No tags match the current filters.
          </p>
        ) : (
          <div className="cK_stp_brand_fld_cuisineTags__tableWrap cK_stp_cuisineTag_catalogList__tableWrap">
            <ul className="cK_stp_brand_fld_cuisineTags__table cK_stp_cuisineTag_catalogList__table">
              <li className="cK_stp_brand_cuisineTagRow cK_stp_brand_cuisineTagRow--head cK_stp_brand_cuisineTagRow--manage">
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
                <span className="cK_stp_brand_cuisineTagRow__cell cK_stp_brand_cuisineTagRow__active">
                  Status
                </span>
                <span className="cK_stp_brand_cuisineTagRow__cell cK_stp_brand_cuisineTagRow__action">
                  Actions
                </span>
              </li>
              {filteredTags.map((tag, i) => {
                const isPanelOpen = panelTagId === tag._id;
                const isViewActive = isPanelOpen && panelMode === "view";
                const isEditing = isPanelOpen && panelMode === "edit";

                return (
                  <Fragment key={tag._id}>
                    <CK_stp_brand_cuisineTagRow
                      tag={tag}
                      index={i + 1}
                      mode="manage"
                      isViewActive={isViewActive}
                      isUpdateActive={isEditing}
                      allowFieldAdd
                      onAddField={openFieldModal}
                      onContinueBuilding={() => openEdit(tag)}
                      onDelete={handlers.onDelete}
                      onUpdate={() => handleRowUpdate(tag)}
                      onView={() => openView(tag)}
                      onToggleActive={handlers.onToggleActive}
                    />
                    {isPanelOpen && editDraft ? (
                      <CK_stp_cuisineTag_inlineEditPanel
                        ref={editPanelRef}
                        tag={tag}
                        isExpanded={editPanelExpanded}
                        readOnly={panelMode === "view"}
                        isSaveDisabled={!isDraftDirty}
                        states={inlineFormStates}
                        handlers={inlineFormHandlers}
                        t={t}
                        onCancel={handlePanelCancel}
                        onSubmit={handleConfirmUpdate}
                        onEnableEdit={enablePanelEdit}
                      />
                    ) : null}
                  </Fragment>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default CK_stp_cuisineTag_catalogList;

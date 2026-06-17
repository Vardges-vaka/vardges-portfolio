import { Fragment, useMemo, useState, useCallback, useRef, useEffect } from "react";
import {
  CUISINE_TYPES,
  AGGREGATOR_PLATFORMS,
  CUISINE_TAG_SOURCE_OPTIONS,
  DFLT_F_D_CUISINE_TAG_FULL,
} from "../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
import { CUISINE_TAG_SOURCE_ICONS } from "../tempIcons/_.index.js";
import { setByPath } from "../../02_cK_setup_hlpr/_cK_setup_hlpr.index.js";
import CK_stp_brand_cuisineTagRow from "../cK_setup_session_brands/ck_setup_brand_fields/CK_stp_brand_cuisineTagRow.jsx";
import CK_stp_cuisineTag_inlineEditPanel from "./CK_stp_cuisineTag_inlineEditPanel.jsx";
import CK_stp_cuisineTag_addFieldModal from "./CK_stp_cuisineTag_addFieldModal.jsx";
import {
  Select_static,
  Input_search,
} from "../../../../../../../01_components/_components.index.js";
import "../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_cuisineTags.css";
import "../../_styles/cK_setup_session_cuisineTags/cK_stp_cuisineTag_catalogList.css";

const svgLeftIcon = (src) => (src ? { type: "svg", svg_src: src } : null);

const withAllOption = (allLabel, items) => [
  { value: "all", label: allLabel },
  ...items,
];

const seedDraftFromTag = (tag = {}) => ({
  ...DFLT_F_D_CUISINE_TAG_FULL,
  value: tag.value || "",
  label: tag.label || "",
  description: tag.description || "",
  kind: tag.kind || "",
  source: tag.source || "",
  platforms: Array.isArray(tag.platforms) ? tag.platforms : [],
});

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
  const [kindFilter, setKindFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [editingTagId, setEditingTagId] = useState(null);
  const [editDraft, setEditDraft] = useState(null);
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

  const filteredTags = useMemo(() => {
    return tags
      .filter((tag) => tag?._id && tagMatchesFilters(tag, filters))
      .sort((a, b) => (a.label || "").localeCompare(b.label || ""));
  }, [tags, search, kindFilter, sourceFilter, platformFilter]);

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

  const closeEdit = useCallback(() => {
    clearCloseEditTimer();
    setEditPanelExpanded(false);
    closeEditTimerRef.current = window.setTimeout(() => {
      setEditingTagId(null);
      setEditDraft(null);
      closeEditTimerRef.current = null;
    }, EDIT_PANEL_MS);
  }, [clearCloseEditTimer]);

  const openEdit = useCallback(
    (tag) => {
      if (!tag?._id) return;
      if (editingTagId === tag._id) {
        closeEdit();
        return;
      }

      clearCloseEditTimer();
      const isSwitching = Boolean(editingTagId && editingTagId !== tag._id);

      setEditingTagId(tag._id);
      setEditDraft(seedDraftFromTag(tag));

      if (isSwitching) {
        setEditPanelExpanded(true);
        editScrollDelayRef.current = 80;
        pendingEditScrollRef.current = true;
        return;
      }

      setEditPanelExpanded(false);
      editScrollDelayRef.current = EDIT_PANEL_MS + 24;
      pendingEditScrollRef.current = true;
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setEditPanelExpanded(true));
      });
    },
    [editingTagId, closeEdit, clearCloseEditTimer],
  );

  useEffect(() => {
    if (!pendingEditScrollRef.current || !editPanelExpanded || !editingTagId) {
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
  }, [editPanelExpanded, editingTagId]);

  const handleDraftChange = useCallback((name, value) => {
    setEditDraft((prev) => setByPath(prev, name, value));
  }, []);

  const handleConfirmUpdate = useCallback(async () => {
    if (!editingTagId || !editDraft) return;
    const ok = await handlers.onConfirmUpdate?.(editingTagId, editDraft);
    if (ok) closeEdit();
  }, [editingTagId, editDraft, handlers, closeEdit]);

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
                className="cK_stp_cuisineTag_catalogList__resetFilters"
                onClick={resetFilters}>
                Reset filters
              </button>
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
                <span className="cK_stp_brand_cuisineTagRow__cell cK_stp_brand_cuisineTagRow__action">
                  Actions
                </span>
              </li>
              {filteredTags.map((tag, i) => {
                const isEditing = editingTagId === tag._id;

                return (
                  <Fragment key={tag._id}>
                    <CK_stp_brand_cuisineTagRow
                      tag={tag}
                      index={i + 1}
                      mode="manage"
                      isUpdateActive={isEditing}
                      allowFieldAdd
                      onAddField={openFieldModal}
                      onContinueBuilding={() => openEdit(tag)}
                      onDelete={handlers.onDelete}
                      onUpdate={() => openEdit(tag)}
                      onView={handlers.onView}
                    />
                    {editingTagId === tag._id && editDraft ? (
                      <CK_stp_cuisineTag_inlineEditPanel
                        ref={editPanelRef}
                        tag={tag}
                        isExpanded={editPanelExpanded}
                        states={inlineFormStates}
                        handlers={inlineFormHandlers}
                        t={t}
                        onCancel={closeEdit}
                        onSubmit={handleConfirmUpdate}
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

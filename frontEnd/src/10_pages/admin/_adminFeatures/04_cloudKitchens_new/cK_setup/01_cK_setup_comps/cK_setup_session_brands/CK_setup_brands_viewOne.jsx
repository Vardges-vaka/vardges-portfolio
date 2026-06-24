import { useCallback, useState } from "react";
import { Modal } from "../../../../../../../01_components/_components.index.js";
import CK_stp_brand_fld_cuisineTagsHeaderAside from "./ck_setup_brand_fields/CK_stp_brand_fld_cuisineTagsHeaderAside.jsx";
import {
  CK_stp_brand_fieldHeader,
  CK_stp_brand_collapsibleSection,
  CK_stp_brand_fld_files,
  CK_stp_brand_fld_basic,
  CK_stp_brand_fld_registeredIn,
  CK_stp_brand_fld_socials,
  CK_stp_brand_fld_integrations,
  CK_stp_brand_fld_siblings,
  CK_stp_brand_fld_cuisineTags,
  CK_stp_brand_fld_contracts,
  CK_stp_brand_fld_employees,
  CK_stp_brand_fld_equipments,
  CK_stp_brand_fld_branches,
  CK_stp_brand_fld_menus,
  CK_stp_brand_fld_competitors,
} from "./ck_setup_brand_fields/_ck_setup_brand_fields.index.js";
import {
  BRAND_DETAIL_FIELD_LABELS,
  buildBrandFieldHandlers,
  buildBrandFieldStates,
  isBrandViewOnlyField,
} from "../../02_cK_setup_hlpr/brandDetail_helpers.js";
import { useBrandCuisineTagsField } from "../../03_cK_setup_hooks/cK_setup_brands_hooks/useBrandCuisineTagsField.js";
import "../../_styles/cK_setup_session_brands/cK_setup_brands_viewOne.css";

const COLLAPSIBLE_SECTIONS = [
  { key: "socials", Component: CK_stp_brand_fld_socials },
  { key: "integrations", Component: CK_stp_brand_fld_integrations },
  { key: "siblings", Component: CK_stp_brand_fld_siblings },
  { key: "cuisineTags", Component: CK_stp_brand_fld_cuisineTags },
  { key: "contracts", Component: CK_stp_brand_fld_contracts },
  { key: "employees", Component: CK_stp_brand_fld_employees },
  { key: "equipments", Component: CK_stp_brand_fld_equipments },
  { key: "branches", Component: CK_stp_brand_fld_branches },
  { key: "menus", Component: CK_stp_brand_fld_menus },
  { key: "competitors", Component: CK_stp_brand_fld_competitors },
];

const CK_setup_brands_viewOne = ({ states, handlers, t }) => {
  const {
    brand,
    brandDraft,
    brandFilesDraft,
    detailMode,
    editingField,
    confirmUpdateModalOpen,
    confirmUpdateLabels,
    isSaving,
    cuisineTags,
  } = states;

  const [expandedSections, setExpandedSections] = useState(() => new Set());

  const cuisineTagsField = useBrandCuisineTagsField({ brand, brandDraft });

  const fieldStates = buildBrandFieldStates(
    brandDraft,
    cuisineTags,
    cuisineTagsField.fieldState,
  );
  const fieldHandlers = buildBrandFieldHandlers(handlers);

  const isGlobalEdit = detailMode === "editAll";
  const isFilesSectionOpen = editingField === "files";

  const isFieldEditOpen = (fieldKey) =>
    isGlobalEdit || editingField === fieldKey;

  const isCollapsibleExpanded = useCallback(
    (fieldKey) => {
      if (isGlobalEdit) return true;
      if (editingField === fieldKey) return true;
      return expandedSections.has(fieldKey);
    },
    [editingField, expandedSections, isGlobalEdit],
  );

  const toggleCollapsibleSection = useCallback((fieldKey) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(fieldKey)) next.delete(fieldKey);
      else next.add(fieldKey);
      return next;
    });
  }, []);

  const sectionClassName = (fieldKey) =>
    [
      "cK_setup_brands_viewOne__section",
      isFieldEditOpen(fieldKey) && "cK_setup_brands_viewOne__section--editable",
      editingField === fieldKey &&
        "cK_setup_brands_viewOne__section--fieldEdit",
      isBrandViewOnlyField(fieldKey) &&
        "cK_setup_brands_viewOne__section--readOnly",
    ]
      .filter(Boolean)
      .join(" ");

  const filesSectionClassName = [
    "cK_setup_brands_viewOne__section",
    isFilesSectionOpen && "cK_setup_brands_viewOne__section--editable",
    isFilesSectionOpen && "cK_setup_brands_viewOne__section--fieldEdit",
  ]
    .filter(Boolean)
    .join(" ");

  const editableHeaderProps = (fieldKey) => ({
    showUpdate:
      !isBrandViewOnlyField(fieldKey) &&
      detailMode === "read" &&
      !editingField &&
      !isSaving,
    showConfirmCancel: editingField === fieldKey && !isSaving,
    onUpdate: () => handlers.onFieldUpdate(fieldKey),
    onCancel: handlers.onFieldCancel,
    onConfirm: handlers.onFieldConfirm,
    isSaving,
  });

  const showPageUpdate = detailMode === "read" && !editingField && !isSaving;
  const showPageConfirmCancel = isGlobalEdit && !isSaving;

  return (
    <div className="cK_setup_brands_viewOne">
      <header className="cK_setup_brands_viewOne__header">
        <div className="cK_setup_brands_viewOne__headerMain">
          <button
            type="button"
            className="cK_setup_brands_viewOne__backBtn"
            onClick={handlers.onBackToList}
            disabled={isSaving}>
            ← Back to list
          </button>
          <h2 className="cK_setup_brands_viewOne__title">
            {handlers.brandDisplayName?.() || brand?.name || "Brand"}
          </h2>
        </div>
        <div className="cK_setup_brands_viewOne__headerActions">
          {showPageUpdate ? (
            <button
              type="button"
              className="cK_setup_brands_viewOne__btn cK_setup_brands_viewOne__btn_primary"
              onClick={handlers.onGlobalUpdate}
              disabled={isSaving || Boolean(editingField)}>
              Update
            </button>
          ) : null}
          {showPageConfirmCancel ? (
            <>
              <button
                type="button"
                className="cK_setup_brands_viewOne__btn cK_setup_brands_viewOne__btn_secondary"
                onClick={handlers.onGlobalCancel}
                disabled={isSaving}>
                Cancel
              </button>
              <button
                type="button"
                className="cK_setup_brands_viewOne__btn cK_setup_brands_viewOne__btn_primary"
                onClick={handlers.onGlobalConfirm}
                disabled={isSaving}>
                Confirm
              </button>
            </>
          ) : null}
        </div>
      </header>

      <div className="cK_setup_brands_viewOne__sections">
        <div className="cK_setup_brands_viewOne__heroRow">
          <section className={filesSectionClassName}>
            <CK_stp_brand_fieldHeader
              title="Files"
              {...editableHeaderProps("files")}
            />
            <fieldset
              className="cK_setup_brands_viewOne__sectionBody cK_setup_brands_viewOne__sectionBody--files"
              disabled={isFilesSectionOpen && isSaving}>
              <CK_stp_brand_fld_files
                brandId={brand?._id}
                states={{
                  files: brandFilesDraft,
                  disabled: !isFilesSectionOpen || isSaving,
                }}
                handlers={{
                  onLogoVariantChange: handlers.onLogoVariantChange,
                  onLogoVariantFieldChange: handlers.onLogoVariantFieldChange,
                  onLogoVariantDelete: handlers.onLogoVariantDelete,
                  onOtherFileChange: handlers.onOtherFileChange,
                  onOtherFileFieldChange: handlers.onOtherFileFieldChange,
                  onOtherFileDelete: handlers.onOtherFileDelete,
                  onAddOtherFiles: handlers.onAddOtherFiles,
                }}
              />
            </fieldset>
          </section>

          <div className="cK_setup_brands_viewOne__primaryColumn">
            <section className={sectionClassName("basic")}>
              <CK_stp_brand_fieldHeader
                title="Basics"
                {...editableHeaderProps("basic")}
              />
              <fieldset
                className="cK_setup_brands_viewOne__sectionBody"
                disabled={!isFieldEditOpen("basic") || isSaving}>
                <CK_stp_brand_fld_basic
                  states={fieldStates}
                  handlers={fieldHandlers}
                  t={t}
                />
              </fieldset>
            </section>

            <section className={sectionClassName("registeredIn")}>
              <CK_stp_brand_fieldHeader
                title="Registered in"
                {...editableHeaderProps("registeredIn")}
              />
              <fieldset
                className="cK_setup_brands_viewOne__sectionBody"
                disabled={!isFieldEditOpen("registeredIn") || isSaving}>
                <CK_stp_brand_fld_registeredIn
                  states={fieldStates}
                  handlers={fieldHandlers}
                  t={t}
                />
              </fieldset>
            </section>
          </div>
        </div>

        {COLLAPSIBLE_SECTIONS.map(({ key, Component }) => {
          const readOnly = isBrandViewOnlyField(key);
          const title = BRAND_DETAIL_FIELD_LABELS[key] || key;
          const isExpanded = isCollapsibleExpanded(key);

          return (
            <CK_stp_brand_collapsibleSection
              key={key}
              fieldKey={key}
              title={title}
              isExpanded={isExpanded}
              onToggle={() => toggleCollapsibleSection(key)}
              sectionClassName={sectionClassName(key)}
              headerProps={
                readOnly ? {} : editableHeaderProps(key)
              }
              rightChild={
                key === "cuisineTags" ? (
                  <CK_stp_brand_fld_cuisineTagsHeaderAside
                    {...cuisineTagsField.headerAsideProps}
                  />
                ) : null
              }
              readOnly={readOnly}
              isSaving={isSaving}
              isEditOpen={isFieldEditOpen(key)}>
              <Component
                states={fieldStates}
                handlers={fieldHandlers}
                t={t}
              />
            </CK_stp_brand_collapsibleSection>
          );
        })}
      </div>

      <Modal
        isOpen={confirmUpdateModalOpen}
        title="Confirm update"
        onCancel={handlers.onConfirmUpdateCancel}
        onConfirm={handlers.onConfirmUpdateConfirm}
        withFooter
        footerStates={{
          isConfirmDisabled: isSaving,
          isCancelDisabled: isSaving,
        }}
        footerLabels={{
          cancelLabel: "Cancel",
          confirmLabel: isSaving ? "Saving…" : "Confirm update",
        }}>
        <div className="cK_setup_brands_viewOne__modalBody">
          <p>The following fields will be updated:</p>
          <ul className="cK_setup_brands_viewOne__modalList">
            {(confirmUpdateLabels ?? []).map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        </div>
      </Modal>
    </div>
  );
};

export default CK_setup_brands_viewOne;

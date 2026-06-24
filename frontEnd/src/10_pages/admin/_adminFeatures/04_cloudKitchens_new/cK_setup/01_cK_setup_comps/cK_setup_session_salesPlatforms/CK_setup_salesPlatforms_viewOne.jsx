import { useCallback, useEffect, useState } from "react";
import { Modal } from "../../../../../../../01_components/_components.index.js";
import {
  CK_stp_brand_fieldHeader,
  CK_stp_brand_collapsibleSection,
} from "../cK_setup_session_brands/ck_setup_brand_fields/_ck_setup_brand_fields.index.js";
import {
  CK_stp_slsPltf_fld_basic,
  CK_stp_slsPltf_fld_links,
  CK_stp_slsPltf_fld_kam,
  CK_stp_slsPltf_fld_loginCredentials,
  CK_stp_slsPltf_fld_support,
} from "./ck_setup_salesPlatform_fields/_ck_setup_salesPlatform_fields.index.js";
import { SALES_PLATFORM_DETAIL_FIELD_LABELS } from "../../02_cK_setup_hlpr/salesPlatformDetail_helpers.js";
import "../../_styles/cK_setup_session_brands/cK_setup_brands_viewOne.css";
import "../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_collapsibleSection.css";
import "../../_styles/cK_setup_session_salesPlatforms/cK_setup_salesPlatforms_viewOne.css";

const COLLAPSIBLE_SECTIONS = [
  { key: "loginCredentials", Component: CK_stp_slsPltf_fld_loginCredentials },
  { key: "support", Component: CK_stp_slsPltf_fld_support },
];

const CK_setup_salesPlatforms_viewOne = ({ states, handlers, t }) => {
  const {
    salesPlatformDraft,
    selectedSalesPlatform,
    detailMode,
    editingField,
    detailExpandedSections = [],
    confirmUpdateModalOpen,
    confirmUpdateLabels,
    isSaving,
  } = states;

  const [expandedSections, setExpandedSections] = useState(() => new Set());

  useEffect(() => {
    setExpandedSections(new Set(detailExpandedSections));
  }, [selectedSalesPlatform?._id, detailExpandedSections]);

  const fieldStates = { values: salesPlatformDraft };
  const fieldHandlers = { onChange: handlers.onDraftChange };

  const isGlobalEdit = detailMode === "editAll";
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
    ]
      .filter(Boolean)
      .join(" ");

  const editableHeaderProps = (fieldKey) => ({
    showUpdate: detailMode === "read" && !editingField && !isSaving,
    showConfirmCancel: editingField === fieldKey && !isSaving,
    onUpdate: () => handlers.onFieldUpdate(fieldKey),
    onCancel: handlers.onFieldCancel,
    onConfirm: handlers.onFieldConfirm,
    isSaving,
  });

  const showPageUpdate = detailMode === "read" && !editingField && !isSaving;
  const showPageConfirmCancel = isGlobalEdit && !isSaving;

  return (
    <div className="cK_setup_brands_viewOne cK_setup_salesPlatforms_viewOne">
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
            {handlers.itemDisplayName?.() ||
              selectedSalesPlatform?.name ||
              "Sales platform"}
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
          <section className={sectionClassName("links")}>
            <CK_stp_brand_fieldHeader
              title={SALES_PLATFORM_DETAIL_FIELD_LABELS.links}
              {...editableHeaderProps("links")}
            />
            <fieldset
              className="cK_setup_brands_viewOne__sectionBody cK_setup_brands_viewOne__sectionBody--files"
              disabled={!isFieldEditOpen("links") || isSaving}>
              <CK_stp_slsPltf_fld_links
                salesPlatformId={selectedSalesPlatform?._id}
                states={{
                  ...fieldStates,
                  isEditOpen: isFieldEditOpen("links"),
                }}
                handlers={fieldHandlers}
                t={t}
              />
            </fieldset>
          </section>

          <section className={sectionClassName("basic")}>
            <CK_stp_brand_fieldHeader
              title={SALES_PLATFORM_DETAIL_FIELD_LABELS.basic}
              {...editableHeaderProps("basic")}
            />
            <fieldset
              className="cK_setup_brands_viewOne__sectionBody"
              disabled={!isFieldEditOpen("basic") || isSaving}>
              <CK_stp_slsPltf_fld_basic
                states={fieldStates}
                handlers={fieldHandlers}
                t={t}
              />
            </fieldset>
          </section>
        </div>

        <section className={sectionClassName("kam")}>
          <CK_stp_brand_fieldHeader
            title={SALES_PLATFORM_DETAIL_FIELD_LABELS.kam}
            {...editableHeaderProps("kam")}
          />
          <fieldset
            className="cK_setup_brands_viewOne__sectionBody"
            disabled={!isFieldEditOpen("kam") || isSaving}>
            <CK_stp_slsPltf_fld_kam
              states={fieldStates}
              handlers={fieldHandlers}
              t={t}
            />
          </fieldset>
        </section>

        {COLLAPSIBLE_SECTIONS.map(({ key, Component }) => {
          const title = SALES_PLATFORM_DETAIL_FIELD_LABELS[key] || key;
          const isExpanded = isCollapsibleExpanded(key);
          const isCardGridSection =
            key === "loginCredentials" || key === "support";
          const sectionHeaderProps = isCardGridSection
            ? { showUpdate: false, showConfirmCancel: false, isSaving }
            : editableHeaderProps(key);

          return (
            <CK_stp_brand_collapsibleSection
              key={key}
              fieldKey={key}
              title={title}
              isExpanded={isExpanded}
              onToggle={() => toggleCollapsibleSection(key)}
              sectionClassName={sectionClassName(key)}
              headerProps={sectionHeaderProps}
              isSaving={isSaving}
              isEditOpen={isFieldEditOpen(key)}
              keepFieldsetEnabled={isCardGridSection && !isGlobalEdit}>
              <Component
                states={{
                  ...fieldStates,
                  isEditOpen: isFieldEditOpen(key),
                  isGlobalEdit,
                  isSaving,
                }}
                handlers={{
                  ...fieldHandlers,
                  onLoginCredentialsPersist: handlers.onLoginCredentialsPersist,
                  onSupportContactsPersist: handlers.onSupportContactsPersist,
                }}
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

export default CK_setup_salesPlatforms_viewOne;

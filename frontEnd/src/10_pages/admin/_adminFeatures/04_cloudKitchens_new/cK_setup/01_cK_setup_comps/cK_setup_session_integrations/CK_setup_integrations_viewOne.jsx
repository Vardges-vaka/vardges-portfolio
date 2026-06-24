import { useCallback, useEffect, useState } from "react";
import { Modal } from "../../../../../../../01_components/_components.index.js";
import {
  CK_stp_brand_fieldHeader,
  CK_stp_brand_collapsibleSection,
} from "../cK_setup_session_brands/ck_setup_brand_fields/_ck_setup_brand_fields.index.js";
import {
  CK_stp_integ_fld_identity,
  CK_stp_integ_fld_payment,
  CK_stp_integ_fld_loginCredentials,
  CK_stp_integ_fld_kam,
  CK_stp_integ_fld_support,
  CK_stp_integ_fld_scheduledMaintenances,
  CK_stp_integ_fld_brands,
  CK_stp_integ_fld_branches,
  CK_stp_integ_fld_contract,
  CK_stp_integ_fld_files,
} from "./ck_setup_integration_fields/_ck_setup_integration_fields.index.js";
import {
  INTEGRATION_DETAIL_FIELD_LABELS,
  buildIntegrationFieldHandlers,
  buildIntegrationFieldStates,
  isIntegrationViewOnlyField,
} from "../../02_cK_setup_hlpr/integrationDetail_helpers.js";
import "../../_styles/cK_setup_session_brands/cK_setup_brands_viewOne.css";
import "../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_collapsibleSection.css";
import "../../_styles/cK_setup_session_integrations/cK_setup_integrations_viewOne.css";

const COLLAPSIBLE_SECTIONS = [
  { key: "payment", Component: CK_stp_integ_fld_payment },
  { key: "loginCredentials", Component: CK_stp_integ_fld_loginCredentials },
  { key: "kam", Component: CK_stp_integ_fld_kam },
  { key: "support", Component: CK_stp_integ_fld_support },
  {
    key: "scheduledMaintenances",
    Component: CK_stp_integ_fld_scheduledMaintenances,
  },
  { key: "brands", Component: CK_stp_integ_fld_brands },
  { key: "branches", Component: CK_stp_integ_fld_branches },
  { key: "contract", Component: CK_stp_integ_fld_contract },
];

const CK_setup_integrations_viewOne = ({ states, handlers, t }) => {
  const {
    integration,
    integrationDraft,
    integrationFilesDraft,
    detailMode,
    editingField,
    confirmUpdateModalOpen,
    confirmUpdateLabels,
    isSaving,
    detailExpandedSections = [],
  } = states;

  const [expandedSections, setExpandedSections] = useState(
    () => new Set(detailExpandedSections.length ? detailExpandedSections : ["payment"]),
  );

  useEffect(() => {
    setExpandedSections(
      new Set(detailExpandedSections.length ? detailExpandedSections : ["payment"]),
    );
  }, [integration?._id, detailExpandedSections]);

  const fieldStates = buildIntegrationFieldStates(integrationDraft);
  const fieldHandlers = buildIntegrationFieldHandlers(handlers);

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
      isIntegrationViewOnlyField(fieldKey) &&
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
      !isIntegrationViewOnlyField(fieldKey) &&
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
    <div className="cK_setup_brands_viewOne cK_setup_integrations_viewOne">
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
              integration?.provider ||
              "Integration"}
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
              title={INTEGRATION_DETAIL_FIELD_LABELS.files}
              {...editableHeaderProps("files")}
            />
            <fieldset
              className="cK_setup_brands_viewOne__sectionBody cK_setup_brands_viewOne__sectionBody--files"
              disabled={isFilesSectionOpen && isSaving}>
              <CK_stp_integ_fld_files
                integrationId={integration?._id}
                states={{
                  files: integrationFilesDraft,
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
            <section
              className={[
                sectionClassName("identity"),
                "cK_setup_integrations_viewOne__identitySection",
              ]
                .filter(Boolean)
                .join(" ")}>
              <CK_stp_brand_fieldHeader
                title={INTEGRATION_DETAIL_FIELD_LABELS.identity}
                {...editableHeaderProps("identity")}
              />
              <fieldset
                className="cK_setup_brands_viewOne__sectionBody"
                disabled={!isFieldEditOpen("identity") || isSaving}>
                <CK_stp_integ_fld_identity
                  states={fieldStates}
                  handlers={fieldHandlers}
                  disabled={!isFieldEditOpen("identity") || isSaving}
                />
              </fieldset>
            </section>
          </div>
        </div>

        {COLLAPSIBLE_SECTIONS.map(({ key, Component }) => {
          const readOnly = isIntegrationViewOnlyField(key);
          const title = INTEGRATION_DETAIL_FIELD_LABELS[key] || key;
          const isExpanded = isCollapsibleExpanded(key);
          const isCardGridSection =
            key === "loginCredentials" || key === "support";
          const sectionHeaderProps = isCardGridSection
            ? { showUpdate: false, showConfirmCancel: false, isSaving }
            : readOnly
              ? {}
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
              readOnly={readOnly}
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

export default CK_setup_integrations_viewOne;

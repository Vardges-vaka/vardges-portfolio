import { Modal } from "../../../../../../../01_components/_components.index.js";
import CK_stp_brand_fld_cuisineTagsHeaderAside from "./ck_setup_brand_fields/CK_stp_brand_fld_cuisineTagsHeaderAside.jsx";
import {
  CK_stp_brand_fieldHeader,
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
  buildBrandFieldHandlers,
  buildBrandFieldStates,
} from "../../02_cK_setup_hlpr/brandDetail_helpers.js";
import { useBrandCuisineTagsField } from "../../03_cK_setup_hooks/cK_setup_brands_hooks/useBrandCuisineTagsField.js";
import "../../_styles/cK_setup_session_brands/cK_setup_brands_viewOne.css";

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

  const cuisineTagsField = useBrandCuisineTagsField({ brand, brandDraft });

  const fieldStates = buildBrandFieldStates(
    brandDraft,
    cuisineTags,
    cuisineTagsField.fieldState,
  );
  const fieldHandlers = buildBrandFieldHandlers(handlers);

  const isGlobalEdit = detailMode === "editAll";
  const isFilesSectionOpen = editingField === "files";

  const isSectionOpen = (fieldKey) => isGlobalEdit || editingField === fieldKey;

  const sectionClassName = (fieldKey) =>
    [
      "cK_setup_brands_viewOne__section",
      isSectionOpen(fieldKey) && "cK_setup_brands_viewOne__section--editable",
      editingField === fieldKey &&
        "cK_setup_brands_viewOne__section--fieldEdit",
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
              className="cK_setup_brands_viewOne__sectionBody"
              disabled={!isFilesSectionOpen || isSaving}>
              <CK_stp_brand_fld_files
                states={{
                  files: brandFilesDraft,
                  disabled: !isFilesSectionOpen || isSaving,
                }}
                handlers={{
                  onLogoVariantChange: handlers.onLogoVariantChange,
                  onLogoVariantFieldChange: handlers.onLogoVariantFieldChange,
                  onOtherFileChange: handlers.onOtherFileChange,
                  onAddOtherFiles: handlers.onAddOtherFiles,
                }}
              />
            </fieldset>
          </section>

          <section className={sectionClassName("basic")}>
            <CK_stp_brand_fieldHeader
              title="Basics"
              {...editableHeaderProps("basic")}
            />
            <fieldset
              className="cK_setup_brands_viewOne__sectionBody"
              disabled={!isSectionOpen("basic") || isSaving}>
              <CK_stp_brand_fld_basic
                states={fieldStates}
                handlers={fieldHandlers}
                t={t}
              />
            </fieldset>
          </section>
        </div>

        <section className={sectionClassName("registeredIn")}>
          <CK_stp_brand_fieldHeader
            title="Registered in"
            {...editableHeaderProps("registeredIn")}
          />
          <fieldset
            className="cK_setup_brands_viewOne__sectionBody"
            disabled={!isSectionOpen("registeredIn") || isSaving}>
            <CK_stp_brand_fld_registeredIn
              states={fieldStates}
              handlers={fieldHandlers}
              t={t}
            />
          </fieldset>
        </section>

        <section className={sectionClassName("socials")}>
          <CK_stp_brand_fieldHeader
            title="Socials"
            {...editableHeaderProps("socials")}
          />
          <fieldset
            className="cK_setup_brands_viewOne__sectionBody"
            disabled={!isSectionOpen("socials") || isSaving}>
            <CK_stp_brand_fld_socials
              states={fieldStates}
              handlers={fieldHandlers}
              t={t}
            />
          </fieldset>
        </section>

        <section className={sectionClassName("integrations")}>
          <CK_stp_brand_fieldHeader
            title="Integrations"
            {...editableHeaderProps("integrations")}
          />
          <fieldset
            className="cK_setup_brands_viewOne__sectionBody"
            disabled={!isSectionOpen("integrations") || isSaving}>
            <CK_stp_brand_fld_integrations
              states={fieldStates}
              handlers={fieldHandlers}
              t={t}
            />
          </fieldset>
        </section>

        <section className={sectionClassName("siblings")}>
          <CK_stp_brand_fieldHeader
            title="Siblings"
            {...editableHeaderProps("siblings")}
          />
          <fieldset
            className="cK_setup_brands_viewOne__sectionBody"
            disabled={!isSectionOpen("siblings") || isSaving}>
            <CK_stp_brand_fld_siblings
              states={fieldStates}
              handlers={fieldHandlers}
              t={t}
            />
          </fieldset>
        </section>

        <section className="cK_setup_brands_viewOne__section cK_setup_brands_viewOne__section--readOnly">
          <CK_stp_brand_fieldHeader
            title="Cuisine tags"
            rightChild={
              <CK_stp_brand_fld_cuisineTagsHeaderAside
                {...cuisineTagsField.headerAsideProps}
              />
            }
          />
          <fieldset className="cK_setup_brands_viewOne__sectionBody" disabled>
            <CK_stp_brand_fld_cuisineTags
              states={fieldStates}
              handlers={fieldHandlers}
              t={t}
            />
          </fieldset>
        </section>

        <section className="cK_setup_brands_viewOne__section cK_setup_brands_viewOne__section--readOnly">
          <CK_stp_brand_fieldHeader title="Contracts" />
          <fieldset className="cK_setup_brands_viewOne__sectionBody" disabled>
            <CK_stp_brand_fld_contracts
              states={fieldStates}
              handlers={fieldHandlers}
              t={t}
            />
          </fieldset>
        </section>

        <section className="cK_setup_brands_viewOne__section cK_setup_brands_viewOne__section--readOnly">
          <CK_stp_brand_fieldHeader title="Employees" />
          <fieldset className="cK_setup_brands_viewOne__sectionBody" disabled>
            <CK_stp_brand_fld_employees
              states={fieldStates}
              handlers={fieldHandlers}
              t={t}
            />
          </fieldset>
        </section>

        <section className="cK_setup_brands_viewOne__section cK_setup_brands_viewOne__section--readOnly">
          <CK_stp_brand_fieldHeader title="Equipments" />
          <fieldset className="cK_setup_brands_viewOne__sectionBody" disabled>
            <CK_stp_brand_fld_equipments
              states={fieldStates}
              handlers={fieldHandlers}
              t={t}
            />
          </fieldset>
        </section>

        <section className="cK_setup_brands_viewOne__section cK_setup_brands_viewOne__section--readOnly">
          <CK_stp_brand_fieldHeader title="Branches" />
          <fieldset className="cK_setup_brands_viewOne__sectionBody" disabled>
            <CK_stp_brand_fld_branches
              states={fieldStates}
              handlers={fieldHandlers}
              t={t}
            />
          </fieldset>
        </section>

        <section className="cK_setup_brands_viewOne__section cK_setup_brands_viewOne__section--readOnly">
          <CK_stp_brand_fieldHeader title="Menus" />
          <fieldset className="cK_setup_brands_viewOne__sectionBody" disabled>
            <CK_stp_brand_fld_menus
              states={fieldStates}
              handlers={fieldHandlers}
              t={t}
            />
          </fieldset>
        </section>

        <section className="cK_setup_brands_viewOne__section cK_setup_brands_viewOne__section--readOnly">
          <CK_stp_brand_fieldHeader title="Competitors" />
          <fieldset className="cK_setup_brands_viewOne__sectionBody" disabled>
            <CK_stp_brand_fld_competitors
              states={fieldStates}
              handlers={fieldHandlers}
              t={t}
            />
          </fieldset>
        </section>
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

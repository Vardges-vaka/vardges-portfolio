import { Modal } from "../../../../../../../01_components/_components.index.js";
import CK_stp_brand_fieldHeader from "../cK_setup_session_brands/ck_setup_brand_fields/CK_stp_brand_fieldHeader.jsx";
import "../../_styles/cK_setup_session_brands/cK_setup_brands_viewOne.css";

const getSectionEditState = (
  fieldKey,
  { detailMode, editingField, isSaving },
) => {
  const isThisFieldEditing = editingField === fieldKey;
  const isGlobalEdit = detailMode === "editAll";
  const isEditable = isGlobalEdit || isThisFieldEditing;

  return {
    className: [
      "cK_setup_brands_viewOne__section",
      isEditable && "cK_setup_brands_viewOne__section--editable",
      isThisFieldEditing && "cK_setup_brands_viewOne__section--fieldEdit",
    ]
      .filter(Boolean)
      .join(" "),
    fieldsetDisabled: !isEditable || isSaving,
    showFieldUpdateBtn:
      detailMode === "read" && !editingField && !isSaving,
    showFieldConfirmCancel: isThisFieldEditing && !isSaving,
  };
};

const CK_setup_entity_viewOne = ({
  states,
  handlers,
  fieldLabels,
  detailSections,
  titleFallback = "Item",
}) => {
  const {
    draft,
    detailMode,
    editingField,
    confirmUpdateModalOpen,
    confirmUpdateFieldKeys,
    isSaving,
  } = states;

  const fieldStates = { values: draft };
  const fieldHandlers = { onChange: handlers.onDraftChange };

  const editCtx = { detailMode, editingField, isSaving };

  const showPageUpdate = detailMode === "read" && !editingField && !isSaving;
  const showPageConfirmCancel = detailMode === "editAll" && !isSaving;
  const pageUpdateDisabled = Boolean(editingField) || isSaving;

  const confirmLabels = confirmUpdateFieldKeys.map(
    (key) => fieldLabels[key] || key,
  );

  const editableHeaderProps = (fieldKey, edit) => ({
    showUpdate: edit.showFieldUpdateBtn,
    showConfirmCancel: edit.showFieldConfirmCancel,
    onUpdate: () => handlers.onFieldUpdate(fieldKey),
    onCancel: handlers.onFieldCancel,
    onConfirm: handlers.onFieldConfirm,
    isSaving,
  });

  const renderDetailSection = ({ key, Component }) => {
    const edit = getSectionEditState(key, editCtx);

    return (
      <section key={key} className={edit.className}>
        <CK_stp_brand_fieldHeader
          title={fieldLabels[key]}
          {...editableHeaderProps(key, edit)}
        />
        <fieldset
          className="cK_setup_brands_viewOne__sectionBody"
          disabled={edit.fieldsetDisabled}>
          <Component states={fieldStates} handlers={fieldHandlers} />
        </fieldset>
      </section>
    );
  };

  const halfSections = detailSections.filter((s) => s.layout === "half");
  const fullSections = detailSections.filter((s) => s.layout !== "half");

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
            {handlers.itemDisplayName?.() || titleFallback}
          </h2>
        </div>
        <div className="cK_setup_brands_viewOne__headerActions">
          {showPageUpdate ? (
            <button
              type="button"
              className="cK_setup_brands_viewOne__btn cK_setup_brands_viewOne__btn_primary"
              onClick={handlers.onGlobalUpdate}
              disabled={pageUpdateDisabled}>
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
        {halfSections.length ? (
          <div className="cK_setup_brands_viewOne__row">
            {halfSections.map(renderDetailSection)}
          </div>
        ) : null}
        {fullSections.map(renderDetailSection)}
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
            {confirmLabels.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        </div>
      </Modal>
    </div>
  );
};

export default CK_setup_entity_viewOne;

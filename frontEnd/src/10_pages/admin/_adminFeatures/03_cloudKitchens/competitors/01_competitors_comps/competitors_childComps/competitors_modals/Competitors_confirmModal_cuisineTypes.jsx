import { ConfirmModal } from "../../../../../../../../01_components/components.index.js";

import "../../../_styles/competitors_modals/competitors_confirmModal_cusineTypes.css";

const Competitors_confirmModal_cuisineTypes = ({ states, handlers }) => {
  const {
    isOpen,
    confirmTitle,
    confirmHint,
    catalogTagsLabel,
    legacyTagsLabel,
    selectionHeading,
    catalogCount,
    legacyCount,
    selectedSummary,
    isConfirmDisabled,
    cancelLabel,
    confirmLabel,
  } = states;

  const body = (
    <div className="competitorsConfirmModal_cuisineTypes">
      <p className="confirmModal_hint">{confirmHint}</p>
      <div className="confirmModal_detailList">
        <div className="confirmModal_detailRow">
          <strong>{selectionHeading}</strong>
          <span>{selectedSummary}</span>
        </div>
        <div className="confirmModal_detailRow">
          <strong>{catalogTagsLabel}</strong>
          <span>{String(catalogCount)}</span>
        </div>
        <div className="confirmModal_detailRow">
          <strong>{legacyTagsLabel}</strong>
          <span>{String(legacyCount)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <ConfirmModal
      isOpen={isOpen}
      title={confirmTitle}
      danger={false}
      confirmDisabled={isConfirmDisabled}
      cancelLabel={cancelLabel}
      confirmLabel={confirmLabel}
      onConfirm={handlers.onConfirm}
      onCancel={handlers.onCancel}>
      {body}
    </ConfirmModal>
  );
};

export default Competitors_confirmModal_cuisineTypes;

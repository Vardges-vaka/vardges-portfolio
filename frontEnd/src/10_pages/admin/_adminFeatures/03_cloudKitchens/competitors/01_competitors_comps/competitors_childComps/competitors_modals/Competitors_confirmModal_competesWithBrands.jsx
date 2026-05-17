import { ConfirmModal } from "../../../../../../../../01_components/components.index.js";

import "../../../_styles/competitors_modals/competitors_confirmModal_competesWithBrands.css";

const Competitors_confirmModal_competesWithBrands = ({ states, handlers }) => {
  const {
    isOpen,
    confirmTitle,
    confirmHint,
    linksHeading,
    linkedCount,
    linkedNames,
    countLabel,
    isConfirmDisabled,
    cancelLabel,
    confirmLabel,
  } = states;

  const body = (
    <div className="competitorsConfirmModal_competesWithBrands">
      <p className="confirmModal_hint">{confirmHint}</p>
      <div className="confirmModal_detailList">
        <div className="confirmModal_detailRow">
          <strong>{countLabel}</strong>
          <span>{String(linkedCount)}</span>
        </div>
        <div className="confirmModal_detailRow">
          <strong>{linksHeading}</strong>
          <span className="competitorsConfirmModal_competesWithBrands_names">
            {linkedNames}
          </span>
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

export default Competitors_confirmModal_competesWithBrands;

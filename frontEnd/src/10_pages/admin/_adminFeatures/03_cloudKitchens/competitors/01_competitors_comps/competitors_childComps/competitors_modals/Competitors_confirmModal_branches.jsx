import { ConfirmModal } from "../../../../../../../../01_components/components.index.js";

import "../../../_styles/competitors_modals/competitors_confirmModal_branches.css";

const Competitors_confirmModal_branches = ({ states, handlers }) => {
  const {
    isOpen,
    confirmTitle,
    confirmHint,
    branchLabel,
    branchLine,
    cancelLabel,
    confirmLabel,
    isConfirmDisabled,
  } = states;

  const body = (
    <div className="competitorsConfirmModal_branches">
      <p className="confirmModal_hint">{confirmHint}</p>
      <div className="confirmModal_detailList">
        <div className="confirmModal_detailRow">
          <strong>{branchLabel}</strong>
          <span>{branchLine}</span>
        </div>
      </div>
    </div>
  );

  return (
    <ConfirmModal
      isOpen={isOpen}
      title={confirmTitle}
      danger
      confirmDisabled={isConfirmDisabled}
      cancelLabel={cancelLabel}
      confirmLabel={confirmLabel}
      onConfirm={handlers.onConfirm}
      onCancel={handlers.onCancel}>
      {body}
    </ConfirmModal>
  );
};

export default Competitors_confirmModal_branches;

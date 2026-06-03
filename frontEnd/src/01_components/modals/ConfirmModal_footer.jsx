import "../_styles/modals/confirmModal_footer.css";

const ConfirmModal_footer = ({
  danger,
  confirmDisabled,
  cancelLabel,
  confirmLabel,
  onConfirm,
  onCancel,
  cancelOperation,
  confirmOperation,
}) => {
  return (
    <div className="confirmModal_footer">
      <button
        type="button"
        className="confirmModal_btn confirmModal_btnSecondary"
        data-operation={cancelOperation}
        onClick={onCancel}>
        {cancelLabel}
      </button>
      <button
        type="button"
        className={
          "confirmModal_btn confirmModal_btnPrimary" +
          (danger ? " confirmModal_btnPrimaryDanger" : "")
        }
        onClick={onConfirm}
        data-operation={confirmOperation}
        disabled={confirmDisabled}>
        {confirmLabel}
      </button>
    </div>
  );
};

export default ConfirmModal_footer;

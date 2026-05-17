import "../_styles/modals/confirmModal_footer.css";

const ConfirmModal_footer = ({
  danger,
  confirmDisabled,
  cancelLabel,
  confirmLabel,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="confirmModal_footer">
      <button
        type="button"
        className="confirmModal_btn confirmModal_btnSecondary"
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
        disabled={confirmDisabled}>
        {confirmLabel}
      </button>
    </div>
  );
};

export default ConfirmModal_footer;

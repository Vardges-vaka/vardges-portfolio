import PropTypes from "prop-types";
import "../_styles/modals/modal_footer.css";

const Modal_footer = ({
  onConfirm,
  onCancel,
  labels = {},
  states = {},
  danger = false,
  formId,
}) => {
  const cancelLabel = labels.cancelLabel ?? "Cancel";
  const confirmLabel = labels.confirmLabel ?? "Confirm";
  const confirmBtnTitle = labels.confirmBtnTitle ?? confirmLabel;
  const cancelBtnTitle = labels.cancelBtnTitle ?? cancelLabel;
  const isConfirmDisabled = states.isConfirmDisabled ?? false;
  const isCancelDisabled = states.isCancelDisabled ?? false;

  const { cntClassName, cancelBtnClassName, confirmBtnClassName } = labels;

  const classnames = {
    cnt: `modal_footer${cntClassName ? ` ${cntClassName}` : ""}`,
    cancelBtn: `modal_footer_btn modal_footer_btnSecondary${
      cancelBtnClassName ? ` ${cancelBtnClassName}` : ""
    }`,
    confirmBtn: `modal_footer_btn modal_footer_btnPrimary${
      danger ? " modal_footer_btnPrimaryDanger" : ""
    }${confirmBtnClassName ? ` ${confirmBtnClassName}` : ""}`,
  };

  const confirmUsesForm = Boolean(formId);

  return (
    <footer className={classnames.cnt}>
      <button
        type="button"
        className={classnames.cancelBtn}
        onClick={onCancel}
        title={cancelBtnTitle}
        disabled={isCancelDisabled}>
        {cancelLabel}
      </button>
      <button
        type={confirmUsesForm ? "submit" : "button"}
        form={confirmUsesForm ? formId : undefined}
        className={classnames.confirmBtn}
        onClick={confirmUsesForm ? undefined : onConfirm}
        title={confirmBtnTitle}
        disabled={isConfirmDisabled}>
        {confirmLabel}
      </button>
    </footer>
  );
};

Modal_footer.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  labels: PropTypes.shape({
    cancelLabel: PropTypes.string,
    confirmLabel: PropTypes.string,
    confirmBtnTitle: PropTypes.string,
    cancelBtnTitle: PropTypes.string,
    cntClassName: PropTypes.string,
    cancelBtnClassName: PropTypes.string,
    confirmBtnClassName: PropTypes.string,
  }),
  states: PropTypes.shape({
    isConfirmDisabled: PropTypes.bool,
    isCancelDisabled: PropTypes.bool,
  }),
  danger: PropTypes.bool,
  formId: PropTypes.string,
};

Modal_footer.displayName = "Modal_footer";

export default Modal_footer;

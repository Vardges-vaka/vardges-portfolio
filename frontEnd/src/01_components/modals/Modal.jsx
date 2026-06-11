import { useId, useEffect } from "react";
import PropTypes from "prop-types";
import Modal_header from "./Modal_header";
import Modal_footer from "./Modal_footer";
import "../_styles/modals/modal.css";

/**
 * Generic modal shell — backdrop, branded header, body slot, optional footer.
 * Parent owns open state and all handlers (same contract as ConfirmModal).
 *
 * Pass `formId` when the body is a <form> and the confirm button must submit it
 * (Enter in fields + footer submit both route through the form's onSubmit).
 *
 * @param {boolean} [isOpen=false]
 * @param {import("react").ReactNode} [title]
 * @param {import("react").ReactNode} children — body content
 * @param {() => void} onCancel — backdrop, Escape, X, and cancel button
 * @param {() => void} [onConfirm] — confirm handler (required when withFooter)
 * @param {boolean} [withFooter=false] — render cancel / confirm footer
 * @param {boolean} [closeOnBackdropClick=true]
 * @param {boolean} [danger=false] — destructive confirm styling
 * @param {string} [formId] — associates footer confirm with an external form
 * @param {string} [dialogClassName] — extra class on the panel (e.g. form variant)
 * @param {object} [footerLabels]
 * @param {object} [footerStates]
 */
const Modal = ({
  isOpen = false,
  title,
  children,
  onCancel,
  onConfirm,
  withFooter = false,
  closeOnBackdropClick = true,
  danger = false,
  formId,
  dialogClassName,
  footerLabels = {},
  footerStates = {},
}) => {
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onCancel?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const handleBackdropMouseDown = (e) => {
    if (!closeOnBackdropClick) return;
    if (e.target === e.currentTarget) onCancel?.();
  };

  const stopPanelBubble = (e) => e.stopPropagation();

  return (
    <div
      className="modal"
      role="presentation"
      onMouseDown={handleBackdropMouseDown}>
      <div
        className={`modal_dialog${dialogClassName ? ` ${dialogClassName}` : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        onMouseDown={stopPanelBubble}>
        <Modal_header title={title} titleId={titleId} onClose={onCancel} />

        <div className="modal_body">{children}</div>

        {withFooter ? (
          <Modal_footer
            onConfirm={onConfirm}
            onCancel={onCancel}
            labels={footerLabels}
            states={footerStates}
            danger={danger}
            formId={formId}
          />
        ) : null}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.node,
  children: PropTypes.node.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  withFooter: PropTypes.bool,
  closeOnBackdropClick: PropTypes.bool,
  danger: PropTypes.bool,
  formId: PropTypes.string,
  dialogClassName: PropTypes.string,
  footerLabels: PropTypes.shape({
    cancelLabel: PropTypes.string,
    confirmLabel: PropTypes.string,
    confirmBtnTitle: PropTypes.string,
    cancelBtnTitle: PropTypes.string,
    cntClassName: PropTypes.string,
    cancelBtnClassName: PropTypes.string,
    confirmBtnClassName: PropTypes.string,
  }),
  footerStates: PropTypes.shape({
    isConfirmDisabled: PropTypes.bool,
    isCancelDisabled: PropTypes.bool,
  }),
};

Modal.displayName = "Modal";

export default Modal;

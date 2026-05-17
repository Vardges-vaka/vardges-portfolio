import { useId, useEffect } from "react";
import ConfirmModal_header from "./ConfirmModal_header.jsx";
import ConfirmModal_footer from "./ConfirmModal_footer.jsx";
import "../_styles/modals/confirmModal.css";

/**
 * Stateless confirmation dialog. Parent owns open state and all copy.
 *
 * @param {boolean} isOpen
 * @param {import("react").ReactNode} title
 * @param {import("react").ReactNode} [children] — body (hint, lists, warnings)
 * @param {boolean} [danger] — destructive / high-attention confirm styling
 * @param {boolean} [confirmDisabled]
 * @param {string} [cancelLabel]
 * @param {string} [confirmLabel]
 * @param {() => void} onConfirm
 * @param {() => void} onCancel
 * @param {boolean} [closeOnBackdropClick=true]
 */
const ConfirmModal = ({
  isOpen,
  title,
  children,
  danger = false,
  confirmDisabled = false,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  onConfirm,
  onCancel,
  closeOnBackdropClick = true,
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

  const stopPanelBubble = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="confirmModal"
      role="presentation"
      onMouseDown={handleBackdropMouseDown}>
      <div
        className="confirmModal_dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={stopPanelBubble}>
        <ConfirmModal_header title={title} titleId={titleId} danger={danger} />
        {children != null && children !== false ? (
          <div className="confirmModal_body">{children}</div>
        ) : null}
        <ConfirmModal_footer
          danger={danger}
          confirmDisabled={confirmDisabled}
          cancelLabel={cancelLabel}
          confirmLabel={confirmLabel}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
};

export default ConfirmModal;

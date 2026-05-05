import "../_styles/cloudStorage_confirmModal.css";

const CloudStorage_confirmModal = ({ states, handlers }) => {
  if (!states.isOpen) return null;

  return (
    <div
      className={`modal-overlay${states.isOpen ? " open" : ""}`}
      onClick={(e) => e.target === e.currentTarget && handlers.onCancel()}>
      <div className="modal-box">
        <div className="modal-title">{states.title}</div>
        <div
          className="modal-body"
          dangerouslySetInnerHTML={{ __html: states.body }}
        />
        <div className="modal-actions">
          <button className="btn-modal-cancel" onClick={handlers.onCancel}>
            Cancel
          </button>
          <button
            className={`btn-modal-confirm${states.isDanger ? " danger" : ""}`}
            onClick={handlers.onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default CloudStorage_confirmModal;

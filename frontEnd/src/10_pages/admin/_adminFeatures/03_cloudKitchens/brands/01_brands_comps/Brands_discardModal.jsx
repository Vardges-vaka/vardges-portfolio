import "../_styles/brands_modal.css";

const Brands_discardModal = ({ isOpen, onConfirm, onCancel, t }) => {
  if (!isOpen) return null;

  return (
    <div className="brandsModal" role="dialog" aria-modal="true">
      <div className="brandsModal_panel">
        <h2 className="brandsModal_title">{t("discardTitle")}</h2>
        <p className="brandsModal_hint">{t("discardHint")}</p>
        <div className="brandsModal_actions">
          <button type="button" className="brandsModal_btn" onClick={onCancel}>
            {t("actions.keepEditing")}
          </button>
          <button
            type="button"
            className="brandsModal_btn brandsModal_btn--danger"
            onClick={onConfirm}>
            {t("actions.discard")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Brands_discardModal;

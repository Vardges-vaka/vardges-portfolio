import PropTypes from "prop-types";
import MainLogo from "../Logo";
import "../_styles/modals/modal_header.css";

const Modal_header = ({ title, titleId, onClose }) => {
  return (
    <header className="modal_header">
      <div className="modal_header_aside">
        <MainLogo />
      </div>

      {title ? (
        <h2 id={titleId} className="modal_header_title">
          {title}
        </h2>
      ) : (
        <div className="modal_header_titleSpacer" aria-hidden="true" />
      )}

      <div className="modal_header_aside modal_header_asideEnd">
        <button
          type="button"
          className="modal_header_closeBtn"
          onClick={onClose}
          aria-label="Close">
          ×
        </button>
      </div>
    </header>
  );
};

Modal_header.propTypes = {
  title: PropTypes.node,
  titleId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

Modal_header.displayName = "Modal_header";

export default Modal_header;

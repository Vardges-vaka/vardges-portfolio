import "../_styles/modals/confirmModal_header.css";

const ConfirmModal_header = ({ title, titleId, danger }) => {
  return (
    <div className="confirmModal_header">
      <h2
        id={titleId}
        className={
          "confirmModal_title" +
          (danger ? " confirmModal_title_danger" : "")
        }>
        {title}
      </h2>
    </div>
  );
};

export default ConfirmModal_header;

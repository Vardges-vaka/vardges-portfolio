import "../../_styles/menus_childComps/menus_FieldUpdateBtn.css";

const Menus_FieldUpdateBtn = ({
  viewType,
  isUpdating,
  initiateFieldUpdate,
  onCancel,
  onConfirm,
  t,
}) => {
  if (viewType !== "single" || isUpdating === undefined) return null;

  return (
    <>
      <div className="menus_FieldUpdateBtn">
        {!isUpdating ? (
          <button
            className="menus_FieldUpdateBtn_btn"
            onClick={initiateFieldUpdate}>
            Update
          </button>
        ) : (
          <>
            <button
              className="menus_FieldUpdateBtn_btn"
              onClick={onCancel}
              // data-field={session}
              // data-owner_type={ownerType}
            >
              Cancel
            </button>
            <button className="menus_FieldUpdateBtn_btn" onClick={onConfirm}>
              Confirm
            </button>
          </>
        )}{" "}
      </div>
    </>
  );
};

export default Menus_FieldUpdateBtn;

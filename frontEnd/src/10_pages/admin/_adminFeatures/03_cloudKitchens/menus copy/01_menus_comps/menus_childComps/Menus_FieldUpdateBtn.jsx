import "../../_styles/menus_childComps/menus_FieldUpdateBtn.css";

/* ============================================================================
   Menus_FieldUpdateBtn — top-level Update / Cancel + Confirm pair.

   Lives in the sessionToggle right slot when the user is in view_one.
   - viewType !== "single" → renders nothing
   - isUpdating === false  → "Update all" (initiates document-wide edit)
   - isUpdating === true   → "Cancel"   /   "Confirm"
       Confirm POPS THE DOUBLE-CONFIRM MODAL via onConfirm (the host wires
       Menus_confirmModal_fieldUpdate to show "are you sure?").
============================================================================ */

const Menus_FieldUpdateBtn = ({
  viewType,
  isUpdating,
  initiateFieldUpdate,
  onCancel,
  onConfirm,
}) => {
  if (viewType !== "single" || isUpdating === undefined) return null;

  return (
    <div className="menus_FieldUpdateBtn">
      {!isUpdating ? (
        <button
          type="button"
          className="menus_FieldUpdateBtn_btn"
          onClick={initiateFieldUpdate}>
          Update all
        </button>
      ) : (
        <>
          <button
            type="button"
            className="menus_FieldUpdateBtn_btn"
            onClick={onCancel}>
            Cancel
          </button>
          <button
            type="button"
            className="menus_FieldUpdateBtn_btn"
            onClick={onConfirm}>
            Confirm
          </button>
        </>
      )}
    </div>
  );
};

export default Menus_FieldUpdateBtn;

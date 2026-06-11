import { CK_setup_empty_brand } from "../cK_setup_states/_cK_setup_states.index";
import {
  CK_setup_brands_addForm,
  CK_setup_brands_add_full,
  CK_setup_brands_viewOne,
  CK_setup_brands_viewAll,
} from "../cK_setup_session_brands/_cK_setup_session_brands.index";
import "../../_styles/cK_setup_session_brands/cK_setup_brands.css";

const CK_setup_brand = ({ states, handlers, childProps, t }) => {
  const {
    stp_empty_brand_props,
    stp_brands_viewOne_props,
    stp_brands_viewAll_props,
    stp_brands_addForm_props,
    stp_brands_full_props,
  } = childProps;
  return (
    <div className="cK_setup_brand">
      {states.activeOperation === "adding" && (
        <CK_setup_brands_addForm
          states={stp_brands_addForm_props.states}
          handlers={stp_brands_addForm_props.handlers}
          childProps={stp_brands_addForm_props.childProps}
          t={stp_brands_addForm_props.t}
        />
      )}

      {states.activeOperation === "updating" && (
        <form
          className="cK_setup_brand_edit"
          onSubmit={(e) => {
            e.preventDefault();
            stp_brands_full_props.handlers.onSubmit?.();
          }}>
          <div className="cK_setup_brand_edit_bar">
            <h3 className="cK_setup_brand_edit_title">
              Continue building brand
            </h3>
            <div className="cK_setup_brand_edit_actions">
              <button
                type="button"
                className="cK_setup_brand_edit_btn cK_setup_brand_edit_btn_secondary"
                onClick={stp_brands_full_props.handlers.onCancel}>
                Cancel
              </button>
              <button
                type="submit"
                className="cK_setup_brand_edit_btn cK_setup_brand_edit_btn_primary">
                Save
              </button>
            </div>
          </div>
          <CK_setup_brands_add_full
            states={stp_brands_full_props.states}
            handlers={stp_brands_full_props.handlers}
            t={stp_brands_full_props.t}
          />
        </form>
      )}

      {states.activeOperation === "viewing" &&
        (states.brands.length === 0 ? (
          <CK_setup_empty_brand
            states={stp_empty_brand_props.states}
            handlers={stp_empty_brand_props.handlers}
            childProps={stp_empty_brand_props.childProps}
            t={stp_empty_brand_props.t}
          />
        ) : states.activeViewingType === "one" ? (
          <CK_setup_brands_viewOne
            states={stp_brands_viewOne_props.states}
            handlers={stp_brands_viewOne_props.handlers}
            childProps={stp_brands_viewOne_props.childProps}
            t={stp_brands_viewOne_props.t}
          />
        ) : (
          <CK_setup_brands_viewAll
            states={stp_brands_viewAll_props.states}
            handlers={stp_brands_viewAll_props.handlers}
            childProps={stp_brands_viewAll_props.childProps}
            t={stp_brands_viewAll_props.t}
          />
        ))}
    </div>
  );
};

export default CK_setup_brand;

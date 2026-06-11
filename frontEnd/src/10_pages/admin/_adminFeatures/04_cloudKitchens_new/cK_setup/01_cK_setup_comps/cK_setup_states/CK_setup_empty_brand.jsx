import { Brands_Icon } from "../../../../../../../01_components/_components.index.js";
import "../../_styles/cK_setup_states/cK_setup_empty_brand.css";

const CK_setup_empty_brand = ({ states, handlers, childProps, t }) => {
  return (
    <div className="cK_setup_empty cK_setup_empty_brand">
      <div className="cK_setup_empty_iconWrap">
        <img src={Brands_Icon()} alt="" className="cK_setup_empty_iconImg" />
      </div>
      <h2 className="cK_setup_empty_title">No brands yet</h2>
      <p className="cK_setup_empty_subtitle">
        Add your first brand to start building menus, branches, competitors and
        more.
      </p>
      <button className="cK_setup_empty_cta" onClick={handlers.handleAddnew}>
        <span className="cK_setup_empty_cta_plus">+</span> Add brand
      </button>
    </div>
  );
};

export default CK_setup_empty_brand;

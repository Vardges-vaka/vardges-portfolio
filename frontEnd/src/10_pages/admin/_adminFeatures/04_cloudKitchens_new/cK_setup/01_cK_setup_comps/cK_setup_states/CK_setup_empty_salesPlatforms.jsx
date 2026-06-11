import { SalesChannel_Icon } from "../../../../../../../01_components/_components.index.js";
import "../../_styles/cK_setup_states/cK_setup_empty_salesPlatforms.css";

const CK_setup_empty_salesPlatforms = ({ states, handlers, childProps, t }) => {
  return (
    <div className="cK_setup_empty cK_setup_empty_salesPlatforms">
      <div className="cK_setup_empty_iconWrap">
        <img
          src={SalesChannel_Icon()}
          alt=""
          className="cK_setup_empty_iconImg"
        />
      </div>
      <h2 className="cK_setup_empty_title">No sales platforms yet</h2>
      <p className="cK_setup_empty_subtitle">
        Add aggregators like Talabat, Careem, Noon or Deliveroo to sell through.
      </p>
      <button className="cK_setup_empty_cta" onClick={handlers.handleAddnew}>
        <span className="cK_setup_empty_cta_plus">+</span> Add sales platform
      </button>
    </div>
  );
};

export default CK_setup_empty_salesPlatforms;

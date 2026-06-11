import { Files_Icon } from "../../../../../../../01_components/_components.index.js";
import "../../_styles/cK_setup_states/cK_setup_empty_contracts.css";

const CK_setup_empty_contracts = ({ states, handlers, childProps, t }) => {
  return (
    <div className="cK_setup_empty cK_setup_empty_contracts">
      <div className="cK_setup_empty_iconWrap">
        <img src={Files_Icon()} alt="" className="cK_setup_empty_iconImg" />
      </div>
      <h2 className="cK_setup_empty_title">No contracts yet</h2>
      <p className="cK_setup_empty_subtitle">
        Track agreements, leases, commissions and renewals in one place.
      </p>
      <button className="cK_setup_empty_cta" onClick={handlers.handleAddnew}>
        <span className="cK_setup_empty_cta_plus">+</span> Add contract
      </button>
    </div>
  );
};

export default CK_setup_empty_contracts;

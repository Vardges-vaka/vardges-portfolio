import { Dashboard_Icon } from "../../../../../../../01_components/_components.index.js";
import "../../_styles/cK_setup_states/cK_setup_empty_channels.css";

const CK_setup_empty_channels = ({ states, handlers, childProps, t }) => {
  return (
    <div className="cK_setup_empty cK_setup_empty_channels">
      <div className="cK_setup_empty_iconWrap">
        <img src={Dashboard_Icon()} alt="" className="cK_setup_empty_iconImg" />
      </div>
      <h2 className="cK_setup_empty_title">No channels yet</h2>
      <p className="cK_setup_empty_subtitle">
        Connect a brand and branch to a platform to create a sales channel.
      </p>
      <button className="cK_setup_empty_cta" onClick={handlers.handleAddnew}>
        <span className="cK_setup_empty_cta_plus">+</span> Add channel
      </button>
    </div>
  );
};

export default CK_setup_empty_channels;

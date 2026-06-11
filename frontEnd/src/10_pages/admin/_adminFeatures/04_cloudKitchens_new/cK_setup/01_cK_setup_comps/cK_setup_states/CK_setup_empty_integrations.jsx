import { Operations_Icon } from "../../../../../../../01_components/_components.index.js";
import "../../_styles/cK_setup_states/cK_setup_empty_integrations.css";

const CK_setup_empty_integrations = ({ states, handlers, childProps, t }) => {
  return (
    <div className="cK_setup_empty cK_setup_empty_integrations">
      <div className="cK_setup_empty_iconWrap">
        <img src={Operations_Icon()} alt="" className="cK_setup_empty_iconImg" />
      </div>
      <h2 className="cK_setup_empty_title">No integrations yet</h2>
      <p className="cK_setup_empty_subtitle">
        Add providers like Supy, Sapaad, GrabTech or UrbanPiper to sync data.
      </p>
      <button className="cK_setup_empty_cta" onClick={handlers.handleAddnew}>
        <span className="cK_setup_empty_cta_plus">+</span> Add integration
      </button>
    </div>
  );
};

export default CK_setup_empty_integrations;

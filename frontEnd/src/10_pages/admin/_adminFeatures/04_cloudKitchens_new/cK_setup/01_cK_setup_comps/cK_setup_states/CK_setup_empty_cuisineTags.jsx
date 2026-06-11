import { Tags_Icon } from "../../../../../../../01_components/_components.index.js";
import "../../_styles/cK_setup_states/cK_setup_empty_cuisineTags.css";

const CK_setup_empty_cuisineTags = ({ states, handlers, childProps, t }) => {
  return (
    <div className="cK_setup_empty cK_setup_empty_cuisineTags">
      <div className="cK_setup_empty_iconWrap">
        <img src={Tags_Icon()} alt="" className="cK_setup_empty_iconImg" />
      </div>
      <h2 className="cK_setup_empty_title">No cuisine tags yet</h2>
      <p className="cK_setup_empty_subtitle">
        Create tags to classify your brands and competitors by cuisine.
      </p>
      <button className="cK_setup_empty_cta" onClick={handlers.handleAddnew}>
        <span className="cK_setup_empty_cta_plus">+</span> Add cuisine tag
      </button>
    </div>
  );
};

export default CK_setup_empty_cuisineTags;

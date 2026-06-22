import CK_setup_entity_viewAll from "../cK_setup_shared/CK_setup_entity_viewAll.jsx";
import "../../_styles/cK_setup_session_salesPlatforms/cK_setup_salesPlatforms_viewAll.css";

const CK_setup_salesPlatforms_viewAll = ({ states, handlers }) => (
  <CK_setup_entity_viewAll
    items={states.salesPlatforms ?? []}
    getItemName={(item) => item.name || "Untitled platform"}
    getItemMeta={(item) => item.notes || "No notes"}
    handlers={handlers}
    states={states}
    listClassName="cK_setup_salesPlatforms_viewAll cK_setup_brands_viewAll"
  />
);

export default CK_setup_salesPlatforms_viewAll;

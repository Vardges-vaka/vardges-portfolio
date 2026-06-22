import CK_setup_entity_viewAll from "../cK_setup_shared/CK_setup_entity_viewAll.jsx";
import "../../_styles/cK_setup_session_integrations/cK_setup_integrations_viewAll.css";

const CK_setup_integrations_viewAll = ({ states, handlers }) => (
  <CK_setup_entity_viewAll
    items={states.integrations ?? []}
    getItemName={(item) => item.provider || "Untitled integration"}
    getItemMeta={(item) =>
      [item.kind, item.accountLabel].filter(Boolean).join(" · ") || "No details"
    }
    handlers={handlers}
    states={states}
    listClassName="cK_setup_integrations_viewAll cK_setup_brands_viewAll"
  />
);

export default CK_setup_integrations_viewAll;

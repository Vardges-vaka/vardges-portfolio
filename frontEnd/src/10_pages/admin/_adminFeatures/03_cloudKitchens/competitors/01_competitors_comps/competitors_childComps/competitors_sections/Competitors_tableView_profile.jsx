import { useCompetitors_sessions_profile } from "../../../03_competitors_hooks/_competitors_hooks.index.js";
import { Competitors_confirmModal_profile } from "../competitors_modals/_competitors_modals.index.js";
import {
  Competitors_tableView_name,
  Competitors_tableView_logo,
} from "./competitors_tableView_profile/_competitors_tableView_profile.index.js";

import "../../../_styles/competitors_tableView_profile.css";

const Competitors_tableView_profile = ({ states, handlers, t }) => {
  const { profileStates, profileCompProps } = useCompetitors_sessions_profile({
    states,
    handlers,
    t,
  });

  const {
    Competitors_tableView_name_props,
    Competitors_tableView_logo_props,
    Competitors_confirmModal_profile_props,
  } = profileCompProps;

  if (!profileStates.competitor) {
    return (
      <div className="Competitors_tableView_profile">
        <h2 className="Competitors_tableView_profile_title">
          {profileStates.title}
        </h2>
        <p className="Competitors_tableView_profile_hint">
          {profileStates.noSelection}
        </p>
      </div>
    );
  }

  return (
    <div className="Competitors_tableView_profile">
      <div className="Competitors_tableView_profile_header">
        <div className="Competitors_tableView_profile_headerLeft">
          <h2 className="Competitors_tableView_profile_title">
            {profileStates.title}
          </h2>
          <p className="Competitors_tableView_profile_subTitle">
            {profileStates.competitor?.name || "—"}
          </p>
        </div>
      </div>

      <div className="Competitors_tableView_profile_viewHero">
        <Competitors_tableView_logo
          states={Competitors_tableView_logo_props.states}
          handlers={Competitors_tableView_logo_props.handlers}
          t={t}
        />
        <Competitors_tableView_name
          states={Competitors_tableView_name_props.states}
          handlers={Competitors_tableView_name_props.handlers}
          t={t}
        />
      </div>
      <Competitors_confirmModal_profile
        states={Competitors_confirmModal_profile_props.states}
        handlers={Competitors_confirmModal_profile_props.handlers}
        t={t}
      />
    </div>
  );
};

export default Competitors_tableView_profile;

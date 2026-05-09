import { useCompetitors } from "./03_competitors_hooks/_competitors_hooks.index.js";
import {
  Competitors_tableView,
  Competitors_viewToggle,
  Competitors_header,
  Competitors_mapView,
  Competitors_sessionSwitch,
} from "./01_competitors_comps/_competitors_comps.index.js";
import { VALID_VIEW_SESSIONS } from "./05_competitors_cnst/_competitors_cnst.index.js";
import "./_styles/competitors.css";

const Competitors = () => {
  const { states, handlers, compProps, t } = useCompetitors();
  const {
    Competitors_tableView_props,
    Competitors_viewToggle_props,
    Competitors_header_props,
    Competitors_mapView_props,
    currentSession_props,
  } = compProps;

  //   temp
  const renderSessionComponent = () => {
    return (
      <Competitors_sessionSwitch
        states={currentSession_props?.states}
        handlers={currentSession_props?.handlers}
        compProps={currentSession_props?.compProps}
        t={currentSession_props?.t}
        session={states.session}
        temporaryTestingHandler={handlers.temp}
      />
    );
  };
  return (
    <div className="competitors">
      <Competitors_header
        states={Competitors_header_props.states}
        handlers={Competitors_header_props.handlers}
        compProps={Competitors_header_props.compProps}
        t={Competitors_header_props.t}
      />
      {states.session !== "view_competitors_map" && (
        <Competitors_tableView
          states={Competitors_tableView_props.states}
          handlers={Competitors_tableView_props.handlers}
          compProps={Competitors_tableView_props.compProps}
          t={Competitors_tableView_props.t}
        />
      )}
      {states.session === "view_competitors_map" && (
        <Competitors_mapView
          states={Competitors_mapView_props.states}
          handlers={Competitors_mapView_props.handlers}
          compProps={Competitors_mapView_props.compProps}
          t={Competitors_mapView_props.t}
        />
      )}
      {VALID_VIEW_SESSIONS.includes(states.session) && renderSessionComponent()}
    </div>
  );
};

export default Competitors;

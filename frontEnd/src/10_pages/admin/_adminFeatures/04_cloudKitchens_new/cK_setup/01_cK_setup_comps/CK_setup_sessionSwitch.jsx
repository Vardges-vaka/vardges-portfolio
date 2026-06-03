import {
  CK_setup_brands,
  CK_setup_cuisineTags,
  CK_setup_salesPlatforms,
  CK_setup_channels,
} from "./cK_setup_sessions/_cK_setup_sessions.index";
import "../_styles/cK_setup_sessionSwitch.css";

const getSessionComponent = (session) => {
  switch (session) {
    case "brands":
      return CK_setup_brands;
    case "cuisineTags":
      return CK_setup_cuisineTags;
    case "salesPlatforms":
      return CK_setup_salesPlatforms;
    case "channels":
      return CK_setup_channels;
    default:
      return CK_setup_brands;
  }
};

const CK_setup_sessionSwitch = ({ states, handlers, childProps, t }) => {
  const renderSession = () => {
    const props = childProps[states.activeSession];
    const SessionComponent = getSessionComponent(states.activeSession);
    return (
      <SessionComponent
        states={props.states}
        handlers={props.handlers}
        childProps={props.childProps}
        t={props.t}
      />
    );
  };
  return <div className="cK_setup_sessionSwitch">{renderSession()}</div>;
};

export default CK_setup_sessionSwitch;

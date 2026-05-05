import { IconChevronDown } from "../../_CloudStorage_comps.index.js";
import {
  Up_icon,
  Down_icon,
} from "../../../../../../../../01_components/components.index.js";

import "../../../_styles/CloudStorage_providerRow_expand.css";

const CloudStorage_providerRow_expand = ({ monitorOpen, onToggleMonitor }) => {
  const renderIcon = () => {
    const Icon = monitorOpen ? Up_icon() : Down_icon();
    const classNames = `expand_icon${monitorOpen ? " open" : ""}`;
    return <img src={Icon} alt="Expand" className={classNames} />;
  };
  return (
    <button
      className={`expand-btn${monitorOpen ? " open" : ""}`}
      onClick={onToggleMonitor}
      title="Monitor">
      {/* <IconChevronDown size={24} /> */}
      {renderIcon()}
    </button>
  );
};

export default CloudStorage_providerRow_expand;

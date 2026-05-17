import { useC_T_branches } from "../../../03_competitors_hooks/_competitors_hooks.index.js";
import { Competitors_confirmModal_branches } from "../competitors_modals/_competitors_modals.index.js";
import {
  Competitors_tableView_branches_header,
  Competitors_tableView_branches_map,
  Competitors_tableView_branches_info,
} from "./competitors_tableView_branches/_competitors_tableView_branches.index.js";
import "../../../_styles/competitors_tableView_branches.css";

const Competitors_tableView_branches = ({ states, handlers, t }) => {
  const { C_T_Br_compProps, confirmModal_props } = useC_T_branches({
    states,
    handlers,
    t,
  });
  const { C_T_Br_header_props, C_T_Br_map_props, C_T_Br_info_props } =
    C_T_Br_compProps;
  const editStep = C_T_Br_header_props?.states?.editStep;

  const selected = states?.selectedCompetitor ?? null;
  const text = C_T_Br_header_props?.states?.text;

  if (!selected) {
    return (
      <div className="Competitors_tableView_branches">
        <h2 className="Competitors_tableView_branches_noSelectTitle">
          {text?.title}
        </h2>
        <p className="Competitors_tableView_branches_noSelectHint">
          {text?.noSelection}
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className={`Competitors_tableView_branches ${
          editStep === "details"
            ? "Competitors_tableView_branches--detailsStep"
            : ""
        }`}>
        <Competitors_tableView_branches_header
          states={C_T_Br_header_props.states}
          handlers={C_T_Br_header_props.handlers}
          t={t}
        />
        <div className="Competitors_tableView_branches_mapPanel">
          <Competitors_tableView_branches_map
            states={C_T_Br_map_props.states}
            handlers={C_T_Br_map_props.handlers}
            t={t}
          />
        </div>
        <Competitors_tableView_branches_info
          states={C_T_Br_info_props.states}
          handlers={C_T_Br_info_props.handlers}
          t={t}
        />
      </div>
      <Competitors_confirmModal_branches
        states={confirmModal_props.states}
        handlers={confirmModal_props.handlers}
      />
    </>
  );
};

export default Competitors_tableView_branches;

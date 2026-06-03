import React from "react";
import { useCK_setup } from "./03_cK_setup_hooks/_cK_setup_hooks.index.js";
import {
  CK_setup_sessionSwitch,
  CK_setup_sessionToggler,
  CK_setup_confirmUpdate_modal,
  CK_setup_confirmDelete_modal,
  CK_setup_image_modal,
} from "./01_cK_setup_comps/_cK_setup_comps.index.js";
import "./_styles/cK_setup.css";

const CK_setup = () => {
  const { states, handlers, childProps, t } = useCK_setup();
  const {
    stp_sessionSwitch_props,
    stp_sessionToggler_props,
    // modal_props
  } = childProps;

  return (
    <div>
      <CK_setup_sessionToggler
        states={stp_sessionToggler_props.states}
        handlers={stp_sessionToggler_props.handlers}
        childProps={stp_sessionToggler_props.childProps}
        t={stp_sessionToggler_props.t}
      />
      <CK_setup_sessionSwitch
        states={stp_sessionSwitch_props.states}
        handlers={stp_sessionSwitch_props.handlers}
        childProps={stp_sessionSwitch_props.childProps}
        t={stp_sessionSwitch_props.t}
      />
      {["update", "delete", "image"].map((operation) => (
        <button
          key={operation}
          data-operation={operation}
          onClick={handlers.initiateModalOpening}>
          {operation}
        </button>
      ))}

      {/* <CK_setup_confirmUpdate_modal
        isOpen={modal_props.isOpen}
        states={modal_props.states}
        handlers={modal_props.handlers}
        t={t}
      />
      <CK_setup_confirmDelete_modal
        isOpen={modal_props.isOpen}
        states={modal_props.states}
        handlers={modal_props.handlers}
        t={t}
      />
      <CK_setup_image_modal
        isOpen={modal_props.isOpen}
        states={modal_props.states}
        handlers={modal_props.handlers}
        t={t}
      /> */}
    </div>
  );
};

export default CK_setup;

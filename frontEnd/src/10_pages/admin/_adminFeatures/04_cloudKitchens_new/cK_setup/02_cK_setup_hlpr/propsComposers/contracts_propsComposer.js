export const contracts_propsComposer = (states, handlers, t) => {
  const stp_empty_contracts_props = {
    states: {},
    handlers: { handleAddnew: handlers.handleAddnew },
    childComps: {},
    t: t,
  };
  const stp_contracts_addForm_props = {
    states: {
      contractFormData: states.contractFormData,
      contractFormData_full: states.contractFormData_full,
    },
    handlers: {},
    childComps: {},
    t: t,
  };

  const stp_contracts_viewOne_props = {
    states: {
      contract: states.selectedContract,
    },
    handlers: {},
    childComps: {},
    t: t,
  };
  const stp_contracts_viewAll_props = {
    states: {
      contracts: states.contracts,
    },
    handlers: {},
    childComps: {},
    t: t,
  };
  return {
    stp_contracts_addForm_props,
    stp_empty_contracts_props,
    stp_contracts_viewOne_props,
    stp_contracts_viewAll_props,
  };
};

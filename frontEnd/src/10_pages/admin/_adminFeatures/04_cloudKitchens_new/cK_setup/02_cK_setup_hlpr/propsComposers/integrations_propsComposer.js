export const integrations_propsComposer = (states, handlers, t) => {
  const stp_empty_integrations_props = {
    states: {},
    handlers: { handleAddnew: handlers.handleAddnew },
    childComps: {},
    t: t,
  };
  const stp_integrations_addForm_props = {
    states: {
      integrationFormData: states.integrationFormData,
      integrationFormData_full: states.integrationFormData_full,
    },
    handlers: {},
    childComps: {},
    t: t,
  };

  const stp_integrations_viewOne_props = {
    states: {
      integration: states.selectedIntegration,
    },
    handlers: {},
    childComps: {},
    t: t,
  };
  const stp_integrations_viewAll_props = {
    states: {
      integrations: states.integrations,
    },
    handlers: {},
    childComps: {},
    t: t,
  };
  return {
    stp_integrations_addForm_props,
    stp_empty_integrations_props,
    stp_integrations_viewOne_props,
    stp_integrations_viewAll_props,
  };
};

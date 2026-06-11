export const channels_propsComposer = (states, handlers, t) => {
  const stp_empty_channels_props = {
    states: {},
    handlers: { handleAddnew: handlers.handleAddnew },
    childComps: {},
    t: t,
  };
  const stp_channels_addForm_props = {
    states: {
      isOpen: states.activeOperation === "adding",
      values: states.channelFormData,
    },
    handlers: {
      onChange: handlers.handleFormChange,
      onSubmit: handlers.handleCreateSubmit,
      onCancel: handlers.handleCancelAdd,
    },
    childComps: {},
    t: t,
  };

  const stp_channels_viewOne_props = {
    states: {
      channel: states.selectedChannel,
    },
    handlers: {},
    childComps: {},
    t: t,
  };
  const stp_channels_viewAll_props = {
    states: {
      channels: states.channels,
    },
    handlers: {},
    childComps: {},
    t: t,
  };
  return {
    stp_channels_addForm_props,
    stp_empty_channels_props,
    stp_channels_viewOne_props,
    stp_channels_viewAll_props,
  };
};

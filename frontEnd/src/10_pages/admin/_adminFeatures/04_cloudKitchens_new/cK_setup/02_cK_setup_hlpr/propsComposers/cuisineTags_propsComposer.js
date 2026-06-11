export const cuisineTags_propsComposer = (states, handlers, t) => {
  const stp_empty_cuisineTags_props = {
    states: {},
    handlers: { handleAddnew: handlers.handleAddnew },
    childComps: {},
    t: t,
  };
  const stp_cuisineTags_addForm_props = {
    states: {
      isOpen: states.activeOperation === "adding",
      values: states.cuisineTagFormData,
    },
    handlers: {
      onChange: handlers.handleFormChange,
      onSubmit: handlers.handleCreateSubmit,
      onCancel: handlers.handleCancelAdd,
    },
    childComps: {},
    t: t,
  };
  const stp_cuisineTags_viewOne_props = {
    states: {
      cuisineTag: states.selectedCuisineTag,
    },
    handlers: {},
    childComps: {},
    t: t,
  };
  const stp_cuisineTags_viewAll_props = {
    states: {
      cuisineTags: states.cuisineTags,
    },
    handlers: {
      onEditFull: handlers.handleEditFull,
    },
    childComps: {},
    t: t,
  };
  const stp_cuisineTags_full_props = {
    states: {
      isOpen: states.activeOperation === "updating",
      values: states.cuisineTagFormData_full,
    },
    handlers: {
      onChange: handlers.handleFullFormChange,
      onSubmit: handlers.handleUpdateSubmit,
      onCancel: handlers.handleCancelFull,
    },
    childComps: {},
    t: t,
  };
  return {
    stp_empty_cuisineTags_props,
    stp_cuisineTags_addForm_props,
    stp_cuisineTags_viewOne_props,
    stp_cuisineTags_viewAll_props,
    stp_cuisineTags_full_props,
  };
};

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
      onConfirmUpdate: handlers.handleInlineUpdateSubmit,
      onAddTagField: handlers.handleAddTagField,
      onDelete: (tag) =>
        window.alert(`Delete placeholder — tag: ${tag?.label || tag?._id}`),
      onView: (tag) =>
        window.alert(`View placeholder — tag: ${tag?.label || tag?._id}`),
    },
    childComps: {},
    t: t,
  };
  return {
    stp_empty_cuisineTags_props,
    stp_cuisineTags_addForm_props,
    stp_cuisineTags_viewOne_props,
    stp_cuisineTags_viewAll_props,
  };
};

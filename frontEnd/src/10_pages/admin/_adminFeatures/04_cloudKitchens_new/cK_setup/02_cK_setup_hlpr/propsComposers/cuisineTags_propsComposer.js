export const cuisineTags_propsComposer = (states, handlers, t) => {
  const stp_empty_cuisineTags_props = {
    states: {},
    handlers: { handleAddnew: handlers.handleAddnew },
    childComps: {},
    t: t,
  };
  const stp_cuisineTags_addForm_props = {
    states: {
      cuisineTagFormData: states.cuisineTagFormData,
      cuisineTagFormData_full: states.cuisineTagFormData_full,
    },
    handlers: {},
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
    handlers: {},
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

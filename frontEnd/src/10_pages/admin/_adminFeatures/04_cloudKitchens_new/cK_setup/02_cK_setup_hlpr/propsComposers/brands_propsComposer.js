export const brands_propsComposer = (states, handlers, t, cuisineTags) => {
  // console.log("states in brands_propsComposer", cuisineTags);
  const stp_empty_brand_props = {
    states: {},
    handlers: { handleAddnew: handlers.handleAddnew },
    childComps: {},
    t: t,
  };
  const stp_brands_viewOne_props = {
    states: {
      brand: states.selectedBrand,
      cuisineTags: cuisineTags,
    },
    handlers: {},
    childComps: {},
    t: t,
  };
  const stp_brands_viewAll_props = {
    states: {
      brands: states.brands,
    },
    handlers: {
      onEditFull: handlers.handleEditFull,
    },
    childComps: {},
    t: t,
  };
  const stp_brands_addForm_props = {
    states: {
      isOpen: states.activeOperation === "adding",
      values: states.brandFormData,
      cuisineTags: cuisineTags,
    },
    handlers: {
      onChange: handlers.handleFormChange,
      onSubmit: handlers.handleCreateSubmit,
      onCancel: handlers.handleCancelAdd,
    },
    childComps: {},
    t: t,
  };
  const stp_brands_full_props = {
    states: {
      isOpen: states.activeOperation === "updating",
      values: states.brandFormData_full,
      cuisineTags: cuisineTags,
    },
    handlers: {
      onChange: handlers.handleFullFormChange,
      onSubmit: handlers.handleUpdateSubmit,
      onCancel: handlers.handleCancelFull,
      onAddSocial: handlers.handleAddSocial,
      onRemoveSocial: handlers.handleRemoveSocial,
      onAddCuisineTag: handlers.handleAddCuisineTag,
      onRemoveCuisineTag: handlers.handleRemoveCuisineTag,
    },
    childComps: {},
    t: t,
  };
  return {
    stp_empty_brand_props,
    stp_brands_viewOne_props,
    stp_brands_viewAll_props,
    stp_brands_addForm_props,
    stp_brands_full_props,
  };
};

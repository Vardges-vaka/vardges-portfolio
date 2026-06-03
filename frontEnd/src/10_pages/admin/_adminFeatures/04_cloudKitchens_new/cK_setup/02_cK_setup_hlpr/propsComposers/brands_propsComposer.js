export const brands_propsComposer = (states, handlers, t) => {
  const stp_empty_brand_props = {
    states: {},
    handlers: { handleAddnew: handlers.handleAddnew },
    childComps: {},
    t: t,
  };
  const stp_brands_viewOne_props = {
    states: {
      brand: states.selectedBrand,
    },
    handlers: {},
    childComps: {},
    t: t,
  };
  const stp_brands_viewAll_props = {
    states: {
      brands: states.brands,
    },
    handlers: {},
    childComps: {},
    t: t,
  };
  const stp_brands_addForm_props = {
    states: {
      brandFormData: states.brandFormData,
      brandFormData_full: states.brandFormData_full,
      brandFormData_files: states.brandFormData_files,
    },
    handlers: {},
    childComps: {},
    t: t,
  };
  return {
    stp_empty_brand_props,
    stp_brands_viewOne_props,
    stp_brands_viewAll_props,
    stp_brands_addForm_props,
  };
};

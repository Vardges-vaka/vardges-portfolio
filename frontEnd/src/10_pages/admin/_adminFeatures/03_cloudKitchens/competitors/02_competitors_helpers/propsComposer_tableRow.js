export const propsComposer_tableRow = (states, handlers, t) => {
  const logo = {
    states: {},
    handlers: {},
    compProps: {},
    t: t,
  };

  const cuisineTypes = {
    states: {},
    handlers: {},
    compProps: {},
    t: t,
  };

  const priceRange = {
    states: {},
    handlers: {},
    compProps: {},
    t: t,
  };

  const menu = {
    states: {},
    handlers: {},
    compProps: {},
    t: t,
  };

  const menuItemQty = {
    states: {},
    handlers: {},
    compProps: {},
    t: t,
  };

  const menuCategoryQty = {
    states: {},
    handlers: {},
    compProps: {},
    t: t,
  };

  const ownDeliveryDubai = {
    states: {},
    handlers: {},
    compProps: {},
    t: t,
  };

  const competesWithBrands = {
    states: {},
    handlers: {},
    compProps: {},
    t: t,
  };

  const branches = {
    states: {},
    handlers: {},
    compProps: {},
    t: t,
  };
  return {
    Competitors_table_row_logo_props: logo,
    Competitors_table_row_cuisineTypes_props: cuisineTypes,
    Competitors_table_row_priceRange_props: priceRange,
    Competitors_table_row_menu_props: menu,
    Competitors_table_row_menuItemQty_props: menuItemQty,
    Competitors_table_row_menuCategoryQty_props: menuCategoryQty,
    Competitors_table_row_ownDeliveryDubai_props: ownDeliveryDubai,
    Competitors_table_row_competesWithBrands_props: competesWithBrands,
    Competitors_table_row_branches_props: branches,
    Competitors_table_rows_provider_props: {
      states: {
        logoModalCompetitorId: states.logoModalCompetitorId,
      },
      handlers: {
        handleCompetitorTableAction: handlers.handleCompetitorTableAction,
        handleStartUpdateField: handlers.handleStartUpdateField,
        handleOpenLogoModal: handlers.handleOpenLogoModal,
        handleCloseLogoModal: handlers.handleCloseLogoModal,
      },
      compProps: {
        Competitors_table_row_logo_props: logo,
        Competitors_table_row_cuisineTypes_props: cuisineTypes,
        Competitors_table_row_priceRange_props: priceRange,
        Competitors_table_row_menu_props: menu,
        Competitors_table_row_menuItemQty_props: menuItemQty,
        Competitors_table_row_menuCategoryQty_props: menuCategoryQty,
        Competitors_table_row_ownDeliveryDubai_props: ownDeliveryDubai,
        Competitors_table_row_competesWithBrands_props: competesWithBrands,
        Competitors_table_row_branches_props: branches,
      },
      t: t,
    },
  };
};

import { useEffect } from "react";
import {
  useCompetitors_states,
  useCompetitors_apiHelpers,
  useCompetitors_handlers,
} from "./_competitors_hooks.index.js";
import {
  propsComposer_tablleView,
  propsComposer_tableRow,
} from "../02_competitors_helpers/_competitors_helpers.index.js";
import { useTranslation } from "react-i18next";

export const useCompetitors = () => {
  const { t } = useTranslation("competitors");
  const { states, setters } = useCompetitors_states();
  const { apiHelpers } = useCompetitors_apiHelpers();
  const { handlers } = useCompetitors_handlers({
    states,
    setters,
    apiHelpers,
    t,
  });

  // const Competitors_tableView_name_props = {
  //   states: { session: states.session, isEditing: states.isEditing },
  //   handlers: {},
  //   compProps: {},
  //   t,
  // };
  // const Competitors_tableView_logo_props = {
  //   states: { session: states.session, isEditing: states.isEditing },
  //   handlers: {},
  //   compProps: {},
  //   t,
  // };
  // const Competitors_tableView_cuisineTypes_props = {
  //   states: { session: states.session, isEditing: states.isEditing },
  //   handlers: {},
  //   compProps: {},
  //   t,
  // };
  // const Competitors_tableView_priceRange_props = {
  //   states: { session: states.session, isEditing: states.isEditing },
  //   handlers: {},
  //   compProps: {},
  //   t,
  // };
  // const Competitors_tableView_menu_props = {
  //   states: { session: states.session, isEditing: states.isEditing },
  //   handlers: {},
  //   compProps: {},
  //   t,
  // };
  // const Competitors_tableView_competesWithBrands_props = {
  //   states: { session: states.session, isEditing: states.isEditing },
  //   handlers: {},
  //   compProps: {},
  //   t,
  // };
  // const Competitors_tableView_branches_props = {
  //   states: { session: states.session, isEditing: states.isEditing },
  //   handlers: {},
  //   compProps: {},
  //   t,
  // };
  // const Competitors_tableView_fullView_props = {
  //   states: { session: states.session, isEditing: states.isEditing },
  //   handlers: {},
  //   compProps: {},
  //   t,
  // };
  const {
    Competitors_tableView_profile_props,
    Competitors_tableView_cuisineTypes_props,
    Competitors_tableView_priceRange_props,
    Competitors_tableView_menu_props,
    Competitors_tableView_competesWithBrands_props,
    Competitors_tableView_branches_props,
    Competitors_tableView_fullView_props,
    propsMap,
  } = propsComposer_tablleView(states, handlers, t);
  const {
    Competitors_table_row_logo_props,
    Competitors_table_row_cuisineTypes_props,
    Competitors_table_row_priceRange_props,
    Competitors_table_row_menu_props,
    Competitors_table_row_competesWithBrands_props,
    Competitors_table_row_branches_props,
    Competitors_table_rows_provider_props,
  } = propsComposer_tableRow(states, handlers, t);

  // const Competitors_table_rows_provider_props = {
  //   ...baseTableRowsProviderProps,
  //   handlers: {
  //     ...baseTableRowsProviderProps.handlers,
  //     handleCompetitorTableAction: handlers.handleCompetitorTableAction,
  //   },
  // };
  console.log(
    "useCompetitors_________Competitors_table_row_logo_props",
    Competitors_table_row_logo_props,
  );

  const Competitors_tableView_props = {
    states: { session: states.session, competitors: states.competitors },
    handlers: {
      temp: handlers.handleSetSession,
      handleCompetitorTableAction: handlers.handleCompetitorTableAction,
    },
    compProps: {
      Competitors_table_rows_provider_props:
        Competitors_table_rows_provider_props,
    },
    t: t,
  };
  const Competitors_viewToggle_props = {
    states: { session: states.session },
    handlers: { handleSetSession: handlers.handleSetSession },
    compProps: {},
    t: t,
  };
  const Competitors_header_props = {
    states: { session: states.session, isEditing: states.isEditing },
    handlers: {
      handleSetSession: handlers.handleSetSession,
      handleGoBack: handlers.handleGoBack,
    },
    compProps: { Competitors_viewToggle_props: Competitors_viewToggle_props },
    t: t,
  };

  const Competitors_mapView_props = {
    states: { session: states.session, competitors: states.competitors },
    handlers: {
      temp: handlers.handleSetSession,
      handleCompetitorTableAction: handlers.handleCompetitorTableAction,
    },
    compProps: {},
    t: t,
  };
  // temporaryTesting
  return {
    states: { session: states.session },
    handlers: { temp: handlers.handleSetSession },
    compProps: {
      currentSession_props: propsMap[states.session],
      Competitors_tableView_props,
      Competitors_viewToggle_props,
      Competitors_header_props,
      Competitors_mapView_props,
    },
    t,
  };
};

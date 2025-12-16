import { useMemo, useState, useCallback } from "react";
import {
  validator_title,
  validator_description,
} from "../../03_projects.validators/_projects.validators.index.js";
import {
  useAddingProject_generalInfo_handlers,
  useAddingProject_specificInfo_handlers,
  useAddingProject_config_handlers,
} from "./_projectshooks_handlers.index.js";

export const useAddingProject_handlers = ({
  states,
  setters,
  apiHelpers,
  translations,
}) => {
  const { generalInfo_handlers } = useAddingProject_generalInfo_handlers({
    states,
    setters,
    translations,
  });
  const { specificInfo_handlers } = useAddingProject_specificInfo_handlers({
    states,
    setters,
    translations,
  });
  const { config_handlers } = useAddingProject_config_handlers({
    states,
    setters,
    translations,
  });

  return {
    addProjects_handlers: {
      ...generalInfo_handlers,
      ...specificInfo_handlers,
      ...config_handlers,
    },
  };
};

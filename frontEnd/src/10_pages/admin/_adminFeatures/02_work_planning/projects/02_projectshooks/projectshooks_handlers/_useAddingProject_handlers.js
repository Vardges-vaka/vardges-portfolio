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

  /*
  description
brief
en
value
  
  */

  const handleNewAddingProject = useCallback(
    async (initialize) => {
      const payload = {
        title: {
          en: states.addingProject_generalInfo.title.en.value,
          ru: states.addingProject_generalInfo.title.ru.value,
          hy: states.addingProject_generalInfo.title.hy.value,
          ar: states.addingProject_generalInfo.title.ar.value,
        },
        description: {
          brief: {
            en: states.addingProject_generalInfo.description.brief.en.value,
            ru: states.addingProject_generalInfo.description.brief.ru.value,
            hy: states.addingProject_generalInfo.description.brief.hy.value,
            ar: states.addingProject_generalInfo.description.brief.ar.value,
          },
          detailed: {
            en: states.addingProject_generalInfo.description.detailed.en.value,
            ru: states.addingProject_generalInfo.description.detailed.ru.value,
            hy: states.addingProject_generalInfo.description.detailed.hy.value,
            ar: states.addingProject_generalInfo.description.detailed.ar.value,
          },
        },
        type: states.addingProject_type,
        projectInfo: {
          techStack: states.addingProject_specificInfo.techStack,
          hasBackEnd: states.addingProject_specificInfo.hasBackEnd,
          db: states.addingProject_specificInfo.db.value,
          cloudStorage: states.addingProject_specificInfo.cloudStorage.value,
          shouldShowPackages:
            states.addingProject_specificInfo.shouldShowPackages,
          packages: states.addingProject_specificInfo.packages,
          links: {
            gitHub: states.addingProject_specificInfo.links.gitHub.value,
            url: states.addingProject_specificInfo.links.url.value,
          },
        },
        config: states.addingProject_config,
      };
      console.log("payload in handleNewAddingProject before api call", payload);
      console.log(
        "payload in handleNewAddingProject before api call",
        states.addingProject_generalInfo.description.detailed.en.value
      );

      const result = await apiHelpers.addProject(payload);
      console.log("result in handleNewAddingProject after api call", result);
      if (result.success) {
        initialize();
      } else {
        setters.setGlobalError({
          isError: true,
          message: result.message,
        });
      }
    },
    [
      setters.setCurrentSession,
      setters.setAddingStep,
      states.addingProject_generalInfo,
      states.addingProject_type,
      states.addingProject_specificInfo,
      states.addingProject_config,
      setters.setGlobalError,
      apiHelpers.addProject,
    ]
  );

  return {
    addProjects_handlers: {
      handleNewAddingProject,
      ...generalInfo_handlers,
      ...specificInfo_handlers,
      ...config_handlers,
    },
  };
};

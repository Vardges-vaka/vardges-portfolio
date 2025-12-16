import { useMemo, useState, useCallback } from "react";
import { config_vld } from "../../03_projects.validators/_projects.validators.index";

export const useAddingProject_config_handlers = ({
  states,
  setters,
  translations,
}) => {
  const handleConfig_togglers = useCallback(
    (e) => {
      const { field, subfield } = e.target.dataset;
      setters.setAddingProject_config((prev) => {
        if (!subfield) {
          return {
            ...prev,
            [field]: !prev[field],
          };
        }

        // When toggling timing flags off, clear related dates to avoid stale data
        const nextTiming =
          field === "timing" && subfield
            ? {
                ...prev.timing,
                [subfield]: !prev.timing[subfield],
                ...(subfield === "isOngoing" && prev.timing.isOngoing
                  ? { startDate: "", endDate: "" }
                  : {}),
                ...(subfield === "isDeadline" && prev.timing.isDeadline
                  ? { deadline: "" }
                  : {}),
              }
            : prev[field];

        return {
          ...prev,
          [field]: field === "timing" ? nextTiming : prev[field],
        };
      });
    },
    [setters.setAddingProject_config]
  );

  const handleConfig_Priority_change = useCallback(
    (e) => {
      const { value } = e.target;
      setters.setAddingProject_config((prev) => {
        return { ...prev, priority: value };
      });
    },
    [setters.setAddingProject_config]
  );
  const handleConfig_Timing_change = useCallback(
    (e) => {
      const { value, name } = e.target;
      setters.setAddingProject_config((prev) => {
        return { ...prev, timing: { ...prev.timing, [name]: value } };
      });
    },
    [setters.setAddingProject_config]
  );

  const handleConfig_stepValidation = useCallback(() => {
    if (states.addingStep !== "config") return;
    const validation = config_vld(states.addingProject_config);
    console.log("validation in handleConfig_stepValidation", validation);
    if (validation.isError) {
      setters.setNewProjects_validations((prev) => {
        return {
          ...prev,
          config: { isValid: false, errorMessage: validation.message },
        };
      });
    } else {
      setters.setNewProjects_validations((prev) => {
        return {
          ...prev,
          config: { isValid: true, errorMessage: "" },
        };
      });
    }
  }, [
    states.addingProject_config,
    states.addingStep,
    setters.setNewProjects_validations,
  ]);

  return {
    config_handlers: {
      handleConfig_stepValidation,
      handleConfig_togglers,
      handleConfig_Priority_change,
      handleConfig_Timing_change,
    },
  };
};

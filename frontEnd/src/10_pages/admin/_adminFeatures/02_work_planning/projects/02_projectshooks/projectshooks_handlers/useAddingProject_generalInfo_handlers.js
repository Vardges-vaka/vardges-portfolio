import { useMemo, useState, useCallback } from "react";
import {
  validator_title,
  validator_description,
  generalInfo_vld,
} from "../../03_projects.validators/_projects.validators.index";
import { PROJECT_TYPES } from "../../05_projects.constances/_projects.constances.index.js";

export const useAddingProject_generalInfo_handlers = ({
  states,
  setters,
  translations,
}) => {
  const handleGeneralInfo_type_change = useCallback(
    (e) => {
      const { value } = e.target;
      setters.setAddingProject_type(value);
    },
    [setters.setAddingProject_type]
  );
  const handleGeneralInfo_type_blur = useCallback(
    (e) => {
      const { value } = e.target;
      if (!PROJECT_TYPES.includes(value)) {
        setters.setGlobalError({
          isError: true,
          message: "Wrong Project Type",
        });
      }
    },
    [setters.setGlobalError]
  );
  const handleGeneralInfo_text_blur = useCallback(
    (e) => {
      const { field, subfield, lng } = e.target.dataset;
      const { value } = e.target;

      const errorMessage = subfield
        ? validator_description(value).message
        : validator_title(value).message;
      const isError = subfield
        ? validator_description(value).isError
        : validator_title(value).isError;

      const validations = (prev) => {
        return {
          ...prev,
          isTouched: true,
          errorMessage: errorMessage,
          isError: isError,
        };
      };

      setters.setAddingProject_generalInfo((prev) => {
        if (!subfield) {
          return {
            ...prev,
            [field]: {
              ...prev?.[field],
              [lng]: {
                ...validations(prev?.[field]?.[lng]),
              },
            },
          };
        } else {
          return {
            ...prev,
            [field]: {
              ...prev?.[field],
              [subfield]: {
                ...prev?.[field]?.[subfield],
                [lng]: {
                  ...validations(prev?.[field]?.[subfield]?.[lng]),
                },
              },
            },
          };
        }
      });
    },
    [setters.setAddingProject_generalInfo]
  );
  const handleGeneralInfo_text_change = useCallback(
    (e) => {
      const { field, subfield, lng } = e.target.dataset;
      const { value } = e.target;

      setters.setAddingProject_generalInfo((prev) => {
        if (
          prev?.[field]?.[lng]?.isTouched ||
          prev?.[field]?.[subfield]?.[lng]?.isTouched
        ) {
          setTimeout(() => handleGeneralInfo_text_blur(e), 0);
        }

        if (!subfield) {
          return {
            ...prev,
            [field]: {
              ...prev?.[field],
              [lng]: {
                ...prev?.[field]?.[subfield]?.[lng],
                value: value,
              },
            },
          };
        } else {
          return {
            ...prev,
            [field]: {
              ...prev?.[field],
              [subfield]: {
                ...prev?.[field]?.[subfield],
                [lng]: { ...prev?.[field]?.[subfield]?.[lng], value: value },
              },
            },
          };
        }
      });
    },
    [setters.setAddingProject_generalInfo, handleGeneralInfo_text_blur]
  );

  const handleGeneralInfo_stepValidation = useCallback(() => {
    if (states.addingStep !== "generalInfo") return;
    const validation = generalInfo_vld(
      states.addingProject_generalInfo,
      states.addingProject_type
    );
    console.log("validation in handleGeneralInfo_stepValidation", validation);
    if (validation.isError) {
      setters.setNewProjects_validations((prev) => {
        return {
          ...prev,
          generalInfo: {
            isValid: false,
            errorMessage: validation.message,
          },
        };
      });
    } else {
      setters.setNewProjects_validations((prev) => {
        return {
          ...prev,
          generalInfo: {
            isValid: true,
            errorMessage: "",
          },
        };
      });
    }
  }, [
    states.addingProject_generalInfo,
    states.addingProject_type,
    setters.setNewProjects_validations,
    states.addingProject_generalInfo,
    states.addingProject_type,
    generalInfo_vld,
  ]);

  return {
    generalInfo_handlers: {
      handleGeneralInfo_type_change,
      handleGeneralInfo_type_blur,
      handleGeneralInfo_text_blur,
      handleGeneralInfo_text_change,
      handleGeneralInfo_stepValidation,
    },
  };
};

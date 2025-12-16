import { useMemo, useState, useCallback } from "react";
import { specificInfo_vld } from "../../03_projects.validators/_projects.validators.index";

export const useAddingProject_specificInfo_handlers = ({
  states,
  setters,
  translations,
}) => {
  const handleSpecificInfo_text_change = useCallback(
    (e) => {
      const { field, subfield } = e.target.dataset;
      const { value } = e.target;

      setters.setAddingProject_specificInfo((prev) => {
        return !subfield
          ? {
              ...prev,
              [field]: {
                ...prev[field],
                value: value,
              },
            }
          : {
              ...prev,
              [field]: {
                ...prev[field],
                [subfield]: {
                  ...prev[field][subfield],
                  value: value,
                },
              },
            };
      });
    },
    [setters.setAddingProject_specificInfo]
  );
  const handleSpecificInfo_togglers = useCallback(
    (e) => {
      const { field } = e.target.dataset;
      setters.setAddingProject_specificInfo((prev) => {
        return {
          ...prev,
          [field]: !prev[field],
        };
      });
    },
    [setters.setAddingProject_specificInfo]
  );

  const handleSpecificInfo_techStack_change = useCallback(
    (e) => {
      const { item } = e.target.dataset;
      setters.setAddingProject_specificInfo((prev) => {
        // Filter out empty strings and check if item already exists
        const currentStack = prev.techStack.filter((tech) => tech !== "");
        if (currentStack.includes(item)) {
          return prev; // Don't add duplicates
        }
        return {
          ...prev,
          techStack: [...currentStack, item],
        };
      });
    },
    [setters.setAddingProject_specificInfo]
  );

  const handleSpecificInfo_techStack_remove = useCallback(
    (e) => {
      const { item } = e.target.dataset;
      setters.setAddingProject_specificInfo((prev) => {
        const newTechStack = prev.techStack.filter((tech) => tech !== item);
        return {
          ...prev,
          techStack: newTechStack.length > 0 ? newTechStack : [""],
        };
      });
    },
    [setters.setAddingProject_specificInfo]
  );

  const handleSpecificInfo_packages_change = useCallback(
    (e) => {
      const { item, ref } = e.target.dataset;
      setters.setAddingProject_specificInfo((prev) => {
        // Check if package already exists
        const packageExists = prev.packages.some(
          (pkg) => pkg.name === item && pkg.ref === ref
        );
        if (packageExists) {
          return prev; // Don't add duplicates
        }
        // Filter out empty packages
        const validPackages = prev.packages.filter((pkg) => pkg.name !== "");
        return {
          ...prev,
          packages: [
            ...validPackages,
            {
              ref: ref,
              name: item,
            },
          ],
        };
      });
    },
    [setters.setAddingProject_specificInfo]
  );

  const handleSpecificInfo_packages_remove = useCallback(
    (e) => {
      const { item, ref } = e.target.dataset;
      setters.setAddingProject_specificInfo((prev) => {
        const newPackages = prev.packages.filter(
          (pkg) => !(pkg.name === item && pkg.ref === ref)
        );
        return {
          ...prev,
          packages:
            newPackages.length > 0
              ? newPackages
              : [{ ref: "frontEnd", name: "" }],
        };
      });
    },
    [setters.setAddingProject_specificInfo]
  );

  const handleSpecificInfo_stepValidation = useCallback(() => {
    if (states.addingStep !== "specificInfo") return;
    const validation = specificInfo_vld(states.addingProject_specificInfo);
    console.log("validation in handleGeneralInfo_stepValidation", validation);
    if (validation.isError) {
      setters.setNewProjects_validations((prev) => {
        return {
          ...prev,
          specificInfo: {
            isValid: false,
            errorMessage: validation.message,
          },
        };
      });
    } else {
      setters.setNewProjects_validations((prev) => {
        return {
          ...prev,
          specificInfo: {
            isValid: true,
            errorMessage: "",
          },
        };
      });
    }
  }, [
    states.addingProject_specificInfo,
    setters.setNewProjects_validations,
    states.addingProject_specificInfo,
    specificInfo_vld,
  ]);

  return {
    specificInfo_handlers: {
      handleSpecificInfo_text_change,
      handleSpecificInfo_togglers,
      handleSpecificInfo_techStack_change,
      handleSpecificInfo_techStack_remove,
      handleSpecificInfo_packages_change,
      handleSpecificInfo_packages_remove,
      handleSpecificInfo_stepValidation,
    },
  };
};

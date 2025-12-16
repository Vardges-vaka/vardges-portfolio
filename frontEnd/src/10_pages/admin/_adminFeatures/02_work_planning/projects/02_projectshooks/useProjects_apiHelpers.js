import { useMemo, useCallback } from "react";
import {
  Project_getOne,
  Project_getAll,
  Project_add,
  Project_update,
  Project_update_image,
  Project_update_files,
} from "../../../../../../05_helpers/apiHelpers/admin/adminFeatures/_adminFeatures.index.js";

const displayName = "useProjects_apiHelpers.js";
const isDebug = true;
export const useProjects_apiHelpers = ({ translations, setGlobalError }) => {
  const getAllProject = useCallback(async () => {
    try {
      console.log("getAllProject Started");
      const result = await Project_getAll();
      isDebug &&
        console.log(`${displayName} | getAllProject | [result]`, result);
      if (result.success) {
        return {
          ...result,
        };
      } else {
        setGlobalError({
          isError: true,
          message: result.message,
        });
        return null;
      }
    } catch (err) {
      isDebug && console.log(`${displayName} | getAllProject | [catch]`, err);
      setGlobalError({
        isError: true,
        message: err.message,
      });
    } finally {
      isDebug &&
        console.log(`${displayName} | getAllProject | [finally] ENDED`);
    }
  }, []);
  const getOneProject = useCallback(() => {
    try {
    } catch (err) {
    } finally {
    }
  }, []);

  const addProject = useCallback(async () => {
    try {
    } catch (err) {
    } finally {
    }
  }, []);

  const updateProject = useCallback(async () => {
    try {
    } catch (err) {
    } finally {
    }
  }, []);

  const updateProjectImage = useCallback(async () => {
    try {
    } catch (err) {
    } finally {
    }
  }, []);

  const updateProjectFles = useCallback(async () => {
    try {
    } catch (err) {
    } finally {
    }
  }, []);

  return {
    apiHelpers: {
      getOneProject,
      getAllProject,
      addProject,
      updateProject,
      updateProjectImage,
      updateProjectFles,
    },
  };
};

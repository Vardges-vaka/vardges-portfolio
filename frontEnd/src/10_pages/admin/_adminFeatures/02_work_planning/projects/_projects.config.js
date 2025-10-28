const IS_DEBUG_Projects = import.meta.env.VITE_IS_DEBUG_Projects;

const isDebug = IS_DEBUG_Projects === "true";

const Projects_isDebug = {
  hooks: isDebug,
  ui: isDebug,
  vld: isDebug,
  hlpr: isDebug,
  memo: isDebug,
  api: isDebug,
};

export default Projects_isDebug;

const IS_DEBUG_TravelPlanner = import.meta.env.VITE_IS_DEBUG_TravelPlanner;

const isDebug = IS_DEBUG_TravelPlanner === "true";

const TravelPlanner_isDebug = {
  hooks: isDebug,
  ui: isDebug,
  vld: isDebug,
  hlpr: isDebug,
  memo: isDebug,
  api: isDebug,
};

export default TravelPlanner_isDebug;

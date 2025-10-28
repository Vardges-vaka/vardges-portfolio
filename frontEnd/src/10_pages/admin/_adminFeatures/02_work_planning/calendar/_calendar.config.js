const IS_DEBUG_Calendar = import.meta.env.VITE_IS_DEBUG_Calendar;

const isDebug = IS_DEBUG_Calendar === "true";

const Calendar_isDebug = {
  hooks: isDebug,
  ui: isDebug,
  vld: isDebug,
  hlpr: isDebug,
  memo: isDebug,
  api: isDebug,
};

export default Calendar_isDebug;

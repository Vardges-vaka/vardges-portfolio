export const DATE_INPUT_TYPES = [
  "date",
  "time",
  "month",
  "week",
  "datetime-local",
];

/** Default hint copy when hintsProps.type is "hint" and message is omitted. */
export const DATE_INPUT_VALUE_HINTS = {
  date: "Format: YYYY-MM-DD · e.g. 2026-06-11",
  time: "Format: HH:mm (24-hour) · e.g. 14:30",
  month: "Format: YYYY-MM · e.g. 2026-06",
  week: "Format: YYYY-W## (ISO week) · e.g. 2026-W24",
  "datetime-local":
    "Format: YYYY-MM-DDTHH:mm (local, no timezone) · e.g. 2026-06-11T14:30",
};

export const getDateInputDefaultHint = (type = "date") =>
  DATE_INPUT_VALUE_HINTS[type] ?? DATE_INPUT_VALUE_HINTS.date;

export default DATE_INPUT_TYPES;

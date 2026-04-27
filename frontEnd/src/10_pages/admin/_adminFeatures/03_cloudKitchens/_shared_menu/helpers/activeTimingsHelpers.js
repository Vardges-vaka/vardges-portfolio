// Checks whether timing data is effectively "always active".
export const isTimingsEmpty = (timings) => {
  if (!timings) return true;
  if (timings.isAlwaysActive !== false) return true;
  if (!Array.isArray(timings.windows) || timings.windows.length === 0) return true;
  return false;
};

// Turns the windows array into a human-readable string for the readonly view.
// e.g. "Breakfast: 06:00–11:00, Dinner: 18:00–22:00"
export const formatWindowList = (timings) => {
  if (isTimingsEmpty(timings)) return "Always";
  return timings.windows
    .map((w) => {
      const label = w.label ? `${w.label}: ` : "";
      return `${label}${w.from || "??:??"}–${w.to || "??:??"}`;
    })
    .join(", ");
};

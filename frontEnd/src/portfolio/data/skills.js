/**
 * Radar data per track. `axes` are domains (0–100 proficiency). Axis labels are
 * i18n keys resolved in the component so they translate. Values are self-assessed.
 */
export const SKILLS = {
  tech: {
    color: "tech",
    axes: [
      { key: "frontend", value: 90 },
      { key: "backend", value: 84 },
      { key: "cloud", value: 78 },
      { key: "security", value: 68 },
      { key: "automation", value: 82 },
      { key: "design", value: 80 },
    ],
  },
  bar: {
    color: "bar",
    axes: [
      { key: "mixology", value: 96 },
      { key: "menu", value: 92 },
      { key: "leadership", value: 90 },
      { key: "cost", value: 85 },
      { key: "guest", value: 94 },
      { key: "events", value: 88 },
    ],
  },
};

/** Synthetic change event — same shape as native select onChange. */
export const createSelectChangeEvent = ({ value, name, id }) => ({
  target: { value, name, id },
  currentTarget: { value, name, id },
});

export const DEFAULT_CHEVRON = {
  isActive: true,
  type: "lucide",
  lucidIcon: "ChevronDown",
  decorative: true,
};

export const parseMultiValue = (value) => {
  if (Array.isArray(value)) return value.map(String);
  if (value == null || value === "") return [];
  return String(value)
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
};

export const joinMultiValue = (values) =>
  Array.isArray(values) ? values.filter(Boolean).join(",") : "";

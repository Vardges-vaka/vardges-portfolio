export const SECTION_KEYS = {
  basic: "basic",
  status: "status",
  contact: "contact",
  assignment: "assignment",
  salary: "salary",
  leaves: "leaves",
  legal: "legal",
  certifications: "certifications",
  uniform: "uniform",
};

export const PLACEHOLDER_SECTION_KEYS = { images: "images" };

export const SECTION_PAYLOAD_KEY = {
  basic: "basic",
  status: "status",
  contact: "contact",
  assignment: "assignment",
  salary: "salary",
  leaves: "leaves",
  legal: "legal",
  certifications: "certifications",
  uniform: "uniform",
};

export const EDITABLE_SECTIONS = Object.values(SECTION_KEYS);

export const SECTION_LAYOUT = {
  leftColumn: [SECTION_KEYS.basic, SECTION_KEYS.status, SECTION_KEYS.contact],
  rightColumn: [
    SECTION_KEYS.assignment,
    SECTION_KEYS.salary,
    SECTION_KEYS.leaves,
    SECTION_KEYS.legal,
    SECTION_KEYS.certifications,
    SECTION_KEYS.uniform,
  ],
  bottomStrip: [PLACEHOLDER_SECTION_KEYS.images],
};

export const SECTION_KEYS = {
  basic: "basic",
  socials: "socials",
  emails: "emails",
};

export const PLACEHOLDER_SECTION_KEYS = {
  logo: "logo",
  files: "files",
};

export const SECTION_PAYLOAD_KEY = {
  basic: "basic",
  socials: "socials",
  emails: "emails",
};

export const EDITABLE_SECTIONS = [
  SECTION_KEYS.basic,
  SECTION_KEYS.socials,
  SECTION_KEYS.emails,
];

export const SECTION_LAYOUT = {
  leftColumn: [SECTION_KEYS.basic, PLACEHOLDER_SECTION_KEYS.logo],
  rightColumn: [
    SECTION_KEYS.socials,
    SECTION_KEYS.emails,
    PLACEHOLDER_SECTION_KEYS.files,
  ],
};

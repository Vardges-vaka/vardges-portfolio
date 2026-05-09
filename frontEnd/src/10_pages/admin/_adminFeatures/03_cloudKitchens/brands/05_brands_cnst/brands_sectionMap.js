export const SECTION_KEYS = {
  basic: "basic",
  files: "files",
  socials: "socials",
  website: "website",
  otherSocials: "otherSocials",
  inventoryIntegrations: "inventoryIntegrations",
  salesIntegration: "salesIntegration",
  legal: "legal",
  relations: "relations",
};

export const SECTION_PAYLOAD_KEY = {
  basic: "basic",
  files: "files",
  socials: "socials",
  website: "website",
  otherSocials: "otherSocials",
  inventoryIntegrations: "inventoryIntegrations",
  salesIntegration: "salesIntegration",
  legal: "legal",
  relations: "relations",
};

export const EDITABLE_SECTIONS = [
  SECTION_KEYS.basic,
  SECTION_KEYS.files,
  SECTION_KEYS.socials,
  SECTION_KEYS.website,
  SECTION_KEYS.otherSocials,
  SECTION_KEYS.inventoryIntegrations,
  SECTION_KEYS.salesIntegration,
  SECTION_KEYS.legal,
  SECTION_KEYS.relations,
];

export const SECTION_LAYOUT = {
  leftColumn: [
    SECTION_KEYS.basic,
    SECTION_KEYS.socials,
    SECTION_KEYS.website,
    SECTION_KEYS.otherSocials,
  ],
  rightColumn: [
    SECTION_KEYS.files,
    SECTION_KEYS.inventoryIntegrations,
    SECTION_KEYS.salesIntegration,
    SECTION_KEYS.legal,
    SECTION_KEYS.relations,
  ],
};

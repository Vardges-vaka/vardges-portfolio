export const EMPTY_EMAIL_ROW = { name: "", position: "", email: "" };

export const EMPTY_BRAND_FORM = {
  name: "",
  tagline: "",
  logo: "",
  isActive: true,
  files: [],
  socials: {
    instagram: "",
    facebook: "",
    tikTok: "",
    linkedIn: "",
    domain: "",
  },
  emails: [],
};

export const hydrateBrandForm = (brand) => ({
  name: brand?.name ?? "",
  tagline: brand?.tagline ?? "",
  logo: brand?.logo ?? "",
  isActive: brand?.isActive ?? true,
  files: Array.isArray(brand?.files) ? brand.files : [],
  socials: {
    instagram: brand?.socials?.instagram ?? "",
    facebook: brand?.socials?.facebook ?? "",
    tikTok: brand?.socials?.tikTok ?? "",
    linkedIn: brand?.socials?.linkedIn ?? "",
    domain: brand?.socials?.domain ?? "",
  },
  emails: Array.isArray(brand?.emails)
    ? brand.emails.map((row) => ({
        name: row?.name ?? "",
        position: row?.position ?? "",
        email: row?.email ?? "",
      }))
    : [],
});

export const pickSectionDraft = (hydrated, sectionKey) => {
  if (sectionKey === "basic") {
    return {
      name: hydrated.name,
      tagline: hydrated.tagline,
      isActive: hydrated.isActive,
    };
  }
  return hydrated[sectionKey];
};

export const pickAllSectionsDraft = (hydrated) => ({
  basic: {
    name: hydrated.name,
    tagline: hydrated.tagline,
    isActive: hydrated.isActive,
  },
  socials: hydrated.socials,
  emails: hydrated.emails,
});

const isDeeplyEmpty = (value) => {
  if (value === undefined || value === null || value === "") return true;
  if (typeof value === "boolean") return false;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.values(value).every(isDeeplyEmpty);
  return false;
};

export const isSectionEmpty = (brand, sectionKey) => {
  if (!brand) return true;
  if (sectionKey === "basic") {
    return !brand.name && !brand.tagline && brand.isActive === undefined;
  }
  return isDeeplyEmpty(brand?.[sectionKey]);
};

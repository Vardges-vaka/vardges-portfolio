import en from "./en.js";
import ru from "./ru.js";
import hy from "./hy.js";
import ar from "./ar.js";
// Supplementary translations for the data-driven, id-keyed namespaces
// (certInfo / projectInfo / testimonialInfo) plus the newer UI keys. Kept apart
// from the big base files and deep-merged in so the base files stay readable.
// English canonical for the id-keyed prose lives in the data files (t fallback),
// so there is no en extra.
import ruExtra from "./extra/ru.js";
import hyExtra from "./extra/hy.js";
import arExtra from "./extra/ar.js";

const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);
const deepMerge = (base, extra) => {
  if (!isObj(base) || !isObj(extra)) return extra === undefined ? base : extra;
  const out = { ...base };
  for (const key of Object.keys(extra)) {
    out[key] = isObj(base[key]) && isObj(extra[key]) ? deepMerge(base[key], extra[key]) : extra[key];
  }
  return out;
};

export const DICTIONARIES = {
  en,
  ru: deepMerge(ru, ruExtra),
  hy: deepMerge(hy, hyExtra),
  ar: deepMerge(ar, arExtra),
};

export const LANGUAGES = [
  { code: "en", label: "English", short: "EN", dir: "ltr" },
  { code: "ru", label: "Русский", short: "RU", dir: "ltr" },
  { code: "hy", label: "Հայերեն", short: "HY", dir: "ltr" },
  { code: "ar", label: "العربية", short: "AR", dir: "rtl" },
];

export const DEFAULT_LANG = "en";

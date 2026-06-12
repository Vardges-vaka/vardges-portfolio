import en from "./en.js";
import ru from "./ru.js";
import hy from "./hy.js";
import ar from "./ar.js";

export const DICTIONARIES = { en, ru, hy, ar };

export const LANGUAGES = [
  { code: "en", label: "English", short: "EN", dir: "ltr" },
  { code: "ru", label: "Русский", short: "RU", dir: "ltr" },
  { code: "hy", label: "Հայերեն", short: "HY", dir: "ltr" },
  { code: "ar", label: "العربية", short: "AR", dir: "rtl" },
];

export const DEFAULT_LANG = "en";

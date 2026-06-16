import { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { PortfolioLanguageContext } from "./portfolioContexts.js";
import { DICTIONARIES, LANGUAGES, DEFAULT_LANG } from "../i18n/dictionaries.js";

const STORAGE_KEY = "vp-portfolio-lang";

const resolve = (dict, path) =>
  path.split(".").reduce((node, key) => (node == null ? node : node[key]), dict);

export const PortfolioLanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return DICTIONARIES[saved] ? saved : DEFAULT_LANG;
  });

  const setLang = useCallback((code) => {
    if (!DICTIONARIES[code]) return;
    setLangState(code);
    localStorage.setItem(STORAGE_KEY, code);
  }, []);

  // t() resolves dot-paths; falls back to English, then to `fallback` (if given),
  // then to the path itself. The `fallback` arg lets components keep canonical
  // English prose in data files and translate it by id (e.g. project / cert text).
  const t = useCallback(
    (path, fallback) => {
      const value = resolve(DICTIONARIES[lang], path);
      if (value !== undefined) return value;
      const enValue = resolve(DICTIONARIES[DEFAULT_LANG], path);
      if (enValue !== undefined) return enValue;
      return fallback !== undefined ? fallback : path;
    },
    [lang],
  );

  const value = useMemo(() => {
    const meta = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];
    return { lang, setLang, t, dir: meta.dir, languages: LANGUAGES };
  }, [lang, setLang, t]);

  return (
    <PortfolioLanguageContext.Provider value={value}>
      {children}
    </PortfolioLanguageContext.Provider>
  );
};

PortfolioLanguageProvider.propTypes = { children: PropTypes.node.isRequired };

export default PortfolioLanguageProvider;

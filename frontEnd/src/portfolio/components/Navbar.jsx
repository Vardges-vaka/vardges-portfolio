import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { Sun, Moon, Menu, X, ChevronDown, Globe } from "lucide-react";
import { usePortfolioLang, usePortfolioTheme } from "../context/usePortfolio.js";
import ModeToggle from "./ModeToggle.jsx";
import { CONTACT_ANCHOR_ID } from "../portfolio.constants.js";

const Navbar = () => {
  const { t, lang, setLang, languages } = usePortfolioLang();
  const { theme, toggleTheme } = usePortfolioTheme();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const langRef = useRef(null);
  const location = useLocation();

  // close menus on route change
  useEffect(() => {
    setOpen(false);
    setLangOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the language dropdown on outside click
  useEffect(() => {
    if (!langOpen) return undefined;
    const onClick = (e) => {
      if (!langRef.current?.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener("pointerdown", onClick);
    return () => document.removeEventListener("pointerdown", onClick);
  }, [langOpen]);

  // lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollToContact = () => {
    setOpen(false);
    document.getElementById(CONTACT_ANCHOR_ID)?.scrollIntoView({ behavior: "smooth" });
  };

  const links = [
    { to: "/", label: t("nav.home"), end: true },
    { to: "/tech", label: t("nav.tech"), end: false },
    { to: "/bar", label: t("nav.bar"), end: false },
    { to: "/lab", label: t("nav.lab"), end: false },
  ];

  return (
    <>
      <header className={`vp-nav ${scrolled ? "is-scrolled" : ""}`}>
        <div className="vp-nav__inner">
          <Link to="/" className="vp-nav__logo" aria-label="Vardges Petrosyan — home">
            <span className="vp-nav__logo-mark">VP</span>
            <span className="vp-nav__logo-dot">.</span>
          </Link>

          <nav className="vp-nav__links" aria-label="Primary">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) => `vp-nav__link ${isActive ? "is-active" : ""}`}
              >
                {l.label}
              </NavLink>
            ))}
            <button type="button" className="vp-nav__link vp-nav__link--btn" onClick={scrollToContact}>
              {t("nav.contact")}
            </button>
          </nav>

          <div className="vp-nav__tools">
            <ModeToggle />

            <div className="vp-nav__lang" ref={langRef}>
              <button
                type="button"
                className="vp-nav__tool"
                onClick={() => setLangOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                aria-label={t("nav.language")}
              >
                <Globe size={15} aria-hidden="true" />
                <span>{languages.find((l) => l.code === lang)?.short}</span>
                <ChevronDown size={13} className={`vp-nav__chev ${langOpen ? "is-open" : ""}`} aria-hidden="true" />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <Motion.ul
                    className="vp-nav__lang-list"
                    role="listbox"
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                  >
                    {languages.map((l) => (
                      <li key={l.code}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={l.code === lang}
                          className={`vp-nav__lang-item ${l.code === lang ? "is-active" : ""}`}
                          onClick={() => {
                            setLang(l.code);
                            setLangOpen(false);
                          }}
                        >
                          {l.label}
                        </button>
                      </li>
                    ))}
                  </Motion.ul>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              className="vp-nav__tool vp-nav__theme"
              onClick={toggleTheme}
              aria-label={t("nav.theme")}
            >
              <AnimatePresence mode="wait" initial={false}>
                <Motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="vp-nav__theme-icon"
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </Motion.span>
              </AnimatePresence>
            </button>

            <button
              type="button"
              className="vp-nav__tool vp-nav__burger"
              onClick={() => setOpen(true)}
              aria-label={t("nav.menu")}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <Motion.div
            className="vp-mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              className="vp-mobile-menu__close"
              onClick={() => setOpen(false)}
              aria-label={t("nav.close")}
            >
              <X size={26} />
            </button>
            <nav className="vp-mobile-menu__links" aria-label="Mobile">
              {links.map((l, i) => (
                <Motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={l.to}
                    end={l.end}
                    className={({ isActive }) => `vp-mobile-menu__link ${isActive ? "is-active" : ""}`}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </NavLink>
                </Motion.div>
              ))}
              <Motion.div
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + links.length * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <button type="button" className="vp-mobile-menu__link" onClick={scrollToContact}>
                  {t("nav.contact")}
                </button>
              </Motion.div>
            </nav>
            <div className="vp-mobile-menu__mode">
              <ModeToggle compact />
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

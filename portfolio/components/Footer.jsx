import { Mail, Phone, Linkedin, MapPin, ArrowUp, ArrowUpRight } from "lucide-react";
import { usePortfolioLang } from "../context/usePortfolio.js";
import { CONTACT, CONTACT_ANCHOR_ID } from "../portfolio.constants.js";
import Reveal from "./Reveal.jsx";
import Magnetic from "./Magnetic.jsx";

const Footer = () => {
  const { t } = usePortfolioLang();
  const year = new Date().getFullYear();

  const rows = [
    {
      icon: <Mail size={16} aria-hidden="true" />,
      label: t("contact.emailLabel"),
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
    },
    {
      icon: <Phone size={16} aria-hidden="true" />,
      label: t("contact.phoneLabel"),
      value: CONTACT.phoneDisplay,
      href: `tel:${CONTACT.phone}`,
    },
    {
      icon: <Linkedin size={16} aria-hidden="true" />,
      label: t("contact.linkedinLabel"),
      value: CONTACT.linkedinDisplay,
      href: CONTACT.linkedin,
    },
    {
      icon: <MapPin size={16} aria-hidden="true" />,
      label: t("contact.locationLabel"),
      value: t("contact.locationValue"),
      href: null,
    },
  ];

  return (
    <footer className="vp-footer" id={CONTACT_ANCHOR_ID}>
      <div className="vp-container">
        <Reveal>
          <p className="vp-kicker">{t("contact.kicker")}</p>
          <h2 className="vp-footer__title">{t("contact.title")}</h2>
          <p className="vp-sub vp-footer__sub">{t("contact.sub")}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="vp-footer__grid">
            {rows.map((r) =>
              r.href ? (
                <a
                  key={r.label}
                  className="vp-footer__cell"
                  href={r.href}
                  target={r.href.startsWith("http") ? "_blank" : undefined}
                  rel={r.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  <span className="vp-footer__cell-label">
                    {r.icon}
                    {r.label}
                  </span>
                  <span className="vp-footer__cell-value">
                    {r.value}
                    <ArrowUpRight size={14} className="vp-arrow" aria-hidden="true" />
                  </span>
                </a>
              ) : (
                <div key={r.label} className="vp-footer__cell">
                  <span className="vp-footer__cell-label">
                    {r.icon}
                    {r.label}
                  </span>
                  <span className="vp-footer__cell-value">{r.value}</span>
                </div>
              ),
            )}
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="vp-footer__ctas">
            <Magnetic>
              <a className="vp-btn vp-btn--primary" href={`mailto:${CONTACT.email}`}>
                {t("contact.ctaEmail")}
              </a>
            </Magnetic>
            <Magnetic>
              <a className="vp-btn vp-btn--ghost" href={CONTACT.linkedin} target="_blank" rel="noreferrer">
                {t("contact.ctaLinkedIn")}
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <div className="vp-footer__bottom">
          <p className="vp-footer__small">{t("footer.line")}</p>
          <p className="vp-footer__small">
            © {year} {t("meta.name")} — {t("footer.rights")}
          </p>
          <button
            type="button"
            className="vp-footer__top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            {t("footer.top")}
            <ArrowUp size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

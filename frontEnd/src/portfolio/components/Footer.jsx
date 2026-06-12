import { Mail, Phone, Linkedin, Github, ArrowUp } from "lucide-react";
import DiscordIcon from "./DiscordIcon.jsx";
import { usePortfolioLang } from "../context/usePortfolio.js";
import { CONTACT } from "../portfolio.constants.js";

const Footer = () => {
  const { t } = usePortfolioLang();
  const year = new Date().getFullYear();

  const socials = [
    { label: "Email", icon: <Mail size={17} />, href: `mailto:${CONTACT.email}` },
    { label: "Phone", icon: <Phone size={17} />, href: `tel:${CONTACT.phone}` },
    { label: "LinkedIn", icon: <Linkedin size={17} />, href: CONTACT.linkedin },
    { label: "GitHub", icon: <Github size={17} />, href: CONTACT.github },
    { label: "Discord", icon: <DiscordIcon size={17} />, href: CONTACT.discord },
  ];

  return (
    <footer className="vp-footer">
      <div className="vp-container vp-footer__inner">
        <div className="vp-footer__brand">
          <span className="vp-footer__logo">
            VP<span className="vp-footer__logo-dot">.</span>
          </span>
          <p className="vp-footer__small">{t("footer.line")}</p>
        </div>

        <div className="vp-socials">
          {socials.map((s) => (
            <a
              key={s.label}
              className="vp-socials__btn"
              href={s.href}
              aria-label={s.label}
              title={s.label}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noreferrer" : undefined}
            >
              {s.icon}
            </a>
          ))}
        </div>

        <div className="vp-footer__bottom">
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

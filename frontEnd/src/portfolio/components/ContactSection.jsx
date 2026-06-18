import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion as Motion } from "framer-motion";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  MapPin,
  Send,
  Loader2,
  ArrowUpRight,
  Wine,
  Check,
  MessageSquare,
  Code2,
} from "lucide-react";
import DiscordIcon from "./DiscordIcon.jsx";
import Reveal from "./Reveal.jsx";
import CvButtons from "./CvButtons.jsx";
import { usePortfolioLang, usePortfolioMode } from "../context/usePortfolio.js";
import { CONTACT, CONTACT_ANCHOR_ID } from "../portfolio.constants.js";
import { submitContact, EMAIL_RE } from "../lib/contactService.js";

const variantForPath = (p) => (p.startsWith("/tech") ? "tech" : p.startsWith("/bar") ? "bar" : "home");

/**
 * Contact — two forms, chosen by context.
 *   Tech context (the /tech page, or home in Engineer mode) → a terminal that
 *     "POSTs" your request and streams a 200 OK — dev catnip.
 *   Everything else (Both / Hospitality) → a clean, friendly short form.
 * Validation + delivery live in lib/contactService.js (submitContact is simulated).
 */

const INTENTS = [
  { key: "tech", icon: Code2 },
  { key: "bar", icon: Wine },
  { key: "other", icon: MessageSquare },
];

const ContactSection = () => {
  const { t, lang } = usePortfolioLang();
  const { mode } = usePortfolioMode();
  const location = useLocation();
  const isTechPage = location.pathname.startsWith("/tech");
  const isBarPage = location.pathname.startsWith("/bar");
  // the terminal is the tech experience: always on /tech, and on home in Engineer mode
  const cliMode = isTechPage || (mode === "tech" && !isBarPage);
  const [values, setValues] = useState({ name: "", email: "", topic: "tech", message: "", company: "" });
  const [errors, setErrors] = useState({});
  const [phase, setPhase] = useState("idle"); // idle | sending | sent

  const channels = [
    { icon: <Mail size={16} />, label: t("contact.emailLabel"), value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: <Phone size={16} />, label: t("contact.phoneLabel"), value: CONTACT.phoneDisplay, href: `tel:${CONTACT.phone}` },
    { icon: <Linkedin size={16} />, label: "LinkedIn", value: CONTACT.linkedinDisplay, href: CONTACT.linkedin },
    { icon: <Github size={16} />, label: "GitHub", value: CONTACT.githubDisplay, href: CONTACT.github },
    { icon: <DiscordIcon size={16} />, label: "Discord", value: CONTACT.discordDisplay, href: CONTACT.discord },
    { icon: <MapPin size={16} />, label: t("contact.locationLabel"), value: t("contact.locationValue"), href: null },
  ];

  const setField = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setErrors((err) => ({ ...err, [field]: undefined }));
  };
  const setTopic = (topic) => setValues((v) => ({ ...v, topic }));

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = t("form.errName");
    if (!values.email.trim()) next.email = t("form.errEmail");
    else if (!EMAIL_RE.test(values.email.trim())) next.email = t("form.errEmailInvalid");
    if (!values.message.trim()) next.message = t("form.errMessage");
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phase === "sending") return;
    if (values.company) return; // honeypot
    if (!validate()) return;
    setPhase("sending");
    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      topic: values.topic,
      message: values.message.trim(),
      lang,
      source: location.pathname,
      sentAt: new Date().toISOString(),
    };
    try {
      const res = await submitContact(payload);
      setPhase(res?.success ? "sent" : "idle");
    } catch {
      setPhase("idle");
    }
  };

  const reset = () => {
    setValues({ name: "", email: "", topic: "tech", message: "", company: "" });
    setErrors({});
    setPhase("idle");
  };

  const honeypot = (
    <input
      type="text"
      name="company"
      value={values.company}
      onChange={setField("company")}
      className="vp-form__honeypot"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
    />
  );

  const intentChips = (
    <div className="vp-cform__intents" role="group" aria-label={t("form.topic")}>
      {INTENTS.map((it) => {
        const { key } = it;
        const Icon = it.icon;
        return (
          <button
            key={key}
            type="button"
            className={`vp-cform__intent ${values.topic === key ? "is-on" : ""}`}
            aria-pressed={values.topic === key}
            onClick={() => setTopic(key)}
          >
            <Icon size={14} aria-hidden="true" />
            {t(`contact.intents.${key}`)}
          </button>
        );
      })}
    </div>
  );

  return (
    <section className="vp-section vp-contact-sec" id={CONTACT_ANCHOR_ID} data-cmode={cliMode ? "tech" : "soft"}>
      <div className="vp-container vp-contact-sec__grid">
        {/* ---- left rail: heading + direct channels ---- */}
        <div className="vp-contact-sec__info">
          <Reveal>
            <p className="vp-kicker">{t("contact.kicker")}</p>
            <h2 className="vp-h2">{t("contact.title")}</h2>
            <p className="vp-sub">{t("contact.sub")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="vp-channels">
              {channels.map((c) => (
                <li key={c.label}>
                  {c.href ? (
                    <a
                      className="vp-channels__row"
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                    >
                      <span className="vp-channels__icon">{c.icon}</span>
                      <span className="vp-channels__label">{c.label}</span>
                      <span className="vp-channels__value">
                        {c.value}
                        <ArrowUpRight size={13} className="vp-arrow" aria-hidden="true" />
                      </span>
                    </a>
                  ) : (
                    <div className="vp-channels__row">
                      <span className="vp-channels__icon">{c.icon}</span>
                      <span className="vp-channels__label">{c.label}</span>
                      <span className="vp-channels__value">{c.value}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.16}>
            <CvButtons variant={variantForPath(location.pathname)} />
          </Reveal>
        </div>

        {/* ---- right rail: the mode-aware contact experience ---- */}
        <Reveal delay={0.15} className="vp-contact-sec__form-wrap">
          {cliMode ? (
            /* ===== TECH: the terminal ===== */
            <div className="vp-cform vp-cform--cli" dir="ltr">
              <div className="vp-cform__cli-bar">
                <span className="vp-terminal__dot vp-terminal__dot--r" />
                <span className="vp-terminal__dot vp-terminal__dot--y" />
                <span className="vp-terminal__dot vp-terminal__dot--g" />
                <span className="vp-cform__cli-title">{t("contact.cli.host")}</span>
              </div>
              <AnimatePresence mode="wait">
                {phase === "sent" ? (
                  <Motion.div key="ok" className="vp-cform__cli-body" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <p className="vp-cform__cli-line"><span className="vp-cform__prompt">$</span> curl -X POST /api/contact</p>
                    <p className="vp-cform__cli-line vp-cform__cli-line--dim">&gt; {t("contact.cli.posting")}</p>
                    <p className="vp-cform__cli-line vp-cform__cli-ok">&lt; {t("contact.cli.ok")}</p>
                    <pre className="vp-cform__cli-json">{t("contact.cli.okBody")}</pre>
                    <p className="vp-cform__cli-msg">{t("form.successText")}</p>
                    <button type="button" className="vp-btn vp-btn--ghost vp-cform__send" onClick={reset}>{t("form.sendAnother")}</button>
                  </Motion.div>
                ) : (
                  <Motion.form key="form" className="vp-cform__cli-body" onSubmit={handleSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <p className="vp-cform__cli-line vp-cform__cli-line--dim">{t("contact.cli.hint")}</p>
                    <label className="vp-cform__cli-field">
                      <span className="vp-cform__prompt">name<span>:</span></span>
                      <input type="text" autoComplete="name" placeholder={t("form.namePh")} value={values.name} onChange={setField("name")} />
                    </label>
                    {errors.name && <span className="vp-cform__cli-err"># {errors.name}</span>}
                    <label className="vp-cform__cli-field">
                      <span className="vp-cform__prompt">email<span>:</span></span>
                      <input type="email" autoComplete="email" placeholder={t("form.emailPh")} value={values.email} onChange={setField("email")} />
                    </label>
                    {errors.email && <span className="vp-cform__cli-err"># {errors.email}</span>}
                    <div className="vp-cform__cli-field vp-cform__cli-field--intent">
                      <span className="vp-cform__prompt">intent<span>:</span></span>
                      {intentChips}
                    </div>
                    <label className="vp-cform__cli-field vp-cform__cli-field--msg">
                      <span className="vp-cform__prompt">message<span>:</span></span>
                      <textarea rows={3} placeholder={t("form.messagePh")} value={values.message} onChange={setField("message")} />
                    </label>
                    {errors.message && <span className="vp-cform__cli-err"># {errors.message}</span>}
                    {honeypot}
                    <button type="submit" className="vp-cform__cli-send" disabled={phase === "sending"}>
                      <span className="vp-cform__prompt">$</span>
                      {phase === "sending" ? <><Loader2 size={14} className="vp-spin" aria-hidden="true" /> {t("contact.cli.sending")}</> : <><Send size={13} aria-hidden="true" /> {t("contact.cli.send")}</>}
                      <span className="vp-cform__caret" aria-hidden="true" />
                    </button>
                  </Motion.form>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* ===== BOTH / HOSPITALITY: a clean, friendly form ===== */
            <div className="vp-cform vp-cform--simple">
              <AnimatePresence mode="wait">
                {phase === "sent" ? (
                  <Motion.div key="ok" className="vp-cform__done" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                    <span className="vp-cform__done-icon"><Check size={36} /></span>
                    <h3>{t("form.successTitle")}</h3>
                    <p>{t("form.successText")}</p>
                    <button type="button" className="vp-btn vp-btn--ghost" onClick={reset}>{t("form.sendAnother")}</button>
                  </Motion.div>
                ) : (
                  <Motion.form key="form" className="vp-cform__body" onSubmit={handleSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h3 className="vp-cform__heading">{t("contact.simple.heading")}</h3>
                    <p className="vp-cform__hint">{t("contact.simple.hint")}</p>
                    {intentChips}
                    <div className="vp-cform__row">
                      <div className={`vp-field ${errors.name ? "has-error" : ""}`}>
                        <input type="text" autoComplete="name" placeholder={t("form.namePh")} value={values.name} onChange={setField("name")} />
                        {errors.name && <span className="vp-field__error">{errors.name}</span>}
                      </div>
                      <div className={`vp-field ${errors.email ? "has-error" : ""}`}>
                        <input type="email" autoComplete="email" placeholder={t("form.emailPh")} value={values.email} onChange={setField("email")} />
                        {errors.email && <span className="vp-field__error">{errors.email}</span>}
                      </div>
                    </div>
                    <div className={`vp-field ${errors.message ? "has-error" : ""}`}>
                      <textarea rows={4} placeholder={t("form.messagePh")} value={values.message} onChange={setField("message")} />
                      {errors.message && <span className="vp-field__error">{errors.message}</span>}
                    </div>
                    {honeypot}
                    <button type="submit" className="vp-btn vp-btn--primary vp-cform__send" disabled={phase === "sending"}>
                      {phase === "sending" ? <><Loader2 size={16} className="vp-spin" aria-hidden="true" /> {t("form.sending")}</> : <><Send size={15} aria-hidden="true" /> {t("form.submit")}</>}
                    </button>
                  </Motion.form>
                )}
              </AnimatePresence>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
};

export default ContactSection;

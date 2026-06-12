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
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import DiscordIcon from "./DiscordIcon.jsx";
import Reveal from "./Reveal.jsx";
import { usePortfolioLang } from "../context/usePortfolio.js";
import { CONTACT, CONTACT_ANCHOR_ID } from "../portfolio.constants.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Contact section with a real form.
 *
 * TODO(Vardges): wire `submitContact` to your backend. The payload shape is
 * stable — POST it to e.g. /api/public/contact and return the usual
 * { success, message, data } envelope. See NOTES.md → "Contact form backend".
 */
const submitContact = async (payload) => {
  // --- replace this block with the real API call -------------------------
  // const res = await fetch("/api/public/contact", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(payload),
  // });
  // return res.json();
  console.info("[contact-form] payload ready for backend:", payload);
  await new Promise((resolve) => setTimeout(resolve, 1100));
  return { success: true };
  // -----------------------------------------------------------------------
};

const ContactSection = () => {
  const { t, lang } = usePortfolioLang();
  const location = useLocation();
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
    if (values.company) return; // honeypot — bots only
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

  return (
    <section className="vp-section vp-contact-sec" id={CONTACT_ANCHOR_ID}>
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
        </div>

        {/* ---- right rail: the form ---- */}
        <Reveal delay={0.15} className="vp-contact-sec__form-wrap">
          <div className="vp-form-card">
            <AnimatePresence mode="wait">
              {phase === "sent" ? (
                <Motion.div
                  key="sent"
                  className="vp-form-success"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="vp-form-success__ring">
                    <CheckCircle2 size={42} aria-hidden="true" />
                  </span>
                  <h3>{t("form.successTitle")}</h3>
                  <p>{t("form.successText")}</p>
                  <button type="button" className="vp-btn vp-btn--ghost" onClick={reset}>
                    {t("form.sendAnother")}
                  </button>
                </Motion.div>
              ) : (
                <Motion.form
                  key="form"
                  className="vp-form"
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="vp-form__row">
                    <div className={`vp-field ${errors.name ? "has-error" : ""}`}>
                      <label htmlFor="vp-f-name">{t("form.name")}</label>
                      <input
                        id="vp-f-name"
                        type="text"
                        autoComplete="name"
                        placeholder={t("form.namePh")}
                        value={values.name}
                        onChange={setField("name")}
                      />
                      {errors.name && <span className="vp-field__error">{errors.name}</span>}
                    </div>
                    <div className={`vp-field ${errors.email ? "has-error" : ""}`}>
                      <label htmlFor="vp-f-email">{t("form.email")}</label>
                      <input
                        id="vp-f-email"
                        type="email"
                        autoComplete="email"
                        placeholder={t("form.emailPh")}
                        value={values.email}
                        onChange={setField("email")}
                      />
                      {errors.email && <span className="vp-field__error">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="vp-field">
                    <label htmlFor="vp-f-topic">{t("form.topic")}</label>
                    <div className="vp-field__select-wrap">
                      <select id="vp-f-topic" value={values.topic} onChange={setField("topic")}>
                        <option value="tech">{t("form.topicTech")}</option>
                        <option value="hospitality">{t("form.topicBar")}</option>
                        <option value="other">{t("form.topicOther")}</option>
                      </select>
                    </div>
                  </div>

                  <div className={`vp-field ${errors.message ? "has-error" : ""}`}>
                    <label htmlFor="vp-f-message">{t("form.message")}</label>
                    <textarea
                      id="vp-f-message"
                      rows={5}
                      placeholder={t("form.messagePh")}
                      value={values.message}
                      onChange={setField("message")}
                    />
                    {errors.message && <span className="vp-field__error">{errors.message}</span>}
                  </div>

                  {/* honeypot — invisible to humans, irresistible to bots */}
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

                  <div className="vp-form__foot">
                    <p className="vp-form__privacy">{t("form.privacy")}</p>
                    <button type="submit" className="vp-btn vp-btn--primary vp-form__submit" disabled={phase === "sending"}>
                      {phase === "sending" ? (
                        <>
                          <Loader2 size={16} className="vp-spin" aria-hidden="true" />
                          {t("form.sending")}
                        </>
                      ) : (
                        <>
                          <Send size={15} className="vp-arrow" aria-hidden="true" />
                          {t("form.submit")}
                        </>
                      )}
                    </button>
                  </div>
                </Motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactSection;

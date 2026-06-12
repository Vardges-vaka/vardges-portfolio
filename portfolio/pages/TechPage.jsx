import { useEffect, useState } from "react";
import {
  ArrowRight,
  Code2,
  Server,
  Cloud,
  Shield,
  ShieldCheck,
  KeyRound,
  Lock,
  FlaskConical,
  Languages,
  Rocket,
  Award,
  ChevronRight,
} from "lucide-react";
import { usePortfolioLang, usePortfolioTheme } from "../context/usePortfolio.js";
import CodeRain from "../components/canvas/CodeRain.jsx";
import Reveal from "../components/Reveal.jsx";
import TiltCard from "../components/TiltCard.jsx";
import Magnetic from "../components/Magnetic.jsx";
import { CONTACT, CONTACT_ANCHOR_ID } from "../portfolio.constants.js";
import "../styles/tech.css";

// Terminal script stays in English on purpose — terminals speak English.
const SCRIPT = [
  { cmd: "whoami", out: ["vardges — full-stack developer · dubai"] },
  { cmd: "cat focus.txt", out: ["web platforms · cloud · security · automation"] },
  { cmd: "./status --check", out: ["[ OK ]  open_to_work=true"] },
];

const Terminal = () => {
  const [lines, setLines] = useState([]); // rendered history
  const [typed, setTyped] = useState(""); // current command being typed
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= SCRIPT.length) return undefined;
    const { cmd, out } = SCRIPT[step];
    let i = 0;
    let outTimer;
    const typeTimer = setInterval(() => {
      i += 1;
      setTyped(cmd.slice(0, i));
      if (i >= cmd.length) {
        clearInterval(typeTimer);
        outTimer = setTimeout(() => {
          setLines((prev) => [...prev, { cmd, out }]);
          setTyped("");
          setStep((s) => s + 1);
        }, 450);
      }
    }, 55);
    return () => {
      clearInterval(typeTimer);
      clearTimeout(outTimer);
    };
  }, [step]);

  return (
    <div className="vp-terminal" dir="ltr" aria-hidden="true">
      <div className="vp-terminal__bar">
        <span className="vp-terminal__dot vp-terminal__dot--r" />
        <span className="vp-terminal__dot vp-terminal__dot--y" />
        <span className="vp-terminal__dot vp-terminal__dot--g" />
        <span className="vp-terminal__title">vardges@dubai: ~</span>
      </div>
      <div className="vp-terminal__body">
        {lines.map((l) => (
          <div key={l.cmd}>
            <p className="vp-terminal__cmd">
              <span className="vp-terminal__prompt">→&nbsp;~&nbsp;$</span> {l.cmd}
            </p>
            {l.out.map((o) => (
              <p className="vp-terminal__out" key={o}>
                {o}
              </p>
            ))}
          </div>
        ))}
        {step < SCRIPT.length && (
          <p className="vp-terminal__cmd">
            <span className="vp-terminal__prompt">→&nbsp;~&nbsp;$</span> {typed}
            <span className="vp-terminal__caret" />
          </p>
        )}
        {step >= SCRIPT.length && (
          <p className="vp-terminal__cmd">
            <span className="vp-terminal__prompt">→&nbsp;~&nbsp;$</span>
            <span className="vp-terminal__caret" />
          </p>
        )}
      </div>
    </div>
  );
};

const GROUP_ICONS = [Code2, Server, Cloud, Shield];
const SECURITY_ICONS = [ShieldCheck, KeyRound, Lock, FlaskConical];
const BULLET_ICONS = [Cloud, Lock, Languages, Rocket];
const PROVIDERS = ["Google Cloud Storage", "AWS S3", "Cloudflare R2", "Azure Blob"];

const TechPage = () => {
  const { t } = usePortfolioLang();
  const { isDark } = usePortfolioTheme();

  const groups = t("tech.stack.groups");
  const bullets = t("tech.project.bullets");
  const securityCards = t("tech.security.cards");
  const certs = t("tech.certs.items");

  const scrollToContact = () =>
    document.getElementById(CONTACT_ANCHOR_ID)?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="vp-page vp-page--tech">
      {/* ============ HERO ============ */}
      <section className="vp-tech-hero">
        <CodeRain
          color={isDark ? "#38e1c8" : "#0b8d7b"}
          fadeRGB={isDark ? "6,9,12" : "244,243,238"}
          opacity={isDark ? 0.5 : 0.35}
        />
        <div className="vp-tech-hero__scrim" aria-hidden="true" />
        <div className="vp-container vp-tech-hero__grid">
          <div className="vp-tech-hero__text">
            <Reveal y={18}>
              <p className="vp-kicker vp-kicker--mono">{t("tech.hero.kicker")}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="vp-h1">{t("tech.hero.title")}</h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="vp-sub">{t("tech.hero.sub")}</p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="vp-open-badge">
                <span className="vp-open-badge__pulse" aria-hidden="true" />
                {t("tech.hero.open")}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="vp-btn-row">
                <Magnetic>
                  <a className="vp-btn vp-btn--primary" href="#vp-tech-project">
                    {t("tech.hero.ctaProject")}
                  </a>
                </Magnetic>
                <Magnetic>
                  <button type="button" className="vp-btn vp-btn--ghost" onClick={scrollToContact}>
                    {t("tech.hero.ctaContact")}
                  </button>
                </Magnetic>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.25} className="vp-tech-hero__term">
            <Terminal />
          </Reveal>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section className="vp-section vp-tech-about">
        <div className="vp-container vp-tech-about__grid">
          <Reveal>
            <p className="vp-kicker">{t("tech.about.kicker")}</p>
            <h2 className="vp-h2">{t("tech.about.title")}</h2>
          </Reveal>
          <div className="vp-tech-about__paras">
            {["p1", "p2", "p3"].map((k, i) => (
              <Reveal key={k} delay={0.08 + i * 0.08}>
                <p className="vp-sub vp-tech-about__para">
                  <span className="vp-tech-about__index">0{i + 1}</span>
                  {t(`tech.about.${k}`)}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STACK ============ */}
      <section className="vp-section vp-tech-stack">
        <div className="vp-container">
          <Reveal>
            <p className="vp-kicker">{t("tech.stack.kicker")}</p>
            <h2 className="vp-h2">{t("tech.stack.title")}</h2>
            <p className="vp-sub">{t("tech.stack.sub")}</p>
          </Reveal>
          <div className="vp-tech-stack__grid">
            {groups.map((g, gi) => {
              const Icon = GROUP_ICONS[gi] ?? Code2;
              return (
                <Reveal key={g.name} delay={gi * 0.08}>
                  <TiltCard className="vp-tech-stack__card" max={6}>
                    <div className="vp-tech-stack__head">
                      <span className="vp-icon-pill">
                        <Icon size={17} aria-hidden="true" />
                      </span>
                      <h3>{g.name}</h3>
                    </div>
                    <ul className="vp-tech-stack__list">
                      {g.items.map((item) => (
                        <li key={item}>
                          <ChevronRight size={13} className="vp-arrow" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ PROJECT ============ */}
      <section className="vp-section vp-tech-project" id="vp-tech-project">
        <div className="vp-container">
          <Reveal>
            <p className="vp-kicker">{t("tech.project.kicker")}</p>
            <h2 className="vp-h2">{t("tech.project.title")}</h2>
          </Reveal>

          <div className="vp-tech-project__panel">
            <div className="vp-tech-project__info">
              <Reveal>
                <h3 className="vp-tech-project__name">{t("tech.project.name")}</h3>
                <p className="vp-sub">{t("tech.project.desc")}</p>
                <p className="vp-tech-project__stackline" dir="ltr">
                  {t("tech.project.stackLine")}
                </p>
              </Reveal>
              <div className="vp-tech-project__bullets">
                {bullets.map((b, i) => {
                  const Icon = BULLET_ICONS[i] ?? Cloud;
                  return (
                    <Reveal key={b.title} delay={0.06 + i * 0.07}>
                      <div className="vp-tech-project__bullet">
                        <span className="vp-icon-pill">
                          <Icon size={16} aria-hidden="true" />
                        </span>
                        <div>
                          <h4>{b.title}</h4>
                          <p>{b.text}</p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>

            <Reveal delay={0.2} className="vp-tech-project__mock-wrap">
              <div className="vp-mock" dir="ltr">
                <div className="vp-mock__bar">
                  <span className="vp-mock__dot" />
                  <span className="vp-mock__dot" />
                  <span className="vp-mock__dot" />
                  <span className="vp-mock__url">vardges.me/admin — cloud monitor</span>
                </div>
                <div className="vp-mock__body">
                  {PROVIDERS.map((p, i) => (
                    <div className="vp-mock__row" key={p} style={{ "--d": `${i * 0.4}s` }}>
                      <span className="vp-mock__pulse" aria-hidden="true" />
                      <span className="vp-mock__name">{p}</span>
                      <span className="vp-mock__bar-track">
                        <span className="vp-mock__bar-fill" style={{ "--w": `${88 - i * 9}%` }} />
                      </span>
                      <span className="vp-mock__ok">OK</span>
                    </div>
                  ))}
                </div>
                <p className="vp-mock__note">{t("tech.project.mockNote")}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ SECURITY ============ */}
      <section className="vp-section vp-tech-security">
        <div className="vp-container">
          <Reveal>
            <p className="vp-kicker">{t("tech.security.kicker")}</p>
            <h2 className="vp-h2">{t("tech.security.title")}</h2>
            <p className="vp-sub">{t("tech.security.sub")}</p>
          </Reveal>
          <div className="vp-tech-security__grid">
            {securityCards.map((c, i) => {
              const Icon = SECURITY_ICONS[i] ?? ShieldCheck;
              return (
                <Reveal key={c.title} delay={i * 0.08}>
                  <TiltCard className="vp-tech-security__card" max={6}>
                    <span className="vp-icon-pill vp-icon-pill--lg">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <h3>{c.title}</h3>
                    <p>{c.text}</p>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ CERTS ============ */}
      <section className="vp-section vp-tech-certs">
        <div className="vp-container">
          <Reveal>
            <p className="vp-kicker">{t("tech.certs.kicker")}</p>
            <h2 className="vp-h2">{t("tech.certs.title")}</h2>
          </Reveal>
          <div className="vp-cert-list">
            {certs.map((c, i) => (
              <Reveal key={c} delay={i * 0.07}>
                <div className="vp-cert-row">
                  <Award size={18} aria-hidden="true" />
                  <span>{c}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="vp-section vp-cta-band vp-cta-band--tech">
        <div className="vp-container vp-cta-band__inner">
          <Reveal>
            <h2 className="vp-cta-band__title">{t("tech.cta.title")}</h2>
            <p className="vp-cta-band__sub">{t("tech.cta.sub")}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <Magnetic strength={0.25}>
              <a className="vp-btn vp-btn--invert" href={`mailto:${CONTACT.email}`}>
                {t("tech.cta.button")}
                <ArrowRight size={16} className="vp-arrow" aria-hidden="true" />
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default TechPage;

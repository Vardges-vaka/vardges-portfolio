import {
  ArrowRight,
  Martini,
  GraduationCap,
  ClipboardList,
  Rocket,
  Boxes,
  HeartHandshake,
  Award,
  Check,
} from "lucide-react";
import { usePortfolioLang, usePortfolioTheme } from "../context/usePortfolio.js";
import Bubbles from "../components/canvas/Bubbles.jsx";
import WireGlobe from "../components/canvas/WireGlobe.jsx";
import Reveal from "../components/Reveal.jsx";
import Counter from "../components/Counter.jsx";
import TiltCard from "../components/TiltCard.jsx";
import Magnetic from "../components/Magnetic.jsx";
import { CONTACT, CONTACT_ANCHOR_ID } from "../portfolio.constants.js";
import "../styles/bar.css";

const SERVICE_ICONS = [Martini, GraduationCap, ClipboardList, Rocket, Boxes, HeartHandshake];
const AGGREGATORS = ["Talabat", "Careem", "Deliveroo", "Noon Food"];

const BarPage = () => {
  const { t } = usePortfolioLang();
  const { isDark } = usePortfolioTheme();

  const numbers = t("bar.numbers.items");
  const courses = t("bar.menu.courses");
  const services = t("bar.tree.services");
  const vkusnoPoints = t("bar.vkusno.points");
  const certs = t("bar.certs.items");

  const scrollToContact = () =>
    document.getElementById(CONTACT_ANCHOR_ID)?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="vp-page vp-page--bar">
      {/* ============ HERO ============ */}
      <section className="vp-bar-hero">
        <Bubbles rgb={isDark ? "233,178,92" : "146,98,21"} />
        <div className="vp-bar-hero__vignette" aria-hidden="true" />

        <div className="vp-bar-hero__frame">
          <span className="vp-bar-hero__corner vp-bar-hero__corner--tl" aria-hidden="true" />
          <span className="vp-bar-hero__corner vp-bar-hero__corner--tr" aria-hidden="true" />
          <span className="vp-bar-hero__corner vp-bar-hero__corner--bl" aria-hidden="true" />
          <span className="vp-bar-hero__corner vp-bar-hero__corner--br" aria-hidden="true" />

          <Reveal y={16}>
            <p className="vp-kicker vp-bar-hero__kicker">{t("bar.hero.kicker")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="vp-bar-hero__title">{t("bar.hero.title")}</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="vp-sub vp-bar-hero__sub">{t("bar.hero.sub")}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="vp-btn-row vp-bar-hero__btns">
              <Magnetic>
                <a className="vp-btn vp-btn--gold" href="#vp-bar-menu">
                  {t("bar.hero.cta1")}
                </a>
              </Magnetic>
              <Magnetic>
                <button type="button" className="vp-btn vp-btn--ghost" onClick={scrollToContact}>
                  {t("bar.hero.cta2")}
                </button>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ NUMBERS + GLOBE ============ */}
      <section className="vp-section vp-bar-numbers">
        <div className="vp-container vp-bar-numbers__grid">
          <div>
            <Reveal>
              <p className="vp-kicker">{t("bar.numbers.kicker")}</p>
              <h2 className="vp-h2">{t("bar.numbers.title")}</h2>
            </Reveal>
            <div className="vp-stats vp-stats--bar">
              {numbers.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.07} className="vp-stats__cell">
                  <span className="vp-stats__value">
                    <Counter value={s.value} suffix={s.suffix} />
                  </span>
                  <span className="vp-stats__label">{s.label}</span>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.2} className="vp-bar-numbers__globe-wrap">
            <div className="vp-bar-numbers__globe">
              <WireGlobe
                dotRGB={isDark ? "214,200,170" : "90,80,60"}
                accent={isDark ? "#e9a23b" : "#a4650e"}
              />
            </div>
            <p className="vp-bar-numbers__note">{t("bar.numbers.globeNote")}</p>
          </Reveal>
        </div>
      </section>

      {/* ============ TASTING MENU ============ */}
      <section className="vp-section vp-bar-menu" id="vp-bar-menu">
        <div className="vp-container">
          <Reveal>
            <p className="vp-kicker">{t("bar.menu.kicker")}</p>
            <h2 className="vp-h2 vp-h2--serif">{t("bar.menu.title")}</h2>
            <p className="vp-sub">{t("bar.menu.sub")}</p>
          </Reveal>

          <div className="vp-menu">
            {courses.map((c, i) => (
              <Reveal key={`${c.course}-${c.year}`} delay={Math.min(i * 0.05, 0.25)}>
                <article className="vp-menu__row">
                  <div className="vp-menu__head">
                    <span className="vp-menu__course">
                      {String(i + 1).padStart(2, "0")} · {c.course}
                    </span>
                    <span className="vp-menu__leader" aria-hidden="true" />
                    <span className="vp-menu__year">{c.year}</span>
                  </div>
                  <h3 className="vp-menu__role">{c.role}</h3>
                  <p className="vp-menu__venue">
                    {c.venue} — <span>{c.city}</span>
                  </p>
                  <p className="vp-menu__text">{c.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ THE COCKTAIL TREE ============ */}
      <section className="vp-section vp-bar-tree">
        <div className="vp-container">
          <Reveal>
            <p className="vp-kicker">{t("bar.tree.kicker")}</p>
            <h2 className="vp-h2 vp-h2--serif">{t("bar.tree.title")}</h2>
            <p className="vp-sub vp-bar-tree__desc">{t("bar.tree.desc")}</p>
          </Reveal>
          <div className="vp-bar-tree__grid">
            {services.map((s, i) => {
              const Icon = SERVICE_ICONS[i] ?? Martini;
              return (
                <Reveal key={s.title} delay={Math.min(i * 0.07, 0.35)}>
                  <TiltCard className="vp-bar-tree__card" max={6}>
                    <span className="vp-icon-pill vp-icon-pill--gold">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ VKUSNO ============ */}
      <section className="vp-section vp-bar-vkusno">
        <div className="vp-container vp-bar-vkusno__panel">
          <div>
            <Reveal>
              <p className="vp-kicker">{t("bar.vkusno.kicker")}</p>
              <h2 className="vp-h2">{t("bar.vkusno.title")}</h2>
              <p className="vp-bar-vkusno__role">{t("bar.vkusno.role")}</p>
              <p className="vp-sub">{t("bar.vkusno.desc")}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="vp-bar-vkusno__chips">
                {AGGREGATORS.map((a) => (
                  <span className="vp-chip vp-chip--gold" key={a}>
                    {a}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
          <div className="vp-bar-vkusno__points">
            {vkusnoPoints.map((p, i) => (
              <Reveal key={p} delay={0.08 + i * 0.06}>
                <p className="vp-bar-vkusno__point">
                  <Check size={15} aria-hidden="true" />
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CERTS ============ */}
      <section className="vp-section vp-bar-certs">
        <div className="vp-container">
          <Reveal>
            <p className="vp-kicker">{t("bar.certs.kicker")}</p>
            <h2 className="vp-h2 vp-h2--serif">{t("bar.certs.title")}</h2>
          </Reveal>
          <div className="vp-cert-list">
            {certs.map((c, i) => (
              <Reveal key={c} delay={i * 0.07}>
                <div className="vp-cert-row vp-cert-row--gold">
                  <Award size={18} aria-hidden="true" />
                  <span>{c}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="vp-section vp-cta-band vp-cta-band--bar">
        <div className="vp-container vp-cta-band__inner">
          <Reveal>
            <h2 className="vp-cta-band__title">{t("bar.cta.title")}</h2>
            <p className="vp-cta-band__sub">{t("bar.cta.sub")}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <Magnetic strength={0.25}>
              <a className="vp-btn vp-btn--invert" href={`mailto:${CONTACT.email}`}>
                {t("bar.cta.button")}
                <ArrowRight size={16} className="vp-arrow" aria-hidden="true" />
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default BarPage;

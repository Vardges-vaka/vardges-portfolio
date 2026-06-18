import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { ArrowRight, Code2, Martini, ChevronDown, Network, ChevronUp } from "lucide-react";
import { usePortfolioLang, usePortfolioTheme } from "../context/usePortfolio.js";
import Reveal from "../components/Reveal.jsx";
import Counter from "../components/Counter.jsx";
import TiltCard from "../components/TiltCard.jsx";
import Media from "../components/Media.jsx";
import ContactSection from "../components/ContactSection.jsx";
import Testimonials from "../components/Testimonials.jsx";
import SectionAtmosphere from "../components/fx/SectionAtmosphere.jsx";
import AsciiField from "../components/fx/AsciiField.jsx";
import Prism3D from "../components/fx/Prism3D.jsx";
import NowPanel from "../components/NowPanel.jsx";
import LifeMap from "../components/interactive/LifeMap.jsx";
import KnowledgeGraph from "../components/interactive/LazyKnowledgeGraph.jsx";
import { TESTIMONIALS } from "../data/testimonials.js";
import "../styles/home.css";

const HomePage = () => {
  const { t } = usePortfolioLang();
  const { isDark } = usePortfolioTheme();
  const [showMap, setShowMap] = useState(false);

  const name = t("home.hero.name");
  const words = name.split(" ");
  const marquee = t("home.marquee");
  const stats = t("home.stats.items");
  const timeline = t("home.timeline.items");
  const legend = t("home.timeline.legend");
  const badges = t("home.intro.badges");

  return (
    <main className="vp-page vp-page--home" id="vp-main" tabIndex={-1}>
      {/* ============ HERO ============ */}
      <section className="vp-home-hero">
        <div className="vp-home-hero__glow vp-home-hero__glow--a" aria-hidden="true" />
        <div className="vp-home-hero__glow vp-home-hero__glow--b" aria-hidden="true" />

        <div className="vp-home-hero__content">
          <Motion.div
            initial={{ opacity: 0, y: 18, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Prism3D techLabel={t("home.hero.techWord")} barLabel={t("home.hero.barWord")} />
          </Motion.div>

          <Motion.p
            className="vp-kicker vp-home-hero__kicker"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            {t("home.hero.kicker")}
          </Motion.p>

          <h1 className="vp-home-hero__name" aria-label={name}>
            {words.map((word, wi) => (
              <span className="vp-home-hero__word-wrap" key={`${word}-${wi}`}>
                <Motion.span
                  className="vp-home-hero__word"
                  initial={{ y: "110%", rotate: 4 }}
                  animate={{ y: "0%", rotate: 0 }}
                  transition={{ delay: 0.25 + wi * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </Motion.span>
              </span>
            ))}
          </h1>

          <Motion.p
            className="vp-home-hero__tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.8 }}
          >
            {t("home.hero.tagline")}
          </Motion.p>

          <div className="vp-home-hero__doors">
            <Motion.div
              className="vp-door-wrap vp-door-wrap--tech"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to="/tech" className="vp-door vp-door--tech">
                <span className="vp-door__icon">
                  <Code2 size={22} aria-hidden="true" />
                </span>
                <span className="vp-door__word">{t("home.hero.techWord")}</span>
                <span className="vp-door__sub">{t("home.hero.techSub")}</span>
                <span className="vp-door__cta">
                  {t("home.hero.enterTech")}
                  <ArrowRight size={15} className="vp-arrow" aria-hidden="true" />
                </span>
              </Link>
            </Motion.div>

            <Motion.div
              className="vp-door-wrap vp-door-wrap--bar"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to="/bar" className="vp-door vp-door--bar">
                <span className="vp-door__icon">
                  <Martini size={22} aria-hidden="true" />
                </span>
                <span className="vp-door__word">{t("home.hero.barWord")}</span>
                <span className="vp-door__sub">{t("home.hero.barSub")}</span>
                <span className="vp-door__cta">
                  {t("home.hero.enterBar")}
                  <ArrowRight size={15} className="vp-arrow" aria-hidden="true" />
                </span>
              </Link>
            </Motion.div>
          </div>
        </div>

        <Motion.div
          className="vp-home-hero__bottom"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.45, duration: 0.9 }}
        >
          <NowPanel />
          <div className="vp-home-hero__scroll">
            <span>{t("home.hero.scroll")}</span>
            <ChevronDown size={16} aria-hidden="true" />
          </div>
        </Motion.div>
      </section>

      {/* ============ MARQUEE ============ */}
      <div className="vp-marquee" aria-hidden="true">
        <div className="vp-marquee__track">
          {[0, 1].map((dup) => (
            <div className="vp-marquee__group" key={dup}>
              {marquee.map((item) => (
                <span className="vp-marquee__item" key={`${dup}-${item}`}>
                  {item}
                  <span className="vp-marquee__star">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ============ INTRO ============ */}
      <section className="vp-section vp-home-intro">
        <div className="vp-container vp-home-intro__grid">
          <div className="vp-home-intro__text">
            <Reveal>
              <p className="vp-kicker">{t("home.intro.kicker")}</p>
              <h2 className="vp-h2">{t("home.intro.title")}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="vp-sub">{t("home.intro.p1")}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="vp-sub">{t("home.intro.p2")}</p>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="vp-sub vp-home-intro__punch">{t("home.intro.p3")}</p>
            </Reveal>
            <Reveal delay={0.28}>
              <div className="vp-home-intro__badges">
                {badges.map((b) => (
                  <span className="vp-chip" key={b}>
                    {b}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="vp-home-intro__visual-wrap">
            <TiltCard className="vp-home-intro__visual" max={10}>
              <div className="vp-monogram">
                <div className="vp-monogram__ring" aria-hidden="true" />
                <div className="vp-monogram__ring vp-monogram__ring--2" aria-hidden="true" />
                <Media
                  assetId="ASSET-H1"
                  type="image"
                  label="Portrait — Vardges Petrosyan"
                  aspect="4 / 5"
                  className="vp-monogram__portrait"
                />
                <span className="vp-monogram__caption">{t("meta.role")}</span>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      {/* ============ UNIVERSE GRAPH ============ */}
      <section className="vp-section vp-home-universe">
        <div className="vp-container">
          <Reveal>
            <p className="vp-kicker">{t("home.universe.kicker")}</p>
            <h2 className="vp-h2">{t("home.universe.title")}</h2>
            <p className="vp-sub vp-home-universe__sub">{t("home.universe.sub")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <KnowledgeGraph variant="universe" />
          </Reveal>
          <p className="vp-home-universe__hint">{t("home.universe.hint")}</p>
        </div>
      </section>

      {/* ============ MIND MAP (revealed on demand) ============ */}
      <section className="vp-section vp-home-map">
        <div className="vp-container">
          <Reveal>
            <p className="vp-kicker">{t("lifemap.kicker")}</p>
            <h2 className="vp-h2">{t("lifemap.title")}</h2>
            <p className="vp-sub">{t("lifemap.sub")}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <button
              type="button"
              className="vp-btn vp-map-toggle"
              aria-expanded={showMap}
              onClick={() => setShowMap((v) => !v)}
            >
              <Network size={16} aria-hidden="true" />
              {showMap ? t("lifemap.hide") : t("lifemap.show")}
              {showMap ? <ChevronUp size={15} aria-hidden="true" /> : <ChevronDown size={15} aria-hidden="true" />}
            </button>
          </Reveal>
        </div>
        <AnimatePresence initial={false}>
          {showMap && (
            <Motion.div
              key="map"
              className="vp-home-map__reveal"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <LifeMap />
            </Motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ============ STATS ============ */}
      <section className="vp-section vp-home-stats">
        <div className="vp-container">
          <Reveal>
            <p className="vp-kicker">{t("home.stats.kicker")}</p>
            <h2 className="vp-h2">{t("home.stats.title")}</h2>
          </Reveal>
          <div className="vp-stats">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.07} className="vp-stats__cell">
                <span className="vp-stats__value">
                  <Counter value={s.value} suffix={s.suffix} />
                </span>
                <span className="vp-stats__label">{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TIMELINE ============ */}
      <section className="vp-section vp-home-timeline">
        <SectionAtmosphere kind="topo" />
        <div className="vp-container">
          <Reveal>
            <p className="vp-kicker">{t("home.timeline.kicker")}</p>
            <h2 className="vp-h2">{t("home.timeline.title")}</h2>
            <p className="vp-sub">{t("home.timeline.sub")}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="vp-tl-legend">
              <span className="vp-tl-legend__item vp-tl-legend__item--bar">{legend.bar}</span>
              <span className="vp-tl-legend__item vp-tl-legend__item--tech">{legend.tech}</span>
              <span className="vp-tl-legend__item vp-tl-legend__item--hybrid">{legend.hybrid}</span>
            </div>
          </Reveal>

          <div className="vp-recipe">
            <div className="vp-recipe__rail" aria-hidden="true" />
            {timeline.map((item, i) => (
              <Motion.div
                key={`${item.year}-${item.title}`}
                className={`vp-recipe__layer vp-recipe__layer--${item.type}`}
                initial={{ opacity: 0, y: 26, scale: 0.985 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="vp-recipe__tab">
                  <span className="vp-recipe__num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="vp-recipe__year">{item.year}</span>
                  <span className="vp-recipe__flow" aria-hidden="true" />
                </div>
                <div className="vp-recipe__body">
                  <h3 className="vp-recipe__title">{item.title}</h3>
                  <p className="vp-recipe__place">{item.place}</p>
                  <p className="vp-recipe__text">{item.text}</p>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ DOORS (bottom) ============ */}
      <section className="vp-section vp-home-doors">
        <AsciiField color={isDark ? "#38e1c8" : "#0b8d7b"} />
        <div className="vp-container">
          <Reveal>
            <p className="vp-kicker">{t("home.doors.kicker")}</p>
            <h2 className="vp-h2">{t("home.doors.title")}</h2>
          </Reveal>
          <div className="vp-home-doors__grid">
            <Reveal delay={0.08}>
              <Link to="/tech" className="vp-bigdoor vp-bigdoor--tech">
                <span className="vp-bigdoor__num">01</span>
                <h3 className="vp-bigdoor__title">{t("home.doors.tech.title")}</h3>
                <p className="vp-bigdoor__sub">{t("home.doors.tech.sub")}</p>
                <span className="vp-bigdoor__cta">
                  {t("home.doors.tech.cta")}
                  <ArrowRight size={16} className="vp-arrow" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
            <Reveal delay={0.16}>
              <Link to="/bar" className="vp-bigdoor vp-bigdoor--bar">
                <span className="vp-bigdoor__num">02</span>
                <h3 className="vp-bigdoor__title">{t("home.doors.bar.title")}</h3>
                <p className="vp-bigdoor__sub">{t("home.doors.bar.sub")}</p>
                <span className="vp-bigdoor__cta">
                  {t("home.doors.bar.cta")}
                  <ArrowRight size={16} className="vp-arrow" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <Testimonials items={TESTIMONIALS} variant="home" />

      {/* ============ CONTACT ============ */}
      <ContactSection />
    </main>
  );
};

export default HomePage;

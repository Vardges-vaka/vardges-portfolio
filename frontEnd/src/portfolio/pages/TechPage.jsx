import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
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
  ChevronRight,
  Database,
  Cpu,
  GitBranch,
  Terminal as TerminalIcon,
  Braces,
  Bug,
} from "lucide-react";

import { usePortfolioLang, usePortfolioTheme } from "../context/usePortfolio.js";
import Reveal from "../components/Reveal.jsx";
import TiltCard from "../components/TiltCard.jsx";
import Magnetic from "../components/Magnetic.jsx";
import ProjectsGrid from "../components/ProjectsGrid.jsx";
import CertWall from "../components/CertWall.jsx";
import ContactSection from "../components/ContactSection.jsx";
import SkillsRadar from "../components/SkillsRadar.jsx";
import KnowledgeGraph from "../components/interactive/KnowledgeGraph.jsx";
import SectionAtmosphere from "../components/fx/SectionAtmosphere.jsx";
import AsciiField from "../components/fx/AsciiField.jsx";
import { SAMPLE_PROJECTS } from "../data/sampleProjects.js";
import { ALL_TECH_CERTS } from "../data/certificates.js";
import { techSkillStrengths } from "../data/graphData.js";
import { CONTACT_ANCHOR_ID } from "../portfolio.constants.js";
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

// brand/tech names — intentionally not translated
const TECH_TICKER = [
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "AWS",
  "GCP",
  "Azure",
  "Cloudflare R2",
  "Security",
  "CI/CD",
  "Automation",
  "i18n",
];

// radar axis key -> graph skill id. Values are derived (evidence-based) from the
// number of earned certs + projects that feed each skill — see techSkillStrengths.
const TECH_AXES = [
  ["frontend", "sk-frontend"],
  ["backend", "sk-backend"],
  ["cloud", "sk-cloud"],
  ["security", "sk-security"],
  ["automation", "sk-automation"],
  ["ai", "sk-ai"],
  ["data", "sk-data"],
];

// floating decorative icons for the about section — position/timing via CSS vars
const FLOAT_ICONS = [
  { Icon: Braces, x: "8%", y: "12%", d: "0s", t: "7s" },
  { Icon: Database, x: "70%", y: "6%", d: "-2s", t: "9s" },
  { Icon: ShieldCheck, x: "84%", y: "48%", d: "-4s", t: "8s" },
  { Icon: Cpu, x: "16%", y: "62%", d: "-1s", t: "10s" },
  { Icon: GitBranch, x: "48%", y: "30%", d: "-5s", t: "7.5s" },
  { Icon: TerminalIcon, x: "60%", y: "74%", d: "-3s", t: "8.5s" },
  { Icon: Bug, x: "30%", y: "88%", d: "-6s", t: "9.5s" },
];

const TechPage = () => {
  const { t } = usePortfolioLang();
  const { isDark } = usePortfolioTheme();

  const groups = t("tech.stack.groups");
  const securityCards = t("tech.security.cards");
  const heroTitle = t("tech.hero.title");

  // evidence-based radar: strength = earned certs + projects feeding each skill
  const radarData = useMemo(() => {
    const s = techSkillStrengths();
    const max = Math.max(1, ...TECH_AXES.map(([, id]) => s[id] || 0));
    return {
      color: "tech",
      axes: TECH_AXES.map(([key, id]) => ({ key, value: Math.round(48 + 50 * ((s[id] || 0) / max)) })),
    };
  }, []);

  const scrollToContact = () =>
    document.getElementById(CONTACT_ANCHOR_ID)?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="vp-page vp-page--tech" id="vp-main" tabIndex={-1}>
      {/* ============ HERO ============ */}
      <section className="vp-tech-hero">
        <div className="vp-tech-hero__floor" aria-hidden="true" />
        <div className="vp-orb vp-orb--a" aria-hidden="true" />
        <div className="vp-orb vp-orb--b" aria-hidden="true" />
        <div className="vp-tech-hero__scrim" aria-hidden="true" />
        <div className="vp-scanlines" aria-hidden="true" />

        <div className="vp-container vp-tech-hero__grid">
          <div className="vp-tech-hero__text">
            <Reveal y={18}>
              <p className="vp-kicker vp-kicker--mono">{t("tech.hero.kicker")}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="vp-h1 vp-glitch" data-text={heroTitle}>
                {heroTitle}
              </h1>
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
                  <a className="vp-btn vp-btn--primary" href="#vp-projects">
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

      {/* ============ STACK TICKER ============ */}
      <div className="vp-marquee vp-marquee--tech" aria-hidden="true">
        <div className="vp-marquee__track">
          {[0, 1].map((dup) => (
            <div className="vp-marquee__group" key={dup}>
              {TECH_TICKER.map((item) => (
                <span className="vp-marquee__item" key={`${dup}-${item}`}>
                  {item}
                  <span className="vp-marquee__star">▮</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ============ ABOUT ============ */}
      <section className="vp-section vp-tech-about">
        <div className="vp-float-field" aria-hidden="true">
          {FLOAT_ICONS.map((f, i) => (
            <span
              key={i}
              className="vp-float-ico"
              style={{ "--fx": f.x, "--fy": f.y, "--fd": f.d, "--ft": f.t }}
            >
              <f.Icon size={22} />
            </span>
          ))}
        </div>
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
        <div className="vp-orb vp-orb--c" aria-hidden="true" />
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

      {/* ============ SKILLS & CONNECTIONS (radar + graph) ============ */}
      <section className="vp-section vp-skills-graph" id="vp-skills">
        <div className="vp-container">
          <Reveal>
            <p className="vp-kicker">{t("skills.connect.kicker")}</p>
            <h2 className="vp-h2">{t("skills.connect.title")}</h2>
            <p className="vp-sub">{t("skills.connect.sub")}</p>
          </Reveal>

          <div className="vp-skills-graph__top">
            <Reveal delay={0.1} className="vp-skills-graph__radar">
              <SkillsRadar data={radarData} variant="tech" />
            </Reveal>
            <Reveal delay={0.16} className="vp-skills-graph__aside">
              <h3 className="vp-skills-graph__aside-title">{t("skills.connect.radarTitle")}</h3>
              <p className="vp-sub">{t("skills.evidenceNote")}</p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1} className="vp-graph-sec__wrap">
          <div className="vp-container vp-graph-sec__intro">
            <p className="vp-kicker">{t("graph.kicker")}</p>
            <h3 className="vp-graph-sec__title">{t("graph.title")}</h3>
            <p className="vp-sub">{t("graph.sub")}</p>
          </div>
          <KnowledgeGraph />
        </Reveal>
      </section>

      {/* ============ PROJECTS ============ */}
      <section className="vp-section vp-tech-projects" id="vp-projects">
        <AsciiField color={isDark ? "#38e1c8" : "#0b8d7b"} className="vp-ascii--top" />
        <div className="vp-container">
          <Reveal>
            <p className="vp-kicker">{t("tech.projects.kicker")}</p>
            <h2 className="vp-h2">{t("tech.projects.title")}</h2>
            <p className="vp-sub">{t("tech.projects.sub")}</p>
            <p className="vp-sample-note">
              <span className="vp-sample-note__dot" aria-hidden="true" />
              {t("tech.projects.sampleNote")}
            </p>
          </Reveal>
          <ProjectsGrid projects={SAMPLE_PROJECTS} previewCount={3} />
        </div>
      </section>

      {/* ============ CERTS ============ */}
      <section className="vp-section vp-tech-certs">
        <SectionAtmosphere kind="dots" />
        <div className="vp-container">
          <Reveal>
            <p className="vp-kicker">{t("tech.certs.kicker")}</p>
            <h2 className="vp-h2">{t("tech.certs.title")}</h2>
            <p className="vp-sub">{t("tech.certs.sub")}</p>
          </Reveal>
          <CertWall
            certs={ALL_TECH_CERTS}
            viewLabel={t("tech.certs.view")}
            viewPathLabel={t("tech.certs.viewPath")}
            plannedLabel={t("tech.certs.planned")}
            labels={t("certCats")}
            variant="tech"
            previewCount={6}
            showAllLabel={t("tech.certs.showAll")}
            showLessLabel={t("tech.certs.showLess")}
          />
        </div>
      </section>

      {/* ============ SECURITY ============ */}
      <section className="vp-section vp-tech-security">
        <SectionAtmosphere kind="grid" />
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

      {/* ============ LAB TEASER ============ */}
      <section className="vp-section vp-lab-teaser-sec">
        <div className="vp-container">
          <Reveal>
            <Link to="/lab" className="vp-lab-teaser">
              <span className="vp-lab-teaser__icon" aria-hidden="true">
                <FlaskConical size={24} />
              </span>
              <div className="vp-lab-teaser__text">
                <p className="vp-kicker">{t("tech.lab.kicker")}</p>
                <h2 className="vp-lab-teaser__title">{t("tech.lab.title")}</h2>
                <p className="vp-sub">{t("tech.lab.sub")}</p>
              </div>
              <span className="vp-lab-teaser__cta">
                {t("tech.lab.cta")}
                <ArrowRight size={16} className="vp-arrow" aria-hidden="true" />
              </span>
            </Link>
          </Reveal>
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
              <button type="button" className="vp-btn vp-btn--invert" onClick={scrollToContact}>
                {t("tech.cta.button")}
                <ArrowRight size={16} className="vp-arrow" aria-hidden="true" />
              </button>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <ContactSection />
    </main>
  );
};

export default TechPage;

import { ArrowLeft, FlaskConical, Sparkles, ShieldAlert, Martini } from "lucide-react";
import { Link } from "react-router-dom";
import { usePortfolioLang, usePortfolioMode } from "../context/usePortfolio.js";
import Reveal from "../components/Reveal.jsx";
import Magnetic from "../components/Magnetic.jsx";
import PhishGame from "../components/interactive/PhishGame.jsx";
import CrackTheVault from "../components/interactive/CrackTheVault.jsx";
import HashForge from "../components/interactive/HashForge.jsx";
import CipherLab from "../components/interactive/CipherLab.jsx";
import CocktailBuilder from "../components/interactive/CocktailBuilder.jsx";
import GuessTheCocktail from "../components/interactive/GuessTheCocktail.jsx";
import ShakeOrStir from "../components/interactive/ShakeOrStir.jsx";
import PourCostLab from "../components/interactive/PourCostLab.jsx";
import NameThatSpirit from "../components/interactive/NameThatSpirit.jsx";
import SectionAtmosphere from "../components/fx/SectionAtmosphere.jsx";
import "../styles/tech.css";
import "../styles/bar.css";
import "../styles/lab.css";

/**
 * The Lab — a playground for the interactive, game-like pieces from both crafts.
 * Two zones today: a security game ("spot the phish") and the cocktail builder.
 * More experiments land here over time.
 */
const LabPage = () => {
  const { t } = usePortfolioLang();
  const { showTech, showBar, isBoth } = usePortfolioMode();

  return (
    <main className="vp-page vp-page--tech vp-page--lab" id="vp-main" tabIndex={-1}>
      {/* ============ HERO ============ */}
      <section className="vp-lab-hero">
        <SectionAtmosphere kind="grid" />
        <div className="vp-orb vp-orb--a" aria-hidden="true" />
        <div className="vp-orb vp-orb--b" aria-hidden="true" />
        <div className="vp-container vp-lab-hero__inner">
          <Reveal y={18}>
            <p className="vp-kicker vp-kicker--mono">
              <FlaskConical size={14} aria-hidden="true" /> {t("lab.hero.kicker")}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="vp-h1">{t("lab.hero.title")}</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="vp-sub vp-lab-hero__sub">{t("lab.hero.sub")}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <Magnetic>
              <Link className="vp-btn vp-btn--ghost" to="/tech">
                <ArrowLeft size={15} aria-hidden="true" /> {t("lab.back")}
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      {/* ============ ZONE: SECURITY (mode-aware) ============ */}
      {showTech && (
        <>
          <div className="vp-container">
            <Reveal>
              <p className="vp-lab-zone">
                <span className="vp-lab-zone__icon" aria-hidden="true"><ShieldAlert size={15} /></span>
                {t("lab.zones.security")}
                {isBoth && <span className="vp-lab-zone__hint">{t("lab.zones.hint")}</span>}
              </p>
            </Reveal>
          </div>
          <PhishGame />
          <CrackTheVault />
          <HashForge />
          <CipherLab />
        </>
      )}

      {/* ============ ZONE: BAR (mode-aware) ============ */}
      {showBar && (
        <>
          <div className="vp-container">
            <Reveal>
              <p className="vp-lab-zone">
                <span className="vp-lab-zone__icon" aria-hidden="true"><Martini size={15} /></span>
                {t("lab.zones.bar")}
              </p>
            </Reveal>
          </div>
          <CocktailBuilder />
          <GuessTheCocktail />
          <ShakeOrStir />
          <PourCostLab />
          <NameThatSpirit />
        </>
      )}

      {/* ============ MORE COMING ============ */}
      <section className="vp-section vp-lab-soon">
        <div className="vp-container">
          <Reveal>
            <div className="vp-lab-soon__card">
              <span className="vp-icon-pill vp-icon-pill--lg">
                <Sparkles size={20} aria-hidden="true" />
              </span>
              <h2 className="vp-h2">{t("lab.soon.title")}</h2>
              <p className="vp-sub">{t("lab.soon.sub")}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default LabPage;

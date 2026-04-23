import React from "react";
import { useTranslation } from "react-i18next";
import { useProfileContext } from "../../../02_context/context.index.js";
import { useHome } from "./homeHooks/_homeHooks.index.js";
import { Hero, SectionDivider } from "./homeComps/_homeComps.index.js";
import About from "../01_about/About.jsx";
import Work from "../02_work/Work.jsx";
import Skills from "../04_skills/Skills.jsx";
import "./styles/home.css";

/**
 * Home Page Component
 * Landing page with hero and preview of all sections
 */
const Home = () => {
  const { t } = useTranslation("tempContent");
  const { profile } = useProfileContext();
  const { heroContent, loading } = useHome(profile);

  const handleDownloadCV = () => {
    // TODO: Implement CV download functionality
    console.log("Downloading CV...");
  };

  if (loading) {
    return (
      <div className="home">
        <div className="home__loading">{t("ui.common.loading")}</div>
      </div>
    );
  }

  return (
    <div className="home">
      {/* Hero Section */}
      {heroContent && (
        <Hero data={heroContent} onDownloadCV={handleDownloadCV} />
      )}

      {/* About Preview */}
      <section className="home__section">
        <SectionDivider title={t("ui.home.sections.about")} link="/about" />
        <About variant="short" />
      </section>

      {/* Work Preview */}
      <section className="home__section">
        <SectionDivider title={t("ui.home.sections.work")} link="/work" />
        <Work variant="short" />
      </section>

      {/* Skills Preview */}
      <section className="home__section">
        <SectionDivider title={t("ui.home.sections.skills")} link="/skills" />
        <Skills variant="short" />
      </section>
    </div>
  );
};

export default Home;

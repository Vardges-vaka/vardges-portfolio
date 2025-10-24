import React from "react";
import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import { LanguageRouteWrapper } from "../../02_context/context.index.js";

// Lazy load components
const Home = lazy(() => import("../../10_pages/public/00_home/Home.jsx"));
const Bio = lazy(() => import("../../10_pages/public/01_bio/Bio.jsx"));
const Journey = lazy(() =>
  import("../../10_pages/public/02_journey/Journey.jsx")
);
const Projects = lazy(() =>
  import("../../10_pages/public/03_projects/Projects.jsx")
);
const Skills = lazy(() => import("../../10_pages/public/04_skills/Skills.jsx"));
const Achievements = lazy(() =>
  import("../../10_pages/public/05_achievements/Achievements.jsx")
);
const Education = lazy(() =>
  import("../../10_pages/public/06_education/Education.jsx")
);
const Vision = lazy(() => import("../../10_pages/public/07_vision/Vision.jsx"));
const Values = lazy(() => import("../../10_pages/public/08_values/Values.jsx"));
const Contact = lazy(() =>
  import("../../10_pages/public/09_contact/Contact.jsx")
);
const Test = lazy(() => import("../../Test.jsx"));

const PublicRoutes = () => {
  return (
    <Routes>
      {/* Test route */}
      <Route path="test" element={<Test />} />

      {/* Home route */}
      <Route path="" element={<Home />} />

      {/* Language-prefixed routes */}
      <Route
        path=":lang/bio"
        element={
          <LanguageRouteWrapper>
            <Bio />
          </LanguageRouteWrapper>
        }
      />
      <Route
        path=":lang/journey"
        element={
          <LanguageRouteWrapper>
            <Journey />
          </LanguageRouteWrapper>
        }
      />
      <Route
        path=":lang/projects"
        element={
          <LanguageRouteWrapper>
            <Projects />
          </LanguageRouteWrapper>
        }
      />
      <Route
        path=":lang/skills"
        element={
          <LanguageRouteWrapper>
            <Skills />
          </LanguageRouteWrapper>
        }
      />
      <Route
        path=":lang/education"
        element={
          <LanguageRouteWrapper>
            <Education />
          </LanguageRouteWrapper>
        }
      />
      <Route
        path=":lang/achievements"
        element={
          <LanguageRouteWrapper>
            <Achievements />
          </LanguageRouteWrapper>
        }
      />
      <Route
        path=":lang/vision"
        element={
          <LanguageRouteWrapper>
            <Vision />
          </LanguageRouteWrapper>
        }
      />
      <Route
        path=":lang/values"
        element={
          <LanguageRouteWrapper>
            <Values />
          </LanguageRouteWrapper>
        }
      />
      <Route
        path=":lang/contact"
        element={
          <LanguageRouteWrapper>
            <Contact />
          </LanguageRouteWrapper>
        }
      />

      {/* Fallback routes without language prefix */}
      <Route path="bio" element={<Bio />} />
      <Route path="journey" element={<Journey />} />
      <Route path="projects" element={<Projects />} />
      <Route path="skills" element={<Skills />} />
      <Route path="education" element={<Education />} />
      <Route path="achievements" element={<Achievements />} />
      <Route path="vision" element={<Vision />} />
      <Route path="values" element={<Values />} />
      <Route path="contact" element={<Contact />} />
    </Routes>
  );
};

export default PublicRoutes;

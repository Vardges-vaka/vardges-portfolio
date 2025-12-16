import React from "react";
import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import { LanguageRouteWrapper } from "../../02_context/context.index.js";

// Lazy load components - 4-page structure
const Home = lazy(() => import("../../10_pages/public/00_home/Home.jsx"));
const About = lazy(() => import("../../10_pages/public/01_about/About.jsx"));
const Work = lazy(() => import("../../10_pages/public/02_work/Work.jsx"));
const Skills = lazy(() => import("../../10_pages/public/04_skills/Skills.jsx"));
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

      {/* Language-prefixed routes - 4 pages */}
      <Route
        path=":lang/about"
        element={
          <LanguageRouteWrapper>
            <About />
          </LanguageRouteWrapper>
        }
      />
      <Route
        path=":lang/work"
        element={
          <LanguageRouteWrapper>
            <Work />
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
        path=":lang/contact"
        element={
          <LanguageRouteWrapper>
            <Contact />
          </LanguageRouteWrapper>
        }
      />

      {/* Fallback routes without language prefix */}
      <Route path="about" element={<About />} />
      <Route path="work" element={<Work />} />
      <Route path="skills" element={<Skills />} />
      <Route path="contact" element={<Contact />} />
    </Routes>
  );
};

export default PublicRoutes;

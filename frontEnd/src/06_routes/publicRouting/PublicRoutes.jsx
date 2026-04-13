import React from "react";
import { Routes, Route } from "react-router-dom";
import { lazy } from "react";

const Home = lazy(() => import("../../10_pages/public/00_home/Home.jsx"));
const About = lazy(() => import("../../10_pages/public/01_about/About.jsx"));
const Work = lazy(() => import("../../10_pages/public/02_work/Work.jsx"));
const Skills = lazy(() => import("../../10_pages/public/04_skills/Skills.jsx"));
const Contact = lazy(() =>
  import("../../10_pages/public/09_contact/Contact.jsx"),
);
const Test = lazy(() => import("../../Test.jsx"));

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="test" element={<Test />} />
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="work" element={<Work />} />
      <Route path="skills" element={<Skills />} />
      <Route path="contact" element={<Contact />} />
    </Routes>
  );
};

export default PublicRoutes;

import React from "react";
import PropTypes from "prop-types";
import isDebug from "./_projects.config.js";
import { useProjects } from "./02_projectshooks/_projects.hooks.index.js";
// import {
//   IconGlobal,
//   ButtonGlobal,
//   InputGlobal,
//   SelectGlobal,
//   PasswordInput,
//   CheckboxGlobal,
// } from "../../../../../01_components/components.index.js";
import { Projects_YYY } from "./01_projects.comps/_projects.comps.index.js";
import "./00_styles/projects.css";

const Projects = () => {
  return (
    <div className="Projects">
      <h1>Projects</h1>
    </div>
  );
};

Projects.displayName = "Projects";

export default Projects;

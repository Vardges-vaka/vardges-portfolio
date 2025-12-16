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
import {
  Session_ViewAll_Projects,
  Session_ViewOne_Project,
  Session_Adding_Project,
  Session_Updating_Project,
} from "./01_projects.comps/_projects.comps.index.js";
import "./00_styles/projects.css";

const Projects = () => {
  const {
    states,
    ViewOne_Project_props,
    Adding_Project_props,
    Updating_Project_props,
    ViewAll_Projects_props,
    translations,
    status,
  } = useProjects();

  return (
    <div className="Projects_cnt">
      {states.currentSession === "view_all" && (
        <Session_ViewAll_Projects
          states={ViewAll_Projects_props.states}
          handlers={ViewAll_Projects_props.handlers}
          translations={translations}
          status={status}
        />
      )}
      {states.currentSession === "view_one" && (
        <Session_ViewOne_Project
          states={ViewOne_Project_props.states}
          handlers={ViewOne_Project_props.handlers}
          translations={translations}
          status={status}
        />
      )}
      {states.currentSession === "adding" && (
        <Session_Adding_Project
          states={Adding_Project_props.states}
          handlers={Adding_Project_props.handlers}
          childProps={Adding_Project_props.childProps}
          translations={translations}
          status={status}
        />
      )}
      {states.currentSession === "updating" && (
        <Session_Updating_Project
          states={Updating_Project_props.states}
          handlers={Updating_Project_props.handlers}
          translations={translations}
          status={status}
        />
      )}
    </div>
  );
};

Projects.displayName = "Projects";

export default Projects;

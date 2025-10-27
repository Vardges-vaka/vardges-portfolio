import React from "react";
import { useTranslation } from "react-i18next";
import {
  User,
  Award,
  GraduationCap,
  Briefcase,
  Target,
  FolderOpen,
  Wrench,
  Heart,
  Mail,
} from "lucide-react";

import "./styles/bio.css";

/*

  User (AboutIcon),
  Award (AchievementsIcon),
  GraduationCap (EducationIcon),
  Briefcase (ExperienceIcon),
  Target (GoalsIcon),
  FolderOpen (ProjectsIcon),
  Wrench (SkillsIcon),
  Heart (ValuesIcon),
  Mail (ContactIcon),

*/

const Bio = ({ variant = "full" }) => {
  const { i18n, t } = useTranslation("bio");
  const Bio_classname = `Bio ${variant === "full" ? "full" : "short"}`;
  // Let's use navBar label keys for translation lookup; fallback to English if not available
  const iconItems = [
    {
      icon: <User className="About" />,
      labelKey: "navBar.labels.bio",
      fallback: "Bio",
    },
    {
      icon: <Award className="Achievements" />,
      labelKey: "navBar.labels.achievements",
      fallback: "Achievements",
    },

    {
      icon: <Briefcase className="Experience" />,
      labelKey: "navBar.labels.journey",
      fallback: "Journey",
    },
    {
      icon: <Target className="Goals" />,
      labelKey: "navBar.labels.vision",
      fallback: "Vision",
    },
    {
      icon: <FolderOpen className="Projects" />,
      labelKey: "navBar.labels.projects",
      fallback: "Projects",
    },
    {
      icon: <Wrench className="Skills" />,
      labelKey: "navBar.labels.skills",
      fallback: "Skills",
    },
    {
      icon: <Heart className="Values" />,
      labelKey: "navBar.labels.values",
      fallback: "Values",
    },
    {
      icon: <Mail className="Contact" />,
      labelKey: "navBar.labels.contact",
      fallback: "Contact",
    },
    {
      icon: <GraduationCap className="Education" />,
      labelKey: "navBar.labels.education",
      fallback: "Education",
    },
  ];

  return (
    <div className={Bio_classname}>
      {iconItems.map(({ icon, labelKey, fallback }, idx) => (
        <div
          key={idx}
          style={{
            display: "flex",
            alignItems: "center",
            margin: "8px 0",
            gap: "10px",
          }}>
          {icon}
          <span>{t(labelKey, fallback)}</span>
        </div>
      ))}
    </div>
  );
};

export default Bio;

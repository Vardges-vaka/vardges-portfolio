/**
 * About Page Data
 * Merged from Bio + Values + Vision
 * Simplified for freelance/consulting focus
 */

import { bioData } from "../../01_bio/bioConstances/_bioConstances.index.js";
import { valuesData } from "../../08_values/valuesConstances/_valuesConstances.index.js";
import { visionData } from "../../07_vision/visionConstances/_visionConstances.index.js";

export const aboutData = {
  // Personal Info from Bio
  personalInfo: bioData.personalInfo,

  // Intro from Bio (profile-specific)
  intro: bioData.intro,

  // Core Principles (3-4 from Bio)
  principles: bioData.principles.slice(0, 3), // Keep top 3

  // Core Values (3-4 from Values)
  coreValues: valuesData.coreValues.slice(0, 3), // Keep top 3

  // Current Focus (simplified from Vision)
  currentFocus: {
    dev: {
      title: "Building Full-Stack Solutions",
      description:
        "I'm focused on creating practical web applications and AI-powered tools for businesses. Available for freelance and consulting projects.",
      goals: [
        "Full-stack development (React, Node.js, MongoDB)",
        "AI integration and custom GPTs",
        "Restaurant and delivery platforms",
        "Automation frameworks",
      ],
    },
    hospitality: {
      title: "Hospitality Operations Expert",
      description:
        "Leveraging 10+ years of operational experience to build better systems. Available for consulting and development projects.",
      goals: [
        "Operational systems and SOPs",
        "Beverage program design",
        "Team training and leadership",
        "Business process optimization",
      ],
    },
    both: {
      title: "Tech × Business Integration",
      description:
        "I build software solutions informed by real operational experience. Available for freelance development and consulting projects that bridge technology and business operations.",
      goals: [
        "Full-stack applications for hospitality businesses",
        "AI-powered operational tools",
        "Systems thinking and process optimization",
        "Practical problem-solving",
      ],
    },
  },
};

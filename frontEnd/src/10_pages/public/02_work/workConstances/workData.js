/**
 * Work Page Data
 * Merged from Projects + Journey
 * Focused on development work with minimal hospitality context
 */

import { projectsData } from "../../03_projects/projectsConstances/_projectsConstances.index.js";
import { journeyData } from "../../02_journey/journeyConstances/_journeyConstances.index.js";

// Helper function to get roles by ID
const getRolesByIds = (roles, ids) => {
  return ids.map((id) => roles.find((role) => role.id === id)).filter(Boolean);
};

// Get key roles: Vkusno (1), The Cocktail Tree (2), BFF Bar (3), Subah Group (4)
const keyRoles = getRolesByIds(journeyData.roles, [1, 2, 3, 4]);

export const workData = {
  // Development Projects (all 4 projects)
  projects: {
    categories: {
      tech: projectsData.categories.tech, // Only tech projects
    },
  },

  // Professional Journey (condensed - 4-5 key roles)
  journey: {
    summary: {
      profiles: ["both"],
      overview:
        "I spent 10+ years in hospitality operations, building systems and managing teams. In 2024, I transitioned to full-stack development, applying that systems thinking to software. My hospitality background informs how I build practical, operationally-sound solutions.",
      currentFocus:
        "Building full-stack applications and AI tools for businesses. Available for freelance and consulting projects.",
    },
    roles: keyRoles,
  },
};

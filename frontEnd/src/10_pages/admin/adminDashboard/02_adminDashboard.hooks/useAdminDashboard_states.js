import { useState } from "react";

export const useAdminDashboard_states = () => {
  const [isPinned, setIsPinned] = useState(false);
  const [activeSubsectionY, setActiveSubsectionY] = useState(null);
  const [activeSubsection_final, setActiveSubsection_final] = useState(null);
  const [section, setSection] = useState(null);
  const [subSection, setSubSection] = useState(null);
  const [defaultSubSection, setDefaultSubSection] = useState(null);

  return {
    states: {
      isPinned,
      activeSubsectionY,
      activeSubsection_final,
      section,
      subSection,
      defaultSubSection,
    },
    setters: {
      setIsPinned,
      setActiveSubsectionY,
      setActiveSubsection_final,
      setSection,
      setSubSection,
      setDefaultSubSection,
    },
  };
};

/**
 * Home Page Data
 * Hero section content based on profile
 */

export const homeData = {
  hero: {
    dev: {
      title: "Full-Stack Developer & AI Consultant",
      subtitle:
        "Building scalable web applications and AI-powered systems for real businesses",
      description:
        "Transforming operational challenges into elegant solutions through code, automation, and intelligent systems.",
      ctas: [
        { text: "View Projects", link: "/projects", primary: true },
        { text: "Download CV", action: "downloadCV", primary: false },
      ],
      stats: [
        { value: "10+", label: "Years Experience" },
        { value: "15+", label: "Projects Delivered" },
        { value: "5+", label: "Technologies Mastered" },
      ],
    },
    hospitality: {
      title: "Hospitality Operations Expert",
      subtitle:
        "Transforming venues through systems, training, and beverage innovation",
      description:
        "Over a decade of experience building and managing high-volume hospitality operations with proven results.",
      ctas: [
        { text: "View Journey", link: "/journey", primary: true },
        { text: "Download CV", action: "downloadCV", primary: false },
      ],
      stats: [
        { value: "10+", label: "Years Experience" },
        { value: "20+", label: "Venues Managed" },
        { value: "100+", label: "Staff Trained" },
      ],
    },
    both: {
      title: "Tech × Hospitality Integration Specialist",
      subtitle:
        "Operating at the intersection of technology, operations, and customer experience",
      description:
        "Combining a decade of hospitality expertise with full-stack development and AI to build systems that actually work in the real world.",
      ctas: [
        { text: "View Projects", link: "/projects", primary: true },
        { text: "View Journey", link: "/journey", primary: false },
        { text: "Download CV", action: "downloadCV", primary: false },
      ],
      stats: [
        { value: "10+", label: "Years Experience" },
        { value: "15+", label: "Projects Delivered" },
        { value: "20+", label: "Venues Managed" },
      ],
    },
  },

  sections: [
    {
      id: "bio",
      profiles: ["both"],
      title: "About Me",
      description: "My background, principles, and approach to work",
      icon: "User",
      link: "/bio",
    },
    {
      id: "journey",
      profiles: ["both"],
      title: "Professional Journey",
      description: "Career progression and key roles",
      icon: "TrendingUp",
      link: "/journey",
    },
    {
      id: "projects",
      profiles: ["dev", "both"],
      title: "Projects & Ventures",
      description: "Technology projects and business initiatives",
      icon: "Layers",
      link: "/projects",
    },
    {
      id: "skills",
      profiles: ["both"],
      title: "Skills & Expertise",
      description: "Technical, business, and soft skills",
      icon: "Zap",
      link: "/skills",
    },
    {
      id: "achievements",
      profiles: ["both"],
      title: "Achievements",
      description: "Key milestones and contributions",
      icon: "Award",
      link: "/achievements",
    },
    {
      id: "education",
      profiles: ["both"],
      title: "Education & Certifications",
      description: "Formal qualifications and training",
      icon: "GraduationCap",
      link: "/education",
    },
    {
      id: "vision",
      profiles: ["both"],
      title: "Vision & Goals",
      description: "Future direction and ambitions",
      icon: "Target",
      link: "/vision",
    },
    {
      id: "values",
      profiles: ["both"],
      title: "Values & Personality",
      description: "Core principles and what drives me",
      icon: "Heart",
      link: "/values",
    },
  ],
};

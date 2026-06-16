/**
 * Certificates — titles/orgs are official names (kept untranslated). Each `file`
 * resolves to a real PDF in src/portfolio/media/ via certByName(). The "View PDF"
 * button opens the bundled file. `cat` drives the filter tabs on the tech page.
 *
 * cat: "dev" | "auto" | "ai" | "foundations"
 */
import { certByName } from "../lib/media.js";

export const TECH_CERTS = [
  // ---- headline professional certificate ----
  {
    id: "c-it-automation",
    title: "Google IT Automation with Python — Professional Certificate",
    org: "Google · Coursera",
    cat: "auto",
    featured: true,
    file: certByName("Google IT Automation with Python"),
  },

  // ---- full-stack development (TMC Institute) ----
  {
    id: "c-tmc-fullstack",
    title: "Full-Stack Web Development",
    org: "TMC Institute",
    cat: "dev",
    file: certByName("TMC_FullSTack"),
  },
  {
    id: "c-tmc-frontend",
    title: "Front-End Development — Attestation",
    org: "TMC Institute",
    cat: "dev",
    file: certByName("Attestation (Front End)"),
  },
  {
    id: "c-tmc-backend",
    title: "Back-End Development — Attestation",
    org: "TMC Institute",
    cat: "dev",
    file: certByName("Attestation (Back End)"),
  },

  // ---- automation & cloud (Python track) ----
  {
    id: "c-py-crash",
    title: "Crash Course on Python",
    org: "Google · Coursera",
    cat: "auto",
    file: certByName("Crash Course on Python"),
  },
  {
    id: "c-py-os",
    title: "Using Python to Interact with the Operating System",
    org: "Google · Coursera",
    cat: "auto",
    file: certByName("Interact with the Operating System"),
  },
  {
    id: "c-git",
    title: "Introduction to Git and GitHub",
    org: "Google · Coursera",
    cat: "auto",
    file: certByName("Introduction to Git and GitHub"),
  },
  {
    id: "c-debug",
    title: "Troubleshooting and Debugging Techniques",
    org: "Google · Coursera",
    cat: "auto",
    file: certByName("Troubleshooting and Debugging"),
  },
  {
    id: "c-config",
    title: "Configuration Management and the Cloud",
    org: "Google · Coursera",
    cat: "auto",
    file: certByName("Configuration Management and the Cloud"),
  },
  {
    id: "c-py-tasks",
    title: "Automating Real-World Tasks with Python",
    org: "Google · Coursera",
    cat: "auto",
    file: certByName("Automating Real-World Tasks"),
  },

  // ---- AI & prompting ----
  {
    id: "c-nvidia-ai",
    title: "AI Infrastructure and Operations Fundamentals",
    org: "NVIDIA · Coursera",
    cat: "ai",
    featured: true,
    file: certByName("AI Infrastructure and Operations"),
  },
  {
    id: "c-ai-fundamentals",
    title: "AI Fundamentals",
    org: "Google · Coursera",
    cat: "ai",
    file: certByName("AI Fundamentals"),
  },
  {
    id: "c-google-ai",
    title: "Google AI Essentials",
    org: "Google · Coursera",
    cat: "ai",
    file: certByName("Google AI.pdf"),
  },
  {
    id: "c-ai-app",
    title: "AI for App Building",
    org: "Google · Coursera",
    cat: "ai",
    file: certByName("AI for App Building"),
  },
  {
    id: "c-ai-data",
    title: "AI for Data Analysis",
    org: "Google · Coursera",
    cat: "ai",
    file: certByName("AI for Data Analysis"),
  },
  {
    id: "c-ai-content",
    title: "AI for Content Creation",
    org: "Google · Coursera",
    cat: "ai",
    file: certByName("AI for Content Creation"),
  },
  {
    id: "c-ai-writing",
    title: "AI for Writing and Communicating",
    org: "Google · Coursera",
    cat: "ai",
    file: certByName("AI for Writing and Communicating"),
  },
  {
    id: "c-ai-research",
    title: "AI for Research and Insights",
    org: "Google · Coursera",
    cat: "ai",
    file: certByName("AI for Research and Insights"),
  },
  {
    id: "c-ai-brainstorm",
    title: "AI for Brainstorming and Planning",
    org: "Google · Coursera",
    cat: "ai",
    file: certByName("AI for Brainstorming and Planning"),
  },
  {
    id: "c-prompting",
    title: "Google Prompting Essentials",
    org: "Google · Coursera",
    cat: "ai",
    file: certByName("Google Prompting Essentials"),
  },
  {
    id: "c-prompts-work",
    title: "Design Prompts for Everyday Work Tasks",
    org: "Google · Coursera",
    cat: "ai",
    file: certByName("Design Prompts for Everyday"),
  },
  {
    id: "c-ai-partner",
    title: "Use AI as a Creative or Expert Partner",
    org: "Google · Coursera",
    cat: "ai",
    file: certByName("Use AI as a Creative or Expert Partner"),
  },
  {
    id: "c-speed-data",
    title: "Speed Up Data Analysis and Presentation Building",
    org: "Google · Coursera",
    cat: "ai",
    file: certByName("Speed Up Data Analysis"),
  },

  // ---- foundations / professional ----
  {
    id: "c-pro",
    title: "Start Working Like a Pro",
    org: "Professional Skills",
    cat: "foundations",
    file: certByName("Start Working Like"),
  },
];

/**
 * Cybersecurity roadmap — certifications Vardges is actively working toward.
 * These are PLANNED (`planned: true`), not yet earned: they render with a
 * "Planned" treatment and a "View path" link to the syllabus/roadmap PDF in
 * src/portfolio/media/cyber/. `sub` groups them for the knowledge-graph edges
 * (foundation · grc · blue · cloud · offensive); `cat: "cyber"` drives the
 * certificate-category filter. Honest by design — never shown as completed.
 */
export const CYBER_CERTS = [
  // --- foundation ---
  {
    id: "c-cy-google",
    title: "Google Cybersecurity Professional Certificate",
    org: "Google · Coursera",
    cat: "cyber",
    sub: "foundation",
    planned: true,
    file: certByName("Google Cybersecurity"),
  },
  {
    id: "c-cy-secplus",
    title: "CompTIA Security+",
    org: "CompTIA",
    cat: "cyber",
    sub: "foundation",
    planned: true,
    file: certByName("Security+"),
  },

  // --- governance, risk & compliance ---
  {
    id: "c-cy-grc",
    title: "GRC Mastery",
    org: "GRC Mastery",
    cat: "cyber",
    sub: "grc",
    planned: true,
    file: certByName("GRC Mastery"),
  },

  // --- blue team · SOC · DFIR ---
  {
    id: "c-cy-sal1",
    title: "SAL1 — Security Analyst Level 1",
    org: "TryHackMe",
    cat: "cyber",
    sub: "blue",
    planned: true,
    file: certByName("SAL1"),
  },
  {
    id: "c-cy-ccdl1",
    title: "CCDL1 — SOC Analyst Training & Certification",
    org: "CyberDefenders",
    cat: "cyber",
    sub: "blue",
    planned: true,
    file: certByName("CCDL1"),
  },
  {
    id: "c-cy-ccdl2",
    title: "CCDL2 — Threat Hunting & DFIR Certification",
    org: "CyberDefenders",
    cat: "cyber",
    sub: "blue",
    planned: true,
    file: certByName("CCDL2"),
  },
  {
    id: "c-cy-htb-sac",
    title: "Security Analyst Certification",
    org: "Hack The Box",
    cat: "cyber",
    sub: "blue",
    planned: true,
    file: certByName("Security Analysis"),
  },
  {
    id: "c-cy-letsdefend",
    title: "SOC Analyst Learning Path",
    org: "LetsDefend",
    cat: "cyber",
    sub: "blue",
    planned: true,
    file: certByName("SOC Analyst Learning Path"),
  },
  {
    id: "c-cy-sc200",
    title: "Security Operations Analyst Associate (SC-200)",
    org: "Microsoft",
    cat: "cyber",
    sub: "blue",
    planned: true,
    file: certByName("SC-200"),
  },

  // --- cloud security ---
  {
    id: "c-cy-sc900",
    title: "Security, Compliance & Identity Fundamentals (SC-900)",
    org: "Microsoft",
    cat: "cyber",
    sub: "cloud",
    planned: true,
    file: certByName("SC-900"),
  },
  {
    id: "c-cy-azsec",
    title: "Azure Security Engineer Associate",
    org: "Microsoft",
    cat: "cyber",
    sub: "cloud",
    planned: true,
    file: certByName("Azure Security Engineer"),
  },
  {
    id: "c-cy-aws-ccp",
    title: "AWS Certified Cloud Practitioner",
    org: "Amazon Web Services",
    cat: "cyber",
    sub: "cloud",
    planned: true,
    file: certByName("Cloud Practitioner"),
  },
  {
    id: "c-cy-aws-saa",
    title: "AWS Certified Solutions Architect",
    org: "Amazon Web Services",
    cat: "cyber",
    sub: "cloud",
    planned: true,
    file: certByName("Solutions Architect"),
  },
  {
    id: "c-cy-aws-sec",
    title: "AWS Certified Security — Specialty",
    org: "Amazon Web Services",
    cat: "cyber",
    sub: "cloud",
    planned: true,
    file: certByName("Security - Specialty"),
  },

  // --- offensive · penetration testing ---
  {
    id: "c-cy-ejpt",
    title: "eJPT — Junior Penetration Tester",
    org: "INE Security",
    cat: "cyber",
    sub: "offensive",
    planned: true,
    file: certByName("eJPT"),
  },
  {
    id: "c-cy-pt1",
    title: "PT1 — Offensive Penetration Tester",
    org: "TryHackMe",
    cat: "cyber",
    sub: "offensive",
    planned: true,
    file: certByName("PT1"),
  },
  {
    id: "c-cy-pen200",
    title: "PEN-200 (OSCP)",
    org: "OffSec",
    cat: "cyber",
    sub: "offensive",
    planned: true,
    file: certByName("PEN-200"),
  },
  {
    id: "c-cy-cpts",
    title: "CPTS — Penetration Tester Job-Role Path",
    org: "Hack The Box",
    cat: "cyber",
    sub: "offensive",
    planned: true,
    file: certByName("Job Role Path"),
  },
  {
    id: "c-cy-wifi",
    title: "Wi-Fi Penetration Tester",
    org: "Hack The Box",
    cat: "cyber",
    sub: "offensive",
    planned: true,
    file: certByName("Wi-Fi Penetration"),
  },
  {
    id: "c-cy-htb-pt",
    title: "Penetration Tester",
    org: "Hack The Box",
    cat: "cyber",
    sub: "offensive",
    planned: true,
    file: certByName("Box_Penetration Tester.pdf"),
  },
];

/** Earned tech certs + the cybersecurity roadmap, in one list for the wall + graph. */
export const ALL_TECH_CERTS = [...TECH_CERTS, ...CYBER_CERTS];

/**
 * Hospitality credentials. No PDFs supplied yet — `file: null` renders the card
 * without a broken link. Drop matching PDFs in src/portfolio/media/ and wire
 * them with certByName() to light up the "View PDF" button.
 */
export const BAR_CERTS = [
  {
    id: "c-hospitality",
    title: "Hotel & Hospitality Management",
    org: "Zabeel International University",
    cat: "foundations",
    file: null,
  },
  {
    id: "c-negotiation-s",
    title: "Strategic Negotiation",
    org: "LinkedIn Learning",
    cat: "foundations",
    file: null,
  },
  {
    id: "c-negotiation-f",
    title: "Negotiation Foundations",
    org: "LinkedIn Learning",
    cat: "foundations",
    file: null,
  },
];

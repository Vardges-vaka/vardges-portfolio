/**
 * PROJECT DATA — Vardges' real / in-flight projects.
 *
 * TODO(Vardges): when the backend feed is ready, replace this array with a
 * fetch — keep the exact same object shape and the UI renders unchanged.
 * Suggested endpoint: GET /api/public/projects → { success, message, data: Project[] }
 *
 * Project shape:
 *   id, slug, title, tagline, description, year
 *   status     "live" | "progress" | "concept"
 *   featured   boolean — renders the wide hero card with metrics
 *   stack      string[]
 *   media      { type, assetId, alt }  — assetId resolves to src/portfolio/media/<assetId>.<ext>
 *   links      { live?, github?, anchor? }
 *   metrics    { value, label }[]      — shown on the featured card
 *   highlights string[]               — bullet points shown in the deep-dive modal
 */
export const SAMPLE_PROJECTS = [
  {
    id: "p-cloudops",
    slug: "vardges-me-platform",
    title: "CloudOps — Operations Platform",
    tagline: "One dashboard, four clouds, zero excuses.",
    description:
      "The production MERN platform behind vardges.me: an operations dashboard for dark-kitchen restaurant chains with a multi-cloud storage engine over Google Cloud, AWS S3, Cloudflare R2 and Azure Blob — live health monitoring, hardened session auth and 4-language i18n, deployed on AWS.",
    year: "2024–25",
    status: "live",
    featured: true,
    caseStudy: true,
    stack: ["React", "Node.js", "Express", "MongoDB", "AWS", "GCP", "Azure", "Cloudflare"],
    media: { type: "image", assetId: "ASSET-P1", alt: "CloudOps multi-cloud operations dashboard" },
    links: { live: "https://vardges.me", github: null, anchor: "#vp-tech-project" },
    metrics: [
      { value: "4", label: "cloud providers" },
      { value: "4", label: "languages + RTL" },
      { value: "20+", label: "outlets managed" },
    ],
    highlights: [
      "Pluggable storage engine: one interface over GCS, S3, R2 and Azure Blob with live health pings",
      "Hardened auth — server-side sessions in MongoDB, Helmet, secure cookies behind an AWS ALB",
      "Full i18n in English, Russian, Armenian and Arabic, including right-to-left layouts",
      "Layered architecture (controller → validator → service) with a validation gate on every write",
      "Deployed on EC2 behind an Application Load Balancer with a CodeBuild CI pipeline",
    ],
  },
  {
    id: "p-cocktailtree",
    slug: "the-cocktail-tree",
    title: "The Cocktail Tree",
    tagline: "Where bartending meets a balance sheet.",
    description:
      "The digital home of my beverage consultancy — a costing and menu-engineering toolkit that turns pour-cost targets, recipe math and category performance into clear decisions, wrapped in a booking-ready brand site for bars and restaurants.",
    year: "2024–25",
    status: "live",
    featured: false,
    stack: ["React", "Node.js", "MongoDB", "Charts", "Branding"],
    media: { type: "image", assetId: "ASSET-P3", alt: "The Cocktail Tree cost & menu engineering dashboard" },
    links: { live: null, github: null, anchor: null },
    highlights: [
      "Recipe & pour-cost calculator with target margins per drink and per category",
      "Menu-engineering view that ranks drinks by popularity vs. profitability",
      "Inventory variance and waste tracking to protect the bottom line",
      "Brand site with consultation booking for venues",
    ],
  },
  {
    id: "p-carelink",
    slug: "carelink-doctor-connect",
    title: "CareLink — Doctor Connect",
    tagline: "Your doctor, a message away.",
    description:
      "A patient–doctor platform that keeps the relationship going between visits: secure messaging, appointment booking, shareable records and follow-up reminders — telehealth that feels personal instead of clinical.",
    year: "2025",
    status: "progress",
    featured: false,
    stack: ["React", "Node.js", "MongoDB", "WebSockets", "Auth"],
    media: { type: "image", assetId: "ASSET-CARELINK", alt: "CareLink doctor–patient platform" },
    links: { live: null, github: null, anchor: null },
    highlights: [
      "Real-time secure messaging between patient and doctor over WebSockets",
      "Appointment booking with reminders and follow-up nudges",
      "Shareable, permissioned medical records",
      "Privacy-first: encrypted at rest, least-privilege access",
    ],
  },
  {
    id: "p-sentio",
    slug: "sentio-review-intelligence",
    title: "Sentio — Review Intelligence",
    tagline: "Negative reviews, caught before breakfast.",
    description:
      "An automation that sweeps delivery-platform reviews across every brand and branch each morning, scores sentiment, clusters the complaints that matter, and drops a ranked digest straight into the operations chat — built from a real daily F&B problem.",
    year: "2025",
    status: "progress",
    featured: false,
    stack: ["Node.js", "Automation", "AI / NLP", "Cron", "WhatsApp API"],
    media: { type: "image", assetId: "ASSET-P2", alt: "Sentio customer review sentiment dashboard" },
    links: { live: null, github: null, anchor: null },
    highlights: [
      "Daily sweep across brands, branches and five delivery aggregators",
      "Sentiment scoring + complaint clustering to surface what actually matters",
      "Ranked morning digest posted straight to the ops WhatsApp group",
      "Born from a real operational pain point, not a tutorial",
    ],
  },
  {
    id: "p-vkusno",
    slug: "vkusno-delivery-growth",
    title: "Vkusno — Brand & Delivery Growth",
    tagline: "Russian cuisine, gone digital.",
    description:
      "Brand identity, website oversight and delivery-platform growth for an authentic Russian-cuisine brand in the UAE — where hospitality instincts meet performance marketing across every major aggregator.",
    year: "2024–25",
    status: "live",
    featured: false,
    stack: ["Branding", "SEO", "Web", "Talabat", "Careem", "Deliveroo", "Noon"],
    media: { type: "image", assetId: "ASSET-VKUSNO", alt: "Vkusno brand and delivery growth" },
    links: { live: null, github: null, anchor: null },
    highlights: [
      "Brand identity and website development oversight",
      "Listings and growth across Talabat, Careem, Deliveroo and Noon Food",
      "SEO, social and influencer campaigns",
      "Loyalty programs and seasonal retention campaigns",
    ],
  },
  {
    id: "p-barflow",
    slug: "barflow-ops",
    title: "BarFlow — Bar Ops & Rota",
    tagline: "The clipboard behind the bar, as an app.",
    description:
      "A bar-manager's operating system: par-level stock counts, supplier order sheets, staff rota and shift checklists — the day-to-day admin of running a bar, digitised so nothing slips on a busy Friday.",
    year: "2025",
    status: "concept",
    featured: false,
    stack: ["React", "Node.js", "MongoDB", "PWA"],
    media: { type: "image", assetId: "ASSET-BARFLOW", alt: "BarFlow bar operations app" },
    links: { live: null, github: null, anchor: null },
    highlights: [
      "Par-level stock counts with auto-generated supplier order sheets",
      "Staff rota and shift swaps",
      "Opening/closing checklists with sign-off",
      "Installable PWA for use on the floor",
    ],
  },
  {
    id: "p-phishguard",
    slug: "phishguard",
    title: "PhishGuard — Awareness Trainer",
    tagline: "Teaching teams to spot the bait.",
    description:
      "A lightweight security-awareness tool that sends simulated phishing emails to a team, tracks who clicks, and turns each miss into a 60-second teachable moment — security culture for small businesses, not just enterprises.",
    year: "2025",
    status: "concept",
    featured: false,
    stack: ["Security", "Node.js", "Email", "Analytics"],
    media: { type: "image", assetId: "ASSET-PHISHGUARD", alt: "PhishGuard phishing awareness trainer" },
    links: { live: null, github: null, anchor: null },
    highlights: [
      "Simulated phishing campaigns with safe, trackable links",
      "Per-employee click tracking and risk scoring",
      "Instant micro-lessons when someone takes the bait",
      "Built for small teams that can't afford enterprise tooling",
    ],
  },
  {
    id: "p-breachlab",
    slug: "breach-lab",
    title: "Breach Lab",
    tagline: "Breaking my own code, on purpose.",
    description:
      "My security playground: hardening exercises against my own platform, CTF write-ups, and a checklist engine that audits Express apps against the OWASP Top 10 — where the developer learns to think like an attacker.",
    year: "2025",
    status: "concept",
    featured: false,
    stack: ["Security", "OWASP", "Node.js", "CTF"],
    media: { type: "image", assetId: "ASSET-P4", alt: "Breach Lab — security playground" },
    links: { live: null, github: null, anchor: null },
    highlights: [
      "Hardening exercises run against my own production platform",
      "OWASP Top 10 audit checklist engine for Express apps",
      "CTF write-ups documenting the attacker's mindset",
      "A deliberate bridge from building software to securing it",
    ],
  },
  {
    id: "p-portfolio",
    slug: "vardges-me-portfolio",
    title: "vardges.me — This Portfolio",
    tagline: "The site you're reading right now.",
    description:
      "A standalone React front-end with a live animated background engine (canvas + god rays + an interactive grid), dark/light theming, four languages with full RTL, and a performance pass that keeps it smooth — built to be its own proof of work.",
    year: "2025",
    status: "live",
    featured: false,
    stack: ["React", "Vite", "Framer Motion", "Canvas", "i18n", "CSS"],
    media: { type: "image", assetId: "ASSET-PORTFOLIO", alt: "vardges.me portfolio" },
    links: { live: "https://vardges.me", github: null, anchor: null },
    highlights: [
      "Custom canvas + CSS background engine (aurora, god rays, interactive grid)",
      "Dark/light themes and 4 languages (EN/RU/HY/AR) with right-to-left support",
      "Tuned for performance — no heavy live blurs, paused off-screen and off-tab",
      "Accessibility-minded: reduced-motion, reduced-data and keyboard support",
    ],
  },
];

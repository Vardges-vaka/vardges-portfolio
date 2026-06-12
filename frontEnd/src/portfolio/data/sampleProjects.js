/**
 * SAMPLE PROJECT DATA — temporary objects until the backend feed exists.
 *
 * TODO(Vardges): replace this array with a fetch from your backend.
 * Keep the exact same object shape on the API side and the UI will
 * render it without changes. Suggested endpoint: GET /api/public/projects
 * Response envelope: { success, message, data: Project[] }
 *
 * Project shape:
 *   id          string  — stable unique id (Mongo _id works)
 *   slug        string  — url-friendly identifier
 *   title       string
 *   tagline     string  — one-liner under the title
 *   description string  — 2–3 sentence summary
 *   year        string  — display year or range
 *   status      "live" | "progress" | "concept"
 *   featured    boolean — featured card renders wide with metrics
 *   stack       string[] — tech chips
 *   media       { type: "image"|"video"|"gif", assetId: string, alt: string }
 *               assetId maps to NOTES.md — replace MediaPlaceholder with real src
 *   links       { live?: string|null, github?: string|null, anchor?: string|null }
 *   metrics     { value: string, label: string }[] — shown on featured card
 */
export const SAMPLE_PROJECTS = [
  {
    id: "p-001",
    slug: "vardges-me-platform",
    title: "vardges.me — Operations Platform",
    tagline: "One dashboard, four clouds, zero excuses.",
    description:
      "Production MERN platform for managing dark-kitchen restaurant chains. Multi-cloud storage engine over GCS, S3, R2 and Azure Blob with live health monitoring, hardened session auth and 4-language i18n.",
    year: "2024–25",
    status: "live",
    featured: true,
    stack: ["React", "Node.js", "MongoDB", "AWS", "GCP", "Azure", "Cloudflare"],
    media: { type: "image", assetId: "ASSET-P1", alt: "Operations dashboard screenshot" },
    links: { live: "https://vardges.me", github: null, anchor: "#vp-tech-project" },
    metrics: [
      { value: "4", label: "cloud providers" },
      { value: "4", label: "languages + RTL" },
      { value: "1", label: "CI/CD pipeline" },
    ],
  },
  {
    id: "p-002",
    slug: "review-radar",
    title: "ReviewRadar",
    tagline: "Negative reviews, caught before breakfast.",
    description:
      "Automation that sweeps delivery-platform reviews across brands and branches every morning, scores sentiment, and posts a digest with flagged complaints straight to the ops WhatsApp group.",
    year: "2025",
    status: "progress",
    featured: false,
    stack: ["Node.js", "Automation", "WhatsApp API", "Cron", "AI"],
    media: { type: "image", assetId: "ASSET-P2", alt: "Review monitoring dashboard concept" },
    links: { live: null, github: null, anchor: null },
    metrics: [],
  },
  {
    id: "p-003",
    slug: "pour-cost",
    title: "PourCost",
    tagline: "Where bartending meets a balance sheet.",
    description:
      "A bar-manager's toolkit: recipe costing, pour-cost targets, inventory variance and menu-margin engineering — the spreadsheet I always wanted behind the bar, as an app.",
    year: "2025",
    status: "concept",
    featured: false,
    stack: ["React", "Node.js", "MongoDB", "Charts"],
    media: { type: "image", assetId: "ASSET-P3", alt: "Pour cost calculator concept" },
    links: { live: null, github: null, anchor: null },
    metrics: [],
  },
  {
    id: "p-004",
    slug: "breach-lab",
    title: "Breach Lab",
    tagline: "Breaking my own code, on purpose.",
    description:
      "A personal security playground: hardening exercises against my own platform, CTF write-ups and a checklist engine that audits Express apps for the OWASP Top 10.",
    year: "2025",
    status: "concept",
    featured: false,
    stack: ["Security", "OWASP", "Node.js", "CTF"],
    media: { type: "image", assetId: "ASSET-P4", alt: "Security lab terminal concept" },
    links: { live: null, github: null, anchor: null },
    metrics: [],
  },
];

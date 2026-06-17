/**
 * Knowledge-graph data for the tech page. Three node types — skills (hubs),
 * certificates, and projects — wired by typed edges:
 *   cs  cert  → skill    (this cert built this skill)
 *   ps  project → skill  (this project exercised this skill)
 *   cp  cert  → project  (this cert enabled this project)
 *   pp  project → project (one project built on another)
 *
 * Prose (skill names/descriptions, cert descriptions) is the canonical English
 * source here; the UI resolves a translated version by id via t(path, fallback)
 * and falls back to these strings. Edit EDGES to change how things connect — the
 * graph re-derives automatically.
 */
import { ALL_TECH_CERTS } from "./certificates.js";
import { SAMPLE_PROJECTS } from "./sampleProjects.js";
import { TESTIMONIALS } from "./testimonials.js";

const SKILLS = [
  { id: "sk-frontend", label: "Frontend", desc: "React, modern CSS, interactive UIs and design systems." },
  { id: "sk-backend", label: "Backend", desc: "Node, Express, REST APIs, MongoDB and layered architecture." },
  { id: "sk-cloud", label: "Cloud & DevOps", desc: "AWS, GCP, Azure, Cloudflare, CI/CD and deployment." },
  { id: "sk-security", label: "Security", desc: "Security-first engineering, hardening and the OWASP mindset." },
  { id: "sk-automation", label: "Automation", desc: "Python scripting, cron and removing manual work." },
  { id: "sk-ai", label: "AI & Prompting", desc: "Applied AI and prompt engineering across the whole workflow." },
  { id: "sk-data", label: "Data", desc: "Turning raw data into analysis, dashboards and decisions." },
  // security-domain hubs — the destinations of the cybersecurity roadmap
  { id: "sk-blue", label: "Blue Team & SOC", desc: "Detection, monitoring, threat hunting and incident response — defending the estate." },
  { id: "sk-offensive", label: "Offensive Security", desc: "Penetration testing and red-team craft — breaking systems to harden them." },
  { id: "sk-grc", label: "GRC & Compliance", desc: "Governance, risk and compliance — frameworks, controls and audit readiness." },
];

// short, sidebar-friendly descriptions per certificate id (canonical English).
// Exported so the cert-wall flip card can show the same prose on its back.
export const CERT_DESC = {
  // --- earned ---
  "c-it-automation": "Google's six-course professional certificate: Python, Git, configuration management, cloud automation and real-world task automation.",
  "c-tmc-fullstack": "End-to-end web development — building and shipping complete front-to-back applications.",
  "c-tmc-frontend": "Front-end fundamentals: semantic HTML, CSS and interactive JavaScript UIs.",
  "c-tmc-backend": "Server-side development: APIs, data and application logic.",
  "c-py-crash": "Python foundations — syntax, data structures and writing real programs.",
  "c-py-os": "Using Python to script and automate the operating system.",
  "c-git": "Version control and team collaboration with Git and GitHub.",
  "c-debug": "Systematic troubleshooting and debugging techniques.",
  "c-config": "Configuration management and deploying to the cloud at scale.",
  "c-py-tasks": "Automating real-world tasks end-to-end with Python.",
  "c-nvidia-ai": "NVIDIA: the infrastructure and operations behind running AI at scale.",
  "c-ai-fundamentals": "Core concepts of modern AI and how the models actually work.",
  "c-google-ai": "Google AI Essentials — applying AI tools to everyday work.",
  "c-ai-app": "Using AI to design and build applications faster.",
  "c-ai-data": "Applying AI to analyse and make sense of data.",
  "c-ai-content": "AI for content creation across formats.",
  "c-ai-writing": "AI for clearer writing and communication.",
  "c-ai-research": "AI for research, synthesis and insight.",
  "c-ai-brainstorm": "AI for brainstorming, planning and ideation.",
  "c-prompting": "Google Prompting Essentials — the craft of effective prompts.",
  "c-prompts-work": "Designing prompts for everyday work tasks.",
  "c-ai-partner": "Using AI as a creative and expert thinking partner.",
  "c-speed-data": "Speeding up data analysis and presentation building.",
  "c-pro": "Professional working habits — communication, organisation and delivery.",

  // --- cybersecurity roadmap (planned) ---
  "c-cy-google": "Entry-level blue-team foundations from Google: security frameworks, SIEM, Python and Linux for defenders.",
  "c-cy-secplus": "The industry-baseline security certification — threats, cryptography, architecture, operations and governance.",
  "c-cy-grc": "Governance, risk and compliance in depth — frameworks, risk registers, controls and audit readiness.",
  "c-cy-sal1": "TryHackMe's analyst exam — hands-on triage of phishing, endpoint and network alerts as a tier-1 SOC analyst.",
  "c-cy-ccdl1": "CyberDefenders SOC analyst path — practical detection, log analysis and alert investigation.",
  "c-cy-ccdl2": "CyberDefenders threat-hunting and DFIR — proactive hunting, forensics and incident response.",
  "c-cy-htb-sac": "Hack The Box security-analysis path — investigating intrusions and reasoning about attacker behaviour.",
  "c-cy-letsdefend": "A full SOC analyst learning path on live, simulated alerts — the daily work of a defender.",
  "c-cy-sc200": "Microsoft SC-200 — operating Microsoft Sentinel and Defender to detect, investigate and respond to threats.",
  "c-cy-sc900": "Microsoft SC-900 — the fundamentals of security, compliance and identity across the Microsoft cloud.",
  "c-cy-azsec": "Azure Security Engineer — implementing identity, platform and data protection across Azure.",
  "c-cy-aws-ccp": "AWS Cloud Practitioner — the foundational view of AWS services, security and the shared-responsibility model.",
  "c-cy-aws-saa": "AWS Solutions Architect — designing resilient, secure and cost-aware architectures on AWS.",
  "c-cy-aws-sec": "AWS Security Specialty — specialised cloud security: data protection, IAM, detection and incident response on AWS.",
  "c-cy-ejpt": "INE's junior pentester exam — a hands-on assessment of practical penetration-testing fundamentals.",
  "c-cy-pt1": "TryHackMe's offensive certification — the practical attack chain, from recon to exploitation.",
  "c-cy-pen200": "OffSec PEN-200, the course behind the OSCP — the benchmark hands-on offensive-security certification.",
  "c-cy-cpts": "Hack The Box's penetration-tester job-role path — the full preparation for the CPTS certification.",
  "c-cy-wifi": "Hack The Box Wi-Fi pentesting — attacking and securing wireless networks.",
  "c-cy-htb-pt": "Hack The Box penetration-tester path — methodical exploitation across realistic targets.",
};

// edges. [from, to, kind]
const EDGES = [
  // --- certificates → skills ---
  ["c-it-automation", "sk-automation", "cs"],
  ["c-it-automation", "sk-cloud", "cs"],
  ["c-tmc-fullstack", "sk-frontend", "cs"],
  ["c-tmc-fullstack", "sk-backend", "cs"],
  ["c-tmc-frontend", "sk-frontend", "cs"],
  ["c-tmc-backend", "sk-backend", "cs"],
  ["c-py-crash", "sk-automation", "cs"],
  ["c-py-os", "sk-automation", "cs"],
  ["c-git", "sk-backend", "cs"],
  ["c-git", "sk-automation", "cs"],
  ["c-debug", "sk-backend", "cs"],
  ["c-config", "sk-cloud", "cs"],
  ["c-py-tasks", "sk-automation", "cs"],
  ["c-nvidia-ai", "sk-ai", "cs"],
  ["c-nvidia-ai", "sk-cloud", "cs"],
  ["c-ai-fundamentals", "sk-ai", "cs"],
  ["c-google-ai", "sk-ai", "cs"],
  ["c-ai-app", "sk-ai", "cs"],
  ["c-ai-app", "sk-frontend", "cs"],
  ["c-ai-data", "sk-data", "cs"],
  ["c-ai-data", "sk-ai", "cs"],
  ["c-ai-content", "sk-ai", "cs"],
  ["c-ai-writing", "sk-ai", "cs"],
  ["c-ai-research", "sk-ai", "cs"],
  ["c-ai-research", "sk-data", "cs"],
  ["c-ai-brainstorm", "sk-ai", "cs"],
  ["c-prompting", "sk-ai", "cs"],
  ["c-prompts-work", "sk-ai", "cs"],
  ["c-ai-partner", "sk-ai", "cs"],
  ["c-speed-data", "sk-data", "cs"],
  ["c-pro", "sk-backend", "cs"],

  // --- cybersecurity roadmap → skills ---
  ["c-cy-google", "sk-security", "cs"],
  ["c-cy-google", "sk-blue", "cs"],
  ["c-cy-secplus", "sk-security", "cs"],
  ["c-cy-grc", "sk-grc", "cs"],
  ["c-cy-grc", "sk-security", "cs"],
  ["c-cy-sal1", "sk-blue", "cs"],
  ["c-cy-sal1", "sk-security", "cs"],
  ["c-cy-ccdl1", "sk-blue", "cs"],
  ["c-cy-ccdl2", "sk-blue", "cs"],
  ["c-cy-ccdl2", "sk-security", "cs"],
  ["c-cy-htb-sac", "sk-blue", "cs"],
  ["c-cy-letsdefend", "sk-blue", "cs"],
  ["c-cy-sc200", "sk-blue", "cs"],
  ["c-cy-sc200", "sk-cloud", "cs"],
  ["c-cy-sc900", "sk-cloud", "cs"],
  ["c-cy-sc900", "sk-security", "cs"],
  ["c-cy-azsec", "sk-cloud", "cs"],
  ["c-cy-azsec", "sk-security", "cs"],
  ["c-cy-aws-ccp", "sk-cloud", "cs"],
  ["c-cy-aws-saa", "sk-cloud", "cs"],
  ["c-cy-aws-sec", "sk-cloud", "cs"],
  ["c-cy-aws-sec", "sk-security", "cs"],
  ["c-cy-ejpt", "sk-offensive", "cs"],
  ["c-cy-pt1", "sk-offensive", "cs"],
  ["c-cy-pen200", "sk-offensive", "cs"],
  ["c-cy-pen200", "sk-security", "cs"],
  ["c-cy-cpts", "sk-offensive", "cs"],
  ["c-cy-wifi", "sk-offensive", "cs"],
  ["c-cy-htb-pt", "sk-offensive", "cs"],

  // --- projects → skills ---
  ["p-cloudops", "sk-frontend", "ps"],
  ["p-cloudops", "sk-backend", "ps"],
  ["p-cloudops", "sk-cloud", "ps"],
  ["p-cloudops", "sk-security", "ps"],
  ["p-cocktailtree", "sk-frontend", "ps"],
  ["p-cocktailtree", "sk-backend", "ps"],
  ["p-cocktailtree", "sk-data", "ps"],
  ["p-carelink", "sk-frontend", "ps"],
  ["p-carelink", "sk-backend", "ps"],
  ["p-carelink", "sk-security", "ps"],
  ["p-sentio", "sk-automation", "ps"],
  ["p-sentio", "sk-ai", "ps"],
  ["p-sentio", "sk-data", "ps"],
  ["p-vkusno", "sk-frontend", "ps"],
  ["p-vkusno", "sk-data", "ps"],
  ["p-barflow", "sk-frontend", "ps"],
  ["p-barflow", "sk-backend", "ps"],
  ["p-phishguard", "sk-security", "ps"],
  ["p-phishguard", "sk-automation", "ps"],
  ["p-phishguard", "sk-blue", "ps"],
  ["p-breachlab", "sk-security", "ps"],
  ["p-breachlab", "sk-offensive", "ps"],
  ["p-portfolio", "sk-frontend", "ps"],

  // --- certificates → projects (this cert enabled this project) ---
  ["c-tmc-fullstack", "p-cloudops", "cp"],
  ["c-tmc-fullstack", "p-carelink", "cp"],
  ["c-tmc-fullstack", "p-cocktailtree", "cp"],
  ["c-tmc-fullstack", "p-portfolio", "cp"],
  ["c-config", "p-cloudops", "cp"],
  ["c-git", "p-cloudops", "cp"],
  ["c-git", "p-portfolio", "cp"],
  ["c-it-automation", "p-sentio", "cp"],
  ["c-it-automation", "p-phishguard", "cp"],
  ["c-py-tasks", "p-sentio", "cp"],
  ["c-nvidia-ai", "p-sentio", "cp"],
  ["c-ai-app", "p-portfolio", "cp"],
  ["c-ai-data", "p-sentio", "cp"],
  // cybersecurity roadmap → the security projects it backs
  ["c-cy-google", "p-phishguard", "cp"],
  ["c-cy-secplus", "p-breachlab", "cp"],
  ["c-cy-sal1", "p-phishguard", "cp"],
  ["c-cy-pen200", "p-breachlab", "cp"],
  ["c-cy-aws-sec", "p-cloudops", "cp"],

  // --- projects → projects (built on / informed by) ---
  ["p-cloudops", "p-portfolio", "pp"],
  ["p-cloudops", "p-carelink", "pp"],
  ["p-sentio", "p-cloudops", "pp"],
  ["p-breachlab", "p-phishguard", "pp"],
];

/**
 * Evidence-based skill strength for the tech radar: how many EARNED certs +
 * projects feed each skill (planned/roadmap certs are excluded — they describe
 * where things are heading, not current proficiency). Returns { skillId: count }.
 */
export function techSkillStrengths() {
  const { nodes, links } = buildTechGraph();
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const out = {};
  links.forEach((l) => {
    const a = byId[l.source];
    const b = byId[l.target];
    if (!a || !b) return;
    const skill = a.type === "skill" ? a : b.type === "skill" ? b : null;
    if (!skill) return;
    const other = skill === a ? b : a;
    if (other.type === "cert" && other.planned) return; // earned strength only
    out[skill.id] = (out[skill.id] || 0) + 1;
  });
  return out;
}

/** Build { nodes, links } for the tech knowledge graph. */
export function buildTechGraph() {
  const skillNodes = SKILLS.map((s) => ({ ...s, type: "skill" }));

  const certNodes = ALL_TECH_CERTS.map((c) => ({
    id: c.id,
    label: c.title.replace(/ — .*/, "").replace(/\s*\(.*\)/, ""),
    fullLabel: c.title,
    type: "cert",
    org: c.org,
    file: c.file,
    cat: c.cat,
    sub: c.sub ?? null,
    planned: !!c.planned,
    featured: !!c.featured,
    desc: CERT_DESC[c.id] ?? "",
  }));

  const projectNodes = SAMPLE_PROJECTS.map((p) => ({
    id: p.id,
    label: p.title.replace(/ — .*/, ""),
    fullLabel: p.title,
    type: "project",
    tagline: p.tagline,
    desc: p.description,
    year: p.year,
    status: p.status,
    stack: p.stack,
    links: p.links,
    media: p.media,
  }));

  const valid = new Set([...skillNodes, ...certNodes, ...projectNodes].map((n) => n.id));
  const links = EDGES.filter(([s, t]) => valid.has(s) && valid.has(t)).map(([source, target, kind]) => ({ source, target, kind }));

  return { nodes: [...skillNodes, ...certNodes, ...projectNodes], links };
}

/* ============================================================
   HOSPITALITY GRAPH — experiences ↔ crafts (+ the career chain)
   ============================================================
   Same engine as the tech graph, but the "evidence" nodes are 14 years of
   roles instead of certificates. `courseIndex` maps each experience to the
   tasting-menu entry (bar.menu.courses) so the panel reuses that translated
   prose (role / venue / city / text). Edits to BAR_EDGES re-derive the graph. */

// craft hubs. desc is canonical English; the UI resolves graph.skills.<id>.desc.
const BAR_SKILLS = [
  { id: "bk-mixology", label: "Mixology", desc: "Classics, originals and the craft behind the bar — from spec to service." },
  { id: "bk-menu", label: "Menu engineering", desc: "Cocktail lists built around the concept, the guests and the margins." },
  { id: "bk-leadership", label: "Team leadership", desc: "Hiring, training and running busy floors under pressure." },
  { id: "bk-cost", label: "Cost control", desc: "Pour cost, inventory discipline and protecting the bottom line." },
  { id: "bk-guest", label: "Guest experience", desc: "Service rituals and the small moments guests remember and retell." },
  { id: "bk-events", label: "Events", desc: "Competitions, tastings and the nights people talk about afterwards." },
  { id: "bk-training", label: "Training & mentorship", desc: "Turning new hires into a confident, consistent team." },
  { id: "bk-openings", label: "Openings & concept", desc: "Layout, workflow, equipment and a first menu that lands." },
  { id: "bk-supplier", label: "Supplier & inventory", desc: "The right back bar at the right price, with relationships that outlast promos." },
  { id: "bk-brand", label: "Brand & growth", desc: "Identity, marketing and delivery growth beyond the bar itself." },
];

// the 8 career stops. courseIndex aligns with bar.menu.courses (chronological).
const BAR_EXPERIENCES = [
  { id: "xp-congress", courseIndex: 0, label: "Congress Hotel", role: "Bartender", venue: "Congress Hotel", city: "Yerevan", country: "Armenia", year: "2011–13" },
  { id: "xp-metropol", courseIndex: 1, label: "Hotel Metropol", role: "Head Bartender", venue: "Hotel Metropol", city: "Moscow", country: "Russia", year: "2013" },
  { id: "xp-miramar", courseIndex: 2, label: "Miramar", role: "Acting Head Bartender", venue: "Miramar Al Aqah", city: "Fujairah", country: "UAE", year: "2013–14" },
  { id: "xp-southernsun", courseIndex: 3, label: "Southern Sun", role: "Head Bartender", venue: "Southern Sun", city: "Abu Dhabi", country: "UAE", year: "2015–16" },
  { id: "xp-subah", courseIndex: 4, label: "Subah Group", role: "Group Bar Manager", venue: "Subah Group", city: "Abu Dhabi", country: "UAE", year: "2018" },
  { id: "xp-bff", courseIndex: 5, label: "BFF Sports Bar", role: "Bar Manager", venue: "BFF Sports Bar", city: "Dubai", country: "UAE", year: "2018–24" },
  { id: "xp-cocktailtree", courseIndex: 6, label: "The Cocktail Tree", role: "Founder", venue: "The Cocktail Tree", city: "Dubai", country: "UAE", year: "2022–now" },
  { id: "xp-vkusno", courseIndex: 7, label: "Vkusno", role: "Director of Marketing & BD", venue: "Vkusno", city: "Dubai", country: "UAE", year: "2024–now" },
];

// edges. kinds: es experience→skill, ee experience→experience (career chain)
const BAR_EDGES = [
  // experience → crafts
  ["xp-congress", "bk-mixology", "es"],
  ["xp-congress", "bk-guest", "es"],
  ["xp-metropol", "bk-mixology", "es"],
  ["xp-metropol", "bk-menu", "es"],
  ["xp-metropol", "bk-supplier", "es"],
  ["xp-metropol", "bk-guest", "es"],
  ["xp-miramar", "bk-mixology", "es"],
  ["xp-miramar", "bk-events", "es"],
  ["xp-miramar", "bk-guest", "es"],
  ["xp-southernsun", "bk-mixology", "es"],
  ["xp-southernsun", "bk-leadership", "es"],
  ["xp-southernsun", "bk-training", "es"],
  ["xp-southernsun", "bk-guest", "es"],
  ["xp-subah", "bk-leadership", "es"],
  ["xp-subah", "bk-cost", "es"],
  ["xp-subah", "bk-supplier", "es"],
  ["xp-subah", "bk-openings", "es"],
  ["xp-subah", "bk-menu", "es"],
  ["xp-bff", "bk-leadership", "es"],
  ["xp-bff", "bk-menu", "es"],
  ["xp-bff", "bk-events", "es"],
  ["xp-bff", "bk-cost", "es"],
  ["xp-bff", "bk-guest", "es"],
  ["xp-bff", "bk-training", "es"],
  ["xp-cocktailtree", "bk-menu", "es"],
  ["xp-cocktailtree", "bk-training", "es"],
  ["xp-cocktailtree", "bk-cost", "es"],
  ["xp-cocktailtree", "bk-openings", "es"],
  ["xp-cocktailtree", "bk-supplier", "es"],
  ["xp-vkusno", "bk-brand", "es"],
  ["xp-vkusno", "bk-guest", "es"],
  // career chain (one role led to the next)
  ["xp-congress", "xp-metropol", "ee"],
  ["xp-metropol", "xp-miramar", "ee"],
  ["xp-miramar", "xp-southernsun", "ee"],
  ["xp-southernsun", "xp-subah", "ee"],
  ["xp-subah", "xp-bff", "ee"],
  ["xp-bff", "xp-cocktailtree", "ee"],
  ["xp-cocktailtree", "xp-vkusno", "ee"],
];

// testimonials → the role they worked alongside (all BFF) + the crafts they praised.
// kinds: te testimonial→experience, tk testimonial→skill
const BAR_TESTIMONIAL_EDGES = [
  ["t-maria", "xp-bff", "te"],
  ["t-maria", "bk-events", "tk"],
  ["t-maria", "bk-mixology", "tk"],
  ["t-haji", "xp-bff", "te"],
  ["t-haji", "bk-menu", "tk"],
  ["t-haji", "bk-mixology", "tk"],
  ["t-zin", "xp-bff", "te"],
  ["t-zin", "bk-mixology", "tk"],
  ["t-zin", "bk-training", "tk"],
  ["t-adele", "xp-bff", "te"],
  ["t-adele", "bk-events", "tk"],
  ["t-adele", "bk-guest", "tk"],
  ["t-prajwal", "xp-bff", "te"],
  ["t-prajwal", "bk-mixology", "tk"],
  ["t-prajwal", "bk-training", "tk"],
];

/** Build { nodes, links } for the hospitality knowledge graph. */
export function buildBarGraph() {
  const skillNodes = BAR_SKILLS.map((s) => ({ ...s, type: "skill" }));
  const expNodes = BAR_EXPERIENCES.map((e) => ({
    id: e.id,
    label: e.label,
    fullLabel: e.role,
    type: "experience",
    role: e.role,
    venue: e.venue,
    city: e.city,
    country: e.country,
    year: e.year,
    courseIndex: e.courseIndex,
    desc: "",
  }));
  // recommendations as nodes — quote/role resolve via testimonialInfo at render
  const testimonialNodes = TESTIMONIALS.filter((tm) => tm.track === "bar").map((tm) => ({
    id: tm.id,
    label: tm.name,
    type: "testimonial",
    name: tm.name,
    role: tm.role,
    org: tm.org,
    quote: tm.quote,
    desc: "",
  }));

  const nodes = [...skillNodes, ...expNodes, ...testimonialNodes];
  const valid = new Set(nodes.map((n) => n.id));
  const links = [...BAR_EDGES, ...BAR_TESTIMONIAL_EDGES]
    .filter(([s, t]) => valid.has(s) && valid.has(t))
    .map(([source, target, kind]) => ({ source, target, kind }));

  return { nodes, links };
}

/* ============================================================
   UNIVERSE GRAPH — "two crafts, one standard"
   ============================================================
   Merges the tech and bar graphs into one constellation and joins them with
   BRIDGE nodes: the analogies that make the two crafts the same discipline.
   Each bridge links one tech skill to one bar craft (kind "br"). Node ids are
   already unique across the two graphs (sk-/c-/p- vs bk-/xp-/t-), so they
   simply concatenate. Every node carries a `side` (tech | bar | bridge) — the
   universe view colours and clusters by side and reveals/dims by audience mode.
   Bridge label/why are canonical English here; the UI resolves a translated
   version via graph.bridges.<id>.{label,why} with these as the fallback. */
const BRIDGES = [
  {
    id: "br-experience",
    tech: "sk-frontend",
    bar: "bk-guest",
    label: "Experience design",
    why: "A guest at the bar or a user in an app — either way you're designing how someone feels, moment to moment.",
  },
  {
    id: "br-cost",
    tech: "sk-cloud",
    bar: "bk-cost",
    label: "Cost discipline",
    why: "Pour cost or cloud spend — the same instinct: know your numbers, cut the waste, protect the margin.",
  },
  {
    id: "br-system",
    tech: "sk-backend",
    bar: "bk-menu",
    label: "Systems thinking",
    why: "A cocktail menu and an API are both systems — sequenced, balanced and built to hold up under load.",
  },
  {
    id: "br-triage",
    tech: "sk-security",
    bar: "bk-leadership",
    label: "Reading the room",
    why: "Reading a room and triaging an incident are one reflex: spot what's off, stay calm, fix the right thing first.",
  },
  {
    id: "br-scale",
    tech: "sk-automation",
    bar: "bk-training",
    label: "Multiplying yourself",
    why: "Automation removes the work only you can do; training builds a team that doesn't need you to. Both scale one person.",
  },
];

/** Build { nodes, links } for the merged cross-craft universe graph. */
export function buildUniverseGraph() {
  const tech = buildTechGraph();
  const bar = buildBarGraph();
  tech.nodes.forEach((n) => (n.side = "tech"));
  bar.nodes.forEach((n) => (n.side = "bar"));

  const bridgeNodes = BRIDGES.map((b) => ({
    id: b.id,
    label: b.label,
    type: "bridge",
    side: "bridge",
    why: b.why,
    desc: b.why,
    pair: [b.tech, b.bar],
  }));

  const nodes = [...tech.nodes, ...bar.nodes, ...bridgeNodes];
  const valid = new Set(nodes.map((n) => n.id));
  const bridgeLinks = [];
  BRIDGES.forEach((b) => {
    if (valid.has(b.tech)) bridgeLinks.push({ source: b.id, target: b.tech, kind: "br" });
    if (valid.has(b.bar)) bridgeLinks.push({ source: b.id, target: b.bar, kind: "br" });
  });

  return { nodes, links: [...tech.links, ...bar.links, ...bridgeLinks] };
}

import Skill from "../skills/skills.model.js";
import Certification from "../certifications/certifications.model.js";
import Project from "../projects/projects.model.js";
import Career from "../careers/careers.model.js";
import Testimonial from "../testimonials/testimonials.model.js";
import Connection from "../connections/connections.model.js";
import { ok, fail, wrap } from "../../_shared/response.util.js";
import { pick } from "../../_shared/localize.util.js";

/**
 * graph — the read-only ASSEMBLER. This is what makes "serve the graph from the
 * backend with zero frontend changes" true.
 *
 * `GET /api/public/graph/:variant`  (variant = tech | bar | universe)
 * returns exactly the `{ nodes, links }` shape the React `KnowledgeGraph`
 * component already builds in `data/graphData.js`:
 *
 *   node.type:  skill | cert | project | experience | testimonial | bridge
 *               (note: a `career` document becomes a node of type "experience",
 *                matching the frontend's bar-graph vocabulary)
 *   link:       { source, target, kind }  where kind is the relation code
 *               (cs, ps, cp, pp, es, ee, te, tk, br)
 *
 * Localized text is resolved to `?lang=` (default English), so the payload is a
 * drop-in for buildTechGraph / buildBarGraph / buildUniverseGraph.
 */

const VARIANTS = {
  tech: { skills: "tech", nodes: ["skill", "cert", "project"] },
  bar: { skills: "bar", nodes: ["skill", "career", "testimonial"] },
  universe: { skills: "all", nodes: ["skill", "cert", "project", "career", "testimonial", "bridge"] },
};

// --- node builders: DB doc → frontend node shape (English-or-lang resolved) ---
const buildSkill = (s, lang) => ({
  id: s.key,
  label: pick(s.name, lang),
  type: "skill",
  domain: s.domain,
  desc: pick(s.description, lang),
});
const buildCert = (c, lang) => ({
  id: c.key,
  label: (c.title || "").replace(/ — .*/, "").replace(/\s*\(.*\)/, ""),
  fullLabel: c.title,
  type: "cert",
  org: c.org,
  file: c.file || null,
  cat: c.cat,
  sub: c.sub ?? null,
  planned: !!c.planned,
  featured: !!c.featured,
  desc: pick(c.description, lang),
});
const buildProject = (p, lang) => ({
  id: p.key,
  label: (p.title?.en || p.title || "").replace(/ — .*/, ""),
  fullLabel: pick(p.title, lang),
  type: "project",
  tagline: pick(p.tagline, lang),
  desc: pick(p.description, lang),
  year: p.year,
  status: p.status,
  stack: p.stack,
  links: p.links,
  media: p.media,
});
const buildExperience = (x, lang) => ({
  id: x.key,
  label: x.venue,
  fullLabel: pick(x.role, lang),
  type: "experience",
  role: pick(x.role, lang),
  venue: x.venue,
  city: x.city,
  country: x.country,
  year: x.year,
  courseIndex: x.courseIndex,
  desc: pick(x.text, lang),
});
const buildTestimonial = (t, lang) => ({
  id: t.key,
  label: t.name,
  type: "testimonial",
  name: t.name,
  role: pick(t.role, lang),
  org: t.org,
  quote: pick(t.quote, lang),
  desc: "",
});

export const getGraph = wrap(async (req, res) => {
  const variant = String(req.params.variant || "tech");
  const cfg = VARIANTS[variant];
  if (!cfg) return fail(res, `Unknown graph variant: ${variant}`, 400);
  const lang = req.query.lang || "en";

  // --- pull only what this variant needs ---
  const skillFilter = { active: true, ...(cfg.skills === "all" ? {} : { domain: cfg.skills }) };
  const [skills, certs, projects, careers, testimonials, connections] = await Promise.all([
    cfg.nodes.includes("skill") ? Skill.find(skillFilter).lean() : [],
    cfg.nodes.includes("cert") ? Certification.find({ active: true }).lean() : [],
    cfg.nodes.includes("project") ? Project.find({ active: true }).lean() : [],
    cfg.nodes.includes("career") ? Career.find({ active: true }).lean() : [],
    cfg.nodes.includes("testimonial") ? Testimonial.find({ active: true }).lean() : [],
    Connection.find({ active: true }).lean(),
  ]);

  // --- nodes ---
  const nodes = [
    ...skills.map((s) => buildSkill(s, lang)),
    ...certs.map((c) => buildCert(c, lang)),
    ...projects.map((p) => buildProject(p, lang)),
    ...careers.map((x) => buildExperience(x, lang)),
    ...testimonials.map((t) => buildTestimonial(t, lang)),
  ];

  // --- bridges (universe only) become nodes of type "bridge" + two links ---
  const bridgeLinks = [];
  if (variant === "universe") {
    connections
      .filter((cn) => cn.relation === "br")
      .forEach((b) => {
        const id = b.key || `${b.from.key}~${b.to.key}`;
        nodes.push({
          id,
          label: pick(b.label, lang),
          type: "bridge",
          side: "bridge",
          why: pick(b.why, lang),
          pair: [b.from.key, b.to.key],
        });
        bridgeLinks.push({ source: id, target: b.from.key, kind: "br" });
        bridgeLinks.push({ source: id, target: b.to.key, kind: "br" });
      });
  }

  // --- links: connections that belong to this variant + reference present nodes ---
  const present = new Set(nodes.map((n) => n.id));
  const edgeGraphs = variant === "universe" ? ["tech", "bar", "universe"] : [variant];
  const links = connections
    .filter((cn) => cn.relation !== "br" && edgeGraphs.includes(cn.graph))
    .filter((cn) => present.has(cn.from.key) && present.has(cn.to.key))
    .map((cn) => ({ source: cn.from.key, target: cn.to.key, kind: cn.relation }))
    .concat(bridgeLinks);

  ok(res, { nodes, links });
});

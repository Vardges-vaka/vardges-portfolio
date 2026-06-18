import Profile from "../profile/profile.model.js";
import StackGroup from "../stack/stack.model.js";
import Skill from "../skills/skills.model.js";
import Project from "../projects/projects.model.js";
import Certification from "../certifications/certifications.model.js";
import Career from "../careers/careers.model.js";
import Testimonial from "../testimonials/testimonials.model.js";
import Service from "../services/services.model.js";
import Social from "../socials/socials.model.js";
import Contact from "../contact/contact.model.js";
import Resume from "../resumes/resumes.model.js";
import Connection from "../connections/connections.model.js";
import MindMapNode from "../mindmap/mindmap.model.js";
import { ok, wrap } from "../../_shared/response.util.js";
import { localize } from "../../_shared/localize.util.js";

/**
 * bundle — one request that hydrates the whole public site.
 *
 * `GET /api/public/bundle` returns every active record in a single payload so the
 * frontend can boot from one fetch instead of a dozen. The graph `{nodes,links}`
 * are NOT pre-assembled here (use /graph/:variant for those); this returns the raw
 * collections so the client can assemble whichever it needs, or cache them all.
 */
export const getBundle = wrap(async (req, res) => {
  const active = { active: true };
  const [
    profile,
    stack,
    skills,
    projects,
    certifications,
    careers,
    testimonials,
    services,
    socials,
    contact,
    resumes,
    connections,
    mindmap,
  ] = await Promise.all([
    Profile.findOne({ singleton: "profile" }).lean(),
    StackGroup.find(active).sort({ order: 1 }).lean(),
    Skill.find(active).sort({ domain: 1, order: 1 }).lean(),
    Project.find(active).sort({ featured: -1, order: 1 }).lean(),
    Certification.find(active).sort({ cat: 1, order: 1 }).lean(),
    Career.find(active).sort({ order: 1 }).lean(),
    Testimonial.find(active).sort({ track: 1, order: 1 }).lean(),
    Service.find(active).sort({ order: 1 }).lean(),
    Social.find(active).sort({ order: 1 }).lean(),
    Contact.findOne({ singleton: "contact" }).lean(),
    Resume.find({ ...active, current: true }).sort({ track: 1 }).lean(),
    Connection.find(active).sort({ graph: 1, order: 1 }).lean(),
    MindMapNode.find(active).sort({ order: 1 }).lean(),
  ]);

  const payload = {
    profile,
    stack,
    skills,
    projects,
    certifications,
    careers,
    testimonials,
    services,
    socials,
    contact,
    resumes,
    connections,
    mindmap,
  };

  ok(res, localize(payload, req.query.lang));
});

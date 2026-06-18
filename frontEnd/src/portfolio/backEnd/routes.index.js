import express from "express";

// feature routers
import profileRoutes from "./features/profile/profile.routes.js";
import stackRoutes from "./features/stack/stack.routes.js";
import skillsRoutes from "./features/skills/skills.routes.js";
import projectsRoutes from "./features/projects/projects.routes.js";
import certificationsRoutes from "./features/certifications/certifications.routes.js";
import careersRoutes from "./features/careers/careers.routes.js";
import testimonialsRoutes from "./features/testimonials/testimonials.routes.js";
import servicesRoutes from "./features/services/services.routes.js";
import socialsRoutes from "./features/socials/socials.routes.js";
import contactRoutes from "./features/contact/contact.routes.js";
import resumesRoutes from "./features/resumes/resumes.routes.js";
import connectionsRoutes from "./features/connections/connections.routes.js";
import mindmapRoutes from "./features/mindmap/mindmap.routes.js";
import graphRoutes from "./features/graph/graph.routes.js";
import bundleRoutes from "./features/bundle/bundle.routes.js";

/**
 * Mount every portfolio feature under one router. In your app:
 *
 *     import portfolioApi from "./src/portfolio/backEnd/routes.index.js";
 *     app.use("/api/public", portfolioApi);
 *
 * Reads are public. The write routes inside each feature are marked
 * "// TODO: protect" — wrap this whole router (or the individual write verbs)
 * with your auth/role middleware for the admin surface, e.g.:
 *
 *     app.use("/api/admin", requireAdmin, portfolioApi);
 *
 * Everything is ES modules; needs `mongoose` + `express` installed and a Mongo
 * connection established before the models are used.
 */
const router = express.Router();

router.use("/profile", profileRoutes);
router.use("/stack", stackRoutes);
router.use("/skills", skillsRoutes);
router.use("/projects", projectsRoutes);
router.use("/certifications", certificationsRoutes);
router.use("/careers", careersRoutes);
router.use("/testimonials", testimonialsRoutes);
router.use("/services", servicesRoutes);
router.use("/socials", socialsRoutes);
router.use("/contact", contactRoutes);
router.use("/resumes", resumesRoutes);
router.use("/connections", connectionsRoutes);
router.use("/mindmap", mindmapRoutes);
router.use("/graph", graphRoutes);
router.use("/bundle", bundleRoutes);

export default router;

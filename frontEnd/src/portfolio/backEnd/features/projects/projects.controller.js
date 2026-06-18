import Project from "./projects.model.js";
import { makeCrud } from "../../_shared/crudController.js";
import { ok, wrap } from "../../_shared/response.util.js";
import { localize } from "../../_shared/localize.util.js";

/** Projects controller — CRUD + `listFeatured` (the wide hero card). */
const crud = makeCrud(Project, { defaultSort: { featured: -1, order: 1 } });

export const listProjects = crud.list;
export const getProject = crud.getOne; // by ObjectId or key (or use slug via list filter)
export const createProject = crud.create;
export const updateProject = crud.update;
export const deleteProject = crud.remove;

/** GET /projects/featured — the featured project(s) only. */
export const listFeatured = wrap(async (req, res) => {
  const docs = await Project.find({ active: true, featured: true }).sort({ order: 1 }).lean();
  ok(res, localize(docs, req.query.lang));
});

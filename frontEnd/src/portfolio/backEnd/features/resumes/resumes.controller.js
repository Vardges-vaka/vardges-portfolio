import Resume from "./resumes.model.js";
import { makeCrud } from "../../_shared/crudController.js";
import { ok, fail, wrap } from "../../_shared/response.util.js";
import { localize } from "../../_shared/localize.util.js";

/** Resumes controller — CRUD + `getByTrack` (what the CV button calls). */
const crud = makeCrud(Resume, { defaultSort: { track: 1, order: 1 }, keyField: "track" });

export const listResumes = crud.list;
export const getResume = crud.getOne;
export const createResume = crud.create;
export const updateResume = crud.update;
export const deleteResume = crud.remove;

/** GET /resumes/track/:track  (tech | bar | both) → the current CV for that track. */
export const getByTrack = wrap(async (req, res) => {
  const doc = await Resume.findOne({ track: req.params.track, current: true, active: true }).lean();
  if (!doc) return fail(res, `No current resume for track "${req.params.track}"`, 404);
  ok(res, localize(doc, req.query.lang));
});

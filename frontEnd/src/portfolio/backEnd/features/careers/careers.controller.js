import Career from "./careers.model.js";
import { makeCrud } from "../../_shared/crudController.js";
import { ok, wrap } from "../../_shared/response.util.js";
import { localize } from "../../_shared/localize.util.js";

/** Careers controller — CRUD + `listTimeline` (chronological, what the journey renders). */
const crud = makeCrud(Career, { defaultSort: { order: 1 } });

export const listCareers = crud.list;
export const getCareer = crud.getOne;
export const createCareer = crud.create;
export const updateCareer = crud.update;
export const deleteCareer = crud.remove;

/** GET /careers/timeline — chronological list for the home journey ("recipe"). */
export const listTimeline = wrap(async (req, res) => {
  const docs = await Career.find({ active: true }).sort({ order: 1 }).lean();
  ok(res, localize(docs, req.query.lang));
});

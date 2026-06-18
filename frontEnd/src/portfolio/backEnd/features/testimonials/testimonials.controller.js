import Testimonial from "./testimonials.model.js";
import { makeCrud } from "../../_shared/crudController.js";
import { ok, wrap } from "../../_shared/response.util.js";
import { localize } from "../../_shared/localize.util.js";

/** Testimonials controller — CRUD + filter by track. */
const crud = makeCrud(Testimonial, { defaultSort: { track: 1, order: 1 } });

export const listTestimonials = crud.list;
export const getTestimonial = crud.getOne;
export const createTestimonial = crud.create;
export const updateTestimonial = crud.update;
export const deleteTestimonial = crud.remove;

/** GET /testimonials/track/:track  (bar | tech) */
export const listByTrack = wrap(async (req, res) => {
  const docs = await Testimonial.find({ active: true, track: req.params.track }).sort({ order: 1 }).lean();
  ok(res, localize(docs, req.query.lang));
});

import Certification from "./certifications.model.js";
import { makeCrud } from "../../_shared/crudController.js";
import { ok, wrap } from "../../_shared/response.util.js";
import { localize } from "../../_shared/localize.util.js";

/** Certifications controller — CRUD + filter by category + planned-only. */
const crud = makeCrud(Certification, { defaultSort: { cat: 1, order: 1 } });

export const listCertifications = crud.list;
export const getCertification = crud.getOne;
export const createCertification = crud.create;
export const updateCertification = crud.update;
export const deleteCertification = crud.remove;

/** GET /certifications/category/:cat */
export const listByCategory = wrap(async (req, res) => {
  const docs = await Certification.find({ active: true, cat: req.params.cat }).sort({ order: 1 }).lean();
  ok(res, localize(docs, req.query.lang));
});

/** GET /certifications/planned — the cybersecurity roadmap. */
export const listPlanned = wrap(async (req, res) => {
  const docs = await Certification.find({ active: true, planned: true }).sort({ order: 1 }).lean();
  ok(res, localize(docs, req.query.lang));
});

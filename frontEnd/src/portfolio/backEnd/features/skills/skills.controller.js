import Skill from "./skills.model.js";
import { makeCrud } from "../../_shared/crudController.js";
import { ok } from "../../_shared/response.util.js";
import { localize } from "../../_shared/localize.util.js";
import { wrap } from "../../_shared/response.util.js";

/**
 * Skills controller — standard CRUD from the factory, plus one feature read:
 * `listByDomain` so the radar/graph can fetch just tech or just bar skills.
 */
const crud = makeCrud(Skill, { defaultSort: { domain: 1, order: 1 } });

export const listSkills = crud.list;
export const getSkill = crud.getOne;
export const createSkill = crud.create;
export const updateSkill = crud.update;
export const deleteSkill = crud.remove;

/** GET /skills/domain/:domain  (tech | bar) — active skills for one craft. */
export const listByDomain = wrap(async (req, res) => {
  const docs = await Skill.find({ domain: req.params.domain, active: true }).sort({ order: 1 }).lean();
  ok(res, localize(docs, req.query.lang));
});

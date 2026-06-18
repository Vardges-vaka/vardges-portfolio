import mongoose from "mongoose";
import { ok, created, fail, wrap } from "./response.util.js";
import { localize } from "./localize.util.js";

/**
 * crudController — a factory that builds the standard 5 REST handlers for a model.
 *
 * WHY a factory:
 *   Every content collection here is the same shape of CRUD — list (public), get
 *   one, create, update, delete. Repeating that 13× is noise. The factory gives a
 *   consistent, tested implementation; each feature then only writes the handful of
 *   ENDPOINTS THAT ARE SPECIAL to it (e.g. projects.getFeatured, graph assembly).
 *
 * Conventions baked in:
 *   - Public `list` returns only `{ active: true }` docs, sorted by `order` then
 *     `createdAt`. Pass `?all=true` (admin) to include inactive/drafts.
 *   - `getOne` accepts EITHER a Mongo ObjectId OR the stable `key` slug, so both
 *     `/skills/64f…` and `/skills/sk-frontend` work.
 *   - `?lang=ru|hy|en` flattens localizedString objects to that language (see
 *     localize.util.js). Omit it to get the full multilingual objects (default).
 *
 * Returned handlers are already wrapped in `wrap()` (no try/catch needed).
 */
export const makeCrud = (Model, opts = {}) => {
  const {
    defaultSort = { order: 1, createdAt: 1 },
    publicFilter = { active: true },
    keyField = "key",
  } = opts;

  const respondDocs = (req, res, docs, message = "OK") => ok(res, localize(docs, req.query.lang), message);

  const findByIdOrKey = async (id) => {
    if (mongoose.isValidObjectId(id)) {
      const byId = await Model.findById(id).lean();
      if (byId) return byId;
    }
    return Model.findOne({ [keyField]: id }).lean();
  };

  return {
    /** GET / — public list (active only unless ?all=true). */
    list: wrap(async (req, res) => {
      const filter = req.query.all === "true" ? {} : { ...publicFilter };
      const docs = await Model.find(filter).sort(defaultSort).lean();
      respondDocs(req, res, docs);
    }),

    /** GET /:id — by ObjectId or stable key. */
    getOne: wrap(async (req, res) => {
      const doc = await findByIdOrKey(req.params.id);
      if (!doc) return fail(res, `${Model.modelName} not found`, 404);
      respondDocs(req, res, doc);
    }),

    /** POST / — create (guard with auth middleware in production). */
    create: wrap(async (req, res) => {
      const doc = await Model.create(req.body);
      created(res, doc, `${Model.modelName} created`);
    }),

    /** PATCH /:id — partial update by ObjectId or key. */
    update: wrap(async (req, res) => {
      const query = mongoose.isValidObjectId(req.params.id)
        ? { _id: req.params.id }
        : { [keyField]: req.params.id };
      const doc = await Model.findOneAndUpdate(query, req.body, { new: true, runValidators: true });
      if (!doc) return fail(res, `${Model.modelName} not found`, 404);
      ok(res, doc, `${Model.modelName} updated`);
    }),

    /** DELETE /:id — hard delete by ObjectId or key. */
    remove: wrap(async (req, res) => {
      const query = mongoose.isValidObjectId(req.params.id)
        ? { _id: req.params.id }
        : { [keyField]: req.params.id };
      const doc = await Model.findOneAndDelete(query);
      if (!doc) return fail(res, `${Model.modelName} not found`, 404);
      ok(res, { _id: doc._id }, `${Model.modelName} deleted`);
    }),

    // exposed for feature controllers that need them
    findByIdOrKey,
    respondDocs,
  };
};

/**
 * makeCrudRoutes — mounts the 5 handlers on a fresh Express router.
 * Public reads are open; writes are grouped so you can wrap them with your auth
 * middleware in one place when integrating (see each feature's routes file).
 */
export const restRoutes = (express, crud, { guard = (r) => r } = {}) => {
  const router = express.Router();
  router.get("/", crud.list);
  router.get("/:id", crud.getOne);
  guard(router).post("/", crud.create);
  guard(router).patch("/:id", crud.update);
  guard(router).delete("/:id", crud.remove);
  return router;
};

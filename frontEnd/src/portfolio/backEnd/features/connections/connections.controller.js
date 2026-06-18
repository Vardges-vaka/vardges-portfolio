import Connection from "./connections.model.js";
import { makeCrud } from "../../_shared/crudController.js";
import { ok, wrap } from "../../_shared/response.util.js";
import { localize } from "../../_shared/localize.util.js";

/** Connections controller — CRUD + filter by graph + bridges-only. */
const crud = makeCrud(Connection, { defaultSort: { graph: 1, order: 1 } });

export const listConnections = crud.list;
export const getConnection = crud.getOne;
export const createConnection = crud.create;
export const updateConnection = crud.update;
export const deleteConnection = crud.remove;

/** GET /connections/graph/:graph  (tech | bar | universe) */
export const listByGraph = wrap(async (req, res) => {
  const docs = await Connection.find({ active: true, graph: req.params.graph }).sort({ order: 1 }).lean();
  ok(res, localize(docs, req.query.lang));
});

/** GET /connections/bridges — the universe cross-craft bridges only. */
export const listBridges = wrap(async (req, res) => {
  const docs = await Connection.find({ active: true, relation: "br" }).sort({ order: 1 }).lean();
  ok(res, localize(docs, req.query.lang));
});

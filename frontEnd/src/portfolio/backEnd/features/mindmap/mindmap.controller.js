import MindMapNode from "./mindmap.model.js";
import { makeCrud } from "../../_shared/crudController.js";
import { ok, wrap } from "../../_shared/response.util.js";
import { localize } from "../../_shared/localize.util.js";

/** MindMap controller — CRUD + `getTree` (flat list + an assembled nested tree). */
const crud = makeCrud(MindMapNode, { defaultSort: { order: 1 } });

export const listNodes = crud.list;
export const getNode = crud.getOne;
export const createNode = crud.create;
export const updateNode = crud.update;
export const deleteNode = crud.remove;

/**
 * GET /mindmap/tree — returns BOTH a flat list (what the frontend builds from)
 * and a convenience nested `tree` (children arrays) assembled from parent refs.
 */
export const getTree = wrap(async (req, res) => {
  const nodes = await MindMapNode.find({ active: true }).sort({ order: 1 }).lean();

  // assemble nested tree from parent pointers
  const byKey = Object.fromEntries(nodes.map((n) => [n.key, { ...n, children: [] }]));
  let root = null;
  for (const n of nodes) {
    const node = byKey[n.key];
    if (!n.parent) root = node;
    else if (byKey[n.parent]) byKey[n.parent].children.push(node);
  }

  ok(res, localize({ nodes, tree: root }, req.query.lang));
});

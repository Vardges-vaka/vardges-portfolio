import mongoose from "mongoose";
import localizedString from "../../_shared/localizedString.schema.js";

/**
 * MindMapNode — one node of the home LifeMap ("a life in two crafts"). The tree is
 * stored FLAT (each node points at its `parent` by key) and the frontend rebuilds
 * the tidy-tree from those pointers — exactly the `TREE` constant it hard-codes
 * today.
 *
 * `kind` colours the node and its branch (root | tech | bar | journey | lang |
 * ethos). `link` is an optional route a leaf navigates to (e.g. "/tech").
 *
 * Example shape:
 *   { key: "root",   parent: "",     kind: "root", label: {en:"Vardges"} }
 *   { key: "eng",    parent: "root", kind: "tech", link: "/tech", label: {en:"The Engineer"} }
 *   { key: "eng-fs", parent: "eng",  kind: "tech", label: {en:"Full-Stack"} }
 */
const mindMapNodeSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true },
    parent: { type: String, trim: true, default: "" }, // "" / null = root
    label: { type: localizedString, required: true },
    kind: { type: String, enum: ["root", "tech", "bar", "journey", "lang", "ethos"], required: true },
    link: { type: String, trim: true, default: "" }, // optional route
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

mindMapNodeSchema.index({ active: 1, parent: 1, order: 1 });

export default mongoose.model("MindMapNode", mindMapNodeSchema);

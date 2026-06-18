import Profile from "./profile.model.js";
import { ok, wrap } from "../../_shared/response.util.js";
import { localize } from "../../_shared/localize.util.js";

/** Profile controller — singleton get + upsert (no list/create/delete). */

/** GET /profile — the singleton (creates an empty one if missing). */
export const getProfile = wrap(async (req, res) => {
  let doc = await Profile.findOne({ singleton: "profile" }).lean();
  if (!doc) doc = (await Profile.create({ singleton: "profile" })).toObject();
  ok(res, localize(doc, req.query.lang));
});

/** PATCH /profile — upsert the singleton (protect). */
export const updateProfile = wrap(async (req, res) => {
  const doc = await Profile.findOneAndUpdate({ singleton: "profile" }, req.body, {
    new: true,
    upsert: true,
    runValidators: true,
    setDefaultsOnInsert: true,
  });
  ok(res, doc, "Profile updated");
});

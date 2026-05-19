/**
 * Owner type values for unified menu documents.
 *
 * Values match the Mongoose model names ("Brand" / "Competitor") so that
 * `refPath: "ownerType"` on the sibling `ownerId` field resolves correctly
 * when populating.
 */
export const MENU_OWNER_TYPES = ["brand", "competitor"];

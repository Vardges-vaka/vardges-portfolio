export { default as Competitor } from "./Competitor.js";

// CompetitorMenu, CompetitorMenuCategory, and CompetitorMenuItem are
// obsoleted by the unified menu model — competitor menus now live in the
// shared Menu / MenuCategory / MenuItem collections, distinguished by
// ownerType: "Competitor". The legacy files remain in this folder for
// historical reference and can be deleted in a follow-up cleanup pass
// once no external tooling references them.

// General-group schema constants — Branch, Customer, Employee, Equipment,
// Integration, Rating, SalesChannel, SalesPlatform, CuisineTag, Contract,
// Website, Invoice. Also holds the cross-cutting enums shared across groups.

// ── Equipment ──────────────────────────────────────────────
const EQUIPMENT_CATEGORIES = [
  "cooking", // oven, fryer, stove, grill
  "refrigeration", // fridge, freezer, walk-in
  "preparation", // mixer, slicer, food processor
  "storage", // shelving, racks
  "cleaning", // dishwasher, sink
  "it", // POS terminal, printer, router
  "furniture",
  "hvac",
  "other",
];

const EQUIPMENT_STATUSES = [
  "operational",
  "under-repair",
  "out-of-service",
  "decommissioned",
  "lost",
  "sold",
];

// ── Employee ───────────────────────────────────────────────
const SOCIAL_MEDIA_LABELS = [
  "facebook",
  "instagram",
  "linkedIn",
  "twitter",
  "tiktok",
  "youtube",
  "other",
];

const EMPLOYEE_STATUSES = [
  "employed",
  "onProbation",
  "terminated",
  "resigned",
  "onNoticePeriod",
];

const LEGAL_DOCS_TYPES = [
  "passport",
  "emiratesId",
  "laborCard",
  "medicalFitness",
  "foodHandlerCert",
  "healthCard",
];

const EMPLOYMENT_POSITION_HISTORY_CHANGE_TYPES = [
  "promotion",
  "demotion",
  "lateral",
  "initial",
];

const UNIFORM_SIZES = ["S", "M", "L", "XL", "XXL", "XXXL"];
const CONTACT_LABELS = ["phone", "whatsApp", "telegram", "email"];
const LANGUAGE_LEVELS = ["native", "fluent", "intermediate", "basic"];
const SALARY_PAYMENT_METHODS = ["bank-transfer", "cash", "cheque"];

// ── SalesChannel ───────────────────────────────────────────
const STORE_ID_SOURCES = [
  "aggregator",
  "sales-integrator",
  "inventory-integrator",
  "website",
];

const STORE_STATUSES = [
  "queued", // A: required, not started yet
  "skipped", // B: intentionally not pursuing
  "onboarding", // C: actively setting up
  "live", // D: operational
  "paused", // H: your decision to pause
  "maintenance", // G: platform-side issue
  "terminated-temporary", // F: dead for now, may resume
  "terminated-permanent", // E: dead forever
];

const EXCLUDED_MENU_ITEM_REASONS = [
  "out-of-stock",
  "not-supported",
  "regulatory",
  "other",
];

// ── CuisineTag / platforms ─────────────────────────────────
const CUISINE_TYPES = [
  "cuisine",
  "category",
  "dietary",
  "mealType",
  "dessert",
  "beverage",
  "other",
];

const CUISINE_TAG_SOURCES = ["scraped", "KAM", "manual", "other"];

const PLATFORMS = [
  "talabat",
  "deliveroo",
  "noon",
  "careem",
  "keeta",
  "restHero",
];

// ── Customer ───────────────────────────────────────────────
const CUSTOMER_CONTACT_FIELDS = ["phone", "whatsApp", "telegram", "email"];

// ── Rating ─────────────────────────────────────────────────
const RATING_SOURCES = ["manual", "scraped", "imported", "api"];
const REPLY_VISIBILITY = ["public", "private"];
const ITEM_FEEDBACK_SENTIMENTS = ["liked", "disliked", "mentioned"];

// ── Integration ────────────────────────────────────────────
const INTEGRATION_KINDS = ["inventory", "sales-manager", "other"];
const INTEGRATION_STATUSES = ["onboarding", "active", "paused", "terminated"];
const MAINTENANCE_STATUSES = ["upcoming", "in-progress", "completed"];

// ── Payment (Integration / Contract) ───────────────────────
const PAYMENT_CYCLES = ["one-time", "monthly", "yearly", "other"];
const PAYMENT_STATUSES = ["paid", "due", "overdue"];
const PAYMENT_METHODS = ["bank-transfer", "card", "cash", "cheque", "other"];

export {
  EQUIPMENT_CATEGORIES,
  EQUIPMENT_STATUSES,
  SOCIAL_MEDIA_LABELS,
  EMPLOYEE_STATUSES,
  LEGAL_DOCS_TYPES,
  EMPLOYMENT_POSITION_HISTORY_CHANGE_TYPES,
  UNIFORM_SIZES,
  CONTACT_LABELS,
  LANGUAGE_LEVELS,
  SALARY_PAYMENT_METHODS,
  STORE_ID_SOURCES,
  STORE_STATUSES,
  EXCLUDED_MENU_ITEM_REASONS,
  CUISINE_TYPES,
  CUISINE_TAG_SOURCES,
  PLATFORMS,
  CUSTOMER_CONTACT_FIELDS,
  RATING_SOURCES,
  REPLY_VISIBILITY,
  ITEM_FEEDBACK_SENTIMENTS,
  INTEGRATION_KINDS,
  INTEGRATION_STATUSES,
  MAINTENANCE_STATUSES,
  PAYMENT_CYCLES,
  PAYMENT_STATUSES,
  PAYMENT_METHODS,
};

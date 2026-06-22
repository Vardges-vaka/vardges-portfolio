import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../..");

const sourcePath = path.join(
  root,
  "frontEnd/src/10_pages/admin/_adminFeatures/03_cloudKitchens/competitors/05_competitors_cnst/cuisineTags.js",
);

const BEVERAGE_VALUES = new Set([
  "coffee",
  "tea",
  "bubbleTea",
  "matcha",
  "juices",
  "smoothies",
  "milkshakes",
  "beverages",
]);

const CREATED_BY = "69dc8199cdce66229d659c3b";

const sourceText = fs.readFileSync(sourcePath, "utf8");
const mod = sourceText.replace(
  "export const CUISINE_TAGS = ",
  "globalThis.CUISINE_TAGS = ",
);
eval(mod);

const rawTags = globalThis.CUISINE_TAGS;

const toKind = (tag) => {
  if (tag.type === "dessertBeverage") {
    return BEVERAGE_VALUES.has(tag.value) ? "beverage" : "dessert";
  }
  return tag.type;
};

const catalogTags = rawTags.map(({ type, ...rest }) => ({
  ...rest,
  kind: toKind({ ...rest, type }),
  source: "scraped",
}));

const seedTags = catalogTags.map((tag) => ({
  value: tag.value,
  label: tag.label,
  description: tag.description,
  platforms: tag.platforms,
  kind: tag.kind,
  source: "scraped",
  createdBy: CREATED_BY,
  isDeleted: false,
  isActive: true,
}));

const counts = catalogTags.reduce((acc, tag) => {
  acc[tag.kind] = (acc[tag.kind] || 0) + 1;
  return acc;
}, {});

const headerComment = `// ===== NATIONAL / REGIONAL CUISINES =====
// ===== FOOD CATEGORIES / FORMATS =====
// ===== DIETARY / LIFESTYLE =====
// ===== MEAL TYPES =====
// ===== DESSERTS =====
// ===== BEVERAGES =====
/**
 *
 *
 *
 * ! Counting the array directly: ${catalogTags.length} tags.
 *
 * ? The kind breakdown:
 *
 *  !   cuisine: ${counts.cuisine || 0}
 *  !   category: ${counts.category || 0}
 *  !   dietary: ${counts.dietary || 0}
 *  !   mealType: ${counts.mealType || 0}
 *  !   dessert: ${counts.dessert || 0}
 *  !   beverage: ${counts.beverage || 0}
 */`;

const formatTag = (tag, indent = "  ") => {
  const lines = [
    `${indent}{`,
    `${indent}  value: ${JSON.stringify(tag.value)},`,
    `${indent}  label: ${JSON.stringify(tag.label)},`,
    `${indent}  description:`,
    `${indent}    ${JSON.stringify(tag.description)},`,
    `${indent}  platforms: ${JSON.stringify(tag.platforms)},`,
    `${indent}  kind: ${JSON.stringify(tag.kind)},`,
    `${indent}  source: "scraped",`,
    `${indent}},`,
  ];
  return lines.join("\n");
};

const sectionForKind = (kind, prevKind) => {
  if (kind === prevKind) return "";
  const labels = {
    cuisine: "NATIONAL / REGIONAL CUISINES",
    category: "FOOD CATEGORIES / FORMATS",
    dietary: "DIETARY / LIFESTYLE",
    mealType: "MEAL TYPES",
    dessert: "DESSERTS",
    beverage: "BEVERAGES",
  };
  const label = labels[kind] || kind.toUpperCase();
  return `\n  // ===== ${label} =====\n`;
};

const kindOrder = [
  "cuisine",
  "category",
  "dietary",
  "mealType",
  "dessert",
  "beverage",
];

const sortedCatalog = [...catalogTags].sort(
  (a, b) => kindOrder.indexOf(a.kind) - kindOrder.indexOf(b.kind),
);

let catalogBody = "";
let prevKind = null;
for (const tag of sortedCatalog) {
  catalogBody += sectionForKind(tag.kind, prevKind);
  catalogBody += formatTag(tag) + "\n";
  prevKind = tag.kind;
}

const catalogOutput = `${headerComment}

export const CUISINE_TAGS = [
${catalogBody}];
`;

const seedOutput = `/**
 * MongoDB-ready CuisineTag seed documents.
 * Generated from competitors/05_competitors_cnst/cuisineTags.js
 * Run: node backEnd/scripts/seedCuisineTags.mjs
 */
export const CUISINE_TAGS_SEED = ${JSON.stringify(seedTags, null, 2)};

export const CUISINE_TAGS_SEED_META = {
  total: ${seedTags.length},
  createdBy: "${CREATED_BY}",
  counts: ${JSON.stringify(counts, null, 2)},
};
`;

const catalogOutPath = sourcePath;
const seedOutPath = path.join(
  root,
  "backEnd/scripts/cuisineTags_seed_data.js",
);

fs.writeFileSync(catalogOutPath, catalogOutput, "utf8");
fs.writeFileSync(seedOutPath, seedOutput, "utf8");

console.log("Wrote:", catalogOutPath);
console.log("Wrote:", seedOutPath);
console.log("Counts:", counts);

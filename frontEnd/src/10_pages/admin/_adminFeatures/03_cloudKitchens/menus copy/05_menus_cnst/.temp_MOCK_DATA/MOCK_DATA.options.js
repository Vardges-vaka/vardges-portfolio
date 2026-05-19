import { attachSales } from "./MOCK_DATA_sales.js";
import {
  OptionImage_1,
  OptionImage_2,
  OptionImage_3,
  OptionImage_4,
  OptionImage_5,
  OptionImage_6,
  OptionImage_7,
  OptionImage_8,
  OptionImage_9,
  OptionImage_10,
  OptionImage_11,
  OptionImage_12,
} from "../../../../../../../00_assets/MOCK_DATA_IMAGES/menus/_MOCK_DATA_IMAGES_01.index.js";

const CLOUD_STORAGES = ["s3", "gcs", "r2", "blob"];
const NUTRITION_SOURCES = ["manual", "autoFromRecipe"];

// Helper to make variation of files and images
const getImageSet = (img) => ({
  main: img,
  aggregators: img,
  website: img,
  google: img,
  highRes: img,
  noBackgroundPng: img,
  jpg: img,
  png: img,
  WebP: img,
  ico: img,
});

const getOtherImages = (img1, img2) => [
  {
    ref: "Preperation Instructions",
    path: img1,
    fileType: "pdf",
    sizeInBytes: 1000,
    description: "Preperation Instructions for the option",
  },
  {
    ref: "Tech Card",
    path: img2,
    fileType: "pdf",
    sizeInBytes: 1000,
    description: "Tech Card for the option",
  },
];

const getRecipeOrTechCardFile = () => ({
  word: "https://example.com/recipe.docx",
  excel: "https://example.com/recipe.xlsx",
  pdf: "https://example.com/recipe.pdf",
});

const baseAuthors = [
  { createdBy: "Vardges", updatedBy: "Boutros" },
  { createdBy: "Anna", updatedBy: "Karen" },
  { createdBy: "Suren", updatedBy: "Bella" },
  { createdBy: "Rami", updatedBy: "Aly" },
  { createdBy: "Olga", updatedBy: "Dmitry" },
  { createdBy: "Levon", updatedBy: "Aram" },
  { createdBy: "Fatima", updatedBy: "Omar" },
  { createdBy: "Li", updatedBy: "Chen" },
  { createdBy: "John", updatedBy: "Doe" },
  { createdBy: "Saira", updatedBy: "Imran" },
];

const NAMES = [
  "Cold Apitizers",
  "Hot Apitizers",
  "Salads",
  "Soups",
  "Grilled Platters",
  "Vegetarian Meals",
  "Seafood Specials",
  "Baked Goods",
  "Desserts",
  "Signature Dishes",
];

const SHORT_DESCS = [
  "Cold Appetizers collection of chilled dishes featuring fresh ingredients.",
  "Hot Appetizers served warm with unique spices and flavors.",
  "Fresh salads packed with seasonal greens and vibrant dressings.",
  "Hearty soups perfect for any weather and appetite.",
  "Mixed grill platters with meats and vegetables.",
  "Diverse vegetarian meals with plant-based goodness.",
  "Seafood options caught fresh and cooked perfectly.",
  "Bakery items and fresh baked, crusty, doughy treats.",
  "Delicious desserts to finish your meal on a sweet note.",
  "Exclusive signature dishes from the chef’s special menu.",
];

const LONG_DESCS = [
  "A variety of cold appetizers, perfect for starting your meal with a refreshing touch. Includes dips, spreads, and crisp vegetable combos.",
  "Enjoy our hot starters featuring both classic and modern dishes prepared with searing temperatures and aromatic spices.",
  "A medley of crisp greens, juicy fruits, and creative dressings to cater to healthy and tasty choices.",
  "Indulge in our selection of creamy, chunky, or clear broths made with love and fresh ingredients.",
  "Sizzle in the flavor with handpicked assortments of grilled meats and veggies, seasoned to perfection.",
  "Our vegetarian meals bring taste and nutrition together with wholesome plant-based ingredients.",
  "Try our seafood specials carefully sourced and cooked to embody flavors of the sea.",
  "Enjoy fluffy breads, savory rolls, and sweet pastries straight from our in-house oven.",
  "Handcrafted desserts ranging from cakes to puddings, presenting the perfect end to your feast.",
  "Discover our chef's favorites, designed to impress with signature touches and secret sauces.",
];

// Generate 10 mock options
const optionImages = [
  OptionImage_1,
  OptionImage_2,
  OptionImage_3,
  OptionImage_4,
  OptionImage_5,
  OptionImage_6,
  OptionImage_7,
  OptionImage_8,
  OptionImage_9,
  OptionImage_10,
  OptionImage_11,
  OptionImage_12,
];

// Each MOCK_OPTION_x is slightly varied for demonstration
const MOCK_OPTION_1 = {
  _id: "1.1.1.1",
  ...attachSales("1.1.1.1"),
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  isActive: true,
  displayOrder: 0,
  isDeleted: false,
  deletedAt: null,
  availableInModifiers: ["Modifier 1", "Modifier 3", "Modifier 7"],
  ...baseAuthors[0],
  name: { label: NAMES[0] },
  description: { short: SHORT_DESCS[0], long: LONG_DESCS[0] },
  images: {
    ...getImageSet(optionImages[0]),
    other: getOtherImages(optionImages[0], optionImages[1]),
  },
  recipeFile: getRecipeOrTechCardFile(),
  techCardFile: getRecipeOrTechCardFile(),
  cost: {
    actualCost: 5,
    estimatedCost: 4,
  },
  sellingPrice: { gross: 10, net: 9.5, VAT: 0.5 },
  nutrition: {
    source: NUTRITION_SOURCES[0],
    calories: 210,
    protein: 2,
    carbs: 3,
    fat: 4,
    lastCalculatedAt: new Date(),
  },
  cloudStorage: { isDefault: true, value: CLOUD_STORAGES[0] },
};

const MOCK_OPTION_2 = {
  _id: "1.1.1.2",
  ...attachSales("1.1.1.2"),
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  isActive: false,
  displayOrder: 1,
  isDeleted: false,
  deletedAt: null,
  availableInModifiers: ["Modifier 1", "Modifier 4"],
  ...baseAuthors[1],
  name: { label: NAMES[1] },
  description: { short: SHORT_DESCS[1], long: LONG_DESCS[1] },
  images: {
    ...getImageSet(optionImages[1]),
    other: getOtherImages(optionImages[1], optionImages[2]),
  },
  recipeFile: getRecipeOrTechCardFile(),
  techCardFile: getRecipeOrTechCardFile(),
  cost: {
    actualCost: 100,
    estimatedCost: 95,
  },
  sellingPrice: { gross: 12, net: 11.4, VAT: 0.6 },
  nutrition: {
    source: NUTRITION_SOURCES[1],
    calories: 180,
    protein: 3,
    carbs: 5,
    fat: 8,
    lastCalculatedAt: new Date(),
  },
  cloudStorage: { isDefault: true, value: CLOUD_STORAGES[1] },
};

const MOCK_OPTION_3 = {
  _id: "1.1.1.3",
  ...attachSales("1.1.1.3"),
  ownerType: "franchise",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  isActive: true,
  displayOrder: 2,
  isDeleted: false,
  deletedAt: null,
  availableInModifiers: ["Modifier 1", "Modifier 6"],
  ...baseAuthors[2],
  name: { label: NAMES[2] },
  description: { short: SHORT_DESCS[2], long: LONG_DESCS[2] },
  images: {
    ...getImageSet(optionImages[2]),
    other: getOtherImages(optionImages[2], optionImages[3]),
  },
  recipeFile: getRecipeOrTechCardFile(),
  techCardFile: getRecipeOrTechCardFile(),
  cost: {
    actualCost: 4,
    estimatedCost: 3.5,
  },
  sellingPrice: { gross: 9, net: 8.55, VAT: 0.45 },
  nutrition: {
    source: NUTRITION_SOURCES[0],
    calories: 110,
    protein: 1,
    carbs: 14,
    fat: 2,
    lastCalculatedAt: new Date(),
  },
  cloudStorage: { isDefault: true, value: CLOUD_STORAGES[2] },
};

const MOCK_OPTION_4 = {
  _id: "1.1.1.4",
  ...attachSales("1.1.1.4"),
  ownerType: "branch",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  isActive: true,
  displayOrder: 3,
  isDeleted: false,
  deletedAt: null,
  availableInModifiers: ["Modifier 2"],
  ...baseAuthors[3],
  name: { label: NAMES[3] },
  description: { short: SHORT_DESCS[3], long: LONG_DESCS[3] },
  images: {
    ...getImageSet(optionImages[3]),
    other: getOtherImages(optionImages[3], optionImages[4]),
  },
  recipeFile: getRecipeOrTechCardFile(),
  techCardFile: getRecipeOrTechCardFile(),
  cost: {
    actualCost: 7,
    estimatedCost: 6,
  },
  sellingPrice: { gross: 14, net: 13.46, VAT: 0.54 },
  nutrition: {
    source: NUTRITION_SOURCES[1],
    calories: 250,
    protein: 3,
    carbs: 6,
    fat: 10,
    lastCalculatedAt: new Date(),
  },
  cloudStorage: { isDefault: false, value: CLOUD_STORAGES[3] },
};

const MOCK_OPTION_5 = {
  _id: "1.1.1.5",
  ...attachSales("1.1.1.5"),
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  isActive: false,
  displayOrder: 4,
  isDeleted: true,
  availableInModifiers: ["Modifier 2", "Modifier 6"],
  deletedAt: new Date(),
  ...baseAuthors[4],
  name: { label: NAMES[4] },
  description: { short: SHORT_DESCS[4], long: LONG_DESCS[4] },
  images: {
    ...getImageSet(optionImages[4]),
    other: getOtherImages(optionImages[4], optionImages[5]),
  },
  recipeFile: getRecipeOrTechCardFile(),
  techCardFile: getRecipeOrTechCardFile(),
  cost: {
    actualCost: 9,
    estimatedCost: 8,
  },
  sellingPrice: { gross: 18, net: 17.46, VAT: 0.54 },
  nutrition: {
    source: NUTRITION_SOURCES[0],
    calories: 350,
    protein: 14,
    carbs: 9,
    fat: 20,
    lastCalculatedAt: new Date(),
  },
  cloudStorage: { isDefault: false, value: CLOUD_STORAGES[1] },
};

const MOCK_OPTION_6 = {
  _id: "1.1.1.6",
  ...attachSales("1.1.1.6"),
  ownerType: "franchise",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  isActive: true,
  displayOrder: 5,
  isDeleted: false,
  deletedAt: null,
  availableInModifiers: ["Modifier 3"],
  ...baseAuthors[5],
  name: { label: NAMES[5] },
  description: { short: SHORT_DESCS[5], long: LONG_DESCS[5] },
  images: {
    ...getImageSet(optionImages[5]),
    other: getOtherImages(optionImages[5], optionImages[6]),
  },
  recipeFile: getRecipeOrTechCardFile(),
  techCardFile: getRecipeOrTechCardFile(),
  cost: {
    actualCost: 4,
    estimatedCost: 3.5,
  },
  sellingPrice: { gross: 10, net: 9.55, VAT: 0.45 },
  nutrition: {
    source: NUTRITION_SOURCES[1],
    calories: 170,
    protein: 10,
    carbs: 14,
    fat: 4,
    lastCalculatedAt: new Date(),
  },
  cloudStorage: { isDefault: true, value: CLOUD_STORAGES[2] },
};

const MOCK_OPTION_7 = {
  _id: "1.1.1.7",
  ...attachSales("1.1.1.7"),
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  isActive: true,
  displayOrder: 6,
  isDeleted: false,
  deletedAt: null,
  availableInModifiers: ["Modifier 3"],
  ...baseAuthors[6],
  name: { label: NAMES[6] },
  description: { short: SHORT_DESCS[6], long: LONG_DESCS[6] },
  images: {
    ...getImageSet(optionImages[6]),
    other: getOtherImages(optionImages[6], optionImages[7]),
  },
  recipeFile: getRecipeOrTechCardFile(),
  techCardFile: getRecipeOrTechCardFile(),
  cost: {
    actualCost: 5,
    estimatedCost: 4.5,
  },
  sellingPrice: { gross: 10, net: 9.5, VAT: 0.5 },
  nutrition: {
    source: NUTRITION_SOURCES[0],
    calories: 145,
    protein: 16,
    carbs: 7,
    fat: 3,
    lastCalculatedAt: new Date(),
  },
  cloudStorage: { isDefault: true, value: CLOUD_STORAGES[3] },
};

const MOCK_OPTION_8 = {
  _id: "1.1.1.8",
  ...attachSales("1.1.1.8"),
  ownerType: "branch",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  isActive: false,
  displayOrder: 7,
  isDeleted: false,
  deletedAt: null,
  availableInModifiers: ["Modifier 3", "Modifier 6"],
  ...baseAuthors[7],
  name: { label: NAMES[7] },
  description: { short: SHORT_DESCS[7], long: LONG_DESCS[7] },
  images: {
    ...getImageSet(optionImages[7]),
    other: getOtherImages(optionImages[7], optionImages[8]),
  },
  recipeFile: getRecipeOrTechCardFile(),
  techCardFile: getRecipeOrTechCardFile(),
  cost: {
    actualCost: 7,
    estimatedCost: 6.5,
  },
  sellingPrice: { gross: 15, net: 14.25, VAT: 0.75 },
  nutrition: {
    source: NUTRITION_SOURCES[1],
    calories: 310,
    protein: 8,
    carbs: 27,
    fat: 9,
    lastCalculatedAt: new Date(),
  },
  cloudStorage: { isDefault: false, value: CLOUD_STORAGES[2] },
};

const MOCK_OPTION_9 = {
  _id: "1.1.1.9",
  ...attachSales("1.1.1.9"),
  ownerType: "franchise",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  isActive: true,
  displayOrder: 8,
  isDeleted: false,
  deletedAt: null,
  availableInModifiers: ["Modifier 4", "Modifier 7"],
  ...baseAuthors[8],
  name: { label: NAMES[8] },
  description: { short: SHORT_DESCS[8], long: LONG_DESCS[8] },
  images: {
    ...getImageSet(optionImages[8]),
    other: getOtherImages(optionImages[8], optionImages[9]),
  },
  recipeFile: getRecipeOrTechCardFile(),
  techCardFile: getRecipeOrTechCardFile(),
  cost: {
    actualCost: 6,
    estimatedCost: 5.5,
  },
  sellingPrice: { gross: 13, net: 12.35, VAT: 0.65 },
  nutrition: {
    source: NUTRITION_SOURCES[0],
    calories: 240,
    protein: 3,
    carbs: 39,
    fat: 2,
    lastCalculatedAt: new Date(),
  },
  cloudStorage: { isDefault: true, value: CLOUD_STORAGES[0] },
};

const MOCK_OPTION_10 = {
  _id: "1.1.1.10",
  ...attachSales("1.1.1.10"),
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  isActive: true,
  displayOrder: 9,
  isDeleted: false,
  deletedAt: null,
  availableInModifiers: ["Modifier 5"],
  ...baseAuthors[9],
  name: { label: NAMES[9] },
  description: { short: SHORT_DESCS[9], long: LONG_DESCS[9] },
  images: {
    ...getImageSet(optionImages[9]),
    other: getOtherImages(optionImages[9], optionImages[10]),
  },
  recipeFile: getRecipeOrTechCardFile(),
  techCardFile: getRecipeOrTechCardFile(),
  cost: {
    actualCost: 5,
    estimatedCost: 4.5,
  },
  sellingPrice: { gross: 10, net: 9.5, VAT: 0.5 },

  nutrition: {
    source: NUTRITION_SOURCES[1],
    calories: 500,
    protein: 20,
    carbs: 25,
    fat: 42,
    lastCalculatedAt: new Date(),
  },
  cloudStorage: { isDefault: true, value: CLOUD_STORAGES[1] },
};
const OPTIONS = [
  { ...MOCK_OPTION_1 },
  { ...MOCK_OPTION_2 },
  { ...MOCK_OPTION_3 },
  { ...MOCK_OPTION_4 },
  { ...MOCK_OPTION_5 },
  { ...MOCK_OPTION_6 },
  { ...MOCK_OPTION_7 },
  { ...MOCK_OPTION_8 },
  { ...MOCK_OPTION_9 },
  { ...MOCK_OPTION_10 },
];
export {
  OPTIONS,
  MOCK_OPTION_1,
  MOCK_OPTION_2,
  MOCK_OPTION_3,
  MOCK_OPTION_4,
  MOCK_OPTION_5,
  MOCK_OPTION_6,
  MOCK_OPTION_7,
  MOCK_OPTION_8,
  MOCK_OPTION_9,
  MOCK_OPTION_10,
};

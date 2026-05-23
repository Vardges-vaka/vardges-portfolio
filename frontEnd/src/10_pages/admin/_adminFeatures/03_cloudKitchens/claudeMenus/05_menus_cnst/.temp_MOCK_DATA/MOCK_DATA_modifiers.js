import { attachSales } from "./MOCK_DATA_sales.js";
import {
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
} from "./MOCK_DATA.options.js";

export const MODIFIER_SELECTION_MODES = ["single", "multiple"];

const sampleOfIsActiveTimings_1 = {
  isAlwaysActive: false,
  windows: [
    {
      label: "Breakfast",
      from: "09:00",
      to: "11:00",
    },
    {
      label: "Lunch",
      from: "01:00",
      to: "02:00",
    },
  ],
};
const sampleOfIsActiveTimings_2 = {
  isAlwaysActive: true,
  windows: [],
};

const sampleOfIsActiveTimings_3 = {
  isAlwaysActive: false,
  windows: [
    {
      label: "Dinner Service",
      from: "17:00",
      to: "23:30",
    },
  ],
};

const sampleOfIsActiveTimings_4 = {
  isAlwaysActive: false,
  windows: [
    {
      label: "Lunch",
      from: "11:00",
      to: "16:00",
    },
    {
      label: "Dinner",
      from: "18:00",
      to: "23:00",
    },
  ],
};

// Modifier 1
const MOCK_MODIFIER_1 = {
  _id: "1.1.1",
  ...attachSales("1.1.1"),
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  title: {
    label: "Modifier 1",
  },
  description: {
    short: "Short description of the modifier",
    long: "Long description of the modifier",
  },
  isOptional: true,
  selectionMode: MODIFIER_SELECTION_MODES[0],
  isFree: false,
  options: [
    { option: { ...MOCK_OPTION_1 }, displayOrder: 0 },
    { option: { ...MOCK_OPTION_2 }, displayOrder: 1 },
    { option: { ...MOCK_OPTION_3 }, displayOrder: 2 },
  ],
  isActive: true,
  activeTimings: sampleOfIsActiveTimings_1,
  displayOrder: 1,
  isDeleted: false,
  deletedAt: null,
  availableInMenuItems: [
    "Beef Stroganoff",
    "Beef Tenderloin Steak",
    "Butter Chicken",
    "Chicken Kiev",
    "Chicken Tikka Masala",
    "Classic Beef Burger",
    "Grilled Lamb Cutlets",
    "Lamb Kebab",
    "Lamb Plov",
    "Mixed Shashlik Platter",
    "Tom Yum Goong",
  ],
  createdBy: "Vardges",
  updatedBy: "Boutros",
};

// Modifier 2
const MOCK_MODIFIER_2 = {
  _id: "1.1.2",
  ...attachSales("1.1.2"),
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  title: {
    label: "Modifier 2",
  },
  description: {
    short: "Short description for Modifier 2",
    long: "Long description of the second modifier with more details.",
  },
  isOptional: false,
  selectionMode: MODIFIER_SELECTION_MODES[1],
  isFree: true,
  options: [
    { option: { ...MOCK_OPTION_4 }, displayOrder: 0 },
    { option: { ...MOCK_OPTION_5 }, displayOrder: 1 },
  ],
  isActive: true,
  activeTimings: sampleOfIsActiveTimings_2,
  displayOrder: 2,
  isDeleted: false,
  deletedAt: null,
  availableInMenuItems: [
    "BBQ Pulled Pork",
    "Beef Empanadas",
    "Buffalo Chicken Wings",
    "Chicken Shawarma",
    "Classic Beef Burger",
    "Classic Fish and Chips",
    "Crispy Chicken Schnitzel",
    "Homemade Pelmeni",
    "Pad Thai",
    "Traditional Borscht",
  ],
  createdBy: "Vardges",
  updatedBy: "Boutros",
};

// Modifier 3
const MOCK_MODIFIER_3 = {
  _id: "1.1.3",
  ...attachSales("1.1.3"),
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  title: {
    label: "Modifier 3",
  },
  description: {
    short: "Third modifier brief description.",
    long: "A more comprehensive description for modifier 3.",
  },
  isOptional: true,
  selectionMode: MODIFIER_SELECTION_MODES[0],
  isFree: false,
  options: [
    { option: { ...MOCK_OPTION_6 }, displayOrder: 0 },
    { option: { ...MOCK_OPTION_7 }, displayOrder: 1 },
    { option: { ...MOCK_OPTION_8 }, displayOrder: 2 },
    { option: { ...MOCK_OPTION_1 }, displayOrder: 3 },
  ],
  isActive: false,
  activeTimings: sampleOfIsActiveTimings_1,
  displayOrder: 3,
  isDeleted: false,
  deletedAt: null,
  availableInMenuItems: [
    "Beef Pho",
    "Chicken Kiev",
    "Lamb Biryani",
    "Mediterranean Chicken Wrap",
    "Mushroom Risotto",
    "Seafood Linguine",
    "Spaghetti Carbonara",
  ],
  createdBy: "Vardges",
  updatedBy: "Boutros",
};

// Modifier 4
const MOCK_MODIFIER_4 = {
  _id: "1.1.4",
  ...attachSales("1.1.4"),
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  title: {
    label: "Modifier 4",
  },
  description: {
    short: "Short desc for modifier 4",
    long: "Extended description for modifier 4 feature set.",
  },
  isOptional: false,
  selectionMode: MODIFIER_SELECTION_MODES[0],
  isFree: true,
  options: [
    { option: { ...MOCK_OPTION_2 }, displayOrder: 0 },
    { option: { ...MOCK_OPTION_9 }, displayOrder: 1 },
  ],
  isActive: true,
  activeTimings: sampleOfIsActiveTimings_1,
  displayOrder: 4,
  isDeleted: false,
  deletedAt: null,
  availableInMenuItems: [
    "Beef Udon Noodles",
    "Caesar Salad",
    "Falafel Wrap",
    "Pan-Fried Gyoza",
    "Tonkotsu Ramen",
    "Vegan Buddha Bowl",
    "Vietnamese Spring Rolls",
  ],
  createdBy: "Vardges",
  updatedBy: "Boutros",
};

// Modifier 5
const MOCK_MODIFIER_5 = {
  _id: "1.1.5",
  ...attachSales("1.1.5"),
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  title: {
    label: "Modifier 5",
  },
  description: {
    short: "Modifier 5 short description",
    long: "Full detail for modifier 5 goes here.",
  },
  isOptional: true,
  selectionMode: MODIFIER_SELECTION_MODES[1],
  isFree: false,
  options: [{ option: { ...MOCK_OPTION_10 }, displayOrder: 0 }],
  isActive: true,
  activeTimings: sampleOfIsActiveTimings_2,
  displayOrder: 5,
  isDeleted: false,
  deletedAt: null,
  availableInMenuItems: [
    "Ahi Tuna Poke Bowl",
    "Beef Tacos",
    "Beef Tenderloin Steak",
    "Chicken Quesadilla",
    "Grilled Salmon Teriyaki",
    "Korean Beef Bulgogi",
    "Margherita Pizza",
    "Pepperoni Pizza",
  ],
  createdBy: "Vardges",
  updatedBy: "Boutros",
};

// Modifier 6
const MOCK_MODIFIER_6 = {
  _id: "1.1.6",
  ...attachSales("1.1.6"),
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  title: {
    label: "Modifier 6",
  },
  description: {
    short: "Sixth modifier summary.",
    long: "Details about the sixth modifier and its capabilities.",
  },
  isOptional: false,
  selectionMode: MODIFIER_SELECTION_MODES[1],
  isFree: false,
  options: [
    { option: { ...MOCK_OPTION_3 }, displayOrder: 0 },
    { option: { ...MOCK_OPTION_5 }, displayOrder: 1 },
    { option: { ...MOCK_OPTION_8 }, displayOrder: 2 },
  ],
  isActive: true,
  activeTimings: sampleOfIsActiveTimings_1,
  displayOrder: 6,
  isDeleted: false,
  deletedAt: null,
  availableInMenuItems: [
    "Fluffy Pancakes",
    "Italian Gelato",
    "Molten Chocolate Fondant",
    "New York Cheesecake",
    "Panna Cotta",
    "Sweet Vareniki with Cherries",
  ],
  createdBy: "Vardges",
  updatedBy: "Boutros",
};

// Modifier 7
const MOCK_MODIFIER_7 = {
  _id: "1.1.7",
  ...attachSales("1.1.7"),
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  title: {
    label: "Modifier 7",
  },
  description: {
    short: "Short for modifier seven.",
    long: "Descriptive long text for seventh modifier.",
  },
  isOptional: true,
  selectionMode: MODIFIER_SELECTION_MODES[0],
  isFree: true,
  options: [
    { option: { ...MOCK_OPTION_9 }, displayOrder: 0 },
    { option: { ...MOCK_OPTION_1 }, displayOrder: 1 },
  ],
  isActive: false,
  activeTimings: sampleOfIsActiveTimings_2,
  displayOrder: 7,
  isDeleted: false,
  deletedAt: null,
  availableInMenuItems: [],
  createdBy: "Vardges",
  updatedBy: "Boutros",
};

// Modifier 8 — competitor
const MOCK_MODIFIER_8 = {
  _id: "1.2.1",
  ...attachSales("1.2.1"),
  ownerType: "competitor",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  title: {
    label: "Modifier 8",
  },
  description: {
    short: "Competitor spice level selection.",
    long: "Lets guests pick mild, medium, or hot heat for competitor menu items.",
  },
  isOptional: true,
  selectionMode: MODIFIER_SELECTION_MODES[0],
  isFree: true,
  options: [
    { option: { ...MOCK_OPTION_4 }, displayOrder: 0 },
    { option: { ...MOCK_OPTION_5 }, displayOrder: 1 },
    { option: { ...MOCK_OPTION_6 }, displayOrder: 2 },
  ],
  isActive: true,
  activeTimings: sampleOfIsActiveTimings_2,
  displayOrder: 8,
  isDeleted: false,
  deletedAt: null,
  availableInMenuItems: [
    "Chicken Kiev",
    "Margherita Pizza",
    "Pepperoni Pizza",
    "Beef Tacos",
    "Korean Beef Bulgogi",
    "Pad Thai",
    "Mango Sticky Rice",
  ],
  createdBy: "Anna",
  updatedBy: "Karen",
};

// Modifier 9 — competitor
const MOCK_MODIFIER_9 = {
  _id: "1.2.2",
  ...attachSales("1.2.2"),
  ownerType: "competitor",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  title: {
    label: "Modifier 9",
  },
  description: {
    short: "Competitor side dish upgrade.",
    long: "Optional side swaps and add-ons tracked on rival menus.",
  },
  isOptional: false,
  selectionMode: MODIFIER_SELECTION_MODES[1],
  isFree: false,
  options: [
    { option: { ...MOCK_OPTION_7 }, displayOrder: 0 },
    { option: { ...MOCK_OPTION_8 }, displayOrder: 1 },
  ],
  isActive: true,
  activeTimings: sampleOfIsActiveTimings_3,
  displayOrder: 9,
  isDeleted: false,
  deletedAt: null,
  availableInMenuItems: [
    "Salmon en Croute",
    "Mushroom Risotto",
    "Seafood Pasta",
    "Grilled Salmon Teriyaki",
    "Seafood Paella",
    "Classic Fish and Chips",
  ],
  createdBy: "Suren",
  updatedBy: "Bella",
};

// Modifier 10 — competitor
const MOCK_MODIFIER_10 = {
  _id: "1.2.3",
  ...attachSales("1.2.3"),
  ownerType: "competitor",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  title: {
    label: "Modifier 10",
  },
  description: {
    short: "Competitor sauce choice.",
    long: "House vs premium sauce options for competitor listings.",
  },
  isOptional: true,
  selectionMode: MODIFIER_SELECTION_MODES[0],
  isFree: false,
  options: [
    { option: { ...MOCK_OPTION_1 }, displayOrder: 0 },
    { option: { ...MOCK_OPTION_2 }, displayOrder: 1 },
    { option: { ...MOCK_OPTION_3 }, displayOrder: 2 },
    { option: { ...MOCK_OPTION_9 }, displayOrder: 3 },
  ],
  isActive: true,
  activeTimings: sampleOfIsActiveTimings_4,
  displayOrder: 10,
  isDeleted: false,
  deletedAt: null,
  availableInMenuItems: [
    "Mixed Shashlik Platter",
    "Crispy Chicken Schnitzel",
    "Duck Confit",
    "Tomato Bruschetta",
    "Hummus Platter",
    "Hungarian Goulash",
  ],
  createdBy: "Rami",
  updatedBy: "Aly",
};

// Modifier 11 — competitor
const MOCK_MODIFIER_11 = {
  _id: "1.2.4",
  ...attachSales("1.2.4"),
  ownerType: "competitor",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  title: {
    label: "Modifier 11",
  },
  description: {
    short: "Competitor portion size.",
    long: "Regular or large portion modifier on competitor items.",
  },
  isOptional: false,
  selectionMode: MODIFIER_SELECTION_MODES[0],
  isFree: false,
  options: [
    { option: { ...MOCK_OPTION_10 }, displayOrder: 0 },
    { option: { ...MOCK_OPTION_2 }, displayOrder: 1 },
  ],
  isActive: true,
  activeTimings: sampleOfIsActiveTimings_1,
  displayOrder: 11,
  isDeleted: false,
  deletedAt: null,
  availableInMenuItems: [
    "Margherita Pizza",
    "Pepperoni Pizza",
    "Beef Tacos",
    "Butter Croissant",
    "Italian Gelato",
    "Fluffy Pancakes",
  ],
  createdBy: "Olga",
  updatedBy: "Dmitry",
};

// Modifier 12 — competitor
const MOCK_MODIFIER_12 = {
  _id: "1.2.5",
  ...attachSales("1.2.5"),
  ownerType: "competitor",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  title: {
    label: "Modifier 12",
  },
  description: {
    short: "Competitor add-on protein.",
    long: "Extra protein add-ons for competitor grill and bowl items.",
  },
  isOptional: true,
  selectionMode: MODIFIER_SELECTION_MODES[1],
  isFree: false,
  options: [
    { option: { ...MOCK_OPTION_5 }, displayOrder: 0 },
    { option: { ...MOCK_OPTION_6 }, displayOrder: 1 },
    { option: { ...MOCK_OPTION_7 }, displayOrder: 2 },
  ],
  isActive: false,
  activeTimings: sampleOfIsActiveTimings_3,
  displayOrder: 12,
  isDeleted: false,
  deletedAt: null,
  availableInMenuItems: [
    "Mixed Shashlik Platter",
    "Mango Sticky Rice",
    "Berry Pavlova",
    "Italian Gelato",
    "Seafood Paella",
  ],
  createdBy: "Levon",
  updatedBy: "Aram",
};

// Modifier 13 — competitor
const MOCK_MODIFIER_13 = {
  _id: "1.2.6",
  ...attachSales("1.2.6"),
  ownerType: "competitor",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  title: {
    label: "Modifier 13",
  },
  description: {
    short: "Competitor premium toppings.",
    long: "Paid topping bundle used on competitor pizza and burger lines.",
  },
  isOptional: true,
  selectionMode: MODIFIER_SELECTION_MODES[1],
  isFree: false,
  options: [{ option: { ...MOCK_OPTION_8 }, displayOrder: 0 }],
  isActive: true,
  activeTimings: sampleOfIsActiveTimings_2,
  displayOrder: 13,
  isDeleted: false,
  deletedAt: null,
  availableInMenuItems: [
    "Pepperoni Pizza",
    "Margherita Pizza",
    "Berry Pavlova",
    "Tomato Bruschetta",
    "Hummus Platter",
  ],
  createdBy: "Fatima",
  updatedBy: "Omar",
};

// Modifier 14 — competitor (unused on menu items — mirrors Modifier 7)
const MOCK_MODIFIER_14 = {
  _id: "1.2.7",
  ...attachSales("1.2.7"),
  ownerType: "competitor",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  title: {
    label: "Modifier 14",
  },
  description: {
    short: "Competitor packaging option.",
    long: "Eco or premium packaging choice for competitor delivery items.",
  },
  isOptional: true,
  selectionMode: MODIFIER_SELECTION_MODES[0],
  isFree: true,
  options: [
    { option: { ...MOCK_OPTION_9 }, displayOrder: 0 },
    { option: { ...MOCK_OPTION_4 }, displayOrder: 1 },
  ],
  isActive: false,
  activeTimings: sampleOfIsActiveTimings_4,
  displayOrder: 14,
  isDeleted: false,
  deletedAt: null,
  availableInMenuItems: [],
  createdBy: "Li",
  updatedBy: "Chen",
};

const MODIFIERS = [
  { ...MOCK_MODIFIER_1 },
  { ...MOCK_MODIFIER_2 },
  { ...MOCK_MODIFIER_3 },
  { ...MOCK_MODIFIER_4 },
  { ...MOCK_MODIFIER_5 },
  { ...MOCK_MODIFIER_6 },
  { ...MOCK_MODIFIER_7 },
  { ...MOCK_MODIFIER_8 },
  { ...MOCK_MODIFIER_9 },
  { ...MOCK_MODIFIER_10 },
  { ...MOCK_MODIFIER_11 },
  { ...MOCK_MODIFIER_12 },
  { ...MOCK_MODIFIER_13 },
  { ...MOCK_MODIFIER_14 },
];
export {
  MODIFIERS,
  MOCK_MODIFIER_1,
  MOCK_MODIFIER_2,
  MOCK_MODIFIER_3,
  MOCK_MODIFIER_4,
  MOCK_MODIFIER_5,
  MOCK_MODIFIER_6,
  MOCK_MODIFIER_7,
  MOCK_MODIFIER_8,
  MOCK_MODIFIER_9,
  MOCK_MODIFIER_10,
  MOCK_MODIFIER_11,
  MOCK_MODIFIER_12,
  MOCK_MODIFIER_13,
  MOCK_MODIFIER_14,
};

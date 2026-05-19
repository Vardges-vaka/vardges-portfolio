import {
  MOCK_CATEGORY_1,
  MOCK_CATEGORY_2,
  MOCK_CATEGORY_3,
  MOCK_CATEGORY_4,
  MOCK_CATEGORY_5,
  MOCK_CATEGORY_6,
  MOCK_CATEGORY_7,
  MOCK_CATEGORY_8,
  MOCK_CATEGORY_9,
  MOCK_CATEGORY_10,
} from "./MOCK_DATA_categories.js";

// Menu 1 - Main Dining Menu
const MOCK_MENU_1 = {
  _id: "1",
  label: "Main Dining Menu",
  description:
    "Our comprehensive dining menu featuring appetizers, mains, and desserts",
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  categories: [
    { ...MOCK_CATEGORY_1 },
    { ...MOCK_CATEGORY_2 },
    { ...MOCK_CATEGORY_3 },
    { ...MOCK_CATEGORY_4 },
    { ...MOCK_CATEGORY_5 },
    { ...MOCK_CATEGORY_10 },
  ],
  isActive: true,
  isDeleted: false,
  deletedAt: null,
  createdBy: "Vardges",
  updatedBy: "Boutros",
  createdAt: "2023-01-18T08:14:32.000Z",
  updatedAt: "2025-04-22T11:37:05.000Z",
};

// Menu 2 - Italian Specialties
const MOCK_MENU_2 = {
  _id: "2",
  label: "Italian Specialties",
  description: "Authentic Italian cuisine from pasta to pizza",
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  categories: [
    { ...MOCK_CATEGORY_1 },
    { ...MOCK_CATEGORY_3 },
    { ...MOCK_CATEGORY_4 },
    { ...MOCK_CATEGORY_6 },
    { ...MOCK_CATEGORY_10 },
  ],
  isActive: true,
  isDeleted: false,
  deletedAt: null,
  createdBy: "Anna",
  updatedBy: "Karen",
  createdAt: "2023-04-05T14:28:19.000Z",
  updatedAt: "2024-11-09T09:52:41.000Z",
};

// Menu 3 - Asian Fusion
const MOCK_MENU_3 = {
  _id: "3",
  label: "Asian Fusion",
  description: "A journey through Asia's finest cuisines",
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  categories: [
    { ...MOCK_CATEGORY_2 },
    { ...MOCK_CATEGORY_3 },
    { ...MOCK_CATEGORY_4 },
    { ...MOCK_CATEGORY_7 },
    { ...MOCK_CATEGORY_10 },
  ],
  isActive: true,
  isDeleted: false,
  deletedAt: null,
  createdBy: "Suren",
  updatedBy: "Bella",
  createdAt: "2023-06-12T10:03:55.000Z",
  updatedAt: "2025-01-15T16:20:08.000Z",
};

// Menu 4 - Indian Feast
const MOCK_MENU_4 = {
  _id: "4",
  label: "Indian Feast",
  description: "Rich and aromatic Indian dishes",
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  categories: [
    { ...MOCK_CATEGORY_1 },
    { ...MOCK_CATEGORY_3 },
    { ...MOCK_CATEGORY_4 },
    { ...MOCK_CATEGORY_8 },
    { ...MOCK_CATEGORY_10 },
  ],
  isActive: true,
  isDeleted: false,
  deletedAt: null,
  createdBy: "Rami",
  updatedBy: "Aly",
  createdAt: "2023-09-21T07:45:12.000Z",
  updatedAt: "2024-08-30T13:11:27.000Z",
};

// Menu 5 - Grill House
const MOCK_MENU_5 = {
  _id: "5",
  label: "Grill House",
  description: "Premium grilled meats and seafood",
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  categories: [
    { ...MOCK_CATEGORY_1 },
    { ...MOCK_CATEGORY_2 },
    { ...MOCK_CATEGORY_3 },
    { ...MOCK_CATEGORY_5 },
    { ...MOCK_CATEGORY_10 },
  ],
  isActive: true,
  isDeleted: false,
  deletedAt: null,
  createdBy: "Olga",
  updatedBy: "Dmitry",
  createdAt: "2024-02-03T12:19:44.000Z",
  updatedAt: "2025-03-08T10:04:33.000Z",
};

// Menu 6 - Quick Bites
const MOCK_MENU_6 = {
  _id: "6",
  label: "Quick Bites",
  description: "Fast and delicious burgers, wraps, and sandwiches",
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  categories: [
    { ...MOCK_CATEGORY_2 },
    { ...MOCK_CATEGORY_3 },
    { ...MOCK_CATEGORY_9 },
    { ...MOCK_CATEGORY_10 },
  ],
  isActive: true,
  isDeleted: false,
  deletedAt: null,
  createdBy: "Levon",
  updatedBy: "Aram",
  createdAt: "2024-05-17T15:32:08.000Z",
  updatedAt: "2025-05-12T08:48:16.000Z",
};

// Menu 7 - Vegetarian Delights
const MOCK_MENU_7 = {
  _id: "7",
  label: "Vegetarian Delights",
  description: "Plant-based dishes full of flavor",
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  categories: [
    { ...MOCK_CATEGORY_1 },
    { ...MOCK_CATEGORY_3 },
    { ...MOCK_CATEGORY_4 },
    { ...MOCK_CATEGORY_6 },
    { ...MOCK_CATEGORY_10 },
  ],
  isActive: false,
  isDeleted: false,
  deletedAt: null,
  createdBy: "Fatima",
  updatedBy: "Omar",
  createdAt: "2023-11-08T09:07:26.000Z",
  updatedAt: "2024-06-25T17:33:50.000Z",
};

// Menu 8 - Late Night Menu
const MOCK_MENU_8 = {
  _id: "8",
  label: "Late Night Menu",
  description: "Available after 10 PM for night owls",
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  categories: [
    { ...MOCK_CATEGORY_2 },
    { ...MOCK_CATEGORY_9 },
    { ...MOCK_CATEGORY_10 },
  ],
  isActive: true,
  isDeleted: false,
  deletedAt: null,
  createdBy: "Li",
  updatedBy: "Chen",
  createdAt: "2024-01-29T20:15:03.000Z",
  updatedAt: "2025-02-14T22:09:37.000Z",
};

// Menu 9 - Weekend Brunch
const MOCK_MENU_9 = {
  _id: "9",
  label: "Weekend Brunch",
  description: "Special brunch menu available Saturday and Sunday",
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  categories: [
    { ...MOCK_CATEGORY_1 },
    { ...MOCK_CATEGORY_2 },
    { ...MOCK_CATEGORY_3 },
    { ...MOCK_CATEGORY_10 },
  ],
  isActive: true,
  isDeleted: false,
  deletedAt: null,
  createdBy: "John",
  updatedBy: "Doe",
  createdAt: "2024-07-04T06:41:22.000Z",
  updatedAt: "2025-04-01T12:55:09.000Z",
};

// Menu 10 - Chef's Tasting Menu
const MOCK_MENU_10 = {
  _id: "10",
  label: "Chef's Tasting Menu",
  description: "Curated selection of our finest dishes",
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  categories: [
    { ...MOCK_CATEGORY_1 },
    { ...MOCK_CATEGORY_4 },
    { ...MOCK_CATEGORY_5 },
    { ...MOCK_CATEGORY_6 },
    { ...MOCK_CATEGORY_7 },
    { ...MOCK_CATEGORY_8 },
    { ...MOCK_CATEGORY_10 },
  ],
  isActive: false,
  isDeleted: false,
  deletedAt: null,
  createdBy: "Saira",
  updatedBy: "Imran",
  createdAt: "2024-10-19T11:28:47.000Z",
  updatedAt: "2025-05-10T14:02:18.000Z",
};

// Menu 11 - Dacha (competitor)
const MOCK_MENU_11 = {
  _id: "11",
  label: "Dacha Home Kitchen",
  description: "Competitor menu — Russian comfort food and classics",
  ownerType: "competitor",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  categories: [
    { ...MOCK_CATEGORY_1 },
    { ...MOCK_CATEGORY_2 },
    { ...MOCK_CATEGORY_3 },
    { ...MOCK_CATEGORY_10 },
  ],
  isActive: true,
  isDeleted: false,
  deletedAt: null,
  createdBy: "External",
  updatedBy: "Scraper",
  createdAt: "2025-01-06T03:12:58.000Z",
  updatedAt: "2026-05-15T07:44:21.000Z",
};

// Menu 12 - Pushkin (competitor)
const MOCK_MENU_12 = {
  _id: "12",
  label: "Pushkin Bistro Menu",
  description: "Competitor menu — European mains and fine dining",
  ownerType: "competitor",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  categories: [
    { ...MOCK_CATEGORY_3 },
    { ...MOCK_CATEGORY_4 },
    { ...MOCK_CATEGORY_5 },
    { ...MOCK_CATEGORY_6 },
    { ...MOCK_CATEGORY_10 },
  ],
  isActive: true,
  isDeleted: false,
  deletedAt: null,
  createdBy: "External",
  updatedBy: "Scraper",
  createdAt: "2025-02-22T18:36:14.000Z",
  updatedAt: "2026-05-17T09:18:52.000Z",
};

// Menu 13 - Talabat Kitchen (competitor)
const MOCK_MENU_13 = {
  _id: "13",
  label: "Talabat Kitchen Express",
  description: "Competitor menu — Asian delivery favorites",
  ownerType: "competitor",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  categories: [
    { ...MOCK_CATEGORY_2 },
    { ...MOCK_CATEGORY_7 },
    { ...MOCK_CATEGORY_9 },
    { ...MOCK_CATEGORY_10 },
  ],
  isActive: true,
  isDeleted: false,
  deletedAt: null,
  createdBy: "External",
  updatedBy: "Scraper",
  createdAt: "2025-03-11T05:49:33.000Z",
  updatedAt: "2026-05-18T11:27:06.000Z",
};

// Menu 14 - Berezka (competitor)
const MOCK_MENU_14 = {
  _id: "14",
  label: "Berezka Quick Service",
  description: "Competitor menu — salads, wraps, and light bites",
  ownerType: "competitor",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  categories: [
    { ...MOCK_CATEGORY_1 },
    { ...MOCK_CATEGORY_3 },
    { ...MOCK_CATEGORY_9 },
    { ...MOCK_CATEGORY_10 },
  ],
  isActive: true,
  isDeleted: false,
  deletedAt: null,
  createdBy: "External",
  updatedBy: "Scraper",
  createdAt: "2025-04-28T13:21:07.000Z",
  updatedAt: "2026-05-19T06:03:44.000Z",
};

// Menu 15 - Odesa Ma (competitor)
const MOCK_MENU_15 = {
  _id: "15",
  label: "Odesa Ma Seafood",
  description: "Competitor menu — grilled fish and coastal plates",
  ownerType: "competitor",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  categories: [
    { ...MOCK_CATEGORY_2 },
    { ...MOCK_CATEGORY_5 },
    { ...MOCK_CATEGORY_8 },
    { ...MOCK_CATEGORY_10 },
  ],
  isActive: false,
  isDeleted: false,
  deletedAt: null,
  createdBy: "External",
  updatedBy: "Scraper",
  createdAt: "2025-05-02T21:54:39.000Z",
  updatedAt: "2026-05-19T12:41:28.000Z",
};

const MENUS = [
  { ...MOCK_MENU_1 },
  { ...MOCK_MENU_2 },
  { ...MOCK_MENU_11 },
  { ...MOCK_MENU_3 },
  { ...MOCK_MENU_12 },
  { ...MOCK_MENU_4 },
  { ...MOCK_MENU_5 },
  { ...MOCK_MENU_6 },
  { ...MOCK_MENU_7 },
  { ...MOCK_MENU_8 },
  { ...MOCK_MENU_9 },
  { ...MOCK_MENU_10 },
  { ...MOCK_MENU_13 },
  { ...MOCK_MENU_14 },
  { ...MOCK_MENU_15 },
];

export {
  MENUS,
  MOCK_MENU_1,
  MOCK_MENU_2,
  MOCK_MENU_3,
  MOCK_MENU_4,
  MOCK_MENU_5,
  MOCK_MENU_6,
  MOCK_MENU_7,
  MOCK_MENU_8,
  MOCK_MENU_9,
  MOCK_MENU_10,
  MOCK_MENU_11,
  MOCK_MENU_12,
  MOCK_MENU_13,
  MOCK_MENU_14,
  MOCK_MENU_15,
};

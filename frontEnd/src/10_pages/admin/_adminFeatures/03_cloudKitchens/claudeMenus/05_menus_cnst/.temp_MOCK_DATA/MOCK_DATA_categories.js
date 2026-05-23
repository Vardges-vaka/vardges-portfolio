import { attachSales } from "./MOCK_DATA_sales.js";
import {
  MOCK_MENU_ITEM_1,
  MOCK_MENU_ITEM_2,
  MOCK_MENU_ITEM_3,
  MOCK_MENU_ITEM_4,
  MOCK_MENU_ITEM_5,
  MOCK_MENU_ITEM_6,
  MOCK_MENU_ITEM_7,
  MOCK_MENU_ITEM_8,
  MOCK_MENU_ITEM_9,
  MOCK_MENU_ITEM_10,
  MOCK_MENU_ITEM_11,
  MOCK_MENU_ITEM_12,
  MOCK_MENU_ITEM_13,
  MOCK_MENU_ITEM_14,
  MOCK_MENU_ITEM_15,
  MOCK_MENU_ITEM_16,
  MOCK_MENU_ITEM_17,
  MOCK_MENU_ITEM_18,
  MOCK_MENU_ITEM_19,
  MOCK_MENU_ITEM_20,
  MOCK_MENU_ITEM_21,
  MOCK_MENU_ITEM_22,
  MOCK_MENU_ITEM_23,
  MOCK_MENU_ITEM_24,
  MOCK_MENU_ITEM_25,
  MOCK_MENU_ITEM_26,
  MOCK_MENU_ITEM_27,
  MOCK_MENU_ITEM_28,
  MOCK_MENU_ITEM_29,
  MOCK_MENU_ITEM_30,
  MOCK_MENU_ITEM_31,
  MOCK_MENU_ITEM_32,
  MOCK_MENU_ITEM_33,
  MOCK_MENU_ITEM_34,
  MOCK_MENU_ITEM_35,
  MOCK_MENU_ITEM_36,
  MOCK_MENU_ITEM_37,
  MOCK_MENU_ITEM_38,
  MOCK_MENU_ITEM_39,
  MOCK_MENU_ITEM_40,
  MOCK_MENU_ITEM_41,
  MOCK_MENU_ITEM_42,
  MOCK_MENU_ITEM_43,
  MOCK_MENU_ITEM_44,
  MOCK_MENU_ITEM_45,
  MOCK_MENU_ITEM_46,
  MOCK_MENU_ITEM_47,
  MOCK_MENU_ITEM_48,
  MOCK_MENU_ITEM_49,
  MOCK_MENU_ITEM_50,
  MOCK_MENU_ITEM_51,
  MOCK_MENU_ITEM_52,
  MOCK_MENU_ITEM_53,
  MOCK_MENU_ITEM_54,
  MOCK_MENU_ITEM_55,
  MOCK_MENU_ITEM_56,
  MOCK_MENU_ITEM_57,
  MOCK_MENU_ITEM_58,
  MOCK_MENU_ITEM_59,
  MOCK_MENU_ITEM_60,
  MOCK_MENU_ITEM_61,
  MOCK_MENU_ITEM_62,
  MOCK_MENU_ITEM_63,
  MOCK_MENU_ITEM_64,
  MOCK_MENU_ITEM_65,
  MOCK_MENU_ITEM_66,
  MOCK_MENU_ITEM_67,
  MOCK_MENU_ITEM_68,
  MOCK_MENU_ITEM_69,
  MOCK_MENU_ITEM_70,
} from "./MOCK_DATA_menuItems.js";

// Category 1 - Cold Appetizers
const MOCK_CATEGORY_1 = {
  _id: "1.1",
  ...attachSales("1.1"),
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  isActive: true,
  displayOrder: 1,
  isDeleted: false,
  deletedAt: null,
  createdBy: "Vardges",
  updatedBy: "Boutros",
  name: {
    label: "Cold Appetizers",
  },
  description: {
    short:
      "Cold Appetizers are a collection of dishes that are characterized by the fact that they contain cold ingredients",
    long: "Cold Appetizers are a collection of dishes that are characterized by the fact that they contain cold ingredients. Perfect for starting your meal with a refreshing touch.",
  },
  menu: "Label of the Menu that the Category belongs to",
  menuItems: [
    {
      item: { ...MOCK_MENU_ITEM_41 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 1,
    },
    {
      item: { ...MOCK_MENU_ITEM_42 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 2,
    },
    {
      item: { ...MOCK_MENU_ITEM_51 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 3,
    },
    {
      item: { ...MOCK_MENU_ITEM_52 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 4,
    },
  ],
  activeTimings: {
    isAlwaysActive: true,
    windows: [],
  },
};

// Category 2 - Hot Appetizers
const MOCK_CATEGORY_2 = {
  _id: "1.2",
  ...attachSales("1.2"),
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  isActive: true,
  displayOrder: 2,
  isDeleted: false,
  deletedAt: null,
  createdBy: "Anna",
  updatedBy: "Karen",
  name: {
    label: "Hot Appetizers",
  },
  description: {
    short: "Hot Appetizers served warm with unique spices and flavors",
    long: "Enjoy our hot starters featuring both classic and modern dishes prepared with searing temperatures and aromatic spices.",
  },
  menu: "Label of the Menu that the Category belongs to",
  menuItems: [
    {
      item: { ...MOCK_MENU_ITEM_53 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 1,
    },
    {
      item: { ...MOCK_MENU_ITEM_61 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 2,
    },
    {
      item: { ...MOCK_MENU_ITEM_63 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 3,
    },
    {
      item: { ...MOCK_MENU_ITEM_32 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 4,
    },
  ],
  activeTimings: {
    isAlwaysActive: true,
    windows: [],
  },
};

// Category 3 - Salads
const MOCK_CATEGORY_3 = {
  _id: "1.3",
  ...attachSales("1.3"),
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  isActive: true,
  displayOrder: 3,
  isDeleted: false,
  deletedAt: null,
  createdBy: "Suren",
  updatedBy: "Bella",
  name: {
    label: "Salads",
  },
  description: {
    short: "Fresh salads packed with seasonal greens and vibrant dressings",
    long: "A medley of crisp greens, juicy fruits, and creative dressings to cater to healthy and tasty choices.",
  },
  menu: "Label of the Menu that the Category belongs to",
  menuItems: [
    {
      item: { ...MOCK_MENU_ITEM_6 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 1,
    },
    {
      item: { ...MOCK_MENU_ITEM_20 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 2,
    },
    {
      item: { ...MOCK_MENU_ITEM_17 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 3,
    },
    {
      item: { ...MOCK_MENU_ITEM_51 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: false,
        windows: [
          {
            label: "Lunch & Dinner",
            from: "11:00",
            to: "22:00",
          },
        ],
      },
      displayOrder: 4,
    },
  ],
  activeTimings: {
    isAlwaysActive: true,
    windows: [],
  },
};

// Category 4 - Soups
const MOCK_CATEGORY_4 = {
  _id: "1.4",
  ...attachSales("1.4"),
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  isActive: true,
  displayOrder: 4,
  isDeleted: false,
  deletedAt: null,
  createdBy: "Rami",
  updatedBy: "Aly",
  name: {
    label: "Soups",
  },
  description: {
    short: "Hearty soups perfect for any weather and appetite",
    long: "Indulge in our selection of creamy, chunky, or clear broths made with love and fresh ingredients.",
  },
  menu: "Label of the Menu that the Category belongs to",
  menuItems: [
    {
      item: { ...MOCK_MENU_ITEM_2 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 1,
    },
    {
      item: { ...MOCK_MENU_ITEM_39 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 2,
    },
    {
      item: { ...MOCK_MENU_ITEM_31 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 3,
    },
    {
      item: { ...MOCK_MENU_ITEM_44 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 4,
    },
    {
      item: { ...MOCK_MENU_ITEM_57 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 5,
    },
  ],
  activeTimings: {
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
  },
};

// Category 5 - Grilled Platters
const MOCK_CATEGORY_5 = {
  _id: "1.5",
  ...attachSales("1.5"),
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  isActive: true,
  displayOrder: 5,
  isDeleted: false,
  deletedAt: null,
  createdBy: "Olga",
  updatedBy: "Dmitry",
  name: {
    label: "Grilled Platters",
  },
  description: {
    short: "Mixed grill platters with meats and vegetables",
    long: "Sizzle in the flavor with handpicked assortments of grilled meats and veggies, seasoned to perfection.",
  },
  menu: "Label of the Menu that the Category belongs to",
  menuItems: [
    {
      item: { ...MOCK_MENU_ITEM_1 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 1,
    },
    {
      item: { ...MOCK_MENU_ITEM_15 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 2,
    },
    {
      item: { ...MOCK_MENU_ITEM_18 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 3,
    },
    {
      item: { ...MOCK_MENU_ITEM_21 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 4,
    },
    {
      item: { ...MOCK_MENU_ITEM_59 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 5,
    },
    {
      item: { ...MOCK_MENU_ITEM_11 },
      isActive: false,
      activeTimings: {
        isAlwaysActive: false,
        windows: [],
      },
      displayOrder: 6,
    },
  ],
  activeTimings: {
    isAlwaysActive: true,
    windows: [],
  },
};

// Category 6 - Pasta & Italian
const MOCK_CATEGORY_6 = {
  _id: "1.6",
  ...attachSales("1.6"),
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  isActive: true,
  displayOrder: 6,
  isDeleted: false,
  deletedAt: null,
  createdBy: "Levon",
  updatedBy: "Aram",
  name: {
    label: "Pasta & Italian Specialties",
  },
  description: {
    short: "Authentic Italian pasta dishes and specialties",
    long: "Experience the taste of Italy with our handcrafted pasta dishes, pizzas, and classic Italian specialties.",
  },
  menu: "Label of the Menu that the Category belongs to",
  menuItems: [
    {
      item: { ...MOCK_MENU_ITEM_9 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 1,
    },
    {
      item: { ...MOCK_MENU_ITEM_30 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 2,
    },
    {
      item: { ...MOCK_MENU_ITEM_43 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 3,
    },
    {
      item: { ...MOCK_MENU_ITEM_22 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 4,
    },
    {
      item: { ...MOCK_MENU_ITEM_12 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 5,
    },
    {
      item: { ...MOCK_MENU_ITEM_24 },
      isActive: false,
      activeTimings: {
        isAlwaysActive: false,
        windows: [],
      },
      displayOrder: 6,
    },
    {
      item: { ...MOCK_MENU_ITEM_47 },
      isActive: false,
      activeTimings: {
        isAlwaysActive: false,
        windows: [],
      },
      displayOrder: 7,
    },
  ],
  activeTimings: {
    isAlwaysActive: true,
    windows: [],
  },
};

// Category 7 - Asian Cuisine
const MOCK_CATEGORY_7 = {
  _id: "1.7",
  ...attachSales("1.7"),
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  isActive: true,
  displayOrder: 7,
  isDeleted: false,
  deletedAt: null,
  createdBy: "Fatima",
  updatedBy: "Omar",
  name: {
    label: "Asian Delights",
  },
  description: {
    short: "Authentic Asian dishes from various regions",
    long: "Journey through Asia with our diverse selection of dishes from Japan, Thailand, Korea, Vietnam, and China.",
  },
  menu: "Label of the Menu that the Category belongs to",
  menuItems: [
    {
      item: { ...MOCK_MENU_ITEM_26 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 1,
    },
    {
      item: { ...MOCK_MENU_ITEM_33 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 2,
    },
    {
      item: { ...MOCK_MENU_ITEM_34 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 3,
    },
    {
      item: { ...MOCK_MENU_ITEM_27 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 4,
    },
    {
      item: { ...MOCK_MENU_ITEM_48 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 5,
    },
    {
      item: { ...MOCK_MENU_ITEM_67 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 6,
    },
  ],
  activeTimings: {
    isAlwaysActive: true,
    windows: [],
  },
};

// Category 8 - Indian Specialties
const MOCK_CATEGORY_8 = {
  _id: "1.8",
  ...attachSales("1.8"),
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  isActive: true,
  displayOrder: 8,
  isDeleted: false,
  deletedAt: null,
  createdBy: "Li",
  updatedBy: "Chen",
  name: {
    label: "Indian Specialties",
  },
  description: {
    short: "Rich and aromatic Indian curries and tandoori dishes",
    long: "Discover the vibrant flavors of India with our authentic curries, biryanis, and tandoori specialties.",
  },
  menu: "Label of the Menu that the Category belongs to",
  menuItems: [
    {
      item: { ...MOCK_MENU_ITEM_35 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 1,
    },
    {
      item: { ...MOCK_MENU_ITEM_49 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 2,
    },
    {
      item: { ...MOCK_MENU_ITEM_36 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 3,
    },
    {
      item: { ...MOCK_MENU_ITEM_65 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 4,
    },
  ],
  activeTimings: {
    isAlwaysActive: false,
    windows: [
      {
        label: "Dinner Service",
        from: "17:00",
        to: "23:30",
      },
    ],
  },
};

// Category 9 - Burgers & Sandwiches
const MOCK_CATEGORY_9 = {
  _id: "1.9",
  ...attachSales("1.9"),
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  isActive: true,
  displayOrder: 9,
  isDeleted: false,
  deletedAt: null,
  createdBy: "John",
  updatedBy: "Doe",
  name: {
    label: "Burgers & Sandwiches",
  },
  description: {
    short: "Juicy burgers and hearty sandwiches",
    long: "Satisfy your cravings with our selection of gourmet burgers, wraps, and classic sandwiches.",
  },
  menu: "Label of the Menu that the Category belongs to",
  menuItems: [
    {
      item: { ...MOCK_MENU_ITEM_56 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 1,
    },
    {
      item: { ...MOCK_MENU_ITEM_28 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 2,
    },
    {
      item: { ...MOCK_MENU_ITEM_45 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 3,
    },
    {
      item: { ...MOCK_MENU_ITEM_46 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 4,
    },
    {
      item: { ...MOCK_MENU_ITEM_55 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 5,
    },
  ],
  activeTimings: {
    isAlwaysActive: true,
    windows: [],
  },
};

// Category 10 - Desserts
const MOCK_CATEGORY_10 = {
  _id: "1.10",
  ...attachSales("1.10"),
  ownerType: "brand",
  ownerId: "mongoose.Schema.Types.ObjectId Sample",
  isActive: true,
  displayOrder: 10,
  isDeleted: false,
  deletedAt: null,
  createdBy: "Saira",
  updatedBy: "Imran",
  name: {
    label: "Desserts",
  },
  description: {
    short: "Delicious desserts to finish your meal on a sweet note",
    long: "Handcrafted desserts ranging from cakes to puddings, presenting the perfect end to your feast.",
  },
  menu: "Label of the Menu that the Category belongs to",
  menuItems: [
    {
      item: { ...MOCK_MENU_ITEM_10 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 1,
    },
    {
      item: { ...MOCK_MENU_ITEM_19 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 2,
    },
    {
      item: { ...MOCK_MENU_ITEM_40 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 3,
    },
    {
      item: { ...MOCK_MENU_ITEM_54 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 4,
    },
    {
      item: { ...MOCK_MENU_ITEM_60 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 5,
    },
    {
      item: { ...MOCK_MENU_ITEM_64 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 6,
    },
    {
      item: { ...MOCK_MENU_ITEM_68 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 7,
    },
    {
      item: { ...MOCK_MENU_ITEM_70 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: true,
        windows: [],
      },
      displayOrder: 8,
    },
    {
      item: { ...MOCK_MENU_ITEM_58 },
      isActive: true,
      activeTimings: {
        isAlwaysActive: false,
        windows: [
          {
            label: "Dessert Service",
            from: "12:00",
            to: "23:00",
          },
        ],
      },
      displayOrder: 9,
    },
  ],
  activeTimings: {
    isAlwaysActive: true,
    windows: [],
  },
};
const CATEGORIES = [
  { ...MOCK_CATEGORY_1 },
  { ...MOCK_CATEGORY_2 },
  { ...MOCK_CATEGORY_3 },
  { ...MOCK_CATEGORY_4 },
  { ...MOCK_CATEGORY_5 },
  { ...MOCK_CATEGORY_6 },
  { ...MOCK_CATEGORY_7 },
  { ...MOCK_CATEGORY_8 },
  { ...MOCK_CATEGORY_9 },
  { ...MOCK_CATEGORY_10 },
];
export {
  CATEGORIES,
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
};

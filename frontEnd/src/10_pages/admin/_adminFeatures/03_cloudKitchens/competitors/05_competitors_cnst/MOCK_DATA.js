/**
 * Dev-only mock list. Shapes mirror what the admin UI expects after the API
 * populates refs (`menu`). `competesWithBrands` on the wire is `{ brand, cuisineTags,
 * platform, observations }[]` with `brand` → Competitor ObjectId (`Competitor.js`).
 *
 * The export assigns **zero or one** deterministic mock link per competitor (so
 * editing `cuisineTypes` in raw rows does not change this list). The session UI
 * allows **up to five** links total.
 *
 * `hasOwnDeliveryDubai` is not stored on each raw row; see `MOCK_HAS_OWN_DELIVERY_DXB_BY_ID`
 * and the `MOCK_DATA_COMPETITORS` export mapping.
 */
import {
  dacha_logo,
  Logo_Berezka,
  Odesa_ma_logo,
  Pelmeni_Hous,
  Pushkin_logo,
  Velikaya_logo,
  BreadMeat_logo,
  russain_logo,
  sample_A,
  talabat_logo,
  VK_logo,
  borsht,
  chayxana,
  Impasto_Logo,
  int,
  puzatic,
  skazka,
  vkusnyashka,
  volda,
  MenuItem_one,
  MenuItem_two,
  MenuItem_three,
  MenuItem_four,
  MenuItem_five,
  MenuItem_six,
  MenuItem_seven,
  MenuItem_eight,
  MenuItem_nine,
  MenuItem_ten,
  MenuItem_eleven,
  MenuItem_twelve,
  MenuItem_thirteen,
  MenuItem_fourteen,
  MenuItem_fifteen,
  MenuItem_sixteen,
  MenuItem_seventeen,
  MenuItem_eighteen,
  MenuItem_nineteen,
  MenuItem_twenty,
} from "../../../../../../00_assets/_assets.index.js";

import { mc } from "./mockCuisineHelpers.js";

const UAE = "United Arab Emirates";

const coveragePolygonFromKm = (lat, lng, km, points = 12) => {
  if (lat == null || lng == null || km == null) return [];
  const r = Number(km);
  if (!Number.isFinite(r) || r <= 0) return [];

  const out = [];
  const latRad = (Number(lat) * Math.PI) / 180;
  const degLatPerKm = 1 / 111; // ~111km per 1° lat
  const degLngPerKm = 1 / (111 * Math.cos(latRad)); // adjust by latitude

  for (let i = 0; i < points; i += 1) {
    // Irregular “drive-time-like” polygon (deterministic, not a circle).
    const baseA = (i / points) * Math.PI * 2;
    const jitter = ((i * 97) % 13) / 130; // 0..~0.1
    const a = baseA + jitter;
    const scale = 0.75 + (((i * 37) % 11) / 10) * 0.85; // ~0.75..~1.6
    out.push({
      lat: Number(lat) + Math.sin(a) * r * scale * degLatPerKm,
      lng: Number(lng) + Math.cos(a) * r * scale * degLngPerKm,
    });
  }
  return out;
};

/** Minimal location row matching `branches.locations[]` in Competitor.js */
const loc = (
  emirate,
  city,
  address,
  lat,
  lng,
  coverageKm = null,
  hasDineIn = false,
  hasOwnDelivery = false,
) => ({
  country: UAE,
  emirate,
  state: "",
  city,
  address,
  coordinates: { lat, lng },
  hasDineIn: Boolean(hasDineIn),
  hasOwnDelivery: Boolean(hasOwnDelivery),
  coverageAreas: {
    // For the map view we simulate coverage as a Circle overlay using this km radius.
    byDistance: {
      polygon:
        coverageKm == null ? [] : coveragePolygonFromKm(lat, lng, coverageKm),
      radius: { km: coverageKm, center: { lat, lng } },
    },
    byDriveTime: {
      polygon: [],
      radius: { minutes: null, center: { lat, lng } },
    },
  },
  links: [],
  platforms: [],
  promos: [],
});

/** Mock `hasOwnDeliveryDubai` keyed by competitor root `_id` (Own delivery DXB column). */
const MOCK_HAS_OWN_DELIVERY_DXB_BY_ID = {
  1: true,
  2: false,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: true,
  10: true,
  11: true,
};

const mockCwbRow = (brandId, cuisineTags, platform, observations = []) => ({
  brand: String(brandId),
  cuisineTags: Array.isArray(cuisineTags) ? [...cuisineTags] : [],
  platform: platform != null ? String(platform) : "talabat",
  observations: Array.isArray(observations) ? [...observations] : [],
});

const MOCK_CWB_SAMPLE_OBS = [
  {
    date: new Date("2025-10-15"),
    note: "Watch promos and overlapping delivery zones.",
    addedBy: null,
    tags: ["pricing"],
  },
];

const MOCK_DATA_COMPETITORS_RAW = [
  {
    _id: "1",
    name: "Dacha",
    description: "Traditional Russian and Eastern European comfort food.",
    logo: dacha_logo,
    cuisineTypes: mc("russian", "ukrainian", "georgian"),
    priceRange: "premium",
    socials: {
      instagram: "https://instagram.com/dacha.example",
      facebook: "",
      tikTok: "",
      linkedIn: "",
      youtube: "",
      twitter: "",
      website: "https://dacha.example",
      others: [],
    },
    contact: {
      email: "info@dacha.example",
      whatsApp: "+971500000001",
      telegram: "",
      phone: "+971400000001",
    },
    branches: {
      totalQnt: 6,
      multiBranch: true,
      multiEmirates: true,
      multiCountry: false,
      locations: [
        loc("Dubai", "Dubai", "Trade Centre", 25.2048, 55.2708, 4.5, true),
        loc("Dubai", "Dubai Marina", "Marina Walk", 25.0772, 55.1398, 3.2),
        loc("Abu Dhabi", "Abu Dhabi", "Corniche", 24.4539, 54.3773),
        loc("Sharjah", "Sharjah", "Al Majaz", 25.3342, 55.3919),
        loc("Dubai", "JLT", "Cluster V", 25.0697, 55.1441, 2.6),
        loc("Dubai", "Business Bay", "Bay Avenue", 25.1868, 55.2636, 3.8),
      ],
    },
    menu: {
      _id: "mock-cmenu-001",
      name: "Dacha classics",
      categories: [
        {
          name: "Soups & starters",
          menuItems: [
            {
              name: "Borscht bowl",
              description: "Beet soup with sour cream",
              price: 42,
              image: borsht,
            },
            {
              name: "Pelmeni",
              description: "Beef dumplings with butter",
              price: 48,
              image: MenuItem_one,
            },
          ],
        },
        {
          name: "Mains",
          menuItems: [
            {
              name: "Beef Stroganoff",
              description: "Mushroom cream sauce",
              price: 72,
              image: MenuItem_two,
            },
          ],
        },
      ],
    },
    observations: [
      {
        date: new Date("2025-11-10"),
        note: "Menu price lift on mains (+5%).",
        addedBy: null,
        tags: ["pricing"],
      },
    ],
    files: [],
    isActive: true,
    deletedAt: null,
  },
  {
    _id: "2",
    name: "Berezka Kitchen",
    description: "Eastern European classics and bakery items.",
    logo: Logo_Berezka,
    // cuisineTypes: mc("chinese", "dumplings", "noodles"),
    cuisineTypes: mc("russian", "ukrainian", "georgian"),
    priceRange: "mid",
    socials: {
      instagram: "",
      facebook: "",
      tikTok: "",
      linkedIn: "",
      youtube: "",
      twitter: "",
      website: "",
      others: [{ link: "https://talabat.com", label: "Talabat" }],
    },
    contact: {
      email: "ops@berezka.example",
      whatsApp: "+971500000002",
      telegram: "",
      phone: "+971400000002",
    },
    branches: {
      totalQnt: 3,
      multiBranch: true,
      multiEmirates: true,
      multiCountry: false,
      locations: [
        loc("Dubai", "Downtown", "DIFC", 25.2134, 55.2816, 3.4, true),
        loc("Dubai", "Deira", "Al Rigga", 25.2695, 55.3144, 2.9),
        loc("Dubai", "JVC", "District 12", 25.0569, 55.2057, 3.1),
      ],
    },
    menu: {
      _id: "mock-cmenu-002",
      name: "Dim sum & starters",
      categories: [
        {
          name: "Starters",
          menuItems: [
            {
              name: "Spring rolls",
              description: "Vegetable spring rolls",
              price: 45,
              image: MenuItem_three,
            },
          ],
        },
      ],
    },
    observations: [],
    files: [],
    isActive: true,
    deletedAt: null,
  },
  {
    _id: "3",
    name: "Pelmeni Hub",
    description: "Fast-casual dumplings and soups.",
    logo: Pelmeni_Hous,
    // cuisineTypes: mc("indian", "curry", "grills"),
    cuisineTypes: mc("russian", "ukrainian", "georgian"),
    priceRange: "premium",
    socials: {
      instagram: "https://instagram.com/pelmeni.example",
      facebook: "",
      tikTok: "",
      linkedIn: "",
      youtube: "",
      twitter: "",
      website: "",
      others: [],
    },
    contact: {
      email: "hello@pelmeni.example",
      whatsApp: "+971500000003",
      telegram: "",
      phone: "+971400000003",
    },
    branches: {
      totalQnt: 2,
      multiBranch: true,
      multiEmirates: false,
      multiCountry: true,
      locations: [
        loc("Abu Dhabi", "Khalifa City", "Al Raha", 24.4305, 54.5828),
        loc("Dubai", "Al Barsha", "Al Barsha 1", 25.1107, 55.2003, 3.6, true),
      ],
    },
    menu: {
      _id: "mock-cmenu-003",
      name: "Tandoor specials",
      categories: [
        {
          name: "Main course",
          menuItems: [
            {
              name: "Butter chicken",
              description: "Creamy tomato curry",
              price: 75,
              image: MenuItem_four,
            },
          ],
        },
      ],
    },
    observations: [
      {
        date: new Date("2025-12-01"),
        note: "New lunch combo on Talabat.",
        addedBy: null,
        tags: ["menu-change", "marketing"],
      },
    ],
    files: [],
    isActive: true,
    deletedAt: null,
  },
  {
    _id: "4",
    name: "Pushkin Express",
    description: "Lebanese-inspired grill and salads (test mix).",
    logo: Pushkin_logo,
    // cuisineTypes: mc("lebanese", "grills", "salads"),
    cuisineTypes: mc("russian", "ukrainian", "georgian"),
    priceRange: "budget",
    socials: {
      instagram: "",
      facebook: "",
      tikTok: "",
      linkedIn: "",
      youtube: "",
      twitter: "",
      website: "https://pushkin.example",
      others: [],
    },
    contact: {
      email: "support@pushkin.example",
      whatsApp: "+971500000004",
      telegram: "",
      phone: "+971400000004",
    },
    branches: {
      totalQnt: 3,
      multiBranch: true,
      multiEmirates: false,
      multiCountry: false,
      locations: [
        loc("Dubai", "Al Quoz", "Al Quoz 3", 25.1412, 55.2341, 3.0, true),
        loc("Dubai", "Al Satwa", "Satwa main", 25.2285, 55.2722, 2.7),
        loc("Sharjah", "Sharjah", "Industrial", 25.3145, 55.3754),
      ],
    },
    menu: {
      _id: "mock-cmenu-004",
      name: "Lebanese delights",
      categories: [
        {
          name: "Appetizers",
          menuItems: [
            {
              name: "Hummus plate",
              description: "Classic chickpea hummus",
              price: 35,
              image: MenuItem_five,
            },
          ],
        },
      ],
    },
    observations: [],
    files: [],
    isActive: true,
    deletedAt: null,
  },
  {
    _id: "5",
    name: "Bread & Meat Co",
    description: "American-style burgers and fries.",
    logo: BreadMeat_logo,
    cuisineTypes: mc("american", "burgers", "fastFood"),
    priceRange: "mid",
    socials: {
      instagram: "",
      facebook: "",
      tikTok: "",
      linkedIn: "",
      youtube: "",
      twitter: "",
      website: "",
      others: [],
    },
    contact: {
      email: "orders@breadmeat.example",
      whatsApp: "+971500000005",
      telegram: "",
      phone: "+971400000005",
    },
    branches: {
      totalQnt: 2,
      multiBranch: true,
      multiEmirates: false,
      multiCountry: true,
      locations: [
        loc("Dubai", "Motor City", "Up Town", 25.0451, 55.2394, 3.3),
        loc("Abu Dhabi", "Yas Island", "Yas Mall area", 24.4871, 54.6039),
      ],
    },
    menu: {
      _id: "mock-cmenu-005",
      name: "Burger feast",
      categories: [
        {
          name: "Burgers",
          menuItems: [
            {
              name: "Cheeseburger",
              description: "Beef patty with cheese",
              price: 55,
              image: MenuItem_six,
            },
          ],
        },
      ],
    },
    observations: [],
    files: [],
    isActive: true,
    deletedAt: null,
  },
  {
    _id: "6",
    name: "Velikaya",
    description: "Japanese-inspired bowls and sushi rolls.",
    logo: Velikaya_logo,
    cuisineTypes: mc("japanese", "sushi", "ramen"),
    priceRange: "premium",
    socials: {
      instagram: "",
      facebook: "",
      tikTok: "",
      linkedIn: "",
      youtube: "",
      twitter: "",
      website: "",
      others: [],
    },
    contact: {
      email: "team@velikaya.example",
      whatsApp: "+971500000006",
      telegram: "",
      phone: "+971400000006",
    },
    branches: {
      totalQnt: 3,
      multiBranch: true,
      multiEmirates: true,
      multiCountry: true,
      locations: [
        loc("Dubai", "Palm Jumeirah", "The Palm", 25.1124, 55.139, 2.4),
        loc("Dubai", "DIFC", "Gate Village", 25.2131, 55.28, 2.2),
        loc("Dubai", "City Walk", "Al Wasl", 25.2013, 55.2614, 2.8),
      ],
    },
    menu: {
      _id: "mock-cmenu-006",
      name: "Japan favorites",
      categories: [
        {
          name: "Sushi",
          menuItems: [
            {
              name: "Salmon nigiri",
              description: "Fresh salmon",
              price: 65,
              image: MenuItem_seven,
            },
            {
              name: "Miso soup",
              description: "Silken tofu and wakame",
              price: 22,
              image: MenuItem_twenty,
            },
          ],
        },
      ],
    },
    observations: [],
    files: [],
    isActive: true,
    deletedAt: null,
  },
  {
    _id: "7",
    name: "Odesa Market Kitchen",
    description: "Ukrainian and Black Sea coastal comfort dishes.",
    logo: Odesa_ma_logo,
    cuisineTypes: mc("ukrainian", "seafood", "grills"),
    priceRange: "mid",
    socials: {
      instagram: "",
      facebook: "",
      tikTok: "",
      linkedIn: "",
      youtube: "",
      twitter: "",
      website: "",
      others: [],
    },
    contact: {
      email: "hello@odesa.example",
      whatsApp: "+971500000007",
      telegram: "",
      phone: "+971400000007",
    },
    branches: {
      totalQnt: 4,
      multiBranch: true,
      multiEmirates: true,
      multiCountry: false,
      locations: [
        loc("Dubai", "JBR", "The Walk", 25.0773, 55.1331, 2.5),
        loc("Dubai", "Dubai Hills", "Mall circle", 25.1031, 55.2447, 3.7),
        loc("Abu Dhabi", "Saadiyat", "Saadiyat Beach", 24.6579, 54.429),
        loc("Sharjah", "Muwaileh", "Muwaileh commercial", 25.2948, 55.4578),
      ],
    },
    menu: {
      _id: "mock-cmenu-007",
      name: "Coastal menu",
      categories: [
        {
          name: "Signatures",
          menuItems: [
            {
              name: "Grilled sea bream",
              description: "Herbs and lemon",
              price: 88,
              image: MenuItem_eight,
            },
            {
              name: "Vareniki platter",
              description: "Potato and cherry",
              price: 52,
              image: MenuItem_nine,
            },
          ],
        },
      ],
    },
    observations: [],
    files: [],
    isActive: true,
    deletedAt: null,
  },
  {
    _id: "8",
    name: "Impasto",
    description: "Italian hand-stretched pizza and pasta.",
    logo: Impasto_Logo,
    cuisineTypes: mc("italian", "pizza", "pasta"),
    priceRange: "mid",
    socials: {
      instagram: "",
      facebook: "",
      tikTok: "",
      linkedIn: "",
      youtube: "",
      twitter: "",
      website: "",
      others: [],
    },
    contact: {
      email: "ciao@impasto.example",
      whatsApp: "+971500000008",
      telegram: "",
      phone: "+971400000008",
    },
    branches: {
      totalQnt: 2,
      multiBranch: false,
      multiEmirates: true,
      multiCountry: false,
      locations: [
        loc("Dubai", "D3", "Design District", 25.1974, 55.2669, 2.6),
        loc("Abu Dhabi", "Reem Island", "Shams", 24.4934, 54.4082),
      ],
    },
    menu: {
      _id: "mock-cmenu-008",
      name: "Impasto principal",
      categories: [
        {
          name: "Pizza",
          menuItems: [
            {
              name: "Margherita DOC",
              description: "Tomato, bufala, basil",
              price: 62,
              image: MenuItem_eleven,
            },
          ],
        },
        {
          name: "Pasta",
          menuItems: [
            {
              name: "Tagliatelle ragù",
              description: "Slow-cooked beef",
              price: 58,
              image: MenuItem_twelve,
            },
          ],
        },
      ],
    },
    observations: [],
    files: [],
    isActive: true,
    deletedAt: null,
  },
  {
    _id: "9",
    name: "Chayhana",
    description: "Central Asian tea house and grills.",
    logo: chayxana,
    cuisineTypes: mc("uzbek", "grills", "tea"),
    priceRange: "budget",
    socials: {
      instagram: "",
      facebook: "",
      tikTok: "",
      linkedIn: "",
      youtube: "",
      twitter: "",
      website: "",
      others: [],
    },
    contact: {
      email: "tea@chayhana.example",
      whatsApp: "+971500000009",
      telegram: "",
      phone: "+971400000009",
    },
    branches: {
      totalQnt: 5,
      multiBranch: true,
      multiEmirates: false,
      multiCountry: false,
      locations: [
        loc("Dubai", "Discovery Gardens", "Street 1", 25.0448, 55.141, 2.9),
        loc("Dubai", "International City", "Persia", 25.165, 55.4116, 3.1),
        loc("Dubai", "Al Nahda", "Al Nahda 2", 25.2919, 55.3756, 2.3),
        loc("Sharjah", "Al Khan", "Corniche", 25.3266, 55.391),
        loc("Sharjah", "Al Majaz", "Al Majaz waterfront", 25.3256, 55.3919),
      ],
    },
    menu: {
      _id: "mock-cmenu-009",
      name: "Tea house menu",
      categories: [
        {
          name: "Grills",
          menuItems: [
            {
              name: "Shashlik skewers",
              description: "Lamb and onion",
              price: 54,
              image: MenuItem_thirteen,
            },
          ],
        },
      ],
    },
    observations: [],
    files: [],
    isActive: true,
    deletedAt: null,
  },
  {
    _id: "10",
    name: "Skazka Treats",
    description: "Desserts and Slavic sweet bakery.",
    logo: skazka,
    cuisineTypes: mc("desserts", "bakery", "coffee"),
    priceRange: "mid",
    socials: {
      instagram: "",
      facebook: "",
      tikTok: "",
      linkedIn: "",
      youtube: "",
      twitter: "",
      website: "",
      others: [],
    },
    contact: {
      email: "sweet@skazka.example",
      whatsApp: "+971500000010",
      telegram: "",
      phone: "+971400000010",
    },
    branches: {
      totalQnt: 3,
      multiBranch: true,
      multiEmirates: true,
      multiCountry: false,
      locations: [
        loc("Dubai", "Mirdif", "Mirdif City Centre", 25.2282, 55.4099, 3.0),
        loc("Abu Dhabi", "Mushrif", "Park area", 24.3344, 54.5028),
        loc("Dubai", "Al Warqa", "Warqa 3", 25.1917, 55.4193, 2.7),
      ],
    },
    menu: {
      _id: "mock-cmenu-010",
      name: "Sweet menu",
      categories: [
        {
          name: "Cakes",
          menuItems: [
            {
              name: "Honey cake slice",
              description: "Layered medovik",
              price: 28,
              image: MenuItem_fourteen,
            },
            {
              name: "Syrniki plate",
              description: "Cottage cheese patties",
              price: 32,
              image: MenuItem_fifteen,
            },
            {
              name: "Blini roll",
              description: "Smoked salmon blini",
              price: 36,
              image: MenuItem_ten,
            },
          ],
        },
      ],
    },
    observations: [],
    files: [],
    isActive: true,
    deletedAt: null,
  },
  {
    _id: "11",
    name: "Vkusnyashka Stop",
    description: "Grab-and-go sweets and soft drinks.",
    logo: vkusnyashka,
    cuisineTypes: mc("snacks", "desserts", "beverages"),
    priceRange: "budget",
    socials: {
      instagram: "",
      facebook: "",
      tikTok: "",
      linkedIn: "",
      youtube: "",
      twitter: "",
      website: "",
      others: [],
    },
    contact: {
      email: "stop@vkus.example",
      whatsApp: "+971500000011",
      telegram: "",
      phone: "+971400000011",
    },
    branches: {
      totalQnt: 4,
      multiBranch: false,
      multiEmirates: true,
      multiCountry: false,
      locations: [
        loc("Dubai", "Silicon Oasis", "DSO HQ", 25.1227, 55.3864, 3.4),
        loc("Dubai", "Academic City", "Student hub", 25.1547, 55.4033, 3.2),
        loc("Abu Dhabi", "Khalidiyah", "Khalidiyah Mall", 24.4766, 54.3524),
        loc("Dubai", "Al Qusais", "Al Qusais 3", 25.2848, 55.3781, 2.5),
      ],
    },
    menu: {
      _id: "mock-cmenu-011",
      name: "Snack wall",
      categories: [
        {
          name: "Grab & go",
          menuItems: [
            {
              name: "Chocolate wafer set",
              description: "Six-pack bundle",
              price: 18,
              image: MenuItem_sixteen,
            },
            {
              name: "Berry drink",
              description: "Chilled bottle",
              price: 12,
              image: MenuItem_seventeen,
            },
          ],
        },
      ],
    },
    observations: [],
    files: [],
    isActive: true,
    deletedAt: null,
  },
];
const MOCK_COMPETITOR_ROOT_IDS = MOCK_DATA_COMPETITORS_RAW.map((r) =>
  String(r._id),
);

/**
 * Stable pseudo-random: ~half have no links, ~half have one link (independent of
 * `cuisineTypes` edits in raw rows). UI allows up to five links total.
 */
const zeroOrOneMockCompetesWithBrandsForId = (selfId) => {
  const pool = MOCK_COMPETITOR_ROOT_IDS;
  const sid = String(selfId);
  const idx = pool.indexOf(sid);
  if (idx < 0) return [];
  let h = 0;
  for (let i = 0; i < sid.length; i += 1) {
    h = (h * 31 + sid.charCodeAt(i)) >>> 0;
  }
  if (h % 2 === 0) return [];
  const span = Math.max(1, pool.length - 1);
  const step = 1 + (h % span);
  const j = (idx + step) % pool.length;
  const cand = pool[j];
  if (cand === sid) return [];
  return [
    mockCwbRow(
      cand,
      ["russian"],
      "talabat",
      h % 4 === 0 ? MOCK_CWB_SAMPLE_OBS : [],
    ),
  ];
};

export const MOCK_DATA_COMPETITORS = MOCK_DATA_COMPETITORS_RAW.map((row) => ({
  ...row,
  hasOwnDeliveryDubai: MOCK_HAS_OWN_DELIVERY_DXB_BY_ID[row._id] ?? false,
  competesWithBrands: zeroOrOneMockCompetesWithBrandsForId(row._id),
}));

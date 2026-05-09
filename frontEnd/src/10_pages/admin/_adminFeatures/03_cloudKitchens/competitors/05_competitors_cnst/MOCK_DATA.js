/**
 * Dev-only mock list. Shapes mirror what the admin UI expects after the API
 * populates refs (menu, competesWithBrands). On the wire, `menu` and
 * `competesWithBrands` are ObjectId(s) per Competitor.js — here they are expanded
 * for table/detail views.
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
const loc = (emirate, city, address, lat, lng, coverageKm = null, hasDineIn = false) => ({
  country: UAE,
  emirate,
  state: "",
  city,
  address,
  coordinates: { lat, lng },
  hasDineIn: Boolean(hasDineIn),
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
  "1": true,
  "2": false,
  "3": true,
  "4": true,
  "5": true,
  "6": true,
  "7": true,
  "8": true,
  "9": true,
  "10": true,
  "11": true,
};

const MOCK_DATA_COMPETITORS_RAW = [
  {
    _id: "1",
    name: "Dacha",
    description: "Traditional Russian and Eastern European comfort food.",
    logo: dacha_logo,
    cuisineTypes: [
      { tag: "Russian", description: "Russian cuisine" },
      { tag: "Ukrainian", description: "Ukrainian cuisine" },
      { tag: "Belarusian", description: "Belarusian cuisine" },
    ],
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
    competesWithBrands: [
      {
        _id: "mock-cw-101",
        logo: russain_logo,
        name: "Russian House",
        cuisineTypes: [
          { tag: "Russian", description: "Russian cuisine" },
          { tag: "Grill", description: "Grill" },
        ],
        description: "Neighbouring Russian-focused dark kitchen.",
      },
      {
        _id: "mock-cw-102",
        logo: Logo_Berezka,
        name: "Berezka",
        cuisineTypes: [
          { tag: "Eastern European", description: "Eastern European" },
        ],
        description: "Competes on pelmeni and set menus.",
      },
      {
        _id: "mock-cw-103",
        logo: Pelmeni_Hous,
        name: "Pelmeni House",
        cuisineTypes: [
          { tag: "Dumplings", description: "Dumplings & soups" },
        ],
        description: "Overlap on dumplings and delivery promos.",
      },
      {
        _id: "mock-cw-104",
        logo: Pushkin_logo,
        name: "Pushkin",
        cuisineTypes: [{ tag: "Russian", description: "Russian fine casual" }],
        description: "Higher ticket overlap in Business Bay.",
      },
      {
        _id: "mock-cw-105",
        logo: Odesa_ma_logo,
        name: "Odesa Market",
        cuisineTypes: [
          { tag: "Ukrainian", description: "Ukrainian street food" },
        ],
        description: "Shared audience for Ukrainian dishes.",
      },
    ],
    isActive: true,
    deletedAt: null,
  },
  {
    _id: "2",
    name: "Berezka Kitchen",
    description: "Eastern European classics and bakery items.",
    logo: Logo_Berezka,
    cuisineTypes: [
      { tag: "Chinese", description: "Chinese cuisine" },
      { tag: "Dumplings", description: "Dumplings" },
      { tag: "Noodles", description: "Noodles" },
    ],
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
    competesWithBrands: [
      {
        _id: "mock-cw-201",
        logo: dacha_logo,
        name: "Dacha",
        cuisineTypes: [{ tag: "Russian", description: "Russian" }],
        description: "Direct overlap on comfort-food segment.",
      },
      {
        _id: "mock-cw-202",
        logo: Pelmeni_Hous,
        name: "Pelmeni House",
        cuisineTypes: [{ tag: "Dumplings", description: "Dumplings" }],
        description: "Dumpling-focused competitor.",
      },
      {
        _id: "mock-cw-203",
        logo: talabat_logo,
        name: "Aggregator benchmark",
        cuisineTypes: [{ tag: "Market", description: "Delivery visibility" }],
        description: "Compare delivery fees and promos.",
      },
    ],
    isActive: true,
    deletedAt: null,
  },
  {
    _id: "3",
    name: "Pelmeni Hub",
    description: "Fast-casual dumplings and soups.",
    logo: Pelmeni_Hous,
    cuisineTypes: [
      { tag: "Indian", description: "Indian cuisine" },
      { tag: "Curry", description: "Curry dishes" },
      { tag: "Grill", description: "Grilled food" },
    ],
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
    competesWithBrands: [
      {
        _id: "mock-cw-301",
        logo: Logo_Berezka,
        name: "Berezka Kitchen",
        cuisineTypes: [{ tag: "European", description: "European" }],
        description: "Overlapping dumpling SKUs.",
      },
      {
        _id: "mock-cw-302",
        logo: BreadMeat_logo,
        name: "Bread & Meat",
        cuisineTypes: [{ tag: "Grill", description: "Grill" }],
        description: "Grill overlap in same zones.",
      },
      {
        _id: "mock-cw-303",
        logo: Impasto_Logo,
        name: "Impasto",
        cuisineTypes: [{ tag: "Italian", description: "Italian" }],
        description: "Pasta crossover audience.",
      },
      {
        _id: "mock-cw-304",
        logo: int,
        name: "INT Kitchen",
        cuisineTypes: [{ tag: "Fusion", description: "Fusion" }],
        description: "Shared dark-kitchen corridor.",
      },
    ],
    isActive: true,
    deletedAt: null,
  },
  {
    _id: "4",
    name: "Pushkin Express",
    description: "Lebanese-inspired grill and salads (test mix).",
    logo: Pushkin_logo,
    cuisineTypes: [
      { tag: "Lebanese", description: "Lebanese cuisine" },
      { tag: "Grill", description: "Grilled food" },
      { tag: "Salad", description: "Fresh salads" },
    ],
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
    competesWithBrands: [
      {
        _id: "mock-cw-401",
        logo: chayxana,
        name: "Chayhana",
        cuisineTypes: [{ tag: "Central Asian", description: "Central Asian" }],
        description: "Shared grill and bread items.",
      },
      {
        _id: "mock-cw-402",
        logo: puzatic,
        name: "Puzatic",
        cuisineTypes: [{ tag: "Grill", description: "Grill" }],
        description: "Price overlap on combos.",
      },
      {
        _id: "mock-cw-403",
        logo: VK_logo,
        name: "VK Street",
        cuisineTypes: [{ tag: "Fast casual", description: "Fast casual" }],
        description: "Same delivery radius.",
      },
    ],
    isActive: true,
    deletedAt: null,
  },
  {
    _id: "5",
    name: "Bread & Meat Co",
    description: "American-style burgers and fries.",
    logo: BreadMeat_logo,
    cuisineTypes: [
      { tag: "American", description: "American cuisine" },
      { tag: "Burgers", description: "Burger specials" },
      { tag: "Fries", description: "Sides" },
    ],
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
    competesWithBrands: [
      {
        _id: "mock-cw-501",
        logo: Velikaya_logo,
        name: "Velikaya",
        cuisineTypes: [{ tag: "Grill", description: "Grill" }],
        description: "Competes on meat-heavy baskets.",
      },
      {
        _id: "mock-cw-502",
        logo: sample_A,
        name: "Sample Co A",
        cuisineTypes: [{ tag: "Burgers", description: "Burgers" }],
        description: "Benchmark AOV.",
      },
      {
        _id: "mock-cw-503",
        logo: volda,
        name: "Volda",
        cuisineTypes: [{ tag: "Casual", description: "Casual dining" }],
        description: "Neighbourhood overlap.",
      },
      {
        _id: "mock-cw-504",
        logo: vkusnyashka,
        name: "Vkusnyashka",
        cuisineTypes: [{ tag: "Comfort", description: "Comfort food" }],
        description: "Shared promos window.",
      },
    ],
    isActive: true,
    deletedAt: null,
  },
  {
    _id: "6",
    name: "Velikaya",
    description: "Japanese-inspired bowls and sushi rolls.",
    logo: Velikaya_logo,
    cuisineTypes: [
      { tag: "Japanese", description: "Japanese cuisine" },
      { tag: "Sushi", description: "Sushi rolls" },
      { tag: "Ramen", description: "Ramen noodles" },
    ],
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
    competesWithBrands: [
      {
        _id: "mock-cw-601",
        logo: Impasto_Logo,
        name: "Impasto",
        cuisineTypes: [{ tag: "Italian", description: "Italian" }],
        description: "Premium casual overlap.",
      },
      {
        _id: "mock-cw-602",
        logo: skazka,
        name: "Skazka",
        cuisineTypes: [{ tag: "Pan-Asian", description: "Pan-Asian" }],
        description: "Rolls and bowls crossover.",
      },
      {
        _id: "mock-cw-603",
        logo: Odesa_ma_logo,
        name: "Odesa Market",
        cuisineTypes: [{ tag: "Seafood", description: "Seafood" }],
        description: "Shared seafood-forward menu tests.",
      },
    ],
    isActive: true,
    deletedAt: null,
  },
  {
    _id: "7",
    name: "Odesa Market Kitchen",
    description: "Ukrainian and Black Sea coastal comfort dishes.",
    logo: Odesa_ma_logo,
    cuisineTypes: [
      { tag: "Ukrainian", description: "Ukrainian cuisine" },
      { tag: "Seafood", description: "Seafood plates" },
      { tag: "Grill", description: "Grill" },
    ],
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
    competesWithBrands: [
      {
        _id: "mock-cw-701",
        logo: dacha_logo,
        name: "Dacha",
        cuisineTypes: [{ tag: "Eastern European", description: "Eastern European" }],
        description: "Shared heritage menu items.",
      },
      {
        _id: "mock-cw-702",
        logo: russain_logo,
        name: "Russian House",
        cuisineTypes: [{ tag: "Russian", description: "Russian" }],
        description: "Neighbourhood overlap.",
      },
      {
        _id: "mock-cw-703",
        logo: volda,
        name: "Volda",
        cuisineTypes: [{ tag: "Casual", description: "Casual counter" }],
        description: "Neighbouring casual brand.",
      },
      {
        _id: "mock-cw-704",
        logo: Pelmeni_Hous,
        name: "Pelmeni Hub",
        cuisineTypes: [{ tag: "Dumplings", description: "Dumplings" }],
        description: "Dumpling category clash.",
      },
      {
        _id: "mock-cw-705",
        logo: Pushkin_logo,
        name: "Pushkin Express",
        cuisineTypes: [{ tag: "Grill", description: "Grill" }],
        description: "Delivery overlap evenings.",
      },
    ],
    isActive: true,
    deletedAt: null,
  },
  {
    _id: "8",
    name: "Impasto",
    description: "Italian hand-stretched pizza and pasta.",
    logo: Impasto_Logo,
    cuisineTypes: [
      { tag: "Italian", description: "Italian cuisine" },
      { tag: "Pizza", description: "Wood-fired pizza" },
      { tag: "Pasta", description: "Fresh pasta" },
    ],
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
    competesWithBrands: [
      {
        _id: "mock-cw-801",
        logo: Velikaya_logo,
        name: "Velikaya",
        cuisineTypes: [{ tag: "Premium", description: "Premium casual" }],
        description: "Ticket size comparison.",
      },
      {
        _id: "mock-cw-802",
        logo: BreadMeat_logo,
        name: "Bread & Meat Co",
        cuisineTypes: [{ tag: "Casual", description: "Casual" }],
        description: "Family dining overlap.",
      },
      {
        _id: "mock-cw-803",
        logo: chayxana,
        name: "Chayhana",
        cuisineTypes: [{ tag: "Regional", description: "Regional" }],
        description: "Shared feeder districts.",
      },
    ],
    isActive: true,
    deletedAt: null,
  },
  {
    _id: "9",
    name: "Chayhana",
    description: "Central Asian tea house and grills.",
    logo: chayxana,
    cuisineTypes: [
      { tag: "Central Asian", description: "Central Asian cuisine" },
      { tag: "Grill", description: "Grill" },
      { tag: "Tea", description: "Tea service" },
    ],
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
    competesWithBrands: [
      {
        _id: "mock-cw-901",
        logo: Pushkin_logo,
        name: "Pushkin Express",
        cuisineTypes: [{ tag: "Grill", description: "Grill" }],
        description: "Nearby grill overlap.",
      },
      {
        _id: "mock-cw-902",
        logo: puzatic,
        name: "Puzatic",
        cuisineTypes: [{ tag: "Casual", description: "Casual" }],
        description: "Similar radius and SLAs.",
      },
      {
        _id: "mock-cw-903",
        logo: int,
        name: "INT Kitchen",
        cuisineTypes: [{ tag: "Fusion", description: "Fusion" }],
        description: "Shared aggregator placements.",
      },
      {
        _id: "mock-cw-904",
        logo: volda,
        name: "Volda",
        cuisineTypes: [{ tag: "Street food", description: "Street food" }],
        description: "Late-night overlap.",
      },
    ],
    isActive: true,
    deletedAt: null,
  },
  {
    _id: "10",
    name: "Skazka Treats",
    description: "Desserts and Slavic sweet bakery.",
    logo: skazka,
    cuisineTypes: [
      { tag: "Desserts", description: "Desserts" },
      { tag: "Bakery", description: "Bakery" },
      { tag: "Coffee", description: "Coffee" },
    ],
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
    competesWithBrands: [
      {
        _id: "mock-cw-1001",
        logo: vkusnyashka,
        name: "Vkusnyashka",
        cuisineTypes: [{ tag: "Sweets", description: "Sweets" }],
        description: "Direct dessert overlap.",
      },
      {
        _id: "mock-cw-1002",
        logo: Logo_Berezka,
        name: "Berezka Kitchen",
        cuisineTypes: [{ tag: "Bakery", description: "Bakery" }],
        description: "Bakery crossover SKUs.",
      },
      {
        _id: "mock-cw-1003",
        logo: Velikaya_logo,
        name: "Velikaya",
        cuisineTypes: [{ tag: "Casual", description: "Casual" }],
        description: "Mall adjacency.",
      },
    ],
    isActive: true,
    deletedAt: null,
  },
  {
    _id: "11",
    name: "Vkusnyashka Stop",
    description: "Grab-and-go sweets and soft drinks.",
    logo: vkusnyashka,
    cuisineTypes: [
      { tag: "Snacks", description: "Snacks" },
      { tag: "Sweets", description: "Sweets" },
      { tag: "Retail", description: "Retail bundles" },
    ],
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
    competesWithBrands: [
      {
        _id: "mock-cw-1101",
        logo: skazka,
        name: "Skazka Treats",
        cuisineTypes: [{ tag: "Desserts", description: "Desserts" }],
        description: "Closest sweet competitor.",
      },
      {
        _id: "mock-cw-1102",
        logo: sample_A,
        name: "Sample Co A",
        cuisineTypes: [{ tag: "Benchmark", description: "Benchmark" }],
        description: "Pricing sentinel brand.",
      },
      {
        _id: "mock-cw-1103",
        logo: talabat_logo,
        name: "Delivery bench",
        cuisineTypes: [{ tag: "Market", description: "Market" }],
        description: "Promo frequency comparison.",
      },
      {
        _id: "mock-cw-1104",
        logo: MenuItem_eighteen,
        name: "Item-image rival",
        cuisineTypes: [{ tag: "Test", description: "Test" }],
        description: "Uses menu asset as logo in mock.",
      },
      {
        _id: "mock-cw-1105",
        logo: MenuItem_nineteen,
        name: "Second bench rival",
        cuisineTypes: [{ tag: "Test", description: "Test" }],
        description: "Fifth slot for table logo strip.",
      },
    ],
    isActive: true,
    deletedAt: null,
  },
];

export const MOCK_DATA_COMPETITORS = MOCK_DATA_COMPETITORS_RAW.map((row) => ({
  ...row,
  hasOwnDeliveryDubai: MOCK_HAS_OWN_DELIVERY_DXB_BY_ID[row._id] ?? false,
}));

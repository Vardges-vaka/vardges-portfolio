import {
  Careem_logo,
  Deliveroo_logo,
  Keeta_logo,
  Noon_logo,
  Talabat_logo,
  Beverage_Logo,
  Category_Logo,
  Cuisine_Logo,
  Dessert_Logo,
  Dietary_Logo,
  MealType_Logo,
  Other_Logo,
} from "../../../../../../00_assets/_assets.index.js";

const SAMPLE_CUISINE_TAGS = [
  {
    value: "italian",
    label: "Italian",
    description:
      "Italian cuisine on UAE delivery platforms covers the full repertoire of pasta, pizza, risotto, antipasti, lasagna, tiramisu and gelato. In Dubai's cloud-kitchen context, Italian is one of the highest-volume cuisine tags — anchored by olive oil, tomato, garlic, basil, oregano and parmesan, with Neapolitan and Roman pizzas (wood-fired or pan), fresh and dried pastas (carbonara, arrabbiata, pesto, bolognese), creamy risottos, and bruschetta-style starters. UAE consumers expect halal-certified meats (chicken substitutes for pork-based salumi like prosciutto and pancetta are standard, often replaced with beef bacon or turkey ham), kid-friendly menus, and family sharing platters. Strong sub-categories include thin-crust pizza, stuffed pasta and Italian desserts  (cannoli, panna cotta, tiramisu). Brands like PizzaExpress, Eataly, 800 Pizza, Pinza and Bianco Italy define expectations.",
    platforms: ["talabat", "deliveroo", "noon", "careem", "keeta"],
    kind: "cuisine",
    source: "scraped",
  },
  {
    value: "mexican",
    label: "Mexican",
    description:
      "Mexican cuisine on UAE delivery platforms covers the full repertoire of tacos, burritos, quesadillas, nachos, fajitas, enchiladas and chimichangas. In Dubai's cloud-kitchen context, Mexican is one of the highest-volume cuisine tags — anchored by avocado, salsa, guacamole, chili, corn tortillas and fresh vegetables. UAE consumers expect halal-certified meats (chicken substitutes for pork-based salumi like prosciutto and pancetta are standard, often replaced with beef bacon or turkey ham), kid-friendly menus, and family sharing platters. Strong sub-categories include soft tacos, hard tacos, quesadillas and nachos. Reference brands: Tortilla, Burro Blanco, Lotsa Tacos, Chipotle (limited UAE presence).",
    platforms: ["talabat", "deliveroo", "noon", "careem", "keeta"],
    kind: "cuisine",
    source: "scraped",
  },
  {
    value: "american",
    label: "American",
    description:
      "American cuisine on UAE delivery platforms covers the full repertoire of burgers, BBQ, fried chicken, sandwiches, mac and cheese, ribs, wings, fries, milkshakes and brownies. In Dubai's cloud-kitchen context, American is one of the highest-volume cuisine tags — anchored by beef, pork, chicken, cheese, bacon, lettuce, tomato and onion. UAE consumers expect halal-certified meats (chicken substitutes for pork-based salumi like prosciutto and pancetta are standard, often replaced with beef bacon or turkey ham), kid-friendly menus, and family sharing platters. Strong sub-categories include burgers, BBQ, fried chicken, sandwiches, mac and cheese, ribs, wings, fries, milkshakes and brownies. Reference brands: Five Guys, Shake Shack,  IHOP, Buffalo Wild Wings, Johnny Rockets,  Hardee's, Clinton Street Baking Company.",
    platforms: ["talabat", "deliveroo", "noon", "careem", "keeta"],
    kind: "cuisine",
    source: "scraped",
  },
  {
    value: "french",
    label: "French",
    description:
      "French cuisine on UAE delivery platforms covers the full repertoire of croissants, quiches, baguette sandwiches, croque-monsieur, ratatouille, beef bourguignon (halal), crêpes and pastries (éclairs, mille-feuille). In Dubai's cloud-kitchen context, French is one of the highest-volume cuisine tags — anchored by butter, flour, eggs, cheese, sugar, yeast and vanilla. UAE consumers expect halal-certified meats (chicken substitutes for pork-based salumi like prosciutto and pancetta are standard, often replaced with beef bacon or turkey ham), kid-friendly menus, and family sharing platters. Strong sub-categories include croissants, quiches, baguette sandwiches, croque-monsieur, ratatouille, beef bourguignon (halal), crêpes and pastries (éclairs, mille-feuille). Reference brands: Paul, Le Pain Quotidien,  Couqley, Magnolia.",
    platforms: ["talabat", "noon", "careem"],
    kind: "cuisine",
    source: "scraped",
  },
  {
    value: "british",
    label: "British",
    description:
      "British cuisine on UAE delivery platforms covers the full repertoire of fish and chips, full English breakfasts, pies (steak and kidney, chicken and mushroom), Sunday roasts, bangers and mash, and afternoon tea. In Dubai's cloud-kitchen context, British is one of the highest-volume cuisine tags — anchored by fish, bread, potatoes, eggs, bacon, sausage, beans and tea. UAE consumers expect halal-certified meats (chicken substitutes for pork-based salumi like prosciutto and pancetta are standard, often replaced with beef bacon or turkey ham), kid-friendly menus, and family sharing platters. Strong sub-categories include fish and chips, full English breakfasts, pies (steak and kidney, chicken and mushroom), Sunday roasts, bangers and mash, and afternoon tea. Reference brands: London Fish & Chips,  PizzaExpress (British-owned).",
    platforms: ["talabat"],
    kind: "cuisine",
    source: "scraped",
  },
  {
    value: "indian",
    label: "Indian",
    description:
      "Indian cuisine on UAE delivery platforms covers the full repertoire of naan, tandoori, curry, biryani, roti, dal, paneer and naan. In Dubai's cloud-kitchen context, Indian is one of the highest-volume cuisine tags — anchored by rice, lentils, spices, vegetables, meat and fish. UAE consumers expect halal-certified meats (chicken substitutes for pork-based salumi like prosciutto and pancetta are standard, often replaced with beef bacon or turkey ham), kid-friendly menus, and family sharing platters. Strong sub-categories include naan, tandoori, curry, biryani, roti, dal, paneer and naan. Reference brands: Tandoori Grill,  Curry Leaf,  Naan and Curry.",
    platforms: ["talabat", "deliveroo", "noon", "careem", "keeta"],
    kind: "cuisine",
    source: "scraped",
  },
  {
    value: "japanese",
    label: "Japanese",
    description:
      "Japanese cuisine on UAE delivery platforms covers the full repertoire of sushi, ramen, tempura, teppanyaki, yakitori, okonomiyaki and takoyaki. In Dubai's cloud-kitchen context, Japanese is one of the highest-volume cuisine tags — anchored by rice, noodles, vegetables, meat and fish. UAE consumers expect halal-certified meats (chicken substitutes for pork-based salumi like prosciutto and pancetta are standard, often replaced with beef bacon or turkey ham), kid-friendly menus, and family sharing platters. Strong sub-categories include sushi, ramen, tempura, teppanyaki, yakitori, okonomiyaki and takoyaki. Reference brands: Sushi Express,  Ramen Express,  Tempura Express,  Teppanyaki Express,  Yakitori Express,  Okonomiyaki Express,  Takoyaki Express.",
    platforms: ["talabat", "deliveroo", "noon", "careem", "keeta"],
    kind: "cuisine",
    source: "scraped",
  },
  {
    value: "korean",
    label: "Korean",
    description:
      "Korean cuisine on UAE delivery platforms covers the full repertoire of bibimbap, bulgogi, kimchi, bibimbap, bulgogi, kimchi, bibimbap, bulgogi, kimchi, bibimbap, bulgogi, kimchi. In Dubai's cloud-kitchen context, Korean is one of the highest-volume cuisine tags — anchored by rice, noodles, vegetables, meat and fish. UAE consumers expect halal-certified meats (chicken substitutes for pork-based salumi like prosciutto and pancetta are standard, often replaced with beef bacon or turkey ham), kid-friendly menus, and family sharing platters. Strong sub-categories include bibimbap, bulgogi, kimchi, bibimbap, bulgogi, kimchi, bibimbap, bulgogi, kimchi, bibimbap, bulgogi, kimchi. Reference brands: Bibimbap Express,  Bulgogi Express,  Kimchi Express, ",
    platforms: ["talabat", "deliveroo", "noon", "careem", "keeta"],
    kind: "cuisine",
    source: "scraped",
  },
  {
    value: "thai",
    label: "Thai",
    description:
      "Thai cuisine on UAE delivery platforms covers the full repertoire of pad thai, tom yum goong, massaman curry, papaya salad, massaman curry, papaya salad, massaman curry, papaya salad, massaman curry, papaya salad. In Dubai's cloud-kitchen context, Thai is one of the highest-volume cuisine tags — anchored by rice, noodles, vegetables, meat and fish. UAE consumers expect halal-certified meats (chicken substitutes for pork-based salumi like prosciutto and pancetta are standard, often replaced with beef bacon or turkey ham), kid-friendly menus, and family sharing platters. Strong sub-categories include pad thai, tom yum goong, massaman curry, papaya salad, massaman curry, papaya salad, massaman curry, papaya salad, massaman curry, papaya salad. Reference brands: Pad Thai Express,  Tom Yum Goong Express,  Massaman Curry Express,  Papaya Salad Express,  Massaman Curry Express,  Papaya Salad Express,  Massaman Curry Express,  Papaya Salad Express,  Massaman Curry Express,  Papaya Salad Express.",
    platforms: ["talabat", "deliveroo", "noon", "careem", "keeta"],
    kind: "cuisine",
    source: "scraped",
  },
  {
    value: "pakistani",
    label: "Pakistani",
    description:
      "Pakistani cuisine on UAE delivery platforms covers the full repertoire of biryani, naan, curry, roti, dal, paneer and naan. In Dubai's cloud-kitchen context, Pakistani is one of the highest-volume cuisine tags — anchored by rice, lentils, spices, vegetables, meat and fish. UAE consumers expect halal-certified meats (chicken substitutes for pork-based salumi like prosciutto and pancetta are standard, often replaced with beef bacon or turkey ham), kid-friendly menus, and family sharing platters. Strong sub-categories include biryani, naan, curry, roti, dal, paneer and naan. Reference brands: Biryani Express,  Naan Express,  Curry Express,  Roti Express,  Dal Express,  Paneer Express,  Naan Express.",
    platforms: ["talabat", "deliveroo", "noon", "careem", "keeta"],
    kind: "cuisine",
    source: "scraped",
  },
  {
    value: "sriLankan",
    label: "Sri Lankan",
    description:
      "Sri Lankan cuisine on UAE delivery platforms covers the full repertoire of curry, roti, dal, paneer and naan. In Dubai's cloud-kitchen context, Sri Lankan is one of the highest-volume cuisine tags — anchored by rice, lentils, spices, vegetables, meat and fish. UAE consumers expect halal-certified meats (chicken substitutes for pork-based salumi like prosciutto and pancetta are standard, often replaced with beef bacon or turkey ham), kid-friendly menus, and family sharing platters. Strong sub-categories include curry, roti, dal, paneer and naan. Reference brands: Curry Express,  Roti Express,  Dal Express,  Paneer Express,  Naan Express.",
    platforms: ["talabat", "deliveroo", "noon", "careem", "keeta"],
    kind: "cuisine",
    source: "scraped",
  },
  {
    value: "egyptian",
    label: "Egyptian",
    description:
      "Egyptian cuisine on UAE delivery platforms covers the full repertoire of falafel, hummus, baba ghanoush, tabbouleh, fattoush, kibbeh and sambousek. In Dubai's cloud-kitchen context, Egyptian is one of the highest-volume cuisine tags — anchored by rice, lentils, spices, vegetables, meat and fish. UAE consumers expect halal-certified meats (chicken substitutes for pork-based salumi like prosciutto and pancetta are standard, often replaced with beef bacon or turkey ham), kid-friendly menus, and family sharing platters. Strong sub-categories include falafel, hummus, baba ghanoush, tabbouleh, fattoush, kibbeh and sambousek. Reference brands: Falafel Express,  Hummus Express,  Baba Ghanoush Express,  Tabbouleh Express,  Fattoush Express,  Kibbeh Express,  Sambousek Express.",
    platforms: ["talabat", "deliveroo", "noon", "careem", "keeta"],
    kind: "cuisine",
    source: "scraped",
  },
  {
    value: "turkish",
    label: "Turkish",
    description:
      "Turkish cuisine on UAE delivery platforms covers the full repertoire of kebab, baklava, hummus, baba ghanoush, tabbouleh, fattoush, kibbeh and sambousek. In Dubai's cloud-kitchen context, Turkish is one of the highest-volume cuisine tags — anchored by rice, lentils, spices, vegetables, meat and fish. UAE consumers expect halal-certified meats (chicken substitutes for pork-based salumi like prosciutto and pancetta are standard, often replaced with beef bacon or turkey ham), kid-friendly menus, and family sharing platters. Strong sub-categories include kebab, baklava, hum",
    platforms: ["talabat", "deliveroo", "noon", "careem", "keeta"],
    kind: "cuisine",
    source: "scraped",
  },
];

const AGGREGATOR_PLATFORMS = [
  { value: "talabat", label: "Talabat", logo: Talabat_logo },
  { value: "deliveroo", label: "Deliveroo", logo: Deliveroo_logo },
  { value: "noon", label: "Noon", logo: Noon_logo },
  { value: "careem", label: "Careem", logo: Careem_logo },
  { value: "keeta", label: "Keeta", logo: Keeta_logo },
  { value: "restHero", label: "RestHero", logo: Keeta_logo },
];
const CUISINE_TYPES = [
  { value: "cuisine", label: "Cuisine", logo: Cuisine_Logo },
  { value: "category", label: "Category", logo: Category_Logo },
  { value: "dietary", label: "Dietary", logo: Dietary_Logo },
  { value: "mealType", label: "Meal Type", logo: MealType_Logo },
  { value: "dessert", label: "Dessert", logo: Dessert_Logo },
  { value: "beverage", label: "Beverage", logo: Beverage_Logo },
  { value: "other", label: "Other", logo: Other_Logo },
];

const CUISINE_TAG_SOURCE_OPTIONS = [
  { value: "scraped", label: "Scraped" },
  { value: "KAM", label: "KAM" },
  { value: "manual", label: "Manual" },
  { value: "other", label: "Other" },
];

export {
  SAMPLE_CUISINE_TAGS,
  AGGREGATOR_PLATFORMS,
  CUISINE_TYPES,
  CUISINE_TAG_SOURCE_OPTIONS,
};

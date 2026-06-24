import {
  ArmenianFlag,
  RussianFlag,
  BritishFlag,
  ArabicFlag,
} from "../../00_assets/_assets.index.js";

const COUNTRY_CODES = [
  {
    code: "+971",
    flag: ArabicFlag,
    name: "United Arab Emirates",
  },
  {
    code: "+966",
    flag: ArabicFlag,
    name: "Saudi Arabia",
  },
  {
    code: "+374",
    flag: ArmenianFlag,
    name: "Armenia",
  },
  {
    code: "+7",
    flag: RussianFlag,
    name: "Russia",
  },
  {
    code: "+44",
    flag: BritishFlag,
    name: "United Kingdom",
  },
];

const DEFAULT_COUNTRY_CODE = "+971";

export { COUNTRY_CODES, DEFAULT_COUNTRY_CODE };

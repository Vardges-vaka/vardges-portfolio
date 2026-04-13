const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const branches = ["arjan", "bb_sol", "bb_cuisinette", "marina", "dso"];

const partnerList = [
  "deliveroo",
  "talabat",
  "careem",
  "noon",
  "keeta",
  "restHero",
  "btt",
  "callCenter",
];

const contributionTypes = ["forBrand", "forBranch", "forPartner", "forDay"];

const brands = ["vkusno", "blin_i", "kompot"];

const varTypes = [
  "thisMonth_dailyAVR", // average of current month's daily
  "prevMonth_dailyAVR", // average of previous month's daily
  "thisMonth_daily", // with previous day
  "prevMonth_date", // previous month's same date
  "thisMonth_weekDayAVR", // average of current month's week day
  "prevMonth_weekDayAVR", // average of previous month's weekly
  "thisMonth_weekDay", // with previous week day
  "prevMonth_weekDay", // previous month's same week day
];

const PARTNERSHIP_STATUS = ["active", "inactive", "suspended", "terminated"];

const INTEGRATION_PARTNERS = ["grabTech", "urbanPiper", "NONE"];
const INVENTORY_PARTNERS = ["supy", "sapaad"];

export {
  weekDays,
  months,
  branches,
  partnerList,
  brands,
  contributionTypes,
  varTypes,
  PARTNERSHIP_STATUS,
  INTEGRATION_PARTNERS,
  INVENTORY_PARTNERS,
};

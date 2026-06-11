// Marketing-group schema constants — AdSpend, Campaign.

const AD_KINDS = ["cpc", "banner", "other"];
const AD_SOURCES = ["platform-report", "manual", "scraped"];

const AD_BASES = [
  "fixed",
  "percent-of-net-sales",
  "per-click",
  "per-impression",
  "per-order",
  "negotiated",
];

const CAMPAIGN_KINDS = [
  "percentage", // 50% off, optionally capped
  "fixed-amount", // 10 AED off
  "free-delivery",
  "bogo", // buy-one-get-one
  "bundle", // combo deal
  "voucher", // code-based
  "commission-uplift",
  "other",
];

const CAMPAIGN_STATUSES = ["draft", "active", "paused", "ended"];
const CAMPAIGN_SOURCES = ["platform-defined", "self-opted", "manual"];

const VALUE_TYPES = [
  "percentage",
  "fixed-amount",
  "free-item",
  "free-delivery",
];

export {
  AD_KINDS,
  AD_SOURCES,
  AD_BASES,
  CAMPAIGN_KINDS,
  CAMPAIGN_STATUSES,
  CAMPAIGN_SOURCES,
  VALUE_TYPES,
};

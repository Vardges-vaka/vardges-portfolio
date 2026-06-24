// Select option-lists used by the hand-written create forms (add_initial).
// The forms themselves live in 01_cK_setup_comps/cK_setup_session_<sess>/.
import {
  Budget_Icon,
  Medium_Icon,
  Premium_Icon,
} from "../../../../../../01_components/_components.index.js";

export const PRICE_RANGE_OPTIONS = () => {
  return [
    {
      value: "budget",
      label: "Budget",
      leftIcon: { type: "svg", svg_src: Budget_Icon() },
    },
    {
      value: "mid",
      label: "Mid",
      leftIcon: { type: "svg", svg_src: Medium_Icon() },
    },
    {
      value: "premium",
      label: "Premium",
      leftIcon: { type: "svg", svg_src: Premium_Icon() },
    },
  ];
};
// leftIcon: { type: "svg", svg_src: Competitors_Icon() },
export const CONTRACT_KIND_OPTIONS = [
  { value: "aggregator", label: "Aggregator" },
  { value: "integration", label: "Integration" },
  { value: "lease", label: "Lease" },
  { value: "utility", label: "Utility" },
  { value: "employment", label: "Employment" },
  { value: "service", label: "Service" },
  { value: "advertising", label: "Advertising" },
  { value: "supplier", label: "Supplier" },
  { value: "insurance", label: "Insurance" },
  { value: "warranty", label: "Warranty" },
  { value: "nda", label: "NDA" },
  { value: "other", label: "Other" },
];

export const CONTRACT_OWNER_TYPE_OPTIONS = [
  { value: "Brand", label: "Brand" },
  { value: "Branch", label: "Branch" },
  { value: "Employee", label: "Employee" },
  { value: "Equipment", label: "Equipment" },
  { value: "Integration", label: "Integration" },
  { value: "SalesChannel", label: "Sales Channel" },
  { value: "Menu", label: "Menu" },
  { value: "Other", label: "Other" },
];

const formatEnumLabel = (value = "") =>
  String(value)
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const toEnumOptions = (values = []) =>
  values.map((value) => ({ value, label: formatEnumLabel(value) }));

export const INTEGRATION_KIND_OPTIONS = toEnumOptions([
  "inventory",
  "sales-manager",
  "other",
]);

export const INTEGRATION_STATUS_OPTIONS = toEnumOptions([
  "onboarding",
  "active",
  "paused",
  "terminated",
]);

export const INTEGRATION_PAYMENT_CYCLE_OPTIONS = toEnumOptions([
  "one-time",
  "monthly",
  "yearly",
  "other",
]);

export const INTEGRATION_PAYMENT_STATUS_OPTIONS = toEnumOptions([
  "paid",
  "due",
  "overdue",
]);

export const INTEGRATION_PAYMENT_METHOD_OPTIONS = toEnumOptions([
  "bank-transfer",
  "card",
  "cash",
  "cheque",
  "other",
]);

export const INTEGRATION_MAINTENANCE_STATUS_OPTIONS = toEnumOptions([
  "upcoming",
  "in-progress",
  "completed",
]);

export const INTEGRATION_LOGIN_TYPE_OPTIONS = toEnumOptions(["email", "phone"]);

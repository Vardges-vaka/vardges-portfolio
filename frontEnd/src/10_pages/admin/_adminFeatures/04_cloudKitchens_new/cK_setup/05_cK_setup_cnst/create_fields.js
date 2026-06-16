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

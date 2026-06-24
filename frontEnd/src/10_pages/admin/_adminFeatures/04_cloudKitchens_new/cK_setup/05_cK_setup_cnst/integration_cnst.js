import {
  CK_other_icon,
  Payment_statuses_paid,
  Payment_statuses_due,
  Payment_statuses_overdue,
  Payment_methods_cheque,
  Payment_methods_cash,
  Payment_methods_card,
  Payment_methods_bank_transfer,
  Maintenance_statuses_in_progress,
  Maintenance_statuses_completed,
  Maintenance_statuses_upcoming,
  Integration_statuses_active,
  Integration_statuses_paused,
  Integration_statuses_terminated,
  Integration_statuses_onboarding,
  Integration_kind_sales,
  Integration_kind_inventory,
} from "../../../../../../01_components/_components.index.js";

const INTEGRATION_KINDS = () => {
  return [
    {
      value: "inventory",
      label: "Inventory",
      leftIcon: { type: "svg", svg_src: Integration_kind_inventory() },
    },
    {
      value: "sales-manager",
      label: "Sales Manager",
      leftIcon: { type: "svg", svg_src: Integration_kind_sales() },
    },
    {
      value: "other",
      label: "Other",
      leftIcon: { type: "svg", svg_src: CK_other_icon() },
    },
  ];
};

const INTEGRATION_STATUSES = () => {
  return [
    {
      value: "onboarding",
      label: "Onboarding",
      leftIcon: { type: "svg", svg_src: Integration_statuses_onboarding() },
    },
    {
      value: "active",
      label: "Active",
      leftIcon: { type: "svg", svg_src: Integration_statuses_active() },
    },
    {
      value: "paused",
      label: "Paused",
      leftIcon: { type: "svg", svg_src: Integration_statuses_paused() },
    },
    {
      value: "terminated",
      label: "Terminated",
      leftIcon: { type: "svg", svg_src: Integration_statuses_terminated() },
    },
  ];
};

const MAINTENANCE_STATUSES = [
  {
    value: "upcoming",
    label: "Upcoming",
    icon: Maintenance_statuses_upcoming,
  },
  {
    value: "in-progress",
    label: "In Progress",
    icon: Maintenance_statuses_in_progress,
  },
  {
    value: "completed",
    label: "Completed",
    icon: Maintenance_statuses_completed,
  },
];

const PAYMENT_CYCLES = ["one-time", "monthly", "yearly", "other"];
const PAYMENT_STATUSES = () => {
  return [
    {
      value: "paid",
      label: "Paid",
      leftIcon: { type: "svg", svg_src: Payment_statuses_paid() },
    },
    {
      value: "due",
      label: "Due",
      leftIcon: { type: "svg", svg_src: Payment_statuses_due() },
    },
    {
      value: "overdue",
      label: "Overdue",
      leftIcon: { type: "svg", svg_src: Payment_statuses_overdue() },
    },
  ];
};
const PAYMENT_METHODS = () => {
  return [
    {
      value: "bank-transfer",
      label: "Bank Transfer",
      leftIcon: { type: "svg", svg_src: Payment_methods_bank_transfer() },
    },
    {
      value: "card",
      label: "Card",
      leftIcon: { type: "svg", svg_src: Payment_methods_card() },
    },
    {
      value: "cash",
      label: "Cash",
      leftIcon: { type: "svg", svg_src: Payment_methods_cash() },
    },
    {
      value: "cheque",
      label: "Cheque",
      leftIcon: { type: "svg", svg_src: Payment_methods_cheque() },
    },
    {
      value: "other",
      label: "Other",
      leftIcon: { type: "svg", svg_src: CK_other_icon() },
    },
  ];
};
const LOGIN_TYPES = ["email", "phone"];

export {
  INTEGRATION_KINDS,
  INTEGRATION_STATUSES,
  MAINTENANCE_STATUSES,
  PAYMENT_CYCLES,
  PAYMENT_STATUSES,
  PAYMENT_METHODS,
  LOGIN_TYPES,
};

/*
const INTEGRATION_KINDS = ["inventory", "sales-manager", "other"];
const INTEGRATION_STATUSES = ["onboarding", "active", "paused", "terminated"];
const MAINTENANCE_STATUSES = ["upcoming", "in-progress", "completed"];

const PAYMENT_CYCLES = ["one-time", "monthly", "yearly", "other"];
const PAYMENT_STATUSES = ["paid", "due", "overdue"];
const PAYMENT_METHODS = ["bank-transfer", "card", "cash", "cheque", "other"];

const LOGIN_TYPES = ["email", "phone"];


*/

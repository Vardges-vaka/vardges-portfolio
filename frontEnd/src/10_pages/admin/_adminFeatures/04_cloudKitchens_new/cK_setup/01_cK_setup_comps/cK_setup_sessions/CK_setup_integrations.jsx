import { CK_setup_empty_integrations } from "../cK_setup_states/_cK_setup_states.index";
import {
  CK_setup_integrations_addForm,
  CK_setup_integrations_viewOne,
  CK_setup_integrations_viewAll,
} from "../cK_setup_session_integrations/_cK_setup_session_integrations.index";
import CK_setup_entity_unsavedModal from "../cK_setup_shared/CK_setup_entity_unsavedModal.jsx";
import "../../_styles/cK_setup_session_integrations/cK_setup_integrations.css";

const CK_setup_integrations = ({ states, handlers, childProps, t }) => {
  const {
    stp_integrations_addForm_props,
    stp_empty_integrations_props,
    stp_integrations_viewOne_props,
    stp_integrations_viewAll_props,
    stp_integrations_modals_props,
  } = childProps;

  return (
    <div className="cK_setup_integrations">
      {states.activeOperation === "adding" && (
        <CK_setup_integrations_addForm
          states={stp_integrations_addForm_props.states}
          handlers={stp_integrations_addForm_props.handlers}
          childProps={stp_integrations_addForm_props.childComps}
          t={stp_integrations_addForm_props.t}
        />
      )}
      {states.activeOperation === "viewing" &&
        (states.integrations.length === 0 ? (
          <CK_setup_empty_integrations
            states={stp_empty_integrations_props.states}
            handlers={stp_empty_integrations_props.handlers}
            childProps={stp_empty_integrations_props.childComps}
            t={stp_empty_integrations_props.t}
          />
        ) : states.activeViewingType === "one" ? (
          <CK_setup_integrations_viewOne
            states={stp_integrations_viewOne_props.states}
            handlers={stp_integrations_viewOne_props.handlers}
            t={stp_integrations_viewOne_props.t}
          />
        ) : (
          <CK_setup_integrations_viewAll
            states={stp_integrations_viewAll_props.states}
            handlers={stp_integrations_viewAll_props.handlers}
            t={stp_integrations_viewAll_props.t}
          />
        ))}

      <CK_setup_entity_unsavedModal
        states={stp_integrations_modals_props.states}
        handlers={stp_integrations_modals_props.handlers}
      />
    </div>
  );
};

export default CK_setup_integrations;

const integrationSchema = {
  // ── Identity ─────────────────────────────────────────────
  provider: "", // "Supy", "Sapaad", "GrabTech"
  kind: "", //enum: INTEGRATION_KINDS
  accountLabel: "", // "Supy — Vkusno entity"
  description: "",
  notes: "",

  // ── Lifecycle ────────────────────────────────INTEGRATION_STATUSES────────────
  status: "onboarding", //enum: INTEGRATION_STATUSES
  lifecycle: {
    startAt: "",
    restartedAt: "",
    endAt: "",
  },

  // ── Links ────────────────────────────────────────────────
  links: {
    websiteUrl: "",
    portalUrl: "",
    other: [{ label: "", url: "" }],
  },

  // ── Payment (what YOU pay the vendor) ───────────────PAYMENT_CYCLES─────PAYMENT_METHODS - PAYMENT_STATUSES
  payment: {
    cycle: "",
    amount: 0,
    currency: "AED",
    method: "",
    status: "",
    lastPaidOn: "",
    nextDueOn: "",
    notes: "",
  },

  // ── Credentials (Tier 3 — select: false inside helper) ───
  loginCredentials: [
    {
      label: "", // "Vardges main", "Cashier — Arjan"
      username: "",
      password: "",
      email: "",
      phone: "",
      loginType: "", //enum: ["email", "phone"]
      belongsTo: {
        name: "",
        employee: "",
      },
      accessSites: [
        {
          brands: [""],
          branches: [""],
        },
      ],
      requiresOtp: false,
      notes: "",
    },
  ],

  // ── Contacts ─────────────────────────────────────────────
  kam: {
    name: "",
    email: "",
    phone: "",
    whatsApp: "",
    hours: "",
    telegram: "",
    notes: "",
  },
  support: [
    {
      label: "", // "general", "billing", "technical"
      email: "",
      phone: "",
      whatsApp: "",
      hours: "",
    },
  ],

  // ── Maintenance windows ────────────────────────────────── enum: MAINTENANCE_STATUSES
  scheduledMaintenances: [
    {
      status: "",
      startsAt: "",
      endsAt: "",
      notes: "",
    },
  ],

  // ── Relationships ────────────────────────────────────────
  brands: [""],
  branches: [""],
  contract: "",

  // ── Files + notes ────────────────────────CLOUD_STORAGE_PROVIDERS────────────────
  // files: getStorageSchema(),
  files: {
    cloudStorage: {
      isDefault: true,
      value: "",
    },
    items: [
      {
        url: "",
        format: "",
        sizeIn_KB: 0,
        description: {
          value: "",
          short: "",
          long: "",
        },
        notes: "",
        ref: "",
        title: "",
        usedIn: "",
        createdBy: "",
        updatedBy: "",
        deletedBy: "",
        deletedAt: "",
        isDeleted: true,
        deletedReason: "",
        isActive: true,
      },
    ],
  },
  createdBy: "",
  updatedBy: "",
  deletedBy: "",
  deletedAt: "",
  isDeleted: false,
  deletedReason: "",
  isActive: true,
};

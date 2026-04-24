// Empty/default shapes + hydration helpers for Branch forms.
//
// The SHAPE mirrors the Mongoose Branch schema EXCEPT for fields handled by
// separate flows: `images`, `coverageAreas`, `contract.file`, `employees`,
// `equipments`, `brands`. Those are intentionally omitted so the detail-edit
// flow never accidentally overwrites them with undefined.

export const EMPTY_VARIABLE_COST_ROW = {
  label: "",
  amount: "",
  date: "",
  notes: "",
};

export const EMPTY_BRANCH_FORM = {
  name: "",
  location: {
    address: "",
    coordinates: { lat: "", lng: "" },
  },
  contact: {
    ourSupport: { phone: "", whatsApp: "", telegram: "", email: "" },
    manager: {
      name: "",
      phone: "",
      whatsApp: "",
      telegram: "",
      email: "",
    },
  },
  operations: {
    isActive: true,
    is24Hours: false,
    openingTime: "",
    closingTime: "",
    openSince: "",
    closedSince: "",
  },
  costs: {
    currency: "AED",
    fixed: {
      rent: "",
      utilities: { electricity: "", water: "", gas: "", AC: "" },
    },
    monthlyServices: {
      cleaning: "",
      sewage: "",
      pestControl: "",
      serviceFees: "",
      extraStorage: "",
    },
    variable: [],
  },
  contract: {
    duration: { start: "", end: "" },
    amount: "",
    terminationNoticePeriod: "",
  },
  notes: "",
};

// Converts an ISO datetime to the "YYYY-MM-DD" format expected by <input type="date">.
// Returns an empty string for null/undefined/"" so controlled inputs stay valid.
const toDateInput = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
};

// Deep-merges a branch document over EMPTY_BRANCH_FORM so every path we render
// has a defined value (prevents React's "uncontrolled → controlled" warning).
// Dates are normalized for <input type="date"> consumption.
export const hydrateBranchForm = (branch) => {
  if (!branch) return EMPTY_BRANCH_FORM;

  const variable = Array.isArray(branch?.costs?.variable)
    ? branch.costs.variable.map((row) => ({
        label: row?.label ?? "",
        amount: row?.amount ?? "",
        date: toDateInput(row?.date),
        notes: row?.notes ?? "",
      }))
    : [];

  return {
    name: branch.name ?? "",
    location: {
      address: branch?.location?.address ?? "",
      coordinates: {
        lat: branch?.location?.coordinates?.lat ?? "",
        lng: branch?.location?.coordinates?.lng ?? "",
      },
    },
    contact: {
      ourSupport: {
        phone: branch?.contact?.ourSupport?.phone ?? "",
        whatsApp: branch?.contact?.ourSupport?.whatsApp ?? "",
        telegram: branch?.contact?.ourSupport?.telegram ?? "",
        email: branch?.contact?.ourSupport?.email ?? "",
      },
      manager: {
        name: branch?.contact?.manager?.name ?? "",
        phone: branch?.contact?.manager?.phone ?? "",
        whatsApp: branch?.contact?.manager?.whatsApp ?? "",
        telegram: branch?.contact?.manager?.telegram ?? "",
        email: branch?.contact?.manager?.email ?? "",
      },
    },
    operations: {
      isActive: branch?.operations?.isActive ?? true,
      is24Hours: branch?.operations?.is24Hours ?? false,
      openingTime: branch?.operations?.openingTime ?? "",
      closingTime: branch?.operations?.closingTime ?? "",
      openSince: toDateInput(branch?.operations?.openSince),
      closedSince: toDateInput(branch?.operations?.closedSince),
    },
    costs: {
      currency: branch?.costs?.currency ?? "AED",
      fixed: {
        rent: branch?.costs?.fixed?.rent ?? "",
        utilities: {
          electricity: branch?.costs?.fixed?.utilities?.electricity ?? "",
          water: branch?.costs?.fixed?.utilities?.water ?? "",
          gas: branch?.costs?.fixed?.utilities?.gas ?? "",
          AC: branch?.costs?.fixed?.utilities?.AC ?? "",
        },
      },
      monthlyServices: {
        cleaning: branch?.costs?.monthlyServices?.cleaning ?? "",
        sewage: branch?.costs?.monthlyServices?.sewage ?? "",
        pestControl: branch?.costs?.monthlyServices?.pestControl ?? "",
        serviceFees: branch?.costs?.monthlyServices?.serviceFees ?? "",
        extraStorage: branch?.costs?.monthlyServices?.extraStorage ?? "",
      },
      variable,
    },
    contract: {
      duration: {
        start: toDateInput(branch?.contract?.duration?.start),
        end: toDateInput(branch?.contract?.duration?.end),
      },
      amount: branch?.contract?.amount ?? "",
      terminationNoticePeriod:
        branch?.contract?.terminationNoticePeriod ?? "",
    },
    notes: branch?.notes ?? "",
  };
};

// Returns the specific section slice from a hydrated form. Keeps handlers DRY.
export const pickSectionDraft = (hydrated, sectionKey) => {
  if (sectionKey === "basic") return { name: hydrated.name };
  if (sectionKey === "notes") return { notes: hydrated.notes };
  return hydrated[sectionKey];
};

// Returns { basic, location, contact, operations, costs, contract, notes }
// for the bulk-edit flow. Each entry is the same shape pickSectionDraft returns.
export const pickAllSectionsDraft = (hydrated) => ({
  basic: { name: hydrated.name },
  location: hydrated.location,
  contact: hydrated.contact,
  operations: hydrated.operations,
  costs: hydrated.costs,
  contract: hydrated.contract,
  notes: { notes: hydrated.notes },
});

// Walks an object tree, returns true only if EVERY leaf is empty. Used by
// section headers to swap "Edit" for "Add" when no user data exists.
const isDeeplyEmpty = (value) => {
  if (value === undefined || value === null || value === "") return true;
  if (typeof value === "boolean") return false; // explicit boolean counts as set
  if (typeof value === "number") return !Number.isFinite(value);
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") {
    return Object.values(value).every(isDeeplyEmpty);
  }
  return false;
};

export const isSectionEmpty = (branch, sectionKey) => {
  if (!branch) return true;
  if (sectionKey === "basic") return !branch.name;
  if (sectionKey === "notes") return !branch.notes;
  return isDeeplyEmpty(branch?.[sectionKey]);
};

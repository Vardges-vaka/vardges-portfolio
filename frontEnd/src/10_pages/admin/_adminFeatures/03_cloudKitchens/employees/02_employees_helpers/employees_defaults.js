export const EMPTY_LEAVE_PERIOD_ROW = { from: "", to: "" };
export const EMPTY_CERT_ROW = {
  name: "",
  issuer: "",
  issuedDate: "",
  expDate: "",
  notes: "",
};
export const EMPTY_UNIFORM_ISSUE_ROW = { item: "", date: "", notes: "" };
export const EMPTY_LEGAL_DOC = { status: "", expDate: "", notes: "", file: "" };
export const EMPTY_VISA = {
  status: "",
  expDate: "",
  whatCompanyIsUnder: "",
  notes: "",
  file: "",
};

export const EMPTY_EMPLOYEE_FORM = {
  firstName: "",
  lastName: "",
  legalFullName: "",
  dateOfBirth: "",
  joiningDate: "",
  salary: { basic: "", allowances: "", currency: "AED" },
  annualLeaves: { remaining: "", used: { qnt: "", dates: [] } },
  publicHolidaysBalance: "",
  contact: { phone: "", whatsApp: "", telegram: "", email: "" },
  legal: {
    visa: { ...EMPTY_VISA },
    emiratesId: { ...EMPTY_LEGAL_DOC },
    medical: { ...EMPTY_LEGAL_DOC },
    hygieneCert: { ...EMPTY_LEGAL_DOC },
    healthCard: { ...EMPTY_LEGAL_DOC },
  },
  certifications: [],
  workingBranch: "",
  associatedBrands: [],
  isActive: true,
  isResigned: false,
  isTerminated: false,
  terminationReason: "",
  uniform: { sizes: { top: "", bottom: "", shoes: "" }, issued: [] },
};

const dateInput = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
};

const idOf = (value) => {
  if (!value) return "";
  return typeof value === "object" ? value._id ?? "" : value;
};

const hydrateLegalDoc = (doc, visa = false) => ({
  ...(visa ? EMPTY_VISA : EMPTY_LEGAL_DOC),
  status: doc?.status ?? "",
  expDate: dateInput(doc?.expDate),
  whatCompanyIsUnder: visa ? doc?.whatCompanyIsUnder ?? "" : undefined,
  notes: doc?.notes ?? "",
  file: doc?.file ?? "",
});

export const hydrateEmployeeForm = (employee) => {
  if (!employee) return EMPTY_EMPLOYEE_FORM;
  return {
    firstName: employee.firstName ?? "",
    lastName: employee.lastName ?? "",
    legalFullName: employee.legalFullName ?? "",
    dateOfBirth: dateInput(employee.dateOfBirth),
    joiningDate: dateInput(employee.joiningDate),
    salary: {
      basic: employee?.salary?.basic ?? "",
      allowances: employee?.salary?.allowances ?? "",
      currency: employee?.salary?.currency ?? "AED",
    },
    annualLeaves: {
      remaining: employee?.annualLeaves?.remaining ?? "",
      used: {
        qnt: employee?.annualLeaves?.used?.qnt ?? "",
        dates: Array.isArray(employee?.annualLeaves?.used?.dates)
          ? employee.annualLeaves.used.dates.map((row) => ({
              from: dateInput(row?.from),
              to: dateInput(row?.to),
            }))
          : [],
      },
    },
    publicHolidaysBalance: employee?.publicHolidaysBalance ?? "",
    contact: {
      phone: employee?.contact?.phone ?? "",
      whatsApp: employee?.contact?.whatsApp ?? "",
      telegram: employee?.contact?.telegram ?? "",
      email: employee?.contact?.email ?? "",
    },
    legal: {
      visa: hydrateLegalDoc(employee?.legal?.visa, true),
      emiratesId: hydrateLegalDoc(employee?.legal?.emiratesId),
      medical: hydrateLegalDoc(employee?.legal?.medical),
      hygieneCert: hydrateLegalDoc(employee?.legal?.hygieneCert),
      healthCard: hydrateLegalDoc(employee?.legal?.healthCard),
    },
    certifications: Array.isArray(employee?.certifications)
      ? employee.certifications.map((row) => ({
          name: row?.name ?? "",
          issuer: row?.issuer ?? "",
          issuedDate: dateInput(row?.issuedDate),
          expDate: dateInput(row?.expDate),
          notes: row?.notes ?? "",
          file: row?.file ?? "",
        }))
      : [],
    workingBranch: idOf(employee?.workingBranch),
    associatedBrands: Array.isArray(employee?.associatedBrands)
      ? employee.associatedBrands.map(idOf).filter(Boolean)
      : [],
    isActive: employee?.isActive ?? true,
    isResigned: employee?.isResigned ?? false,
    isTerminated: employee?.isTerminated ?? false,
    terminationReason: employee?.terminationReason ?? "",
    uniform: {
      sizes: {
        top: employee?.uniform?.sizes?.top ?? "",
        bottom: employee?.uniform?.sizes?.bottom ?? "",
        shoes: employee?.uniform?.sizes?.shoes ?? "",
      },
      issued: Array.isArray(employee?.uniform?.issued)
        ? employee.uniform.issued.map((row) => ({
            item: row?.item ?? "",
            date: dateInput(row?.date),
            notes: row?.notes ?? "",
          }))
        : [],
    },
  };
};

export const pickSectionDraft = (hydrated, sectionKey) => {
  if (sectionKey === "basic") {
    return {
      firstName: hydrated.firstName,
      lastName: hydrated.lastName,
      legalFullName: hydrated.legalFullName,
      dateOfBirth: hydrated.dateOfBirth,
      joiningDate: hydrated.joiningDate,
    };
  }
  if (sectionKey === "status") {
    return {
      isActive: hydrated.isActive,
      isResigned: hydrated.isResigned,
      isTerminated: hydrated.isTerminated,
      terminationReason: hydrated.terminationReason,
    };
  }
  if (sectionKey === "assignment") {
    return {
      workingBranch: hydrated.workingBranch,
      associatedBrands: hydrated.associatedBrands,
    };
  }
  if (sectionKey === "leaves") {
    return {
      annualLeaves: hydrated.annualLeaves,
      publicHolidaysBalance: hydrated.publicHolidaysBalance,
    };
  }
  return hydrated[sectionKey];
};

export const pickAllSectionsDraft = (hydrated) => ({
  basic: pickSectionDraft(hydrated, "basic"),
  status: pickSectionDraft(hydrated, "status"),
  contact: hydrated.contact,
  assignment: pickSectionDraft(hydrated, "assignment"),
  salary: hydrated.salary,
  leaves: pickSectionDraft(hydrated, "leaves"),
  legal: hydrated.legal,
  certifications: hydrated.certifications,
  uniform: hydrated.uniform,
});

const isEmptyDeep = (value) => {
  if (value === undefined || value === null || value === "") return true;
  if (typeof value === "boolean") return false;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.values(value).every(isEmptyDeep);
  return false;
};

export const isSectionEmpty = (employee, sectionKey) => {
  if (!employee) return true;
  const hydrated = hydrateEmployeeForm(employee);
  return isEmptyDeep(pickSectionDraft(hydrated, sectionKey));
};

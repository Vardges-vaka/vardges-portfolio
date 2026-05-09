import mongoose from "mongoose";

const localizedFieldSchema = (required = false) =>
  new mongoose.Schema(
    {
      value: { type: String, required },
      translations: {
        ar: { type: String },
        en: { type: String },
        ru: { type: String },
      },
    },
    { _id: false },
  );

const fileRefSchema = new mongoose.Schema(
  {
    ref: { type: String },
    value: { type: String },
  },
  { _id: false },
);

const brandLogosSchema = new mongoose.Schema(
  {
    highRes: { type: String },
    svg: { type: String },
    png: { type: String },
    jpg: { type: String },
    pdf: { type: String },
    ico: { type: String },
  },
  { _id: false },
);

const brandBrandingFilesSchema = new mongoose.Schema(
  {
    brandBook: { type: String },
    brandOverview: { type: String },
    packaging: [fileRefSchema],
  },

  { _id: false },
);

const contractSchema = new mongoose.Schema(
  {
    with: { type: String },
    label: { type: String },
    description: { type: String },
    fileUrl: { type: String },
    started: { type: Date },
    fileFormat: { type: String },
    ending: { type: Date },
    isEnded: { type: Boolean },
    isTerminated: { type: Boolean },
    noticePeriodInDays: { type: Number },
  },
  { _id: true },
);

const legalFilesSchema = new mongoose.Schema(
  {
    vatCertificate: { type: String },
    tradeLicense: { type: String },
    tradeMark: { type: String },
  },
  { _id: false },
);

const officeFilesSchema = new mongoose.Schema(
  {
    pdf: { type: String },
    excel: { type: String },
    word: { type: String },
  },
  { _id: false },
);

const logoMetaItemSchema = new mongoose.Schema(
  { size: { type: Number }, mimeType: { type: String }, ext: { type: String } },
  { _id: false },
);

const brandFilesSchema = new mongoose.Schema(
  {
    logos: brandLogosSchema,
    logosMeta: {
      highRes: logoMetaItemSchema,
      svg: logoMetaItemSchema,
      png: logoMetaItemSchema,
      jpg: logoMetaItemSchema,
      pdf: logoMetaItemSchema,
      ico: logoMetaItemSchema,
    },
    logosProvider: { type: String },
    branding: brandBrandingFilesSchema,
    contracts: [contractSchema],
    legal: legalFilesSchema,
    menus: officeFilesSchema,
    recipe: officeFilesSchema,
    miscellaneous: [fileRefSchema],
  },
  { _id: false },
);

const socialAccountSchema = new mongoose.Schema(
  {
    isActive: { type: Boolean, default: true },
    link: { type: String },
    consoleLink: { type: String },
  },
  { _id: false },
);

const websiteEmailSchema = new mongoose.Schema(
  {
    name: { type: String },
    position: { type: String },
    email: { type: String },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  },
  { _id: true },
);

const dnsRecordSchema = new mongoose.Schema(
  {
    type: { type: String },
    name: { type: String },
    value: { type: String },
    ttl: { type: Number },
  },
  { _id: true },
);

const renewalHistorySchema = new mongoose.Schema(
  {
    renewedOn: { type: Date },
    amount: { type: Number },
    currency: { type: String },
    card: {
      brand: { type: String },
      last4: { type: String },
      cardholder: { type: String },
    },
    transactionId: { type: String },
  },
  { _id: true },
);

const websiteSchema = new mongoose.Schema(
  {
    isActive: { type: Boolean },
    link: { type: String },
    consoleLink: { type: String },
    domain: { type: String },
    registrar: { type: String },
    whois: { type: String },
    nameServers: [{ type: String }],
    emails: [websiteEmailSchema],
    dnsRecords: [dnsRecordSchema],
    status: { type: String },
    expiresOn: { type: Date },
    lastRenewedOn: { type: Date },
    autoRenew: { type: Boolean },
    renewalHistory: [renewalHistorySchema],
    dnsStatus: { type: String },
    notes: { type: String },
  },
  { _id: false },
);

const otherSocialSchema = new mongoose.Schema(
  {
    name: { type: String },
    link: { type: String },
    isActive: { type: Boolean },
    notes: { type: String },
  },
  { _id: true },
);

const paymentSchema = new mongoose.Schema(
  {
    cycle: { type: String },
    method: { type: String },
    amount: { type: Number },
    currency: { type: String },
  },
  { _id: false },
);

const credentialsSchema = new mongoose.Schema(
  {
    apiKey: { type: String },
    secret: { type: String },
    accountId: { type: String },
  },
  { _id: false },
);

const mainContactsSchema = new mongoose.Schema(
  {
    telegram: { type: String },
    whatsApp: { type: String },
    phone: { type: String },
    email: { type: String },
  },
  { _id: false },
);

const registeredPhoneSchema = new mongoose.Schema(
  {
    branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
    phone: { type: String },
    isActive: { type: Boolean },
    isWhatsAppRegistered: { type: Boolean },
    isTelegramRegistered: { type: Boolean },
    purpose: { type: String },
    notes: { type: String },
    registeredAt: { type: Date },
  },
  { _id: true },
);

const loginCredentialSchema = new mongoose.Schema(
  {
    belongTo: {
      name: { type: String },
      employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    },
    username: { type: String },
    password: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    type: { type: String },
    doesOtpRequired: { type: Boolean },
  },
  { _id: true },
);

const integrationAccountSchema = (subdocumentId = false) =>
  new mongoose.Schema(
    {
      provider: { type: String },
      startedAt: { type: Date },
      isActive: { type: Boolean },
      notes: { type: String },
      payment: paymentSchema,
      credentials: credentialsSchema,
      mainContacts: mainContactsSchema,
      registeredPhones: [registeredPhoneSchema],
      loginCredentials: [loginCredentialSchema],
    },
    { _id: subdocumentId },
  );

const registeredInSchema = new mongoose.Schema(
  {
    country: { type: String },
    city: { type: String },
    emirate: { type: String },
    hasTradeLicense: { type: Boolean },
    hasVATCertificate: { type: Boolean },
    hasTradeMark: { type: Boolean },
    dateOfRegistration: { type: Date },
  },
  { _id: false },
);

const brandSchema = new mongoose.Schema(
  {
    name: localizedFieldSchema(true),
    tagline: localizedFieldSchema(false),
    files: brandFilesSchema,
    socials: {
      instagram: socialAccountSchema,
      facebook: socialAccountSchema,
      tikTok: socialAccountSchema,
      linkedIn: socialAccountSchema,
      youtube: socialAccountSchema,
      twitter: socialAccountSchema,
      website: websiteSchema,
      others: [otherSocialSchema],
    },
    inventoryIntegrations: [integrationAccountSchema(true)],
    salesIntegration: integrationAccountSchema(false),
    legal: {
      registeredIn: registeredInSchema,
    },
    isActive: { type: Boolean, default: true },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
    equipments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Equipment" }],
    branches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Branch" }],
    menu: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
    competitors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Competitor" }],
  },
  { timestamps: true },
);

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;

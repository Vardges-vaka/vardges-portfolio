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

const fileRefSchema = () => {
  return new mongoose.Schema(
    {
      ref: { type: String },
      value: { type: String },
    },
    { _id: false },
  );
};

const brandLogosSchema = () => {
  return new mongoose.Schema(
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
};

const brandBrandingFilesSchema = () => {
  return new mongoose.Schema(
    {
      brandBook: { type: String },
      brandOverview: { type: String },
      packaging: [fileRefSchema],
    },
    { _id: false },
  );
};

const contractSchema = () => {
  return new mongoose.Schema(
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
};

const legalFilesSchema = () => {
  return new mongoose.Schema(
    {
      vatCertificate: { type: String },
      tradeLicense: { type: String },
      tradeMark: { type: String },
    },
    { _id: false },
  );
};

const officeFilesSchema = () => {
  return new mongoose.Schema(
    {
      pdf: { type: String },
      excel: { type: String },
      word: { type: String },
    },
    { _id: false },
  );
};

const logoMetaItemSchema = () => {
  return new mongoose.Schema(
    {
      size: { type: Number },
      mimeType: { type: String },
      ext: { type: String },
    },
    { _id: false },
  );
};

const brandFilesSchema = () => {
  return new mongoose.Schema(
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
};

const socialAccountSchema = () => {
  return new mongoose.Schema(
    {
      isActive: { type: Boolean, default: true },
      link: { type: String },
      consoleLink: { type: String },
    },
    { _id: false },
  );
};

const websiteEmailSchema = () => {
  return new mongoose.Schema(
    {
      name: { type: String },
      position: { type: String },
      email: { type: String },
      employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    },
    { _id: true },
  );
};

const dnsRecordSchema = () => {
  return new mongoose.Schema(
    {
      type: { type: String },
      name: { type: String },
      value: { type: String },
      ttl: { type: Number },
    },
    { _id: true },
  );
};

const renewalHistorySchema = () => {
  return new mongoose.Schema(
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
};

const websiteSchema = () => {
  return new mongoose.Schema(
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
};

const otherSocialSchema = () => {
  return new mongoose.Schema(
    {
      name: { type: String },
      link: { type: String },
      isActive: { type: Boolean },
      notes: { type: String },
    },
    { _id: true },
  );
};

const paymentSchema = () => {
  return new mongoose.Schema(
    {
      cycle: { type: String },
      method: { type: String },
      amount: { type: Number },
      currency: { type: String },
    },
    { _id: false },
  );
};

const credentialsSchema = () => {
  return new mongoose.Schema(
    {
      apiKey: { type: String },
      secret: { type: String },
      accountId: { type: String },
    },
    { _id: false },
  );
};
const mainContactsSchema = () => {
  return new mongoose.Schema(
    {
      telegram: { type: String },
      whatsApp: { type: String },
      phone: { type: String },
      email: { type: String },
    },

    { _id: false },
  );
};

const registeredPhoneSchema = () => {
  return new mongoose.Schema(
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
};

const loginCredentialSchema = () => {
  return new mongoose.Schema(
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
};

const integrationAccountSchema = (subdocumentId = false) => {
  return new mongoose.Schema(
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
};

const registeredInSchema = () => {
  return new mongoose.Schema(
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
};

export {
  localizedFieldSchema,
  fileRefSchema,
  brandLogosSchema,
  brandBrandingFilesSchema,
  contractSchema,
  legalFilesSchema,
  officeFilesSchema,
  logoMetaItemSchema,
  brandFilesSchema,
  socialAccountSchema,
  websiteEmailSchema,
  dnsRecordSchema,
  renewalHistorySchema,
  websiteSchema,
  otherSocialSchema,
  paymentSchema,
  credentialsSchema,
  mainContactsSchema,
  registeredPhoneSchema,
  loginCredentialSchema,
  integrationAccountSchema,
  registeredInSchema,
};

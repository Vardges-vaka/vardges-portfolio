import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: {
      value: { type: String, required: true }, // English (primary)
      translations: {
        ar: { type: String }, // Arabic
        en: { type: String }, // English
        ru: { type: String }, // Russian
      },
    },
    tagline: {
      value: { type: String, required: true }, // English (primary)
      translations: {
        ar: { type: String }, // Arabic
        en: { type: String }, // English
        ru: { type: String }, // Russian
      },
    },
    files: {
      logos: {
        highRes: { type: String },
        svg: { type: String },
        png: { type: String },
        jpg: { type: String },
        pdf: { type: String },
        ico: { type: String },
      },
      branding: {
        brandBook: { type: String },
        brandOverview: { type: String },
        pachaging: [{ ref: { type: String }, value: { type: String } }],
      },
      contracts: [
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
      ],
      legal: {
        vatCertificate: { type: String },
        tradeLicense: { type: String },
        tradeMark: { type: String },
      },
      menus: {
        pdf: { type: String },
        excel: { type: String },
        word: { type: String },
      },
      recipe: {
        pdf: { type: String },
        excel: { type: String },
        word: { type: String },
      },
    },
    socials: {
      instagram: {
        isActive: { type: Boolean, default: true },
        link: { type: String },
        consoleLink: { type: String },
      },
      facebook: {
        isActive: { type: Boolean, default: true },
        link: { type: String },
        consoleLink: { type: String },
      },
      tikTok: {
        isActive: { type: Boolean, default: true },
        link: { type: String },
        consoleLink: { type: String },
      },
      linkedIn: {
        isActive: { type: Boolean, default: true },
        link: { type: String },
        consoleLink: { type: String },
      },
      youtube: {
        isActive: { type: Boolean, default: true },
        link: { type: String },
        consoleLink: { type: String },
      },
      twitter: {
        isActive: { type: Boolean, default: true },
        link: { type: String },
        consoleLink: { type: String },
      },

      website: {
        isActive: { type: Boolean },
        link: { type: String }, // Site URL
        consoleLink: { type: String }, // Registrar panel or dashboard
        domain: { type: String }, // Domain (e.g. example.com)
        registrar: { type: String }, // Name of the registrar/provider
        whois: { type: String }, // Raw whois or whois URL
        nameServers: [{ type: String }], // Array of NS records
        emails: [
          {
            name: { type: String },
            position: { type: String },
            email: { type: String },
            employeeId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Employee",
            },
          },
        ],
        dnsRecords: [
          {
            type: { type: String }, // A, AAAA, CNAME, MX, TXT, etc.
            name: { type: String },
            value: { type: String },
            ttl: { type: Number },
          },
        ],
        status: { type: String }, // e.g. "active", "pending renewal", "expired", "transferring"
        expiresOn: { type: Date }, // Expiry date of the domain
        lastRenewedOn: { type: Date }, // When was the last renewal
        autoRenew: { type: Boolean }, // Does it auto-renew
        renewalHistory: [
          {
            renewedOn: { type: Date },
            amount: { type: Number }, // Renewal fee (e.g. 12.99)
            currency: { type: String }, // "USD", "AED", etc.
            card: {
              brand: { type: String }, // "Visa", "Mastercard"
              last4: { type: String }, // e.g. "1234"
              cardholder: { type: String },
            },
            transactionId: { type: String },
          },
        ],
        dnsStatus: { type: String }, // e.g. "propagated", "pending", "error"
        notes: { type: String }, // Any extra comments about domain status or operations
      },
      others: [
        {
          name: { type: String },
          link: { type: String },
          isActive: { type: Boolean },
          notes: { type: String },
        },
      ],
    },
    integrations: {
      provider: { type: String }, // name
      startedAt: { type: Date }, // when does integration started
      isActive: { type: Boolean }, // does integration is active or not
      notes: { type: String }, // Any integration-specific info
      payment: {
        Cycle: { type: String }, // monthly || yearly
        Method: { type: String }, // card || transpher || cheque
        Amount: { type: Number },
        Currency: { type: String },
      },
      credentials: {
        apiKey: { type: String },
        secret: { type: String },
        accountId: { type: String },
      },
      mainContacts: {
        telegram: { type: String },
        whatsApp: { type: String },
        phone: { type: String },
        email: { type: String },
      },
      registredPhones: [
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
      ],
      loginCredentials: [
        {
          belongTo: {
            name: { type: String },
            emloyeeId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Employee",
            },
          },
          username: { type: String },
          password: { type: String },
          email: { type: String },
          phoneNumber: { type: String },
          type: { type: String }, // emailLogIn || phoneLogIn
          DoesOTPrequired: { type: Boolean },
        },
      ],
    },
    salesIntegration: {
      provider: { type: String }, // name
      startedAt: { type: Date }, // when does integration started
      isActive: { type: Boolean }, // does integration is active or not
      notes: { type: String }, // Any integration-specific info
      payment: {
        Cycle: { type: String }, // monthly || yearly
        Method: { type: String }, // card || transpher || cheque
        Amount: { type: Number },
        Currency: { type: String },
      },
      credentials: {
        apiKey: { type: String },
        secret: { type: String },
        accountId: { type: String },
      },
      mainContacts: {
        telegram: { type: String },
        whatsApp: { type: String },
        phone: { type: String },
        email: { type: String },
      },
      registredPhones: [
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
      ],
      loginCredentials: [
        {
          belongTo: {
            name: { type: String },
            emloyeeId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Employee",
            },
          },
          username: { type: String },
          password: { type: String },
          email: { type: String },
          phoneNumber: { type: String },
          type: { type: String }, // emailLogIn || phoneLogIn
          DoesOTPrequired: { type: Boolean },
        },
      ],
    },
    legal: {
      registeredIn: {
        country: { type: String },
        city: { type: String },
        emirate: { type: String },
        hasTradeLicense: { type: Boolean },
        hasVATCertificate: { type: Boolean },
        hasTradeMark: { type: Boolean },
        dateOfRegistration: { type: Date },
      },
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

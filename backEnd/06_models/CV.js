import mongoose from "mongoose";

// ============================
// Multilingual Text Schema
// ============================

// Helper schema for any text that needs to be displayed in multiple languages

// Helper function to create multilingual field
const createMultilingualField = (required = true) => {
  return {
    en: { type: String, required },
    ru: String,
    hy: String,
    ar: String,
  };
};

// ============================
// Sub-schemas for nested data
// ============================

// Personal Information Schema
const personalInfoSchema = new mongoose.Schema({
  name: createMultilingualField(),
  dateOfBirth: Date,
  location: createMultilingualField(),
  languages: [
    {
      name: createMultilingualField(),
      level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Fluent", "Native"],
        required: true,
      },
    },
  ],
  contactInfo: {
    email: String, // System field - no translation needed
    phone: String, // System field - no translation needed
    linkedin: String,
    github: String,
    website: String,
  },
});

// Profile-specific Multilingual Content Schema
const profileMultilingualContentSchema = new mongoose.Schema(
  {
    dev: {
      en: mongoose.Schema.Types.Mixed,
      ru: mongoose.Schema.Types.Mixed,
      hy: mongoose.Schema.Types.Mixed,
      ar: mongoose.Schema.Types.Mixed,
    },
    hospitality: {
      en: mongoose.Schema.Types.Mixed,
      ru: mongoose.Schema.Types.Mixed,
      hy: mongoose.Schema.Types.Mixed,
      ar: mongoose.Schema.Types.Mixed,
    },
    both: {
      en: mongoose.Schema.Types.Mixed,
      ru: mongoose.Schema.Types.Mixed,
      hy: mongoose.Schema.Types.Mixed,
      ar: mongoose.Schema.Types.Mixed,
    },
  },
  { _id: false }
);

// ============================
// Bio Section Schemas
// ============================

const principleSchema = new mongoose.Schema({
  id: Number,
  title: createMultilingualField(),
  icon: String, // System field
  description: createMultilingualField(),
  quote: createMultilingualField(false),
  practical: [createMultilingualField(false)],
  profiles: [
    {
      type: String,
      enum: ["dev", "hospitality", "both"],
    },
  ],
});

const languageJourneySchema = new mongoose.Schema({
  title: createMultilingualField(false),
  story: createMultilingualField(),
  profiles: [
    {
      type: String,
      enum: ["dev", "hospitality", "both"],
    },
  ],
});

// ============================
// Journey Section Schemas
// ============================

const roleSchema = new mongoose.Schema({
  id: Number,
  title: createMultilingualField(),
  company: createMultilingualField(),
  subCompany: createMultilingualField(false),
  location: createMultilingualField(),
  startDate: { type: String, required: true }, // Date string - keep as is
  endDate: String, // Date string - keep as is
  period: createMultilingualField(),
  category: {
    type: String,
    enum: ["tech", "hospitality", "hybrid", "consulting"],
    required: true,
  },
  type: {
    type: String,
    enum: ["full-time", "part-time", "contract", "freelance", "founder"],
    required: true,
  },
  profiles: [
    {
      type: String,
      enum: ["dev", "hospitality", "both"],
    },
  ],
  scope: createMultilingualField(false),
  responsibilities: [createMultilingualField(false)],
  achievements: [createMultilingualField(false)],
  tags: [String], // System tags - no translation needed
});

const professionalDevelopmentSchema = new mongoose.Schema({
  title: createMultilingualField(false),
  period: createMultilingualField(false),
  details: createMultilingualField(false),
  profiles: [
    {
      type: String,
      enum: ["dev", "hospitality", "both"],
    },
  ],
});

// ============================
// Projects Section Schemas
// ============================

const projectSchema = new mongoose.Schema({
  id: Number,
  name: createMultilingualField(),
  type: createMultilingualField(false),
  category: {
    type: String,
    enum: ["tech", "brands", "bar", "marketing"],
    required: true,
  },
  description: createMultilingualField(),
  venue: createMultilingualField(false),
  period: createMultilingualField(false),
  challenge: createMultilingualField(false),
  solution: [createMultilingualField(false)],
  features: [createMultilingualField(false)],
  deliverables: [createMultilingualField(false)],
  approach: [createMultilingualField(false)],
  components: [createMultilingualField(false)],
  platforms: [String], // Tech names - no translation
  techStack: [String], // Tech names - no translation
  metrics: {
    // Metrics with multilingual descriptions
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  highlights: [createMultilingualField(false)],
  impact: createMultilingualField(false),
  images: [String], // URLs - no translation
  link: String, // URL - no translation
  profiles: [
    {
      type: String,
      enum: ["dev", "hospitality", "both"],
    },
  ],
});

// ============================
// Skills Section Schemas
// ============================

const skillSchema = new mongoose.Schema({
  name: createMultilingualField(),
  competencies: [createMultilingualField(false)],
  proficiency: {
    type: String,
    enum: ["beginner", "intermediate", "proficient", "advanced", "expert"],
  },
});

const skillSubcategorySchema = new mongoose.Schema({
  title: createMultilingualField(),
  skills: [skillSchema],
  approach: createMultilingualField(false),
  supportingTools: [String], // Tool names - no translation
});

const skillCategorySchema = new mongoose.Schema({
  title: createMultilingualField(),
  profiles: [
    {
      type: String,
      enum: ["dev", "hospitality", "both"],
    },
  ],
  subcategories: mongoose.Schema.Types.Mixed,
});

// ============================
// Achievements Section Schemas
// ============================

const achievementSchema = new mongoose.Schema({
  id: Number,
  title: createMultilingualField(),
  company: createMultilingualField(false),
  venue: createMultilingualField(false),
  certification: createMultilingualField(false),
  description: createMultilingualField(),
  challenge: createMultilingualField(false),
  features: [createMultilingualField(false)],
  deliverables: [createMultilingualField(false)],
  achievements: [createMultilingualField(false)],
  metrics: mongoose.Schema.Types.Mixed,
  impact: createMultilingualField(false),
  skills: [String], // Skill IDs - no translation
});

const achievementCategorySchema = new mongoose.Schema({
  id: String,
  title: createMultilingualField(),
  intro: createMultilingualField(false),
  profiles: [
    {
      type: String,
      enum: ["dev", "hospitality", "both"],
    },
  ],
  achievements: [achievementSchema],
  summary: createMultilingualField(false),
});

// ============================
// Education Section Schemas
// ============================

const certificationSchema = new mongoose.Schema({
  name: createMultilingualField(),
  issuer: createMultilingualField(),
  year: String, // Year - no translation
  type: createMultilingualField(false),
  description: createMultilingualField(false),
  modules: [createMultilingualField(false)],
  skills: [String], // Skill IDs - no translation
  focus: createMultilingualField(false),
});

const educationCategorySchema = new mongoose.Schema({
  id: String,
  title: createMultilingualField(),
  profiles: [
    {
      type: String,
      enum: ["dev", "hospitality", "both"],
    },
  ],
  certifications: [certificationSchema],
});

// ============================
// Vision Section Schemas
// ============================

const directionApplicationSchema = new mongoose.Schema({
  title: createMultilingualField(),
  description: createMultilingualField(),
});

const careerVisionSchema = new mongoose.Schema({
  title: createMultilingualField(false),
  intro: createMultilingualField(false),
  foundations: [createMultilingualField(false)],
  nextLayer: {
    title: createMultilingualField(false),
    description: createMultilingualField(false),
  },
  direction: {
    title: createMultilingualField(false),
    description: createMultilingualField(false),
    goals: [createMultilingualField(false)],
    applications: [directionApplicationSchema],
  },
  longTerm: createMultilingualField(false),
});

const entrepreneurialAmbitionsSchema = new mongoose.Schema({
  title: createMultilingualField(false),
  description: createMultilingualField(false),
  brands: [createMultilingualField(false)],
  consultingOffer: {
    title: createMultilingualField(false),
    services: [createMultilingualField(false)],
  },
  profiles: [
    {
      type: String,
      enum: ["dev", "hospitality", "both"],
    },
  ],
});

const personalGoalsSchema = new mongoose.Schema({
  financialIndependence: {
    title: createMultilingualField(false),
    description: createMultilingualField(false),
    plan: [createMultilingualField(false)],
    tagline: createMultilingualField(false),
  },
  lifeOS: {
    title: createMultilingualField(false),
    description: createMultilingualField(false),
    areas: [createMultilingualField(false)],
    tagline: createMultilingualField(false),
  },
  howISeeIt: {
    title: createMultilingualField(false),
    points: [createMultilingualField(false)],
    ultimateGoal: createMultilingualField(false),
  },
  profiles: [
    {
      type: String,
      enum: ["dev", "hospitality", "both"],
    },
  ],
});

// ============================
// Values Section Schemas
// ============================

const valueSchema = new mongoose.Schema({
  id: Number,
  title: createMultilingualField(),
  icon: String, // System field
  intro: createMultilingualField(false),
  description: createMultilingualField(false),
  principles: [createMultilingualField(false)],
  approach: [createMultilingualField(false)],
  method: [createMultilingualField(false)],
  characteristics: [createMultilingualField(false)],
  context: createMultilingualField(false),
  philosophy: createMultilingualField(false),
  conclusion: createMultilingualField(false),
  rationale: createMultilingualField(false),
  profiles: [
    {
      type: String,
      enum: ["dev", "hospitality", "both"],
    },
  ],
});

const coreDriverSchema = new mongoose.Schema({
  name: createMultilingualField(),
  description: createMultilingualField(),
});

const personalitySchema = new mongoose.Schema({
  communicationStyle: {
    title: createMultilingualField(false),
    traits: [createMultilingualField(false)],
    description: createMultilingualField(false),
  },
  coreDrivers: {
    title: createMultilingualField(false),
    drivers: [coreDriverSchema],
  },
  balance: {
    title: createMultilingualField(false),
    description: createMultilingualField(false),
    inSimpleTerms: [createMultilingualField(false)],
    tagline: createMultilingualField(false),
  },
  profiles: [
    {
      type: String,
      enum: ["dev", "hospitality", "both"],
    },
  ],
});

// ============================
// Main CV Schema
// ============================

const cvSchema = new mongoose.Schema(
  {
    // Basic Info
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    version: {
      type: String,
      default: "1.0.0",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    defaultLanguage: {
      type: String,
      enum: ["en", "ru", "hy", "ar"],
      default: "en",
    },

    // Profile Configuration
    defaultProfile: {
      type: String,
      enum: ["dev", "hospitality", "both"],
      default: "both",
    },

    // ============================
    // Bio Section
    // ============================
    personalInfo: personalInfoSchema,
    intro: profileMultilingualContentSchema,
    principles: [principleSchema],
    languageJourney: languageJourneySchema,
    careerDirection: profileMultilingualContentSchema,

    // ============================
    // Journey Section
    // ============================
    journey: {
      narrative: {
        overview: createMultilingualField(false),
        currentFocus: createMultilingualField(false),
      },
      roles: [roleSchema],
      professionalDevelopment: professionalDevelopmentSchema,
      themes: [
        {
          name: createMultilingualField(false),
          description: createMultilingualField(false),
        },
      ],
    },

    // ============================
    // Projects Section
    // ============================
    projects: {
      overview: {
        statement: createMultilingualField(false),
      },
      categories: {
        tech: {
          title: createMultilingualField(false),
          profiles: [String],
          projects: [projectSchema],
        },
        brands: {
          title: createMultilingualField(false),
          profiles: [String],
          projects: [projectSchema],
        },
        bar: {
          title: createMultilingualField(false),
          profiles: [String],
          projects: [projectSchema],
        },
        marketing: {
          title: createMultilingualField(false),
          profiles: [String],
          projects: [projectSchema],
        },
      },
    },

    // ============================
    // Skills Section
    // ============================
    skills: {
      categories: {
        technical: skillCategorySchema,
        marketing: skillCategorySchema,
        business: skillCategorySchema,
        soft: skillCategorySchema,
      },
    },

    // ============================
    // Achievements Section
    // ============================
    achievements: {
      overallSummary: {
        title: createMultilingualField(false),
        points: [createMultilingualField(false)],
        tagline: createMultilingualField(false),
        profiles: [String],
      },
      categories: [achievementCategorySchema],
    },

    // ============================
    // Education Section
    // ============================
    education: {
      categories: [educationCategorySchema],
    },

    // ============================
    // Vision Section
    // ============================
    vision: {
      careerVision: {
        dev: careerVisionSchema,
        hospitality: careerVisionSchema,
        both: careerVisionSchema,
      },
      entrepreneurialAmbitions: entrepreneurialAmbitionsSchema,
      personalGoals: personalGoalsSchema,
    },

    // ============================
    // Values Section
    // ============================
    values: {
      coreValues: [valueSchema],
      personality: personalitySchema,
    },

    // Metadata
    metadata: {
      lastUpdated: {
        bio: Date,
        journey: Date,
        projects: Date,
        skills: Date,
        achievements: Date,
        education: Date,
        vision: Date,
        values: Date,
      },
      analytics: {
        views: { type: Number, default: 0 },
        downloads: { type: Number, default: 0 },
      },
    },
  },
  {
    timestamps: true,
    collection: "cvs",
  }
);

// ============================
// Indexes
// ============================
cvSchema.index({ userId: 1, isActive: 1 });
cvSchema.index({ userId: 1, version: 1 });
cvSchema.index({ defaultLanguage: 1 });

// ============================
// Helper Methods for Multilingual Content
// ============================

// Extract content for specific language
const extractLanguageContent = (obj, language = "en") => {
  if (!obj) return obj;

  if (typeof obj !== "object" || obj === null) return obj;

  // If object has language keys, extract the specific language
  if (obj.en !== undefined) {
    return obj[language] || obj.en; // Fallback to English
  }

  // If it's an array, process each item
  if (Array.isArray(obj)) {
    return obj.map((item) => extractLanguageContent(item, language));
  }

  // If it's an object, process each property
  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = extractLanguageContent(obj[key], language);
    }
  }
  return result;
};

// ============================
// Methods
// ============================

// Get CV filtered by profile and language
cvSchema.methods.getByProfileAndLanguage = function (
  profile = "both",
  language = "en"
) {
  const cv = this.toObject();

  // Extract language-specific content
  const localizedCV = extractLanguageContent(cv, language);

  // Filter intro by profile
  if (localizedCV.intro && localizedCV.intro[profile]) {
    localizedCV.intro = localizedCV.intro[profile];
  }

  // Filter career direction by profile
  if (localizedCV.careerDirection && localizedCV.careerDirection[profile]) {
    localizedCV.careerDirection = localizedCV.careerDirection[profile];
  }

  // Filter principles by profile
  if (localizedCV.principles) {
    localizedCV.principles = localizedCV.principles.filter(
      (principle) =>
        principle.profiles.includes(profile) ||
        principle.profiles.includes("both")
    );
  }

  // Filter roles by profile
  if (localizedCV.journey && localizedCV.journey.roles) {
    localizedCV.journey.roles = localizedCV.journey.roles.filter(
      (role) =>
        role.profiles.includes(profile) || role.profiles.includes("both")
    );
  }

  // Filter projects by profile
  if (localizedCV.projects && localizedCV.projects.categories) {
    Object.keys(localizedCV.projects.categories).forEach((category) => {
      if (localizedCV.projects.categories[category].projects) {
        localizedCV.projects.categories[category].projects =
          localizedCV.projects.categories[category].projects.filter(
            (project) =>
              project.profiles.includes(profile) ||
              project.profiles.includes("both")
          );
      }
    });
  }

  // Filter achievements by profile
  if (localizedCV.achievements && localizedCV.achievements.categories) {
    localizedCV.achievements.categories =
      localizedCV.achievements.categories.filter(
        (category) =>
          category.profiles.includes(profile) ||
          category.profiles.includes("both")
      );
  }

  // Filter education by profile
  if (localizedCV.education && localizedCV.education.categories) {
    localizedCV.education.categories = localizedCV.education.categories.filter(
      (category) =>
        category.profiles.includes(profile) ||
        category.profiles.includes("both")
    );
  }

  // Filter vision career direction by profile
  if (localizedCV.vision && localizedCV.vision.careerVision) {
    localizedCV.vision.careerVision =
      localizedCV.vision.careerVision[profile] ||
      localizedCV.vision.careerVision.both;
  }

  // Filter values by profile
  if (localizedCV.values && localizedCV.values.coreValues) {
    localizedCV.values.coreValues = localizedCV.values.coreValues.filter(
      (value) =>
        value.profiles.includes(profile) || value.profiles.includes("both")
    );
  }

  return localizedCV;
};

// Get CV filtered by profile only (keeps all languages)
cvSchema.methods.getByProfile = function (profile = "both") {
  const cv = this.toObject();

  // Filter intro
  if (cv.intro && cv.intro[profile]) {
    cv.intro = cv.intro[profile];
  }

  // Filter career direction
  if (cv.careerDirection && cv.careerDirection[profile]) {
    cv.careerDirection = cv.careerDirection[profile];
  }

  // Filter principles
  if (cv.principles) {
    cv.principles = cv.principles.filter(
      (principle) =>
        principle.profiles.includes(profile) ||
        principle.profiles.includes("both")
    );
  }

  // Filter roles
  if (cv.journey && cv.journey.roles) {
    cv.journey.roles = cv.journey.roles.filter(
      (role) =>
        role.profiles.includes(profile) || role.profiles.includes("both")
    );
  }

  // Filter projects
  if (cv.projects && cv.projects.categories) {
    Object.keys(cv.projects.categories).forEach((category) => {
      if (cv.projects.categories[category].projects) {
        cv.projects.categories[category].projects = cv.projects.categories[
          category
        ].projects.filter(
          (project) =>
            project.profiles.includes(profile) ||
            project.profiles.includes("both")
        );
      }
    });
  }

  return cv;
};

// Increment view count
cvSchema.methods.incrementViews = async function () {
  this.metadata.analytics.views += 1;
  return await this.save();
};

// Increment download count
cvSchema.methods.incrementDownloads = async function () {
  this.metadata.analytics.downloads += 1;
  return await this.save();
};

// Update section timestamp
cvSchema.methods.updateSectionTimestamp = async function (section) {
  if (this.metadata.lastUpdated[section] !== undefined) {
    this.metadata.lastUpdated[section] = new Date();
    return await this.save();
  }
};

// ============================
// Statics
// ============================

// Get active CV for user
cvSchema.statics.getActiveCV = async function (userId, language = "en") {
  const cv = await this.findOne({
    userId,
    isActive: true,
  });

  if (!cv) return null;

  // Return CV with extracted language content
  return extractLanguageContent(cv.toObject(), language);
};

// Get all versions for user
cvSchema.statics.getAllVersions = async function (userId) {
  return await this.find({ userId }).sort({ version: -1 });
};

const CV = mongoose.model("CV", cvSchema);

export default CV;

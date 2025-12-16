/**
 * Education Data
 * Structured data extracted from personalContext/04_licenses&certifications.md
 * Profile-aware content for dynamic filtering
 */

export const educationData = {
  categories: [
    {
      id: "hospitality",
      profiles: ["hospitality", "both"],
      title: "Hospitality & Beverage",
      icon: "wine",
      certifications: [
        {
          id: 1,
          name: "WSET Level 3 Award in Wines",
          issuer: "Wine & Spirit Education Trust (WSET)",
          year: null,
          type: "Advanced Certification",
          description:
            "Advanced qualification covering grape varieties, regional characteristics, winemaking techniques, and structured tasting methodology.",
          coverage: [
            "Grape varieties and regional characteristics",
            "Winemaking techniques and production variables",
            "Structured tasting methodology",
            "Food and wine pairing principles",
          ],
          focus:
            "Technical wine knowledge + the ability to apply it in service, menu design, and guest education.",
        },
        {
          id: 2,
          name: "WSET Level 3 Award in Spirits",
          issuer: "Wine & Spirit Education Trust (WSET)",
          year: null,
          type: "Advanced Certification",
          description:
            "In-depth qualification covering global spirit categories, distillation methods, and flavor development.",
          coverage: [
            "Global spirit categories (whisky, rum, gin, etc.)",
            "Distillation methods and raw materials",
            "Flavor development and evaluation",
            "Product knowledge for premium positioning and upselling",
          ],
          focus:
            "Spirits program design, cost control, and storytelling around premium products.",
        },
        {
          id: 3,
          name: "Hotel & Hospitality Management",
          issuer: "Zabeel International Institute of Management & Technology",
          year: "2017",
          type: "Diploma",
          description:
            "Comprehensive hospitality management program covering operations, revenue, and leadership.",
          coverage: [
            "Sales and upselling for F&B",
            "Wine service and beverage cost awareness",
            "Restaurant management and service structuring",
            "Budgeting and revenue analysis",
            "Leadership and team supervision",
            "Pre-opening planning and launch execution",
            "Hospitality management fundamentals",
          ],
          focus:
            "Turning hospitality operations into predictable, profitable systems.",
        },
      ],
    },
    {
      id: "beverage",
      profiles: ["hospitality", "both"],
      title: "Specialized Beverage Training",
      icon: "glass-water",
      description:
        "Focused technical development in beverage service, menu profitability, and guest experience.",
      certifications: [
        {
          id: 1,
          name: "Exploring Drinks with Food",
          issuer: "WSET eLearning",
          year: null,
          type: "Course",
          description: "Pairing logic, flavor structure, guest guidance.",
        },
        {
          id: 2,
          name: "Serve with Spirit",
          issuer: "WSET eLearning",
          year: null,
          type: "Course",
          description:
            "Professional service standards and responsible service culture.",
        },
        {
          id: 3,
          name: "A Complete Guide to Whisky: Taste and Flavour",
          issuer: "WSET eLearning",
          year: null,
          type: "Course",
          description:
            "Deep dive into whisky styles, aging, profile building, and sensory analysis.",
        },
        {
          id: 4,
          name: "Batched on Tap and Canned Cocktails",
          issuer: "WSET eLearning",
          year: null,
          type: "Course",
          description:
            "High-volume cocktail systems: batching, consistency, and speed without quality loss.",
        },
        {
          id: 5,
          name: "Improving Your Bar Menu: Tips to Boost Profits",
          issuer: "WSET eLearning",
          year: null,
          type: "Course",
          description:
            "Menu engineering for margin, sell-through, and guest appeal.",
        },
      ],
      focus:
        "Cost control, scalable execution, and designing beverage programs that are both high-performing and profitable in real service conditions.",
    },
    {
      id: "technology",
      profiles: ["dev", "both"],
      title: "Technology & Digital Skills",
      icon: "code",
      certifications: [
        {
          id: 1,
          name: "Google Digital Marketing & E-Commerce Certificate",
          issuer: "Coursera",
          year: "Dec 2023",
          type: "Professional Certificate",
          description:
            "Comprehensive digital marketing and e-commerce training.",
          coverage: [
            "E-commerce setup and management",
            "Digital marketing foundations",
            "Customer acquisition and retention strategy",
            "Analytics and performance tracking",
            "Building engagement and repeat behavior",
          ],
          focus:
            "Linking marketing activity to measurable commercial results.",
        },
        {
          id: 2,
          name: "Introduction to Prompt Engineering for Generative AI",
          issuer: "LinkedIn",
          year: "2024",
          type: "Course",
          description:
            "Structuring AI prompts for reliability and control in business applications.",
          coverage: [
            "Structuring AI prompts for reliability and control",
            "Extracting consistent, high-quality outputs for business use",
            "Using AI as an operator-facing tool (not just 'idea generation')",
          ],
          focus:
            "Turning AI into repeatable internal infrastructure, not a toy.",
        },
        {
          id: 3,
          name: "Introduction to Responsible AI",
          issuer: "Google",
          year: "2024",
          type: "Course",
          description: "Safe and ethical deployment of AI systems.",
          coverage: [
            "Safe deployment of AI systems",
            "Bias, risk, and accountability considerations",
            "Ethics in automated decision support",
          ],
          focus:
            "Using AI in a way that is useful, compliant, and reputationally safe.",
        },
      ],
    },
    {
      id: "business",
      profiles: ["both"],
      title: "Business, Leadership & Productivity",
      icon: "briefcase",
      description: "All completed in 2024 (LinkedIn Learning).",
      certifications: [
        {
          id: 1,
          name: "Data Visualization: Best Practices",
          issuer: "LinkedIn Learning",
          year: "2024",
          type: "Course",
          description: "Communicating data clearly and persuasively.",
        },
        {
          id: 2,
          name: "Getting Things Done (GTD Method)",
          issuer: "LinkedIn Learning",
          year: "2024",
          type: "Course",
          description:
            "Personal productivity, prioritization, and execution discipline.",
        },
        {
          id: 3,
          name: "How to Be Both Assertive and Likable",
          issuer: "LinkedIn Learning",
          year: "2024",
          type: "Course",
          description:
            "Navigating leadership presence without losing team trust.",
        },
        {
          id: 4,
          name: "How to Prepare for Your Negotiations",
          issuer: "LinkedIn Learning",
          year: "2024",
          type: "Course",
          description:
            "Pre-negotiation structure, information leverage, framing.",
        },
        {
          id: 5,
          name: "Negotiation Foundations",
          issuer: "LinkedIn Learning",
          year: "2024",
          type: "Course",
          description:
            "Core negotiation mechanics: value, concession, leverage.",
        },
        {
          id: 6,
          name: "Negotiating with Agility",
          issuer: "LinkedIn Learning",
          year: "2024",
          type: "Course",
          description:
            "Adapting negotiation strategy in dynamic situations.",
        },
        {
          id: 7,
          name: "Strategic Negotiation",
          issuer: "LinkedIn Learning",
          year: "2024",
          type: "Course",
          description:
            "Long-term relationship-based negotiation, not just one-off deals.",
        },
        {
          id: 8,
          name: "When Negotiation's About More than Money",
          issuer: "LinkedIn Learning",
          year: "2024",
          type: "Course",
          description:
            "Non-monetary levers: access, placement, exposure, terms, positioning.",
        },
        {
          id: 9,
          name: "Strategic Planning Foundations",
          issuer: "LinkedIn Learning",
          year: "2024",
          type: "Course",
          description:
            "Building plans that are executable, measurable, and directionally aligned.",
        },
        {
          id: 10,
          name: "Leading and Motivating People with Different Personalities",
          issuer: "LinkedIn Learning",
          year: "2024",
          type: "Course",
          description:
            "Leadership style adaptation; motivating people based on how they operate, not how you operate.",
        },
      ],
      focus:
        "Practical leadership in live environments — hospitality, operations, partnerships, and brand development.",
    },
    {
      id: "marketing",
      profiles: ["both"],
      title: "Customer Experience & Marketing",
      icon: "trending-up",
      description: "Completed through Google / Coursera.",
      certifications: [
        {
          id: 1,
          name: "Satisfaction Guaranteed: Develop Customer Loyalty",
          issuer: "Google / Coursera",
          year: null,
          type: "Course",
          description: "Retention models and loyalty systems.",
        },
        {
          id: 2,
          name: "Make the Sale: Build, Launch, and Manage E-Commerce Stores",
          issuer: "Google / Coursera",
          year: null,
          type: "Course",
          description: "Store setup, funnel design, and conversion flow.",
        },
        {
          id: 3,
          name: "Assess for Success: Marketing Analytics and Measurement",
          issuer: "Google / Coursera",
          year: null,
          type: "Course",
          description:
            "Measuring performance against real outcomes, not vanity metrics.",
        },
        {
          id: 4,
          name: "Think Outside the Inbox: Email Marketing",
          issuer: "Google / Coursera",
          year: null,
          type: "Course",
          description:
            "Lifecycle emails, retention, reactivation, and transactional comms.",
        },
        {
          id: 5,
          name: "From Likes to Leads: Interact with Customers",
          issuer: "Google / Coursera",
          year: null,
          type: "Course",
          description:
            "Turning attention into actual action and order behavior.",
        },
        {
          id: 6,
          name: "Attract and Engage Customers with Digital Marketing",
          issuer: "Google / Coursera",
          year: null,
          type: "Course",
          description: "Traffic growth and early-stage awareness strategies.",
        },
        {
          id: 7,
          name: "Foundations of Digital Marketing and E-Commerce",
          issuer: "Google / Coursera",
          year: null,
          type: "Course",
          description:
            "End-to-end visibility on acquisition, messaging, offer design, and repeat purchase.",
        },
      ],
      focus:
        "Converting attention into revenue and building long-term relationships instead of one-time orders.",
    },
    {
      id: "other",
      profiles: ["both"],
      title: "Other Credentials",
      icon: "file-check",
      certifications: [
        {
          id: 1,
          name: "TIA Attestation",
          issuer: "TIA",
          year: null,
          type: "Credential",
          description: "Multiple certificates submitted and verified.",
          focus:
            "Compliance and documentation supporting work status, qualifications, and formal validation when required.",
        },
      ],
    },
  ],
};


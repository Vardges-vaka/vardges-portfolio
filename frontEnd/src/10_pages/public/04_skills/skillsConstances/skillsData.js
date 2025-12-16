/**
 * Skills Data
 * Structured data extracted from personalContext/03_skills&expertise.md
 * Profile-aware content for dynamic filtering
 */

export const skillsData = {
  categories: {
    technical: {
      profiles: ["dev", "both"],
      id: "technical",
      title: "Technical (Web & Software)",
      icon: "code",
      subcategories: {
        frontend: {
          title: "Frontend Development",
          description:
            "Building modular, scalable, and user-friendly interfaces with a focus on clarity, reusability, and performance.",
          skills: [
            {
              name: "JavaScript (ES6+)",
              competencies: [
                "asynchronous programming",
                "modular code structure",
                "DOM manipulation",
              ],
              proficiency: "advanced",
            },
            {
              name: "React",
              competencies: [
                "component-based architecture",
                "custom hooks",
                "context API for global state management",
                "reusable UI components",
              ],
              proficiency: "advanced",
            },
            {
              name: "Vite",
              competencies: [
                "fast development server and optimized build pipelines for React apps",
              ],
              proficiency: "proficient",
            },
            {
              name: "HTML5 & CSS3",
              competencies: ["semantic structure and responsive styling"],
              proficiency: "advanced",
            },
            {
              name: "Bootstrap",
              competencies: [
                "used for quick prototyping and layout before shifting to React",
              ],
              proficiency: "proficient",
            },
            {
              name: "i18n (internationalization)",
              competencies: [
                "managing multilingual support and localization in frontend applications",
              ],
              proficiency: "proficient",
            },
            {
              name: "Figma",
              competencies: [
                "creating and interpreting UI/UX designs",
                "collaborating with design workflows",
              ],
              proficiency: "intermediate",
            },
          ],
          approach:
            "My frontend philosophy is to prioritize clarity, modularity, and reusability. I structure components in a way that future features can be added without major rewrites, while ensuring fast load times and intuitive user experiences.",
        },
        backend: {
          title: "Backend Development",
          description:
            "Backend work built on Node.js and Express, focusing on security, structure, and maintainability.",
          skills: [
            {
              name: "Node.js & Express",
              competencies: [
                "REST API design",
                "routing",
                "middleware",
                "authentication",
                "error handling",
                "request validation",
              ],
              proficiency: "advanced",
            },
            {
              name: "Authentication & Security",
              competencies: [
                "JWT authentication",
                "password hashing (middleware-based)",
                "token blacklists",
                "role-based access control",
              ],
              proficiency: "advanced",
            },
            {
              name: "File Uploads",
              competencies: [
                "Multer integration with AWS SDK",
                "handling private storage with S3 presigned URLs",
              ],
              proficiency: "proficient",
            },
            {
              name: "Business Logic",
              competencies: [
                "schema handling for users, orders, campaigns",
                "wallet/transactions",
                "delivery coverage areas",
              ],
              proficiency: "advanced",
            },
            {
              name: "Rate Limiting & Security Hardening",
              competencies: [
                "protections against abuse",
                "CORS configuration",
                "secure headers",
              ],
              proficiency: "proficient",
            },
            {
              name: "Email Services",
              competencies: [
                "transactional email integration using SendGrid, Nodemailer, and Amazon SES",
              ],
              proficiency: "proficient",
            },
            {
              name: "Real-Time Communication",
              competencies: [
                "socket.io for event-driven flows such as live updates or notifications",
              ],
              proficiency: "intermediate",
            },
          ],
          supportingTools: [
            "Logging & monitoring: Winston (logging), Morgan (HTTP request logging)",
            "Task scheduling: node-cron for background jobs",
          ],
          approach:
            "I prioritize clarity, modularity, and reliability in backend systems. Each module is structured to separate concerns (routes, controllers, services, middleware), making codebases easier to maintain and scale. I ensure APIs are designed with both performance and security in mind.",
        },
        databases: {
          title: "Databases",
          description:
            "MongoDB with Mongoose, designing schemas that match real business operations.",
          skills: [
            {
              name: "MongoDB",
              competencies: [
                "CRUD operations",
                "indexing and query optimization",
                "handling growth in collection size",
              ],
              proficiency: "advanced",
            },
            {
              name: "Mongoose",
              competencies: [
                "schema definition and validation",
                "pre/post middleware",
                "populate for references",
                "lean queries for performance",
              ],
              proficiency: "advanced",
            },
            {
              name: "Schema Design",
              competencies: [
                "Users & Admins (roles, tokens, auth state)",
                "Orders (items, price breakdown, status pipeline)",
                "Menu Items (images, categories, descriptions)",
                "Campaigns & Discounts (promo caps, cashback logic)",
                "Wallet & Transactions (top-ups, refunds, partial payments)",
              ],
              proficiency: "advanced",
            },
          ],
          approach:
            "I treat database design as structural risk control. If the schema is wrong, the business can't scale, reporting becomes unreliable, and security gaps open. I design schemas to reflect real workflows, be safe to extend, and keep queries efficient under load.",
        },
        integrations: {
          title: "Payments, Messaging & Maps",
          description:
            "Building and integrating core features: payments, communication, and delivery logic.",
          skills: [
            {
              name: "Stripe",
              competencies: [
                "Wallet system (top-ups, balance usage)",
                "refund handling",
                "saving/removing payment methods",
              ],
              proficiency: "advanced",
            },
            {
              name: "SendGrid",
              competencies: [
                "transactional email (registration, verification, status updates)",
              ],
              proficiency: "proficient",
            },
            {
              name: "Amazon SES",
              competencies: [
                "scalable email delivery for cost-effective transactional messaging",
              ],
              proficiency: "proficient",
            },
            {
              name: "Twilio / Infobip",
              competencies: ["OTP via SMS, WhatsApp, Telegram"],
              proficiency: "proficient",
            },
            {
              name: "Google Maps API",
              competencies: [
                "address lookup and selection",
                "rendering map data",
                "delivery coverage logic and branch routing",
              ],
              proficiency: "proficient",
            },
          ],
          supportingTools: [
            "Nodemailer — lightweight email handling",
            "Webhook Integrations — reacting to external provider events",
          ],
          approach:
            "Payments and messaging are about trust. If they fail, the whole product feels unreliable. My priorities: Security, Predictability, Clear user experience. All integrations are built to scale as order volume and customer base grow.",
        },
      },
    },
    marketing: {
      profiles: ["both"],
      id: "marketing",
      title: "Marketing & Growth",
      icon: "trending-up",
      subcategories: {
        foundations: {
          title: "Marketing Foundations",
          description:
            "Marketing starts with positioning, offer design, and capacity planning.",
          skills: [
            {
              name: "Positioning & Strategy",
              competencies: [
                "define who we are, who we're for, what problem we're solving",
              ],
              proficiency: "advanced",
            },
            {
              name: "Value Proposition Design",
              competencies: [
                "explain clearly why someone should choose us, in their language",
              ],
              proficiency: "advanced",
            },
            {
              name: "Campaign Planning",
              competencies: [
                "loyalty pushes",
                "seasonal promos",
                "retention campaigns",
                "new menu launches",
              ],
              proficiency: "advanced",
            },
            {
              name: "Offer Design",
              competencies: [
                "% discounts with caps",
                "cashback structures",
                "bundled incentives",
                "offers that drive volume but don't destroy margin",
              ],
              proficiency: "advanced",
            },
            {
              name: "Operational Alignment",
              competencies: [
                "campaigns must match production capacity",
                "no promo that overwhelms kitchen/dispatch",
              ],
              proficiency: "advanced",
            },
            {
              name: "Measurement & Feedback",
              competencies: [
                "track performance",
                "gather feedback",
                "iterate",
              ],
              proficiency: "advanced",
            },
          ],
          approach:
            "I don't launch noise. I launch systems: The offer, The capacity plan, The fulfillment plan, The retention path. If those four aren't aligned, it's not a real strategy.",
        },
        digital: {
          title: "Digital Marketing & Advertising",
          description:
            "Treating digital as an extension of strategy, executing what's already defined.",
          skills: [
            {
              name: "SEO",
              competencies: [
                "keyword targeting",
                "structure",
                "technical hygiene to drive organic visibility",
              ],
              proficiency: "proficient",
            },
            {
              name: "Content Strategy",
              competencies: [
                "taking raw assets (video, photos, copy)",
                "turning them into structured, branded campaigns",
              ],
              proficiency: "advanced",
            },
            {
              name: "Social Media / Influencers",
              competencies: [
                "calendar planning",
                "collaboration with influencers and bloggers",
                "balancing organic reach with paid spend",
              ],
              proficiency: "advanced",
            },
            {
              name: "CPC & Paid Ads",
              competencies: [
                "budget setting",
                "bid management",
                "performance review tied to conversion",
              ],
              proficiency: "proficient",
            },
            {
              name: "Email Marketing",
              competencies: [
                "automated onboarding/welcome flows",
                "retention/reactivation messaging",
                "transactional + promotional split",
              ],
              proficiency: "advanced",
            },
            {
              name: "Performance Analytics",
              competencies: [
                "cost-per-order",
                "return on ad spend (ROAS)",
                "customer acquisition cost (CAC)",
                "conversion tracking",
              ],
              proficiency: "advanced",
            },
          ],
          approach:
            "I only consider a campaign 'successful' if: It brings in orders we can handle, At a cost we can afford, From customers we can retain. Impressions and likes are meaningless without repeatable sales.",
        },
        aggregators: {
          title: "Aggregator Growth & Partnerships",
          description:
            "Managing real relationships and performance with delivery platforms.",
          skills: [
            {
              name: "Aggregator Partnerships",
              competencies: [
                "onboarding brands",
                "negotiating placements and visibility",
                "working with KAMs to secure exposure",
              ],
              platforms: [
                "Talabat",
                "Deliveroo",
                "Careem",
                "Noon",
                "Keeta",
                "Amazon 15 Minutes",
                "Instashop",
                "Smiles by Etisalat",
              ],
              proficiency: "advanced",
            },
            {
              name: "CPC Campaigns",
              competencies: [
                "budget allocation and optimization in aggregator dashboards",
                "measuring conversion vs spend",
              ],
              proficiency: "advanced",
            },
            {
              name: "ROI & Profitability",
              competencies: [
                "reading aggregator data correctly",
                "gross basket value before discount",
                "net revenue after promo caps and commission",
              ],
              proficiency: "advanced",
            },
            {
              name: "Menu / Catalog Management",
              competencies: [
                "structuring items and categories for conversion",
                "maintaining brand alignment across platforms",
              ],
              proficiency: "advanced",
            },
            {
              name: "Promotions & Loyalty",
              competencies: [
                "discount logic (50% off up to cap)",
                "cashback structures",
                "repeat-order incentives",
              ],
              proficiency: "advanced",
            },
          ],
          approach:
            "I use aggregators as partners, not landlords. That means: We chase visibility, but not at any cost. We measure outcome per dirham spent. We keep volume aligned to operational capacity. The result: controlled growth instead of chaos.",
        },
        brand: {
          title: "Brand Building & Customer Engagement",
          description:
            "Building brands from zero and ensuring experience matches promise.",
          skills: [
            {
              name: "Logo Direction & Identity Systems",
              competencies: [
                "visual language",
                "typography",
                "color palette",
                "voice and tone",
              ],
              proficiency: "advanced",
            },
            {
              name: "Brand Books / Guidelines",
              competencies: [
                "rules for usage",
                "how the brand speaks, looks, behaves",
              ],
              proficiency: "advanced",
            },
            {
              name: "End-to-End Brand Setup",
              competencies: [
                "social channels",
                "website/domain setup",
                "professional email + signature",
                "menu/packaging language",
              ],
              proficiency: "advanced",
            },
            {
              name: "Custom GPT Development",
              competencies: [
                "building brand-specific GPT assistants for owners/managers/staff",
                "automating structured responses in the brand's voice",
              ],
              proficiency: "advanced",
            },
            {
              name: "Storytelling & Messaging",
              competencies: [
                "communicating what the brand stands for",
                "why it matters",
              ],
              proficiency: "advanced",
            },
            {
              name: "Customer Experience Integration",
              competencies: [
                "making sure aggregators, Instagram, and delivery bag feel like one brand",
              ],
              proficiency: "advanced",
            },
            {
              name: "Loyalty & Retention",
              competencies: [
                "cashback",
                "referral incentives",
                "repeat-order hooks",
              ],
              proficiency: "advanced",
            },
          ],
          approach:
            "I don't hand over 'a logo.' I hand over an operating identity: Visual, Operational, Communication, Loyalty, AI support tools. The result: a brand that can actually run.",
        },
        data: {
          title: "Data & Measurement",
          description: "Tracking performance, not guessing it.",
          skills: [
            {
              name: "ROI Analysis",
              competencies: [
                "per platform (Talabat/Deliveroo/Careem/Noon/Keeta/etc.)",
                "per campaign",
              ],
              proficiency: "advanced",
            },
            {
              name: "CPC & Spend Tracking",
              competencies: ["cost-per-order", "ROAS", "CAC"],
              proficiency: "advanced",
            },
            {
              name: "Revenue Clarity",
              competencies: [
                "breaking down gross basket value vs net revenue after discounts and caps",
              ],
              proficiency: "advanced",
            },
            {
              name: "Performance Dashboards",
              competencies: [
                "building spreadsheets/reports comparing order volumes, spend, retention, efficiency",
              ],
              proficiency: "advanced",
            },
            {
              name: "Retention Metrics",
              competencies: [
                "repeat order rate",
                "loyalty program usage",
                "customer lifetime value (LTV)",
              ],
              proficiency: "advanced",
            },
            {
              name: "Operational Alignment",
              competencies: [
                "making sure marketing output matches what operations can fulfill",
              ],
              proficiency: "advanced",
            },
          ],
          approach:
            "I ignore vanity metrics. I focus on: Orders, Margin, Repeat business, Capacity impact. If we can't afford it, it's not 'good marketing.' If we can't repeat it, it's not 'a win.'",
        },
      },
    },
    business: {
      profiles: ["hospitality", "both"],
      id: "business",
      title: "Business & Operations",
      icon: "briefcase",
      subcategories: {
        operations: {
          title: "Operational Management",
          description:
            "Running operations in high-volume hospitality and delivery-first food businesses.",
          skills: [
            {
              name: "Daily Operations Oversight",
              competencies: ["service", "flow", "timing"],
              proficiency: "advanced",
            },
            {
              name: "SOP Creation and Rollout",
              competencies: [
                "standardized operating procedures",
                "training documentation",
              ],
              proficiency: "advanced",
            },
            {
              name: "Capacity vs Demand Balancing",
              competencies: [
                "matching marketing output with operational capacity",
              ],
              proficiency: "advanced",
            },
            {
              name: "Inventory and Supplier Control",
              competencies: [
                "purchasing discipline",
                "supplier relationship management",
              ],
              proficiency: "advanced",
            },
            {
              name: "Quality Assurance",
              competencies: [
                "quality control systems",
                "escalation handling",
              ],
              proficiency: "advanced",
            },
            {
              name: "Customer Feedback Loops",
              competencies: [
                "gathering feedback",
                "acting on it",
                "closing the loop",
              ],
              proficiency: "advanced",
            },
          ],
          approach:
            "Operations are the engine. Marketing can promise anything — but only operations can cash that promise. I design operations so they can carry the brand without collapsing under stress.",
        },
        leadership: {
          title: "Team Leadership",
          description:
            "Leading teams in fast, high-pressure environments and structured business/tech work.",
          skills: [
            {
              name: "Recruitment & Onboarding",
              competencies: [
                "hiring the right people",
                "effective onboarding processes",
              ],
              proficiency: "advanced",
            },
            {
              name: "Training & Development",
              competencies: [
                "speed",
                "service",
                "upsell discipline",
                "standards enforcement",
              ],
              proficiency: "advanced",
            },
            {
              name: "Motivation & Retention",
              competencies: [
                "keeping teams engaged",
                "reducing turnover",
              ],
              proficiency: "advanced",
            },
            {
              name: "Delegation with Accountability",
              competencies: [
                "empowering team members",
                "holding them accountable",
              ],
              proficiency: "advanced",
            },
            {
              name: "Conflict Resolution",
              competencies: ["internal conflicts", "guest-facing issues"],
              proficiency: "advanced",
            },
            {
              name: "Cross-functional Leadership",
              competencies: ["ops", "marketing", "tech", "design"],
              proficiency: "advanced",
            },
          ],
          approach:
            "Leadership isn't just scheduling people. Leadership is building people. I make sure teams know the standard, know why it matters, and know how to execute it with confidence. That's how you get consistency without micromanaging.",
        },
        financial: {
          title: "Financial Oversight",
          description:
            "Linking activity to cost and revenue. Tracking budget, spend, and return.",
          skills: [
            {
              name: "Budget Management",
              competencies: [
                "planning and tracking budgets",
                "ensuring spend aligns with goals",
              ],
              proficiency: "advanced",
            },
            {
              name: "Cost Control and Waste Reduction",
              competencies: [
                "identifying and eliminating waste",
                "optimizing costs",
              ],
              proficiency: "advanced",
            },
            {
              name: "Supplier and Purchasing Discipline",
              competencies: [
                "negotiating with suppliers",
                "maintaining cost discipline",
              ],
              proficiency: "advanced",
            },
            {
              name: "Campaign ROI Analysis",
              competencies: [
                "measuring return on marketing spend",
                "adjusting campaigns based on ROI",
              ],
              proficiency: "advanced",
            },
            {
              name: "Forecasting and Impact Planning",
              competencies: [
                "predicting outcomes",
                "planning for different scenarios",
              ],
              proficiency: "advanced",
            },
            {
              name: "Reporting",
              competencies: [
                "plain, direct language for decision-makers",
                "actionable insights",
              ],
              proficiency: "advanced",
            },
          ],
          approach:
            "No fantasy numbers. I track: Real margin, Real spend, Real gain. If the numbers don't work, we adjust the campaign or the offer. Not the math.",
        },
        customer: {
          title: "Customer Experience Design",
          description:
            "Building customer journeys that feel smooth and intentional.",
          skills: [
            {
              name: "Journey Mapping",
              competencies: [
                "from ad → menu → order → follow-up",
                "identifying touchpoints",
              ],
              proficiency: "advanced",
            },
            {
              name: "Consistency Across Touchpoints",
              competencies: [
                "keeping tone and visuals consistent",
                "brand integrity",
              ],
              proficiency: "advanced",
            },
            {
              name: "Feedback Loops",
              competencies: [
                "embedding feedback mechanisms",
                "acting on feedback",
              ],
              proficiency: "advanced",
            },
            {
              name: "Offer & Communication Alignment",
              competencies: [
                "ensuring offers match operational reality",
              ],
              proficiency: "advanced",
            },
            {
              name: "Loyalty Structures",
              competencies: ["rewarding repeat customers"],
              proficiency: "advanced",
            },
            {
              name: "Hospitality-Style Personalization",
              competencies: [
                "translating personalization into digital channels",
              ],
              proficiency: "advanced",
            },
          ],
          approach:
            "Customer experience is brand integrity in real life. If the delivery, tone, and follow-up don't match the promise, the brand loses trust. I design for trust.",
        },
        process: {
          title: "Process Optimization",
          description:
            "Viewing process as infrastructure. Weak process burns money and reputation.",
          skills: [
            {
              name: "Workflow Mapping",
              competencies: [
                "analyzing workflows",
                "identifying bottlenecks",
              ],
              proficiency: "advanced",
            },
            {
              name: "SOP Standardization",
              competencies: [
                "creating clear standard operating procedures",
              ],
              proficiency: "advanced",
            },
            {
              name: "Time and Resource Efficiency",
              competencies: [
                "improving efficiency",
                "reducing waste",
              ],
              proficiency: "advanced",
            },
            {
              name: "Tech / Automation Integration",
              competencies: ["POS", "APIs", "dashboards"],
              proficiency: "advanced",
            },
            {
              name: "Scalability Planning",
              competencies: [
                "planning for higher order volume",
                "planning for more outlets",
              ],
              proficiency: "advanced",
            },
            {
              name: "Continuous Improvement",
              competencies: [
                "analyze → improve → monitor → repeat",
              ],
              proficiency: "advanced",
            },
          ],
          approach:
            "I don't assume 'this is how we do it' is good enough. I treat process like a product: analyze → improve → monitor → repeat.",
        },
        expansion: {
          title: "Expansion & New Openings",
          description:
            "Launching new outlets, onboarding brands, and taking concepts from zero to live.",
          skills: [
            {
              name: "New Outlet Launches",
              competencies: [
                "staffing",
                "training",
                "menu rollout",
                "service structure",
              ],
              proficiency: "advanced",
            },
            {
              name: "Brand Creation",
              competencies: ["identity", "positioning", "pitch"],
              proficiency: "advanced",
            },
            {
              name: "Aggregator Onboarding",
              competencies: [
                "Talabat, Deliveroo, Careem, Noon, Keeta, Amazon 15 Minutes, Instashop, Smiles",
              ],
              proficiency: "advanced",
            },
            {
              name: "Operational Setup",
              competencies: ["SOPs", "inventory", "service rhythms"],
              proficiency: "advanced",
            },
            {
              name: "Digital Presence Foundation",
              competencies: ["website", "socials", "email"],
              proficiency: "advanced",
            },
            {
              name: "Pre-opening Marketing",
              competencies: [
                "offers",
                "exposure plays",
                "influencer and promo alignment",
              ],
              proficiency: "advanced",
            },
          ],
          approach:
            "Opening is not 'grand opening day.' Opening is: Identity, Systems, Capacity, Launch strategy. If those four aren't ready, you're not launching. You're improvising.",
        },
        coordination: {
          title: "Cross-Functional Coordination",
          description:
            "Acting as a bridge between teams: marketing, operations, finance, tech.",
          skills: [
            {
              name: "Marketing ↔ Operations Sync",
              competencies: ["don't sell what you can't serve"],
              proficiency: "advanced",
            },
            {
              name: "Brand ↔ Tech Sync",
              competencies: [
                "website/app reflects the brand and promise",
              ],
              proficiency: "advanced",
            },
            {
              name: "Finance ↔ Marketing Sync",
              competencies: ["budget spend must have measurable ROI"],
              proficiency: "advanced",
            },
            {
              name: "Aggregator ↔ Business Sync",
              competencies: [
                "align promos and visibility with capacity and margin",
              ],
              proficiency: "advanced",
            },
            {
              name: "Team Clarity",
              competencies: [
                "everyone understands goals, timelines, risks",
              ],
              proficiency: "advanced",
            },
            {
              name: "Risk Anticipation",
              competencies: [
                "catch problems before they hit customers",
              ],
              proficiency: "advanced",
            },
          ],
          approach:
            "Alignment is a skill. Most failures I've seen are not technical failures — they're coordination failures. I prevent that.",
        },
        development: {
          title: "Business Development",
          description:
            "Structured expansion: new channels, new concepts, new audiences.",
          skills: [
            {
              name: "Market Expansion / Positioning",
              competencies: [
                "entering new markets",
                "positioning the brand",
              ],
              proficiency: "advanced",
            },
            {
              name: "Partnerships and Negotiation",
              competencies: [
                "aggregators",
                "suppliers",
                "influencers",
                "collaborators",
              ],
              proficiency: "advanced",
            },
            {
              name: "Concept Development",
              competencies: ["building concepts from zero"],
              proficiency: "advanced",
            },
            {
              name: "Multi-brand Management",
              competencies: [
                "restaurants",
                "beverage consulting",
                "cakes/flowers brands",
                "kids' food brands",
              ],
              proficiency: "advanced",
            },
            {
              name: "Aggregator Leverage",
              competencies: ["for exposure and volume"],
              proficiency: "advanced",
            },
            {
              name: "Strategic Planning",
              competencies: ["for sustainable growth"],
              proficiency: "advanced",
            },
            {
              name: "AI and Automation",
              competencies: [
                "exploring AI and automation as value-add, not gimmick",
              ],
              proficiency: "proficient",
            },
          ],
          approach:
            "Business development = controlled growth. I design opportunities that we can execute, measure, and scale — not just announce.",
        },
      },
    },
    soft: {
      profiles: ["both"],
      id: "soft",
      title: "Soft Skills & Languages",
      icon: "users",
      subcategories: {
        languages: {
          title: "Languages & Cultural Adaptability",
          description:
            "Fluent in multiple languages with high cultural adaptability.",
          skills: [
            {
              name: "Languages",
              competencies: ["Russian (fluent)", "English (fluent)", "Armenian (fluent)"],
              proficiency: "native",
            },
            {
              name: "English Journey",
              competencies: [
                "arrived in UAE with almost no English",
                "built fluency through persistence and daily use",
                "high adaptability in multicultural environments",
              ],
              proficiency: "advanced",
            },
            {
              name: "Cultural Adaptability",
              competencies: [
                "working with international teams",
                "understanding different expectations and communication styles",
                "adjusting accordingly",
              ],
              proficiency: "advanced",
            },
          ],
        },
        core: {
          title: "Core Soft Skills",
          description:
            "Skills that make everything else work under pressure.",
          skills: [
            {
              name: "Analytical Thinking",
              competencies: [
                "breaking down complex problems into small, solvable units",
              ],
              proficiency: "advanced",
            },
            {
              name: "Systems Thinking",
              competencies: [
                "considering the long-term effect of decisions",
              ],
              proficiency: "advanced",
            },
            {
              name: "Problem-Solving",
              competencies: [
                "approaching problems with discipline and practicality",
              ],
              proficiency: "advanced",
            },
            {
              name: "Integrity & Reliability",
              competencies: [
                "'My word is my bond' — don't overpromise, don't disappear",
              ],
              proficiency: "advanced",
            },
            {
              name: "Leadership & Mentorship",
              competencies: [
                "building people and raising standards through training",
              ],
              proficiency: "advanced",
            },
            {
              name: "Communication",
              competencies: [
                "direct, clear, consistent",
                "can talk to frontline staff, management, or technical collaborators",
              ],
              proficiency: "advanced",
            },
            {
              name: "Adaptability",
              competencies: [
                "operating in high-pressure service",
                "negotiations",
                "technical build cycles",
              ],
              proficiency: "advanced",
            },
            {
              name: "Persistence & Commitment",
              competencies: [
                "willing to grind for long-term payoff",
              ],
              proficiency: "advanced",
            },
          ],
          approach:
            "Soft skills are not 'extra.' They are what make everything else work under pressure. They are why I can move between hospitality, marketing, tech, and operations — and keep all of them aligned.",
        },
      },
    },
  },
};

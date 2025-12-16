/**
 * Achievements Data
 * Structured data extracted from personalContext/05_achievements&milestones.md
 * Profile-aware content for dynamic filtering
 */

export const achievementsData = {
  categories: [
    {
      id: "hospitality",
      profiles: ["hospitality", "both"],
      title: "Hospitality & Brand Management",
      intro:
        "Consistently taking high-pressure, complex hospitality environments and turning them into stable, reliable, and guest-focused operations.",
      icon: "wine",
      achievements: [
        {
          id: 1,
          title: "Operational Standardization",
          company: "Subah Group",
          description:
            "Worked across 20+ outlets and helped standardize operating procedures, service expectations, and training structures. This created repeatable service quality across different venues instead of relying on individual staff style or luck.",
          impact:
            "Repeatable service quality across 20+ outlets, regardless of individual staff variations.",
          metrics: {
            outlets: "20+",
            scope: "Service standardization",
          },
        },
        {
          id: 2,
          title: "Peak-Hour Stability",
          company: "BFF Sports Bar",
          description:
            "Focused on the most critical window in any high-volume venue: peak hours. Tightened service workflows, enforced consistent training rhythms, and introduced quality checkpoints.",
          impact:
            "Increased ability to handle rush periods without collapsing on service or timing. Guests felt that consistency, which led to stronger repeat visits and a more predictable average check.",
          achievements: [
            "Tightened service workflows",
            "Enforced consistent training rhythms",
            "Introduced quality checkpoints",
            "Improved peak-hour performance",
          ],
        },
        {
          id: 3,
          title: "Systematized Beverage Programs",
          company: "The Cocktail Tree",
          description:
            "Founded The Cocktail Tree to convert hands-on bar experience into structured, sellable systems.",
          deliverables: [
            "Created menu programs that are cost-effective and executable in real conditions",
            "Designed training that improves speed and consistency at the bar",
            "Built playbooks that bars and restaurants can use without physical presence",
          ],
          impact:
            "Converted expertise into scalable systems that venues can implement independently.",
        },
        {
          id: 4,
          title: "Technical Beverage Credibility",
          certifications: ["WSET Level 3 in Wines", "WSET Level 3 in Spirits"],
          description:
            "Earned advanced certifications that provided deep technical domain knowledge, ability to design beverage experiences that hold up under expert scrutiny, and confidence to align menu creativity with profitability.",
          outcomes: [
            "Deep technical domain knowledge",
            "Ability to design beverage experiences under expert scrutiny",
            "Confidence to align menu creativity with profitability",
          ],
        },
      ],
      summary:
        "I don't just make bars 'nice.' I make them consistent, profitable, and scalable as systems.",
    },
    {
      id: "technology",
      profiles: ["dev", "both"],
      title: "Technology & Software",
      intro:
        "Building software that supports real business operations — not just prototypes.",
      icon: "code",
      achievements: [
        {
          id: 1,
          title: "Full-Stack Platform Architecture",
          company: "Vkusno",
          description:
            "Designed and structured a full-stack system for a delivery-first food brand with comprehensive features supporting real business operations.",
          features: [
            "Multi-branch logic: Multiple locations, each with its own coverage/radius and capacity",
            "Secure asset handling: Private AWS S3 bucket access using presigned URLs",
            "Wallet system: Top-ups, full wallet payments, refunds, saved cards, and card removal logic",
            "OTP & Messaging: Login and verification through SMS/WhatsApp/Telegram",
            "Transactional Email: Integrated SendGrid and Amazon SES for reliable communication",
            "Real-time events: Used socket.io to deliver immediate status updates",
          ],
          techStack: [
            "React",
            "Node.js",
            "Express",
            "MongoDB",
            "AWS S3",
            "Stripe",
            "Socket.io",
            "SendGrid",
            "Amazon SES",
            "Twilio",
            "Infobip",
          ],
          impact:
            "Created a robust, scalable platform supporting multi-location restaurant operations with secure payments, real-time communication, and comprehensive user management.",
        },
        {
          id: 2,
          title: "Business-Aligned Architecture",
          description:
            "Mapping real processes — orders, refunds, promotions, delivery coverage, loyalty programs — into schemas and APIs that are secure, extendable, and understandable.",
          approach:
            "I don't just 'write code.' I design systems that reflect real business workflows and can scale with the business.",
          capabilities: [
            "Order management and status workflows",
            "Refund and payment processing",
            "Promotion and discount logic",
            "Delivery coverage and branch routing",
            "Loyalty program implementation",
          ],
        },
        {
          id: 3,
          title: "Brand-Specific AI Assistants",
          description:
            "Building custom GPTs for brand owners, managers, and staff. These assistants reflect the brand's tone, values, and rules.",
          features: [
            "Reflect brand tone, values, and rules",
            "Help prepare customer responses",
            "Generate campaign language",
            "Provide internal guidelines",
            "Offer routine decision support",
          ],
          impact:
            "Practical tools that automate brand-consistent communication and decision support — not generic chatbots.",
        },
      ],
      summary:
        "I use software and AI to create structure, predictability, and control for real businesses.",
    },
    {
      id: "marketing",
      profiles: ["both"],
      title: "Marketing & Growth",
      intro:
        "Connecting brand, marketing, capacity, and profitability into one system.",
      icon: "trending-up",
      achievements: [
        {
          id: 1,
          title: "Aggregator Partnerships & Paid Growth",
          description:
            "Managing relationships, visibility, and ad spend on multiple delivery platforms.",
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
          responsibilities: [
            "Negotiating placements and exposure",
            "Setting and adjusting CPC budgets",
            "Aligning promo mechanics (discounts, caps, cashback) with margin targets",
          ],
          impact:
            "Controlled, profitable growth across multiple platforms without overwhelming operations.",
        },
        {
          id: 2,
          title: "Performance Discipline",
          description:
            "Measuring real outcomes, not vanity numbers. Ensuring scale doesn't kill profit or overwhelm capacity.",
          metrics: [
            "Cost-per-order",
            "Return on ad spend (ROAS)",
            "Net revenue after discounts and caps",
            "Capacity impact per campaign",
          ],
          approach:
            "We scale demand without killing profit or overwhelming the kitchen.",
        },
        {
          id: 3,
          title: "Brand Launch & Activation",
          description: "Taking brands from zero to active in the market.",
          process: [
            "Defined the identity and voice",
            "Set up digital presence (website, socials, professional email)",
            "Onboarded them to aggregators",
            "Built first-wave campaigns (seasonal, loyalty-driven, repeat incentives)",
          ],
          impact: "Complete brand activation from concept to revenue generation.",
        },
        {
          id: 4,
          title: "Trained Marketing Mindset",
          certification: "Google Digital Marketing & E-Commerce Certificate",
          description:
            "Formalized practical marketing knowledge with structured training.",
          competencies: [
            "Funnel thinking",
            "Measurability",
            "Customer experience design",
            "Retention > one-time sale",
          ],
        },
      ],
      summary: "I don't do 'activity.' I do controlled growth.",
    },
    {
      id: "leadership",
      profiles: ["both"],
      title: "Leadership & Development",
      intro: "Building people, teams, and systems that can perform under pressure.",
      icon: "users",
      achievements: [
        {
          id: 1,
          title: "Team Building and Training",
          description:
            "Recruiting, onboarding, and mentoring bartenders, supervisors, and operators — training them not just on 'how to do the job,' but how to understand standards, speed, product knowledge, and customer psychology.",
          impact:
            "Teams that understand why standards matter, not just what they are.",
        },
        {
          id: 2,
          title: "Cross-Functional Leadership",
          description:
            "Running initiatives that touch brand, operations, marketing, and tech simultaneously.",
          teams: ["Designers", "Developers", "Marketers", "Front-line service teams"],
          impact:
            "Seamless launches that feel cohesive to customers despite multiple moving parts behind the scenes.",
        },
        {
          id: 3,
          title: "Scaling Through Structure",
          description:
            "Designing training, SOPs, and communication flows so that teams can run without micromanagement.",
          philosophy:
            "The point is not to be the hero. The point is to build something that works every day.",
          impact: "Self-sustaining teams that maintain standards independently.",
        },
        {
          id: 4,
          title: "Career Transformation",
          description:
            "Deliberately transitioned from 'just hospitality' into full-stack development and marketing strategy using the same pattern applied everywhere else.",
          process: [
            "1. Analyze the system",
            "2. Build a structure",
            "3. Execute with discipline",
          ],
          impact:
            "Ability to bridge hospitality, software, and marketing into one integrated offer.",
          milestone:
            "Personal transformation that expanded value from on-the-ground operator to tech builder, growth driver, and brand strategist.",
        },
      ],
      summary:
        "From on-the-ground operator to someone who can build tech, drive growth, and manage brand direction.",
    },
  ],
  overallSummary: {
    profiles: ["both"],
    title: "Core Achievements Summary",
    points: [
      "Stabilized operations in high-pressure hospitality environments",
      "Built scalable beverage programs and consulting products",
      "Architected real backend systems and frontends for real businesses",
      "Run marketing tied to ROI, capacity, and profitability — not noise",
      "Built and trained teams that execute consistently",
      "Proven ability to evolve and absorb entire new disciplines when needed",
    ],
    conclusion:
      "I build systems that perform in reality and can be trusted to scale.",
  },
};


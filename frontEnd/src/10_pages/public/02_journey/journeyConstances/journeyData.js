/**
 * Journey Page Data
 * Extracted from personalContext/02_professionalJourney.md
 */

export const journeyData = {
  narrative: {
    profiles: ['both'],
    overview: "I began in hands-on hospitality roles (bartender → head bartender → bar manager), progressed into multi-venue leadership and brand building, and since 2024 have layered in technology and data-backed marketing to drive measurable growth.",
    currentFocus: "Today I operate at the intersection of hospitality operations, core marketing and brand strategy, and software and AI-driven tooling."
  },

  roles: [
    {
      id: 1,
      title: "Business Development & Marketing Manager",
      company: "Vkusno",
      location: "Dubai, UAE",
      startDate: "2024-03",
      endDate: null, // Current
      period: "Mar 2024 - Present",
      profiles: ['dev', 'both'],
      category: 'tech',
      type: 'hybrid',
      scope: "Growth, partnerships, core marketing strategy, brand identity, and tech touchpoints (website/app) for an authentic Russian cuisine brand.",
      responsibilities: [
        "Built and managed delivery/aggregator partnerships (Talabat, Careem, Deliveroo, Noon) to streamline operations and customer experience",
        "Planned and executed integrated marketing (SEO, content, social, influencer) aligned to measurable objectives",
        "Led brand identity refinement, including visual direction and messaging consistency",
        "Directed groundwork for website and customer-facing app",
        "Implemented customer feedback loops, loyalty programs, and seasonal/limited-time campaigns",
        "Designed promotions aligned with kitchen capacity to avoid overload",
        "Managed and optimized marketing budget with ROI focus"
      ],
      achievements: [
        "Synced marketing cadence with operational throughput to reduce service bottlenecks",
        "Established a cohesive brand system across all digital surfaces to improve recognition and conversion"
      ],
      tags: ['marketing', 'tech', 'brand', 'aggregators']
    },
    {
      id: 2,
      title: "Founder",
      company: "The Cocktail Tree",
      location: "Dubai, UAE",
      startDate: "2022-01",
      endDate: null, // Current
      period: "Jan 2022 - Present",
      profiles: ['hospitality', 'both'],
      category: 'hospitality',
      type: 'consulting',
      scope: "Beverage consulting and training concept that turns high-level mixology expertise into structured, repeatable services and content.",
      responsibilities: [
        "Defined the consulting brand, service model, and training programs",
        "Built packaged, productized offerings for restaurants and bars (menu development, cost control, staff training)",
        "Established credibility and reach as a systems-driven partner rather than a 'guest bartender'"
      ],
      achievements: [
        "Delivered practical playbooks for beverage programs: cost-effective recipes, menu engineering for margin, upsell logic, and service standards",
        "Built frameworks that venues can actually implement under real pressure"
      ],
      tags: ['consulting', 'beverage', 'training', 'brand']
    },
    {
      id: 3,
      title: "Bar Manager",
      company: "BFF Sports Bar",
      location: "Dubai, UAE",
      startDate: "2018-12",
      endDate: "2024-09",
      period: "Dec 2018 - Sep 2024",
      profiles: ['hospitality', 'both'],
      category: 'hospitality',
      type: 'operations',
      scope: "Full bar operations in a high-volume sports venue, including team leadership, beverage program design, service standards, and event execution.",
      responsibilities: [
        "Led staffing, onboarding, scheduling, and continuous training",
        "Drove cost control, stock management, and supplier relationships",
        "Built and updated cocktail/beer programs; coordinated F&B pairing with kitchen",
        "Set operational KPIs and QA routines to protect quality during peak hours"
      ],
      achievements: [
        "Introduced process improvements that stabilized throughput during high-pressure service without losing quality",
        "Built a guest-focused culture that increased repeat visits and made average check behavior more predictable"
      ],
      tags: ['operations', 'team-leadership', 'beverage', 'high-volume']
    },
    {
      id: 4,
      title: "Outlet Manager & Acting Bar Manager",
      company: "Subah Group / Sheraton Al Khalidiya",
      subCompany: "The 3rd Avenue Pub",
      location: "Abu Dhabi, UAE",
      startDate: "2018-03",
      endDate: "2018-08",
      period: "Mar 2018 - Aug 2018",
      profiles: ['hospitality', 'both'],
      category: 'hospitality',
      type: 'operations',
      scope: "Multi-outlet exposure (20+ venues) with direct responsibility for a flagship pub.",
      responsibilities: [
        "Standardized SOPs, service benchmarks, and staff training across multiple outlets",
        "Contributed to labor planning, capacity balancing, and guest experience refinement",
        "Acted as a link between operations, service, and leadership"
      ],
      achievements: [
        "Rolled out training programs that improved consistency across venues and raised service reliability across shifts"
      ],
      tags: ['multi-outlet', 'standardization', 'training', 'operations']
    },
    {
      id: 5,
      title: "Head Bartender",
      company: "Southern Sun",
      subCompany: "Blu Sky Lounge & Grill",
      location: "Abu Dhabi, UAE",
      startDate: "2015-01",
      endDate: "2016-10",
      period: "Jan 2015 - Oct 2016",
      profiles: ['hospitality', 'both'],
      category: 'hospitality',
      type: 'service',
      scope: "Service leadership and beverage program development in a sports-bar/lounge environment.",
      responsibilities: [
        "Managed peak-hour service while keeping quality and timing consistent",
        "Mentored junior bartenders and developed their speed, accuracy, and product knowledge",
        "Helped evolve and refresh the beverage offering to match guest profile and positioning"
      ],
      achievements: [],
      tags: ['service', 'beverage', 'mentoring', 'peak-service']
    },
    {
      id: 6,
      title: "Bartender → Acting Head Bartender",
      company: "Miramar Al Aqah Beach Resort",
      location: "Fujairah, UAE",
      startDate: "2013-09",
      endDate: "2014-12",
      period: "Sep 2013 - Dec 2014",
      profiles: ['hospitality', 'both'],
      category: 'hospitality',
      type: 'service',
      scope: "High-volume, dual-environment operation: daytime relaxed beach bar service and nighttime club-style atmosphere.",
      responsibilities: [
        "Adapted service style, speed, and menu between completely different day/night formats",
        "Maintained standards under volume with an international customer base",
        "Reinforced guest experience through product range, pace, and consistency"
      ],
      achievements: [],
      tags: ['high-volume', 'adaptability', 'service', 'beach-club']
    },
    {
      id: 7,
      title: "Head Bartender",
      company: "Hotel Metropol Moscow",
      subCompany: "Shalyapin Bar",
      location: "Moscow, Russia",
      startDate: "2013-01",
      endDate: "2013-08",
      period: "Jan 2013 - Aug 2013",
      profiles: ['hospitality', 'both'],
      category: 'hospitality',
      type: 'premium',
      scope: "Premium bar program in a luxury environment with 500+ SKUs.",
      responsibilities: [
        "Led a multicultural bar team in a high-expectation environment",
        "Owned drink presentation, spirits curation, and inventory control",
        "Delivered both technical execution and guest experience at a 'fine service' standard"
      ],
      achievements: [],
      tags: ['premium', 'luxury', 'multicultural', 'fine-service']
    },
    {
      id: 8,
      title: "Bar Back → Bartender",
      company: "Congress Hotel",
      subCompany: "Venice Outlet Bar",
      location: "Yerevan, Armenia",
      startDate: "2011-03",
      endDate: "2013-01",
      period: "Mar 2011 - Jan 2013",
      profiles: ['hospitality', 'both'],
      category: 'hospitality',
      type: 'foundation',
      scope: "Foundational service experience: inventory discipline, hygiene, guest interaction, and teamwork.",
      responsibilities: [
        "Progressed rapidly from bar back to bartender",
        "Added creative, trend-aligned drinks to keep offering current",
        "Began mentoring junior teammates early, even while still growing"
      ],
      achievements: [],
      tags: ['foundation', 'progression', 'creativity', 'mentoring']
    }
  ],

  professionalDevelopment: {
    profiles: ['hospitality', 'both'],
    title: "Mixology Bus Tour — Europe",
    period: "Nov 2016 - May 2017",
    details: "33 countries • 65 cities • 70 venues",
    description: [
      "Immersive study of regional technique, service etiquette, and venue operations",
      "Built an international network of bar professionals and operators",
      "Observed how different markets solve speed, consistency, and experience",
      "Fed these insights back into later leadership, training structures, and program design"
    ],
    tags: ['professional-development', 'networking', 'international']
  },

  themes: {
    profiles: ['both'],
    title: "Cross-Role Themes (What Repeats and Compounds)",
    items: [
      {
        title: "Systems & Standards",
        description: "I build procedures, train teams on them, and enforce quality. This is how consistency scales across shifts, across venues, and across brands."
      },
      {
        title: "Brand Building",
        description: "I shape not just the menu, but the identity: tone, visuals, positioning, and guest experience. I extend that identity across both physical and digital surfaces."
      },
      {
        title: "Operational Pragmatism",
        description: "I align marketing/demand generation (campaigns, promotions, exposure) with actual operational capacity. I don't create traffic that the operation can't support."
      },
      {
        title: "People Development",
        description: "I train and mentor staff so they become confident, fast, and consistent. I build teams that are stable, not constantly rebuilding under stress."
      },
      {
        title: "Tech-Enabled Growth",
        description: "Since 2024, I've connected operations, brand, and marketing with technology: website and app groundwork, loyalty systems and feedback loops, and data-backed marketing campaigns anchored to ROI, not vanity metrics."
      }
    ]
  }
};


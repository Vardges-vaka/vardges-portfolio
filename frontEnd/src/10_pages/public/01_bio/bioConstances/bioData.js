/**
 * Bio Page Data
 * Extracted from personalContext/01-personalOverview&Bio.md
 */

export const bioData = {
  personalInfo: {
    profiles: ['both'],
    name: "Vardges Petrosyan",
    dateOfBirth: "March 2, 1992",
    location: "Dubai, United Arab Emirates",
    languages: [
      { name: "Russian", level: "Fluent" },
      { name: "English", level: "Fluent" },
      { name: "Armenian", level: "Fluent" }
    ]
  },

  intro: {
    dev: {
      title: "Full-Stack Developer & AI Consultant",
      description: "I build scalable web applications and AI-powered systems for real businesses. My focus is on creating tools that reduce chaos and solve operational problems — from delivery platforms and payment systems to custom GPTs and automation frameworks.",
      highlights: [
        "Full-stack development (React, Node.js, MongoDB, AWS)",
        "AI integration and custom GPT development",
        "Restaurant and delivery platform expertise",
        "Backend systems with secure architecture"
      ]
    },
    hospitality: {
      title: "Hospitality Operations & Bar Management Expert",
      description: "Over a decade of experience building and managing high-volume hospitality venues. I specialize in operational systems, beverage program innovation, team leadership, and transforming service quality through structured processes.",
      highlights: [
        "Bar management and beverage consulting",
        "Operational standardization and SOP development",
        "Team training and leadership",
        "Menu engineering and cost control"
      ]
    },
    both: {
      title: "Tech × Hospitality Integration Specialist",
      description: "I operate at the intersection of hospitality, business operations, and technology. For over a decade, I built my career in hospitality — from bartender to bar manager. In recent years, I redirected my energy toward technology and software development, combining my hospitality background with growing expertise in full-stack development.",
      highlights: [
        "Full-stack web applications for hospitality businesses",
        "Operational tools for restaurants and delivery brands",
        "AI-powered systems for real business operations",
        "Systems thinking across technology and service"
      ]
    }
  },

  principles: [
    {
      profiles: ['both'],
      id: 1,
      title: "Reality > Appearance",
      icon: "target",
      description: "I value what works, not what looks good on paper. I don't pitch things I can't deliver. I see authenticity and clarity as more valuable than image.",
      quote: "In both hospitality and tech, I care about execution. I expect systems that can actually survive real usage — busy service, real customers, real money.",
      practical: [
        "Build systems that work in reality, not just in theory",
        "No overpromising — only commitments I can fulfill",
        "Focus on execution over appearance"
      ]
    },
    {
      profiles: ['both'],
      id: 2,
      title: "My Word Is My Bond",
      icon: "handshake",
      description: "If I commit to something, I do it. I don't overpromise. I don't hide from responsibility when things get difficult.",
      quote: "Reputation matters. Reliability is not 'nice,' it's leverage.",
      practical: [
        "Commitments are serious",
        "Follow-through builds trust",
        "Trust is an asset, not a nicety"
      ]
    },
    {
      profiles: ['both'],
      id: 3,
      title: "Systems & Deliberate Problem-Solving",
      icon: "layers",
      description: "I believe in spending serious time understanding a problem before acting. My typical ratio: 70–80% analysis, planning, sharpening the approach; 20–30% execution.",
      quote: "If I had an hour to chop down a tree, I'd spend the first 45 minutes sharpening my axe.",
      practical: [
        "Preparation is not slowing down — it's the condition for doing something properly",
        "Clarity of thought is part of the work, not 'extra'",
        "Choosing one path means not choosing others — I take that seriously"
      ]
    }
  ],

  languageJourney: {
    profiles: ['both'],
    title: "Language Journey / Persistence",
    initialState: "When I first arrived in the UAE, the only English word I knew was 'ok.'",
    challenge: "That forced me into a decision: adapt or be limited.",
    approach: [
      "Studied through immersion, constant interaction, and trial-and-error, not just textbooks",
      "Pushed through discomfort, frustration, and embarrassment in real working environments",
      "Treated language as a tool I had to win, not something I might get 'eventually'"
    ],
    outcomes: [
      "English fluency",
      "Cultural adaptability",
      "Ability to operate in global, mixed teams"
    ],
    lessonsLearned: [
      "Persistence under pressure",
      "Willingness to rebuild myself from zero",
      "Zero fear of starting as a beginner in a new field"
    ],
    impact: "These same habits now drive how I approach software, systems thinking, and business."
  },

  careerDirection: {
    dev: {
      title: "Technology & Development",
      description: "Technology is not just coding. For me, it's about solving real operational problems.",
      focus: [
        "Full-stack web development",
        "AI-powered tools and automation",
        "Restaurant and delivery platforms",
        "Backend systems with secure architecture"
      ],
      questions: [
        "How do we handle delivery logic?",
        "How do we control cost and margin with discounts and aggregators?",
        "How do we automate repetitive decisions so humans can focus on higher-value judgment?"
      ],
      philosophy: "I don't build 'apps for fun.' I build tools that reduce chaos."
    },
    hospitality: {
      title: "Hospitality Operations",
      description: "Hospitality is not something I 'left.' It's my backbone.",
      focus: [
        "Bar management and consulting",
        "Beverage program design and innovation",
        "Operations optimization and standardization",
        "Team training and leadership"
      ],
      openTo: [
        "Consulting opportunities",
        "Operations management",
        "Training and development",
        "Direct hands-on work with meaningful culture"
      ],
      philosophy: "Hospitality, to me, is driven by who you work under. The team and management culture decide whether the job has purpose."
    },
    both: {
      title: "Integrated Approach",
      description: "I build systems that merge hospitality operations, software automation, and marketing strategy.",
      focus: [
        "Software tools for restaurants and delivery brands",
        "Designing operational flows and internal logic (payments, delivery areas, order handling)",
        "Creating structured marketing and retention systems",
        "Developing AI-driven assistants that support actual day-to-day work"
      ],
      philosophy: "This is not a career 'switch.' It's an expansion. I am combining what I learned on the floor with what I'm now building in code."
    }
  },

  workPhilosophy: {
    profiles: ['both'],
    sections: [
      {
        title: "How I Think About Work",
        areas: [
          {
            name: "Technology",
            description: "Technology is about solving real operational problems, not just coding apps for fun."
          },
          {
            name: "Marketing",
            description: "Marketing is strategy and positioning first — not just posting content. Social media and ads are deployment tools, not the root strategy."
          },
          {
            name: "Hospitality",
            description: "Hospitality is my backbone. I'm open to opportunities if the culture is serious, leadership has standards, and direction is meaningful."
          }
        ]
      }
    ]
  },

  futureDirection: {
    profiles: ['both'],
    title: "What Comes Next",
    vision: "Use technology, systems thinking, and structured marketing to fix real problems in hospitality and delivery businesses.",
    approach: [
      "Build processes and tools that are repeatable, not just one-off solutions",
      "Operate in spaces where discipline, creativity, and practicality all matter at the same time"
    ],
    summary: "I build things that work, and I build them to last."
  }
};


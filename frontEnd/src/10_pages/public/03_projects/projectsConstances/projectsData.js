/**
 * Projects Page Data
 * Extracted from personalContext/ME.txt projects section
 */

export const projectsData = {
  categories: {
    tech: {
      profiles: ['dev', 'both'],
      title: "Technology Projects",
      description: "Full-stack applications, AI integration, and software solutions for real businesses",
      projects: [
        {
          id: 1,
          name: "Vkusno Full-Stack Platform",
          category: "tech",
          type: "Full-Stack Web Application",
          period: "2024 - Present",
          description: "Complete restaurant delivery platform with multi-branch logic, secure architecture, and comprehensive business features",
          techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'AWS S3', 'Stripe', 'Socket.io', 'SendGrid', 'Twilio', 'Google Maps API'],
          features: [
            "Multi-branch system with individual coverage areas and capacity management",
            "Secure file handling via AWS S3 with presigned URLs",
            "Complete wallet system: top-ups, refunds, full/partial payments, saved cards",
            "OTP verification flows via SMS, WhatsApp, and Telegram",
            "Transactional email integration (SendGrid, Amazon SES)",
            "Real-time updates with Socket.io",
            "JWT authentication with token blacklisting",
            "Role-based access control",
            "Order management with status workflows",
            "Delivery coverage area logic with branch routing"
          ],
          metrics: {
            impact: "Operational platform supporting multi-branch restaurant with secure payments and real-time communication"
          },
          highlights: [
            "Schemas map to actual business processes",
            "APIs are secure, predictable, and easy to extend",
            "Frontend is clear, fast, and multilingual"
          ]
        },
        {
          id: 2,
          name: "Custom GPT Development",
          category: "tech",
          type: "AI Integration",
          period: "2024 - Present",
          description: "Brand-specific GPT assistants tailored to business owners, managers, and staff for operational support",
          techStack: ['ChatGPT', 'OpenAI API', 'Prompt Engineering'],
          features: [
            "Custom instructions aligned with brand identity",
            "Content structuring and drafting assistance",
            "Customer interaction templates",
            "Internal process support",
            "Brand voice consistency enforcement"
          ],
          metrics: {
            impact: "Practical AI tools that help businesses manage tasks more efficiently"
          },
          highlights: [
            "Not generic chatbots — tailored to specific brand needs",
            "Translates brand rules into usable assistants",
            "Supports routine decision-making aligned with standards"
          ]
        },
        {
          id: 3,
          name: "The Cocktail Tree Website",
          category: "tech",
          type: "Business Website",
          period: "2022 - Present",
          description: "Professional website for beverage consulting brand with service showcase and content platform",
          techStack: ['React', 'Node.js', 'CSS3'],
          features: [
            "Service offering presentation",
            "Portfolio and case studies",
            "Content management",
            "Contact and inquiry forms",
            "Responsive design"
          ],
          metrics: {
            impact: "Online presence supporting ~5,000 LinkedIn followers and consulting inquiries"
          }
        }
      ]
    },
    brands: {
      profiles: ['both'],
      title: "Brand Development",
      description: "End-to-end brand creation from concept to market-ready identity",
      projects: [
        {
          id: 4,
          name: "Vkusno Brand Development",
          category: "brands",
          type: "Full Brand Creation",
          period: "2024",
          description: "Complete brand development for authentic Russian cuisine restaurant: from naming concept to fully operational digital presence",
          deliverables: [
            "Brand identity and visual system",
            "Logo design and brand book",
            "Website development and hosting setup",
            "Social media channel creation and strategy",
            "Professional email setup and signatures",
            "Menu design and packaging language",
            "Aggregator presence (Talabat, Deliveroo, Careem, Noon)",
            "Marketing campaign structure",
            "Custom GPT for business management"
          ],
          metrics: {
            impact: "Fully operational restaurant brand with cohesive identity across all touchpoints"
          },
          highlights: [
            "Transformed idea into market-ready brand",
            "Integrated marketing with operational capacity",
            "Built systems for sustainable growth"
          ]
        },
        {
          id: 5,
          name: "Bloome (Cakes & Flowers)",
          category: "brands",
          type: "Brand Concept",
          period: "2024",
          description: "Brand development for cakes and flowers delivery concept",
          deliverables: [
            "Brand name and concept",
            "Logo design",
            "Visual identity system",
            "Social media presence",
            "Coming soon website",
            "Brand positioning"
          ],
          metrics: {
            impact: "Brand ready for market launch with complete identity package"
          }
        },
        {
          id: 6,
          name: "Little Almonds (Kids Healthy Food)",
          category: "brands",
          type: "Brand Concept",
          period: "2024",
          description: "Brand development for kids-focused healthy food concept",
          deliverables: [
            "Brand name and concept",
            "Logo design",
            "Visual identity system",
            "Target market positioning",
            "Brand messaging for parents",
            "Social media groundwork"
          ],
          metrics: {
            impact: "Complete brand package ready for operational phase"
          }
        }
      ]
    },
    bar: {
      profiles: ['hospitality', 'both'],
      title: "Bar & Beverage Innovation",
      description: "Operational improvements and creative concepts that transformed beverage programs",
      projects: [
        {
          id: 7,
          name: "House Crafts",
          category: "bar",
          type: "Beverage Innovation Program",
          venue: "BFF Sports Bar",
          period: "2020 - 2024",
          description: "Revolutionary in-house craft program creating liqueurs, syrups, and bitters to reduce costs and create unique identity",
          challenge: "24 beer taps wasting 2-3 pints per tap daily, expensive imported liqueurs limiting promotional capabilities",
          solution: [
            "Converted home into mixology lab during COVID lockdown",
            "Developed house-made liqueurs replicating premium products at fraction of cost",
            "Created signature craft line (liqueurs, bitters, pre-batched cocktails)",
            "Built exclusive identity around house crafts"
          ],
          metrics: {
            costReduction: "Cocktail costs from AED 18 down to AED 4-5",
            profitability: "Beverage cost ratio from 60-70% to 20-30%",
            salesGrowth: "30-40 cocktails/month to 2,000+",
            identity: "Exclusive in-house craft line"
          },
          impact: "Reshaped guest experience, created signature identity, demonstrated how operational challenges transform into innovation and profitability"
        },
        {
          id: 8,
          name: "Our Competition",
          category: "bar",
          type: "Staff Engagement Initiative",
          venue: "BFF Sports Bar",
          period: "2021 - 2022",
          description: "Monthly in-house cocktail challenge turning slow-moving inventory into innovation and team bonding",
          challenge: "Slow-moving inventory tying up costs and taking shelf space",
          solution: [
            "Monthly cocktail challenge using underutilized products",
            "Cross-department judging (kitchen, floor, finance staff)",
            "Winner rewards: vouchers, gifts, cash bonuses",
            "Winning cocktail featured on menu for full month with BOGO promotion",
            "Waiters compete to sell the most, kitchen pairs best dishes"
          ],
          metrics: {
            salesGrowth: "Slow-moving products transformed into menu stars",
            engagement: "Broke silos between departments, fostered collaboration and pride",
            customerExcitement: "Guests asked about 'winning cocktail of the month'",
            culture: "Evolved into place of ongoing creativity and innovation"
          },
          impact: "Staff gained ownership and pride, inventory problem became win-win for team and guests"
        },
        {
          id: 9,
          name: "BFF's Weekly Tasting Experience",
          category: "bar",
          type: "Customer Experience Program",
          venue: "BFF Sports Bar",
          period: "2020 - 2021",
          description: "Weekly Saturday tasting events exploring drinks categories with education and entertainment",
          challenge: "Stockroom full of underutilized bottles post-COVID lockdown",
          solution: [
            "Saturday evening tasting sessions hosted personally",
            "Curated lineups of rums, whiskies, gins, sparkling wines, craft beers, cocktails",
            "Complementary food pairings with kitchen team",
            "Narrated history, craftsmanship, and unique features with microphone",
            "Free tastings creating excitement and goodwill"
          ],
          metrics: {
            attendance: "From 50-55 initial participants to 200+ guests every Saturday",
            duration: "Ran for 9 months straight",
            productMovement: "Dead stock became highlights, boosted sales and visibility",
            positioning: "Positioned BFF as more than sports bar — hub for beverage education"
          },
          impact: "Guests weren't just drinking — they were learning and engaging, solving stock issue while elevating reputation"
        }
      ]
    },
    marketing: {
      profiles: ['both'],
      title: "Marketing & Growth",
      description: "Data-driven campaigns, aggregator growth, and ROI-focused initiatives",
      projects: [
        {
          id: 10,
          name: "Multi-Aggregator Growth Campaign",
          category: "marketing",
          type: "Digital Marketing & Growth",
          period: "2024 - Present",
          description: "Comprehensive aggregator strategy across major platforms with ROI-driven advertising",
          platforms: [
            "Talabat",
            "Deliveroo",
            "Careem",
            "Noon",
            "Keeta",
            "Amazon 15 Minutes",
            "Instashop",
            "Smiles by Etisalat"
          ],
          approach: [
            "Built and managed partnerships with Key Account Managers",
            "Set and optimized CPC budgets across platforms",
            "Tracked performance through aggregator dashboards",
            "Designed promotion mechanics (discounts, caps, cashback)",
            "Aligned offers with operational capacity and margin goals",
            "Separated basket value from net revenue for true ROI"
          ],
          metrics: {
            focus: "Cost-per-order, ROAS, net revenue after discounts",
            approach: "Profitable volume growth vs. chaotic traffic spikes",
            diversification: "Reduced dependency on single platform"
          },
          impact: "Controlled growth through disciplined spend management and capacity-aligned campaigns"
        },
        {
          id: 11,
          name: "Brand Launch & Positioning",
          category: "marketing",
          type: "Integrated Marketing",
          period: "2024",
          description: "End-to-end marketing for new restaurant brand launch",
          components: [
            "Brand identity and messaging",
            "Pre-launch buzz building",
            "Aggregator onboarding and visibility",
            "Influencer collaboration strategy",
            "Seasonal and loyalty campaigns",
            "SEO and content strategy",
            "Email marketing flows",
            "Social media calendar"
          ],
          approach: [
            "Connected advertising spend to ROI",
            "Ensured campaigns matched service capacity",
            "Built retention paths, not just acquisition",
            "Tracked real metrics: orders, margin, repeat business"
          ],
          impact: "Brand recognition translating into orders and retention, not just reach"
        }
      ]
    }
  },

  overview: {
    profiles: ['both'],
    statement: "My projects span technology, hospitality, and business development — reflecting both my operational roots and expansion into software, AI, and growth strategy. Each project demonstrates systems thinking, practical execution, and measurable impact."
  }
};


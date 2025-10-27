# Skills & Expertise

## 1. Technical (Web & Software)

### Frontend Development

I build modular, scalable, and user-friendly interfaces with a focus on clarity, reusability, and performance. I align UI decisions with real business requirements (conversion, trust, usability) and with operational flow.

**Core Competencies**

- **JavaScript (ES6+)** — asynchronous logic, modular structure, DOM manipulation.
- **React** — component-based architecture, custom hooks, Context API for shared/global state, reusable UI components.
- **Vite** — fast local development and optimized production builds for React apps.
- **HTML5 & CSS3** — semantic markup and responsive layout.
- **Bootstrap** — rapid prototyping and layout scaffolding prior to building final custom components.
- **i18n / Localization** — multilingual UI handling, including dynamic language switching and translation structures.
- **Figma** — translating designs into production-ready components, aligning UI/UX with brand identity.

**Approach**
My frontend philosophy is:

- Keep components clean, readable, and reusable.
- Avoid one-off logic that can’t scale.
- Design for growth: features should be easy to extend without refactoring the whole codebase.
- Prioritize user experience: fast load, clear flows, no friction.

---

### Backend Development

My backend work is built on Node.js and Express. I focus on security, structure, and maintainability. I design backends that directly reflect real business logic — not just demo APIs.

**Core Competencies**

- **Node.js & Express** — REST API design, routing, middleware chains, validation, error handling.
- **Authentication & Security**
  - JWT-based auth
  - Password hashing (middleware)
  - Token blacklist / invalidation
  - Role-based access control
- **File Uploads & Storage**
  - Multer for uploads
  - AWS SDK integration
  - Private S3 buckets with presigned URLs (secure access without exposing buckets publicly)
- **Business Logic Implementation**
  - Users / Admins
  - Orders (status workflow, items, payments)
  - Campaigns / Discounts
  - Wallet / Transactions
  - Delivery coverage areas and branch logic
- **Security Hardening**
  - Rate limiting
  - CORS configuration
  - Secure headers
- **Email & Notifications**
  - SendGrid / Amazon SES / Nodemailer
  - OTP flows, onboarding emails, transactional emails
- **Real-Time Communication**
  - socket.io for live status updates, notifications, etc.

**Supporting Tools (Familiar)**

- **Winston** — structured application logging
- **Morgan** — HTTP request logging
- **node-cron** — background/scheduled jobs

**Approach**
I structure backend code into layers:

- Routes → Controller → Service → Data access
  This keeps logic testable, debuggable, and extendable.

I design APIs with:

- Predictable responses
- Clear error handling
- Practical security defaults
- Direct support for real-world flows (refunds, OTP, restricted content, etc.)

---

### Databases

I mainly use MongoDB with Mongoose. I design schemas that match how the business actually operates.

**Core Competencies**

- **MongoDB**
  - CRUD operations
  - Indexing and query optimization
  - Handling growth in collection size
- **Mongoose**
  - Schema definition and validation
  - Pre/post middleware
  - `populate` for references
  - Lean queries for performance
- **Schema Design**  
  I’ve modeled systems such as:
  - **Users & Admins** (roles, tokens, auth state)
  - **Orders** (items, price breakdown, status pipeline, payment info)
  - **Menu Items** (images, categories, descriptions)
  - **Campaigns & Discounts** (promo caps, cashback logic, loyalty rules)
  - **Wallet & Transactions** (top-ups, refunds, partial payments)
  - **Delivery Coverage Areas** (branch-based service areas and enforcement)
- **Error Handling**
  - Duplicate keys
  - Invalid schema input
  - Relationship integrity

**Approach**
I treat database design as structural risk control.

If the schema is wrong:

- The business can’t scale.
- Reporting becomes unreliable.
- Security gaps open.

So I design schemas to:

- Reflect real workflows
- Be safe to extend
- Keep queries efficient under load

---

### Payments, Messaging & Maps

I build and integrate core features that make an application usable in the real world: payments that work, communication that reaches the user, and delivery logic that knows where the user is.

**Core Competencies**

- **Stripe**
  - Wallet system (top-ups, balance usage as full/partial payment)
  - Refund handling
  - Saving/removing payment methods
- **SendGrid**
  - Transactional email (registration, verification, status updates)
- **Amazon SES**
  - Scalable email delivery for cost-effective transactional messaging
- **Twilio / Infobip**
  - OTP via SMS, WhatsApp, Telegram
- **Google Maps API**
  - Address lookup and selection during registration
  - Rendering map data for user confirmation
  - Laying groundwork for delivery coverage logic and branch routing

**Supporting Tools (Familiar)**

- **Nodemailer** — lightweight email handling when full ESP setup isn’t required
- **Webhook Integrations** — reacting to external provider events (payment status, message delivery, etc.)

**Approach**
Payments and messaging are about trust. If they fail, the whole product feels unreliable.

My priorities:

- Security
- Predictability
- Clear user experience (no confusion about what happened with their order, payment, or OTP)

All integrations are built so they can scale as order volume and customer base grow.

---

## 2. Marketing & Growth

### Marketing Foundations

For me, marketing is not “post and boost.” Marketing starts with positioning, offer design, and capacity planning.

**Core Competencies**

- **Positioning & Strategy** — define who we are, who we’re for, what problem we’re solving.
- **Value Proposition Design** — explain clearly why someone should choose us, in their language.
- **Campaign Planning** — loyalty pushes, seasonal promos, retention campaigns, new menu launches.
- **Offer Design**
  - % discounts with caps
  - Cashback structures
  - Bundled incentives
  - Offers that drive volume but don’t destroy margin
- **Operational Alignment**
  - Campaigns must match production capacity
  - No promo that overwhelms kitchen / dispatch
- **Measurement & Feedback** — track performance, gather feedback, and iterate.

**Approach**
I don’t launch noise. I launch systems:

- The offer
- The capacity plan
- The fulfillment plan
- The retention path

If those four aren’t aligned, it’s not a real strategy.

---

### Digital Marketing & Advertising

I treat digital as an extension of strategy. The tools (SEO, social, CPC ads, etc.) are there to execute what’s already defined.

**Core Competencies**

- **SEO** — keyword targeting, structure, and technical hygiene to drive organic visibility.
- **Content Strategy**
  - I am not a “content creator.”
  - I take raw assets (video, photos, copy) and turn them into structured, branded campaigns.
- **Social Media / Influencers**
  - Calendar planning
  - Collaboration with influencers and bloggers
  - Balancing organic reach with paid spend
- **CPC & Paid Ads**
  - Budget setting
  - Bid management
  - Performance review tied to conversion, not impressions
- **Email Marketing**
  - Automated onboarding / welcome flows
  - Retention / reactivation messaging
  - Transactional + promotional split using SendGrid / SES
- **Performance Analytics**
  - Cost-per-order
  - Return on ad spend (ROAS)
  - Customer acquisition cost (CAC)
  - Conversion tracking

**Approach**
I only consider a campaign “successful” if:

- It brings in orders we can handle
- At a cost we can afford
- From customers we can retain

Impressions and likes are meaningless without repeatable sales.

---

### Aggregator Growth & Partnerships

In the UAE, aggregators are not optional — they’re distribution infrastructure. I’ve managed real relationships and performance with Talabat, Deliveroo, Careem, Noon, Keeta, Amazon 15 Minutes, Instashop, and Smiles by Etisalat.

**Core Competencies**

- **Aggregator Partnerships**
  - Onboarding brands
  - Negotiating placements and visibility
  - Working with KAMs to secure exposure
- **CPC Campaigns**
  - Budget allocation and optimization in aggregator dashboards
  - Measuring conversion vs spend
- **ROI & Profitability**
  - Reading aggregator data correctly:
    - “Gross basket value” before discount
    - vs “Net revenue” after promo caps and commission
- **Menu / Catalog Management**
  - Structuring items and categories for conversion
  - Maintaining brand alignment across platforms
- **Promotions & Loyalty**
  - Discount logic (e.g. “50% off up to AED 30 cap”)
  - Cashback structures
  - Repeat-order incentives
- **Cross-Platform Coordination**
  - Running consistent strategy across multiple aggregators
  - Avoiding dependency on a single platform

**Approach**
I use aggregators as partners, not landlords.

That means:

- We chase visibility, but not at any cost.
- We measure outcome per dirham spent.
- We keep volume aligned to operational capacity.

The result: controlled growth instead of chaos.

---

### Brand Building & Customer Engagement

Brand isn’t just a logo. Brand is whether the experience, the tone, and the delivery all match what you promised.

I often build brands from zero — starting with only a name or concept — and turn them into something that’s ready to face the market.

**Core Competencies**

- **Logo Direction & Identity Systems**
  - Visual language
  - Typography
  - Color palette
  - Voice and tone
- **Brand Books / Guidelines**
  - Rules for usage
  - How the brand speaks, looks, behaves
- **End-to-End Brand Setup**
  - Social channels
  - Website / domain setup (“coming soon” → full site)
  - Professional email + signature
  - Menu / packaging language
- **Custom GPT Development**
  - Building brand-specific GPT assistants for owners/managers/staff
  - Automating structured responses, content drafts, and internal support in the brand’s voice
- **Storytelling & Messaging**
  - Communicating what the brand stands for and why it matters
- **Customer Experience Integration**
  - Making sure what the customer sees on aggregators, on Instagram, and in their delivery bag feels like one brand
- **Loyalty & Retention**
  - Cashback
  - Referral incentives
  - Repeat-order hooks
- **Influencer / Community Activation**
  - Coordinating with local voices to build credibility and trust
- **Cross-Channel Consistency**
  - No mismatch between delivery apps, website, socials, and physical touchpoints

**Approach**
I don’t hand over “a logo.”  
I hand over an operating identity:

- Visual
- Operational
- Communication
- Loyalty
- AI support tools

The result: a brand that can actually run.

---

### Data & Measurement

I don’t guess performance. I track it.

**Core Competencies**

- **ROI Analysis**
  - Per platform (Talabat / Deliveroo / Careem / Noon / Keeta / etc.)
  - Per campaign
- **CPC & Spend Tracking**
  - Cost-per-order
  - ROAS
  - CAC
- **Revenue Clarity**
  - Breaking down gross basket value vs net revenue after discounts and caps
- **Performance Dashboards**
  - Building spreadsheets/reports that compare:
    - Order volumes
    - Spend
    - Retention
    - Efficiency month-over-month
- **Retention Metrics**
  - Repeat order rate
  - Loyalty program usage
  - Customer lifetime value (LTV)
- **Operational Alignment**
  - Making sure marketing output matches what operations can fulfill

**Approach**
I ignore vanity metrics.

I focus on:

- Orders
- Margin
- Repeat business
- Capacity impact

If we can’t afford it, it’s not “good marketing.” If we can’t repeat it, it’s not “a win.”

---

## 3. Business & Operations

### Operational Management

I’ve run operations in high-volume hospitality environments and delivery-first food businesses. My focus is system stability under pressure.

**Core Competencies**

- Daily operations oversight (service, flow, timing)
- SOP creation and rollout
- Capacity vs demand balancing
- Inventory and supplier control
- Quality assurance and escalation handling
- Customer feedback loops
- Cross-functional coordination between floor, kitchen, delivery, and marketing

**Approach**
Operations are the engine.  
Marketing can promise anything — but only operations can cash that promise.

I design operations so they can carry the brand without collapsing under stress.

---

### Team Leadership

I lead teams in fast, high-pressure environments and also in structured business/tech work.

**Core Competencies**

- Recruitment & Onboarding
- Training & Development (speed, service, upsell discipline, standards)
- Motivation & Retention
- Delegation with accountability
- Conflict resolution (internal and guest-facing)
- Cross-functional leadership (ops, marketing, tech, design)

**Approach**
Leadership isn’t just scheduling people.  
Leadership is building people.

I make sure teams:

- Know the standard
- Know why it matters
- Know how to execute it with confidence

That’s how you get consistency without micromanaging.

---

### Financial Oversight

I link activity to cost and revenue. I track budget, spend, and return — whether in bar ops or in paid marketing.

**Core Competencies**

- Budget management
- Cost control and waste reduction
- Supplier and purchasing discipline
- Campaign ROI analysis
- Forecasting and impact planning
- Reporting in plain, direct language for decision-makers

**Approach**
No fantasy numbers.

I track:

- Real margin
- Real spend
- Real gain

If the numbers don’t work, we adjust the campaign or the offer. Not the math.

---

### Customer Experience Design

I build customer journeys that feel smooth and intentional, both online and offline.

**Core Competencies**

- Mapping the full service journey (from ad → menu → order → follow-up)
- Keeping tone and visuals consistent across every touchpoint
- Embedding feedback loops and acting on them
- Ensuring offers and communication match operational reality
- Designing loyalty structures that reward repeat customers
- Translating hospitality-style personalization into digital channels

**Approach**
Customer experience is brand integrity in real life.

If the delivery, tone, and follow-up don’t match the promise, the brand loses trust. I design for trust.

---

### Process Optimization

I view process as infrastructure. If your process is weak, you burn money and reputation.

**Core Competencies**

- Workflow mapping and bottleneck analysis
- SOP standardization
- Time and resource efficiency improvements
- Tech / automation integration (POS, APIs, dashboards)
- Scalability planning for higher order volume or more outlets
- Continuous improvement loops

**Approach**
I don’t assume “this is how we do it” is good enough.  
I treat process like a product: analyze → improve → monitor → repeat.

---

### Expansion & New Openings

I’ve launched new outlets, onboarded brands to aggregators, and taken concepts from zero to live.

**Core Competencies**

- New outlet launches (staffing, training, menu rollout, service structure)
- Brand creation (identity, positioning, pitch)
- Aggregator onboarding (Talabat, Deliveroo, Careem, Noon, Keeta, Amazon 15 Minutes, Instashop, Smiles)
- Operational setup (SOPs, inventory, service rhythms)
- Digital presence foundation (website, socials, email)
- Pre-opening marketing (offers, exposure plays, influencer and promo alignment)
- Cross-functional readiness (ops + marketing + finance synced before launch)

**Approach**
Opening is not “grand opening day.”  
Opening is:

1. Identity
2. Systems
3. Capacity
4. Launch strategy

If those four aren’t ready, you’re not launching. You’re improvising.

---

### Cross-Functional Coordination

I act as a bridge between teams that usually don’t talk clearly to each other: marketing, operations, finance, tech, and external platforms.

**Core Competencies**

- Marketing ↔ Operations sync
  - Don’t sell what you can’t serve
- Brand ↔ Tech sync
  - Make sure the website/app actually reflects the brand and promise
- Finance ↔ Marketing sync
  - Budget spend must have measurable ROI
- Aggregator ↔ Business sync
  - Align promos and visibility with capacity and margin
- Team Clarity
  - Everyone understands goals, timelines, risks
- Risk Anticipation
  - Catch problems (overload, rollout breaks, mismatch in messaging) before they hit customers

**Approach**
Alignment is a skill.

Most failures I’ve seen are not technical failures — they’re coordination failures. I prevent that.

---

### Business Development

I approach business development as structured expansion: new channels, new concepts, new audiences, new revenue lines.

**Core Competencies**

- Market expansion / positioning
- Partnerships and negotiation (aggregators, suppliers, influencers, collaborators)
- Concept development from zero
- Multi-brand management (restaurants, beverage consulting, cakes/flowers brands, kids’ food brands)
- Aggregator leverage for exposure and volume
- Strategic planning for sustainable growth
- Exploring AI and automation as value-add, not gimmick

**Approach**
Business development = controlled growth.

I design opportunities that we can execute, measure, and scale — not just announce.

---

## 4. Soft Skills & Languages

### Languages & Cultural Adaptability

- **Languages:** Russian, English, Armenian (fluent)
- **English Journey:**  
  Arrived in the UAE with almost no English (literally only “ok”). Built fluency through persistence, daily use, and stress.  
  Result: high adaptability and confidence in multicultural environments.
- **Cultural Adaptability:**  
  Years in Dubai working with international teams, customers, suppliers, and account managers. I understand different expectations, cultural styles, and communication tones, and I adjust accordingly.

---

### Core Soft Skills

- **Analytical Thinking** — I break down complex problems into small, solvable units.
- **Systems Thinking** — I always consider the long-term effect of decisions, not just the immediate task.
- **Problem-Solving** — I approach problems with discipline and practicality, not panic.
- **Integrity & Reliability** — “My word is my bond” is literal for me. I don’t overpromise and I don’t disappear.
- **Leadership & Mentorship** — I build people and raise standards through training, not shouting.
- **Communication** — I’m direct, clear, and consistent. I can talk to frontline staff, management, or technical collaborators without losing clarity.
- **Adaptability** — I can operate in high-pressure service, in a negotiation, or inside a technical build cycle.
- **Persistence & Commitment** — I’m willing to grind for long-term payoff. I’ve already done it in hospitality, language, marketing, and now tech.

**Approach**
Soft skills are not “extra.”  
They are what make everything else work under pressure.

They are why I can move between hospitality, marketing, tech, and operations — and keep all of them aligned.

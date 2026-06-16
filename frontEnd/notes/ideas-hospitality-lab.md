# HOSPITALITY / BAR LAB — interactive, game-like pieces

Replayable in 30–90s, shareable, mostly client-side. The cocktail **builder** already exists — none of these repeat it. Ordered best-first.

---

### 1. Guess the Cocktail — blind-tasting daily challenge
**What it is:** A daily puzzle: you're shown a drink as ratios + tasting notes + a colour swatch + a silhouette glass (no name), and you guess the classic in as few clues as possible. Fewer clues = higher score. Streaks, a daily seed everyone gets the same of, and a share card ("Got the Sazerac in 2 clues").
**Claude handles:** Recipe/clue database, the progressive-reveal mechanic, daily-seeded puzzle, streak + local leaderboard, share card, i18n.
**You provide:** Optional — your signature serves as bonus "expert" rounds; otherwise classics only.
**Wow / Effort:** Wow: high · Effort: M

### 2. Speed Rail — bartender reflex game
**What it is:** Tickets fly in ("Negroni!", "Old Fashioned!", "Margarita!") and you grab the right bottles/tools from the rail in the correct order before the ticket times out. Escalating rush, combo multipliers for a clean run, "86'd" if you fall behind. The closest thing to the Friday-night feeling, as a game.
**Claude handles:** The rail UI, order generator from a recipe DB, sequence-matching + combo scoring, difficulty ramp, share, i18n.
**You provide:** Nothing, fully buildable.
**Wow / Effort:** Wow: high · Effort: M

### 3. The Cocktail Family Tree — interactive genealogy (reuses your graph engine)
**What it is:** The Old Fashioned begat the Sazerac begat… an explorable family tree of how classics descend and mutate from a handful of "mother" templates. Click a node for the one-line history and the spec; filter by base spirit or era. Uses the exact d3-force graph you already own, turned to the bar.
**Claude handles:** The genealogy data + graph (reuse the engine), history blurbs, filters, i18n.
**You provide:** Optional — your own annotations/opinions on the lineage; otherwise I research it.
**Wow / Effort:** Wow: high · Effort: M

### 4. Pour-Cost Lab — your consultancy tool, playable
**What it is:** The real Cocktail Tree tool as a toy: enter bottle price/size + a recipe + your sell price and instantly see pour cost %, margin, and where the drink lands on a **menu-engineering quadrant** (Star / Plow-horse / Puzzle / Dog). It quietly proves you think like an operator, not just a bartender. Doubles as a lead magnet for consults.
**Claude handles:** The calculator, the popularity-vs-profit quadrant viz, preset ingredient prices, shareable result, i18n.
**You provide:** Nothing — optional real UAE supplier prices to seed it.
**Wow / Effort:** Wow: high · Effort: S-M

### 5. Flavour Wheel — interactive pairing explorer (graph reuse)
**What it is:** A radial flavour wheel; tap a spirit or note (smoky, citrus, bitter, herbal…) and the wheel lights the things that pair, with a one-line "why." Slide toward "safe ↔ adventurous" to get bolder suggestions. A beautiful, genuinely useful toy that shows your palate.
**Claude handles:** The radial wheel canvas, the pairing graph + reasoning, the safe↔adventurous slider, i18n.
**You provide:** Your pairing logic as data (your expertise is the value here) — or I draft it and you correct.
**Wow / Effort:** Wow: high · Effort: M

### 6. The Perfect Pour — free-pour timing game
**What it is:** Hold to pour, release at the right count to hit exactly 30ml / 45ml / 60ml. Liquid rises in the jigger; a verdict snaps in ("Spot on — 44ml"). Nail a streak of measures to "earn your free-pour license." Tactile, addictive, and a real bar skill.
**Claude handles:** Pour physics + timing, the fill animation, accuracy scoring, streak/licence mechanic, share, reduced-motion, i18n.
**You provide:** Nothing, fully buildable.
**Wow / Effort:** Wow: med-high · Effort: S-M

### 7. Shake or Stir? — rapid-fire technique quiz
**What it is:** Fast rounds: for each classic, swipe shaken/stirred, then glass, then ice. Streak scoring, a timer, "bartender rank" at the end (Barback → Head Bartender → Maestro). Brutally simple, very replayable, very shareable.
**Claude handles:** Quiz engine, the classics DB, streak + rank, share, i18n.
**You provide:** Nothing, fully buildable.
**Wow / Effort:** Wow: med · Effort: S

### 8. Design-a-Bar — generative menu maker
**What it is:** Pick a concept (speakeasy / beach / sports bar), a budget tier, and a vibe; it generates a coherent, named cocktail menu with a costed back-bar and a short rationale — basically your consultancy brain, automated, with your fingerprints on the logic.
**Claude handles:** Generative menu logic over a curated recipe/flavour DB, naming, the printed-menu output + share, i18n.
**You provide:** Your recipe bank / house style to make it sound like *you* (otherwise it's generic-good).
**Wow / Effort:** Wow: med-high · Effort: M-L

### 9. The Tasting Passport — 33 countries, 33 pours
**What it is:** Your wireframe globe, but each of the 33 countries you've travelled lights up with a signature drink/ingredient and a one-line memory. Spin, click a country, get a pour and a story. Turns your travel stat into an explorable, personal map — pure brand.
**Claude handles:** The globe (reuse), the country→drink data structure, the reveal UI, i18n.
**You provide:** The mapping — which country gets which drink/ingredient + a one-liner (your stories are the magic; I can draft, you finish).
**Wow / Effort:** Wow: high · Effort: M

### 10. Garnish Master — express the peel
**What it is:** A drag-to-express orange-peel mini-game (squeeze over the glass to spray oils, twist, drop) plus "garnish the drink correctly" rounds. A satisfying, tactile micro-craft that's oddly mesmerising. Could later use a frame of your real footage.
**Claude handles:** The peel/garnish canvas, the spray + twist mechanic, scoring, i18n.
**You provide:** Nothing now — optional real peel photos/footage later for extra realism.
**Wow / Effort:** Wow: med · Effort: M

### 11. Signature Serves — flip-card recipe showcase
**What it is:** Your real creations (House Crafts liqueurs, signature menus) as gorgeous flip cards that animate the recipe in on tap. Less "game," more "proof of craft" — the bar equivalent of the projects grid. The one place your *actual* drinks shine.
**Claude handles:** The flip-card UI + animated recipe reveal, layout, i18n.
**You provide:** Your real recipes + ideally a good photo per drink (this one genuinely needs your content).
**Wow / Effort:** Wow: high · Effort: S-M

### 12. ABV / Pace-Yourself meter — responsible & clever
**What it is:** Build a drink and see estimated ABV, standard-drinks, and a tasteful "pace yourself" timeline. Shows duty-of-care — a real hospitality value, not just flash. Framed lightly, never preachy.
**Claude handles:** The ABV/standard-drink math, the timeline viz, the responsible framing copy, i18n.
**You provide:** Nothing, fully buildable.
**Wow / Effort:** Wow: med · Effort: S

### 13. Name That Spirit — distillation trivia
**What it is:** Rapid trivia on spirits, distillation, botanicals, and origins, with a "did you know" reveal after each. Multilingual, replayable, and quietly educational — the knowledgeable-host energy your testimonials describe ("a walking encyclopedia of beverages").
**Claude handles:** Trivia bank, quiz engine, streaks, i18n.
**You provide:** Nothing — optional your own "bar facts" for authenticity.
**Wow / Effort:** Wow: med · Effort: S

### 14. Cost-to-Craft slider — well → bespoke
**What it is:** One drink, a single "budget ↔ craft" slider; drag it and watch the same cocktail level up — well spirit → call → premium → your bespoke version — with the visual, the spec, and the cost all morphing. A vivid argument for why craft is worth it (and a soft consult pitch).
**Claude handles:** The slider, the tiered visuals/specs/costs, the morph animation, i18n.
**You provide:** Optional — a photo per tier; otherwise stylised.
**Wow / Effort:** Wow: med · Effort: M

### 15. Last Call — a tiny narrative "tend the bar" game
**What it is:** A 90-second story: three guests sit down with a mood/need ("rough day", "celebrating", "adventurous"); read them and serve the right drink. Get it right and they leave happy (and tip). It dramatises the actual skill your recommendations praise — reading people — as a short, warm game.
**Claude handles:** The guest/mood generator, the dialogue, the read-and-serve mechanic, endings, i18n.
**You provide:** Optional — your real "what would you pour for X" instincts to make the right answers ring true.
**Wow / Effort:** Wow: high · Effort: M-L

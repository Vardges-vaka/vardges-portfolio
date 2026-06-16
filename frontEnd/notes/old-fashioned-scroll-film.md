# Concept note — The Old Fashioned scroll film (hospitality page)

> Parked idea, to revisit. Decision still open: full-page spine vs dedicated hero act, and whether Vardges can film it.

## The vision
A scroll-driven, **photoreal** animation on the hospitality page that starts by opening the whiskey (bottle) and finishes with a completed Old Fashioned. Must look **real** — real footage, not icons/SVG.

## The technique (settled): scroll-scrubbed frame sequence
The only way to look truly real is real footage. Same approach as Apple product pages:
1. Film one continuous take of building the drink.
2. Extract to ~120–200 optimized frames (WebP).
3. A pinned `<canvas>` draws `frame[scrollProgress × frameCount]`. Scroll down → drink builds; scroll up → un-builds.
4. Captions fade in at each step.

Ruled out: scroll-scrubbed `<video>` (seeking is janky/not frame-accurate on mobile). SVG/stylized (not "real"). Frame sequence on canvas is the reliable, buttery option.

## The steps (classic Old Fashioned, film order)
1. Whiskey bottle — the opener
2. Sugar cube in the glass
3. 2–3 dashes of bitters (+ a touch of water)
4. Muddle to dissolve
5. Pour the bourbon / rye
6. Big clear ice cube
7. Stir
8. Orange peel — express oils, twist, garnish
9. Finished drink — beauty shot

Each beat = one scroll segment + caption ("Sugar", "Bitters", "Stir", "Peel"…).

## Structure — the one open decision
- **(A) Dedicated pinned "act"** — one tall section (~4–6 screens of scroll) that scrubs the full build; rest of page normal. Cleanest, best perf, signature hero moment. **Recommended (hybrid leaning A): make it the bar hero/opening act**, replacing the removed "Atmosphere" section.
- **(B) Full-page sticky spine** — footage behind the entire page, builds as you scroll to contact. More cinematic but readability over moving footage + perf + pacing are hard.

Pairs with the cocktail **builder** (now in the Lab): hero = "watch it made", Lab = "make it yourself".

## What Claude handles
- The whole scrubbing engine: pinned canvas, scroll→frame mapping, preload/decode pipeline, memory caps, 60fps scrubbing.
- Frame extraction + compression from the raw video (ffmpeg → WebP, sizing).
- Captions/step timing, theming, integration into the bar page.
- Reduced-motion / slow-connection fallback (static hero still + step list) and mobile (fewer/smaller frames).

## What Vardges provides (the crux — the footage)
- **One continuous take, locked camera on a tripod.** No handheld/zoom/pan — camera must not move or scrubbing looks wrong.
- **Dark, consistent background** matching the site (shoot in the final look — background can't be cleanly removed).
- **Locked exposure & white balance**, even continuous light (no flicker / auto-exposure drift).
- **Slow, deliberate motions**, brief pause between steps; glass centered with headroom for captions.
- ~20–40s, 4K if possible. Aspect ratio: lean **4:5 or vertical 9:16** for mobile (Vardges' call).
- Optional: one gorgeous **final still** of the finished drink.

## If filming isn't feasible
- (a) **Photo sequence** — ~20 stills stage-by-stage (easier to light, slightly less smooth).
- (b) **Licensed stock** (generic, not him — avoid).
- (c) Ship a stylized placeholder now, swap his film in later.
Push for real footage of *his* hands — authenticity is the whole point.

## Open questions for next time
- Structure A vs B?
- Can he film, or plan around a photo sequence?
- Confirm "btn" = bottle (not a literal start button).

# TECH / SECURITY LAB — interactive, game-like pieces

A second pass at the Lab's security/tech zone. Everything here is replayable in 30–90 seconds, shareable, and (with one or two flagged exceptions) fully client-side. Ordered best-first. The "spot the phish" game already exists — none of these repeat it.

---

### 1. Crack the Vault — live password-strength dungeon
**What it is:** A single input box framed as a vault door. As you type a password, a client-side cracking simulator (zxcvbn-style entropy model) shows in real time: estimated time-to-crack against four attacker tiers (online throttled → offline GPU farm), which dictionary/leet/keyboard-walk patterns it matched, and a tiny animated "attacker" chewing through the keyspace. Beat the GPU farm tier and the vault clunks open with a flag. Replay by trying to out-clever your own previous score.
**Claude handles:** Entropy/pattern engine ported client-side, the four attacker-rate models, the animated cracking gauge, vault SVG + sound, share card ("My password would survive 4,000 years vs an offline GPU farm"), full i18n + RTL, reduced-motion fallback. Nothing typed is ever stored or sent.
**You provide:** Nothing, fully buildable.
**Wow / Effort:** Wow: high · Effort: M

### 2. The Caesar's Bar Tab — interactive cipher-cracking bench
**What it is:** A workbench of classic ciphers (Caesar, Vigenère, XOR, base64, ROT13, substitution) where short encrypted "messages" — many of them bartending jokes or cocktail recipes — must be cracked. Drag a frequency-analysis bar chart, slide the Caesar wheel, watch plaintext resolve live. Daily challenge mode: one new ciphertext per day, timed, with a leaderboard stored in localStorage. Marries the two crafts: the secret you decrypt is a recipe.
**Claude handles:** All cipher engines + auto-solver hints, the draggable Caesar wheel and live frequency histogram, the daily-seeded puzzle generator, timer + local leaderboard, the cocktail-recipe plaintext bank, i18n.
**You provide:** Optional — a handful of your real signature recipes to use as the hidden plaintexts (otherwise I'll invent convincing ones).
**Wow / Effort:** Wow: high · Effort: M

### 3. Packet Inspector — drag-the-attack network triage
**What it is:** A fake live "traffic feed" scrolls packets/log lines down the screen (SQLi attempts, port scans, normal traffic, a beacon to a C2). You're the SOC analyst: drag suspicious entries into a "quarantine" tray before they scroll off. Each correct catch explains *why* it was malicious; misses let a fake breach meter rise. 60-second rounds, escalating speed, score + accuracy at the end. Pure blue-team reflex game.
**Claude handles:** Realistic synthetic log/packet generator (mix of benign + 8–10 attack signatures), the scrolling canvas feed, drag-to-quarantine mechanic, breach meter, per-catch explainer cards, difficulty ramp, share score, i18n.
**You provide:** Nothing, fully buildable.
**Wow / Effort:** Wow: high · Effort: M

### 4. Hash Forge — collision hunter
**What it is:** Type any text and watch it hash live (MD5/SHA-1/SHA-256, all in-browser via SubtleCrypto/JS). The toy: a "vanity hash" mini-game — try to find an input whose hash starts with the most leading zeros (a baby proof-of-work, exactly the Bitcoin mechanic). A "mine" button brute-forces in a Web Worker and shows the hashrate climbing; beat the target difficulty to earn a flag. Teaches PoW and one-way functions viscerally.
**Claude handles:** Live multi-algorithm hashing, the Web Worker miner with live hashrate counter, leading-zero difficulty target, avalanche-effect demo (flip one char → watch the whole hash scramble), share card, i18n, reduced-motion.
**You provide:** Nothing, fully buildable.
**Wow / Effort:** Wow: high · Effort: M

### 5. Regex Duel — pattern-matching boss fight
**What it is:** A grid of strings rains down; your weapon is a regex you type into a command bar. Write a pattern that matches all the "valid" targets and none of the "traps" to clear the wave. Levels escalate from `\d+` to lookaheads and backreferences. A live highlighter shows exactly what your regex catches as you type, so it's playable even if you barely know regex — and brutal/satisfying if you do.
**Claude handles:** Wave generator with valid/trap string sets, live match highlighting, level progression (anchors → classes → groups → lookahead), a catastrophic-backtracking "you got ReDoS'd" easter-egg level, hint system, share, i18n.
**You provide:** Nothing, fully buildable.
**Wow / Effort:** Wow: high · Effort: M

### 6. Trace the Intruder — kill-chain board game
**What it is:** A node-graph of a fake corporate network (the same Obsidian-graph visual language you already use: workstations, DMZ, DB, domain controller). An attacker breached one edge node; you click nodes to "investigate," following IOCs (a weird login, a lateral-movement port, an exfil spike) to trace the full kill chain back to patient zero before a timer expires. Reuses your graph aesthetic for a SOC investigation story.
**Claude handles:** Procedural network graph + a randomized attack path each round, click-to-investigate reveal mechanic, IOC clues, MITRE ATT&CK-style stage labels, timer, win/lose states, the d3-force layout (you already have d3-force), i18n.
**You provide:** Nothing, fully buildable.
**Wow / Effort:** Wow: high · Effort: M-L

### 7. JWT Surgeon — forge the admin token
**What it is:** A real decoded JSON Web Token shown in three colored segments (header.payload.signature). The challenge: tamper the payload to set `"role":"admin"` and get past a fake auth check. Level 1 the server "doesn't verify" (you win by editing — teaches the `alg:none` flaw). Level 2 it verifies HMAC, so you must brute-force a weak secret from a wordlist in a Web Worker. A genuinely educational "can you break it" that mirrors a real pentest finding.
**Claude handles:** Live JWT encode/decode, the segment editor, a fake verifier with the `alg:none` and weak-HMAC vulnerable modes, Web Worker secret brute-forcer with a small wordlist, "exploit successful" reveal explaining the real CVE class, i18n.
**You provide:** Nothing, fully buildable.
**Wow / Effort:** Wow: high · Effort: M

### 8. Konami Terminal — hidden command-line easter egg
**What it is:** Your typing-terminal hero gains secret commands. Type `sudo make me a cocktail`, `whoami`, `nmap localhost`, `decrypt`, `matrix`, or enter the Konami code, and the terminal responds in character — `whoami` prints your dual-identity bio, `nmap` "scans" and finds the open ports of your skills, `matrix` triggers a brief code-rain, `sudo make me a cocktail` jumps you to the cocktail builder. A discoverable dev-culture playground that rewards curiosity.
**Claude handles:** Command parser + a dozen scripted responses (some bartending, some security flavored), Konami listener, ASCII art, the `help` command listing a few hints, tie-ins that route to your other Lab toys, i18n where it makes sense (commands stay in English).
**You provide:** Nothing, fully buildable — but tell me any inside-joke commands you'd want.
**Wow / Effort:** Wow: high · Effort: S-M

### 9. Port Scanner Arcade — defend your own machine
**What it is:** A wireframe "host" (echoes your spinning-globe aesthetic) with 1024 ports as a glowing ring. An attacker sweeps the ring scanning for open ports; you tap to slam firewall rules on the ones probing you while keeping the few "legitimate service" ports (80/443/22) open. Close too much and you break the service; leave the wrong port open and they get in. Whack-a-mole with a real networking lesson underneath.
**Claude handles:** The port-ring canvas, attacker scan animation, tap-to-block mechanic, service-uptime vs breach scoring, well-known-ports legend, difficulty waves, share, reduced-motion, i18n.
**You provide:** Nothing, fully buildable.
**Wow / Effort:** Wow: med-high · Effort: M

### 10. The Honeypot — reverse phishing (you write the bait)
**What it is:** Flips your existing phishing game. Instead of spotting phish, *you* assemble a phishing email from snippets (sender spoof, urgency line, lookalike URL, payload) and a simulated "victim mailbox" with a spam filter scores how convincing-yet-detectable it is. Teaches detection by forcing you to think like the attacker — and pairs naturally as the "advanced mode" sibling to spot-the-phish.
**Claude handles:** Snippet bank + drag-assemble UI, a rules-based "spam filter / human gullibility" scoring model, red-team explainer on each technique, a clear ethical framing banner, share ("my phish scored 87% believable, 12% flag rate"), i18n.
**You provide:** Nothing, fully buildable.
**Wow / Effort:** Wow: med-high · Effort: M

### 11. Binary Lockpick — bitwise puzzle
**What it is:** A row of 8 light-up bits and a target byte. You're given only bitwise operations (AND, OR, XOR, shift-left, shift-right, NOT) as draggable "tools" and must transform the start byte into the target in the fewest moves. Watch the binary, hex, and decimal update live with every op. A tactile, lateral-thinking puzzle that makes low-level thinking feel like a lockpicking minigame.
**Claude handles:** Bit-grid renderer, all bitwise op tools, move counter + par score, procedural puzzle generator with guaranteed solvability, live binary/hex/dec/ASCII readout, hint, share, i18n.
**You provide:** Nothing, fully buildable.
**Wow / Effort:** Wow: med · Effort: S-M

### 12. Entropy Visualizer — see randomness as a fingerprint
**What it is:** Drag in (or type) any text/file and it renders a "byte-cloud" — a Shannon-entropy heatmap plus a scatter of byte-pair frequencies, the same visualization malware analysts use to spot packed/encrypted regions. Toggle between "plain English," "base64," "encrypted," and "compressed" sample blobs and *watch the fingerprint change*. A data-viz plaything that quietly shows a real reverse-engineering technique.
**Claude handles:** Client-side entropy calc, the byte-pair scatter canvas + entropy heatmap, the sample-blob switcher, a live entropy score with "this looks encrypted/compressed/plaintext" verdict, file drag-drop (read locally, never uploaded), i18n.
**You provide:** Nothing, fully buildable.
**Wow / Effort:** Wow: med · Effort: M

### 13. SQL Injection Sandbox — break the login (safely)
**What it is:** A fake login form wired to a tiny in-browser SQL engine (sql.js / WASM, or a hand-rolled mock). The challenge: log in as admin without the password. Type `' OR '1'='1` and watch the constructed query light up red and let you through; then a "patched" level uses parameterized queries and your injection harmlessly fails. The single most famous web vuln, made hands-on and self-contained.
**Claude handles:** In-browser SQL eval over a seeded fake users table, live query-construction display (so you *see* the injection forming), vulnerable vs parameterized modes, a few escalating challenges (UNION-based, comment `--` tricks), "exploit worked / patched" explainer, i18n.
**You provide:** Nothing, fully buildable.
**Wow / Effort:** Wow: med-high · Effort: M

### 14. Steganography Studio — hide a message in a pixel
**What it is:** Upload any image (stays in-browser) and hide a secret message in its least-significant bits; download the near-identical stego image, or paste back an encoded one to extract the hidden text. A live "diff" view exaggerates the altered pixels so you can *see* where data is buried. Spy-craft you can actually use, with a clear "the image looks identical but carries a secret" payoff that's very shareable.
**Claude handles:** LSB encode/decode in canvas, optional password (XOR) layer, the amplified pixel-diff view, capacity meter, drag-drop + download, all local (no upload), i18n.
**You provide:** Nothing, fully buildable.
**Wow / Effort:** Wow: med-high · Effort: M

### 15. Threat-Level Dashboard — your live "SOC" wall (decorative + interactive)
**What it is:** A faux security operations center wall: a spinning attack globe with arcs (echoing your wireframe globe), a scrolling "blocked threats" ticker, rotating gauges, a fake CVE feed, and a big DEFCON-style threat dial visitors can crank. Click any tile to expand a 20-second mini-fact or launch the matching Lab game. Half ambient art, half hub — it's the front desk that makes the whole security zone feel alive and ties the other toys together.
**Claude handles:** The whole animated dashboard (globe arcs, ticker, gauges, synthetic CVE feed, crankable threat dial), tile-to-game routing, off-screen/off-tab pause + reduced-motion/reduced-data fallbacks per your perf rules, i18n.
**You provide:** Optional — a real RSS/JSON CVE feed URL if you ever want it live (otherwise it runs on convincing synthetic data, fully client-side).
**Wow / Effort:** Wow: med-high · Effort: M-L

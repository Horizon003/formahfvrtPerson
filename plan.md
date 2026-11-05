# The Education Valley — For Cutie

## Implementation
- Build a static single-page experience with a small Vite-powered frontend served on port 3000.
- Unlock flow: typed/clicked phrase completion for `T__ E___U_______N V_L__Y`; normalize input, show locked/error/unlocked states, and start music after the first user gesture.
- After unlock, render an animated scrapbook journey with sections for the opening note, live connection timer, school/college/university timeline, exact original messages, illustrated cat/graffiti accents, music controls, and the final response CTA.
- Keep the timer client-side and continuously updating from the connection start timestamp represented as 1 year 7 months ago; expose exact elapsed years/months/days/hours/minutes/seconds in a romantic panel.
- Use generated artwork as decorative background/illustration assets; use editable HTML/CSS for all required copy for legibility and accessibility. Use a generated instrumental MP3 with explicit user controls.
- Support mobile and desktop layouts, keyboard access, reduced-motion preferences, and avoid external data dependencies.
- Prepare static build output in `dist/`, route manifest in `public/manus-routes.json`, and metadata/favicon assets.

## Project structure
- `index.html`: application shell and metadata.
- `src/main.js`: unlock state, timer, audio control, motion/reveal interactions, and exact message content.
- `src/styles.css`: visual system, responsive layout, scrapbook surfaces, animations, reduced-motion rules.
- `public/`: route manifest and copied website assets.
- `assets/`: generated source artwork and soundtrack used during development.
- `package.json`, `vite.config.js`: pinned static build toolchain.

## Design

### Three possible directions
- **Midnight scrapbook confession** — 0.07: a starry, paper-layered love letter with handwritten notes.
- **Campus notebook pop** — 0.06: brighter school stationery, doodles, stickers, and playful type.
- **Soft gallery of memories** — 0.05: restrained editorial cards with warm paper and quiet motion.

### Chosen direction: Midnight scrapbook confession
- **Design Movement:** hand-made zine / scrapbook romance, with paper edges, ink doodles, and a night-sky glow.
- **Core Principles:** sincere over polished; playful but not childish; every interaction reveals a memory; text remains the hero.
- **Color Philosophy:** deep navy gives the site a private-after-dark feeling, blush and coral carry affection, and cream paper surfaces make the handwritten words feel tangible.
- **Layout Paradigm:** a vertical “memory trail” rather than a conventional centered grid; notes drift slightly off-axis like pages pinned to a wall.
- **Signature Elements:** tape corners, hand-drawn stars/cats, and a glowing phrase-entry keyboard.
- **Interaction Philosophy:** typing is the key that opens the memory box; scrolling feels like turning pages; the timer makes time tangible.
- **Animation:** gentle float, handwritten reveal, page lift, and soft sparkle; no aggressive motion, with reduced-motion fallback.
- **Typography System:** expressive cursive display face for emotional headings paired with a clean sans serif for body copy and timer digits.
- **Brand Essence:** a private digital scrapbook for the person who feels like home; tender, nostalgic, mischievous.
- **Brand Voice:** direct, warm, slightly teasing. Examples: “Cutie, this little place is only for you.” / “Some connections feel familiar before we even know why.”
- **Wordmark & Logo:** a small hand-drawn open notebook with a star tucked between the pages, beside the words “THE EDUCATION VALLEY”.
- **Signature Brand Color:** `#ff7892`, a coral-pink glow used for hearts, highlights, and the final promise.

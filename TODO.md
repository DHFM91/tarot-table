# Free Tarot Readings: to-do list

Loose ideas and fixes, newest at the bottom. Tick them off (`[x]`) as they're done.

- [ ] **"Bittersweet and finely balanced" is used constantly.** The vibe line comes from `VIBE` in `js/tarot-narrative.js`, and the "mixed | balanced" mood (which gives that phrase) comes up in about 45% of readings. The next most common is "mixed | still" at about 16%. Ideas:
  - give each mood several vibe phrases to rotate through, so no single wording dominates
  - split "mixed" into finer shades (leaning bright, leaning heavy, truly even) using the averages
  - widen the bright/heavy and moving/still cut-offs a little so fewer draws land dead center
  - add a test that no single vibe phrase appears in more than about 15% of readings

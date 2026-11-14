/*
 * Free Tarot Readings: placeholder card faces, drawn as SVG (no image files needed).
 * Used until real card art is added (see ART_FOLDER in index.html).
 *   Minor Arcana: the suit's own symbol (wand, cup, sword, pentacle).
 *   Major Arcana: a purple pentagram stamp, and a shadowy fog with eyes looking out:
 *     red, narrowed eyes for mostly negative cards, kind blue eyes for mostly positive ones,
 *     pale violet half-lidded eyes for cards that sit in between.
 * Needs tarot-data.js and tarot-narrative.js (for each card's positive/negative score).
 * Exposes one global: TarotFaces.
 *   TarotFaces.symbol(card)  -> SVG markup for the card's central image
 *   TarotFaces.stamp(color)  -> SVG markup for a pentagram stamp
 *   TarotFaces.mood(card)    -> "negative" | "positive" | "neutral" (Major Arcana)
 * TarotFaces injects its shared SVG filters into the page once, on first use.
 */
(function (root) {
"use strict";
const D = root.TarotData;

/* Shared filters and gradients, added to the page once. */
const DEFS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
<filter id="tf-fog" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="5"/></filter>
<filter id="tf-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.6"/></filter>
<linearGradient id="tf-blade" x1="0" x2="1"><stop offset="0" stop-color="#9aa1b8"/><stop offset=".5" stop-color="#f1f3fa"/><stop offset="1" stop-color="#8a90a6"/></linearGradient>
<linearGradient id="tf-gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6d77a"/><stop offset="1" stop-color="#b8892e"/></linearGradient>
<linearGradient id="tf-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fb6f0"/><stop offset="1" stop-color="#2f62b3"/></linearGradient>
<linearGradient id="tf-wood" x1="0" x2="1"><stop offset="0" stop-color="#6b4321"/><stop offset=".5" stop-color="#a8733f"/><stop offset="1" stop-color="#5e3a1c"/></linearGradient>
</defs></svg>`;
let defsAdded = false;
function ensureDefs() {
  if (defsAdded || typeof document === "undefined" || !document.body) return;
  document.body.insertAdjacentHTML("afterbegin", DEFS);
  defsAdded = true;
}

/* A pentagram inside a circle, points up. Points at radius 44 on a -50..50 box. */
const STAR = "M0,-44 L25.9,35.6 L-41.8,-13.6 L41.8,-13.6 L-25.9,35.6Z";
function stamp(color = "#8f4fd6") {
  return `<svg viewBox="-50 -50 100 100" aria-hidden="true"><circle r="45" fill="none" stroke="${color}" stroke-width="6"/><path d="${STAR}" fill="none" stroke="${color}" stroke-width="6" stroke-linejoin="round"/></svg>`;
}

const SUIT_ART = {
  Wands: `<svg viewBox="0 0 100 100" aria-hidden="true">
    <path d="M58 16 C70 6 82 10 84 14 C76 14 68 18 62 24Z" fill="#5f9e3c"/>
    <path d="M40 40 C26 34 18 38 16 42 C24 42 32 44 38 48Z" fill="#6fae46"/>
    <path d="M60 58 C74 56 80 62 82 66 C74 64 66 64 58 64Z" fill="#5f9e3c"/>
    <rect x="44" y="8" width="12" height="88" rx="6" transform="rotate(14 50 52)" fill="url(#tf-wood)"/>
    <circle cx="47" cy="34" r="3" fill="#4a2e14"/><circle cx="53" cy="66" r="2.6" fill="#4a2e14"/>
  </svg>`,
  Cups: `<svg viewBox="0 0 100 100" aria-hidden="true">
    <path d="M22 12 H78 C78 44 64 56 50 56 C36 56 22 44 22 12Z" fill="url(#tf-gold)" stroke="#8a6420" stroke-width="2"/>
    <path d="M27 16 H73 C72 30 66 36 50 36 C34 36 28 30 27 16Z" fill="url(#tf-water)"/>
    <path d="M32 20 C40 23 60 23 68 20" stroke="#dcefff" stroke-width="2" fill="none" opacity=".8"/>
    <rect x="46" y="55" width="8" height="24" fill="url(#tf-gold)" stroke="#8a6420" stroke-width="1.5"/>
    <circle cx="50" cy="66" r="5" fill="#c9962f" stroke="#8a6420" stroke-width="1.5"/>
    <path d="M28 92 C30 82 70 82 72 92Z" fill="url(#tf-gold)" stroke="#8a6420" stroke-width="2"/>
  </svg>`,
  Swords: `<svg viewBox="0 0 100 100" aria-hidden="true">
    <path d="M50 3 L57 14 L57 68 L43 68 L43 14Z" fill="url(#tf-blade)" stroke="#5c6278" stroke-width="1.5"/>
    <line x1="50" y1="14" x2="50" y2="64" stroke="#7c8299" stroke-width="1.5"/>
    <rect x="28" y="67" width="44" height="7" rx="3.5" fill="url(#tf-gold)" stroke="#8a6420" stroke-width="1.5"/>
    <rect x="45" y="74" width="10" height="16" rx="2" fill="#3b2a4a"/>
    <path d="M45 78 L55 80 M45 82 L55 84 M45 86 L55 88" stroke="#6b5580" stroke-width="1.2"/>
    <circle cx="50" cy="94" r="5" fill="url(#tf-gold)" stroke="#8a6420" stroke-width="1.5"/>
  </svg>`,
  Pentacles: `<svg viewBox="-50 -50 100 100" aria-hidden="true">
    <circle r="44" fill="url(#tf-gold)" stroke="#8a6420" stroke-width="3"/>
    <circle r="36" fill="none" stroke="#8a6420" stroke-width="2"/>
    <path d="M0,-34 L20,27.5 L-32.3,-10.5 L32.3,-10.5 L-20,27.5Z" fill="none" stroke="#6e4f16" stroke-width="3.2" stroke-linejoin="round"/>
  </svg>`
};

/* Mood of a Major Arcana card, from its upright positive/negative score. */
function mood(card) {
  const N = root.TarotNarrative;
  const v = N && N.UP[card.id] ? N.UP[card.id][0] : 0;
  return v < 0 ? "negative" : v > 0 ? "positive" : "neutral";
}
const EYES = {
  negative: { color: "#ff2630", glow: "#ff0018",
    // narrowed and slanted inward: menacing
    left: "M25 44 Q36 40 46 50 Q35 52 25 44Z", right: "M75 44 Q64 40 54 50 Q65 52 75 44Z",
    pupil: (x, y) => `<ellipse cx="${x}" cy="${y}" rx="1.1" ry="3.4" fill="#2a0005"/>` },
  positive: { color: "#5cc3ff", glow: "#2a9dff",
    // rounded, lower lids lifted: kind
    left: "M25 48 Q36 37 47 48 Q36 54 25 48Z", right: "M53 48 Q64 37 75 48 Q64 54 53 48Z",
    pupil: (x, y) => `<circle cx="${x}" cy="${y}" r="2.6" fill="#08243f"/><circle cx="${x + 1}" cy="${y - 1}" r=".9" fill="#fff"/>` },
  neutral: { color: "#c9a8ff", glow: "#8f5cff",
    // half-lidded: watching
    left: "M25 48 Q36 44 47 48 Q36 52 25 48Z", right: "M53 48 Q64 44 75 48 Q64 52 53 48Z",
    pupil: (x, y) => `<circle cx="${x}" cy="${y}" r="1.8" fill="#1d0b3a"/>` }
};
function fogEyes(card) {
  const m = mood(card), e = EYES[m];
  const lx = m === "negative" ? 37 : 36, rx = m === "negative" ? 63 : 64, py = m === "negative" ? 46.5 : 47.5;
  return `<svg viewBox="0 0 100 100" aria-hidden="true">
    <g filter="url(#tf-fog)">
      <ellipse cx="50" cy="50" rx="46" ry="36" fill="#4a4266"/>
      <ellipse cx="26" cy="34" rx="26" ry="20" fill="#6a6188"/>
      <ellipse cx="76" cy="36" rx="24" ry="19" fill="#5f5680"/>
      <ellipse cx="54" cy="20" rx="22" ry="13" fill="#7a7198"/>
      <ellipse cx="44" cy="74" rx="38" ry="18" fill="#2f2848"/>
      <ellipse cx="50" cy="48" rx="30" ry="14" fill="#1c1630"/>
    </g>
    <g transform="translate(50 48) scale(1.45) translate(-50 -48)">
      <g filter="url(#tf-glow)" opacity=".95"><path d="${e.left}" fill="${e.glow}"/><path d="${e.right}" fill="${e.glow}"/></g>
      <path d="${e.left}" fill="${e.color}"/><path d="${e.right}" fill="${e.color}"/>
      ${e.pupil(lx, py)}${e.pupil(rx, py)}
    </g>
    <g filter="url(#tf-fog)" opacity=".7"><ellipse cx="34" cy="66" rx="26" ry="8" fill="#5a5277"/><ellipse cx="70" cy="62" rx="22" ry="7" fill="#4d4568"/></g>
  </svg>`;
}

function symbol(card) {
  ensureDefs();
  return card.suit ? SUIT_ART[card.suit] : fogEyes(card);
}

root.TarotFaces = Object.freeze({ symbol, stamp, mood, ensureDefs });
})(typeof window !== "undefined" ? window : globalThis);

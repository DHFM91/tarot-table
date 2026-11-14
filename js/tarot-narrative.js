/*
 * Free Tarot Readings: the vibe reading.
 * Reads the whole draw at once and writes a short impression of its general feel (roughly 100 to 200 words).
 * It highlights the single most interesting card (chosen by points), then reads the others as context.
 * It describes; it never gives instructions. Fully offline.
 * Needs tarot-data.js, tarot-engine.js and tarot-phrases.js loaded first.
 * Exposes one global: TarotNarrative.
 *
 *   TarotNarrative.tell(drawn, spreadKey, { question })  ->  { text, html, highlight, scores, words }
 *   TarotNarrative.score(cardIndex, reversed)            ->  { v, m, ch, inw }
 *
 * The same draw always gives the same reading.
 */
(function (root) {
"use strict";
const D = root.TarotData, E = root.TarotEngine, P = root.TarotPhrases;
if (!D || !E || !P) throw new Error("tarot-narrative.js needs tarot-data.js, tarot-engine.js and tarot-phrases.js loaded first");

/* ======================================================================
   1. CARD SCORES (upright), each from -2 to +2:
      v   negative ... positive
      m   inaction / waiting ... action / movement
      ch  stability / holding on ... change / upheaval
      inw outward / social ... inward / private
   Reversed scores are worked out by rule (blocked, delayed, turned inward),
   with hand-set exceptions in REVERSED where the rule reads a card wrong.
   ====================================================================== */
const UP = {
  "major-00": [1, 2, 2, -1], "major-01": [2, 2, 1, -1], "major-02": [1, -2, 0, 2], "major-03": [2, 0, 0, 0],
  "major-04": [1, 1, -2, -1], "major-05": [0, -1, -2, -1], "major-06": [2, 0, 1, -1], "major-07": [2, 2, 1, -1],
  "major-08": [2, 0, 0, 1], "major-09": [0, -2, 0, 2], "major-10": [1, 1, 2, 0], "major-11": [0, 0, 0, 0],
  "major-12": [0, -2, 1, 2], "major-13": [-1, 0, 2, 0], "major-14": [1, -1, -1, 1], "major-15": [-2, -1, -1, 0],
  "major-16": [-2, 2, 2, -1], "major-17": [2, -1, 0, 1], "major-18": [-1, -1, 1, 2], "major-19": [2, 1, 0, -2],
  "major-20": [1, 1, 2, 1], "major-21": [2, 0, 1, -1],
  "wands-01": [2, 2, 1, -1], "wands-02": [1, 0, 0, 0], "wands-03": [1, 1, 1, -1], "wands-04": [2, 0, -1, -2],
  "wands-05": [-1, 2, 1, -1], "wands-06": [2, 1, 0, -2], "wands-07": [0, 1, 0, -1], "wands-08": [1, 2, 1, -1],
  "wands-09": [0, 0, 0, 0], "wands-10": [-1, 0, -1, 0], "wands-11": [1, 1, 1, 0], "wands-12": [1, 2, 2, -1],
  "wands-13": [2, 1, 0, -1], "wands-14": [2, 1, 0, -1],
  "cups-01": [2, 0, 1, 1], "cups-02": [2, 0, 0, -1], "cups-03": [2, 0, 0, -2], "cups-04": [-1, -2, -1, 2],
  "cups-05": [-2, -1, 0, 2], "cups-06": [1, -1, -1, 1], "cups-07": [0, -1, 0, 2], "cups-08": [0, 1, 2, 1],
  "cups-09": [2, -1, -1, 0], "cups-10": [2, 0, -1, -1], "cups-11": [1, 0, 0, 1], "cups-12": [1, 1, 1, 0],
  "cups-13": [1, -1, 0, 1], "cups-14": [1, 0, -1, 0],
  "swords-01": [1, 1, 1, 0], "swords-02": [-1, -2, -1, 1], "swords-03": [-2, 0, 1, 1], "swords-04": [0, -2, -1, 2],
  "swords-05": [-2, 1, 1, -1], "swords-06": [0, 1, 1, 0], "swords-07": [-1, 1, 0, -1], "swords-08": [-2, -2, -1, 2],
  "swords-09": [-2, -1, 0, 2], "swords-10": [-2, 0, 2, 0], "swords-11": [0, 1, 0, 0], "swords-12": [0, 2, 1, -1],
  "swords-13": [0, 0, 0, 0], "swords-14": [0, 0, -1, -1],
  "pentacles-01": [2, 1, 1, 0], "pentacles-02": [0, 1, 0, 0], "pentacles-03": [1, 1, 0, -1], "pentacles-04": [0, -2, -2, 0],
  "pentacles-05": [-2, -1, 0, 0], "pentacles-06": [1, 0, 0, -1], "pentacles-07": [0, -1, 0, 1], "pentacles-08": [1, 1, -1, 0],
  "pentacles-09": [2, -1, -1, 0], "pentacles-10": [2, 0, -2, -1], "pentacles-11": [1, 0, 0, 0], "pentacles-12": [0, -1, -2, 0],
  "pentacles-13": [1, 0, -1, 0], "pentacles-14": [1, 0, -2, -1]
};
/* Reversed cards the general rule gets wrong: [v, m, ch, inw] (null = keep the rule's value). */
const REVERSED = {
  "major-02": [null, -1, null, null],   // secrets kept, not motion
  "major-09": [null, -2, null, null],   // isolation: stiller, not freed
  "major-12": [-1, -2, null, null],     // stalling, martyrdom
  "major-13": [-1, -2, 0, null],        // resisting an ending
  "major-15": [1, 1, null, null],       // breaking the chain
  "major-16": [-1, null, 1, null],      // collapse delayed, dread lingering
  "major-17": [-1, null, null, null],   // hope dimmed
  "cups-10": [-1, null, null, null], "pentacles-10": [-1, null, null, null],
  "swords-03": [1, null, null, null], "swords-09": [1, null, null, null],
  "swords-10": [1, 1, null, null], "pentacles-05": [1, null, null, null],
  "wands-12": [null, 2, null, null], "swords-12": [null, 2, null, null] // reversed knights rush rather than stall
};
const clamp = x => Math.max(-2, Math.min(2, x));
function score(i, reversed) {
  const c = D.deck[i], [v, m, ch, inw] = UP[c.id];
  if (!reversed) return { v, m, ch, inw };
  let s = {
    v: v > 0 ? v - 2 : v < 0 ? clamp(v + 2) : -1,   // bright cards dim; heavy cards ease
    m: m > 0 ? -1 : m < 0 ? 1 : -1,                  // moving things stall; stuck things start to shift
    ch: ch > 0 ? ch - 1 : ch,                        // change is delayed
    inw: clamp(inw + 1)                              // reversals turn inward
  };
  const o = REVERSED[c.id];
  if (o) ["v", "m", "ch", "inw"].forEach((k, j) => { if (o[j] !== null) s[k] = o[j]; });
  return s;
}

/* The deck's own typical score on each scale (averaged over all 78 cards, upright and reversed).
   Readings are measured against this, so a perfectly typical draw reads as balanced. */
const DECK_MEAN = (() => {
  const t = { v: 0, m: 0, ch: 0, inw: 0 };
  D.deck.forEach((c, i) => [false, true].forEach(r => { const s = score(i, r); for (const k in t) t[k] += s[k]; }));
  for (const k in t) t[k] /= D.deck.length * 2;
  return t;
})();

/* Spread positions that carry extra weight when choosing the highlight. */
const KEY_POSITIONS = {
  one: [0], ppf: [1, 2], sao: [0, 2], mbs: [2], cross5: [0, 4], paths: [0, 5],
  horseshoe: [1, 3, 6], celtic: [0, 1, 9]
};

/* ======================================================================
   2. WORDING. Horoscope-style vagueness, but about the cards, never the stars.
   ====================================================================== */
/* The vibe line: a 7 x 7 emotional grid. Rows run from deep shadow (-3) to radiant light (+3),
   columns from frozen stillness (-3) to headlong motion (+3). Two phrasings per cell, all distinct. */
const VIBES = {
  "-3": {
    "-3": ["numb and bleak, a room where the clocks have drowned", "frozen dread, a cold well with no bottom"],
    "-2": ["a slow sinking, mud rising past the ankles of the day", "grim and creeping, like damp spreading behind wallpaper"],
    "-1": ["ominous and slow-footed, something patient waiting at the end of the hall", "dark and deliberate, a shadow lengthening with no sun to cast it"],
    "0": ["thick with foreboding, a sky the color of old bruises", "terrible and absolute, a door already locked behind you"],
    "1": ["a black unease twitching, floorboards ticking in the dark", "as if the walls had drawn breath and were listening"],
    "2": ["panic running downhill, every shadow suddenly pursuing", "a frantic nightmare rush, teeth of the dark closing in"],
    "3": ["catastrophe at full tilt, a storm tearing the roof from the world", "headlong terror, a collapse with no floor left to find"]
  },
  "-2": {
    "-3": ["grief set in stone, a graveyard under unmoving fog", "leaden and inert, a drowned bell that cannot ring"],
    "-2": ["sorrowful and sluggish, ashes settling on a deserted table", "weary and sunken, each hour dragged through wet sand"],
    "-1": ["sullen and slow, rain pooling in the corners of old rooms", "gloomy and measured, a funeral procession with no end in sight"],
    "0": ["gray and burdened, a long afternoon of unwelcome truths", "somber at the center, like a house after bad news"],
    "1": ["trouble rustling awake, crows lifting from a bare field", "resentment simmering, a kettle just beginning to tremble"],
    "2": ["tense and hurtling, a cart rattling down a ruined road", "angry momentum, grievances breaking loose like startled birds"],
    "3": ["furious and breakneck, a landslide of old hurts", "wrecking-ball chaos, grief turned to thunder"]
  },
  "-1": {
    "-3": ["wary and motionless, a held breath in an empty house", "suspended and uneasy, dust hanging in a stopped moment"],
    "-2": ["doubtful and slow, a lamp flame leaning toward nothing", "nagging misgiving, a stairway with one step too many"],
    "-1": ["faintly troubled, an unhurried walk with footsteps behind you", "pensive and a little chilled, evening arriving before it should"],
    "0": ["uncertain and watchful, a mirror a second too slow", "mixed and uncomfortable, a smile with something behind it"],
    "1": ["nervous and quickening, whispers gathering under the stairs", "jittery anticipation, a moth testing the edge of a flame"],
    "2": ["restless and edgy, a pulse hurrying ahead of its reasons", "hurried and suspicious, glancing back at every corner"],
    "3": ["frayed and frantic, a dozen small alarms going off at once", "reckless misgiving, running before knowing from what"]
  },
  "0": {
    "-3": ["blank and motionless, a pond without a ripple", "a pause between two heartbeats, neither good nor bad"],
    "-2": ["flat and sluggish, a road that seems to wait", "slack and idle, a river thinking about moving"],
    "-1": ["even and leisurely, a tide that hasn't chosen a direction", "level and unbothered, an afternoon with nowhere to be"],
    "0": ["balanced and bittersweet, dusk with both lamps lit", "poised at the middle, neither rising nor falling"],
    "1": ["curious and waking, a page about to be turned", "mild and expectant, a breeze that might become something"],
    "2": ["brisk and impartial, events passing like a train without stops", "busy and neutral, a market crowd streaming past"],
    "3": ["fast and indifferent, a flooded river that takes no side", "headlong and unaligned, a whirl of events with no verdict"]
  },
  "1": {
    "-3": ["tender and hushed, snow settling on a sleeping town", "a seed holding its breath underground, patient and trusting"],
    "-2": ["a slow thaw along the windowsill, faintly encouraging", "drowsy and mending, a fever finally breaking"],
    "-1": ["warming by degrees, a lamp lit in a far window", "soft and optimistic, morning lingering over the fields"],
    "0": ["cautiously buoyant, a door left open a hand's width", "leaning toward kindness, a light under the threshold"],
    "1": ["lifting and inquisitive, new green pushing through cracked stone", "budding promise, a first bird testing the dark"],
    "2": ["encouraging and quick, a tailwind catching the sails", "spirited and willing, doors opening one after another"],
    "3": ["eager and surging, a sunrise sprinting up the hills", "a leap that finds solid ground, fast and surprised"]
  },
  "2": {
    "-3": ["glowing and suspended, amber light caught in a jar", "serene and golden, a long afternoon held in glass"],
    "-2": ["lush and lazy, honey sliding from a spoon", "contented and slow, a hearth that keeps its coals"],
    "-1": ["sunlit and easygoing, a boat drifting on clear water", "pleasant and mellow, laughter drifting from the next room"],
    "0": ["luminous and steady, a garden at its fullest hour", "happy and assured, a table set for friends"],
    "1": ["sparkling and ascending, a festival beginning to stir", "full of promise, dawn spilling into every window"],
    "2": ["lively and warm, music spilling out of open doors", "joyful and fleet, a wind full of swallows"],
    "3": ["dazzling and swift, fireworks over a cheering harbor", "delighted and sprinting, luck arriving faster than it can be counted"]
  },
  "3": {
    "-3": ["blissful and unmoving, sunlight resting on a perfect lake", "radiant peace, the whole world asleep inside a lullaby"],
    "-2": ["rapturous and slow, a deep tide of gladness at last arriving", "blessed and dreamy, a long exhale of pure delight"],
    "-1": ["wondrous and easy, stars floating on a warm sea", "glowing and tender, a summer that does not end"],
    "0": ["radiant and whole, a cathedral of light with every window open", "overflowing with joy, a well that cannot run dry"],
    "1": ["ecstatic and soaring, wings unfolding in the sun", "jubilant and swelling, a chorus drawing its first breath"],
    "2": ["exultant and galloping, a joyful gallop across open green", "dizzy with delight, every lock giving way to music"],
    "3": ["euphoric and explosive, everything breaking gloriously your way", "rapture at full speed, a thousand lanterns launched at once"]
  }
};
/* Averages shrink as spreads grow (cards cancel out), so they're scaled to the spread size:
   1 means an unusually strong pull for that many cards. Shared with the "currents" bars. */
const scaled = (x, n) => Math.max(-1, Math.min(1, x / (2 / Math.sqrt(Math.max(1, n)))));
const bin7 = z => (z < -0.7 ? -3 : z < -0.4 ? -2 : z < -0.15 ? -1 : z <= 0.15 ? 0 : z <= 0.4 ? 1 : z <= 0.7 ? 2 : 3);
/* One short passage per overall mood. Worded to work for one card or ten. */
const TONE = {
  "bright|moving": [
    "Doors seem to swing open almost before you reach them. Plans that stalled may start moving on their own, and small wins can stack up quickly.",
    "There's a tailwind here. Scattered energy gathers into one direction, and other people may be unusually willing to come along."
  ],
  "bright|balanced": [
    "Good things here arrive as steady improvements rather than fireworks: a conversation that goes better than expected, a worry that shrinks on its own.",
    "What you've been tending is starting to give something back, in ways so undramatic they're easy to miss."
  ],
  "bright|still": [
    "The good news is patient. Much of it is already in place or ripening slowly, and nothing here is in a hurry.",
    "It's like a pause at the top of a hill: a sense of enough, and time to take in how far things have come."
  ],
  "mixed|moving": [
    "Things pull in several directions at once. A high in one corner of life may sit right beside a snag in another, and the mood shifts quickly.",
    "There's plenty in motion, though not all of it points the same way. Where it settles is still being decided."
  ],
  "mixed|balanced": [
    "Hopeful and cautious notes weigh out almost evenly. Some things work, some don't, and small shifts could tip the balance either way.",
    "Gains and losses sit side by side. The same events may look very different depending on where you stand."
  ],
  "mixed|still": [
    "The story seems to have paused mid-sentence. Something is gathering just out of view, the hush that comes before things make sense.",
    "Things may seem on hold. Underneath the slowness, something is settling, the way muddy water clears when no one shakes it."
  ],
  "heavy|moving": [
    "Pressure is building and wants an outlet. Tension may break into the open sooner than is comfortable, but storms like this tend to clear the air.",
    "It's not a gentle stretch. Even so, much of what looks like trouble is something finally being dealt with rather than put off again."
  ],
  "heavy|balanced": [
    "There's real weight here: worry, disappointment or old hurts close to the surface. None of it looks final, and it's easier to carry once it's named.",
    "This has a serious face, but it reads like a hard chapter rather than the whole book."
  ],
  "heavy|still": [
    "Days run slow and foggy, and simple matters may take longer than they should. Fog hides the road; it doesn't change where the road goes.",
    "Doubt or fatigue may be stretching the days longer than they are. Stillness this deep often comes just before a turn."
  ]
};
/* Extra notes, used only when the draw is strong on one of them (at most two per reading). */
const NOTE = {
  upheaval: "Change runs strong: something familiar may be ending or shaking loose.",
  steady: "Underneath it all, things hold steady; much of this happens within familiar walls.",
  big: "With so many Major Arcana, this reads as a chapter of your life rather than a week.",
  noMajors: "With no Major Arcana at all, this stays human-sized: everyday choices, close at hand.",
  manyRev: "Many cards are reversed, so much of this may be happening below the surface.",
  noRev: "Every card is upright; nothing here seems to be hiding.",
  courts: "The court cards may stand for real people, or for different sides of you.",
  inward: "Most of this plays out privately, in thoughts and small realizations.",
  outward: "Most of this plays out in company, among other people."
};
const ELEMENT_NOTE = {
  Fire: "Fire leads, so drive and ambition color everything.",
  Water: "Water leads, so feelings and relationships color everything.",
  Air: "Air leads, so thoughts, words and decisions color everything.",
  Earth: "Earth leads, so work, money and home color everything."
};
const SUIT_NOTE = {
  Wands: "As a Wands card, it speaks to drive, ambition and nerve.",
  Cups: "As a Cups card, it speaks to feelings and relationships.",
  Swords: "As a Swords card, it speaks to thoughts, words and conflict.",
  Pentacles: "As a Pentacles card, it speaks to work, money and the body."
};

/* ======================================================================
   3. THE READING
   ====================================================================== */
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const B = "\u0001", E2 = "\u0002"; // marks a card name, made bold in html
const words = s => s.replace(/[\u0001\u0002]/g, "").split(/\s+/).filter(Boolean).length;
function list(items, last) {
  if (items.length < 2) return items[0] || "";
  if (items.length === 2) return `${items[0]} ${last} ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, ${last} ${items[items.length - 1]}`;
}
/* ---------- repetition guard ----------
   Optional sentences are dropped if they repeat more than MAX_REPEATS key words already used,
   and where there's a choice of wording, the one that repeats least is used. */
const MAX_REPEATS = 2;
const STOP = new Set(("this that with have been into from they their there here what when where which while rather than more most " +
  "some much many just only even still seem seems like your yours about after before again other others thing things something " +
  "nothing anything everything card cards draw reading vibe picture might mean coming careful trying tell table would could " +
  "where those these them then were will over under through same very also each every once ever never").split(" "));
const stem = w => w.replace(/(ing|ed|ly|es|s)$/, "");
function keyWords(t) {
  return t.replace(/[\u0001\u0002]/g, "").toLowerCase().replace(/[’']/g, "").split(/[^a-z]+/)
    .filter(w => w.length >= 4 && !STOP.has(w)).map(stem);
}

function cardName(c, reversed) {
  let name = c.name, art = "the ";
  if (name.startsWith("The ")) name = name.slice(4);
  else if (!c.suit && name !== "Wheel of Fortune") art = "";
  return `${art}${B}${name}${reversed ? " (reversed)" : ""}${E2}`;
}

function tell(drawn, spreadKey, opts = {}) {
  const roles = (D.SPREADS[spreadKey] || { pos: [] }).pos;
  const rng = E.seededRng(spreadKey + "|" + drawn.map(d => d.i + (d.r ? "r" : "u")).join(",") + "|" + (opts.question || ""));
  const pick = a => a[rng(a.length)];
  const cards = drawn.map((d, k) => {
    const c = D.deck[d.i];
    return { c, r: !!d.r, k, s: score(d.i, d.r), ph: d.r ? P[c.id].rv : P[c.id].up, pos: roles[k] ? roles[k][0] : "" };
  });
  const n = cards.length;

  /* --- averages (Major Arcana count a little extra) --- */
  const wt = x => (x.c.suit ? 1 : 1.5), W = cards.reduce((a, x) => a + wt(x), 0);
  const avg = key => cards.reduce((a, x) => a + x.s[key] * wt(x), 0) / W;
  const A = { v: avg("v"), m: avg("m"), ch: avg("ch"), inw: avg("inw") };
  const Z = {};
  for (const k of ["v", "m", "ch", "inw"]) Z[k] = scaled(A[k] - DECK_MEAN[k], n);
  const tV = Z.v >= 0.2 ? "bright" : Z.v <= -0.2 ? "heavy" : "mixed";
  const tM = Z.m >= 0.2 ? "moving" : Z.m <= -0.2 ? "still" : "balanced";

  /* --- the most interesting card, by points --- */
  const key = new Set(KEY_POSITIONS[spreadKey] || [0]);
  cards.forEach(x => {
    x.interest = 1.2 * Math.abs(x.s.v) + Math.abs(x.s.m) + Math.abs(x.s.ch)
      + (x.c.suit ? 0 : 2) + (x.r && !x.c.suit ? 0.5 : 0) + (x.c.rank === 1 ? 0.5 : 0)
      + (key.has(x.k) ? 1 : 0)
      + 0.8 * Math.abs(x.s.v - A.v) + 0.4 * Math.abs(x.s.m - A.m) // stands out from the rest of the draw
      + rng(100) / 1000;                                            // tiny tie-breaker
  });
  const ranked = cards.slice().sort((a, b) => b.interest - a.interest);
  const hi = ranked[0], second = ranked[1];
  const paras = [];
  const seen = new Set();
  const repeats = t => keyWords(t).filter(w => seen.has(w)).length;
  const use = t => { keyWords(t).forEach(w => seen.add(w)); return t; };
  const fresh = t => repeats(t) <= MAX_REPEATS;                       // for optional sentences
  const leastRepeated = opts => opts.map(t => [repeats(t), rng(100), t]).sort((a, b) => a[0] - b[0] || a[1] - b[1])[0][2];
  let dropped = 0;

  /* 1. the highlight and the vibe */
  const vibe = pick(VIBES[bin7(Z.v)][bin7(Z.m)]);
  let p1 = opts.question ? `You asked: “${opts.question}” ` : "";
  p1 += n === 1
    ? `With only ${cardName(hi.c, hi.r)} on the table, the vibe is ${vibe}.`
    : `Highlighting ${cardName(hi.c, hi.r)}${hi.pos ? ` (${hi.pos})` : ""}, and considering the others in the context of this draw, the general vibe is ${vibe}.`;
  paras.push(use(p1));

  /* 2. the mood, plus at most two notes that really stand out */
  const notes = [];
  if (n === 1) {
    notes.push(hi.c.suit ? SUIT_NOTE[hi.c.suit] : "A Major Arcana card drawn alone tends to speak to a larger theme rather than a single event.");
  } else {
    const majors = cards.filter(x => !x.c.suit).length, rev = cards.filter(x => x.r).length;
    const sc = {}; cards.forEach(x => { if (x.c.suit) sc[x.c.suit] = (sc[x.c.suit] || 0) + 1; });
    const top = Object.entries(sc).sort((a, b) => b[1] - a[1]);
    const cand = [];
    if (top.length && top[0][1] >= Math.max(2, n / 3) && (!top[1] || top[0][1] > top[1][1])) cand.push([top[0][1] / n + 0.5, ELEMENT_NOTE[D.SUITS[top[0][0]].el]]);
    if (Z.ch >= 0.5) cand.push([Z.ch + 0.3, NOTE.upheaval]);
    if (Z.ch <= -0.5) cand.push([-Z.ch + 0.3, NOTE.steady]);
    if (n >= 3 && majors / n >= 0.5) cand.push([majors / n + 0.4, NOTE.big]);
    if (n >= 5 && majors === 0) cand.push([0.7, NOTE.noMajors]);
    if (n >= 3 && rev / n >= 0.6) cand.push([rev / n, NOTE.manyRev]);
    if (n >= 3 && rev === 0) cand.push([0.6, NOTE.noRev]);
    if (cards.filter(x => x.c.rank > 10).length >= 3) cand.push([0.65, NOTE.courts]);
    if (Z.inw >= 0.6) cand.push([Z.inw, NOTE.inward]);
    if (Z.inw <= -0.6) cand.push([-Z.inw, NOTE.outward]);
    cand.sort((a, b) => b[0] - a[0]).slice(0, 2).forEach(c => notes.push(c[1]));
  }
  // the mood passage whose wording repeats least; its first sentence always stays
  const tone = leastRepeated(TONE[tV + "|" + tM]).split(/(?<=\.)\s+/);
  const p2 = [use(tone[0])];
  tone.slice(1).concat(notes).forEach(t => { if (fresh(t)) p2.push(use(t)); else dropped++; });
  // one subtle mood image per reading, never the card's literal illustration
  p2.push(use(`For a sense of mood, you might imagine ${hi.ph.m}.`));
  paras.push(p2.join(" "));

  /* 3. what it might mean, and the message */
  const omens = [];
  ranked.slice(0, Math.min(3, n)).forEach(x => omens.push(use(leastRepeated(x.ph.o.filter(o => !omens.includes(o))))));
  if (omens.length < 2) omens.push(use(leastRepeated(hi.ph.o.filter(o => !omens.includes(o)))));
  const worst = cards.slice().sort((a, b) => a.s.v - b.s.v)[0];
  const caution = use(leastRepeated(worst.ph.c));
  let p3 = `This might mean ${list(omens, "and/or")} coming up, but be careful of ${caution}.`;
  p3 += ` If ${n === 1 ? "this card is" : "the cards are"} trying to tell you anything, it's that ${hi.ph.t}.`;
  paras.push(p3);

  const html = paras.map(p => esc(p).replace(/\u0001/g, "<b>").replace(/\u0002/g, "</b>"));
  const text = paras.map(p => p.replace(/[\u0001\u0002]/g, ""));
  return { text, html, dropped, highlight: hi.k, second: second ? second.k : -1, scores: cards.map(x => x.s), averages: A, scaled: Z, words: text.reduce((a, p) => a + words(p), 0) };
}

root.TarotNarrative = Object.freeze({ tell, score, scaled, VIBES, DECK_MEAN, keyWords, MAX_REPEATS, UP, REVERSED });
})(typeof window !== "undefined" ? window : globalThis);

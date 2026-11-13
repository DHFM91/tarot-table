/*
 * Free Tarot Readings: the vibe reading.
 * Reads the whole draw at once and writes a 300 to 500 word impression of its general feel.
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

/* Spread positions that carry extra weight when choosing the highlight. */
const KEY_POSITIONS = {
  one: [0], ppf: [1, 2], sao: [0, 2], mbs: [2], cross5: [0, 4], paths: [0, 5],
  horseshoe: [1, 3, 6], celtic: [0, 1, 9]
};

/* ======================================================================
   2. WORDING. Horoscope-style vagueness, but about the cards, never the stars.
   ====================================================================== */
const VIBE = {
  "bright|moving": "bright and fast-moving, a tailwind kind of stretch",
  "bright|balanced": "warm and quietly favorable",
  "bright|still": "golden but unhurried, like a long late afternoon",
  "mixed|moving": "restless and full of crosscurrents",
  "mixed|balanced": "bittersweet and finely balanced",
  "mixed|still": "hushed and watchful, a held breath",
  "heavy|moving": "stormy, with something coming to a head",
  "heavy|balanced": "heavy-hearted, though far from hopeless",
  "heavy|still": "foggy and slow, weather that lifts in its own time"
};
const TONE = {
  "bright|moving": [
    "There is a sense of doors swinging open almost before you reach them. Plans that felt stuck may start moving on their own, and a message, a meeting or a chance remark could set several things in motion at once. Momentum like this tends to carry people a little further than they expected to go, and the pace can feel giddy. Not everything that arrives quickly will stay, but much of it seems to want you to notice it.",
    "This draw hums with forward motion. Energy that was scattered seems to gather into a single direction, and other people may be unusually willing to come along for the ride. Small wins have a way of stacking up during stretches like this. If there is a risk, it is only that things move fast enough to blur, so the details may matter more than they seem to in the moment."
  ],
  "bright|balanced": [
    "The cards lean kindly toward you without making a fuss about it. Good things here are more likely to arrive as steady improvements than as fireworks: a conversation that goes better than expected, a worry that quietly shrinks, an ordinary day that turns out to be a good one. There is warmth in the background of almost everything this draw touches, even where the individual cards are more complicated.",
    "Something in this spread feels settled and generous. The draw suggests that what you have been tending is beginning to give something back, perhaps in ways that are easy to overlook because they are so undramatic. Relationships, routines and small pleasures carry more weight than usual. The mood is less a lucky break than a slow, reliable brightening."
  ],
  "bright|still": [
    "The good news in this draw is patient. Much of what the cards point to is already in place or ripening slowly, and there is little sense of urgency anywhere on the table. It reads like a pause at the top of a hill: a chance to take in how far things have come. Rest, reflection and contentment seem to be as much a part of the story as anything that happens.",
    "There is a calm, almost sleepy kind of good fortune here. The cards suggest that what matters most is not about to change, and that may be exactly the point. Quiet satisfactions, a slower rhythm and a sense of enough run through the spread. What looks like nothing happening may turn out to be the part you remember fondly later."
  ],
  "mixed|moving": [
    "This draw pulls in several directions at once. Some cards push forward while others drag their heels, and the result is a busy, slightly unsettled feeling, the sense of many small currents rather than one clear tide. You may find yourself juggling news, plans and other people's moods all at the same time. The movement is real, but where it settles is still being decided.",
    "There is plenty of activity in this spread, though not all of it points the same way. Good and difficult influences arrive close together, so a high in one area may sit right beside a snag in another. Things are in motion, and the mood shifts quickly. The cards seem less interested in a single outcome than in how much is changing hands at once."
  ],
  "mixed|balanced": [
    "The cards weigh out almost evenly. For every hopeful note there is a more cautious one, and the overall feeling is bittersweet rather than good or bad. This is the kind of draw that describes ordinary life with all its textures: some things working, some not, most somewhere in between. Nothing here is fixed, and small shifts in either direction could tip the balance.",
    "There is a sense of two hands holding different weights. Gains and losses, comfort and friction, appear side by side throughout this spread. Situations may look different depending on the angle you see them from, and other people may read the same events in very different ways. The draw does not lean hard in either direction, which leaves a great deal still open."
  ],
  "mixed|still": [
    "Much of this draw seems to be waiting. Light and shadow are both present, but neither is in a hurry, and the overall mood is one of suspension, as if the story has paused mid-sentence. Decisions, news or feelings may be gathering just out of view. The stillness is not empty; it is the quiet that tends to come before something becomes clear.",
    "The cards here are quiet and a little guarded. There are hopeful signs and uneasy ones, but most of them are turned toward reflection rather than action. Things may feel on hold, or slower than you would like. Underneath that slowness, something seems to be sorting itself out, the way a muddy glass of water clears if no one shakes it."
  ],
  "heavy|moving": [
    "This is a turbulent draw. Several of the cards carry friction, and they carry it at speed, so things may come to a head faster than feels comfortable. Arguments, surprises or sudden changes of plan could feature, along with the kind of honesty that stings before it helps. Storms like this tend to clear the air, but they rarely ask permission first.",
    "There is pressure building in this spread, and it seems to want an outlet. Tension that has been simmering may break into the open, and events could move before anyone feels ready. It is not a gentle stretch. Even so, a lot of what looks like trouble here also looks like something finally being dealt with rather than endlessly postponed."
  ],
  "heavy|balanced": [
    "The cards carry some weight. Worry, disappointment or old hurts sit close to the surface, and the draw does not pretend otherwise. At the same time, nothing here feels final. The difficulties appear real but workable, the sort that are easier to carry once they are named. There are steadier cards mixed in, like handholds on a hard climb.",
    "This spread has a serious face. Several cards speak of strain, loss or frustration, and the mood may feel heavier than usual. Yet the draw is not frozen in that place: there is still room to move, and some of the harder cards seem to be passing through rather than settling in. It reads like a difficult chapter rather than the whole book."
  ],
  "heavy|still": [
    "This draw has a foggy, slow quality. Many of the cards point to waiting, uncertainty or feeling stuck, and the overall mood may be one of heaviness without a clear cause. Things that should be simple might take longer than they ought to. Fog, though, is weather, not landscape; it hides the road without changing where the road goes.",
    "The cards here are quiet in a way that can feel lonely. Doubt, fatigue or old patterns may be making the days feel longer than they are. Little seems to be moving quickly. But stillness this deep often comes just before a turn, and several cards suggest the heaviness is more about timing than about anything being permanently wrong."
  ]
};
const CHANGE = {
  upheaval: [
    "Change runs strongly through this spread. Something familiar may be ending, shifting shape or being shaken loose, and the draw suggests that the old arrangement will not quite return to how it was.",
    "There is a lot of transformation on the table. Endings and beginnings seem to overlap here, and what looks like disruption from close up may look more like a clearing from further away."
  ],
  shifting: [
    "Change is present but measured. The draw hints at adjustments rather than overhauls: a gradual turning, the kind that becomes obvious only when you look back.",
    "Things are on the move in small ways. The draw suggests a slow rearranging, with a few pieces shifting while the larger shape holds."
  ],
  steady: [
    "Underneath it all, the draw is remarkably stable. Structures, habits and commitments seem to hold firm, for better or worse, and much of the story happens within familiar walls.",
    "There is a strong sense of continuity here. The cards lean toward what lasts: routines, foundations and the things that stay put while everything else talks."
  ]
};
const WEIGHT = {
  big: "With so many Major Arcana on the table, this reads as a chapter rather than a week, and whatever is stirring may echo for a long while.",
  none: "Not a single Major Arcana card appears, which keeps the story human-sized: everyday choices, ordinary days, things close at hand."
};
const ELEMENT = {
  Fire: ["Fire leads this draw, so drive, ambition, creativity and appetite color everything else.", "The Wands give the draw a fiery accent: ambition, nerve and a certain impatience run underneath."],
  Water: ["Water leads this draw, so feelings, relationships and intuition color everything else.", "The Cups give the draw a tidal quality: emotions, loyalties and hunches are doing much of the talking."],
  Air: ["Air leads this draw, so thoughts, words, decisions and conflicts color everything else.", "The Swords give the draw a sharp edge: conversations, judgments and second thoughts loom large."],
  Earth: ["Earth leads this draw, so work, money, the body and the home color everything else.", "The Pentacles give the draw a grounded feel: practical matters, resources and daily routine weigh in heavily."],
  none: ["No single element rules the spread, so the story moves between head, heart, work and will without settling on one.", "The elements are well mixed here, and no one area of life seems to dominate."]
};
const MISSING = { Fire: "drive", Water: "feeling", Air: "clear thinking", Earth: "practical footing" };
const FOCUS = {
  inward: ["Much of the energy here turns inward. The draw seems more concerned with private thoughts, quiet realizations and what goes on beneath the surface than with outside events.", "This is an inward-looking spread, the kind that is felt before it is seen."],
  outward: ["The energy here faces outward. Other people, public moments and shared spaces seem to matter more than usual.", "This is a sociable spread: much of what it describes seems to happen in company."],
  between: ["The draw moves between the private and the public, with some cards turned inward and others reaching toward people and events.", "Inner life and outer events seem to be in conversation throughout this spread."]
};
const REVS = {
  many: "So many reversed cards suggest that much of this is happening below the surface: delayed, held back or not yet admitted.",
  none: "Every card came up upright, and nothing in this draw seems to be hiding."
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

  /* --- aggregates (Major Arcana count a little extra) --- */
  const wt = x => (x.c.suit ? 1 : 1.5), W = cards.reduce((a, x) => a + wt(x), 0);
  const avg = key => cards.reduce((a, x) => a + x.s[key] * wt(x), 0) / W;
  const A = { v: avg("v"), m: avg("m"), ch: avg("ch"), inw: avg("inw") };
  const tV = A.v >= 0.6 ? "bright" : A.v <= -0.6 ? "heavy" : "mixed";
  const tM = A.m >= 0.6 ? "moving" : A.m <= -0.6 ? "still" : "balanced";
  const tC = A.ch >= 0.8 ? "upheaval" : A.ch <= -0.5 ? "steady" : "shifting";
  const tI = A.inw >= 0.8 ? "inward" : A.inw <= -0.5 ? "outward" : "between";

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
  /* 1. the highlight */
  const vibe = VIBE[tV + "|" + tM];
  let p1 = opts.question ? `You asked: “${opts.question}” ` : "";
  if (n === 1) p1 += `With only ${cardName(hi.c, hi.r)} on the table, the general vibe of this reading is ${vibe}.`;
  else p1 += `Highlighting ${cardName(hi.c, hi.r)}${hi.pos ? `, in the ${hi.pos} position,` : ""} and considering the others in the context of this draw, the general vibe is ${vibe}.`;
  const kw = (hi.r ? hi.c.rv : hi.c.up).k.split(",").map(k => k.trim());
  const relation = n === 1 ? "and with nothing else on the table, it speaks for the whole reading"
    : Math.abs(A.v) < 0.3 ? "and the cards around it soften and complicate that mood rather than repeat it"
    : Math.sign(hi.s.v) === Math.sign(A.v) ? "and most of the cards around it echo that mood"
    : "and much of the rest of the draw pushes against that mood";
  p1 += ` Picture ${hi.ph.i}. Its themes of ${list(kw, "and")} set the tone, ${relation}.`;
  paras.push(p1);

  /* 2. the overall tone */
  paras.push(pick(TONE[tV + "|" + tM]));

  /* 3. change, weight and reversals */
  const majors = cards.filter(x => !x.c.suit).length, rev = cards.filter(x => x.r).length;
  let p3 = pick(CHANGE[tC]);
  if (n >= 3 && majors / n >= 0.4) p3 += " " + WEIGHT.big;
  else if (n >= 3 && majors === 0) p3 += " " + WEIGHT.none;
  if (n >= 3 && rev / n >= 0.5) p3 += " " + REVS.many;
  else if (n >= 3 && rev === 0) p3 += " " + REVS.none;
  paras.push(p3);

  /* 4. element and focus */
  const sc = {}; cards.forEach(x => { if (x.c.suit) sc[x.c.suit] = (sc[x.c.suit] || 0) + 1; });
  const top = Object.entries(sc).sort((a, b) => b[1] - a[1]);
  const lead = top.length && (n === 1 || top[0][1] >= 2) && (!top[1] || top[0][1] > top[1][1]) ? D.SUITS[top[0][0]].el : null;
  let p4 = n === 1 && !hi.c.suit ? "A Major Arcana card drawn alone tends to speak about a larger theme rather than a single event." : pick(ELEMENT[lead || "none"]);
  if (n >= 5) {
    const miss = Object.keys(D.SUITS).filter(s => !sc[s]).map(s => D.SUITS[s].el);
    if (miss.length === 1) p4 += ` The absence of ${miss[0]} suggests that ${MISSING[miss[0]]} may be the quiet missing ingredient.`;
    else if (miss.length === 2) p4 += ` With ${miss[0]} and ${miss[1]} both absent, ${MISSING[miss[0]]} and ${MISSING[miss[1]]} may be in short supply.`;
  }
  p4 += " " + pick(FOCUS[tI]);
  const courts = cards.filter(x => x.c.rank > 10);
  if (courts.length >= 2) p4 += ` The court cards may point to real people in your life, or to different sides of yourself taking turns at the wheel.`;
  else if (courts.length === 1 && n > 1) p4 += ` ${cardName(courts[0].c, false).replace(/^the/, "The")} may stand for a real person, or for a side of you that is about to step forward.`;
  paras.push(p4);

  /* 5. what it might mean, and the message */
  const omenFrom = ranked.slice(0, 3), cautionFrom = cards.slice().sort((a, b) => a.s.v - b.s.v).slice(0, 2);
  const omens = []; omenFrom.forEach((x, j) => omens.push(x.ph.o[j % 3]));
  while (omens.length < 3) omens.push(hi.ph.o[omens.length]);
  const cautions = [...new Set(cautionFrom.map((x, j) => x.ph.c[j % 2]).concat(hi.ph.c[0]))].slice(0, 2);
  let p5 = `In the broadest strokes, this might mean ${list(omens, "and/or")} coming up in your life, but be careful of ${list(cautions, "and")}.`;
  p5 += ` If the cards are trying to tell you anything, it is that ${hi.ph.t}.`;
  if (second) p5 += ` ${cardName(second.c, second.r).replace(/^the/, "The")} adds a quieter note: ${second.ph.t}.`;
  paras.push(p5);

  /* keep it within 300 to 500 words */
  let total = paras.reduce((a, p) => a + words(p), 0);
  if (total < 300) { // short draws get both tone passages and a word on the inner focus
    const extra = TONE[tV + "|" + tM].find(t => t !== paras[1]);
    paras.splice(2, 0, extra); total += words(extra);
  }
  if (total < 300) { // a single card can still come up short
    const more = CHANGE[tC].find(t => !paras.some(p => p.includes(t)));
    if (more) { paras[paras.length - 3] += " " + more; total += words(more); }
  }
  if (total > 500) { paras[3] = paras[3].split(/(?<=\.)\s/).slice(0, 2).join(" "); }

  const html = paras.map(p => esc(p).replace(/\u0001/g, "<b>").replace(/\u0002/g, "</b>"));
  const text = paras.map(p => p.replace(/[\u0001\u0002]/g, ""));
  return { text, html, highlight: hi.k, scores: cards.map(x => x.s), averages: A, words: text.reduce((a, p) => a + words(p), 0) };
}

root.TarotNarrative = Object.freeze({ tell, score, UP, REVERSED });
})(typeof window !== "undefined" ? window : globalThis);

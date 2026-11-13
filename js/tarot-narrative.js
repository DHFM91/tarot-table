/*
 * Free Tarot Readings: narrative generator.
 * Turns a finished draw into a short story of what the cards are "trying to tell you".
 * It describes; it never gives instructions. Fully offline: no AI, no network.
 * Needs tarot-data.js, tarot-engine.js and tarot-phrases.js loaded first.
 * Exposes one global: TarotNarrative.
 *
 *   TarotNarrative.tell(drawn, spreadKey, { question })  ->  { text: [paragraphs], html: [paragraphs] }
 *     drawn: [{ i, r }] in spread order (as from TarotEngine.orient)
 *     The same draw always tells the same story; a different draw picks different wording.
 */
(function (root) {
"use strict";
const D = root.TarotData, E = root.TarotEngine, P = root.TarotPhrases;
if (!D || !E || !P) throw new Error("tarot-narrative.js needs tarot-data.js, tarot-engine.js and tarot-phrases.js loaded first");

/* What each spread position does in the story. */
const ROLES = {
  one: ["focus"],
  ppf: ["past", "present", "future"],
  sao: ["situation", "action", "outcome"],
  mbs: ["mind", "body", "spirit"],
  cross5: ["present", "past", "future", "foundation", "potential"],
  paths: ["self", "pathA", "pathAout", "pathB", "pathBout", "advice"],
  horseshoe: ["past", "present", "hidden", "challenge", "others", "advice", "outcome"],
  celtic: ["present", "challenge", "foundation", "past", "potential", "future", "self", "others", "hopes", "outcome"]
};

const MOOD = {
  Fire: ["a fire-lit reading, restless and hungry", "a reading that crackles, all heat and appetite", "a reading full of sparks and impatience"],
  Water: ["a tidal reading, all undercurrent and feeling", "a reading that runs deep and quiet, like water under ice", "a reading that moves the way feelings do, sideways and then all at once"],
  Air: ["a windy reading, full of voices and sharp edges", "a reading crowded with thoughts, words and things left unsaid", "a reading that cuts, clean and cold as a draft under a door"],
  Earth: ["a heavy, grounded reading, the kind you can almost hold in your hands", "a reading that smells of soil, coins and long work", "a slow reading, rooted in the body, the home and the bank balance"]
};

/* Notable pairings, read when both cards appear anywhere in the draw (by Major Arcana number). */
const PAIRS = [
  [16, 17, "The Tower and the Star together tell one of the oldest stories in the deck: what falls clears the sky, and hope is easier to see once the walls are gone."],
  [0, 21, "The Fool and the World share this table, the first step and the last. Something here is ending and beginning in the same breath."],
  [13, 19, "Death and the Sun appear side by side: an ending, and right behind it, a warmth that couldn't arrive while the old thing still stood."],
  [6, 15, "The Lovers and the Devil both turned up. Attraction and attachment look alike from a distance, and this reading is interested in the difference."],
  [18, 19, "The Moon and the Sun both rose in this spread. What is murky now has a way of looking obvious in daylight."],
  [1, 2, "The Magician and the High Priestess sit together: what you can do and what you already know, the loud power and the quiet one."],
  [3, 4, "The Empress and the Emperor both appear, growth and structure, the garden and the wall around it."],
  [10, 11, "The Wheel and Justice turn up together. Luck and consequence are both at work here, and it may be hard to tell which is which."],
  [12, 7, "The Hanged Man and the Chariot pull against each other: one waits upside down, the other charges forward. Timing is the hidden subject of this reading."],
  [8, 15, "Strength and the Devil face each other here: the patient hand on the lion, and the chain that only looks unbreakable."],
  [13, 20, "Death and Judgement both appear. Something is being laid to rest, and something is being called back up."],
  [14, 16, "Temperance and the Tower make an uneasy pair: the slow, careful pour, and the lightning strike."],
  [9, 17, "The Hermit's lantern and the Star's light both shine in this reading. Solitude and hope are not opposites here."],
  [5, 0, "The Hierophant and the Fool sit at the same table: the rulebook, and the person who never read it."]
];

/* ---------- helpers ---------- */
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const B = "\u0001", E2 = "\u0002"; // marks a card name, turned into bold in html
function list(items, last) {
  if (items.length < 2) return items[0] || "";
  if (items.length === 2) return `${items[0]} ${last} ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, ${last} ${items[items.length - 1]}`;
}

function tell(drawn, spreadKey, opts = {}) {
  const roles = ROLES[spreadKey] || drawn.map(() => "focus");
  const cards = drawn.map((d, k) => {
    const c = D.deck[d.i], ph = P[c.id];
    if (!ph) throw new Error("No phrases for " + c.id);
    return { c, r: !!d.r, ph: d.r ? ph.rv : ph.up, role: roles[k] || "focus", k };
  });
  const seed = spreadKey + "|" + drawn.map(d => d.i + (d.r ? "r" : "u")).join(",") + "|" + (opts.question || "");
  const rng = E.seededRng(seed);
  const pick = a => a[rng(a.length)];
  const choose = fns => pick(fns)(); // build only the chosen wording, so names and phrases aren't used up by the other
  const used = new Set();
  /** An unused omen/caution from a card; falls back to any if all are used. */
  const take = (x, key) => {
    const pool = x.ph[key].filter(s => !used.has(s));
    const s = pick(pool.length ? pool : x.ph[key]);
    used.add(s); return s;
  };
  /* Card names read naturally: "the Ace of Cups", "the Hierophant", "Strength", "the Wheel of Fortune".
     "(reversed)" is added only the first time a card is named. */
  const named = new Set();
  const the = x => {
    let name = x.c.name, art = "the ";
    if (name.startsWith("The ")) name = name.slice(4);
    else if (!x.c.suit && name !== "Wheel of Fortune") art = "";
    const first = !named.has(x.k); named.add(x.k);
    return `${art}${B}${name}${x.r && first ? " (reversed)" : ""}${E2}`;
  };
  const The = x => { const t = the(x); return t.charAt(0) === B ? t : cap(t); };
  const byRole = (...rs) => cards.filter(x => rs.includes(x.role));
  const paras = [];

  /* ----- single card ----- */
  if (cards.length === 1) {
    const x = cards[0];
    paras.push(`${opts.question ? `You asked: “${opts.question}” ` : ""}${The(x)} answers alone. Picture ${x.ph.i}.`);
    paras.push(`This might mean ${list([take(x, "o"), take(x, "o"), take(x, "o")], "and/or")} coming up in your life, but be careful of ${list([take(x, "c"), take(x, "c")], "and")}.`);
    paras.push(`If this card is trying to tell you anything, it's that ${x.ph.t}.`);
    return render(paras);
  }

  /* ----- opening: the weather of the reading ----- */
  const n = cards.length, majors = cards.filter(x => !x.c.suit).length, rev = cards.filter(x => x.r).length;
  const sc = {}; cards.forEach(x => { if (x.c.suit) sc[x.c.suit] = (sc[x.c.suit] || 0) + 1; });
  const top = Object.entries(sc).sort((a, b) => b[1] - a[1]);
  const lead = top.length && top[0][1] >= 2 && (!top[1] || top[0][1] > top[1][1]) ? D.SUITS[top[0][0]].el : null;
  let open = opts.question ? `You asked: “${opts.question}” ` : "";
  open += lead ? `This is ${pick(MOOD[lead])}.` : pick(["No single element rules this spread, so the story pulls in several directions at once.", "The elements are mixed here, and the story keeps changing its weather."]);
  if (majors / n >= 0.5) open += " The Major Arcana crowd the table, so this is less about the week ahead than about a whole chapter of your life.";
  else if (majors === 0) open += " Not one Major Arcana card appears; this is a human-sized story, made of ordinary days.";
  if (rev / n >= 0.5) open += " Many of the cards came up turned away, so much of what follows is happening under the surface: delayed, held in, or not yet admitted.";
  else if (rev === 0) open += " Every card faces you squarely, and nothing here is hiding.";
  const heart = byRole("present", "focus", "self", "situation", "mind")[0] || cards[0];
  open += ` At the center sits ${the(heart)}: picture ${heart.ph.i}.`;
  paras.push(open);

  /* ----- two paths ----- */
  if (spreadKey === "paths") {
    const [you, a1, a2, b1, b2, adv] = cards;
    paras.push(`Where you stand now, ${the(you)} suggests ${take(you, "o")}.`);
    paras.push(`Down one road, ${the(a1)} and ${the(a2)} suggest ${take(a1, "o")}, and further along, ${take(a2, "o")}, though that way carries the risk of ${take(a1, "c")}.`);
    paras.push(`Down the other, ${the(b1)} and ${the(b2)} suggest ${take(b1, "o")}, and later ${take(b2, "o")}, with the shadow of ${take(b1, "c")}.`);
    paras.push(`Neither road is marked as the right one. ${The(adv)} simply notes that ${adv.ph.t}.`);
    threads(); return render(paras);
  }

  /* ----- mind, body, spirit ----- */
  if (spreadKey === "mbs") {
    const [m, b, s] = cards;
    paras.push(`In your thoughts, ${the(m)} stirs up ${take(m, "o")}. In your body and your days, ${the(b)} brings ${take(b, "o")}. And deeper down, ${the(s)} carries ${take(s, "o")}.`);
    paras.push(`This might mean ${list([take(m, "o"), take(b, "o"), take(s, "o")], "and/or")} coming up in your life, but be careful of ${list([take(m, "c"), take(b, "c"), take(s, "c")], "and")}.`);
    threads();
    paras.push(`If the cards are trying to tell you anything, it's that ${s.ph.t}.`);
    return render(paras);
  }

  /* ----- where it comes from ----- */
  const back = [];
  byRole("past").forEach(x => back.push(choose([() => `Behind you, ${the(x)} points back to ${take(x, "o")}.`, () => `${The(x)} looks backward, to ${take(x, "o")}.`])));
  byRole("foundation").forEach(x => back.push(`Underneath it all, ${the(x)} hints at ${take(x, "o")}.`));
  byRole("situation").forEach(x => back.push(`The situation, as ${the(x)} draws it, involves ${take(x, "o")}.`));
  if (back.length) paras.push(back.join(" "));

  /* ----- the present tense of the story ----- */
  const now = [];
  byRole("present").forEach(x => now.push(`Right now, the story turns on ${take(x, "o")}.`));
  byRole("challenge").forEach(x => now.push(spreadKey === "celtic"
    ? `Crossing it, ${the(x)} brings ${take(x, "o")}, and with it the danger of ${take(x, "c")}.`
    : choose([() => `In the way stands ${the(x)}: ${take(x, "o")}, and the risk of ${take(x, "c")}.`, () => `The obstacle, ${the(x)}, looks like ${take(x, "o")}, with the danger of ${take(x, "c")}.`])));
  byRole("self").forEach(x => now.push(`As for you, ${the(x)} shows ${x.ph.i}.`));
  byRole("hidden").forEach(x => now.push(`Out of sight, ${the(x)} hints that something like ${take(x, "o")} may already be moving.`));
  byRole("others").forEach(x => now.push(`Around you, ${the(x)} suggests other people may bring ${take(x, "o")}.`));
  byRole("hopes").forEach(x => now.push(`In what you hope for and what you dread, ${the(x)} places ${take(x, "o")}. Sometimes those turn out to be the same thing.`));
  byRole("action").forEach(x => now.push(`Something is already in motion: ${the(x)} shows ${x.ph.i}.`));
  if (now.length) paras.push(now.join(" "));

  /* ----- what's coming, and what to watch ----- */
  const ahead = byRole("future", "potential", "outcome");
  const omens = [];
  ahead.forEach(x => omens.push(take(x, "o")));
  for (let k = 0; omens.length < 3 && k < 6; k++) omens.push(take(ahead[k % ahead.length] || cards[n - 1], "o"));
  const warnFrom = [...byRole("challenge"), ...cards.filter(x => x.r && x.role !== "challenge"), ...ahead, ...cards];
  const cautions = [];
  for (const x of warnFrom) { if (cautions.length >= 3) break; const c = take(x, "c"); if (!cautions.includes(c)) cautions.push(c); }
  const lookAhead = ahead.length ? `Looking ahead to ${list(ahead.map(the), "and")}, this` : "This";
  paras.push(`${lookAhead} might mean ${list(omens.slice(0, 3), "and/or")} coming up in your life, but be careful of ${list(cautions, "and")}.`);
  const adv = byRole("advice")[0];
  if (adv) paras.push(`The cards point toward ${adv.ph.i}; ${the(adv)} adds that ${adv.ph.t}.`);

  threads();

  /* ----- what the cards are trying to tell you ----- */
  const last = byRole("outcome")[0] || byRole("future")[0] || cards[n - 1];
  let close = `If the cards are trying to tell you anything, it's that ${last.ph.t}.`;
  if (heart !== last) close += ` And ${the(heart)}, at the center of it all, adds a quieter note: ${heart.ph.t}.`;
  paras.push(close);
  return render(paras);

  /* ----- threads between cards ----- */
  function threads() {
    const out = [];
    const nums = new Set(cards.filter(x => !x.c.suit).map(x => x.c.num));
    PAIRS.forEach(([a, b, s]) => { if (nums.has(a) && nums.has(b) && out.length < 2) out.push(s); });
    const rc = {};
    cards.forEach(x => { if (x.c.rank) (rc[x.c.rank] = rc[x.c.rank] || []).push(x); });
    Object.values(rc).filter(g => g.length >= 2).slice(0, 1).forEach(g => {
      const r = g[0].c.rank;
      out.push(`${["", "", "Two", "Three", "Four"][g.length] || g.length} ${r > 10 ? D.RANKS[r - 1] + "s" : D.RANKS[r - 1] + (r === 6 ? "es" : "s")} repeat across the spread, an echo about ${D.NUM[r]}.`);
    });
    const courts = cards.filter(x => x.c.rank > 10);
    if (courts.length >= 2) out.push(`${cap(list(courts.map(the), "and"))} may stand for real people, someone you already know, or a version of yourself you haven't met yet.`);
    else if (courts.length === 1) out.push(`${The(courts[0])} may be a real person in this story, or a side of you that's about to step forward.`);
    if (out.length) paras.push(out.join(" "));
  }
}

function render(paras) {
  return {
    text: paras.map(p => p.replace(/[\u0001\u0002]/g, "")),
    html: paras.map(p => esc(p).replace(/\u0001/g, "<b>").replace(/\u0002/g, "</b>"))
  };
}

root.TarotNarrative = Object.freeze({ tell, ROLES });
})(typeof window !== "undefined" ? window : globalThis);

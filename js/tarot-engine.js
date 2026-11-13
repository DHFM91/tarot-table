/*
 * Free Tarot Readings: deck mechanics and reading analysis.
 * Pure functions with no DOM access. Needs tarot-data.js loaded first.
 * Exposes one global: TarotEngine.
 *
 * A "deck" here is an array of { i, r }:
 *   i = index into TarotData.deck, r = true when the card is upside down (reversed).
 * Every function returns a NEW array and never changes the one passed in.
 *
 * Randomness: crypto.getRandomValues by default. Pass your own rng (a function returning
 * an integer in [0, n) for rng(n)) to any function, e.g. TarotEngine.seededRng("2026-11-13")
 * for a repeatable result such as a card of the day.
 */
(function (root) {
"use strict";
const D = root.TarotData;
if (!D) throw new Error("tarot-engine.js needs tarot-data.js loaded first");

/* ---------- randomness ---------- */
function cryptoRng(n) {
  const a = new Uint32Array(1);
  // Rejection sampling removes modulo bias.
  const limit = Math.floor(0x100000000 / n) * n;
  do { crypto.getRandomValues(a); } while (a[0] >= limit);
  return a[0] % n;
}
/** Repeatable rng from any string (FNV-1a hash into mulberry32). */
function seededRng(seed) {
  let h = 2166136261;
  for (const ch of String(seed)) { h ^= ch.codePointAt(0); h = Math.imul(h, 16777619); }
  let t = h >>> 0;
  return function (n) {
    t = (t + 0x6D2B79F5) >>> 0;
    let x = t;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return (((x ^ (x >>> 14)) >>> 0) / 4294967296 * n) | 0;
  };
}
const coin = rng => rng(2) === 0;
/** True with probability p (0..1). */
const chance = (p, rng) => rng(1000000) < p * 1000000;
function fisherYates(a, rng) {
  for (let j = a.length - 1; j > 0; j--) { const k = rng(j + 1); [a[j], a[k]] = [a[k], a[j]]; }
  return a;
}

/* ---------- deck ---------- */
/** A brand-new deck: standard order, all upright. */
function freshDeck() { return D.deck.map((c, i) => ({ i, r: false })); }

/** Share of cards that start reversed for each kind of deck. */
const DECK_KINDS = Object.freeze({
  used:  { name: "Well-used deck", desc: "Shuffled many times before; cards are turned every which way (about half reversed).", reversed: 0.5 },
  light: { name: "Lightly used deck", desc: "Only shuffled a little before; about a quarter of the cards are reversed.", reversed: 0.25 },
  new:   { name: "Brand-new deck", desc: "Straight out of the box: in order, every card upright.", reversed: 0 }
});
/** A deck of the given kind: "used" | "light" | "new". Used and light decks start in random order. */
function newDeck(kind = "used", rng = cryptoRng) {
  const k = DECK_KINDS[kind];
  if (!k) throw new Error("Unknown deck kind: " + kind);
  if (kind === "new") return freshDeck();
  return fisherYates(D.deck.map((c, i) => ({ i, r: chance(k.reversed, rng) })), rng);
}

/**
 * How each shuffle turns cards, as in real hands:
 *   overhand / hindu: each packet has this chance of landing turned end-over-end
 *   pile: chance that each pile is picked up turned around
 *   wash: chance that each card gets flipped while swirling
 */
const TURN_CHANCE = Object.freeze({ overhand: 0.04, hindu: 0.03, pile: 0.10, wash: 0.5 });
/** Turn a packet end-over-end: its order reverses and every card in it flips. */
function turnPacket(p) { return p.slice().reverse().map(o => ({ i: o.i, r: !o.r })); }

/* ---------- shuffles ---------- */
/** Drop cards from two packets in proportion to their sizes (Gilbert-Shannon-Reeds model). */
function interleave(A, B, rng = cryptoRng) {
  A = A.slice(); B = B.slice();
  const out = [];
  while (A.length || B.length) out.push(rng(A.length + B.length) < A.length ? A.shift() : B.shift());
  return out;
}
/** Straight riffle: split at a binomial point and marry the halves without turning either stack. Keeps orientation. */
function riffle(d, rng = cryptoRng) {
  let k = 0;
  for (let j = 0; j < d.length; j++) if (coin(rng)) k++;
  return interleave(d.slice(0, k), d.slice(k), rng);
}
/** Overhand: peel packets of min..max cards off the top onto a new pile; now and then one lands turned. */
function overhand(d, rng = cryptoRng, min = 1, max = 8, turn = TURN_CHANCE.overhand) {
  const src = d.slice();
  let out = [];
  while (src.length) {
    const k = Math.min(src.length, min + rng(max - min + 1));
    let p = src.splice(0, k);
    if (chance(turn, rng)) p = turnPacket(p);
    out = p.concat(out);
  }
  return out;
}
/** Hindu: like overhand, but bigger packets drawn off the top. */
function hindu(d, rng = cryptoRng) { return overhand(d, rng, 3, 12, TURN_CHANCE.hindu); }
/** Wash (scramble): full random order, and each card has a 50% chance of being turned. */
function wash(d, rng = cryptoRng) {
  return fisherYates(d.map(o => ({ i: o.i, r: chance(TURN_CHANCE.wash, rng) ? !o.r : o.r })), rng);
}
/** Pile: deal round-robin into n piles, then gather them in random order; a pile is sometimes picked up turned. */
function pileShuffle(d, n = 5, rng = cryptoRng) {
  const P = Array.from({ length: n }, () => []);
  d.forEach((c, j) => P[j % n].unshift(c));
  return fisherYates([...P.keys()], rng).flatMap(j => (chance(TURN_CHANCE.pile, rng) ? turnPacket(P[j]) : P[j]));
}
/** Turned riffle: rotate one hand's stack (roughly half the deck) end-over-end, then riffle the halves together. */
function turnAndRiffle(d, rng = cryptoRng) {
  const k = Math.floor(d.length / 2) - 4 + rng(9);
  return interleave(turnPacket(d.slice(0, k)), d.slice(k), rng);
}
/** Run a shuffle by name: overhand | riffle | hindu | wash | pile | turn. */
function shuffle(d, style, opts = {}) {
  const rng = opts.rng || cryptoRng;
  switch (style) {
    case "riffle": return riffle(d, rng);
    case "overhand": return overhand(overhand(d, rng), rng); // two passes, as most people do
    case "hindu": return hindu(d, rng);
    case "wash": return wash(d, rng);
    case "pile": return pileShuffle(d, opts.piles || 5, rng);
    case "turn": return turnAndRiffle(d, rng); // riffle with one half turned
    default: throw new Error("Unknown shuffle: " + style);
  }
}

/* ---------- cuts ---------- */
/** Lift k cards off the top and put them underneath. */
function cutSingle(d, k) { return d.slice(k).concat(d.slice(0, k)); }
/** Random sizes for a three-pile cut, roughly a third each. */
function threePileSizes(total = 78, rng = cryptoRng) {
  const third = Math.floor(total / 3);
  const a = third - 6 + rng(8), b = third - 6 + rng(8);
  return [a, b, total - a - b];
}
/** Split into piles of the given sizes (top portion first), then restack in `order`; order[0] becomes the new top. */
function cutPiles(d, sizes, order) {
  const P = []; let at = 0;
  sizes.forEach(n => { P.push(d.slice(at, at + n)); at += n; });
  return order.flatMap(j => P[j]);
}

/* ---------- deals ---------- */
function dealTop(d, n) { return d.slice(0, n); }
/** Count through the deck and take every `step`th card, wrapping around as cards are removed. */
function dealEveryNth(d, n, step = 7) {
  const a = d.slice(), out = [];
  let idx = 0;
  for (let k = 0; k < n; k++) { idx = (idx + step - 1) % a.length; out.push(a.splice(idx, 1)[0]); }
  return out;
}
/** Decide final orientation. mode: "natural" (as shuffled) | "random" (50/50) | "none" (all upright). */
function orient(cards, mode, rng = cryptoRng) {
  return cards.map(o => ({ i: o.i, r: mode === "none" ? false : mode === "random" ? coin(rng) : o.r }));
}

/** One card for a date (default: today, local time). Same date gives the same card for everyone. */
function dailyCard(date = new Date(), opts = {}) {
  const key = typeof date === "string" ? date
    : `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const rng = seededRng("tarot-table:" + key + (opts.salt || ""));
  const o = { i: rng(78), r: opts.reversals === false ? false : coin(rng) };
  return { ...o, card: D.deck[o.i], date: key };
}

/* ---------- reading analysis ---------- */
/**
 * Overall patterns in a reading.
 * drawn: [{ i, r }] in spread order. spreadKey: a key of TarotData.SPREADS. revMode: "natural" | "random" | "none".
 * Returns [{ title, text }] with plain-text strings, so any page can style them however it likes.
 */
function analyze(drawn, spreadKey, revMode = "natural") {
  const C = drawn.map(d => ({ c: D.deck[d.i], r: d.r })), n = C.length, out = [];
  if (n < 3) return out;
  const face = x => (x.r ? x.c.rv : x.c.up);
  const firstKw = x => face(x).k.split(",")[0].trim();
  const plural = r => (r > 10 ? D.RANKS[r - 1] + "s" : D.RANKS[r - 1] + (r === 6 ? "es" : "s"));

  const maj = C.filter(x => !x.c.suit).length;
  if (maj / n >= 0.5) out.push({ title: `Major Arcana dominate (${maj} of ${n}).`, text: "This reading points to big life themes and turning points rather than day-to-day matters." });
  else if (maj === 0) out.push({ title: "No Major Arcana.", text: "The situation rests on everyday choices that are largely in your hands." });

  const sc = {};
  C.forEach(x => { if (x.c.suit) sc[x.c.suit] = (sc[x.c.suit] || 0) + 1; });
  const top = Object.entries(sc).sort((a, b) => b[1] - a[1]);
  if (top.length && top[0][1] >= 2 && (!top[1] || top[0][1] > top[1][1])) {
    const s = top[0][0];
    out.push({ title: `${s} lead (${D.SUITS[s].el}, ${top[0][1]} cards).`, text: `Expect themes of ${D.SUITS[s].t}.` });
  }
  if (n >= 5) {
    const miss = Object.keys(D.SUITS).filter(s => !sc[s]);
    if (miss.length && miss.length < 4) out.push({
      title: `Missing ${miss.map(s => `${s} (${D.SUITS[s].el})`).join(", ")}.`,
      text: `These areas may be overlooked: ${miss.map(s => D.SUITS[s].t.split(",")[0]).join("; ")}.`
    });
  }
  if (revMode !== "none") {
    const rv = C.filter(x => x.r).length;
    if (rv / n >= 0.5) out.push({ title: `Many reversals (${rv} of ${n}).`, text: "Energy may be blocked, delayed or turned inward. Look at what you're resisting." });
    else if (rv === 0) out.push({ title: "All upright.", text: "The energies here are flowing openly." });
  }
  const courts = C.filter(x => x.c.rank > 10).length;
  if (courts >= 2) out.push({ title: `${courts} court cards.`, text: "Other people, or different sides of yourself, play big roles here." });

  const rc = {};
  C.forEach(x => { if (x.c.rank) rc[x.c.rank] = (rc[x.c.rank] || 0) + 1; });
  Object.entries(rc).filter(e => e[1] >= 2).forEach(([r, k]) =>
    out.push({ title: `${k} ${plural(+r)} repeat,`, text: `emphasizing ${D.NUM[r]}.` }));

  const a = C[0], z = C[n - 1];
  out.push({ title: "The arc:", text: `from ${firstKw(a)} (${a.c.name}) toward ${firstKw(z)} (${z.c.name}).` });

  if (spreadKey === "celtic" && n === 10) out.push({
    title: "Outcome and Hopes & Fears:",
    text: `read ${C[9].c.name} alongside ${C[8].c.name}. The outcome often mirrors what you're wishing for or bracing against.`
  });
  if (spreadKey === "paths" && n === 6) {
    const w = k => { const s = C.slice(k, k + 2); return `${s.filter(x => x.r).length} reversed, ${s.filter(x => !x.c.suit).length} major`; };
    out.push({ title: "Comparing the paths:", text: `Path A has ${w(1)}; Path B has ${w(3)}. Reversals suggest friction, and Major Arcana suggest weight.` });
  }
  return out;
}

root.TarotEngine = Object.freeze({
  cryptoRng, seededRng, freshDeck, newDeck, DECK_KINDS, TURN_CHANCE, turnPacket,
  interleave, riffle, overhand, hindu, wash, pileShuffle, turnAndRiffle, shuffle,
  cutSingle, threePileSizes, cutPiles,
  dealTop, dealEveryNth, orient, dailyCard, analyze
});
})(typeof window !== "undefined" ? window : globalThis);

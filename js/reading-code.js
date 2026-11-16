/*
 * Free Tarot Readings: shareable reading codes.
 * Packs a finished reading (spread, reversal setting, each card and its orientation) into a short code
 * like "K7QM-XW3P" that anyone can paste into the app to see the same reading. No server needed.
 * Needs tarot-data.js loaded first. Exposes one global: TarotCode.
 *
 *   TarotCode.encode({ spread, rev, drawn })  ->  "K7QM-XW3P"   (drawn: [{ i, r }] in spread order)
 *   TarotCode.decode(code)                    ->  { spread, rev, drawn }   or throws Error with a friendly message
 *
 * Layout (bits): version (3) | spread (3) | reversal setting (2) | per card: index (7) + reversed (1) | padding
 * Written in Crockford base32 (no I, L, O or U, so it's easy to read aloud and retype), plus two check
 * characters that catch any single mistyped character and any swapped pair of neighbours.
 * The spread order below is fixed forever: append new spreads at the end, never reorder.
 */
(function (root) {
"use strict";
const D = root.TarotData;
if (!D) throw new Error("reading-code.js needs tarot-data.js loaded first");

const VERSION = 1;
const SPREAD_ORDER = ["one", "ppf", "sao", "mbs", "cross5", "paths", "horseshoe", "celtic"];
const REV_ORDER = ["natural", "random", "none"];
const ALPHA = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

/* Weighted sum mod 1021 (a prime) with weights 1..n. Because 1021 is prime and larger than
   any symbol difference or weight, one changed character or one swapped neighbour pair always changes it. */
function check(symbols) {
  let s = 0;
  symbols.forEach((v, k) => { s = (s + v * (k + 1)) % 1021; });
  return [s >> 5, s & 31];
}

function encode({ spread, rev, drawn }) {
  const si = SPREAD_ORDER.indexOf(spread), ri = REV_ORDER.indexOf(rev);
  if (si < 0) throw new Error("Unknown spread: " + spread);
  if (ri < 0) throw new Error("Unknown reversal setting: " + rev);
  if (drawn.length !== D.SPREADS[spread].pos.length) throw new Error("Card count doesn't match the spread");
  const bits = [];
  const put = (v, n) => { for (let k = n - 1; k >= 0; k--) bits.push((v >> k) & 1); };
  put(VERSION, 3); put(si, 3); put(ri, 2);
  drawn.forEach(d => { put(d.i, 7); put(d.r ? 1 : 0, 1); });
  while (bits.length % 5) bits.push(0);
  const syms = [];
  for (let k = 0; k < bits.length; k += 5) syms.push(bits.slice(k, k + 5).reduce((a, b) => a * 2 + b, 0));
  syms.push(...check(syms));
  const s = syms.map(v => ALPHA[v]).join("");
  return s.match(/.{1,4}/g).join("-");
}

function decode(code) {
  let s = String(code || "").toUpperCase().replace(/[^0-9A-Z]/g, "");
  if (s.startsWith("FTR")) s = s.slice(3);           // allow an optional "FTR-" prefix
  s = s.replace(/[IL]/g, "1").replace(/O/g, "0");       // forgive look-alike letters
  if (s.length < 3) throw new Error("That code is too short.");
  const syms = [...s].map(ch => {
    const v = ALPHA.indexOf(ch);
    if (v < 0) throw new Error(`"${ch}" can't appear in a reading code.`);
    return v;
  });
  const body = syms.slice(0, -2), chk = syms.slice(-2), want = check(body);
  if (chk[0] !== want[0] || chk[1] !== want[1]) throw new Error("That code doesn't check out. Look for a mistyped character.");
  const bits = [];
  body.forEach(v => { for (let k = 4; k >= 0; k--) bits.push((v >> k) & 1); });
  let at = 0;
  const take = n => { let v = 0; for (let k = 0; k < n; k++) v = v * 2 + (bits[at++] || 0); return v; };
  const ver = take(3);
  if (ver !== VERSION) throw new Error("That code comes from a newer version of Free Tarot Readings.");
  const spread = SPREAD_ORDER[take(3)], rev = REV_ORDER[take(2)];
  if (!spread || !rev) throw new Error("That code doesn't match any reading.");
  const n = D.SPREADS[spread].pos.length;
  if (bits.length < 8 + 8 * n || bits.length >= 8 + 8 * n + 5) throw new Error("That code is the wrong length for its spread.");
  const drawn = [];
  for (let k = 0; k < n; k++) {
    const i = take(7), r = take(1) === 1;
    if (i >= D.deck.length) throw new Error("That code names a card that doesn't exist.");
    drawn.push({ i, r });
  }
  if (new Set(drawn.map(d => d.i)).size !== n) throw new Error("That code repeats a card, so it can't be a real reading.");
  return { spread, rev, drawn };
}

root.TarotCode = Object.freeze({ encode, decode, VERSION, SPREAD_ORDER });
})(typeof window !== "undefined" ? window : globalThis);

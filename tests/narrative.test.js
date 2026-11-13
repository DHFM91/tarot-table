// Run: node tests/narrative.test.js
// Writes thousands of vibe readings per spread and checks length, mechanics and tone rules.
const path = require('path');
globalThis.crypto ??= require('crypto').webcrypto;
for (const f of ['tarot-data', 'tarot-engine', 'tarot-phrases', 'tarot-narrative']) require(path.join(__dirname, '..', 'js', f + '.js'));
const E = TarotEngine, D = TarotData, N = TarotNarrative;
let bad = 0, runs = 0;
const fail = (...m) => { bad++; if (bad < 15) console.log('FAIL', ...m); };

// every card has scores, in range, both ways
D.deck.forEach((c, i) => [false, true].forEach(r => {
  const s = N.score(i, r);
  if (!['v', 'm', 'ch', 'inw'].every(k => Number.isInteger(s[k]) && s[k] >= -2 && s[k] <= 2)) fail('score', c.id, r, JSON.stringify(s));
}));
// spot checks on the rules
const id = x => D.deck.findIndex(c => c.id === x);
if (N.score(id('major-15'), true).v <= 0) fail('Devil reversed should read as release');
if (N.score(id('major-19'), false).v !== 2) fail('Sun upright should be bright');
if (N.score(id('swords-08'), false).m !== -2) fail('Eight of Swords upright should be still');

for (const sp in D.SPREADS) {
  const n = D.SPREADS[sp].pos.length;
  for (let t = 0; t < 1500; t++) {
    const dr = E.orient(E.dealTop(E.wash(E.newDeck()), n), 'natural');
    let o;
    try { o = N.tell(dr, sp, { question: t % 3 ? '' : 'Will it work out?' }); } catch (e) { fail('throw', sp, e.message); continue; }
    runs++;
    const txt = o.text.join(' ');
    if (o.words < 300 || o.words > 500) fail('length', sp, o.words);
    if (/undefined|null|NaN|\u0001|\u0002|\s{2,}|\.\.|,,/.test(txt)) fail('mechanics', sp, txt.slice(0, 160));
    if (/\b(you should|try to|make sure|remember to|consider)\b/i.test(txt)) fail('advice wording', sp);
    if (/\b(zodiac|horoscope|planet|mercury|retrograde|astrolog)/i.test(txt)) fail('astrology wording', sp);
    const hiName = D.deck[dr[o.highlight].i].name.replace(/^The /, '');
    if (!txt.includes(hiName)) fail('highlight not named', sp, hiName);
    if (n > 1 && !txt.startsWith('Highlighting') && !txt.startsWith('You asked')) fail('opening', sp);
    if (o.html.join('').split('<b>').length !== o.html.join('').split('</b>').length) fail('tags', sp);
    if (N.tell(dr, sp, {}).text.join() !== N.tell(dr, sp, {}).text.join()) fail('not repeatable', sp);
  }
}
console.log(bad ? `${bad} problems` : `clean: ${runs} readings, all 300-500 words`);
process.exit(bad ? 1 : 0);

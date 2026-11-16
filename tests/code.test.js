// Run: node tests/code.test.js
// Round-trips thousands of random readings through reading codes and checks typo detection.
const path = require('path');
globalThis.crypto ??= require('crypto').webcrypto;
for (const f of ['tarot-data', 'tarot-engine', 'reading-code']) require(path.join(__dirname, '..', 'js', f + '.js'));
const D = TarotData, E = TarotEngine, C = TarotCode;
let bad = 0, n = 0;
const fail = (...m) => { bad++; if (bad < 15) console.log('FAIL', ...m); };
const lens = {};
for (const spread of C.SPREAD_ORDER) for (const rev of ['natural', 'random', 'none']) for (let t = 0; t < 500; t++) {
  const drawn = E.orient(E.dealTop(E.wash(E.newDeck()), D.SPREADS[spread].pos.length), rev);
  const code = C.encode({ spread, rev, drawn }); n++;
  lens[spread] = code.replace(/-/g, '').length;
  if (!/^[0-9A-HJKMNP-TV-Z]{1,4}(-[0-9A-HJKMNP-TV-Z]{1,4})*$/.test(code)) fail('format', code);
  const back = C.decode(code);
  if (back.spread !== spread || back.rev !== rev || JSON.stringify(back.drawn) !== JSON.stringify(drawn.map(d => ({ i: d.i, r: !!d.r })))) fail('round trip', code);
  // forgiving input: lowercase, spaces, prefix, look-alikes
  const messy = ' ftr-' + code.toLowerCase().replace(/-/g, ' ').replace(/1/g, 'l').replace(/0/g, 'o') + ' ';
  if (C.decode(messy).drawn.map(d => d.i).join() !== drawn.map(d => d.i).join()) fail('messy input', messy);
  // every single-character typo must be rejected (or decode to the same reading if it's a look-alike)
  const raw = code.replace(/-/g, '');
  const k = t % raw.length, alpha = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
  const wrong = alpha[(alpha.indexOf(raw[k]) + 1 + (t % 31)) % 32];
  if (wrong !== raw[k]) { try { C.decode(raw.slice(0, k) + wrong + raw.slice(k + 1)); fail('typo accepted', raw, k); } catch (e) {} }
  // adjacent swaps of different characters are rejected
  if (raw.length > 2 && raw[k] !== raw[(k + 1) % raw.length] && k + 1 < raw.length) {
    try { C.decode(raw.slice(0, k) + raw[k + 1] + raw[k] + raw.slice(k + 2)); fail('swap accepted', raw, k); } catch (e) {}
  }
}
for (const junk of ['', 'hello', 'ZZZZ-ZZZZ', '0000', '4']) { try { C.decode(junk); fail('junk accepted', junk); } catch (e) {} }
console.log('code lengths (characters):', JSON.stringify(lens));
console.log(bad ? `${bad} problems` : `clean: ${n} readings round-tripped, typos and swaps caught`);
process.exit(bad ? 1 : 0);

// Run: node tests/narrative.test.js
// Tells thousands of random stories per spread and checks the writing mechanics.
const path = require('path');
globalThis.crypto ??= require('crypto').webcrypto;
for (const f of ['tarot-data', 'tarot-engine', 'tarot-phrases', 'tarot-narrative']) require(path.join(__dirname, '..', 'js', f + '.js'));
const E=TarotEngine,D=TarotData,N=TarotNarrative;let bad=0,runs=0;const seen=new Set();
for(const sp in D.SPREADS){const n=D.SPREADS[sp].pos.length;
 for(let t=0;t<1000;t++){const dr=E.orient(E.dealTop(E.wash(E.newDeck()),n),'natural');let out;
  try{out=N.tell(dr,sp,{question:t%2?'Q?':''})}catch(e){bad++;console.log('THROW',sp,e.message);continue}
  runs++;const txt=out.text.join(' ');
  if(/undefined|null|NaN|\u0001|\u0002|\s{2,}|\.\./.test(txt)){bad++;console.log('BAD TEXT',sp,txt.slice(0,200))}
  if(out.html.join('').split('<b>').length!==out.html.join('').split('</b>').length){bad++;console.log('tags',sp)}
  // reversed note appears at most once per card
  dr.forEach(d=>{const nm=D.deck[d.i].name.replace(/^The /,'');const c=(txt.match(new RegExp(nm.replace(/[()]/g,'\\$&')+' \\(reversed\\)','g'))||[]).length;if(c>1){bad++;console.log('rev twice',sp,nm)}});
  // all cards mentioned (except single which names it)
  dr.forEach(d=>{const nm=D.deck[d.i].name.replace(/^The /,'');if(!txt.includes(nm)){bad++;console.log('missing card',sp)}});
  if(/\b(you should|try to|make sure|remember to)\b/i.test(txt)){bad++;console.log('advice',txt)}
  const r1=N.tell(dr,sp,{}).text.join(),r2=N.tell(dr,sp,{}).text.join();if(r1!==r2){bad++;console.log('nondeterministic')}
  seen.add(r1);
 }}
console.log(bad?bad+' problems':'clean: '+runs+' stories, '+seen.size+' distinct');process.exit(bad?1:0);

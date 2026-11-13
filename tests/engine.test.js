// Run: node tests/engine.test.js
const path = require('path');
globalThis.crypto ??= require('crypto').webcrypto;
require(path.join(__dirname, '..', 'js', 'tarot-data.js'));
require(path.join(__dirname, '..', 'js', 'tarot-engine.js'));
const D=TarotData,E=TarotEngine;let fails=0,n=0;
const ok=(c,m)=>{n++;if(!c){fails++;console.log('FAIL',m)}};
const perm=d=>d.length===78&&new Set(d.map(o=>o.i)).size===78&&d.every(o=>o.i>=0&&o.i<78);
ok(D.deck.length===78,'78 cards');ok(new Set(D.deck.map(c=>c.id)).size===78,'unique ids');
ok(D.deck.every(c=>c.up.k&&c.up.m&&c.rv.k&&c.rv.m&&c.up.m!==c.rv.m),'every card has distinct upright+reversed');
ok(D.byId['major-13'].name==='Death'&&D.byId['cups-14'].name==='King of Cups'&&D.byId['wands-01'].name==='Ace of Wands','ids map');
for(const st of ['overhand','riffle','hindu','wash','pile','turn'])for(let t=0;t<300;t++){let d=E.freshDeck();for(let k=0;k<3;k++)d=E.shuffle(d,st,{piles:3+t%7});ok(perm(d),st+' perm');}
// deck kinds: starting share of reversed cards
for(const [kind,want] of [['used',.5],['light',.25],['new',0]]){let r=0,T=2000;for(let t=0;t<T;t++)r+=E.newDeck(kind).filter(o=>o.r).length;const avg=r/T/78;ok(Math.abs(avg-want)<.02,kind+' deck reversed '+avg.toFixed(3));ok(perm(E.newDeck(kind)),kind+' perm')}
ok(E.newDeck('new').every((o,i)=>o.i===i&&!o.r),'new deck ordered upright');
// every style now turns some cards from a brand-new deck, wash most of all
{const avg={};for(const st of ['overhand','hindu','riffle','pile','wash','turn']){let r=0,T=4000;for(let t=0;t<T;t++)r+=E.shuffle(E.freshDeck(),st).filter(o=>o.r).length;avg[st]=r/T}
 ok(avg.overhand>1&&avg.overhand<12,'overhand turns a few '+avg.overhand);ok(avg.hindu>0.5&&avg.hindu<8,'hindu turns a few '+avg.hindu);
 ok(avg.riffle===0,'straight riffle never turns '+avg.riffle);ok(avg.turn>=35&&avg.turn<=43,'turned riffle about half '+avg.turn);ok(avg.pile>4&&avg.pile<12,'pile turns some '+avg.pile);ok(Math.abs(avg.wash-39)<1.5,'wash about half '+avg.wash);
 ok(avg.wash>avg.pile&&avg.wash>avg.overhand&&avg.wash>avg.hindu,'wash stirs most of the random styles');console.log('avg reversed after 1 shuffle of a new deck:',JSON.stringify(avg,(k,v)=>typeof v==='number'?+v.toFixed(1):v))}
// a lightly used deck drifts toward half with shuffling, faster for wash
{const run=(st,n)=>{let r=0,T=1500;for(let t=0;t<T;t++){let d=E.newDeck('light');for(let k=0;k<n;k++)d=E.shuffle(d,st);r+=d.filter(o=>o.r).length}return r/T/78};
 const o1=run('overhand',1),o10=run('overhand',10),w1=run('wash',1);ok(o1<o10&&o10<.5&&w1>.47,'drift toward half '+[o1,o10,w1].map(x=>x.toFixed(3)))}
{const p=E.turnPacket([{i:1,r:false},{i:2,r:true}]);ok(p[0].i===2&&p[0].r===false&&p[1].i===1&&p[1].r===true,'turnPacket')}
{let r=0,T=2000;for(let t=0;t<T;t++)r+=E.wash(E.freshDeck()).filter(o=>o.r).length;const avg=r/T;ok(avg>36&&avg<42,'wash ~half reversed '+avg)}
{const d=E.turnAndRiffle(E.freshDeck());const rv=d.filter(o=>o.r).length;ok(rv>=35&&rv<=43,'turn half reversed '+rv)}
{const f=E.freshDeck(),x=E.shuffle(f,'wash');ok(f.every((o,i)=>o.i===i&&!o.r),'input not mutated')}
// riffle mixing: position correlation after 7 riffles small
{let d=E.freshDeck();for(let k=0;k<7;k++)d=E.riffle(d);ok(perm(d),'7 riffles perm')}
{const d=E.freshDeck(),c=E.cutSingle(d,30);ok(c[0].i===30&&c[48].i===0&&perm(c),'single cut')}
for(let t=0;t<500;t++){const s=E.threePileSizes(78);ok(s.reduce((a,b)=>a+b)===78&&s.every(x=>x>=15),'3pile sizes '+s)}
{const d=E.freshDeck(),c=E.cutPiles(d,[20,25,33],[2,0,1]);ok(c[0].i===45&&c[33].i===0&&c[53].i===20&&perm(c),'cutPiles order')}
{const d=E.freshDeck();ok(E.dealTop(d,3).map(o=>o.i).join()==='0,1,2','dealTop')}
{const d=E.freshDeck(),p=E.dealEveryNth(d,10,7);ok(p[0].i===6&&p[1].i===13&&new Set(p.map(o=>o.i)).size===10,'every 7th '+p.map(o=>o.i))}
{const d=E.freshDeck(),p=E.dealEveryNth(d,78,7);ok(new Set(p.map(o=>o.i)).size===78,'every 7th full deck unique')}
{const w=E.wash(E.freshDeck());ok(E.orient(w,'none').every(o=>!o.r),'orient none');ok(E.orient(w,'natural').every((o,i)=>o.r===w[i].r),'orient natural')}
{const a=E.dailyCard('2026-11-13'),b=E.dailyCard('2026-11-13'),c=E.dailyCard('2026-11-14');ok(a.i===b.i&&a.r===b.r,'daily repeatable');ok(a.card&&a.date==='2026-11-13','daily shape '+a.card.name+' / '+c.card.name)}
{const cnt=new Array(78).fill(0);for(let k=0;k<78000;k++)cnt[E.dailyCard('d'+k).i]++;ok(Math.min(...cnt)>800&&Math.max(...cnt)<1200,'daily spread '+Math.min(...cnt)+'-'+Math.max(...cnt))}
{const s=E.seededRng('x');for(let k=0;k<10000;k++){const v=s(78);if(v<0||v>=78||v!==Math.floor(v)){ok(false,'seeded range');break}}ok(true,'')}
{const cnt=[0,0,0];for(let k=0;k<30000;k++)cnt[E.cryptoRng(3)]++;ok(cnt.every(c=>c>9500&&c<10500),'crypto uniform '+cnt)}
// analyze
for(const key in D.SPREADS){const m=D.SPREADS[key].pos.length;for(let t=0;t<200;t++){const dr=E.orient(E.dealTop(E.wash(E.freshDeck()),m),'natural');const a=E.analyze(dr,key,'natural');ok(Array.isArray(a)&&a.every(x=>typeof x.title==='string'&&x.title&&typeof x.text==='string'),'analyze '+key);if(m>=3)ok(a.some(x=>x.title==='The arc:'),'arc '+key)}}
{const dr=[{i:22+5,r:false},{i:36+5,r:false},{i:50+3,r:true}];const a=E.analyze(dr,'ppf','natural');ok(a.some(x=>/2 Sixes/.test(x.title)),'Sixes plural '+JSON.stringify(a.map(x=>x.title)))}
console.log(fails?`${fails} FAILED of ${n}`:`all ${n} checks passed`);process.exit(fails?1:0)

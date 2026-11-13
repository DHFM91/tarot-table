/*
 * Tarot Table: card data and spreads.
 * Plain script (no modules), so it works from file:// on a thumb drive and drops into any page.
 * Exposes one global: TarotData.
 *
 *   TarotData.deck          78 card objects, in standard order (22 Major Arcana, then Wands, Cups, Swords, Pentacles)
 *   TarotData.byId[id]      lookup by id, e.g. "major-13", "cups-02", "swords-14"
 *   TarotData.SPREADS       spread layouts: { name, desc, pos: [[name, prompt, x, y, rotation?], ...] }
 *   TarotData.SHUFFLES / CUTS / DEALS   labels and descriptions for each method
 *   TarotData.SUITS / RANKS / ROMAN / NUM   helpers
 *
 * Card object: { id, name, num (majors), suit, rank (minors 1-14), up:{k,m}, rv:{k,m} }
 *   k = keywords, m = one-line meaning. "up" is upright, "rv" is reversed.
 */
(function (root) {
"use strict";
/* Each meaning string: upright keywords | upright meaning | reversed keywords | reversed meaning */
const MAJORS = [
["The Fool","beginnings, leap of faith, innocence|A fresh start. Step forward with open curiosity.|recklessness, hesitation, naivety|Leaping without looking, or refusing to leap at all."],
["The Magician","will, skill, manifestation|You have the tools. Focus and act.|manipulation, untapped talent, trickery|Power misused or left idle. Watch for illusions."],
["The High Priestess","intuition, mystery, inner knowing|Be still and listen to what isn't being said.|secrets, disconnection, ignored intuition|Hidden agendas, or tuning out your own inner voice."],
["The Empress","abundance, nurture, creativity|Growth comes through care, comfort and making things.|smothering, creative block, neglect|Over-giving or under-tending. Nurture needs balance."],
["The Emperor","structure, authority, stability|Order and firm boundaries build something lasting.|rigidity, domination, chaos|Control turns tyrannical, or the structure collapses."],
["The Hierophant","tradition, teaching, institutions|Learn from established wisdom and shared values.|rebellion, dogma, unorthodoxy|Question the rules, or notice where they've gone hollow."],
["The Lovers","union, choice, alignment|A meaningful bond, or a choice that defines your values.|disharmony, misalignment, temptation|Values clash. A choice made for the wrong reasons."],
["The Chariot","drive, victory, willpower|Harness opposing forces and charge ahead.|lack of direction, aggression, stalling|Pulling in two directions while momentum is lost."],
["Strength","courage, patience, compassion|Gentle persistence tames what force cannot.|self-doubt, insecurity, raw emotion|Inner strength wavers while fear or anger takes the reins."],
["The Hermit","solitude, introspection, guidance|Step back. The answer is found within.|isolation, loneliness, withdrawal|Retreat has turned into hiding."],
["Wheel of Fortune","cycles, fate, turning point|Change is coming. Ride the turn.|bad luck, resistance, repeating cycles|Fighting the wheel, or repeating an old pattern."],
["Justice","fairness, truth, cause and effect|Clear judgment. Actions meet their consequences.|injustice, dishonesty, avoidance|Something is unfair, or accountability is being dodged."],
["The Hanged Man","surrender, pause, new perspective|Let go and look at it upside down.|stalling, martyrdom, indecision|Waiting without purpose, or a sacrifice that serves no one."],
["Death","endings, transformation, release|Something ends so something else can begin.|resisting change, stagnation, lingering|Holding on to what's already over."],
["Temperance","balance, moderation, blending|Patience and the right mix bring harmony.|excess, imbalance, impatience|Too much of one thing. The mix is off."],
["The Devil","bondage, temptation, materialism|Chains you may be choosing to wear.|release, breaking free, reclaiming power|Seeing the chain and slipping out of it."],
["The Tower","upheaval, revelation, sudden change|False structures fall and truth breaks through.|averted disaster, fear of change, delayed collapse|Avoiding the inevitable, or narrowly escaping a crisis."],
["The Star","hope, renewal, serenity|Healing after the storm. Faith restored.|despair, discouragement, disconnection|Hope has dimmed. Reconnect with what inspires you."],
["The Moon","illusion, dreams, the unconscious|Not all is as it seems. Trust your instincts through the fog.|clarity emerging, fear released, confusion lifting|Shadows recede and deception comes to light."],
["The Sun","joy, success, vitality|Warmth, clarity and good fortune.|dimmed joy, overconfidence, delays|The sun is behind a cloud. Joy is there, just muted."],
["Judgement","awakening, reckoning, calling|Answer the call and rise renewed.|self-doubt, refusal, harsh self-judgment|Ignoring the call, or judging yourself too harshly."],
["The World","completion, wholeness, achievement|A cycle fulfilled. Celebrate and integrate.|incompletion, shortcuts, lack of closure|So close. Tie up the loose ends."]];

const MINORS = {
Wands:[
"inspiration, spark, new venture|A burst of creative energy. Act on it.|delays, low motivation, false start|The spark sputters. Find what's blocking it.",
"planning, future vision, decisions|The world is in your hands. Plan your move.|fear of the unknown, poor planning|Playing it safe instead of venturing out.",
"expansion, foresight, progress|Your ships are coming in. Look further ahead.|obstacles, setbacks, limited vision|Plans stall and delays appear on the horizon.",
"celebration, home, milestones|A joyful threshold of community and welcome.|instability, transition, lack of support|Home feels unsettled and celebrations are postponed.",
"conflict, competition, friction|Clashing egos. Healthy rivalry or petty squabbling.|avoiding conflict, resolution, tension released|The fight winds down, or is being dodged.",
"victory, recognition, confidence|Public success. You're being seen.|ego, fall from grace, no recognition|Pride before a stumble, or credit withheld.",
"defense, perseverance, standing your ground|Hold your position against the challenge.|overwhelm, giving up, defensiveness|Worn down, or fighting battles that don't matter.",
"speed, movement, swift news|Things move fast: messages, travel, momentum.|delays, frustration, scattered energy|Momentum stalls or flies off in every direction.",
"resilience, persistence, last stand|Battered but standing. One more push.|exhaustion, paranoia, giving in|Your defenses have become walls. Rest is needed.",
"burden, responsibility, overload|You're carrying too much. Finish it or delegate.|release, delegation, collapse|Putting the load down, by choice or by breaking.",
"enthusiasm, exploration, free spirit|A curious new spark or an eager messenger.|impatience, no direction, haste|All spark and no follow-through.",
"adventure, energy, impulsiveness|Charge forward with passion.|recklessness, frustration, burnout|Rushing ahead and burning out.",
"confidence, warmth, determination|Magnetic, bold and self-assured.|jealousy, insecurity, demands|Fire turned inward, or turned on others.",
"vision, leadership, boldness|A natural leader who turns vision into action.|arrogance, impulsiveness, impossible expectations|Domineering, or all big talk."],
Cups:[
"new feelings, love, intuition|An open heart, overflowing.|blocked emotions, emptiness, repression|Feelings held back, or poured into the wrong place.",
"partnership, attraction, mutual respect|A balanced meeting of hearts.|imbalance, breakup, miscommunication|The connection is out of sync.",
"friendship, celebration, community|Joy shared with your people.|overindulgence, gossip, isolation|Too much party, or being left out of it.",
"apathy, contemplation, missed offers|Your discontent may hide an offer you're ignoring.|renewed interest, acceptance, motivation|Waking up to what's being offered.",
"loss, grief, regret|Mourning what spilled, while two cups still stand.|acceptance, moving on, forgiveness|Turning toward what remains.",
"nostalgia, innocence, reunion|Sweet memories, or an old connection returns.|living in the past, rose-tinted memory|Stuck in yesterday's comfort.",
"choices, fantasy, illusion|Many options, and not all of them are real.|clarity, decisiveness, reality check|The fog lifts. Pick one.",
"walking away, seeking deeper meaning|Leaving what no longer fulfills you.|fear of leaving, aimless drifting|Staying out of fear, or wandering without aim.",
"contentment, satisfaction, wishes granted|The wish card: comfort and pleasure.|smugness, dissatisfaction, materialism|Having it all and still feeling empty.",
"harmony, family, lasting happiness|Emotional fulfillment and a true home.|disconnection, broken home, misaligned values|The picture-perfect scene has cracks.",
"curiosity, sensitivity, creative message|A tender, intuitive message, or a dreamer.|emotional immaturity, insecurity, escapism|Moody, or lost in daydreams.",
"romance, charm, following the heart|An offer of love, or a creative invitation.|moodiness, unrealistic promises, jealousy|Promises that don't hold water.",
"compassion, empathy, emotional security|Deep feeling held with calm.|codependence, martyrdom, overwhelm|Drowning in other people's feelings.",
"emotional balance, diplomacy, wisdom|Calm mastery over the tides of feeling.|manipulation, moodiness, coldness|Feelings suppressed, or used as leverage."],
Swords:[
"clarity, breakthrough, truth|A clear idea cuts through the confusion.|confusion, misinformation, clouded judgment|The blade is dull and the facts are muddled.",
"stalemate, indecision, avoidance|Blindfolded between two choices.|information overload, forced decision, seeing clearly|Forced to choose, or finally seeing.",
"heartbreak, grief, painful truth|A sharp sorrow that has to be felt.|healing, forgiveness, releasing pain|Recovering. The wound begins to close.",
"rest, recovery, contemplation|Retreat and recharge before the next battle.|restlessness, burnout, stagnation|Refusing rest, or resting too long.",
"conflict, hollow victory, betrayal|Winning at any cost may cost too much.|reconciliation, regret, moving past conflict|Making amends, or walking away.",
"transition, moving on, calmer waters|Leaving trouble behind for quieter shores.|resistance, unfinished business, baggage|You can't leave, or you're bringing the storm along.",
"deception, strategy, stealth|Someone is getting away with something.|confession, conscience, getting caught|Secrets surface. Time to come clean.",
"restriction, self-imprisonment, helplessness|Trapped mostly by your own thoughts.|release, new perspective, freedom|Removing the blindfold and stepping out.",
"anxiety, nightmares, worry|Thoughts at 3 a.m. magnify everything.|hope, reaching out, despair easing|The night ends and worry loosens its grip.",
"rock bottom, endings, betrayal|The worst is here, and so is the dawn.|recovery, regeneration, resisting the end|Getting up again, or refusing to let it end.",
"curiosity, new ideas, vigilance|Sharp, watchful and eager to learn.|gossip, all talk, defensiveness|Words without substance, or cutting remarks.",
"ambition, action, fast thinking|Charging toward the goal with conviction.|rashness, aggression, scattered focus|Running people over to win the argument.",
"clear boundaries, independence, honesty|Perceptive and direct. Truth without cruelty.|coldness, bitterness, harshness|A sharp tongue and a closed heart.",
"intellect, authority, truth|Clear-minded judgment and principled leadership.|manipulation, tyranny, abuse of power|Logic turned into a weapon."],
Pentacles:[
"opportunity, prosperity, new venture|A seed of material success is on offer.|missed opportunity, poor planning, scarcity|The coin slips through your fingers.",
"balance, adaptability, juggling|Keeping many things in motion.|overwhelm, disorganization, dropped balls|Too much to juggle.",
"teamwork, craftsmanship, collaboration|Your skill is recognized. Build it together.|disharmony, sloppy work, poor teamwork|The team is out of step.",
"security, saving, control|Holding tight to what you have.|greed, letting go, overspending|Clutching too hard, or not at all.",
"hardship, poverty, isolation|Out in the cold, though help may be closer than you think.|recovery, help arrives, spiritual poverty|Coming in from the cold.",
"generosity, charity, give and take|Resources shared fairly.|strings attached, debt, one-sided giving|Generosity with an agenda.",
"patience, long-term view, assessment|Pause and assess the harvest you're growing.|impatience, poor returns, wasted effort|Effort without reward. Time to rethink.",
"diligence, mastery, skill-building|Head down, honing your craft.|perfectionism, lack of focus, shortcuts|Grinding without purpose, or cutting corners.",
"independence, luxury, self-sufficiency|Enjoying the fruits of your own labor.|overworking, superficiality, setbacks|The garden needs tending.",
"legacy, wealth, family|Lasting security and inheritance.|family disputes, financial loss, instability|The foundation shakes.",
"ambition, study, new opportunity|A practical beginning. Learn and build.|procrastination, slow progress, missed lessons|Dreams without diligence.",
"reliability, routine, hard work|Slow, steady and dependable.|boredom, stagnation, laziness|Stuck in a rut.",
"nurturing, practicality, abundance|Grounded care and a well-kept home.|self-neglect, smothering, work-home imbalance|Caring for everything except yourself.",
"wealth, discipline, security|A provider who builds lasting abundance.|greed, stubbornness, materialism|Money as the measure of everything."]};

const SUITS = {
 Wands:{el:"Fire",g:"♣",c:"#d4622c",t:"action, ambition, passion and creative drive"},
 Cups:{el:"Water",g:"♥",c:"#3f7fd0",t:"emotions, relationships and intuition"},
 Swords:{el:"Air",g:"♠",c:"#6f7396",t:"thought, communication, conflict and truth"},
 Pentacles:{el:"Earth",g:"♦",c:"#3f9a55",t:"work, money, the body and the material world"}};
const RANKS = ["Ace","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Page","Knight","Queen","King"];
const ROMAN = ["0","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX","XXI"];
const NUM = {1:"new beginnings",2:"balance, choices and partnership",3:"growth and collaboration",4:"stability and structure",5:"conflict and change",6:"harmony and generosity",7:"reflection and assessment",8:"movement and mastery",9:"nearing completion",10:"endings and fulfillment",11:"curiosity and messages",12:"action and pursuit",13:"nurturing mastery",14:"authority and control"};

function parse(s){const p=s.split("|");return{up:{k:p[0],m:p[1]},rv:{k:p[2],m:p[3]}}}
const deck=[];
MAJORS.forEach((m,i)=>deck.push(Object.assign({id:"major-"+String(i).padStart(2,"0"),name:m[0],num:i,suit:null,rank:null},parse(m[1]))));
for(const s in MINORS)MINORS[s].forEach((m,i)=>deck.push(Object.assign({id:s.toLowerCase()+"-"+String(i+1).padStart(2,"0"),name:RANKS[i]+" of "+s,suit:s,rank:i+1},parse(m))));

/* spreads: [name, prompt, x, y, rotation]  (x,y in card-widths) */
const SPREADS={
 one:{name:"Single Card",desc:"One card of guidance for the day or a quick question.",pos:[["Guidance","The heart of the matter",0,0]]},
 ppf:{name:"Past · Present · Future",desc:"The classic three-card timeline.",pos:[["Past","What led here",0,0],["Present","Where things stand",1.25,0],["Future","Where it's heading",2.5,0]]},
 sao:{name:"Situation · Action · Outcome",desc:"A practical three-card spread for decisions.",pos:[["Situation","What you're facing",0,0],["Action","What to do about it",1.25,0],["Outcome","The likely result",2.5,0]]},
 mbs:{name:"Mind · Body · Spirit",desc:"A three-card check-in on how you're doing.",pos:[["Mind","Your thoughts",0,0],["Body","Your physical life",1.25,0],["Spirit","Your inner self",2.5,0]]},
 cross5:{name:"Five-Card Cross",desc:"The present, with its past, future, root and potential.",pos:[["Present","Where you are",1.25,1.85],["Past","What's behind you",0,1.85],["Future","What's ahead",2.5,1.85],["Root","The foundation beneath it",1.25,3.7],["Potential","The best that could come of it",1.25,0]]},
 paths:{name:"Two Paths",desc:"Weigh two options side by side.",pos:[["You","Where you stand now",1.5,0],["Path A","What choosing A brings",0,1.9],["Path A Outcome","Where A leads",0,3.8],["Path B","What choosing B brings",3,1.9],["Path B Outcome","Where B leads",3,3.8],["Advice","What to keep in mind",1.5,2.85]]},
 horseshoe:{name:"Horseshoe",desc:"Seven cards in an arc, for a full situation with advice.",pos:[["Past","Influences behind you",0,0],["Present","Your current situation",1.2,1],["Hidden","What you can't see yet",2.4,1.8],["Obstacle","What stands in the way",3.6,2.2],["Others","People and outside influences",4.8,1.8],["Advice","The best approach",6,1],["Outcome","Where it's likely to land",7.2,0]]},
 celtic:{name:"Celtic Cross",desc:"The classic ten-card deep dive.",pos:[["Present","The heart of the situation",1.4,2.7],["Challenge","What crosses you",1.4,2.7,90],["Foundation","The root beneath it",1.4,4.55],["Recent Past","What's passing away",0,2.7],["Crown","Your aim, or the best outcome",1.4,.85],["Near Future","What's approaching",2.8,2.7],["Self","Your attitude",4.3,5.4],["Environment","Others and your surroundings",4.3,3.6],["Hopes & Fears","What you wish for or dread",4.3,1.8],["Outcome","Where it's heading",4.3,0]]}};

const SHUFFLES={
 overhand:{name:"Overhand",desc:"The everyday shuffle: small packets slid from hand to hand. Now and then a packet lands turned around."},
 riffle:{name:"Riffle (straight)",desc:"Split the deck and marry the halves, casino-style, without turning either stack. Every card keeps its orientation."},
 turn:{name:"Riffle (one half turned)",desc:"Rotate one hand's stack end-over-end before marrying the halves, so about half the deck changes orientation."},
 hindu:{name:"Hindu",desc:"Pull larger packets off the top into the other hand. Popular in India and Japan. Occasionally a packet flips."},
 wash:{name:"Wash (Scramble)",desc:"Spread the cards face-down and swirl them. Turns cards every which way: the biggest stir for reversals."},
 pile:{name:"Pile Shuffle",desc:"Deal into piles and gather them up. A ritual many readers use to clear a deck. A pile is sometimes picked up turned."}};
const CUTS={
 none:{name:"No cut",desc:"Trust the shuffle and go straight to the deal."},
 single:{name:"Single cut",desc:"Lift a portion off the top and place it underneath."},
 three:{name:"Three piles, left hand",desc:"A popular tradition: cut into three piles with the left hand (the hand of the heart), then gather them in the order you choose."}};
const DEALS={
 top:{name:"From the top",desc:"The reader deals cards in order from the top of the deck."},
 fan:{name:"Choose from the fan",desc:"Spread the whole deck face-down and pick by feel."},
 seventh:{name:"Every seventh card",desc:"An old cartomancy counting method: count through the deck and take every seventh card."}};


const byId = {};
deck.forEach(c => { byId[c.id] = c; });

root.TarotData = Object.freeze({ deck, byId, MAJORS, MINORS, SUITS, RANKS, ROMAN, NUM, SPREADS, SHUFFLES, CUTS, DEALS });
})(typeof window !== "undefined" ? window : globalThis);

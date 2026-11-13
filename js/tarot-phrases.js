/*
 * Free Tarot Readings: narrative phrases, used by tarot-narrative.js.
 * For each card id and orientation (up = upright, rv = reversed):
 *   o: three omens, each fits "This might mean ___ coming up in your life."
 *   c: two cautions, each fits "...but be careful of ___."
 *   t: a message, fits "The cards may be trying to tell you that ___."
 *   i: an image, fits "Picture ___."
 * Exposes one global: TarotPhrases.
 */
(function (root) {
"use strict";
root.TarotPhrases = Object.freeze({
 "major-00": {
  "up": {
   "o": [
    "a job offer in an unfamiliar city",
    "an unplanned weekend that rearranges your plans",
    "a first lesson in something you know nothing about"
   ],
   "c": [
    "packing for the trip but not the weather",
    "mistaking a cliff edge for a doorstep"
   ],
   "t": "the first step is usually smaller and stranger than you imagined",
   "i": "a barefoot traveler stepping off a sunlit cliff, whistling"
  },
  "rv": {
   "o": [
    "a decision postponed until the offer expires",
    "a rash purchase that empties the account",
    "a friend who keeps saying next year"
   ],
   "c": [
    "treating every warning as an insult",
    "calling fear by the name of wisdom"
   ],
   "t": "caution and carelessness can wear the same face, and you may own both",
   "i": "a traveler frozen at the cliff edge, bag half packed"
  }
 },
 "major-01": {
  "up": {
   "o": [
    "a skill suddenly in demand at work",
    "the right tools turning up on your desk",
    "a project finally coming together in your hands"
   ],
   "c": [
    "showing off instead of finishing",
    "believing the trick is the same as the craft"
   ],
   "t": "everything needed for the work is already laid out on the table",
   "i": "a conjurer at a candlelit table, one hand raised skyward"
  },
  "rv": {
   "o": [
    "a charming offer with a trapdoor in it",
    "a talent gathering dust in a drawer",
    "a colleague whose story keeps changing"
   ],
   "c": [
    "polishing a gift you never use",
    "being dazzled by someone else's patter"
   ],
   "t": "skill left idle and skill used crookedly both curdle into the same thing",
   "i": "a card trick with one card too many up the sleeve"
  }
 },
 "major-02": {
  "up": {
   "o": [
    "a hunch about a person that proves right",
    "a long silence at dinner that says everything",
    "a dream that keeps returning to the same door"
   ],
   "c": [
    "filling every quiet with noise",
    "demanding answers before they are ready"
   ],
   "t": "the most important thing in the room is the one nobody says",
   "i": "a veiled woman between two pillars, a scroll half hidden"
  },
  "rv": {
   "o": [
    "a secret kept by someone fond of you",
    "a phone call you keep letting ring",
    "a gut feeling drowned out by other opinions"
   ],
   "c": [
    "reading hidden motives into every kind word",
    "talking over your own quiet doubt"
   ],
   "t": "the voice you have stopped listening to has been right more than once",
   "i": "a curtain drawn over a lit window, someone watching behind it"
  }
 },
 "major-03": {
  "up": {
   "o": [
    "a garden, literal or otherwise, finally bearing fruit",
    "a warm table crowded with people you love",
    "a creative project growing faster than expected"
   ],
   "c": [
    "letting comfort turn into avoidance",
    "giving the harvest away before tasting it"
   ],
   "t": "what you tend with patience is growing even where you cannot see",
   "i": "a woman reclining in wheat, pomegranates at her feet"
  },
  "rv": {
   "o": [
    "a blank page that stays blank all month",
    "a relative whose help feels like a leash",
    "a houseplant, and a routine, left to wither"
   ],
   "c": [
    "feeding everyone else from an empty pantry",
    "holding on so tightly that nothing can grow"
   ],
   "t": "love given without limit can crowd out the thing it was meant to feed",
   "i": "an overwatered garden, soil black and roots pale"
  }
 },
 "major-04": {
  "up": {
   "o": [
    "a promotion that comes with real authority",
    "a budget finally written down and honored",
    "a firm no that protects your weekends"
   ],
   "c": [
    "confusing stubbornness with strength",
    "building walls taller than the house needs"
   ],
   "t": "a life with firm edges has room to hold something lasting",
   "i": "a stone throne on a red mountain, ram heads carved in it"
  },
  "rv": {
   "o": [
    "a boss whose rules change by the hour",
    "a household schedule that collapses within a week",
    "an argument over who really holds the keys"
   ],
   "c": [
    "ruling a small kingdom through fear",
    "laws so numerous that nothing can move"
   ],
   "t": "control held too tightly breaks, and control let go too far floods",
   "i": "a cracked throne, its crown hanging crooked on one post"
  }
 },
 "major-05": {
  "up": {
   "o": [
    "a mentor offering the long-tested way",
    "a family ritual that suddenly makes sense",
    "a formal course or ceremony marking a milestone"
   ],
   "c": [
    "obeying a custom without knowing its reason",
    "borrowing someone else's certainty whole"
   ],
   "t": "old wisdom is worth sitting through the dull parts to reach",
   "i": "a robed teacher between two kneeling students, keys at his feet"
  },
  "rv": {
   "o": [
    "a rule at work that nobody can justify",
    "a gathering where you quietly stop believing",
    "a teacher whose lessons no longer fit you"
   ],
   "c": [
    "rebelling just because someone said not to",
    "mistaking cynicism for independence"
   ],
   "t": "some rules have gone hollow, though others still hold the roof up",
   "i": "an empty pulpit, hymnbooks still open to the same page"
  }
 },
 "major-06": {
  "up": {
   "o": [
    "a conversation where two people finally agree",
    "a decision that shows what you truly value",
    "a partnership built on honest ground"
   ],
   "c": [
    "choosing what flatters over what fits",
    "merging so completely that neither is left"
   ],
   "t": "every real choice quietly tells you who you are",
   "i": "two figures under an angel's wide wings, each looking at the other"
  },
  "rv": {
   "o": [
    "a quarrel about money that is about something else",
    "an invitation more tempting than wise",
    "a friendship drifting off its shared course"
   ],
   "c": [
    "deciding on a whim and calling it fate",
    "keeping the peace by hiding your values"
   ],
   "t": "the pull toward something and the rightness of it are not the same",
   "i": "two glasses on a table, one poured and one untouched"
  }
 },
 "major-07": {
  "up": {
   "o": [
    "a deadline met by sheer will",
    "a competition won by a narrow margin",
    "a team, a car or a plan finally moving"
   ],
   "c": [
    "winning the race and losing the passengers",
    "driving over what could have been steered around"
   ],
   "t": "two stubborn forces can pull the same wagon if one hand holds both reins",
   "i": "a charioteer in armor, a black sphinx and a white one pulling"
  },
  "rv": {
   "o": [
    "a stalled project with everyone shouting directions",
    "a road trip that goes in circles",
    "a temper flaring in a slow checkout line"
   ],
   "c": [
    "mistaking speed for direction",
    "pulling hard in two directions at once"
   ],
   "t": "momentum is slipping while you argue with yourself about which way to go",
   "i": "a chariot with its wheels spinning in mud, horses facing apart"
  }
 },
 "major-08": {
  "up": {
   "o": [
    "a frightened animal, or person, calming at your touch",
    "a long patient effort quietly paying off",
    "a kindness that disarms an old rival"
   ],
   "c": [
    "mistaking softness for weakness in yourself",
    "swallowing anger until it hardens"
   ],
   "t": "the quietest hand in the room is often the one that tames the lion",
   "i": "a woman closing a lion's jaws as gently as a book"
  },
  "rv": {
   "o": [
    "a bout of doubt before a big presentation",
    "a temper arriving faster than you expected",
    "tears at a moment you wanted to seem steady"
   ],
   "c": [
    "feeding the story that you are not enough",
    "letting fear speak on your behalf"
   ],
   "t": "the lion feels bigger because you have stopped looking it in the eye",
   "i": "a lion straining at a leash held by shaking hands"
  }
 },
 "major-09": {
  "up": {
   "o": [
    "a quiet week that clears your head",
    "an older person whose words land exactly",
    "a solitary project that goes deeper than expected"
   ],
   "c": [
    "mistaking quiet for loneliness",
    "carrying the lantern for people who never asked"
   ],
   "t": "the answer has been waiting in a room you rarely visit",
   "i": "a gray-cloaked figure on a snowy peak, lantern raised"
  },
  "rv": {
   "o": [
    "invitations declined until they stop arriving",
    "a spare room that becomes a hiding place",
    "weeks passing without one real conversation"
   ],
   "c": [
    "calling avoidance by the name of solitude",
    "letting the lantern burn down unused"
   ],
   "t": "solitude chosen is a rest, and solitude defended is a locked door",
   "i": "a lit window in a house with the curtains sewn shut"
  }
 },
 "major-10": {
  "up": {
   "o": [
    "a lucky break at an odd hour",
    "a sudden change of season in your work",
    "a coincidence too neat to be accidental"
   ],
   "c": [
    "mistaking a good turn for permanent footing",
    "gripping the rim as it spins"
   ],
   "t": "everything at the top of the wheel was once at the bottom",
   "i": "a great wheel in the clouds, strange creatures clinging to its rim"
  },
  "rv": {
   "o": [
    "an old argument returning in a new coat",
    "a run of small, stubborn bad luck",
    "a plan undone by a familiar habit"
   ],
   "c": [
    "calling a pattern bad luck",
    "pushing against a turn already underway"
   ],
   "t": "the same lesson keeps arriving in new clothes until it is finally received",
   "i": "a wheel stuck on one spoke, grinding in its own groove"
  }
 },
 "major-11": {
  "up": {
   "o": [
    "a fair ruling in a dispute that dragged",
    "a contract read closely and found sound",
    "a plain truth said aloud at last"
   ],
   "c": [
    "judging others by a stricter scale than yourself",
    "overlooking the bill arriving for old choices"
   ],
   "t": "what you have done is already on its way back to you",
   "i": "a figure with a raised sword and perfectly level scales"
  },
  "rv": {
   "o": [
    "a decision that favors the louder party",
    "a promise quietly rewritten after the signing",
    "a colleague who lets someone else take the blame"
   ],
   "c": [
    "telling the story with the facts rearranged",
    "dodging a reckoning that grows by the day"
   ],
   "t": "an unpaid debt of honesty does not shrink by being ignored",
   "i": "a scale with a thumb pressed on one pan"
  }
 },
 "major-12": {
  "up": {
   "o": [
    "a forced pause that changes your mind",
    "a problem that looks different upside down",
    "a sacrifice that turns out to be worth it"
   ],
   "c": [
    "confusing a pause with giving up",
    "grabbing the controls before the view is clear"
   ],
   "t": "hanging still long enough shows you what motion kept hidden",
   "i": "a man hanging by one foot from a living tree, calm"
  },
  "rv": {
   "o": [
    "a month of waiting with no news",
    "a favor done for someone who never notices",
    "a choice put off until made for you"
   ],
   "c": [
    "playing the martyr for an audience of none",
    "waiting as a way of never deciding"
   ],
   "t": "the sacrifice has stopped buying anything, and the waiting has stopped teaching",
   "i": "a bound figure dangling beside a stopped clock, eyes wide open"
  }
 },
 "major-13": {
  "up": {
   "o": [
    "a job, house or habit ending for good",
    "a clean break that frees up the calendar",
    "an old self-image quietly falling away"
   ],
   "c": [
    "mourning the ending while ignoring what it cleared",
    "treating a necessary ending as a punishment"
   ],
   "t": "some endings are only the ground being cleared",
   "i": "a skeletal rider on a white horse passing a rising sun"
  },
  "rv": {
   "o": [
    "a relationship kept alive on habit alone",
    "boxes of the past that never leave the hallway",
    "a stagnant stretch at work with no exit"
   ],
   "c": [
    "keeping vigil over something already dead",
    "calling stubbornness loyalty"
   ],
   "t": "what you are holding on to left the building a long time ago",
   "i": "a ghost still setting a table for guests who stopped coming"
  }
 },
 "major-14": {
  "up": {
   "o": [
    "a slow reconciliation that finally settles",
    "a routine in which work and rest balance",
    "two very different people working well together"
   ],
   "c": [
    "mixing too many things before the first sets",
    "mistaking blandness for balance"
   ],
   "t": "the right proportions, kept patiently, produce what force never could",
   "i": "an angel pouring water between two cups in an unbroken arc"
  },
  "rv": {
   "o": [
    "a weekend of too much of everything",
    "a recipe, or a plan, that curdles",
    "a rushed compromise that satisfies nobody"
   ],
   "c": [
    "drinking the whole cup in one swallow",
    "demanding results from a mixture still settling"
   ],
   "t": "one ingredient has taken over, and the whole mixture tastes of it",
   "i": "a cup overflowing while the other runs dry"
  }
 },
 "major-15": {
  "up": {
   "o": [
    "an offer that feels too good to refuse",
    "a habit that has quietly become a master",
    "a purchase that ends up owning you"
   ],
   "c": [
    "calling a cage comfortable",
    "bargaining away something priceless for something shiny"
   ],
   "t": "the chains around your neck are loose enough to lift off",
   "i": "two figures chained to a black pedestal, the collars hanging slack"
  },
  "rv": {
   "o": [
    "a first honest refusal of an old habit",
    "a bad influence losing its hold on you",
    "a debt finally paid down to nothing"
   ],
   "c": [
    "reaching back for the chain once it is off",
    "trading one master for a quieter one"
   ],
   "t": "the thing that owned you has begun to look small",
   "i": "an iron collar lying open on the floor, still warm"
  }
 },
 "major-16": {
  "up": {
   "o": [
    "a sudden announcement that reorders the week",
    "a belief or plan cracking down the middle",
    "a truth arriving through the front door uninvited"
   ],
   "c": [
    "rebuilding the same weak walls out of habit",
    "standing in the doorway arguing with the rubble"
   ],
   "t": "the thing that fell was never as sound as it looked",
   "i": "a stone tower split by lightning, its crown tumbling into night"
  },
  "rv": {
   "o": [
    "a narrow escape from a bad deal",
    "a cracked wall you keep wallpapering over",
    "a layoff rumor that fizzles, for now"
   ],
   "c": [
    "mistaking a delay for a pardon",
    "fearing change more than the thing needing changed"
   ],
   "t": "a postponed collapse is still gathering weight in the walls",
   "i": "a tower with a thin crack climbing one wall, still standing"
  }
 },
 "major-17": {
  "up": {
   "o": [
    "a calm that settles after a hard year",
    "a small hopeful sign arriving at night",
    "a wound beginning to close at last"
   ],
   "c": [
    "assuming the healing is finished too early",
    "wishing on a light without walking toward it"
   ],
   "t": "even after the worst storm, the sky keeps some light for you",
   "i": "a naked figure kneeling at a pool beneath eight bright stars"
  },
  "rv": {
   "o": [
    "a stretch of nights with no good news",
    "a hobby that once lit you up going cold",
    "a friend's encouragement that sounds hollow"
   ],
   "c": [
    "mistaking tiredness for the end of hope",
    "staring at the dark until it feels permanent"
   ],
   "t": "the light is still up there, only hidden behind your own weariness",
   "i": "a dry pool beneath a sky of dim, flickering lights"
  }
 },
 "major-18": {
  "up": {
   "o": [
    "a dream that seems to know your secrets",
    "an odd mood that has no clear cause",
    "a rumor with half the truth missing"
   ],
   "c": [
    "trusting every shadow that looks like a person",
    "making a decision in the thick of fog"
   ],
   "t": "not everything glimmering in the dark is what it first appears",
   "i": "a crayfish crawling from dark water, dogs howling at a full moon"
  },
  "rv": {
   "o": [
    "a confusing situation finally making sense",
    "an anxiety that loosens its grip overnight",
    "a lie surfacing in plain daylight"
   ],
   "c": [
    "pretending the fog never existed",
    "treating every newfound fact as the whole picture"
   ],
   "t": "the shapes that frightened you are turning out to be furniture",
   "i": "morning mist thinning over a pond, the far shore appearing"
  }
 },
 "major-19": {
  "up": {
   "o": [
    "a plain, uncomplicated good day",
    "a child or pet delighting the whole house",
    "success finally recognized in public"
   ],
   "c": [
    "assuming the warmth is owed to you",
    "squinting past those left in the shade"
   ],
   "t": "things are simpler and brighter than your worries have allowed",
   "i": "a laughing child on a white horse beneath a huge sun"
  },
  "rv": {
   "o": [
    "good news that arrives smaller than promised",
    "a celebration postponed by rain",
    "a bright mood with a thin crust of doubt"
   ],
   "c": [
    "overconfidence that skips the last check",
    "waiting for perfect weather to enjoy anything"
   ],
   "t": "the joy has not left, it is only dimmed behind passing cloud",
   "i": "a sun behind thin cloud, its edges still golden"
  }
 },
 "major-20": {
  "up": {
   "o": [
    "a calling that returns after years of silence",
    "an old mistake finally forgiven",
    "a moment of clear reckoning about your work"
   ],
   "c": [
    "mistaking an echo for a summons",
    "carrying the old verdict into a new life"
   ],
   "t": "the trumpet you thought was fading is calling you by name",
   "i": "figures rising from open coffins toward a trumpet's golden call"
  },
  "rv": {
   "o": [
    "an invitation you find reasons to ignore",
    "a harsh inner voice growing louder",
    "an apology you rehearse but never send"
   ],
   "c": [
    "sentencing yourself without hearing the whole case",
    "hiding behind a past already served"
   ],
   "t": "the verdict you keep passing on yourself is harsher than any court's",
   "i": "a courtroom where one person is judge, jury and prisoner"
  }
 },
 "major-21": {
  "up": {
   "o": [
    "a long project reaching its finish line",
    "a graduation, launch or homecoming",
    "a room where every part of your life fits"
   ],
   "c": [
    "feeling lost the day after the finish",
    "waiting for permission to call it done"
   ],
   "t": "a long circle is closing, and it closes around you complete",
   "i": "a dancer inside a laurel wreath, four creatures at the corners"
  },
  "rv": {
   "o": [
    "a final task that keeps slipping away",
    "a shortcut that leaves a gap in the foundation",
    "a goodbye that never quite gets said"
   ],
   "c": [
    "calling it finished with the corners unturned",
    "lingering at the door of the next chapter"
   ],
   "t": "nearly finished is not the same as finished, and you feel the gap",
   "i": "a wreath missing one leaf, the dancer pausing mid-step"
  }
 },
 "wands-01": {
  "up": {
   "o": [
    "a half-formed idea that suddenly won't sit still",
    "a late-night sketch turning into a real project",
    "an offer to start something from nothing"
   ],
   "c": [
    "mistaking a sudden rush for a plan",
    "starting three things and finishing none"
   ],
   "t": "the idea that woke you before dawn was knocking, not passing by",
   "i": "a match struck in a room full of dry paper"
  },
  "rv": {
   "o": [
    "a project that stalls at the first blank page",
    "a promising start fizzling out by Thursday",
    "a morning when nothing feels worth beginning"
   ],
   "c": [
    "blaming outside forces for a stalled start",
    "waiting for a mood that never arrives"
   ],
   "t": "something unnamed is sitting on the spark and keeping it from catching",
   "i": "a damp matchbook, every strike leaving only a black smear"
  }
 },
 "wands-02": {
  "up": {
   "o": [
    "a map spread across the kitchen table",
    "a choice between two workable futures",
    "a quiet decision made at a high window"
   ],
   "c": [
    "planning so long the moment passes",
    "holding every option and committing to none"
   ],
   "t": "you already know which horizon you keep glancing toward when nobody is watching",
   "i": "a figure on a battlement holding a globe, gazing seaward"
  },
  "rv": {
   "o": [
    "a plan shelved because step one feels too steep",
    "an unsent application sitting in your drafts",
    "a comfortable routine quietly shrinking your options"
   ],
   "c": [
    "calling fear of the unknown good sense",
    "drawing maps of places you never visit"
   ],
   "t": "the safe harbor you keep choosing has begun to feel like a cell",
   "i": "a ship tied to the dock, its sails never unfurled"
  }
 },
 "wands-03": {
  "up": {
   "o": [
    "a reply from far away that changes your plans",
    "a venture finally showing results beyond your own town",
    "someone you helped years ago opening a door"
   ],
   "c": [
    "counting profits before the goods arrive",
    "looking so far ahead you miss today's details"
   ],
   "t": "the work you sent out long ago is on its way back with company",
   "i": "a figure on a cliff watching three sails cross a gold sea"
  },
  "rv": {
   "o": [
    "a shipment weeks late with no explanation",
    "a partner's plan quietly running out of money",
    "a horizon clouded by fog and paperwork"
   ],
   "c": [
    "reading every delay as a verdict",
    "narrowing your view to the next obstacle"
   ],
   "t": "what looks like a wall on the horizon may only be a slow tide",
   "i": "an empty harbor at dusk, the bell ringing for no one"
  }
 },
 "wands-04": {
  "up": {
   "o": [
    "a gathering where everyone seems glad you came",
    "a housewarming or reunion on the calendar",
    "a milestone at work that people actually mark"
   ],
   "c": [
    "assuming the party means the work is done",
    "the one guest who resents the cheer"
   ],
   "t": "a place at the table has been quietly kept for you all along",
   "i": "a doorway strung with garlands and lit from within"
  },
  "rv": {
   "o": [
    "a move that keeps getting pushed back",
    "a family gathering called off at the last minute",
    "a house that feels borrowed rather than lived in"
   ],
   "c": [
    "treating a postponed celebration as a refused one",
    "ignoring the creak in the foundation"
   ],
   "t": "belonging has not left, it is only waiting in an unpacked box",
   "i": "half-packed boxes beside a table set for guests who never came"
  }
 },
 "wands-05": {
  "up": {
   "o": [
    "a loud meeting where everyone wants the last word",
    "a rival whose pace sharpens your own",
    "a family argument over something trivial"
   ],
   "c": [
    "winning an argument nobody else cared about",
    "mistaking noise for opposition"
   ],
   "t": "the friction in the room is sharpening something, even if nobody enjoys it",
   "i": "five staves clacking together in a muddy field"
  },
  "rv": {
   "o": [
    "a truce brokered over cold coffee",
    "a conflict you keep routing around",
    "an overdue apology nobody rehearsed"
   ],
   "c": [
    "calling avoidance peace",
    "a grudge going quiet but not away"
   ],
   "t": "the fight is either ending or being walked around, and the silence will say which",
   "i": "raised voices fading down a hallway, one door left ajar"
  }
 },
 "wands-06": {
  "up": {
   "o": [
    "a name read aloud in a crowded room",
    "a compliment from someone whose approval surprises you",
    "a small victory noticed by strangers"
   ],
   "c": [
    "needing the applause to feel real",
    "forgetting who held the ladder"
   ],
   "t": "people have been watching you work for longer than you realized",
   "i": "a rider in a laurel wreath passing through a cheering street"
  },
  "rv": {
   "o": [
    "a credit line that leaves out your name",
    "a confident pitch stumbling on one small detail",
    "a rival being praised for your idea"
   ],
   "c": [
    "pride that polishes itself in every window",
    "measuring your worth by the room's reaction"
   ],
   "t": "the applause you keep waiting for may have gone to someone else",
   "i": "a parade passing a lone figure left standing on the curb"
  }
 },
 "wands-07": {
  "up": {
   "o": [
    "a challenge arriving just as you settle in",
    "a critic circling the thing you built",
    "a decision you must defend to a skeptical room"
   ],
   "c": [
    "seeing an enemy in every challenger",
    "defending ground no longer worth holding"
   ],
   "t": "the ground beneath you is yours, and it is being tested for a reason",
   "i": "one figure on a hilltop fending off staves from below"
  },
  "rv": {
   "o": [
    "a week of emails that all feel like attacks",
    "a quarrel over something nobody will remember",
    "a quiet decision to drop the old position"
   ],
   "c": [
    "answering every criticism like a declaration of war",
    "surrender dressed up as being reasonable"
   ],
   "t": "some of the battles wearing you thin were never yours to fight",
   "i": "a lone figure lowering a stave while the slope fills with shadows"
  }
 },
 "wands-08": {
  "up": {
   "o": [
    "a flurry of messages arriving before breakfast",
    "a last-minute trip booked and taken within days",
    "a stalled project suddenly picking up speed"
   ],
   "c": [
    "answering fast and meaning little",
    "answering every message before reading it twice"
   ],
   "t": "what has been slow for months is about to move all at once",
   "i": "a volley of staves arcing across an empty blue sky"
  },
  "rv": {
   "o": [
    "a flight delayed with no word from the airline",
    "an inbox full of replies that go nowhere",
    "five projects each pulling a different way"
   ],
   "c": [
    "scattering your effort until none of it lands",
    "irritation spilling onto people who are not at fault"
   ],
   "t": "the stall and the scatter are two faces of the same unfocused hurry",
   "i": "sparks thrown off a grinding wheel, scattering into the dark"
  }
 },
 "wands-09": {
  "up": {
   "o": [
    "a final stretch that asks more than expected",
    "an old wound aching in the rain",
    "a stubborn deadline you are almost through"
   ],
   "c": [
    "trusting no one near the finish line",
    "pushing through pain that deserves attention"
   ],
   "t": "you are closer to the end than the bandages and bruises suggest",
   "i": "a bandaged figure leaning on a stave before a fence of poles"
  },
  "rv": {
   "o": [
    "a body that refuses to get out of bed",
    "a suspicion that every kind word has a catch",
    "a friend giving up on knocking at your door"
   ],
   "c": [
    "mistaking exhaustion for a personality",
    "building walls where a gate would have served"
   ],
   "t": "the defenses that once protected you have started to keep everyone else out",
   "i": "a fence of splintered poles grown tall around a rusted gate"
  }
 },
 "wands-10": {
  "up": {
   "o": [
    "obligations piling onto one set of shoulders",
    "a role that quietly doubled without a raise",
    "a household chore list nobody else has read"
   ],
   "c": [
    "carrying what was never yours to carry",
    "taking pride in being the only one who can"
   ],
   "t": "the weight on your back is a pile of separate things you have never counted",
   "i": "a figure bent under a bundle of staves, nearing a village"
  },
  "rv": {
   "o": [
    "a task finally handed to someone else",
    "a body giving out right after the deadline passes",
    "a long-held responsibility set down on a doorstep"
   ],
   "c": [
    "dropping everything at once instead of one thing",
    "resentment hardening in whoever stayed holding it"
   ],
   "t": "the load comes off either gently by choice or all at once by breaking",
   "i": "a bundle of staves spilled across a road, hands finally empty"
  }
 },
 "wands-11": {
  "up": {
   "o": [
    "a curious stranger who makes work feel like play",
    "a letter bringing odd and exciting news",
    "a sudden urge to learn something impractical"
   ],
   "c": [
    "falling in love with beginnings only",
    "telling everyone the plan before it exists"
   ],
   "t": "a restless younger part of you has found something worth chasing",
   "i": "a barefoot messenger on a dune, staring at a sprouting stave"
  },
  "rv": {
   "o": [
    "a notebook filled with brilliant first pages",
    "a new hobby abandoned by the second weekend",
    "a message dropped midway through typing"
   ],
   "c": [
    "mistaking haste for passion",
    "promising the finished thing before it is begun"
   ],
   "t": "plenty of sparks are flying and none of them has found anything to light",
   "i": "a kite tugging loose from a child's hand over a field"
  }
 },
 "wands-12": {
  "up": {
   "o": [
    "a spontaneous trip that begins with a full tank",
    "a bold move at work no one saw coming",
    "a romance that starts at full speed"
   ],
   "c": [
    "leaving before reading the whole map",
    "charm covering for a short attention span"
   ],
   "t": "the thing you want will not wait politely while you think it over",
   "i": "a rider on a lathered horse charging across a desert"
  },
  "rv": {
   "o": [
    "a sprint that ends in a sudden crash",
    "a heated reply sent and regretted by noon",
    "a big plan abandoned halfway across the country"
   ],
   "c": [
    "burning out before the good part",
    "blaming everyone else for the stalled charge"
   ],
   "t": "going faster has quietly become a way of not arriving anywhere",
   "i": "a rider sagging in the saddle beside a smoldering field"
  }
 },
 "wands-13": {
  "up": {
   "o": [
    "a room tilting toward you as you enter",
    "an invitation to host or to lead",
    "a warm, bold friend who vouches for you"
   ],
   "c": [
    "charm used to avoid hard conversations",
    "taking on every cause that asks"
   ],
   "t": "your own confidence is more contagious than you have noticed",
   "i": "a woman among sunflowers with a black cat at her heel"
  },
  "rv": {
   "o": [
    "a pang of envy over a friend's good news",
    "a demanding mood that fills the whole house",
    "a quiet doubt in someone who seems so sure"
   ],
   "c": [
    "turning hurt into demands on others",
    "comparing your private doubt to someone's public shine"
   ],
   "t": "some of the heat aimed at others began as doubt about yourself",
   "i": "a candle shielded so closely its glow turns to smoke"
  }
 },
 "wands-14": {
  "up": {
   "o": [
    "a chance to lead a team nobody else wants",
    "a clear plan that suddenly gains followers",
    "a mentor who speaks plainly and means it"
   ],
   "c": [
    "confusing loud certainty with being right",
    "ruling when the room needed a listener"
   ],
   "t": "the vision in your head is nearly ready to be built",
   "i": "a tall figure on a hillside spreading his arms over a valley"
  },
  "rv": {
   "o": [
    "a boss whose promises outrun the budget",
    "a boast that turns into a debt",
    "a plan so grand nobody dares question it"
   ],
   "c": [
    "demanding what you would never do yourself",
    "big talk standing in for the follow-through"
   ],
   "t": "the loudest voice in the room is hiding a thin plan",
   "i": "a paper crown on a man lecturing empty chairs"
  }
 },
 "cups-01": {
  "up": {
   "o": [
    "a sudden softness toward someone you'd written off",
    "a letter that says more than it meant to",
    "a creative itch that wakes you at night"
   ],
   "c": [
    "pouring everything into the first warm face",
    "mistaking a flood for a lasting river"
   ],
   "t": "the thing you thought had dried up was only waiting for rain",
   "i": "a bowl filling in the dark until it spills"
  },
  "rv": {
   "o": [
    "a conversation that stalls in the doorway",
    "affection landing on the wrong doorstep",
    "a weekend of numb, flat afternoons"
   ],
   "c": [
    "calling the silence peace",
    "spending warmth on someone who never notices"
   ],
   "t": "what feels like emptiness may be a locked room, not a bare one",
   "i": "a well with the lid nailed shut"
  }
 },
 "cups-02": {
  "up": {
   "o": [
    "an easy rapport with a new coworker",
    "a first date that runs past closing time",
    "a partner finally saying the quiet part aloud"
   ],
   "c": [
    "assuming a spark means a match",
    "losing yourself in the other person's rhythm"
   ],
   "t": "being truly met by someone is rarer than being merely liked",
   "i": "two glasses touched together over a candlelit table"
  },
  "rv": {
   "o": [
    "a text that gets answered a day late",
    "a fight about dishes that isn't about dishes",
    "a friendship cooling without any announcement"
   ],
   "c": [
    "keeping a tally of who called last",
    "reading a coldness into every pause"
   ],
   "t": "two people can speak the same words and still hear different things",
   "i": "two clocks in one room ticking out of step"
  }
 },
 "cups-03": {
  "up": {
   "o": [
    "a crowded kitchen at a neighbor's birthday",
    "good news you get to share in person",
    "an old group chat suddenly lighting up"
   ],
   "c": [
    "the toast that outlasts the occasion",
    "assuming everyone in the room feels as warm"
   ],
   "t": "the people who show up with food are the ones who stay",
   "i": "laughter spilling out of an open window at dusk"
  },
  "rv": {
   "o": [
    "a group outing that leaves you hungover and hollow",
    "a whisper traveling the office faster than the truth",
    "an invitation that somehow skips your name"
   ],
   "c": [
    "the third round that undoes the evening",
    "a story passed along with extra teeth"
   ],
   "t": "being surrounded by noise can be the loneliest place to stand",
   "i": "a party's last guests drifting home through spilled confetti"
  }
 },
 "cups-04": {
  "up": {
   "o": [
    "a quiet stretch where nothing seems worth wanting",
    "an offer sitting unopened in your inbox",
    "a long afternoon staring out of a window"
   ],
   "c": [
    "dismissing a kindness before you have read it",
    "sulking so thoroughly that no one knocks anymore"
   ],
   "t": "the boredom you feel may be a gift you haven't unwrapped",
   "i": "someone slumped under a tree, ignoring a hand in the clouds"
  },
  "rv": {
   "o": [
    "an appetite returning after a flat season",
    "an old project suddenly tugging at your sleeve",
    "a yes you had stopped believing you'd say"
   ],
   "c": [
    "rushing at the first thing that glitters",
    "pretending you were never bored at all"
   ],
   "t": "what you ignored for months is quietly still being offered",
   "i": "a sleeper sitting up as morning reaches the room"
  }
 },
 "cups-05": {
  "up": {
   "o": [
    "grief arriving late, after the funeral crowd leaves",
    "regret over an apology never sent",
    "a spoiled plan you keep replaying"
   ],
   "c": [
    "staring at the spill while ignoring what remains",
    "wearing sorrow like the only coat you own"
   ],
   "t": "mourning can take up so much room that survivors go unseen",
   "i": "spilled wine pooling beside two glasses still upright"
  },
  "rv": {
   "o": [
    "a grudge finally loosening its grip",
    "an apology accepted over a bad phone line",
    "a rearranged life that fits better"
   ],
   "c": [
    "calling forgiveness what is really exhaustion",
    "tidying away a loss before it's been mourned"
   ],
   "t": "the bridge behind you stays standing even when you turn away",
   "i": "a mourner turning from the spill toward a lit house"
  }
 },
 "cups-06": {
  "up": {
   "o": [
    "a school friend's name on your phone",
    "the smell of a childhood kitchen returning",
    "a box of old photographs surfacing in the attic"
   ],
   "c": [
    "sanding the edges off what actually happened",
    "confusing a reunion with a restart"
   ],
   "t": "someone who knew you young is thinking of you right now",
   "i": "a garden of faded toys in golden afternoon light"
  },
  "rv": {
   "o": [
    "a sentimental fixation on a house you sold",
    "an ex who looks better in memory",
    "old routines you keep after they stop fitting"
   ],
   "c": [
    "measuring every present day against a better yesterday",
    "forgetting the leaks in the old roof"
   ],
   "t": "yesterday only looks that sweet because the bitter parts were edited out",
   "i": "a dusty jar of summers sealed for years"
  }
 },
 "cups-07": {
  "up": {
   "o": [
    "too many job offers, all slightly too shiny",
    "a daydream crowding out the small real task",
    "a plan with a hollow center"
   ],
   "c": [
    "chasing the option that glitters brightest",
    "collecting maybes instead of making anything"
   ],
   "t": "not every door in the hallway opens onto an actual room",
   "i": "glittering prizes drifting in a bank of smoke"
  },
  "rv": {
   "o": [
    "a morning when the fog finally thins",
    "a blunt number that settles an argument",
    "a decision made at the kitchen table"
   ],
   "c": [
    "narrowing too fast and calling it clarity",
    "mourning the options you've just closed"
   ],
   "t": "the choice looked impossible only while you refused to price it",
   "i": "mist burning off a field to show one fence"
  }
 },
 "cups-08": {
  "up": {
   "o": [
    "a quiet resignation letter in a drawer",
    "boxes stacked by a door in a half-empty room",
    "a sudden urge to leave a long-held role"
   ],
   "c": [
    "leaving at night without telling anyone why",
    "mistaking restlessness for a calling"
   ],
   "t": "what you're walking away from filled you up for years before it stopped",
   "i": "a lone walker climbing a moonlit slope, staff in hand"
  },
  "rv": {
   "o": [
    "another year in a job that bores you",
    "a suitcase packed and never carried out",
    "weeks of drifting between half-started plans"
   ],
   "c": [
    "calling fear by the name of loyalty",
    "wandering so long the map stops mattering"
   ],
   "t": "staying put and wandering aimlessly can be the same kind of flight",
   "i": "a packed bag gathering dust beside the front door"
  }
 },
 "cups-09": {
  "up": {
   "o": [
    "a small wish granted by a stranger",
    "a table full of food and friends",
    "a payoff for work you'd nearly forgotten"
   ],
   "c": [
    "assuming comfort will wait for you forever",
    "enjoying everything except the moment itself"
   ],
   "t": "you already own more of what you wanted than you admit",
   "i": "a contented host seated before a shelf of gleaming vessels"
  },
  "rv": {
   "o": [
    "a promotion that tastes like paper",
    "a beautiful house with one cold room",
    "a purchase that fades by the weekend"
   ],
   "c": [
    "boasting about what you've stopped enjoying",
    "buying a bigger shelf for the same ache"
   ],
   "t": "a full life can still leave a hollow place nobody can see",
   "i": "a banquet table where one chair sits empty"
  }
 },
 "cups-10": {
  "up": {
   "o": [
    "a holiday dinner where the whole family laughs",
    "a home that finally feels settled",
    "a child's drawing taped to the fridge"
   ],
   "c": [
    "polishing the picture for the neighbors",
    "treating contentment as something that cannot crack"
   ],
   "t": "belonging somewhere is quieter and sturdier than anything you chased",
   "i": "a lit porch and voices drifting across the lawn"
  },
  "rv": {
   "o": [
    "a family dinner with too many silences",
    "a sibling whose values have quietly drifted from yours",
    "a cracked foundation noticed during repairs"
   ],
   "c": [
    "keeping up appearances at the holiday table",
    "pretending the hairline fracture is only a shadow"
   ],
   "t": "the photo on the mantel hides a house with different weather",
   "i": "a framed family portrait with a crack through the glass"
  }
 },
 "cups-11": {
  "up": {
   "o": [
    "a strange dream that solves a daytime puzzle",
    "a message from a shy, sensitive friend",
    "a creative idea arriving like a fish"
   ],
   "c": [
    "taking every passing mood as a prophecy",
    "hiding the sketchbook from those who'd love it"
   ],
   "t": "the small hunch you keep brushing aside is speaking quite clearly",
   "i": "a small fish surfacing from a glass to say hello"
  },
  "rv": {
   "o": [
    "a sulk that lasts well past dinner",
    "a daydream swallowing a whole workday",
    "a crush built almost entirely from imagination"
   ],
   "c": [
    "crying over things that haven't happened",
    "hiding in fantasy whenever a bill arrives"
   ],
   "t": "the story you keep spinning is softer than the facts",
   "i": "a daydreamer asleep in a tub that has gone cold"
  }
 },
 "cups-12": {
  "up": {
   "o": [
    "a charming stranger with flowers and bad timing",
    "an invitation to collaborate on something lovely",
    "a romantic gesture from across the room"
   ],
   "c": [
    "being swept off your feet by a rehearsed line",
    "loving the gesture more than the person"
   ],
   "t": "the heart has been trotting toward something while you debated",
   "i": "a slow rider crossing a stream with a gift held out"
  },
  "rv": {
   "o": [
    "a lavish promise from a very smooth talker",
    "a jealous flare at an ordinary text",
    "a suitor whose mood changes with the weather"
   ],
   "c": [
    "believing a vow made after midnight",
    "sulking until someone guesses the reason"
   ],
   "t": "some promises are made of water and cannot be carried far",
   "i": "a handsome rider whose gift leaks through his fingers"
  }
 },
 "cups-13": {
  "up": {
   "o": [
    "a friend who confides in you at midnight",
    "a calm answer to someone's sudden tears",
    "a household finally settling into a gentler rhythm"
   ],
   "c": [
    "mistaking everyone's sorrow for your own",
    "listening so well that no one asks about you"
   ],
   "t": "steadiness can be a form of tenderness that asks for nothing",
   "i": "a still tide pool reflecting a patient sky"
  },
  "rv": {
   "o": [
    "a sibling who calls only in crisis",
    "an exhausted afternoon after absorbing others' troubles",
    "a tearful favor you agreed to against instinct"
   ],
   "c": [
    "playing the martyr for an audience of one",
    "rescuing people who haven't asked to be rescued"
   ],
   "t": "carrying everyone else's weather leaves you no sky of your own",
   "i": "a swimmer dragged under by hands that mean well"
  }
 },
 "cups-14": {
  "up": {
   "o": [
    "a tense meeting cooled by one measured sentence",
    "a mentor offering counsel without any lecture",
    "an argument that ends in a handshake"
   ],
   "c": [
    "mistaking composure for having nothing to feel",
    "keeping the peace at the price of honesty"
   ],
   "t": "calm is not the absence of feeling but its good manners",
   "i": "a still figure on a stone seat above rolling waves"
  },
  "rv": {
   "o": [
    "a colleague who weaponizes sympathy",
    "a conversation iced over without warning",
    "a charming advisor with a quiet agenda"
   ],
   "c": [
    "guilt spent like currency in an argument",
    "going cold to avoid going under"
   ],
   "t": "silence can be a leash held very politely",
   "i": "a calm sea hiding a current that pulls one way"
  }
 },
 "swords-01": {
  "up": {
   "o": [
    "a sudden answer to a months-old question",
    "a blunt sentence that finally explains everything",
    "a plan that fits on one page"
   ],
   "c": [
    "mistaking a sharp remark for the whole truth",
    "cutting away something that was still useful"
   ],
   "t": "the thing you could not name was simple all along",
   "i": "a single clean window wiped in fogged glass"
  },
  "rv": {
   "o": [
    "a rumor that arrives before the facts",
    "a contract clause nobody read closely",
    "a tangle of half-remembered conversations"
   ],
   "c": [
    "deciding anything on the strength of a screenshot",
    "trusting the loudest version of events"
   ],
   "t": "the story you keep repeating has lost some of its pieces",
   "i": "a rusted compass spinning in a coat pocket"
  }
 },
 "swords-02": {
  "up": {
   "o": [
    "a standoff where nobody blinks first",
    "two job offers that cancel each other out",
    "a text left unanswered for days"
   ],
   "c": [
    "calling avoidance a careful kind of patience",
    "letting a deadline make the decision"
   ],
   "t": "not choosing is already a choice with its own price",
   "i": "a blindfolded figure balancing two heavy shapes by moonlight"
  },
  "rv": {
   "o": [
    "a flood of advice from every direction",
    "a deadline that makes the decision for you",
    "a moment when the fog simply lifts"
   ],
   "c": [
    "drowning in tabs, opinions and spreadsheets",
    "calling a forced choice a free one"
   ],
   "t": "the answer was visible the moment the noise quit",
   "i": "a crowded station board flickering until one name stays lit"
  }
 },
 "swords-03": {
  "up": {
   "o": [
    "news that lands like a dropped plate",
    "a goodbye said in a parked car",
    "an old song that suddenly hurts"
   ],
   "c": [
    "polishing grief into a story that sounds fine",
    "blaming the messenger for the message"
   ],
   "t": "a sorrow put off is only a sorrow stored in the walls",
   "i": "rain running down the inside of a kitchen window"
  },
  "rv": {
   "o": [
    "an apology that arrives years late",
    "a drawer of letters finally thrown away",
    "a first laugh that surprises you after loss"
   ],
   "c": [
    "forgiving too fast to feel the cost",
    "picking at a scab to keep it fresh"
   ],
   "t": "the wound has been closing quietly while you looked elsewhere",
   "i": "a stitched seam showing pale against dark cloth"
  }
 },
 "swords-04": {
  "up": {
   "o": [
    "a quiet week with nothing scheduled",
    "a long nap that mends more than tiredness",
    "a silent afternoon in an empty chapel"
   ],
   "c": [
    "a nap that quietly becomes a season",
    "ignoring the cough that keeps returning"
   ],
   "t": "the fight can wait while the body takes its turn",
   "i": "a stone effigy lying still in a hushed crypt"
  },
  "rv": {
   "o": [
    "three a.m. emails sent from a tired desk",
    "a week of rest that settles into rust",
    "a hobby abandoned out of sheer fatigue"
   ],
   "c": [
    "calling burnout dedication",
    "sleeping through the hours that mattered"
   ],
   "t": "rest taken too late or too long stops being rest",
   "i": "a clock ticking in a room where nobody sleeps"
  }
 },
 "swords-05": {
  "up": {
   "o": [
    "an argument won at a friend's expense",
    "a rival who smiles while taking credit",
    "a family dinner that ends with silence"
   ],
   "c": [
    "winning the point and losing the room",
    "gathering evidence against people you love"
   ],
   "t": "the prize may cost more than the quarrel was worth",
   "i": "a victor gathering dropped weapons as the losers walk away"
  },
  "rv": {
   "o": [
    "a call that begins with I was wrong",
    "an old rival offering a quiet handshake",
    "a grudge set down on a doorstep"
   ],
   "c": [
    "regret that arrives after the door shuts",
    "walking away and calling it peace"
   ],
   "t": "some fights end only when one person stops keeping score",
   "i": "two people leaving a battlefield by different gates at dusk"
  }
 },
 "swords-06": {
  "up": {
   "o": [
    "a ferry ride away from a hard year",
    "a new address with fewer ghosts",
    "a slow week where the phone stays quiet"
   ],
   "c": [
    "expecting calm water to stay calm forever",
    "leaving without the necessary goodbye"
   ],
   "t": "the quiet you wanted is nearer than the trouble behind you",
   "i": "a low boat gliding across flat grey water at dawn"
  },
  "rv": {
   "o": [
    "a move delayed by one more box",
    "an old argument following you into a new house",
    "a closing date that keeps slipping"
   ],
   "c": [
    "packing the storm along with the books",
    "staying put because leaving feels like admitting something"
   ],
   "t": "what you are leaving keeps climbing back into the boat",
   "i": "a suitcase too heavy to lift into the boat"
  }
 },
 "swords-07": {
  "up": {
   "o": [
    "a colleague quietly reshaping the official story",
    "a clever shortcut that only looks harmless",
    "an invoice that does not add up"
   ],
   "c": [
    "someone smiling a little too easily",
    "believing your own convenient version of events"
   ],
   "t": "someone near you is walking off with more than they admit",
   "i": "a thief tiptoeing out of camp at first light, arms full"
  },
  "rv": {
   "o": [
    "a confession spilling out over breakfast",
    "an email forwarded to the wrong person",
    "a lie that finally runs out of room"
   ],
   "c": [
    "confessing only to be forgiven",
    "being caught and blaming the one who caught you"
   ],
   "t": "a secret kept long enough starts to keep you instead",
   "i": "a pocketful of stolen coins ringing out in a silent hall"
  }
 },
 "swords-08": {
  "up": {
   "o": [
    "a rule at work nobody actually wrote down",
    "a locked door that was never actually bolted",
    "a habit of thought that feels like a wall"
   ],
   "c": [
    "treating a mood as a fact",
    "waiting for permission nobody is going to give"
   ],
   "t": "most of this cage was built from sentences you keep repeating",
   "i": "a bound figure standing in a ring of tall stakes"
  },
  "rv": {
   "o": [
    "a blindfold slipping loose during an ordinary conversation",
    "a friend's offhand remark that reframes everything",
    "a first step outside the old routine"
   ],
   "c": [
    "mistaking a doorway for another trap",
    "freedom that feels too bright to trust"
   ],
   "t": "the knots were looser than they looked from the inside",
   "i": "cloth falling from a face into a sudden morning"
  }
 },
 "swords-09": {
  "up": {
   "o": [
    "a long night of replayed conversations",
    "a dream you cannot shake all day",
    "a small worry swelling into a monster"
   ],
   "c": [
    "rehearsing disasters that never get a premiere",
    "answering a 3 a.m. thought like truth"
   ],
   "t": "the dark hours exaggerate everything they touch",
   "i": "a figure upright in bed, face in both hands"
  },
  "rv": {
   "o": [
    "a message from someone who noticed you were quiet",
    "a grey window beginning to pale",
    "a night of sleep that actually holds"
   ],
   "c": [
    "hiding the fear until it hardens",
    "calling relief a sign of danger"
   ],
   "t": "the thing that sat on your chest is climbing down",
   "i": "first light thinning the dark behind a curtain"
  }
 },
 "swords-10": {
  "up": {
   "o": [
    "a project collapsing under its own weight",
    "a relationship ending in one afternoon",
    "a final straw that is almost a relief"
   ],
   "c": [
    "reliving the ending in lurid detail",
    "performing the victim long after the fall"
   ],
   "t": "nothing lower remains, and that is its own strange mercy",
   "i": "a still figure face down on dark sand at sunrise"
  },
  "rv": {
   "o": [
    "a job that somehow survives the layoffs",
    "a stubborn pulse of appetite after illness",
    "an ending that keeps being postponed"
   ],
   "c": [
    "clinging to wreckage out of pride",
    "reopening a chapter that finished itself"
   ],
   "t": "getting up again is quieter and slower than anyone tells you",
   "i": "a hand pressing against cold floorboards to rise"
  }
 },
 "swords-11": {
  "up": {
   "o": [
    "a question that opens an entire afternoon",
    "a sharp-eyed newcomer at the office",
    "a notebook filling with half-formed ideas"
   ],
   "c": [
    "collecting facts and never using any",
    "suspicion that sees plots in coincidences"
   ],
   "t": "the odd detail you spotted is the real thread",
   "i": "a young watcher on a windy hill, eyes everywhere"
  },
  "rv": {
   "o": [
    "gossip circling the break room",
    "a clever comment that wounds more than intended",
    "big plans announced and never started"
   ],
   "c": [
    "arguing to protect a bruised ego",
    "sharing secrets that were never yours"
   ],
   "t": "a lot of talk is standing where an idea should be",
   "i": "a parrot in a library repeating things it never read"
  }
 },
 "swords-12": {
  "up": {
   "o": [
    "a promotion won by sheer speed",
    "a decision made before breakfast",
    "an idea that hits and demands action"
   ],
   "c": [
    "outrunning the people who would have helped",
    "mistaking haste for certainty"
   ],
   "t": "conviction is carrying you faster than your doubts can follow",
   "i": "a rider flattening the tall grass at full gallop"
  },
  "rv": {
   "o": [
    "a shouting match nobody planned",
    "six projects begun and none finished",
    "a reckless email sent on impulse"
   ],
   "c": [
    "bulldozing the quiet person in the meeting",
    "charging off in three directions at once"
   ],
   "t": "being right at full volume rarely feels like winning afterward",
   "i": "a horse bolting through a market with no rider steering"
  }
 },
 "swords-13": {
  "up": {
   "o": [
    "a boundary finally spoken aloud",
    "a blunt friend whose honesty lands kindly",
    "a decision made without asking permission"
   ],
   "c": [
    "mistaking distance for strength",
    "honesty that forgets who is listening"
   ],
   "t": "kindness and plain speech were never actually enemies",
   "i": "a still figure on a high seat in thin cold air"
  },
  "rv": {
   "o": [
    "a sarcastic remark landing on tender ground",
    "a friendship quietly cooling over a grudge",
    "silence at a table full of relatives"
   ],
   "c": [
    "using wit to keep everyone at arm's length",
    "keeping score of every old slight"
   ],
   "t": "the walls built for protection have started to keep out the light",
   "i": "frost forming on the inside of a locked window"
  }
 },
 "swords-14": {
  "up": {
   "o": [
    "a fair ruling from someone with authority",
    "a plan with its reasoning laid bare",
    "a mentor whose standards are high but just"
   ],
   "c": [
    "confusing coldness with objectivity",
    "judgment delivered before all the facts arrive"
   ],
   "t": "principles hold weight only when they are applied to yourself too",
   "i": "a magistrate at a bare desk under an even light"
  },
  "rv": {
   "o": [
    "a boss who rewrites the rules mid-quarter",
    "an argument built to win, not to be true",
    "a charming voice that nobody dares contradict"
   ],
   "c": [
    "being out-reasoned into doubting your own memory",
    "defending a rule only because you wrote it"
   ],
   "t": "logic can be sharpened into something that only wounds",
   "i": "a ledger used as a club in a locked office"
  }
 },
 "pentacles-01": {
  "up": {
   "o": [
    "a small plot of land offered cheaply",
    "a job lead from a friend's cousin",
    "a first paying customer for your side project"
   ],
   "c": [
    "mistaking a free sample for a full meal",
    "planting the seed in unprepared soil"
   ],
   "t": "something small and solid is being placed in your open hand",
   "i": "a single seed resting in a cupped, dirty palm"
  },
  "rv": {
   "o": [
    "an offer that expires while you hesitate",
    "a spreadsheet that quietly refuses to add up",
    "a lean month arriving earlier than planned"
   ],
   "c": [
    "assuming the opening will still be there tomorrow",
    "budgeting around money you have not received"
   ],
   "t": "the coin you thought was yours rolled under the furniture while you looked elsewhere",
   "i": "an empty purse swinging from a nail"
  }
 },
 "pentacles-02": {
  "up": {
   "o": [
    "three errands that somehow fit one afternoon",
    "a schedule rearranged around a sudden visitor",
    "a shaky budget that holds another month"
   ],
   "c": [
    "calling constant motion the same as progress",
    "the one plate nobody is watching"
   ],
   "t": "you are steadier than the pile of things in the air suggests",
   "i": "a street performer keeping bright objects aloft in the rain"
  },
  "rv": {
   "o": [
    "a calendar double-booked beyond apology",
    "bills piling up beside unopened mail",
    "a promise dropped because three others came first"
   ],
   "c": [
    "saying yes before checking what is already full",
    "a small task sliding into a large mess"
   ],
   "t": "the things you are holding up have begun to hold you down",
   "i": "a stack of mismatched plates leaning toward the tile"
  }
 },
 "pentacles-03": {
  "up": {
   "o": [
    "a boss noticing the work you did quietly",
    "a repair job shared between three pairs of hands",
    "a neighbor asking for your particular skill"
   ],
   "c": [
    "letting one loud voice claim the finished work",
    "building something no one has agreed to"
   ],
   "t": "what you make holds up better when other hands help shape it",
   "i": "three workers fitting the last stone into an arch"
  },
  "rv": {
   "o": [
    "a project stalling over who does what",
    "a rushed job that will need redoing",
    "a meeting where everyone talks and nothing lands"
   ],
   "c": [
    "blaming the group for your own loose ends",
    "work done fast and finished badly"
   ],
   "t": "the people around you are pulling in directions that do not meet",
   "i": "a half-built wall with crooked bricks and no mortar"
  }
 },
 "pentacles-04": {
  "up": {
   "o": [
    "a savings balance that finally feels like a floor",
    "a lock changed and a small peace restored",
    "a drawer of kept receipts proving useful"
   ],
   "c": [
    "gripping the thing until it cannot breathe",
    "calling caution what is really fear"
   ],
   "t": "what you hold so tightly may be holding you in place",
   "i": "a miser's hands closed around a single warm coin"
  },
  "rv": {
   "o": [
    "a splurge that arrives with a faint regret",
    "a hoard of clutter finally leaving the house",
    "a grudge over money held far too long"
   ],
   "c": [
    "spending to fill a hollow money cannot reach",
    "refusing every loan and every kindness"
   ],
   "t": "you swing between clutching and scattering and rarely rest in the middle",
   "i": "a purse split open on the pavement, coins rolling"
  }
 },
 "pentacles-05": {
  "up": {
   "o": [
    "a cold month with the heating bill unpaid",
    "a lit window you have walked past before",
    "a stranger offering a meal without asking questions"
   ],
   "c": [
    "mistaking pride for self-reliance",
    "deciding no one will answer before knocking"
   ],
   "t": "the help you assume is far off is only a doorway away",
   "i": "two figures in thin coats passing a bright church window"
  },
  "rv": {
   "o": [
    "a first warm meal after a long hungry stretch",
    "a lender finally agreeing to more time",
    "feeling returning to hands that had gone numb"
   ],
   "c": [
    "mistaking a thaw for permanent shelter",
    "leaving the old coldness unspoken once inside"
   ],
   "t": "the worst of the cold has passed, though something inside still shivers",
   "i": "a threshold with snow melting off a pair of boots"
  }
 },
 "pentacles-06": {
  "up": {
   "o": [
    "a bonus split fairly among the whole team",
    "leftovers carried next door in a covered dish",
    "a debt quietly forgiven over coffee"
   ],
   "c": [
    "keeping a ledger of every kindness given",
    "giving only where someone will see"
   ],
   "t": "what you give away has a way of finding its route home",
   "i": "a merchant weighing out grain evenly into two waiting bowls"
  },
  "rv": {
   "o": [
    "a favor returned with a bill attached",
    "a generous gift that comes with instructions",
    "a loan that turns friends into creditors"
   ],
   "c": [
    "the kindness that keeps an invisible receipt",
    "giving until nothing is left for yourself"
   ],
   "t": "some gifts are leashes made of softer material",
   "i": "an open hand holding out bread and a folded contract"
  }
 },
 "pentacles-07": {
  "up": {
   "o": [
    "a slow crop of savings finally showing green",
    "a project rewarding another year of quiet effort",
    "tomatoes ripening on a windowsill you nearly forgot"
   ],
   "c": [
    "pulling up the plant to check the roots",
    "confusing a slow season with a failed one"
   ],
   "t": "what you planted months ago is nearer ripe than it looks",
   "i": "a gardener leaning on a hoe, studying rows of green"
  },
  "rv": {
   "o": [
    "a season of labor with thin returns",
    "a venture that eats more than it feeds",
    "a harvest that rots before it is gathered"
   ],
   "c": [
    "watering the same dead stalk another year",
    "quitting one week before anything turns"
   ],
   "t": "the field you have been working may not be the right one",
   "i": "a basket of fruit going soft in the shed"
  }
 },
 "pentacles-08": {
  "up": {
   "o": [
    "a skill finally clicking after months of repetition",
    "a workshop evening that turns into a whole night",
    "a commission going to the one who practiced"
   ],
   "c": [
    "polishing the work long past the point of use",
    "letting the craft crowd out the people"
   ],
   "t": "repetition is slowly turning your clumsy hands into something skilled",
   "i": "an artisan bent over a bench, tapping out the same pattern"
  },
  "rv": {
   "o": [
    "a corner cut that the client eventually spots",
    "a week of busy motion with nothing finished",
    "a flawless draft never shown to anyone"
   ],
   "c": [
    "redoing the same line until it means nothing",
    "shortcuts that leave a crack in the foundation"
   ],
   "t": "effort is being poured out faster than it is being aimed",
   "i": "a chisel scoring the same groove again and again"
  }
 },
 "pentacles-09": {
  "up": {
   "o": [
    "a quiet evening in a home you paid for",
    "a trip taken alone and enjoyed",
    "a garden thriving under your own tending"
   ],
   "c": [
    "mistaking solitude for having no need of anyone",
    "a locked gate that keeps out the kind too"
   ],
   "t": "you have built a life that can stand without borrowed props",
   "i": "a woman in a sunlit vineyard with a falcon at her wrist"
  },
  "rv": {
   "o": [
    "a long week of work stretching into weekends",
    "a fine surface hiding an unfinished interior",
    "a small setback in an otherwise tidy plan"
   ],
   "c": [
    "filling the house with things that do not comfort",
    "working so hard the reward goes unseen"
   ],
   "t": "the garden has gone untended while you admired the gate",
   "i": "wilting vines behind a handsome, unopened gate"
  }
 },
 "pentacles-10": {
  "up": {
   "o": [
    "an inheritance that arrives with a story",
    "a crowded table at a family gathering",
    "a deed or document settling old questions"
   ],
   "c": [
    "treating the family name as a debt to repay",
    "assuming what was handed down can never crack"
   ],
   "t": "what you build now will be standing long after you stop",
   "i": "three generations at one long table beneath an old stone arch"
  },
  "rv": {
   "o": [
    "a quarrel over a will or a borrowed sum",
    "a family dinner ending with chairs scraped back",
    "a savings plan undone by one bad year"
   ],
   "c": [
    "old resentments hiding in the paperwork",
    "assuming the foundations are sound without looking"
   ],
   "t": "the house you counted on is shifting in ways nobody mentions",
   "i": "a long crack running up the wall of a grand hall"
  }
 },
 "pentacles-11": {
  "up": {
   "o": [
    "a night class that quietly changes your options",
    "a first small paycheck from a new trade",
    "a book on a practical subject that finds you"
   ],
   "c": [
    "collecting plans without ever lifting a tool",
    "being dazzled by the end and bored by steps"
   ],
   "t": "a modest beginning is worth more than a splendid plan",
   "i": "a student turning a single gold coin over in the lamplight"
  },
  "rv": {
   "o": [
    "a course paid for and left unopened",
    "a plan sleeping in the notebook another month",
    "a lesson repeated because it was skipped"
   ],
   "c": [
    "mistaking a daydream for a head start",
    "waiting for perfect conditions and never starting"
   ],
   "t": "the thing you want has been waiting for you to begin it",
   "i": "a dusty textbook open to the same chapter, unread"
  }
 },
 "pentacles-12": {
  "up": {
   "o": [
    "a dull task that turns out to matter",
    "a coworker whose steadiness saves a deadline",
    "a morning routine that holds when little else does"
   ],
   "c": [
    "calling the familiar safe when it is only familiar",
    "grinding on past the point of rest"
   ],
   "t": "slow and steady work is carrying more weight than anyone admits",
   "i": "a plow horse pulling one straight furrow across a wide field"
  },
  "rv": {
   "o": [
    "a stale week that repeats itself exactly",
    "a job that no longer asks anything of you",
    "weekends spent on the couch with the screen on"
   ],
   "c": [
    "mistaking stillness for stability",
    "saying tomorrow until the field lies fallow"
   ],
   "t": "the rut you are in has worn deeper than you noticed",
   "i": "a cart wheel sunk to the axle in dry mud"
  }
 },
 "pentacles-13": {
  "up": {
   "o": [
    "a house that suddenly feels like a refuge",
    "a dinner made from what the garden gave",
    "a friend who arrives hungry and leaves mended"
   ],
   "c": [
    "caring so well that nobody learns to cope",
    "the pot that always simmers for others"
   ],
   "t": "comfort made by hand is a kind of quiet power",
   "i": "a kitchen window fogged with soup steam and winter light"
  },
  "rv": {
   "o": [
    "a tired body sending its bill all at once",
    "a household expecting more than you can give",
    "a long evening of work carried home"
   ],
   "c": [
    "forgetting your own plate while filling everyone else's",
    "fussing so closely that others feel watched"
   ],
   "t": "you have been tending everything in the house but yourself",
   "i": "a lit kitchen where one chair stays empty at the stove"
  }
 },
 "pentacles-14": {
  "up": {
   "o": [
    "a steady raise after years of dependable work",
    "a well-run business or household you built",
    "an advisor whose counsel is sound and slow"
   ],
   "c": [
    "measuring a person by the size of their purse",
    "building walls so tall they shut out daylight"
   ],
   "t": "abundance is the quiet result of discipline repeated over decades",
   "i": "an old ruler on a stone throne amid ripe vineyards"
  },
  "rv": {
   "o": [
    "a deal won at someone else's expense",
    "an argument that comes down to money",
    "a purchase that proves emptier than its price"
   ],
   "c": [
    "letting stubbornness pass for strength",
    "valuing the thing over the hand that made it"
   ],
   "t": "when everything has a price, little is left that feels worth having",
   "i": "a heavy gold chain around a neck gone cold"
  }
 }
});
})(typeof window !== "undefined" ? window : globalThis);

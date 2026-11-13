# Free Tarot Readings

A portable tarot reading table for the browser. Shuffle, cut and deal a full 78-card deck the way different traditions do it, then read the cards with their upright **and** reversed meanings and a short guide to the reading as a whole.

**Play it:** https://davidfeuling.com/tarot-table/

(The web address and repository keep the original name, tarot-table, so existing links keep working.)

> **Mysticism for fun.** Free Tarot Readings is for entertainment and personal reflection only. Every card is drawn at random. Readings don't predict the future, and they aren't medical, legal, financial or psychological advice. No liability is assumed for anything you do because of a reading.

## Features

- **8 spreads:** Single Card, Past · Present · Future, Situation · Action · Outcome, Mind · Body · Spirit, Five-Card Cross, Two Paths, Horseshoe, Celtic Cross
- **6 shuffles**, each modeled on how the real one moves and turns cards: Overhand, Riffle (straight), Riffle (one half turned), Hindu, Wash (scramble) and Pile
- **3 cuts:** none, a single cut you place yourself, or the three-pile left-hand cut gathered in your chosen order
- **3 deals:** from the top, picked by hand from a face-down fan, or every seventh card
- **Reversals:** from your deck and how you shuffle (like a real deck), random 50/50, or off. See below.
- Every card has its own distinct upright and reversed meaning
- **The story in the cards:** a written narrative of what the draw is "trying to tell you", woven from every card's position, orientation, neighbors and pairings (see below)
- Reading guide: position-by-position meanings, plus patterns across the spread (Major Arcana weight, leading and missing suits, reversals, court cards, repeated numbers)
- Works offline, on phones, and from a thumb drive

## The story in the cards

When you press **Interpret**, the app writes a short story of what the cards might be trying to tell you. It runs fully offline: a set of pre-written phrases is combined by rules, with nothing fetched or generated at reading time.

- Every card has, for both upright and reversed: three *omens* (things that might come up in your life), two *cautions*, one *image* and one *message*. That's 1,092 phrases in `js/tarot-phrases.js`.
- The generator gives each spread position a role in the story (what's behind you, what crosses you, what's hidden, what's ahead and so on), then sets the mood from the leading element, the Major Arcana count and the number of reversals.
- It notices threads between cards: famous pairings (the Tower with the Star, the Fool with the World and others), repeated numbers, and court cards that may stand for real people.
- It describes and never prescribes: there's no "you should" anywhere.
- The same draw always tells the same story, and different draws choose different wording.

## How reversed cards work

With the default setting, reversals come from the deck itself, the way they do with real cards:

1. **Your deck starts in a realistic state.** A *well-used deck* (the default) has every card randomly upright or reversed. A *lightly used deck* starts with about a quarter reversed, and a *brand-new deck* is in order with every card upright.
2. **Each shuffle style turns cards in its own way:**

| Shuffle | How it turns cards |
|---|---|
| Overhand | Each packet has a 4% chance of landing turned end-over-end |
| Hindu | Each packet has a 3% chance of flipping |
| Riffle (straight) | Never turns cards: the halves are married as they are |
| Riffle (one half turned) | One hand's stack (35 to 43 cards) is rotated before the halves are married |
| Pile | Each pile has a 10% chance of being picked up turned |
| Wash | Each card has a 50% chance of being flipped |

3. **The deck carries over** from reading to reading, so what you did last time still shows.

On a brand-new deck, one shuffle leaves on average about 6 cards reversed for Overhand, 2 for Hindu, 8 for Pile, 0 for a straight Riffle, and about half the deck for a turned Riffle or a Wash. On a well-used deck every card is already a toss-up, so the shuffle mostly decides *which* cards end up reversed.

The other settings are **random 50/50** (each drawn card, whatever the shuffle) and **upright only**.

## Run it offline / from a thumb drive

Copy the whole folder (or unzip a release zip) and double-click `index.html`. There's nothing to install and no internet needed. Keep the `js` folder next to `index.html`.

## Adding card art

Cards show simple placeholder faces until you add art:

1. Make a folder called `art` next to `index.html`.
2. Name each image after its card id: `major-00.jpg` … `major-21.jpg`, then `wands-01.jpg` … `wands-14.jpg`, and the same for `cups`, `swords` and `pentacles` (01 = Ace, 11 = Page, 12 = Knight, 13 = Queen, 14 = King).
3. In `index.html`, set `const ART_FOLDER = "art";` (and `ART_EXT` if your files aren't `.jpg`).

Any card without an image keeps its placeholder face.

## Files

| File | What it is |
|---|---|
| `index.html` | The reading table app (layout, animations, interaction) |
| `js/tarot-data.js` | All 78 cards with meanings, plus spreads and method labels. Exposes `TarotData`. |
| `js/tarot-engine.js` | Shuffles, cuts, deals, card-of-the-day and reading analysis. Pure functions, no page needed. Exposes `TarotEngine`. |
| `js/tarot-phrases.js` | The story phrases for every card and orientation. Exposes `TarotPhrases`. |
| `js/tarot-narrative.js` | The story generator. Exposes `TarotNarrative.tell(drawn, spreadKey, { question })`, which returns `{ text, html }` paragraphs. |
| `tests/engine.test.js` | Checks for the engine (`node tests/engine.test.js`) |
| `js/support.js` | The "Support my work with crypto" section (same addresses and offline QR codes as davidfeuling.com) |
| `tests/narrative.test.js` | Tells thousands of random stories and checks the writing mechanics (`node tests/narrative.test.js`) |

## Reusing the deck in another project

The two `js` files are plain scripts with no dependencies, so they drop into any page and work from `file://`:

```html
<script src="js/tarot-data.js"></script>
<script src="js/tarot-engine.js"></script>
<script>
  // Card of the day: the same card for everyone on a given date
  const today = TarotEngine.dailyCard();          // { i, r, card, date }
  console.log(today.card.name, today.r ? today.card.rv.m : today.card.up.m);

  // A full shuffle, cut and deal
  let deck = TarotEngine.freshDeck();
  deck = TarotEngine.shuffle(deck, "wash");
  deck = TarotEngine.cutSingle(deck, 30);
  const drawn = TarotEngine.orient(TarotEngine.dealTop(deck, 3), "natural");
  const notes = TarotEngine.analyze(drawn, "ppf", "natural");   // [{ title, text }]
</script>
```

For the story too, also load `js/tarot-phrases.js` and `js/tarot-narrative.js`, then:

```js
const story = TarotNarrative.tell(drawn, "ppf", { question: "What's next at work?" });
// story.text: plain paragraphs; story.html: paragraphs with card names in bold
```

A card looks like `{ id, name, suit, rank, num, up: { k, m }, rv: { k, m } }`, where `k` is keywords and `m` is a one-line meaning. Look one up with `TarotData.byId["major-17"]`.

## Ideas for later

- Card art (in progress)
- Phone app version (the layout is already touch-ready; it could be packaged with a tool like Capacitor)

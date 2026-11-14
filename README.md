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
- **The vibe reading:** a 300 to 500 word reading of the draw's overall feel, highlighting its most interesting card (see below)
- Reading guide: position-by-position meanings, plus patterns across the spread (Major Arcana weight, leading and missing suits, reversals, court cards, repeated numbers)
- Works offline, on phones, and from a thumb drive

## The vibe reading

When you press **Interpret**, the app writes a 300 to 500 word reading of the draw's overall feel, above the card-by-card meanings. It runs fully offline: pre-written phrases are combined by rules, with nothing fetched or generated at reading time.

- **Every card is scored** in both orientations, from -2 to +2, on four scales: negative to positive, inaction to action, stability to change, and outward to inward. Reversed scores follow a rule (bright cards dim, heavy cards ease, motion stalls, the mood turns inward), with hand-set exceptions such as the Devil reversed reading as release.
- **The most interesting card is highlighted.** It's chosen by points: how strong its scores are, Major Arcana weight, how much it stands out from the rest of the draw, and whether it sits in a key position.
- **The overall feel** comes from the whole spread's averages (bright, mixed or heavy; moving, balanced or still), how much change it shows, its leading and missing elements, reversals, court cards and the inward or outward lean.
- It reads like a horoscope, but it's about the cards. It describes and never prescribes.
- The same draw always gives the same reading.
- `js/tarot-phrases.js` holds each card's image, message, omens and cautions. The scores and passages are in `js/tarot-narrative.js`, and both are plain text you can edit.

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

## Saving a reading as text

After you've dealt a reading and pressed **Interpret**, enter **← ← → → ↑ ↓ ↑ ↓** on the arrow keys (or swipe those directions on a phone). A preview opens with **Download .txt** and **Copy text**. The file includes the date, app version, your question, how the cards were shuffled, cut and dealt, the vibe reading, every card's meaning and scores, and the overall patterns. Files are named by date with a number for each save that day, for example `free-tarot-readings-2026-11-13-01-celtic-cross.txt`. The code does nothing on other screens.

## Run it offline / from a thumb drive

Copy the whole folder (or unzip a release zip) and double-click `index.html`. There's nothing to install and no internet needed. Keep the `js` folder next to `index.html`.

## Adding card art

Until you add art, cards show drawn placeholder faces (from `js/card-faces.js`): each suit's own symbol (a wand, a cup, a sword or a pentacle), and for the Major Arcana a purple pentagram stamp over a shadowy fog with eyes looking out. The eyes are red for mostly negative cards, kind blue for mostly positive ones, and pale violet for cards in between. To use your own art instead:

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
| `js/tarot-phrases.js` | The phrases (image, message, omens, cautions) for every card and orientation. Exposes `TarotPhrases`. |
| `js/tarot-narrative.js` | Card scores and the vibe reading. `TarotNarrative.tell(drawn, spreadKey, { question })` returns `{ text, html, highlight, scores, words }`. |
| `tests/engine.test.js` | Checks for the engine (`node tests/engine.test.js`) |
| `js/card-faces.js` | The drawn placeholder card faces. Exposes `TarotFaces`. |
| `js/support.js` | The "Support my work with crypto" section (same addresses and offline QR codes as davidfeuling.com) |
| `tests/narrative.test.js` | Writes thousands of random readings and checks length and wording rules (`node tests/narrative.test.js`) |

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

For the vibe reading too, also load `js/tarot-phrases.js` and `js/tarot-narrative.js`, then:

```js
const story = TarotNarrative.tell(drawn, "ppf", { question: "What's next at work?" });
// story.text: plain paragraphs; story.html: card names in bold; story.highlight: index of the highlighted card
```

A card looks like `{ id, name, suit, rank, num, up: { k, m }, rv: { k, m } }`, where `k` is keywords and `m` is a one-line meaning. Look one up with `TarotData.byId["major-17"]`.

## Ideas for later

- Card art (in progress)
- Phone app version (the layout is already touch-ready; it could be packaged with a tool like Capacitor)

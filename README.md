# Tarot Table

A portable tarot reading table for the browser. Shuffle, cut and deal a full 78-card deck the way different traditions do it, then read the cards with their upright **and** reversed meanings and a short guide to the reading as a whole.

**Play it:** https://davidfeuling.com/tarot-table/

> **Mysticism for fun.** Tarot Table is for entertainment and personal reflection only. Every card is drawn at random. Readings don't predict the future, and they aren't medical, legal, financial or psychological advice. No liability is assumed for anything you do because of a reading.

## Features

- **8 spreads:** Single Card, Past · Present · Future, Situation · Action · Outcome, Mind · Body · Spirit, Five-Card Cross, Two Paths, Horseshoe, Celtic Cross
- **5 shuffles**, each modeled on how the real one moves cards: Overhand, Riffle, Hindu, Wash (scramble) and Pile, plus Turn & Riffle
- **3 cuts:** none, a single cut you place yourself, or the three-pile left-hand cut gathered in your chosen order
- **3 deals:** from the top, picked by hand from a face-down fan, or every seventh card
- **Reversals:** from how you shuffle (like a real deck), random 50/50, or off
- Every card has its own distinct upright and reversed meaning
- Reading guide: position-by-position meanings, plus patterns across the spread (Major Arcana weight, leading and missing suits, reversals, court cards, repeated numbers)
- Works offline, on phones, and from a thumb drive

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
| `tests/engine.test.js` | Checks for the engine (`node tests/engine.test.js`) |

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

A card looks like `{ id, name, suit, rank, num, up: { k, m }, rv: { k, m } }`, where `k` is keywords and `m` is a one-line meaning. Look one up with `TarotData.byId["major-17"]`.

## Ideas for later

- Card art (in progress)
- Phone app version (the layout is already touch-ready; it could be packaged with a tool like Capacitor)

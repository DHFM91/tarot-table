# Card art: Rider-Waite-Smith tarot, 1909 first edition

All 78 cards and the card back come from an original December 1909 "Roses & Lilies" printing of the Rider-Waite-Smith deck, art by Pamela Colman Smith. The scans are by Saskia Jansen, from her own deck, via Wikimedia Commons. The art is in the public domain: it was published in 1909 and the artist died in 1951.

- `art/*.jpg`: the copies the app uses, resized to 420 x 693 (the app's card shape) and named by card id: `major-00` to `major-21`, then `wands-01` to `pentacles-14` (01 = Ace, 11 = Page, 12 = Knight, 13 = Queen, 14 = King), plus `back.jpg`.
- `art/full/`: the original full-size scans (about 820 x 1430), for reuse elsewhere. Left out of the release zips to keep them small.
- `rws-cards.json`: every card's id, name, both files and its Wikimedia Commons source page.

Numbering follows the printed cards: VIII is Strength and XI is Justice, matching `js/tarot-data.js`.

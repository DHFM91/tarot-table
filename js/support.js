/*
 * Free Tarot Readings: "Support my work with crypto" section.
 * Same three addresses and the same offline QR generator as davidfeuling.com.
 * Fills <details class="support" id="support"><div id="coins"></div></details> if the page has one.
 * To change an address, edit CRYPTO below (and on davidfeuling.com, to keep them matching).
 */
(function () {
"use strict";
const CRYPTO = [
  { name: "Bitcoin",  ticker: "BTC", address: "bc1q2a6fl09nq09xz8gthvc6znj25kk4j4phus7a0d" },
  { name: "Monero",   ticker: "XMR", address: "84Y4CHMXgSBgVHB7MGS9HFTJ2HekqVfFA2VDuzJDz1vp7ynTAo6yqYuWLn4kTZnqjGBh9uKcAGSSeRUCovVLnLsNKqARmCN" },
  { name: "Ethereum", ticker: "ETH · USDC", address: "0xD125B2C81a6418E05c2ea7C8E5C61B18297840Bd",
    note: "ETH or USDC on the Ethereum network only." },
];

const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));

/* ---- QR code generator (byte mode, error correction M, versions 1–10) ---- */
const makeQR = (() => {
  const EXP = [], LOG = [];
  for (let i = 0, x = 1; i < 255; i++) { EXP[i] = x; LOG[x] = i; x <<= 1; if (x & 256) x ^= 0x11d; }
  for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255];
  const mul = (a, b) => (a && b ? EXP[LOG[a] + LOG[b]] : 0);
  const rs = (data, n) => {
    let g = [1];
    for (let i = 0; i < n; i++) {
      const ng = new Array(g.length + 1).fill(0);
      g.forEach((c, j) => { ng[j] ^= c; ng[j + 1] ^= mul(c, EXP[i]); });
      g = ng;
    }
    const r = new Array(n).fill(0);
    for (const d of data) {
      const f = d ^ r.shift(); r.push(0);
      for (let i = 0; i < n; i++) r[i] ^= mul(g[i + 1], f);
    }
    return r;
  };
  // [ec codewords per block, [blocks, data codewords], ...]
  const BLK = [null, [10,[1,16]], [16,[1,28]], [26,[1,44]], [18,[2,32]], [24,[2,43]],
    [16,[4,27]], [18,[4,31]], [22,[2,38],[2,39]], [22,[3,36],[2,37]], [26,[4,43],[1,44]]];
  const ALIGN = [null, [], [6,18], [6,22], [6,26], [6,30], [6,34], [6,22,38], [6,24,42], [6,26,46], [6,28,50]];
  const bit = (x, i) => (x >>> i) & 1;

  return text => {
    const bytes = new TextEncoder().encode(text);
    let v = 1, cap;
    for (; v <= 10; v++) {
      cap = BLK[v].slice(1).reduce((s, [n, k]) => s + n * k, 0);
      if (4 + (v < 10 ? 8 : 16) + bytes.length * 8 <= cap * 8) break;
    }
    if (v > 10) throw new Error("Text too long for QR");
    // data bits
    const bits = [];
    const put = (val, len) => { for (let i = len - 1; i >= 0; i--) bits.push(bit(val, i)); };
    put(4, 4); put(bytes.length, v < 10 ? 8 : 16); bytes.forEach(b => put(b, 8));
    put(0, Math.min(4, cap * 8 - bits.length));
    while (bits.length % 8) bits.push(0);
    const data = [];
    for (let i = 0; i < bits.length; i += 8) data.push(parseInt(bits.slice(i, i + 8).join(""), 2));
    for (let p = 0xec; data.length < cap; p ^= 0xec ^ 0x11) data.push(p);
    // blocks + error correction, interleaved
    const ecN = BLK[v][0], blocks = [];
    let off = 0;
    for (const [n, k] of BLK[v].slice(1)) for (let i = 0; i < n; i++) {
      const d = data.slice(off, off += k); blocks.push([d, rs(d, ecN)]);
    }
    const out = [];
    const maxK = Math.max(...blocks.map(b => b[0].length));
    for (let i = 0; i < maxK; i++) blocks.forEach(b => { if (i < b[0].length) out.push(b[0][i]); });
    for (let i = 0; i < ecN; i++) blocks.forEach(b => out.push(b[1][i]));

    const size = 17 + 4 * v;
    const m = Array.from({ length: size }, () => new Array(size).fill(0));
    const fn = Array.from({ length: size }, () => new Array(size).fill(false));
    const set = (x, y, d) => { m[y][x] = d ? 1 : 0; fn[y][x] = true; };
    for (let i = 0; i < size; i++) { set(6, i, i % 2 === 0); set(i, 6, i % 2 === 0); }
    for (const [cx, cy] of [[3, 3], [size - 4, 3], [3, size - 4]])
      for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) {
        const x = cx + dx, y = cy + dy, d = Math.max(Math.abs(dx), Math.abs(dy));
        if (x >= 0 && x < size && y >= 0 && y < size) set(x, y, d !== 2 && d !== 4);
      }
    const al = ALIGN[v], last = al.length - 1;
    al.forEach((ax, i) => al.forEach((ay, j) => {
      if ((i === 0 && j === 0) || (i === 0 && j === last) || (i === last && j === 0)) return;
      for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++)
        set(ax + dx, ay + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
    }));
    const drawFormat = mask => {
      let rem = mask; // ECC level M = 00
      for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
      const f = ((mask << 10) | rem) ^ 0x5412;
      for (let i = 0; i <= 5; i++) set(8, i, bit(f, i));
      set(8, 7, bit(f, 6)); set(8, 8, bit(f, 7)); set(7, 8, bit(f, 8));
      for (let i = 9; i < 15; i++) set(14 - i, 8, bit(f, i));
      for (let i = 0; i < 8; i++) set(size - 1 - i, 8, bit(f, i));
      for (let i = 8; i < 15; i++) set(8, size - 15 + i, bit(f, i));
      set(8, size - 8, 1);
    };
    drawFormat(0);
    if (v >= 7) {
      let rem = v;
      for (let i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1f25);
      const vb = (v << 12) | rem;
      for (let i = 0; i < 18; i++) {
        const a = size - 11 + (i % 3), b = Math.floor(i / 3);
        set(a, b, bit(vb, i)); set(b, a, bit(vb, i));
      }
    }
    // zigzag data placement
    let k = 0;
    for (let right = size - 1; right >= 1; right -= 2) {
      if (right === 6) right = 5;
      for (let vert = 0; vert < size; vert++) for (let j = 0; j < 2; j++) {
        const x = right - j, up = ((right + 1) & 2) === 0, y = up ? size - 1 - vert : vert;
        if (!fn[y][x] && k < out.length * 8) { m[y][x] = bit(out[k >>> 3], 7 - (k & 7)); k++; }
      }
    }
    const MASKS = [
      (x, y) => (x + y) % 2 === 0, (x, y) => y % 2 === 0, (x, y) => x % 3 === 0,
      (x, y) => (x + y) % 3 === 0, (x, y) => (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0,
      (x, y) => (x * y) % 2 + (x * y) % 3 === 0, (x, y) => ((x * y) % 2 + (x * y) % 3) % 2 === 0,
      (x, y) => (((x + y) % 2) + (x * y) % 3) % 2 === 0,
    ];
    const applyMask = mk => {
      for (let y = 0; y < size; y++) for (let x = 0; x < size; x++)
        if (!fn[y][x] && MASKS[mk](x, y)) m[y][x] ^= 1;
    };
    const penalty = () => {
      let p = 0, dark = 0;
      const lines = [];
      for (let i = 0; i < size; i++) { lines.push(m[i].join("")); lines.push(m.map(r => r[i]).join("")); }
      for (const ln of lines) {
        for (const run of ln.match(/0{5,}|1{5,}/g) || []) p += run.length - 2;
        p += 40 * ((ln.match(/(?=10111010000|00001011101)/g) || []).length);
      }
      for (let y = 0; y < size - 1; y++) for (let x = 0; x < size - 1; x++) {
        const c = m[y][x];
        if (c === m[y][x + 1] && c === m[y + 1][x] && c === m[y + 1][x + 1]) p += 3;
      }
      m.forEach(r => r.forEach(c => (dark += c)));
      p += 10 * Math.floor(Math.abs(dark * 20 - size * size * 10) / (size * size));
      return p;
    };
    let best = 0, bestP = Infinity;
    for (let mk = 0; mk < 8; mk++) {
      applyMask(mk); drawFormat(mk);
      const p = penalty();
      if (p < bestP) { bestP = p; best = mk; }
      applyMask(mk);
    }
    applyMask(best); drawFormat(best);

    const q = 4, dim = size + q * 2;
    let path = "";
    m.forEach((r, y) => r.forEach((c, x) => { if (c) path += `M${x + q} ${y + q}h1v1h-1z`; }));
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${dim} ${dim}" shape-rendering="crispEdges" role="img" aria-label="QR code"><rect width="${dim}" height="${dim}" fill="#fff"/><path d="${path}" fill="#26222b"/></svg>`;
  };
})();

/* ---- Support-with-crypto strip ---- */
(() => {
  const coins = CRYPTO.filter(c => c.address && c.address.trim());
  const box = document.getElementById("support");
  if (!box) return;
  if (!coins.length) { box.remove(); return; }
  box.hidden = false;
  document.getElementById("coins").innerHTML = coins.map((c, i) => `
    <div class="coin">
      <div class="coin-head"><strong>${esc(c.name)}</strong><span>${esc(c.ticker || "")}</span></div>
      <div class="qr" data-i="${i}"></div>
      <code>${esc(c.address.trim())}</code>
      ${c.note ? `<p class="note">${esc(c.note)}</p>` : ""}
      <button type="button" data-i="${i}">Copy address</button>
    </div>`).join("");
  // Draw the QR codes the first time the strip is opened
  box.addEventListener("toggle", () => {
    if (!box.open) return;
    box.querySelectorAll(".qr:empty").forEach(el => {
      const c = coins[el.dataset.i];
      el.innerHTML = makeQR(c.address.trim());
      el.firstChild.setAttribute("aria-label", `QR code for David's ${c.name} address`);
    });
  });
  box.addEventListener("click", async e => {
    const btn = e.target.closest("button[data-i]");
    if (!btn) return;
    const addr = coins[btn.dataset.i].address.trim();
    let ok = false;
    try { await navigator.clipboard.writeText(addr); ok = true; } catch {
      const ta = Object.assign(document.createElement("textarea"), { value: addr });
      ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.append(ta); ta.select();
      try { ok = document.execCommand("copy"); } catch {}
      ta.remove();
    }
    btn.textContent = ok ? "Copied!" : "Select the address above";
    btn.classList.toggle("done", ok);
    setTimeout(() => { btn.textContent = "Copy address"; btn.classList.remove("done"); }, 1800);
  });
})();
})();

# sato 解读 / sato explained

A bilingual (中文 / English) plain-language walkthrough of [sat0.org/whitepaper](https://sat0.org/whitepaper).

一份对 sato 白皮书的中英文双语通俗解读，配可拖动的 bonding curve 可视化，与官网 sat0.org 视觉保持一致。

## Features

- 8 progressive chapters with vivid analogies (合约即发行者 / the contract is the issuer, etc.)
- Interactive bonding curve matching the official sat0.org visualization (dual y-axes ending in ∞, forward/real markers, drift)
- Live data from the sat0.org public API (`/api/market/curve`, `/api/market/eth-usd`, `/api/market/fair-price`)
- Mobile-first layout with progressive enhancement at 640 / 1024 / 1100 px breakpoints
- Bilingual switching (auto-detect via `navigator.language`, persisted in `localStorage`)

## Stack

Pure static — no build step, no framework. HTML + CSS + vanilla JS.

```
sato-interpretation/
├── index.html   markup with data-i18n keys
├── i18n.js      zh / en dictionary (~70 keys)
├── style.css    mobile-first styles
└── main.js      curve renderer + i18n + live data
```

## Local preview

```bash
# any static server works
python3 -m http.server 8000
# then open http://localhost:8000
```

## Disclaimer

This page is an unofficial interpretation. Always defer to on-chain data and the official site at [sat0.org](https://sat0.org).

## License

MIT

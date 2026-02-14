# d2pt.js

## 📃 About

<a href="https://dota2protracker.com"><img src="https://dota2protracker.com/static/svg/logo_mark.svg" align="right" width="200px"/></a>

**d2pt.js** is a Node.js scraper for [Dota 2 Pro Tracker](https://dota2protracker.com/hero), focused on hero meta and per-hero statistics.

### Features

- **Hero meta** — ranking by position (Carry, Mid, Offlane, Support)
- **Hero info** — matches, win rate, and most-played role for a specific hero

**Requirement:** Node.js 18+

---

## Installation

```bash
npm install d2pt.js
# or
yarn add d2pt.js
# or
pnpm add d2pt.js
```

---

## Quick start

Create an instance and use the methods (all return a **Promise**):

```javascript
const { D2PtScraper } = require("d2pt.js");
// ESM: import { D2PtScraper } from "d2pt.js";

const d2pt = new D2PtScraper();
```

### `getHeroInfo(heroName)` — hero information

Returns hero stats by **role** (All Roles, Carry, Mid, Offlane, Support, Hard Support): matches, win rate, and which role is most played.

```javascript
const heroInfo = await d2pt.getHeroInfo("Anti-Mage");
console.log(heroInfo);
```

**Example response:**

```json
[
  {
    "role": "All Roles",
    "matches": "5339",
    "winRate": "49%",
    "mostPlayed": false
  },
  {
    "role": " Carry",
    "matches": "4948",
    "winRate": "49%",
    "mostPlayed": true
  },
  {
    "role": " Mid",
    "matches": "219",
    "winRate": "42%",
    "mostPlayed": false
  }
]
```

- `role` — position (All Roles, Carry, Mid, Offlane, Support, Hard Support)
- `matches` — number of matches (string)
- `winRate` — win rate (e.g. `"49%"`)
- `mostPlayed` — `true` for the most-played role

---

### `getHeroesMeta(category, max_result?)` — meta heroes by position

Returns the list of meta heroes for a **category**.  
**Categories:** `"hc"` (Carry), `"mid"`, `"off"`, `"sup4"`, `"sup5"`, `"pos4"`, `"pos5"`, `"All"`, `"Carry"`, `"Mid"`, `"Off"`.

```javascript
// Top 3 carries in meta
const heroes = await d2pt.getHeroesMeta("hc", 3);
console.log(heroes);
```

**Example response:**

```json
[
  {
    "name": "Clinkz",
    "rating": "3851",
    "matches": "5759",
    "winRate": "55.0%",
    "contestRate": "44.1%",
    "radiantWinRate": "58.2%",
    "direWinRate": "51.8%"
  },
  {
    "name": "Slark",
    "rating": "3398",
    "matches": "7717",
    "winRate": "52.1%",
    "contestRate": "46.0%",
    "radiantWinRate": "55.8%",
    "direWinRate": "48.2%"
  },
  {
    "name": "Drow Ranger",
    "rating": "3383",
    "matches": "4569",
    "winRate": "53.1%",
    "contestRate": "26.0%",
    "radiantWinRate": "56.8%",
    "direWinRate": "49.3%"
  }
]
```

- `name` — hero name  
- `rating` — rating (string)  
- `matches` — matches (string)  
- `winRate` — win rate (e.g. `"55.0%"`)  
- `contestRate` — contest rate (e.g. `"44.1%"`)  
- `radiantWinRate` / `direWinRate` — win rate per side  

`max_result` is optional; default is `10`.

---

## Full example (async/await)

```javascript
const { D2PtScraper } = require("d2pt.js");

async function main() {
  const d2pt = new D2PtScraper();

  const heroInfo = await d2pt.getHeroInfo("Anti-Mage");
  console.log("Hero info:", heroInfo);

  const topCarries = await d2pt.getHeroesMeta("hc", 5);
  console.log("Top 5 carries:", topCarries);
}

main().catch(console.error);
```

With **then/catch**:

```javascript
d2pt
  .getHeroesMeta("mid", 5)
  .then((result) => console.log(result))
  .catch((err) => console.error(err));
```

---

## Development

```bash
git clone <repo>
cd d2pt.js
npm install
```

| Command | Description |
|--------|-------------|
| `npm run build` | Clean and compile (outputs to `lib/`) |
| `npm run example` | Run example using built `lib/` |
| `npm run example:hero` | Hero-only example (ts-node) |
| `npm run example:meta` | Meta-only example (ts-node) |
| `npm run test` | Run tests (Jest) |
| `npm run watch` | Build in watch mode |

---

## 💰 Support the project

[![BuyMeACoffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/gabriel.dev/)

---

## 👷‍♂️ Creator

[![Contributors](https://contrib.rocks/image?repo=gbrlstr/dota2protracker-scraper)](https://github.com/gbrlstr)

[![Twitter](https://img.shields.io/badge/Twitter-%231DA1F2.svg?style=flat-square&logo=Twitter&logoColor=white)](https://twitter.com/gbrl_str) [![Twitch](https://img.shields.io/badge/Twitch-%239146FF.svg?style=flat-square&logo=Twitch&logoColor=white)](https://twitch.tv/xstrdoto)

Made with 💖 and JavaScript.

## License

[MIT](https://github.com/gbrlstr/d2pt.js/blob/master/LICENSE)

*This project is not affiliated with [Dota 2 Pro Tracker](https://dota2protracker.com).*

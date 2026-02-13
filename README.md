# d2pt.js

## 📃 Sobre

<a href="https://dota2protracker.com"><img src="https://dota2protracker.com/static/svg/logo_mark.svg" align="right" width="200px"/></a>

**d2pt.js** é um scraper Node.js para o [Dota 2 Pro Tracker](https://dota2protracker.com/hero), focado em meta de heróis e estatísticas por herói.

### Funcionalidades

- **Meta de heróis** — ranking por posição (Carry, Mid, Offlane, Suporte)
- **Info por herói** — partidas, win rate e role mais jogada para um herói específico

**Requisito:** Node.js 18+

---

## Instalação

```bash
npm install d2pt.js
# ou
yarn add d2pt.js
# ou
pnpm add d2pt.js
```

---

## Uso rápido

Crie uma instância e use os métodos (todos retornam **Promise**):

```javascript
const { D2PtScraper } = require("d2pt.js");
// ESM: import { D2PtScraper } from "d2pt.js";

const d2pt = new D2PtScraper();
```

### `getHeroInfo(heroName)` — informações de um herói

Retorna estatísticas do herói por **role** (All Roles, Carry, Mid, Offlane, Support, Hard Support): partidas, win rate e qual é a role mais jogada.

```javascript
const heroInfo = await d2pt.getHeroInfo("Anti-Mage");
console.log(heroInfo);
```

**Exemplo de retorno:**

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

- `role` — posição (All Roles, Carry, Mid, Offlane, Support, Hard Support)
- `matches` — quantidade de partidas (string)
- `winRate` — taxa de vitória (ex: `"49%"`)
- `mostPlayed` — `true` na role mais jogada

---

### `getHeroesMeta(category, max_result?)` — heróis em meta por posição

Retorna a lista de heróis em meta para uma **categoria**.  
**Categorias:** `"hc"` (Carry), `"mid"`, `"off"`, `"sup4"`, `"sup5"`, `"pos4"`, `"pos5"`, `"All"`, `"Carry"`, `"Mid"`, `"Off"`.

```javascript
// Top 3 carries em meta
const heroes = await d2pt.getHeroesMeta("hc", 3);
console.log(heroes);
```

**Exemplo de retorno:**

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

- `name` — nome do herói  
- `rating` — rating (string)  
- `matches` — partidas (string)  
- `winRate` — win rate (ex: `"55.0%"`)  
- `contestRate` — contest rate (ex: `"44.1%"`)  
- `radiantWinRate` / `direWinRate` — win rate por lado  

`max_result` é opcional; o padrão é `10`.

---

## Exemplo completo (async/await)

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

Com **then/catch**:

```javascript
d2pt
  .getHeroesMeta("mid", 5)
  .then((result) => console.log(result))
  .catch((err) => console.error(err));
```

---

## Desenvolvimento

```bash
git clone <repo>
cd d2pt.js
npm install
```

| Comando | Descrição |
|--------|-----------|
| `npm run build` | Limpa e compila (gera `lib/`) |
| `npm run example:hero` | Exemplo só de herói (ts-node) |
| `npm run example:meta` | Exemplo só de meta (ts-node) |
| `npm run test` | Testes (Jest) |
| `npm run watch` | Build em modo watch |

---

## 💰 Apoie o projeto

[![BuyMeACoffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/gabriel.dev/)

---

## 👷 Autor

[![Twitter](https://img.shields.io/badge/Twitter-%231DA1F2.svg?style=flat-square&logo=Twitter&logoColor=white)](https://twitter.com/gbrl_str) [![Twitch](https://img.shields.io/badge/Twitch-%239146FF.svg?style=flat-square&logo=Twitch&logoColor=white)](https://twitch.tv/xstrdoto)

Feito com 💖 e JavaScript.

## Licença

[MIT](https://github.com/gbrlstr/d2pt.js/blob/master/LICENSE)

*Este projeto não é afiliado ao [Dota 2 Pro Tracker](https://dota2protracker.com).*

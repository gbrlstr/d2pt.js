import puppeteer from "puppeteer";
import { Hero, MetaHeroesAliases, metaHeroesType } from "../models";
import { categoryAliases } from "../constants/constants";

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export async function scrapeMetaHeroes(
  category: metaHeroesType,
  max_results: number
): Promise<Hero[]> {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });

  const aliasesCategory =
    categoryAliases[category as keyof MetaHeroesAliases] || category;

  console.log(`Meta hero category: ${aliasesCategory}`);

  const page = await browser.newPage();

  try {
    await page.goto("https://dota2protracker.com/meta", {
      waitUntil: "networkidle2",
    });

    // Página usa .tbody (não #meta-table); esperar a tabela carregar
    await page.waitForSelector(".tbody", { timeout: 30000 });
    await sleep(1500);

    // Tentar clicar na aba da categoria se existir (All, Carry, Mid, Off, Pos 4, Pos 5)
    const navClicked = await page.evaluate((categoryLabel: string) => {
      const buttons = Array.from(document.querySelectorAll("button"));
      const btn = buttons.find((b) => {
        const text = (b.textContent || "").trim();
        return text === categoryLabel || text.includes(categoryLabel);
      });
      if (btn) {
        (btn as HTMLElement).click();
        return true;
      }
      return false;
    }, aliasesCategory);

    if (navClicked) {
      await sleep(2000);
    }

    const heroes: Hero[] = await page.evaluate(
      (max_results: number) => {
        const tbody = document.querySelector(".tbody");
        if (!tbody) return [];
        const rows = Array.from(tbody.children).slice(0, max_results);

        return rows.map((row) => {
          const cells = Array.from(row.children);
          if (cells.length < 4) return null;

          // Coluna 1: Hero (link com nome)
          const heroLink = row.querySelector('a[href^="/hero/"]');
          let name = "";
          if (heroLink) {
            const href = (heroLink.getAttribute("href") || "").replace("/hero/", "").trim();
            name = decodeURIComponent(href);
            const span = heroLink.querySelector(".flex-col span, div.flex-col span");
            if (span && (span.textContent || "").trim()) {
              name = (span.textContent || "").trim();
            }
          }

          // Colunas pela ordem do thead: Hero, D2PT Rating, Matches, WR, Most Played Build WR, Contest Rate, Radiant, Dire, ...
          const rating = cells[1] ? (cells[1].textContent || "").trim().split(/\s/)[0] || "" : "";
          const matches = cells[2] ? (cells[2].textContent || "").trim().split(/\s/)[0] || "" : "";
          const winRateEl = cells[3]?.querySelector(".green, .red, [class*='font-medium']") || cells[3];
          const winRate = winRateEl ? ((winRateEl as HTMLElement).innerText || (winRateEl.textContent || "").trim()).split(/\s/)[0] || "" : "";
          const contestRateEl = cells[5];
          const contestRate = contestRateEl ? ((contestRateEl.textContent || "").trim().split(/\s/)[0] || "").replace(/\s/g, "") : "";
          const radiantEl = cells[6];
          const direEl = cells[7];
          let radiantWinRate = "";
          let direWinRate = "";
          if (radiantEl) {
            const span = radiantEl.querySelector(".green, .red, span.font-extrabold, span.font-normal");
            radiantWinRate = span ? (span.textContent || "").trim() : (radiantEl.textContent || "").trim().split(/\s/).find((t) => t.endsWith("%")) || "";
          }
          if (direEl) {
            const span = direEl.querySelector(".green, .red, span.font-extrabold, span.font-normal");
            direWinRate = span ? (span.textContent || "").trim() : (direEl.textContent || "").trim().split(/\s/).find((t) => t.endsWith("%")) || "";
          }

          const heroData: Hero = {
            name: name || undefined,
            rating: rating || undefined,
            matches: matches || undefined,
            winRate: winRate || undefined,
            contestRate: contestRate || undefined,
            radiantWinRate: radiantWinRate || undefined,
            direWinRate: direWinRate || undefined,
          };
          return heroData;
        }).filter((h): h is Hero => h !== null && (h?.name != null || h?.rating != null));
      },
      max_results
    );

    return heroes;
  } catch (error) {
    console.error("Error during scraping:", error);
    return [];
  } finally {
    await browser.close();
  }
}

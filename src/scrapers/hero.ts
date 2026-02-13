import { IHeroInfo } from "../models";
import { HeroNamesType } from "./../models/hero_info";
import puppeteer from "puppeteer";

/**
 * Asynchronous function that scrapes a hero page from dota2protracker.com
 * @param heroName The name of the hero to be scraped
 */
export async function scrapeHero(
  heroName: HeroNamesType
): Promise<IHeroInfo[] | null> {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  try {
    await page.goto(`https://dota2protracker.com/hero/${heroName}`, {
      waitUntil: "networkidle2",
    });

    console.log(`Getting page data for ${heroName}..`);
    await page.waitForSelector(".hidden.lg\\:grid");

    const heroData = await page.evaluate(() => {
      const buttons = Array.from(
        document.querySelectorAll(".lg\\:grid button")
      );

      return buttons.map((button) => {
        const role = (
          button?.querySelector(
            "div.flex.font-bold.gap-2.items-center"
          ) as HTMLElement
        )?.innerText;
        const matches = (button?.querySelector(".yellow-new") as HTMLElement)
          ?.innerText;
        const winRate = (button?.querySelector(".green, .red") as HTMLElement)
          ?.innerText;

        const mostPlayed = button?.querySelector(".absolute.yellow")
          ? true
          : false;

        const heroInfo: IHeroInfo = {
          role,
          matches,
          winRate,
          mostPlayed,
        };
        return heroInfo;
      });
    });
    return heroData;
  } catch (error) {
    console.error("Error during scraping:", error);
    return null;
  } finally {
    await browser.close();
  }
}

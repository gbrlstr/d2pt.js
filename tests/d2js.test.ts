import { D2PtScraper } from "../src/d2pt";
import { scrapeMetaHeroes } from "../src/scrapers/meta";
import { scrapeHero } from "../src/scrapers/hero";
import { Hero, IHeroInfo } from "../src/models";

jest.mock("../src/scrapers/hero");
jest.mock("../src/scrapers/meta");

describe("D2PtScraper", () => {
  let d2pt: D2PtScraper;

  beforeEach(() => {
    d2pt = new D2PtScraper();
  });

  describe("getHeroesMeta", () => {
    it("should fetch meta heroes for a given category", async () => {
      const mockHeroes: Hero[] = [
        {
          role: "pos 1",
          name: "Hero 1",
          matches: "2829",
          winRate: "0.537",
        },
        {
          role: "pos 1",
          name: "Hero 2",
          matches: "2829",
          winRate: "0.537",
        },
        {
          role: "pos 1",
          name: "Hero 3",
          matches: "2829",
          winRate: "0.537",
        },
      ];
      (scrapeMetaHeroes as jest.Mock).mockResolvedValue(mockHeroes);

      const result = await d2pt.getHeroesMeta("mid", 2);
      expect(result).toEqual(mockHeroes);
      expect(scrapeMetaHeroes).toHaveBeenCalledWith("mid", 2);
    });

    it("should use default max_result if not provided", async () => {
      const mockHeroes: Hero[] = [{ name: "Hero1" }, { name: "Hero2" }];
      (scrapeMetaHeroes as jest.Mock).mockResolvedValue(mockHeroes);

      const result = await d2pt.getHeroesMeta("mid");
      expect(result).toEqual(mockHeroes);
      expect(scrapeMetaHeroes).toHaveBeenCalledWith("mid", 10);
    });
  });

  describe("getHeroInfo", () => {
    it("should fetch hero info for a given hero name", async () => {
      const mockHeroInfo: IHeroInfo = {
        matches: "2829",
        winRate: "0.537",
        role: "pos 1",
        mostPlayed: false,
      };
      (scrapeHero as jest.Mock).mockResolvedValue(mockHeroInfo);

      const result = await d2pt.getHeroInfo("Anti-Mage");
      expect(result).toEqual(mockHeroInfo);
      expect(scrapeHero).toHaveBeenCalledWith("Anti-Mage");
    });

    it("should return null if hero info is not found", async () => {
      (scrapeHero as jest.Mock).mockResolvedValue(null);

      const result = await d2pt.getHeroInfo("Abaddon");
      expect(result).toBeNull();
      expect(scrapeHero).toHaveBeenCalledWith("Abaddon");
    });
  });
});

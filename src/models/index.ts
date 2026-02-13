export type Hero = {
  role?: string;
  name?: string;
  rating?: string;
  matches?: string;
  winRate?: string;
  contestRate?: string;
  radiantWinRate?: string;
  direWinRate?: string;
};

export type MetaHeroes = {
  All: Hero[];
  Carry: Hero[];
  Mid: Hero[];
  Off: Hero[];
};

export type MetaHeroesAliases = {
  hc: "Carry";
  mid: "Mid";
  off: "Off";
  sup4: "Pos 4";
  sup5: "Pos 5";
  pos4: "Pos 4";
  pos5: "Pos 5";
};

type MetaHeroesKeys = keyof MetaHeroes;
type MetaHeroesAliasesKeys = keyof MetaHeroesAliases;
export type metaHeroesType = MetaHeroesKeys | MetaHeroesAliasesKeys;

export interface IheroInfo {
  displayName: string;
  npc: string;
  hero_id: number;
}

export interface IHeroInfo {
  role?: string;
  winRate?: string;
  matches?: string;
  mostPlayed?: boolean;
}
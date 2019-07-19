export const SCORE = 'Score';
export const MONEY = 'Money';
export const KILLS = 'Kills';
export type HiscoreCategory = typeof SCORE | typeof MONEY | typeof KILLS;

export const HISCORE_CATEGORIES: HiscoreCategory[] = [SCORE, MONEY, KILLS];

export type UserHiscoreState = {
  [key in HiscoreCategory]: number;
};

export interface Hiscore {
  username: string;
  score: number;
  rank: number;
  date: string;
}

export interface HiscorePage {
  category: HiscoreCategory;
  hiscores: Hiscore[];
  page: number;
  totalPages: number;
}

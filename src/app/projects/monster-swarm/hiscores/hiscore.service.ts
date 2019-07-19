import { Injectable } from '@angular/core';

import { HISCORE_CATEGORIES, HiscoreCategory, HiscorePage, UserHiscoreState } from './hiscore.constants';

@Injectable({
  providedIn: 'root'
})
export class HiscoreService {
  private userId: string;
  private userHiscoreState: UserHiscoreState;

  constructor() {
    this.userId = window.localStorage.getItem('monster-swarm-user-id');
  }

  get hiscoreCategories() {
    return HISCORE_CATEGORIES;
  }

  async fetchHiscorePage(category: HiscoreCategory, page: number): Promise<HiscorePage> {
    // TODO: Fetch from server
    return {
      category,
      hiscores: [{ username: 'Mock username', score: this.userHiscoreState[category], rank: 1, date: '...' }],
      page,
      totalPages: 1
    };
  }

  /**
   * Fetches user hiscores.
   * If none exist or some scores are missing, initial values are returned.
   */
  async fetchUserHiscores(): Promise<UserHiscoreState> {
    // TODO: Fetch from server
    return {
      ...this.createInitialHiscore(),
      ...JSON.parse(window.localStorage.getItem('monster-swarm-hiscores'))
    };
  }

  // Creates initial state for user scores
  private createInitialHiscore(): UserHiscoreState {
    return HISCORE_CATEGORIES.reduce(
      (scores, category) => {
        scores[category] = 0;
        return scores;
      },
      ({} as any) as UserHiscoreState
    );
  }

  async saveHiscores(userScores: UserHiscoreState) {
    // TODO: Save this to server
    window.localStorage.setItem('monster-swarm-hiscores', JSON.stringify(userScores));
  }

  /**
   * Updates hiscore if it's higher than old one
   */
  async updateHiscore(hiscoreCategory: HiscoreCategory, newScore: number) {
    const oldScore = this.hiscoreCategories[hiscoreCategory];
    if (newScore > oldScore) {
      this.hiscoreCategories[hiscoreCategory] = newScore;
    }
  }
}

import { Component, OnInit } from '@angular/core';

import { Hiscore, HiscoreCategory, HiscorePage, SCORE } from './hiscore.constants';
import { HiscoreService } from './hiscore.service';

@Component({
  selector: 'v-hiscores',
  templateUrl: './hiscores.component.html',
  styleUrls: ['./hiscores.component.scss']
})
export class HiscoresComponent implements OnInit {
  private hiscorePage: HiscorePage;
  private hiscoreCategory: HiscoreCategory = SCORE;

  constructor(private hiscoreService: HiscoreService) {}

  ngOnInit() {
    this.fetchPage(0);
  }

  get page(): number {
    return (this.hiscorePage && this.hiscorePage.page) || 0;
  }

  get totalPages(): number {
    return this.hiscorePage.totalPages;
  }

  get hiscores(): Hiscore[] {
    return this.hiscorePage.hiscores;
  }

  async fetchPage(page: number) {
    this.hiscorePage = await this.hiscoreService.fetchHiscorePage(this.hiscoreCategory, page);
  }

  async changeCategory(category: HiscoreCategory) {
    this.hiscoreCategory = category;
    await this.fetchPage(0);
  }

  async changePage(page: number) {
    await this.fetchPage(page);
  }
}

import { TestBed } from '@angular/core/testing';

import { GameShopService } from './game-shop.service';

describe('GameShopService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [GameShopService]
    })
  );

  it('should be created', () => {
    const service: GameShopService = TestBed.get(GameShopService);
    expect(service).toBeTruthy();
  });
});

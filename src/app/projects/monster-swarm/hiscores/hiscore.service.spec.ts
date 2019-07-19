import { TestBed } from '@angular/core/testing';

import { HiscoreService } from './hiscore.service';

describe('HiscoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HiscoreService = TestBed.get(HiscoreService);
    expect(service).toBeTruthy();
  });
  // TODO: Tests
});

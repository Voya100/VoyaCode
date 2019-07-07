import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameUpgradeCategory } from '../game-upgrade-category';

import { GameUpgradeComponent } from './game-upgrade.component';

describe('GameUpgradeComponent', () => {
  let component: GameUpgradeComponent;
  let fixture: ComponentFixture<GameUpgradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameUpgradeComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameUpgradeComponent);
    component = fixture.componentInstance;
    component.upgradeCategory = new GameUpgradeCategory('test-property', 'Testing', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterSwarmModule } from '../monster-swarm.module';

import { GameShopComponent } from './game-shop.component';
import { GameShopService } from './game-shop.service';

describe('GameShopComponent', () => {
  let component: GameShopComponent;
  let fixture: ComponentFixture<GameShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonsterSwarmModule],
      providers: [GameShopService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

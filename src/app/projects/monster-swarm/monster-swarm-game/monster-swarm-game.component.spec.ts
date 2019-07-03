import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterSwarmModule } from '../monster-swarm.module';

import { MonsterSwarmGameComponent } from './monster-swarm-game.component';

describe('MonsterSwarmGameComponent', () => {
  let component: MonsterSwarmGameComponent;
  let fixture: ComponentFixture<MonsterSwarmGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonsterSwarmModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsterSwarmGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

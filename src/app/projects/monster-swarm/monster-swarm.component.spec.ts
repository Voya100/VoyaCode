import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterSwarmComponent } from './monster-swarm.component';
import { MonsterSwarmModule } from './monster-swarm.module';

describe('MonsterSwarmComponent', () => {
  let component: MonsterSwarmComponent;
  let fixture: ComponentFixture<MonsterSwarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonsterSwarmModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsterSwarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

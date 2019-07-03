import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterSwarmGameComponent } from './monster-swarm-game.component';

describe('MonsterSwarmGameComponent', () => {
  let component: MonsterSwarmGameComponent;
  let fixture: ComponentFixture<MonsterSwarmGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonsterSwarmGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsterSwarmGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

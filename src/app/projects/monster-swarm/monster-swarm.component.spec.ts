import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterSwarmComponent } from './monster-swarm.component';

describe('MonsterSwarmComponent', () => {
  let component: MonsterSwarmComponent;
  let fixture: ComponentFixture<MonsterSwarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonsterSwarmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsterSwarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

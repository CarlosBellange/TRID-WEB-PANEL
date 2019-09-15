import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularScheduleComponent } from './regular-schedule.component';

describe('RegularScheduleComponent', () => {
  let component: RegularScheduleComponent;
  let fixture: ComponentFixture<RegularScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegularScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

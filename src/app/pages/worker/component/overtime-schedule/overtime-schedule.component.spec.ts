import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeScheduleComponent } from './overtime-schedule.component';

describe('OvertimeScheduleComponent', () => {
  let component: OvertimeScheduleComponent;
  let fixture: ComponentFixture<OvertimeScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvertimeScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimeScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

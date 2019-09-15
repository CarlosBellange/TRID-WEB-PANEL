import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularScheduleDetailsComponent } from './regular-schedule-details.component';

describe('RegularScheduleDetailsComponent', () => {
  let component: RegularScheduleDetailsComponent;
  let fixture: ComponentFixture<RegularScheduleDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegularScheduleDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularScheduleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

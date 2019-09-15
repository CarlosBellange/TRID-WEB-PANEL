import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporaryScheduleComponent } from './temporary-schedule.component';

describe('TemporaryScheduleComponent', () => {
  let component: TemporaryScheduleComponent;
  let fixture: ComponentFixture<TemporaryScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemporaryScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemporaryScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

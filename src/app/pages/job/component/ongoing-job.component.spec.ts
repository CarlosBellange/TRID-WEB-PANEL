import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingJobComponent } from './ongoing-job.component';

describe('OngoingJobComponent', () => {
  let component: OngoingJobComponent;
  let fixture: ComponentFixture<OngoingJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OngoingJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoingJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

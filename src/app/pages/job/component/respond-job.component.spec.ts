import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondJobComponent } from './respond-job.component';

describe('RespondJobComponent', () => {
  let component: RespondJobComponent;
  let fixture: ComponentFixture<RespondJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

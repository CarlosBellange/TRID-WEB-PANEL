import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignJobComponent } from './assign-job.component';

describe('AssignJobComponent', () => {
  let component: AssignJobComponent;
  let fixture: ComponentFixture<AssignJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

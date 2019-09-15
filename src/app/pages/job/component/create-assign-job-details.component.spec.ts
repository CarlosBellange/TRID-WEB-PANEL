import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssignJobDetailsComponent } from './create-assign-job-details.component';

describe('CreateAssignJobDetailsComponent', () => {
  let component: CreateAssignJobDetailsComponent;
  let fixture: ComponentFixture<CreateAssignJobDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAssignJobDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAssignJobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

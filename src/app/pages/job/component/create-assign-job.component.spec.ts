import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssignJobComponent } from './create-assign-job.component';

describe('CreateAssignJobComponent', () => {
  let component: CreateAssignJobComponent;
  let fixture: ComponentFixture<CreateAssignJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAssignJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAssignJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerdetailsComponent } from './workerdetails.component';

describe('WorkerdetailsComponent', () => {
  let component: WorkerdetailsComponent;
  let fixture: ComponentFixture<WorkerdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

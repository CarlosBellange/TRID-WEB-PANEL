import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerlistComponent } from './workerlist.component';

describe('WorkerlistComponent', () => {
  let component: WorkerlistComponent;
  let fixture: ComponentFixture<WorkerlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

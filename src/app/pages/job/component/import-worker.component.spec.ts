import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportWorkerComponent } from './import-worker.component';

describe('ImportWorkerComponent', () => {
  let component: ImportWorkerComponent;
  let fixture: ComponentFixture<ImportWorkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportWorkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

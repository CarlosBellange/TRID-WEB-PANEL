import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedJobComponent } from './completed-job.component';

describe('CompletedJobComponent', () => {
  let component: CompletedJobComponent;
  let fixture: ComponentFixture<CompletedJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

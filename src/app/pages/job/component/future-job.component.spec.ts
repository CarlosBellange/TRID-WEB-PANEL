import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureJobComponent } from './future-job.component';

describe('FutureJobComponent', () => {
  let component: FutureJobComponent;
  let fixture: ComponentFixture<FutureJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutureJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

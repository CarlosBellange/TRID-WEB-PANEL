import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobcategoryComponent } from './jobcategory.component';

describe('JobcategoryComponent', () => {
  let component: JobcategoryComponent;
  let fixture: ComponentFixture<JobcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

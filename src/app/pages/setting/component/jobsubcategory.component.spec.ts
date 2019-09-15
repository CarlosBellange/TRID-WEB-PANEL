import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsubcategoryComponent } from './jobsubcategory.component';

describe('JobsubcategoryComponent', () => {
  let component: JobsubcategoryComponent;
  let fixture: ComponentFixture<JobsubcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsubcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

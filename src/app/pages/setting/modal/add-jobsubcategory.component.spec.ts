import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobsubcategoryComponent } from './add-jobsubcategory.component';

describe('AddJobsubcategoryComponent', () => {
  let component: AddJobsubcategoryComponent;
  let fixture: ComponentFixture<AddJobsubcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddJobsubcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJobsubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

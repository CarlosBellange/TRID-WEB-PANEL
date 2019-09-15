import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJobsubcategoryComponent } from './edit-jobsubcategory.component';

describe('EditJobsubcategoryComponent', () => {
  let component: EditJobsubcategoryComponent;
  let fixture: ComponentFixture<EditJobsubcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditJobsubcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditJobsubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComapnydetailsComponent } from './comapnydetails.component';

describe('ComapnydetailsComponent', () => {
  let component: ComapnydetailsComponent;
  let fixture: ComponentFixture<ComapnydetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComapnydetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComapnydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

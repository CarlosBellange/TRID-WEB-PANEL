import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedJobdetailsComponent } from './completed-jobdetails.component';

describe('CompletedJobdetailsComponent', () => {
  let component: CompletedJobdetailsComponent;
  let fixture: ComponentFixture<CompletedJobdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedJobdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedJobdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

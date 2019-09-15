import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureJobdetailsComponent } from './future-jobdetails.component';

describe('FutureJobdetailsComponent', () => {
  let component: FutureJobdetailsComponent;
  let fixture: ComponentFixture<FutureJobdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutureJobdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureJobdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

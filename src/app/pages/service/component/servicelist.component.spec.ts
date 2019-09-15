import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicelistComponent } from './servicelist.component';

describe('ServicelistComponent', () => {
  let component: ServicelistComponent;
  let fixture: ComponentFixture<ServicelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

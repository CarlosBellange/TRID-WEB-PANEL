import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkerFromCompanyListComponent } from './add-worker-from-company-list.component';

describe('AddWorkerFromCompanyListComponent', () => {
  let component: AddWorkerFromCompanyListComponent;
  let fixture: ComponentFixture<AddWorkerFromCompanyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWorkerFromCompanyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkerFromCompanyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

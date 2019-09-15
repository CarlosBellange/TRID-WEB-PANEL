import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsubserviceComponent } from './editsubservice.component';

describe('EditsubserviceComponent', () => {
  let component: EditsubserviceComponent;
  let fixture: ComponentFixture<EditsubserviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsubserviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsubserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

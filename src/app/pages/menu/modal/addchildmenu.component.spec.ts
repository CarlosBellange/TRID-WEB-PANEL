import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddchildmenuComponent } from './addchildmenu.component';

describe('AddchildmenuComponent', () => {
  let component: AddchildmenuComponent;
  let fixture: ComponentFixture<AddchildmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddchildmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddchildmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

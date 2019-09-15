import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditchildmenuComponent } from './editchildmenu.component';

describe('EditchildmenuComponent', () => {
  let component: EditchildmenuComponent;
  let fixture: ComponentFixture<EditchildmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditchildmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditchildmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

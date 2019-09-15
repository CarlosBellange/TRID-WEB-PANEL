import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildmenulistComponent } from './childmenulist.component';

describe('ChildmenulistComponent', () => {
  let component: ChildmenulistComponent;
  let fixture: ComponentFixture<ChildmenulistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildmenulistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildmenulistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

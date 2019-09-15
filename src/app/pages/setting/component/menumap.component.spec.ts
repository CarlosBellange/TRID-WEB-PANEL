import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenumapComponent } from './menumap.component';

describe('MenumapComponent', () => {
  let component: MenumapComponent;
  let fixture: ComponentFixture<MenumapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenumapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenumapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

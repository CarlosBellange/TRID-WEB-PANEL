import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatelistComponent } from './privatelist.component';

describe('PrivatelistComponent', () => {
  let component: PrivatelistComponent;
  let fixture: ComponentFixture<PrivatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

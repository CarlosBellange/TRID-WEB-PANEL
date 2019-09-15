import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateaddComponent } from './stateadd.component';

describe('StateaddComponent', () => {
  let component: StateaddComponent;
  let fixture: ComponentFixture<StateaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

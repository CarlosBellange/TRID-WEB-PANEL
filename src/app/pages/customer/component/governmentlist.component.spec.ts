import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentlistComponent } from './governmentlist.component';

describe('GovernmentlistComponent', () => {
  let component: GovernmentlistComponent;
  let fixture: ComponentFixture<GovernmentlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovernmentlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernmentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

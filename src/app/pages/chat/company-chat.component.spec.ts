import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyChatComponent } from './company-chat.component';

describe('CompanyChatComponent', () => {
  let component: CompanyChatComponent;
  let fixture: ComponentFixture<CompanyChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

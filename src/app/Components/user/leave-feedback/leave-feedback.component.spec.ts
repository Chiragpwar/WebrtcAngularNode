import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveFeedbackComponent } from './leave-feedback.component';

describe('LeaveFeedbackComponent', () => {
  let component: LeaveFeedbackComponent;
  let fixture: ComponentFixture<LeaveFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

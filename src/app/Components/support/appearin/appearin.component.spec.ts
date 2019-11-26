import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppearinComponent } from './appearin.component';

describe('AppearinComponent', () => {
  let component: AppearinComponent;
  let fixture: ComponentFixture<AppearinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppearinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppearinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

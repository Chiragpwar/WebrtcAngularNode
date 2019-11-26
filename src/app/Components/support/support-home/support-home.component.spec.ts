import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportHomeComponent } from './support-home.component';

describe('SupportHomeComponent', () => {
  let component: SupportHomeComponent;
  let fixture: ComponentFixture<SupportHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

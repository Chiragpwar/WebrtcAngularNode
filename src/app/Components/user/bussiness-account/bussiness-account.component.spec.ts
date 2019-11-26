import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinessAccountComponent } from './bussiness-account.component';

describe('BussinessAccountComponent', () => {
  let component: BussinessAccountComponent;
  let fixture: ComponentFixture<BussinessAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BussinessAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BussinessAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

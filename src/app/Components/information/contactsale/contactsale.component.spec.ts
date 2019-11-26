import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsaleComponent } from './contactsale.component';

describe('ContactsaleComponent', () => {
  let component: ContactsaleComponent;
  let fixture: ComponentFixture<ContactsaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

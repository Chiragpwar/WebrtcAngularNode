import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotfoundRoomComponent } from './notfound-room.component';

describe('NotfoundRoomComponent', () => {
  let component: NotfoundRoomComponent;
  let fixture: ComponentFixture<NotfoundRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotfoundRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotfoundRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

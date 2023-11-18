import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHotelComponent } from './dialog-hotel.component';

describe('DialogHotelComponent', () => {
  let component: DialogHotelComponent;
  let fixture: ComponentFixture<DialogHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogHotelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

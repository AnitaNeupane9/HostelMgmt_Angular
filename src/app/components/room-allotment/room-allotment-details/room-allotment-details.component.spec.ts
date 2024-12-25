import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAllotmentDetailsComponent } from './room-allotment-details.component';

describe('RoomAllotmentDetailsComponent', () => {
  let component: RoomAllotmentDetailsComponent;
  let fixture: ComponentFixture<RoomAllotmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomAllotmentDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomAllotmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAllotmentAddEditComponent } from './room-allotment-add-edit.component';

describe('RoomAllotmentAddEditComponent', () => {
  let component: RoomAllotmentAddEditComponent;
  let fixture: ComponentFixture<RoomAllotmentAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomAllotmentAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomAllotmentAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

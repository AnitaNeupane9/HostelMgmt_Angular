import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAddEditComponent } from './room-add-edit.component';

describe('RoomAddEditComponent', () => {
  let component: RoomAddEditComponent;
  let fixture: ComponentFixture<RoomAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

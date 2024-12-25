import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomGetDetailComponent } from './room-get-detail.component';

describe('RoomGetDetailComponent', () => {
  let component: RoomGetDetailComponent;
  let fixture: ComponentFixture<RoomGetDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomGetDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomGetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

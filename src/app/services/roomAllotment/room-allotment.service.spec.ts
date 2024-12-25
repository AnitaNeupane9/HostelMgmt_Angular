import { TestBed } from '@angular/core/testing';

import { RoomAllotmentService } from './room-allotment.service';

describe('RoomAllotmentService', () => {
  let service: RoomAllotmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomAllotmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

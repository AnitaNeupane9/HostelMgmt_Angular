import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoomAllotment} from '../../../model/interface/roomAllotment';
import {APIResponseModel} from '../../../model/interface/APIResponse';
import {RoomAllotmentService} from '../../../services/roomAllotment/room-allotment.service';

@Component({
  selector: 'app-room-allotment-details',
  imports: [],
  templateUrl: './room-allotment-details.component.html',
  styleUrl: './room-allotment-details.component.css'
})
export class RoomAllotmentDetailsComponent implements OnInit{

  roomAllotmentService = inject(RoomAllotmentService);
  activatedRoute = inject(ActivatedRoute);
  roomAllotmentDetail: RoomAllotment | null = null;

  ngOnInit() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id){
      this.getRoomAllotmentDetail(id);
    }
  }

  private getRoomAllotmentDetail(id: number) {
    this.roomAllotmentService.getRoomAllotmentDetail(id).subscribe((res:APIResponseModel) =>{
      this.roomAllotmentDetail = res.data;
    })
  }
}

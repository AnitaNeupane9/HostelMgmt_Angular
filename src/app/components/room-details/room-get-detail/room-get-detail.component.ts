import {Component, inject, OnInit} from '@angular/core';
import {RoomDetailService} from '../../../services/roomDetails/room-detail.service';
import {ActivatedRoute} from '@angular/router';
import {Room} from '../../../model/interface/room';
import {APIResponseModel} from '../../../model/interface/APIResponse';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-room-get-detail',
  imports: [
  ],
  templateUrl: './room-get-detail.component.html',
  styleUrl: './room-get-detail.component.css'
})
export class RoomGetDetailComponent implements OnInit{

  roomDetailService = inject(RoomDetailService);
  activatedRoute = inject(ActivatedRoute);
  roomDetail: Room | null = null;

  ngOnInit() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id){
      this.getRoomDetail(id);
    }
  }

  getRoomDetail(id: number){
    this.roomDetailService.getRoomDetail(id).subscribe((res:APIResponseModel) =>{
      this.roomDetail = res.data;
    })
  }
}

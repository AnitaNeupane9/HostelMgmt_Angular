import {Component, inject, OnInit} from '@angular/core';
import {RoomDetailService} from '../../services/roomDetails/room-detail.service';
import {Router} from '@angular/router';
import {Room} from '../../model/interface/room';
import {APIResponseModel} from '../../model/interface/APIResponse';
import {NgForOf} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-room-details',
  imports: [
    NgForOf
  ],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.css'
})
export class RoomDetailsComponent implements OnInit{

  roomDetailService = inject(RoomDetailService);
  toastr = inject(ToastrService);
  router = inject(Router);

  roomList: Room[] = [];

  ngOnInit() {
    this.getALlRoom();
  }

  getALlRoom(){
    this.roomDetailService.getAllRoom().subscribe((res:APIResponseModel) =>{
      this.roomList = res.data;
    })
  }

  addRoom() {
    this.router.navigate(['/room/add'])
  }

  viewDetail(id: number) {
    this.router.navigate(['/room/details', id]);
  }

  editRoom(id: number) {
    this.router.navigate(['room-edit', id])
  }

  deleteRoom(id: number) {
    debugger;
    const isDelete = confirm("Are you sure you want to delete Room?");
    if (isDelete){
      this.roomDetailService.deleteRoom(id).subscribe((res:APIResponseModel) => {
        if (res.status){
          this.toastr.success("Room Deleted Successfully.");
          this.getALlRoom();
        } else{
          this.toastr.error(res.message);
        }
      })
      }
  }
}

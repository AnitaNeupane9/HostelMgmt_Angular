import {Component, inject, OnInit} from '@angular/core';
import {RoomAllotmentService} from '../../services/roomAllotment/room-allotment.service';
import {Router} from '@angular/router';
import {RoomAllotment} from '../../model/interface/roomAllotment';
import {APIResponseModel} from '../../model/interface/APIResponse';
import {NgForOf} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-room-allotment',
  imports: [
    NgForOf
  ],
  templateUrl: './room-allotment.component.html',
  styleUrl: './room-allotment.component.css'
})
export class RoomAllotmentComponent implements OnInit{

  roomAllotmentService = inject(RoomAllotmentService);
  router = inject(Router);
  toastr = inject(ToastrService);
  roomAllotmentList: RoomAllotment[] = [];

  ngOnInit() {
    this.getALlRoomAllotment();
  }

  getALlRoomAllotment() {
    this.roomAllotmentService.getAllRoomAllotment().subscribe(
      (res: APIResponseModel) => {
        this.roomAllotmentList = res.data;
      },
      (error) => {
        console.error('Error fetching room allotments:', error);
      }
    );
  }


  addRoomAllotment() {
    this.router.navigate(['/room-allotment/add']);
  }

  viewDetail(id: number) {
    this.router.navigate(['/room-allotment/details', id]);
  }

  editRoomAllotment(id: number) {
    this.router.navigate(['/room-allotment-edit', id]);
  }

  deleteRoomAllotment(id: number) {
    debugger;
    const isDelete = confirm("Are you sure you want to delete Room Allotment?");
    if (isDelete){
      this.roomAllotmentService.deleteRoomAllotment(id).subscribe((res:APIResponseModel) => {
        if (res.status){
          this.toastr.success("Room Allotment Deleted Successfully.");
          this.getALlRoomAllotment();
        } else{
          this.toastr.error('Something Went Wrong!');
        }
      })
    }
  }

}

import {Component, inject, OnInit} from '@angular/core';
import {RoomDetailService} from '../../../services/roomDetails/room-detail.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {RoomAllotmentService} from '../../../services/roomAllotment/room-allotment.service';
import {APIResponseModel} from '../../../model/interface/APIResponse';
import {NgForOf, NgIf} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {Student} from '../../../model/interface/student';
import {Room} from '../../../model/interface/room';
import {StudentService} from '../../../services/student/student.service';

@Component({
  selector: 'app-room-allotment-add-edit',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './room-allotment-add-edit.component.html',
  styleUrl: './room-allotment-add-edit.component.css'
})
export class RoomAllotmentAddEditComponent implements OnInit{
  roomAllotmentService = inject(RoomAllotmentService);
  roomDetails = inject(RoomDetailService);
  studentDetails = inject(StudentService);
  activatedRoute = inject(ActivatedRoute);
  toastr = inject(ToastrService);
  router = inject(Router);

  roomAllotmentForm: FormGroup = new FormGroup({});
  isEditMode: boolean = false;
  roomAllotmentId: number | null = null;
  errorMessages: string[] = [];
  students: Student[] = [];
  rooms: Room[] = [];


  ngOnInit() {
    this.initializeForm();
    this.roomAllotmentId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.getStudents();
    this.getRooms();

    if (this.roomAllotmentId) {
      this.isEditMode = true;
      this.loadRoomAllotmentDetails(this.roomAllotmentId);
    }
  }

  private initializeForm() {
    this.roomAllotmentForm = new FormGroup({
      allotmentDate: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
      checkIn: new FormControl('', [Validators.required]),
      checkOut: new FormControl(''),
      studentId: new FormControl('', [Validators.required]),
      roomId: new FormControl('', [Validators.required]),
      // studentUsername: new FormControl('', [Validators.required]),
      // roomNumber: new FormControl('', [Validators.required])
    });
  }

  // Load room allotment data in Edit Mode
  private loadRoomAllotmentDetails(id: number): void {
    this.roomAllotmentService.getRoomAllotmentDetail(id).subscribe({
      next: (response: APIResponseModel) => {
        if (response.status && response.data) {
          this.roomAllotmentForm.patchValue(response.data);
        }
      },
      error: (err) => {
        console.log('Failed to load room allotment details.');
      }
    });
  }

  getRooms(){
    this.roomDetails.getAllRoom().subscribe((resonse:APIResponseModel) => {
      if (resonse.status){
        this.rooms = resonse.data;
      }
    })
  }

  getStudents(){
    this.studentDetails.getAllStudent().subscribe((response: APIResponseModel) => {
      if (response.status){
        this.students = response.data;
      }
    })
  }

  onSubmit() {
    this.errorMessages = [];
    if (this.roomAllotmentForm.invalid) {
      this.collectErrors();
      return;
    }

    if (this.isEditMode && this.roomAllotmentId) {
      this.roomAllotmentService.editRoomAllotment(this.roomAllotmentId, this.roomAllotmentForm.value).subscribe({
        next: (response) => {
          if (response.status) {
            this.toastr.success('Room Allotment updated successfully!');
            this.roomAllotmentService.backToList();
          } else {
            this.toastr.error(response.message);
          }
        },
        error: (err: any) => {
          const message = typeof err.error === 'string' ? err.error : 'Failed to update room allotment.';
          this.toastr.error(message);
        }
      });
    } else {
      this.roomAllotmentService.addRoomAllotment(this.roomAllotmentForm.value).subscribe({
        next: (response) => {
          if (response.status) {
            this.toastr.success('Room Allotment added successfully!');
            this.roomAllotmentService.backToList();
          } else {
            this.toastr.error(response.message);
          }
        },
        error: (err: any) => {
          const message = typeof err.error === 'string' ? err.error : 'Failed to add room allotment.';
          this.toastr.error(message);
        }
      });
    }
  }


  private collectErrors() {
    Object.keys(this.roomAllotmentForm.controls).forEach((key) => {
      const control = this.roomAllotmentForm.get(key);
      if (control?.invalid && control.errors) {
        for (const errorKey in control.errors) {
          const error = control.errors[errorKey];
          switch (errorKey) {
            case 'required':
              this.errorMessages.push(`${key} is required.`);
              break;
            default:
              this.errorMessages.push(`${key} has an error.`);
          }
        }
      }
    });
  }
}

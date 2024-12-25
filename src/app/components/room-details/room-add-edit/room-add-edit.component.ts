import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {RoomDetailService} from '../../../services/roomDetails/room-detail.service';
import {ActivatedRoute, Router} from '@angular/router';
import {APIResponseModel} from '../../../model/interface/APIResponse';
import {NgForOf, NgIf} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-room-add-edit',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './room-add-edit.component.html',
  styleUrl: './room-add-edit.component.css'
})
export class RoomAddEditComponent implements OnInit{

  roomService = inject(RoomDetailService)

  activatedRoute = inject(ActivatedRoute);
  toastr = inject(ToastrService);

  roomForm: FormGroup = new FormGroup({});
  isEditMode: boolean = false;
  roomId : number | null = null;
  errorMessages: string[] = [];

  ngOnInit() {
    this.initializeForm();
    this.roomId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (this.roomId) {
      this.isEditMode = true;
      this.loadRoomDetails(this.roomId);
    }
  }

  private initializeForm() {
    this.roomForm = new FormGroup({
      roomNumber: new FormControl('', [Validators.required]),
      floor: new FormControl('', [Validators.required]),
      roomType: new FormControl('', [Validators.required]),
      capacity: new FormControl('', [Validators.required, Validators.min(1)]),
      currentStudentCount: new FormControl('', [ Validators.min(0)]),
      availableStudentSlots: new FormControl('', [Validators.min(0)]),
      status: new FormControl('', [Validators.required]),
    });
  }

  // Load room data in Edit Mode
  private loadRoomDetails(id: number): void {
    this.roomService.getRoomDetail(id).subscribe({
      next: (response: APIResponseModel) => {
        if (response.status && response.data) {
          this.roomForm.patchValue(response.data);
        }
      },
      error: (err) => {
        console.log('Failed to load room details.');
      }
    });
  }

  onSubmit(){
    debugger;
    this.errorMessages = [];
    if (this.roomForm.invalid) {
      this.collectErrors();
      return;
    }

    if (this.isEditMode && this.roomId) {
      this.roomService.editRoom(this.roomId, this.roomForm.value).subscribe((response) => {
        if (response.status) {
          this.toastr.success('Room updated successfully!');
          this.roomService.backToList();
        } else {
          this.toastr.error(response.message);
        }
      });
    } else {
      this.roomService.addRoom(this.roomForm.value).subscribe((response) => {
        if (response.status) {
          this.toastr.success('Room added successfully!');
          this.roomService.backToList();
        } else {
          this.toastr.error(response.message);
        }
      });
    }

  }

  private collectErrors() {
    Object.keys(this.roomForm.controls).forEach((key) => {
      const control = this.roomForm.get(key);
      if (control?.invalid && control.errors){
        for (const errorkey in control.errors){
          const error = control.errors[errorkey];
          switch (errorkey){
            case 'required':
              this.errorMessages.push(`${key} is required.`);
              break;

            case 'min':
              this.errorMessages.push(`The minimum value for ${key} should be ${error.min}.`);
              break;

            default:
              this.errorMessages.push(`${key} has an error.`);
          }
        }
      }
    })
  }
}

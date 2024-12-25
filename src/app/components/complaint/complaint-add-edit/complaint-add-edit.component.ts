import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComplaintService } from '../../../services/complaint/complaint.service';
import { NgForOf, NgIf } from '@angular/common';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-complaint-add-edit',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './complaint-add-edit.component.html',
  styleUrls: ['./complaint-add-edit.component.css']
})
export class ComplaintAddEditComponent implements OnInit {

  complaintService = inject(ComplaintService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  toastr = inject(ToastrService);

  complaintForm: FormGroup = new FormGroup({});
  errorMessages: string[] = [];
  isEditMode: boolean = false;
  complaintId: number | null = null;

  ngOnInit() {
    this.initializeForm();

    // Check if in Edit Mode
    this.complaintId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (this.complaintId) {
      this.isEditMode = true;
      this.loadComplaintDetails(this.complaintId);
    }

    this.toggleFields();
  }

  private initializeForm() {
    this.complaintForm = new FormGroup({
      topic: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(3)]),
      description: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(5)]),
      dateFiled: new FormControl({ value: '', disabled: false }, Validators.required),
      dateResolved: new FormControl({ value: '', disabled: true }),
      severityLevel: new FormControl({ value: '', disabled: false }, Validators.required),
      resolved: new FormControl({ value: false, disabled: true }),
      studentId: new FormControl(null),
    });
  }

  private toggleFields() {
    const fieldsToToggle = ['topic', 'description','dateFiled'];
    const resolvedFields = ['dateResolved', 'resolved', 'severityLevel'];

    if (this.isEditMode) {
      fieldsToToggle.forEach((field) => this.complaintForm.controls[field].disable());
      resolvedFields.forEach((field) => this.complaintForm.controls[field].enable());
    } else {
      fieldsToToggle.forEach((field) => this.complaintForm.controls[field].enable());
      resolvedFields.forEach((field) => this.complaintForm.controls[field].disable());
    }
  }

  private loadComplaintDetails(id: number): void {
    this.complaintService.getComplaintDetail(id).subscribe({
      next: (response) => {
        if (response.status && response.data) {
          this.complaintForm.patchValue(response.data);
        } else {
          this.toastr.error('Failed to load complaint details.', 'Error');
          this.router.navigate(['/complaint']);
        }
      },
      error: (error) => {
        this.toastr.error('Failed to load complaint details. Please try again later.', 'Error');
        this.router.navigate(['/complaint']);
      },
    });
  }

  onSubmit() {
    this.errorMessages = [];
    if (this.complaintForm.invalid) {
      this.collectErrors();
      return;
    }

    if (this.isEditMode && this.complaintId) {
      this.complaintService.editComplaint(this.complaintId, this.complaintForm.value).subscribe({
        next: (response) => {
          if (response.status) {
            this.toastr.success('Complaint updated successfully!');
            this.complaintService.backToList();
          } else {
            this.toastr.error(response.message || 'Failed to update complaint.');
          }
        },
        error: (error) => {
          this.toastr.error('Something Went Wrong!');
        },
      });
    } else {
      this.complaintService.addComplaint(this.complaintForm.value).subscribe({
        next: (response) => {
          if (response.status) {
            this.toastr.success('Complaint added successfully!');
            this.complaintService.backToList();
          } else {
            this.toastr.error(response.message || 'Failed to add complaint.');
          }
        },
        error: (error) => {
          this.toastr.error('Something Went Wrong!');
        },
      });
    }
  }

  private collectErrors() {
    Object.keys(this.complaintForm.controls).forEach((key) => {
      const control = this.complaintForm.get(key);
      if (control?.invalid && control.errors) {
        for (const errorKey in control.errors) {
          const error = control.errors[errorKey];
          switch (errorKey) {
            case 'required':
              this.errorMessages.push(`${key} is required.`);
              break;
            case 'minlength':
              this.errorMessages.push(`${key} must be at least ${error.requiredLength} characters long.`);
              break;
            default:
              this.errorMessages.push(`${key} is invalid.`);
          }
        }
      }
    });
  }
}







//   complaintService = inject(ComplaintService);
//   activatedRoute = inject(ActivatedRoute);
//   router = inject(Router);
//
//   complaintForm: FormGroup = new FormGroup({});
//   errorMessages: string[] = [];
//   isEditMode: boolean = false;
//   complaintId: number | null = null;
//
//   ngOnInit() {
//     this.initializeForm();
//
//     // Check if in Edit Mode
//     this.complaintId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
//     if (this.complaintId) {
//       this.isEditMode = true;
//       this.loadComplaintDetails(this.complaintId);
//     }
//
//     this.toggleFields();
//   }
//
//   private initializeForm() {
//     this.complaintForm = new FormGroup({
//       topic: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(3)]),
//       description: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(5)]),
//       dateFiled: new FormControl({ value: '', disabled: false }, Validators.required),
//       dateResolved: new FormControl({ value: '', disabled: true }),
//       severityLevel: new FormControl({ value: '', disabled: false }, Validators.required),
//       resolved: new FormControl({ value: false, disabled: true }),
//       studentId: new FormControl(null),
//     });
//   }
//
//   private toggleFields() {
//     if (this.isEditMode) {
//       // Disable fields for editing a complaint
//       this.complaintForm.controls['topic'].disable();
//       this.complaintForm.controls['description'].disable();
//       this.complaintForm.controls['severityLevel'].disable();
//       this.complaintForm.controls['dateFiled'].disable();
//
//
//       // Enable fields for resolving editing complaint
//       this.complaintForm.controls['dateResolved'].enable();
//       this.complaintForm.controls['resolved'].enable();
//     } else {
//       // Enable all fields for adding a complaint
//       this.complaintForm.controls['topic'].enable();
//       this.complaintForm.controls['description'].enable();
//       this.complaintForm.controls['severityLevel'].enable();
//       this.complaintForm.controls['dateFiled'].enable();
//
//
//       // Disable fields not needed for adding a complaint
//       this.complaintForm.controls['dateResolved'].disable();
//       this.complaintForm.controls['resolved'].disable();
//     }
//   }
//
//   private loadComplaintDetails(id: number): void {
//     this.complaintService.getComplaintDetail(id).subscribe({
//       next: (response) => {
//         if (response.status && response.data) {
//           this.complaintForm.patchValue(response.data);
//         }
//       },
//       error: () => {
//         alert('Failed to load complaint details.');
//         this.router.navigate(['/complaint-list']);
//       },
//     });
//   }
//
//   onSubmit() {
//     this.errorMessages = [];
//     if (this.complaintForm.invalid) {
//       this.collectErrors();
//       return;
//     }
//
//     if (this.isEditMode && this.complaintId) {
//       this.complaintService.editComplaint(this.complaintId, this.complaintForm.value).subscribe((response) => {
//         if (response.status) {
//           alert('Complaint updated successfully!');
//           this.complaintService.backToList();
//         } else {
//           alert(response.message);
//         }
//       });
//     } else {
//       this.complaintService.addComplaint(this.complaintForm.value).subscribe((response) => {
//         if (response.status) {
//           alert('Complaint added successfully!');
//           this.complaintService.backToList();
//         } else {
//           alert(response.message);
//         }
//       });
//     }
//   }
//
//   private collectErrors() {
//     Object.keys(this.complaintForm.controls).forEach((key) => {
//       const control = this.complaintForm.get(key);
//       if (control?.invalid && control.errors) {
//         for (const errorKey in control.errors) {
//           const error = control.errors[errorKey];
//           switch (errorKey) {
//             case 'required':
//               this.errorMessages.push(`${key} is required.`);
//               break;
//             case 'minlength':
//               this.errorMessages.push(`${key} must be at least ${error.requiredLength} characters long.`);
//               break;
//             default:
//               this.errorMessages.push(`${key} is invalid.`);
//           }
//         }
//       }
//     });
//   }
// }

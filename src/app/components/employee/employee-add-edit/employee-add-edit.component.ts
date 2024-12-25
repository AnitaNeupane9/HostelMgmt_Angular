import {Component, inject, OnInit} from '@angular/core';
import {EmployeeService} from '../../../services/employee/employee.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {APIResponseModel} from '../../../model/interface/APIResponse';
import {NgForOf, NgIf} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-employee-add-edit',
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './employee-add-edit.component.html',
  styleUrl: './employee-add-edit.component.css'
})
export class EmployeeAddEditComponent implements OnInit {

  employeeService = inject(EmployeeService);
  activatedRoute = inject(ActivatedRoute);
  toastr = inject(ToastrService);
  router = inject(Router);

  addEmployeeForm: FormGroup = new FormGroup({});
  errorMessages: string[] = [];
  isEditMode: boolean = false;
  employeeId: number | null = null;

  ngOnInit(): void {
    this.initializeForm(); // Ensure form initialization

    // Check if we're in Edit Mode
    this.employeeId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (this.employeeId) {
      this.isEditMode = true;
      this.loadEmployeeDetails(this.employeeId);
    }
  }

  // Initialize the reactive form
  private initializeForm() {
    this.addEmployeeForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      contactNumber: new FormControl('', [Validators.required, Validators.pattern(/^\+?[0-9]{1,3}\s?[0-9]{6,14}$/)]),
      address: new FormControl('', [Validators.required, Validators.minLength(5)]),
      username: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('', Validators.required),
      // password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      hireDate: new FormControl(null, Validators.required),
      employmentEndDate: new FormControl(null),
      shiftStartsAt: new FormControl(null, Validators.required),
      shiftEndsAt: new FormControl(null, Validators.required),
      idProof: new FormControl('', Validators.required)
    });
    if (!this.isEditMode){
      this.addEmployeeForm.addControl(
        'password',
        new FormControl('', [Validators.required, Validators.minLength(6)])
      );
    }
  }

// Load employee data in Edit Mode
  private loadEmployeeDetails(id: number): void {
    this.employeeService.getEmployeeDetail(id).subscribe({
      next: (response: APIResponseModel) => {
        if (response.status && response.data) {
          this.addEmployeeForm.patchValue(response.data);
        }
      },
      error: (err) => {
        console.error('Error loading employee details:', err);
      }
    });
  }

  // Submit the form
  onSubmit() {
    this.errorMessages = [];
    if (this.addEmployeeForm.invalid) {
      this.collectErrors();
      return;
    }

    if (this.isEditMode && this.employeeId) {
      // Edit Employee
      this.employeeService.editEmployee(this.employeeId, this.addEmployeeForm.value).subscribe((response) => {
        if (response.status) {
          this.toastr.success('Employee updated successfully!');
          this.employeeService.backToList();
        } else {
          this.toastr.error('Something Went Wrong.');
        }
      });
    } else {
      // Add Employee
      this.employeeService.addEmployee(this.addEmployeeForm.value).subscribe((response) => {
        if (response.status) {
          this.toastr.success('Employee added successfully!');
          this.employeeService.backToList();
        } else {
          this.toastr.error('Something Went Wrong.');
        }
      });
    }
  }

  // Collect validation messages
  private collectErrors() {
    Object.keys(this.addEmployeeForm.controls).forEach((key) => {
      const control = this.addEmployeeForm.get(key);
      if (control?.invalid && control.errors) {
        for (const errorKey in control.errors) {
          const error = control.errors[errorKey];
          switch (errorKey) {
            case 'required':
              this.errorMessages.push(`${key} is required.`);
              break;
            case 'email':
              this.errorMessages.push(`${key} must be a valid email.`);
              break;
            case 'pattern':
              this.errorMessages.push(`${key} has an invalid format.`);
              break;
            case 'minlength':
              this.errorMessages.push(
                `${key} must be at least ${error.requiredLength} characters long.`
              );
              break;
            default:
              this.errorMessages.push(`${key} is invalid.`);
          }
        }
      }
    });
  }
}


//
//   employeeService = inject(EmployeeService);
//   activatedRoute = inject(ActivatedRoute);
//   errorMessages: string[] = [];
//
//   ngOnInit(): void {
//     const id = this.activatedRoute.snapshot.paramMap.get('id');
//
//   }
//
//   //=========================================
//   // Reactive form for Add and Edit
//   //=========================================
//
//   addEmployeeForm: FormGroup = new FormGroup({
//     name: new FormControl('', [
//       Validators.required,
//       Validators.minLength(3)
//     ]),
//     contactNumber: new FormControl('', [
//       Validators.required,
//       Validators.pattern(/^\+?[0-9]{1,3}\s?[0-9]{6,14}$/)
//     ]),
//     address: new FormControl('', [
//       Validators.required,
//       Validators.minLength(5)
//     ]),
//     username: new FormControl('', [
//       Validators.required,
//       Validators.email
//     ]),
//     role: new FormControl('', Validators.required),
//     password: new FormControl('', [
//       Validators.required,
//       Validators.minLength(6)
//     ]),
//     hireDate: new FormControl(null, Validators.required),
//     employmentEndDate: new FormControl(null),
//     shiftStartsAt: new FormControl(null, Validators.required),
//     shiftEndsAt: new FormControl(null, Validators.required),
//     idProof: new FormControl('', Validators.required)
//   });
//
//   //=========================================
//   //            Add Employee
//   //=========================================
//
//   onAddEmployee() {
//     const formValue = this.addEmployeeForm.value;
//
//     this.errorMessages = [];
//     if (this.addEmployeeForm.invalid) {
//       this.collectErrors();
//       return;
//     }
//     this.employeeService.addEmployee(formValue).subscribe((res: APIResponseModel) => {
//       if (res.status) {
//         alert("Employee Added Successfully.")
//       } else {
//         alert(res.message)
//       }
//     })
//   }
//
//   //=========================================
//   //            Edit Employee
//   //=========================================
//
//   onEditEmployee(){
// }
//
//   //=========================================
//   //      Collect Validation Messages
//   //=========================================
//
//   private collectErrors() {
//     Object.keys(this.addEmployeeForm.controls).forEach((key) => {
//       const control = this.addEmployeeForm.get(key);
//       if (control?.invalid && control.errors) {
//         for (const errorKey in control.errors) {
//           const error = control.errors[errorKey];
//           switch (errorKey) {
//             case 'required':
//               this.errorMessages.push(`${key} is required.`);
//               break;
//             case 'email':
//               this.errorMessages.push(`${key} must be a valid email.`);
//               break;
//             case 'pattern':
//               this.errorMessages.push(`${key} has an invalid format.`);
//               break;
//             case 'minlength':
//               this.errorMessages.push(
//                 `${key} must be at least ${error.requiredLength} characters long.`
//               );
//               break;
//             default:
//               this.errorMessages.push(`${key} is invalid.`);
//           }
//         }
//       }
//     });
//   }
// }

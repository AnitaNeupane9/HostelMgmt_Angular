import {Component, inject, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {StudentService} from '../../../services/student/student.service';
import {APIResponseModel} from '../../../model/interface/APIResponse';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [
    NgIf,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup = new FormGroup({});
  authService = inject(AuthService);
  activatedRoute = inject(ActivatedRoute);
  studentService = inject(StudentService);
  toastr = inject(ToastrService);

  studentId: number | null = null;
  errorMessages: string[] = [];
  isEditMode: boolean = false;

  ngOnInit() {
    this.initializeForm();

    // Check if in Edit Mode
    this.studentId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (this.studentId) {
      this.isEditMode = true;
      this.loadStudentDetails(this.studentId);
    }
  }

  private initializeForm() {
    this.registrationForm = new FormGroup({
      name: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      nationality: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      contactNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\+?[0-9]{1,3}\s?[0-9]{6,14}$/)
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      parentContact: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\+?[0-9]{1,3}\s?[0-9]{6,14}$/)
      ]),
      emergencyContact: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\+?[0-9]{1,3}\s?[0-9]{6,14}$/)
      ]),
      idProof: new FormControl('', Validators.required),
    });
    if (!this.isEditMode) {
      this.registrationForm.addControl(
        'password',
        new FormControl('', [Validators.required, Validators.minLength(6)])
      );
    }
    this.registrationForm.addControl('active', new FormControl(''));

  }

  // Load employee data in Edit Mode
  private loadStudentDetails(id: number): void {
    this.studentService.getStudentDetail(id).subscribe({
      next: (response: APIResponseModel) => {
        if (response.status && response.data) {
          this.registrationForm.patchValue(response.data);
        }
      },
      error: (err) => {
        alert('Failed to load student details.');
      }
    });
  }

  onSubmit() {
    const formValue = this.registrationForm.value;

    this.errorMessages = [];
    if (this.registrationForm.invalid) {
      this.collectErrors();
      return;
    }

    if (this.isEditMode && this.studentId) {
      // Edit Student
      this.studentService.editStudent(this.studentId, formValue).subscribe((response) => {
        if (response.status) {
          this.toastr.success('Student updated successfully!');
          this.studentService.backToList();
        } else {
          this.toastr.error(response.message);
        }
      });
    } else {
      this.authService.onRegister(formValue).subscribe({
        next: (res) => {
          if (res.status) {
            this.toastr.success('Student registered successfully.');
            this.registrationForm.reset();
          } else {
            this.toastr.error('Registration failed: ' + res.message);
          }
        },
        error: (err) => {
          this.toastr.error('An unexpected error occurred. Please try again.');
        }
      });
    }
  }


  private collectErrors() {
    Object.keys(this.registrationForm.controls).forEach((key) => {
      const control = this.registrationForm.get(key);
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

//   authService = inject(AuthService);
//   // activatedRoute = inject(ActivatedRoute);
//   // studentService = inject(StudentService);
//
//   errorMessages: string[] = [];
//
//   ngOnInit() {
//   }
//   registrationForm: FormGroup = new FormGroup({
//       name: new FormControl('', Validators.required),
//       gender: new FormControl('', Validators.required),
//       address: new FormControl('', Validators.required),
//       nationality: new FormControl('', Validators.required),
//       dateOfBirth: new FormControl('', Validators.required),
//       contactNumber: new FormControl('', [
//         Validators.required,
//         Validators.pattern(/^\+?[0-9]{1,3}\s?[0-9]{6,14}$/)
//       ]),
//       username: new FormControl('', [
//         Validators.required,
//         Validators.email
//       ]),
//       parentContact: new FormControl('', [
//         Validators.required,
//         Validators.pattern(/^\+?[0-9]{1,3}\s?[0-9]{6,14}$/)
//       ]),
//       emergencyContact: new FormControl('', [
//         Validators.required,
//         Validators.pattern(/^\+?[0-9]{1,3}\s?[0-9]{6,14}$/)
//       ]),
//       idProof: new FormControl('', Validators.required),
//       password: new FormControl('', [
//         Validators.required,
//         Validators.minLength(6)
//       ])
//     });
//
//
//   onRegister() {
//     const formValue = this.registrationForm.value;
//
//     this.errorMessages = [];
//     if (this.registrationForm.invalid) {
//       this.collectErrors();
//       return;
//     }
//
//     this.authService.onRegister(formValue).subscribe({
//       next: (res) => {
//         if (res.status) {
//           alert('Student registered successfully.');
//           this.registrationForm.reset();
//         } else {
//           alert('Registration failed: ' + res.message);
//         }
//       },
//       error: (err) => {
//         alert('An unexpected error occurred. Please try again.');
//       }
//     });
//   }
//
//   private collectErrors() {
//     Object.keys(this.registrationForm.controls).forEach((key) => {
//       const control = this.registrationForm.get(key);
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

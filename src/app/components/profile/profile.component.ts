import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Employee} from '../../model/interface/employee';
import {ProfileService} from '../../services/profile/profile.service';
import {Student} from '../../model/interface/student';
import {APIResponseModel} from '../../model/interface/APIResponse';
import {AuthService} from '../../services/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [
    NgIf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements  OnInit {
  profileService = inject(ProfileService);
  activatedRoute = inject(ActivatedRoute);
  authService = inject(AuthService);
  employeeProfile: Employee | null = null;
  studentProfile : Student | null = null;

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    const role = this.authService.getRole();
    if (role === 'STUDENT') {
      this.getStudentProfile();
    } else {
      this.getEmployeeProfile();
    }
  }


  getEmployeeProfile(): void {
    this.profileService.getEmployeeProfile().subscribe((res: APIResponseModel) => {
      this.employeeProfile = res.data;
    });
  }


  getStudentProfile(): void {
    this.profileService.getStudentProfile().subscribe((res: APIResponseModel) => {
      this.studentProfile = res.data;
    });
  }
}

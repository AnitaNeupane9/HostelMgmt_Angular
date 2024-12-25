import {Component, inject, OnInit} from '@angular/core';
import {APIResponseModel} from '../../../model/interface/APIResponse';
import {ActivatedRoute} from '@angular/router';
import {StudentService} from '../../../services/student/student.service';
import {Student} from '../../../model/interface/student';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-student-details',
  imports: [
    DatePipe
  ],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent  implements OnInit{

  activatedRoute = inject(ActivatedRoute);
  studentService = inject(StudentService);
  studentDetail : Student | null = null;

  ngOnInit(): void {
    // Get the employee id from route parameters
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.getStudentDetail(Number(id));
    }
  }

  getStudentDetail(id: number): void {
    this.studentService.getStudentDetail(id).subscribe((res: APIResponseModel) => {
      this.studentDetail = res.data;
    });
  }
}

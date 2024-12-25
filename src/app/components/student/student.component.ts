import {Component, inject, OnInit} from '@angular/core';
import {StudentService} from '../../services/student/student.service';
import {APIResponseModel} from '../../model/interface/APIResponse';
import {Student} from '../../model/interface/student';
import {NgForOf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-student',
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit{

  studentService = inject(StudentService);
  router = inject(Router);
  toastr = inject(ToastrService);

  studentList: Student[] =[];

    ngOnInit(): void {
      this.getALlStudent();
    }

    getALlStudent(){
      this.studentService.getAllStudent().subscribe((res:APIResponseModel) => {
        this.studentList = res.data;
      })
    }

  viewDetail(id: number) {
    this.router.navigate(['/student/details', id])
  }

  editStudent(id: number) {
      this.router.navigate(['/student-edit', id]);
  }

  deleteStudent(id: number) {
    const isDelete = confirm("Are you sure you want to delete Student?");
    if (isDelete) {
      this.studentService.deleteStudent(id).subscribe((res: APIResponseModel) => {
        if (res.status) {
          this.toastr.success('Student deleted Successfully.');
          this.getALlStudent();
        } else {
          this.toastr.error(res.message);
        }
      })
    }
  }
}

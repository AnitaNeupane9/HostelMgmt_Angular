import {Component, inject, OnInit} from '@angular/core';
import {EmployeeService} from '../../services/employee/employee.service';
import {Employee} from '../../model/interface/employee';
import {APIResponseModel} from '../../model/interface/APIResponse';
import {NgForOf} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  imports: [
    NgForOf
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{

  employeeService = inject(EmployeeService);
  toastr = inject(ToastrService);

  router = inject(Router);
  employeeList: Employee[] = [];


  ngOnInit(): void {
    this.getAllEmployee();
  }
  getAllEmployee(){
    this.employeeService.getAllEmployee().subscribe((res:APIResponseModel)=> {
      this.employeeList = res.data;
    })
  }

  viewDetail(id: number) {
    this.router.navigate(['/employee/details', id]);
  }

  editEmployee(id: number) {
    this.router.navigate(['/employee-edit', id]);
  }

  addEmployee() {
    this.router.navigate(['/employee/add']);
  }

  deleteEmployee(id: number) {
    const isDelete = confirm("Are you sure you want to delete Employee?");
    if (isDelete) {
      this.employeeService.deleteEmployee(id).subscribe((res: APIResponseModel) => {
        if (res.status) {
          this.toastr.success('Employee deleted Successfully.');
          this.getAllEmployee();
        } else {
          this.toastr.error('Something Went Wrong.');
        }
      })
    }
  }
}

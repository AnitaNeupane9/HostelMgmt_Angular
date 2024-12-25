import {Component, inject, OnInit} from '@angular/core';
import {EmployeeService} from '../../../services/employee/employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Employee} from '../../../model/interface/employee';
import {APIResponseModel} from '../../../model/interface/APIResponse';
import {DatePipe} from '@angular/common';
import {EmployeeComponent} from '../employee.component';

@Component({
  selector: 'app-employee-details',
  imports: [
    DatePipe
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit{

  employeeService = inject(EmployeeService);
  activatedRoute = inject(ActivatedRoute);
  employeedetail: Employee | null  = null;

  ngOnInit(): void {
    // Get the employee id from route parameters
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.getEmployeeDetail(Number(id));
    }
  }

  getEmployeeDetail(id: number): void {
    this.employeeService.getEmployeeDetail(id).subscribe((res: APIResponseModel) => {
      this.employeedetail = res.data;
    });
  }

  protected readonly EmployeeComponent = EmployeeComponent;
}

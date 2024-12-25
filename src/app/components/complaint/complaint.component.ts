import {Component, inject, OnInit} from '@angular/core';
import {APIResponseModel} from '../../model/interface/APIResponse';
import {ComplaintService} from '../../services/complaint/complaint.service';
import {Complaint} from '../../model/interface/complaint';
import {NgForOf, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-complaint',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './complaint.component.html',
  styleUrl: './complaint.component.css'
})
export class ComplaintComponent implements OnInit{

  complaintService = inject(ComplaintService)
  authService = inject(AuthService);
  toaster = inject(ToastrService);

  router = inject(Router);
  complaintList: Complaint[] = []

  ngOnInit() {
    this.loadComplaints();
  }

  loadComplaints() {
    const role = this.authService.getRole();
    if (role === 'STUDENT') {
      this.getComplaintByUsername();
    } else {
      this.getAllComplaint();
    }
  }

  getAllComplaint(){
    this.complaintService.getAllComplaints().subscribe((res:APIResponseModel)=> {
      this.complaintList = res.data;
    })
  }

  getComplaintByUsername(){
    this.complaintService.getComplaintByUsername().subscribe((res: APIResponseModel) => {
      this.complaintList = res.data;
    })
  }

  viewDetail(id: number) {
    this.router.navigate(['/complaint/details', id]);

  }

  addComplaint() {
    this.router.navigate(['/complaint/add']);

  }

  editComplaint(id: number) {
    this.router.navigate(['/complaint-edit', id]);
  }

  deleteComplaint(id: number) {
    const isDelete = confirm("Are you sure you want to delete Complaint?");
    if (isDelete) {
      this.complaintService.deleteComplaint(id).subscribe((res: APIResponseModel) => {
        if (res.status) {
          this.toaster.success('Complaint deleted Successfully.');
          this.getAllComplaint();
        } else {
          this.toaster.error('Something Went Wrong!')
        }
      });
    }
  }
}

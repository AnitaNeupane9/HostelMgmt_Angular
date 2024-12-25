import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {APIResponseModel} from '../../../model/interface/APIResponse';
import {ComplaintService} from '../../../services/complaint/complaint.service';
import {Complaint} from '../../../model/interface/complaint';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-complaint-detail',
  imports: [
  ],
  templateUrl: './complaint-detail.component.html',
  styleUrl: './complaint-detail.component.css'
})
export class ComplaintDetailComponent implements OnInit{
  complaintService = inject(ComplaintService);
  activatedRoute = inject(ActivatedRoute);
  complaintDetail: Complaint | null  = null;

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id) {
      this.getComplaintDetail(id);
    }
  }

  getComplaintDetail(id: number): void {
    this.complaintService.getComplaintDetail(id).subscribe((res: APIResponseModel) => {
      this.complaintDetail = res.data;
    });
  }
}

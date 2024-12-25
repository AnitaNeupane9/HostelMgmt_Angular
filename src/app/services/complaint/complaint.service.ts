import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {APIResponseModel} from '../../model/interface/APIResponse';
import {environment} from '../../../environments/environment.development';
import {Constant} from '../../constant/constant';
import {Complaint} from '../../model/interface/complaint';
import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService) { }

  getAllComplaints(): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>(`${environment.API_BASE_URL}${Constant.API_METHOD.COMPLAINT_URL}`);
  }

  getComplaintDetail(id: number): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(`${environment.API_BASE_URL}${Constant.API_METHOD.COMPLAINT_URL}/${id}`);
  }

  getComplaintByUsername(): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>(`${environment.API_BASE_URL}${Constant.API_METHOD.COMPLAINT_URL}/allComplaintsByStudent`);
  }

  addComplaint(obj: Complaint): Observable<APIResponseModel> {
    return this.http.post<APIResponseModel>(
      `${environment.API_BASE_URL}${Constant.API_METHOD.COMPLAINT_URL}${Constant.API_METHOD.ADD}`, obj);
  }

  editComplaint(id: number, obj: Complaint): Observable<APIResponseModel> {
    const url = `${environment.API_BASE_URL}${Constant.API_METHOD.COMPLAINT_URL}/${id}/update`;
    return this.http.put<APIResponseModel>(url, obj);
  }

  deleteComplaint(id: number) : Observable<APIResponseModel>{
    return this.http.delete<APIResponseModel>(`${environment.API_BASE_URL}${Constant.API_METHOD.COMPLAINT_URL}/${id}`);
  }

  backToList(){
      this.router.navigate(['/complaint']);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APIResponseModel} from '../../model/interface/APIResponse';
import {environment} from '../../../environments/environment.development';
import {Constant} from '../../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getEmployeeProfile(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(`${environment.API_BASE_URL}${Constant.API_METHOD.EMPLOYEE_URL}/employeeProfile`);
  }

  getStudentProfile(){
    return this.http.get<APIResponseModel>(`${environment.API_BASE_URL}${Constant.API_METHOD.STUDENT_URL}/studentProfile`)
  }
}

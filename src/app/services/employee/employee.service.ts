import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {APIResponseModel} from '../../model/interface/APIResponse';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment.development';
import {Constant} from '../../constant/constant';
import {Router} from '@angular/router';
import {Employee} from '../../model/interface/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient,
              private router: Router) { }

  getAllEmployee(): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>(`${environment.API_BASE_URL}${Constant.API_METHOD.EMPLOYEE_URL}`)
  }

  getEmployeeDetail(id: number): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(`${environment.API_BASE_URL}${Constant.API_METHOD.EMPLOYEE_URL}/${id}`);
  }

  addEmployee(obj: Employee): Observable<APIResponseModel> {
    return this.http.post<APIResponseModel>(
      `${environment.API_BASE_URL}${Constant.API_METHOD.EMPLOYEE_URL}${Constant.API_METHOD.ADD}`, obj);
  }

  editEmployee(id: number, obj: Employee): Observable<APIResponseModel> {
    const url = `${environment.API_BASE_URL}${Constant.API_METHOD.EMPLOYEE_URL}/${id}/update`;
    return this.http.put<APIResponseModel>(url, obj);
  }

  deleteEmployee(id: number) : Observable<APIResponseModel>{
    return this.http.delete<APIResponseModel>(`${environment.API_BASE_URL}${Constant.API_METHOD.EMPLOYEE_URL}/${id}`);
  }

  backToList(){
    this.router.navigate(['/employee']);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {APIResponseModel} from '../../model/interface/APIResponse';
import {environment} from '../../../environments/environment.development';
import {Constant} from '../../constant/constant';
import {Employee} from '../../model/interface/employee';
import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService) { }

  getAllStudent(): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>(`${environment.API_BASE_URL}${Constant.API_METHOD.STUDENT_URL}`)
  }

  getStudentDetail(id: number){
    return this.http.get<APIResponseModel>(`${environment.API_BASE_URL}${Constant.API_METHOD.STUDENT_URL}/${id}`)
  }

  editStudent(id: number, obj: Employee): Observable<APIResponseModel> {
    const url = `${environment.API_BASE_URL}${Constant.API_METHOD.STUDENT_URL}/${id}/update`;
    return this.http.put<APIResponseModel>(url, obj);
  }

  deleteStudent(id: number) : Observable<APIResponseModel>{
    return this.http.delete<APIResponseModel>(`${environment.API_BASE_URL}${Constant.API_METHOD.STUDENT_URL}/${id}`);
  }

  backToList(){
    if (this.authService.isLoggedIn()){
      this.router.navigate(['/student']);
    } else {
      this.router.navigate(['/landingPage']);
    }
  }
}

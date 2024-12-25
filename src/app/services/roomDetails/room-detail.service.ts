import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {APIResponseModel} from '../../model/interface/APIResponse';
import {environment} from '../../../environments/environment.development';
import {Constant} from '../../constant/constant';
import {Room} from '../../model/interface/room';

@Injectable({
  providedIn: 'root'
})
export class RoomDetailService {

  constructor(private http: HttpClient,
              private router: Router) { }

  getAllRoom(): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>(`${environment.API_BASE_URL}${Constant.API_METHOD.ROOM_URL}`)
  }

  getRoomDetail(id: number): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(`${environment.API_BASE_URL}${Constant.API_METHOD.ROOM_URL}/${id}`);
  }

  addRoom(obj: Room): Observable<APIResponseModel> {
    return this.http.post<APIResponseModel>(
      `${environment.API_BASE_URL}${Constant.API_METHOD.ROOM_URL}${Constant.API_METHOD.ADD}`, obj);
  }

  editRoom(id: number, obj: Room): Observable<APIResponseModel> {
    const url = `${environment.API_BASE_URL}${Constant.API_METHOD.ROOM_URL}/${id}/update`;
    return this.http.put<APIResponseModel>(url, obj);
  }

  deleteRoom(id: number) : Observable<APIResponseModel>{
    return this.http.delete<APIResponseModel>(`${environment.API_BASE_URL}${Constant.API_METHOD.ROOM_URL}/${id}`);
  }

  backToList(){
    this.router.navigate(['/room']);
  }
}

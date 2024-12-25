import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APIResponseModel} from '../../model/interface/APIResponse';
import {environment} from '../../../environments/environment.development';
import {Constant} from '../../constant/constant';
import {Room} from '../../model/interface/room';
import {RoomAllotment} from '../../model/interface/roomAllotment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoomAllotmentService {

  constructor(private http: HttpClient,
              private router: Router) { }

  getAllRoomAllotment(): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>(`${environment.API_BASE_URL}${Constant.API_METHOD.ROOM_ALLOTMENT_URL}`)
  }

  getRoomAllotmentDetail(id: number): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(`${environment.API_BASE_URL}${Constant.API_METHOD.ROOM_ALLOTMENT_URL}/${id}`);
  }

  addRoomAllotment(obj: RoomAllotment): Observable<APIResponseModel> {
    return this.http.post<APIResponseModel>(
      `${environment.API_BASE_URL}${Constant.API_METHOD.ROOM_ALLOTMENT_URL}${Constant.API_METHOD.ADD}`, obj);
  }

  editRoomAllotment(id: number, obj: RoomAllotment): Observable<APIResponseModel> {
    const url = `${environment.API_BASE_URL}${Constant.API_METHOD.ROOM_ALLOTMENT_URL}/${id}/update`;
    return this.http.put<APIResponseModel>(url, obj);
  }

  deleteRoomAllotment(id: number) : Observable<APIResponseModel>{
    return this.http.delete<APIResponseModel>(`${environment.API_BASE_URL}${Constant.API_METHOD.ROOM_ALLOTMENT_URL}/${id}`);
  }

  backToList(){
    this.router.navigate(['/room-allotment']);
  }
}

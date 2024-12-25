import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APIResponseModel} from '../../model/interface/APIResponse';
import {environment} from '../../../environments/environment.development';
import {Constant} from '../../constant/constant';
import {Complaint} from '../../model/interface/complaint';
import {ReviewReply} from '../../model/interface/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  getReview(): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>(`${environment.API_BASE_URL}${Constant.API_METHOD.REVIEW_URL}`);
  }

  getReviewDetail(id: number): Observable<APIResponseModel>{
    return  this.http.get<APIResponseModel>(`${environment.API_BASE_URL}${Constant.API_METHOD.REVIEW_URL}/${id}`);
  }

  addReview(obj: ReviewReply): Observable<APIResponseModel> {
    return this.http.post<APIResponseModel>(
      `${environment.API_BASE_URL}${Constant.API_METHOD.REVIEW_URL}${Constant.API_METHOD.ADD}`, obj);
  }

  editReview(id: number, obj: ReviewReply): Observable<APIResponseModel> {
    const url = `${environment.API_BASE_URL}${Constant.API_METHOD.REVIEW_URL}/${id}/update`;
    return this.http.put<APIResponseModel>(url, obj);
  }

  deleteReview(id: number) : Observable<APIResponseModel>{
    return this.http.delete<APIResponseModel>(`${environment.API_BASE_URL}${Constant.API_METHOD.REVIEW_URL}/${id}`);
  }

  /**
   * Replies
   */

  addReply(reviewId: number, obj: ReviewReply): Observable<APIResponseModel> {
    return this.http.post<APIResponseModel>(
      `${environment.API_BASE_URL}${Constant.API_METHOD.REVIEW_URL}/${reviewId}/replies/reply`, obj
    );
  }

  editReply(reviewId: number, replyId: number, obj: ReviewReply): Observable<APIResponseModel>{
    return this.http.put<APIResponseModel>(`${environment.API_BASE_URL}${Constant.API_METHOD.REVIEW_URL}/${reviewId}/replies/${replyId}/edit`, obj)
  }

  getReplyDetail(reviewId: number, replyId: number): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>(`${environment.API_BASE_URL}${Constant.API_METHOD.REVIEW_URL}/${reviewId}/replies/${replyId}`)
  }

  deleteReply(reviewId: number, replyId: number): Observable<APIResponseModel>{
    return this.http.delete<APIResponseModel>(`${environment.API_BASE_URL}${Constant.API_METHOD.REVIEW_URL}/${reviewId}/replies/${replyId}`)
  }

  /**
   * Like and Dislike
   */

  likeReview(reviewId: number) : Observable<APIResponseModel>{
    return this.http.post<APIResponseModel>(`${environment.API_BASE_URL}${Constant.API_METHOD.REVIEW_URL}/${reviewId}/like`, {})
  }

  dislikeReview(reviewId: number) : Observable<APIResponseModel>{
    return this.http.post<APIResponseModel>(`${environment.API_BASE_URL}${Constant.API_METHOD.REVIEW_URL}/${reviewId}/dislike`, {})
  }
}

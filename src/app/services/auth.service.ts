import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Login, Registration} from '../model/class/Auth';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import {tokenPayload} from '../model/interface/tokenPayload';
import {APIResponseModel} from '../model/interface/APIResponse';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router,
              private toastr: ToastrService) {}

  private authTokenKey = 'token';

  // BehaviorSubject to track login state
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLoggedIn());
  public loggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();


  /**
   *  Student Registration
   * @param obj
   */

  onRegister(obj: Registration): Observable<APIResponseModel> {
    return this.http.post<APIResponseModel>('http://localhost:8080/api/students/register', obj);
  }

  /**
   *  Login and Token Management
   * @param obj
   */

  onLogin(obj: Login): Observable<any> {
    return this.http.post('http://localhost:8080/login', obj);
  }

  // Save token in localStorage and update login state
  saveToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
    this.loggedInSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem(this.authTokenKey);
    this.loggedInSubject.next(false);
    this.toastr.info('Logged Out!');
    this.router.navigate(['/login']);
  }

  /**
   * Token Decoding
   * @private
   */
  private decodeToken(): tokenPayload | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    try {
      return jwtDecode<tokenPayload>(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }


  /**
   * Token and Role and username Retrieval
   */

  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  getRole(): string {
    const decodedToken = this.decodeToken();
    return decodedToken ? decodedToken.Role : '';
  }

  getUser(): string | null {
    const decodedToken = this.decodeToken();
    return decodedToken ? decodedToken.sub : null;
  }

  /**
   * Token Expiry Check
   */

  isTokenExpired(): boolean {
    const decodedToken = this.decodeToken();
    if (!decodedToken) {
      return true; // No token or invalid token, consider expired
    }

    const currentTimestamp = Math.floor(new Date().getTime() / 1000);
    if (decodedToken.exp <= currentTimestamp) {
      return true;
    }

    return false; // Token is still valid
  }

  /**
   * User Authentication Check
   */

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token || this.isTokenExpired()) {
      return false;
    }
    return true; // Token is valid
  }
}

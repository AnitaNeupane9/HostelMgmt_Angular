import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Login} from '../../model/class/Auth';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData: Login = new Login();

  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) {}


  onLogin(): void {
    this.authService.onLogin(this.loginData).subscribe((res: any) => {
      if (res.status) {
        const token = res.data;
        this.authService.saveToken(token);
        this.toastr.success('Login successful!');
        this.router.navigateByUrl('/landingPage');
      } else {
        this.toastr.error(res.message);
      }
    }, () => {
      this.toastr.error('Something Went Wrong.');
    });
  }


  // onLogin(): void {
  //   this.authService.onLogin(this.loginData).subscribe({
  //     next: (res: any) => {
  //       if (res.status) {
  //         const token = res.data;
  //         this.authService.saveToken(token);
  //         this.toastr.success('Login successful!', 'Success');
  //         this.router.navigateByUrl('/landingPage');
  //       } else {
  //         this.toastr.error(res.message, 'Error');
  //       }
  //     },
  //     error: (err: any) => {
  //       this.toastr.error('Something Went Wrong.', 'Error');
  //     }
  //   });
  // }

}

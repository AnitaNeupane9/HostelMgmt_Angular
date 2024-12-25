import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {LayoutComponent} from './components/layout/layout.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {authGuard} from './guard/auth.guard';
import {RegisterComponent} from './components/student/register/register.component';
import {EmployeeComponent} from './components/employee/employee.component';
import {EmployeeDetailsComponent} from './components/employee/employee-details/employee-details.component';
import {EmployeeAddEditComponent} from './components/employee/employee-add-edit/employee-add-edit.component';
import {StudentComponent} from './components/student/student.component';
import {StudentDetailsComponent} from './components/student/student-details/student-details.component';
import {RoomDetailsComponent} from './components/room-details/room-details.component';
import {RoomGetDetailComponent} from './components/room-details/room-get-detail/room-get-detail.component';
import {RoomAddEditComponent} from './components/room-details/room-add-edit/room-add-edit.component';
import {RoomAllotmentComponent} from './components/room-allotment/room-allotment.component';
import {
  RoomAllotmentDetailsComponent
} from './components/room-allotment/room-allotment-details/room-allotment-details.component';
import {
  RoomAllotmentAddEditComponent
} from './components/room-allotment/room-allotment-add-edit/room-allotment-add-edit.component';
import {ComplaintComponent} from './components/complaint/complaint.component';
import {ComplaintAddEditComponent} from './components/complaint/complaint-add-edit/complaint-add-edit.component';
import {ComplaintDetailComponent} from './components/complaint/complaint-detail/complaint-detail.component';
import {ReviewComponent} from './components/review/review/review.component';
import {ReplyAddEditComponent} from './components/review/review/reply-add-edit/reply-add-edit.component';
import {roleGuard} from './guard/role.guard';
import {ProfileComponent} from './components/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'landingPage', pathMatch: 'full' }, // Default route
      { path: 'landingPage', component: LandingPageComponent },
      { path: 'login', component: LoginComponent },
      { path: 'studentRegistration', component: RegisterComponent},
      { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },

      { path: 'employee/details/:id',
        component: EmployeeDetailsComponent,
        canActivate: [authGuard, roleGuard],
        data: { roles: ['ADMIN', 'ACCOUNTANT', 'WARDEN'] }
      },

      { path: 'employee/add', component: EmployeeAddEditComponent, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN'] } },
      { path: 'employee-edit/:id', component: EmployeeAddEditComponent,canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN'] } },
      { path: 'employee', component: EmployeeComponent, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN'] } },

      { path: 'student', component: StudentComponent, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN', 'WARDEN']}},
      { path: 'student/details/:id', component: StudentDetailsComponent, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN', 'WARDEN'] }},
      { path: 'student-edit/:id', component: RegisterComponent, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN', 'WARDEN'] }},

      { path: 'room', component: RoomDetailsComponent, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN', 'WARDEN']}},
      { path: 'room/details/:id', component: RoomGetDetailComponent, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN', 'WARDEN']}},
      { path: 'room/add', component: RoomAddEditComponent, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN', 'WARDEN']}},
      { path: 'room-edit/:id', component: RoomAddEditComponent, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN', 'WARDEN']}},

      { path:'room-allotment', component: RoomAllotmentComponent, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN', 'WARDEN']}},
      { path: 'room-allotment/details/:id', component: RoomAllotmentDetailsComponent, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN', 'WARDEN']}},
      { path: 'room-allotment/add', component: RoomAllotmentAddEditComponent, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN', 'WARDEN']}},
      { path: 'room-allotment-edit/:id', component: RoomAllotmentAddEditComponent, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN', 'WARDEN']}},

      { path: 'complaint', component: ComplaintComponent, canActivate: [authGuard]},
      { path: 'complaint/details/:id', component: ComplaintDetailComponent, canActivate: [authGuard]},
      { path: 'complaint/add', component: ComplaintAddEditComponent, canActivate: [authGuard]},
      { path: 'complaint-edit/:id', component: ComplaintAddEditComponent, canActivate: [authGuard]},

      { path: 'review', component: ReviewComponent, canActivate: [authGuard]},
      // { path: 'reviews/:reviewId/replies/add', component: ReplyAddEditComponent },
      // { path: 'reviews-edit/:reviewId/replies/:replyId', component: ReplyAddEditComponent },

      { path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
    ],
  },
];

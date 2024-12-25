import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgIf} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {LandingPageComponent} from '../landing-page/landing-page.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    NgIf
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit, OnDestroy{

  isLoggedIn: boolean = false;
  role: string | null = null;
  private loggedInSubscription!: Subscription;

  constructor(protected authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to the loggedIn$ observable
    this.loggedInSubscription = this.authService.loggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe when the component is destroyed to avoid memory leaks
    if (this.loggedInSubscription) {
      this.loggedInSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.logout(); // Call logout method from AuthService
  }
}



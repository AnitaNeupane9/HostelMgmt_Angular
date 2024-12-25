import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LandingPageComponent} from './components/landing-page/landing-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{

  title = 'Hostel Management ';

}

import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    JsonPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  http = inject(HttpClient);
  visitorsList: any[] =[]

    ngOnInit(): void {
    this.getAllVisitors();
    }

    getAllVisitors(){
      this.http.get('http://localhost:8080/api/visitors').subscribe((Res: any) => {
        this.visitorsList = Res.data;
      })
    }
}

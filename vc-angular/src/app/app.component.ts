import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  conferences: object;

  constructor(private http: HttpClient){
  }

  ngOnInit(): void{
  }
}
import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {

	conferences: Object;

  constructor(private http: HttpClient) {}

  ngOnInit() {
  	this.http.get<Object>("/assets/data.json").subscribe(data => {
  		this.conferences = data;
  	})
  }

}

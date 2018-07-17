import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { ShortMessageService } from '../short-message.service';
import { ButtonOnRequestService } from '../button-on-request.service';
import { Location } from '../config-location/config-location.component';
import { Endpoint } from '../config-endpoint/config-endpoint.component';
import { Participant, Conference, MailListItem } from '../schedule-component/schedule-component.component';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html'
})
export class ConferenceComponent implements OnInit {
	public conference: Conference;
  public status_classes: string[];
  public endpoints: Endpoint[];

  constructor(private api: ApiService, private message: ShortMessageService, private button: ButtonOnRequestService, private router: Router, private route: ActivatedRoute) {
    this.status_classes = [];
    this.status_classes[-1] = "badge badge-danger";
    this.status_classes[0] = "badge badge-primary";
    this.status_classes[1] = "badge badge-warning";
    this.status_classes[2] = "badge badge-success";
  }

  ngOnInit() {
  	let id = this.route.snapshot.paramMap.get('id');
  	this.api.get("conference/"+id).subscribe(
  		(data: Conference) => {
  			this.conference = data;
  		}
  	);
    this.api.get("endpoint").subscribe(
      (data: Endpoint[]) => {
        this.endpoints = data;
      }
    );
  }

  getRoom(room: number){
    let key: Endpoint;
    for ( key of this.endpoints ){
      if( key.id == room){
        return key.name + " @ " + key.location.name;
      }
    }
  }

}

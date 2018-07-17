import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ShortMessageService } from '../short-message.service';
import { ButtonOnRequestService } from '../button-on-request.service';
import { Location } from '../config-location/config-location.component';
import { Endpoint } from '../config-endpoint/config-endpoint.component';

declare var jQuery;

export class Participant{
	public id: number;
	public name: string;
	public location: Location;
	public location_id: number;
	public endpoint_id: number;
	public mail: string;
}

export class Conference{
	public id: number;
	public participants: Participant[];
	public start: string;
	public end: string;
	public name: string;
  public title: string;
	public owner: number;
	public ticketing: number;
	public maillist: MailListItem[];
  public start_display_f: string;
  public start_display: string;
  public end_display: string;
  public end_display_f: string;
}

export class MailListItem{
	public id: number;
	public name: string;
	public mail: string;
}

class Searchable{
	public id: number;
}

@Component({
  selector: 'app-schedule-component',
  templateUrl: './schedule-component.component.html'
})
export class ScheduleComponentComponent implements OnInit {

	public tempParticipant: Participant;
	public participants: Participant[];
	public locations: Location[];
	public endpoints: Endpoint[];
	public conference: Conference;
	public maillist: MailListItem[];
	public tempMailListItem: MailListItem;

  constructor(private api: ApiService, private message: ShortMessageService, private button: ButtonOnRequestService, private router: Router) {
  	this.tempParticipant = new Participant();
  	this.conference = new Conference();
  	this.conference.participants = [];
  	this.conference.maillist = [];
  	this.tempMailListItem = new MailListItem();
  	this.maillist = [];
  }

  ngOnInit() {
  	this.api.get("location").subscribe(
  		(data: Location[]) => {
  			this.locations = data;
  		}
  	);
  	this.api.get("endpoint").subscribe(
  		(data: Endpoint[]) => {
  			this.endpoints = data;
  		}
  	);
  }

  getLocationName(id: number){
  	let key: Location;
  	for (key of this.locations){
  		if ( key.id == id ){
  			return key.name;
  		}
  	}
  }

  getEndpointName(id: number){
  	let key: Endpoint;
  	for ( key of this.endpoints ){
  		if ( key.id == id ) {
  			return key.name + " @ " + key.location.name;
  		}
  	}
  }

  addParticipant($event){
  	console.log(this.conference);
  	if(('name' in this.tempParticipant) && ('endpoint_id' in this.tempParticipant)){
  		this.conference.participants.push(this.tempParticipant);
  		this.tempParticipant = new Participant();
  		jQuery('#addParticipantModal').modal('hide');
  	}
  }

  addMailListItem($event){
  	if(('name' in this.tempMailListItem) && ('mail' in this.tempMailListItem)){
  		this.conference.maillist.push(this.tempMailListItem);
  		this.tempMailListItem = new MailListItem();
  	}else{
  		alert('Enter name and mail id');
  	}
  }

  Schedule(){
  	let mandatory = [ 'start' , 'end' , 'name' , 'ticketing' ];
  	if ( !('start' in this.conference)) {
  		alert('Enter start time.');
  		return false;
  	}
  	if ( ! ('end' in this.conference) ) {
  		alert('Enter end time.');
  		return false;
  	}
  	if ( ! ('name' in this.conference) ) {
  		alert('Enter a conference name.');
  		return false;
  	}
  	if ( ! ('ticketing' in this.conference) ) {
  		alert('Choose a ticketing type.');
  		return false;
  	}
  	if( this.conference.participants.length < 2 ) {
  		alert ( "Minimum of 2 participants required." );
  		return false;
  	}
  	this.api.post("conference", this.conference).subscribe(
  		(data: Conference) => {
  			this.router.navigate(['conference', data.id]);
  		},
  		(error) => {
  			this.message.showError(error);
  		}
  	);
  }

}

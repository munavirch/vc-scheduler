import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { ShortMessageService } from '../short-message.service';
import { ButtonOnRequestService } from '../button-on-request.service';
import { Location } from '../config-location/config-location.component';

declare var jQuery;

export class Endpoint{
	public id: number;
	public name: string;
	public location: Location;
}

@Component({
  selector: 'app-config-endpoint',
  templateUrl: './config-endpoint.component.html',
  styleUrls: ['./config-endpoint.component.css']
})
export class ConfigEndpointComponent implements OnInit {
	public endpoints: Endpoint[];
	public locations: Location[];
	public tempEndpoint: Endpoint;
	public tempEndpointName: string;
	public tempEndpointLocation: number;

  constructor(private api:ApiService, private message: ShortMessageService, private button: ButtonOnRequestService) { }

  ngOnInit() {
  	this.api.get('/endpoint').subscribe(
  		(data: Endpoint[])=>{
  			this.endpoints = data;
  		}
  	);
  	this.api.get('/location').subscribe(
  		(data: Location[])=>{
  			this.locations = data;
  		}
  	);
  }

  showEditModal(endpoint: Endpoint){
  	this.tempEndpoint = endpoint;
  	this.tempEndpointName = endpoint.name;
  	this.tempEndpointLocation = endpoint.location.id;
  	jQuery('#editEndpointModal').modal('show');
  }

  editEndpoint($event){
  	this.button.start($event, "Editing...");
  	this.api.patch('/endpoint/'+this.tempEndpoint.id, {'name': this.tempEndpointName, 'location': this.tempEndpointLocation }).subscribe(
  		(data: Endpoint) => {
  			data = data[0];
  			this.button.end();
  			this.tempEndpoint.name = data.name;
  			this.tempEndpoint.location.name = data.location.name;
  			this.tempEndpoint.location.id = data.location.id;
  			this.tempEndpointName = '';
  			this.tempEndpointLocation = 0;
  			jQuery('#editEndpointModal').modal('hide');
  			this.message.show('Endpoint edited successfully.');
  		},
  		(error) => {
  			this.button.end();
  			jQuery('#editEndpointModal').modal('hide');
  			this.message.showError(error);
  		}
  	);
  }

  deleteEndpoint($event){
  	this.button.start($event, "Deleting...");
  	this.api.delete("/endpoint/"+this.tempEndpoint.id).subscribe(
  		(data) =>{
  			this.button.end();
  			this.endpoints.splice(this.endpoints.indexOf(this.tempEndpoint),1);
  			this.tempEndpointName = '';
  			this.tempEndpointLocation = 0;
  			jQuery('#editEndpointModal').modal('hide');
  			this.message.show('Endpoint deleted successfully.');
  		},
  		(error) => {
  			this.button.end();
  			jQuery('#editEndpointModal').modal('hide');
  			this.message.showError(error);
  		}
  	);
  }

  addEndpoint($event){
  	this.button.start($event, "Adding...");
  	this.api.post("endpoint", {'name': this.tempEndpointName, 'location':this.tempEndpointLocation}).subscribe(
  		(data: Endpoint) => {
  			data = data[0];
  			this.button.end();
  			this.endpoints.push(data);
  			this.tempEndpointName = '';
  			this.tempEndpointLocation = 0;
  			jQuery('#addEndpointModal').modal('hide');
  			this.message.show('Endpoint added successfully.');
  		},
  		(error) => {
  			this.button.end();
  			jQuery('#addEndpointModal').modal('hide');
  			this.message.showError(error);
  		}
  	);
  }

}

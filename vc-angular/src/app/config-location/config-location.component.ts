import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { ShortMessageService } from '../short-message.service';
import { ButtonOnRequestService } from '../button-on-request.service';

declare var jQuery:any;

export class Location{
	public id: number;
	public name: string;
}

@Component({
  selector: 'app-config-location',
  templateUrl: './config-location.component.html'
})

export class ConfigLocationComponent implements OnInit {
	locations: any;
	tempLocation: string;
	tempLocationEdit: any;

  constructor(private api:ApiService, private message: ShortMessageService, private button: ButtonOnRequestService) {
  	this.tempLocation='';
  	this.locations = [];
  	this.tempLocationEdit = {'name':'', 'id':''};
  }

  ngOnInit() {
  	this.api.get("location").subscribe((data) => {
  		this.locations=data;
  	});
  	console.log(this.locations);
  }

  addLocation($event) {
  	this.button.start($event);
  	this.api.post("location", {'name': this.tempLocation}).subscribe((data: Location)=> {
  		this.button.end();
  		this.tempLocation='';
  		jQuery('#addLocationModal').modal('hide');
  		this.message.show("Location added successfuly.");
  	});
  }

  showEditModal(location){
  	this.tempLocationEdit = location;
  	this.tempLocation = location.name;
  	jQuery("#editLocationModal").modal('show');
  }

  editLocation($event){
  	this.button.start($event, "Editing...");
  	this.api.patch("/location/"+this.tempLocationEdit.id, {'name': this.tempLocation}).subscribe((data: Location)=> {
  		this.button.end();
  		this.tempLocationEdit.name = data.name;
  		jQuery("#editLocationModal").modal('hide');
  		this.message.show("Location edited successfuly.");
  	});
  }

  deleteLocation($event){
  	this.button.start($event, "Deleting...");
  	this.api.delete("/location/"+this.tempLocationEdit.id).subscribe(data => {
  		this.button.end();
  		this.locations.splice(this.locations.indexOf(this.tempLocationEdit), 1);
  		this.tempLocationEdit = {'name':'', 'id':''};
  		jQuery("#editLocationModal").modal('hide');
	  	this.message.show("Location deleted successfuly.");
	  	this.tempLocation='';
  	});
  }

}

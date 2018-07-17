import { Injectable } from '@angular/core';

declare var jQuery:any;

@Injectable({
  providedIn: 'root'
})

export class ShortMessageService {
	public message: string;
	public count: number;	
  constructor() {
  	this.count = 0;
  }

  show(message: string){
  	//jQuery('#short-message').;
  	jQuery('#short-message').removeClass("short-message-run")
  	void document.getElementById("short-message").offsetWidth;
  	document.getElementById("short-message").classList.add("short-message-run");
  	jQuery('#short-message').html(message);
  }

  showError(message: string){
    jQuery('#short-message').addClass('alert-danger');
    this.show(message);
  }

  showSuccess(message: string){
    jQuery('#short-message').addClass('alert-success');
    this.show(message);
  }

}

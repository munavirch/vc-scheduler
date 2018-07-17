import { Injectable } from '@angular/core';

interface HTMLButtonEvent extends Event{
  target: HTMLButtonElement & EventTarget;
  innerHTML: string;
  disabled: boolean;
}

@Injectable({
  providedIn: 'root'
})



export class ButtonOnRequestService {

	private prev_message: string;
  private $event: any;

  constructor() {
  	this.prev_message = '';
  }

  start($event: HTMLButtonEvent, message = "Saving Changes..."){
  	this.prev_message = $event.target.innerHTML;
  	$event.target.disabled = true;
  	$event.target.innerHTML = message;
    this.$event = $event;
  }

  end(){
  	this.$event.target.disabled = false;
  	this.$event.target.innerHTML = this.prev_message;
  }
}

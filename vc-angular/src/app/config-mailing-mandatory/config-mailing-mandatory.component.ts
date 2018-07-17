import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { ShortMessageService } from '../short-message.service';
import { ButtonOnRequestService } from '../button-on-request.service';

export class MailListItem{
	public id: number;
	public name: string;
	public mail: string;
}

@Component({
  selector: 'app-config-mailing-mandatory',
  templateUrl: './config-mailing-mandatory.component.html',
  styleUrls: ['./config-mailing-mandatory.component.css']
})
export class ConfigMailingMandatoryComponent implements OnInit {

	public lists: MailListItem[];
	public tempList: MailListItem;
	public tempListName: string;
	public tempListMail: string;

  constructor(private api: ApiService, private message: ShortMessageService, private button: ButtonOnRequestService) { }

  ngOnInit() {
  }

}

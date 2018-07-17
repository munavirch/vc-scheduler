import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { ShortMessageService } from '../short-message.service';
import { ButtonOnRequestService } from '../button-on-request.service';

export class Department{
	public id: number;
	public name: string;
}

declare var jQuery;

@Component({
  selector: 'app-config-department',
  templateUrl: './config-department.component.html'
})
export class ConfigDepartmentComponent implements OnInit {
	public departments: any;
	public tempDepartment: Department;
	public tempDepartmentName: string;

  constructor(private api: ApiService, private message: ShortMessageService, private button: ButtonOnRequestService) {
  	this.tempDepartmentName = '';
  }

  ngOnInit() {
  	this.api.get("department").subscribe((data)=>{
  		this.departments = data;
  	});
  }

  addDepartment($event){
  	this.button.start($event);
  	this.api.post('department', {'name': this.tempDepartmentName}).subscribe((data: Department)=>{
  		this.departments.push(data);
  		this.button.end();
  		this.tempDepartmentName = '';
      jQuery('#addDepartmentModal').modal('hide');
  		this.message.showSuccess("Department added successguly");
  	},
  	error => {
  		this.button.end();
  		console.log(error);
      jQuery('#addDepartmentModal').modal('hide');
  		this.message.showError(error);
  	}
  	);
  }

  showEditModal(dept: Department){
    this.tempDepartment = dept;
    this.tempDepartmentName = dept.name;
    jQuery('#editDepartmentModal').modal('show');
  }

  editDepartment($event){
    this.button.start($event, "Editing...");
    this.api.patch("/department/"+this.tempDepartment.id, {'name': this.tempDepartmentName}).subscribe((data: Department)=> {
      this.button.end();
      this.tempDepartment.name = data.name;
      jQuery("#editDepartmentModal").modal('hide');
      this.message.show("Department edited successfuly.");
    });
  }

  deleteDepartment($event){
    this.button.start($event, "Deleting...");
    this.api.delete('/department/'+this.tempDepartment.id).subscribe(
      data => {
        this.button.end();
        this.departments.splice(this.departments.indexOf(this.tempDepartment), 1);
        this.tempDepartmentName = '';
        this.tempDepartment = {'name':'', id: 0};
        jQuery('#editDepartmentModal').modal('hide');
        this.message.show("Department deleted successfuly.");
      }
    );
  }

}

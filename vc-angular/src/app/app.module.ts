import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ScheduleComponentComponent } from './schedule-component/schedule-component.component';
import { IndexComponent } from './index/index.component';
import { ConfigMainComponent } from './config-main/config-main.component';
import { ConfigLocationComponent } from './config-location/config-location.component';
import { ConfigDepartmentComponent } from './config-department/config-department.component';
import { ConfigEndpointComponent } from './config-endpoint/config-endpoint.component';
import { ConfigMailingLocComponent } from './config-mailing-loc/config-mailing-loc.component';
import { ConfigMailingMandatoryComponent } from './config-mailing-mandatory/config-mailing-mandatory.component';
import { ConfigUserComponent } from './config-user/config-user.component';
import { ConferenceComponent } from './conference/conference.component';

const appRoutes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
	{
		path: 'schedule',
		component: ScheduleComponentComponent
	},{
    path: 'configure',
    component: ConfigMainComponent
  },{
    path: 'configure/location',
    component: ConfigLocationComponent
  },{
    path: 'configure/department',
    component: ConfigDepartmentComponent
  },{
    path: 'configure/endpoint',
    component: ConfigEndpointComponent
  },{
    path: 'configure/mailing-location',
    component: ConfigMailingLocComponent
  },{
    path: 'configure/mailing-mandatory',
    component: ConfigMailingMandatoryComponent
  },{
    path: 'configure/user',
    component: ConfigUserComponent
  },{
    path: 'conference/:id',
    component: ConferenceComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponentComponent,
    IndexComponent,
    ConfigMainComponent,
    ConfigLocationComponent,
    ConfigDepartmentComponent,
    ConfigEndpointComponent,
    ConfigMailingLocComponent,
    ConfigMailingMandatoryComponent,
    ConfigUserComponent,
    ConferenceComponent
  ],
  imports: [
  	RouterModule.forRoot(
  		appRoutes,
  		{ enableTracing: true }
  	),
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

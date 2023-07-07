import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dept_notificationComponent } from './dept_notification.component';
import { CreateNotificationModule } from '../create-notification/create-notification.module';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

const routes:Routes=[
  {path:'',component:Dept_notificationComponent}
]
@NgModule({
  imports: [
    CommonModule,
    CreateNotificationModule,
    MatCardModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Dept_notificationComponent]
})
export class Dept_notificationModule { 
  constructor(){
    console.log('dept not module loaded')
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Notif_placeholderComponent } from './notif_placeholder.component';
import { MngCreateNotifModule } from '../mng-create-notif/mng-create-notif.module';
import { MngCreateNotifComponent } from '../mng-create-notif/mng-create-notif.component';
import { RouterModule, Routes } from '@angular/router';
const routes:Routes=[{
  path:'',
  component:MngCreateNotifComponent
}]
@NgModule({
  imports: [
    CommonModule,
    MngCreateNotifModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Notif_placeholderComponent]
})
export class Notif_placeholderModule { }

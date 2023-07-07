import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelCommunicationsComponent } from './hotel-communications.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';
import { CommunicationsModule } from '../../Main/admin/communications/communications.module';
const routes:Routes=[
  {
    path:'',
    component:HotelCommunicationsComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    CommunicationsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HotelCommunicationsComponent]
})
export class HotelCommunicationsModule { }

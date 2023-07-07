import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelEmergencyRepComponent } from './hotel-emergency-rep.component';
import { EmergencyReportModule } from '../../Main/admin/emergency-report/emergency-report.module'
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card'; 
const routes:Routes=[
  {path:'',
  component:HotelEmergencyRepComponent
}
]
@NgModule({
  imports: [
    CommonModule,
    EmergencyReportModule,
    MatIconModule,
    MatCardModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HotelEmergencyRepComponent]
})
export class HotelEmergencyRepModule { }

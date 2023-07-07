import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelCreateEmergencyComponent } from './hotel-create-emergency.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
const routes:Routes=[
  {
    path:'',
    component:HotelCreateEmergencyComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,

    RouterModule.forChild(routes)
  ],
  declarations: [HotelCreateEmergencyComponent]
})
export class HotelCreateEmergencyModule { }

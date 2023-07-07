import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelCreateVoiceComponent } from './hotel-create-voice.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
const routes:Routes=[
  {
    path:'',
    component:HotelCreateVoiceComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HotelCreateVoiceComponent]
})
export class HotelCreateVoiceModule { }

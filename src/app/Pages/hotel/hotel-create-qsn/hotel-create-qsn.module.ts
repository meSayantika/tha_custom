import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelCreateQsnComponent } from './hotel-create-qsn.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button'
import {MatCardModule} from '@angular/material/card'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatIconModule} from '@angular/material/icon'
import {MatStepperModule} from '@angular/material/stepper';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
const routes:Routes=[
  {
    path:'',
    component:HotelCreateQsnComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatStepperModule,
    AngularMultiSelectModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HotelCreateQsnComponent]
})
export class HotelCreateQsnModule { }

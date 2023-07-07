import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelQuestionnaireComponent } from './hotel-questionnaire.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
const routes:Routes=[{
  path:'',
  component:HotelQuestionnaireComponent
}]
@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HotelQuestionnaireComponent]
})
export class HotelQuestionnaireModule { }

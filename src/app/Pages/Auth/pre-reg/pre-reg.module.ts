import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreRegComponent } from './pre-reg.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

const routes:Routes=[{
  path:'',
  component:PreRegComponent
}
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PreRegComponent]
})
export class PreRegModule { }

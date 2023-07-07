import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Qrcode_signageComponent } from './qrcode_signage.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
const routes:Routes=[{
  path:'',
  component:Qrcode_signageComponent
}]
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Qrcode_signageComponent]
})
export class Qrcode_signageModule { }

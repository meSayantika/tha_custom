import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { No_saleComponent } from './no_sale.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';

const routes:Routes=[
  {
    path:'',
    component:No_saleComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    RouterModule.forChild(routes)
  ],
  declarations: [No_saleComponent]
})
export class No_saleModule { }

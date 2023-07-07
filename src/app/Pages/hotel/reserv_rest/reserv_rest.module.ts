import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reserv_restComponent } from './reserv_rest.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



const routes:Routes=[
  {path:'',component:Reserv_restComponent}
]

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Reserv_restComponent]
})
export class Reserv_restModule { }

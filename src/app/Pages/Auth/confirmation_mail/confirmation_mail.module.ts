import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Confirmation_mailComponent } from './confirmation_mail.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
const routes: Routes = [
  {
    path: '',
    component: Confirmation_mailComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatButtonModule,
    MatCardModule
  ],
  declarations: [Confirmation_mailComponent]
})
export class Confirmation_mailModule { }

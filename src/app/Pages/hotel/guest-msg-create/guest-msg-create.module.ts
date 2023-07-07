import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestMsgCreateComponent } from './guest-msg-create.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { RouterModule,Routes } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

const routes:Routes=[
  {
    path:'',
    component:GuestMsgCreateComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    NgMultiSelectDropDownModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GuestMsgCreateComponent]
})
export class GuestMsgCreateModule { }

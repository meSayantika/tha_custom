import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeEmpSchComponent } from './change-emp-sch.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule
  ],
  exports:[ChangeEmpSchComponent],
  declarations: [ChangeEmpSchComponent]
})
export class ChangeEmpSchModule { }

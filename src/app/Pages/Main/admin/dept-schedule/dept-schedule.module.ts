import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeptScheduleComponent } from './dept-schedule.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule
  ],
  exports:[DeptScheduleComponent],
  declarations: [DeptScheduleComponent]
})
export class DeptScheduleModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsgTemplateComponent } from './msg-template.component';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
  ],
  exports:[MsgTemplateComponent],
  declarations: [MsgTemplateComponent]
})
export class MsgTemplateModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformFaqComponent } from './platform-faq.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MsgTemplateModule } from '../msg-template/msg-template.module';
const routes:Routes=[{
  path:'',
  component:PlatformFaqComponent
}]
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MsgTemplateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PlatformFaqComponent]
})
export class PlatformFaqModule { }

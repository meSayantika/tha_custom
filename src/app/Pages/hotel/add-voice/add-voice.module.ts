import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddVoiceComponent } from './add-voice.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PcaVoiceModule } from '../../Main/admin/pca-voice/pca-voice.module';
const routes:Routes=[{
  path:'',
  component:AddVoiceComponent
}]
@NgModule({
  imports: [
    CommonModule,
    PcaVoiceModule,
    MatCardModule,
    MatIconModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddVoiceComponent]
})
export class AddVoiceModule { }

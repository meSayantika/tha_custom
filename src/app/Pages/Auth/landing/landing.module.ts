import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { RouterModule, Routes } from '@angular/router';
import {MatCardModule} from '@angular/material/card'
import {MatIconModule} from '@angular/material/icon'
import { MatProgressBarModule } from '@angular/material/progress-bar';

const routes:Routes=[{
  path:'',
  component:LandingComponent
}]
@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LandingComponent]
})
export class LandingModule { }

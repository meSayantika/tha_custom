import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectoryHomeComponent } from './directory-home.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion'
import {MatBadgeModule} from '@angular/material/badge'
import {MatTooltipModule} from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
const routes:Routes=[
  {path:'',component:DirectoryHomeComponent}
]
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    FormsModule,
    MatIconModule,
    MatBadgeModule,
    MatTooltipModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DirectoryHomeComponent]
})
export class DirectoryHomeModule {
  constructor(){console.log('home is loaded')}
 }

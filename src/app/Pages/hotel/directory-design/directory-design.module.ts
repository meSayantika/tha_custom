import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectoryDesignComponent } from './directory-design.component';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion'
import {MatBadgeModule} from '@angular/material/badge'
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import { RouterModule,Routes } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { IconPickerModule } from 'ngx-icon-picker';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
const routes:Routes=[{
  path:'',
  component:DirectoryDesignComponent
}]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatMenuModule,
    MatDialogModule,
    MatExpansionModule,
    MatBadgeModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    IconPickerModule,
    NgxDropzoneModule,
    MatFormFieldModule
  ],
  declarations: [DirectoryDesignComponent]
})
export class DirectoryDesignModule { }

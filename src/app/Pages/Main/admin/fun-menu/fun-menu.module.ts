import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FunMenuComponent } from './fun-menu.component';
import { Routes,RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ImageCropperModule } from 'ngx-image-cropper';
const routes:Routes=[{
  path:'',
  component:FunMenuComponent
}]
@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    AngularEditorModule,
    ImageCropperModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FunMenuComponent]
})
export class FunMenuModule { }

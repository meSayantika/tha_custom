import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YourDirectoryComponent } from './your-directory.component';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion'
import {MatBadgeModule} from '@angular/material/badge'
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatExpansionModule,
    MatBadgeModule,
    MatTooltipModule,
    MatSlideToggleModule,
    FormsModule
  ],
  exports:[YourDirectoryComponent],
  declarations: [YourDirectoryComponent]
})
export class YourDirectoryModule { }

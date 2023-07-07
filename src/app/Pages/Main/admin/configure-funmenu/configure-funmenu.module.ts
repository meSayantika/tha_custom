import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigureFunmenuComponent } from './configure-funmenu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports:[ConfigureFunmenuComponent],
  declarations: [ConfigureFunmenuComponent]
})
export class ConfigureFunmenuModule { }
